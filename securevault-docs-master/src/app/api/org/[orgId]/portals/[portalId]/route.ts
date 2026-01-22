import { NextResponse } from 'next/server';
import { requireBusinessAccount, createAccountTypeError } from '@/lib/auth/accountTypeGuard';

type Params = { params: Promise<{ orgId: string; portalId: string }> };

export async function GET(request: Request, { params }: Params) {
  const { queryOne } = await import('@/lib/db');
  const { getTableName } = await import('@/lib/db-utils');
  const { orgId, portalId } = await params;

  console.log('[PORTAL DETAIL API] GET request - orgId:', orgId, 'portalId:', portalId);

  // Get authenticated user from headers
  const userId = request.headers.get('x-user-id');
  console.log('[PORTAL DETAIL API] x-user-id header:', userId);

  if (!userId) {
    console.log('[PORTAL DETAIL API] No x-user-id header, returning 401');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check account type - only business accounts can access portals
  const isAllowed = await requireBusinessAccount(userId);
  console.log('[PORTAL DETAIL API] requireBusinessAccount result:', isAllowed);

  if (!isAllowed) {
    console.log('[PORTAL DETAIL API] User not allowed, returning 403');
    return createAccountTypeError('business');
  }

  try {
    const portal = await queryOne(
      `SELECT * FROM ${getTableName('Portal')} WHERE id = $1 AND "organizationId" = $2`,
      [portalId, orgId]
    );

    console.log('[PORTAL DETAIL API] Portal query result:', portal ? 'found' : 'not found');

    if (!portal) {
      console.log('[PORTAL DETAIL API] Portal not found for id:', portalId, 'orgId:', orgId);
      return NextResponse.json({ error: 'Portal not found' }, { status: 404 });
    }

    // Transform to match expected interface
    const transformedPortal = {
      id: portal.id,
      name: portal.name,
      description: portal.description || '',
      client: {
        name: portal.clientName || portal.clientEmail?.split('@')[0] || 'Unknown',
        email: portal.clientEmail || '',
      },
      createdAt: portal.createdAt,
      organizationId: portal.organizationId,
      personalVaultId: null,
      status: portal.status || 'active',
      expiresAt: portal.expiresAt,
    };

    return NextResponse.json({ portal: transformedPortal });
  } catch (error) {
    console.error('Error fetching portal:', error);
    return NextResponse.json({ error: 'Failed to fetch portal' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const { query } = await import('@/lib/db');
  const { getTableName } = await import('@/lib/db-utils');
  const { orgId, portalId } = await params;

  // Get authenticated user from headers
  const userId = request.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check account type - only business accounts can delete portals
  const isAllowed = await requireBusinessAccount(userId);
  if (!isAllowed) {
    return createAccountTypeError('business');
  }

  try {
    // Delete associated portal requests first
    await query(
      `DELETE FROM ${getTableName('PortalRequest')} WHERE "portalId" = $1`,
      [portalId]
    );

    // Delete the portal
    await query(
      `DELETE FROM ${getTableName('Portal')} WHERE id = $1 AND "organizationId" = $2`,
      [portalId, orgId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting portal:', error);
    return NextResponse.json({ error: 'Failed to delete portal' }, { status: 500 });
  }
}
