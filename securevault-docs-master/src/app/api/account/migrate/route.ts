// src/app/api/account/migrate/route.ts
// Migrate existing users to Personal or Business account type

import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { getTableName } from '@/lib/db-utils'
import { getUserAccountType } from '@/lib/auth/accountTypeGuard'

interface MigrationResult {
  success: boolean
  message: string
  accountType: 'personal' | 'business'
}

// POST /api/account/migrate - Set account type for existing users
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { targetAccountType } = body

    if (!targetAccountType || !['personal', 'business'].includes(targetAccountType)) {
      return NextResponse.json({
        error: 'Invalid account type. Must be "personal" or "business"',
      }, { status: 400 })
    }

    // Get current user info
    const user = await queryOne<{ id: string; name: string | null; email: string; accountType: string | null }>(
      `SELECT id, name, email, "accountType" FROM ${getTableName('User')} WHERE id = $1`,
      [userId]
    )

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user already has an explicit account type set
    if (user.accountType && user.accountType !== 'personal') {
      return NextResponse.json({
        error: 'Account type already set',
        currentAccountType: user.accountType,
      }, { status: 400 })
    }

    console.log(`[MIGRATE] Starting migration for user ${userId} to ${targetAccountType}`)

    if (targetAccountType === 'personal') {
      // Migrating to Personal - keep personal vault, archive organizations
      await handlePersonalMigration(userId)
    } else {
      // Migrating to Business - keep organizations, archive personal vault
      await handleBusinessMigration(userId, user.name, user.email)
    }

    // Update user accountType
    await query(
      `UPDATE ${getTableName('User')} SET "accountType" = $1, "updatedAt" = NOW() WHERE id = $2`,
      [targetAccountType, userId]
    )

    console.log(`[MIGRATE] Migration complete for user ${userId} to ${targetAccountType}`)

    const result: MigrationResult = {
      success: true,
      message: `Account migrated to ${targetAccountType} successfully`,
      accountType: targetAccountType,
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('[MIGRATE] Error migrating account:', error)
    return NextResponse.json({
      error: error.message || 'Failed to migrate account',
    }, { status: 500 })
  }
}

async function handlePersonalMigration(userId: string) {
  // Archive any organizations where user is admin (soft delete)
  // First, get organizations where user is the only admin
  const ownedOrgs = await query<{ id: string }>(
    `SELECT o.id FROM ${getTableName('Organization')} o
     JOIN ${getTableName('OrganizationMember')} m ON m."organizationId" = o.id
     WHERE m."userId" = $1 AND m.role = 'admin'`,
    [userId]
  )

  if (ownedOrgs && ownedOrgs.length > 0) {
    for (const org of ownedOrgs) {
      // Check if user is the only admin
      const adminCount = await queryOne<{ count: string }>(
        `SELECT COUNT(*) as count FROM ${getTableName('OrganizationMember')}
         WHERE "organizationId" = $1 AND role = 'admin'`,
        [org.id]
      )

      if (parseInt(adminCount?.count || '0', 10) === 1) {
        // User is only admin, archive the organization
        try {
          await query(
            `UPDATE ${getTableName('Organization')} SET "archivedAt" = NOW(), "updatedAt" = NOW() WHERE id = $1`,
            [org.id]
          )
          console.log(`[MIGRATE] Archived organization ${org.id} during personal migration`)
        } catch (archiveError) {
          // archivedAt column might not exist
          console.warn('[MIGRATE] Could not archive organization (column may not exist):', archiveError)
        }
      }
    }
  }

  // Remove user from all organization memberships
  await query(
    `DELETE FROM ${getTableName('OrganizationMember')} WHERE "userId" = $1`,
    [userId]
  )
  console.log(`[MIGRATE] Removed user ${userId} from all organizations`)
}

