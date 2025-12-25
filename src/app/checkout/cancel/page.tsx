"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CheckoutCancelContent() {
  const sp = useSearchParams();
  const product = sp.get("product") || "unknown";

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="text-xl font-semibold">No worries.</div>
      <div className="mt-2 text-sm text-zinc-600">
        Checkout canceled for: <span className="font-semibold">{product}</span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/products"
          className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
        >
          Back to Products
        </Link>
        <Link
          href="/products/plans"
          className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
        >
          View Plans
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-5">
          <div className="text-sm text-zinc-500">Checkout</div>
          <div className="text-2xl font-semibold">Checkout Canceled</div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10">
        <Suspense fallback={
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="animate-pulse">
              <div className="h-6 w-32 bg-zinc-200 rounded"></div>
              <div className="mt-2 h-4 w-48 bg-zinc-200 rounded"></div>
            </div>
          </div>
        }>
          <CheckoutCancelContent />
        </Suspense>
      </main>
    </div>
  );
}
