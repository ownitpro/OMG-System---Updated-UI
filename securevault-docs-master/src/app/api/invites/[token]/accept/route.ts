import { NextRequest, NextResponse } from 'next/server'

// POST /api/invites/[token]/accept - Accept invitation
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { query, queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const userId = request.headers.get('x-user-id')
    const { token } = await params

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 })
    }

    // Fetch invite
    const invite = await queryOne<{
      id: string
      organizationId: string
      email: string
      role: string
      expiresAt: string
    }>(
      `SELECT * FROM ${getTableName('OrganizationInvite')} WHERE token = $1`,
      [token]
    )

    if (!invite) {
      return NextResponse.json(
        { error: 'Invitation not found or has been revoked' },
        { status: 404 }
      )
    }

    // Check if expired
    if (new Date(invite.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: 'This invitation has expired' },
        { status: 410 }
      )
    }

    // Verify user email matches invite email
    const user = await queryOne<{ email: string }>(
      `SELECT email FROM ${getTableName('User')} WHERE id = $1`,
      [userId]
    )

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (user.email !== invite.email) {
      return NextResponse.json(
        { error: 'This invitation is for a different email address' },
        { status: 403 }
      )
    }

    // Check if user is already a member
    const existingMember = await queryOne<{ id: string }>(
      `SELECT id FROM ${getTableName('OrganizationMember')} WHERE "organizationId" = $1 AND "userId" = $2`,
      [invite.organizationId, userId]
    )

    if (existingMember) {
      // User is already a member, just delete the invite
      await query(
        `DELETE FROM ${getTableName('OrganizationInvite')} WHERE id = $1`,
        [invite.id]
      )

      return NextResponse.json(
        { message: 'You are already a member of this organization' },
        { status: 200 }
      )
    }

    // Add user as member
    const newMember = await queryOne(
      `INSERT INTO ${getTableName('OrganizationMember')} ("organizationId", "userId", role) VALUES ($1, $2, $3) RETURNING *`,
      [invite.organizationId, userId, invite.role]
    )

    if (!newMember) {
      return NextResponse.json({ error: 'Failed to add member' }, { status: 500 })
    }

    // Delete the invite after successful acceptance
    await query(
      `DELETE FROM ${getTableName('OrganizationInvite')} WHERE id = $1`,
      [invite.id]
    )

    return NextResponse.json({
      message: 'Invitation accepted successfully',
      member: newMember,
    })
  } catch (error: any) {
    console.error('Error in POST /api/invites/[token]/accept:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
