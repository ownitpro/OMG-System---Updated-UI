"use client";

import * as React from "react";
import { MOCK_ORDERS } from "@/lib/admin/mockOrders";

type AdminOrder = (typeof MOCK_ORDERS)[number];

type ClientRow = {
  id: string;
  name: string;
  email: string;
  ordersCount: number;
  paidCount: number;
  lastOrderAt?: string;
};

function readMockOrders(): AdminOrder[] {
  try {
    const raw = localStorage.getItem("omg_mock_orders");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function buildClients(orders: AdminOrder[]): ClientRow[] {
  const map = new Map<string, ClientRow>();

  for (const o of orders) {
    const existing = map.get(o.client.id);

    const lastOrderAt =
      !existing?.lastOrderAt || o.createdAt > existing.lastOrderAt ? o.createdAt : existing.lastOrderAt;

    // Map status to "paid" for counting
    const isPaid = o.status === "paid" || o.status === "completed";

    map.set(o.client.id, {
      id: o.client.id,
      name: o.client.name,
      email: o.client.email,
      ordersCount: (existing?.ordersCount ?? 0) + 1,
      paidCount: (existing?.paidCount ?? 0) + (isPaid ? 1 : 0),
      lastOrderAt,
    });
  }

  return Array.from(map.values()).sort((a, b) => (a.lastOrderAt! < b.lastOrderAt! ? 1 : -1));
}

export default function ClientsTable() {
  const [query, setQuery] = React.useState("");
  const [rows, setRows] = React.useState<ClientRow[]>([]);

  React.useEffect(() => {
    const stored = readMockOrders();
    const combined = [...stored, ...MOCK_ORDERS];
    setRows(buildClients(combined));
  }, []);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;

    return rows.filter((c) => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      );
    });
  }, [rows, query]);

  return (
    <div className="rounded-xl border bg-white">
      <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email, or client ID…"
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
        />

        <div className="text-xs text-zinc-600">{filtered.length} client(s)</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-t bg-slate-50 text-left">
            <tr className="text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Client ID</th>
              <th className="px-4 py-3">Orders</th>
              <th className="px-4 py-3">Paid</th>
              <th className="px-4 py-3">Last order</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="px-4 py-12 text-center text-zinc-600" colSpan={6}>
                  No clients found. (Try adding a test order.)
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} className="border-t hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-zinc-600">{c.email}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{c.id}</td>
                  <td className="px-4 py-3">{c.ordersCount}</td>
                  <td className="px-4 py-3">{c.paidCount}</td>
                  <td className="px-4 py-3 text-zinc-600">
                    {c.lastOrderAt ? new Date(c.lastOrderAt).toLocaleString() : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a
                      href={`/portal/clients/${c.id}`}
                      className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-white"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t p-4 text-xs text-zinc-600">
        <span>Derived from orders (Week 1)</span>
        <span>Mocked</span>
      </div>
    </div>
  );
}

