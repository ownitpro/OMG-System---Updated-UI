"use client";

import * as React from "react";
import { useTableState } from "@/lib/admin/useTableState";
import { useTableDensity } from "@/lib/admin/useTableDensity";
import { useTableScrollRestore } from "@/lib/admin/useTableScrollRestore";
import {
  readAccessGrants,
  grantAccess,
  revokeGrant,
  entitlementKeyFromProductId,
  setLocalEntitlement,
  type AccessGrant,
} from "@/lib/admin/accessStore";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowPathIcon,
  ChevronUpIcon,
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

type SortKey = "createdAt" | "clientEmail" | "productId" | "status";
type SortDir = "desc" | "asc";
type StatusFilter = "all" | "active" | "revoked";
type SourceFilter = "all" | "purchase" | "admin" | "promo";

function stopRowClick(e: React.MouseEvent) {
  e.stopPropagation();
}

function compare(a: any, b: any) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function Pill({ tone, children }: { tone: "good" | "muted" | "warn"; children: React.ReactNode }) {
  const base = "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium";
  const cls =
    tone === "good"
      ? "bg-[#47BD79]/20 text-[#47BD79] border-[#47BD79]/30"
      : tone === "warn"
      ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
      : "bg-white/10 text-white/60 border-white/20";
  return <span className={`${base} ${cls}`}>{children}</span>;
}

