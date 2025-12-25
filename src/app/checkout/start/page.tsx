"use client";

import Link from "next/link";
import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { applyCouponStack, type AppliedCoupon } from "@/lib/checkout/rulesEngine";
import { trackCouponEvent } from "@/lib/analytics/couponAnalytics";
import { readCoupons } from "@/lib/admin/couponStore";
import { PRODUCT_PRICING } from "@/config/pricing";

// Map product IDs to product names for pricing lookup
const PRODUCT_NAME_MAP: Record<string, keyof typeof PRODUCT_PRICING> = {
  "securevault-docs": "SecureVault Docs",
  "omg-crm": "OMG-CRM",
  "omg-leads": "OMG-Leads",
  "omg-iq": "OMG-IQ",
  "omg-ai-mastery": "OMG-AI-Mastery",
};

function parsePrice(priceStr: string): number {
  // Extract number from "$29/month" format
  const match = priceStr.match(/\$(\d+)/);
  return match ? parseInt(match[1], 10) * 100 : 0; // Convert to cents
}

function CheckoutStartContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams.get("product") || "unknown";
  const productName = PRODUCT_NAME_MAP[productId] || productId;
  const priceStr = PRODUCT_PRICING[productName as keyof typeof PRODUCT_PRICING]?.price || "$0/month";
  const priceCents = parsePrice(priceStr);
  const currency = "USD";

  const urlCoupon = searchParams.get("coupon");
  const [couponInput, setCouponInput] = React.useState("");
  const [stack, setStack] = React.useState<string[]>([]);
  const [applied, setApplied] = React.useState<AppliedCoupon[]>([]);
  const [rejected, setRejected] = React.useState<{ code: string; reason: string }[]>([]);
  const [finalCents, setFinalCents] = React.useState(priceCents);
  const [savedCents, setSavedCents] = React.useState(0);
  const [couponMsg, setCouponMsg] = React.useState<string | null>(null);

  // Track checkout view + picker view
  React.useEffect(() => {
    trackCouponEvent({ event: "checkout_view", productId, subtotalCents: priceCents });
    trackCouponEvent({ event: "coupon_picker_view", productId });
  }, [productId, priceCents]);

  // Helper to apply the current stack
  function applyStack(nextCodes: string[], mode: "manual" | "auto" = "manual") {
    const clean = nextCodes
      .map((c) => c.trim().toUpperCase())
      .filter(Boolean);

    setStack(clean);

    const res = applyCouponStack({
      codes: clean,
      productId,
      subtotalCents: priceCents,
    });

    if (!res.ok) {
      setApplied([]);
      setRejected([]);
      setFinalCents(priceCents);
      setSavedCents(0);
      setCouponMsg(res.reason);

      trackCouponEvent({
        event: mode === "auto" ? "coupon_auto_apply" : "coupon_apply",
        productId,
        couponCodes: clean,
        subtotalCents: priceCents,
        reason: res.reason,
      });

      return;
    }

    setApplied(res.applied);
    setRejected(res.rejected);
    setFinalCents(res.finalCents);
    setSavedCents(res.totalDiscountCents);

    const msg =
      mode === "auto"
        ? `Best deal applied (${res.totalDiscountCents}¢ saved)`
        : `Discount applied (${res.totalDiscountCents}¢ saved)`;
    setCouponMsg(msg);

    trackCouponEvent({
      event: mode === "auto" ? "coupon_auto_apply" : "coupon_apply",
      productId,
      couponCodes: res.applied.map((x) => x.code),
      subtotalCents: priceCents,
      finalCents: res.finalCents,
      discountCents: res.totalDiscountCents,
    });
  }

  // Auto-apply from URL coupon (supports stacks)
  React.useEffect(() => {
    if (!urlCoupon) return;

    // support stacks: ?coupon=OMG10,VIP5
    const codes = urlCoupon.split(",").map((s) => s.trim()).filter(Boolean);

    setCouponInput(codes.join(", "));
    applyStack(codes, "manual");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlCoupon, productId, priceCents]);

  // "Best deal applied" logic (simple Week-1 version)
  React.useEffect(() => {
    if (urlCoupon) return; // don't override explicit URL coupon
    if (stack.length > 0) return; // don't override user choice

    const coupons = readCoupons().filter((c) => c.enabled);
    if (coupons.length === 0) return;

    // Try each coupon alone; pick the lowest final price.
    let best: { code: string; final: number; saved: number } | null = null;

    for (const c of coupons) {
      const res = applyCouponStack({
        codes: [c.code],
        productId,
        subtotalCents: priceCents,
      });
      if (!res.ok) continue;

      if (!best || res.finalCents < best.final) {
        best = { code: c.code, final: res.finalCents, saved: res.totalDiscountCents };
      }
    }

    if (!best || best.saved <= 0) return;

    setCouponInput(best.code);
    applyStack([best.code], "auto");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, priceCents]);

  function proceedToCheckout() {
    const couponParam = applied.length ? `&coupon=${encodeURIComponent(applied.map((x) => x.code).join(","))}` : "";
    router.push(`/checkout/success?product=${encodeURIComponent(productId)}${couponParam}`);
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="text-xl font-semibold">{productName}</div>
      <div className="mt-2 text-sm text-zinc-600">
        Product: <span className="font-semibold">{productId}</span>
      </div>

      {/* Price Display + "saved $X" pill */}
      <div className="mt-4 space-y-1">
        {savedCents > 0 ? (
          <>
            <div className="text-sm text-muted-foreground line-through">
              {(priceCents / 100).toFixed(2)}
            </div>
            <div className="text-2xl font-semibold">
              {(finalCents / 100).toFixed(2)}
            </div>

            <div className="mt-2 inline-flex items-center rounded-full border bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
              This coupon saved you{" "}
              {new Intl.NumberFormat(undefined, { style: "currency", currency }).format(savedCents / 100)}
            </div>
          </>
        ) : (
          <div className="text-2xl font-semibold">
            {(priceCents / 100).toFixed(2)}
          </div>
        )}
      </div>

      {/* Coupon UI (input + apply + stack chips) */}
      <div className="mt-4 rounded-xl border bg-slate-50 p-3">
        <div className="flex gap-2">
          <input
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            placeholder="Coupons (comma separated) e.g. OMG10,VIP5"
            className="flex-1 rounded-lg border px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => applyStack(couponInput.split(","), "manual")}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
          >
            Apply
          </button>

          {stack.length ? (
            <button
              type="button"
              onClick={() => {
                setCouponInput("");
                applyStack([], "manual");
              }}
              className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
              title="Remove coupons"
            >
              Clear
            </button>
          ) : null}
        </div>

        {couponMsg ? <div className="mt-2 text-xs text-muted-foreground">{couponMsg}</div> : null}

        {applied.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {applied.map((a) => (
              <span
                key={a.code}
                className="inline-flex items-center rounded-full border bg-white px-2.5 py-1 text-xs font-medium"
                title={`-${a.discountCents}¢`}
              >
                {a.code} • {a.percentOff}% off
              </span>
            ))}
          </div>
        ) : null}

        {rejected.length ? (
          <div className="mt-3 space-y-1">
            {rejected.slice(0, 3).map((r) => (
              <div key={r.code} className="text-xs text-amber-700">
                {r.code}: {r.reason}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={proceedToCheckout}
          className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
        >
          Complete Purchase
        </button>

        <button
          onClick={() => router.push(`/checkout/cancel?product=${encodeURIComponent(productId)}`)}
          className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
        >
          Cancel
        </button>
      </div>

      <div className="mt-4 text-xs text-zinc-500">
        Week 1 testing: mock checkout flow. Later: real Stripe Checkout + webhook unlock.
      </div>
    </div>
  );
}

export default function CheckoutStartPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5">
          <div>
            <div className="text-sm text-zinc-500">Checkout</div>
            <div className="text-2xl font-semibold">Complete Purchase</div>
          </div>
          <Link
            href="/products"
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
          >
            Back to Products
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10">
        <Suspense fallback={
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="animate-pulse space-y-4">
              <div className="h-6 w-48 bg-zinc-200 rounded"></div>
              <div className="h-4 w-32 bg-zinc-200 rounded"></div>
              <div className="h-8 w-24 bg-zinc-200 rounded"></div>
              <div className="h-20 w-full bg-zinc-100 rounded-xl"></div>
            </div>
          </div>
        }>
          <CheckoutStartContent />
        </Suspense>
      </main>
    </div>
  );
}
