import { getClosePrices, getOHLCV } from "./yahoo";
import { lastEMA } from "./ema";
import { getSemaphoreColor, getOverallColor, type TimeframeSignal, type TickerSignal } from "./semaphore";
import { calculateRS } from "./rs";

export async function analyzeTickerSignals(ticker: string): Promise<TickerSignal> {
  const [dailyPrices, weeklyPrices, monthlyPrices] = await Promise.all([
    getClosePrices(ticker, "daily"),
    getClosePrices(ticker, "weekly"),
    getClosePrices(ticker, "monthly"),
  ]);

  const dClose = dailyPrices[dailyPrices.length - 1];
  const dEmaShort = lastEMA(dailyPrices, 10);
  const dEmaLong = lastEMA(dailyPrices, 26);

  const wClose = weeklyPrices[weeklyPrices.length - 1];
  const wEmaShort = lastEMA(weeklyPrices, 7);
  const wEmaLong = lastEMA(weeklyPrices, 26);

  const mClose = monthlyPrices[monthlyPrices.length - 1];
  const mEmaShort = lastEMA(monthlyPrices, 7);
  const mEmaLong = lastEMA(monthlyPrices, 26);

  const daily: TimeframeSignal = {
    timeframe: "D",
    color: getSemaphoreColor(dClose, dEmaShort, dEmaLong),
    close: dClose,
    emaShort: dEmaShort,
    emaLong: dEmaLong,
  };
  const weekly: TimeframeSignal = {
    timeframe: "W",
    color: getSemaphoreColor(wClose, wEmaShort, wEmaLong),
    close: wClose,
    emaShort: wEmaShort,
    emaLong: wEmaLong,
  };
  const monthly: TimeframeSignal = {
    timeframe: "M",
    color: getSemaphoreColor(mClose, mEmaShort, mEmaLong),
    close: mClose,
    emaShort: mEmaShort,
    emaLong: mEmaLong,
  };

  return {
    ticker,
    daily,
    weekly,
    monthly,
    overallColor: getOverallColor([daily, weekly, monthly]),
  };
}

export async function analyzeWithRS(ticker: string, spyDailyPrices: number[]) {
  const [signal, tickerDaily] = await Promise.all([
    analyzeTickerSignals(ticker),
    getClosePrices(ticker, "daily"),
  ]);
  const rs = calculateRS(tickerDaily, spyDailyPrices);
  return { ...signal, rs };
}

export async function getStockScreenerData(ticker: string) {
  const [dailyData, weeklyData] = await Promise.all([
    getOHLCV(ticker, "daily"),
    getOHLCV(ticker, "weekly"),
  ]);
  if (dailyData.length === 0) return null;

  const closes = dailyData.map((d) => d.close);
  const volumes = dailyData.map((d) => d.volume);

  const latestClose = closes[closes.length - 1];
  const high52w = Math.max(...closes.slice(-252));
  const distFromHigh = latestClose / high52w; // 1.0 = at high, 0.9 = 10% below

  const avgVol20 = volumes.slice(-20).reduce((a, b) => a + b, 0) / 20;
  const latestVol = volumes[volumes.length - 1];
  const relVolume = avgVol20 > 0 ? latestVol / avgVol20 : 1;

  const signal = await analyzeTickerSignals(ticker);

  // Weekly chart data (last 26 weeks)
  const weeklyChart = weeklyData.slice(-26).map((d) => ({
    date: d.date.toISOString().split("T")[0],
    open: d.open,
    high: d.high,
    low: d.low,
    close: d.close,
    volume: d.volume,
  }));

  return {
    ...signal,
    latestClose,
    high52w,
    distFromHigh,
    relVolume,
    weeklyChart,
    isPromising: distFromHigh >= 0.9 && relVolume >= 1.2 && signal.overallColor !== "red",
  };
}
