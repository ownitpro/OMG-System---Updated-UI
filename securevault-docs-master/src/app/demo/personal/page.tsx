// src/app/demo/personal/page.tsx
// Personal demo overview page

import React from "react";
import Link from "next/link";
import { summary, kpis, activity, metrics } from "@/lib/demo/personal/mockClient";
import { MetricsGrid } from "@/components/demo/personal/MetricsGrid";

function Tile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-[#3b82f6]/50 hover:bg-[#3b82f6]/10 hover:shadow-lg hover:shadow-[#3b82f6]/20 cursor-pointer">
      <div className="text-sm text-white/60">{label}</div>
      <div className="text-2xl font-semibold text-white mt-1">{value}</div>
      {sub && <div className="text-xs text-white/60 mt-1">{sub}</div>}
    </div>
  );
}

export default function PersonalOverview() {
  return (
    <div className="space-y-6">
      {/* Plan banner */}
      <div className="rounded-2xl border-2 border-blue-500 p-5 bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/20">
        <div className="text-base text-white font-semibold">
          You're on <span className="text-white font-bold text-lg">STARTER</span>. Trial ends{" "}
          <span className="font-bold">{new Date(summary.trialEnds).toLocaleDateString()}</span>.
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Tile label="My Vault" value={`${kpis.docs} docs`} sub={`${kpis.storage} MB`} />
        <Tile label="Shares" value={`${kpis.shares}`} sub={`${kpis.sharesActive} active`} />
        <Tile label="Uploads (30d)" value={`${kpis.uploads30d}`} />
        <Tile label="OCR pages (30d)" value={`${kpis.ocr30d}`} />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { title: "Upload", href: "/demo/personal/vault/upload" },
          { title: "New share link", href: "/demo/personal/shares" },
          { title: "Request files", href: "/demo/personal/shares" },
          { title: "Install App", href: "/install" },
          { title: "Try OCR Review", href: "/demo/personal/vault" },
          { title: "Go to Vault", href: "/demo/personal/vault" },
        ].map((a) => (
          <Link
            key={a.title}
            href={a.href}
            className="rounded-2xl border border-white/10 bg-white/5 hover:bg-[#3b82f6]/10 hover:border-[#3b82f6]/30 p-3 text-sm font-medium text-white transition"
          >
            {a.title}
          </Link>
        ))}
      </div>

      {/* Activity */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm font-medium mb-2 text-white">Recent Activity</div>
        <ul className="space-y-2 text-sm">
          {activity.events.map((e: any) => (
            <li
              key={e.id}
              className="rounded-xl bg-[#3b82f6]/20 border border-[#3b82f6]/40 backdrop-blur-sm p-4 flex items-center justify-between hover:bg-[#3b82f6]/30 transition-all"
            >
              <span className="text-white font-medium">{e.summary}</span>
              <span className="text-xs text-white/80">{new Date(e.ts).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Metrics */}
      <MetricsGrid items={metrics.items} />
    </div>
  );
}

// Demo shortcuts component
export function DemoPersonalShortcuts() {
  return (
    <div className="mt-4 flex gap-2">
      <a href="/personal/portal" className="underline text-xs">
        Personal: Portal Setup
      </a>
      <a href="/portal/login" className="underline text-xs">
        Client Portal Login
      </a>
    </div>
  );
}
