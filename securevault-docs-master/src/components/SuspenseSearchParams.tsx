// Wrapper component for pages using useSearchParams
// Next.js 16 requires Suspense boundary for useSearchParams

'use client';

import { Suspense } from 'react';

export function SuspenseSearchParams({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-pulse text-zinc-400">Loading...</div>
      </div>
    }>
      {children}
    </Suspense>
  );
}
