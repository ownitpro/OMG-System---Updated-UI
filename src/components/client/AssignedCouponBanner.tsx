"use client";

import { useState, useEffect } from "react";
import { Gift, X, Copy, Check } from "lucide-react";
import useSWR from "swr";

interface AssignedCoupon {
  id: string;
  code: string;
  description: string | null;
  type: "PERCENTAGE" | "FIXED_AMOUNT";
  value: number;
  expiresAt: string | null;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
};

export default function AssignedCouponBanner() {
  const { data, isLoading } = useSWR<{ coupons: AssignedCoupon[]; total: number }>(
    "/api/client/coupons",
    fetcher
  );

  const [dismissed, setDismissed] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Load dismissed coupons from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem("dismissed-coupons");
    if (stored) {
      setDismissed(JSON.parse(stored));
    }
  }, []);

  const handleDismiss = (couponId: string) => {
    const newDismissed = [...dismissed, couponId];
    setDismissed(newDismissed);
    sessionStorage.setItem("dismissed-coupons", JSON.stringify(newDismissed));
  };

  const handleCopy = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatDiscount = (coupon: AssignedCoupon) => {
    if (coupon.type === "PERCENTAGE") {
      return `${coupon.value}% off`;
    }
    return `$${(coupon.value / 100).toFixed(2)} off`;
  };

  const formatExpiry = (expiresAt: string | null) => {
    if (!expiresAt) return null;
    const date = new Date(expiresAt);
    const now = new Date();
    const daysLeft = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysLeft <= 0) return null;
    if (daysLeft <= 3) return `Expires in ${daysLeft} day${daysLeft !== 1 ? "s" : ""}`;
    return `Expires ${date.toLocaleDateString()}`;
  };

  // Don't render if loading or no coupons
  if (isLoading || !data?.coupons?.length) {
    return null;
  }

  // Filter out dismissed coupons
  const visibleCoupons = data.coupons.filter((c) => !dismissed.includes(c.id));

  if (visibleCoupons.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {visibleCoupons.map((coupon) => (
        <div
          key={coupon.id}
          className="relative overflow-hidden rounded-xl border border-[#A855F7]/30 bg-gradient-to-r from-[#A855F7]/10 via-[#A855F7]/5 to-transparent p-4"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A855F7]/20">
                <Gift className="h-5 w-5 text-[#A855F7]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">
                    You have a coupon!
                  </span>
                  <span className="rounded-full bg-[#A855F7]/20 px-2 py-0.5 text-xs font-medium text-[#A855F7]">
                    {formatDiscount(coupon)}
                  </span>
                </div>
                <p className="text-xs text-white/60">
                  {coupon.description || `Use code ${coupon.code} at checkout`}
                  {coupon.expiresAt && (
                    <span className="ml-2 text-amber-400">
                      {formatExpiry(coupon.expiresAt)}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Copy Code Button */}
              <button
                onClick={() => handleCopy(coupon.code)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  copiedCode === coupon.code
                    ? "bg-green-500/20 text-green-400"
                    : "bg-[#A855F7]/20 text-[#A855F7] hover:bg-[#A855F7]/30"
                }`}
              >
                {copiedCode === coupon.code ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    {coupon.code}
                  </>
                )}
              </button>

              {/* Dismiss Button */}
              <button
                onClick={() => handleDismiss(coupon.id)}
                className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white transition-all"
                title="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
