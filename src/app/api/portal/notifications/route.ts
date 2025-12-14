import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const orgId = searchParams.get('orgId');

    if (!orgId) {
      return NextResponse.json({ error: 'Organization ID required' }, { status: 400 });
    }

    // Check if user has access to this organization
    const userMembership = await prisma.userMembership.findFirst({
      where: {
        userId: session.user.id,
        organizationId: orgId
      }
    });

    if (!userMembership) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get recent notifications for this organization (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const notifications = await prisma.auditLog.findMany({
      where: {
        organizationId: orgId,
        createdAt: { gte: thirtyDaysAgo },
        action: {
          in: [
            'task_assigned',
            'task_completed',
            'project_updated',
            'document_uploaded',
            'invoice_sent',
            'invoice_paid',
            'ticket_created',
            'ticket_updated'
          ]
        }
      },
      take: 30,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        organization: { select: { name: true, slug: true } }
      }
    });

    // Format notifications for client portal
    const formattedNotifications = notifications.map(notification => {
      let title = '';
      let message = '';
      let href = '';
      let timeAgo = '';

      // Calculate time ago
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - notification.createdAt.getTime()) / (1000 * 60));
      
      if (diffInMinutes < 60) {
        timeAgo = `${diffInMinutes}m ago`;
      } else if (diffInMinutes < 1440) {
        timeAgo = `${Math.floor(diffInMinutes / 60)}h ago`;
      } else {
        timeAgo = `${Math.floor(diffInMinutes / 1440)}d ago`;
      }

      // Format based on action type
      switch (notification.action) {
        case 'task_assigned':
          title = 'New Task Assigned';
          message = `You have been assigned a new task`;
          href = `/portal/onboarding`;
          break;
        case 'task_completed':
          title = 'Task Completed';
          message = `A task has been marked as completed`;
          href = `/portal/onboarding`;
          break;
        case 'project_updated':
          title = 'Project Updated';
          message = `Your project has been updated`;
          href = `/portal/onboarding`;
          break;
        case 'document_uploaded':
          title = 'Document Available';
          message = `A new document is available for review`;
          href = `/portal/documents`;
          break;
        case 'invoice_sent':
          title = 'Invoice Sent';
          message = `A new invoice has been sent`;
          href = `/portal/billing`;
          break;
        case 'invoice_paid':
          title = 'Payment Received';
          message = `Your payment has been processed`;
          href = `/portal/billing`;
          break;
        case 'ticket_created':
          title = 'Support Ticket Created';
          message = `Your support ticket has been created`;
          href = `/portal/support`;
          break;
        case 'ticket_updated':
          title = 'Support Update';
          message = `Your support ticket has been updated`;
          href = `/portal/support`;
          break;
        default:
          title = 'System Update';
          message = notification.action.replace(/_/g, ' ');
          href = '/portal';
      }

      return {
        id: notification.id,
        title,
        message,
        href,
        timeAgo,
        readAt: null, // In a real app, you'd track read status
        createdAt: notification.createdAt
      };
    });

    return NextResponse.json(formattedNotifications);

  } catch (error) {
    console.error('Portal notifications error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
