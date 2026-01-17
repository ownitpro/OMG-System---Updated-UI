import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const createInvoiceSchema = z.object({
  orderId: z.string().optional(),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().default('USD'),
  dueDate: z.string().optional(),
  description: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's organization
    const user = await prisma.user.findUnique({
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

    // Get invoices for the organization
    const invoices = await prisma.invoice.findMany({
      where: {
        organizationId: organizationId
      },
      include: {
        order: {
          select: {
            id: true,
            status: true,
            total: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ invoices })
  } catch (error) {
    console.error('Error fetching invoices:', error)
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

    const body = await request.json()
    const validatedData = createInvoiceSchema.parse(body)

    // Get user's organization
    const user = await prisma.user.findUnique({
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

    // Generate invoice number
    const invoiceCount = await prisma.invoice.count({
      where: { organizationId: organizationId }
    })
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(invoiceCount + 1).padStart(4, '0')}`

    // Create the invoice
    const invoice = await prisma.invoice.create({
      data: {
        organizationId: organizationId,
        orderId: validatedData.orderId,
        number: invoiceNumber,
        amount: validatedData.amount,
        currency: validatedData.currency,
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
        status: 'DRAFT'
      },
      include: {
        order: {
          select: {
            id: true,
            status: true,
            total: true
          }
        }
      }
    })

    // Log the action
    await prisma.auditLog.create({
      data: {
        organizationId: organizationId,
        userId: session.user.id,
        action: 'invoice_created',
        resourceType: 'invoice',
        resourceId: invoice.id,
        metadata: {
          invoiceNumber: invoice.number,
          amount: invoice.amount,
          currency: invoice.currency
        }
      }
    })

    return NextResponse.json({ invoice }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error creating invoice:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
