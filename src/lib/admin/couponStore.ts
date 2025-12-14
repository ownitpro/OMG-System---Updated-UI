export type Coupon = {
  id: string;
  code: string; // e.g. OMG10
  enabled: boolean;
  percentOff: number; // 0-100
  appliesTo: "all" | string[]; // productIds
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
};

const KEY = "omg_coupons";

export function readCoupons(): Coupon[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
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

