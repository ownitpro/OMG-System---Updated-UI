import { NextRequest, NextResponse } from 'next/server'

// GET /api/organizations/[organizationId]/members - Get organization members
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

    // Verify user is a member of this organization
    const membership = await queryOne<{ role: string }>(
      `SELECT role FROM ${getTableName('OrganizationMember')} WHERE "organizationId" = $1 AND "userId" = $2`,
      [organizationId, userId]
    )

    if (!membership) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // Get all members with user details
    const members = await query<{
      id: string
      role: string
      createdAt: string
      userId: string
      userName: string
      userEmail: string
    }>(
      `SELECT m.id, m.role, m."createdAt", m."userId", u.name as "userName", u.email as "userEmail"
       FROM ${getTableName('OrganizationMember')} m
       JOIN ${getTableName('User')} u ON m."userId" = u.id
       WHERE m."organizationId" = $1
       ORDER BY m."createdAt" DESC`,
      [organizationId]
    )

    // Transform to match expected format
    const transformedMembers = members.map(m => ({
      id: m.id,
      role: m.role,
      joinedAt: m.createdAt, // Map createdAt to joinedAt for frontend compatibility
      userId: m.userId,
      User: {
        id: m.userId,
        email: m.userEmail,
        name: m.userName,
      }
    }))

    return NextResponse.json({ members: transformedMembers || [] })
  } catch (error: any) {
    console.error('Error in GET /api/organizations/[organizationId]/members:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST /api/organizations/[organizationId]/members - Invite member
export async function POST(
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
      return NextResponse.json({ error: 'Only admins can invite members' }, { status: 403 })
    }

    const { email, role } = await request.json()

    if (!email || !role) {
      return NextResponse.json({ error: 'Email and role are required' }, { status: 400 })
    }

    if (!['admin', 'member', 'viewer'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    // Check seat limit enforcement
    const { getPlanLimits, isTrialExpired } = await import('@/lib/plan-limits');

    // Get organization owner's plan
    const org = await queryOne<{ ownerId: string }>(
      `SELECT "ownerId" FROM ${getTableName('Organization')} WHERE id = $1`,
      [organizationId]
    )

    if (!org) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 })
    }

    // Get owner's plan information
    const owner = await queryOne<{ id: string; plan: string; trialExpiresAt: string }>(
      `SELECT id, plan, "trialExpiresAt" FROM ${getTableName('User')} WHERE id = $1`,
      [org.ownerId]
    )

    if (!owner) {
      return NextResponse.json({ error: 'Organization owner not found' }, { status: 404 })
    }

    const plan = (owner.plan || 'free') as 'free' | 'starter' | 'growth' | 'pro';
    const limits = getPlanLimits(plan);

    // Check if trial has expired
    if (owner.trialExpiresAt && isTrialExpired(owner.trialExpiresAt)) {
      return NextResponse.json({
        error: 'Your trial has expired. Please upgrade to continue adding members.',
        code: 'TRIAL_EXPIRED'
      }, { status: 402 })
    }

    // Count current members
    const countResult = await queryOne<{ count: string }>(
      `SELECT COUNT(*) as count FROM ${getTableName('OrganizationMember')} WHERE "organizationId" = $1`,
      [organizationId]
    )

    const memberCount = parseInt(countResult?.count || '0', 10);

    // Check if adding this member would exceed seat limit
    if (memberCount >= limits.seats) {
      return NextResponse.json({
        error: `You've reached your seat limit of ${limits.seats}. Upgrade to add more team members.`,
        code: 'SEAT_LIMIT_EXCEEDED',
        currentCount: memberCount,
        limit: limits.seats
      }, { status: 402 })
    }

    // Find user by email
    const invitedUser = await queryOne<{ id: string }>(
      `SELECT id FROM ${getTableName('User')} WHERE email = $1`,
      [email]
    )

    // If user exists, add them directly
    if (invitedUser) {
      // Check if user is already a member
      const existingMember = await queryOne<{ id: string }>(
        `SELECT id FROM ${getTableName('OrganizationMember')} WHERE "organizationId" = $1 AND "userId" = $2`,
        [organizationId, invitedUser.id]
      )

      if (existingMember) {
        return NextResponse.json({ error: 'User is already a member' }, { status: 400 })
      }

      // Add member
      const newMember = await queryOne(
        `INSERT INTO ${getTableName('OrganizationMember')} ("organizationId", "userId", role) VALUES ($1, $2, $3) RETURNING *`,
        [organizationId, invitedUser.id, role]
      )

      if (!newMember) {
        return NextResponse.json({ error: 'Failed to add member' }, { status: 500 })
      }

      return NextResponse.json({ member: newMember }, { status: 201 })
    }

    // User doesn't exist - create an invitation
    // Generate a random token
    const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    // Check if there's already an pending invite
    const existingInvite = await queryOne<{ id: string }>(
      `SELECT id FROM ${getTableName('OrganizationInvite')} WHERE "organizationId" = $1 AND email = $2`,
      [organizationId, email]
    )

    if (existingInvite) {
      return NextResponse.json({ error: 'An invitation is already pending for this email' }, { status: 400 })
    }

    // Set expiration to 7 days from now
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    // Create invite
    const invite = await queryOne(
      `INSERT INTO ${getTableName('OrganizationInvite')} ("organizationId", email, role, "invitedById", token, "expiresAt") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [organizationId, email, role, userId, token, expiresAt.toISOString()]
    )

    if (!invite) {
      return NextResponse.json({ error: 'Failed to create invitation' }, { status: 500 })
    }

    // TODO: Send invitation email with token link
    // For now, just return the invite details
    return NextResponse.json({
      invite,
      message: 'Invitation created. User will need to register and use the invite link.',
      inviteUrl: `${process.env.NEXT_PUBLIC_APP_URL}/invite/${token}`
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error in POST /api/organizations/[organizationId]/members:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
