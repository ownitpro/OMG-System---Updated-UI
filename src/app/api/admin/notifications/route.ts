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

    // Check if user has admin role
    const userMembership = await prisma.userMembership.findFirst({
      where: {
        userId: session.user.id,
        role: { in: ['ADMIN', 'STAFF'] }
      }
    });

    if (!userMembership) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const orgId = searchParams.get('orgId');

    // Get recent notifications (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const notifications = await prisma.auditLog.findMany({
      where: {
        createdAt: { gte: thirtyDaysAgo },
        ...(orgId ? { organizationId: orgId } : {}),
        action: {
          in: [
            'ticket_created',
            'ticket_updated',
            'invoice_paid',
            'task_assigned',
            'demo_booked',
            'org_created',
            'user_invited'
          ]
        }
      },
      take: 50,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        organization: { select: { name: true, slug: true } }
      }
    });

    // Format notifications
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
        case 'ticket_created':
          title = 'New Support Ticket';
          message = `Ticket created by ${notification.user?.name || notification.user?.email}`;
          href = `/admin/tickets/${notification.resourceId}`;
          break;
        case 'ticket_updated':
          title = 'Ticket Updated';
          message = `Ticket updated by ${notification.user?.name || notification.user?.email}`;
          href = `/admin/tickets/${notification.resourceId}`;
          break;
        case 'invoice_paid':
          title = 'Invoice Paid';
          message = `Invoice ${notification.resourceId} has been paid`;
          href = `/admin/invoices/${notification.resourceId}`;
          break;
        case 'task_assigned':
          title = 'Task Assigned';
          message = `New task assigned to ${notification.user?.name || notification.user?.email}`;
          href = `/admin/projects/${notification.resourceId}`;
          break;
        case 'demo_booked':
          title = 'Demo Booked';
          message = `New demo request from ${notification.user?.name || notification.user?.email}`;
          href = `/admin/demos/${notification.resourceId}`;
          break;
        case 'org_created':
          title = 'New Organization';
          message = `Organization ${notification.organization?.name} created`;
          href = `/admin/orgs/${notification.organization?.slug}`;
          break;
        case 'user_invited':
          title = 'User Invited';
          message = `User invited to ${notification.organization?.name}`;
          href = `/admin/people`;
          break;
        default:
          title = 'System Activity';
          message = notification.action.replace(/_/g, ' ');
          href = '/admin';
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
    console.error('Notifications error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
