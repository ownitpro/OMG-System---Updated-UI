// app/api/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const AnalyticsEventSchema = z.object({
  event: z.string(),
  properties: z.record(z.any()),
  userId: z.string().optional(),
  organizationId: z.string().optional(),
  role: z.enum(['ADMIN', 'STAFF', 'CLIENT']).optional(),
  timestamp: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    // Parse the analytics event
    const body = await request.json();
    const event = AnalyticsEventSchema.parse(body);

    // Log the event (in a real app, you might store this in a database)
    console.log('Analytics Event:', {
      event: event.event,
      properties: event.properties,
      userId: event.userId || session?.user?.id,
      organizationId: event.organizationId,
      role: event.role,
      timestamp: event.timestamp || new Date().toISOString(),
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    // In a real application, you would:
    // 1. Store the event in a database
    // 2. Process it for analytics
    // 3. Send to external analytics services
    // 4. Apply data retention policies

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Failed to process analytics event' },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only admins can view analytics data
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const eventType = searchParams.get('eventType');

    // In a real app, you would query your analytics database
    // For now, return mock data
    const mockAnalytics = {
      totalEvents: 1234,
      uniqueUsers: 456,
      topEvents: [
        { event: 'page_view', count: 567 },
        { event: 'user_login', count: 234 },
        { event: 'admin_action', count: 123 },
        { event: 'portal_action', count: 310 },
      ],
      eventsByDate: [
        { date: '2024-01-01', count: 45 },
        { date: '2024-01-02', count: 52 },
        { date: '2024-01-03', count: 38 },
        { date: '2024-01-04', count: 61 },
        { date: '2024-01-05', count: 47 },
      ],
      userRoles: {
        ADMIN: 12,
        STAFF: 34,
        CLIENT: 410,
      },
    };

    return NextResponse.json(mockAnalytics);
  } catch (error) {
    console.error('Analytics GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}
