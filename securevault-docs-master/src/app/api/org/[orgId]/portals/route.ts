import { NextResponse } from 'next/server';
import { requireBusinessAccount, createAccountTypeError } from '@/lib/auth/accountTypeGuard';

type Params = { params: Promise<{ orgId: string }> };

export async function GET(request: Request, { params }: Params) {
  const { query } = await import('@/lib/db');
  const { getTableName } = await import('@/lib/db-utils');
  const { orgId } = await params;

  // Get authenticated user from headers
  const userId = request.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check account type - only business accounts can access portals
  const isAllowed = await requireBusinessAccount(userId);
  if (!isAllowed) {
    return createAccountTypeError('business');
  }

  try {
    // Fetch portals with document submission counts and last upload time
    const portals = await query(
      `SELECT
        p.*,
        COALESCE(stats.document_count, 0)::int as "documentCount",
        stats.last_upload as "lastUploadAt"
      FROM ${getTableName('Portal')} p
      LEFT JOIN (
        SELECT
          pr."portalId",
          COUNT(*)::int as document_count,
          MAX(ps."createdAt") as last_upload
        FROM ${getTableName('PortalSubmission')} ps
        INNER JOIN ${getTableName('PortalRequest')} pr ON ps."portalRequestId" = pr.id
        GROUP BY pr."portalId"
      ) stats ON stats."portalId" = p.id
      WHERE p."organizationId" = $1
      ORDER BY p."createdAt" DESC`,
      [orgId]
    );

    return NextResponse.json({ portals: portals || [] });
  } catch (error) {
    console.error('Error fetching portals:', error);
    return NextResponse.json({ error: 'Failed to fetch portals' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: Params) {
  // Get authenticated user from headers (auth handled by middleware)
  const userId = request.headers.get('x-user-id');
  console.log('[PORTAL API] POST request - x-user-id header:', userId);

  if (!userId) {
    console.log('[PORTAL API] No x-user-id header found, returning 401');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check account type - only business accounts can create portals
  console.log('[PORTAL API] Checking business account for userId:', userId);
  const isAllowed = await requireBusinessAccount(userId);
  console.log('[PORTAL API] requireBusinessAccount result:', isAllowed);
  if (!isAllowed) {
    console.log('[PORTAL API] User not allowed - returning 403');
    return createAccountTypeError('business');
  }

  try {
    const { query, queryOne } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');
    const { randomUUID } = await import('crypto');
    const { orgId } = await params;
    const body = await request.json();
    const { name, description, clientEmail, pin, expiresAt } = body;

    if (!name || !clientEmail) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Extract client name from portal name (or use email as fallback)
    const clientName = name.split(' - ')[0] || clientEmail.split('@')[0];

    // Generate a UUID for the portal
    const portalId = randomUUID();

    // Hash the PIN before storing (keep original for email)
    let hashedPin = null;
    if (pin) {
      const bcrypt = await import('bcrypt');
      hashedPin = await bcrypt.default.hash(pin, 10);
    }

    // Insert portal into database
    const portal = await queryOne(
      `INSERT INTO ${getTableName('Portal')}
        (id, name, "organizationId", "clientEmail", "clientName", pin, "expiresAt", "createdById")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [portalId, name, orgId, clientEmail, clientName, hashedPin, expiresAt || null, userId]
    );

    if (!portal) {
      return NextResponse.json(
        { error: 'Failed to create portal' },
        { status: 500 }
      );
    }

    // Send Portal Created email to client (only if PIN is provided)
    if (pin && clientEmail) {
      try {
        const { sendPortalCreatedEmail } = await import('@/lib/email');

        // Get organization name for the email
        const org = await queryOne(
          `SELECT name FROM ${getTableName('Organization')} WHERE id = $1`,
          [orgId]
        );
        const orgName = org?.name || 'Your Business';

        // Build portal URL
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const portalUrl = `${baseUrl}/portal/${portalId}`;

        await sendPortalCreatedEmail({
          clientEmail,
          clientName,
          orgName,
          portalUrl,
          pin,
          expiresAt: expiresAt || null,
          organizationId: orgId, // Pass orgId for custom template lookup
        });

        console.log('[PORTAL API] Portal created email sent to:', clientEmail);
      } catch (emailError) {
        // Don't fail the portal creation if email fails
        console.error('[PORTAL API] Failed to send portal email:', emailError);
      }
    }

    return NextResponse.json({ portal }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating portal:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create portal' },
      { status: 500 }
    );
  }
}
