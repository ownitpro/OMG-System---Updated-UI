"use client";

import * as React from "react";
import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getAdminNavV2 } from "@/config/portalNav";
import { MOCK_ORDERS } from "@/lib/admin/mockOrders";
import { useTableDensity } from "@/lib/admin/useTableDensity";
import { useTableState } from "@/lib/admin/useTableState";
import { useTableScrollRestore } from "@/lib/admin/useTableScrollRestore";
import {
  ShoppingCartIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  PlusIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

const statusOptions = ["all", "paid", "pending", "failed", "refunded"] as const;
type StatusFilter = (typeof statusOptions)[number];

type SortKey = "createdAt" | "amount" | "status";
type SortDir = "desc" | "asc";

const sortLabels: Record<SortKey, string> = {
  createdAt: "Date",
  amount: "Amount",
  status: "Status",
};

function money(amountCents: number, currency: string) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amountCents / 100);
}

function compare(a: any, b: any) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function statusRank(status: string) {
  switch (status) {
    case "paid":
    case "completed":
      return 1;
    case "pending":
      return 2;
    case "refunded":
      return 3;
    case "failed":
    case "cancelled":
      return 4;
    default:
      return 99;
  }
}

function mapStatusToFilter(status: string): StatusFilter {
  if (status === "completed" || status === "paid") return "paid";
  if (status === "pending") return "pending";
  if (status === "cancelled" || status === "failed") return "failed";
  if (status === "refunded") return "refunded";
  return "all";
}

function readMockOrders(): any[] {
  try {
    const raw = localStorage.getItem("omg_mock_orders");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeMockOrders(orders: any[]) {
  localStorage.setItem("omg_mock_orders", JSON.stringify(orders));
}

function isDev() {
  return process.env.NEXT_PUBLIC_ENV === "dev" || process.env.NODE_ENV === "development";
}

function makeTestOrder() {
  const id = `ord_${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date().toISOString();
  const statuses = ["paid", "pending", "failed", "refunded"] as const;
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  return {
    id,
    createdAt: now,
    client: {
      id: "cli_test",
      name: "Test Client",
      email: "test@example.com",
    },
    productId: "securevault-docs",
    productName: "SecureVault Docs (SVD)",
    amountCents: 4900,
    currency: "USD",
    status,
    source: "mock_stripe",
  };
}

function Badge({ children, variant }: { children: React.ReactNode; variant?: "completed" | "pending" | "cancelled" | "refunded" | "paid" | "failed" }) {
  const colors = {
    completed: "bg-[#47BD79]/20 text-[#47BD79] border-[#47BD79]/30",
    paid: "bg-[#47BD79]/20 text-[#47BD79] border-[#47BD79]/30",
    pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
    failed: "bg-red-500/20 text-red-400 border-red-500/30",
    refunded: "bg-white/10 text-white/60 border-white/20",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${variant ? colors[variant] : ""}`}>
      {children}
    </span>
  );
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <span className="ml-1 text-white/30">↕</span>;
  return <span className="ml-1 text-[#47BD79]">{dir === "desc" ? "↓" : "↑"}</span>;
}

function CopyOrderIdButton({ id }: { id: string }) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 900);
    } catch {
      // silently fail
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-lg border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
      title="Copy order ID"
    >
      {copied ? (
        <span className="flex items-center gap-1">
          <CheckIcon className="w-3 h-3 text-[#47BD79]" />
          Copied
        </span>
      ) : (
        <span className="flex items-center gap-1">
          <ClipboardDocumentIcon className="w-3 h-3" />
          Copy
        </span>
      )}
    </button>
  );
}

function stopRowClick(e: React.MouseEvent) {
  e.stopPropagation();
}

