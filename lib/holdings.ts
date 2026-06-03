import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance({
  suppressNotices: ["ripHistorical", "yahooSurvey"],
});

interface HoldingEntry {
  symbol: string;
  holdingName?: string;
  holdingPercent?: number;
}

// Cache with 24h TTL (holdings change rarely)
const cache = new Map<string, { tickers: string[]; ts: number }>();
const HOLDINGS_TTL = 24 * 60 * 60 * 1000;

// Simple request queue to avoid Yahoo rate limiting
let queue = Promise.resolve();
function enqueue<T>(fn: () => Promise<T>): Promise<T> {
  const result = queue.then(() => fn());
  // 200ms gap between requests
  queue = result.then(
    () => new Promise((r) => setTimeout(r, 200)),
    () => new Promise((r) => setTimeout(r, 200))
  );
  return result;
}

export async function getHoldings(etf: string): Promise<string[]> {
  const key = etf.toUpperCase();
  const cached = cache.get(key);
  if (cached && Date.now() - cached.ts < HOLDINGS_TTL) return cached.tickers;

  const tickers = await enqueue(async () => {
    const data = await yahooFinance.quoteSummary(key, {
      modules: ["topHoldings"],
    });
    const holdings: HoldingEntry[] = data.topHoldings?.holdings ?? [];
    return holdings
      .map((h) => h.symbol)
      .filter((s): s is string => typeof s === "string" && s.length > 0);
  });

  cache.set(key, { tickers, ts: Date.now() });
  return tickers;
}

// Pre-warm cache for a list of ETFs (sequential, rate-limit safe)
export async function prefetchHoldings(etfs: string[]): Promise<void> {
  for (const etf of etfs) {
    try {
      await getHoldings(etf);
    } catch {
      // ignore individual failures — getHoldings will return [] for this ETF
    }
  }
}
