import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  startDate: z.string().optional(),
  dueDate: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's organization memberships
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

    // Get projects for the user's organization
    const projects = await db.project.findMany({
      where: {
        organizationId: organizationId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        tasks: {
          select: {
            id: true,
            title: true,
            status: true,
            priority: true
          }
        },
        _count: {
          select: {
            tasks: true,
            messages: true,
            attachments: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createProjectSchema.parse(body)

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

    // Create the project
    const project = await db.project.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        priority: validatedData.priority,
        startDate: validatedData.startDate ? new Date(validatedData.startDate) : null,
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
        organizationId: organizationId,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    // Log the action
    await db.auditLog.create({
      data: {
        organizationId: organizationId,
        userId: session.user.id,
        action: 'project_created',
        resourceType: 'project',
        resourceId: project.id,
        metadata: {
          projectName: project.name,
          priority: project.priority
        }
      }
    })

    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
