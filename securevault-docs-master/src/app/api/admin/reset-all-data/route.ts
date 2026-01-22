// src/app/api/admin/reset-all-data/route.ts
// DANGER: This endpoint deletes ALL user data from the database
// Only use in development/testing environments

import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { getTableName } from '@/lib/db-utils'

export async function DELETE(request: NextRequest) {
  try {
    // SECURITY: Disable this dangerous endpoint in production
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({
        error: 'This endpoint is disabled in production'
      }, { status: 403 })
    }

    // Safety check - require a confirmation header
    const confirmHeader = request.headers.get('x-confirm-delete-all')
    if (confirmHeader !== 'DELETE_ALL_DATA_CONFIRMED') {
      return NextResponse.json({
        error: 'Missing confirmation header. Set x-confirm-delete-all: DELETE_ALL_DATA_CONFIRMED'
      }, { status: 400 })
    }

    console.log('========================================')
    console.log('DELETING ALL USER DATA - THIS IS DESTRUCTIVE')
    console.log('========================================')

    const deletedCounts: Record<string, number> = {}

    // Delete in order of dependencies (most dependent first)

    // 1. Delete securevault app-specific data first
    console.log('Deleting securevault schema data...')

    // Document versions (depends on Document)
    const docVersions = await query(`DELETE FROM ${getTableName('DocumentVersion')} RETURNING id`)
    deletedCounts.DocumentVersion = docVersions.length
    console.log(`Deleted ${docVersions.length} document versions`)

    // Documents (depends on Folder, PersonalVault, Organization)
    const docs = await query(`DELETE FROM ${getTableName('Document')} RETURNING id`)
    deletedCounts.Document = docs.length
    console.log(`Deleted ${docs.length} documents`)

    // Folders (depends on PersonalVault, Organization)
    const folders = await query(`DELETE FROM ${getTableName('Folder')} RETURNING id`)
    deletedCounts.Folder = folders.length
    console.log(`Deleted ${folders.length} folders`)

    // Share link access (depends on ShareLink)
    const shareLinkAccess = await query(`DELETE FROM ${getTableName('ShareLinkAccess')} RETURNING id`)
    deletedCounts.ShareLinkAccess = shareLinkAccess.length
    console.log(`Deleted ${shareLinkAccess.length} share link access records`)

    // Share links (depends on PersonalVault, Organization)
    const shareLinks = await query(`DELETE FROM ${getTableName('ShareLink')} RETURNING id`)
    deletedCounts.ShareLink = shareLinks.length
    console.log(`Deleted ${shareLinks.length} share links`)

    // Portal submissions (depends on Portal)
    const submissions = await query(`DELETE FROM ${getTableName('PortalSubmission')} RETURNING id`)
    deletedCounts.PortalSubmission = submissions.length
    console.log(`Deleted ${submissions.length} portal submissions`)

    // Portal requests (depends on Portal)
    const portalRequests = await query(`DELETE FROM ${getTableName('PortalRequest')} RETURNING id`)
    deletedCounts.PortalRequest = portalRequests.length
    console.log(`Deleted ${portalRequests.length} portal requests`)

    // Guest tokens (depends on Portal)
    const guestTokens = await query(`DELETE FROM ${getTableName('GuestToken')} RETURNING id`)
    deletedCounts.GuestToken = guestTokens.length
    console.log(`Deleted ${guestTokens.length} guest tokens`)

    // Portals (depends on Organization)
    const portals = await query(`DELETE FROM ${getTableName('Portal')} RETURNING id`)
    deletedCounts.Portal = portals.length
    console.log(`Deleted ${portals.length} portals`)

    // Expiration notifications
    const expirationNotifs = await query(`DELETE FROM ${getTableName('ExpirationNotification')} RETURNING id`)
    deletedCounts.ExpirationNotification = expirationNotifs.length
    console.log(`Deleted ${expirationNotifs.length} expiration notifications`)

    // User notifications
    const userNotifs = await query(`DELETE FROM ${getTableName('UserNotification')} RETURNING id`)
    deletedCounts.UserNotification = userNotifs.length
    console.log(`Deleted ${userNotifs.length} user notifications`)

    // Audit logs
    const auditLogs = await query(`DELETE FROM ${getTableName('AuditLog')} RETURNING id`)
    deletedCounts.AuditLog = auditLogs.length
    console.log(`Deleted ${auditLogs.length} audit logs`)

    // Usage records
    const usageRecords = await query(`DELETE FROM ${getTableName('UsageRecord')} RETURNING id`)
    deletedCounts.UsageRecord = usageRecords.length
    console.log(`Deleted ${usageRecords.length} usage records`)

    // Usage alerts
    const usageAlerts = await query(`DELETE FROM ${getTableName('UsageAlert')} RETURNING id`)
    deletedCounts.UsageAlert = usageAlerts.length
    console.log(`Deleted ${usageAlerts.length} usage alerts`)

    // Connectors
    const connectors = await query(`DELETE FROM ${getTableName('Connector')} RETURNING id`)
    deletedCounts.Connector = connectors.length
    console.log(`Deleted ${connectors.length} connectors`)

    // Request template items (depends on RequestTemplate)
    const templateItems = await query(`DELETE FROM ${getTableName('RequestTemplateItem')} RETURNING id`)
    deletedCounts.RequestTemplateItem = templateItems.length
    console.log(`Deleted ${templateItems.length} request template items`)

    // Request templates
    const templates = await query(`DELETE FROM ${getTableName('RequestTemplate')} RETURNING id`)
    deletedCounts.RequestTemplate = templates.length
    console.log(`Deleted ${templates.length} request templates`)

    // Personal vaults (depends on User)
    const personalVaults = await query(`DELETE FROM ${getTableName('PersonalVault')} RETURNING id`)
    deletedCounts.PersonalVault = personalVaults.length
    console.log(`Deleted ${personalVaults.length} personal vaults`)

    // User profiles
    const userProfiles = await query(`DELETE FROM ${getTableName('UserProfile')} RETURNING id`)
    deletedCounts.UserProfile = userProfiles.length
    console.log(`Deleted ${userProfiles.length} user profiles`)

    // Organization profiles
    const orgProfiles = await query(`DELETE FROM ${getTableName('OrganizationProfile')} RETURNING id`)
    deletedCounts.OrganizationProfile = orgProfiles.length
    console.log(`Deleted ${orgProfiles.length} organization profiles`)

    // 2. Delete core schema data
    console.log('Deleting core schema data...')

    // Organization invites (depends on Organization)
    const orgInvites = await query(`DELETE FROM ${getTableName('OrganizationInvite')} RETURNING id`)
    deletedCounts.OrganizationInvite = orgInvites.length
    console.log(`Deleted ${orgInvites.length} organization invites`)

    // Organization members (depends on Organization and User)
    const orgMembers = await query(`DELETE FROM ${getTableName('OrganizationMember')} RETURNING id`)
    deletedCounts.OrganizationMember = orgMembers.length
    console.log(`Deleted ${orgMembers.length} organization members`)

    // Organizations
    const orgs = await query(`DELETE FROM ${getTableName('Organization')} RETURNING id`)
    deletedCounts.Organization = orgs.length
    console.log(`Deleted ${orgs.length} organizations`)

    // Sessions (depends on User)
    const sessions = await query(`DELETE FROM ${getTableName('Session')} RETURNING id`)
    deletedCounts.Session = sessions.length
    console.log(`Deleted ${sessions.length} sessions`)

    // Accounts (depends on User)
    const accounts = await query(`DELETE FROM ${getTableName('Account')} RETURNING id`)
    deletedCounts.Account = accounts.length
    console.log(`Deleted ${accounts.length} accounts`)

    // Verification tokens
    const verificationTokens = await query(`DELETE FROM ${getTableName('VerificationToken')} RETURNING token`)
    deletedCounts.VerificationToken = verificationTokens.length
    console.log(`Deleted ${verificationTokens.length} verification tokens`)

    // Finally delete users
    const users = await query(`DELETE FROM ${getTableName('User')} RETURNING id, email`)
    deletedCounts.User = users.length
    console.log(`Deleted ${users.length} users:`)
    users.forEach((u: any) => console.log(`  - ${u.email} (${u.id})`))

    console.log('========================================')
    console.log('ALL DATA DELETED SUCCESSFULLY')
    console.log('========================================')

    return NextResponse.json({
      success: true,
      message: 'All user data has been deleted',
      deletedCounts,
      deletedUsers: users.map((u: any) => ({ id: u.id, email: u.email }))
    })

  } catch (error: any) {
    console.error('Error deleting all data:', error)
    return NextResponse.json({
      error: error.message || 'Failed to delete data'
    }, { status: 500 })
  }
}

