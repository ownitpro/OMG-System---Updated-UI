// src/app/api/account/upgrade/route.ts
// Upgrade Personal account to Business account

import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { query, queryOne } from '@/lib/db'
import { getTableName } from '@/lib/db-utils'
import { getUserAccountType } from '@/lib/auth/accountTypeGuard'

interface UpgradeResult {
  success: boolean
  message: string
  organization?: {
    id: string
    name: string
  }
}

// POST /api/account/upgrade - Upgrade from Personal to Business
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get current account type
    const currentAccountType = await getUserAccountType(userId)

    if (!currentAccountType) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (currentAccountType === 'business') {
      return NextResponse.json({
        error: 'Account is already a business account',
        code: 'ALREADY_BUSINESS',
      }, { status: 400 })
    }

    // Get request body for organization name
    const body = await request.json().catch(() => ({}))
    const organizationName = body.organizationName || 'My Business'

    // Get user info for organization name
    const user = await queryOne<{ id: string; name: string | null; email: string }>(
      `SELECT id, name, email FROM ${getTableName('User')} WHERE id = $1`,
      [userId]
    )

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Generate organization name if not provided
    const orgName = organizationName || (user.name ? `${user.name}'s Business` : 'My Business')
    const slug = orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

    // Start upgrade process
    console.log(`[UPGRADE] Starting upgrade for user ${userId} from personal to business`)

    // Step 1: Update user accountType to 'business'
    await query(
      `UPDATE ${getTableName('User')} SET "accountType" = 'business', "updatedAt" = NOW() WHERE id = $1`,
      [userId]
    )
    console.log(`[UPGRADE] Updated accountType to business for user ${userId}`)

    // Step 2: Create default Organization
    const organizationId = randomUUID()
    const organization = await queryOne<{ id: string; name: string }>(
      `INSERT INTO ${getTableName('Organization')} (id, name, slug, description, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       RETURNING id, name`,
      [organizationId, orgName, slug, 'Created during account upgrade']
    )

    if (!organization) {
      // Rollback accountType change
      await query(
        `UPDATE ${getTableName('User')} SET "accountType" = 'personal', "updatedAt" = NOW() WHERE id = $1`,
        [userId]
      )
      return NextResponse.json({ error: 'Failed to create organization' }, { status: 500 })
    }
    console.log(`[UPGRADE] Created organization ${organization.id} for user ${userId}`)

    // Step 3: Add user as admin of the organization
    await query(
      `INSERT INTO ${getTableName('OrganizationMember')} ("organizationId", "userId", role, "createdAt", "updatedAt")
       VALUES ($1, $2, 'admin', NOW(), NOW())`,
      [organization.id, userId]
    )
    console.log(`[UPGRADE] Added user ${userId} as admin of organization ${organization.id}`)

    // Step 4: Create OrganizationProfile (billing info, etc.)
    try {
      await query(
        `INSERT INTO ${getTableName('OrganizationProfile')} ("organizationId", "billingEmail", "createdAt", "updatedAt")
         VALUES ($1, $2, NOW(), NOW())`,
        [organization.id, user.email]
      )
      console.log(`[UPGRADE] Created OrganizationProfile for organization ${organization.id}`)
    } catch (profileError) {
      // Non-critical, continue
      console.warn('[UPGRADE] Failed to create OrganizationProfile:', profileError)
    }

    // Step 5: Migrate documents from Personal Vault to Organization (optional)
    // Get personal vault
    const personalVault = await queryOne<{ id: string }>(
      `SELECT id FROM ${getTableName('PersonalVault')} WHERE "userId" = $1`,
      [userId]
    )

    let documentsMigrated = 0
    if (personalVault) {
      // Count documents in personal vault
      const docCount = await queryOne<{ count: string }>(
        `SELECT COUNT(*) as count FROM ${getTableName('Document')} WHERE "personalVaultId" = $1`,
        [personalVault.id]
      )
      documentsMigrated = parseInt(docCount?.count || '0', 10)

      if (documentsMigrated > 0) {
        // Update documents to belong to organization instead of personal vault
        await query(
          `UPDATE ${getTableName('Document')}
           SET "organizationId" = $1, "personalVaultId" = NULL, "updatedAt" = NOW()
           WHERE "personalVaultId" = $2`,
          [organization.id, personalVault.id]
        )
        console.log(`[UPGRADE] Migrated ${documentsMigrated} documents from personal vault to organization`)
      }

      // Archive the personal vault (mark as archived, don't delete)
      try {
        await query(
          `UPDATE ${getTableName('PersonalVault')} SET "archivedAt" = NOW(), "updatedAt" = NOW() WHERE id = $1`,
          [personalVault.id]
        )
        console.log(`[UPGRADE] Archived personal vault ${personalVault.id}`)
      } catch (archiveError) {
        // archivedAt column might not exist, ignore
        console.warn('[UPGRADE] Could not archive personal vault (column may not exist):', archiveError)
      }
    }

    console.log(`[UPGRADE] Upgrade complete for user ${userId}`)

    const result: UpgradeResult = {
      success: true,
      message: `Account upgraded to business successfully. ${documentsMigrated > 0 ? `${documentsMigrated} documents migrated.` : ''}`,
      organization: {
        id: organization.id,
        name: organization.name,
      },
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('[UPGRADE] Error upgrading account:', error)
    return NextResponse.json({
      error: error.message || 'Failed to upgrade account',
    }, { status: 500 })
  }
}
