import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ folderId: string }> }
) {
  try {
    const { query, queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const body = await request.json()
    const { name, parentId } = body
    const { folderId } = await params

    // Build dynamic UPDATE query
    const updates: string[] = []
    const values: any[] = []
    let paramIndex = 1

    if (name !== undefined) {
      updates.push(`name = $${paramIndex++}`)
      values.push(name)
    }

    if (parentId !== undefined) {
      updates.push(`"parentId" = $${paramIndex++}`)
      values.push(parentId)
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }

    updates.push(`"updatedAt" = NOW()`)
    values.push(folderId)

    const folder = await queryOne(
      `UPDATE ${getTableName('Folder')}
       SET ${updates.join(', ')}
       WHERE id = $${paramIndex}
       RETURNING *`,
      values
    )

    return NextResponse.json({ folder })
  } catch (error: any) {
    console.error('Error in PATCH /api/folders/[folderId]:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ folderId: string }> }
) {
  try {
    const { query, queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const { folderId } = await params

    // Check if folder has subfolders
    const subfolders = await query(
      `SELECT id FROM ${getTableName('Folder')} WHERE "parentId" = $1`,
      [folderId]
    )

    if (subfolders && subfolders.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete folder with subfolders. Delete subfolders first.' },
        { status: 400 }
      )
    }

    // Check if folder has documents
    const documents = await query(
      `SELECT id FROM ${getTableName('Document')} WHERE "folderId" = $1`,
      [folderId]
    )

    if (documents && documents.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete folder with documents. Move or delete documents first.' },
        { status: 400 }
      )
    }

    // Delete folder
    await queryOne(
      `DELETE FROM ${getTableName('Folder')} WHERE id = $1 RETURNING id`,
      [folderId]
    )

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error in DELETE /api/folders/[folderId]:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
