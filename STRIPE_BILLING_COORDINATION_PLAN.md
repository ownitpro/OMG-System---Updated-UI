# STRIPE & BILLING COORDINATION PLAN

**Status:** 📋 PLANNING
**Date:** January 16, 2026
**Goal:** Prevent duplicate payments between OMG System Hub and SVD (SecureVault Docs)

---

## 🎯 THE PROBLEM

**Scenario:** User can subscribe to SecureVault Docs in TWO places:
1. **Via SVD directly** at `https://omgsystem.com` (SVD's own checkout)
2. **Via OMG System Hub** at the Hub's checkout flow

**Risk:** User pays twice for the same product, or systems don't recognize each other's subscriptions.

---

## 🏗️ ARCHITECTURE (From Hub Integration Handoff)

### Shared Database Model (Multi-Schema PostgreSQL)

| Schema | Owner | Purpose |
|--------|-------|---------|
| **`core`** | **HUB (OMG System)** | Centralized Identity - `core.User` |
| **`hub`** | **HUB (OMG System)** | Centralized Billing - `hub.Subscription` |
| **`securevault`** | SVD | Product-specific data |

### Key Insight: **Single Source of Truth for Billing**

The `hub.Subscription` table is THE authoritative source for all subscriptions across the ecosystem. SVD reads from this table to determine user entitlements.

```sql
-- hub.Subscription (HUB owns this table)
CREATE TABLE hub."Subscription" (
    id TEXT PRIMARY KEY,
    "userId" TEXT REFERENCES core."User"(id),
    "appId" TEXT NOT NULL,           -- 'app_securevault' for SVD
    "plan" TEXT NOT NULL,            -- 'trial', 'starter', 'growth', 'pro', etc.
    "status" TEXT DEFAULT 'active',  -- 'active', 'past_due', 'canceled'
    "organizationId" TEXT,           -- Null for personal plans
    "stripeSubscriptionId" TEXT,     -- Link to Stripe
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP,
    UNIQUE("userId", "appId")        -- ONE subscription per user per app
);
```

---

## ✅ SOLUTION: Hub-Centralized Billing

### Principle: **All Payments Flow Through the Hub**

Since SVD reads from `hub.Subscription`, the solution is straightforward:

1. **OMG System Hub owns Stripe** - All checkout flows go through Hub
2. **SVD does NOT have its own checkout** - It redirects to Hub for purchases
3. **Hub writes to `hub.Subscription`** - After successful Stripe payment
4. **SVD reads `hub.Subscription`** - To determine user's plan and limits

### Flow Diagram

```
User wants SVD Pro
        ↓
┌───────────────────────────────────────────────────┐
│  Option A: User is on OMG System Hub              │
│  - Clicks "Unlock SVD Pro" in portal              │
│  - Hub creates Stripe Checkout Session            │
│  - User pays via Stripe                           │
│  - Stripe webhook → Hub backend                   │
│  - Hub INSERTs into hub.Subscription              │
│  - SVD instantly sees new subscription            │
└───────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────┐
│  Option B: User is on SVD directly                │
│  - Clicks "Upgrade" button on SVD                 │
│  - SVD redirects to: hub.omgsystem.com/checkout   │
│    with params: ?product=securevault&plan=pro     │
│  - Hub handles checkout (same as Option A)        │
│  - After success, redirect back to SVD            │
└───────────────────────────────────────────────────┘
```

---

## 🖥️ FRONTEND DEVELOPER VIEW: WHERE STRIPE FITS

### Current Checkout Flow (Mock - localStorage only)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CURRENT FLOW (NO REAL PAYMENT)                       │
└─────────────────────────────────────────────────────────────────────────────┘

Step 1: User clicks "Unlock" on product card
        ↓
        Goes to: /products/omg-crm (or any product page)

Step 2: User clicks "Start Free Trial" button
        ↓
        Goes to: /checkout/start?product=omg-crm&trial=true

Step 3: User sees checkout page with:
        - Product name
        - Price
        - Coupon input field
        - "Start Free Trial" button

Step 4: User clicks "Start Free Trial"
        ↓
        ⚠️ CURRENTLY: Just updates localStorage
        ⚠️ NO real payment happens
        ⚠️ Product becomes "Active" immediately

Step 5: User redirected to portal
        ↓
        Product shows as "Active"
```

---

### NEW Flow with Stripe Integration

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       NEW FLOW (WITH STRIPE PAYMENT)                        │
└─────────────────────────────────────────────────────────────────────────────┘

Step 1: User clicks "Unlock" on product card
        ↓
        Goes to: /products/omg-crm

Step 2: User clicks "Start Free Trial" button
        ↓
        Goes to: /checkout/start?product=omg-crm&trial=true

Step 3: User sees checkout page with:
        - Product name
        - Price
        - Coupon input field  ← User enters coupon here
        - "Start Free Trial" button

Step 4: User clicks "Start Free Trial"
        ↓
        ┌────────────────────────────────────────────────────┐
        │  🆕 NEW: Frontend calls YOUR backend API           │
        │                                                    │
        │  POST /api/checkout/create-session                 │
        │  Body: {                                           │
        │    productId: "omg-crm",                           │
        │    couponCode: "SAVE20",  ← Coupon from input      │
        │    trial: true                                     │
        │  }                                                 │
        └────────────────────────────────────────────────────┘
                            ↓
        ┌────────────────────────────────────────────────────┐
        │  🆕 YOUR Backend (Hub) does:                       │
        │                                                    │
        │  1. Validate coupon code (check your DB)           │
        │  2. Create Stripe Checkout Session                 │
        │  3. Return session URL to frontend                 │
        └────────────────────────────────────────────────────┘
                            ↓
        ┌────────────────────────────────────────────────────┐
        │  🆕 Frontend redirects user to:                    │
        │                                                    │
        │  checkout.stripe.com/c/cs_live_xxxxx               │
        │                                                    │
        │  (Stripe's hosted payment page)                    │
        │  - User enters credit card                         │
        │  - Stripe handles 3D Secure, fraud detection       │
        │  - You NEVER see the credit card number            │
        └────────────────────────────────────────────────────┘
                            ↓
Step 5: User completes payment on Stripe
        ↓
        Stripe redirects to: /checkout/success?session_id=xxx
        ↓
        ┌────────────────────────────────────────────────────┐
        │  🆕 BEHIND THE SCENES:                             │
        │                                                    │
        │  Stripe sends webhook to YOUR backend:             │
        │  POST /api/webhooks/stripe                         │
        │  Event: checkout.session.completed                 │
        │                                                    │
        │  Your backend:                                     │
        │  1. Receives webhook                               │
        │  2. Writes to hub.Subscription table               │
        │  3. User now has active subscription               │
        └────────────────────────────────────────────────────┘

Step 6: User sees success page
        ↓
        Redirected to portal
        ↓
        Product shows as "Active" ✅
```

---

### Visual Comparison: Before vs After

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BEFORE (Mock)                                  │
└─────────────────────────────────────────────────────────────────────────────┘

  /checkout/start                           Portal
  ┌─────────────────┐                      ┌─────────────────┐
  │  Product: CRM   │                      │                 │
  │  Price: $9.99   │                      │   OMG-CRM       │
  │                 │   Click button       │   ✅ ACTIVE     │
  │  [Coupon: ___]  │ ─────────────────►   │                 │
  │                 │   localStorage.set() │   [Launch]      │
  │ [Start Trial]   │                      │                 │
  └─────────────────┘                      └─────────────────┘

  ⚠️ No real payment!
  ⚠️ No credit card entered!
  ⚠️ Just pretends to work!


┌─────────────────────────────────────────────────────────────────────────────┐
│                              AFTER (Stripe)                                 │
└─────────────────────────────────────────────────────────────────────────────┘

  /checkout/start          Stripe.com               /checkout/success   Portal
  ┌───────────────┐      ┌───────────────┐        ┌───────────────┐   ┌──────┐
  │ Product: CRM  │      │               │        │               │   │      │
  │ Price: $9.99  │      │  💳 Card:     │        │  ✅ Payment   │   │ CRM  │
  │               │      │  ____________ │        │     Complete! │   │ ✅   │
  │ [Coupon:___]  │ ───► │               │  ───►  │               │ ► │      │
  │               │      │  [Pay $9.99]  │        │  Redirecting  │   │Launch│
  │ [Start Trial] │      │               │        │               │   │      │
  └───────────────┘      └───────────────┘        └───────────────┘   └──────┘
        │                       │                         │
        │  API call to          │  User enters            │  Webhook writes
        │  create session       │  real card              │  to database
        ▼                       ▼                         ▼
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                        YOUR BACKEND (Hub)                               │
  │                                                                         │
  │  /api/checkout/create-session     /api/webhooks/stripe                  │
  │  - Validate coupon                - Receive payment confirmation        │
  │  - Create Stripe session          - Write to hub.Subscription           │
  │  - Return checkout URL            - Activate user's subscription        │
  └─────────────────────────────────────────────────────────────────────────┘
```

---

### How Coupons Work with Stripe

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    COUPON FLOW WITH STRIPE                                  │
└─────────────────────────────────────────────────────────────────────────────┘

                              YOUR CHECKOUT PAGE
                        /checkout/start?product=omg-crm
                        ┌─────────────────────────────┐
                        │                             │
                        │   OMG-CRM Pro               │
                        │   $14.99/month              │
                        │                             │
User types coupon ───►  │   Coupon: [SAVE20____]     │
                        │                             │
                        │   [Start Free Trial]        │
                        │                             │
                        └─────────────────────────────┘
                                      │
                                      │ User clicks button
                                      ▼
                        ┌─────────────────────────────┐
                        │  OPTION A: Validate First   │  ← RECOMMENDED
                        │  (Better UX)                │
                        └─────────────────────────────┘
                                      │
              ┌───────────────────────┴───────────────────────┐
              │                                               │
              ▼                                               ▼
┌─────────────────────────────┐             ┌─────────────────────────────┐
│  Step 1: Validate Coupon    │             │  If Invalid:                │
│                             │             │                             │
│  POST /api/coupons/validate │             │  Show error message:        │
│  {                          │             │  "Invalid coupon code"      │
│    code: "SAVE20",          │             │                             │
│    productId: "omg-crm"     │             │  User can try again         │
│  }                          │             │                             │
│                             │             │  DON'T redirect to Stripe   │
│  Response:                  │             │                             │
│  {                          │             └─────────────────────────────┘
│    valid: true,             │
│    discount: 20,            │
│    type: "PERCENTAGE"       │
│  }                          │
└─────────────────────────────┘
              │
              │ Coupon is valid
              ▼
┌─────────────────────────────┐
│  Step 2: Create Checkout    │
│                             │
│  POST /api/checkout/        │
│       create-session        │
│  {                          │
│    productId: "omg-crm",    │
│    couponCode: "SAVE20",    │  ← Pass the coupon
│    trial: true              │
│  }                          │
└─────────────────────────────┘
              │
              │ Your backend creates Stripe session with discount
              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         YOUR BACKEND CODE                                   │
│                                                                             │
│  // src/app/api/checkout/create-session/route.ts                           │
│                                                                             │
│  export async function POST(req: Request) {                                 │
│    const { productId, couponCode, trial } = await req.json();               │
│                                                                             │
│    // 1. Get price ID for product                                           │
│    const priceId = PRODUCT_PRICES[productId]; // From your config           │
│                                                                             │
│    // 2. Look up Stripe coupon (if provided)                                │
│    let stripeCoupon = null;                                                 │
│    if (couponCode) {                                                        │
│      // Your coupon "SAVE20" maps to a Stripe Coupon ID                     │
│      const dbCoupon = await db.coupon.findUnique({                          │
│        where: { code: couponCode }                                          │
│      });                                                                    │
│      stripeCoupon = dbCoupon?.stripePromotionCodeId;                        │
│    }                                                                        │
│                                                                             │
│    // 3. Create Stripe Checkout Session                                     │
│    const session = await stripe.checkout.sessions.create({                  │
│      mode: 'subscription',                                                  │
│      line_items: [{ price: priceId, quantity: 1 }],                         │
│      discounts: stripeCoupon ? [{ coupon: stripeCoupon }] : [],             │
│      subscription_data: {                                                   │
│        trial_period_days: trial ? 7 : 0,                                    │
│      },                                                                     │
│      metadata: {                                                            │
│        userId: session.user.id,                                             │
│        appId: productId,                                                    │
│        plan: 'pro',                                                         │
│      },                                                                     │
│      success_url: `${BASE_URL}/checkout/success?session_id={CHECKOUT_...}`, │
│      cancel_url: `${BASE_URL}/checkout/cancel`,                             │
│    });                                                                      │
│                                                                             │
│    return NextResponse.json({ url: session.url });                          │
│  }                                                                          │
└─────────────────────────────────────────────────────────────────────────────┘
              │
              │ Return Stripe checkout URL
              ▼
┌─────────────────────────────┐
│  Step 3: Redirect to Stripe │
│                             │
│  User sees Stripe's page:   │
│                             │
│  ┌───────────────────────┐  │
│  │  OMG-CRM Pro          │  │
│  │                       │  │
│  │  $14.99/mo            │  │
│  │  Coupon: SAVE20 -20%  │  │  ← Discount shown!
│  │  ─────────────────    │  │
│  │  Total: $11.99/mo     │  │
│  │                       │  │
│  │  Card: ____________   │  │
│  │                       │  │
│  │  [Subscribe]          │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

---

### Alternative: Let Stripe Handle Coupons

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 OPTION B: STRIPE'S BUILT-IN PROMO CODES                     │
│                        (Less control, easier setup)                         │
└─────────────────────────────────────────────────────────────────────────────┘

Instead of validating coupons yourself, let Stripe do it:

// In your create-session API:
const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  line_items: [{ price: priceId, quantity: 1 }],

  allow_promotion_codes: true,  // ← Enable Stripe's coupon field

  // ... rest of config
});

┌─────────────────────────────┐
│  Stripe's checkout page     │
│  now shows a coupon field:  │
│                             │
│  ┌───────────────────────┐  │
│  │  OMG-CRM Pro          │  │
│  │  $14.99/mo            │  │
│  │                       │  │
│  │  Promo code: [____]   │  │  ← Stripe's field
│  │                       │  │
│  │  Card: ____________   │  │
│  │  [Subscribe]          │  │
│  └───────────────────────┘  │
└─────────────────────────────┘

Pros:
  ✅ Less code to write
  ✅ Stripe validates codes
  ✅ Works automatically

Cons:
  ❌ Must create coupons in Stripe Dashboard
  ❌ Your local coupon system not used
  ❌ User can't see discount BEFORE going to Stripe
```

---

### Code Changes Summary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FILES TO MODIFY/CREATE                               │
└─────────────────────────────────────────────────────────────────────────────┘

📁 src/app/checkout/start/page.tsx
   └── MODIFY: Add API call instead of localStorage

   BEFORE:
   ┌─────────────────────────────────────────────┐
   │ function handleStartTrial() {               │
   │   activateProductKey(product);  // localStorage │
   │   router.push('/checkout/success');         │
   │ }                                           │
   └─────────────────────────────────────────────┘

   AFTER:
   ┌─────────────────────────────────────────────┐
   │ async function handleStartTrial() {         │
   │   const res = await fetch(                  │
   │     '/api/checkout/create-session',         │
   │     {                                       │
   │       method: 'POST',                       │
   │       body: JSON.stringify({                │
   │         productId,                          │
   │         couponCode,                         │
   │         trial: true                         │
   │       })                                    │
   │     }                                       │
   │   );                                        │
   │   const { url } = await res.json();         │
   │   window.location.href = url; // → Stripe   │
   │ }                                           │
   └─────────────────────────────────────────────┘

📁 src/app/api/checkout/create-session/route.ts  (NEW)
   └── Creates Stripe Checkout Session
   └── Validates and applies coupon
   └── Returns Stripe URL

📁 src/app/api/webhooks/stripe/route.ts  (NEW)
   └── Receives Stripe webhook
   └── Writes to hub.Subscription
   └── Activates user subscription

📁 src/lib/stripe/client.ts  (NEW)
   └── Stripe SDK initialization
   └── export const stripe = new Stripe(...)

📁 .env.local
   └── ADD: STRIPE_SECRET_KEY
   └── ADD: STRIPE_WEBHOOK_SECRET
   └── ADD: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```

---

## 🔧 IMPLEMENTATION PLAN

### Phase 1: Hub Checkout Integration (OMG System)

**Files to Create/Modify:**

1. **`src/app/api/checkout/create-session/route.ts`** - Stripe Checkout Session
   ```typescript
   // Create Stripe Checkout Session
   // Write pending order to database
   // Return session URL for redirect
   ```

2. **`src/app/api/webhooks/stripe/route.ts`** - Stripe Webhook Handler
   ```typescript
   // Handle: checkout.session.completed
   // Handle: customer.subscription.created
   // Handle: customer.subscription.updated
   // Handle: customer.subscription.deleted
   // Handle: invoice.paid, invoice.payment_failed

   // On success: INSERT/UPDATE hub.Subscription
   ```

3. **`src/lib/stripe/client.ts`** - Stripe SDK initialization
   ```typescript
   import Stripe from 'stripe';
   export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
   ```

4. **`src/lib/billing/provision.ts`** - Subscription provisioning
   ```typescript
   // provisionSubscription(userId, appId, plan, stripeSubId)
   // Uses UPSERT to hub.Subscription
   // Returns success/failure
   ```

### Phase 2: Connect to Shared Database

**Prisma Schema Updates:**

Currently OMG System has its own `Subscription` model. We need to:

1. **Option A: Direct SQL to hub schema** (Recommended)
   - Use raw SQL or second Prisma client for `hub` schema
   - Keep existing schema for OMG's internal tracking
   - Write to BOTH: local tracking + `hub.Subscription`

2. **Option B: Remove local Subscription model**
   - Point entirely to shared database
   - Requires database connection string from manager

**Environment Variables Needed:**
```env
# Shared database connection (from manager)
HUB_DATABASE_URL="postgresql://user:pass@host:5432/omg_hub"

# Stripe (real keys)
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### Phase 3: Webhook Handler Logic

```typescript
// src/app/api/webhooks/stripe/route.ts

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();

  const event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const { userId, appId, plan } = session.metadata;

      // Write to hub.Subscription
      await db.$executeRaw`
        INSERT INTO hub."Subscription" (id, "userId", "appId", "plan", "status", "stripeSubscriptionId")
        VALUES (gen_random_uuid(), ${userId}, ${appId}, ${plan}, 'active', ${session.subscription})
        ON CONFLICT ("userId", "appId")
        DO UPDATE SET "plan" = ${plan}, "status" = 'active', "stripeSubscriptionId" = ${session.subscription}
      `;
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      await db.$executeRaw`
        UPDATE hub."Subscription"
        SET "status" = 'canceled'
        WHERE "stripeSubscriptionId" = ${subscription.id}
      `;
      break;
    }
  }

  return NextResponse.json({ received: true });
}
```

### Phase 4: SVD Checkout Redirect

SVD needs to redirect users to Hub for checkout instead of having its own:

**SVD Code Change (in SVD repo):**
```typescript
// When user clicks "Upgrade" on SVD
const hubCheckoutUrl = new URL('/checkout/start', process.env.HUB_URL);
hubCheckoutUrl.searchParams.set('product', 'securevault');
hubCheckoutUrl.searchParams.set('plan', 'pro');
hubCheckoutUrl.searchParams.set('returnUrl', window.location.href);

window.location.href = hubCheckoutUrl.toString();
```

---

## 🔍 CHECKING FOR EXISTING SUBSCRIPTIONS

Before creating a new subscription, Hub should check:

```typescript
async function checkExistingSubscription(userId: string, appId: string) {
  const existing = await db.$queryRaw`
    SELECT * FROM hub."Subscription"
    WHERE "userId" = ${userId} AND "appId" = ${appId} AND "status" = 'active'
  `;

  if (existing.length > 0) {
    // User already has active subscription
    // Show "Manage Subscription" instead of "Buy"
    return existing[0];
  }
  return null;
}
```

---

## 📋 CONSTANTS TO USE

**App ID for SecureVault:**
```typescript
const SECUREVAULT_APP_ID = 'app_securevault';
```

**Plan IDs:**
```typescript
const PLAN_IDS = {
  // Personal
  TRIAL: 'trial',
  STARTER: 'starter',
  GROWTH: 'growth',
  PRO: 'pro',
  // Business
  BUSINESS_STARTER: 'business_starter',
  BUSINESS_GROWTH: 'business_growth',
  BUSINESS_PRO: 'business_pro',
  ENTERPRISE: 'enterprise',
};
```

---

## ✅ WHY THIS PREVENTS DUPLICATE PAYMENTS

1. **Single Checkout Location** - All payments go through Hub
2. **UNIQUE Constraint** - `UNIQUE("userId", "appId")` prevents duplicates
3. **UPSERT Logic** - Uses `ON CONFLICT DO UPDATE` to handle edge cases
4. **Subscription Check** - Hub checks existing subscriptions before checkout
5. **SVD Reads Only** - SVD never writes to billing, only reads

---

## 🚀 VERIFICATION STEPS

1. **Test Hub Checkout:**
   - User buys SVD Pro via Hub
   - Verify `hub.Subscription` record created
   - Verify SVD shows Pro features

2. **Test SVD Redirect:**
   - User clicks "Upgrade" on SVD
   - Verify redirects to Hub checkout
   - After payment, verify returns to SVD with active subscription

3. **Test Duplicate Prevention:**
   - User with active subscription tries to buy again
   - Verify shown "Manage Subscription" instead of checkout

4. **Test Cancellation:**
   - User cancels via Stripe
   - Verify `hub.Subscription` status = 'canceled'
   - Verify SVD shows downgraded limits

---

## 📁 FILES TO CREATE/MODIFY

**OMG System Hub:**
- `src/app/api/checkout/create-session/route.ts` (NEW)
- `src/app/api/webhooks/stripe/route.ts` (NEW)
- `src/lib/stripe/client.ts` (NEW)
- `src/lib/billing/provision.ts` (NEW)
- `src/app/checkout/start/page.tsx` (MODIFY - wire up real Stripe)
- `.env.local` (MODIFY - add real Stripe keys + HUB_DATABASE_URL)

**SVD (Coordinate with Manager):**
- Upgrade button should redirect to Hub
- Remove any direct checkout flow

---

## ⏱️ ESTIMATED EFFORT

| Task | Time |
|------|------|
| Stripe SDK setup | 30 min |
| Create checkout session API | 1-2 hours |
| Webhook handler | 2-3 hours |
| Hub database connection | 1 hour |
| Provision logic | 1 hour |
| Update checkout UI | 1 hour |
| Testing | 2 hours |
| **Total** | **8-11 hours** |

---

## 🔑 PREREQUISITES FROM MANAGER

Before implementation can begin:

1. ✅ **SSO_SECRET** - For SSO integration (waiting)
2. ⏳ **HUB_DATABASE_URL** - Connection string to shared PostgreSQL
3. ⏳ **STRIPE_SECRET_KEY** - Production Stripe API key (same account as SVD)
4. ⏳ **STRIPE_WEBHOOK_SECRET** - For webhook verification
5. ⏳ **SVD Code Change** - Remove SVD's checkout, add redirect to Hub

---

## 🔄 CONFIRMED DECISIONS

| Decision | Answer |
|----------|--------|
| Billing Strategy | **Option A: Hub Only** - All payments through Hub |
| Stripe Account | **Same account** - Hub and SVD share one Stripe account |
| SVD Current State | Has own checkout - **needs to be removed** |

### SVD Changes Required (Coordinate with Manager)

SVD needs these changes to redirect to Hub instead of its own checkout:

```typescript
// SVD: Replace checkout flow with redirect to Hub
// File: [SVD repo]/src/app/pricing/page.tsx or similar

function handleUpgrade(plan: string) {
  // OLD: SVD's own Stripe checkout
  // const session = await createCheckoutSession(plan);
  // window.location.href = session.url;

  // NEW: Redirect to Hub
  const hubUrl = new URL('/checkout/start', 'https://hub.omgsystem.com');
  hubUrl.searchParams.set('product', 'securevault');
  hubUrl.searchParams.set('plan', plan);
  hubUrl.searchParams.set('returnUrl', window.location.href);

  window.location.href = hubUrl.toString();
}
```

### Webhook Consolidation

Since both use the same Stripe account:
- **Hub handles ALL Stripe webhooks** for the shared account
- Hub writes to `hub.Subscription` for ALL products
- SVD removes its webhook handler (or marks as deprecated)

---

## 📚 REFERENCE: Hub Integration Handoff Document

### Executive Summary

SecureVault Docs has been pre-architected to operate within the OMGsystems ecosystem. We utilize a **Shared Database Model** with multi-schema PostgreSQL architecture. This allows the Hub to centrally manage Identity (`core` schema) and Billing (`hub` schema), while SecureVault simply consumes this data.

**Key Integration Points:**
1. **Identity:** Users are shared via the `core.User` table.
2. **Billing:** Subscriptions are provisioned via the `hub.Subscription` table.
3. **Tenant ID:** SecureVault is identified by `appId = 'app_securevault'`.

### Database Architecture

The database is divided into three distinct schemas. As the Hub, you own the `core` and `hub` schemas.

#### Schema Breakdown

| Schema | Owner | Purpose | Key Tables |
|--------|-------|---------|------------|
| **`core`** | **HUB** | Centralized Identity & Org Management | `User`, `Organization` |
| **`hub`** | **HUB** | Centralized Billing & Entitlements | `Subscription`, `App`, `BillingEvent` |
| **`securevault`** | SecureVault | Product-specific Data | `UserProfile`, `Document`, `Vaults` |

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

### Integration Constants

The Hub must use these exact string identifiers when writing to the database to ensure SecureVault recognizes the entitlements.

#### Application Identifier
- **App ID:** `app_securevault`

#### Plan Identifiers (The `plan` column)

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

### Workflows

#### A. Authentication Handshake

1. User logs into **OMGsystems Hub**.
2. Hub verifies credentials.
3. Hub redirects user to SecureVault (e.g., `https://securevault.com/login?token=xyz`).
4. SecureVault validates the session.
5. **Synchronization:** SecureVault creates/updates the local `securevault.UserProfile` record but relies on `core.User` for auth.
   - _See Code:_ `src/lib/auth/syncUser.ts` -> `syncUserToDatabase()`

#### B. Provisioning a Subscription

1. User buys "SecureVault Pro" on the Hub.
2. **Hub Action:** SQL Insert.
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
3. **Result:** SecureVault checks this table strictly. The user instantly gets 200GB storage, 1350 Processing Units, etc.

### Reference Implementation

Refer to these files in the SecureVault repository to see the "Read" side of this architecture:

1. **`src/lib/db-utils.ts`**
   - Contains the `SCHEMA_MAP` enforcing the schema separation.
   - Defines `SECUREVAULT_APP_ID`.

2. **`src/lib/auth/syncUser.ts`**
   - `syncUserToDatabase`: Syncs identity to `core.User`.
   - `getUserSubscription`: Reads entitlements from `hub.Subscription`.

3. **`src/lib/plan-limits.ts`**
   - Defines exactly what features are unlocked by each plan ID.

---

## 🔗 RELATED DOCUMENTS

- [SSO Integration Plan](./src/lib/sso/jwt.ts) - JWT-based SSO between Hub and products
- [Hub Integration Handoff](./OMGsystems_Hub_Integration_Handoff.md) - Full integration specification
- [Product Catalog](./src/config/productCatalog.ts) - Product definitions and launch URLs

---

## 📝 CHANGE LOG

| Date | Change | Author |
|------|--------|--------|
| 2026-01-16 | Initial plan created | Claude |
| 2026-01-16 | Added confirmed decisions (Hub Only, Same Stripe account) | Claude |
| 2026-01-16 | Added Hub Integration Handoff reference | Claude |
| 2026-01-16 | Added detailed visual flow diagrams for frontend developers | Claude |
| 2026-01-16 | Added "Where Stripe Fits" section with before/after comparison | Claude |
| 2026-01-16 | Added coupon integration flow with Stripe | Claude |
| 2026-01-16 | Added code changes summary with before/after examples | Claude |
