// lib/mock/portalStore.ts
// Tiny in-memory + localStorage store so demo survives refresh.

export type PortalInvite = {
  token: string;
  portalId: string;
  clientName: string;
  clientEmail: string;
  pin: string; // 6 digits
  orgId: string;
  orgName?: string;
};

const KEY = "svd.mock.portal.invites.v1";
const UP_KEY = "svd.mock.portal.uploads.v1";

function load<T>(k: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(k);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(k: string, v: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
}

export const PortalStore = {
  seed() {
    // Safe to call multiple times
    const inv = load<Record<string, PortalInvite>>(KEY, {});
    if (Object.keys(inv).length === 0) {
      const token = "demo-portal-abc";
      const portalId = "portal-demo-abc";
      inv[token] = {
        token,
        portalId,
        clientName: "Acme Client",
        clientEmail: "client@acme.com",
        pin: "246810",
        orgId: "demo-org",
        orgName: "Business Demo",
      };
      save(KEY, inv);
    }
  },

  getInvite(token?: string | null) {
    this.seed();
    if (!token) return null;
    const inv = load<Record<string, PortalInvite>>(KEY, {});
    return inv[token] || null;
  },

  getPortalByEmail(email: string) {
    this.seed();
    const inv = load<Record<string, PortalInvite>>(KEY, {});
    // Find portal by email (case-insensitive)
    const lowerEmail = email.toLowerCase().trim();
    for (const invite of Object.values(inv)) {
      if (invite.clientEmail.toLowerCase() === lowerEmail) {
        return invite;
      }
    }
    return null;
  },

  createInvite(clientName: string, clientEmail: string, orgId: string, portalId?: string) {
    this.seed();
    const inv = load<Record<string, PortalInvite>>(KEY, {});
    const token = `tok_${Math.random().toString(36).slice(2, 10)}`;
    const pid = portalId || `portal_${Math.random().toString(36).slice(2, 10)}`;
    const pin = String(Math.floor(100000 + Math.random() * 900000));
    inv[token] = { 
      token, 
      portalId: pid,
      clientName, 
      clientEmail: clientEmail.toLowerCase().trim(),
      pin,
      orgId,
    };
    save(KEY, inv);
    return inv[token];
  },

  verifyPin(token: string, pin: string) {
    const item = this.getInvite(token);
    return !!item && item.pin === pin;
  },

  saveClientUploads(token: string, items: any[]) {
    const all = load<Record<string, any[]>>(UP_KEY, {});
    all[token] = items;
    save(UP_KEY, all);
  },

  getClientUploads(token: string) {
    const all = load<Record<string, any[]>>(UP_KEY, {});
    return all[token] || [];
  },
};

