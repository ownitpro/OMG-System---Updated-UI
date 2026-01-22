import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ documentId: string; versionId: string }> }
) {
  try {
    const { query, queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const { documentId, versionId } = await params

    // Get the version to restore
    const version = await queryOne<{ id: string; documentId: string; versionNumber: number; sizeBytes: number; s3Key: string; uploadedById: string }>(
      `SELECT * FROM ${getTableName('DocumentVersion')} WHERE id = $1 AND "documentId" = $2`,
      [versionId, documentId]
    )

    if (!version) {
      return NextResponse.json(
        { error: 'Version not found' },
        { status: 404 }
      )
    }

    // Get the current document
    const currentDoc = await queryOne<{ id: string; sizeBytes: number; s3Key: string; uploadedById: string }>(
      `SELECT * FROM ${getTableName('Document')} WHERE id = $1`,
      [documentId]
    )

    if (!currentDoc) {
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

    // Save current state as a new version before restoring
    await query(
      `INSERT INTO ${getTableName('DocumentVersion')} ("documentId", "versionNumber", "sizeBytes", "s3Key", "uploadedById") VALUES ($1, $2, $3, $4, $5)`,
      [documentId, newVersionNumber, currentDoc.sizeBytes, currentDoc.s3Key, currentDoc.uploadedById]
    )

    // Update the main document with the restored version's info
    await query(
      `UPDATE ${getTableName('Document')} SET "s3Key" = $1, "sizeBytes" = $2, "updatedAt" = NOW() WHERE id = $3`,
      [version.s3Key, version.sizeBytes, documentId]
    )

    return NextResponse.json({ success: true, message: 'Version restored successfully' })
  } catch (error: any) {
    console.error('Error in POST /api/documents/[id]/versions/[versionId]/restore:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
