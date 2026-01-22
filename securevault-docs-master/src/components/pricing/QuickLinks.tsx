// src/components/pricing/QuickLinks.tsx
// Quick links component for pricing navigation

import Link from 'next/link';

export function PricingQuickLinks() {
  return (
    <div className="flex gap-3 text-sm">
      <Link href="/pricing?tab=business" className="underline text-blue-600 hover:text-blue-700">
        Business pricing
      </Link>
      <span className="text-muted-foreground">•</span>
      <Link href="/pricing?tab=personal" className="underline text-blue-600 hover:text-blue-700">
        Personal pricing
      </Link>
    </div>
  );
}

