import { NextRequest, NextResponse } from "next/server";
import { getHoldings } from "@/lib/holdings";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ etf: string }> }
) {
  const { etf } = await params;
  try {
    const tickers = await getHoldings(etf);
    return NextResponse.json({ etf: etf.toUpperCase(), tickers, count: tickers.length });
  } catch (error) {
    console.error("[holdings]", error);
    return NextResponse.json({ error: "Failed to fetch holdings" }, { status: 500 });
  }
}
