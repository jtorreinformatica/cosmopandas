export type SemaphoreColor = "green" | "yellow" | "red";

export interface TimeframeSignal {
  timeframe: "D" | "W" | "M";
  color: SemaphoreColor;
  close: number;
  emaShort: number;
  emaLong: number;
}

export interface TickerSignal {
  ticker: string;
  daily: TimeframeSignal;
  weekly: TimeframeSignal;
  monthly: TimeframeSignal;
  overallColor: SemaphoreColor;
}

export function getSemaphoreColor(
  close: number,
  emaShort: number,
  emaLong: number
): SemaphoreColor {
  if (close > emaShort) return "green";
  if (close > emaLong) return "yellow";
  return "red";
}

export function getOverallColor(signals: TimeframeSignal[]): SemaphoreColor {
  if (signals.every((s) => s.color === "green")) return "green";
  if (signals.some((s) => s.color === "red")) return "red";
  return "yellow";
}

export function isBullMarket(signals: TickerSignal[]): boolean {
  return signals.every((s) => s.overallColor === "green");
}
