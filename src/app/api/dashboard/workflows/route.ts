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
    const activeOrgId = (session.user as any).activeOrgId;

    if (!activeOrgId) {
      return NextResponse.json({ error: 'No active organization' }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || '';

    const skip = (page - 1) * limit;

    const where: any = { organizationId: activeOrgId };
    if (status) where.status = status;

    const [workflows, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true } },
          tasks: {
            select: { 
              id: true, 
              status: true,
              completedAt: true
            }
          }
        }
      }),
      prisma.project.count({ where })
    ]);

    const workflowsWithStats = workflows.map(workflow => ({
      ...workflow,
      taskStats: {
        total: workflow.tasks.length,
        completed: workflow.tasks.filter(t => t.status === 'COMPLETED').length,
        inProgress: workflow.tasks.filter(t => t.status === 'IN_PROGRESS').length
      }
    }));

    return NextResponse.json({
      workflows: workflowsWithStats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching workflows:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}