import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { Role } from '@/generated/prisma';
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

    const [subscription, invoices] = await Promise.all([
      prisma.subscription.findFirst({
        where: { 
          organizationId: activeOrgId,
          status: 'ACTIVE'
        }
      }),
      prisma.invoice.findMany({
        where: { organizationId: activeOrgId },
        orderBy: { createdAt: 'desc' },
        take: 10
      })
    ]);

    const billing = {
      subscription,
      invoices,
      paymentMethod: {
        type: 'card',
        last4: '4242',
        brand: 'visa',
        expMonth: 12,
        expYear: 2025
      } // Placeholder - would come from Stripe
    };

    return NextResponse.json(billing);
  } catch (error) {
    console.error('Error fetching billing data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}