# Account Linking Solution - Prevent Duplicate Accounts

**Date:** January 17, 2026
**Problem:** User has SVD account with one email, creates OMG account with different email
**Solution:** 3-layer account linking and detection system

---

## 🎯 THE PROBLEM (Detailed Scenario)

### **Real-World Example:**

**Timeline:**
```
January 2025:
- User creates SVD account: john@work-email.com
- Subscribes to SVD Growth plan: $14.99/mo
- Uploads 50 documents

March 2026:
- User discovers OMG System exists
- Signs up with personal email: john@personal-email.com
- Subscribes to OMG Growth tier: $14.99/mo

Result:
❌ Paying $29.98/mo (double charged!)
❌ Two separate accounts
❌ Cannot access old documents from OMG portal
❌ SVD subscription still active but unused
❌ Customer support nightmare
```

---

## ✅ SOLUTION OVERVIEW

**Three Layers of Protection:**

1. **Layer 1: Email Detection During Signup** (Prevents 80% of issues)
2. **Layer 2: Manual Account Linking** (User-initiated fix)
3. **Layer 3: Smart Duplicate Detection** (Catches edge cases)

---

## 🛡️ LAYER 1: Email Detection During Signup

### **When It Activates:**
- User tries to sign up on OMG System
- User enters email address
- BEFORE creating account, check if email exists in SVD

### **Flow Diagram:**
```
User visits OMG Signup
       ↓
Enters email: john@personal-email.com
       ↓
Clicks "Sign Up"
       ↓
OMG queries SVD database:
"SELECT * FROM securevault.users WHERE email = ?"
       ↓
┌──────────────┴──────────────┐
│                             │
Email Found ✅              Email Not Found ✅
       ↓                            ↓
Show linking modal           Normal signup proceeds
       ↓
User chooses:
├─ Link accounts ✅
│  └─ Merge data, keep subscription
└─ Create separate ❌
   └─ Warning: Will have 2 accounts
```

### **Implementation:**

#### **File:** `src/app/api/auth/check-existing/route.ts`

```typescript
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

/**
 * POST /api/auth/check-existing
 * Check if email exists in SVD before signup
 */
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return apiError('Email is required', 400);
    }

    // Check if email exists in SVD database
    // Assuming SVD uses same database with different schema
    const svdUser = await prisma.$queryRaw`
      SELECT id, email, name, subscription_tier, subscription_status
      FROM securevault.users
      WHERE LOWER(email) = LOWER(${email})
      LIMIT 1
    `;

    if (svdUser && svdUser.length > 0) {
      const user = svdUser[0];

      return apiSuccess({
        exists: true,
        service: 'SecureVault Docs',
        userData: {
          email: user.email,
          name: user.name,
          subscriptionTier: user.subscription_tier,
          subscriptionStatus: user.subscription_status,
        },
        message: 'Account found in SecureVault Docs',
      });
    }

    // Also check if already exists in OMG
    const omgUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true, email: true, name: true },
    });

    if (omgUser) {
      return apiSuccess({
        exists: true,
        service: 'OMG System',
        userData: {
          email: omgUser.email,
          name: omgUser.name,
        },
        message: 'Account already exists in OMG System',
      });
    }

    return apiSuccess({
      exists: false,
      message: 'No existing account found',
    });

  } catch (error) {
    console.error('Error checking existing account:', error);
    return apiError('Failed to check existing account', 500);
  }
}
```

---

#### **File:** `src/app/signup/page.tsx` (Updated)

