"use client";

import * as React from "react";

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

export default function AdminHealthCard() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRefresh]); // refresh is stable enough here for Week 1

  const onlineCount = results.filter((r) => r.online).length;

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Admin Health</div>
          <div className="mt-1 text-xs text-zinc-600">
            Local dev apps online: <span className="text-black font-medium">{onlineCount}</span> /{" "}
            <span className="text-black font-medium">{results.length || 5}</span>
            {updatedAt ? (
              <span className="ml-2">
                • Updated {new Date(updatedAt).toLocaleTimeString()}
              </span>
            ) : null}
          </div>
          {isDev() && autoRefresh ? (
            <div className="mt-1 text-xs text-zinc-600">Auto-refreshing every 15s</div>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          {isDev() ? (
            <button
              type="button"
              onClick={() => setAutoRefresh((v) => !v)}
              className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
              title="Auto-refresh every 15 seconds"
            >
              {autoRefresh ? "Auto: On" : "Auto: Off"}
            </button>
          ) : null}

          <button
            type="button"
            onClick={refresh}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="text-sm text-zinc-600">Checking apps…</div>
        ) : error ? (
          <div className="text-sm text-red-600">{error}</div>
        ) : (
          <div className="space-y-2">
            {results.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between rounded-xl border p-3"
              >
                <div>
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className="text-xs text-zinc-500">{r.url}</div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-600">{r.ms}ms</span>

                  <span
                    className={[
                      "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
                      r.online
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-red-50 text-red-700 border-red-200",
                    ].join(" ")}
                  >
                    {r.online ? "Online" : "Offline"}
                  </span>

                  <a
                    href={r.url}
                    className="rounded-lg border px-2.5 py-1.5 text-xs font-medium hover:bg-white"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 text-xs text-zinc-600">
        Tip: add <span className="font-mono">/api/health</span> to each app for an even faster, cleaner ping.
      </div>
    </div>
  );
}

