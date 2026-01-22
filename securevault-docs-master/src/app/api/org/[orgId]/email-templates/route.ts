import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Params = { params: Promise<{ orgId: string }> };

/**
 * GET /api/org/[orgId]/email-templates
 * List email templates for an organization with optional filtering
 * Query params: type, isActive, search, limit, offset
 */
export async function GET(request: NextRequest, { params }: Params) {
  const { query } = await import('@/lib/db');
  const { getTableName } = await import('@/lib/db-utils');
  const { orgId } = await params;

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

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const isActiveParam = searchParams.get('isActive');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    // Build query dynamically
    let sql = `SELECT * FROM ${getTableName('EmailTemplate')} WHERE "organizationId" = $1`;
    const queryParams: any[] = [orgId];
    let paramIndex = 2;

    // Filter by type
    if (type) {
      sql += ` AND type = $${paramIndex++}`;
      queryParams.push(type);
    }

    // Filter by active status
    if (isActiveParam !== null) {
      const isActive = isActiveParam === 'true';
      sql += ` AND "isActive" = $${paramIndex++}`;
      queryParams.push(isActive);
    }

    // Search by name or description
    if (search && search.trim()) {
      sql += ` AND (name ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
      queryParams.push(`%${search.trim()}%`);
      paramIndex++;
    }

    // Order by creation date (newest first)
    sql += ` ORDER BY "createdAt" DESC`;

    // Apply pagination
    sql += ` LIMIT $${paramIndex++} OFFSET $${paramIndex}`;
    queryParams.push(limit, offset);

    const templates = await query(sql, queryParams);

    // Get total count for pagination
    let countSql = `SELECT COUNT(*) as count FROM ${getTableName('EmailTemplate')} WHERE "organizationId" = $1`;
    const countParams: any[] = [orgId];
    let countParamIndex = 2;

    if (type) {
      countSql += ` AND type = $${countParamIndex++}`;
      countParams.push(type);
    }
    if (isActiveParam !== null) {
      countSql += ` AND "isActive" = $${countParamIndex++}`;
      countParams.push(isActiveParam === 'true');
    }
    if (search && search.trim()) {
      countSql += ` AND (name ILIKE $${countParamIndex} OR description ILIKE $${countParamIndex})`;
      countParams.push(`%${search.trim()}%`);
    }

    const countResult = await query(countSql, countParams);
    const total = parseInt(countResult?.[0]?.count || '0', 10);

    return NextResponse.json({
      templates: templates || [],
      total,
      limit,
      offset,
    });
  } catch (error: any) {
    console.error('Error fetching email templates:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch email templates' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/org/[orgId]/email-templates
 * Create a new email template
 * Body: CreateEmailTemplateDto
 */
export async function POST(request: NextRequest, { params }: Params) {
  const { queryOne, query } = await import('@/lib/db');
  const { getTableName } = await import('@/lib/db-utils');
  const { randomUUID } = await import('crypto');
  const { orgId } = await params;

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

    const body = await request.json();
    const {
      name,
      description,
      slug,
      type,
      subject,
      htmlContent,
      textContent,
      variables,
      isActive,
    } = body;

    // Validate required fields
    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!slug || slug.trim() === '') {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }
    if (!type || type.trim() === '') {
      return NextResponse.json({ error: 'Type is required' }, { status: 400 });
    }
    if (!subject || subject.trim() === '') {
      return NextResponse.json({ error: 'Subject is required' }, { status: 400 });
    }
    if (!htmlContent || htmlContent.trim() === '') {
      return NextResponse.json({ error: 'HTML content is required' }, { status: 400 });
    }

    // Check if slug already exists for this organization
    const existing = await queryOne(
      `SELECT id FROM ${getTableName('EmailTemplate')} WHERE "organizationId" = $1 AND slug = $2`,
      [orgId, slug]
    );

    if (existing) {
      return NextResponse.json(
        { error: `A template with slug '${slug}' already exists for this organization` },
        { status: 409 }
      );
    }

    // Generate UUID
    const templateId = randomUUID();

    // Insert template
    const template = await queryOne(
      `INSERT INTO ${getTableName('EmailTemplate')}
        (id, "organizationId", name, description, slug, type, subject, "htmlContent", "textContent", variables, "isActive", "createdById")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [
        templateId,
        orgId,
        name.trim(),
        description || null,
        slug.trim(),
        type.trim(),
        subject.trim(),
        htmlContent.trim(),
        textContent?.trim() || null,
        JSON.stringify(variables || []),
        isActive !== undefined ? isActive : true,
        userId,
      ]
    );

    if (!template) {
      return NextResponse.json(
        { error: 'Failed to create email template' },
        { status: 500 }
      );
    }

    return NextResponse.json({ template }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating email template:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create email template' },
      { status: 500 }
    );
  }
}