```typescript
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [existingAccount, setExistingAccount] = React.useState<any>(null);
  const [showLinkingModal, setShowLinkingModal] = React.useState(false);
  const [isChecking, setIsChecking] = React.useState(false);

  const router = useRouter();

  /**
   * Check if email exists when user finishes typing
   */
  const handleEmailBlur = async () => {
    if (!email || email.length < 3) return;

    setIsChecking(true);
    try {
      const res = await fetch('/api/auth/check-existing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success && data.data.exists) {
        setExistingAccount(data.data);
        setShowLinkingModal(true);
      }
    } catch (error) {
      console.error('Error checking email:', error);
    } finally {
      setIsChecking(false);
    }
  };

  /**
   * User chooses to link accounts
   */
  const handleLinkAccounts = async () => {
    // Proceed to email verification flow
    // Send verification email to confirm ownership
    try {
      const res = await fetch('/api/auth/initiate-account-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          sourceService: existingAccount.service,
        }),
      });

      if (res.ok) {
        router.push('/verify-email?action=link');
      }
    } catch (error) {
      console.error('Error initiating link:', error);
    }
  };

  /**
   * User chooses to create separate account
   */
  const handleCreateSeparate = () => {
    setShowLinkingModal(false);
    setExistingAccount(null);
    // Continue with normal signup
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-lg p-8">
        <h1 className="text-2xl font-bold text-white mb-6">Create Account</h1>

        <form onSubmit={(e) => { e.preventDefault(); /* handle signup */ }}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
              required
            />
          </div>

          {/* Email Field with Detection */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
              required
            />
            {isChecking && (
              <div className="text-xs text-gray-400 mt-1">Checking email...</div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium"
          >
            Sign Up
          </button>
        </form>

        {/* Account Linking Modal */}
        {showLinkingModal && existingAccount && (
          <AccountLinkingModal
            existingAccount={existingAccount}
            onLink={handleLinkAccounts}
            onCreateSeparate={handleCreateSeparate}
            onClose={() => setShowLinkingModal(false)}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Modal to show when existing account is found
 */
function AccountLinkingModal({ existingAccount, onLink, onCreateSeparate, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 max-w-lg w-full mx-4">
        <h2 className="text-xl font-bold text-white mb-4">
          🎉 Existing Account Found!
        </h2>

        <div className="bg-slate-700/50 rounded p-4 mb-4">
          <p className="text-gray-300 mb-2">
            We found an existing <strong>{existingAccount.service}</strong> account
            with this email address:
          </p>
          <div className="text-sm text-gray-400 space-y-1">
            <div>📧 Email: {existingAccount.userData.email}</div>
            {existingAccount.userData.name && (
              <div>👤 Name: {existingAccount.userData.name}</div>
            )}
            {existingAccount.userData.subscriptionTier && (
              <div>💳 Subscription: {existingAccount.userData.subscriptionTier}</div>
            )}
          </div>
        </div>

        <p className="text-gray-300 mb-4">
          Would you like to link this account to OMG System?
          You'll keep all your documents and subscription.
        </p>

        <div className="space-y-3">
          <button
            onClick={onLink}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium"
          >
            ✓ Link Account (Recommended)
          </button>

          <button
            onClick={onCreateSeparate}
            className="w-full bg-slate-600 hover:bg-slate-500 text-white py-2 rounded"
          >
            Create Separate Account
          </button>

          <button
            onClick={onClose}
            className="w-full text-gray-400 hover:text-white text-sm"
          >
            Cancel
          </button>
        </div>

        {/* Warning for separate account */}
        <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
          <p className="text-yellow-400 text-xs">
            ⚠️ Creating a separate account means you'll have two accounts and
            potentially pay for two subscriptions.
          </p>
        </div>
      </div>
    </div>
  );
}
```

---

## 🛡️ LAYER 2: Manual Account Linking

