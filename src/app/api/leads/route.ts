import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const LeadSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  phone: z.string().optional(),
  company: z.string().optional(),
  industry: z.string().min(1),
  budgetBand: z.string().optional(),
  source: z.string().min(1),
  context: z.object({
    page_path: z.string(),
    section: z.string(),
    timestamp: z.string(),
    inputs: z.any().optional(),
    results: z.any().optional(),
    proposalRequested: z.boolean().optional(),
    checklist: z.string().optional()
  }).optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = LeadSchema.parse(body);

    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        company: validatedData.company || validatedData.industry,
        source: validatedData.source,
        status: 'NEW'
      }
    });

    // Create audit log for lead creation
    await prisma.auditLog.create({
      data: {
        organizationId: 'system', // System-generated lead
        userId: 'system',
        action: 'lead.created',
        resourceType: 'Lead',
        resourceId: lead.id,
        metadata: {
          source: validatedData.source,
          industry: validatedData.industry,
          budgetBand: validatedData.budgetBand,
          context: validatedData.context
        },
        ipAddress: request.ip || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    });

    // Create webhook event for email notification
    const webhookEndpoint = await prisma.webhookEndpoint.findFirst({
      where: {
        eventTypes: {
          contains: 'lead.created'
        }
      }
    });

    if (webhookEndpoint) {
      await prisma.webhookEvent.create({
        data: {
          webhookEndpointId: webhookEndpoint.id,
          eventType: 'lead.created',
          payload: {
            lead: {
              id: lead.id,
              email: lead.email,
              name: lead.name,
              industry: validatedData.industry,
              budgetBand: validatedData.budgetBand,
              source: validatedData.source,
              context: validatedData.context
            }
          }
        }
      });
    }

    return NextResponse.json({ 
      success: true, 
      leadId: lead.id,
      message: 'Lead created successfully' 
    });

  } catch (error) {
    console.error('Lead creation error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data provided', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}
