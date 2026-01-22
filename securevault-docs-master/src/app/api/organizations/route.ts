// src/app/api/organizations/route.ts
// Organization CRUD operations - Aurora PostgreSQL only

import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { getTableName } from '@/lib/db-utils'
import { requireBusinessAccount, createAccountTypeError } from '@/lib/auth/accountTypeGuard'

// GET /api/organizations - Get user's organizations
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get organizations where user is a member (use only columns that exist in schema)
    const memberships = await query(
      `SELECT
         m."organizationId",
         m.role,
         o.id, o.name, o.slug, o.plan,
         o."createdAt", o."updatedAt"
       FROM ${getTableName('OrganizationMember')} m
       JOIN ${getTableName('Organization')} o ON o.id = m."organizationId"
       WHERE m."userId" = $1`,
      [userId]
    )

    const organizations = memberships?.map((m: any) => ({
      id: m.id,
      name: m.name,
      slug: m.slug,
      plan: m.plan || 'trial',
      createdAt: m.createdAt,
      updatedAt: m.updatedAt,
      userRole: m.role,
    })) || []



    return NextResponse.json({ organizations })
  } catch (error: any) {
    console.error('Error in GET /api/organizations:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST /api/organizations - Create new organization
// Only business accounts can create organizations
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check account type - only business accounts can create organizations
    const isAllowed = await requireBusinessAccount(userId)
    if (!isAllowed) {
      return createAccountTypeError('business')
    }

    const { name, description } = await request.json()

    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Organization name is required' }, { status: 400 })
    }

    const { getPlanLimits, isBusinessPlan } = await import('@/lib/plan-limits')

    // Use the user's actual plan from Subscription table to get limits
    const { getUserPlan } = await import('@/lib/plan-utils-server')
    const userPlan = await getUserPlan(userId)
    const limits = getPlanLimits(userPlan)


    // Count current organizations where user is a member with admin role
    const countResult = await queryOne<{ count: string }>(
      `SELECT COUNT(*) as count FROM ${getTableName('OrganizationMember')} WHERE "userId" = $1 AND role = 'admin'`,
      [userId]
    )

    const orgCount = parseInt(countResult?.count || '0', 10)

    // Check if creating this organization would exceed business vault limit
    if (orgCount >= limits.businessVaults) {
      return NextResponse.json({
        error: `You've reached your business vault limit of ${limits.businessVaults}. Upgrade to create more business vaults.`,
        code: 'BUSINESS_VAULT_LIMIT_EXCEEDED',
        currentCount: orgCount,
        limit: limits.businessVaults
      }, { status: 402 })
    }

    // Generate slug from name
    const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

    // Create the organization
    // Must explicitly provide ID since table doesn't have auto-generation
    const organization = await queryOne(
      `INSERT INTO ${getTableName('Organization')} (id, name, slug, plan, "createdAt", "updatedAt")
       VALUES (gen_random_uuid(), $1, $2, $3, NOW(), NOW())
       RETURNING *`,
      [name.trim(), slug, userPlan]
    )



    if (!organization) {
      return NextResponse.json({ error: 'Failed to create organization' }, { status: 500 })
    }

    // Add creator as admin member
    await query(
      `INSERT INTO ${getTableName('OrganizationMember')} (id, "organizationId", "userId", role, "createdAt", "updatedAt")
       VALUES (gen_random_uuid(), $1, $2, 'admin', NOW(), NOW())`,
      [organization.id, userId]
    )

    // Create OrganizationProfile for SecureVault
    await query(
      `INSERT INTO ${getTableName('OrganizationProfile')} ("organizationId", "storageUsedBytes", "ocrPagesUsed", "egressBytesUsed", "createdAt", "updatedAt")
       VALUES ($1, 0, 0, 0, NOW(), NOW())
       ON CONFLICT ("organizationId") DO NOTHING`,
      [organization.id]
    )


    return NextResponse.json({ organization }, { status: 201 })
  } catch (error: any) {
    console.error('Error in POST /api/organizations:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
