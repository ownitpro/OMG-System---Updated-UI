# Upgrade Flow Solution - OMG System + SVD

**Date:** January 17, 2026
**Purpose:** Handle user upgrades/downgrades across OMG System and all products (SVD, CRM, etc.)
**Principle:** All billing operations centralized in OMG System

---

## 🎯 THE PROBLEM

### **Scenario 1: User in OMG Portal**
```
User: Currently on Starter ($9.99/mo)
User: Clicks "Upgrade to Growth" in OMG dashboard
Question: How does SVD know about the upgrade?
```

### **Scenario 2: User in SVD**
```
User: Currently on Starter (40GB storage limit)
User: Hits storage limit, sees "Upgrade to Growth (90GB)" banner
User: Clicks "Upgrade"
Question: Where does this take them? How does upgrade happen?
```

### **Scenario 3: User Downgrades**
```
User: Currently on Pro ($24.99/mo)
User: Wants to downgrade to Growth ($14.99/mo)
Question: What happens to data that exceeds new limits?
```

---

## ✅ SOLUTION ARCHITECTURE

### **Core Principle: Hub-Centralized Billing**

```
┌─────────────────────────────────────────────────────┐
│                   OMG SYSTEM HUB                    │
│                                                     │
│  ┌───────────────────────────────────┐             │
│  │   hub.Subscription Table          │             │
│  │   (Single Source of Truth)        │             │
│  ├───────────────────────────────────┤             │
│  │ userId: user_123                  │             │
│  │ appId: app_securevault            │             │
│  │ plan: "growth"                    │◄────────────┼─── SVD reads this
│  │ status: "active"                  │             │
│  │ stripeSubscriptionId: sub_abc     │             │
│  │ updatedAt: 2026-01-17             │             │
│  └───────────────────────────────────┘             │
│            ▲                                        │
│            │                                        │
│            │ OMG writes here after upgrade         │
│            │                                        │
│  ┌─────────┴──────────────────────────┐            │
│  │  Stripe Integration                │            │
│  │  - subscription.updated webhook    │            │
│  │  - customer.subscription.updated   │            │
│  └────────────────────────────────────┘            │
│                                                     │
└─────────────────────────────────────────────────────┘

         ▲                                    ▲
         │                                    │
         │ Redirects here                     │ Reads plan from
         │ for upgrade                        │ hub.Subscription
         │                                    │
┌────────┴────────┐               ┌──────────┴──────┐
│   OMG Portal    │               │       SVD        │
│                 │               │                  │
│ [Upgrade] btn   │               │ [Upgrade] btn   │
│ → /upgrade      │               │ → omg.com/upgrade│
└─────────────────┘               └──────────────────┘
```

---

## 🚀 IMPLEMENTATION

### **Part 1: OMG System - Upgrade Page**

#### **File:** `src/app/upgrade/page.tsx`