function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl"
        style={{ boxShadow: "0 0 40px rgba(71, 189, 121, 0.15)" }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-lg font-semibold text-white">{title}</div>
            <div className="text-xs text-white/50">Week 1 local-only</div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/20 bg-white/5 p-2 text-white/70 hover:bg-white/10 hover:text-white transition-all"
            type="button"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

export default function AccessTable() {
  const { density, isOverride, toggle, clearOverride } = useTableDensity("admin-access");
  const compact = density === "compact";
  const { scrollRef, resetScroll } = useTableScrollRestore("admin-access");

  const { state: ui, patch, reset, ready } = useTableState("admin-access", {
    query: "",
    status: "all" as StatusFilter,
    source: "all" as SourceFilter,
    sortKey: "createdAt" as SortKey,
    sortDir: "desc" as SortDir,
  });

  const [rows, setRows] = React.useState<AccessGrant[]>([]);
  const [openGrant, setOpenGrant] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    function load() {
      setRows(readAccessGrants());
    }
    load();

    const onUpdated = () => load();
    window.addEventListener("omg-access-updated", onUpdated);
    window.addEventListener("storage", onUpdated);
    return () => {
      window.removeEventListener("omg-access-updated", onUpdated);
      window.removeEventListener("storage", onUpdated);
    };
  }, []);

  const filtered = React.useMemo(() => {
    const q = ui.query.trim().toLowerCase();
    const base = rows
      .filter((r) => (ui.status === "all" ? true : r.status === ui.status))
      .filter((r) => (ui.source === "all" ? true : r.source === ui.source))
      .filter((r) => {
        if (!q) return true;
        return (
          r.clientEmail.toLowerCase().includes(q) ||
          r.clientId.toLowerCase().includes(q) ||
          r.productId.toLowerCase().includes(q) ||
          r.entitlementKey.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q)
        );
      });

    const dir = ui.sortDir === "asc" ? 1 : -1;

    return base.sort((a, b) => {
      if (ui.sortKey === "createdAt") return compare(a.createdAt, b.createdAt) * dir;
      if (ui.sortKey === "clientEmail") return compare(a.clientEmail, b.clientEmail) * dir;
      if (ui.sortKey === "productId") return compare(a.productId, b.productId) * dir;
      return compare(a.status, b.status) * dir;
    });
  }, [rows, ui.query, ui.status, ui.source, ui.sortKey, ui.sortDir]);

  const activeCount = filtered.filter((r) => r.status === "active").length;

  function flash(text: string) {
    setMsg(text);
    window.setTimeout(() => setMsg(""), 1100);
  }

  // Grant form state
  const [gEmail, setGEmail] = React.useState("test@example.com");
  const [gClientId, setGClientId] = React.useState("cli_test");
  const [gProductId, setGProductId] = React.useState("securevault-docs");
  const [gSource, setGSource] = React.useState<"admin" | "promo" | "purchase">("admin");
  const [gNote, setGNote] = React.useState("");

  function createGrant() {
    const entitlementKey = entitlementKeyFromProductId(gProductId);
    grantAccess({
      clientEmail: gEmail.trim(),
      clientId: gClientId.trim(),
      productId: gProductId.trim(),
      entitlementKey,
      source: gSource,
      note: gNote.trim() || undefined,
    });

    // Week-1 mirror for the current browser user
    setLocalEntitlement(entitlementKey, true);

    setOpenGrant(false);
    setGNote("");
    flash("Access granted");
  }

  if (!ready) return null;

  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
      style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.1)" }}
    >
      {/* Controls */}
      <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              value={ui.query}
              onChange={(e) => patch({ query: e.target.value })}
              placeholder="Search email, client id, product, grant id…"
              className="w-full rounded-xl border border-white/20 bg-white/5 pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {msg ? <span className="text-xs text-[#47BD79]">{msg}</span> : null}

          <select
            value={ui.status}
            onChange={(e) => patch({ status: e.target.value as StatusFilter })}
            className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#3B82F6]/50"
            title="Status"
          >
            <option value="all" className="bg-zinc-900">All statuses</option>
            <option value="active" className="bg-zinc-900">Active</option>
            <option value="revoked" className="bg-zinc-900">Revoked</option>
          </select>

          <select
            value={ui.source}
            onChange={(e) => patch({ source: e.target.value as SourceFilter })}
            className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#3B82F6]/50"
            title="Source"
          >
            <option value="all" className="bg-zinc-900">All sources</option>
            <option value="purchase" className="bg-zinc-900">Purchase</option>
            <option value="admin" className="bg-zinc-900">Admin</option>
            <option value="promo" className="bg-zinc-900">Promo</option>
          </select>

          <select
            value={ui.sortKey}
            onChange={(e) => patch({ sortKey: e.target.value as SortKey })}
            className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#3B82F6]/50"
            title="Sort"
          >
            <option value="createdAt" className="bg-zinc-900">Date</option>
            <option value="clientEmail" className="bg-zinc-900">Email</option>
            <option value="productId" className="bg-zinc-900">Product</option>
            <option value="status" className="bg-zinc-900">Status</option>
          </select>

          <button
            type="button"
            onClick={() => patch({ sortDir: ui.sortDir === "desc" ? "asc" : "desc" })}
            className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
            title="Toggle direction"
          >
            {ui.sortDir === "desc" ? "Desc" : "Asc"}
          </button>

          <button
            type="button"
            onClick={() => setOpenGrant(true)}
            className="flex items-center gap-1.5 rounded-xl bg-[#47BD79] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3da86a] transition-all shadow-lg shadow-[#47BD79]/30"
          >
            <PlusIcon className="w-4 h-4" />
            Grant access
          </button>

          <button
            type="button"
            onClick={() => {
              reset();
              resetScroll();
              flash("View reset");
            }}
            className="flex items-center gap-1 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <ArrowPathIcon className="w-4 h-4" />
            Reset
          </button>

          <button
            type="button"
            onClick={toggle}
            className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
            title="Toggle density"
          >
            {compact ? "Compact" : "Comfortable"}
          </button>

          {isOverride ? (
            <button
              type="button"
              onClick={clearOverride}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
              title="Use global density"
            >
              Use global
            </button>
          ) : null}
        </div>
      </div>

      {/* Mini stats */}
      <div className="flex flex-wrap items-center gap-3 px-4 pb-3">
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
          <span className="text-sm text-white/50">Grants: </span>
          <span className="text-sm font-semibold text-white">{filtered.length}</span>
        </div>
        <div className="rounded-xl border border-[#47BD79]/30 bg-[#47BD79]/10 px-4 py-2">
          <span className="text-sm text-[#47BD79]/70">Active: </span>
          <span className="text-sm font-semibold text-[#47BD79]">{activeCount}</span>
        </div>
      </div>

      {/* Table */}
      <div className={`rounded-xl border border-white/10 mx-4 mb-4 overflow-hidden ${compact ? "table-compact" : ""}`}>
        <div className="overflow-x-auto">
          <div ref={scrollRef} className="max-h-[520px] overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 bg-white/5 backdrop-blur-sm">
                <tr className="text-xs uppercase tracking-wide text-white/50 border-b border-white/10">
                  <th className="px-4 py-3 text-left">Client</th>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Source</th>
                  <th className="px-4 py-3 text-left">Created</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-white/50">
                      No access grants yet. Click "Grant access" to create one.
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr
                      key={r.id}
                      className="group transition-colors hover:bg-white/5"
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">{r.clientEmail}</div>
                        <div className="text-xs text-white/50">{r.clientId}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">{r.productId}</div>
                        <div className="text-xs text-white/50 font-mono">{r.entitlementKey}</div>
                      </td>
                      <td className="px-4 py-3">
                        {r.status === "active" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#47BD79]/30 bg-[#47BD79]/20 px-2.5 py-1 text-xs font-medium text-[#47BD79]">
                            <CheckCircleIcon className="w-3 h-3" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium text-white/60">
                            <XCircleIcon className="w-3 h-3" />
                            Revoked
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Pill tone="muted">{r.source}</Pill>
                      </td>
                      <td className="px-4 py-3 text-white/60">
                        {new Date(r.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right" onClick={stopRowClick}>
                        <div className="flex items-center justify-end gap-2">
                          <span className="w-[92px] text-right text-xs text-white/30">
                            <span className="opacity-0 transition-opacity group-hover:opacity-100">›</span>
                          </span>

                          {r.status === "active" ? (
                            <button
                              type="button"
                              onClick={() => {
                                revokeGrant(r.id);
                                setLocalEntitlement(r.entitlementKey, false);
                                flash("Access revoked");
                              }}
                              className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20 transition-all"
                            >
                              Revoke
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                grantAccess({
                                  clientEmail: r.clientEmail,
                                  clientId: r.clientId,
                                  productId: r.productId,
                                  entitlementKey: r.entitlementKey,
                                  source: "admin",
                                  note: "Re-granted",
                                });
                                setLocalEntitlement(r.entitlementKey, true);
                                flash("Access re-granted");
                              }}
                              className="rounded-xl border border-[#47BD79]/30 bg-[#47BD79]/10 px-3 py-1.5 text-xs font-medium text-[#47BD79] hover:bg-[#47BD79]/20 transition-all"
                            >
                              Re-grant
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 p-4 text-xs text-white/40">
        <span>Stored in localStorage: <span className="font-mono text-white/60">omg_access_grants</span></span>
        <span>Mocked (Week 1)</span>
      </div>

      <Modal open={openGrant} title="Grant access" onClose={() => setOpenGrant(false)}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-xs text-white/50">Client email</label>
            <input
              value={gEmail}
              onChange={(e) => setGEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50 focus:ring-2 focus:ring-[#47BD79]/20"
              placeholder="client@email.com"
            />
          </div>

          <div>
            <label className="text-xs text-white/50">Client ID</label>
            <input
              value={gClientId}
              onChange={(e) => setGClientId(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50 focus:ring-2 focus:ring-[#47BD79]/20"
              placeholder="cli_123"
            />
          </div>

          <div>
            <label className="text-xs text-white/50">Source</label>
            <select
              value={gSource}
              onChange={(e) => setGSource(e.target.value as any)}
              className="mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#47BD79]/50"
            >
              <option value="admin" className="bg-zinc-900">Admin</option>
              <option value="promo" className="bg-zinc-900">Promo</option>
              <option value="purchase" className="bg-zinc-900">Purchase</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-white/50">Product ID</label>
            <input
              value={gProductId}
              onChange={(e) => setGProductId(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50 focus:ring-2 focus:ring-[#47BD79]/20"
              placeholder="securevault-docs"
            />
            <div className="mt-2 text-xs text-white/50">
              Entitlement key will be: <span className="font-mono text-[#47BD79]">{entitlementKeyFromProductId(gProductId)}</span>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-white/50">Note (optional)</label>
            <input
              value={gNote}
              onChange={(e) => setGNote(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50 focus:ring-2 focus:ring-[#47BD79]/20"
              placeholder="Why was access granted?"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setOpenGrant(false)}
            className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={createGrant}
            className="rounded-xl bg-[#47BD79] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3da86a] transition-all shadow-lg shadow-[#47BD79]/30"
          >
            Grant Access
          </button>
        </div>
      </Modal>
    </div>
  );
}
