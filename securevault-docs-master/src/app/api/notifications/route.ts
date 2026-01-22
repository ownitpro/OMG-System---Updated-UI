import { NextRequest, NextResponse } from 'next/server'
import { expirationService } from '@/lib/services/expiration-service'

/**
 * GET /api/notifications
 * Get notifications for a user
 * Query params:
 * - userId (required)
 * - limit (optional, default 20)
 * - offset (optional, default 0)
 * - unreadOnly (optional, default false)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const unreadOnly = searchParams.get('unreadOnly') === 'true'

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    const [notifications, unreadCount] = await Promise.all([
      expirationService.getNotifications(userId, { limit, offset, unreadOnly }),
      expirationService.getUnreadCount(userId),
    ])

    return NextResponse.json({
      notifications,
      unreadCount,
      hasMore: notifications.length === limit,
    })
  } catch (error: any) {
    console.error('Error in GET /api/notifications:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

/**
 * PATCH /api/notifications
 * Mark notification(s) as read
 * Body:
 * - userId (required)
 * - notificationId (optional - mark single notification)
 * - markAllAsRead (optional - mark all as read)
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, notificationId, markAllAsRead } = body

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    if (markAllAsRead) {
      const result = await expirationService.markAllAsRead(userId)
      return NextResponse.json({ success: result.success })
    }

    if (notificationId) {
      const result = await expirationService.markAsRead(notificationId, userId)
      return NextResponse.json({ success: result.success })
    }

    return NextResponse.json({ error: 'No valid action provided' }, { status: 400 })
  } catch (error: any) {
    console.error('Error in PATCH /api/notifications:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