async function handleBusinessMigration(userId: string, userName: string | null, userEmail: string) {
  // Check if user has any organizations
  const orgCount = await queryOne<{ count: string }>(
    `SELECT COUNT(*) as count FROM ${getTableName('OrganizationMember')} WHERE "userId" = $1`,
    [userId]
  )

  if (parseInt(orgCount?.count || '0', 10) === 0) {
    // User has no organizations, create default one
    const orgName = userName ? `${userName}'s Business` : 'My Business'
    const slug = orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

    const organization = await queryOne<{ id: string }>(
      `INSERT INTO ${getTableName('Organization')} (name, slug, description, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, NOW(), NOW())
       RETURNING id`,
      [orgName, slug, 'Created during account migration']
    )

    if (organization) {
      await query(
        `INSERT INTO ${getTableName('OrganizationMember')} ("organizationId", "userId", role, "createdAt", "updatedAt")
         VALUES ($1, $2, 'admin', NOW(), NOW())`,
        [organization.id, userId]
      )

      // Create OrganizationProfile
      try {
        await query(
          `INSERT INTO ${getTableName('OrganizationProfile')} ("organizationId", "billingEmail", "createdAt", "updatedAt")
           VALUES ($1, $2, NOW(), NOW())`,
          [organization.id, userEmail]
        )
      } catch {
        // Non-critical
      }

      console.log(`[MIGRATE] Created default organization ${organization.id} for user ${userId}`)

      // Migrate documents from personal vault to the new organization
      const personalVault = await queryOne<{ id: string }>(
        `SELECT id FROM ${getTableName('PersonalVault')} WHERE "userId" = $1`,
        [userId]
      )

      if (personalVault) {
        const migrateResult = await query(
          `UPDATE ${getTableName('Document')}
           SET "organizationId" = $1, "personalVaultId" = NULL, "updatedAt" = NOW()
           WHERE "personalVaultId" = $2`,
          [organization.id, personalVault.id]
        )
        console.log(`[MIGRATE] Migrated documents from personal vault to organization`)
      }
    }
  } else {
    // User has organizations, migrate personal vault documents to first organization
    const firstOrg = await queryOne<{ organizationId: string }>(
      `SELECT "organizationId" FROM ${getTableName('OrganizationMember')} WHERE "userId" = $1 LIMIT 1`,
      [userId]
    )

    if (firstOrg) {
      const personalVault = await queryOne<{ id: string }>(
        `SELECT id FROM ${getTableName('PersonalVault')} WHERE "userId" = $1`,
        [userId]
      )

      if (personalVault) {
        await query(
          `UPDATE ${getTableName('Document')}
           SET "organizationId" = $1, "personalVaultId" = NULL, "updatedAt" = NOW()
           WHERE "personalVaultId" = $2`,
          [firstOrg.organizationId, personalVault.id]
        )
        console.log(`[MIGRATE] Migrated documents from personal vault to existing organization`)
      }
    }
  }

  // Archive personal vault
  const personalVault = await queryOne<{ id: string }>(
    `SELECT id FROM ${getTableName('PersonalVault')} WHERE "userId" = $1`,
    [userId]
  )

  if (personalVault) {
    try {
      await query(
        `UPDATE ${getTableName('PersonalVault')} SET "archivedAt" = NOW(), "updatedAt" = NOW() WHERE id = $1`,
        [personalVault.id]
      )
      console.log(`[MIGRATE] Archived personal vault ${personalVault.id}`)
    } catch (archiveError) {
      // archivedAt column might not exist
      console.warn('[MIGRATE] Could not archive personal vault (column may not exist):', archiveError)
    }
  }
}

// GET /api/account/migrate/status - Check if user needs migration
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check user's current account type
    const user = await queryOne<{ accountType: string | null }>(
      `SELECT "accountType" FROM ${getTableName('User')} WHERE id = $1`,
      [userId]
    )

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // If accountType is already explicitly set (not null and not the old default)
    // user doesn't need migration
    if (user.accountType && ['personal', 'business'].includes(user.accountType)) {
      return NextResponse.json({
        needsMigration: false,
        accountType: user.accountType,
      })
    }

    // Check if user has both personal vault AND organizations
    const hasPersonalVault = await queryOne<{ id: string }>(
      `SELECT id FROM ${getTableName('PersonalVault')} WHERE "userId" = $1`,
      [userId]
    )

    const orgCount = await queryOne<{ count: string }>(
      `SELECT COUNT(*) as count FROM ${getTableName('OrganizationMember')} WHERE "userId" = $1`,
      [userId]
    )

    const hasOrganizations = parseInt(orgCount?.count || '0', 10) > 0

    // Count documents in each
    let personalVaultDocs = 0
    let orgDocs = 0

    if (hasPersonalVault) {
      const pvDocs = await queryOne<{ count: string }>(
        `SELECT COUNT(*) as count FROM ${getTableName('Document')} WHERE "personalVaultId" = $1`,
        [hasPersonalVault.id]
      )
      personalVaultDocs = parseInt(pvDocs?.count || '0', 10)
    }

    if (hasOrganizations) {
      const orgDocCount = await queryOne<{ count: string }>(
        `SELECT COUNT(*) as count FROM ${getTableName('Document')} d
         JOIN ${getTableName('Organization')} o ON d."organizationId" = o.id
         JOIN ${getTableName('OrganizationMember')} m ON m."organizationId" = o.id
         WHERE m."userId" = $1`,
        [userId]
      )
      orgDocs = parseInt(orgDocCount?.count || '0', 10)
    }

    // User needs migration if they have BOTH personal vault AND organizations
    const needsMigration = !!hasPersonalVault && hasOrganizations

    return NextResponse.json({
      needsMigration,
      hasPersonalVault: !!hasPersonalVault,
      hasOrganizations,
      documentCounts: {
        personalVault: personalVaultDocs,
        organizations: orgDocs,
      },
    })
  } catch (error: any) {
    console.error('[MIGRATE] Error checking migration status:', error)
    return NextResponse.json({
      error: error.message || 'Failed to check migration status',
    }, { status: 500 })
  }
}
