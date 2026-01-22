# OMGsystems Hub Integration Handoff

**Date:** January 15, 2026
**Project:** SecureVault Docs Integration
**Target Audience:** OMGsystems (Hub) Engineering Team

## 1. Executive Summary

SecureVault Docs has been pre-architected to operate within the OMGsystems ecosystem. We utilize a **Shared Database Model** with multi-schema PostgreSQL architecture. This allows the Hub to centrally manage Identity (`core` schema) and Billing (`hub` schema), while SecureVault simply consumes this data.

**Key Integration Points:**

1.  **Identity:** Users are shared via the `core.User` table.
2.  **Billing:** Subscriptions are provisioned via the `hub.Subscription` table.
3.  **Tenant ID:** SecureVault is identified by `appId = 'app_securevault'`.

---

## 2. Database Architecture

The database is divided into three distinct schemas. As the Hub, you own the `core` and `hub` schemas.

### Schema Breakdown

| Schema            | Owner       | Purpose                               | Key Tables                            |
| :---------------- | :---------- | :------------------------------------ | :------------------------------------ |
| **`core`**        | **HUB**     | Centralized Identity & Org Management | `User`, `Organization`                |
| **`hub`**         | **HUB**     | Centralized Billing & Entitlements    | `Subscription`, `App`, `BillingEvent` |
| **`securevault`** | SecureVault | Product-specific Data                 | `UserProfile`, `Document`, `Vaults`   |

### Critical Table Definitions

#### A. Core Identity (`core.User`)

This is the single source of truth for users across the entire ecosystem.

```sql
CREATE TABLE core."User" (
    id TEXT PRIMARY KEY,          -- UUID, must be consistent across all apps
    email TEXT UNIQUE NOT NULL,   -- Login identifier
    name TEXT,
    image TEXT,
    "accountType" TEXT DEFAULT 'personal', -- 'personal' or 'business'
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);
```

#### B. Centralized Billing (`hub.Subscription`)

When a user purchases SecureVault on the Hub, you simply insert a record here. SecureVault automatically respects the plan limits.

```sql
CREATE TABLE hub."Subscription" (
    id TEXT PRIMARY KEY,
    "userId" TEXT REFERENCES core."User"(id),
    "appId" TEXT NOT NULL,         -- MUST BE 'app_securevault'
    "plan" TEXT NOT NULL,          -- See "Plan Identifiers" below
    "status" TEXT DEFAULT 'active', -- 'active', 'past_due', 'canceled'
    "organizationId" TEXT,         -- Null for personal plans
    "stripeSubscriptionId" TEXT,   -- Optional link to Stripe
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP,
    UNIQUE("userId", "appId")      -- One active subscription per user per app
);
```

---

## 3. Integration Constants

The Hub must use these exact string identifiers when writing to the database to ensure SecureVault recognizes the entitlements.

### Application Identifier

- **App ID:** `app_securevault`

### Plan Identifiers (The `plan` column)

SecureVault has limit enforcement logic (`src/lib/plan-limits.ts`) tied to these specific keys.

**Personal Plans:**

- `trial` (Default for new users)
- `starter`
- `growth`
- `pro`

**Business Plans:**

- `business_starter`
- `business_growth`
- `business_pro`
- `enterprise`

---

## 4. Workflows

### A. Authentication Handshake

1.  User logs into **OMGsystems Hub**.
2.  Hub verifies credentials.
3.  Hub redirects user to SecureVault (e.g., `https://securevault.com/login?token=xyz`).
4.  SecureVault validates the session.
5.  **Synchronization:** SecureVault creates/updates the local `securevault.UserProfile` record but relies on `core.User` for auth.
    - _See Code:_ `src/lib/auth/syncUser.ts` -> `syncUserToDatabase()`

### B. Provisioning a Subscription

1.  User buys "SecureVault Pro" on the Hub.
2.  **Hub Action:** SQL Insert.
    ```sql
    INSERT INTO hub."Subscription" (
        id, "userId", "appId", "plan", "status"
    ) VALUES (
        gen_random_uuid(),
        'USER_UUID_FROM_CORE',
        'app_securevault',
        'pro',
        'active'
    )
    ON CONFLICT ("userId", "appId")
    DO UPDATE SET "plan" = 'pro', "status" = 'active';
    ```
3.  **Result:** SecureVault checks this table strictly. The user instantly gets 200GB storage, 1350 Processing Units, etc.

---

## 5. Reference Implementation

Refer to these files in the SecureVault repository to see the "Read" side of this architecture:

1.  **`src/lib/db-utils.ts`**

    - Contains the `SCHEMA_MAP` enforcing the schema separation.
    - Defines `SECUREVAULT_APP_ID`.

2.  **`src/lib/auth/syncUser.ts`**

    - `syncUserToDatabase`: Syncs identity to `core.User`.
    - `getUserSubscription`: Reads entitlements from `hub.Subscription`.

3.  **`src/lib/plan-limits.ts`**
    - Defines exactly what features are unlocked by each plan ID.
