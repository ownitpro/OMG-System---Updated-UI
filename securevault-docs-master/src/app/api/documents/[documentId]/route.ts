import { NextRequest, NextResponse } from 'next/server'
import { deleteFile } from '@/lib/aws/s3'
import { addToGoldSet, inferCategoryFromPath, inferSubtypeFromPath } from '@/lib/ai/gold-set'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const { query, queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const body = await request.json()
    const { name, folderId, tags } = body
    const { documentId } = await params

    const updates: string[] = []
    const values: unknown[] = []
    let paramIndex = 1

    if (name !== undefined) {
      updates.push(`name = $${paramIndex++}`)
      values.push(name)
    }

    if (folderId !== undefined) {
      // Verify the folder exists before updating (to avoid foreign key constraint violations)
      if (folderId !== null) {
        const folder = await queryOne(
          `SELECT id FROM ${getTableName('Folder')} WHERE id = $1`,
          [folderId]
        )

        if (!folder) {
          console.warn('[PATCH /api/documents] Folder not found, keeping document at current location:', folderId)
          // Don't update folderId if folder doesn't exist - skip silently
          // This handles cases where folder was deleted after AI analysis
        } else {
          updates.push(`"folderId" = $${paramIndex++}`)
          values.push(folderId)
        }
      } else {
        // Allow setting folderId to null (move to root)
        updates.push(`"folderId" = $${paramIndex++}`)
        values.push(null)
      }
    }

    if (tags !== undefined) {
      updates.push(`labels = $${paramIndex++}`)
      values.push(JSON.stringify(tags))
    }

    // Only update if there's something to update
    if (updates.length === 0) {
      // Fetch and return the current document state
      const document = await queryOne(
        `SELECT * FROM ${getTableName('Document')} WHERE id = $1`,
        [documentId]
      )

      if (!document) {
        return NextResponse.json({ error: 'Document not found' }, { status: 404 })
      }

      return NextResponse.json({ document })
    }

    values.push(documentId)
    const document = await queryOne<{
      id: string
      name: string
      folderId: string
      ocrText: string | null
      userId: string
      personalVaultId: string | null
      organizationId: string | null
    }>(
      `UPDATE ${getTableName('Document')} SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    )

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // Phase 4: Learning from user corrections
    // When a document is moved to a folder, add it to the gold set for future classification
    if (folderId !== undefined && folderId !== null && document.ocrText) {
      try {
        // Get the folder path
        const folder = await queryOne<{ id: string; name: string; parentId: string | null }>(
          `SELECT id, name, "parentId" FROM ${getTableName('Folder')} WHERE id = $1`,
          [folderId]
        )

        if (folder) {
          // Build full folder path
          const pathParts: string[] = [folder.name]
          let currentParentId = folder.parentId

          while (currentParentId) {
            const parent = await queryOne<{ id: string; name: string; parentId: string | null }>(
              `SELECT id, name, "parentId" FROM ${getTableName('Folder')} WHERE id = $1`,
              [currentParentId]
            )
            if (parent) {
              pathParts.unshift(parent.name)
              currentParentId = parent.parentId
            } else {
              break
            }
          }

          const folderPath = pathParts.join('/')
          const category = inferCategoryFromPath(folderPath)
          const subtype = inferSubtypeFromPath(folderPath)

          if (category) {
            // Add to gold set (non-blocking)
            addToGoldSet({
              category,
              subtype,
              ocrText: document.ocrText,
              folderPath,
              userId: document.userId,
              organizationId: document.organizationId || undefined,
            }).then(result => {
              if (result) {
                console.log('[LEARNING] Added gold set example from folder move:', {
                  documentId: document.id,
                  category,
                  subtype,
                  folderPath,
                })
              }
            }).catch(err => {
              console.error('[LEARNING] Failed to add gold set example:', err.message)
            })
          }
        }
      } catch (learningError: any) {
        // Don't fail the request if learning fails
        console.error('[LEARNING] Error during learning:', learningError.message)
      }
    }

    return NextResponse.json({ document })
  } catch (error: any) {
    console.error('Error in PATCH /api/documents/[documentId]:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const { query, queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const { documentId } = await params

    console.log('[DELETE /api/documents] Received documentId:', documentId)

    // Validate UUID format - must be a valid UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(documentId)) {
      console.error('[DELETE /api/documents] Invalid document ID format:', documentId)
      return NextResponse.json({ error: 'Invalid document ID format' }, { status: 400 })
    }

    // Get document info
    const document = await queryOne<{ id: string; s3Key: string; personalVaultId: string; organizationId: string; folderId: string }>(
      `SELECT id, "s3Key", "personalVaultId", "organizationId", "folderId" FROM ${getTableName('Document')} WHERE id = $1`,
      [documentId]
    )

    console.log('[DELETE /api/documents] Fetch result:', { document })

    if (!document) {
      console.log('[DELETE /api/documents] Document not found for ID:', documentId)
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // Delete document from database
    await query(
      `DELETE FROM ${getTableName('Document')} WHERE id = $1`,
      [documentId]
    )

    // Delete from S3 storage
    if (document?.s3Key) {
      try {
        await deleteFile(document.s3Key)
      } catch (storageError) {
        console.error('Error deleting from S3:', storageError)
        // Don't fail the request if storage deletion fails
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error in DELETE /api/documents/[documentId]:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
