'use client';
import type { PlanGroup } from '@/config/pricing/registry';
import { businessCards, personalCards } from '@/config/pricing/registry';
import InfoTip from './InfoTip';
import Link from 'next/link';

export default function ComparisonTable({ audience }: { audience: PlanGroup }) {
  const plans = audience === 'business' ? businessCards : personalCards;

  const formatUSD = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  // Get all unique features across plans
  const allFeatures = new Set<string>();
  plans.forEach(p => p.features.forEach(f => allFeatures.add(f)));
  const featureRows = Array.from(allFeatures);

  return (
    <section className="mt-10 animate-fade-in" aria-labelledby="compare-heading" id="comparison-table">
      <div className="flex items-center justify-between mb-3">
        <h2 id="compare-heading" className="text-2xl font-extrabold">Compare plans</h2>
        <button onClick={() => window.print()} className="text-sm text-muted-foreground hover:text-foreground underline focus-visible:outline outline-2 outline-blue-600 rounded px-2 py-1">
          Print comparison
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border bg-card print:overflow-visible">
        <table className="min-w-[720px] w-full text-sm print:min-w-full">
          <caption className="sr-only">Side-by-side comparison of {audience} plans and their features</caption>
          <thead>
            <tr className="border-b">
              <th className="sticky left-0 z-10 bg-card px-4 py-3 text-left font-semibold border-r">
                What's included
              </th>
              {plans.map((p) => (
                <th key={p.key} className="px-4 py-3 text-left font-semibold">
                  <div className="flex items-center gap-2">
                    <span>{p.name}</span>
                    {p.key.includes('growth') && <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-600 text-white font-bold whitespace-nowrap">Most popular</span>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr className="bg-muted/50">
              <th scope="row" className="sticky left-0 z-10 bg-muted/50 px-4 py-3 text-left font-semibold border-r">Base price (monthly)</th>
              {plans.map((p) => (
                <td key={p.key} className="px-4 py-3">
                  <span className="font-bold text-blue-600">{formatUSD(p.prices.monthly.amountUsd)}/mo</span>
                </td>
              ))}
            </tr>

            {featureRows.map((f, idx) => (
              <tr key={f} className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                <th scope="row" className="sticky left-0 z-10 bg-inherit px-4 py-3 text-left border-r">
                  <span className="align-middle">{f}</span>
                </th>
                {plans.map((p) => {
                  const has = p.features.includes(f);
                  return (
                    <td key={`${p.key}-${f}`} className="px-4 py-3 text-center">
                      {has ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-600" aria-label="Included">✓</span>
                      ) : (
                        <span className="text-muted-foreground/30" aria-label="Not included">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}

            <tr className="bg-muted/50">
              <th scope="row" className="sticky left-0 z-10 bg-muted/50 px-4 py-3 text-left font-semibold border-r">Get started</th>
              {plans.map((p) => (
                <td key={p.key} className="px-4 py-3">
                  <Link
                    href={`/signup?plan=${p.key}`}
                    className={`inline-flex items-center justify-center px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                      p.key.includes('enterprise') || p.key.includes('pro')
                        ? 'bg-muted text-foreground hover:bg-muted/80'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Choose {p.name}
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground mt-3">Tip: Press ESC to close tooltips.</p>
    </section>
  );
}

