// src/demo/components/DemoKpiStrip.tsx
// KPI strip component for demo business

"use client";

export function DemoKpiStrip({ data }: { data: any }) {
  const card = (label: string, value: string, sub?: string) => (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
      <div className="text-sm text-white/60">{label}</div>
      <div className="text-2xl font-semibold text-white mt-1">{value}</div>
      {sub && <div className="text-xs text-white/60 mt-1">{sub}</div>}
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {card(
        "Workspace",
        `${data.workspace?.used || 0} / ${data.workspace?.cap || 0}`,
        `${Math.round(((data.workspace?.used || 0) / Math.max(1, data.workspace?.cap || 1)) * 100)}% used`
      )}
      {card(
        "Portals",
        `${data.portals?.count || 0}${data.portals?.cap ? ` / ${data.portals.cap}` : ""}`
      )}
      {card("Open Requests", `${data.requests || 0}`)}
      {card("Approvals", `${data.approvals || 0} pending`)}
    </div>
  );
}

