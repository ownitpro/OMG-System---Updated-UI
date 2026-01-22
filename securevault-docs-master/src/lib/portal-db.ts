// Portal-specific mock database (in-memory, per dev session)

export type Portal = {
  id: string;
  orgId?: string;          // business path
  personalId?: string;     // personal path
  externalName: string;
  email?: string;
  pinHash?: string | null;
  expiresAt?: string | null; // ISO
  status: 'active' | 'paused' | 'closed';
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

export type PortalRequest = {
  id: string;
  portalId: string;
  label: string;
  required: boolean;
  notes?: string;
  createdAt: string;
};

export type PortalSubmission = {
  id: string;
  portalId: string;
  requestId?: string | null;
  itemKey?: string | null;       // Which item within the request (e.g., 't1_t2', 'invoice')
  folderId?: string | null;      // Target folder for this file
  folderPath?: string[];         // Full folder path for display (e.g., ['Personal Documents', 'Business', '2025'])
  fileKey: string;
  fileName: string;
  bytes: number;
  ocrStatus: 'pending' | 'done' | 'failed';
  createdAt: string;
};

export type GuestToken = {
  id: string;
  portalId: string;
  token: string; // shown in link
  expiresAt: string; // ISO
  usedAt?: string | null;
};

// Mock file storage for development (stores actual file data in memory)
export type MockFile = {
  key: string;
  data: string; // base64 encoded file data
  contentType: string;
  size: number;
  fileName: string;
  uploadedAt: string;
};

export function now() {
  return new Date().toISOString();
}

// Use global object to persist data across hot reloads in development
declare global {
  // eslint-disable-next-line no-var
  var portalDb: {
    portals: Map<string, Portal>;
    requests: Map<string, PortalRequest>;
    submissions: Map<string, PortalSubmission>;
    tokens: Map<string, GuestToken>;
    mockFiles: Map<string, MockFile>; // Mock file storage for development
  } | undefined;
}

// Initialize or reuse existing db
if (!global.portalDb) {
  global.portalDb = {
    portals: new Map<string, Portal>(),
    requests: new Map<string, PortalRequest>(),
    submissions: new Map<string, PortalSubmission>(),
    tokens: new Map<string, GuestToken>(),
    mockFiles: new Map<string, MockFile>(),
  };
}

// Ensure mockFiles exists (for hot reload compatibility with older db instances)
if (!global.portalDb.mockFiles) {
  global.portalDb.mockFiles = new Map<string, MockFile>();
}

export const db = global.portalDb;

export function cuid(prefix = '') {
  return prefix + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// Helper seeds
export function seedBusinessDemo() {
  if ([...db.portals.values()].some(p => p.orgId === 'org_demo')) return; // idempotent
  
  const p1: Portal = {
    id: cuid('p_'),
    orgId: 'org_demo',
    externalName: '2025 Tax Pack – John & Mary',
    email: 'john@example.com',
    pinHash: null,
    expiresAt: null,
    status: 'active',
    createdAt: now(),
    updatedAt: now()
  };
  
  const p2: Portal = {
    id: cuid('p_'),
    orgId: 'org_demo',
    externalName: 'New Hire – Alex R',
    email: 'alex@example.com',
    pinHash: null,
    expiresAt: null,
    status: 'active',
    createdAt: now(),
    updatedAt: now()
  };
  
  db.portals.set(p1.id, p1);
  db.portals.set(p2.id, p2);
  
  const r1: PortalRequest = {
    id: cuid('r_'),
    portalId: p1.id,
    label: 'T4 slips (PDF)',
    required: true,
    createdAt: now()
  };
  
  const r2: PortalRequest = {
    id: cuid('r_'),
    portalId: p1.id,
    label: 'Bank statements (3 mo.)',
    required: true,
    createdAt: now()
  };
  
  const r3: PortalRequest = {
    id: cuid('r_'),
    portalId: p1.id,
    label: 'Notice of Assessment',
    required: false,
    createdAt: now()
  };
  
  [r1, r2, r3].forEach(r => db.requests.set(r.id, r));
  
  const t1: GuestToken = {
    id: cuid('t_'),
    portalId: p1.id,
    token: 'demo-token-jm',
    expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
    usedAt: null
  };
  
  db.tokens.set(t1.token, t1);
}

export function seedPersonalDemo() {
  if ([...db.portals.values()].some(p => p.personalId === 'personal_demo')) return;
  
  const p1: Portal = {
    id: cuid('p_'),
    personalId: 'personal_demo',
    externalName: 'Landlord Docs – Unit 2',
    email: 'landlord@example.com',
    pinHash: null,
    expiresAt: null,
    status: 'active',
    createdAt: now(),
    updatedAt: now()
  };
  
  db.portals.set(p1.id, p1);
  
  const r1: PortalRequest = {
    id: cuid('r_'),
    portalId: p1.id,
    label: 'Lease Agreement',
    required: true,
    createdAt: now()
  };
  
  const r2: PortalRequest = {
    id: cuid('r_'),
    portalId: p1.id,
    label: 'Proof of Insurance',
    required: true,
    createdAt: now()
  };
  
  [r1, r2].forEach(r => db.requests.set(r.id, r));
  
  const t1: GuestToken = {
    id: cuid('t_'),
    portalId: p1.id,
    token: 'demo-token-ll',
    expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
    usedAt: null
  };
  
  db.tokens.set(t1.token, t1);
}

