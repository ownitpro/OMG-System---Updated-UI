import { NextRequest, NextResponse } from 'next/server';
import { expirationService } from '@/lib/services/expiration-service';

/**
 * POST /api/notifications/check-urgent
 *
 * Check for urgent notifications on dashboard load.
 * Creates notifications for documents that are:
 * - Expiring TODAY without notification
 * - Already EXPIRED without notification
 * - Due TODAY without notification
 * - PAST DUE without notification
 *
 * This provides real-time visibility even if cron hasn't run.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    // Check and create urgent notifications
    const result = await expirationService.checkAndCreateUrgentNotifications(userId);

    return NextResponse.json({
      success: true,
      created: result.created,
    });

  } catch (error: any) {
    console.error('[CHECK-URGENT] Error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/notifications/check-urgent?userId=xxx
 *
 * Alternative GET endpoint for easier testing.
 */
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const result = await expirationService.checkAndCreateUrgentNotifications(userId);

    return NextResponse.json({
      success: true,
      created: result.created,
    });

  } catch (error: any) {
    console.error('[CHECK-URGENT] Error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
