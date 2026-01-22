// src/app/api/user/profile/image/route.ts
// Profile image upload API

import { NextRequest, NextResponse } from 'next/server'
import { queryOne } from '@/lib/db'
import { getTableName } from '@/lib/db-utils'
import { presignPutObject, presignGetObject, uploadFile, deleteFile } from '@/lib/aws/s3'
import { randomUUID } from 'crypto'

// Route segment config - increase body size limit for base64 image data
export const maxDuration = 30 // Allow up to 30 seconds for upload

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

/**
 * POST /api/user/profile/image
 * Generate presigned URL for profile image upload
 */
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { contentType, fileName } = body

    if (!contentType || !ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed types: JPEG, PNG, WebP, GIF' },
        { status: 400 }
      )
    }

    // Generate unique S3 key for profile image
    const ext = contentType.split('/')[1]
    const key = `profile-images/${userId}/${randomUUID()}.${ext}`

    // Generate presigned URL for upload
    const presign = await presignPutObject(key, contentType, 900) // 15 minutes

    return NextResponse.json({
      uploadUrl: presign.url,
      key,
      headers: presign.headers,
    })

  } catch (error: any) {
    console.error('Error in POST /api/user/profile/image:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

/**
 * PUT /api/user/profile/image
 * Confirm upload and update user's image field
 * Accepts either FormData with file or JSON with dataUrl
 */
export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let finalKey: string | null = null
    const contentType = request.headers.get('content-type') || ''

    // Handle FormData upload (preferred method)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      const file = formData.get('file') as File | null

      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 })
      }

      console.log('Received file:', { name: file.name, type: file.type, size: file.size })

      // Determine file type from file.type or infer from filename
      let fileType = file.type
      if (!fileType || !ALLOWED_TYPES.includes(fileType)) {
        // Try to infer from filename extension
        const extMatch = file.name.match(/\.(jpe?g|png|webp|gif)$/i)
        if (extMatch) {
          const extToMime: Record<string, string> = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'webp': 'image/webp',
            'gif': 'image/gif',
          }
          fileType = extToMime[extMatch[1].toLowerCase()] || ''
        }
      }

      // Validate file type
      if (!fileType || !ALLOWED_TYPES.includes(fileType)) {
        console.error('Invalid file type:', { receivedType: file.type, inferredType: fileType })
        return NextResponse.json(
          { error: 'Invalid file type. Allowed types: JPEG, PNG, WebP, GIF' },
          { status: 400 }
        )
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'Image too large. Max size is 5MB' }, { status: 400 })
      }

      // Get file extension from type
      const mimeToExt: Record<string, string> = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/webp': 'webp',
        'image/gif': 'gif',
      }
      const ext = mimeToExt[fileType] || fileType.split('/')[1] || 'jpg'
      finalKey = `profile-images/${userId}/${randomUUID()}.${ext}`

      console.log('Uploading with:', { finalKey, fileType, ext })

      // Convert to buffer and upload
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      await uploadFile(buffer, finalKey, fileType)
    }
    // Handle JSON with dataUrl (legacy method)
    else if (contentType.includes('application/json')) {
      let body
      try {
        body = await request.json()
      } catch (parseError) {
        console.error('Failed to parse request body:', parseError)
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
      }

      const { key, dataUrl } = body
      finalKey = key

      if (dataUrl && !key) {
        // Support various image format variations in the data URL
        const matches = dataUrl.match(/^data:image\/(jpeg|jpg|png|webp|gif);base64,(.+)$/i)
        if (!matches) {
          console.error('Invalid image data format. Data URL prefix:', dataUrl.substring(0, 50))
          return NextResponse.json({ error: 'Invalid image data format' }, { status: 400 })
        }

        const rawExt = matches[1].toLowerCase()
        // Normalize extension
        const ext = rawExt === 'jpg' ? 'jpeg' : rawExt
        const base64Data = matches[2]
        const buffer = Buffer.from(base64Data, 'base64')

        console.log('Processing dataUrl image:', { rawExt, ext, bufferSize: buffer.length })

        if (buffer.length > MAX_FILE_SIZE) {
          return NextResponse.json({ error: 'Image too large. Max size is 5MB' }, { status: 400 })
        }

        // Use appropriate extension in filename (jpg for jpeg)
        const fileExt = ext === 'jpeg' ? 'jpg' : ext
        finalKey = `profile-images/${userId}/${randomUUID()}.${fileExt}`
        await uploadFile(buffer, finalKey, `image/${ext}`)
      }
    } else {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 })
    }

    if (!finalKey) {
      return NextResponse.json({ error: 'No image key provided' }, { status: 400 })
    }

    // Get current user to check for existing image
    const currentUser = await queryOne(
      `SELECT image FROM ${getTableName('User')} WHERE id = $1`,
      [userId]
    )

    // Delete old profile image if exists
    if (currentUser?.image && currentUser.image.startsWith('profile-images/')) {
      try {
        await deleteFile(currentUser.image)
      } catch (e) {
        // Ignore delete errors - old file might not exist
        console.warn('Could not delete old profile image:', e)
      }
    }

    // Update user's image field
    const user = await queryOne(
      `UPDATE ${getTableName('User')}
       SET image = $1, "updatedAt" = NOW()
       WHERE id = $2
       RETURNING id, name, email, image`,
      [finalKey, userId]
    )

    // Generate presigned URL for reading the image
    const imageUrl = await presignGetObject(finalKey, 86400) // 24 hours

    return NextResponse.json({
      success: true,
      user,
      imageUrl,
    })

  } catch (error: any) {
    console.error('Error in PUT /api/user/profile/image:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

/**
 * GET /api/user/profile/image
 * Get presigned URL for current profile image
 */
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await queryOne(
      `SELECT image FROM ${getTableName('User')} WHERE id = $1`,
      [userId]
    )

    if (!user?.image) {
      return NextResponse.json({ imageUrl: null })
    }

    // Generate presigned URL for reading the image
    const imageUrl = await presignGetObject(user.image, 86400) // 24 hours

    return NextResponse.json({ imageUrl })

  } catch (error: any) {
    console.error('Error in GET /api/user/profile/image:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

/**
 * DELETE /api/user/profile/image
 * Remove profile image
 */
export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get current user
    const user = await queryOne(
      `SELECT image FROM ${getTableName('User')} WHERE id = $1`,
      [userId]
    )

    if (user?.image && user.image.startsWith('profile-images/')) {
      try {
        await deleteFile(user.image)
      } catch (e) {
        console.warn('Could not delete profile image:', e)
      }
    }

    // Clear image field
    await queryOne(
      `UPDATE ${getTableName('User')}
       SET image = NULL, "updatedAt" = NOW()
       WHERE id = $1
       RETURNING id`,
      [userId]
    )

    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error('Error in DELETE /api/user/profile/image:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
