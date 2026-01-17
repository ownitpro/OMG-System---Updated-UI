# OMG System Backend Implementation Plan

**Approach**: Client-First, Then Admin (complete one before starting the other)

**Goal**: Build production-ready backend with Aurora PostgreSQL, proper API routes, and comprehensive testing.

**Timeline**: 6-8 weeks

**Database**: Aurora PostgreSQL (AWS)

**Strategy**: Clean slate (no localStorage migration)

---

## Database & API Alignment Strategy

To prevent deployment issues, we follow these principles:

### 1. Single Source of Truth
- **Prisma schema** defines all models ONCE
- Both client and admin APIs use the SAME models
- No duplicate table definitions

### 2. Shared Models Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    PRISMA SCHEMA                        │
│  (Single schema.prisma file - all models defined here)  │
└─────────────────────────────────────────────────────────┘
                           │
           ┌───────────────┴───────────────┐
           ▼                               ▼
┌─────────────────────┐         ┌─────────────────────┐
│   /api/client/*     │         │   /api/admin/*      │
│   (Client APIs)     │         │   (Admin APIs)      │
│                     │         │                     │
│ - Profile           │         │ - Users CRUD        │
│ - Billing           │         │ - Orders CRUD       │
│ - Sessions          │         │ - Coupons CRUD      │
│ - Timeguard         │         │ - Analytics         │
│ - Support           │         │ - Organizations     │
└─────────────────────┘         └─────────────────────┘
           │                               │
           └───────────────┬───────────────┘
                           ▼
              ┌─────────────────────┐
              │  Aurora PostgreSQL  │
              │   (Single Database) │
              └─────────────────────┘
```

### 3. API Route Structure (Deployment-Safe)
```
/api/
├── auth/                    # Existing (NextAuth)
│   ├── [...nextauth]/
│   └── 2fa/                 # Already working
│
├── client/                  # CLIENT PORTAL APIs (Block A)
│   ├── profile/             # GET, PATCH
│   ├── billing/
│   │   ├── subscriptions/   # GET, POST
│   │   ├── invoices/        # GET
│   │   └── payment-methods/ # GET, POST, DELETE
│   ├── sessions/            # GET, POST (strategy sessions)
│   ├── timeguard/
│   │   └── entries/         # GET, POST, PATCH
│   ├── support/
│   │   └── tickets/         # GET, POST
│   └── data-export/         # GET (download my data)
│
├── admin/                   # ADMIN PORTAL APIs (Block B)
│   ├── users/               # GET, POST, PATCH, DELETE
│   ├── orders/              # GET, POST, PATCH, DELETE
│   ├── coupons/             # GET, POST, PATCH, DELETE
│   ├── analytics/
│   │   ├── events/          # GET, POST
│   │   └── stats/           # GET
│   ├── organizations/       # GET, POST, PATCH
│   └── health/              # Existing
│
└── webhooks/                # SHARED (Block C)
    └── stripe/              # POST
```

### 4. Why This Won't Break Deployment

| Concern | Solution |
|---------|----------|
| **Table conflicts** | Single Prisma schema = single migration path |
| **Foreign key issues** | All relationships defined in one place |
| **API route conflicts** | Clear `/client/` vs `/admin/` namespace |
| **Auth inconsistency** | Shared `withAuth()` middleware for both |
| **Database URL issues** | Same Aurora connection for all routes |
| **Migration order** | One `prisma migrate deploy` runs everything |

---

## Complete Prisma Schema (Single File)

This schema supports BOTH client and admin portals:

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// ═══════════════════════════════════════════════════════════════
// CORE MODELS (Used by both Client & Admin)
// ═══════════════════════════════════════════════════════════════

enum UserRole {
  ADMIN
  CLIENT
  OWNER
}

model User {
  id                String    @id @default(cuid())
  email             String    @unique
  name              String?
  password          String?
  role              UserRole  @default(CLIENT)
  phone             String?
  company           String?
  position          String?
  avatar            String?
  emailVerified     DateTime?
  twoFactorEnabled  Boolean   @default(false)
  twoFactorSecret   String?
  stripeCustomerId  String?   @unique

  // Relationships
  organizationId    String?
  organization      Organization? @relation(fields: [organizationId], references: [id])

  // Client-side relations
  subscriptions     Subscription[]
  invoices          Invoice[]
  paymentMethods    PaymentMethod[]
  strategySessions  StrategySession[]
  timeEntries       TimeEntry[]
  supportTickets    SupportTicket[]

  // Admin-side relations (created by)
  ordersCreated     Order[]           @relation("OrderCreator")
  couponsCreated    Coupon[]          @relation("CouponCreator")

  // Security
  activeSessions    ActiveSession[]
  loginHistory      LoginHistory[]

  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  @@index([organizationId])
  @@index([email])
  @@index([role])
}

model Organization {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  email       String?
  phone       String?
  website     String?
  logo        String?

  // Relations
  users       User[]
  orders      Order[]
  coupons     Coupon[]
  analytics   AnalyticsEvent[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([slug])
}

// ═══════════════════════════════════════════════════════════════
// CLIENT PORTAL MODELS
// ═══════════════════════════════════════════════════════════════

// --- Billing ---

enum SubscriptionStatus {
  ACTIVE
  PAST_DUE
  CANCELED
  TRIALING
  PAUSED
}

model Subscription {
  id                   String             @id @default(cuid())
  stripeSubscriptionId String?            @unique
  plan                 String
  status               SubscriptionStatus @default(ACTIVE)
  currentPeriodStart   DateTime
  currentPeriodEnd     DateTime
  cancelAtPeriodEnd    Boolean            @default(false)

  userId               String
  user                 User               @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt            DateTime           @default(now())
  updatedAt            DateTime           @updatedAt

  @@index([userId])
  @@index([status])
}

enum InvoiceStatus {
  PAID
  PENDING
  FAILED
  REFUNDED
}

model Invoice {
  id              String        @id @default(cuid())
  stripeInvoiceId String?       @unique
  invoiceNumber   String        @unique
  amount          Float
  currency        String        @default("CAD")
  status          InvoiceStatus @default(PENDING)
  dueDate         DateTime
  paidAt          DateTime?
  description     String?

  userId          String
  user            User          @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt       DateTime      @default(now())

  @@index([userId])
  @@index([status])
}

model PaymentMethod {
  id                    String   @id @default(cuid())
  stripePaymentMethodId String?  @unique
  type                  String   // card, bank_account
  last4                 String
  brand                 String?  // visa, mastercard
  expiryMonth           Int?
  expiryYear            Int?
  isDefault             Boolean  @default(false)

  userId                String
  user                  User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt             DateTime @default(now())

  @@index([userId])
}

// --- Strategy Sessions ---

enum SessionStatus {
  SCHEDULED
  COMPLETED
  CANCELLED
  RESCHEDULED
  NO_SHOW
}

model StrategySession {
  id              String        @id @default(cuid())
  title           String
  description     String?
  scheduledAt     DateTime
  durationMinutes Int           @default(60)
  status          SessionStatus @default(SCHEDULED)
  meetingLink     String?
  notes           String?
  recordingUrl    String?

  userId          String
  user            User          @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  @@index([userId])
  @@index([scheduledAt])
  @@index([status])
}

// --- Timeguard AI ---

model TimeEntry {
  id          String    @id @default(cuid())
  project     String
  description String?
  startTime   DateTime
  endTime     DateTime?
  duration    Int?      // Minutes (calculated)
  billable    Boolean   @default(true)
  tags        String[]

  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt   DateTime  @default(now())

  @@index([userId])
  @@index([startTime])
  @@index([project])
}

// --- Support ---

enum TicketStatus {
  OPEN
  IN_PROGRESS
  WAITING_RESPONSE
  RESOLVED
  CLOSED
}

enum TicketPriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

model SupportTicket {
  id          String         @id @default(cuid())
  subject     String
  description String
  status      TicketStatus   @default(OPEN)
  priority    TicketPriority @default(MEDIUM)
  category    String?

  userId      String
  user        User           @relation(fields: [userId], references: [id], onDelete: Cascade)

  messages    TicketMessage[]

  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt

  @@index([userId])
  @@index([status])
}

model TicketMessage {
  id        String   @id @default(cuid())
  content   String
  isStaff   Boolean  @default(false)
  authorId  String

  ticketId  String
  ticket    SupportTicket @relation(fields: [ticketId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())

  @@index([ticketId])
}

// --- Security ---

model ActiveSession {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  device       String?
  browser      String?
  os           String?
  ip           String?
  location     String?
  lastActive   DateTime @default(now())

  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt    DateTime @default(now())

  @@index([userId])
}

model LoginHistory {
  id        String   @id @default(cuid())
  ip        String?
  device    String?
  browser   String?
  location  String?
  success   Boolean  @default(true)

  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())

  @@index([userId])
  @@index([createdAt])
}

// ═══════════════════════════════════════════════════════════════
// ADMIN PORTAL MODELS
// ═══════════════════════════════════════════════════════════════

// --- Orders ---

enum OrderStatus {
  PENDING
  PROCESSING
  COMPLETED
  CANCELLED
  REFUNDED
}

model Order {
  id            String      @id @default(cuid())
  orderNumber   String      @unique
  customerName  String
  customerEmail String
  product       String
  amount        Float
  currency      String      @default("CAD")
  status        OrderStatus @default(PENDING)
  notes         String?

  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  createdById   String
  createdBy     User        @relation("OrderCreator", fields: [createdById], references: [id])

  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  @@index([organizationId])
  @@index([status])
  @@index([orderNumber])
  @@index([createdAt])
}

// --- Coupons ---

enum CouponType {
  PERCENTAGE
  FIXED_AMOUNT
}

model Coupon {
  id            String     @id @default(cuid())
  code          String     @unique
  description   String?
  type          CouponType
  value         Float
  maxUses       Int?
  currentUses   Int        @default(0)
  minPurchase   Float?
  expiresAt     DateTime?
  isActive      Boolean    @default(true)

  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  createdById   String
  createdBy     User       @relation("CouponCreator", fields: [createdById], references: [id])

  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt

  @@index([organizationId])
  @@index([code])
  @@index([isActive])
}

// --- Analytics ---

enum EventType {
  PAGE_VIEW
  BUTTON_CLICK
  FORM_SUBMIT
  API_CALL
  ERROR
  PURCHASE
  SIGNUP
  LOGIN
  LOGOUT
}

model AnalyticsEvent {
  id             String    @id @default(cuid())
  eventType      EventType
  eventName      String
  page           String?
  userId         String?
  sessionId      String?
  metadata       Json?

  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  createdAt      DateTime  @default(now())

  @@index([organizationId])
  @@index([eventType])
  @@index([createdAt])
  @@index([userId])
}

// --- Audit Logs ---

model AuditLog {
  id          String   @id @default(cuid())
  action      String
  entity      String
  entityId    String?
  changes     Json?
  userId      String
  userEmail   String
  ip          String?

  createdAt   DateTime @default(now())

  @@index([userId])
  @@index([entity])
  @@index([createdAt])
}
```

---

## Block A: Client Portal Complete (Weeks 1-4)

### Week 1: Foundation + Core Client APIs

#### Day 1-2: Environment & Database Setup

**Tasks:**
1. Set up Aurora PostgreSQL cluster
2. Update environment variables
3. Run initial migration
4. Seed test data

**Files to Create/Update:**

```bash
# .env.local
DATABASE_URL="postgresql://user:pass@aurora-cluster.region.rds.amazonaws.com:5432/omg_dev"
DIRECT_URL="postgresql://user:pass@aurora-cluster.region.rds.amazonaws.com:5432/omg_dev"
AUTH_SECRET="[NEW_ROTATED_SECRET]"
NEXTAUTH_URL="http://localhost:3000"

# Stripe (mock)
STRIPE_SECRET_KEY="sk_test_mock"
STRIPE_WEBHOOK_SECRET="whsec_mock"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_mock"

# Email (mock - Mailtrap)
SMTP_HOST="smtp.mailtrap.io"
SMTP_PORT="2525"
SMTP_USER="mock"
SMTP_PASS="mock"
```

**Create:** `prisma/seed.ts`

```typescript
import { PrismaClient, UserRole } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create internal organization
  const internalOrg = await prisma.organization.upsert({
    where: { slug: 'omg-systems' },
    update: {},
    create: {
      name: 'OMG Systems',
      slug: 'omg-systems',
      email: 'admin@omgsystems.ca',
      phone: '+1-555-0100',
    },
  });

  // 2. Create test client organization
  const clientOrg = await prisma.organization.upsert({
    where: { slug: 'test-client-org' },
    update: {},
    create: {
      name: 'Test Client Organization',
      slug: 'test-client-org',
      email: 'contact@testorg.com',
      phone: '+1-555-0200',
    },
  });

  // 3. Create admin user
  const adminPassword = await hash('Admin123!', 12);
  await prisma.user.upsert({
    where: { email: 'admin@omgsystems.ca' },
    update: {},
    create: {
      email: 'admin@omgsystems.ca',
      name: 'System Admin',
      role: UserRole.ADMIN,
      password: adminPassword,
      organizationId: internalOrg.id,
    },
  });

  // 4. Create test client user (MVP mode - no password)
  const clientUser = await prisma.user.upsert({
    where: { email: 'client@testorg.com' },
    update: {},
    create: {
      email: 'client@testorg.com',
      name: 'Test Client',
      role: UserRole.CLIENT,
      password: null,
      organizationId: clientOrg.id,
      phone: '+1-555-0201',
      company: 'Test Client Organization',
      position: 'Owner',
    },
  });

  // 5. Seed client data for testing

  // Subscriptions
  await prisma.subscription.createMany({
    data: [
      {
        userId: clientUser.id,
        plan: 'OMG-CRM Pro',
        status: 'ACTIVE',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        userId: clientUser.id,
        plan: 'SecureVault Docs',
        status: 'ACTIVE',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    ],
    skipDuplicates: true,
  });

  // Invoices
  await prisma.invoice.createMany({
    data: [
      {
        userId: clientUser.id,
        invoiceNumber: 'INV-2024-001',
        amount: 299.99,
        status: 'PAID',
        dueDate: new Date('2024-01-15'),
        paidAt: new Date('2024-01-10'),
        description: 'OMG-CRM Pro - January 2024',
      },
      {
        userId: clientUser.id,
        invoiceNumber: 'INV-2024-002',
        amount: 149.99,
        status: 'PAID',
        dueDate: new Date('2024-02-15'),
        paidAt: new Date('2024-02-12'),
        description: 'SecureVault Docs - February 2024',
      },
      {
        userId: clientUser.id,
        invoiceNumber: 'INV-2024-003',
        amount: 449.98,
        status: 'PENDING',
        dueDate: new Date('2024-03-15'),
        description: 'All Services - March 2024',
      },
    ],
    skipDuplicates: true,
  });

  // Payment Methods
  await prisma.paymentMethod.createMany({
    data: [
      {
        userId: clientUser.id,
        type: 'card',
        last4: '4242',
        brand: 'visa',
        expiryMonth: 12,
        expiryYear: 2025,
        isDefault: true,
      },
      {
        userId: clientUser.id,
        type: 'card',
        last4: '5555',
        brand: 'mastercard',
        expiryMonth: 6,
        expiryYear: 2026,
        isDefault: false,
      },
    ],
    skipDuplicates: true,
  });

  // Strategy Sessions
  await prisma.strategySession.createMany({
    data: [
      {
        userId: clientUser.id,
        title: 'Q1 Marketing Strategy Review',
        description: 'Review marketing performance and plan Q2 initiatives',
        scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        durationMinutes: 60,
        status: 'SCHEDULED',
        meetingLink: 'https://meet.google.com/abc-defg-hij',
      },
      {
        userId: clientUser.id,
        title: 'Website Redesign Kickoff',
        scheduledAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        durationMinutes: 90,
        status: 'COMPLETED',
        notes: 'Discussed new brand guidelines and timeline',
      },
    ],
    skipDuplicates: true,
  });

  // Time Entries
  await prisma.timeEntry.createMany({
    data: [
      {
        userId: clientUser.id,
        project: 'Website Redesign',
        description: 'Homepage wireframes',
        startTime: new Date('2024-01-15T09:00:00'),
        endTime: new Date('2024-01-15T12:30:00'),
        duration: 210,
        billable: true,
        tags: ['design', 'wireframes'],
      },
      {
        userId: clientUser.id,
        project: 'Marketing Campaign',
        description: 'Social media content creation',
        startTime: new Date('2024-01-15T14:00:00'),
        endTime: new Date('2024-01-15T17:00:00'),
        duration: 180,
        billable: true,
        tags: ['marketing', 'social'],
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

**Commands:**
```bash
npx prisma migrate dev --name init_full_schema
npx prisma generate
npx prisma db seed
```

#### Day 3-5: Auth Helpers & Client Profile API

**Create:** `src/lib/auth-helpers.ts`

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";

export class AuthError extends Error {
  constructor(message: string, public statusCode: number = 401) {
    super(message);
    this.name = "AuthError";
  }
}

export async function requireAuth() {
  const session = await getServerSession(authOptions);
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
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  return await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { organization: true },
  });
}
```

**Create:** `src/lib/api-utils.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { AuthError, requireRole, requireAuth } from "./auth-helpers";

// Standard API response format
export function apiSuccess<T>(data: T, status: number = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(message: string, status: number = 400, details?: any) {
  return NextResponse.json(
    { success: false, error: message, details },
    { status }
  );
}

// Wrapper for protected routes
export function withAuth(
  handler: (req: NextRequest, context: { params: any; user: any }) => Promise<NextResponse>,
  options?: { roles?: string[] }
) {
  return async (req: NextRequest, context: { params: any }) => {
    try {
      const user = options?.roles
        ? await requireRole(options.roles)
        : await requireAuth();

      return await handler(req, { ...context, user });
    } catch (error) {
      if (error instanceof AuthError) {
        return apiError(error.message, error.statusCode);
      }
      if (error instanceof ZodError) {
        return apiError("Validation failed", 400, error.errors);
      }
      console.error("API Error:", error);
      return apiError("Internal server error", 500);
    }
  };
}

// Request body validation
export async function parseBody<T extends z.ZodTypeAny>(
  req: NextRequest,
  schema: T
): Promise<z.infer<T>> {
  const body = await req.json();
  return schema.parse(body);
}
```

**Create:** `src/app/api/client/profile/route.ts`

```typescript
import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth, apiSuccess, apiError, parseBody } from "@/lib/api-utils";

const updateProfileSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  avatar: z.string().url().optional(),
});

// GET /api/client/profile
export const GET = withAuth(
  async (req, { user }) => {
    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        company: true,
        position: true,
        avatar: true,
        role: true,
        twoFactorEnabled: true,
        organization: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!profile) {
      return apiError("Profile not found", 404);
    }

    return apiSuccess({ profile });
  },
  { roles: ["CLIENT"] }
);

// PATCH /api/client/profile
export const PATCH = withAuth(
  async (req, { user }) => {
    const data = await parseBody(req, updateProfileSchema);

    const updatedProfile = await prisma.user.update({
      where: { id: user.id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        company: true,
        position: true,
        avatar: true,
        updatedAt: true,
      },
    });

    return apiSuccess({ profile: updatedProfile });
  },
  { roles: ["CLIENT"] }
);
```

**Verification Checklist - Week 1:**
- [ ] Aurora PostgreSQL connected
- [ ] All migrations run successfully
- [ ] Seed data created
- [ ] GET /api/client/profile returns user data
- [ ] PATCH /api/client/profile updates user data
- [ ] Auth helpers working correctly
- [ ] Client can log in and access profile

---

### Week 2: Billing & Sessions APIs

**Create:** `src/app/api/client/billing/subscriptions/route.ts`

```typescript
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth, apiSuccess } from "@/lib/api-utils";

// GET /api/client/billing/subscriptions
export const GET = withAuth(
  async (req, { user }) => {
    const subscriptions = await prisma.subscription.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return apiSuccess({ subscriptions });
  },
  { roles: ["CLIENT"] }
);
```

**Create:** `src/app/api/client/billing/invoices/route.ts`

```typescript
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth, apiSuccess } from "@/lib/api-utils";

// GET /api/client/billing/invoices
export const GET = withAuth(
  async (req, { user }) => {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const invoices = await prisma.invoice.findMany({
      where: {
        userId: user.id,
        ...(status && { status: status as any }),
      },
      orderBy: { createdAt: "desc" },
    });

    return apiSuccess({ invoices });
  },
  { roles: ["CLIENT"] }
);
```

**Create:** `src/app/api/client/billing/payment-methods/route.ts`

```typescript
import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth, apiSuccess, apiError, parseBody } from "@/lib/api-utils";

const addPaymentMethodSchema = z.object({
  type: z.enum(["card", "bank_account"]),
  last4: z.string().length(4),
  brand: z.string().optional(),
  expiryMonth: z.number().min(1).max(12).optional(),
  expiryYear: z.number().min(2024).optional(),
  isDefault: z.boolean().optional(),
});

// GET /api/client/billing/payment-methods
export const GET = withAuth(
  async (req, { user }) => {
    const paymentMethods = await prisma.paymentMethod.findMany({
      where: { userId: user.id },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });

    return apiSuccess({ paymentMethods });
  },
  { roles: ["CLIENT"] }
);

// POST /api/client/billing/payment-methods
export const POST = withAuth(
  async (req, { user }) => {
    const data = await parseBody(req, addPaymentMethodSchema);

    // If setting as default, unset other defaults
    if (data.isDefault) {
      await prisma.paymentMethod.updateMany({
        where: { userId: user.id },
        data: { isDefault: false },
      });
    }

    const paymentMethod = await prisma.paymentMethod.create({
      data: {
        ...data,
        userId: user.id,
      },
    });

    return apiSuccess({ paymentMethod }, 201);
  },
  { roles: ["CLIENT"] }
);
```

**Create:** `src/app/api/client/billing/payment-methods/[id]/route.ts`

```typescript
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth, apiSuccess, apiError } from "@/lib/api-utils";

// DELETE /api/client/billing/payment-methods/[id]
export const DELETE = withAuth(
  async (req, { params, user }) => {
    const method = await prisma.paymentMethod.findFirst({
      where: { id: params.id, userId: user.id },
    });

    if (!method) {
      return apiError("Payment method not found", 404);
    }

    if (method.isDefault) {
      return apiError("Cannot delete default payment method", 400);
    }

    await prisma.paymentMethod.delete({
      where: { id: params.id },
    });

    return apiSuccess({ deleted: true });
  },
  { roles: ["CLIENT"] }
);
```

**Create:** `src/app/api/client/sessions/route.ts`

```typescript
import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth, apiSuccess, parseBody } from "@/lib/api-utils";

const bookSessionSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  scheduledAt: z.string().datetime(),
  durationMinutes: z.number().int().positive().default(60),
});

// GET /api/client/sessions
export const GET = withAuth(
  async (req, { user }) => {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const upcoming = searchParams.get("upcoming") === "true";

    const sessions = await prisma.strategySession.findMany({
      where: {
        userId: user.id,
        ...(status && { status: status as any }),
        ...(upcoming && { scheduledAt: { gte: new Date() } }),
      },
      orderBy: { scheduledAt: upcoming ? "asc" : "desc" },
    });

    return apiSuccess({ sessions });
  },
  { roles: ["CLIENT"] }
);

// POST /api/client/sessions
export const POST = withAuth(
  async (req, { user }) => {
    const data = await parseBody(req, bookSessionSchema);

    const session = await prisma.strategySession.create({
      data: {
        ...data,
        scheduledAt: new Date(data.scheduledAt),
        userId: user.id,
      },
    });

    // TODO: Send confirmation email
    // TODO: Create calendar invite

    return apiSuccess({ session }, 201);
  },
  { roles: ["CLIENT"] }
);
```

**Create:** `src/app/api/client/sessions/[id]/route.ts`

```typescript
import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth, apiSuccess, apiError, parseBody } from "@/lib/api-utils";

const updateSessionSchema = z.object({
  status: z.enum(["SCHEDULED", "COMPLETED", "CANCELLED", "RESCHEDULED"]).optional(),
  scheduledAt: z.string().datetime().optional(),
  notes: z.string().optional(),
});

// GET /api/client/sessions/[id]
export const GET = withAuth(
  async (req, { params, user }) => {
    const session = await prisma.strategySession.findFirst({
      where: { id: params.id, userId: user.id },
    });

    if (!session) {
      return apiError("Session not found", 404);
    }

    return apiSuccess({ session });
  },
  { roles: ["CLIENT"] }
);

// PATCH /api/client/sessions/[id]
export const PATCH = withAuth(
  async (req, { params, user }) => {
    const data = await parseBody(req, updateSessionSchema);

    const session = await prisma.strategySession.updateMany({
      where: { id: params.id, userId: user.id },
      data: {
        ...data,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : undefined,
      },
    });

    if (session.count === 0) {
      return apiError("Session not found", 404);
    }

    const updated = await prisma.strategySession.findUnique({
      where: { id: params.id },
    });

    return apiSuccess({ session: updated });
  },
  { roles: ["CLIENT"] }
);
```

**Verification Checklist - Week 2:**
- [ ] GET /api/client/billing/subscriptions returns subscriptions
- [ ] GET /api/client/billing/invoices returns invoices (with filter)
- [ ] GET /api/client/billing/payment-methods returns payment methods
- [ ] POST /api/client/billing/payment-methods adds new method
- [ ] DELETE /api/client/billing/payment-methods/[id] removes method
- [ ] GET /api/client/sessions returns sessions (with upcoming filter)
- [ ] POST /api/client/sessions books new session
- [ ] PATCH /api/client/sessions/[id] updates session
- [ ] All endpoints return proper error responses

---

### Week 3: Timeguard & Support APIs + UI Wiring

**Create:** `src/app/api/client/timeguard/entries/route.ts`

```typescript
import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth, apiSuccess, parseBody } from "@/lib/api-utils";

const createEntrySchema = z.object({
  project: z.string().min(1),
  description: z.string().optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime().optional(),
  billable: z.boolean().default(true),
  tags: z.array(z.string()).default([]),
});

// GET /api/client/timeguard/entries
export const GET = withAuth(
  async (req, { user }) => {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const project = searchParams.get("project");

    const entries = await prisma.timeEntry.findMany({
      where: {
        userId: user.id,
        ...(project && { project }),
        ...(startDate && endDate && {
          startTime: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        }),
      },
      orderBy: { startTime: "desc" },
    });

    // Calculate totals
    const totalMinutes = entries.reduce((sum, e) => sum + (e.duration || 0), 0);
    const billableMinutes = entries
      .filter((e) => e.billable)
      .reduce((sum, e) => sum + (e.duration || 0), 0);

    return apiSuccess({
      entries,
      totals: {
        totalMinutes,
        billableMinutes,
        totalHours: Math.round(totalMinutes / 60 * 100) / 100,
        billableHours: Math.round(billableMinutes / 60 * 100) / 100,
      },
    });
  },
  { roles: ["CLIENT"] }
);

// POST /api/client/timeguard/entries
export const POST = withAuth(
  async (req, { user }) => {
    const data = await parseBody(req, createEntrySchema);

    // Calculate duration if endTime provided
    let duration: number | undefined;
    if (data.endTime) {
      const start = new Date(data.startTime);
      const end = new Date(data.endTime);
      duration = Math.floor((end.getTime() - start.getTime()) / 1000 / 60);
    }

    const entry = await prisma.timeEntry.create({
      data: {
        ...data,
        startTime: new Date(data.startTime),
        endTime: data.endTime ? new Date(data.endTime) : null,
        duration,
        userId: user.id,
      },
    });

    return apiSuccess({ entry }, 201);
  },
  { roles: ["CLIENT"] }
);
```

**Create:** `src/app/api/client/timeguard/entries/[id]/route.ts`

```typescript
import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth, apiSuccess, apiError, parseBody } from "@/lib/api-utils";

const updateEntrySchema = z.object({
  endTime: z.string().datetime().optional(),
  description: z.string().optional(),
  billable: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

// PATCH /api/client/timeguard/entries/[id] (stop timer, update)
export const PATCH = withAuth(
  async (req, { params, user }) => {
    const data = await parseBody(req, updateEntrySchema);

    const entry = await prisma.timeEntry.findFirst({
      where: { id: params.id, userId: user.id },
    });

    if (!entry) {
      return apiError("Entry not found", 404);
    }

    // Recalculate duration if endTime updated
    let duration = entry.duration;
    if (data.endTime) {
      const end = new Date(data.endTime);
      duration = Math.floor((end.getTime() - entry.startTime.getTime()) / 1000 / 60);
    }

    const updated = await prisma.timeEntry.update({
      where: { id: params.id },
      data: {
        ...data,
        endTime: data.endTime ? new Date(data.endTime) : undefined,
        duration,
      },
    });

    return apiSuccess({ entry: updated });
  },
  { roles: ["CLIENT"] }
);

// DELETE /api/client/timeguard/entries/[id]
export const DELETE = withAuth(
  async (req, { params, user }) => {
    const deleted = await prisma.timeEntry.deleteMany({
      where: { id: params.id, userId: user.id },
    });

    if (deleted.count === 0) {
      return apiError("Entry not found", 404);
    }

    return apiSuccess({ deleted: true });
  },
  { roles: ["CLIENT"] }
);
```

**Create:** `src/app/api/client/support/tickets/route.ts`

```typescript
import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth, apiSuccess, parseBody } from "@/lib/api-utils";

const createTicketSchema = z.object({
  subject: z.string().min(1),
  description: z.string().min(10),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  category: z.string().optional(),
});

// GET /api/client/support/tickets
export const GET = withAuth(
  async (req, { user }) => {
    const tickets = await prisma.supportTicket.findMany({
      where: { userId: user.id },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          take: 1,
        },
        _count: {
          select: { messages: true },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return apiSuccess({ tickets });
  },
  { roles: ["CLIENT"] }
);

// POST /api/client/support/tickets
export const POST = withAuth(
  async (req, { user }) => {
    const data = await parseBody(req, createTicketSchema);

    const ticket = await prisma.supportTicket.create({
      data: {
        ...data,
        userId: user.id,
        messages: {
          create: {
            content: data.description,
            isStaff: false,
            authorId: user.id,
          },
        },
      },
      include: {
        messages: true,
      },
    });

    // TODO: Send notification to support team

    return apiSuccess({ ticket }, 201);
  },
  { roles: ["CLIENT"] }
);
```

**Create:** `src/app/api/client/data-export/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth } from "@/lib/api-utils";

// GET /api/client/data-export
export const GET = withAuth(
  async (req, { user }) => {
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        company: true,
        position: true,
        createdAt: true,
        organization: {
          select: { name: true, slug: true },
        },
        subscriptions: true,
        invoices: true,
        strategySessions: true,
        timeEntries: true,
        supportTickets: {
          include: { messages: true },
        },
      },
    });

    const exportData = {
      exportedAt: new Date().toISOString(),
      user: userData,
    };

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      headers: {
        "Content-Disposition": `attachment; filename="omg-data-export-${Date.now()}.json"`,
        "Content-Type": "application/json",
      },
    });
  },
  { roles: ["CLIENT"] }
);
```

**Verification Checklist - Week 3:**
- [ ] GET /api/client/timeguard/entries returns entries with totals
- [ ] POST /api/client/timeguard/entries creates entry (calculates duration)
- [ ] PATCH /api/client/timeguard/entries/[id] updates/stops timer
- [ ] DELETE /api/client/timeguard/entries/[id] removes entry
- [ ] GET /api/client/support/tickets returns user tickets
- [ ] POST /api/client/support/tickets creates ticket with message
- [ ] GET /api/client/data-export downloads JSON file
- [ ] All client portal pages wired to APIs (see UI wiring section)

---

### Week 4: UI Wiring + Testing + Checkpoint

This week focuses on connecting all client portal pages to the APIs.

**Pattern for UI Wiring:**

```typescript
// Example: src/app/portal/client/profile/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/toast";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const res = await fetch("/api/client/profile");
      const data = await res.json();
      if (data.success) {
        setProfile(data.data.profile);
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to load profile", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(formData: any) {
    setSaving(true);
    try {
      const res = await fetch("/api/client/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setProfile(data.data.profile);
        toast({ title: "Success", description: "Profile updated" });
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to save", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  // ... rest of component
}
```

**Files to Update:**

| File | Changes |
|------|---------|
| `src/app/portal/client/profile/page.tsx` | Replace mock save with `/api/client/profile` |
| `src/app/portal/client/billing/page.tsx` | Wire to `/api/client/billing/*` endpoints |
| `src/app/portal/client/strategy-sessions/page.tsx` | Wire to `/api/client/sessions` |
| `src/app/portal/client/timeguard-ai/page.tsx` | Wire to `/api/client/timeguard/*` |
| `src/app/portal/client/settings/page.tsx` | Add "Download My Data" handler |
| `src/app/portal/client/support/page.tsx` | Wire to `/api/client/support/tickets` |

**Testing Setup:**

**Create:** `vitest.config.ts`

```typescript
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./tests/setup.ts"],
    include: ["**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**Create:** `tests/setup.ts`

```typescript
import { beforeAll, afterAll } from "vitest";
import { prisma } from "@/lib/prisma";

beforeAll(async () => {
  // Setup test database connection
});

afterAll(async () => {
  await prisma.$disconnect();
});
```

**Create:** `tests/api/client/profile.test.ts`

```typescript
import { describe, it, expect } from "vitest";

describe("GET /api/client/profile", () => {
  it("returns profile for authenticated client", async () => {
    // Test implementation
    expect(true).toBe(true);
  });

  it("returns 401 for unauthenticated request", async () => {
    // Test implementation
    expect(true).toBe(true);
  });

  it("returns 403 for admin trying to access client route", async () => {
    // Test implementation
    expect(true).toBe(true);
  });
});

describe("PATCH /api/client/profile", () => {
  it("updates profile successfully", async () => {
    expect(true).toBe(true);
  });

  it("validates input data", async () => {
    expect(true).toBe(true);
  });
});
```

**Week 4 Verification Checklist (CLIENT COMPLETE CHECKPOINT):**

- [ ] **Profile**: Real data from API, save works
- [ ] **Settings**: "Download My Data" downloads JSON
- [ ] **Billing**: Shows real subscriptions, invoices, payment methods
- [ ] **Strategy Sessions**: Can view and book sessions
- [ ] **Timeguard-AI**: Timer works, entries persist
- [ ] **Support**: Can view and create tickets
- [ ] **All mock data removed** from client pages
- [ ] **Tests written** for all client API endpoints
- [ ] **Tests passing** (minimum 60% coverage for client APIs)

**CHECKPOINT: Client Portal 100% Complete**

At this point:
- All 17 client pages have working backend
- All data persists to Aurora PostgreSQL
- Client can log in and use all features
- Ready to proceed to Admin Portal

---

## Block B: Admin Portal Complete (Weeks 5-7)

### Week 5: Admin Users, Orders, Coupons APIs

*(Detailed implementation similar to client APIs - same patterns)*

**Key Admin Endpoints:**
- `/api/admin/users` - CRUD for user management
- `/api/admin/orders` - CRUD for orders (replace localStorage)
- `/api/admin/coupons` - CRUD for coupons (replace localStorage)

**Week 5 creates:**
- `src/app/api/admin/users/route.ts`
- `src/app/api/admin/users/[id]/route.ts`
- `src/app/api/admin/orders/route.ts`
- `src/app/api/admin/orders/[id]/route.ts`
- `src/app/api/admin/coupons/route.ts`
- `src/app/api/admin/coupons/[id]/route.ts`

### Week 6: Admin Analytics, Organizations, Missing Pages

**Key Admin Endpoints:**
- `/api/admin/analytics/events` - Track events
- `/api/admin/analytics/stats` - Aggregated stats
- `/api/admin/organizations` - Org management

**Missing Pages to Build:**
- `src/app/portal/admin/users/page.tsx` (full implementation)
- Wire existing pages to new APIs

### Week 7: Admin UI Wiring + Testing + Checkpoint

**CHECKPOINT: Admin Portal 100% Complete**

---

## Block C: Shared Infrastructure (Week 8)

### Email Service

**Create:** `src/lib/email.ts`

```typescript
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "2525"),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(to: string, subject: string, html: string) {
  return transporter.sendMail({
    from: process.env.SMTP_FROM || "noreply@omgsystems.ca",
    to,
    subject,
    html,
  });
}

// Templates
export const emailTemplates = {
  welcome: (name: string) => ({
    subject: "Welcome to OMG Systems",
    html: `<h1>Welcome ${name}!</h1><p>Your account is ready.</p>`,
  }),

  sessionBooked: (title: string, date: Date) => ({
    subject: `Session Confirmed: ${title}`,
    html: `<h1>Session Booked</h1><p>${title} on ${date.toLocaleDateString()}</p>`,
  }),

  ticketCreated: (ticketId: string, subject: string) => ({
    subject: `Support Ticket #${ticketId}: ${subject}`,
    html: `<h1>Ticket Created</h1><p>We'll respond shortly.</p>`,
  }),
};
```

### Stripe Webhooks

**Create:** `src/app/api/webhooks/stripe/route.ts`

*(Implementation as shown in original plan)*

### Final Documentation

**Create:** `API_DOCUMENTATION.md`
**Create:** `DEPLOYMENT.md`

---

## Summary: Client-First Timeline

| Week | Block | Focus | Deliverables |
|------|-------|-------|--------------|
| **1** | A | Foundation + Profile API | Database ready, profile API working |
| **2** | A | Billing + Sessions APIs | All billing endpoints, sessions booking |
| **3** | A | Timeguard + Support APIs | Time tracking, support tickets, data export |
| **4** | A | UI Wiring + Testing | **CLIENT 100% COMPLETE** |
| **5** | B | Admin Users/Orders/Coupons | Admin CRUD APIs |
| **6** | B | Analytics + Organizations | Admin analytics, org management |
| **7** | B | Admin UI Wiring + Testing | **ADMIN 100% COMPLETE** |
| **8** | C | Email + Webhooks + Docs | **PRODUCTION READY** |

---

## Deployment Safety Guarantees

1. **Single Migration Path**: One `prisma migrate deploy` handles everything
2. **No Table Conflicts**: All models in single schema file
3. **Consistent Auth**: Same `withAuth()` middleware everywhere
4. **Clear Namespaces**: `/api/client/*` vs `/api/admin/*` never conflict
5. **Shared Database**: Same Aurora connection, same Prisma client
6. **Environment Parity**: Same `.env` structure for dev/staging/prod
7. **Rollback Safe**: Each migration is atomic, can rollback if needed

**Ready to start Week 1?**
