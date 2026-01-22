// src/app/api/upload/complete/route.ts
// Called after direct S3 upload completes to create the document record
// AI/Textract analysis is triggered client-side after document creation

import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { getTableName } from '@/lib/db-utils'
import { updateUserStorage } from '@/lib/storage-tracking'
import { mockStorage } from '@/lib/mockStorage'

// Check if mock storage is enabled
const USE_MOCK_STORAGE = process.env.NEXT_PUBLIC_USE_MOCK_STORAGE === 'true'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name,
      mimeType,
      size,
      storageKey,
      personalVaultId,
      organizationId,
      folderId,
      uploadedById,
      tags,
    } = body

    // Validate required fields
    if (!name || mimeType === undefined || mimeType === null || !size || !storageKey || !uploadedById) {
      console.warn('[upload/complete] Missing required fields:', {
        name: !!name,
        mimeType: mimeType !== undefined && mimeType !== null,
        size: !!size,
        storageKey: !!storageKey,
        uploadedById: !!uploadedById
      })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!personalVaultId && !organizationId) {
      return NextResponse.json(
        { error: 'Either personalVaultId or organizationId is required' },
        { status: 400 }
      )
    }

    // Validate UUID formats
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

    if (!uuidRegex.test(uploadedById)) {
      console.warn('[upload/complete] Invalid uploadedById format:', uploadedById)
      return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 })
    }

    if (personalVaultId && !uuidRegex.test(personalVaultId)) {
      console.warn('[upload/complete] Invalid personalVaultId format:', personalVaultId)
      return NextResponse.json({ error: 'Invalid personal vault ID format' }, { status: 400 })
    }

    // Allow both UUID and demo org ID formats
    const demoOrgRegex = /^org_demo(_\w+)?$/
    if (organizationId && !uuidRegex.test(organizationId) && !demoOrgRegex.test(organizationId)) {
      console.warn('[upload/complete] Invalid organizationId format:', organizationId)
      return NextResponse.json({ error: 'Invalid organization ID format' }, { status: 400 })
    }

    if (folderId && !uuidRegex.test(folderId)) {
      console.warn('[upload/complete] Invalid folderId format:', folderId)
      return NextResponse.json({ error: 'Invalid folder ID format' }, { status: 400 })
    }

    // Map mimeType to DocumentType enum
    // Note: Database enum only supports: pdf, image, word, excel, other
    // Video/audio files are stored as 'other' but detected client-side for thumbnails
    let documentType = 'other'
    if (mimeType.includes('pdf')) documentType = 'pdf'
    else if (mimeType.startsWith('image/')) documentType = 'image'
    else if (mimeType.includes('word') || mimeType.includes('document')) documentType = 'word'
    else if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) documentType = 'excel'

    // Check for existing documents with same name and deduplicate
    let finalName = name
    const nameWithoutExt = name.substring(0, name.lastIndexOf('.')) || name
    const extension = name.includes('.') ? name.substring(name.lastIndexOf('.')) : ''

    let existingSql = `SELECT name FROM ${getTableName('Document')} WHERE name LIKE $1`
    const existingParams: any[] = [`${nameWithoutExt}%${extension}`]
    let paramIdx = 2

    if (personalVaultId) {
      existingSql += ` AND "personalVaultId" = $${paramIdx++}`
      existingParams.push(personalVaultId)
    } else {
      existingSql += ` AND "organizationId" = $${paramIdx++}`
      existingParams.push(organizationId)
    }

    if (folderId) {
      existingSql += ` AND "folderId" = $${paramIdx++}`
      existingParams.push(folderId)
    } else {
      existingSql += ` AND "folderId" IS NULL`
    }

    const existingDocs = await query(existingSql, existingParams)

    if (existingDocs && existingDocs.length > 0) {
      const existingNames = existingDocs.map((doc: any) => doc.name)
      let counter = 1

      while (existingNames.includes(finalName)) {
        finalName = `${nameWithoutExt} (${counter})${extension}`
        counter++
      }
    }

    // Get S3 bucket name from environment
    const s3Bucket = process.env.S3_BUCKET || 'securevault-documents'

    // Verify folder exists if folderId is provided
    let verifiedFolderId = folderId || null
    if (folderId && !USE_MOCK_STORAGE) {
      const folder = await queryOne(
        `SELECT id FROM ${getTableName('Folder')} WHERE id = $1`,
        [folderId]
      )

      if (!folder) {
        console.warn('[upload/complete] Folder not found, saving document to root:', folderId)
        verifiedFolderId = null
      }
    }

    // MOCK STORAGE MODE - Create document in memory
    if (USE_MOCK_STORAGE) {
      console.log(`[upload/complete] MOCK MODE - Creating document in memory: ${finalName}`)

      const document = await mockStorage.createDocument({
        name: finalName,
        mimeType,
        size,
        storageKey,
        personalVaultId: personalVaultId || undefined,
        organizationId: organizationId || undefined,
        folderId: verifiedFolderId,
        uploadedById,
        uploadStatus: 'pending',
        tags: tags || [],
      })

      console.log(`[upload/complete] MOCK MODE - Document created: ${document.id} - ${finalName}`)

      return NextResponse.json({
        document,
        documentId: document.id,
        s3Key: storageKey,
      }, { status: 201 })
    }

    // Create document record with 'pending' status (hidden until user confirms)
    const document = await queryOne(
      `INSERT INTO ${getTableName('Document')} (
         id, name, type, "sizeBytes", "s3Key", "s3Bucket",
         "personalVaultId", "organizationId", "folderId",
         "uploadedById", labels, "uploadStatus", "createdAt", "updatedAt"
       )
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending', NOW(), NOW())
       RETURNING *`,
      [
        finalName,
        documentType,
        size,
        storageKey,
        s3Bucket,
        personalVaultId || null,
        organizationId || null,
        verifiedFolderId,
        uploadedById,
        tags || [],
      ]
    )

    if (!document) {
      return NextResponse.json({ error: 'Failed to create document' }, { status: 500 })
    }

    // Update user's storage usage after successful upload
    if (personalVaultId) {
      try {
        await updateUserStorage(uploadedById)
      } catch (storageError) {
        console.error('Error updating storage usage:', storageError)
      }
    }

    console.log(`[upload/complete] Document created: ${(document as any).id} - ${finalName}`)

    return NextResponse.json({
      document,
      documentId: (document as any).id,
      s3Key: storageKey,
    }, { status: 201 })
  } catch (error: any) {
    console.error('[upload/complete] Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
