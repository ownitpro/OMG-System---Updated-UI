import { NextRequest, NextResponse } from 'next/server';

type Props = {
  params: Promise<{ requestId: string }>;
};

// POST - Send a reminder email for a request
export async function POST(req: NextRequest, { params }: Props) {
  try {
    const { query, queryOne } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');
    const { sendRequestCreatedEmail } = await import('@/lib/email');

    const { requestId: portalId } = await params;

    // Get portal info with client details
    const portal = await queryOne<{
      id: string;
      clientName: string;
      clientEmail: string;
      organizationId: string;
    }>(
      `SELECT id, "clientName", "clientEmail", "organizationId"
       FROM ${getTableName('Portal')}
       WHERE id = $1`,
      [portalId]
    );

    if (!portal) {
      return NextResponse.json({ error: 'Portal not found' }, { status: 404 });
    }

    if (!portal.clientEmail) {
      return NextResponse.json({ error: 'No client email associated with this request' }, { status: 400 });
    }

    // Get all request items for this portal
    const items = await query<{ id: string; title: string; required: boolean }>(
      `SELECT id, title, required FROM ${getTableName('PortalRequest')} WHERE "portalId" = $1 ORDER BY "order"`,
      [portalId]
    );

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in this request' }, { status: 400 });
    }

    // Get organization name
    const org = await queryOne<{ name: string }>(
      `SELECT name FROM ${getTableName('Organization')} WHERE id = $1`,
      [portal.organizationId]
    );
    const orgName = org?.name || 'Your Business';

    // Build portal URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const portalUrl = `${baseUrl}/portal/${portalId}`;

    const clientName = portal.clientName || portal.clientEmail.split('@')[0];

    // Send the reminder email
    await sendRequestCreatedEmail({
      clientEmail: portal.clientEmail,
      clientName,
      orgName,
      items: items.map(item => ({ label: item.title, required: item.required })),
      portalUrl,
      dueDate: null,
      organizationId: portal.organizationId,
      isReminder: true,
    });

    console.log('[REMIND] Reminder email sent to:', portal.clientEmail);

    return NextResponse.json({
      success: true,
      message: `Reminder sent to ${portal.clientEmail}`,
    });
  } catch (error) {
    console.error('[REMIND] Error:', error);
    return NextResponse.json({ error: 'Failed to send reminder' }, { status: 500 });
  }
}
