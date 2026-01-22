// Stripe Integration
// Supports both mock mode (for development) and real Stripe (for production)
import type Stripe from 'stripe';

const USE_MOCK_BILLING = process.env.NEXT_PUBLIC_BILLING_MODE === 'mock';
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export type PriceInterval = 'month' | 'year';
export type PlanTier = 'personal' | 'business' | 'enterprise';

export interface CheckoutSessionParams {
  priceId: string;
  userId: string;
  userEmail: string;
  successUrl: string;
  cancelUrl: string;
  organizationId?: string;
  personalVaultId?: string;
  quantity?: number; // For per-seat billing
  metadata?: Record<string, string>;
  mode?: 'subscription' | 'payment'; // Support one-time payments
}

export interface CustomerPortalParams {
  customerId: string;
  returnUrl: string;
}

// ...



export interface SubscriptionInfo {
  id: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete';
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  planTier: PlanTier;
  interval: PriceInterval;
  seatCount: number; // Number of seats (quantity for per-seat billing)
  priceId?: string;
}

// ============================================================================
// CHECKOUT SESSION CREATION
// ============================================================================

export async function createCheckoutSession(
  params: CheckoutSessionParams
): Promise<{ sessionId: string; url: string }> {
  if (USE_MOCK_BILLING) {
    console.log('[MOCK STRIPE] createCheckoutSession called:', params);

    // Return mock checkout session
    const mockSessionId = `cs_mock_${Date.now()}`;
    return {
      sessionId: mockSessionId,
      url: `${params.successUrl}?session_id=${mockSessionId}`,
    };
  }

  // Real Stripe implementation
  const stripe = await getStripeClient();

  const session = await stripe.checkout.sessions.create({
    mode: params.mode || 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: params.priceId,
        quantity: params.quantity || 1, // Per-seat billing uses quantity > 1
      },
    ],
    customer_email: params.userEmail,
    client_reference_id: params.userId,
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: {
      userId: params.userId,
      organizationId: params.organizationId || '',
      personalVaultId: params.personalVaultId || '',
      seatCount: String(params.quantity || 1),
      ...(params.metadata || {}),
    },
  });

  if (!session.id || !session.url) {
    throw new Error('Failed to create checkout session');
  }

  return {
    sessionId: session.id,
    url: session.url,
  };
}

// ============================================================================
// CUSTOMER PORTAL SESSION
// ============================================================================

export async function createCustomerPortalSession(
  params: CustomerPortalParams
): Promise<{ url: string }> {
  if (USE_MOCK_BILLING) {
    console.log('[MOCK STRIPE] createCustomerPortalSession called:', params);

    // Return mock portal URL
    return {
      url: params.returnUrl,
    };
  }

  // Real Stripe implementation
  const stripe = await getStripeClient();

  const session = await stripe.billingPortal.sessions.create({
    customer: params.customerId,
    return_url: params.returnUrl,
  });

  if (!session.url) {
    throw new Error('Failed to create customer portal session');
  }

  return {
    url: session.url,
  };
}

// ============================================================================
// SUBSCRIPTION MANAGEMENT
// ============================================================================

export async function getSubscription(
  subscriptionId: string
): Promise<SubscriptionInfo | null> {
  if (USE_MOCK_BILLING) {
    console.log('[MOCK STRIPE] getSubscription called:', subscriptionId);

    // Return mock subscription
    return {
      id: subscriptionId,
      status: 'active',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      cancelAtPeriodEnd: false,
      planTier: 'personal',
      interval: 'month',
      seatCount: 1,
    };
  }

  // Real Stripe implementation
  const stripe = await getStripeClient();

  try {
    const subscription = (await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['items.data.price.product'],
    })) as unknown as Stripe.Subscription;

    // Extract plan tier from metadata or product name
    const product = subscription.items.data[0]?.price?.product;
    const productName = (product && typeof product !== 'string' && 'name' in product) ? product.name : '';

    let planTier: PlanTier = 'personal';
    if (productName.toLowerCase().includes('business')) {
      planTier = 'business';
    } else if (productName.toLowerCase().includes('enterprise')) {
      planTier = 'enterprise';
    }

    const interval = subscription.items.data[0]?.price?.recurring?.interval as PriceInterval || 'month';
    const seatCount = subscription.items.data[0]?.quantity || 1;
    const priceId = subscription.items.data[0]?.price?.id;

    return {
      id: subscription.id,
      status: subscription.status as any,
      currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
      cancelAtPeriodEnd: (subscription as any).cancel_at_period_end,
      planTier,
      interval,
      seatCount,
      priceId,
    };
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }
}

