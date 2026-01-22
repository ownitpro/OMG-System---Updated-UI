'use client';

import React from 'react';
import Link from 'next/link';
import { PricingTables } from '@/components/pricing/PricingTables';
import PricingFAQ from '@/components/pricing/FAQ';
import FinePrint from '@/components/pricing/FinePrint';

export default function PricingPage() {
  return (
    <div className="landing-bg min-h-screen relative">
      <div className="grain-overlay" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-readable-light text-shadow-md mb-6">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-readable-muted text-shadow-sm">
          Start for free, scale as you grow. No hidden fees.
        </p>
      </div>

      <div className="mb-24">
        <PricingTables showAwsCaps={false} tracks={['business', 'personal']} />
      </div>

      <div className="glass-card-enhanced rounded-3xl p-8 mb-16">
         <PricingFAQ />
      </div>

      <div className="text-center pb-12">
        <FinePrint />
        <div className="mt-8 text-sm text-slate-100">
          Need a custom enterprise plan? <Link href="/contact-sales" className="text-teal-400 hover:text-teal-300 underline">Contact Sales</Link>
        </div>
      </div>
      </div>
    </div>
  );
}
