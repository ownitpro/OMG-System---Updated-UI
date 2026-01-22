// src/app/org/demo/integrations/page.tsx - Integrations page (mock)

'use client';

import React from 'react';
import Link from 'next/link';
import { loadUsage } from '@/lib/billing/mockStore';
import { CONNECTORS } from '@/lib/billing/mockConfig';

export default function Integrations() {
  const u = loadUsage();
  const tier = u?.plan || 'growth';
  const list = (CONNECTORS as any)[tier];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Integrations (Mock)</h1>
          <Link href="/org/demo/billing" className="underline text-blue-600 hover:text-blue-700">
            Billing
          </Link>
        </div>

        <p className="text-sm text-muted-foreground">
          These are available for your current plan ({tier}). In mock mode, toggles are disabled.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(list).map(([group, items]: any) => (
            <div key={group} className="rounded-3xl border p-4 bg-card">
              <div className="font-semibold capitalize mb-2">{group.replaceAll('_', ' ')}</div>
              <ul className="text-sm mt-2 space-y-1 text-muted-foreground">
                {items.map((it: string) => (
                  <li key={it} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    {it.replaceAll('-', ' ')}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground text-center pt-4 border-t">
          Powered by OMGsystems • 2025
        </div>
      </div>
    </div>
  );
}

