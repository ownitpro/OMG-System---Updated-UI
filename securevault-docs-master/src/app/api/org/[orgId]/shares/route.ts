// src/app/api/org/[orgId]/shares/route.ts

import { NextResponse } from "next/server";
import { rid, nowIso } from "@/lib/ids";
import { getPlanLimits, isTrialExpired, type Plan } from "@/lib/plan-limits";

type Params = { params: Promise<{ orgId: string }> };

export async function POST(req: Request, { params }: Params) {
  const { query, queryOne } = await import('@/lib/db');
  const { getTableName } = await import('@/lib/db-utils');
  const { orgId } = await params;
  const body = await req.json().catch(() => ({} as any));

  // Get authenticated user from headers (auth handled by middleware)
  const userId = req.headers.get('x-user-id');

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch user plan details
    const user = await queryOne(
      `SELECT plan, "trialExpiresAt" FROM ${getTableName('User')} WHERE id = $1`,
      [userId]
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const plan = (user.plan || 'free') as Plan;
    const limits = getPlanLimits(plan);
    const trialExpired = user.trialExpiresAt ? isTrialExpired(user.trialExpiresAt) : false;

    // Check if trial has expired
    if (trialExpired) {
      return NextResponse.json(
        {
          error: 'Your trial has expired. Please upgrade to continue creating share links.',
          code: 'TRIAL_EXPIRED'
        },
        { status: 402 }
      );
    }

    // Check share link limit - count from database
    const countResult = await queryOne(
      `SELECT COUNT(*) as count FROM ${getTableName('ShareLink')} WHERE "createdById" = $1`,
      [userId]
    );
    const currentShareCount = parseInt(countResult?.count || '0', 10);

    const shareLimit = limits.secureShareLinks;

    if (shareLimit !== -1 && currentShareCount >= shareLimit) {
      return NextResponse.json(
        {
          error: `You've reached your share link limit of ${shareLimit}. Upgrade to create more links.`,
          code: 'LIMIT_REACHED',
          currentCount: currentShareCount,
          limit: shareLimit
        },
        { status: 402 }
      );
    }

    const token = rid() + rid();

    const expiresAt = new Date(
      Date.now() + (body.expiryDays ?? 7) * 86400 * 1000
    ).toISOString();

    // Fetch document details from database
    const docIds = body.docIds || [];
    if (docIds.length === 0) {
      return NextResponse.json(
        { error: 'No documents found' },
        { status: 404 }
      );
    }

    // Build parameterized query for IN clause
    const placeholders = docIds.map((_: string, i: number) => `$${i + 2}`).join(', ');
    const documents = await query(
      `SELECT id, name, "sizeBytes"
       FROM ${getTableName('Document')}
       WHERE id IN (${placeholders}) AND "organizationId" = $1`,
      [orgId, ...docIds]
    );

    if (!documents || documents.length === 0) {
      return NextResponse.json(
        { error: 'No documents found' },
        { status: 404 }
      );
    }

    // Create share links in database
    for (const doc of documents) {
      const linkToken = documents.length === 1 ? token : `${token}_${doc.id}`;
      await query(
        `INSERT INTO ${getTableName('ShareLink')}
          (token, "documentId", "createdById", pin, "expiresAt", "maxDownloads")
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [linkToken, doc.id, userId, body.pin || null, expiresAt || null, null]
      );
    }

    const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return NextResponse.json({ url: `${base}/s/${token}`, createdAt: nowIso() });
  } catch (error: any) {
    console.error('Error creating share link:', error);
    return NextResponse.json(
      { error: 'Failed to create share link' },
      { status: 500 }
    );
  }
}
