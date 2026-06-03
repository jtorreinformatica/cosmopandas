export function calculateEMA(prices: number[], period: number): number[] {
  if (prices.length === 0) return [];
  const k = 2 / (period + 1);
  const emas: number[] = [];
  let ema = prices[0];
  emas.push(ema);
  for (let i = 1; i < prices.length; i++) {
    ema = prices[i] * k + ema * (1 - k);
    emas.push(ema);
  }
  return emas;
}

export function lastEMA(prices: number[], period: number): number {
  const emas = calculateEMA(prices, period);
  return emas[emas.length - 1];
}
