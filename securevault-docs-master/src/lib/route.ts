// src/lib/route.ts
// Route helper utilities

export function withOrg(path: string, orgId: string) {
  return path.replace(":orgId", orgId);
}

