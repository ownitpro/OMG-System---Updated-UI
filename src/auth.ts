import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import { Role } from "./generated/prisma";
import { verifyPassword } from "./lib/security";
import { verifyMFAToken, verifyBackupCode } from "./lib/mfa";
import type { NextAuthConfig } from "next-auth";

// Auth configuration object (for getServerSession compatibility)
export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        mfaCode: { label: "MFA Code", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        let user: any = null;
        try {
          user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
            include: {
              memberships: {
                include: {
                  organization: true
                }
              }
            }
          });
        } catch (dbError: any) {
          console.error('[AUTH] Database error:', dbError.message);
          if (dbError.message?.includes('EOF') || dbError.message?.includes('parsing') || dbError.code === 'P2023') {
            try {
              await prisma.$disconnect();
              await new Promise(resolve => setTimeout(resolve, 100));
              await prisma.$connect();
              user = await prisma.user.findUnique({
                where: { email: credentials.email as string },
                include: { memberships: true }
              });
              if (user && user.memberships.length > 0) {
                const orgIds = user.memberships.map((m: any) => m.organizationId);
                const orgs = await prisma.organization.findMany({
                  where: { id: { in: orgIds } }
                });
                user.memberships = user.memberships.map((m: any) => ({
                  ...m,
                  organization: orgs.find((o: any) => o.id === m.organizationId) || null
                })) as any;
              }
            } catch (retryError: any) {
              console.error('[AUTH] Retry failed:', retryError.message);
              return null;
            }
          } else {
            return null;
          }
        }

        if (!user) return null;

        if (!user.password) {
          console.log('[AUTH] MVP mode: User has no password set, allowing login for', user.email);
        } else {
          const isValidPassword = await verifyPassword(credentials.password as string, user.password);
          if (!isValidPassword) {
            console.log('[AUTH] Password verification failed for', user.email);
            return null;
          }
          console.log('[AUTH] Password verified for', user.email);
        }

        if (!user.memberships || user.memberships.length === 0) {
          console.log('[AUTH] User has no memberships, cannot login');
          return null;
        }

        const userRoles = user.memberships.map((m: any) => m.role);
        const hasAdminOrStaffRole = userRoles.includes(Role.ADMIN) || userRoles.includes(Role.STAFF);

        if (user.mfaEnabled && hasAdminOrStaffRole) {
          if (!credentials.mfaCode) {
            throw new Error("MFA_REQUIRED");
          }
          if (user.mfaSecret) {
            const isMfaValid = verifyMFAToken(credentials.mfaCode as string, user.mfaSecret);
            if (!isMfaValid) {
              const backupCodes = (user.backupCodes as string[]) || [];
              const isBackupValid = verifyBackupCode(credentials.mfaCode as string, backupCodes);
              if (!isBackupValid) return null;
              const updatedBackupCodes = backupCodes.filter((code: string) => code !== (credentials.mfaCode as string).toUpperCase());
              await prisma.user.update({
                where: { id: user.id },
                data: { backupCodes: updatedBackupCodes },
              });
            }
          }
        }

        const highestRole = userRoles.includes(Role.ADMIN) ? Role.ADMIN :
                           userRoles.includes(Role.STAFF) ? Role.STAFF : Role.CLIENT;

        console.log('[AUTH] Login successful for', user.email, 'with role', highestRole);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: highestRole,
          memberships: user.memberships.map((m: any) => ({
            orgId: m.organizationId,
            role: m.role,
            organization: m.organization
          }))
        };
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.memberships = (user as any).memberships;
        token.role = (user as any).role;
        token.activeOrgId = (user as any).memberships?.[0]?.orgId || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        (session.user as any).memberships = token.memberships as any[];
        (session.user as any).role = token.role as Role;
        (session.user as any).activeOrgId = token.activeOrgId as string | null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login"  // Redirect auth errors to login page
  },
  secret: process.env.AUTH_SECRET,
};

// Export authOptions as alias for getServerSession compatibility
export const authOptions = authConfig;

// Initialize NextAuth with the config
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
