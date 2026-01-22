import { NextRequest, NextResponse } from 'next/server'

/**
 * PATCH /api/documents/[documentId]/rename
 * Rename a document
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const { queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const { documentId } = await params
    const body = await request.json()
    const { name } = body

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    // Sanitize name
    const sanitizedName = name
      .trim()
      .replace(/[\/\\:*?"<>|]/g, '') // Remove invalid chars
      .slice(0, 255)

    if (sanitizedName.length === 0) {
      return NextResponse.json({ error: 'Name cannot be empty' }, { status: 400 })
    }

    const document = await queryOne<{ id: string; name: string }>(
      `UPDATE ${getTableName('Document')} SET name = $1 WHERE id = $2 RETURNING id, name`,
      [sanitizedName, documentId]
    )

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, document })
  } catch (error: any) {
    console.error('Error in PATCH /api/documents/[documentId]/rename:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
