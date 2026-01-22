// POST /api/admin/upgrade-users
// Upgrades users from personal to business plans
// AUTOMATICALLY creates organization and migrates documents

import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { getTableName } from '@/lib/db-utils'
import { BusinessPlan, getPlanLimits, isBusinessPlan } from '@/lib/plan-limits'

interface UpgradeRequest {
  emails: string[]
  targetPlan: BusinessPlan
  organizationName?: string // Optional - defaults to "Organization" or user's name
}

interface UserResult {
  email: string
  success: boolean
  userId?: string
  previousPlan?: string
  newPlan?: string
  error?: string
  organizationId?: string
  documentsMigrated?: number
  foldersMigrated?: number
}

export async function POST(request: NextRequest) {
  try {
    // Check for admin secret
    const authHeader = request.headers.get('x-admin-secret')
    const adminSecret = process.env.ADMIN_SECRET || 'migrate-2024'

    if (authHeader !== adminSecret) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body: UpgradeRequest = await request.json()
    const { emails, targetPlan = 'business_starter', organizationName } = body

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: 'emails array is required' },
        { status: 400 }
      )
    }

    // Validate target plan is a business plan
    if (!isBusinessPlan(targetPlan)) {
      return NextResponse.json(
        { error: `Invalid target plan: ${targetPlan}. Must be a business plan.` },
        { status: 400 }
      )
    }

    const planLimits = getPlanLimits(targetPlan)
    const userTable = getTableName('User')
    const orgTable = getTableName('Organization')
    const orgMemberTable = getTableName('OrganizationMember')
    const documentTable = getTableName('Document')
    const folderTable = getTableName('Folder')
    const personalVaultTable = getTableName('PersonalVault')

    const results: UserResult[] = []

    // Process each email - each user gets their own organization
    for (const email of emails) {
      const trimmedEmail = email.trim().toLowerCase()
      let userOrgId: string | null = null
      let documentsMigrated = 0
      let foldersMigrated = 0

      try {
        // Find user by email with their name
        const user = await queryOne<{ id: string; email: string; name?: string; plan?: string }>(
          `SELECT id, email, name, plan FROM ${userTable} WHERE LOWER(email) = $1`,
          [trimmedEmail]
        )

        if (!user) {
          results.push({
            email: trimmedEmail,
            success: false,
            error: 'User not found'
          })
          continue
        }

        const previousPlan = user.plan || 'trial'

        // Get user's personal vault
        const personalVault = await queryOne<{ id: string }>(
          `SELECT id FROM ${personalVaultTable} WHERE "userId" = $1`,
          [user.id]
        )

        // Create organization for this user (default name or provided name)
        const orgName = organizationName || user.name || 'Organization'
        const orgSlug = orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

        try {
          const newOrg = await queryOne<{ id: string }>(
            `INSERT INTO ${orgTable} (id, name, slug, plan, "seatCount", "createdAt", "updatedAt")
             VALUES (gen_random_uuid(), $1, $2, $3, 1, NOW(), NOW())
             RETURNING id`,
            [orgName, orgSlug, targetPlan]
          )
          userOrgId = newOrg?.id || null
        } catch (err: any) {
          console.error('[UPGRADE] Error creating organization:', err.message)
          // Try with a unique slug if duplicate
          try {
            const uniqueSlug = `${orgSlug}-${Date.now()}`
            const newOrg = await queryOne<{ id: string }>(
              `INSERT INTO ${orgTable} (id, name, slug, plan, "seatCount", "createdAt", "updatedAt")
               VALUES (gen_random_uuid(), $1, $2, $3, 1, NOW(), NOW())
               RETURNING id`,
              [orgName, uniqueSlug, targetPlan]
            )
            userOrgId = newOrg?.id || null
          } catch (err2: any) {
            console.error('[UPGRADE] Error creating organization with unique slug:', err2.message)
          }
        }

        if (!userOrgId) {
          results.push({
            email: trimmedEmail,
            success: false,
            error: 'Failed to create organization'
          })
          continue
        }

        // Add user as owner of the organization
        try {
          await query(
            `INSERT INTO ${orgMemberTable} (id, "organizationId", "userId", role, "createdAt", "updatedAt")
             VALUES (gen_random_uuid(), $1, $2, 'admin', NOW(), NOW())`,
            [userOrgId, user.id]
          )
        } catch (err: any) {
          console.error('[UPGRADE] Error adding user to org:', err.message)
        }

        // Migrate documents from personal vault to organization
        if (personalVault) {
          try {
            // First migrate folders
            const folderResult = await query(
              `UPDATE ${folderTable}
               SET "organizationId" = $1, "personalVaultId" = NULL, "updatedAt" = NOW()
               WHERE "personalVaultId" = $2
               RETURNING id`,
              [userOrgId, personalVault.id]
            )
            foldersMigrated = folderResult?.length || 0

            // Then migrate documents
            const docResult = await query(
              `UPDATE ${documentTable}
               SET "organizationId" = $1, "personalVaultId" = NULL, "updatedAt" = NOW()
               WHERE "personalVaultId" = $2
               RETURNING id`,
              [userOrgId, personalVault.id]
            )
            documentsMigrated = docResult?.length || 0

            console.log(`[UPGRADE] Migrated ${documentsMigrated} documents and ${foldersMigrated} folders for ${trimmedEmail}`)
          } catch (err: any) {
            console.error('[UPGRADE] Error migrating documents:', err.message)
          }
        }

        // Update user plan and accountType
        await query(
          `UPDATE ${userTable}
           SET plan = $1,
               "accountType" = 'business',
               "subscriptionStatus" = 'active',
               "updatedAt" = NOW()
           WHERE id = $2`,
          [targetPlan, user.id]
        )

        results.push({
          email: trimmedEmail,
          success: true,
          userId: user.id,
          previousPlan,
          newPlan: targetPlan,
          organizationId: userOrgId,
          documentsMigrated,
          foldersMigrated
        })

      } catch (err: any) {
        results.push({
          email: trimmedEmail,
          success: false,
          error: err.message
        })
      }
    }

    const successCount = results.filter(r => r.success).length
    const failCount = results.filter(r => !r.success).length

    return NextResponse.json({
      success: true,
      summary: {
        totalRequested: emails.length,
        successfulUpgrades: successCount,
        failedUpgrades: failCount,
        targetPlan,
        planLimits: {
          storageGb: planLimits.storageGb,
          processingUnitsPerMonth: planLimits.processingUnitsPerMonth,
          dailyProcessingLimit: planLimits.dailyProcessingLimit,
          egressGbPerMonth: planLimits.egressGbPerMonth,
          activeShareLinks: planLimits.activeShareLinks,
          pdfPageLimit: planLimits.pdfPageLimit,
          businessVaults: planLimits.businessVaults,
          hasClientPortals: planLimits.hasClientPortals,
          hasAuditLog: planLimits.hasAuditLog,
        },
        organizationId
      },
      results,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('[UPGRADE] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Upgrade failed' },
      { status: 500 }
    )
  }
}

