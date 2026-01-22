// src/app/demo/business/overview/page.tsx
// Business demo overview page with KPIs, Quick Actions, Activity, Metrics, and Client Portals

import { KpiStrip } from "@/components/demo/business/KpiStrip";
import { QuickActions } from "@/components/demo/business/QuickActions";
import { RecentActivity } from "@/components/demo/business/RecentActivity";
import { MetricsGrid } from "@/components/demo/business/MetricsGrid";
import { ClientPortals } from "@/components/demo/business/ClientPortals";
import { summary, activity, metrics } from "@/lib/demo/business/mockClient";

export default function Overview() {

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border-2 border-blue-500 p-5 bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/20">
        <div className="text-base text-white font-semibold">
          You're on <span className="text-white font-bold text-lg">{summary.plan.toUpperCase()}</span>. Trial ends{" "}
          <span className="font-bold">{new Date(summary.trialEnds).toLocaleDateString()}</span>.
        </div>
      </div>

      <KpiStrip data={summary.kpis} />
      <QuickActions />
      <ClientPortals />
      <RecentActivity events={activity.events} />
      <MetricsGrid items={metrics.items} />
    </div>
  );
}
