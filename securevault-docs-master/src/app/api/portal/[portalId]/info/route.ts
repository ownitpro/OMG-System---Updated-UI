// API route to get portal and organization info
import { NextRequest, NextResponse } from 'next/server';

type Props = {
  params: Promise<{ portalId: string }>;
};

interface PortalRecord {
  id: string;
  name: string;
  clientName: string | null;
  clientEmail: string | null;
  organizationId: string;
  pin: string | null;
}

// INFO endpoint doesn't require authentication - it's needed before PIN entry
// However, it should only return safe, non-sensitive information
export async function GET(_: NextRequest, { params }: Props) {
  try {
    const { queryOne } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    const { portalId } = await params;

    // Get portal from database
    const portal = await queryOne<PortalRecord>(
      `SELECT id, name, "clientName", "clientEmail", "organizationId", pin FROM ${getTableName('Portal')} WHERE id = $1`,
      [portalId]
    );

    if (!portal) {
      return NextResponse.json(
        { error: 'Portal not found' },
        { status: 404 }
      );
    }

    // Get organization info from database (safe public info only)
    const orgData = await queryOne<{ id: string; name: string }>(
      `SELECT id, name FROM ${getTableName('Organization')} WHERE id = $1`,
      [portal.organizationId]
    );

    // Return only safe, public information
    // Check if PIN is required: true if pin exists and is non-empty
    const requiresPin = Boolean(portal.pin && portal.pin.length > 0);

    return NextResponse.json({
      portal: {
        id: portal.id,
        clientName: portal.clientName || portal.clientEmail?.split('@')[0] || 'Client',
        clientEmail: portal.clientEmail,
        requiresPin, // Let client know if PIN is required
      },
      organization: orgData || {
        name: 'SecureVault Docs',
      },
    });
  } catch (error) {
    console.error('Error fetching portal info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portal info' },
      { status: 500 }
    );
  }
}