```typescript
'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import PortalShellV2 from '@/components/portal/PortalShellV2';

const PRICING_TIERS = {
  starter: {
    name: 'Starter',
    price: 9.99,
    storage: '40 GB',
    processingUnits: 150,
    features: ['1 user', '40 GB storage', '150 Processing Units/mo', '5 share links'],
  },
  growth: {
    name: 'Growth',
    price: 14.99,
    storage: '90 GB',
    processingUnits: 450,
    features: ['1 user', '90 GB storage', '450 Processing Units/mo', '25 share links', 'Priority support'],
    popular: true,
  },
  pro: {
    name: 'Pro',
    price: 24.99,
    storage: '180 GB',
    processingUnits: 1350,
    features: ['Family sharing (3 users)', '180 GB storage', '1,350 Processing Units/mo', 'Unlimited share links', 'Priority support'],
  },
};

export default function UpgradePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const [currentPlan, setCurrentPlan] = React.useState<string>('starter');
  const [isUpgrading, setIsUpgrading] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState<string | null>(null);

  // Get source (where user came from)
  const source = searchParams.get('source'); // 'svd', 'omg-crm', etc.
  const returnUrl = searchParams.get('returnUrl'); // URL to redirect after upgrade

  // Fetch user's current subscription
  React.useEffect(() => {
    async function fetchCurrentPlan() {
      const res = await fetch('/api/client/subscription');
      const data = await res.json();
      if (data.success) {
        setCurrentPlan(data.data.plan || 'starter');
      }
    }
    fetchCurrentPlan();
  }, []);

  /**
   * Handle upgrade/downgrade
   */
  const handleSelectPlan = async (plan: string) => {
    if (plan === currentPlan) {
      alert('You are already on this plan');
      return;
    }

    setSelectedPlan(plan);
    setIsUpgrading(true);

    try {
      // Call upgrade API
      const res = await fetch('/api/client/subscription/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newPlan: plan,
          source,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Show success message
        alert(`Successfully upgraded to ${PRICING_TIERS[plan as keyof typeof PRICING_TIERS].name}!`);

        // Redirect back to source or dashboard
        if (returnUrl) {
          window.location.href = returnUrl;
        } else if (source === 'svd') {
          window.location.href = 'http://localhost:3001/dashboard';
        } else {
          router.push('/portal/client');
        }
      } else {
        alert('Upgrade failed: ' + data.error);
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      alert('An error occurred during upgrade');
    } finally {
      setIsUpgrading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <PortalShellV2 role="CLIENT">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Upgrade Your Plan
          </h1>
          <p className="text-gray-400">
            {source === 'svd' && 'Unlock more storage and features in SecureVault Docs'}
            {source === 'omg-crm' && 'Get more contacts and automation in OMG-CRM'}
            {!source && 'Choose the perfect plan for your needs'}
          </p>
          <div className="mt-4">
            <span className="text-gray-400">Current Plan: </span>
            <span className="text-white font-semibold">
              {PRICING_TIERS[currentPlan as keyof typeof PRICING_TIERS]?.name || 'Starter'}
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(PRICING_TIERS).map(([key, tier]) => {
            const isCurrent = key === currentPlan;
            const isDowngrade = getTierLevel(key) < getTierLevel(currentPlan);
            const isUpgrade = getTierLevel(key) > getTierLevel(currentPlan);

            return (
              <div
                key={key}
                className={`
                  relative bg-slate-800 rounded-lg p-6 border-2
                  ${isCurrent ? 'border-green-500' : 'border-slate-700'}
                  ${tier.popular ? 'ring-2 ring-blue-500' : ''}
                `}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}

                {/* Current Badge */}
                {isCurrent && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    CURRENT
                  </div>
                )}

                {/* Tier Name & Price */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="text-4xl font-bold text-white mb-1">
                    ${tier.price}
                    <span className="text-lg text-gray-400">/mo</span>
                  </div>
                  <div className="text-gray-400 text-sm">{tier.storage} storage</div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-green-400 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <button
                  onClick={() => handleSelectPlan(key)}
                  disabled={isCurrent || isUpgrading}
                  className={`
                    w-full py-3 rounded font-medium transition
                    ${isCurrent
                      ? 'bg-slate-700 text-gray-400 cursor-not-allowed'
                      : isUpgrade
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                    }
                    ${isUpgrading && selectedPlan === key ? 'opacity-50' : ''}
                  `}
                >
                  {isUpgrading && selectedPlan === key && 'Upgrading...'}
                  {!isUpgrading && isCurrent && 'Current Plan'}
                  {!isUpgrading && !isCurrent && isUpgrade && 'Upgrade'}
                  {!isUpgrading && !isCurrent && isDowngrade && 'Downgrade'}
                </button>

                {/* Downgrade Warning */}
                {isDowngrade && (
                  <div className="mt-3 text-xs text-yellow-400 text-center">
                    ⚠️ Data exceeding new limits may be archived
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Cancel Link */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white text-sm"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </PortalShellV2>
  );
}

function getTierLevel(tier: string): number {
  const levels: Record<string, number> = {
    starter: 1,
    growth: 2,
    pro: 3,
  };
  return levels[tier] || 0;
}
```

---

### **Part 2: Upgrade API Endpoint**

#### **File:** `src/app/api/client/subscription/upgrade/route.ts`

