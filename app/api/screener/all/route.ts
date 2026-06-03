import { NextRequest, NextResponse } from "next/server";
import { getHoldings } from "@/lib/holdings";
import { getStockScreenerData } from "@/lib/analyze";
import { getClosePrices } from "@/lib/yahoo";

export const dynamic = "force-dynamic";

const ALL_ETFS = [
  "XLK","XLV","XLF","XLY","XLP","XLI","XLE","XLB","XLU","XLRE","XLC",
  "SOXX","CIBR","IGV","BOTZ","XBI","IHI","PPH","KRE","IAK","IAI","ITA","IYT","IFRA","ITB","ICLN","URA","PICK","MOO","INDS",
];

export async function GET(req: NextRequest) {
  const tf = (req.nextUrl.searchParams.get("tf") ?? "daily") as "daily" | "weekly";

  try {
    const spyPrices = await getClosePrices("SPY", "daily");

    // Build ticker → sectors[] map from all ETF holdings
    const tickerSectorsMap = new Map<string, string[]>();
    const allHoldings = await Promise.all(
      ALL_ETFS.map(async (etf) => ({ etf, tickers: await getHoldings(etf) }))
    );
    for (const { etf, tickers } of allHoldings) {
      for (const ticker of tickers) {
        const existing = tickerSectorsMap.get(ticker) ?? [];
        tickerSectorsMap.set(ticker, [...existing, etf]);
      }
    }

    const uniqueTickers = Array.from(tickerSectorsMap.keys());

    const results = await Promise.allSettled(
      uniqueTickers.map((ticker) => getStockScreenerData(ticker, tf, spyPrices))
    );

    const stocks = results
      .map((r, i) => {
        if (r.status !== "fulfilled" || !r.value) return null;
        return {
          ...r.value,
          sectors: tickerSectorsMap.get(uniqueTickers[i]) ?? [],
        };
      })
      .filter(Boolean);

    const promising = stocks
      .filter((s) => s?.isPromising)
      .sort((a, b) => (b?.rs ?? 0) - (a?.rs ?? 0));

    return NextResponse.json({
      analysisTf: tf,
      totalScanned: uniqueTickers.length,
      promising,
    });
  } catch (error) {
    console.error("[screener/all]", error);
    return NextResponse.json({ error: "Failed to fetch global screener" }, { status: 500 });
  }
}
