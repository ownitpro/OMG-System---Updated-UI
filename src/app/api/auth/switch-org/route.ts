import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { requireAuth, requireOrgAccess } from '@/lib/auth-utils';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { orgId } = await request.json();
    
    if (!orgId) {
      return NextResponse.json({ message: 'Organization ID is required' }, { status: 400 });
    }

    // Verify user has access to this organization
    await requireOrgAccess(orgId);

    // Update the user's active organization in the session
    // Note: In a real implementation, you might want to store this in the database
    // or use a more sophisticated session management approach
    
    // For now, we'll return the updated session data
    const user = session.user as any;
    const membership = user.memberships.find((m: any) => m.orgId === orgId);
    
    if (!membership) {
      return NextResponse.json({ message: 'Access denied to this organization' }, { status: 403 });
    }

    // Log the organization switch
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        organizationId: orgId,
        action: 'org_switched',
        resourceType: 'organization',
        resourceId: orgId,
        metadata: {
          previousOrgId: user.activeOrgId,
          newOrgId: orgId,
        },
      },
    });

    return NextResponse.json({
      success: true,
      activeOrgId: orgId,
      organization: membership.organization,
      role: membership.role,
    });
  } catch (error) {
    console.error('Organization switch error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
