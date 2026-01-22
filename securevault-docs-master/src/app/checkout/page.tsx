// src/app/checkout/page.tsx - Mock checkout page

'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BUSINESS, PERSONAL, SEAT_CAPS } from '@/lib/billing/mockConfig';
import { ensureSeed, saveUsage } from '@/lib/billing/mockStore';

function money(n: number) {
  return `$${n.toFixed(2)}`;
}

function CheckoutContent() {
  const sp = useSearchParams();
  const router = useRouter();

  const kind = (sp.get('kind') || 'business') as 'business' | 'personal';
  const plan = (sp.get('plan') || 'growth') as 'starter' | 'growth' | 'pro';
  const cycle = (sp.get('cycle') || 'monthly') as 'monthly' | 'yearly';

  const seatsMax = kind === 'business' ? (SEAT_CAPS as any)[plan].base : 1;
  const cfg = kind === 'business' ? (BUSINESS as any)[plan] : (PERSONAL as any)[plan];
  const price = cfg.priceUsd;
  const yearlyPrice = price * 12 * 0.9; // 10% discount

  const [seats, setSeats] = React.useState(kind === 'business' ? Math.min(3, seatsMax) : 1);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const seeded = ensureSeed(kind, plan);
    seeded.plan = plan;
    seeded.kind = kind;
    seeded.seats = seats;

    // reset usage on "new purchase"
    seeded.usage = { textract: 0, storageGb: 0, egressGb: 0 };
    seeded.caps = {
      textract: cfg.textractPages,
      storageGb: cfg.storageGb,
      egressGb: cfg.egressGb,
      capCad: cfg.capCad,
    };

    saveUsage(seeded);
    router.push('/org/demo/billing');
  };

  const displayPrice = cycle === 'monthly' ? price : yearlyPrice;
  const displayLabel = cycle === 'monthly' ? 'per seat / month' : 'per seat / year';

  return (
    <div className="min-h-screen bg-background">
      {/* Marketing Header */}
      <header className="border-b bg-background/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-md bg-blue-500 px-2 py-1 text-xs font-semibold text-white">
              SVD
            </div>
            <span className="text-lg font-semibold">SecureVault Docs</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/pricing" className="nav-link-bubble px-4 py-2 text-sm font-medium rounded-full transition">
              Pricing
            </Link>
            <Link href="/login" className="nav-link-bubble px-4 py-2 text-sm font-medium rounded-full transition">
              Login
            </Link>
            <Link href="/signup" className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Checkout (Mock)</h1>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="rounded-3xl border p-6 space-y-3 bg-card">
            <div className="text-sm text-muted-foreground">Plan</div>
            <div className="text-xl font-semibold capitalize">
              {kind} • {plan}
            </div>
            <div className="text-3xl font-bold">
              {money(displayPrice)} <span className="text-base font-normal">{displayLabel}</span>
            </div>

            {kind === 'business' && (
              <label className="block mt-4">
                Seats (max {seatsMax})
                <input
                  type="number"
                  min={1}
                  max={seatsMax}
                  value={seats}
                  onChange={(e) => setSeats(Number(e.target.value))}
                  className="mt-2 w-24 rounded-xl border border-input bg-background px-3 py-2 text-sm"
                />
              </label>
            )}
          </div>

          <div className="rounded-3xl border p-6 grid sm:grid-cols-2 gap-4 text-sm bg-card">
            <div>
              <div className="font-semibold mb-2">What you get</div>
              <ul className="space-y-1 list-disc pl-5 text-muted-foreground">
                <li>Textract: {cfg.textractPages.toLocaleString()} pages per month</li>
                <li>Storage: {cfg.storageGb} GB</li>
                <li>Egress: {cfg.egressGb} GB</li>
                <li>Client portals: Unlimited</li>
                <li>Standard OCR included</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-2">Notes</div>
              <ul className="space-y-1 list-disc pl-5 text-muted-foreground">
                <li>Mock checkout only. No payment collected.</li>
                <li>AWS cap (CAD) per seat: ${cfg.capCad.toFixed(2)}</li>
                <li>You can manage caps and add‑ons in Billing later.</li>
              </ul>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl px-4 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Confirm (Mock) and Continue
          </button>
        </form>
      </main>
    </div>
  );
}

export default function CheckoutMock() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-gray-400">Loading...</div></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