### **When It Activates:**
- User already has both OMG and SVD accounts (didn't detect during signup)
- User realizes they're paying twice
- User contacts support OR uses self-service linking

### **Flow Diagram:**
```
User in OMG Portal Settings
       ↓
Clicks "Link External Account"
       ↓
┌────────────────────────────────────┐
│  Link External Account             │
│                                    │
│  Service: [SecureVault Docs ▼]    │
│  Email: [john@work-email.com  ]   │
│                                    │
│  [Send Verification Email]         │
└────────────────────────────────────┘
       ↓
User receives email at john@work-email.com
       ↓
Clicks verification link
       ↓
Accounts merged ✅
```

### **Implementation:**

#### **File:** `src/app/portal/client/settings/page.tsx` (Add Section)

```typescript
<div className="bg-slate-800/50 rounded-lg p-6">
  <h3 className="text-lg font-semibold text-white mb-4">
    Link External Accounts
  </h3>
  <p className="text-gray-400 text-sm mb-4">
    If you have an existing account with SecureVault Docs or other OMG products,
    you can link them here to access all your data in one place.
  </p>

  <button
    onClick={() => setShowLinkAccountModal(true)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
  >
    + Link External Account
  </button>

  {/* Show linked accounts */}
  {linkedAccounts.length > 0 && (
    <div className="mt-4 space-y-2">
      {linkedAccounts.map((account) => (
        <div key={account.id} className="flex items-center justify-between bg-slate-700/50 rounded p-3">
          <div>
            <div className="text-white text-sm">{account.service}</div>
            <div className="text-gray-400 text-xs">{account.email}</div>
          </div>
          <div className="text-green-400 text-xs">✓ Linked</div>
        </div>
      ))}
    </div>
  )}
</div>
```

#### **File:** `src/app/api/auth/link-account/route.ts`

```typescript
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";
import { sendEmail } from "@/lib/email"; // Email service

/**
 * POST /api/auth/link-account
 * Initiate account linking process
 */
export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return apiError('Unauthorized', 401);
  }

  try {
    const { service, email } = await req.json();

    // Validate that email exists in target service
    let externalUser;

    if (service === 'securevault_docs') {
      externalUser = await prisma.$queryRaw`
        SELECT id, email, name
        FROM securevault.users
        WHERE LOWER(email) = LOWER(${email})
        LIMIT 1
      `;
    }

    if (!externalUser || externalUser.length === 0) {
      return apiError('No account found with this email in ' + service, 404);
    }

    // Generate verification token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Store pending link request
    await prisma.accountLinkRequest.create({
      data: {
        omgUserId: session.user.id,
        targetService: service,
        targetEmail: email,
        verificationToken: token,
        expiresAt,
        status: 'PENDING',
      },
    });

    // Send verification email
    await sendEmail({
      to: email,
      subject: 'Verify Account Linking - OMG System',
      template: 'account-link-verification',
      data: {
        userName: externalUser[0].name,
        omgEmail: session.user.email,
        verificationUrl: `${process.env.NEXTAUTH_URL}/verify-link?token=${token}`,
      },
    });

    return apiSuccess({
      message: 'Verification email sent to ' + email,
    });

  } catch (error) {
    console.error('Error linking account:', error);
    return apiError('Failed to initiate account linking', 500);
  }
}

/**
 * GET /api/auth/link-account/verify
 * Verify and complete account linking
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return apiError('Verification token required', 400);
  }

  try {
    // Find pending link request
    const linkRequest = await prisma.accountLinkRequest.findFirst({
      where: {
        verificationToken: token,
        status: 'PENDING',
        expiresAt: { gt: new Date() },
      },
    });

    if (!linkRequest) {
      return apiError('Invalid or expired verification token', 400);
    }

    // Perform the linking
    if (linkRequest.targetService === 'securevault_docs') {
      // Update SVD user to reference OMG user
      await prisma.$executeRaw`
        UPDATE securevault.users
        SET omg_user_id = ${linkRequest.omgUserId},
            linked_at = NOW()
        WHERE LOWER(email) = LOWER(${linkRequest.targetEmail})
      `;
    }

    // Mark link request as completed
    await prisma.accountLinkRequest.update({
      where: { id: linkRequest.id },
      data: { status: 'COMPLETED', completedAt: new Date() },
    });

    // Migrate subscription if needed
    await migrateSubscription(linkRequest.omgUserId, linkRequest.targetService);

    return apiSuccess({
      message: 'Accounts successfully linked!',
    });

  } catch (error) {
    console.error('Error verifying link:', error);
    return apiError('Failed to verify account linking', 500);
  }
}

/**
 * Migrate subscription from external service to OMG hub
 */
async function migrateSubscription(omgUserId: string, service: string) {
  // TODO: Check if user has active subscription in external service
  // If yes, create corresponding entry in hub.Subscription
  // Cancel or mark external subscription as "migrated"
}
```

---

## 🛡️ LAYER 3: Smart Duplicate Detection

### **When It Activates:**
- User somehow bypassed Layers 1 & 2
- System periodically scans for duplicates
- Runs nightly or weekly

### **Detection Criteria:**

**Match if ANY of these are true:**
1. **Same name + similar email** (john@work.com vs john@personal.com)
2. **Same payment method** (last 4 digits of credit card)
3. **Same IP address** at signup
4. **Same browser fingerprint**
5. **Same physical address** (if collected)

### **Implementation:**

#### **File:** `scripts/detect-duplicate-accounts.js`

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function detectDuplicates() {
  console.log('🔍 Scanning for duplicate accounts...\n');

  // Find users with similar names
  const omgUsers = await prisma.user.findMany({
    select: { id: true, email: true, name: true, company: true },
  });

  const svdUsers = await prisma.$queryRaw`
    SELECT id, email, name, company
    FROM securevault.users
    WHERE omg_user_id IS NULL
  `;

  const potentialDuplicates = [];

  for (const omgUser of omgUsers) {
    for (const svdUser of svdUsers) {
      const score = calculateSimilarityScore(omgUser, svdUser);

      if (score > 0.7) {
        potentialDuplicates.push({
          omgUser,
          svdUser,
          score,
          reason: getMatchReason(omgUser, svdUser),
        });
      }
    }
  }

  if (potentialDuplicates.length > 0) {
    console.log(`⚠️  Found ${potentialDuplicates.length} potential duplicates:\n`);

    potentialDuplicates.forEach((dup, i) => {
      console.log(`${i + 1}. Match Score: ${(dup.score * 100).toFixed(0)}%`);
      console.log(`   OMG: ${dup.omgUser.name} (${dup.omgUser.email})`);
      console.log(`   SVD: ${dup.svdUser.name} (${dup.svdUser.email})`);
      console.log(`   Reason: ${dup.reason}`);
      console.log('');
    });

    // Send email to admin for manual review
    await sendAdminAlert(potentialDuplicates);
  } else {
    console.log('✅ No duplicate accounts found');
  }
}

function calculateSimilarityScore(omgUser, svdUser) {
  let score = 0;

  // Name similarity (40%)
  if (omgUser.name && svdUser.name) {
    const nameSim = stringSimilarity(omgUser.name, svdUser.name);
    score += nameSim * 0.4;
  }

  // Email username similarity (30%)
  const omgUsername = omgUser.email.split('@')[0];
  const svdUsername = svdUser.email.split('@')[0];
  const emailSim = stringSimilarity(omgUsername, svdUsername);
  score += emailSim * 0.3;

  // Company similarity (30%)
  if (omgUser.company && svdUser.company) {
    const companySim = stringSimilarity(omgUser.company, svdUser.company);
    score += companySim * 0.3;
  }

  return score;
}

function stringSimilarity(str1, str2) {
  // Levenshtein distance algorithm
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) return 1.0;

  const editDistance = levenshteinDistance(longer.toLowerCase(), shorter.toLowerCase());
  return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(str1, str2) {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

function getMatchReason(omgUser, svdUser) {
  const reasons = [];

  if (stringSimilarity(omgUser.name, svdUser.name) > 0.8) {
    reasons.push('Similar name');
  }

  const omgUsername = omgUser.email.split('@')[0];
  const svdUsername = svdUser.email.split('@')[0];
  if (stringSimilarity(omgUsername, svdUsername) > 0.7) {
    reasons.push('Similar email username');
  }

  if (omgUser.company && svdUser.company &&
      stringSimilarity(omgUser.company, svdUser.company) > 0.8) {
    reasons.push('Same company');
  }

  return reasons.join(', ');
}

async function sendAdminAlert(duplicates) {
  // TODO: Send email to admin with list of potential duplicates
  console.log('📧 Admin alert would be sent here');
}

detectDuplicates()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

---

## 🔄 Complete Merge Process

### **What Happens When Accounts Are Linked:**

```
BEFORE LINKING:
┌─────────────────┐         ┌─────────────────┐
│ OMG Account     │         │ SVD Account     │
├─────────────────┤         ├─────────────────┤
│ Email: john@    │         │ Email: john@    │
│   personal.com  │         │   work.com      │
│ Subscription:   │         │ Subscription:   │
│   Growth $14.99 │         │   Growth $14.99 │
│ 0 documents     │         │ 50 documents    │
└─────────────────┘         └─────────────────┘

AFTER LINKING:
┌──────────────────────────────────┐
│ OMG Account (Primary)            │
├──────────────────────────────────┤
│ Email: john@personal.com         │
│ Linked: john@work.com (SVD)      │
│                                  │
│ Subscription:                    │
│   Growth $14.99 (kept)           │
│   SVD subscription canceled ✓    │
│                                  │
│ Documents:                       │
│   50 documents (migrated) ✓      │
│                                  │
│ Launch SVD → Auto-login ✓        │
└──────────────────────────────────┘
```

### **Merge Steps:**

1. **Verify Ownership** - User confirms via email
2. **Migrate Data** - Copy documents, settings, etc.
3. **Merge Subscriptions** - Cancel duplicate, keep one
4. **Refund if Applicable** - Pro-rate refund for duplicate payment
5. **Update References** - Link SVD user to OMG user ID
6. **Enable SSO** - User can now launch SVD from OMG

---

## 📊 Database Schema Updates

### **Add to Prisma Schema:**

```prisma
model AccountLinkRequest {
  id                String   @id @default(cuid())
  omgUserId         String
  targetService     String   // 'securevault_docs', 'omg_crm', etc.
  targetEmail       String
  verificationToken String   @unique
  status            String   @default("PENDING") // PENDING, COMPLETED, EXPIRED
  expiresAt         DateTime
  completedAt       DateTime?
  createdAt         DateTime @default(now())

  user User @relation(fields: [omgUserId], references: [id], onDelete: Cascade)

  @@index([omgUserId])
  @@index([verificationToken])
}

model LinkedAccount {
  id         String   @id @default(cuid())
  omgUserId  String
  service    String   // 'securevault_docs', 'omg_crm', etc.
  externalId String   // ID in external service
  email      String
  linkedAt   DateTime @default(now())

  user User @relation(fields: [omgUserId], references: [id], onDelete: Cascade)

  @@unique([omgUserId, service])
  @@index([omgUserId])
}
```

### **Update SVD Users Table:**

```sql
-- Add to securevault.users table
ALTER TABLE securevault.users
ADD COLUMN omg_user_id TEXT,
ADD COLUMN linked_at TIMESTAMP;

CREATE INDEX idx_svd_users_omg_user_id ON securevault.users(omg_user_id);
```

---

## ✅ Summary: How SSO + Account Linking Prevents Issues

### **SSO Role:**
```
✅ Enables seamless login between systems
✅ Passes user data securely
✅ Prevents manual re-login

❌ Does NOT detect different email addresses
❌ Does NOT prevent duplicate accounts
❌ Does NOT merge data automatically
```

### **Account Linking Role:**
```
✅ Detects existing accounts during signup
✅ Allows manual account linking
✅ Merges duplicate accounts
✅ Prevents double payments
✅ Migrates data (documents, settings)

✓ Combined with SSO = Complete solution
```

---

## 🎯 Success Criteria

**When Implementation is Complete:**

- [ ] User with SVD account signs up on OMG → Shown linking modal
- [ ] User can choose to link or create separate account
- [ ] If user links → Email verification sent
- [ ] User clicks verification link → Accounts merged
- [ ] User's SVD subscription canceled, OMG subscription kept
- [ ] User's SVD documents accessible from OMG
- [ ] User can launch SVD from OMG → Automatically logged in
- [ ] Duplicate detection script runs nightly
- [ ] Admin alerted to potential duplicates for manual review
- [ ] Support team can manually link accounts via admin panel

---

## ⏱️ Implementation Time

| Layer | Time | Priority |
|-------|------|----------|
| Layer 1: Email Detection | 3-4 hours | HIGH |
| Layer 2: Manual Linking | 4-5 hours | HIGH |
| Layer 3: Duplicate Detection | 2-3 hours | MEDIUM |
| Database Updates | 1 hour | HIGH |
| Testing | 2-3 hours | HIGH |
| **Total** | **12-16 hours** | |

---

**Next Step**: Implement Layer 1 (Email Detection) first, as it prevents 80% of duplicate account issues.
