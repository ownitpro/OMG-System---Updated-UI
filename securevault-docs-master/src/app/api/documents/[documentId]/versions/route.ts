import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const { query } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const { documentId } = await params

    // Get all versions for this document
    const versions = await query(
      `SELECT * FROM ${getTableName('DocumentVersion')} WHERE "documentId" = $1 ORDER BY "versionNumber" DESC`,
      [documentId]
    )

    return NextResponse.json({ versions })
  } catch (error: any) {
    console.error('Error in GET /api/documents/[id]/versions:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const { query, queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const { documentId } = await params
    const body = await request.json()
    const { storageKey, size, uploadedById } = body

    if (!storageKey || !size || !uploadedById) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get the current document to find the latest version number
    const document = await queryOne<{ id: string; sizeBytes: number; s3Key: string; uploadedById: string }>(
      `SELECT * FROM ${getTableName('Document')} WHERE id = $1`,
      [documentId]
    )

    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      )
    }

    // Get the latest version number
    const latestVersion = await queryOne<{ versionNumber: number }>(
      `SELECT "versionNumber" FROM ${getTableName('DocumentVersion')} WHERE "documentId" = $1 ORDER BY "versionNumber" DESC LIMIT 1`,
      [documentId]
    )

    const newVersionNumber = latestVersion ? latestVersion.versionNumber + 1 : 1

    // If this is version 1, save the current document as version 0 (original)
    if (newVersionNumber === 1) {
      await query(
        `INSERT INTO ${getTableName('DocumentVersion')} (id, "documentId", "versionNumber", "sizeBytes", "s3Key", "uploadedById") VALUES (gen_random_uuid(), $1, $2, $3, $4, $5)`,
        [documentId, 0, document.sizeBytes, document.s3Key, document.uploadedById]
      )
    }

    // Create new version
    const version = await queryOne(
      `INSERT INTO ${getTableName('DocumentVersion')} (id, "documentId", "versionNumber", "sizeBytes", "s3Key", "uploadedById") VALUES (gen_random_uuid(), $1, $2, $3, $4, $5) RETURNING *`,
      [documentId, newVersionNumber, size, storageKey, uploadedById]
    )

    // Update the main document with the new version's info
    await query(
      `UPDATE ${getTableName('Document')} SET "s3Key" = $1, "sizeBytes" = $2, "updatedAt" = NOW() WHERE id = $3`,
      [storageKey, size, documentId]
    )

    return NextResponse.json({ version }, { status: 201 })
  } catch (error: any) {
    console.error('Error in POST /api/documents/[id]/versions:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
