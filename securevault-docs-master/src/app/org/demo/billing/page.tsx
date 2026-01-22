// src/app/org/demo/billing/page.tsx - Org Billing (mock)

'use client';

import React from 'react';
import Link from 'next/link';
import { loadUsage, ensureSeed, pct, saveUsage } from '@/lib/billing/mockStore';
import { ALARMS, TOPUPS } from '@/lib/billing/mockConfig';

function Meter({ label, used, cap }: { label: string; used: number; cap: number }) {
  const p = Math.min(1, pct(used, cap));
  const pctTxt = Math.round(p * 100);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>
          {used.toLocaleString()} / {cap.toLocaleString()}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-2 transition-all ${
            pctTxt > 95 ? 'bg-red-500' : pctTxt > 80 ? 'bg-amber-500' : 'bg-blue-600'
          }`}
          style={{ width: `${pctTxt}%` }}
        />
      </div>
      <div className="text-xs text-muted-foreground">{pctTxt}% used</div>
    </div>
  );
}

export default function OrgBilling() {
  const [u, setU] = React.useState(ensureSeed());

  React.useEffect(() => {
    const loaded = loadUsage();
    if (loaded) setU(loaded);
  }, []);

  const warnLevels = ALARMS.thresholds.map((t) => Math.round(t * 100));

  const addTopup = (kind: 'textract' | 'storage' | 'egress') => {
    const next = { ...u };

    if (kind === 'textract') next.caps.textract += TOPUPS.textract.packPages;
    if (kind === 'storage') next.caps.storageGb += TOPUPS.storage.packGb;
    if (kind === 'egress') next.caps.egressGb += TOPUPS.egress.packGb;

    saveUsage(next);
    setU(next);
  };

  const simulateUse = (kind: 'textract' | 'storage' | 'egress', amt: number) => {
    const next = { ...u };

    next.usage = { ...u.usage, [kind]: Math.max(0, (u.usage as any)[kind] + amt) };

    if (ALARMS.softStop && pct(next.usage[kind], (next.caps as any)[kind]) > ALARMS.softStop) {
      alert('Soft stop reached. (Mock)');
    }

    saveUsage(next);
    setU(next);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Billing (Mock)</h1>
          <Link className="underline text-blue-600 hover:text-blue-700" href="/pricing">
            Change plan
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border p-6 space-y-4 bg-card">
            <div className="text-sm text-muted-foreground">Plan</div>
            <div className="text-xl font-semibold capitalize">
              {u.kind} • {u.plan} • {u.seats} seat(s)
            </div>

            <Meter label="Textract pages" used={u.usage.textract} cap={u.caps.textract} />
            <Meter label="Storage (GB)" used={u.usage.storageGb} cap={u.caps.storageGb} />
            <Meter label="Egress (GB)" used={u.usage.egressGb} cap={u.caps.egressGb} />

            <div className="text-xs text-muted-foreground pt-2 border-t">
              Alerts at {warnLevels.join('% / ')}% / Soft stop at {Math.round(ALARMS.softStop * 100)}% / Burst to{' '}
              {Math.round(ALARMS.burstStop * 100)}%
            </div>
          </div>

          <div className="rounded-3xl border p-6 space-y-4 bg-card">
            <div className="text-sm font-semibold">Add‑ons (Mock)</div>
            <div className="grid sm:grid-cols-3 gap-3 text-sm">
              <button
                onClick={() => addTopup('textract')}
                className="rounded-2xl border border-input px-3 py-2 hover:bg-muted transition"
              >
                +{TOPUPS.textract.packPages.toLocaleString()} pages
              </button>
              <button
                onClick={() => addTopup('storage')}
                className="rounded-2xl border border-input px-3 py-2 hover:bg-muted transition"
              >
                +{TOPUPS.storage.packGb} GB
              </button>
              <button
                onClick={() => addTopup('egress')}
                className="rounded-2xl border border-input px-3 py-2 hover:bg-muted transition"
              >
                +{TOPUPS.egress.packGb} GB
              </button>
            </div>
            <div className="text-xs text-muted-foreground">No charge in mock mode. Values are local only.</div>
          </div>
        </div>

        <div className="rounded-3xl border p-6 space-y-3 bg-card">
          <div className="text-sm font-semibold">Simulate usage (safe for demos)</div>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <button
              onClick={() => simulateUse('textract', 100)}
              className="rounded-2xl border border-input px-3 py-2 hover:bg-muted transition"
            >
              +100 pages
            </button>
            <button
              onClick={() => simulateUse('storage', 10)}
              className="rounded-2xl border border-input px-3 py-2 hover:bg-muted transition"
            >
              +10 GB
            </button>
            <button
              onClick={() => simulateUse('egress', 10)}
              className="rounded-2xl border border-input px-3 py-2 hover:bg-muted transition"
            >
              +10 GB egress
            </button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center">Powered by OMGsystems • 2025</div>
      </div>
    </div>
  );
}

