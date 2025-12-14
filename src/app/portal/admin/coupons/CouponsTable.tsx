"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTableState } from "@/lib/admin/useTableState";
import { useTableDensity } from "@/lib/admin/useTableDensity";
import { useTableScrollRestore } from "@/lib/admin/useTableScrollRestore";
import { upsertCoupon, readCoupons, toggleCoupon, type Coupon } from "@/lib/admin/couponStore";

type SortKey = "createdAt" | "code" | "percentOff" | "enabled";
type SortDir = "desc" | "asc";
type EnabledFilter = "all" | "enabled" | "disabled";

function stopRowClick(e: React.MouseEvent) {
  e.stopPropagation();
}

function compare(a: any, b: any) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function Pill({ on, children }: { on: boolean; children: React.ReactNode }) {
  const base = "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium";
  const cls = on
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : "bg-slate-50 text-slate-700 border-slate-200";
  return <span className={`${base} ${cls}`}>{children}</span>;
}

function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 900);
    } catch {}
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-lg border px-2.5 py-1.5 text-xs font-medium hover:bg-white"
      title="Copy code"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
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

export default function CouponsTable() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const editCode = searchParams.get("edit"); // e.g. OMG10
  const suggest = searchParams.get("suggest"); // e.g. +5

  const { density, isOverride, toggle, clearOverride } = useTableDensity("admin-coupons");
  const compact = density === "compact";
  const { scrollRef, resetScroll } = useTableScrollRestore("admin-coupons");

  const { state: ui, patch, reset, ready } = useTableState("admin-coupons", {
    query: "",
    enabled: "all" as EnabledFilter,
    sortKey: "createdAt" as SortKey,
    sortDir: "desc" as SortDir,
  });

  const [rows, setRows] = React.useState<Coupon[]>([]);
  const [openNew, setOpenNew] = React.useState(false);
  const [editId, setEditId] = React.useState<string | null>(null);
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    function load() {
      setRows(readCoupons());
    }
    load();

    const onUpdated = () => load();
    window.addEventListener("omg-coupons-updated", onUpdated);
    window.addEventListener("storage", onUpdated);
    return () => {
      window.removeEventListener("omg-coupons-updated", onUpdated);
      window.removeEventListener("storage", onUpdated);
    };
  }, []);

  function flash(text: string) {
    setMsg(text);
    window.setTimeout(() => setMsg(""), 1100);
  }

  const filtered = React.useMemo(() => {
    const q = ui.query.trim().toLowerCase();
    const base = rows
      .filter((c) => (ui.enabled === "all" ? true : ui.enabled === "enabled" ? c.enabled : !c.enabled))
      .filter((c) => {
        if (!q) return true;
        return (
          c.code.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q) ||
          (c.note ?? "").toLowerCase().includes(q)
        );
      });

    const dir = ui.sortDir === "asc" ? 1 : -1;

    return base.sort((a, b) => {
      if (ui.sortKey === "createdAt") return compare(a.createdAt, b.createdAt) * dir;
      if (ui.sortKey === "code") return compare(a.code, b.code) * dir;
      if (ui.sortKey === "percentOff") return compare(a.percentOff, b.percentOff) * dir;
      return compare(Number(a.enabled), Number(b.enabled)) * dir;
    });
  }, [rows, ui.query, ui.enabled, ui.sortKey, ui.sortDir]);

  // New coupon form state
  const [code, setCode] = React.useState("OMG10");
  const [percentOff, setPercentOff] = React.useState(10);
  const [enabled, setEnabled] = React.useState(true);
  const [appliesTo, setAppliesTo] = React.useState<"all" | "list">("all");
  const [productList, setProductList] = React.useState("securevault-docs,omg-crm");
  const [maxRedemptions, setMaxRedemptions] = React.useState<string>("");

  // Handle edit mode from URL
  React.useEffect(() => {
    if (!editCode) return;

    const codeUpper = editCode.toUpperCase();
    const existing = readCoupons().find((c) => c.code.toUpperCase() === codeUpper);

    if (!existing) {
      setMsg(`Coupon ${codeUpper} not found`);
      window.setTimeout(() => setMsg(""), 1200);
      return;
    }

    setEditId(existing.id);
    setOpenNew(true);

    // preload form fields
    setCode(existing.code);
    setPercentOff(existing.percentOff);
    setEnabled(existing.enabled);

    if (existing.appliesTo === "all") {
      setAppliesTo("all");
    } else {
      setAppliesTo("list");
      setProductList((existing.appliesTo as string[]).join(","));
    }

    setMaxRedemptions(existing.maxRedemptions ? String(existing.maxRedemptions) : "");

    // suggestion: bump % by +5 (gentle prompt)
    if (suggest === "+5") {
      setPercentOff((p) => Math.min(100, Number(p) + 5));
      setMsg("Suggestion applied: +5% off");
      window.setTimeout(() => setMsg(""), 1200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editCode]);

  function saveCoupon() {
    const list =
      appliesTo === "all"
        ? "all"
        : productList
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);

    const payload: Coupon = {
      id: editId ?? `cpn_${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: editId ? (readCoupons().find((c) => c.id === editId)?.createdAt ?? new Date().toISOString()) : new Date().toISOString(),
      redeemedCount: editId ? (readCoupons().find((c) => c.id === editId)?.redeemedCount ?? 0) : 0,

      code: code.trim().toUpperCase(),
      enabled,
      percentOff: Math.max(0, Math.min(100, Number(percentOff) || 0)),
      appliesTo: list,
      maxRedemptions: maxRedemptions.trim() ? Number(maxRedemptions) : undefined,
      note: undefined,
    };

    upsertCoupon(payload);

    setOpenNew(false);
    setEditId(null);
    setMsg(editId ? "Coupon updated" : "Coupon created");
    window.setTimeout(() => setMsg(""), 1100);

    // clean URL so refresh doesn't re-open modal
    router.replace("/portal/admin/coupons");
  }

  if (!ready) return null;

  return (
    <div className="rounded-xl border bg-white">
      {/* Controls */}
      <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
        <input
          value={ui.query}
          onChange={(e) => patch({ query: e.target.value })}
          placeholder="Search coupon code or id…"
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
        />

        <div className="flex flex-wrap items-center gap-2">
          {msg ? <span className="text-xs text-muted-foreground">{msg}</span> : null}

          <select
            value={ui.enabled}
            onChange={(e) => patch({ enabled: e.target.value as EnabledFilter })}
            className="rounded-lg border px-3 py-2 text-sm"
            title="Enabled"
          >
            <option value="all">All</option>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>

          <select
            value={ui.sortKey}
            onChange={(e) => patch({ sortKey: e.target.value as SortKey })}
            className="rounded-lg border px-3 py-2 text-sm"
            title="Sort"
          >
            <option value="createdAt">Date</option>
            <option value="code">Code</option>
            <option value="percentOff">% Off</option>
            <option value="enabled">Enabled</option>
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
            onClick={() => setOpenNew(true)}
            className="rounded-lg bg-black px-3 py-2 text-sm text-white"
          >
            + New coupon
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

      {/* Table */}
      <div className={compact ? "table-compact" : ""}>
        <div className="overflow-x-auto">
          <div ref={scrollRef} className="max-h-[520px] overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 border-t bg-slate-50 text-left">
                <tr className="text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">% Off</th>
                  <th className="px-4 py-3">Applies to</th>
                  <th className="px-4 py-3">Redemptions</th>
                  <th className="px-4 py-3">Enabled</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                      No coupons yet. Click "New coupon" to create one.
                    </td>
                  </tr>
                ) : (
                  filtered.map((c) => (
                    <tr
                      key={c.id}
                      className="group cursor-pointer border-t transition-colors hover:bg-slate-50/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium">{c.code}</div>
                        <div className="text-xs text-muted-foreground">{c.id}</div>
                      </td>
                      <td className="px-4 py-3 font-medium">{c.percentOff}%</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {c.appliesTo === "all" ? "All products" : (c.appliesTo as string[]).join(", ")}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {c.redeemedCount}
                        {c.maxRedemptions ? ` / ${c.maxRedemptions}` : ""}
                      </td>
                      <td className="px-4 py-3">
                        <Pill on={c.enabled}>{c.enabled ? "Enabled" : "Disabled"}</Pill>
                      </td>
                      <td className="px-4 py-3 text-right" onClick={stopRowClick}>
                        <div className="flex items-center justify-end gap-2">
                          <span className="w-[110px] text-right text-xs text-slate-400">
                            {/* Hover chevron */}
                            <span className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-0">
                              ›
                            </span>

                            {/* Keyboard hint */}
                            <span className="opacity-0 transition-opacity group-focus-visible:opacity-100 group-hover:opacity-0">
                              Enter to edit
                            </span>
                          </span>

                          <CopyCode code={c.code} />

                          <a
                            href={`/portal/admin/coupons?edit=${encodeURIComponent(c.code)}`}
                            className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-white"
                            title="Edit coupon"
                          >
                            Edit
                          </a>

                          <button
                            type="button"
                            onClick={() => {
                              toggleCoupon(c.id, !c.enabled);
                              flash(c.enabled ? "Coupon disabled" : "Coupon enabled");
                            }}
                            className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-white"
                          >
                            {c.enabled ? "Disable" : "Enable"}
                          </button>
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
        <span>Stored in localStorage: <span className="font-mono">omg_coupons</span></span>
        <span>Mocked (Week 1)</span>
      </div>

      <Modal
        open={openNew}
        title={editId ? "Edit coupon" : "Create coupon"}
        onClose={() => {
          setOpenNew(false);
          setEditId(null);
          router.replace("/portal/admin/coupons");
        }}
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-xs text-muted-foreground">Code</label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="OMG10"
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Percent off</label>
            <input
              value={percentOff}
              onChange={(e) => setPercentOff(Number(e.target.value))}
              type="number"
              min={0}
              max={100}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Enabled</label>
            <select
              value={enabled ? "yes" : "no"}
              onChange={(e) => setEnabled(e.target.value === "yes")}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            >
              <option value="yes">Enabled</option>
              <option value="no">Disabled</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Max redemptions (optional)</label>
            <input
              value={maxRedemptions}
              onChange={(e) => setMaxRedemptions(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-muted-foreground">Applies to</label>
            <div className="mt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAppliesTo("all")}
                className={`rounded-lg border px-3 py-2 text-sm hover:bg-white ${
                  appliesTo === "all" ? "bg-black text-white border-black" : ""
                }`}
              >
                All products
              </button>
              <button
                type="button"
                onClick={() => setAppliesTo("list")}
                className={`rounded-lg border px-3 py-2 text-sm hover:bg-white ${
                  appliesTo === "list" ? "bg-black text-white border-black" : ""
                }`}
              >
                Specific products
              </button>
            </div>

            {appliesTo === "list" ? (
              <div className="mt-2">
                <input
                  value={productList}
                  onChange={(e) => setProductList(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="securevault-docs,omg-crm"
                />
                <div className="mt-1 text-xs text-muted-foreground">Comma-separated product IDs</div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setOpenNew(false)}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
          >
            Cancel
          </button>
          <button type="button" onClick={saveCoupon} className="rounded-lg bg-black px-3 py-2 text-sm text-white">
            {editId ? "Save" : "Create"}
          </button>
        </div>
      </Modal>
    </div>
  );
}

