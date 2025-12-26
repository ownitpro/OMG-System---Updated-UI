"use client";

import * as React from "react";
import type { AdminLog, LogLevel } from "@/lib/admin/mockLogs";
import { useTableDensity } from "@/lib/admin/useTableDensity";
import { useTableState } from "@/lib/admin/useTableState";
import { useTableScrollRestore } from "@/lib/admin/useTableScrollRestore";
import { useLastOpened } from "@/lib/admin/useLastOpened";
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ChevronUpIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const levelOptions = ["all", "info", "warn", "error", "audit"] as const;
type LevelFilter = (typeof levelOptions)[number];

function levelPill(level: LogLevel) {
  const base = "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium";
  const styles =
    level === "error"
      ? "bg-red-500/20 text-red-400 border-red-500/30"
      : level === "warn"
      ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
      : level === "audit"
      ? "bg-white/10 text-white/70 border-white/20"
      : "bg-[#47BD79]/20 text-[#47BD79] border-[#47BD79]/30";
  return `${base} ${styles}`;
}

function stopRowClick(e: React.MouseEvent) {
  e.stopPropagation();
}

function formatDate(ts: string): string {
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
      className="flex items-center gap-1 rounded-xl border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
      title={`Copy ${label}`}
    >
      {copied ? (
        <>
          <CheckIcon className="w-3 h-3 text-[#47BD79]" />
          Copied
        </>
      ) : (
        <>
          <ClipboardDocumentIcon className="w-3 h-3" />
          Copy {label}
        </>
      )}
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

  React.useEffect(() => {
    if (!lastId) return;

    const found = logs.find((l) => l.id === lastId);
    if (found) {
      setSelected(found);
      setReopened(true);
    }
  }, [lastId, logs]);

  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
      style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.1)" }}
    >
      {/* Controls */}
      <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            value={ui.query}
            onChange={(e) => patch({ query: e.target.value })}
            placeholder="Search logs (id, action, actor, email)…"
            className="w-full rounded-xl border border-white/20 bg-white/5 pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-white/50">Level</span>
          <select
            value={ui.level}
            onChange={(e) => patch({ level: e.target.value as LevelFilter })}
            className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#3B82F6]/50"
          >
            <option value="all" className="bg-zinc-900">All</option>
            <option value="info" className="bg-zinc-900">Info</option>
            <option value="warn" className="bg-zinc-900">Warn</option>
            <option value="error" className="bg-zinc-900">Error</option>
            <option value="audit" className="bg-zinc-900">Audit</option>
          </select>

          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-1 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <ArrowPathIcon className="w-4 h-4" />
            Reset
          </button>

          <button
            type="button"
            onClick={resetScroll}
            className="flex items-center gap-1 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <ChevronUpIcon className="w-4 h-4" />
            Top
          </button>

          <button
            type="button"
            onClick={toggle}
            className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            {compact ? "Compact" : "Comfortable"}
          </button>

          {isOverride ? (
            <button
              type="button"
              onClick={clearOverride}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Use global
            </button>
          ) : null}
        </div>
      </div>

      {/* Table */}
      <div className={`rounded-xl border border-white/10 mx-4 mb-4 overflow-hidden ${compact ? "table-compact" : ""}`}>
        <div ref={scrollRef} className="max-h-[520px] overflow-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-white/5 backdrop-blur-sm">
              <tr className="text-xs uppercase tracking-wide text-white/50 border-b border-white/10">
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Level</th>
                <th className="px-4 py-3 text-left">Actor</th>
                <th className="px-4 py-3 text-left">Action</th>
                <th className="px-4 py-3 text-left">Detail</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td className="px-4 py-12 text-center text-white/50" colSpan={6}>
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
                    className="group cursor-pointer transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/30"
                  >
                    <td className="px-4 py-3 text-white/60">{formatDate(l.ts)}</td>
                    <td className="px-4 py-3">
                      <span className={levelPill(l.level)}>{l.level.toUpperCase()}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">{l.actor.name}</div>
                      <div className="text-xs text-white/50">{l.actor.email ?? l.actor.type}</div>
                    </td>
                    <td className="px-4 py-3 font-medium text-white">{l.action}</td>
                    <td className="px-4 py-3 text-white/60">{l.detail}</td>
                    <td className="px-4 py-3 text-right" onClick={stopRowClick}>
                      <div className="flex items-center justify-end gap-2">
                        <span className="w-[92px] text-right text-xs text-white/30">
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
        <div className="border-t border-white/10 bg-white/5 p-4 mx-4 mb-4 rounded-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-white/50">Log details</div>
              <div className="mt-1 text-lg font-semibold text-white">{selected.action}</div>
              <div className="mt-1 text-sm text-white/60">
                {formatDate(selected.ts)} • {selected.actor.name}
              </div>

              <div className="mt-2 h-6">
                <span
                  className={[
                    "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
                    "transition-opacity",
                    reopened
                      ? "opacity-100 bg-white/10 text-white/70 border-white/20"
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
              className="rounded-xl border border-white/20 bg-white/5 p-2 text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-xs text-white/50">Level</div>
              <div className="mt-1">
                <span className={levelPill(selected.level)}>{selected.level.toUpperCase()}</span>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-xs text-white/50">Log ID</div>
              <div className="mt-1 font-mono text-sm text-white">{selected.id}</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3 md:col-span-2">
              <div className="text-xs text-white/50">Detail</div>
              <div className="mt-1 text-sm text-white">{selected.detail}</div>
            </div>

            {selected.meta ? (
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 md:col-span-2">
                <div className="text-xs text-white/50">Meta</div>
                <pre className="mt-2 overflow-auto rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-white/80">
                  {JSON.stringify(selected.meta, null, 2)}
                </pre>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="flex items-center justify-between border-t border-white/10 p-4 text-xs text-white/40">
        <span>{filtered.length} result(s)</span>
        <span>Mocked (Week 1)</span>
      </div>
    </div>
  );
}
