type EventName =
  | "checkout_view"
  | "coupon_picker_view"
  | "coupon_apply"
  | "coupon_auto_apply"
  | "checkout_success";

export type CouponEvent = {
  id: string;
  ts: string;
  event: EventName;
  productId: string;
  couponCodes?: string[]; // stack
  subtotalCents?: number;
  finalCents?: number;
  discountCents?: number;
  reason?: string; // for rejects / validation errors
};

const KEY = "omg_coupon_analytics";

function read(): CouponEvent[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write(events: CouponEvent[]) {
  localStorage.setItem(KEY, JSON.stringify(events.slice(0, 2000))); // cap size
  window.dispatchEvent(new Event("omg-analytics-updated"));
}

export function trackCouponEvent(input: Omit<CouponEvent, "id" | "ts">) {
  const events = read();
  const e: CouponEvent = {
    id: `evt_${Math.floor(100000 + Math.random() * 900000)}`,
    ts: new Date().toISOString(),
    ...input,
  };
  write([e, ...events]);
}

export function getCouponAnalytics() {
  const events = read();

  const byEvent = events.reduce<Record<string, number>>((acc, e) => {
    acc[e.event] = (acc[e.event] ?? 0) + 1;
    return acc;
  }, {});

  return { events, byEvent };
}