// GET endpoint to show what would be deleted (safe preview)
export async function GET() {
  try {
    const counts: Record<string, number> = {}

    // Count all records
    const userCount = await query(`SELECT COUNT(*) as count FROM ${getTableName('User')}`)
    counts.User = parseInt(userCount[0]?.count || '0')

    const orgCount = await query(`SELECT COUNT(*) as count FROM ${getTableName('Organization')}`)
    counts.Organization = parseInt(orgCount[0]?.count || '0')

    const docCount = await query(`SELECT COUNT(*) as count FROM ${getTableName('Document')}`)
    counts.Document = parseInt(docCount[0]?.count || '0')

    const folderCount = await query(`SELECT COUNT(*) as count FROM ${getTableName('Folder')}`)
    counts.Folder = parseInt(folderCount[0]?.count || '0')

    const personalVaultCount = await query(`SELECT COUNT(*) as count FROM ${getTableName('PersonalVault')}`)
    counts.PersonalVault = parseInt(personalVaultCount[0]?.count || '0')

    const portalCount = await query(`SELECT COUNT(*) as count FROM ${getTableName('Portal')}`)
    counts.Portal = parseInt(portalCount[0]?.count || '0')

    // Get list of users
    const users = await query(`SELECT id, email, name, "accountType", "createdAt" FROM ${getTableName('User')} ORDER BY "createdAt" DESC`)

    return NextResponse.json({
      message: 'Preview of data that would be deleted. Send DELETE request with x-confirm-delete-all header to actually delete.',
      counts,
      users: users.map((u: any) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        accountType: u.accountType,
        createdAt: u.createdAt
      }))
    })

  } catch (error: any) {
    console.error('Error counting data:', error)
    return NextResponse.json({
      error: error.message || 'Failed to count data'
    }, { status: 500 })
  }
}
