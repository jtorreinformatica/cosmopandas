import { NextResponse } from "next/server";
import { analyzeWithRS } from "@/lib/analyze";
import { getClosePrices } from "@/lib/yahoo";

const MACRO_SECTORS = ["XLK","XLV","XLF","XLY","XLP","XLI","XLE","XLB","XLU","XLRE","XLC"];
const SPECIFIC_SECTORS = ["SOXX","CIBR","IGV","BOTZ","XBI","IHI","PPH","KRE","IAK","IAI","ITA","IYT","IFRA","ITB","ICLN","URA","PICK","MOO","INDS"];

export const dynamic = "force-dynamic";
export const revalidate = 300;

export async function GET() {
  try {
    const spyPrices = await getClosePrices("SPY", "daily");

    const [macroResults, specificResults] = await Promise.all([
      Promise.all(MACRO_SECTORS.map((t) => analyzeWithRS(t, spyPrices))),
      Promise.all(SPECIFIC_SECTORS.map((t) => analyzeWithRS(t, spyPrices))),
    ]);

    return NextResponse.json({
      macro: macroResults.sort((a, b) => b.rs - a.rs),
      specific: specificResults.sort((a, b) => b.rs - a.rs),
    });
  } catch (error) {
    console.error("[sectors]", error);
    return NextResponse.json({ error: "Failed to fetch sector data" }, { status: 500 });
  }
}
