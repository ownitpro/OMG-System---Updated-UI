"use client";

import * as React from "react";
import Link from "next/link";
import { MOCK_ORDERS } from "@/lib/admin/mockOrders";
import { MOCK_LOGS } from "@/lib/admin/mockLogs";
import {
  ShoppingCartIcon,
  UsersIcon,
  DocumentMagnifyingGlassIcon,
  CogIcon,
  ArrowTrendingUpIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

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

interface OverviewCardProps {
  title: string;
  href: string;
  icon: React.ElementType;
  stats: { label: string; value: string | number }[];
  accent: "emerald" | "purple" | "blue" | "amber";
}

const accentColors = {
  emerald: {
    iconBg: "bg-[#47BD79]/20",
    iconColor: "text-[#47BD79]",
    glowColor: "rgba(71, 189, 121, 0.05)",
    border: "border-[#47BD79]/30",
  },
  purple: {
    iconBg: "bg-[#A855F7]/20",
    iconColor: "text-[#A855F7]",
    glowColor: "rgba(168, 85, 247, 0.05)",
    border: "border-[#A855F7]/30",
  },
  blue: {
    iconBg: "bg-[#3B82F6]/20",
    iconColor: "text-[#3B82F6]",
    glowColor: "rgba(59, 130, 246, 0.05)",
    border: "border-[#3B82F6]/30",
  },
  amber: {
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
    glowColor: "rgba(245, 158, 11, 0.05)",
    border: "border-amber-500/30",
  },
};

function OverviewCard({ title, href, icon: Icon, stats, accent }: OverviewCardProps) {
  const colors = accentColors[accent];

  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300"
      style={{ boxShadow: `0 0 20px ${colors.glowColor}` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${colors.iconColor}`} />
          </div>
          <div className="text-base font-semibold text-white">{title}</div>
        </div>
        <ArrowRightIcon className="w-4 h-4 text-white/40 group-hover:text-white/70 group-hover:translate-x-1 transition-all" />
      </div>

      <div className="space-y-3">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="text-sm text-white/60">{stat.label}</span>
            <span className="text-sm font-semibold text-white">{stat.value}</span>
          </div>
        ))}
      </div>
    </Link>
  );
}

export default function AdminOverviewCardsV2() {
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

    setLogsCount(MOCK_LOGS.length);
    setEntitlementsCount(readEntitlementsCount());
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <OverviewCard
        title="Orders"
        href="/portal/admin/orders"
        icon={ShoppingCartIcon}
        accent="emerald"
        stats={[
          { label: "Total orders", value: ordersCount },
          { label: "Paid total", value: paidTotal },
        ]}
      />

      <OverviewCard
        title="Clients"
        href="/portal/admin/users"
        icon={UsersIcon}
        accent="purple"
        stats={[
          { label: "Unique clients", value: clientsCount },
          { label: "Active entitlements", value: entitlementsCount },
        ]}
      />

      <OverviewCard
        title="Audit Logs"
        href="/portal/admin/logs"
        icon={DocumentMagnifyingGlassIcon}
        accent="blue"
        stats={[
          { label: "Log entries", value: logsCount },
          { label: "Status", value: "Active" },
        ]}
      />

      <OverviewCard
        title="Settings"
        href="/portal/admin/settings"
        icon={CogIcon}
        accent="amber"
        stats={[
          { label: "Admin preferences", value: "Configure" },
          { label: "Dev tools", value: "Enabled" },
        ]}
      />
    </div>
  );
}