// GET /api/admin/upgrade-users
// Preview upgrade for users without making changes
export async function GET(request: NextRequest) {
  try {
    // Check for admin secret
    const authHeader = request.headers.get('x-admin-secret')
    const adminSecret = process.env.ADMIN_SECRET || 'migrate-2024'

    if (authHeader !== adminSecret) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const emails = request.nextUrl.searchParams.get('emails')?.split(',') || []
    const targetPlan = (request.nextUrl.searchParams.get('targetPlan') || 'business_starter') as BusinessPlan

    if (emails.length === 0) {
      return NextResponse.json(
        { error: 'emails query parameter is required' },
        { status: 400 }
      )
    }

    const userTable = getTableName('User')
    const docTable = getTableName('Document')

    const previews = []

    for (const email of emails) {
      const trimmedEmail = email.trim().toLowerCase()

      try {
        // Find user
        const user = await queryOne<{
          id: string
          email: string
          name?: string
          plan?: string
          subscriptionStatus?: string
        }>(
          `SELECT id, email, name, plan, "subscriptionStatus"
           FROM ${userTable}
           WHERE LOWER(email) = $1`,
          [trimmedEmail]
        )

        if (!user) {
          previews.push({
            email: trimmedEmail,
            found: false,
            error: 'User not found'
          })
          continue
        }

        // Get document count and storage
        const docStats = await queryOne<{ count: string; totalBytes: string }>(
          `SELECT COUNT(*) as count, COALESCE(SUM("sizeBytes"), 0) as "totalBytes"
           FROM ${docTable} WHERE "userId" = $1`,
          [user.id]
        )

        const currentPlanLimits = getPlanLimits(user.plan || 'trial')
        const newPlanLimits = getPlanLimits(targetPlan)

        previews.push({
          email: trimmedEmail,
          found: true,
          userId: user.id,
          name: user.name,
          currentPlan: user.plan || 'trial',
          targetPlan,
          subscriptionStatus: user.subscriptionStatus,
          documents: {
            count: parseInt(docStats?.count || '0'),
            totalStorageBytes: parseInt(docStats?.totalBytes || '0'),
            totalStorageGb: (parseInt(docStats?.totalBytes || '0') / (1024 * 1024 * 1024)).toFixed(2)
          },
          limitsComparison: {
            storage: {
              current: `${currentPlanLimits.storageGb} GB`,
              new: `${newPlanLimits.storageGb} GB`,
              increase: `+${newPlanLimits.storageGb - currentPlanLimits.storageGb} GB`
            },
            processingUnits: {
              current: currentPlanLimits.processingUnitsPerMonth.toLocaleString(),
              new: newPlanLimits.processingUnitsPerMonth.toLocaleString(),
              increase: `+${(newPlanLimits.processingUnitsPerMonth - currentPlanLimits.processingUnitsPerMonth).toLocaleString()}`
            },
            egress: {
              current: `${currentPlanLimits.egressGbPerMonth} GB`,
              new: `${newPlanLimits.egressGbPerMonth} GB`,
              increase: `+${newPlanLimits.egressGbPerMonth - currentPlanLimits.egressGbPerMonth} GB`
            },
            shareLinks: {
              current: currentPlanLimits.activeShareLinks,
              new: newPlanLimits.activeShareLinks,
              increase: `+${newPlanLimits.activeShareLinks - currentPlanLimits.activeShareLinks}`
            }
          },
          newFeatures: {
            clientPortals: newPlanLimits.hasClientPortals && !currentPlanLimits.hasClientPortals,
            businessVaults: newPlanLimits.businessVaults > 0,
            emailRules: newPlanLimits.hasEmailRules && !currentPlanLimits.hasEmailRules,
            auditLog: newPlanLimits.hasAuditLog && !currentPlanLimits.hasAuditLog,
            advancedSearch: newPlanLimits.hasAdvancedSearch && !currentPlanLimits.hasAdvancedSearch
          }
        })

      } catch (err: any) {
        previews.push({
          email: trimmedEmail,
          found: false,
          error: err.message
        })
      }
    }

    return NextResponse.json({
      success: true,
      preview: true,
      note: 'This is a preview. Use POST to apply the upgrade.',
      targetPlan,
      users: previews,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('[UPGRADE] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Preview failed' },
      { status: 500 }
    )
  }
}
