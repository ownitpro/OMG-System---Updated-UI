'use client';
import type { PlanCard as PlanCardType, Cadence } from '@/config/pricing/registry';
import Link from 'next/link';
import { isMockBillingMode } from '@/lib/billing/mode';

type Props = { plan: PlanCardType; cycle: Cadence };

export default function PlanCard({ plan, cycle }: Props) {
  const price = cycle === 'monthly' ? plan.prices.monthly : plan.prices.annual;
  const annualTotal = cycle === 'annual' ? Math.round(plan.prices.monthly.amountUsd * 12 * 0.9) : null;
  const annualSave = cycle === 'annual' ? Math.round(plan.prices.monthly.amountUsd * 12 * 0.1) : null;

  const formatUSD = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
  
  const isStarter = plan.key.includes('starter');
  const isBusinessStarter = plan.key === 'acct_starter';
  const isPersonalStarter = plan.key === 'personal_starter';

  return (
    <div
      className={`relative rounded-2xl border p-6 bg-card text-card-foreground flex flex-col gap-4 transition-all hover:border-blue-300 hover:shadow-md
        ${plan.key.includes('growth') ? 'ring-2 ring-blue-500' : ''}`}
    >
      {plan.key.includes('growth') && (
        <div className="absolute -top-3 left-4 text-xs font-bold px-2 py-1 rounded-full bg-blue-600 text-white shadow">
          Most popular
        </div>
      )}

      {isStarter && (
        <div className="absolute -top-3 right-4 text-xs font-bold px-2 py-1 rounded-full bg-blue-100 text-blue-700 shadow">
          7‑day trial
        </div>
      )}

      <div>
        <h3 className="text-xl font-extrabold">{plan.name}</h3>
        <p className="text-muted-foreground mt-1 text-sm">
          {plan.group === 'business' ? 'For teams' : 'For individuals'}
        </p>
      </div>

      {plan.key.includes('enterprise') ? (
        <div className="text-3xl font-extrabold">
          Custom
        </div>
      ) : (
        <>
          <div className="text-3xl font-extrabold">
            {formatUSD(price.amountUsd)}
            <span className="text-base font-normal text-muted-foreground">/{cycle === 'monthly' ? 'mo' : 'yr'}</span>
          </div>
          
          {isStarter && (
            <div className="text-sm text-blue-500 font-medium">
              7 days free trial
            </div>
          )}

          {annualTotal && !isStarter && (
            <div className="text-sm text-muted-foreground">
              Pay {formatUSD(annualTotal)} today{annualSave && <span> • Save {formatUSD(annualSave)}</span>}
            </div>
          )}
        </>
      )}

      <ul className="mt-1 space-y-2.5 text-sm">
        {plan.blurb.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <span aria-hidden className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-1 space-y-2.5 text-sm text-muted-foreground">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span aria-hidden className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-2">
        {plan.key.includes('enterprise') ? (
          <Link
            href="/contact-sales"
            className="inline-flex items-center justify-center w-full px-4 py-3 rounded-xl font-semibold focus-visible:outline outline-2 outline-blue-600 transition-all bg-blue-600 text-white hover:bg-blue-700"
            aria-label="Contact Sales for Enterprise plan"
          >
            Contact Sales
          </Link>
        ) : (
          <button
            onClick={async () => {
              // Check if mock billing mode is enabled
              if (isMockBillingMode()) {
                // Extract plan key (e.g., "acct_starter" -> "starter", "personal_growth" -> "growth")
                const planKey = plan.key.includes('_') ? plan.key.split('_')[1] : plan.key;
                const kind = plan.group === 'business' ? 'business' : 'personal';
                window.location.href = `/checkout?kind=${kind}&plan=${planKey}&cycle=${cycle}`;
                return;
              }

              // Original Stripe checkout flow
              const price = cycle === "monthly" ? plan.prices.monthly.stripe : plan.prices.annual.stripe;
              try {
                const r = await fetch("/api/billing/checkout", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    priceId: price, // API expects priceId
                    planKey: plan.key,
                    cadence: cycle,
                    origin: "pricing",
                  }),
                });
                const { url } = await r.json();
                window.location.href = url; // Stripe Checkout URL or mock URL
              } catch (err) {
                console.error("Checkout error:", err);
              }
            }}
            className="inline-flex items-center justify-center w-full px-4 py-3 rounded-xl font-semibold focus-visible:outline outline-2 outline-blue-600 transition-all bg-blue-600 text-white hover:bg-blue-700"
            aria-label={isStarter ? `Try ${plan.name} for free` : `Choose ${plan.name} plan`}
          >
            {isStarter ? `Try ${plan.name} for free` : `Choose ${plan.name}`}
          </button>
        )}
      </div>
    </div>
  );
}

