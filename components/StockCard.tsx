"use client";

import { Semaphore } from "./Semaphore";
import { TimeframeBadges } from "./TimeframeBadges";
import { MiniChart } from "./MiniChart";
import type { SemaphoreColor, TimeframeSignal } from "@/lib/semaphore";

interface StockCardProps {
  ticker: string;
  daily: TimeframeSignal;
  weekly: TimeframeSignal;
  monthly: TimeframeSignal;
  overallColor: SemaphoreColor;
  latestClose: number;
  distFromHigh: number;
  relVolume: number;
  weeklyChart: Array<{ date: string; open: number; high: number; low: number; close: number; volume: number }>;
}

export function StockCard({
  ticker,
  daily,
  weekly,
  monthly,
  overallColor,
  latestClose,
  distFromHigh,
  relVolume,
  weeklyChart,
}: StockCardProps) {
  const pctFromHigh = ((1 - distFromHigh) * 100).toFixed(1);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex flex-col gap-2 hover:border-zinc-600 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Semaphore color={overallColor} size="sm" />
          <span className="font-bold text-zinc-100 text-sm">{ticker}</span>
        </div>
        <span className="text-zinc-300 text-xs font-mono">${latestClose.toFixed(2)}</span>
      </div>

      <MiniChart data={weeklyChart} ticker={ticker} />

      <div className="flex items-center justify-between">
        <TimeframeBadges daily={daily} weekly={weekly} monthly={monthly} />
        <div className="text-right text-xs">
          <div className={`font-mono ${distFromHigh >= 0.97 ? "text-emerald-400" : distFromHigh >= 0.9 ? "text-amber-400" : "text-zinc-500"}`}>
            -{pctFromHigh}% high
          </div>
          <div className={`font-mono ${relVolume >= 1.5 ? "text-emerald-400" : relVolume >= 1.2 ? "text-amber-400" : "text-zinc-500"}`}>
            {relVolume.toFixed(1)}x vol
          </div>
        </div>
      </div>
    </div>
  );
}
