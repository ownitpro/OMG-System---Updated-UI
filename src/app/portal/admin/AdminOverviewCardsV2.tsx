"use client";

import * as React from "react";
import Link from "next/link";
import {
  useAdminDashboard,
  useAdminAuditLogs,
  useAdminOrdersCount,
} from "@/hooks/useAdminDashboard";
import {
  ShoppingCartIcon,
  UsersIcon,
  DocumentMagnifyingGlassIcon,
  CogIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

interface OverviewCardProps {
  title: string;
  href: string;
  icon: React.ElementType;
  stats: { label: string; value: string | number }[];
  accent: "emerald" | "purple" | "blue" | "amber";
  isLoading?: boolean;
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

function OverviewCard({ title, href, icon: Icon, stats, accent, isLoading }: OverviewCardProps) {
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
            {isLoading ? (
              <span className="h-4 w-12 bg-white/10 rounded animate-pulse" />
            ) : (
              <span className="text-sm font-semibold text-white">{stat.value}</span>
            )}
          </div>
        ))}
      </div>
    </Link>
  );
}

export default function AdminOverviewCardsV2() {
  // Fetch real data from APIs
  const { data: dashboardData, isLoading: dashboardLoading } = useAdminDashboard();
  const { pagination: auditPagination, isLoading: auditLoading } = useAdminAuditLogs(1, 1);
  const { totalOrders, isLoading: ordersLoading } = useAdminOrdersCount();

  // Calculate total paid from recent orders or use total revenue
  const totalRevenue = dashboardData?.overview?.totalRevenue ?? 0;
  const formattedRevenue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalRevenue);

  // Get unique clients count (users with CLIENT role)
  const clientsCount = dashboardData?.users?.byRole?.CLIENT ?? 0;

  // Active entitlements (using active subscriptions as proxy)
  const activeEntitlements = dashboardData?.overview?.activeSubscriptions ?? 0;

  // Audit logs count
  const logsCount = auditPagination.total;

  const isLoading = dashboardLoading || auditLoading || ordersLoading;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <OverviewCard
        title="Orders"
        href="/portal/admin/orders"
        icon={ShoppingCartIcon}
        accent="emerald"
        isLoading={isLoading}
        stats={[
          { label: "Total orders", value: totalOrders },
          { label: "Paid total", value: formattedRevenue },
        ]}
      />

      <OverviewCard
        title="Clients"
        href="/portal/admin/users"
        icon={UsersIcon}
        accent="purple"
        isLoading={isLoading}
        stats={[
          { label: "Unique clients", value: clientsCount },
          { label: "Active entitlements", value: activeEntitlements },
        ]}
      />

      <OverviewCard
        title="Audit Logs"
        href="/portal/admin/logs"
        icon={DocumentMagnifyingGlassIcon}
        accent="blue"
        isLoading={isLoading}
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
