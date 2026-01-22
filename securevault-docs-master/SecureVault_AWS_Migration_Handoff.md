# SecureVault AWS Migration - Developer Handoff Document

## Overview

This document contains all credentials, architecture details, and implementation instructions for migrating SecureVault from Supabase to AWS (Aurora PostgreSQL + Cognito).

---

## 1. AWS Credentials & Endpoints

### Aurora PostgreSQL Database

| Setting | Value |
|---------|-------|
| Host (Writer) | `securevault-database.cluster-ct8ewcosm9gd.ca-central-1.rds.amazonaws.com` |
| Host (Reader) | `securevault-database.cluster-ro-ct8ewcosm9gd.ca-central-1.rds.amazonaws.com` |
| Port | `5432` |
| Database | `postgres` |
| Username | `postgres` |
| Password | **(ask project owner)** |
| SSL | Required (AWS default) |
| Region | `ca-central-1` |

**Connection String Format:**
```
postgresql://postgres:PASSWORD@securevault-database.cluster-ct8ewcosm9gd.ca-central-1.rds.amazonaws.com:5432/postgres?sslmode=require
```

### AWS Cognito

| Setting | Value |
|---------|-------|
| User Pool ID | `ca-central-1_JY2OSgN3y` |
| App Client ID | `3utmfc3iknsk572ee4svg1im86` |
| App Client Secret | **(retrieve from Cognito console)** |
| Region | `ca-central-1` |
| Domain | `https://cognito-idp.ca-central-1.amazonaws.com/ca-central-1_JY2OSgN3y` |

### EC2 Instance

| Setting | Value |
|---------|-------|
| Instance ID | `i-09834977106dff67f` |
| Name | `securevault-server` |
| Type | `t3.small` |
| Private IP | `172.31.73.109` |
| Storage | 30 GB gp3 |
| OS | Amazon Linux 2023 |
| Access | Via EC2 Instance Connect Endpoint |

---

## 2. Database Architecture

### Multi-App Schema Structure

The database uses PostgreSQL schemas to support multiple apps sharing a single user pool:

```
postgres (database)
├── core (shared across all apps)
│   ├── User
│   ├── Organization
│   ├── OrganizationMember
│   ├── OrganizationInvite
│   ├── Account
│   ├── Session
│   └── VerificationToken
│
├── hub (central management/billing)
│   ├── App
│   ├── Subscription
│   ├── UserAppAccess
│   └── BillingEvent
│
└── securevault (app-specific)
    ├── UserProfile
    ├── OrganizationProfile
    ├── PersonalVault
    ├── Folder
    ├── Document
    ├── DocumentVersion
    ├── Portal
    ├── GuestToken
    ├── PortalRequest
    ├── PortalSubmission
    ├── RequestTemplate
    ├── RequestTemplateItem
    ├── ShareLink
    ├── ShareLinkAccess
    ├── Connector
    ├── ExpirationNotification
    ├── UserNotification
    ├── UsageRecord
    ├── UsageAlert
    └── AuditLog
```

### Key Concepts

1. **core.User** - The single source of truth for user identity. The `id` field should match the Cognito `sub` (user ID).

2. **hub.Subscription** - Stores subscriptions per user per app. Each app creates subscriptions here with its own `appId`.

3. **securevault.\*** - All SecureVault-specific tables. These reference `core.User` and `core.Organization` via foreign keys.

### Pre-populated Data

The `hub.App` table has two default entries:
- `app_securevault` - SecureVault app
- `app_hub` - Central account management hub

---

## 3. Implementation Guide

### Step 1: Environment Variables

Add these to your `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://postgres:PASSWORD@securevault-database.cluster-ct8ewcosm9gd.ca-central-1.rds.amazonaws.com:5432/postgres?sslmode=require"

# Cognito
COGNITO_CLIENT_ID="3utmfc3iknsk572ee4svg1im86"
COGNITO_CLIENT_SECRET="(get from Cognito console)"
COGNITO_USER_POOL_ID="ca-central-1_JY2OSgN3y"
COGNITO_ISSUER="https://cognito-idp.ca-central-1.amazonaws.com/ca-central-1_JY2OSgN3y"

# AWS Region
AWS_REGION="ca-central-1"

# Existing S3/KMS/Textract settings remain unchanged
```

