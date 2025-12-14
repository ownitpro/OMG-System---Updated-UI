import { readCoupons, type Coupon } from "@/lib/admin/couponStore";

export type AppliedCoupon = {
  code: string;
  percentOff: number;
  discountCents: number;
  finalCentsAfter: number;
};

export type StackResult =
  | {
      ok: true;
      applied: AppliedCoupon[];
      rejected: { code: string; reason: string }[];
      finalCents: number;
      totalDiscountCents: number;
    }
  | { ok: false; reason: string };

function nowMs() {
  return Date.now();
}

function canUse(c: Coupon, productId: string, subtotalCents: number) {
  const now = nowMs();

  if (!c.enabled) return "Coupon disabled";
  if (c.startsAt && new Date(c.startsAt).getTime() > now) return "Coupon not active yet";
  if (c.endsAt && new Date(c.endsAt).getTime() < now) return "Coupon expired";
  if (typeof c.maxRedemptions === "number" && c.redeemedCount >= c.maxRedemptions) return "Redemption limit reached";
  if (typeof (c as any).minSubtotalCents === "number" && subtotalCents < (c as any).minSubtotalCents) return "Subtotal too low";
  if (c.appliesTo !== "all" && !c.appliesTo.includes(productId)) return "Not valid for this product";
  return null;
}

function cap(discount: number, capCents?: number) {
  if (capCents === undefined || capCents === null) return discount;
  return Math.min(discount, capCents);
}

/**
 * Stack rules (Week 1):
 * - Valid + enabled only
 * - If any coupon is non-stackable, it becomes the only coupon
 * - Only one coupon per stackGroup (e.g. "percent")
 * - Priority (desc) determines application order
 * - Percent-off applies sequentially
 */
export function applyCouponStack({
  codes,
  productId,
  subtotalCents,
}: {
  codes: string[];
  productId: string;
  subtotalCents: number;
}): StackResult {
  const all = readCoupons();

  const requested = codes
    .map((code) => all.find((c) => c.code.toUpperCase() === code.toUpperCase()))
    .filter(Boolean) as Coupon[];

  if (requested.length === 0) return { ok: false, reason: "No valid coupons provided" };

  const rejected: { code: string; reason: string }[] = [];
  const valid: Coupon[] = [];

  for (const c of requested) {
    const reason = canUse(c, productId, subtotalCents);
    if (reason) rejected.push({ code: c.code, reason });
    else valid.push(c);
  }

  if (valid.length === 0) return { ok: false, reason: rejected[0]?.reason ?? "No valid coupons" };

  // non-stackable wins alone
  const nonStackable = valid.find((c) => c.stackable === false || c.stackable === undefined);
  // default stackable=false unless explicitly true
  const anyExplicitStackable = valid.some((c) => c.stackable === true);

  if (valid.length > 1) {
    // If any coupon is not explicitly stackable, treat it as non-stackable.
    const firstNonStackable = valid.find((c) => c.stackable !== true);
    if (firstNonStackable && anyExplicitStackable) {
      for (const c of valid) {
        if (c.code !== firstNonStackable.code) rejected.push({ code: c.code, reason: "Cannot stack with another coupon" });
      }
      valid.splice(0, valid.length, firstNonStackable);
    } else if (firstNonStackable && !anyExplicitStackable) {
      // none are marked stackable -> only keep the best one (highest percentOff)
      const best = [...valid].sort((a, b) => b.percentOff - a.percentOff)[0];
      for (const c of valid) {
        if (c.code !== best.code) rejected.push({ code: c.code, reason: "Only one coupon allowed" });
      }
      valid.splice(0, valid.length, best);
    }
  }

  // one per stackGroup
  const usedGroups = new Set<string>();
  const sorted = [...valid].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
  const filteredByGroup: Coupon[] = [];

  for (const c of sorted) {
    const g = c.stackGroup;
    if (g) {
      if (usedGroups.has(g)) {
        rejected.push({ code: c.code, reason: `Only one coupon allowed from group: ${g}` });
        continue;
      }
      usedGroups.add(g);
    }
    filteredByGroup.push(c);
  }

  let running = subtotalCents;
  const applied: AppliedCoupon[] = [];

  for (const c of filteredByGroup) {
    const rawDiscount = Math.floor((running * c.percentOff) / 100);
    const discountCents = cap(rawDiscount, (c as any).maxDiscountCents);
    const next = Math.max(0, running - discountCents);

    applied.push({
      code: c.code,
      percentOff: c.percentOff,
      discountCents,
      finalCentsAfter: next,
    });

    running = next;
  }

  return {
    ok: true,
    applied,
    rejected,
    finalCents: running,
    totalDiscountCents: subtotalCents - running,
  };
}

