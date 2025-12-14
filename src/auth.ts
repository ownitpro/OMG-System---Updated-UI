import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { Role } from "./generated/prisma";
import { verifyPassword } from "./lib/security";
import { verifyMFAToken, verifyBackupCode } from "./lib/mfa";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
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

        // Find user with error handling for database issues
        let user: any = null;
        try {
          user = await prisma.user.findUnique({
            where: { email: credentials.email },
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
          console.error('[AUTH] Error details:', {
            code: dbError.code,
            meta: dbError.meta,
            stack: dbError.stack?.substring(0, 200)
          });
          
          // If database parsing error, try to fix and retry
          if (dbError.message?.includes('EOF') || dbError.message?.includes('parsing') || dbError.code === 'P2023') {
            console.error('[AUTH] Database parsing error detected');
            // Try to reconnect Prisma client
            try {
              await prisma.$disconnect();
              await new Promise(resolve => setTimeout(resolve, 100)); // Brief delay
              await prisma.$connect();
              
              // Retry query with simpler include to avoid JSON parsing issues
              user = await prisma.user.findUnique({
                where: { email: credentials.email },
                include: {
                  memberships: true
                }
              });
              
              // If user found, manually load organization data
              if (user && user.memberships.length > 0) {
                const orgIds = user.memberships.map((m: any) => m.organizationId);
                const orgs = await prisma.organization.findMany({
                  where: { id: { in: orgIds } }
                });
                // Add organization to each membership (cast to any to avoid type issues)
                user.memberships = user.memberships.map((m: any) => {
                  const org = orgs.find((o: any) => o.id === m.organizationId);
                  return {
                    ...m,
                    organization: org || null
                  };
                }) as any;
              }
            } catch (retryError: any) {
              console.error('[AUTH] Retry failed:', retryError.message);
              return null;
            }
          } else {
            return null;
          }
        }

        if (!user) {
          return null;
        }

        // MVP mode: If user has no password set, allow any password
        // In production, this should be removed and all users must have passwords
        if (!user.password) {
          // MVP: Allow login without password verification
          console.log('[AUTH] MVP mode: User has no password set, allowing login for', user.email);
        } else {
          // Verify password for users with passwords
          const isValidPassword = await verifyPassword(credentials.password, user.password);
          if (!isValidPassword) {
            console.log('[AUTH] Password verification failed for', user.email);
            return null;
          }
          console.log('[AUTH] Password verified for', user.email);
        }

        // Check if user has memberships
        if (!user.memberships || user.memberships.length === 0) {
          console.log('[AUTH] User has no memberships, cannot login');
          return null;
        }

        // Determine the user's highest role across all memberships (for MFA check)
        const userRoles = user.memberships.map((m: any) => m.role);
        const hasAdminOrStaffRole = userRoles.includes(Role.ADMIN) || userRoles.includes(Role.STAFF);
        
        // Check if MFA is required for admin users
        if (user.mfaEnabled && hasAdminOrStaffRole) {
          if (!credentials.mfaCode) {
            // Return special error to trigger MFA flow
            throw new Error("MFA_REQUIRED");
          }

          // Verify MFA code
          if (user.mfaSecret) {
            const isMfaValid = verifyMFAToken(credentials.mfaCode, user.mfaSecret);
            if (!isMfaValid) {
              // Check backup codes
              const backupCodes = (user.backupCodes as string[]) || [];
              const isBackupValid = verifyBackupCode(credentials.mfaCode, backupCodes);
              
              if (!isBackupValid) {
                return null;
              }
              
              // Remove used backup code
              const updatedBackupCodes = backupCodes.filter((code: string) => code !== credentials.mfaCode.toUpperCase());
              await prisma.user.update({
                where: { id: user.id },
                data: { backupCodes: updatedBackupCodes },
              });
            }
          }
        }

        // Determine the user's highest role across all memberships (already calculated above)
        const roles = userRoles;
        const highestRole = roles.includes(Role.ADMIN) ? Role.ADMIN :
                           roles.includes(Role.STAFF) ? Role.STAFF : Role.CLIENT;

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
  session: {
    strategy: "jwt",
  },
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
  },
  secret: process.env.NEXTAUTH_SECRET,
};
