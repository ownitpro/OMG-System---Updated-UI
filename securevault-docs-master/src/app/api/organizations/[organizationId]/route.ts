import { NextRequest, NextResponse } from 'next/server'

// GET /api/organizations/[organizationId] - Get organization details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ organizationId: string }> }
) {
  try {
    const { queryOne } = await import('@/lib/db')
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

    // Get organization details
    const organization = await queryOne(
      `SELECT * FROM ${getTableName('Organization')} WHERE id = $1`,
      [organizationId]
    )

    if (!organization) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 })
    }

    return NextResponse.json({
      organization: {
        ...organization,
        userRole: membership.role,
      },
    })
  } catch (error: any) {
    console.error('Error in GET /api/organizations/[organizationId]:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PUT /api/organizations/[organizationId] - Update organization
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ organizationId: string }> }
) {
  try {
    const { queryOne } = await import('@/lib/db')
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
      return NextResponse.json({ error: 'Only admins can update organization' }, { status: 403 })
    }

    const { name, description } = await request.json()

    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Organization name is required' }, { status: 400 })
    }

    // Generate slug from name
    const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

    // Update organization
    const organization = await queryOne(
      `UPDATE ${getTableName('Organization')} SET name = $1, slug = $2, description = $3, "updatedAt" = NOW() WHERE id = $4 RETURNING *`,
      [name.trim(), slug, description?.trim() || null, organizationId]
    )

    if (!organization) {
      return NextResponse.json({ error: 'Failed to update organization' }, { status: 500 })
    }

    return NextResponse.json({ organization })
  } catch (error: any) {
    console.error('Error in PUT /api/organizations/[organizationId]:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE /api/organizations/[organizationId] - Delete organization
export async function DELETE(
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
      return NextResponse.json({ error: 'Only admins can delete organization' }, { status: 403 })
    }

    // Check if organization has documents
    const documents = await query<{ id: string }>(
      `SELECT id FROM ${getTableName('Document')} WHERE "organizationId" = $1 LIMIT 1`,
      [organizationId]
    )

    if (documents && documents.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete organization with documents. Please delete all documents first.' },
        { status: 400 }
      )
    }

    // Delete organization (this will cascade delete members due to DB constraints)
    await query(
      `DELETE FROM ${getTableName('Organization')} WHERE id = $1`,
      [organizationId]
    )

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error in DELETE /api/organizations/[organizationId]:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
