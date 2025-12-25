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

    const searchTerm = `%${query}%`;

    // Search across different resources
    const [organizations, invoices, tickets, leads, projects] = await Promise.all([
      // Organizations
      prisma.organization.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { slug: { contains: query, mode: 'insensitive' } }
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
          number: { contains: query, mode: 'insensitive' },
          ...(orgId ? { organizationId: orgId } : {})
        },
        take: 5,
        select: {
          id: true,
          number: true,
          amount: true,
          status: true,
          organization: {
            select: { name: true }
          }
        }
      }),

      // Tickets
      prisma.ticket.findMany({
        where: {
          OR: [
            { subject: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } }
          ],
          ...(orgId ? { organizationId: orgId } : {})
        },
        take: 5,
        select: {
          id: true,
          subject: true,
          status: true,
          priority: true,
          organization: {
            select: { name: true }
          }
        }
      }),

      // Leads
      prisma.lead.findMany({
        where: {
          OR: [
            { email: { contains: query, mode: 'insensitive' } },
            { contact: { contains: query, mode: 'insensitive' } },
            { orgName: { contains: query, mode: 'insensitive' } }
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
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } }
          ],
          ...(orgId ? { organizationId: orgId } : {})
        },
        take: 5,
        select: {
          id: true,
          name: true,
          status: true,
          organization: {
            select: { name: true }
          }
        }
      })
    ]);

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
        subtitle: `${invoice.organization.name} • $${invoice.amount} • ${invoice.status}`,
        href: `/admin/invoices/${invoice.id}`,
        icon: DocumentTextIcon,
        type: 'invoice'
      })),
      
      ...tickets.map(ticket => ({
        id: ticket.id,
        title: ticket.subject,
        subtitle: `${ticket.organization.name} • ${ticket.status} • ${ticket.priority}`,
        href: `/admin/tickets/${ticket.id}`,
        icon: TicketIcon,
        type: 'ticket'
      })),
      
      ...leads.map(lead => ({
        id: lead.id,
        title: lead.contact || lead.email,
        subtitle: `${lead.orgName || 'No company'} • ${lead.source}`,
        href: `/admin/leads/${lead.id}`,
        icon: UserGroupIcon,
        type: 'lead'
      })),
      
      ...projects.map(project => ({
        id: project.id,
        title: project.name,
        subtitle: `${project.organization.name} • ${project.status}`,
        href: `/admin/projects/${project.id}`,
        icon: CogIcon,
        type: 'project'
      }))
    ];

    // Sort by relevance (exact matches first, then partial matches)
    results.sort((a, b) => {
      const aExact = a.title.toLowerCase().includes(query.toLowerCase());
      const bExact = b.title.toLowerCase().includes(query.toLowerCase());
      
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
