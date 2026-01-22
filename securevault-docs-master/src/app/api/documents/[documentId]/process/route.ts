// POST /api/documents/[documentId]/process
// Process a Quick Store document (run OCR + AI analysis)
// Called when user clicks "Process Now" on an unprocessed document

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { query, queryOne } from '@/lib/db'
import { getTableName } from '@/lib/db-utils'
import { getUserPlan } from '@/lib/plan-utils-server'
import {
  checkUserProcessingLimit,
  checkOrgProcessingLimit,
  incrementUserProcessingUsage,
  incrementOrgProcessingUsage,
} from '@/lib/processing-tracking'
import { checkPdfPageLimit } from '@/lib/enforcement-middleware'
import {
  checkUsageAlert,
  logUsageAlert,
  createUsageNotification,
  getAlertMessage,
} from '@/lib/services/usage-alert-service'
import {
  shouldAutoTopUp,
  getAutoTopUpSettings,
  executeAutoTopUp,
} from '@/lib/services/auto-topup-service'

interface RouteContext {
  params: Promise<{ documentId: string }>
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const { documentId } = await context.params
    const docTable = getTableName('Document')

    // Get the document
    const document = await queryOne<{
      id: string
      userId: string
      orgId?: string
      name: string
      quickStore: boolean
      pageCount?: number
      s3Key: string
      type: string
    }>(
      `SELECT id, "userId", "orgId", name, "quickStore", "pageCount", "s3Key", type
       FROM ${docTable}
       WHERE id = $1`,
      [documentId]
    )

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // Verify ownership
    if (document.userId !== userId) {
      // Check if user is in the same org
      if (!document.orgId) {
        return NextResponse.json({ error: 'Access denied' }, { status: 403 })
      }
      // TODO: Check org membership
    }

    // Check if document is actually Quick Store
    if (!document.quickStore) {
      return NextResponse.json(
        { error: 'Document is already processed' },
        { status: 400 }
      )
    }

    // Get page count (estimate 1 if not known)
    const pageCount = document.pageCount || 1

    // Get user's plan
    const plan = await getUserPlan(userId)

    // Check PDF page limit
    const pdfCheck = checkPdfPageLimit(pageCount, plan)
    if (!pdfCheck.allowed) {
      return NextResponse.json(
        {
          error: `PDF exceeds your plan's page limit. Upgrade your plan to process larger documents.`,
          pageCount,
          limit: pdfCheck.shouldQuickStore ? 'exceeded' : 'unknown',
        },
        { status: 400 }
      )
    }

    // Check processing limits
    let limitCheck
    if (document.orgId) {
      limitCheck = await checkOrgProcessingLimit(document.orgId, pageCount, plan)
    } else {
      limitCheck = await checkUserProcessingLimit(userId, pageCount, plan)
    }

    if (!limitCheck.allowed) {
      // Check if auto top-up can help
      if (limitCheck.reason === 'monthly_limit' && !document.orgId) {
        const settings = await getAutoTopUpSettings(userId)
        if (shouldAutoTopUp(limitCheck.currentUsage / limitCheck.limit * 100, settings)) {
          const topUpResult = await executeAutoTopUp(userId, document.orgId)
          if (topUpResult.success) {
            // Retry the check after top-up
            limitCheck = await checkUserProcessingLimit(userId, pageCount, plan)
          }
        }
      }

      if (!limitCheck.allowed) {
        return NextResponse.json(
          {
            error: limitCheck.reason === 'daily_limit'
              ? 'Daily processing limit reached. Try again tomorrow.'
              : 'Monthly processing limit reached. Upgrade your plan or wait for next billing cycle.',
            currentUsage: limitCheck.currentUsage,
            limit: limitCheck.limit,
            reason: limitCheck.reason,
          },
          { status: 429 }
        )
      }
    }

    // Increment processing usage
    if (document.orgId) {
      await incrementOrgProcessingUsage(document.orgId, pageCount)
    } else {
      await incrementUserProcessingUsage(userId, pageCount)
    }

    // Update document - mark as no longer Quick Store
    await query(
      `UPDATE ${docTable}
       SET "quickStore" = false, "updatedAt" = NOW()
       WHERE id = $1`,
      [documentId]
    )

    // Queue the document for AI processing
    // In a real implementation, this would trigger the analysis pipeline
    // For now, we'll call the analyze endpoint logic inline or via a queue

    // Check for usage alerts
    const newUsage = limitCheck.currentUsage + pageCount
    const percentage = (newUsage / limitCheck.limit) * 100
    const alertResult = checkUsageAlert(
      userId,
      document.orgId,
      'processing',
      newUsage,
      limitCheck.limit
    )

    if (alertResult.shouldAlert && alertResult.alertData) {
      // Log and notify
      await logUsageAlert(alertResult.alertData)
      await createUsageNotification(alertResult.alertData)
    }

    return NextResponse.json({
      success: true,
      message: 'Document queued for processing',
      documentId,
      pageCount,
      processingUnitsUsed: pageCount,
      remainingUnits: limitCheck.limit - newUsage,
    })
  } catch (error: any) {
    console.error('[ProcessDocument] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process document' },
      { status: 500 }
    )
  }
}