export async function cancelSubscription(
  subscriptionId: string,
  cancelAtPeriodEnd: boolean = true
): Promise<boolean> {
  if (USE_MOCK_BILLING) {
    console.log('[MOCK STRIPE] cancelSubscription called:', subscriptionId, cancelAtPeriodEnd);
    return true;
  }

  // Real Stripe implementation
  const stripe = await getStripeClient();

  try {
    if (cancelAtPeriodEnd) {
      await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });
    } else {
      await stripe.subscriptions.cancel(subscriptionId);
    }
    return true;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    return false;
  }
}

export async function resumeSubscription(subscriptionId: string): Promise<boolean> {
  if (USE_MOCK_BILLING) {
    console.log('[MOCK STRIPE] resumeSubscription called:', subscriptionId);
    return true;
  }

  // Real Stripe implementation
  const stripe = await getStripeClient();

  try {
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });
    return true;
  } catch (error) {
    console.error('Error resuming subscription:', error);
    return false;
  }
}

/**
 * Update the seat count (quantity) on a subscription
 * Used for per-seat business billing
 */
export async function updateSubscriptionSeats(
  subscriptionId: string,
  newSeatCount: number,
  proration: 'create_prorations' | 'none' | 'always_invoice' = 'create_prorations'
): Promise<{ success: boolean; error?: string; newSeatCount?: number }> {
  if (newSeatCount < 1) {
    return { success: false, error: 'Seat count must be at least 1' };
  }

  if (USE_MOCK_BILLING) {
    console.log('[MOCK STRIPE] updateSubscriptionSeats called:', subscriptionId, newSeatCount);
    return { success: true, newSeatCount };
  }

  // Real Stripe implementation
  const stripe = await getStripeClient();

  try {
    // Get the subscription to find the subscription item ID
    const subscription = (await stripe.subscriptions.retrieve(subscriptionId)) as unknown as Stripe.Subscription;
    const subscriptionItemId = subscription.items.data[0]?.id;

    if (!subscriptionItemId) {
      return { success: false, error: 'Subscription item not found' };
    }

    // Update the quantity on the subscription item
    await stripe.subscriptionItems.update(subscriptionItemId, {
      quantity: newSeatCount,
      proration_behavior: proration,
    });

    return { success: true, newSeatCount };
  } catch (error: any) {
    console.error('Error updating subscription seats:', error);
    return { success: false, error: error.message || 'Failed to update seats' };
  }
}

/**
 * Get upcoming invoice preview for seat change
 */
export async function previewSeatChange(
  subscriptionId: string,
  newSeatCount: number
): Promise<{ success: boolean; amountDue?: number; error?: string }> {
  if (USE_MOCK_BILLING) {
    console.log('[MOCK STRIPE] previewSeatChange called:', subscriptionId, newSeatCount);
    // Mock: estimate $10 per seat per month prorated
    return { success: true, amountDue: Math.abs(newSeatCount - 1) * 1000 };
  }

  const stripe = await getStripeClient();

  try {
    const subscription = (await stripe.subscriptions.retrieve(subscriptionId)) as unknown as Stripe.Subscription;
    const subscriptionItemId = subscription.items.data[0]?.id;

    if (!subscriptionItemId) {
      return { success: false, error: 'Subscription item not found' };
    }

    const invoice = await stripe.invoices.createPreview({
      subscription: subscriptionId,
      // @ts-ignore
      subscription_items: [
        {
          id: subscriptionItemId,
          quantity: newSeatCount,
        },
      ],
    } as any);

    return { success: true, amountDue: invoice.amount_due };
  } catch (error: any) {
    console.error('Error previewing seat change:', error);
    return { success: false, error: error.message || 'Failed to preview change' };
  }
}

