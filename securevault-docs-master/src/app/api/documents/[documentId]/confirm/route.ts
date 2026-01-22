// src/app/api/documents/[documentId]/confirm/route.ts
// Confirms a pending document upload, making it visible in the vault

import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { getTableName } from '@/lib/db-utils'
import {
  incrementUserProcessingUsage,
  incrementOrgProcessingUsage,
  getUserProcessingUsage,
  getOrgProcessingUsage,
} from '@/lib/processing-tracking'
import {
  checkUsageAlert,
  logUsageAlert,
  createUsageNotification,
} from '@/lib/services/usage-alert-service'

/**
 * POST /api/documents/[documentId]/confirm
 * Confirms a pending document, changing its status from 'pending' to 'confirmed'
 * Body can optionally include { wasAnalyzed: boolean, pageCount: number } to track PU usage
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const { documentId } = await params

    if (!documentId) {
      return NextResponse.json(
        { error: 'Document ID is required' },
        { status: 400 }
      )
    }

    // Parse request body for optional analysis tracking
    let wasAnalyzed = false
    let pageCount = 1
    try {
      const text = await request.text()
      console.log('[CONFIRM] Raw request body:', text)
      if (text) {
        const body = JSON.parse(text)
        wasAnalyzed = body.wasAnalyzed === true
        pageCount = typeof body.pageCount === 'number' ? Math.max(1, body.pageCount) : 1
        console.log('[CONFIRM] Parsed body:', { wasAnalyzed, pageCount })
      }
    } catch (parseError) {
      console.log('[CONFIRM] Body parse error (using defaults):', parseError)
      // No body or invalid JSON is fine - defaults apply
    }

    // Update the document status to confirmed and get document details
    const result = await query(
      `UPDATE ${getTableName('Document')}
       SET "uploadStatus" = 'confirmed', "updatedAt" = NOW()
       WHERE id = $1
       RETURNING id, name, "uploadStatus", "personalVaultId", "organizationId", "folderId", "uploadedById"`,
      [documentId]
    )

    if (!result || result.length === 0) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      )
    }

    const document = result[0]
    // Verify the uploadStatus was actually changed to 'confirmed'
    if (document.uploadStatus !== 'confirmed') {
      console.error('[CONFIRM] Upload status not updated correctly:', {
        documentId,
        expectedStatus: 'confirmed',
        actualStatus: document.uploadStatus,
      })
    }
    // Use client-provided pageCount, fallback to 1 (pageCount column doesn't exist in DB yet)
    const actualPageCount = pageCount || 1
    console.log('[CONFIRM] Document confirmed:', {
      documentId,
      name: document.name,
      uploadStatus: document.uploadStatus,
      wasAnalyzed,
      pageCount: actualPageCount,
      folderId: document.folderId || 'root',
    })

    // Increment Processing Units if analysis was performed
    console.log('[CONFIRM] PU tracking check:', {
      wasAnalyzed,
      actualPageCount,
      hasOrgId: !!document.organizationId,
      hasPersonalVaultId: !!document.personalVaultId
    })

    if (wasAnalyzed && actualPageCount > 0) {
      console.log('[CONFIRM] Entering PU tracking block...')
      try {
        let userId: string | undefined
        let newUsage: number | undefined
        let limit: number | undefined

        if (document.organizationId) {
          const result = await incrementOrgProcessingUsage(document.organizationId, actualPageCount)
          const usage = await getOrgProcessingUsage(document.organizationId)
          newUsage = result.newMonthlyTotal
          limit = usage.monthlyLimit
          console.log('[CONFIRM] Incremented org PU:', document.organizationId, actualPageCount)

          // Check for usage alerts - use uploadedById for notifications
          const alertUserId = document.uploadedById || 'system'
          const alertResult = checkUsageAlert(alertUserId, document.organizationId, 'processing', newUsage, limit)
          if (alertResult.shouldAlert && alertResult.alertData) {
            await logUsageAlert(alertResult.alertData)
            await createUsageNotification(alertResult.alertData)
            console.log('[CONFIRM] Triggered usage alert at', alertResult.alertData.threshold + '%')
          }
        } else if (document.personalVaultId) {
          // Get user ID from personal vault
          const vault = await queryOne<{ userId: string }>(
            `SELECT "userId" FROM ${getTableName('PersonalVault')} WHERE id = $1`,
            [document.personalVaultId]
          )
          if (vault?.userId) {
            userId = vault.userId
            const result = await incrementUserProcessingUsage(userId, actualPageCount)
            const usage = await getUserProcessingUsage(userId)
            newUsage = result.newMonthlyTotal
            limit = usage.monthlyLimit
            console.log('[CONFIRM] Incremented user PU:', userId, actualPageCount, 'newTotal:', newUsage)

            // Check for usage alerts
            const alertResult = checkUsageAlert(userId, undefined, 'processing', newUsage, limit)
            if (alertResult.shouldAlert && alertResult.alertData) {
              await logUsageAlert(alertResult.alertData)
              await createUsageNotification(alertResult.alertData)
              console.log('[CONFIRM] Triggered usage alert at', alertResult.alertData.threshold + '%')
            }
          } else {
            console.log('[CONFIRM] Could not find user for personal vault:', document.personalVaultId)
          }
        } else {
          console.log('[CONFIRM] Document has no organizationId or personalVaultId, cannot track PU')
        }
      } catch (puError) {
        console.error('[CONFIRM] Error incrementing PU:', puError)
        // Don't fail the confirm just because PU tracking failed
      }
    }

    return NextResponse.json({
      success: true,
      document: {
        id: document.id,
        name: document.name,
        uploadStatus: document.uploadStatus,
      },
    })
  } catch (error: any) {
    console.error('[CONFIRM] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to confirm document' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/documents/confirm (batch confirm)
 * Can also be called with a body containing documentIds array
 */
