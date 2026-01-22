# Engineering Team Playbook

Complete step-by-step guide to wire SecureVault Docs with authentication, AWS, and Stripe.

## Table of Contents

1. [Overview](#overview)
2. [Application Architecture](#application-architecture)
3. [Authentication Integration](#authentication-integration)
4. [AWS Integration](#aws-integration)
5. [Stripe Integration](#stripe-integration)
6. [Database Setup](#database-setup)
7. [Environment Configuration](#environment-configuration)
8. [Testing & Deployment](#testing--deployment)

---

## Overview

This playbook provides complete implementation guides for:
- **Authentication**: User signup, login, session management
- **AWS Services**: S3 storage, Textract OCR, SNS notifications
- **Stripe**: Subscriptions, payments, webhooks
- **Database**: PostgreSQL schema and migrations
- **API Routes**: All endpoints and their implementations

### Prerequisites

- Next.js 15+ knowledge
- TypeScript experience
- AWS account with appropriate permissions
- Stripe account (test and live)
- PostgreSQL database
- Environment variables configured

---

## Application Architecture

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **Storage**: AWS S3
- **OCR**: AWS Textract
- **Payments**: Stripe
- **Auth**: NextAuth.js (recommended) or custom
- **Deployment**: Vercel (recommended) or AWS

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── (marketing)/       # Marketing pages
│   ├── demo/              # Demo pages
│   ├── org/               # Business org pages
│   ├── personal/          # Personal vault pages
│   └── portal/            # Client portal pages
├── components/            # React components
├── lib/                   # Utilities and helpers
│   ├── aws/              # AWS service wrappers
│   ├── auth/             # Auth utilities
│   ├── stripe/            # Stripe utilities
│   └── db/                # Database utilities
└── types/                 # TypeScript types
```

### Key Application Paths

#### User Journey: Signup → Onboarding → Usage

1. **Landing** (`/`) → Marketing page
2. **Signup** (`/signup`) → Create account
3. **Pricing** (`/pricing`) → Select plan
4. **Checkout** (`/checkout`) → Stripe payment
5. **Post-Login** (`/post-login`) → Route to org/personal
6. **Dashboard** (`/org/[orgId]/overview` or `/personal`) → Main app

#### Business Flow: Org → Client Portals → Documents

1. **Org Overview** (`/org/[orgId]/overview`) → KPIs, Quick Actions
2. **Create Portal** (`/org/[orgId]/client-portals`) → Create client portal
3. **Client Portal** (`/portal/login`) → Client access
4. **Documents** (`/org/[orgId]/docs`) → Document management
5. **Upload** (`/org/[orgId]/upload`) → Upload files
6. **Shares** (`/org/[orgId]/shares`) → Share links
7. **Requests** (`/org/[orgId]/requests`) → Document requests

#### Personal Flow: Vault → Upload → Organize

1. **Personal Overview** (`/personal`) → Personal dashboard
2. **Vault** (`/personal/vault`) → Document vault
3. **Upload** (`/personal/upload`) → Upload files
4. **Portal** (`/personal/portal`) → Personal portal (Pro only)

---

## Authentication Integration

### Step 1: Choose Authentication Provider

**Recommended**: NextAuth.js v5 (Auth.js)

#### Why NextAuth.js?
- Built for Next.js
- Supports multiple providers (email, OAuth)
- Session management built-in
- TypeScript support
- Secure by default

### Step 2: Install Dependencies

```bash
npm install next-auth@beta
npm install @auth/prisma-adapter  # If using Prisma
npm install bcryptjs  # For password hashing
npm install @types/bcryptjs  # TypeScript types
```

### Step 3: Set Up NextAuth

#### Create Auth Configuration

**File**: `src/lib/auth/config.ts`

```typescript
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    }),
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  session: {
    strategy: "jwt", // or "database" for server-side sessions
  },
  pages: {
    signIn: "/login",
    signUp: "/signup",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
```

#### Create Auth Route Handler

**File**: `src/app/api/auth/[...nextauth]/route.ts`

```typescript
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/config";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

### Step 4: Create Database Schema

**File**: `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  name          String?
  password      String?   // Hashed with bcrypt
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  accounts      Account[]
  sessions      Session[]
  organizations Organization[]
  personalVault PersonalVault?
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Organization {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  ownerId   String
  owner     User     @relation(fields: [ownerId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  members   OrgMember[]
  documents Document[]
  portals   Portal[]
}

model OrgMember {
  id             String       @id @default(cuid())
  orgId          String
  userId         String
  role           String       @default("member") // admin, member
  organization   Organization @relation(fields: [orgId], references: [id])
  createdAt      DateTime     @default(now())
  
  @@unique([orgId, userId])
}

model Document {
  id          String   @id @default(cuid())
  orgId       String?
  userId      String?
  filename    String
  s3Key       String
  s3Bucket    String
  folder      String   @default("Unsorted")
  labels      String[] @default([])
  status      String   @default("uploaded") // uploaded, classified, needs_review
  confidence  Float?
  uploadedAt  DateTime @default(now())
  organization Organization? @relation(fields: [orgId], references: [id])
  
  @@index([orgId])
  @@index([userId])
  @@index([folder])
}
```

### Step 5: Implement Signup Flow

**File**: `src/app/api/auth/signup/route.ts`

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = signupSchema.parse(body);

    // Check if user exists
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split("@")[0],
      },
    });

    // Create default organization for business users
    // Or personal vault for personal users
    // (Based on signup flow)

    return NextResponse.json({
      ok: true,
      userId: user.id,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Signup failed" },
      { status: 500 }
    );
  }
}
```

### Step 6: Protect Routes

**File**: `src/lib/auth/middleware.ts`

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function requireAuth(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  return session;
}
```

**Usage in API routes**:

```typescript
import { requireAuth } from "@/lib/auth/middleware";

export async function GET(req: Request) {
  const session = await requireAuth(req);
  if (!session) return; // Already redirected
  
  // Your protected logic here
}
```

---

## AWS Integration

### Step 1: Set Up AWS Account

1. **Create AWS Account**: https://aws.amazon.com
2. **Create IAM User**: 
   - User: `securevault-docs-app`
   - Permissions: S3, Textract, SNS
3. **Generate Access Keys**: Save securely
4. **Set Up S3 Buckets**:
   - `securevault-docs-prod` (Business)
   - `securevault-docs-personal-prod` (Personal)

### Step 2: Install AWS SDK

```bash
npm install @aws-sdk/client-s3
npm install @aws-sdk/s3-request-presigner
npm install @aws-sdk/client-textract
npm install @aws-sdk/client-sns
```

### Step 3: Configure AWS Client

**File**: `src/lib/aws/config.ts`

```typescript
import { S3Client } from "@aws-sdk/client-s3";
import { TextractClient } from "@aws-sdk/client-textract";
import { SNSClient } from "@aws-sdk/client-sns";

const region = process.env.AWS_REGION || "us-east-1";

export const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const textractClient = new TextractClient({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const snsClient = new SNSClient({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
```

### Step 4: Implement S3 Upload (Presigned URLs)

**File**: `src/lib/aws/s3.ts`

```typescript
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "./config";

export async function presignPutObject(
  bucket: string,
  key: string,
  contentType?: string
): Promise<{ url: string; key: string; headers: Record<string, string> }> {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType || "application/octet-stream",
    // ServerSideEncryption: "aws:kms", // Enable for production
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 900 }); // 15 minutes

  return {
    url,
    key,
    headers: {
      "Content-Type": contentType || "application/octet-stream",
    },
  };
}

export async function getSignedDownloadUrl(
  bucket: string,
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
}
```

### Step 5: Implement Textract OCR

**File**: `src/lib/aws/textract.ts`

```typescript
import { TextractClient, DetectDocumentTextCommand, AnalyzeExpenseCommand } from "@aws-sdk/client-textract";
import { textractClient } from "./config";

export async function detectDocumentText(
  bucket: string,
  key: string
): Promise<string> {
  const command = new DetectDocumentTextCommand({
    Document: {
      S3Object: {
        Bucket: bucket,
        Name: key,
      },
    },
  });

  const response = await textractClient.send(command);
  
  // Extract text from blocks
  const text = (response.Blocks || [])
    .filter((block) => block.BlockType === "LINE")
    .map((block) => block.Text)
    .join("\n");

  return text;
}

export async function analyzeExpense(
  bucket: string,
  key: string
): Promise<any> {
  const command = new AnalyzeExpenseCommand({
    Document: {
      S3Object: {
        Bucket: bucket,
        Name: key,
      },
    },
  });

  const response = await textractClient.send(command);
  return response;
}
```

### Step 6: Update Upload API Routes

**File**: `src/app/api/org/[orgId]/upload/presign/route.ts`

```typescript
import { NextResponse } from "next/server";
import { presignPutObject } from "@/lib/aws/s3";
import { randomUUID } from "crypto";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ orgId: string }> }
) {
  const { orgId } = await params;
  const { name, type, size } = await req.json();

  const bucket = process.env.S3_BUCKET_NAME!;
  const safeName = String(name).replace(/[^a-zA-Z0-9_.-]/g, "_");
  const key = `org-uploads/${orgId}/${randomUUID()}__${safeName}`;

  const presign = await presignPutObject(bucket, key, type);

  return NextResponse.json({
    url: presign.url,
    key: presign.key,
    headers: presign.headers,
  });
}
```

### Step 7: Implement OCR Processing

**File**: `src/app/api/org/[orgId]/ocr/preview/route.ts`

```typescript
import { NextResponse } from "next/server";
import { detectDocumentText } from "@/lib/aws/textract";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ orgId: string }> }
) {
  const { orgId } = await params;
  const { key } = await req.json();

  const bucket = process.env.S3_BUCKET_NAME!;
  
  try {
    const text = await detectDocumentText(bucket, key);
    
    return NextResponse.json({
      text: text.slice(0, 4000), // Limit response size
    });
  } catch (error) {
    console.error("OCR error:", error);
    return NextResponse.json(
      { error: "OCR failed" },
      { status: 500 }
    );
  }
}
```

---

## Stripe Integration

### Step 1: Install Stripe

```bash
npm install stripe
npm install @stripe/stripe-js  # For client-side
```

### Step 2: Set Up Stripe Client

**File**: `src/lib/stripe/client.ts`

```typescript
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});
```

### Step 3: Create Checkout Session

**File**: `src/app/api/billing/checkout/route.ts`

```typescript
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { planId, cycle, track } = await req.json();

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: session.user?.email,
      line_items: [
        {
          price: planId, // Stripe Price ID
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
        track: track || "business", // business or personal
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      subscription_data: {
        metadata: {
          userId: session.user.id,
          track: track || "business",
        },
      },
    });

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 500 }
    );
  }
}
```

### Step 4: Set Up Webhook Handler

**File**: `src/app/api/webhooks/stripe/route.ts`

```typescript
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import { headers } from "next/headers";
import { prisma } from "@/lib/db/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return new NextResponse("No signature", { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as any;
      const userId = session.metadata?.userId;
      const customerId = session.customer;

      if (userId && customerId) {
        // Link user to Stripe customer
        await prisma.user.update({
          where: { id: userId },
          data: { stripeCustomerId: String(customerId) },
        });
      }
      break;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const subscription = event.data.object as any;
      const customerId = subscription.customer;

      // Find user by Stripe customer ID
      const user = await prisma.user.findFirst({
        where: { stripeCustomerId: String(customerId) },
      });

      if (user) {
        // Update subscription in database
        await prisma.subscription.upsert({
          where: { userId: user.id },
          create: {
            userId: user.id,
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0]?.price.id,
            status: subscription.status,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
          update: {
            stripePriceId: subscription.items.data[0]?.price.id,
            status: subscription.status,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as any;
      
      // Cancel subscription in database
      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: { status: "canceled" },
      });
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as any;
      // Handle successful payment
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as any;
      // Handle failed payment
      break;
    }
  }

  return NextResponse.json({ received: true });
}
```

### Step 5: Create Stripe Products & Prices

See [Stripe Playbook](./../stripe-playbook/README.md) for detailed instructions.

---

## Database Setup

### Step 1: Set Up PostgreSQL

1. **Create Database**: 
   - Local: `createdb securevault_docs`
   - Production: Use managed service (AWS RDS, Supabase, etc.)

2. **Set Connection String**:
   ```bash
   DATABASE_URL=postgresql://user:password@localhost:5432/securevault_docs
   ```

### Step 2: Install Prisma

```bash
npm install prisma @prisma/client
npx prisma init
```

### Step 3: Run Migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Step 4: Seed Database (Optional)

```bash
npx prisma db seed
```

---

## Environment Configuration

### Required Environment Variables

**File**: `.env.local`

```bash
# App
NEXT_PUBLIC_BASE_URL=https://securevaultdocs.com
NODE_ENV=production

# Database
DATABASE_URL=postgresql://...

# Auth
NEXTAUTH_URL=https://securevaultdocs.com
NEXTAUTH_SECRET=your-secret-key-here

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
S3_BUCKET_NAME=securevault-docs-prod
S3_BUCKET_PERSONAL=securevault-docs-personal-prod

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=noreply@securevaultdocs.com

# OCR
TEXTRACT_MODE=analyze_expense
OCR_SAMPLE_PCT=100
```

---

## Testing & Deployment

### Step 1: Local Testing

1. **Set up local database**
2. **Configure environment variables**
3. **Run migrations**: `npx prisma migrate dev`
4. **Start dev server**: `npm run dev`
5. **Test all flows**: Signup, login, upload, OCR, checkout

### Step 2: Staging Deployment

1. **Deploy to Vercel staging**
2. **Set up staging database**
3. **Configure Stripe test mode**
4. **Test end-to-end**

### Step 3: Production Deployment

1. **Deploy to Vercel production**
2. **Set up production database**
3. **Configure Stripe live mode**
4. **Set up monitoring**
5. **Enable error tracking**

---

## Complete Implementation Checklist

### Authentication
- [ ] Install NextAuth.js
- [ ] Configure auth providers
- [ ] Set up database schema
- [ ] Implement signup flow
- [ ] Implement login flow
- [ ] Add route protection
- [ ] Test authentication

### AWS
- [ ] Set up AWS account
- [ ] Create S3 buckets
- [ ] Configure IAM permissions
- [ ] Implement presigned URLs
- [ ] Implement Textract OCR
- [ ] Test upload flow
- [ ] Test OCR processing

### Stripe
- [ ] Create Stripe account
- [ ] Create products and prices
- [ ] Implement checkout
- [ ] Set up webhooks
- [ ] Test payments
- [ ] Test subscriptions
- [ ] Test webhook handling

### Database
- [ ] Set up PostgreSQL
- [ ] Create Prisma schema
- [ ] Run migrations
- [ ] Seed test data
- [ ] Test queries

### Deployment
- [ ] Configure environment variables
- [ ] Deploy to staging
- [ ] Test staging
- [ ] Deploy to production
- [ ] Monitor production

---

**Next Steps**: Follow each section step-by-step, testing as you go.

**Questions?** Refer to specific section documentation or contact the engineering lead.

**Last Updated**: [Current Date]

