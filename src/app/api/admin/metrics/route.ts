import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { Role } from '../../../../generated/prisma';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userRole = (session.user as any).role as Role;
    if (![Role.ADMIN, Role.STAFF, Role.OWNER].includes(userRole)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get global metrics
    const [
      totalOrgs,
      activeSubscriptions,
      totalRevenue,
      usageEvents
    ] = await Promise.all([
      prisma.organization.count(),
      prisma.subscription.count({
        where: { status: 'ACTIVE' }
      }),
      prisma.subscription.aggregate({
        where: { status: 'ACTIVE' },
        _sum: { amount: true }
      }),
      prisma.usageEvent.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
          }
        }
      })
    ]);

    const metrics = {
      totalOrgs,
      activeSubscriptions,
      totalRevenue: totalRevenue._sum.amount || 0,
      usageEvents,
      systemHealth: 99.8, // Placeholder - would come from system monitoring
      churnRate: 2.3, // Placeholder - would be calculated
      newSignups: 12, // Placeholder - would be calculated
      pendingTickets: 8 // Placeholder - would be calculated
    };

    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Error fetching admin metrics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}