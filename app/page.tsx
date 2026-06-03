"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, TrendingUp, AlertTriangle, ChevronDown, ChevronRight } from "lucide-react";
import { TickerRow } from "@/components/TickerRow";
import { StockCard } from "@/components/StockCard";
import { Semaphore } from "@/components/Semaphore";
import type { TickerSignal, SemaphoreColor } from "@/lib/semaphore";

type TickerSignalWithRS = TickerSignal & { rs?: number };

interface DashboardData {
  indices: TickerSignal[];
  riskAppetite: TickerSignal[];
  bullMarket: boolean;
}

interface SectorsData {
  macro: TickerSignalWithRS[];
  specific: TickerSignalWithRS[];
}

interface ScreenerStock {
  ticker: string;
  daily: TickerSignal["daily"];
  weekly: TickerSignal["weekly"];
  monthly: TickerSignal["monthly"];
  overallColor: SemaphoreColor;
  latestClose: number;
  distFromHigh: number;
  relVolume: number;
  weeklyChart: Array<{ date: string; open: number; high: number; low: number; close: number; volume: number }>;
  isPromising: boolean;
}

interface ScreenerData {
  etf: string;
  promising: ScreenerStock[];
  all: ScreenerStock[];
}

function SectionHeader({ title, badge }: { title: string; badge?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <h2 className="text-zinc-300 text-xs font-semibold uppercase tracking-widest">{title}</h2>
      {badge}
      <div className="flex-1 h-px bg-zinc-800" />
    </div>
  );
}

function MarketBadge({ bullMarket, loading }: { bullMarket: boolean | null; loading: boolean }) {
  if (loading) return <span className="text-xs text-zinc-500 animate-pulse">Loading...</span>;
  if (bullMarket === null) return null;
  if (bullMarket)
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300">
        <TrendingUp size={12} /> BULL
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-900/60 text-amber-300">
      <AlertTriangle size={12} /> CAUTION
    </span>
  );
}

function SectorScreener({ etf, onClose }: { etf: string; onClose: () => void }) {
  const [data, setData] = useState<ScreenerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/screener/${etf}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [etf]);

  const stocks = showAll ? data?.all : data?.promising;

  return (
    <div className="fixed inset-0 bg-zinc-950/90 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="text-zinc-400 hover:text-zinc-100 text-sm">← Back</button>
            <h2 className="text-zinc-100 font-bold text-lg">{etf} — Screener</h2>
            {data && (
              <span className="text-xs text-zinc-400">
                {data.promising.length} promising / {data.all.length} total
              </span>
            )}
          </div>
          <button
            onClick={() => setShowAll((v) => !v)}
            className="text-xs text-zinc-400 hover:text-zinc-200 px-2 py-1 rounded border border-zinc-700 hover:border-zinc-500 transition-colors"
          >
            {showAll ? "Show Promising" : "Show All"}
          </button>
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <RefreshCw size={24} className="text-zinc-500 animate-spin" />
          </div>
        )}

        {!loading && stocks && stocks.length === 0 && (
          <p className="text-center text-zinc-500 py-16">
            {showAll ? "No data available." : "No promising stocks found. Try 'Show All'."}
          </p>
        )}

        {!loading && stocks && stocks.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {stocks.map((s) => (
              <StockCard key={s.ticker} {...s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [sectors, setSectors] = useState<SectorsData | null>(null);
  const [loadingDash, setLoadingDash] = useState(true);
  const [loadingSectors, setLoadingSectors] = useState(true);
  const [selectedEtf, setSelectedEtf] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [showSpecific, setShowSpecific] = useState(false);

  const fetchDashboard = useCallback(async () => {
    setLoadingDash(true);
    try {
      const r = await fetch("/api/dashboard");
      setDashboard(await r.json());
    } finally {
      setLoadingDash(false);
      setLastUpdated(new Date());
    }
  }, []);

  const fetchSectors = useCallback(async () => {
    setLoadingSectors(true);
    try {
      const r = await fetch("/api/sectors");
      setSectors(await r.json());
    } finally {
      setLoadingSectors(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
    fetchSectors();
  }, [fetchDashboard, fetchSectors]);

  const refreshAll = () => {
    fetchDashboard();
    fetchSectors();
  };

  const overallMarketColor: SemaphoreColor =
    dashboard?.bullMarket ? "green" : dashboard ? "yellow" : "red";

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {selectedEtf && (
        <SectorScreener etf={selectedEtf} onClose={() => setSelectedEtf(null)} />
      )}

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Semaphore color={overallMarketColor} size="lg" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">CosmoPandas</h1>
              <p className="text-xs text-zinc-500">Stock Momentum Dashboard</p>
            </div>
            <MarketBadge bullMarket={dashboard?.bullMarket ?? null} loading={loadingDash} />
          </div>
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-xs text-zinc-600 hidden sm:block">
                {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={refreshAll}
              disabled={loadingDash || loadingSectors}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-100 px-2.5 py-1.5 rounded-lg border border-zinc-700 hover:border-zinc-500 transition-colors disabled:opacity-40"
            >
              <RefreshCw size={12} className={(loadingDash || loadingSectors) ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        {/* Market Indices */}
        <section>
          <SectionHeader title="Market Conditions" />
          {loadingDash ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {["SPY","QQQ","IWM"].map((t) => (
                <div key={t} className="h-14 bg-zinc-800/50 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {dashboard?.indices.map((s) => (
                <TickerRow key={s.ticker} {...s} close={s.daily.close} />
              ))}
            </div>
          )}
        </section>

        {/* Risk Appetite */}
        <section>
          <SectionHeader title="Risk Appetite" />
          {loadingDash ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {["HYG","SMH"].map((t) => (
                <div key={t} className="h-14 bg-zinc-800/50 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {dashboard?.riskAppetite.map((s) => (
                <TickerRow key={s.ticker} {...s} close={s.daily.close} />
              ))}
            </div>
          )}
        </section>

        {/* Macro Sectors */}
        <section>
          <SectionHeader title="Macro Sectors" />
          {loadingSectors ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Array.from({ length: 11 }).map((_, i) => (
                <div key={i} className="h-14 bg-zinc-800/50 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {sectors?.macro.map((s) => (
                <button
                  key={s.ticker}
                  onClick={() => setSelectedEtf(s.ticker)}
                  className="text-left w-full focus:outline-none focus:ring-1 focus:ring-zinc-500 rounded-lg"
                >
                  <TickerRow {...s} close={s.daily.close} compact />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Specific Sectors (collapsible) */}
        <section>
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => setShowSpecific((v) => !v)}
              className="flex items-center gap-1.5 text-zinc-300 text-xs font-semibold uppercase tracking-widest hover:text-zinc-100"
            >
              {showSpecific ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              Specific Sectors
            </button>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {showSpecific && (
            loadingSectors ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {Array.from({ length: 19 }).map((_, i) => (
                  <div key={i} className="h-14 bg-zinc-800/50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {sectors?.specific.map((s) => (
                  <button
                    key={s.ticker}
                    onClick={() => setSelectedEtf(s.ticker)}
                    className="text-left w-full focus:outline-none focus:ring-1 focus:ring-zinc-500 rounded-lg"
                  >
                    <TickerRow {...s} close={s.daily.close} compact />
                  </button>
                ))}
              </div>
            )
          )}
        </section>

        {/* Footer */}
        <footer className="pt-4 border-t border-zinc-800 text-center text-xs text-zinc-600">
          Data via Yahoo Finance · For informational purposes only · Not financial advice
        </footer>
      </div>
    </div>
  );
}
