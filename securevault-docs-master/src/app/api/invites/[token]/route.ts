import { NextRequest, NextResponse } from 'next/server'

// GET /api/invites/[token] - Get invite details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const { token } = await params

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 })
    }

    // Fetch invite details
    const invite = await queryOne<{
      id: string
      organizationId: string
      email: string
      role: string
      token: string
      expiresAt: string
      invitedBy: string
      createdAt: string
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

    // Get organization name
    const org = await queryOne<{ name: string }>(
      `SELECT name FROM ${getTableName('Organization')} WHERE id = $1`,
      [invite.organizationId]
    )

    // Get inviter info
    const inviter = await queryOne<{ name: string; email: string }>(
      `SELECT name, email FROM ${getTableName('User')} WHERE id = $1`,
      [invite.invitedBy]
    )

    return NextResponse.json({
      invite: {
        ...invite,
        Organization: org,
        InvitedBy: inviter,
      }
    })
  } catch (error: any) {
    console.error('Error in GET /api/invites/[token]:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
