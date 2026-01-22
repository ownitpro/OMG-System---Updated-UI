// src/app/api/auth/[...nextauth]/route.ts
// NextAuth.js configuration with AWS Cognito provider
// Replaces Supabase Auth for authentication

import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import { syncUserToDatabase, ensureUserProfile, getUserByEmail } from '@/lib/auth/syncUser';
import { getAwsConfig } from '@/lib/aws/config';
import crypto from 'crypto';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      accountType?: 'personal' | 'business';
    };
  }

  interface User {
    id: string;
    accountType?: 'personal' | 'business';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    accountType?: 'personal' | 'business';
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    // AWS Cognito Provider (primary)
    ...(process.env.COGNITO_CLIENT_ID
      ? [
          CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID!,
            clientSecret: process.env.COGNITO_CLIENT_SECRET!,
            issuer: process.env.COGNITO_ISSUER!,
            authorization: {
              params: {
                scope: 'openid email profile',
              },
            },
          }),
        ]
      : []),

    // Google OAuth (optional - can be configured directly or through Cognito)
    ...(process.env.GOOGLE_CLIENT_ID && process.env.AUTH_PROVIDER !== 'cognito'
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),

    // Credentials provider for email/password authentication
    CredentialsProvider({
      id: 'credentials',
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        accountType: { label: 'Account Type', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('[Auth] Missing email or password');
          return null;
        }

        const email = credentials.email.toLowerCase();
        const password = credentials.password;

        console.log('[Auth] Attempting login for:', email);

        // First, verify the user exists in the database
        const { data: existingUser, error: dbError } = await getUserByEmail(email);

        if (dbError) {
          console.error('[Auth] Database error:', dbError.message);
          return null;
        }

        if (!existingUser) {
          console.log('[Auth] User not found in database:', email);
          return null;
        }

        console.log('[Auth] User found in database:', existingUser.id);

        // LOCAL AUTHENTICATION
        if (process.env.AUTH_PROVIDER === 'local') {
           console.log('[Auth] Using LOCAL authentication provider');
           const passwordHash = (existingUser as any).passwordHash;

           if (!passwordHash) {
             console.log('[Auth] Local auth enabled but user has no password hash');
             return null;
           }

           // Dynamically import bcryptjs to avoid bundler analysis (build error if missing)
           // Using string concatenation to prevent static optimization
           const bcryptModule = await import('bcryptjs' + '');
           const bcrypt = bcryptModule.default || bcryptModule;
           const isValid = await bcrypt.compare(password, passwordHash);

           if (isValid) {
             console.log('[Auth] Local authentication successful for:', email);
             return {
               id: existingUser.id,
               email: existingUser.email,
               name: existingUser.name || email.split('@')[0],
               accountType: (existingUser as any).accountType || 'personal',
             };
           } else {
             console.log('[Auth] Invalid local password for:', email);
             return null;
           }
        }

        // COGNITO AUTHENTICATION (Fallback/Default)
        console.log('[Auth] Using COGNITO authentication provider');
        const clientId = process.env.COGNITO_CLIENT_ID;
        const clientSecret = process.env.COGNITO_CLIENT_SECRET;

        // ... Cognito logic follows ...
        if (clientId) {
          try {
            const cognitoClient = new CognitoIdentityProviderClient(getAwsConfig());

            // Calculate secret hash if client secret exists
            let secretHash: string | undefined;
            if (clientSecret) {
              const message = email + clientId;
              secretHash = crypto
                .createHmac('sha256', clientSecret)
                .update(message)
                .digest('base64');
            }

            const command = new InitiateAuthCommand({
              AuthFlow: 'USER_PASSWORD_AUTH',
              ClientId: clientId,
              AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
                ...(secretHash && { SECRET_HASH: secretHash }),
              },
            });

            const response = await cognitoClient.send(command);

            if (response.AuthenticationResult) {
              console.log('[Auth] Cognito authentication successful for:', email);
              return {
                id: existingUser.id,
                email: existingUser.email,
                name: existingUser.name || email.split('@')[0],
                accountType: (existingUser as any).accountType || 'personal',
              };
            }
          } catch (cognitoError: any) {
            console.error('[Auth] Cognito authentication error:', cognitoError.name, cognitoError.message);

            // Handle specific Cognito errors
            if (cognitoError.name === 'NotAuthorizedException') {
              console.log('[Auth] Invalid password for:', email);
              return null;
            }
            if (cognitoError.name === 'UserNotFoundException') {
              console.log('[Auth] User not found in Cognito:', email);
              return null;
            }
            if (cognitoError.name === 'UserNotConfirmedException') {
              console.log('[Auth] User not confirmed:', email);
              return null;
            }

            // For other errors, log and deny access
            return null;
          }
        } else {
          console.log('[Auth] Cognito not configured, cannot authenticate');
          return null;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    // Called when user signs in
    async signIn({ user, account, profile }) {
      try {
        // Sync user to core.User table in Aurora PostgreSQL
        await syncUserToDatabase({
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          accountType: user.accountType,
        });

        // Create SecureVault-specific profile if needed
        await ensureUserProfile(user.id);

        return true;
      } catch (error) {
        console.error('Error syncing user to database:', error);
        // Still allow sign-in even if sync fails (user can be synced later)
        return true;
      }
    },

    // Called when JWT is created or updated
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.accountType = user.accountType;
      }
      return token;
    },

    // Called when session is accessed
    async session({ session, token }) {
      if (session.user) {
        const userId = token.id || token.sub || '';

        // Validate user ID format - must be valid UUID or demo ID
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        const demoIdRegex = /^demo-/;

        if (userId && !uuidRegex.test(userId) && !demoIdRegex.test(userId)) {
          console.error('[Auth] Corrupted user ID detected in session:', userId);
          // Return session with empty ID - this will trigger re-auth
          session.user.id = '';
        } else {
          session.user.id = userId;
        }

        session.user.accountType = token.accountType;
      }
      return session;
    },

    // Redirect callback
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
    newUser: '/onboarding',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  events: {
    async signIn({ user, account, isNewUser }) {
      console.log(`User signed in: ${user.email} (new: ${isNewUser})`);
    },
    async signOut({ token }) {
      console.log(`User signed out: ${token?.email}`);
    },
  },

  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
