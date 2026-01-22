// src/lib/postLogin.ts

export function postLoginPath(user: any): string {
  // If DEMO_ORG_ROUTE is set (dev), always land in that org overview.
  const demoRoute = process.env.DEMO_ORG_ROUTE;
  if (demoRoute && demoRoute.length > 0) {
    return demoRoute;
  }

  const orgs = Array.isArray(user?.orgs) ? user.orgs : [];
  if (orgs.length === 0) return "/org/new";

  const last = user?.lastOrgId || orgs[0]?.id;
  if (!last) return "/org/new";

  return `/org/${last}/overview`;
}

