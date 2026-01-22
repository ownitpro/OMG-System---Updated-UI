import { NextRequest, NextResponse } from 'next/server'

// API endpoint for managing document favorite status
// Toggle favorite status for a document
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const { queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const { documentId } = await params

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(documentId)) {
      return NextResponse.json(
        { error: 'Invalid document ID format' },
        { status: 400 }
      )
    }

    // Get current favorite status
    const document = await queryOne<{ id: string; isFavorite: boolean }>(
      `SELECT id, "isFavorite" FROM ${getTableName('Document')} WHERE id = $1`,
      [documentId]
    )

    if (!document) {
      console.error('[FAVORITE] Document not found')
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      )
    }

    // Toggle the favorite status
    const newFavoriteStatus = !document.isFavorite

    const updatedDocument = await queryOne<{ id: string; name: string; isFavorite: boolean }>(
      `UPDATE ${getTableName('Document')} SET "isFavorite" = $1 WHERE id = $2 RETURNING id, name, "isFavorite"`,
      [newFavoriteStatus, documentId]
    )

    if (!updatedDocument) {
      console.error('[FAVORITE] Error updating favorite status')
      return NextResponse.json(
        { error: 'Failed to update favorite status' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      document: updatedDocument,
      message: newFavoriteStatus ? 'Added to favorites' : 'Removed from favorites'
    })
  } catch (error: any) {
    console.error('[FAVORITE] Error:', error)
    // Check if it's a column not found error - this means the isFavorite column needs to be added
    if (error.message?.includes('column') && error.message?.includes('isFavorite')) {
      console.error('[FAVORITE] The isFavorite column may not exist in the Document table. Run: ALTER TABLE securevault."Document" ADD COLUMN IF NOT EXISTS "isFavorite" BOOLEAN DEFAULT false;')
    }
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// Set favorite status explicitly (true/false)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const { queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const { documentId } = await params
    const body = await request.json()
    const { isFavorite } = body

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(documentId)) {
      return NextResponse.json(
        { error: 'Invalid document ID format' },
        { status: 400 }
      )
    }

    if (typeof isFavorite !== 'boolean') {
      return NextResponse.json(
        { error: 'isFavorite must be a boolean' },
        { status: 400 }
      )
    }

    const updatedDocument = await queryOne<{ id: string; name: string; isFavorite: boolean }>(
      `UPDATE ${getTableName('Document')} SET "isFavorite" = $1 WHERE id = $2 RETURNING id, name, "isFavorite"`,
      [isFavorite, documentId]
    )

    if (!updatedDocument) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      document: updatedDocument,
      message: isFavorite ? 'Added to favorites' : 'Removed from favorites'
    })
  } catch (error: any) {
    console.error('[FAVORITE] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
