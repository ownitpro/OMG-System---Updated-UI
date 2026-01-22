// POST /api/billing/top-up
// Purchase Processing Units top-up pack
// GET /api/billing/top-up - Get top-up options and settings

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import {
  purchaseTopUp,
  getAutoTopUpSettings,
  updateAutoTopUpSettings,
  getTopUpPackOptions,
  type TopUpPack,
} from '@/lib/services/auto-topup-service'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Get auto top-up settings
    const settings = await getAutoTopUpSettings(userId)

    // Get available packs
    const packs = getTopUpPackOptions()

    return NextResponse.json({
      success: true,
      settings,
      packs,
    })
  } catch (error: any) {
    console.error('[TopUp] GET error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to get top-up options' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const body = await request.json()
    const { action, packId, orgId, settings } = body

    // Handle settings update
    if (action === 'update_settings') {
      if (!settings) {
        return NextResponse.json({ error: 'Settings required' }, { status: 400 })
      }

      await updateAutoTopUpSettings(userId, settings)

      return NextResponse.json({
        success: true,
        message: 'Auto top-up settings updated',
      })
    }

    // Handle purchase
    if (action === 'purchase') {
      console.log('[API] Top-up purchase request:', { packId, userId, orgId });
      
      // DEBUG: Verify environment variable loading
      const { STRIPE_PRICES_TOPUP } = await import('@/config/stripe-prices');
      const pack = STRIPE_PRICES_TOPUP[packId as keyof typeof STRIPE_PRICES_TOPUP];
      console.log('[API] Resolved pack configuration:', pack);

      if (!packId) {
        return NextResponse.json({ error: 'Pack ID required' }, { status: 400 })
      }

      const validPacks: TopUpPack[] = ['pu_pack_small', 'pu_pack_medium', 'pu_pack_large']
      if (!validPacks.includes(packId)) {
        return NextResponse.json({ error: 'Invalid pack ID' }, { status: 400 })
      }

      const result = await purchaseTopUp(userId, packId, orgId)

      if (!result.success) {
        // ERROR HANDLING & FALLBACK: If charge failed due to no payment method, create Checkout Session
        if (result.error === 'No payment method on file' || result.error === 'Customer not found' || result.error === 'No default payment method') {
           try {
             const { createCheckoutSession } = await import('@/lib/stripe');
             const { STRIPE_PRICES_TOPUP } = await import('@/config/stripe-prices');
             
             const packConfig = STRIPE_PRICES_TOPUP[packId as keyof typeof STRIPE_PRICES_TOPUP];
             
             if (packConfig?.priceId) {
               // Get user email
               const { queryOne } = await import('@/lib/db');
               const { getTableName } = await import('@/lib/db-utils');
               const user = await queryOne<{ email: string }>(`SELECT email FROM ${getTableName('User')} WHERE id = $1`, [userId]);
               
               const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
               const session = await createCheckoutSession({
                   priceId: packConfig.priceId,
                   userId,
                   userEmail: user?.email || '',
                   successUrl: `${baseUrl}/settings/billing?success=true`, // Redirect back to billing
                   cancelUrl: `${baseUrl}/settings/billing?canceled=1`,
                   organizationId: orgId,
                   mode: 'payment',
                   metadata: { 
                     type: 'processing_unit_topup', 
                     packId,
                     units: packConfig.units.toString()
                   }
               });
               
               return NextResponse.json({ url: session.url });
             }
           } catch (fallbackError) {
             console.error('[TopUp] Fallback to checkout failed:', fallbackError);
           }
        }

        return NextResponse.json(
          { error: result.error || 'Purchase failed' },
          { status: 400 }
        )
      }

      return NextResponse.json({
        success: true,
        unitsAdded: result.unitsAdded,
        amountCharged: result.amountCharged,
        message: `Successfully added ${result.unitsAdded} Processing Units`,
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    console.error('[TopUp] POST error:', error)
    return NextResponse.json(
      { error: error.message || 'Top-up failed' },
      { status: 500 }
    )
  }
}
