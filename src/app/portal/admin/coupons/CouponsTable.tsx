"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTableState } from "@/lib/admin/useTableState";
import { useTableDensity } from "@/lib/admin/useTableDensity";
import { useTableScrollRestore } from "@/lib/admin/useTableScrollRestore";
import { upsertCoupon, readCoupons, toggleCoupon, deleteCoupon, getCouponStats, type Coupon } from "@/lib/admin/couponStore";
import { readClients, PRODUCTS, type Client, type Product } from "@/lib/admin/clientStore";
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ChevronUpDownIcon,
  PlusIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  XMarkIcon,
  TagIcon,
  UserGroupIcon,
  CubeIcon,
  TrashIcon,
  ChartBarIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

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
    ? "bg-[#47BD79]/20 text-[#47BD79] border-[#47BD79]/30"
    : "bg-white/10 text-white/50 border-white/20";
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
      className="flex items-center gap-1 rounded-xl border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
      title="Copy code"
    >
      {copied ? (
        <>
          <CheckIcon className="w-3 h-3 text-[#47BD79]" />
          Copied
        </>
      ) : (
        <>
          <ClipboardDocumentIcon className="w-3 h-3" />
          Copy
        </>
      )}
    </button>
  );
}

function Modal({
  open,
  title,
  children,
  onClose,
  size = "xl",
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  size?: "md" | "xl" | "2xl" | "3xl";
}) {
  if (!open) return null;
  const sizeClass = {
    md: "max-w-md",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
  }[size];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative w-full ${sizeClass} rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl max-h-[90vh] overflow-y-auto`}
        style={{ boxShadow: "0 0 40px rgba(71, 189, 121, 0.15)" }}
      >
        <div className="flex items-start justify-between gap-3 sticky top-0 bg-zinc-900 pb-4 -mt-2 pt-2 -mx-6 px-6 border-b border-white/10">
          <div>
            <div className="text-lg font-semibold text-white">{title}</div>
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

function MultiSelect({
  label,
  icon: Icon,
  items,
  selected,
  onChange,
  renderItem,
  idKey = "id",
  color,
}: {
  label: string;
  icon: React.ElementType;
  items: any[];
  selected: string[];
  onChange: (ids: string[]) => void;
  renderItem: (item: any) => { name: string; sub?: string };
  idKey?: string;
  color: string;
}) {
  const [search, setSearch] = React.useState("");

  const filtered = items.filter((item) => {
    const { name, sub } = renderItem(item);
    const q = search.toLowerCase();
    return name.toLowerCase().includes(q) || (sub?.toLowerCase().includes(q) ?? false);
  });

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  const selectAll = () => onChange(items.map((i) => i[idKey]));
  const clearAll = () => onChange([]);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color }} />
          <span className="text-sm font-medium text-white">{label}</span>
          <span className="text-xs text-white/40">({selected.length} selected)</span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={selectAll}
            className="text-xs text-white/50 hover:text-white transition-colors"
          >
            All
          </button>
          <span className="text-white/20">|</span>
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-white/50 hover:text-white transition-colors"
          >
            None
          </button>
        </div>
      </div>

      <div className="relative mb-3">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
        />
      </div>

      <div className="max-h-40 overflow-y-auto space-y-1">
        {filtered.map((item) => {
          const { name, sub } = renderItem(item);
          const id = item[idKey];
          const isSelected = selected.includes(id);

          return (
            <button
              key={id}
              type="button"
              onClick={() => toggle(id)}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-all ${
                isSelected
                  ? "bg-white/10 border border-white/20"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                  isSelected
                    ? "border-[#47BD79] bg-[#47BD79]"
                    : "border-white/20 bg-white/5"
                }`}
              >
                {isSelected && <CheckIcon className="w-3 h-3 text-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white truncate">{name}</div>
                {sub && <div className="text-xs text-white/40 truncate">{sub}</div>}
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center text-sm text-white/40 py-4">No items found</div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: React.ElementType; color: string }) {
  return (
    <div
      className="rounded-xl border border-white/10 bg-white/5 p-4"
      style={{ boxShadow: `0 0 20px ${color}10` }}
    >
      <div className="flex items-center gap-2 text-xs text-white/50">
        <Icon className="w-4 h-4" style={{ color }} />
        {label}
      </div>
      <div className="mt-1 text-xl font-bold" style={{ color }}>
        {value}
      </div>
    </div>
  );
}

