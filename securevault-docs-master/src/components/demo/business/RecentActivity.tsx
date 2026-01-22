// src/components/demo/business/RecentActivity.tsx
// Recent activity component for business demo

"use client";

import * as React from "react";

type Ev = { id: string; ts: string; actor: string; summary: string };

export function RecentActivity({ events }: { events: Ev[] }) {
  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4">
      <div className="mb-2 text-sm font-medium text-zinc-100">Recent Activity</div>
      <ul className="space-y-2">
        {events.map((ev) => (
          <li key={ev.id} className="rounded-xl bg-zinc-950/60 border border-zinc-800 p-3 transition-all duration-300 hover:border-blue-500 hover:bg-blue-500/10 hover:shadow-[0_0_0_2px_rgba(16,185,129,0.3)] cursor-pointer">
            <div className="text-sm text-zinc-100">{ev.summary}</div>
            <div className="text-[11px] text-zinc-500">{ev.actor} • {new Date(ev.ts).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

