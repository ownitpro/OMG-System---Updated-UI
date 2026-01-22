// src/components/demo/business/KpiStrip.tsx
// KPI strip component for business demo

"use client";

import * as React from "react";

type KpiData = {
  workspaceUsage: { used: number; cap: number };
  clientPortals: { count: number; cap?: number };
  openRequests: number;
  approvalsPending: number;
};

const K = ({
  label,
  value,
  sub,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
}) => (
  <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4 transition-all duration-300 hover:border-blue-500 hover:bg-blue-500/10 cursor-pointer">
    <div className="text-xs text-zinc-400">{label}</div>
    <div className="text-2xl font-semibold text-zinc-100">{value}</div>
    {sub && <div className="text-[11px] text-zinc-500 mt-1">{sub}</div>}
  </div>
);

export function KpiStrip({ data }: { data: KpiData }) {
  const pct = Math.round(
    (data.workspaceUsage.used / Math.max(1, data.workspaceUsage.cap)) * 100
  );
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <K
        label="Your workspace"
        value={
          <span>
            {data.workspaceUsage.used} / {data.workspaceUsage.cap}
          </span>
        }
        sub={`${pct}% used`}
      />
      <K
        label="Client Portals"
        value={
          <span>
            {data.clientPortals.count}
            {data.clientPortals.cap ? ` / ${data.clientPortals.cap}` : ""}
          </span>
        }
      />
      <K label="Open Requests" value={<span>{data.openRequests}</span>} />
      <K
        label="Approvals"
        value={<span>{data.approvalsPending} pending</span>}
      />
    </div>
  );
}

