import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export class AuthError extends Error {
  constructor(message: string, public statusCode: number = 401) {
    super(message);
    this.name = "AuthError";
  }
}

export async function requireAuth() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new AuthError("Unauthorized", 401);
  }
  return session;
}

export async function requireRole(allowedRoles: string[]) {
  const session = await requireAuth();
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true, organizationId: true },
  });

  if (!user || !allowedRoles.includes(user.role)) {
    throw new AuthError("Forbidden", 403);
  }

  return user;
}

export async function requireClient() {
  return requireRole(["CLIENT"]);
}

export async function requireAdmin() {
  return requireRole(["ADMIN", "OWNER"]);
}

export async function getCurrentUser() {
  const session = await auth();

  if (session?.user?.email) {
    return await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { organization: true },
    });
  }

  // 🔧 DEV MODE BYPASS: Use test client when no session
  if (process.env.NODE_ENV === 'development') {
    console.log('[AUTH HELPER] No session in dev mode, using test client');
    return await prisma.user.findUnique({
      where: { email: 'client@testorg.com' },
      include: { organization: true },
    });
  }

  return null;
}

/**
 * Get authenticated client user (with dev bypass)
 * Returns user object or null
 * TEMPORARY: Has dev mode bypass - REMOVE BEFORE PRODUCTION
 */
export async function getAuthenticatedClientUser() {
  const session = await auth();

  // Try real session first
  let userEmail = session?.user?.email;

  // 🔧 DEV MODE BYPASS
  if (!userEmail && process.env.NODE_ENV === 'development') {
    userEmail = 'client@testorg.com';
    console.log('[API DEV BYPASS] Using test client user');
  }

  if (!userEmail) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true, email: true, role: true, name: true },
  });

  // Verify CLIENT role
  if (!user || user.role !== 'CLIENT') {
    return null;
  }

  return user;
}
