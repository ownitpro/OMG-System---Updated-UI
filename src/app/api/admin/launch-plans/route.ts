import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { Role } from '@/generated/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userRole = (session.user as any).role as Role;
    if (![Role.ADMIN, Role.STAFF, Role.OWNER].includes(userRole)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const launchPlans = await prisma.launchPlan.findMany({
      include: {
        createdByUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ launchPlans });
  } catch (error) {
    console.error('Error fetching launch plans:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userRole = (session.user as any).role as Role;
    if (![Role.ADMIN, Role.STAFF, Role.OWNER].includes(userRole)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { name, description, launchDate, rolloutPercentage, notes } = body;

    if (!name || !launchDate) {
      return NextResponse.json(
        { error: 'Name and launch date are required' },
        { status: 400 }
      );
    }

    const launchPlan = await prisma.launchPlan.create({
      data: {
        name,
        description,
        launchDate: new Date(launchDate),
        rolloutPercentage: rolloutPercentage || 25,
        notes,
        createdBy: session.user.id
      },
      include: {
        createdByUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json({ launchPlan }, { status: 201 });
  } catch (error) {
    console.error('Error creating launch plan:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
