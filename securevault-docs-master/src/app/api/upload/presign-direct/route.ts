// src/app/api/upload/presign-direct/route.ts
// Direct S3 upload - generates presigned URL for browser-to-S3 uploads
// Supports files up to 5GB (single PUT) or larger with multipart

import { NextRequest, NextResponse } from 'next/server'
import { presignPutObject, generateS3Key } from '@/lib/aws/s3'
import { checkStorageLimit } from '@/lib/storage-tracking'
import { getPlanLimits } from '@/lib/plan-limits'

// Maximum file size for single PUT upload (5GB)
const MAX_SINGLE_UPLOAD_SIZE = 5 * 1024 * 1024 * 1024

export async function POST(req: NextRequest) {
  try {
    const { queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const body = await req.json()
    const {
      name,
      type,
      size,
      userId,
      personalVaultId,
      organizationId
    } = body

    // Validate required fields
    if (!name || type === undefined || type === null) {
      return NextResponse.json(
        { error: 'Missing required fields: name, type' },
        { status: 400 }
      )
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized - userId required' },
        { status: 401 }
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
    if (!uuidRegex.test(userId)) {
      console.warn('[presign-direct] Invalid user ID format:', userId)
      return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 })
    }

    if (personalVaultId && !uuidRegex.test(personalVaultId)) {
      return NextResponse.json({ error: 'Invalid personal vault ID format' }, { status: 400 })
    }

    // Allow both UUID and demo org ID formats for organizationId
    const demoOrgRegex = /^org_demo(_\w+)?$/
    if (organizationId && !uuidRegex.test(organizationId) && !demoOrgRegex.test(organizationId)) {
      return NextResponse.json({ error: 'Invalid organization ID format' }, { status: 400 })
    }

    // Check file size limit for single PUT
    if (size && size > MAX_SINGLE_UPLOAD_SIZE) {
      return NextResponse.json(
        {
          error: `File size exceeds 5GB limit for single upload. Please use multipart upload for larger files.`,
          code: 'FILE_TOO_LARGE',
          maxSize: MAX_SINGLE_UPLOAD_SIZE
        },
        { status: 400 }
      )
    }

    // Verify user exists
    const user = await queryOne<{ id: string }>(
      `SELECT id FROM ${getTableName('User')} WHERE id = $1`,
      [userId]
    )

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized - user not found' }, { status: 401 })
    }

    // Check storage limits for personal vaults
    if (personalVaultId && size) {
      // Get user's plan
      let plan = 'free'
      try {
        const subscription = await queryOne<{ plan: string; status: string }>(
          `SELECT plan, status FROM ${getTableName('Subscription')} WHERE "userId" = $1 AND "appId" = 'app_securevault'`,
          [userId]
        )
        if (subscription?.plan) {
          plan = subscription.plan
        }
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
        console.log('Could not query Subscription table, using free plan')
      }

      const limits = getPlanLimits(plan)
      const storageCheck = await checkStorageLimit(userId, size, limits.storageGb)

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

    // Generate S3 key based on vault type
    const prefix = organizationId
      ? `org/${organizationId}`
      : `personal/${userId}`
    const key = generateS3Key(prefix, name)

    // Generate presigned URL (valid for 1 hour for large uploads)
    const expiresIn = size && size > 100 * 1024 * 1024 ? 3600 : 900 // 1 hour for >100MB, 15 min otherwise
    const presignResult = await presignPutObject(key, type || 'application/octet-stream', expiresIn)

    console.log(`[presign-direct] Generated presigned URL for ${name} (${size} bytes), key: ${key}`)

    return NextResponse.json({
      url: presignResult.url,
      key,
      headers: presignResult.headers,
      expiresIn,
      mock: presignResult.mock || false,
    })
  } catch (error: any) {
    console.error('[presign-direct] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate upload URL' },
      { status: 500 }
    )
  }
}
