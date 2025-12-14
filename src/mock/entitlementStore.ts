import type { Entitlements, ProductKey } from "@/mock/entitlements";
import { MOCK_ENTITLEMENTS } from "@/mock/entitlements";

const KEY = "omg_entitlements_v1";

// Map URL product ids -> ProductKey
const MAP: Record<string, ProductKey> = {
  "securevault-docs": "securevault_docs",
  "omg-crm": "omg_crm",
  "omg-leads": "omg_leads",
  "omg-iq": "omg_iq",
  "omg-ai-mastery": "omg_ai_mastery",
};

export function urlProductToKey(urlProduct: string | null): ProductKey | null {
  if (!urlProduct) return null;
  return MAP[urlProduct] ?? null;
}

export function getEntitlements(): Entitlements {
  if (typeof window === "undefined") return MOCK_ENTITLEMENTS;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return MOCK_ENTITLEMENTS;
    return { ...MOCK_ENTITLEMENTS, ...JSON.parse(raw) };
  } catch {
    return MOCK_ENTITLEMENTS;
  }
}

export function setEntitlements(next: Entitlements) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(next));
}

export function activateProductKey(productKey: ProductKey) {
  const current = getEntitlements();
  const next = { ...current, [productKey]: "active" } as Entitlements;
  setEntitlements(next);
  return next;
}

export function resetEntitlements() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

export function activateAllProducts() {
  const current = getEntitlements();
  const next = Object.keys(current).reduce((acc, k) => {
    acc[k as keyof typeof current] = "active";
    return acc;
  }, { ...current });

  setEntitlements(next);
  return next;
}

export function lockAllProducts() {
  const current = getEntitlements();
  const next = Object.keys(current).reduce((acc, k) => {
    acc[k as keyof typeof current] = "locked";
    return acc;
  }, { ...current });

  setEntitlements(next);
  return next;
}
