import { NextResponse } from "next/server";
import { analyzeTickerSignals } from "@/lib/analyze";
import { isBullMarket } from "@/lib/semaphore";

const INDEX_TICKERS = ["SPY", "QQQ", "IWM"];
const RISK_TICKERS = ["HYG", "SMH"];

export const dynamic = "force-dynamic";
export const revalidate = 300; // 5 min

export async function GET() {
  try {
    const [indexSignals, riskSignals] = await Promise.all([
      Promise.all(INDEX_TICKERS.map(analyzeTickerSignals)),
      Promise.all(RISK_TICKERS.map(analyzeTickerSignals)),
    ]);

    const bullMarket = isBullMarket(indexSignals);

    return NextResponse.json({
      indices: indexSignals,
      riskAppetite: riskSignals,
      bullMarket,
    });
  } catch (error) {
    console.error("[dashboard]", error);
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}
