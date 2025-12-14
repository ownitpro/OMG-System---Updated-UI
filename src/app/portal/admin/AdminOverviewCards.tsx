"use client";

import * as React from "react";
import { MOCK_ORDERS } from "@/lib/admin/mockOrders";
import { MOCK_LOGS } from "@/lib/admin/mockLogs";

type AdminOrder = (typeof MOCK_ORDERS)[number];

function readMockOrders(): AdminOrder[] {
  try {
    const raw = localStorage.getItem("omg_mock_orders");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function readEntitlementsCount(): number {
  try {
    const raw = localStorage.getItem("omg_entitlements");
    const obj = raw ? JSON.parse(raw) : {};
    return Object.values(obj).filter(Boolean).length;
  } catch {
    return 0;
  }
}

function cardClass() {
  return "rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md";
}

function hintClass() {
  return "mt-1 text-xs text-zinc-600";
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <div className="text-sm font-medium">{label}</div>
      <div className={hintClass()}>{value}</div>
    </div>
  );
}

export default function AdminOverviewCards() {
  const [ordersCount, setOrdersCount] = React.useState(0);
  const [paidTotal, setPaidTotal] = React.useState("$0.00");
  const [clientsCount, setClientsCount] = React.useState(0);
  const [logsCount, setLogsCount] = React.useState(0);
  const [entitlementsCount, setEntitlementsCount] = React.useState(0);

  React.useEffect(() => {
    const stored = readMockOrders();
    const orders = [...stored, ...MOCK_ORDERS];

    setOrdersCount(orders.length);

    const paidCents = orders
      .filter((o) => o.status === "paid" || o.status === "completed")
      .reduce((sum, o) => sum + o.amountCents, 0);

    const currency = orders[0]?.currency ?? "USD";
    setPaidTotal(
      new Intl.NumberFormat(undefined, { style: "currency", currency }).format(paidCents / 100)
    );

    const clientIds = new Set(orders.map((o) => o.client.id));
    setClientsCount(clientIds.size);

    // Logs are mock-only for now (Week 1)
    setLogsCount(MOCK_LOGS.length);

    // Entitlements are localStorage-based (Week 1)
    setEntitlementsCount(readEntitlementsCount());
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {/* Orders */}
      <a href="/portal/admin/orders" className={cardClass()}>
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Orders</div>
          <span className="text-slate-400">›</span>
        </div>
        <div className="mt-4 grid gap-3">
          <Stat label="Total orders" value={ordersCount} />
          <Stat label="Paid total" value={paidTotal} />
        </div>
      </a>

      {/* Clients */}
      <a href="/portal/admin/clients" className={cardClass()}>
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Clients</div>
          <span className="text-slate-400">›</span>
        </div>
        <div className="mt-4 grid gap-3">
          <Stat label="Unique clients" value={clientsCount} />
          <Stat label="Active entitlements" value={entitlementsCount} />
        </div>
      </a>

      {/* Logs */}
      <a href="/portal/admin/logs" className={cardClass()}>
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Logs</div>
          <span className="text-slate-400">›</span>
        </div>
        <div className="mt-4 grid gap-3">
          <Stat label="Entries (mock)" value={logsCount} />
          <div className={hintClass()}>Search + open details</div>
        </div>
      </a>

      {/* Settings */}
      <a href="/portal/admin/settings" className={cardClass()}>
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Settings</div>
          <span className="text-slate-400">›</span>
        </div>
        <div className="mt-4 grid gap-3">
          <div className="text-sm font-medium">Admin preferences</div>
          <div className={hintClass()}>Dev Tools toggle, table density, currency</div>
        </div>
      </a>
    </div>
  );
}

