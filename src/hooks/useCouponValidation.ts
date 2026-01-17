import { useState, useCallback } from "react";

export interface ValidatedCoupon {
  id: string;
  code: string;
  description: string | null;
  type: "PERCENTAGE" | "FIXED_AMOUNT";
  value: number;
  percentOff: number;
  stackable: boolean;
  stackGroup: string | null;
  priority: number;
}

export interface ValidationResult {
  valid: boolean;
  coupon?: ValidatedCoupon;
  discountCents?: number;
  finalCents?: number;
  discountFormatted?: string;
  message: string;
}

export interface AppliedCoupon {
  code: string;
  percentOff: number;
  discountCents: number;
  finalCentsAfter: number;
}

export interface CouponStackResult {
  ok: boolean;
  applied: AppliedCoupon[];
  rejected: { code: string; reason: string }[];
  finalCents: number;
  totalDiscountCents: number;
  reason?: string;
}

// Validate a single coupon code via API
export async function validateCouponCode(
  code: string,
  productId: string,
  subtotalCents: number
): Promise<ValidationResult> {
  try {
    const res = await fetch("/api/coupons/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, productId, subtotalCents }),
    });

    if (!res.ok) {
      return { valid: false, message: "Failed to validate coupon" };
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Coupon validation error:", error);
    return { valid: false, message: "Network error validating coupon" };
  }
}

// Validate multiple coupons and apply stacking rules
export async function validateCouponStack(
  codes: string[],
  productId: string,
  subtotalCents: number
): Promise<CouponStackResult> {
  if (codes.length === 0) {
    return {
      ok: false,
      applied: [],
      rejected: [],
      finalCents: subtotalCents,
      totalDiscountCents: 0,
      reason: "No coupons provided",
    };
  }

  const applied: AppliedCoupon[] = [];
  const rejected: { code: string; reason: string }[] = [];
  const validCoupons: ValidatedCoupon[] = [];

  // Validate each coupon
  for (const code of codes) {
    const result = await validateCouponCode(code, productId, subtotalCents);

    if (result.valid && result.coupon) {
      validCoupons.push(result.coupon);
    } else {
      rejected.push({ code, reason: result.message });
    }
  }

  if (validCoupons.length === 0) {
    return {
      ok: false,
      applied: [],
      rejected,
      finalCents: subtotalCents,
      totalDiscountCents: 0,
      reason: rejected[0]?.reason ?? "No valid coupons",
    };
  }

  // Apply stacking rules
  // Sort by priority (highest first)
  const sorted = [...validCoupons].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

  // Check for non-stackable coupons
  const hasNonStackable = sorted.some((c) => !c.stackable);
  const hasStackable = sorted.some((c) => c.stackable);

  let couponsToApply: ValidatedCoupon[] = sorted;

  if (sorted.length > 1) {
    if (hasNonStackable && hasStackable) {
      // Keep only the first non-stackable one
      const firstNonStackable = sorted.find((c) => !c.stackable)!;
      for (const c of sorted) {
        if (c.code !== firstNonStackable.code) {
          rejected.push({ code: c.code, reason: "Cannot stack with another coupon" });
        }
      }
      couponsToApply = [firstNonStackable];
    } else if (hasNonStackable && !hasStackable) {
      // Keep only the best one (highest discount)
      const best = [...sorted].sort((a, b) => b.percentOff - a.percentOff)[0];
      for (const c of sorted) {
        if (c.code !== best.code) {
          rejected.push({ code: c.code, reason: "Only one coupon allowed" });
        }
      }
      couponsToApply = [best];
    }
  }

  // Check stack groups - only one coupon per group
  const usedGroups = new Set<string>();
  const filteredByGroup: ValidatedCoupon[] = [];

  for (const c of couponsToApply) {
    const group = c.stackGroup;
    if (group) {
      if (usedGroups.has(group)) {
        rejected.push({ code: c.code, reason: `Only one coupon allowed from group: ${group}` });
        continue;
      }
      usedGroups.add(group);
    }
    filteredByGroup.push(c);
  }

  // Calculate discounts sequentially
  let running = subtotalCents;

  for (const c of filteredByGroup) {
    let discountCents: number;

    if (c.type === "PERCENTAGE") {
      discountCents = Math.round((running * c.value) / 100);
    } else {
      discountCents = c.value;
    }

    // Don't discount below zero
    discountCents = Math.min(discountCents, running);
    const next = running - discountCents;

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

// React hook for coupon validation
export function useCouponValidation(productId: string, subtotalCents: number) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CouponStackResult | null>(null);

  const validate = useCallback(
    async (codes: string[]) => {
      setLoading(true);
      try {
        const cleanCodes = codes
          .map((c) => c.trim().toUpperCase())
          .filter(Boolean);

        const validationResult = await validateCouponStack(cleanCodes, productId, subtotalCents);
        setResult(validationResult);
        return validationResult;
      } finally {
        setLoading(false);
      }
    },
    [productId, subtotalCents]
  );

  const clear = useCallback(() => {
    setResult(null);
  }, []);

  return {
    loading,
    result,
    validate,
    clear,
    applied: result?.applied ?? [],
    rejected: result?.rejected ?? [],
    finalCents: result?.finalCents ?? subtotalCents,
    totalDiscount: result?.totalDiscountCents ?? 0,
    isValid: result?.ok ?? false,
  };
}