// ============================================================================
// WEBHOOK HANDLING
// ============================================================================

export async function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
) {
  if (USE_MOCK_BILLING) {
    console.log('[MOCK STRIPE] constructWebhookEvent called');

    // Parse payload as JSON for mock mode
    const event = typeof payload === 'string' ? JSON.parse(payload) : JSON.parse(payload.toString());
    return event;
  }

  // Real Stripe implementation
  const stripe = await getStripeClient();

  if (!STRIPE_WEBHOOK_SECRET) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
  }

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      STRIPE_WEBHOOK_SECRET
    );
    return event;
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    throw error;
  }
}

// ============================================================================
// PRICE UTILITIES
// ============================================================================

export interface PriceInfo {
  id: string;
  productId: string;
  amount: number;
  currency: string;
  interval: PriceInterval;
  planTier: PlanTier;
}

export async function listPrices(): Promise<PriceInfo[]> {
  if (USE_MOCK_BILLING) {
    console.log('[MOCK STRIPE] listPrices called');

    // Return mock prices
    return [
      {
        id: 'price_personal_month',
        productId: 'prod_personal',
        amount: 999,
        currency: 'usd',
        interval: 'month',
        planTier: 'personal',
      },
      {
        id: 'price_personal_year',
        productId: 'prod_personal',
        amount: 9990,
        currency: 'usd',
        interval: 'year',
        planTier: 'personal',
      },
      {
        id: 'price_business_month',
        productId: 'prod_business',
        amount: 2999,
        currency: 'usd',
        interval: 'month',
        planTier: 'business',
      },
      {
        id: 'price_business_year',
        productId: 'prod_business',
        amount: 29990,
        currency: 'usd',
        interval: 'year',
        planTier: 'business',
      },
    ];
  }

  // Real Stripe implementation
  const stripe = await getStripeClient();

  const prices = await stripe.prices.list({
    active: true,
    expand: ['data.product'],
  });

  return prices.data.map(price => {
    const product = price.product;
    const productName = (product && typeof product !== 'string' && 'name' in product) ? product.name : '';

    let planTier: PlanTier = 'personal';
    if (productName.toLowerCase().includes('business')) {
      planTier = 'business';
    } else if (productName.toLowerCase().includes('enterprise')) {
      planTier = 'enterprise';
    }

    return {
      id: price.id,
      productId: typeof product === 'string' ? product : product?.id || '',
      amount: price.unit_amount || 0,
      currency: price.currency,
      interval: (price.recurring?.interval as PriceInterval) || 'month',
      planTier,
    };
  });
}

// ============================================================================
// STRIPE CLIENT
// ============================================================================

export async function getStripeClient() {
  if (!STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }

  const { default: Stripe } = await import('stripe');

  return new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2025-11-17.clover',
    typescript: true,
  });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function formatPrice(amount: number, currency: string = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export function getPlanDisplayName(tier: PlanTier): string {
  const names: Record<PlanTier, string> = {
    personal: 'Personal',
    business: 'Business',
    enterprise: 'Enterprise',
  };
  return names[tier] || tier;
}

export function getIntervalDisplayName(interval: PriceInterval): string {
  const names: Record<PriceInterval, string> = {
    month: 'Monthly',
    year: 'Yearly',
  };
  return names[interval] || interval;
}
