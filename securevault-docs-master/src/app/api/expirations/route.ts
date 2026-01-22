import { NextRequest, NextResponse } from 'next/server'
import { expirationService } from '@/lib/services/expiration-service'

/**
 * GET /api/expirations
 * Get upcoming document expirations for a user
 * Query params:
 * - userId (required)
 * - personalVaultId (optional)
 * - organizationId (optional)
 * - days (optional, default 90) - how many days ahead to look
 * - limit (optional, default 50)
 * - includeExpired (optional, default true)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const personalVaultId = searchParams.get('personalVaultId') || undefined
    const organizationId = searchParams.get('organizationId') || undefined
    const days = parseInt(searchParams.get('days') || '90')
    const limit = parseInt(searchParams.get('limit') || '50')
    const includeExpired = searchParams.get('includeExpired') !== 'false'

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    const expirations = await expirationService.getUpcomingExpirations(userId, {
      days,
      limit,
      includeExpired,
      personalVaultId,
      organizationId,
    })

    // Group by status for easy consumption
    const grouped = {
      expired: expirations.filter(e => e.status === 'expired'),
      expiringToday: expirations.filter(e => e.status === 'expiring_today'),
      expiringSoon: expirations.filter(e => e.status === 'expiring_soon'),
      upcoming: expirations.filter(e => e.status === 'upcoming'),
    }

    return NextResponse.json({
      expirations,
      grouped,
      summary: {
        total: expirations.length,
        expired: grouped.expired.length,
        expiringToday: grouped.expiringToday.length,
        expiringSoon: grouped.expiringSoon.length,
        upcoming: grouped.upcoming.length,
      },
    })
  } catch (error: any) {
    console.error('Error in GET /api/expirations:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
