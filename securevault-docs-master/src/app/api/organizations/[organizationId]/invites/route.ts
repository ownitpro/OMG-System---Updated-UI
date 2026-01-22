import { NextRequest, NextResponse } from 'next/server'

// GET /api/organizations/[organizationId]/invites - Get pending invitations
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ organizationId: string }> }
) {
  try {
    const { query, queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const userId = request.headers.get('x-user-id')
    const { organizationId } = await params

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify user is an admin of this organization
    const membership = await queryOne<{ role: string }>(
      `SELECT role FROM ${getTableName('OrganizationMember')} WHERE "organizationId" = $1 AND "userId" = $2`,
      [organizationId, userId]
    )

    if (!membership || membership.role !== 'admin') {
      return NextResponse.json({ error: 'Only admins can view invitations' }, { status: 403 })
    }

    // Fetch all pending invites
    const invites = await query(
      `SELECT * FROM ${getTableName('OrganizationInvite')} WHERE "organizationId" = $1 ORDER BY "createdAt" DESC`,
      [organizationId]
    )

    return NextResponse.json({ invites: invites || [] })
  } catch (error: any) {
    console.error('Error in GET /api/organizations/[organizationId]/invites:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
