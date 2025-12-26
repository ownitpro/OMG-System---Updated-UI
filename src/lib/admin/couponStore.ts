export type Coupon = {
  id: string;
  code: string; // e.g. OMG10
  enabled: boolean;
  percentOff: number; // 0-100
  appliesTo: "all" | string[]; // productIds
  assignedTo: "all" | string[]; // clientIds - NEW: specific client targeting
  maxRedemptions?: number;
  redeemedCount: number;
  startsAt?: string; // ISO
  endsAt?: string; // ISO
  createdAt: string; // ISO
  note?: string;
  // Stackable coupons
  stackable?: boolean; // default false
  stackGroup?: string; // only one coupon per group (e.g. "percent")
  priority?: number; // higher runs first
  minSubtotalCents?: number; // requires subtotal threshold
  maxDiscountCents?: number; // cap discount
  appliesToPlan?: "monthly"; // Week 1: monthly only
  // Fixed amount discount option
  amountOffCents?: number; // Alternative to percentOff for fixed discounts
  discountType: "percent" | "fixed"; // Type of discount
};

const KEY = "omg_coupons";

export function readCoupons(): Coupon[] {
  try {
    const raw = localStorage.getItem(KEY);
    const coupons = raw ? JSON.parse(raw) : [];
    // Migrate old coupons that don't have assignedTo field
    return coupons.map((c: Coupon) => ({
      ...c,
      assignedTo: c.assignedTo ?? "all",
      discountType: c.discountType ?? "percent",
    }));
  } catch {
    return [];
  }
}

export function writeCoupons(coupons: Coupon[]) {
  localStorage.setItem(KEY, JSON.stringify(coupons));
  window.dispatchEvent(new Event("omg-coupons-updated"));
}

export function upsertCoupon(coupon: Coupon) {
  const list = readCoupons();
  const idx = list.findIndex((c) => c.id === coupon.id);
  const next = idx >= 0 ? list.map((c) => (c.id === coupon.id ? coupon : c)) : [coupon, ...list];
  writeCoupons(next);
}

export function deleteCoupon(id: string) {
  const list = readCoupons();
  writeCoupons(list.filter((c) => c.id !== id));
}

export function toggleCoupon(id: string, enabled: boolean) {
  const list = readCoupons();
  writeCoupons(list.map((c) => (c.id === id ? { ...c, enabled } : c)));
}

export function createCoupon(input: Omit<Coupon, "id" | "createdAt" | "redeemedCount">) {
  const coupon: Coupon = {
    id: `cpn_${Math.floor(100000 + Math.random() * 900000)}`,
    createdAt: new Date().toISOString(),
    redeemedCount: 0,
    ...input,
  };
  upsertCoupon(coupon);
  return coupon;
}

export function redeemCoupon(code: string) {
  const list = readCoupons();
  const next = list.map((c) =>
    c.code.toUpperCase() === code.toUpperCase()
      ? { ...c, redeemedCount: c.redeemedCount + 1 }
      : c
  );
  writeCoupons(next);
}

// Check if a coupon is valid for a specific client and product
export function isCouponValidFor(coupon: Coupon, clientId: string, productId: string): boolean {
  // Check if coupon is enabled
  if (!coupon.enabled) return false;

  // Check max redemptions
  if (coupon.maxRedemptions && coupon.redeemedCount >= coupon.maxRedemptions) return false;

  // Check date range
  const now = new Date().toISOString();
  if (coupon.startsAt && now < coupon.startsAt) return false;
  if (coupon.endsAt && now > coupon.endsAt) return false;

  // Check client targeting
  if (coupon.assignedTo !== "all") {
    const clientIds = coupon.assignedTo as string[];
    if (!clientIds.includes(clientId)) return false;
  }

  // Check product targeting
  if (coupon.appliesTo !== "all") {
    const productIds = coupon.appliesTo as string[];
    if (!productIds.includes(productId)) return false;
  }

  return true;
}

// Get all coupons available for a specific client
export function getCouponsForClient(clientId: string): Coupon[] {
  return readCoupons().filter((c) => {
    if (!c.enabled) return false;
    if (c.assignedTo === "all") return true;
    return (c.assignedTo as string[]).includes(clientId);
  });
}

// Get coupon statistics
export function getCouponStats() {
  const coupons = readCoupons();
  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter((c) => c.enabled).length;
  const totalRedemptions = coupons.reduce((sum, c) => sum + c.redeemedCount, 0);
  const avgDiscount = coupons.length > 0
    ? Math.round(coupons.reduce((sum, c) => sum + c.percentOff, 0) / coupons.length)
    : 0;

  return {
    totalCoupons,
    activeCoupons,
    totalRedemptions,
    avgDiscount,
  };
}
