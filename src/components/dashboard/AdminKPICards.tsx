"use client";

import { MetricCard } from "@/components/dashboard/MetricCard";
import {
  ChartBarIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

interface KPIData {
  mrr: number;
  mrrGrowth: number;
  activeOrgs: number;
  orgsGrowth: number;
  newSignups: number;
  signupsGrowth: number;
  churnRate: number;
  churnGrowth: number;
}

interface AdminKPICardsProps {
  kpis: KPIData;
}

export function AdminKPICards({ kpis }: AdminKPICardsProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Monthly Recurring Revenue"
        value={kpis.mrr}
        change={kpis.mrrGrowth}
        changeLabel="vs last month"
        icon={CurrencyDollarIcon}
        type="revenue"
        trend={kpis.mrrGrowth > 0 ? "up" : "down"}
      />
      <MetricCard
        title="Active Organizations"
        value={kpis.activeOrgs}
        change={kpis.orgsGrowth}
        changeLabel="vs last month"
        icon={BuildingOfficeIcon}
        type="users"
        trend="up"
      />
      <MetricCard
        title="New Signups"
        value={kpis.newSignups}
        change={kpis.signupsGrowth}
        changeLabel="vs last month"
        icon={UserGroupIcon}
        type={kpis.signupsGrowth > 0 ? "success" : "warning"}
        trend={kpis.signupsGrowth > 0 ? "up" : "down"}
      />
      <MetricCard
        title="Churn Rate"
        value={`${kpis.churnRate}%`}
        change={kpis.churnGrowth}
        changeLabel="vs last month"
        icon={ChartBarIcon}
        type={kpis.churnRate < 3 ? "success" : "warning"}
        trend={kpis.churnGrowth < 0 ? "up" : "down"}
      />
    </div>
  );
}

