// src/app/demo/business/billing/page.tsx
// Billing page with progress bars

'use client';

import * as React from 'react';

// Mock plan + caps; mirrors your latest seat pricing but hides AWS wording.
const MOCK_PLAN = { name: 'Growth', priceUsd: 109.99, seats: 5 };

const MOCK_LIMITS = {
  storageGb: { used: 38, cap: 120 },
  ocrPages: { used: 1300, cap: 4000 },
  egressGb: { used: 9, cap: 40 },
  shares: { used: 22, cap: 200 },
};

function label(k: string) {
  return (
    {
      storageGb: 'Storage (GB)',
      ocrPages: 'OCR pages',
      egressGb: 'Data transfer (GB)',
      shares: 'Active share links',
    }[k] || k
  );
}

function bar(p: number) {
  if (p >= 95) return 'bg-red-500';
  if (p >= 80) return 'bg-amber-500';
  if (p >= 70) return 'bg-yellow-500';
  return 'bg-blue-600';
}

export default function BillingPage() {
  const [showSeatManager, setShowSeatManager] = React.useState(false);
  const [selectedSeats, setSelectedSeats] = React.useState(MOCK_PLAN.seats);
  const pct = (u: number, c: number) => Math.min(100, Math.round((u / Math.max(1, c)) * 100));

  const availableSeats = Array.from({ length: 8 }, (_, i) => MOCK_PLAN.seats + i + 1);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-zinc-100">Billing</h1>
      <div className="rounded-2xl border border-zinc-800 p-4 grid md:grid-cols-3 gap-4 bg-zinc-900">
        <div>
          <div className="text-sm text-zinc-400">Current plan</div>
          <div className="text-lg font-semibold text-zinc-100">{MOCK_PLAN.name}</div>
          <div className="text-sm text-zinc-200">${MOCK_PLAN.priceUsd.toFixed(2)} / seat / mo</div>
          <div className="text-sm text-zinc-400">Seats: {selectedSeats}</div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setShowSeatManager(!showSeatManager)}
              className="px-3 py-2 rounded-xl bg-zinc-800 text-zinc-100 hover:bg-zinc-700 transition"
            >
              Manage seats
            </button>
            <button className="px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
              Upgrade
            </button>
          </div>
        </div>
        <div className="md:col-span-2 grid sm:grid-cols-2 gap-3">
          {Object.entries(MOCK_LIMITS).map(([k, v]: any) => (
            <div key={k} className="rounded-xl border border-zinc-800 p-3 bg-zinc-950">
              <div className="text-sm font-medium text-zinc-100">{label(k)}</div>
              <div className="text-xs text-zinc-400 mb-1">
                {v.used} of {v.cap}
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div style={{ width: pct(v.used, v.cap) + '%' }} className={`h-2 ${bar(pct(v.used, v.cap))}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showSeatManager && (
        <div className="rounded-2xl border border-zinc-800 p-6 bg-zinc-900">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-zinc-100">Manage Seats</h2>
            <button
              onClick={() => setShowSeatManager(false)}
              className="text-zinc-400 hover:text-zinc-100"
            >
              ×
            </button>
          </div>
          <div className="mb-4">
            <div className="text-sm text-zinc-400 mb-2">Current seats: {selectedSeats}</div>
            <div className="text-sm text-zinc-300 mb-4">
              Add additional seats: ${MOCK_PLAN.priceUsd.toFixed(2)} per seat/month
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {availableSeats.map((seat) => (
                <button
                  key={seat}
                  onClick={() => setSelectedSeats(seat)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition ${
                    selectedSeats === seat
                      ? 'bg-blue-600 text-white border-2 border-blue-500'
                      : 'bg-zinc-800 text-zinc-200 border-2 border-zinc-700 hover:border-blue-500/50'
                  }`}
                >
                  {seat}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            <div>
              <div className="text-sm text-zinc-400">New total</div>
              <div className="text-xl font-bold text-zinc-100">
                ${(selectedSeats * MOCK_PLAN.priceUsd).toFixed(2)}/mo
              </div>
            </div>
            <button
              onClick={() => {
                alert(`Seats updated to ${selectedSeats} (mock)`);
                setShowSeatManager(false);
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-zinc-800 p-4 bg-zinc-900">
        <div className="text-sm font-medium mb-2 text-zinc-100">Client portals</div>
        <div className="text-sm text-zinc-400">Open and manage client portals from here.</div>
        <div className="mt-2">
          <a href="/demo/business/portals" className="underline text-blue-400 hover:text-blue-300">
            Go to Client Portals
          </a>
        </div>
      </div>
    </div>
  );
}
