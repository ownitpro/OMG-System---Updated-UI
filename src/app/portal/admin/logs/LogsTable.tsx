"use client";

import * as React from "react";
import type { AdminLog, LogLevel } from "@/lib/admin/mockLogs";
import { useTableDensity } from "@/lib/admin/useTableDensity";
import { useTableState } from "@/lib/admin/useTableState";
import { useTableScrollRestore } from "@/lib/admin/useTableScrollRestore";
import { useLastOpened } from "@/lib/admin/useLastOpened";

const levelOptions = ["all", "info", "warn", "error", "audit"] as const;
type LevelFilter = (typeof levelOptions)[number];

function levelPill(level: LogLevel) {
  const base = "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium";
  const styles =
    level === "error"
      ? "bg-red-50 text-red-700 border-red-200"
      : level === "warn"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : level === "audit"
      ? "bg-slate-50 text-slate-800 border-slate-200"
      : "bg-emerald-50 text-emerald-700 border-emerald-200";
  return `${base} ${styles}`;
}

function stopRowClick(e: React.MouseEvent) {
  e.stopPropagation();
}

function formatDate(ts: string): string {
  // Format date consistently to avoid hydration mismatches
  // Format: "MM/DD/YYYY, HH:MM:SS AM/PM"
  const d = new Date(ts);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  const hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${month}/${day}/${year}, ${displayHours}:${minutes}:${seconds} ${ampm}`;
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 900);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-lg border px-2.5 py-1.5 text-xs font-medium hover:bg-white"
      title={`Copy ${label}`}
    >
      {copied ? "Copied" : `Copy ${label}`}
    </button>
  );
}

export default function LogsTable({ initialLogs }: { initialLogs: AdminLog[] }) {
  const { state: ui, patch, reset } = useTableState("logs", {
    query: "",
    level: "all" as LevelFilter,
  });
  const { lastId, remember, clear } = useLastOpened("logs");
  const [selected, setSelected] = React.useState<AdminLog | null>(null);
  const [reopened, setReopened] = React.useState(false);
  const { density, isOverride, toggle, clearOverride } = useTableDensity("logs");
  const compact = density === "compact";
  const { scrollRef, resetScroll } = useTableScrollRestore("logs");

  const logs = React.useMemo(() => {
    return [...initialLogs].sort((a, b) => (a.ts < b.ts ? 1 : -1));
  }, [initialLogs]);

  const filtered = React.useMemo(() => {
    const q = ui.query.trim().toLowerCase();
    return logs
      .filter((l) => (ui.level === "all" ? true : l.level === ui.level))
      .filter((l) => {
        if (!q) return true;
        return (
          l.id.toLowerCase().includes(q) ||
          l.action.toLowerCase().includes(q) ||
          l.detail.toLowerCase().includes(q) ||
          l.actor.name.toLowerCase().includes(q) ||
          (l.actor.email ?? "").toLowerCase().includes(q)
        );
      });
  }, [logs, ui.query, ui.level]);

  // Auto-reopen last opened item on mount
  React.useEffect(() => {
    if (!lastId) return;

    const found = logs.find((l) => l.id === lastId);
    if (found) {
      setSelected(found);
      setReopened(true);
    }
  }, [lastId, logs]);

  return (
    <div className="rounded-xl border bg-white">
      {/* Controls */}
      <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
        <input
          value={ui.query}
          onChange={(e) => patch({ query: e.target.value })}
          placeholder="Search logs (id, action, actor, email)…"
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
        />

        <div className="flex items-center gap-2">
          <label className="text-sm text-zinc-600">Level</label>
          <select
            value={ui.level}
            onChange={(e) => patch({ level: e.target.value as LevelFilter })}
            className="rounded-lg border px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            <option value="info">Info</option>
            <option value="warn">Warn</option>
            <option value="error">Error</option>
            <option value="audit">Audit</option>
          </select>

          {/* Reset View */}
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
            title="Reset filters and sorting"
          >
            Reset view
          </button>

          {/* Back to Top */}
          <button
            type="button"
            onClick={resetScroll}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
            title="Back to top"
          >
            Back to top
          </button>

          {/* Density Controls */}
          <button
            type="button"
            onClick={toggle}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
            title="Toggle table density"
          >
            Density: {compact ? "Compact" : "Comfortable"}
          </button>

          {isOverride ? (
            <button
              type="button"
              onClick={clearOverride}
              className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
              title="Use global setting"
            >
              Use global
            </button>
          ) : null}
        </div>
      </div>

      {/* Table */}
      <div className={`overflow-x-auto ${compact ? "table-compact" : ""}`}>
        <div ref={scrollRef} className="max-h-[520px] overflow-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 border-t bg-slate-50 text-left">
              <tr className="text-xs uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Level</th>
                <th className="px-4 py-3">Actor</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Detail</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td className="px-4 py-12 text-center text-zinc-600" colSpan={6}>
                    No logs found. Try a different search.
                  </td>
                </tr>
              ) : (
                filtered.map((l) => (
                  <tr
                    key={l.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setSelected(l);
                      remember(l.id);
                      setReopened(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setSelected(l);
                        remember(l.id);
                        setReopened(false);
                      }
                    }}
                    className="group cursor-pointer border-t transition-colors hover:bg-slate-50/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                  >
                    <td className="px-4 py-3 text-zinc-600">{formatDate(l.ts)}</td>
                    <td className="px-4 py-3">
                      <span className={levelPill(l.level)}>{l.level.toUpperCase()}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{l.actor.name}</div>
                      <div className="text-xs text-zinc-500">{l.actor.email ?? l.actor.type}</div>
                    </td>
                    <td className="px-4 py-3 font-medium">{l.action}</td>
                    <td className="px-4 py-3 text-zinc-600">{l.detail}</td>
                    <td className="px-4 py-3 text-right" onClick={stopRowClick}>
                      <div className="flex items-center justify-end gap-2">
                        {/* fixed hint slot (no layout shift) */}
                        <span className="w-[92px] text-right text-xs text-slate-400">
                          <span className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-0">
                            ›
                          </span>
                          <span className="opacity-0 transition-opacity group-focus-visible:opacity-100 group-hover:opacity-0">
                            Enter to open
                          </span>
                        </span>
                        <CopyButton value={l.id} label="ID" />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      {selected ? (
        <div className="border-t bg-white p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Log details</div>
              <div className="mt-1 text-lg font-semibold">{selected.action}</div>
              <div className="mt-1 text-sm text-muted-foreground">
                {formatDate(selected.ts)} • {selected.actor.name}
              </div>

              <div className="mt-2 h-6">
                <span
                  className={[
                    "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
                    "transition-opacity",
                    reopened
                      ? "opacity-100 bg-slate-50 text-slate-700 border-slate-200"
                      : "opacity-0 pointer-events-none",
                  ].join(" ")}
                >
                  Restored
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelected(null);
                clear();
                setReopened(false);
              }}
              className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
            >
              Close
            </button>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border bg-slate-50 p-3">
              <div className="text-xs text-zinc-600">Level</div>
              <div className="mt-1">
                <span className={levelPill(selected.level)}>{selected.level.toUpperCase()}</span>
              </div>
            </div>

            <div className="rounded-xl border bg-slate-50 p-3">
              <div className="text-xs text-zinc-600">Log ID</div>
              <div className="mt-1 font-mono text-sm">{selected.id}</div>
            </div>

            <div className="rounded-xl border bg-slate-50 p-3 md:col-span-2">
              <div className="text-xs text-zinc-600">Detail</div>
              <div className="mt-1 text-sm">{selected.detail}</div>
            </div>

            {selected.meta ? (
              <div className="rounded-xl border bg-slate-50 p-3 md:col-span-2">
                <div className="text-xs text-zinc-600">Meta</div>
                <pre className="mt-2 overflow-auto rounded-lg border bg-white p-3 text-xs">
                  {JSON.stringify(selected.meta, null, 2)}
                </pre>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="flex items-center justify-between border-t p-4 text-xs text-zinc-600">
        <span>{filtered.length} result(s)</span>
        <span>Mocked (Week 1)</span>
      </div>
    </div>
  );
}