```typescript
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

/**
 * POST /api/client/subscription/upgrade
 * Upgrade or downgrade user's subscription
 */
export async function POST(req: Request) {
  const session = await auth();

  // Dev bypass
  let userEmail = session?.user?.email || null;
  if (!userEmail && process.env.NODE_ENV === 'development') {
    userEmail = 'client@testorg.com';
  }

  if (!userEmail) {
    return apiError('Unauthorized', 401);
  }

  try {
    const { newPlan, source } = await req.json();

    if (!newPlan) {
      return apiError('New plan is required', 400);
    }

    // Validate plan
    const validPlans = ['starter', 'growth', 'pro'];
    if (!validPlans.includes(newPlan)) {
      return apiError('Invalid plan', 400);
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { id: true, email: true, name: true },
    });

    if (!user) {
      return apiError('User not found', 404);
    }

    // Find current subscription (assuming shared hub.Subscription table)
    // If using local subscription:
    const currentSubscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        status: 'active',
      },
    });

    if (!currentSubscription) {
      return apiError('No active subscription found', 404);
    }

    // Check if same plan
    if (currentSubscription.plan === newPlan) {
      return apiError('You are already on this plan', 400);
    }

    // Determine if upgrade or downgrade
    const tierLevels: Record<string, number> = { starter: 1, growth: 2, pro: 3 };
    const isUpgrade = tierLevels[newPlan] > tierLevels[currentSubscription.plan];

    // Update subscription in Stripe
    if (currentSubscription.stripeSubscriptionId) {
      try {
        // Get Stripe price ID for new plan
        const stripePriceId = getStripePriceId(newPlan);

        // Update Stripe subscription
        await stripe.subscriptions.update(
          currentSubscription.stripeSubscriptionId,
          {
            items: [{
              id: currentSubscription.stripeSubscriptionId, // Replace with actual subscription item ID
              price: stripePriceId,
            }],
            proration_behavior: 'always_invoice', // Charge/credit immediately
          }
        );
      } catch (stripeError: any) {
        console.error('Stripe update error:', stripeError);
        return apiError('Failed to update subscription in Stripe: ' + stripeError.message, 500);
      }
    }

    // Update subscription in database
    const updated = await prisma.subscription.update({
      where: { id: currentSubscription.id },
      data: {
        plan: newPlan,
        updatedAt: new Date(),
      },
    });

    // If using shared hub.Subscription table:
    // await prisma.$executeRaw`
    //   UPDATE hub."Subscription"
    //   SET "plan" = ${newPlan}, "updatedAt" = NOW()
    //   WHERE "userId" = ${user.id} AND "appId" = 'app_securevault'
    // `;

    // Log the change
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: isUpgrade ? 'SUBSCRIPTION_UPGRADED' : 'SUBSCRIPTION_DOWNGRADED',
        details: JSON.stringify({
          oldPlan: currentSubscription.plan,
          newPlan,
          source,
        }),
      },
    });

    // Send notification email
    // await sendEmail({
    //   to: user.email,
    //   subject: `Subscription ${isUpgrade ? 'Upgraded' : 'Downgraded'}`,
    //   template: 'subscription-changed',
    //   data: { user, oldPlan: currentSubscription.plan, newPlan, isUpgrade },
    // });

    // If downgrade, check for data limits
    if (!isUpgrade) {
      await handleDowngrade(user.id, newPlan);
    }

    return apiSuccess({
      message: `Successfully ${isUpgrade ? 'upgraded' : 'downgraded'} to ${newPlan}`,
      subscription: updated,
    });

  } catch (error) {
    console.error('Upgrade error:', error);
    return apiError('Failed to upgrade subscription', 500);
  }
}

/**
 * Get Stripe Price ID for a plan
 */
function getStripePriceId(plan: string): string {
  const priceIds: Record<string, string> = {
    starter: process.env.STRIPE_PRICE_STARTER || 'price_starter',
    growth: process.env.STRIPE_PRICE_GROWTH || 'price_growth',
    pro: process.env.STRIPE_PRICE_PRO || 'price_pro',
  };
  return priceIds[plan];
}

/**
 * Handle downgrade (check storage limits, etc.)
 */
