// src/lib/billing/mode.ts
// Utility to check billing mode

export function isMockBillingMode(): boolean {
  if (typeof window === 'undefined') {
    // Server-side: check env var
    return (process.env.NEXT_PUBLIC_BILLING_MODE || 'mock') === 'mock';
  }
  // Client-side: NEXT_PUBLIC_ vars are injected at build time
  return (process.env.NEXT_PUBLIC_BILLING_MODE || 'mock') === 'mock';
}

