"use client";

import * as React from "react";
import { PortalShell } from "@/components/PortalShell";
import { getAdminNav } from "@/config/portalNav";
import { MOCK_ORDERS } from "@/lib/admin/mockOrders";
import { useTableDensity } from "@/lib/admin/useTableDensity";
import { useTableState } from "@/lib/admin/useTableState";
import { useTableScrollRestore } from "@/lib/admin/useTableScrollRestore";

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
  // "Good news first" ordering when sorting by status
  // (you can change this anytime)
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

// Map mock order status to filter status
function mapStatusToFilter(status: string): StatusFilter {
  if (status === "completed" || status === "paid") return "paid";
  if (status === "pending") return "pending";
  if (status === "cancelled" || status === "failed") return "failed";
  if (status === "refunded") return "refunded";
  return "all";
}

// Dev-only helpers for test orders
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
    completed: "bg-green-100 text-green-800 border-green-200",
    paid: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
    failed: "bg-red-100 text-red-800 border-red-200",
    refunded: "bg-gray-100 text-gray-800 border-gray-200",
  };
  
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs ${variant ? colors[variant] : ""}`}>
      {children}
    </span>
  );
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <span className="ml-1 text-slate-300">↕</span>;
  return <span className="ml-1">{dir === "desc" ? "↓" : "↑"}</span>;
}

function CopyOrderIdButton({ id }: { id: string }) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 900);
    } catch {
      // silently fail for now (rare)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-lg border px-2.5 py-1.5 text-xs font-medium hover:bg-white"
      title="Copy order ID"
    >
      {copied ? "Copied" : "Copy ID"}
    </button>
  );
}

function stopRowClick(e: React.MouseEvent) {
  e.stopPropagation();
}

export default function AdminOrdersPage() {
  const nav = getAdminNav();
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
    // If clicking the same column, flip direction. Otherwise default to desc.
    if (ui.sortKey === nextKey) {
      patch({ sortDir: ui.sortDir === "desc" ? "asc" : "desc" });
    } else {
      patch({ sortKey: nextKey, sortDir: "desc" });
    }
  }

  // Merge localStorage orders with initial orders on mount
  React.useEffect(() => {
    const stored = readMockOrders();
    if (stored.length) {
      setOrders([...stored, ...MOCK_ORDERS]);
    } else {
      setOrders(MOCK_ORDERS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter orders based on selected status and query, then sort
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
      // status
      return compare(statusRank(a.status), statusRank(b.status)) * dir;
    });
  }, [orders, ui.query, ui.status, ui.sortKey, ui.sortDir]);

  // Compute mini stats
  const paidTotalCents = filtered
    .filter((o) => mapStatusToFilter(o.status) === "paid")
    .reduce((sum, o) => sum + o.amountCents, 0);

  const currency = filtered[0]?.currency ?? "USD";

  return (
    <PortalShell role="admin" title="Orders" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <div className="text-2xl font-semibold">Orders (Mock)</div>
          <div className="mt-1 text-sm text-zinc-600">
            Week 1: mock data table. Week 2: Stripe events/webhooks.
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            value={ui.query}
            onChange={(e) => patch({ query: e.target.value })}
            placeholder="Search by order ID, client name, email, or product…"
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* Quick Filter Chips + Sort Controls + Dev Tools */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {/* Sort Controls */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Sort</label>

            <select
              value={ui.sortKey}
              onChange={(e) => patch({ sortKey: e.target.value as SortKey })}
              className="rounded-lg border px-3 py-2 text-sm"
            >
              <option value="createdAt">Date</option>
              <option value="amount">Amount</option>
              <option value="status">Status</option>
            </select>

            <button
              type="button"
              onClick={() => patch({ sortDir: ui.sortDir === "desc" ? "asc" : "desc" })}
              className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
              title={ui.sortDir === "desc" ? "Descending" : "Ascending"}
            >
              {ui.sortKey === "createdAt"
                ? ui.sortDir === "desc"
                  ? "Newest"
                  : "Oldest"
                : ui.sortDir === "desc"
                ? "High → Low"
                : "Low → High"}
            </button>
          </div>

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
          <div className="flex items-center gap-2">
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

          {statusOptions.map((s) => {
            const active = ui.status === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => patch({ status: s })}
                className={[
                  "rounded-full border px-3 py-1.5 text-xs font-medium",
                  active ? "bg-black text-white border-black" : "bg-white hover:bg-slate-50",
                ].join(" ")}
              >
                {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            );
          })}

          {isDev() ? (
            <>
              <button
                type="button"
                onClick={() => {
                  const current = readMockOrders();
                  const next = [makeTestOrder(), ...current].slice(0, 50);
                  writeMockOrders(next);
                  setOrders([...next, ...MOCK_ORDERS]);
                }}
                className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
              >
                + Create test order
              </button>
              <button
                type="button"
                onClick={() => {
                  writeMockOrders([]);
                  setOrders(MOCK_ORDERS);
                }}
                className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
              >
                Clear test orders
              </button>
            </>
          ) : null}
        </div>

        {/* Mini Stats Row */}
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="rounded-lg border bg-white px-3 py-1.5">
            Orders: <span className="font-medium text-black">{filtered.length}</span>
          </span>

          <span className="rounded-lg border bg-white px-3 py-1.5">
            Paid total: <span className="font-medium text-black">{money(paidTotalCents, currency)}</span>
          </span>
        </div>

        <div className={`overflow-x-auto ${compact ? "table-compact" : ""}`}>
          <div ref={scrollRef} className="max-h-[520px] overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 border-t bg-slate-50 text-left">
                <tr className="border-b border-zinc-200">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-zinc-600">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-zinc-600">Product</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-zinc-600">Client</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-zinc-600">
                  <button
                    type="button"
                    onClick={() => setSort("status")}
                    className="inline-flex items-center gap-1 hover:text-black"
                  >
                    Status
                    <SortIcon active={ui.sortKey === "status"} dir={ui.sortDir} />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-zinc-600">
                  <button
                    type="button"
                    onClick={() => setSort("amount")}
                    className="inline-flex items-center gap-1 hover:text-black"
                  >
                    Amount
                    <SortIcon active={ui.sortKey === "amount"} dir={ui.sortDir} />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-zinc-600">
                  <button
                    type="button"
                    onClick={() => setSort("createdAt")}
                    className="inline-flex items-center gap-1 hover:text-black"
                  >
                    Created
                    <SortIcon active={ui.sortKey === "createdAt"} dir={ui.sortDir} />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-zinc-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12">
                    <div className="mx-auto max-w-md rounded-xl border bg-white p-6 text-center">
                      <div className="text-base font-semibold">No orders yet</div>
                      <p className="mt-2 text-sm text-zinc-600">
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
                            className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
                          >
                            Create a test order
                          </button>
                          <a href="/products/plans" className="rounded-lg bg-black px-3 py-2 text-sm text-white">
                            View plans
                          </a>
                        </div>
                      ) : (
                        <div className="mt-4">
                          <a href="/products/plans" className="rounded-lg bg-black px-3 py-2 text-sm text-white">
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
                    className="group cursor-pointer border-t transition-colors hover:bg-slate-50/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                  >
                    <td className="px-4 py-3 font-medium">
                      <div className="flex items-center gap-2" onClick={stopRowClick}>
                        <span>{order.id}</span>
                        <CopyOrderIdButton id={order.id} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-700">{order.productName}</td>
                    <td className="px-4 py-3 text-sm text-zinc-700">
                      <div>{order.client.name}</div>
                      <div className="text-xs text-zinc-500">{order.client.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={order.status as any}>{order.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">{money(order.amountCents, order.currency)}</td>
                    <td className="px-4 py-3 text-sm text-zinc-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right" onClick={stopRowClick}>
                      <div className="flex items-center justify-end gap-2">
                        {/* Fixed-width slot so nothing shifts */}
                        <span className="w-[92px] text-right text-xs text-slate-400">
                          <span className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-0">
                            ›
                          </span>
                          <span className="opacity-0 transition-opacity group-focus-visible:opacity-100 group-hover:opacity-0">
                            Enter to open
                          </span>
                        </span>

                        <a
                          href={`/portal/orders/${order.id}`}
                          className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-white"
                        >
                          View
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
    </PortalShell>
  );
}