export default function AdminOrdersPage() {
  const nav = getAdminNavV2();
  const { state: ui, patch, reset, ready } = useTableState("orders", {
    query: "",
    status: "all" as StatusFilter,
    sortKey: "createdAt" as SortKey,
    sortDir: "desc" as SortDir,
  });
  const [orders, setOrders] = React.useState(MOCK_ORDERS);
  const { density, isOverride, toggle, clearOverride } = useTableDensity("orders");
  const compact = density === "compact";
  const { scrollRef, resetScroll } = useTableScrollRestore("orders");

  function setSort(nextKey: SortKey) {
    if (ui.sortKey === nextKey) {
      patch({ sortDir: ui.sortDir === "desc" ? "asc" : "desc" });
    } else {
      patch({ sortKey: nextKey, sortDir: "desc" });
    }
  }

  React.useEffect(() => {
    const stored = readMockOrders();
    if (stored.length) {
      setOrders([...stored, ...MOCK_ORDERS]);
    } else {
      setOrders(MOCK_ORDERS);
    }
  }, []);

  const filtered = React.useMemo(() => {
    const q = ui.query.trim().toLowerCase();

    const base = orders
      .filter((o) => (ui.status === "all" ? true : mapStatusToFilter(o.status) === ui.status))
      .filter((o) => {
        if (!q) return true;
        return (
          o.id.toLowerCase().includes(q) ||
          o.client.name.toLowerCase().includes(q) ||
          o.client.email.toLowerCase().includes(q) ||
          o.productName.toLowerCase().includes(q)
        );
      });

    const dir = ui.sortDir === "asc" ? 1 : -1;

    return base.sort((a, b) => {
      if (ui.sortKey === "createdAt") {
        return compare(a.createdAt, b.createdAt) * dir;
      }
      if (ui.sortKey === "amount") {
        return compare(a.amountCents, b.amountCents) * dir;
      }
      return compare(statusRank(a.status), statusRank(b.status)) * dir;
    });
  }, [orders, ui.query, ui.status, ui.sortKey, ui.sortDir]);

  const paidTotalCents = filtered
    .filter((o) => mapStatusToFilter(o.status) === "paid")
    .reduce((sum, o) => sum + o.amountCents, 0);

  const currency = filtered[0]?.currency ?? "USD";

  return (
    <PortalShellV2 role="admin" title="Orders" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
        style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.1)" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
            <ShoppingCartIcon className="w-5 h-5 text-[#47BD79]" />
          </div>
          <div>
            <div className="text-xl font-semibold text-white">Orders (Mock)</div>
            <div className="text-sm text-white/60">
              Week 1: mock data table. Week 2: Stripe events/webhooks.
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              value={ui.query}
              onChange={(e) => patch({ query: e.target.value })}
              placeholder="Search by order ID, client name, email, or product…"
              className="w-full rounded-xl border border-white/20 bg-white/5 pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50 focus:ring-2 focus:ring-[#47BD79]/20 transition-all"
            />
          </div>
        </div>

        {/* Controls Row */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {/* Sort Controls */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/50">Sort</span>
            <select
              value={ui.sortKey}
              onChange={(e) => patch({ sortKey: e.target.value as SortKey })}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#47BD79]/50"
            >
              <option value="createdAt" className="bg-zinc-900">Date</option>
              <option value="amount" className="bg-zinc-900">Amount</option>
              <option value="status" className="bg-zinc-900">Status</option>
            </select>

            <button
              type="button"
              onClick={() => patch({ sortDir: ui.sortDir === "desc" ? "asc" : "desc" })}
              className="flex items-center gap-1 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              {ui.sortDir === "desc" ? (
                <ChevronDownIcon className="w-4 h-4" />
              ) : (
                <ChevronUpIcon className="w-4 h-4" />
              )}
              {ui.sortKey === "createdAt"
                ? ui.sortDir === "desc" ? "Newest" : "Oldest"
                : ui.sortDir === "desc" ? "High → Low" : "Low → High"}
            </button>
          </div>

          {/* Action Buttons */}
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

          {isOverride && (
            <button
              type="button"
              onClick={clearOverride}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Use global
            </button>
          )}
        </div>

        {/* Status Filter Pills */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {statusOptions.map((s) => {
            const active = ui.status === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => patch({ status: s })}
                className={`rounded-full px-4 py-2 text-xs font-medium border transition-all ${
                  active
                    ? "bg-[#47BD79]/20 text-[#47BD79] border-[#47BD79]/30"
                    : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            );
          })}

          {isDev() && (
            <>
              <button
                type="button"
                onClick={() => {
                  const current = readMockOrders();
                  const next = [makeTestOrder(), ...current].slice(0, 50);
                  writeMockOrders(next);
                  setOrders([...next, ...MOCK_ORDERS]);
                }}
                className="flex items-center gap-1.5 rounded-xl border border-[#47BD79]/30 bg-[#47BD79]/10 px-3 py-2 text-sm font-medium text-[#47BD79] hover:bg-[#47BD79]/20 transition-all"
              >
                <PlusIcon className="w-4 h-4" />
                Add test order
              </button>
              <button
                type="button"
                onClick={() => {
                  writeMockOrders([]);
                  setOrders(MOCK_ORDERS);
                }}
                className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20 transition-all"
              >
                <TrashIcon className="w-4 h-4" />
                Clear test
              </button>
            </>
          )}
        </div>

        {/* Stats Row */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
            <span className="text-sm text-white/50">Orders: </span>
            <span className="text-sm font-semibold text-white">{filtered.length}</span>
          </div>
          <div className="rounded-xl border border-[#47BD79]/30 bg-[#47BD79]/10 px-4 py-2">
            <span className="text-sm text-[#47BD79]/70">Paid total: </span>
            <span className="text-sm font-semibold text-[#47BD79]">{money(paidTotalCents, currency)}</span>
          </div>
        </div>

        {/* Table */}
        <div className={`overflow-x-auto rounded-xl border border-white/10 ${compact ? "table-compact" : ""}`}>
          <div ref={scrollRef} className="max-h-[520px] overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 bg-white/5 backdrop-blur-sm">
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">Client</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">
                    <button
                      type="button"
                      onClick={() => setSort("status")}
                      className="inline-flex items-center gap-1 hover:text-white transition-colors"
                    >
                      Status
                      <SortIcon active={ui.sortKey === "status"} dir={ui.sortDir} />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">
                    <button
                      type="button"
                      onClick={() => setSort("amount")}
                      className="inline-flex items-center gap-1 hover:text-white transition-colors"
                    >
                      Amount
                      <SortIcon active={ui.sortKey === "amount"} dir={ui.sortDir} />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">
                    <button
                      type="button"
                      onClick={() => setSort("createdAt")}
                      className="inline-flex items-center gap-1 hover:text-white transition-colors"
                    >
                      Created
                      <SortIcon active={ui.sortKey === "createdAt"} dir={ui.sortDir} />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12">
                      <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                        <div className="text-base font-semibold text-white">No orders yet</div>
                        <p className="mt-2 text-sm text-white/60">
                          Once a client buys a product, their order will show up here.
                        </p>

                        {isDev() ? (
                          <div className="mt-4 flex justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const current = readMockOrders();
                                const next = [makeTestOrder(), ...current].slice(0, 50);
                                writeMockOrders(next);
                                setOrders([...next, ...MOCK_ORDERS]);
                              }}
                              className="flex items-center gap-1.5 rounded-xl border border-[#47BD79]/30 bg-[#47BD79]/10 px-3 py-2 text-sm font-medium text-[#47BD79] hover:bg-[#47BD79]/20 transition-all"
                            >
                              <PlusIcon className="w-4 h-4" />
                              Create test order
                            </button>
                            <a
                              href="/products/plans"
                              className="rounded-xl bg-[#47BD79] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3da86a] transition-all"
                            >
                              View plans
                            </a>
                          </div>
                        ) : (
                          <div className="mt-4">
                            <a
                              href="/products/plans"
                              className="rounded-xl bg-[#47BD79] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3da86a] transition-all"
                            >
                              View plans
                            </a>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((order) => (
                    <tr
                      key={order.id}
                      role="link"
                      tabIndex={0}
                      aria-label={`Open order ${order.id}`}
                      onClick={() => (window.location.href = `/portal/orders/${order.id}`)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          window.location.href = `/portal/orders/${order.id}`;
                        }
                      }}
                      className="group cursor-pointer transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#47BD79]/30"
                    >
                      <td className="px-4 py-3 font-medium text-white">
                        <div className="flex items-center gap-2" onClick={stopRowClick}>
                          <span className="font-mono text-sm">{order.id}</span>
                          <CopyOrderIdButton id={order.id} />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-white/70">{order.productName}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="text-white">{order.client.name}</div>
                        <div className="text-xs text-white/50">{order.client.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={order.status as any}>{order.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-white">{money(order.amountCents, order.currency)}</td>
                      <td className="px-4 py-3 text-sm text-white/60">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
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

                          <a
                            href={`/portal/orders/${order.id}`}
                            className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
                          >
                            View
                            <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                          </a>
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
    </PortalShellV2>
  );
}
