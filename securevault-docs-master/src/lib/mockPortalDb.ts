// lib/mockPortalDb.ts
// Super-simple in-memory demo store

export type MockPortal = { id: string; orgId: string; clientName: string; clientEmail: string };

export type MockDoc = { id: string; portalId: string; name: string; ts: number };

const store: { portals: MockPortal[]; tokens: Record<string, string>; docs: MockDoc[] } = {
  portals: [
    { id: "p_demo1", orgId: "demo-org", clientName: "ACME Corp", clientEmail: "ops@acme.com" },
    { id: "p_demo2", orgId: "demo-org", clientName: "Maple Homes", clientEmail: "hello@maple.homes" },
  ],
  tokens: {},
  docs: [
    { id: "d1", portalId: "p_demo1", name: "W9.pdf", ts: Date.now() - 86400000 },
    { id: "d2", portalId: "p_demo1", name: "Invoice_0321.pdf", ts: Date.now() - 3600000 },
    { id: "d3", portalId: "p_demo2", name: "Contract_v2.docx", ts: Date.now() - 7200000 },
  ],
};

function rid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`;
}

export function listMockPortals(orgId: string) {
  return store.portals.filter(p => p.orgId === orgId);
}

export function getMockPortal(portalId: string) {
  return store.portals.find(p => p.id === portalId);
}

export function createMockPortal({
  orgId,
  clientName,
  clientEmail,
}: {
  orgId: string;
  clientName: string;
  clientEmail: string;
}) {
  const portal: MockPortal = { id: rid("p"), orgId, clientName, clientEmail };
  store.portals.push(portal);
  const token = issueMockTokenForPortal(portal.id);
  return { portal, token };
}

export function issueMockTokenForPortal(portalId: string) {
  const token = rid("tok");
  store.tokens[token] = portalId;
  return token;
}

export function issueMockTokenForEmail(_email: string) {
  // In a real app, find portal by email. Here we bind to first portal for demo UX.
  const portalId = store.portals[0]?.id || "p_demo1";
  return issueMockTokenForPortal(portalId);
}

export function verifyMockToken(token: string) {
  return store.tokens[token];
}

export function listMockDocs(portalId: string) {
  return store.docs.filter(d => d.portalId === portalId).sort((a, b) => b.ts - a.ts);
}

export function addMockDocs(portalId: string, names: string[]) {
  names.forEach(n => store.docs.push({ id: rid("doc"), portalId, name: n, ts: Date.now() }));
}

