// src/components/billing/UsageToasts.tsx
// Usage warning toasts for org overview

'use client';

import React from 'react';
import { loadUsage } from '@/lib/billing/mockStore';
import { ALARMS } from '@/lib/billing/mockConfig';

export function UsageToasts() {
  const [warn, setWarn] = React.useState<string | null>(null);

  React.useEffect(() => {
    const u = loadUsage();
    if (!u) return;

    const checks: { label: string; used: number; cap: number }[] = [
      { label: 'Textract', used: u.usage.textract, cap: u.caps.textract },
      { label: 'Storage', used: u.usage.storageGb, cap: u.caps.storageGb },
      { label: 'Egress', used: u.usage.egressGb, cap: u.caps.egressGb },
    ];

    const thr = ALARMS.thresholds.slice().reverse();

    for (const c of checks) {
      for (const t of thr) {
        if (c.cap > 0 && c.used / c.cap >= t) {
          setWarn(`${c.label} at ${Math.round(t * 100)}% or more. Check Billing.`);
          return;
        }
      }
    }
  }, []);

  if (!warn) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-2xl px-4 py-3 shadow-lg z-50">
      {warn}
    </div>
  );
}

