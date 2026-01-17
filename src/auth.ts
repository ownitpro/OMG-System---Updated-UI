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
  basePath: "/api/auth",
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

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          include: { organization: true }
        });

        if (!user) {
          return null;
        }

        // For MVP: Skip password check if user.password is null
        if (user.password) {
          const isValidPassword = await verifyPassword(credentials.password as string, user.password);
          if (!isValidPassword) {
            return null;
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          organizationId: user.organizationId,
          organization: user.organization
        };
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.organizationId = (user as any).organizationId;
        token.organization = (user as any).organization;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        (session.user as any).role = token.role as Role;
        (session.user as any).organizationId = token.organizationId as string | null;
        (session.user as any).organization = token.organization;
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