export default function CouponsTable() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const editCode = searchParams.get("edit");
  const suggest = searchParams.get("suggest");

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
  const [clients, setClients] = React.useState<Client[]>([]);
  const [openNew, setOpenNew] = React.useState(false);
  const [editId, setEditId] = React.useState<string | null>(null);
  const [msg, setMsg] = React.useState("");
  const [stats, setStats] = React.useState({ totalCoupons: 0, activeCoupons: 0, totalRedemptions: 0, avgDiscount: 0 });
  const [confirmDelete, setConfirmDelete] = React.useState<string | null>(null);

  React.useEffect(() => {
    function load() {
      setRows(readCoupons());
      setClients(readClients());
      setStats(getCouponStats());
    }
    load();

    const onUpdated = () => load();
    window.addEventListener("omg-coupons-updated", onUpdated);
    window.addEventListener("omg-clients-updated", onUpdated);
    window.addEventListener("storage", onUpdated);
    return () => {
      window.removeEventListener("omg-coupons-updated", onUpdated);
      window.removeEventListener("omg-clients-updated", onUpdated);
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

  // Form state
  const [code, setCode] = React.useState("OMG10");
  const [discountType, setDiscountType] = React.useState<"percent" | "fixed">("percent");
  const [percentOff, setPercentOff] = React.useState(10);
  const [amountOffCents, setAmountOffCents] = React.useState(500); // $5.00
  const [enabled, setEnabled] = React.useState(true);
  const [appliesTo, setAppliesTo] = React.useState<"all" | "list">("all");
  const [selectedProducts, setSelectedProducts] = React.useState<string[]>([]);
  const [assignedTo, setAssignedTo] = React.useState<"all" | "list">("all");
  const [selectedClients, setSelectedClients] = React.useState<string[]>([]);
  const [maxRedemptions, setMaxRedemptions] = React.useState<string>("");
  const [startsAt, setStartsAt] = React.useState<string>("");
  const [endsAt, setEndsAt] = React.useState<string>("");
  const [note, setNote] = React.useState<string>("");

  // Reset form
  function resetForm() {
    setCode("OMG10");
    setDiscountType("percent");
    setPercentOff(10);
    setAmountOffCents(500);
    setEnabled(true);
    setAppliesTo("all");
    setSelectedProducts([]);
    setAssignedTo("all");
    setSelectedClients([]);
    setMaxRedemptions("");
    setStartsAt("");
    setEndsAt("");
    setNote("");
    setEditId(null);
  }

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
    loadCouponToForm(existing);

    if (suggest === "+5") {
      setPercentOff((p) => Math.min(100, Number(p) + 5));
      setMsg("Suggestion applied: +5% off");
      window.setTimeout(() => setMsg(""), 1200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editCode]);

  function loadCouponToForm(coupon: Coupon) {
    setCode(coupon.code);
    setDiscountType(coupon.discountType || "percent");
    setPercentOff(coupon.percentOff);
    setAmountOffCents(coupon.amountOffCents || 500);
    setEnabled(coupon.enabled);

    if (coupon.appliesTo === "all") {
      setAppliesTo("all");
      setSelectedProducts([]);
    } else {
      setAppliesTo("list");
      setSelectedProducts(coupon.appliesTo as string[]);
    }

    if (coupon.assignedTo === "all") {
      setAssignedTo("all");
      setSelectedClients([]);
    } else {
      setAssignedTo("list");
      setSelectedClients(coupon.assignedTo as string[]);
    }

    setMaxRedemptions(coupon.maxRedemptions ? String(coupon.maxRedemptions) : "");
    setStartsAt(coupon.startsAt ? coupon.startsAt.slice(0, 16) : "");
    setEndsAt(coupon.endsAt ? coupon.endsAt.slice(0, 16) : "");
    setNote(coupon.note || "");
  }

  function saveCoupon() {
    const payload: Coupon = {
      id: editId ?? `cpn_${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: editId ? (readCoupons().find((c) => c.id === editId)?.createdAt ?? new Date().toISOString()) : new Date().toISOString(),
      redeemedCount: editId ? (readCoupons().find((c) => c.id === editId)?.redeemedCount ?? 0) : 0,
      code: code.trim().toUpperCase(),
      enabled,
      discountType,
      percentOff: discountType === "percent" ? Math.max(0, Math.min(100, Number(percentOff) || 0)) : 0,
      amountOffCents: discountType === "fixed" ? Math.max(0, Number(amountOffCents) || 0) : undefined,
      appliesTo: appliesTo === "all" ? "all" : selectedProducts,
      assignedTo: assignedTo === "all" ? "all" : selectedClients,
      maxRedemptions: maxRedemptions.trim() ? Number(maxRedemptions) : undefined,
      startsAt: startsAt ? new Date(startsAt).toISOString() : undefined,
      endsAt: endsAt ? new Date(endsAt).toISOString() : undefined,
      note: note.trim() || undefined,
    };

    upsertCoupon(payload);

    setOpenNew(false);
    resetForm();
    setMsg(editId ? "Coupon updated" : "Coupon created");
    window.setTimeout(() => setMsg(""), 1100);

    router.replace("/portal/admin/coupons");
  }

  function handleDelete(id: string) {
    deleteCoupon(id);
    setConfirmDelete(null);
    flash("Coupon deleted");
  }

  function getClientNames(ids: string[]): string {
    return ids
      .slice(0, 3)
      .map((id) => clients.find((c) => c.id === id)?.name || id)
      .join(", ") + (ids.length > 3 ? ` +${ids.length - 3} more` : "");
  }

  function getProductNames(ids: string[]): string {
    return ids
      .slice(0, 3)
      .map((id) => PRODUCTS.find((p) => p.id === id)?.name || id)
      .join(", ") + (ids.length > 3 ? ` +${ids.length - 3} more` : "");
  }

  if (!ready) return null;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total Coupons" value={stats.totalCoupons} icon={TagIcon} color="#47BD79" />
        <StatCard label="Active" value={stats.activeCoupons} icon={CheckIcon} color="#3B82F6" />
        <StatCard label="Total Redemptions" value={stats.totalRedemptions} icon={ChartBarIcon} color="#A855F7" />
        <StatCard label="Avg Discount" value={`${stats.avgDiscount}%`} icon={CubeIcon} color="#F59E0B" />
      </div>

      <div
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
        style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.1)" }}
      >
        {/* Controls */}
        <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              value={ui.query}
              onChange={(e) => patch({ query: e.target.value })}
              placeholder="Search coupon code or id..."
              className="w-full rounded-xl border border-white/20 bg-white/5 pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50 focus:ring-2 focus:ring-[#47BD79]/20 transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {msg ? <span className="text-xs text-[#47BD79]">{msg}</span> : null}

            <select
              value={ui.enabled}
              onChange={(e) => patch({ enabled: e.target.value as EnabledFilter })}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#47BD79]/50"
              title="Enabled"
            >
              <option value="all" className="bg-zinc-900">All</option>
              <option value="enabled" className="bg-zinc-900">Enabled</option>
              <option value="disabled" className="bg-zinc-900">Disabled</option>
            </select>

            <select
              value={ui.sortKey}
              onChange={(e) => patch({ sortKey: e.target.value as SortKey })}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#47BD79]/50"
              title="Sort"
            >
              <option value="createdAt" className="bg-zinc-900">Date</option>
              <option value="code" className="bg-zinc-900">Code</option>
              <option value="percentOff" className="bg-zinc-900">% Off</option>
              <option value="enabled" className="bg-zinc-900">Enabled</option>
            </select>

            <button
              type="button"
              onClick={() => patch({ sortDir: ui.sortDir === "desc" ? "asc" : "desc" })}
              className="flex items-center gap-1 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
              title="Toggle direction"
            >
              <ChevronUpDownIcon className="w-4 h-4" />
              {ui.sortDir === "desc" ? "Desc" : "Asc"}
            </button>

            <button
              type="button"
              onClick={() => {
                resetForm();
                setOpenNew(true);
              }}
              className="flex items-center gap-1 rounded-xl bg-[#47BD79] px-4 py-2 text-sm font-medium text-white hover:bg-[#3da968] transition-all"
            >
              <PlusIcon className="w-4 h-4" />
              New coupon
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

        {/* Table */}
        <div className={`rounded-xl border border-white/10 mx-4 mb-4 overflow-hidden ${compact ? "table-compact" : ""}`}>
          <div ref={scrollRef} className="max-h-[520px] overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 bg-white/5 backdrop-blur-sm">
                <tr className="text-xs uppercase tracking-wide text-white/50 border-b border-white/10">
                  <th className="px-4 py-3 text-left">Code</th>
                  <th className="px-4 py-3 text-left">Discount</th>
                  <th className="px-4 py-3 text-left">Products</th>
                  <th className="px-4 py-3 text-left">Clients</th>
                  <th className="px-4 py-3 text-left">Redemptions</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-white/50">
                      No coupons yet. Click "New coupon" to create one.
                    </td>
                  </tr>
                ) : (
                  filtered.map((c) => (
                    <tr
                      key={c.id}
                      className="group cursor-pointer transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#47BD79]/30"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-[#47BD79]/20 flex items-center justify-center">
                            <TagIcon className="w-4 h-4 text-[#47BD79]" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{c.code}</div>
                            <div className="text-xs text-white/40">{c.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-white">
                          {c.discountType === "fixed" && c.amountOffCents
                            ? `$${(c.amountOffCents / 100).toFixed(2)} off`
                            : `${c.percentOff}% off`}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <CubeIcon className="w-4 h-4 text-[#3B82F6]" />
                          <span className="text-white/60 text-xs">
                            {c.appliesTo === "all"
                              ? "All products"
                              : getProductNames(c.appliesTo as string[])}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <UserGroupIcon className="w-4 h-4 text-[#A855F7]" />
                          <span className="text-white/60 text-xs">
                            {c.assignedTo === "all"
                              ? "All clients"
                              : getClientNames(c.assignedTo as string[])}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white/60">
                        {c.redeemedCount}
                        {c.maxRedemptions ? ` / ${c.maxRedemptions}` : ""}
                      </td>
                      <td className="px-4 py-3">
                        <Pill on={c.enabled}>{c.enabled ? "Enabled" : "Disabled"}</Pill>
                      </td>
                      <td className="px-4 py-3 text-right" onClick={stopRowClick}>
                        <div className="flex items-center justify-end gap-2">
                          <CopyCode code={c.code} />

                          <button
                            type="button"
                            onClick={() => {
                              loadCouponToForm(c);
                              setEditId(c.id);
                              setOpenNew(true);
                            }}
                            className="rounded-xl border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
                            title="Edit coupon"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              toggleCoupon(c.id, !c.enabled);
                              flash(c.enabled ? "Coupon disabled" : "Coupon enabled");
                            }}
                            className="rounded-xl border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
                          >
                            {c.enabled ? "Disable" : "Enable"}
                          </button>

                          <button
                            type="button"
                            onClick={() => setConfirmDelete(c.id)}
                            className="rounded-xl border border-red-500/30 bg-red-500/10 px-2 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20 transition-all"
                            title="Delete coupon"
                          >
                            <TrashIcon className="w-3.5 h-3.5" />
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

        <div className="flex items-center justify-between border-t border-white/10 p-4 text-xs text-white/40">
          <span>Stored in localStorage: <span className="font-mono">omg_coupons</span></span>
          <span>{filtered.length} coupon{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {/* Create/Edit Modal */}
        <Modal
          open={openNew}
          title={editId ? "Edit Coupon" : "Create New Coupon"}
          onClose={() => {
            setOpenNew(false);
            resetForm();
            router.replace("/portal/admin/coupons");
          }}
          size="3xl"
        >
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="text-xs text-white/50 mb-1 block">Coupon Code</label>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50"
                  placeholder="OMG10"
                />
              </div>

              <div>
                <label className="text-xs text-white/50 mb-1 block">Discount Type</label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as "percent" | "fixed")}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-[#47BD79]/50"
                >
                  <option value="percent" className="bg-zinc-900">Percentage Off</option>
                  <option value="fixed" className="bg-zinc-900">Fixed Amount Off</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-white/50 mb-1 block">
                  {discountType === "percent" ? "Percent Off" : "Amount Off ($)"}
                </label>
                {discountType === "percent" ? (
                  <input
                    value={percentOff}
                    onChange={(e) => setPercentOff(Number(e.target.value))}
                    type="number"
                    min={0}
                    max={100}
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-[#47BD79]/50"
                  />
                ) : (
                  <input
                    value={(amountOffCents / 100).toFixed(2)}
                    onChange={(e) => setAmountOffCents(Math.round(parseFloat(e.target.value || "0") * 100))}
                    type="number"
                    min={0}
                    step={0.01}
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-[#47BD79]/50"
                  />
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="text-xs text-white/50 mb-1 block">Status</label>
                <select
                  value={enabled ? "enabled" : "disabled"}
                  onChange={(e) => setEnabled(e.target.value === "enabled")}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-[#47BD79]/50"
                >
                  <option value="enabled" className="bg-zinc-900">Enabled</option>
                  <option value="disabled" className="bg-zinc-900">Disabled</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-white/50 mb-1 block">Max Redemptions (optional)</label>
                <input
                  value={maxRedemptions}
                  onChange={(e) => setMaxRedemptions(e.target.value)}
                  type="number"
                  min={1}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50"
                  placeholder="Unlimited"
                />
              </div>

              <div>
                <label className="text-xs text-white/50 mb-1 block">Note (optional)</label>
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50"
                  placeholder="Internal note..."
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="flex items-center gap-2 text-xs text-white/50 mb-1">
                  <CalendarDaysIcon className="w-4 h-4" />
                  Start Date (optional)
                </label>
                <input
                  type="datetime-local"
                  value={startsAt}
                  onChange={(e) => setStartsAt(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-[#47BD79]/50"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs text-white/50 mb-1">
                  <CalendarDaysIcon className="w-4 h-4" />
                  End Date (optional)
                </label>
                <input
                  type="datetime-local"
                  value={endsAt}
                  onChange={(e) => setEndsAt(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-[#47BD79]/50"
                />
              </div>
            </div>

            {/* Product Targeting */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <CubeIcon className="w-4 h-4 text-[#3B82F6]" />
                  <span className="text-sm font-medium text-white">Product Targeting</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAppliesTo("all")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      appliesTo === "all"
                        ? "bg-[#3B82F6] text-white"
                        : "border border-white/20 bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    All Products
                  </button>
                  <button
                    type="button"
                    onClick={() => setAppliesTo("list")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      appliesTo === "list"
                        ? "bg-[#3B82F6] text-white"
                        : "border border-white/20 bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    Specific Products
                  </button>
                </div>
              </div>

              {appliesTo === "list" && (
                <MultiSelect
                  label="Select Products"
                  icon={CubeIcon}
                  items={PRODUCTS}
                  selected={selectedProducts}
                  onChange={setSelectedProducts}
                  renderItem={(p: Product) => ({ name: p.name, sub: `$${(p.priceCents / 100).toFixed(2)}` })}
                  color="#3B82F6"
                />
              )}
            </div>

            {/* Client Targeting */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <UserGroupIcon className="w-4 h-4 text-[#A855F7]" />
                  <span className="text-sm font-medium text-white">Client Targeting</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAssignedTo("all")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      assignedTo === "all"
                        ? "bg-[#A855F7] text-white"
                        : "border border-white/20 bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    All Clients
                  </button>
                  <button
                    type="button"
                    onClick={() => setAssignedTo("list")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      assignedTo === "list"
                        ? "bg-[#A855F7] text-white"
                        : "border border-white/20 bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    Specific Clients
                  </button>
                </div>
              </div>

              {assignedTo === "list" && (
                <MultiSelect
                  label="Select Clients"
                  icon={UserGroupIcon}
                  items={clients}
                  selected={selectedClients}
                  onChange={setSelectedClients}
                  renderItem={(c: Client) => ({ name: c.name, sub: c.email })}
                  color="#A855F7"
                />
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setOpenNew(false);
                  resetForm();
                }}
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveCoupon}
                className="rounded-xl bg-[#47BD79] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#3da968] transition-all"
              >
                {editId ? "Save Changes" : "Create Coupon"}
              </button>
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          open={!!confirmDelete}
          title="Delete Coupon?"
          onClose={() => setConfirmDelete(null)}
          size="md"
        >
          <div className="space-y-4">
            <p className="text-white/60">
              Are you sure you want to delete this coupon? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => confirmDelete && handleDelete(confirmDelete)}
                className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
