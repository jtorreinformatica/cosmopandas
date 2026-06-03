import { NextRequest, NextResponse } from "next/server";
import { getHoldings } from "@/lib/holdings";
import { getStockScreenerData } from "@/lib/analyze";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ etf: string }> }
) {
  const { etf } = await params;
  const tf = (req.nextUrl.searchParams.get("tf") ?? "weekly") as "daily" | "weekly";
  const analysisTf = tf === "daily" ? "daily" : "weekly";

  const holdings = await getHoldings(etf);

  if (holdings.length === 0) {
    return NextResponse.json({ error: `No holdings found for ${etf}` }, { status: 404 });
  }

  try {
    const results = await Promise.allSettled(
      holdings.map((ticker) => getStockScreenerData(ticker, analysisTf))
    );

    const stocks = results
      .map((r) => (r.status === "fulfilled" ? r.value : null))
      .filter(Boolean);

    const promising = stocks.filter((s) => s?.isPromising);
    const all = stocks;

    return NextResponse.json({ etf, analysisTf, promising, all });
  } catch (error) {
    console.error("[screener]", error);
    return NextResponse.json({ error: "Failed to fetch screener data" }, { status: 500 });
  }
}
