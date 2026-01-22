import { NextRequest, NextResponse } from 'next/server'

// PUT /api/organizations/[organizationId]/members/[memberId] - Update member role
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ organizationId: string; memberId: string }> }
) {
  try {
    const { queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const userId = request.headers.get('x-user-id')
    const { organizationId, memberId } = await params

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify user is an admin of this organization
    const membership = await queryOne<{ role: string }>(
      `SELECT role FROM ${getTableName('OrganizationMember')} WHERE "organizationId" = $1 AND "userId" = $2`,
      [organizationId, userId]
    )

    if (!membership || membership.role !== 'admin') {
      return NextResponse.json({ error: 'Only admins can update member roles' }, { status: 403 })
    }

    const { role } = await request.json()

    if (!role || !['admin', 'member', 'viewer'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    // Update member role
    const updatedMember = await queryOne(
      `UPDATE ${getTableName('OrganizationMember')} SET role = $1 WHERE id = $2 AND "organizationId" = $3 RETURNING *`,
      [role, memberId, organizationId]
    )

    if (!updatedMember) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 })
    }

    return NextResponse.json({ member: updatedMember })
  } catch (error: any) {
    console.error('Error in PUT /api/organizations/[organizationId]/members/[memberId]:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE /api/organizations/[organizationId]/members/[memberId] - Remove member
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ organizationId: string; memberId: string }> }
) {
  try {
    const { query, queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const userId = request.headers.get('x-user-id')
    const { organizationId, memberId } = await params

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get the member being removed
    const targetMember = await queryOne<{ userId: string; role: string }>(
      `SELECT "userId", role FROM ${getTableName('OrganizationMember')} WHERE id = $1 AND "organizationId" = $2`,
      [memberId, organizationId]
    )

    if (!targetMember) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 })
    }

    // Check if user is removing themselves
    if (targetMember.userId === userId) {
      // Users can remove themselves (leave organization)
      // But check if they're the last admin
      if (targetMember.role === 'admin') {
        const admins = await query<{ id: string }>(
          `SELECT id FROM ${getTableName('OrganizationMember')} WHERE "organizationId" = $1 AND role = 'admin'`,
          [organizationId]
        )

        if (admins && admins.length <= 1) {
          return NextResponse.json(
            { error: 'Cannot leave organization as the last admin. Transfer admin rights first or delete the organization.' },
            { status: 400 }
          )
        }
      }
    } else {
      // Verify user is an admin to remove others
      const membership = await queryOne<{ role: string }>(
        `SELECT role FROM ${getTableName('OrganizationMember')} WHERE "organizationId" = $1 AND "userId" = $2`,
        [organizationId, userId]
      )

      if (!membership || membership.role !== 'admin') {
        return NextResponse.json({ error: 'Only admins can remove members' }, { status: 403 })
      }
    }

    // Remove member
    await query(
      `DELETE FROM ${getTableName('OrganizationMember')} WHERE id = $1 AND "organizationId" = $2`,
      [memberId, organizationId]
    )

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error in DELETE /api/organizations/[organizationId]/members/[memberId]:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
