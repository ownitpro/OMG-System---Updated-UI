"use client";

import Link from "next/link";
import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Suspense } from "react";
import { applyCouponStack, type AppliedCoupon } from "@/lib/checkout/rulesEngine";
import { trackCouponEvent } from "@/lib/analytics/couponAnalytics";
import { readCoupons } from "@/lib/admin/couponStore";
import { PRODUCT_PRICING } from "@/config/pricing";
import {
  SparklesIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

// Map product IDs to product names for pricing lookup
const PRODUCT_NAME_MAP: Record<string, keyof typeof PRODUCT_PRICING> = {
  "securevault-docs": "SecureVault Docs",
  "omg-crm": "OMG-CRM",
  "omg-leads": "OMG-Leads",
  "omg-iq": "OMG-IQ",
  "omg-ai-mastery": "OMG-AI-Mastery",
};

// Product accent colors
const PRODUCT_COLORS: Record<string, string> = {
  "securevault-docs": "#A855F7",
  "omg-crm": "#47BD79",
  "omg-leads": "#47BD79",
  "omg-iq": "#F59E0B",
  "omg-ai-mastery": "#EC4899",
};

function parsePrice(priceStr: string): number {
  // Extract number from "$29.97/month" format
  const match = priceStr.match(/\$([\d.]+)/);
  return match ? Math.round(parseFloat(match[1]) * 100) : 0; // Convert to cents
}

function CheckoutStartContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams.get("product") || "unknown";
  const hasTrial = searchParams.get("trial") === "true";
  const productName = PRODUCT_NAME_MAP[productId] || productId;
  const priceStr = PRODUCT_PRICING[productName as keyof typeof PRODUCT_PRICING]?.price || "$0/month";
  const priceCents = parsePrice(priceStr);
  const currency = "USD";
  const accentColor = PRODUCT_COLORS[productId] || "#47BD79";

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
    <div className="rounded-2xl border border-white/10 bg-[#1e293b] p-6 md:p-8">
      {/* Product Header */}
      <div className="flex items-start gap-4 mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}20` }}
        >
          <SparklesIcon className="w-6 h-6" style={{ color: accentColor }} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">{productName}</h2>
          <p className="text-sm text-white/60">Product: {productId}</p>
        </div>
      </div>

      {/* Price Display */}
      <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="text-sm text-white/60 mb-1">
          {hasTrial ? "After 6-day free trial" : "Monthly subscription"}
        </div>
        {savedCents > 0 ? (
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-white">
              ${(finalCents / 100).toFixed(0)}
            </span>
            <span className="text-lg text-white/40 line-through">
              ${(priceCents / 100).toFixed(0)}
            </span>
            <span
              className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
              style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
            >
              Save ${(savedCents / 100).toFixed(0)}
            </span>
          </div>
        ) : (
          <div className="text-3xl font-bold text-white">
            ${(priceCents / 100).toFixed(0)}<span className="text-lg font-normal text-white/60">/month</span>
          </div>
        )}
      </div>

      {/* Coupon UI */}
      <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="text-sm font-medium text-white mb-3">Have a coupon?</div>
        <div className="flex gap-2">
          <input
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 rounded-xl border border-white/20 bg-[#0f172a] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/40 transition-all"
          />
          <button
            type="button"
            onClick={() => applyStack(couponInput.split(","), "manual")}
            className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-medium text-white hover:bg-white/10 transition-all"
          >
            Apply
          </button>
          {stack.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setCouponInput("");
                applyStack([], "manual");
              }}
              className="rounded-xl border border-white/20 bg-white/5 p-3 text-white/60 hover:bg-white/10 hover:text-white transition-all"
              title="Remove coupons"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {couponMsg && (
          <div className="mt-2 text-xs text-white/60">{couponMsg}</div>
        )}

        {applied.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {applied.map((a) => (
              <span
                key={a.code}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
              >
                <CheckCircleIcon className="w-3.5 h-3.5" />
                {a.code} • {a.percentOff}% off
              </span>
            ))}
          </div>
        )}

        {rejected.length > 0 && (
          <div className="mt-3 space-y-1">
            {rejected.slice(0, 3).map((r) => (
              <div key={r.code} className="text-xs text-amber-400">
                {r.code}: {r.reason}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trial Info */}
      {hasTrial && (
        <div className="mb-6 p-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
          <div className="flex items-center gap-3 text-white">
            <ShieldCheckIcon className="w-5 h-5" style={{ color: accentColor }} />
            <div>
              <div className="font-medium">6-day free trial included</div>
              <div className="text-sm text-white/60">Cancel anytime during trial. No charges until trial ends.</div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={proceedToCheckout}
          className="flex-1 rounded-xl px-6 py-4 text-base font-semibold text-white transition-all shadow-lg hover:shadow-xl"
          style={{
            backgroundColor: accentColor,
            boxShadow: `0 10px 25px -5px ${accentColor}40`
          }}
        >
          {hasTrial ? "Start Free Trial" : "Complete Purchase"}
        </button>

        <Link
          href={`/products/${productId}`}
          className="rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all text-center"
        >
          Back to Product
        </Link>
      </div>

      {/* Security Badge */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/40">
        <ShieldCheckIcon className="w-4 h-4" />
        Secure checkout powered by Stripe
      </div>
    </div>
  );
}

export default function CheckoutStartPage() {
  const { data: session } = useSession();
  const userRole = (session?.user as any)?.role;
  const isAdmin = userRole === "ADMIN" || userRole === "STAFF";
  const backToPortalHref = isAdmin ? "/portal/admin/products" : "/portal/client";

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Minimal Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#47BD79] to-[#3da86a] flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">OMG Systems</span>
            </Link>

            {/* Back Link */}
            <Link
              href={backToPortalHref}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all"
            >
              Back to Portal
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Complete Your Purchase</h1>
          <p className="text-white/60">Review your order and start your subscription</p>
        </div>

        <Suspense fallback={
          <div className="rounded-2xl border border-white/10 bg-[#1e293b] p-6 md:p-8">
            <div className="animate-pulse space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl"></div>
                <div className="space-y-2">
                  <div className="h-5 w-32 bg-white/10 rounded"></div>
                  <div className="h-4 w-24 bg-white/10 rounded"></div>
                </div>
              </div>
              <div className="h-20 w-full bg-white/5 rounded-xl"></div>
              <div className="h-16 w-full bg-white/5 rounded-xl"></div>
              <div className="h-12 w-full bg-white/10 rounded-xl"></div>
            </div>
          </div>
        }>
          <CheckoutStartContent />
        </Suspense>
      </main>
    </div>
  );
}