### Step 2: Install Dependencies

```bash
npm install @aws-sdk/client-cognito-identity-provider amazon-cognito-identity-js
# Or for NextAuth.js integration:
npm install next-auth
```

### Step 3: Database Client Setup

Replace Supabase client with a PostgreSQL client. Recommended: `pg` or Prisma.

**Option A: Using `pg` directly**

```typescript
// lib/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default pool;
```

**Option B: Using Prisma**

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  schemas  = ["core", "hub", "securevault"]
}

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["multiSchema"]
}

model User {
  id            String   @id
  email         String   @unique
  name          String?
  image         String?
  emailVerified DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@schema("core")
  @@map("User")
}

// ... add other models
```

### Step 4: Authentication with Cognito

**Option A: NextAuth.js with Cognito Provider (Recommended)**

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';

const handler = NextAuth({
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: process.env.COGNITO_ISSUER!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Sync user to core.User table on first sign-in
      await syncUserToDatabase(user);
      return true;
    },
    async session({ session, token }) {
      // Add user ID to session
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
```

**User Sync Function:**

```typescript
// lib/auth/syncUser.ts
import pool from '@/lib/db';

export async function syncUserToDatabase(user: {
  id: string;
  email: string;
  name?: string;
  image?: string;
}) {
  const query = `
    INSERT INTO core."User" (id, email, name, image, "createdAt", "updatedAt")
    VALUES ($1, $2, $3, $4, NOW(), NOW())
    ON CONFLICT (id) DO UPDATE SET
      email = EXCLUDED.email,
      name = EXCLUDED.name,
      image = EXCLUDED.image,
      "updatedAt" = NOW()
    RETURNING *
  `;
  
  const result = await pool.query(query, [
    user.id,
    user.email,
    user.name || null,
    user.image || null,
  ]);
  
  return result.rows[0];
}
```

### Step 5: Update Database Queries

**Before (Supabase):**
```typescript
const { data, error } = await supabase
  .from('Document')
  .select('*')
  .eq('organizationId', orgId);
```

**After (PostgreSQL with pg):**
```typescript
const result = await pool.query(
  'SELECT * FROM securevault."Document" WHERE "organizationId" = $1',
  [orgId]
);
const data = result.rows;
```

**After (Prisma):**
```typescript
const data = await prisma.document.findMany({
  where: { organizationId: orgId }
});
```

### Step 6: Schema Reference Changes

Update all table references to include schema prefix:

| Old (Supabase) | New (Aurora) |
|----------------|--------------|
| `User` | `core."User"` |
| `Organization` | `core."Organization"` |
| `OrganizationMember` | `core."OrganizationMember"` |
| `Document` | `securevault."Document"` |
| `Folder` | `securevault."Folder"` |
| `Portal` | `securevault."Portal"` |
| ... | ... |

### Step 7: Create SecureVault User Profile on Sign-up

When a user first accesses SecureVault, create their app-specific profile:

```typescript
// lib/securevault/createUserProfile.ts
export async function ensureUserProfile(userId: string) {
  const query = `
    INSERT INTO securevault."UserProfile" (id, "userId", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, $1, NOW(), NOW())
    ON CONFLICT ("userId") DO NOTHING
    RETURNING *
  `;
  
  await pool.query(query, [userId]);
}
```

### Step 8: Subscription Management

Create a subscription when user upgrades:

```typescript
// lib/subscriptions/createSubscription.ts
export async function createSubscription({
  userId,
  organizationId,
  plan,
  stripeSubscriptionId,
}: {
  userId: string;
  organizationId?: string;
  plan: string;
  stripeSubscriptionId?: string;
}) {
  const query = `
    INSERT INTO hub."Subscription" (
      id, "userId", "organizationId", "appId", plan, status,
      "stripeSubscriptionId", "createdAt", "updatedAt"
    )
    VALUES (
      gen_random_uuid()::text, $1, $2, 'app_securevault', $3, 'active',
      $4, NOW(), NOW()
    )
    ON CONFLICT ("userId", "appId", "organizationId") DO UPDATE SET
      plan = EXCLUDED.plan,
      "stripeSubscriptionId" = EXCLUDED."stripeSubscriptionId",
      "updatedAt" = NOW()
    RETURNING *
  `;
  
  return pool.query(query, [userId, organizationId, plan, stripeSubscriptionId]);
}
```

