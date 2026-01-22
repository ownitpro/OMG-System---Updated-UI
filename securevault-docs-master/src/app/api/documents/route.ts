// src/app/api/documents/route.ts
// Document CRUD operations - Aurora PostgreSQL only

import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { getTableName } from '@/lib/db-utils'
import { checkStorageLimit, updateUserStorage } from '@/lib/storage-tracking'
import { getPlanLimits } from '@/lib/plan-limits'
import { mockStorage } from '@/lib/mockStorage'

// Enable mock mode for development (set to false to use real DB)
const USE_MOCK_STORAGE = process.env.NEXT_PUBLIC_USE_MOCK_STORAGE === 'true'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const personalVaultId = searchParams.get('personalVaultId')
    const organizationId = searchParams.get('organizationId')
    const folderId = searchParams.get('folderId')
    const rootOnly = searchParams.get('rootOnly') === 'true'
    const recursive = searchParams.get('recursive') === 'true'

    if (!personalVaultId && !organizationId) {
      return NextResponse.json(
        { error: 'Either personalVaultId or organizationId is required' },
        { status: 400 }
      )
    }

    // Use mock storage in development mode
    if (USE_MOCK_STORAGE) {
      const documents = await mockStorage.getDocuments({
        personalVaultId: personalVaultId || undefined,
        organizationId: organizationId || undefined,
        folderId: folderId || (rootOnly ? null : undefined),
        rootOnly
      })
      console.log('[GET /api/documents] MOCK MODE - Returning', documents.length, 'documents')
      return NextResponse.json({ documents })
    }

    let sql = `SELECT * FROM ${getTableName('Document')} WHERE `
    const params: any[] = []
    let paramIndex = 1

    if (personalVaultId) {
      sql += `"personalVaultId" = $${paramIndex++}`
      params.push(personalVaultId)
    } else if (organizationId) {
      sql += `"organizationId" = $${paramIndex++}`
      params.push(organizationId)
    }

    // When recursive=true, fetch ALL documents in the vault (for search functionality)
    // Otherwise, filter by specific folder or root only
    if (!recursive) {
      if (folderId) {
        sql += ` AND "folderId" = $${paramIndex++}`
        params.push(folderId)
      } else if (rootOnly) {
        sql += ` AND "folderId" IS NULL`
      }
    }

    // Filter out pending documents (only show confirmed or legacy docs without status)
    sql += ` AND ("uploadStatus" = 'confirmed' OR "uploadStatus" IS NULL)`

    sql += ` ORDER BY "createdAt" DESC`

    const documents = await query(sql, params)

    console.log('[GET /api/documents] Returning', documents?.length || 0, 'documents', recursive ? '(recursive)' : '')

    return NextResponse.json({ documents })
  } catch (error: any) {
    console.error('Error in GET /api/documents:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
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
      expiresAt, // Optional: AI-detected expiration date (YYYY-MM-DD format)
    } = body

    // Note: mimeType can be empty string for some file types (e.g., .md files)
    // so we only check for undefined/null, not falsy empty string
    if (!name || mimeType === undefined || mimeType === null || !size || !storageKey || !uploadedById) {
      console.warn('[POST /api/documents] Missing required fields:', {
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

    // Use mock storage in development mode
    if (USE_MOCK_STORAGE) {
      const document = await mockStorage.createDocument({
        name,
        mimeType,
        size,
        storageKey,
        personalVaultId,
        organizationId,
        folderId: folderId || null,
        uploadedById,
        uploadStatus: 'confirmed',
        tags,
        expiresAt: expiresAt || null
      })
      console.log('[POST /api/documents] MOCK MODE - Created document:', document.name)
      return NextResponse.json({
        documentId: document.id,
        s3Key: storageKey
      })
    }

    // Validate UUID formats to prevent database errors and catch corrupted sessions
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

    if (!uuidRegex.test(uploadedById)) {
      console.warn('[POST /api/documents] Invalid uploadedById format:', uploadedById)
      return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 })
    }

    if (personalVaultId && !uuidRegex.test(personalVaultId)) {
      console.warn('[POST /api/documents] Invalid personalVaultId format:', personalVaultId)
      return NextResponse.json({ error: 'Invalid personal vault ID format' }, { status: 400 })
    }

    if (organizationId && !uuidRegex.test(organizationId)) {
      console.warn('[POST /api/documents] Invalid organizationId format:', organizationId)
      return NextResponse.json({ error: 'Invalid organization ID format' }, { status: 400 })
    }

    if (folderId && !uuidRegex.test(folderId)) {
      console.warn('[POST /api/documents] Invalid folderId format:', folderId)
      return NextResponse.json({ error: 'Invalid folder ID format' }, { status: 400 })
    }

    // Enforce storage limits for personal vaults only
    if (personalVaultId) {
      // Check if user exists (only query columns that exist in the schema)
      const user = await queryOne<{ id: string }>(
        `SELECT id FROM ${getTableName('User')} WHERE id = $1`,
        [uploadedById]
      )

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      // Get plan from Subscription table (trialExpiresAt would also be here if needed)
      let plan = 'free'
      try {
        const subscription = await queryOne<{ plan: string; status: string }>(
          `SELECT plan, status FROM ${getTableName('Subscription')} WHERE "userId" = $1 AND "appId" = 'app_securevault'`,
          [uploadedById]
        )
        if (subscription?.plan) {
          plan = subscription.plan
        }
        // Check if subscription is expired/cancelled
        if (subscription?.status === 'expired' || subscription?.status === 'cancelled') {
          return NextResponse.json(
            {
              error: 'Your subscription has expired. Please upgrade to continue uploading files.',
              code: 'SUBSCRIPTION_EXPIRED',
            },
            { status: 402 }
          )
        }
      } catch (subError) {
        // Subscription table might not exist - use default free plan
        console.log('Could not query Subscription table, using free plan')
      }
      const limits = getPlanLimits(plan)
      const storageCheck = await checkStorageLimit(user.id, size, limits.storageGb)

      if (!storageCheck.allowed) {
        return NextResponse.json(
          {
            error: `This upload would exceed your ${limits.storageGb} GB storage limit. You're currently using ${storageCheck.currentGb.toFixed(2)} GB.`,
            code: 'STORAGE_LIMIT_EXCEEDED',
            currentGb: storageCheck.currentGb,
            limitGb: limits.storageGb,
            fileGb: size / (1024 * 1024 * 1024),
          },
          { status: 402 }
        )
      }
    }

    // Map mimeType to DocumentType enum
    // Note: Database enum only supports: pdf, image, word, excel, other
    // Video/audio files are stored as 'other' but detected client-side for thumbnails
    let documentType = 'other'
    if (mimeType.includes('pdf')) documentType = 'pdf'
    else if (mimeType.startsWith('image/')) documentType = 'image'
    else if (mimeType.includes('word') || mimeType.includes('document')) documentType = 'word'
    else if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) documentType = 'excel'

    // Check for existing documents with the same name and deduplicate
    let finalName = name
    const nameWithoutExt = name.substring(0, name.lastIndexOf('.')) || name
    const extension = name.includes('.') ? name.substring(name.lastIndexOf('.')) : ''

    // Query for existing documents with similar names
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
    if (folderId) {
      const folder = await queryOne(
        `SELECT id FROM ${getTableName('Folder')} WHERE id = $1`,
        [folderId]
      )

      if (!folder) {
        console.warn('[POST /api/documents] Folder not found, saving document to root:', folderId)
        verifiedFolderId = null
      }
    }

    // Parse expiresAt if provided (expecting YYYY-MM-DD format)
    let parsedExpiresAt = null
    if (expiresAt) {
      try {
        parsedExpiresAt = new Date(expiresAt).toISOString()
      } catch (e) {
        console.warn('[POST /api/documents] Invalid expiresAt format:', expiresAt)
      }
    }

    // Create document with 'pending' status (hidden until user confirms)
    const document = await queryOne(
      `INSERT INTO ${getTableName('Document')} (
         id, name, type, "sizeBytes", "s3Key", "s3Bucket",
         "personalVaultId", "organizationId", "folderId",
         "uploadedById", labels, "expiresAt", "uploadStatus", "createdAt", "updatedAt"
       )
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'pending', NOW(), NOW())
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
        parsedExpiresAt,
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

    return NextResponse.json({ document }, { status: 201 })
  } catch (error: any) {
    console.error('Error in POST /api/documents:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
