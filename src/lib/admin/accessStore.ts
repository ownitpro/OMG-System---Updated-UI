export type AccessSource = "purchase" | "admin" | "promo";

export type AccessGrant = {
  id: string; // grant id
  clientId: string;
  clientEmail: string;
  productId: string; // hyphen id: "securevault-docs"
  entitlementKey: string; // underscore: "securevault_docs"
  status: "active" | "revoked";
  source: AccessSource;
  note?: string;
  createdAt: string; // ISO
  revokedAt?: string; // ISO
};

const KEY = "omg_access_grants";

export function readAccessGrants(): AccessGrant[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function writeAccessGrants(grants: AccessGrant[]) {
  localStorage.setItem(KEY, JSON.stringify(grants));
}

export function entitlementKeyFromProductId(productId: string) {
  return productId.replaceAll("-", "_");
}

export function upsertGrant(grant: AccessGrant) {
  const grants = readAccessGrants();
  const idx = grants.findIndex((g) => g.id === grant.id);
  const next = idx >= 0 ? grants.map((g) => (g.id === grant.id ? grant : g)) : [grant, ...grants];
  writeAccessGrants(next);
  window.dispatchEvent(new Event("omg-access-updated"));
}

export function revokeGrant(grantId: string) {
  const grants = readAccessGrants();
  const next = grants.map((g) =>
    g.id === grantId ? { ...g, status: "revoked", revokedAt: new Date().toISOString() } : g
  );
  writeAccessGrants(next);
  window.dispatchEvent(new Event("omg-access-updated"));
}

export function grantAccess(input: Omit<AccessGrant, "id" | "createdAt" | "status">) {
  const grant: AccessGrant = {
    id: `grant_${Math.floor(100000 + Math.random() * 900000)}`,
    createdAt: new Date().toISOString(),
    status: "active",
    ...input,
  };
  upsertGrant(grant);
  return grant;
}

/**
 * Week-1 mirror (optional): also reflect in omg_entitlements for the current browser user.
 * This is NOT "real client-based"; it's just to keep your portal behavior consistent in dev.
 */
export function setLocalEntitlement(entitlementKey: string, active: boolean) {
  try {
    const raw = localStorage.getItem("omg_entitlements");
    const obj = raw ? JSON.parse(raw) : {};
    obj[entitlementKey] = active;
    localStorage.setItem("omg_entitlements", JSON.stringify(obj));
    window.dispatchEvent(new Event("omg-entitlements-updated"));
  } catch {}
}