---

## 4. EC2 Deployment Guide

### Connecting to EC2

1. Go to AWS Console → EC2 → Instances
2. Select `securevault-server`
3. Click Connect → EC2 Instance Connect tab
4. Select "Connect using EC2 Instance Connect Endpoint"
5. Click Connect

### Initial Server Setup

```bash
# Update system
sudo yum update -y

# Install Node.js 20
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Git
sudo yum install -y git

# Create app directory
sudo mkdir -p /var/www/securevault
sudo chown ec2-user:ec2-user /var/www/securevault
```

### Deploy Application

```bash
# Clone repository (or upload files)
cd /var/www/securevault
git clone YOUR_REPO_URL .

# Install dependencies
npm install

# Create environment file
nano .env.local
# (paste environment variables)

# Build application
npm run build

# Start with PM2
pm2 start npm --name "securevault" -- start
pm2 save
pm2 startup
```

### Configure PM2 Ecosystem

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'securevault',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/securevault',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
```

---

## 5. Security Checklist

- [ ] Store database password in AWS Secrets Manager
- [ ] Store Cognito client secret in AWS Secrets Manager
- [ ] Configure security group to only allow EC2 → Aurora traffic
- [ ] Enable Aurora encryption (already enabled)
- [ ] Set up CloudWatch monitoring
- [ ] Configure backup retention (currently 7 days)
- [ ] Add production domain to Cognito callback URLs
- [ ] Enable MFA in Cognito (optional)

---

## 6. Testing Checklist

- [ ] User can sign up with email
- [ ] User can sign in with email
- [ ] User data syncs to `core.User` table
- [ ] `securevault.UserProfile` created on first access
- [ ] Documents upload to S3 (existing integration)
- [ ] Documents save metadata to `securevault.Document`
- [ ] Folder CRUD operations work
- [ ] Organization creation works
- [ ] Organization member management works
- [ ] Portal creation and sharing works

---

## 7. Migration Notes

### Data Migration (if needed)

If you need to migrate existing data from Supabase:

1. Export data from Supabase using `pg_dump` or the dashboard
2. Transform data to match new schema structure
3. Import to Aurora using `psql` or a migration script

### Breaking Changes

1. **Table names** now require schema prefix: `securevault."Document"` instead of `"Document"`
2. **User ID** now comes from Cognito `sub` instead of Supabase `auth.users.id`
3. **Auth flow** changes from Supabase Auth SDK to NextAuth.js + Cognito

---

## 8. Support & Resources

- **AWS Console:** https://ca-central-1.console.aws.amazon.com/
- **Cognito Console:** https://ca-central-1.console.aws.amazon.com/cognito/
- **RDS Console:** https://ca-central-1.console.aws.amazon.com/rds/
- **NextAuth.js Docs:** https://next-auth.js.org/
- **Cognito Developer Guide:** https://docs.aws.amazon.com/cognito/

---

## 9. Quick Reference - Common Queries

```sql
-- Get user with their SecureVault profile
SELECT u.*, p."storageUsedBytes"
FROM core."User" u
LEFT JOIN securevault."UserProfile" p ON u.id = p."userId"
WHERE u.id = 'USER_ID';

-- Get user's subscription for SecureVault
SELECT * FROM hub."Subscription"
WHERE "userId" = 'USER_ID' AND "appId" = 'app_securevault';

-- Get all documents for an organization
SELECT * FROM securevault."Document"
WHERE "organizationId" = 'ORG_ID'
ORDER BY "createdAt" DESC;

-- Get organization with member count
SELECT o.*, COUNT(m.id) as member_count
FROM core."Organization" o
LEFT JOIN core."OrganizationMember" m ON o.id = m."organizationId"
WHERE o.id = 'ORG_ID'
GROUP BY o.id;
```

---

*Document generated: December 17, 2025*
