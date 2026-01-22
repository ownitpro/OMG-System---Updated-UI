import { NextRequest, NextResponse } from 'next/server'
import { constructWebhookEvent } from '@/lib/stripe'
import { getPlanFromPriceId } from '@/config/stripe-prices'
import type Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature provided' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = await constructWebhookEvent(body, signature)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdate(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaymentSucceeded(invoice)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaymentFailed(invoice)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { query } = await import('@/lib/db')
  const { getTableName } = await import('@/lib/db-utils')

  const userId = session.metadata?.userId

  if (!userId) {
    console.error('No userId in checkout session metadata')
    return
  }

  const customerId = session.customer as string
  
  // Always update stripeCustomerId if we have it
  if (customerId) {
    await query(
      `UPDATE ${getTableName('User')} SET "stripeCustomerId" = $1 WHERE id = $2`,
      [customerId, userId]
    )
  }

  // Handle Processing Unit Top-ups
  if (session.metadata?.type === 'processing_unit_topup') {
    const units = parseInt(session.metadata.units || '0', 10)
    const packId = session.metadata.packId
    const orgId = session.metadata.organizationId
    
    console.log(`[Webhook] Processing top-up for user ${userId}: ${packId} (${units} units)`)
    
    if (units > 0) {
      try {
        const { addPurchasedProcessingUnits, addOrgPurchasedProcessingUnits } = await import('@/lib/processing-tracking')
        const { logTopUp, TOP_UP_PACKS } = await import('@/lib/services/auto-topup-service')
        
        if (orgId) {
            await addOrgPurchasedProcessingUnits(orgId, units)
        } else {
            await addPurchasedProcessingUnits(userId, units)
        }
        
        // Log the transaction
        const packInfo = TOP_UP_PACKS[packId as keyof typeof TOP_UP_PACKS]
        if (packInfo) {
             await logTopUp(userId, orgId, packInfo, 'purchase')
        }

        console.log(`[Webhook] Successfully added ${units} units to user ${userId}`)
      } catch (err) {
        console.error('[Webhook] Failed to add processing units:', err)
      }
    }
    return
  }

  // Handle Subscriptions
  const subscriptionId = session.subscription as string
  
  if (subscriptionId) {
    // Update user with subscription ID
    await query(
        `UPDATE ${getTableName('User')} SET "stripeSubscriptionId" = $1 WHERE id = $2`,
        [subscriptionId, userId]
    )
  }

  console.log(`Checkout completed for user ${userId}`)
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const { query, queryOne } = await import('@/lib/db')
  const { getTableName } = await import('@/lib/db-utils')

  const customerId = subscription.customer as string

  // Get user by Stripe customer ID
  const user = await queryOne<{ id: string }>(
    `SELECT * FROM ${getTableName('User')} WHERE "stripeCustomerId" = $1`,
    [customerId]
  )

  if (!user) {
    console.error(`No user found for customer ${customerId}`)
    return
  }

  const priceId = subscription.items.data[0]?.price.id || ''
  const planInfo = getPlanFromPriceId(priceId)
  
  let planName = 'free'
  if (planInfo) {
      if (planInfo.planType === 'business') {
          planName = `business_${planInfo.tier}`
      } else {
          planName = planInfo.tier
      }
  }

  await query(
    `UPDATE ${getTableName('User')} SET
      "stripeSubscriptionId" = $1,
      "stripeSubscriptionStatus" = $2,
      "stripePriceId" = $3,
      plan = $4,
      "subscriptionPeriodEnd" = $5
     WHERE id = $6`,
    [
      subscription.id,
      subscription.status,
      priceId,
      planName,
      new Date((subscription as any).current_period_end * 1000).toISOString(),
      user.id
    ]
  )

  console.log(`Subscription updated for user ${user.id}: ${subscription.status}`)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const { query, queryOne } = await import('@/lib/db')
  const { getTableName } = await import('@/lib/db-utils')

  const customerId = subscription.customer as string

  // Get user by Stripe customer ID
  const user = await queryOne<{ id: string }>(
    `SELECT * FROM ${getTableName('User')} WHERE "stripeCustomerId" = $1`,
    [customerId]
  )

  if (!user) {
    console.error(`No user found for customer ${customerId}`)
    return
  }

  // Reset user to free plan
  await query(
    `UPDATE ${getTableName('User')} SET
      plan = 'free',
      "stripeSubscriptionId" = NULL,
      "stripeSubscriptionStatus" = 'canceled',
      "stripePriceId" = NULL,
      "subscriptionPeriodEnd" = NULL
     WHERE id = $1`,
    [user.id]
  )

  console.log(`Subscription deleted for user ${user.id}`)
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string

  console.log(`Invoice payment succeeded for customer ${customerId}`)
  // Could send email confirmation here
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string

  console.log(`Invoice payment failed for customer ${customerId}`)
  // Could send email notification here
}

// Helper removed in favor of @/config/stripe-prices
