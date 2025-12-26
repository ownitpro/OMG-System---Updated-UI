"use client";

import * as React from "react";
import {
  ArrowPathIcon,
  SignalIcon,
  ExclamationCircleIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

type HealthResult = {
  id: string;
  name: string;
  url: string;
  online: boolean;
  status: number;
  ms: number;
};

function isDev() {
  return process.env.NEXT_PUBLIC_ENV === "dev" || process.env.NODE_ENV === "development";
}

export default function AdminHealthCardV2() {
  const [loading, setLoading] = React.useState(true);
  const [updatedAt, setUpdatedAt] = React.useState<string>("");
  const [results, setResults] = React.useState<HealthResult[]>([]);
  const [error, setError] = React.useState<string>("");
  const [autoRefresh, setAutoRefresh] = React.useState(isDev());

  async function refresh() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/health", { cache: "no-store" });
      const data = await res.json();

      setUpdatedAt(data.updatedAt);
      setResults(data.results);
    } catch {
      setError("Could not load health status.");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    refresh();
  }, []);

  React.useEffect(() => {
    if (!autoRefresh) return;

    const id = window.setInterval(() => {
      refresh();
    }, 15000);

    return () => window.clearInterval(id);
  }, [autoRefresh]);

  const onlineCount = results.filter((r) => r.online).length;
  const allOnline = results.length > 0 && onlineCount === results.length;

  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
      style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.1)" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
            <SignalIcon className="w-6 h-6 text-[#47BD79]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">System Health</h3>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <span>
                {onlineCount} / {results.length || 5} apps online
              </span>
              {updatedAt && (
                <>
                  <span className="text-white/30">•</span>
                  <span>Updated {new Date(updatedAt).toLocaleTimeString()}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isDev() && (
            <button
              type="button"
              onClick={() => setAutoRefresh((v) => !v)}
              className={`rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                autoRefresh
                  ? "bg-[#47BD79]/20 text-[#47BD79] border border-[#47BD79]/30"
                  : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
              }`}
            >
              Auto: {autoRefresh ? "On" : "Off"}
            </button>
          )}

          <button
            type="button"
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all disabled:opacity-50"
          >
            <ArrowPathIcon className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="mb-6">
        <div
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border ${
            loading
              ? "bg-white/5 text-white/60 border-white/10"
              : allOnline
              ? "bg-[#47BD79]/20 text-[#47BD79] border-[#47BD79]/30"
              : "bg-amber-500/20 text-amber-400 border-amber-500/30"
          }`}
        >
          {loading ? (
            <>
              <ArrowPathIcon className="w-4 h-4 animate-spin" />
              Checking services...
            </>
          ) : allOnline ? (
            <>
              <CheckCircleIcon className="w-4 h-4" />
              All systems operational
            </>
          ) : (
            <>
              <ExclamationCircleIcon className="w-4 h-4" />
              Some services offline
            </>
          )}
        </div>
      </div>

      {/* Results */}
      {error ? (
        <div className="flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/20 p-4">
          <ExclamationCircleIcon className="w-5 h-5 text-red-400" />
          <span className="text-sm text-red-400">{error}</span>
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    r.online ? "bg-[#47BD79] shadow-[0_0_10px_rgba(71,189,121,0.5)]" : "bg-red-500"
                  }`}
                />
                <div>
                  <div className="text-sm font-medium text-white">{r.name}</div>
                  <div className="text-xs text-white/50">{r.url}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-white/50 font-mono">{r.ms}ms</span>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border ${
                    r.online
                      ? "bg-[#47BD79]/20 text-[#47BD79] border-[#47BD79]/30"
                      : "bg-red-500/20 text-red-400 border-red-500/30"
                  }`}
                >
                  {r.online ? (
                    <CheckCircleIcon className="w-3 h-3" />
                  ) : (
                    <XCircleIcon className="w-3 h-3" />
                  )}
                  {r.online ? "Online" : "Offline"}
                </span>

                <a
                  href={r.url}
                  className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open
                  <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tip */}
      <div className="mt-4 text-xs text-white/40">
        Tip: Add <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono">/api/health</code> to each app for faster health checks.
      </div>
    </div>
  );
}
