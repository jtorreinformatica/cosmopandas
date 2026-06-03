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
  rs?: number;
  sectors?: string[];
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
  rs,
  sectors,
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
        <div className="flex items-center gap-1.5">
          {rs != null && (
            <span className={`text-xs font-mono ${rs > 1.1 ? "text-emerald-400" : rs > 1 ? "text-amber-400" : "text-zinc-500"}`}>
              RS {rs.toFixed(2)}
            </span>
          )}
          <span className="text-zinc-300 text-xs font-mono">${latestClose.toFixed(2)}</span>
        </div>
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

      {sectors && sectors.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-0.5 border-t border-zinc-800">
          {sectors.slice(0, 4).map((etf) => (
            <span key={etf} className="text-xs text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded font-mono">
              {etf}
            </span>
          ))}
          {sectors.length > 4 && (
            <span className="text-xs text-zinc-600">+{sectors.length - 4}</span>
          )}
        </div>
      )}
    </div>
  );
}
