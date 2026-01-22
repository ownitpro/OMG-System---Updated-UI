import { NextRequest, NextResponse } from 'next/server'
import { expirationService } from '@/lib/services/expiration-service'

/**
 * GET /api/documents/[documentId]/expiration
 * Get expiration tracking info for a document
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const { queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const { documentId } = await params

    // Try to get full document info with expiration fields
    try {
      const document = await queryOne<{
        id: string
        name: string
        expirationDate: string | null
        expirationTrackingEnabled: boolean | null
        extractedMetadata: any
      }>(
        `SELECT id, name, "expirationDate", "expirationTrackingEnabled", "extractedMetadata" FROM ${getTableName('Document')} WHERE id = $1`,
        [documentId]
      )

      if (!document) {
        return NextResponse.json({ error: 'Document not found' }, { status: 404 })
      }

      return NextResponse.json({
        documentId: document.id,
        name: document.name,
        expirationDate: document.expirationDate,
        trackingEnabled: document.expirationTrackingEnabled,
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

        // Return with null expiration fields (migration not applied)
        return NextResponse.json({
          documentId: basicDoc.id,
          name: basicDoc.name,
          expirationDate: null,
          trackingEnabled: null,
          metadata: null,
          migrationRequired: true,
        })
      }
      throw err
    }
  } catch (error: any) {
    console.error('Error in GET /api/documents/[documentId]/expiration:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

/**
 * PATCH /api/documents/[documentId]/expiration
 * Toggle expiration tracking or update expiration date
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const { documentId } = await params
    const body = await request.json()
    const { trackingEnabled, expirationDate, userId } = body

    // If toggling tracking
    if (trackingEnabled !== undefined) {
      const result = await expirationService.toggleTracking(
        documentId,
        trackingEnabled,
        userId
      )

      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 })
      }

      return NextResponse.json({ success: true, trackingEnabled })
    }

    // If updating expiration date
    if (expirationDate !== undefined) {
      const result = await expirationService.saveExpirationData(
        documentId,
        expirationDate,
        userId,
        true
      )

      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 })
      }

      return NextResponse.json({ success: true, expirationDate })
    }

    return NextResponse.json({ error: 'No valid update provided' }, { status: 400 })
  } catch (error: any) {
    console.error('Error in PATCH /api/documents/[documentId]/expiration:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
