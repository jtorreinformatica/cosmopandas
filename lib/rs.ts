export function calculateRS(
  tickerPrices: number[],
  spyPrices: number[]
): number {
  if (tickerPrices.length < 2 || spyPrices.length < 2) return 1;

  const periods = Math.min(tickerPrices.length, spyPrices.length, 63); // ~3 months trading days
  const tickerStart = tickerPrices[tickerPrices.length - periods];
  const tickerEnd = tickerPrices[tickerPrices.length - 1];
  const spyStart = spyPrices[spyPrices.length - periods];
  const spyEnd = spyPrices[spyPrices.length - 1];

  if (tickerStart === 0 || spyStart === 0) return 1;

  const tickerReturn = tickerEnd / tickerStart;
  const spyReturn = spyEnd / spyStart;

  return spyReturn === 0 ? 1 : tickerReturn / spyReturn;
}
