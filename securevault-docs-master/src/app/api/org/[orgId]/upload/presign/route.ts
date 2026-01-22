// src/app/api/org/[orgId]/upload/presign/route.ts
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { presignUpload } from "@/lib/aws/s3";

type Params = { params: Promise<{ orgId: string }> };

export async function POST(req: Request, { params }: Params) {
  try {
    const { queryOne } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    const { orgId } = await params;
    const body = await req.json();
    const name = String(body.name || "file");
    const type = String(body.type || "application/octet-stream");
    const userId = body.userId;

    // Validate orgId format (must be valid UUID)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(orgId)) {
      console.warn('[org/presign] Invalid organization ID format:', orgId);
      return NextResponse.json({ error: 'Invalid organization ID format' }, { status: 400 });
    }

    // Validate userId - REQUIRED for authorization
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 401 });
    }

    if (!uuidRegex.test(userId)) {
      console.warn('[org/presign] Invalid user ID format:', userId);
      return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 });
    }

    // Verify organization exists
    const org = await queryOne(
      `SELECT id FROM ${getTableName('Organization')} WHERE id = $1`,
      [orgId]
    );

    if (!org) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // Verify user is a member of this organization
    const membership = await queryOne<{ role: string }>(
      `SELECT role FROM ${getTableName('OrganizationMember')} WHERE "organizationId" = $1 AND "userId" = $2`,
      [orgId, userId]
    );

    if (!membership) {
      return NextResponse.json({ error: 'Not a member of this organization' }, { status: 403 });
    }

    const prefix = process.env.S3_PREFIX_ORG || "org/";
    const safeName = name.replace(/[^a-zA-Z0-9_.-]/g, "_");
    const key = `${prefix}${orgId}/${randomUUID()}__${safeName}`;

    const presign = await presignUpload(key, type);

    return NextResponse.json(presign);
  } catch (error: any) {
    console.error('[org/presign] Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate presigned URL' }, { status: 500 });
  }
}
