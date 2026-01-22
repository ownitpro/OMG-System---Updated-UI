import { NextRequest, NextResponse } from 'next/server';
import { expirationService } from '@/lib/services/expiration-service';

/**
 * GET /api/cron/process-notifications
 *
 * Cron endpoint to process scheduled notifications.
 * Should be called daily (recommended: 9 AM local time).
 *
 * Security: Protected by CRON_SECRET environment variable.
 *
 * For Vercel Cron, add to vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/process-notifications",
 *     "schedule": "0 9 * * *"
 *   }]
 * }
 */
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    // Allow requests from Vercel Cron (they send a specific header)
    const isVercelCron = request.headers.get('x-vercel-cron') === 'true';

    // Check authorization
    if (!isVercelCron) {
      if (!cronSecret) {
        console.warn('[CRON] CRON_SECRET not configured, allowing request');
      } else if (authHeader !== `Bearer ${cronSecret}`) {
        console.error('[CRON] Unauthorized cron request');
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    console.log('[CRON] Starting notification processing...');
    const startTime = Date.now();

    // Process all scheduled notifications
    const result = await expirationService.processScheduledNotifications();

    const duration = Date.now() - startTime;
    console.log(`[CRON] Completed in ${duration}ms:`, result);

    return NextResponse.json({
      success: true,
      ...result,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('[CRON] Error processing notifications:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cron/process-notifications
 *
 * Alternative POST endpoint for manual triggering or webhooks.
 */
export async function POST(request: NextRequest) {
  return GET(request);
}
