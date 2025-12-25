import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { Role } from '../../../../generated/prisma';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userRole = (session.user as any).role as Role;
    const activeOrgId = (session.user as any).activeOrgId;

    if (!activeOrgId) {
      return NextResponse.json({ error: 'No active organization' }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // days
    const startDate = new Date(Date.now() - parseInt(period) * 24 * 60 * 60 * 1000);

    // Get usage data
    const [usageEvents, subscription] = await Promise.all([
      prisma.usageEvent.findMany({
        where: {
          organizationId: activeOrgId,
          createdAt: { gte: startDate }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.subscription.findFirst({
        where: { 
          organizationId: activeOrgId,
          status: 'ACTIVE'
        }
      })
    ]);

    // Group usage by event type
    const usageByType = usageEvents.reduce((acc, event) => {
      acc[event.eventType] = (acc[event.eventType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get daily usage for chart
    const dailyUsage = usageEvents.reduce((acc, event) => {
      const date = event.createdAt.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const usage = {
      total: usageEvents.length,
      byType: usageByType,
      dailyUsage,
      subscription: subscription ? {
        plan: subscription.name,
        limit: 2000, // Placeholder
        usage: usageEvents.length,
        percentage: Math.min((usageEvents.length / 2000) * 100, 100)
      } : null,
      recentEvents: usageEvents.slice(0, 10)
    };

    return NextResponse.json(usage);
  } catch (error) {
    console.error('Error fetching usage data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}