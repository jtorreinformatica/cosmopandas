"use client";

import type { TimeframeSignal } from "@/lib/semaphore";
import { Semaphore } from "./Semaphore";

interface TimeframeBadgesProps {
  daily: TimeframeSignal;
  weekly: TimeframeSignal;
  monthly: TimeframeSignal;
}

export function TimeframeBadges({ daily, weekly, monthly }: TimeframeBadgesProps) {
  return (
    <div className="flex items-center gap-2">
      {[daily, weekly, monthly].map((s) => (
        <div key={s.timeframe} className="flex items-center gap-1">
          <Semaphore color={s.color} size="sm" />
          <span className="text-xs text-zinc-400 font-mono">{s.timeframe}</span>
        </div>
      ))}
    </div>
  );
}
