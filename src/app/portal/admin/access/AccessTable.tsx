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
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : tone === "warn"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-slate-50 text-slate-700 border-slate-200";
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
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-xl rounded-2xl border bg-white p-4 shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-lg font-semibold">{title}</div>
            <div className="text-xs text-muted-foreground">Week 1 local-only</div>
          </div>
          <button onClick={onClose} className="rounded-lg border px-3 py-2 text-sm hover:bg-white" type="button">
            Close
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
    <div className="rounded-xl border bg-white">
      {/* Controls */}
      <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 gap-2">
          <input
            value={ui.query}
            onChange={(e) => patch({ query: e.target.value })}
            placeholder="Search email, client id, product, grant id…"
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {msg ? <span className="text-xs text-muted-foreground">{msg}</span> : null}

          <select
            value={ui.status}
            onChange={(e) => patch({ status: e.target.value as StatusFilter })}
            className="rounded-lg border px-3 py-2 text-sm"
            title="Status"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="revoked">Revoked</option>
          </select>

          <select
            value={ui.source}
            onChange={(e) => patch({ source: e.target.value as SourceFilter })}
            className="rounded-lg border px-3 py-2 text-sm"
            title="Source"
          >
            <option value="all">All sources</option>
            <option value="purchase">Purchase</option>
            <option value="admin">Admin</option>
            <option value="promo">Promo</option>
          </select>

          <select
            value={ui.sortKey}
            onChange={(e) => patch({ sortKey: e.target.value as SortKey })}
            className="rounded-lg border px-3 py-2 text-sm"
            title="Sort"
          >
            <option value="createdAt">Date</option>
            <option value="clientEmail">Email</option>
            <option value="productId">Product</option>
            <option value="status">Status</option>
          </select>

          <button
            type="button"
            onClick={() => patch({ sortDir: ui.sortDir === "desc" ? "asc" : "desc" })}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
            title="Toggle direction"
          >
            {ui.sortDir === "desc" ? "Desc" : "Asc"}
          </button>

          <button
            type="button"
            onClick={() => setOpenGrant(true)}
            className="rounded-lg bg-black px-3 py-2 text-sm text-white"
          >
            + Grant access
          </button>

          <button
            type="button"
            onClick={() => {
              reset();
              resetScroll();
              flash("View reset");
            }}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
          >
            Reset view
          </button>

          <button
            type="button"
            onClick={toggle}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
            title="Toggle density"
          >
            Density: {compact ? "Compact" : "Comfortable"}
          </button>

          {isOverride ? (
            <button
              type="button"
              onClick={clearOverride}
              className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
              title="Use global density"
            >
              Use global
            </button>
          ) : null}
        </div>
      </div>

      {/* Mini stats */}
      <div className="flex flex-wrap items-center gap-3 px-4 pb-3 text-sm text-muted-foreground">
        <span className="rounded-lg border bg-white px-3 py-1.5">
          Grants: <span className="font-medium text-black">{filtered.length}</span>
        </span>
        <span className="rounded-lg border bg-white px-3 py-1.5">
          Active: <span className="font-medium text-black">{activeCount}</span>
        </span>
      </div>

      {/* Table */}
      <div className={compact ? "table-compact" : ""}>
        <div className="overflow-x-auto">
          <div ref={scrollRef} className="max-h-[520px] overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 border-t bg-slate-50 text-left">
                <tr className="text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                      No access grants yet. Click "Grant access" to create one.
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr
                      key={r.id}
                      className="group border-t transition-colors hover:bg-slate-50/80"
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium">{r.clientEmail}</div>
                        <div className="text-xs text-muted-foreground">{r.clientId}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{r.productId}</div>
                        <div className="text-xs text-muted-foreground">{r.entitlementKey}</div>
                      </td>
                      <td className="px-4 py-3">
                        {r.status === "active" ? <Pill tone="good">Active</Pill> : <Pill tone="muted">Revoked</Pill>}
                      </td>
                      <td className="px-4 py-3">
                        <Pill tone="muted">{r.source}</Pill>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(r.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right" onClick={stopRowClick}>
                        <div className="flex items-center justify-end gap-2">
                          <span className="w-[92px] text-right text-xs text-slate-400">
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
                              className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-white"
                            >
                              Revoke
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                // re-grant by creating new grant entry (audit-friendly)
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
                              className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-white"
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

      <div className="flex items-center justify-between border-t p-4 text-xs text-muted-foreground">
        <span>Stored in localStorage: <span className="font-mono">omg_access_grants</span></span>
        <span>Mocked (Week 1)</span>
      </div>

      <Modal open={openGrant} title="Grant access" onClose={() => setOpenGrant(false)}>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-xs text-muted-foreground">Client email</label>
            <input
              value={gEmail}
              onChange={(e) => setGEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="client@email.com"
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Client ID</label>
            <input
              value={gClientId}
              onChange={(e) => setGClientId(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="cli_123"
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Source</label>
            <select
              value={gSource}
              onChange={(e) => setGSource(e.target.value as any)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            >
              <option value="admin">Admin</option>
              <option value="promo">Promo</option>
              <option value="purchase">Purchase</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-muted-foreground">Product ID</label>
            <input
              value={gProductId}
              onChange={(e) => setGProductId(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="securevault-docs"
            />
            <div className="mt-1 text-xs text-muted-foreground">
              Entitlement key will be: <span className="font-mono">{entitlementKeyFromProductId(gProductId)}</span>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-muted-foreground">Note (optional)</label>
            <input
              value={gNote}
              onChange={(e) => setGNote(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="Why was access granted?"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setOpenGrant(false)}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={createGrant}
            className="rounded-lg bg-black px-3 py-2 text-sm text-white"
          >
            Grant
          </button>
        </div>
      </Modal>
    </div>
  );
}

