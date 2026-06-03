import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance({ suppressNotices: ["ripHistorical"] });

export type Timeframe = "daily" | "weekly" | "monthly";

export interface OHLCV {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const cache = new Map<string, { data: OHLCV[]; ts: number }>();
const CACHE_TTL = 5 * 60 * 1000;

function intervalFor(tf: Timeframe): "1d" | "1wk" | "1mo" {
  if (tf === "daily") return "1d";
  if (tf === "weekly") return "1wk";
  return "1mo";
}

function startDateFor(tf: Timeframe): Date {
  const d = new Date();
  if (tf === "daily") d.setDate(d.getDate() - 180);
  else if (tf === "weekly") d.setFullYear(d.getFullYear() - 2);
  else d.setFullYear(d.getFullYear() - 5);
  return d;
}

export async function getOHLCV(
  ticker: string,
  timeframe: Timeframe
): Promise<OHLCV[]> {
  const key = `${ticker}:${timeframe}`;
  const cached = cache.get(key);
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;

  const result = await yahooFinance.chart(ticker, {
    period1: startDateFor(timeframe),
    interval: intervalFor(timeframe),
  });

  const data: OHLCV[] = (result.quotes ?? [])
    .filter((q) => q.close != null)
    .map((q) => ({
      date: new Date(q.date),
      open: q.open ?? 0,
      high: q.high ?? 0,
      low: q.low ?? 0,
      close: q.close as number,
      volume: q.volume ?? 0,
    }));

  cache.set(key, { data, ts: Date.now() });
  return data;
}

export async function getClosePrices(
  ticker: string,
  timeframe: Timeframe
): Promise<number[]> {
  const data = await getOHLCV(ticker, timeframe);
  return data.map((d) => d.close);
}

export async function getLatestClose(ticker: string): Promise<number> {
  const prices = await getClosePrices(ticker, "daily");
  return prices[prices.length - 1] ?? 0;
}
