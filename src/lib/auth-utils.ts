import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { Role } from "../generated/prisma";
import { redirect } from "next/navigation";

export interface UserSession {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  memberships: Array<{
    orgId: string;
    role: Role;
    organization: {
      id: string;
      name: string;
      slug: string;
    };
  }>;
  activeOrgId: string | null;
}

export async function getCurrentUser(): Promise<UserSession | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  
  return session.user as UserSession;
}

export async function requireAuth(): Promise<UserSession> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function requireRole(requiredRole: Role): Promise<UserSession> {
  const user = await requireAuth();
  
  // Check if user has the required role or higher
  const roleHierarchy = {
    [Role.CLIENT]: 0,
    [Role.STAFF]: 1,
    [Role.ADMIN]: 2,
  };
  
  if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
    redirect("/403");
  }
  
  return user;
}

export async function requireAdmin(): Promise<UserSession> {
  return requireRole(Role.ADMIN);
}

export async function requireStaffOrAdmin(): Promise<UserSession> {
  const user = await requireAuth();
  
  if (user.role !== Role.ADMIN && user.role !== Role.STAFF) {
    redirect("/403");
  }
  
  return user;
}

export async function requireClient(): Promise<UserSession> {
  return requireRole(Role.CLIENT);
}

export async function requireActiveOrg(): Promise<UserSession> {
  const user = await requireAuth();
  
  if (!user.activeOrgId) {
    redirect("/portal/select-org");
  }
  
  return user;
}

export async function requireOrgAccess(orgId: string): Promise<UserSession> {
  const user = await requireAuth();
  
  // Admins can access any org
  if (user.role === Role.ADMIN) {
    return user;
  }
  
  // Check if user has membership in this org
  const hasAccess = user.memberships.some(m => m.orgId === orgId);
  if (!hasAccess) {
    redirect("/403");
  }
  
  return user;
}

export function canAccessAdmin(user: UserSession): boolean {
  return user.role === Role.ADMIN || user.role === Role.STAFF;
}

export function canAccessPortal(user: UserSession): boolean {
  return user.role === Role.CLIENT || user.role === Role.STAFF || user.role === Role.ADMIN;
}

export function canManageOrg(user: UserSession, orgId: string): boolean {
  // Admins can manage any org
  if (user.role === Role.ADMIN) {
    return true;
  }
  
  // Check if user has admin role in this specific org
  const membership = user.memberships.find(m => m.orgId === orgId);
  return membership?.role === Role.ADMIN || membership?.role === Role.STAFF;
}

export function canViewOrg(user: UserSession, orgId: string): boolean {
  // Admins can view any org
  if (user.role === Role.ADMIN) {
    return true;
  }
  
  // Check if user has any role in this org
  return user.memberships.some(m => m.orgId === orgId);
}

export function getOrgRole(user: UserSession, orgId: string): Role | null {
  const membership = user.memberships.find(m => m.orgId === orgId);
  return membership?.role || null;
}

export function getAccessibleOrgs(user: UserSession) {
  if (user.role === Role.ADMIN) {
    // Admins can access all orgs - this would need to be fetched from DB
    return user.memberships;
  }
  
  return user.memberships;
}

export function switchActiveOrg(user: UserSession, orgId: string): UserSession {
  // Check if user has access to this org
  const membership = user.memberships.find(m => m.orgId === orgId);
  if (!membership) {
    throw new Error("User does not have access to this organization");
  }
  
  return {
    ...user,
    activeOrgId: orgId,
  };
}

// Middleware helper for route protection
export function createRouteProtection(requiredRole?: Role, requireOrg?: boolean) {
  return async function protectRoute() {
    if (requiredRole) {
      await requireRole(requiredRole);
    } else {
      await requireAuth();
    }
    
    if (requireOrg) {
      await requireActiveOrg();
    }
  };
}

// Audit logging helper
export async function logAuditEvent(
  userId: string,
  organizationId: string,
  action: string,
  resourceType?: string,
  resourceId?: string,
  metadata?: any
) {
  const { prisma } = await import("@/lib/db");
  
  await prisma.auditLog.create({
    data: {
      userId,
      organizationId,
      action,
      resourceType,
      resourceId,
      metadata,
    },
  });
}