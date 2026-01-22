import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/documents/[documentId]/due-date
 * Get due date tracking info for a document
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const { queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const { documentId } = await params

    // Try to get full document info with due date fields
    try {
      const document = await queryOne<{
        id: string
        name: string
        dueDate: string | null
        dueDateTrackingEnabled: boolean | null
        extractedMetadata: any
      }>(
        `SELECT id, name, "dueDate", "dueDateTrackingEnabled", "extractedMetadata" FROM ${getTableName('Document')} WHERE id = $1`,
        [documentId]
      )

      if (!document) {
        return NextResponse.json({ error: 'Document not found' }, { status: 404 })
      }

      return NextResponse.json({
        documentId: document.id,
        name: document.name,
        dueDate: document.dueDate,
        trackingEnabled: document.dueDateTrackingEnabled,
        metadata: document.extractedMetadata,
      })
    } catch (err: any) {
      // If columns don't exist, return null values gracefully
      if (err.message?.includes('column') || err.code === '42703') {
        // Try to get just the basic document info
        const basicDoc = await queryOne<{ id: string; name: string }>(
          `SELECT id, name FROM ${getTableName('Document')} WHERE id = $1`,
          [documentId]
        )

        if (!basicDoc) {
          return NextResponse.json({ error: 'Document not found' }, { status: 404 })
        }

        // Return with null due date fields (migration not applied)
        return NextResponse.json({
          documentId: basicDoc.id,
          name: basicDoc.name,
          dueDate: null,
          trackingEnabled: null,
          metadata: null,
          migrationRequired: true,
        })
      }
      throw err
    }
  } catch (error: any) {
    console.error('Error in GET /api/documents/[documentId]/due-date:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

/**
 * PATCH /api/documents/[documentId]/due-date
 * Toggle due date tracking or update due date
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const { query, queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const { documentId } = await params
    const body = await request.json()
    const { trackingEnabled, dueDate, userId } = body

    // Verify document exists
    const document = await queryOne<{ id: string }>(
      `SELECT id FROM ${getTableName('Document')} WHERE id = $1`,
      [documentId]
    )

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // If toggling tracking
    if (trackingEnabled !== undefined) {
      try {
        await query(
          `UPDATE ${getTableName('Document')} SET "dueDateTrackingEnabled" = $1 WHERE id = $2`,
          [trackingEnabled, documentId]
        )

        console.log(`[DUE-DATE] Tracking ${trackingEnabled ? 'enabled' : 'disabled'} for document ${documentId}`)

        return NextResponse.json({ success: true, trackingEnabled })
      } catch (err: any) {
        // If column doesn't exist, return gracefully
        if (err.message?.includes('column') || err.code === '42703') {
          return NextResponse.json({
            success: false,
            error: 'Due date tracking not available. Database migration required.',
            migrationRequired: true,
          }, { status: 400 })
        }
        throw err
      }
    }

    // If updating due date
    if (dueDate !== undefined) {
      try {
        await query(
          `UPDATE ${getTableName('Document')} SET "dueDate" = $1, "dueDateTrackingEnabled" = true WHERE id = $2`,
          [dueDate, documentId]
        )

        console.log(`[DUE-DATE] Due date updated to ${dueDate} for document ${documentId}`)

        // Schedule due date notifications if userId is provided and dueDate is set
        if (dueDate && userId) {
          try {
            const { expirationService } = await import('@/lib/services/expiration-service')
            await expirationService.scheduleDueDateNotifications(documentId, new Date(dueDate), userId)
            console.log(`[DUE-DATE] Scheduled notifications for document ${documentId}`)
          } catch (scheduleError) {
            console.error(`[DUE-DATE] Failed to schedule notifications:`, scheduleError)
            // Don't fail the request if notification scheduling fails
          }
        }

        return NextResponse.json({ success: true, dueDate })
      } catch (err: any) {
        // If column doesn't exist, return gracefully
        if (err.message?.includes('column') || err.code === '42703') {
          return NextResponse.json({
            success: false,
            error: 'Due date field not available. Database migration required.',
            migrationRequired: true,
          }, { status: 400 })
        }
        throw err
      }
    }

    return NextResponse.json({ error: 'No valid update provided' }, { status: 400 })
  } catch (error: any) {
    console.error('Error in PATCH /api/documents/[documentId]/due-date:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
