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

    // Get client dashboard overview data
    const [
      subscription,
      usageEvents,
      activeWorkflows,
      documents,
      recentTickets
    ] = await Promise.all([
      prisma.subscription.findFirst({
        where: { 
          organizationId: activeOrgId,
          status: 'ACTIVE'
        }
      }),
      prisma.usageEvent.count({
        where: {
          organizationId: activeOrgId,
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
          }
        }
      }),
      prisma.project.count({
        where: { organizationId: activeOrgId }
      }),
      prisma.document.count({
        where: { organizationId: activeOrgId }
      }),
      prisma.ticket.findMany({
        where: { organizationId: activeOrgId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true } }
        }
      })
    ]);

    const overview = {
      subscription: subscription ? {
        plan: subscription.name,
        amount: subscription.amount,
        nextBilling: subscription.currentPeriodEnd
      } : null,
      usage: {
        events: usageEvents,
        limit: 2000, // Placeholder - would come from plan
        percentage: Math.min((usageEvents / 2000) * 100, 100)
      },
      activeWorkflows,
      documents,
      recentTickets: recentTickets.map(ticket => ({
        id: ticket.id,
        subject: ticket.subject,
        status: ticket.status,
        createdAt: ticket.createdAt
      }))
    };

    return NextResponse.json(overview);
  } catch (error) {
    console.error('Error fetching dashboard overview:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}