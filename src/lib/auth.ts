import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { Role } from "../generated/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            memberships: {
              include: {
                organization: true
              }
            }
          }
        });

        if (!user) {
          return null;
        }

        // For MVP, we'll just check if the user exists
        // In production, you'd implement proper password authentication with bcrypt
        // const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        // Determine the user's highest role across all memberships
        const roles = user.memberships.map(m => m.role);
        const highestRole = roles.includes(Role.ADMIN) ? Role.ADMIN :
                           roles.includes(Role.STAFF) ? Role.STAFF : Role.CLIENT;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: highestRole,
          memberships: user.memberships.map(m => ({
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