export type CouponCategory = "promo" | "partner" | "loyalty" | "seasonal" | "referral" | "other";

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
  // New fields for enhanced features
  category?: CouponCategory; // Organize coupons by type
  minPurchaseCents?: number; // Minimum purchase requirement
  firstTimeOnly?: boolean; // Restrict to new customers only
  totalSavingsCents?: number; // Track total savings given by this coupon
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
  const now = new Date();
  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter((c) => c.enabled).length;
  const totalRedemptions = coupons.reduce((sum, c) => sum + c.redeemedCount, 0);
  const avgDiscount = coupons.length > 0
    ? Math.round(coupons.reduce((sum, c) => sum + c.percentOff, 0) / coupons.length)
    : 0;

  // Calculate total savings given
  const totalSavingsCents = coupons.reduce((sum, c) => sum + (c.totalSavingsCents || 0), 0);

  // Count expired coupons
  const expiredCoupons = coupons.filter((c) => c.endsAt && new Date(c.endsAt) < now).length;

  // Count expiring soon (within 7 days)
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const expiringSoon = coupons.filter((c) => {
    if (!c.endsAt) return false;
    const endsAt = new Date(c.endsAt);
    return endsAt > now && endsAt <= sevenDaysFromNow;
  }).length;

  // Count scheduled (not yet started)
  const scheduledCoupons = coupons.filter((c) => c.startsAt && new Date(c.startsAt) > now).length;

  return {
    totalCoupons,
    activeCoupons,
    totalRedemptions,
    avgDiscount,
    totalSavingsCents,
    expiredCoupons,
    expiringSoon,
    scheduledCoupons,
  };
}

// Bulk operations
export function bulkToggleCoupons(ids: string[], enabled: boolean) {
  const list = readCoupons();
  writeCoupons(list.map((c) => (ids.includes(c.id) ? { ...c, enabled } : c)));
}

export function bulkDeleteCoupons(ids: string[]) {
  const list = readCoupons();
  writeCoupons(list.filter((c) => !ids.includes(c.id)));
}

// Duplicate a coupon
export function duplicateCoupon(id: string): Coupon | null {
  const list = readCoupons();
  const original = list.find((c) => c.id === id);
  if (!original) return null;

  const newCoupon: Coupon = {
    ...original,
    id: `cpn_${Math.floor(100000 + Math.random() * 900000)}`,
    code: `${original.code}_COPY`,
    createdAt: new Date().toISOString(),
    redeemedCount: 0,
    totalSavingsCents: 0,
    enabled: false, // Start disabled to avoid accidental use
  };

  upsertCoupon(newCoupon);
  return newCoupon;
}

// Export coupons to CSV
export function exportCouponsToCSV(): string {
  const coupons = readCoupons();
  const headers = [
    "Code",
    "Status",
    "Discount Type",
    "Discount Value",
    "Category",
    "Redemptions",
    "Max Redemptions",
    "Min Purchase",
    "First Time Only",
    "Starts At",
    "Ends At",
    "Created At",
    "Note",
  ];

  const rows = coupons.map((c) => [
    c.code,
    c.enabled ? "Enabled" : "Disabled",
    c.discountType,
    c.discountType === "fixed" ? `$${((c.amountOffCents || 0) / 100).toFixed(2)}` : `${c.percentOff}%`,
    c.category || "other",
    c.redeemedCount,
    c.maxRedemptions || "Unlimited",
    c.minPurchaseCents ? `$${(c.minPurchaseCents / 100).toFixed(2)}` : "None",
    c.firstTimeOnly ? "Yes" : "No",
    c.startsAt ? new Date(c.startsAt).toLocaleDateString() : "N/A",
    c.endsAt ? new Date(c.endsAt).toLocaleDateString() : "N/A",
    new Date(c.createdAt).toLocaleDateString(),
    c.note || "",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  return csvContent;
}
