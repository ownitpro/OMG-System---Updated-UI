// lib/portal/mock.ts — mock DB

export type Portal = {
  id: string;
  orgId?: string; // business owner
  name: string;
  logoUrl?: string;
  contactEmail?: string;
  createdAt: string;
};

export type Invite = {
  token: string;
  portalId: string;
  email: string;
  expiresAt: string;
  accepted?: boolean;
};

export type Doc = {
  id: string;
  portalId: string;
  name: string;
  size: number;
  label?: string; // e.g., "ID", "Invoice", "Contract"
  uploadedAt: string;
};

const mem = {
  portals: new Map<string, Portal>(),
  invites: new Map<string, Invite>(),
  docs: new Map<string, Doc[]>(),
};

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function seedOnce() {
  if (mem.portals.size) return; // already seeded

  const p1: Portal = {
    id: "p_demo_business",
    orgId: "org_demo",
    name: "Acme Client Portal",
    contactEmail: "client@acme.com",
    createdAt: new Date().toISOString()
  };

  const p2: Portal = {
    id: "p_maple_homes",
    orgId: "org_demo",
    name: "Maple Homes Portal",
    contactEmail: "owner@maplehomes.com",
    createdAt: new Date().toISOString()
  };

  mem.portals.set(p1.id, p1);
  mem.portals.set(p2.id, p2);

  mem.docs.set(p1.id, [
    {
      id: id("doc"),
      portalId: p1.id,
      name: "Driver_License.pdf",
      size: 234_000,
      label: "ID",
      uploadedAt: new Date().toISOString()
    },
    {
      id: id("doc"),
      portalId: p1.id,
      name: "January_Invoice.pdf",
      size: 120_000,
      label: "Invoice",
      uploadedAt: new Date().toISOString()
    }
  ]);

  mem.docs.set(p2.id, []);
}

export function listOrgPortals(orgId: string) {
  seedOnce();
  return Array.from(mem.portals.values()).filter(p => p.orgId === orgId);
}

export function createPortal(orgId: string, name: string, contactEmail?: string): Portal {
  seedOnce();
  const p: Portal = {
    id: id("p"),
    orgId,
    name,
    contactEmail,
    createdAt: new Date().toISOString()
  };
  mem.portals.set(p.id, p);
  mem.docs.set(p.id, []);
  return p;
}

export function getPortal(portalId: string) {
  seedOnce();
  return mem.portals.get(portalId) || null;
}

export function listDocs(portalId: string) {
  seedOnce();
  return mem.docs.get(portalId) || [];
}

export function addDoc(portalId: string, name: string, size: number, label?: string): Doc {
  seedOnce();
  const d: Doc = {
    id: id("doc"),
    portalId,
    name,
    size,
    label,
    uploadedAt: new Date().toISOString()
  };
  const arr = mem.docs.get(portalId) || [];
  arr.unshift(d);
  mem.docs.set(portalId, arr);
  return d;
}

export function makeInvite(portalId: string, email: string): Invite {
  seedOnce();
  const inv: Invite = {
    token: id("tok"),
    portalId,
    email,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString()
  };
  mem.invites.set(inv.token, inv);
  return inv;
}

export function acceptInvite(token: string) {
  seedOnce();
  const inv = mem.invites.get(token);
  if (!inv) return null;
  inv.accepted = true;
  return inv;
}

