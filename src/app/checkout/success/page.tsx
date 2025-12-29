"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Suspense } from "react";
import { activateProductKey, urlProductToKey } from "@/mock/entitlementStore";
import { redeemCoupon } from "@/lib/admin/couponStore";
import { trackCouponEvent } from "@/lib/analytics/couponAnalytics";
import { PRODUCT_CATALOG } from "@/config/productCatalog";
import {
  CheckCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

// Get product display name from catalog
function getProductName(productId: string): string {
  const item = PRODUCT_CATALOG.find(
    (p) => p.unlockUrl === `/products/${productId}` || p.key === productId.replace(/-/g, "_")
  );
  return item?.name || productId;
}

function CheckoutSuccessContent({ dashboardHref }: { dashboardHref: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("product") ?? "unknown";
  const coupon = searchParams.get("coupon"); // comma-separated stack
  const [status, setStatus] = React.useState<"working" | "done" | "bad">("working");
  const [countdown, setCountdown] = React.useState(3);
  const productName = getProductName(productId);

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

  // Auto-redirect countdown
  React.useEffect(() => {
    if (status !== "done") return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push(`${dashboardHref}?purchased=${encodeURIComponent(productName)}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status, router, productName, dashboardHref]);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1e293b] p-6 md:p-8">
      {status === "done" ? (
        <>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
              <CheckCircleIcon className="w-7 h-7 text-[#47BD79]" />
            </div>
            <div>
              <div className="text-xl font-semibold text-white">You're all set!</div>
              <div className="text-sm text-white/60">Payment successful</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#47BD79]/10 border border-[#47BD79]/30 mb-4">
            <div className="text-sm text-[#47BD79] font-medium">Product Unlocked</div>
            <div className="text-lg font-semibold text-white mt-1">{productName}</div>
          </div>

          {coupon && (
            <div className="text-sm text-white/60 mb-4">
              Coupons applied: <span className="font-medium text-white">{coupon}</span>
            </div>
          )}

          <div className="text-sm text-white/50">
            Redirecting to your dashboard in {countdown}...
          </div>
        </>
      ) : status === "bad" ? (
        <>
          <div className="text-xl font-semibold text-white">Missing product</div>
          <div className="mt-2 text-sm text-white/60">
            We couldn't unlock anything because the product id is invalid.
          </div>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#47BD79] border-t-transparent animate-spin" />
          <div>
            <div className="text-xl font-semibold text-white">Unlocking...</div>
            <div className="text-sm text-white/60">Please wait one moment</div>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`${dashboardHref}?purchased=${encodeURIComponent(productName)}`}
          className="rounded-xl bg-[#47BD79] px-5 py-3 text-sm font-semibold text-white hover:bg-[#3da86a] transition-all shadow-lg shadow-[#47BD79]/30"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/products"
          className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  const { data: session } = useSession();
  const userRole = (session?.user as any)?.role;
  const isAdmin = userRole === "ADMIN" || userRole === "STAFF";
  // Admins go back to admin portal, clients go to client portal
  const dashboardHref = isAdmin ? "/portal/admin" : "/portal/client";

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Minimal Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#47BD79] to-[#3da86a] flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">OMG Systems</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Payment Successful</h1>
          <p className="text-white/60">Thank you for your purchase</p>
        </div>

        <Suspense fallback={
          <div className="rounded-2xl border border-white/10 bg-[#1e293b] p-6 md:p-8">
            <div className="animate-pulse space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-xl"></div>
                <div className="space-y-2">
                  <div className="h-5 w-32 bg-white/10 rounded"></div>
                  <div className="h-4 w-24 bg-white/10 rounded"></div>
                </div>
              </div>
              <div className="h-20 w-full bg-white/5 rounded-xl"></div>
            </div>
          </div>
        }>
          <CheckoutSuccessContent dashboardHref={dashboardHref} />
        </Suspense>
      </main>
    </div>
  );
}
