"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface CandleData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface MiniChartProps {
  data: CandleData[];
  ticker: string;
}

export function MiniChart({ data, ticker }: MiniChartProps) {
  if (!data || data.length === 0)
    return (
      <div className="h-24 flex items-center justify-center text-zinc-600 text-xs">
        No data
      </div>
    );

  const closes = data.map((d) => d.close);
  const minClose = Math.min(...closes) * 0.98;
  const maxClose = Math.max(...closes) * 1.02;

  const volumes = data.map((d) => d.volume);
  const maxVol = Math.max(...volumes);

  const chartData = data.map((d) => ({
    date: d.date,
    close: d.close,
    volNorm: maxVol > 0 ? (d.volume / maxVol) * (maxClose - minClose) * 0.25 + minClose : minClose,
    isUp: d.close >= d.open,
  }));

  return (
    <div className="w-full h-24" title={ticker}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <XAxis dataKey="date" hide />
          <YAxis domain={[minClose, maxClose]} hide />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0].payload;
              return (
                <div className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-xs text-zinc-200">
                  <div>{d.date}</div>
                  <div>${Number(d.close).toFixed(2)}</div>
                </div>
              );
            }}
          />
          <Bar dataKey="volNorm" maxBarSize={4} opacity={0.3}>
            {chartData.map((d, i) => (
              <Cell key={i} fill={d.isUp ? "#34d399" : "#f87171"} />
            ))}
          </Bar>
          <Line
            type="monotone"
            dataKey="close"
            stroke="#60a5fa"
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
