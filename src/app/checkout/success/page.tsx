"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { activateProductKey, urlProductToKey } from "@/mock/entitlementStore";
import { redeemCoupon } from "@/lib/admin/couponStore";
import { trackCouponEvent } from "@/lib/analytics/couponAnalytics";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product") ?? "unknown";
  const coupon = searchParams.get("coupon"); // comma-separated stack
  const [status, setStatus] = React.useState<"working" | "done" | "bad">("working");

  React.useEffect(() => {
    const key = urlProductToKey(productId);
    if (!key) {
      setStatus("bad");
      return;
    }
    activateProductKey(key);
    
    // Redeem coupons if applied
    const codes = coupon ? coupon.split(",").map((s) => s.trim()).filter(Boolean) : [];
    if (codes.length > 0) {
      codes.forEach((code) => redeemCoupon(code));
    }
    
    setStatus("done");
  }, [productId, coupon]);

  // Track conversion
  React.useEffect(() => {
    const codes = coupon ? coupon.split(",").map((s) => s.trim()).filter(Boolean) : [];
    trackCouponEvent({
      event: "checkout_success",
      productId,
      couponCodes: codes.length ? codes : undefined,
    });
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-5">
          <div className="text-sm text-zinc-500">Checkout</div>
          <div className="text-2xl font-semibold">Payment Successful</div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          {status === "done" ? (
            <>
              <div className="text-xl font-semibold">You're all set ✅</div>
              <div className="mt-2 text-sm text-zinc-600">
                We unlocked: <span className="font-semibold">{productId}</span>
              </div>
              {coupon ? (
                <div className="mt-2 text-sm text-muted-foreground">
                  Coupons used: <span className="font-medium text-black">{coupon}</span>
                </div>
              ) : null}
              <div className="mt-1 text-xs text-zinc-500">
                Discount applied instantly. Cancel anytime.
              </div>
            </>
          ) : status === "bad" ? (
            <>
              <div className="text-xl font-semibold">Missing product</div>
              <div className="mt-2 text-sm text-zinc-600">
                We couldn't unlock anything because the product id is invalid.
              </div>
            </>
          ) : (
            <>
              <div className="text-xl font-semibold">Unlocking…</div>
              <div className="mt-2 text-sm text-zinc-600">
                Please wait one second.
              </div>
            </>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/portal/client"
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Go to Portal
            </Link>
            <Link
              href="/products"
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
            >
              Back to Products
            </Link>
          </div>

          <div className="mt-4 text-xs text-zinc-500">
            Week 1 testing: unlock is stored in localStorage. Later: Stripe webhook unlock.
          </div>
        </div>
      </main>
    </div>
  );
}
