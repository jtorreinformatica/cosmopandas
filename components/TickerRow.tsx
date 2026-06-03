"use client";

import { Semaphore } from "./Semaphore";
import { TimeframeBadges } from "./TimeframeBadges";
import type { SemaphoreColor, TimeframeSignal } from "@/lib/semaphore";

interface TickerRowProps {
  ticker: string;
  daily: TimeframeSignal;
  weekly: TimeframeSignal;
  monthly: TimeframeSignal;
  overallColor: SemaphoreColor;
  rs?: number;
  close?: number;
  compact?: boolean;
}

export function TickerRow({
  ticker,
  daily,
  weekly,
  monthly,
  overallColor,
  rs,
  close,
  compact = false,
}: TickerRowProps) {
  return (
    <div
      className={`flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-3 ${compact ? "py-2" : "py-3"} hover:border-zinc-600 transition-colors`}
    >
      <div className="flex items-center gap-2 min-w-[80px]">
        <Semaphore color={overallColor} size={compact ? "sm" : "md"} />
        <span className={`font-bold text-zinc-100 ${compact ? "text-xs" : "text-sm"}`}>{ticker}</span>
      </div>
      <div className="flex items-center gap-3">
        <TimeframeBadges daily={daily} weekly={weekly} monthly={monthly} />
        {close != null && (
          <span className="text-zinc-400 text-xs font-mono hidden sm:inline">${close.toFixed(2)}</span>
        )}
        {rs != null && (
          <span
            className={`text-xs font-mono px-1.5 py-0.5 rounded ${
              rs > 1.1 ? "bg-emerald-900/60 text-emerald-300" : rs > 1 ? "bg-amber-900/60 text-amber-300" : "bg-zinc-800 text-zinc-400"
            }`}
          >
            RS {rs.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
}
