"use client";

import type { SemaphoreColor } from "@/lib/semaphore";

interface SemaphoreProps {
  color: SemaphoreColor;
  size?: "sm" | "md" | "lg";
}

const sizeMap = { sm: "w-2.5 h-2.5", md: "w-3.5 h-3.5", lg: "w-5 h-5" };

const colorMap: Record<SemaphoreColor, string> = {
  green: "bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.6)]",
  yellow: "bg-amber-400 shadow-[0_0_8px_2px_rgba(251,191,36,0.6)]",
  red: "bg-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,0.6)]",
};

export function Semaphore({ color, size = "md" }: SemaphoreProps) {
  return (
    <span
      className={`inline-block rounded-full ${sizeMap[size]} ${colorMap[color]}`}
      title={color}
    />
  );
}
