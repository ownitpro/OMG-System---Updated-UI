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

    // Get client automations (projects/workflows)
    const automations = await prisma.project.findMany({
      where: { organizationId: activeOrgId },
      include: {
        user: { select: { name: true, email: true } },
        tasks: {
          select: {
            id: true,
            status: true,
            completedAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Transform data to match frontend expectations
    const formattedAutomations = automations.map(project => ({
      id: project.id,
      name: project.name,
      description: project.description || '',
      status: project.status === 'COMPLETED' ? 'Active' : 
              project.status === 'ON_HOLD' ? 'Paused' : 'Active',
      deployedDate: project.createdAt.toISOString().split('T')[0],
      monthlyCost: 99, // Placeholder - would come from subscription/plan
      setupCost: 299, // Placeholder - would come from order
      setupPaid: true, // Placeholder - would check order status
      tasksCount: project.tasks.length,
      completedTasks: project.tasks.filter(task => task.status === 'COMPLETED').length,
      createdBy: project.user.name || project.user.email
    }));

    return NextResponse.json({
      automations: formattedAutomations,
      total: formattedAutomations.length
    });
  } catch (error) {
    console.error('Error fetching client automations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { name, description, priority = 'medium' } = body;

    // Create new automation/project
    const automation = await prisma.project.create({
      data: {
        name,
        description,
        priority,
        organizationId: activeOrgId,
        userId: session.user.id,
        status: 'PLANNING'
      },
      include: {
        user: { select: { name: true, email: true } }
      }
    });

    return NextResponse.json({
      success: true,
      automation: {
        id: automation.id,
        name: automation.name,
        description: automation.description,
        status: 'Active',
        deployedDate: automation.createdAt.toISOString().split('T')[0],
        monthlyCost: 99,
        setupCost: 299,
        setupPaid: true,
        createdBy: automation.user.name || automation.user.email
      }
    });
  } catch (error) {
    console.error('Error creating automation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
