// src/lib/mockDb.ts

import type { Vertical } from "./orgContext";

export type DemoOrg = {
  id: string;
  name: string;
  vertical: Vertical;
  stats: {
    clientPortals: number;
    openRequests: number;
    approvals: number;
    storageUsedGb: number;
  };
};

export type Portal = {
  id: string;
  orgId: string;
  vertical: Vertical;
  client: { name: string; email: string; company?: string | null };
  title: string;
  createdAt: string;
};

export type Share = {
  token: string;
  orgId: string;
  label: string;
  allowDownload: boolean;
  pin: string | null;
  expiresAt: string;
  docs: { id: string; name: string; sizeKB: number }[];
};

export type PortalRequest = {
  id: string;
  orgId: string;
  portalId: string;
  templateKey: string;
  clientFolderId?: string; // Root folder for this client
  items: {
    key: string;
    label: string;
    required?: boolean;
    uploaded?: boolean;
    folderId?: string; // Subfolder for this specific document type
  }[];
  dueAt?: string | null;
  status: "open" | "partial" | "complete" | "closed";
  createdAt: string;
};

type StoreShape = {
  orgs: DemoOrg[];
  portals: Portal[];
  shares: Share[];
  requests: PortalRequest[];
};

const g: any = globalThis as any;

if (!g.__svd_store) {
  const orgs: DemoOrg[] = [
    {
      id: "org_demo_accounting",
      name: "Maple Ledger Accounting (Demo)",
      vertical: "accounting",
      stats: {
        clientPortals: 8,
        openRequests: 14,
        approvals: 3,
        storageUsedGb: 12,
      },
    },
    {
      id: "org_demo_real_estate",
      name: "OwnIt Estates (Demo)",
      vertical: "real_estate",
      stats: {
        clientPortals: 5,
        openRequests: 7,
        approvals: 2,
        storageUsedGb: 9,
      },
    },
    {
      id: "org_demo_construction",
      name: "EdgeBuild Contractors (Demo)",
      vertical: "construction",
      stats: {
        clientPortals: 4,
        openRequests: 6,
        approvals: 1,
        storageUsedGb: 6,
      },
    },
    {
      id: "org_demo_pm",
      name: "Nexa Projects (Demo)",
      vertical: "project_management",
      stats: {
        clientPortals: 6,
        openRequests: 10,
        approvals: 4,
        storageUsedGb: 11,
      },
    },
    {
      id: "org_demo_personal",
      name: "Personal Vault (Demo)",
      vertical: "personal",
      stats: {
        clientPortals: 1,
        openRequests: 0,
        approvals: 0,
        storageUsedGb: 1,
      },
    },
  ];

  g.__svd_store = {
    orgs,
    portals: [],
    shares: [],
    requests: [],
  } satisfies StoreShape;
}

const store = g.__svd_store as StoreShape;

// helpers
export function getOrgById(id: string | null | undefined): DemoOrg | null {
  if (!id) return null;
  return store.orgs.find((o) => o.id === id) ?? null;
}

export function addPortal(p: Portal) {
  store.portals.push(p);
}

export function listPortalsForOrg(orgId: string): Portal[] {
  return store.portals.filter((p) => p.orgId === orgId);
}

export function getPortalById(id: string): Portal | null {
  return store.portals.find((p) => p.id === id) ?? null;
}

export function addShare(s: Share) {
  store.shares.push(s);
}

export function getShareByToken(token: string): Share | null {
  return store.shares.find((s) => s.token === token) ?? null;
}

export function getShareCountByOrg(orgId: string): number {
  return store.shares.filter((s) => s.orgId === orgId).length;
}

export function getSharesByOrg(orgId: string): Share[] {
  return store.shares.filter((s) => s.orgId === orgId);
}

export function addPortalRequest(r: PortalRequest) {
  store.requests.push(r);
}

export function listRequestsForPortal(portalId: string): PortalRequest[] {
  return store.requests.filter((r) => r.portalId === portalId);
}

export function listRequestsForOrg(orgId: string): PortalRequest[] {
  return store.requests.filter((r) => r.orgId === orgId);
}

export function getPortalRequestById(requestId: string): PortalRequest | null {
  return store.requests.find((r) => r.id === requestId) || null;
}

export function updateRequestItemStatus(
  requestId: string,
  itemKey: string,
  uploaded: boolean
): boolean {
  const request = store.requests.find((r) => r.id === requestId);
  if (!request) return false;

  const item = request.items.find((i) => i.key === itemKey);
  if (!item) return false;

  item.uploaded = uploaded;

  // Update overall request status based on uploaded items
  const allItems = request.items.length;
  const uploadedItems = request.items.filter((i) => i.uploaded).length;

  if (uploadedItems === 0) {
    request.status = 'open';
  } else if (uploadedItems < allItems) {
    request.status = 'partial';
  } else {
    request.status = 'complete';
  }

  return true;
}
