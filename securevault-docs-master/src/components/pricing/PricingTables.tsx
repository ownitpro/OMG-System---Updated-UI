'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { business, personal } from '@/data/pricing.public';
import { savePersonalPlan } from '@/app/lib/plan';

function money(n: number | string) {
  if (typeof n === 'string') return n;
  return `$${n.toFixed(2)}`;
}

function yearly(n: number) {
  const d = Number(process.env.NEXT_PUBLIC_YEARLY_DISCOUNT_PCT || '10');
  return n * 12 * (1 - d / 100);
}

type Props = {
  showAwsCaps?: boolean;
  tracks?: ('business' | 'personal')[];
};

export function PricingTables({ showAwsCaps = false, tracks = ['business', 'personal'] }: Props) {
  if (showAwsCaps) {
    throw new Error('Public pricing must not show AWS caps');
  }

  const router = useRouter();
  const [tab, setTab] = React.useState<'business' | 'personal'>(tracks[0] || 'business');
  const [cycle, setCycle] = React.useState<'monthly' | 'yearly'>('monthly');

  const data = tab === 'business' ? business : personal;
  const tiers = data.tiers;

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="inline-flex rounded-2xl p-1.5 glass-card-enhanced">
          {tracks.includes('business') && (
            <button
              onClick={() => setTab('business')}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                tab === 'business' ? 'bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg shadow-teal-500/30' : 'text-slate-100 hover:text-white hover:bg-white/10'
              }`}
            >
              Business
            </button>
          )}
          {tracks.includes('personal') && (
            <button
              onClick={() => setTab('personal')}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                tab === 'personal' ? 'bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg shadow-teal-500/30' : 'text-slate-100 hover:text-white hover:bg-white/10'
              }`}
            >
              Personal
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span className={`transition ${cycle === 'monthly' ? 'text-white font-medium' : 'text-slate-400'}`}>Monthly</span>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={cycle === 'yearly'}
              onChange={(e) => setCycle(e.target.checked ? 'yearly' : 'monthly')}
            />
            <div className="w-12 h-6 bg-slate-700 rounded-full peer-checked:bg-teal-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-6"></div>
          </label>
          <span className={`transition ${cycle === 'yearly' ? 'text-white font-medium' : 'text-slate-400'}`}>
            Yearly <span className="text-teal-400 font-bold">(10% off)</span>
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className={`grid sm:grid-cols-2 gap-6 ${tab === 'business' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
        {tiers.map((tier) => {
          const price = typeof tier.price === 'number' ? (cycle === 'monthly' ? tier.price : yearly(tier.price)) : tier.price;
          const priceLabel =
            typeof price === 'number'
              ? `${money(price)}${cycle === 'monthly' ? ' /mo' : ' /yr'}`
              : price;

          const isStarter = tier.id === 'starter';
          const isPro = tier.id === 'pro';
          const isGrowth = tier.id === 'growth'; // Assuming growth exists in data
          const isPopular = isGrowth || (tab === 'personal' && isPro);

          return (
            <div
                key={tier.id}
                className={`glass-card-enhanced relative flex flex-col p-6 transition-all duration-300 group ${
                    isPopular
                        ? 'border-2 border-teal-500/40 shadow-xl shadow-teal-500/20 scale-[1.02] z-10'
                        : 'hover:bg-white/5'
                }`}
            >
              {isStarter && (
                <div className="absolute -top-3 right-4 text-xs font-bold px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  7‑day free trial
                </div>
              )}
               {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full bg-teal-500 text-white shadow-lg shadow-teal-500/20">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-4">
                  <h3 className="text-xl font-bold text-white capitalize flex items-center gap-2">
                    {tier.name}
                  </h3>
                   {tab === 'personal' && tier.id === 'pro' && (
                      <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wider text-teal-400">
                        Family Sharing
                      </span>
                    )}
              </div>

              <div className="mb-6">
                  <div className="text-3xl font-bold text-white tracking-tight">
                    {priceLabel}
                    {typeof price === 'number' && tab === 'business' && (
                      <span className="text-sm font-medium text-slate-400 ml-1">
                        /seat
                      </span>
                    )}
                  </div>
                  {tab === 'business' && typeof tier.seatsMax === 'number' && (
                    <div className="text-sm text-slate-400 mt-1">
                      {tier.seatsMin || 1}-{tier.seatsMax} seats
                    </div>
                  )}
              </div>
              
              <ul className="mb-8 space-y-3 text-sm text-slate-300 flex-1">
                {tier.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                {tier.id === 'enterprise' ? (
                  <Link
                    href="/contact-sales"
                    className="btn-enhanced-secondary flex w-full items-center justify-center"
                  >
                    Contact Sales
                  </Link>
                ) : (
                  <button
                    onClick={async () => {
                      const planKey = tab === 'business' ? `business_${tier.id}` : `personal_${tier.id}`;

                       // Mock Mode
                       if (process.env.NEXT_PUBLIC_BILLING_MODE === 'mock') {
                          window.location.href = `/checkout?kind=${tab}&plan=${tier.id}&cycle=${cycle}`;
                          return;
                       }

                      // Dynamic Import
                      const { getPriceId } = await import('@/config/stripe-prices');
                      const priceId = getPriceId(tab, tier.id as any, cycle);

                      if (!priceId) {
                        alert("Price configuration missing.");
                        return;
                      }

                      try {
                        const r = await fetch("/api/billing/checkout", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            priceId: priceId,
                            planKey: planKey,
                            cadence: cycle,
                            origin: "pricing",
                          }),
                        });

                        if (!r.ok) throw new Error('Checkout failed');
                        const { url } = await r.json();
                        window.location.href = url;
                      } catch (err) {
                        console.error("Checkout error:", err);
                        alert("Failed to initiate checkout.");
                      }
                    }}
                    className={`w-full flex items-center justify-center ${
                        isPopular
                        ? 'btn-enhanced-primary'
                        : 'btn-enhanced-secondary'
                    }`}
                  >
                    {isStarter ? 'Start Free Trial' : `Choose ${tier.name}`}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
