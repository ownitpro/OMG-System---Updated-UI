// src/app/demo/personal/billing/page.tsx
// Personal billing page (mock plan + usage meters)

import React from "react";
import Link from "next/link";
import { summary } from "@/lib/demo/personal/mockClient";

function Meter({ label, used, cap }: { label: string; used: number; cap: number }) {
  const pct = Math.min(100, Math.round((used / cap) * 100));
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/60">{label}</span>
        <span className="text-white">
          {used} / {cap} ({pct}%)
        </span>
      </div>
      <div className="h-2 bg-white/10 rounded-full mt-1 overflow-hidden">
        <div className="h-full bg-[#3b82f6]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function BillingPage() {
  const s = summary;

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="space-y-6 max-w-2xl w-full mx-auto text-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Billing (Demo)</h1>
          <p className="text-sm text-white/60 mt-1">Manage your plan and usage</p>
        </div>
      <div className="rounded-2xl border-2 border-[#3b82f6] bg-gradient-to-r from-[#3b82f6] to-[#3b82f6]/90 p-6 shadow-lg shadow-[#3b82f6]/20">
        <div className="text-sm text-black/70 font-medium mb-1">Current plan</div>
        <div className="text-2xl font-bold text-black">Starter — Personal</div>
        <div className="text-sm text-black/70 mt-2 font-medium">Managing through demo checkout (disabled)</div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
        <Meter label="Storage" used={320} cap={500} />
        <Meter label="OCR pages / mo" used={65} cap={150} />
        <Meter label="Share links" used={2} cap={10} />
      </div>
      <div className="flex items-center justify-center gap-3">
        <button
          className="rounded-xl bg-[#3b82f6] text-black px-4 py-2 text-sm font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled
        >
          Upgrade (demo)
        </button>
        <Link href="/pricing" className="text-sm text-[#3b82f6] hover:underline">
          View plans
        </Link>
      </div>
      </div>
    </div>
  );
}

