// API route to download a document with proper Content-Disposition header
// This forces the browser to download the file instead of opening it

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { presignGetObject } from '@/lib/aws/s3'
import { queryOne } from '@/lib/db'
import { getTableName } from '@/lib/db-utils'

type Props = {
  params: Promise<{ documentId: string }>
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    // Require authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { documentId } = await params

    // Get document from database
    const document = await queryOne(
      `SELECT * FROM ${getTableName('Document')} WHERE id = $1`,
      [documentId]
    )

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // Get presigned URL from S3
    const fileUrl = await presignGetObject(document.s3Key)

    if (!fileUrl) {
      return NextResponse.json({ error: 'Failed to get file URL' }, { status: 500 })
    }

    // Fetch the file from S3
    const fileResponse = await fetch(fileUrl)
    if (!fileResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch file from storage' }, { status: 500 })
    }

    const fileBuffer = await fileResponse.arrayBuffer()

    // Determine content type
    const contentType = fileResponse.headers.get('Content-Type') || 'application/octet-stream'

    // Return with Content-Disposition: attachment to force download
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${encodeURIComponent(document.name)}"`,
        'Content-Length': fileBuffer.byteLength.toString(),
      },
    })
  } catch (error: any) {
    console.error('Error downloading document:', error)
    return NextResponse.json({
      error: 'Failed to download document',
      details: error.message
    }, { status: 500 })
  }
}
