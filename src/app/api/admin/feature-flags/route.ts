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
    if (![Role.ADMIN, Role.STAFF, Role.OWNER].includes(userRole)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const featureFlags = await prisma.featureFlag.findMany({
      include: {
        organization: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(featureFlags);
  } catch (error) {
    console.error('Error fetching feature flags:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
    const { key, name, description, organizationId, isEnabled, isGlobal } = body;

    const featureFlag = await prisma.featureFlag.create({
      data: {
        key,
        name,
        description,
        organizationId: isGlobal ? null : organizationId,
        isEnabled,
        isGlobal
      }
    });

    return NextResponse.json(featureFlag);
  } catch (error) {
    console.error('Error creating feature flag:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}