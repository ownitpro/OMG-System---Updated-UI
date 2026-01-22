-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create Schemas
CREATE SCHEMA IF NOT EXISTS core;
CREATE SCHEMA IF NOT EXISTS hub;
CREATE SCHEMA IF NOT EXISTS securevault;

-- core.User
CREATE TABLE IF NOT EXISTS core."User" (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE,
    name TEXT,
    image TEXT,
    "accountType" TEXT DEFAULT 'personal',
    "emailVerified" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    -- Additional columns seen in setup-db.js logs, adding as nullable for compatibility
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "stripeSubscriptionStatus" TEXT,
    "stripePriceId" TEXT,
    "subscriptionPeriodEnd" TEXT,
    "trialStartedAt" TEXT,
    "trialExpiresAt" TEXT
);

-- securevault.UserProfile
CREATE TABLE IF NOT EXISTS securevault."UserProfile" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT REFERENCES core."User"(id) ON DELETE CASCADE,
    "storageUsedBytes" BIGINT DEFAULT 0,
    "ocrPagesUsed" INTEGER DEFAULT 0,
    "egressBytesUsed" BIGINT DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- core.Organization
CREATE TABLE IF NOT EXISTS core."Organization" (
    id TEXT PRIMARY KEY,
    name TEXT,
    slug TEXT UNIQUE,
    plan TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- core.OrganizationMember
CREATE TABLE IF NOT EXISTS core."OrganizationMember" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "organizationId" TEXT REFERENCES core."Organization"(id) ON DELETE CASCADE,
    "userId" TEXT REFERENCES core."User"(id) ON DELETE CASCADE,
    role TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- securevault.OrganizationProfile
CREATE TABLE IF NOT EXISTS securevault."OrganizationProfile" (
    "organizationId" TEXT PRIMARY KEY REFERENCES core."Organization"(id) ON DELETE CASCADE,
    "storageUsedBytes" BIGINT DEFAULT 0,
    "ocrPagesUsed" INTEGER DEFAULT 0,
    "egressBytesUsed" BIGINT DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- hub.Subscription
CREATE TABLE IF NOT EXISTS hub."Subscription" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT REFERENCES core."User"(id) ON DELETE CASCADE,
    "organizationId" TEXT,
    "appId" TEXT,
    plan TEXT,
    status TEXT DEFAULT 'active',
    "stripeSubscriptionId" TEXT,
    "trialStartedAt" TEXT,
    "trialExpiresAt" TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    CONSTRAINT unique_user_app UNIQUE ("userId", "appId")
);

-- Insert a test user for easy login if needed (optional)
INSERT INTO core."User" (id, email, name, "accountType", "emailVerified")
VALUES ('demo-user-123', 'test@example.com', 'Test User', 'personal', NOW())
ON CONFLICT (id) DO NOTHING;
