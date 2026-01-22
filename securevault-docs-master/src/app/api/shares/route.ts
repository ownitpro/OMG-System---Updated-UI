// src/app/api/shares/route.ts
// Share links CRUD operations - Aurora PostgreSQL only

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { query, queryOne } from '@/lib/db'
import { getTableName } from '@/lib/db-utils'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const orgId = searchParams.get('organizationId') || searchParams.get('personalVaultId')

    if (!orgId) {
      return NextResponse.json(
        { error: 'Organization ID or Personal Vault ID required' },
        { status: 400 }
      )
    }

    const personalVaultId = searchParams.get('personalVaultId')

    // Get all share links with document info
    const filterColumn = personalVaultId ? '"personalVaultId"' : '"organizationId"'

    const shareLinks = await query(
      `SELECT
         s.id,
         s.token,
         s.pin,
         s."expiresAt",
         s."maxDownloads",
         s."downloadCount",
         s."createdAt",
         d.id as doc_id,
         d.name as doc_name,
         d."sizeBytes" as doc_size,
         d."organizationId",
         d."personalVaultId"
       FROM ${getTableName('ShareLink')} s
       JOIN ${getTableName('Document')} d ON d.id = s."documentId"
       WHERE d.${filterColumn} = $1`,
      [orgId]
    )

    // Transform to expected format
    const shares = (shareLinks || []).map((link: any) => ({
      token: link.token,
      orgId,
      label: link.doc_name,
      allowDownload: true,
      pin: link.pin,
      expiresAt: link.expiresAt,
      docs: [{
        id: link.doc_id,
        name: link.doc_name,
        sizeKB: Math.round(link.doc_size / 1024),
      }],
    }))

    return NextResponse.json({
      success: true,
      shares,
    })
  } catch (error) {
    console.error('Error fetching shares:', error)
    return NextResponse.json(
      { error: 'Failed to fetch shares' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { label, expiresAt, pin, allowDownload, documentIds, organizationId, personalVaultId } = body

    // Validate required fields
    if (!label || !expiresAt || !documentIds || !documentIds.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!organizationId && !personalVaultId) {
      return NextResponse.json(
        { error: 'Organization ID or Personal Vault ID required' },
        { status: 400 }
      )
    }

    // Get user from NextAuth session
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id || req.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch document details
    const filterColumn = personalVaultId ? '"personalVaultId"' : '"organizationId"'
    const filterValue = personalVaultId || organizationId

    // Build IN clause
    const placeholders = documentIds.map((_: string, i: number) => `$${i + 2}`).join(', ')

    const documents = await query(
      `SELECT id, name, "sizeBytes" FROM ${getTableName('Document')}
       WHERE ${filterColumn} = $1 AND id IN (${placeholders})`,
      [filterValue, ...documentIds]
    )

    if (!documents || documents.length === 0) {
      return NextResponse.json({ error: 'No documents found' }, { status: 404 })
    }

    // Create share links for each document
    const token = Math.random().toString(36).substring(2, 15) +
                  Math.random().toString(36).substring(2, 15)

    const shareLinks = []

    for (const doc of documents) {
      const shareLink = await queryOne(
        `INSERT INTO ${getTableName('ShareLink')} (
           id, token, "documentId", "createdById", pin, "expiresAt", "maxDownloads", "downloadCount", "createdAt"
         )
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NULL, 0, NOW())
         RETURNING *`,
        [
          documents.length === 1 ? token : `${token}_${doc.id}`,
          doc.id,
          userId,
          pin || null,
          expiresAt || null,
        ]
      )

      shareLinks.push(shareLink)
    }

    const selectedDocs = documents.map((doc: any) => ({
      id: doc.id,
      name: doc.name,
      sizeKB: Math.round(doc.sizeBytes / 1024),
    }))

    const share = {
      token,
      orgId: organizationId || personalVaultId || '',
      label,
      allowDownload,
      pin: pin || null,
      expiresAt,
      docs: selectedDocs,
    }

    // Use NEXT_PUBLIC_APP_URL for the share URL to ensure correct domain in production
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(req.url).origin;
    const shareUrl = `${baseUrl}/s/${token}`

    return NextResponse.json({
      success: true,
      token,
      shareUrl,
      share,
    })
  } catch (error) {
    console.error('Error creating share:', error)
    return NextResponse.json(
      { error: 'Failed to create share link' },
      { status: 500 }
    )
  }
}
