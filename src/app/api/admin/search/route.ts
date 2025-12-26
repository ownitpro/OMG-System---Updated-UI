import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import {
  BuildingOfficeIcon,
  DocumentTextIcon,
  TicketIcon,
  UserGroupIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

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
    const query = searchParams.get('q');
    const orgId = searchParams.get('orgId');

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    // Search across different resources (SQLite doesn't support mode: 'insensitive')
    const [organizations, invoices, tickets, leads, projects] = await Promise.all([
      // Organizations
      prisma.organization.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { slug: { contains: query } }
          ],
          ...(orgId ? { id: orgId } : {})
        },
        take: 5,
        select: {
          id: true,
          name: true,
          slug: true,
        }
      }),

      // Invoices
      prisma.invoice.findMany({
        where: {
          number: { contains: query },
          ...(orgId ? { organizationId: orgId } : {})
        },
        take: 5,
        select: {
          id: true,
          number: true,
          amount: true,
          status: true,
          organizationId: true
        }
      }),

      // Tickets
      prisma.ticket.findMany({
        where: {
          OR: [
            { subject: { contains: query } },
            { description: { contains: query } }
          ],
          ...(orgId ? { organizationId: orgId } : {})
        },
        take: 5,
        select: {
          id: true,
          subject: true,
          status: true,
          priority: true,
          organizationId: true
        }
      }),

      // Leads
      prisma.lead.findMany({
        where: {
          OR: [
            { email: { contains: query } },
            { contact: { contains: query } },
            { orgName: { contains: query } }
          ]
        },
        take: 5,
        select: {
          id: true,
          email: true,
          contact: true,
          orgName: true,
          source: true
        }
      }),

      // Projects
      prisma.project.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { description: { contains: query } }
          ],
          ...(orgId ? { organizationId: orgId } : {})
        },
        take: 5,
        select: {
          id: true,
          name: true,
          status: true,
          organizationId: true
        }
      })
    ]);

    // Get organization names for items that have organizationId
    const orgIds = [
      ...invoices.map(i => i.organizationId),
      ...tickets.map(t => t.organizationId),
      ...projects.map(p => p.organizationId)
    ].filter(Boolean);

    const orgsMap = new Map<string, string>();
    if (orgIds.length > 0) {
      const orgs = await prisma.organization.findMany({
        where: { id: { in: orgIds } },
        select: { id: true, name: true }
      });
      orgs.forEach(org => orgsMap.set(org.id, org.name));
    }

    // Format results
    const results = [
      ...organizations.map(org => ({
        id: org.id,
        title: org.name,
        subtitle: `Organization • ${org.slug}`,
        href: `/admin/orgs/${org.slug}`,
        icon: BuildingOfficeIcon,
        type: 'organization'
      })),

      ...invoices.map(invoice => ({
        id: invoice.id,
        title: `Invoice ${invoice.number}`,
        subtitle: `${orgsMap.get(invoice.organizationId) || 'Unknown'} • $${invoice.amount} • ${invoice.status}`,
        href: `/admin/invoices/${invoice.id}`,
        icon: DocumentTextIcon,
        type: 'invoice'
      })),

      ...tickets.map(ticket => ({
        id: ticket.id,
        title: ticket.subject,
        subtitle: `${orgsMap.get(ticket.organizationId) || 'Unknown'} • ${ticket.status} • ${ticket.priority}`,
        href: `/admin/tickets/${ticket.id}`,
        icon: TicketIcon,
        type: 'ticket'
      })),

      ...leads.map(lead => ({
        id: lead.id,
        title: lead.contact || lead.email || 'Unknown',
        subtitle: `${lead.orgName || 'No company'} • ${lead.source || 'Unknown source'}`,
        href: `/admin/leads/${lead.id}`,
        icon: UserGroupIcon,
        type: 'lead'
      })),

      ...projects.map(project => ({
        id: project.id,
        title: project.name,
        subtitle: `${orgsMap.get(project.organizationId) || 'Unknown'} • ${project.status}`,
        href: `/admin/projects/${project.id}`,
        icon: CogIcon,
        type: 'project'
      }))
    ];

    // Sort by relevance (exact matches first, then partial matches)
    const lowerQuery = query.toLowerCase();
    results.sort((a, b) => {
      const aTitle = a.title?.toLowerCase() || '';
      const bTitle = b.title?.toLowerCase() || '';
      const aExact = aTitle.includes(lowerQuery);
      const bExact = bTitle.includes(lowerQuery);

      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      return 0;
    });

    return NextResponse.json(results.slice(0, 10)); // Limit to 10 results

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
