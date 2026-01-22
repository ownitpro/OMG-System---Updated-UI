// Minimal mock store for portal system

const mem = {
  portals: new Map<string, any>(),
  sessions: new Map<string, any>(),
};

export function savePortal(p: any) {
  mem.portals.set(p.id, p);
  return p;
}

export function getPortal(id: string) {
  return mem.portals.get(id);
}

export function listOrgPortals(orgId: string) {
  return [...mem.portals.values()].filter((p: any) => p.orgId === orgId);
}

export function listUserPortals(userId: string) {
  return [...mem.portals.values()].filter((p: any) => p.ownerUserId === userId);
}

export function putSession(tok: string, rec: any) {
  mem.sessions.set(tok, rec);
}

export function getSession(tok: string) {
  return mem.sessions.get(tok);
}

