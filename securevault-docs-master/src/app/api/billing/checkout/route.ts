// Stripe Checkout Session API
// Creates a Stripe checkout session for subscription purchases
// Supports per-seat billing for business plans

import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { BUSINESS_PLAN_LIMITS } from '@/lib/plan-limits';

export async function POST(req: NextRequest) {
  try {
    const { queryOne } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    const body = await req.json();
    const {
      priceId,
      planTier,
      interval,
      organizationId,
      personalVaultId,
      seatCount, // For per-seat business billing
      mode, // 'subscription' or 'payment'
    } = body;

    // Validate required fields
    if (!priceId) {
      return NextResponse.json(
        { error: 'Missing required field: priceId' },
        { status: 400 }
      );
    }

    // Validate seat count for business plans
    let validatedSeatCount = 1;
    if (planTier && planTier.startsWith('business_')) {
      const planLimits = BUSINESS_PLAN_LIMITS[planTier as keyof typeof BUSINESS_PLAN_LIMITS];
      if (planLimits) {
        validatedSeatCount = seatCount || planLimits.seatMin;

        // Validate seat count is within plan limits
        if (validatedSeatCount < planLimits.seatMin) {
          return NextResponse.json(
            { error: `Minimum seat count for ${planTier} is ${planLimits.seatMin}` },
            { status: 400 }
          );
        }

        if (planLimits.seatMax !== 'unlimited' && validatedSeatCount > planLimits.seatMax) {
          return NextResponse.json(
            { error: `Maximum seat count for ${planTier} is ${planLimits.seatMax}` },
            { status: 400 }
          );
        }
      }
    }

    // Get authenticated user from NextAuth session
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user details
    const userData = await queryOne<{ id: string; email: string; name: string }>(
      `SELECT id, email, name FROM ${getTableName('User')} WHERE id = $1`,
      [session.user.id]
    );

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Determine success and cancel URLs
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/settings/billing?success=true&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/settings/billing?canceled=true`;

    // Create checkout session
    const checkoutSession = await createCheckoutSession({
      priceId,
      userId: session.user.id,
      userEmail: userData.email,
      successUrl,
      cancelUrl,
      organizationId,
      personalVaultId,
      quantity: validatedSeatCount, // Per-seat billing for business plans
      metadata: {
        planTier,
        interval,
        seatCount: String(validatedSeatCount),
      },
      mode: mode as 'subscription' | 'payment',
    });

    return NextResponse.json({
      sessionId: checkoutSession.sessionId,
      url: checkoutSession.url,
      seatCount: validatedSeatCount,
    });

  } catch (error) {
    console.error('Checkout session error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
