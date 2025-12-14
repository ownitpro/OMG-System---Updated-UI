import { readCoupons, type Coupon } from "@/lib/admin/couponStore";

export type CouponResult =
  | { ok: true; coupon: Coupon; discountCents: number; finalCents: number }
  | { ok: false; reason: string };

export function validateCoupon({
  code,
  productId,
  amountCents,
}: {
  code: string;
  productId: string;
  amountCents: number;
}): CouponResult {
  const coupons = readCoupons();
  const now = Date.now();

  const c = coupons.find(
    (x) => x.code.toUpperCase() === code.toUpperCase()
  );

  if (!c) return { ok: false, reason: "Invalid code" };
  if (!c.enabled) return { ok: false, reason: "Coupon disabled" };

  if (c.startsAt && new Date(c.startsAt).getTime() > now)
    return { ok: false, reason: "Coupon not active yet" };

  if (c.endsAt && new Date(c.endsAt).getTime() < now)
    return { ok: false, reason: "Coupon expired" };

  if (
    c.appliesTo !== "all" &&
    !c.appliesTo.includes(productId)
  ) {
    return { ok: false, reason: "Not valid for this product" };
  }

  if (
    typeof c.maxRedemptions === "number" &&
    c.redeemedCount >= c.maxRedemptions
  ) {
    return { ok: false, reason: "Redemption limit reached" };
  }

  const discountCents = Math.floor(
    (amountCents * c.percentOff) / 100
  );

  return {
    ok: true,
    coupon: c,
    discountCents,
    finalCents: Math.max(0, amountCents - discountCents),
  };
}

export function getApplicableCoupons(productId: string) {
  const now = Date.now();

  return readCoupons().filter((c) => {
    if (!c.enabled) return false;
    if (c.startsAt && new Date(c.startsAt).getTime() > now) return false;
    if (c.endsAt && new Date(c.endsAt).getTime() < now) return false;

    if (c.appliesTo !== "all" && !c.appliesTo.includes(productId)) {
      return false;
    }

    if (
      typeof c.maxRedemptions === "number" &&
      c.redeemedCount >= c.maxRedemptions
    ) {
      return false;
    }

    return true;
  });
}

export function findBestCoupon({
  productId,
  amountCents,
}: {
  productId: string;
  amountCents: number;
}) {
  const applicable = getApplicableCoupons(productId);

  let best = null;
  let bestFinal = amountCents;

  for (const c of applicable) {
    const res = validateCoupon({
      code: c.code,
      productId,
      amountCents,
    });

    if (!res.ok) continue;

    if (res.finalCents < bestFinal) {
      best = res;
      bestFinal = res.finalCents;
    }
  }

  return best;
}