async function handleDowngrade(userId: string, newPlan: string) {
  // Example: Check SVD storage usage
  const storageLimits: Record<string, number> = {
    starter: 40 * 1024 * 1024 * 1024, // 40GB in bytes
    growth: 90 * 1024 * 1024 * 1024,
    pro: 180 * 1024 * 1024 * 1024,
  };

  // Query SVD for user's storage usage
  const svdUser = await prisma.$queryRaw<any[]>`
    SELECT storage_used FROM securevault.users WHERE omg_user_id = ${userId}
  `;

  if (svdUser.length > 0) {
    const storageUsed = svdUser[0].storage_used;
    const newLimit = storageLimits[newPlan];

    if (storageUsed > newLimit) {
      // User exceeds new storage limit
      // Options:
      // 1. Prevent downgrade (show error)
      // 2. Archive oldest files
      // 3. Allow but show warning

      console.log(`⚠️  User ${userId} exceeds storage limit after downgrade`);
      console.log(`   Used: ${storageUsed} bytes, New limit: ${newLimit} bytes`);

      // Send email warning
      // await sendEmail({ ... });
    }
  }
}
```

---

### **Part 3: SVD - Upgrade Button**

#### **File (SVD):** `svd/src/components/StorageLimitBanner.tsx`

```typescript
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  storageUsed: number;
  storageLimit: number;
  currentPlan: string;
}

