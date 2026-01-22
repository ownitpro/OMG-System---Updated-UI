'use client';

import * as React from 'react';

export function KpiStrip({ data }:{ data: any }){
  const usagePct = Math.round((data.workspaceUsage.used / Math.max(1, data.workspaceUsage.cap)) * 100);

  const Box = ({label, value, sub}:{label:string; value:React.ReactNode; sub?:string}) => (
    <div className="rounded-2xl bg-white/5 p-4">
      <div className="text-xs text-white/60">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {sub && <div className="text-xs text-white/50 mt-1">{sub}</div>}
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      <Box label="Your workspace" value={<span>{data.workspaceUsage.used} / {data.workspaceUsage.cap}</span>} sub={`${usagePct}% used`} />
      <Box label="Client Portals" value={<span>{data.clientPortals.count}{data.clientPortals.cap?` / ${data.clientPortals.cap}`:''}</span>} />
      <Box label="Open Requests" value={<span>{data.openRequests}</span>} />
      <Box label="Approvals" value={<span>{data.approvalsPending} pending</span>} />
    </div>
  );
}

