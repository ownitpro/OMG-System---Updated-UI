import { NextRequest, NextResponse } from 'next/server'

// DELETE /api/organizations/[organizationId]/invites/[inviteId] - Revoke invitation
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ organizationId: string; inviteId: string }> }
) {
  try {
    const { query, queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const userId = request.headers.get('x-user-id')
    const { organizationId, inviteId } = await params

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify user is an admin of this organization
    const membership = await queryOne<{ role: string }>(
      `SELECT role FROM ${getTableName('OrganizationMember')} WHERE "organizationId" = $1 AND "userId" = $2`,
      [organizationId, userId]
    )

    if (!membership || membership.role !== 'admin') {
      return NextResponse.json({ error: 'Only admins can revoke invitations' }, { status: 403 })
    }

    // Delete the invitation
    await query(
      `DELETE FROM ${getTableName('OrganizationInvite')} WHERE id = $1 AND "organizationId" = $2`,
      [inviteId, organizationId]
    )

    return NextResponse.json({ message: 'Invitation revoked successfully' })
  } catch (error: any) {
    console.error('Error in DELETE /api/organizations/[organizationId]/invites/[inviteId]:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
