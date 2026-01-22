import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Params = { params: Promise<{ orgId: string; templateId: string }> };

/**
 * GET /api/org/[orgId]/email-templates/[templateId]
 * Fetch a single email template
 */
export async function GET(request: NextRequest, { params }: Params) {
  const { queryOne, query } = await import('@/lib/db');
  const { getTableName } = await import('@/lib/db-utils');
  const { orgId, templateId } = await params;

  // Get authenticated user from headers
  const userId = request.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Verify user has access to this organization
    const hasAccess = await query(
      `SELECT 1 FROM ${getTableName('OrganizationMember')} WHERE "organizationId" = $1 AND "userId" = $2`,
      [orgId, userId]
    );

    if (!hasAccess || hasAccess.length === 0) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Fetch the template
    const template = await queryOne(
      `SELECT * FROM ${getTableName('EmailTemplate')} WHERE id = $1 AND "organizationId" = $2`,
      [templateId, orgId]
    );

    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    return NextResponse.json({ template });
  } catch (error: any) {
    console.error('Error fetching email template:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch email template' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/org/[orgId]/email-templates/[templateId]
 * Update an email template
 * Body: UpdateEmailTemplateDto (partial update)
 */
export async function PATCH(request: NextRequest, { params }: Params) {
  const { queryOne, query } = await import('@/lib/db');
  const { getTableName } = await import('@/lib/db-utils');
  const { orgId, templateId } = await params;

  // Get authenticated user from headers
  const userId = request.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Verify user has access to this organization
    const hasAccess = await query(
      `SELECT 1 FROM ${getTableName('OrganizationMember')} WHERE "organizationId" = $1 AND "userId" = $2`,
      [orgId, userId]
    );

    if (!hasAccess || hasAccess.length === 0) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Verify template exists and belongs to this organization
    const existing = await queryOne(
      `SELECT id FROM ${getTableName('EmailTemplate')} WHERE id = $1 AND "organizationId" = $2`,
      [templateId, orgId]
    );

    if (!existing) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    const body = await request.json();
    const {
      name,
      description,
      subject,
      htmlContent,
      textContent,
      variables,
      isActive,
    } = body;

    // Build dynamic UPDATE query based on provided fields
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (name !== undefined && name.trim() !== '') {
      updates.push(`name = $${paramIndex++}`);
      values.push(name.trim());
    }

    if (description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(description);
    }

    if (subject !== undefined && subject.trim() !== '') {
      updates.push(`subject = $${paramIndex++}`);
      values.push(subject.trim());
    }

    if (htmlContent !== undefined && htmlContent.trim() !== '') {
      updates.push(`"htmlContent" = $${paramIndex++}`);
      values.push(htmlContent.trim());
    }

    if (textContent !== undefined) {
      updates.push(`"textContent" = $${paramIndex++}`);
      values.push(textContent?.trim() || null);
    }

    if (variables !== undefined) {
      updates.push(`variables = $${paramIndex++}`);
      values.push(JSON.stringify(variables));
    }

    if (isActive !== undefined) {
      updates.push(`"isActive" = $${paramIndex++}`);
      values.push(isActive);
    }

    // If no fields to update, return error
    if (updates.length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    // updatedAt is auto-updated by trigger, but we can explicitly set it too
    updates.push(`"updatedAt" = NOW()`);

    // Add WHERE clause parameters
    values.push(templateId, orgId);

    const template = await queryOne(
      `UPDATE ${getTableName('EmailTemplate')}
       SET ${updates.join(', ')}
       WHERE id = $${paramIndex++} AND "organizationId" = $${paramIndex}
       RETURNING *`,
      values
    );

    if (!template) {
      return NextResponse.json(
        { error: 'Failed to update email template' },
        { status: 500 }
      );
    }

    return NextResponse.json({ template });
  } catch (error: any) {
    console.error('Error updating email template:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update email template' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/org/[orgId]/email-templates/[templateId]
 * Delete an email template
 */
export async function DELETE(request: NextRequest, { params }: Params) {
  const { queryOne, query } = await import('@/lib/db');
  const { getTableName } = await import('@/lib/db-utils');
  const { orgId, templateId } = await params;

  // Get authenticated user from headers
  const userId = request.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Verify user has access to this organization
    const hasAccess = await query(
      `SELECT 1 FROM ${getTableName('OrganizationMember')} WHERE "organizationId" = $1 AND "userId" = $2`,
      [orgId, userId]
    );

    if (!hasAccess || hasAccess.length === 0) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Delete the template
    const deleted = await queryOne(
      `DELETE FROM ${getTableName('EmailTemplate')} WHERE id = $1 AND "organizationId" = $2 RETURNING id`,
      [templateId, orgId]
    );

    if (!deleted) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting email template:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete email template' },
      { status: 500 }
    );
  }
}
