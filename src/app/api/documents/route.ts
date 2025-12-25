import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { createSecureVaultClient, fileUtils } from '@/lib/securevault'
import { z } from 'zod'

const uploadDocumentSchema = z.object({
  name: z.string().min(1, 'Document name is required'),
  description: z.string().optional(),
  projectId: z.string().optional(),
  isPublic: z.boolean().default(false),
})

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's organization
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: {
        memberships: {
          include: {
            organization: true
          }
        }
      }
    })

    if (!user || user.memberships.length === 0) {
      return NextResponse.json({ error: 'No organization found' }, { status: 400 })
    }

    const organizationId = user.memberships[0].organizationId

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build where clause
    const where: any = {
      organizationId: organizationId
    }

    if (projectId) {
      where.projectId = projectId
    }

    // Get documents from database
    const documents = await db.attachment.findMany({
      where,
      include: {
        project: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit,
      skip: offset
    })

    // Get total count
    const total = await db.attachment.count({ where })

    return NextResponse.json({ 
      documents,
      total,
      limit,
      offset
    })
  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's organization
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: {
        memberships: {
          include: {
            organization: true
          }
        }
      }
    })

    if (!user || user.memberships.length === 0) {
      return NextResponse.json({ error: 'No organization found' }, { status: 400 })
    }

    const organizationId = user.memberships[0].organizationId

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const projectId = formData.get('projectId') as string
    const isPublic = formData.get('isPublic') === 'true'

    if (!file) {
      return NextResponse.json(
        { error: 'File is required' },
        { status: 400 }
      )
    }

    // Validate file
    const validation = fileUtils.validateFile(file)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Validate other inputs
    const validatedData = uploadDocumentSchema.parse({
      name: name || file.name,
      description,
      projectId: projectId || undefined,
      isPublic
    })

    // Create SecureVault client
    const secureVaultClient = createSecureVaultClient(organizationId)

    // Upload file to SecureVault
    const uploadResult = await secureVaultClient.uploadFile(file, {
      description: validatedData.description,
      isPublic: validatedData.isPublic
    })

    // Save document metadata to database
    const document = await db.attachment.create({
      data: {
        organizationId: organizationId,
        projectId: validatedData.projectId,
        name: validatedData.name,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        secureVaultId: uploadResult.fileId,
        url: uploadResult.url,
        expiresAt: uploadResult.expiresAt
      },
      include: {
        project: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    // Log the action
    await db.auditLog.create({
      data: {
        organizationId: organizationId,
        userId: session.user.id,
        action: 'document_uploaded',
        resourceType: 'attachment',
        resourceId: document.id,
        metadata: {
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
          projectId: validatedData.projectId
        }
      }
    })

    // Track usage
    await db.usageEvent.create({
      data: {
        organizationId: organizationId,
        eventType: 'document_uploaded',
        metadata: {
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type
        },
        value: file.size
      }
    })

    return NextResponse.json({ document }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error uploading document:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}