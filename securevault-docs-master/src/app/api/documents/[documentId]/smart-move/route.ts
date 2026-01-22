import { NextRequest, NextResponse } from 'next/server'
import { smartGetOrCreateFolder } from '@/lib/ocr/auto-folder-creator'
import { addToGoldSet, inferCategoryFromPath, inferSubtypeFromPath } from '@/lib/ai/gold-set'
import type { VaultContext } from '@/types/ocr'

/**
 * POST /api/documents/[documentId]/smart-move
 * Move a document to a folder using smart matching
 *
 * This endpoint:
 * 1. Takes a suggested folder path from AI analysis
 * 2. Uses smart matching to find the best existing folder or create a new one
 * 3. Moves the document to that folder
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const { query, queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const { documentId } = await params
    const body = await request.json()
    const {
      suggestedPath,
      vaultContext,
      personalVaultId,
      organizationId,
    } = body

    // Validate required fields
    if (!suggestedPath || !Array.isArray(suggestedPath) || suggestedPath.length === 0) {
      return NextResponse.json(
        { error: 'suggestedPath is required and must be a non-empty array' },
        { status: 400 }
      )
    }

    if (!vaultContext || !['personal', 'organization'].includes(vaultContext)) {
      return NextResponse.json(
        { error: 'vaultContext must be "personal" or "organization"' },
        { status: 400 }
      )
    }

    if (vaultContext === 'personal' && !personalVaultId) {
      return NextResponse.json(
        { error: 'personalVaultId is required for personal vault context' },
        { status: 400 }
      )
    }

    if (vaultContext === 'organization' && !organizationId) {
      return NextResponse.json(
        { error: 'organizationId is required for organization vault context' },
        { status: 400 }
      )
    }

    console.log('[SMART-MOVE] Moving document:', documentId, 'to path:', suggestedPath.join('/'))

    // Verify document exists (include ocrText for learning)
    const document = await queryOne<{
      id: string
      name: string
      folderId: string
      ocrText: string | null
      uploadedById: string
    }>(
      `SELECT id, name, "folderId", "ocrText", "uploadedById" FROM ${getTableName('Document')} WHERE id = $1`,
      [documentId]
    )

    if (!document) {
      console.error('[SMART-MOVE] Document not found')
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      )
    }

    // Use smart matching to find or create the folder
    const { folder, matchResult } = await smartGetOrCreateFolder(
      suggestedPath,
      {
        vaultContext: vaultContext as VaultContext,
        personalVaultId,
        organizationId,
      }
    )

    console.log('[SMART-MOVE] Smart match result:', {
      matched: matchResult.matched,
      matchType: matchResult.matchType,
      confidence: matchResult.confidence,
      folderId: folder.id,
      folderPath: folder.path,
      created: folder.created,
    })

    // Update document's folder and verify it worked
    const updateResult = await query(
      `UPDATE ${getTableName('Document')} SET "folderId" = $1 WHERE id = $2 RETURNING id, "folderId"`,
      [folder.id, documentId]
    )

    if (!updateResult || updateResult.length === 0) {
      console.error('[SMART-MOVE] Failed to update document folderId - no rows affected:', { documentId, folderId: folder.id })
      return NextResponse.json(
        { error: 'Failed to update document folder' },
        { status: 500 }
      )
    }

    console.log('[SMART-MOVE] Document moved successfully:', {
      documentId,
      folderId: folder.id,
      verified: (updateResult[0] as any).folderId === folder.id,
    })

    // Phase 4: Learning from user corrections
    // When a document is smart-moved, add to gold set for future classification
    if (document.ocrText && folder.path) {
      try {
        const category = inferCategoryFromPath(folder.path)
        const subtype = inferSubtypeFromPath(folder.path)

        if (category) {
          // Add to gold set (non-blocking)
          addToGoldSet({
            category,
            subtype,
            ocrText: document.ocrText,
            folderPath: folder.path,
            userId: document.uploadedById,
            organizationId: organizationId || undefined,
          }).then(result => {
            if (result) {
              console.log('[LEARNING] Added gold set example from smart-move:', {
                documentId: document.id,
                category,
                subtype,
                folderPath: folder.path,
              })
            }
          }).catch(err => {
            console.error('[LEARNING] Failed to add gold set example:', err.message)
          })
        }
      } catch (learningError: any) {
        // Don't fail the request if learning fails
        console.error('[LEARNING] Error during learning:', learningError.message)
      }
    }

    return NextResponse.json({
      success: true,
      document: {
        id: documentId,
        folderId: folder.id,
      },
      folder: {
        id: folder.id,
        name: folder.name,
        path: folder.path,
        created: folder.created,
      },
      matchResult: {
        matched: matchResult.matched,
        matchType: matchResult.matchType,
        confidence: matchResult.confidence,
      },
    })
  } catch (error: any) {
    console.error('[SMART-MOVE] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Smart move failed' },
      { status: 500 }
    )
  }
}