export default function StorageLimitBanner({ storageUsed, storageLimit, currentPlan }: Props) {
  const router = useRouter();
  const usagePercent = (storageUsed / storageLimit) * 100;

  // Show warning at 80%
  if (usagePercent < 80) return null;

  const nextPlan = currentPlan === 'starter' ? 'growth' : 'pro';
  const nextPlanStorage = currentPlan === 'starter' ? '90 GB' : '180 GB';

  const handleUpgrade = () => {
    // Redirect to OMG System upgrade page
    const omgUrl = process.env.NEXT_PUBLIC_OMG_URL || 'http://localhost:3000';
    const returnUrl = encodeURIComponent(window.location.href);
    window.location.href = `${omgUrl}/upgrade?source=svd&returnUrl=${returnUrl}`;
  };

  return (
    <div
      className={`
        p-4 rounded-lg border-2 mb-6
        ${usagePercent >= 95 ? 'bg-red-500/10 border-red-500' : 'bg-yellow-500/10 border-yellow-500'}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {usagePercent >= 95 ? (
              <>
                <span className="text-red-500 text-xl">⚠️</span>
                <h3 className="text-red-400 font-semibold">Storage Almost Full!</h3>
              </>
            ) : (
              <>
                <span className="text-yellow-500 text-xl">⚠️</span>
                <h3 className="text-yellow-400 font-semibold">Storage Running Low</h3>
              </>
            )}
          </div>

          <p className="text-gray-300 text-sm mb-2">
            You've used {usagePercent.toFixed(0)}% of your {formatBytes(storageLimit)} storage limit.
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-slate-700 rounded-full h-2 mb-3">
            <div
              className={`h-2 rounded-full ${
                usagePercent >= 95 ? 'bg-red-500' : 'bg-yellow-500'
              }`}
              style={{ width: `${Math.min(usagePercent, 100)}%` }}
            />
          </div>

          <p className="text-gray-400 text-xs">
            Upgrade to <strong>{nextPlan.charAt(0).toUpperCase() + nextPlan.slice(1)}</strong> for {nextPlanStorage} of storage
          </p>
        </div>

        <button
          onClick={handleUpgrade}
          className="ml-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium whitespace-nowrap"
        >
          Upgrade Now
        </button>
      </div>
    </div>
  );
}

function formatBytes(bytes: number): string {
  const gb = bytes / (1024 * 1024 * 1024);
  return `${gb.toFixed(0)} GB`;
}
```

---

### **Part 4: Real-Time Sync (SVD Detects Upgrade)**

#### **How SVD Knows Plan Changed:**

**Option A: Polling** (Simple, works immediately)
```typescript
// SVD checks every 30 seconds
setInterval(async () => {
  const res = await fetch('/api/subscription/check');
  const data = await res.json();
  if (data.plan !== currentPlan) {
    setCurrentPlan(data.plan);
    showToast('Plan updated to ' + data.plan);
  }
}, 30000);
```

**Option B: Webhook** (Better, instant)
```typescript
// OMG sends webhook to SVD after upgrade
await fetch('https://svd.com/api/webhooks/subscription-updated', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: user.id,
    newPlan: 'growth',
    source: 'omg_upgrade',
  }),
});
```

**Option C: Database Trigger** (Best, automatic)
```sql
-- PostgreSQL trigger on hub.Subscription
CREATE OR REPLACE FUNCTION notify_subscription_change()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('subscription_changed', row_to_json(NEW)::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER subscription_changed_trigger
AFTER UPDATE ON hub."Subscription"
FOR EACH ROW EXECUTE FUNCTION notify_subscription_change();
```

---

## 🔄 Downgrade Handling

### **What Happens When User Downgrades?**

**Example: Pro (180GB) → Growth (90GB)**

```
1. User clicks "Downgrade to Growth"
   ↓
2. OMG shows confirmation:
   "You currently use 120GB. Growth plan includes 90GB.
    30GB will be archived. Continue?"
   ↓
3. User confirms
   ↓
4. OMG updates subscription
   ↓
5. SVD receives notification
   ↓
6. SVD shows banner:
   "You've exceeded your storage limit (120GB / 90GB).
    Please delete 30GB of files or upgrade back to Pro."
   ↓
7. User options:
   - Delete files to get under 90GB
   - Upgrade back to Pro
   - Files remain but uploads disabled until under limit
```

### **Implementation:**

```typescript
// In SVD dashboard
if (storageUsed > storageLimit) {
  return (
    <div className="bg-red-500/20 border-2 border-red-500 rounded-lg p-6 mb-6">
      <h3 className="text-red-400 font-bold text-lg mb-2">
        ⚠️ Storage Limit Exceeded
      </h3>
      <p className="text-gray-300 mb-4">
        You're using {formatBytes(storageUsed)} but your {currentPlan} plan
        includes only {formatBytes(storageLimit)}. Please delete{' '}
        {formatBytes(storageUsed - storageLimit)} to continue uploading.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => router.push('/files?sort=size')}
          className="bg-white text-slate-900 px-4 py-2 rounded"
        >
          Manage Files
        </button>
        <button
          onClick={handleUpgradeBackToPro}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Upgrade to Pro
        </button>
      </div>
    </div>
  );
}
```

---

## 📊 Summary Table

| Scenario | Where Upgrade Happens | Who Writes to DB | Who Reads | Sync Method |
|----------|----------------------|------------------|-----------|-------------|
| **User in OMG Portal** | OMG `/upgrade` page | OMG updates `hub.Subscription` | SVD reads on next request | Instant (next page load) |
| **User in SVD** | SVD redirects to OMG | OMG updates `hub.Subscription` | SVD reads after redirect back | Instant (redirect back) |
| **Downgrade** | OMG `/upgrade` page | OMG updates `hub.Subscription` | SVD checks limits | Banner shows on next load |
| **Stripe Webhook** | Stripe sends webhook to OMG | OMG updates `hub.Subscription` | SVD reads on next request | Within 30 seconds |

---

## ✅ Success Criteria

**When Implementation is Complete:**

- [ ] User can upgrade from OMG dashboard
- [ ] User clicking "Upgrade" in SVD redirects to OMG
- [ ] After upgrade in OMG, redirects back to SVD
- [ ] SVD instantly shows new storage limits
- [ ] Downgrade shows confirmation warning
- [ ] User exceeding limits sees banner in SVD
- [ ] Stripe subscription updated correctly
- [ ] Audit log tracks all changes
- [ ] Email notifications sent (optional)

---

## ⏱️ Implementation Time

| Component | Time |
|-----------|------|
| OMG upgrade page UI | 2-3 hours |
| Upgrade API endpoint | 2-3 hours |
| SVD upgrade button + redirect | 1 hour |
| Downgrade handling | 1-2 hours |
| Real-time sync | 1-2 hours |
| Testing | 2 hours |
| **Total** | **9-13 hours** |

---

**Next Step:** Start with OMG upgrade page, then add SVD redirect button.
