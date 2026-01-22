# Stripe Playbook

Complete step-by-step guide to integrate Stripe payments, subscriptions, and webhooks with SecureVault Docs.

## Table of Contents

1. [Overview](#overview)
2. [Stripe Account Setup](#stripe-account-setup)
3. [Stripe Sandbox (Test Mode)](#stripe-sandbox-test-mode)
4. [Create Products & Prices](#create-products--prices)
5. [Implement Checkout](#implement-checkout)
6. [Set Up Webhooks](#set-up-webhooks)
7. [Going Live](#going-live)
8. [Testing Checklist](#testing-checklist)
9. [Troubleshooting](#troubleshooting)

---

## Overview

This playbook covers:
- Setting up Stripe account (test and live)
- Creating products and subscription prices
- Implementing checkout flow
- Handling webhooks
- Testing in sandbox
- Going live to production

### Prerequisites

- Stripe account (sign up at https://stripe.com)
- Access to SecureVault Docs codebase
- Understanding of subscription billing
- Test credit cards for sandbox testing

---

## Stripe Account Setup

### Step 1: Create Stripe Account

1. **Sign Up**: Go to https://stripe.com and create account
2. **Verify Email**: Confirm your email address
3. **Complete Profile**: Add business information
4. **Add Bank Account**: Required for live mode (can add later)

### Step 2: Access Dashboard

1. **Login**: https://dashboard.stripe.com
2. **Toggle Mode**: Switch between "Test mode" and "Live mode"
3. **Get API Keys**: 
   - Go to Developers → API keys
   - Copy **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - Copy **Secret key** (starts with `sk_test_` or `sk_live_`)

### Step 3: Install Stripe in App

```bash
npm install stripe
npm install @stripe/stripe-js  # For client-side
```

### Step 4: Configure Environment Variables

**File**: `.env.local`

```bash
# Stripe Test Mode (Sandbox)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Live Mode (Production)
# STRIPE_SECRET_KEY=sk_live_...
# STRIPE_PUBLISHABLE_KEY=pk_live_...
# STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## Stripe Sandbox (Test Mode)

### Step 1: Enable Test Mode

1. **Toggle Switch**: In Stripe Dashboard, toggle to "Test mode"
2. **Use Test Keys**: All API calls use test keys (start with `test_`)
3. **Test Cards**: Use Stripe test card numbers (see below)

### Step 2: Test Card Numbers

Use these test card numbers in sandbox:

**Successful Payment**:
- Card: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., `12/25`)
- CVC: Any 3 digits (e.g., `123`)
- ZIP: Any 5 digits (e.g., `12345`)

**Declined Payment**:
- Card: `4000 0000 0000 0002`
- Expiry: Any future date
- CVC: Any 3 digits

**Requires Authentication (3D Secure)**:
- Card: `4000 0027 6000 3184`
- Expiry: Any future date
- CVC: Any 3 digits

**More Test Cards**: See https://stripe.com/docs/testing

### Step 3: Test Checkout Flow

1. **Create Test Product**: See [Create Products & Prices](#create-products--prices)
2. **Initiate Checkout**: Use test card `4242 4242 4242 4242`
3. **Complete Payment**: Should succeed in test mode
4. **Check Dashboard**: Verify payment appears in Stripe Dashboard

---

## Create Products & Prices

### Step 1: Create Products

#### Personal Plans

**Product 1: Personal Starter**
1. Go to Products → Add Product
2. **Name**: "Personal Starter"
3. **Description**: "Personal document management - Starter plan"
4. **Save Product**

**Product 2: Personal Growth**
1. **Name**: "Personal Growth"
2. **Description**: "Personal document management - Growth plan"
3. **Save Product**

**Product 3: Personal Pro**
1. **Name**: "Personal Pro"
2. **Description**: "Personal document management - Pro plan with client portals"
3. **Save Product**

#### Business Plans

**Product 4: Business Starter**
1. **Name**: "Business Starter"
2. **Description**: "Business document management - Starter plan"
3. **Save Product**

**Product 5: Business Growth**
1. **Name**: "Business Growth"
2. **Description**: "Business document management - Growth plan"
3. **Save Product**

**Product 6: Business Pro**
1. **Name**: "Business Pro"
2. **Description**: "Business document management - Pro plan"
3. **Save Product**

### Step 2: Create Prices (Subscriptions)

For each product, create recurring prices:

#### Personal Starter
1. Click product → Add Price
2. **Type**: Recurring
3. **Billing Period**: Monthly
4. **Price**: $9.99 USD
5. **Save Price**
6. **Copy Price ID** (starts with `price_...`)

Repeat for:
- **Personal Starter Annual**: $99.99/year
- **Personal Growth Monthly**: $14.99/month
- **Personal Growth Annual**: $149.99/year
- **Personal Pro Monthly**: $24.99/month
- **Personal Pro Annual**: $249.99/year

#### Business Plans
- **Business Starter**: $59.99/seat/month
- **Business Growth**: $109.99/seat/month
- **Business Pro**: $219.99/seat/month

**Note**: Business plans are per-seat, so set `quantity` in checkout.

### Step 3: Document Price IDs

Create a mapping file:

**File**: `src/lib/stripe/prices.ts`

```typescript
export const STRIPE_PRICES = {
  // Personal
  personal: {
    starter: {
      monthly: process.env.STRIPE_PRICE_PERSONAL_STARTER_MONTHLY!,
      annual: process.env.STRIPE_PRICE_PERSONAL_STARTER_ANNUAL!,
    },
    growth: {
      monthly: process.env.STRIPE_PRICE_PERSONAL_GROWTH_MONTHLY!,
      annual: process.env.STRIPE_PRICE_PERSONAL_GROWTH_ANNUAL!,
    },
    pro: {
      monthly: process.env.STRIPE_PRICE_PERSONAL_PRO_MONTHLY!,
      annual: process.env.STRIPE_PRICE_PERSONAL_PRO_ANNUAL!,
    },
  },
  // Business
  business: {
    starter: {
      monthly: process.env.STRIPE_PRICE_BUSINESS_STARTER_MONTHLY!,
      annual: process.env.STRIPE_PRICE_BUSINESS_STARTER_ANNUAL!,
    },
    growth: {
      monthly: process.env.STRIPE_PRICE_BUSINESS_GROWTH_MONTHLY!,
      annual: process.env.STRIPE_PRICE_BUSINESS_GROWTH_ANNUAL!,
    },
    pro: {
      monthly: process.env.STRIPE_PRICE_BUSINESS_PRO_MONTHLY!,
      annual: process.env.STRIPE_PRICE_BUSINESS_PRO_ANNUAL!,
    },
  },
};
```

Add to `.env.local`:
```bash
STRIPE_PRICE_PERSONAL_STARTER_MONTHLY=price_...
STRIPE_PRICE_PERSONAL_STARTER_ANNUAL=price_...
# ... etc
```

---

## Implement Checkout

### Step 1: Create Checkout API Route

**File**: `src/app/api/billing/checkout/route.ts`

```typescript
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { STRIPE_PRICES } from "@/lib/stripe/prices";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { plan, cycle, track, seats } = await req.json();

  // Get price ID based on plan and cycle
  const priceId = STRIPE_PRICES[track][plan][cycle];

  if (!priceId) {
    return NextResponse.json(
      { error: "Invalid plan" },
      { status: 400 }
    );
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: session.user?.email,
      line_items: [
        {
          price: priceId,
          quantity: track === "business" ? (seats || 1) : 1,
        },
      ],
      metadata: {
        userId: session.user.id,
        track: track, // "business" or "personal"
        plan: plan, // "starter", "growth", "pro"
        cycle: cycle, // "monthly" or "annual"
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      subscription_data: {
        metadata: {
          userId: session.user.id,
          track: track,
          plan: plan,
          cycle: cycle,
        },
        trial_period_days: 14, // Optional: 14-day free trial
      },
    });

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Checkout failed" },
      { status: 500 }
    );
  }
}
```

### Step 2: Create Checkout Page

**File**: `src/app/checkout/page.tsx`

```typescript
"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    
    if (sessionId) {
      // Redirect to Stripe Checkout
      stripePromise.then((stripe) => {
        stripe?.redirectToCheckout({ sessionId });
      });
    } else {
      // Create new checkout session
      const createCheckout = async () => {
        const plan = searchParams.get("plan");
        const cycle = searchParams.get("cycle") || "monthly";
        const track = searchParams.get("track") || "business";

        const res = await fetch("/api/billing/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan, cycle, track }),
        });

        const { url } = await res.json();
        if (url) {
          window.location.href = url;
        }
      };

      createCheckout();
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2bd576] mx-auto"></div>
        <p className="mt-4 text-white">Redirecting to checkout...</p>
      </div>
    </div>
  );
}
```

### Step 3: Create Success Page

**File**: `src/app/checkout/success/page.tsx`

```typescript
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      // Verify session and redirect to app
      setTimeout(() => {
        router.push("/post-login");
      }, 2000);
    }
  }, [sessionId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f0c] text-white">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-[#2bd576] flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-white/70 mb-6">Your subscription is now active.</p>
        <Link
          href="/post-login"
          className="inline-block rounded-xl bg-[#2bd576] hover:bg-[#2bd576]/90 text-black px-6 py-3 font-semibold transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
```

---

## Set Up Webhooks

### Step 1: Create Webhook Endpoint in Stripe

1. **Go to Webhooks**: Developers → Webhooks
2. **Add Endpoint**: Click "Add endpoint"
3. **Endpoint URL**: `https://your-domain.com/api/webhooks/stripe`
4. **Events to Listen**: Select these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `customer.subscription.trial_will_end`
5. **Save Endpoint**
6. **Copy Signing Secret**: Click endpoint → Reveal signing secret → Copy (starts with `whsec_...`)

### Step 2: Implement Webhook Handler

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
    console.error("Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle event
  try {
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

          // Create subscription record
          if (session.subscription) {
            const subscription = await stripe.subscriptions.retrieve(
              session.subscription
            );
            
            await prisma.subscription.upsert({
              where: { userId },
              create: {
                userId,
                stripeCustomerId: String(customerId),
                stripeSubscriptionId: subscription.id,
                stripePriceId: subscription.items.data[0]?.price.id,
                status: subscription.status,
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                trialEnd: subscription.trial_end 
                  ? new Date(subscription.trial_end * 1000) 
                  : null,
              },
              update: {
                stripeCustomerId: String(customerId),
                stripeSubscriptionId: subscription.id,
                stripePriceId: subscription.items.data[0]?.price.id,
                status: subscription.status,
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                trialEnd: subscription.trial_end 
                  ? new Date(subscription.trial_end * 1000) 
                  : null,
              },
            });
          }
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
          await prisma.subscription.upsert({
            where: { userId: user.id },
            create: {
              userId: user.id,
              stripeCustomerId: String(customerId),
              stripeSubscriptionId: subscription.id,
              stripePriceId: subscription.items.data[0]?.price.id,
              status: subscription.status,
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              trialEnd: subscription.trial_end 
                ? new Date(subscription.trial_end * 1000) 
                : null,
            },
            update: {
              stripePriceId: subscription.items.data[0]?.price.id,
              status: subscription.status,
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              trialEnd: subscription.trial_end 
                ? new Date(subscription.trial_end * 1000) 
                : null,
            },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as any;
        
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: { status: "canceled" },
        });
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as any;
        // Handle successful payment
        // Send receipt email, update usage limits, etc.
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as any;
        // Handle failed payment
        // Send notification, update subscription status
        break;
      }

      case "customer.subscription.trial_will_end": {
        const subscription = event.data.object as any;
        // Send trial ending reminder email
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

### Step 3: Test Webhooks Locally

Use Stripe CLI to test webhooks locally:

```bash
# Install Stripe CLI
# macOS: brew install stripe/stripe-cli/stripe
# Linux/Windows: See https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.created
```

---

## Going Live

### Step 1: Complete Stripe Account Setup

1. **Switch to Live Mode**: Toggle to "Live mode" in dashboard
2. **Complete Business Profile**:
   - Business name and type
   - Business address
   - Tax ID (if applicable)
   - Bank account details
3. **Verify Identity**: Upload required documents
4. **Wait for Approval**: Usually 1-2 business days

### Step 2: Get Live API Keys

1. **Go to API Keys**: Developers → API keys
2. **Copy Live Keys**:
   - Publishable key (starts with `pk_live_`)
   - Secret key (starts with `sk_live_`)
3. **Update Environment Variables**:
   ```bash
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   ```

### Step 3: Create Live Products & Prices

1. **Switch to Live Mode**
2. **Recreate Products**: Create all products again in live mode
3. **Recreate Prices**: Create all prices with live pricing
4. **Update Price IDs**: Update environment variables with live price IDs

### Step 4: Set Up Live Webhook

1. **Create Webhook Endpoint**: 
   - URL: `https://your-production-domain.com/api/webhooks/stripe`
   - Events: Same as test mode
2. **Copy Live Signing Secret**: Update `STRIPE_WEBHOOK_SECRET`
3. **Test Webhook**: Use Stripe Dashboard to send test event

### Step 5: Update App Configuration

1. **Update Environment Variables**: Use live keys
2. **Deploy to Production**: Deploy updated code
3. **Test Checkout**: Use real card (small amount) to test
4. **Monitor**: Watch Stripe Dashboard for live transactions

### Step 6: Enable 3D Secure (Recommended)

1. **Go to Settings**: Settings → Payment methods
2. **Enable 3D Secure**: For European cards (SCA compliance)
3. **Test**: Use test card `4000 0027 6000 3184`

---

## Testing Checklist

### Sandbox Testing

- [ ] Test successful payment (`4242 4242 4242 4242`)
- [ ] Test declined payment (`4000 0000 0000 0002`)
- [ ] Test 3D Secure (`4000 0027 6000 3184`)
- [ ] Test subscription creation
- [ ] Test subscription update
- [ ] Test subscription cancellation
- [ ] Test webhook events
- [ ] Test invoice payment
- [ ] Test invoice payment failure
- [ ] Test trial period
- [ ] Test upgrade/downgrade

### Live Testing (Small Amounts)

- [ ] Test checkout with real card ($1)
- [ ] Verify webhook received
- [ ] Verify subscription created
- [ ] Test subscription management
- [ ] Test cancellation
- [ ] Verify refund process

---

## Troubleshooting

### Common Issues

#### 1. Webhook Not Received

**Symptoms**: Webhook events not reaching app

**Solutions**:
- Check webhook URL is correct
- Verify webhook secret matches
- Check server logs for errors
- Use Stripe CLI to test locally
- Verify endpoint is publicly accessible

#### 2. Checkout Session Fails

**Symptoms**: Checkout page shows error

**Solutions**:
- Verify API keys are correct
- Check price IDs exist
- Verify metadata is valid
- Check CORS settings
- Review Stripe Dashboard logs

#### 3. Subscription Not Created

**Symptoms**: Payment succeeds but no subscription

**Solutions**:
- Check webhook handler for errors
- Verify `checkout.session.completed` event is handled
- Check database connection
- Verify user exists
- Check subscription creation logic

#### 4. Webhook Signature Verification Fails

**Symptoms**: `Invalid signature` error

**Solutions**:
- Verify `STRIPE_WEBHOOK_SECRET` is correct
- Ensure raw body is used (not parsed JSON)
- Check webhook endpoint URL matches Stripe
- Verify timestamp is recent (not replay attack)

---

## Best Practices

### Security
1. **Never expose secret keys** in client-side code
2. **Always verify webhook signatures**
3. **Use HTTPS** for all webhook endpoints
4. **Implement idempotency** for webhook handlers
5. **Log all webhook events** for audit

### Performance
1. **Process webhooks asynchronously** for long operations
2. **Use webhook retries** for transient failures
3. **Implement rate limiting** on webhook endpoints
4. **Cache Stripe API calls** when possible

### Monitoring
1. **Set up alerts** for failed payments
2. **Monitor webhook success rate**
3. **Track subscription metrics**
4. **Set up error tracking** (Sentry, etc.)

---

## Support Resources

- **Stripe Documentation**: https://stripe.com/docs
- **Stripe API Reference**: https://stripe.com/docs/api
- **Stripe Testing**: https://stripe.com/docs/testing
- **Stripe Support**: https://support.stripe.com

---

**Next Steps**: 
1. Set up Stripe account
2. Create products and prices
3. Implement checkout
4. Test in sandbox
5. Go live

**Questions?** Refer to Stripe documentation or contact the engineering team.

**Last Updated**: [Current Date]

