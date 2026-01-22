// app/api/org/[orgId]/ocr/preview/route.ts

import { NextResponse } from "next/server";
import { getPlanLimits, isTrialExpired } from '@/lib/plan-limits';
import type { Plan } from '@/lib/plan-limits';
import { runOcrFromS3 } from "@/lib/aws/ocr";

// OCR for Business orgs (Accounting, RE, Construction, PM).
// Uses runOcrFromS3 which respects OCR_MODE env variable.

export async function POST(
  req: Request,
  { params }: { params: Promise<{ orgId: string }> }
) {
  const { query, queryOne } = await import('@/lib/db');
  const { getTableName } = await import('@/lib/db-utils');
  const { orgId } = await params;

  // Get user ID from request headers
  const userId = req.headers.get('x-user-id');

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get organization owner's plan to determine OCR limits
    const org = await queryOne(
      `SELECT "ownerId" FROM ${getTableName('Organization')} WHERE id = $1`,
      [orgId]
    );

    if (!org) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // Get owner's plan information
    const owner = await queryOne(
      `SELECT id, plan, "trialExpiresAt" FROM ${getTableName('User')} WHERE id = $1`,
      [org.ownerId]
    );

    if (!owner) {
      return NextResponse.json({ error: 'Organization owner not found' }, { status: 404 });
    }

    const plan = (owner.plan || 'free') as Plan;
    const limits = getPlanLimits(plan);

    // Check if trial has expired
    if (owner.trialExpiresAt && isTrialExpired(owner.trialExpiresAt)) {
      return NextResponse.json({
        error: 'Your trial has expired. Please upgrade to continue using OCR.',
        code: 'TRIAL_EXPIRED'
      }, { status: 402 });
    }

    // Check OCR usage for current month
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const countResult = await queryOne(
      `SELECT COUNT(*) as count
       FROM ${getTableName('Document')}
       WHERE "organizationId" = $1 AND "ocrProcessed" = true AND "createdAt" >= $2`,
      [orgId, monthStart]
    );
    const currentOcrPages = parseInt(countResult?.count || '0', 10);

    if (currentOcrPages >= limits.ocrPagesPerMonth) {
      return NextResponse.json({
        error: `You've reached your OCR limit of ${limits.ocrPagesPerMonth} pages per month. Upgrade for more OCR capacity.`,
        code: 'OCR_LIMIT_EXCEEDED',
        currentCount: currentOcrPages,
        limit: limits.ocrPagesPerMonth
      }, { status: 402 });
    }

    const body = await req.json().catch(() => ({}));

    const name = body?.name || "document";
    const vertical = body?.vertical || "business";
    const todayDate = new Date().toISOString().slice(0, 10);

    const lines: string[] = [
      `Org: ${orgId}`,
      `Vertical: ${vertical}`,
      `File: ${name}`,
      `Date detected: ${todayDate}`,
      `Total: $456.78`,
      "",
      "This is a mocked OCR preview.",
      "Real AWS Textract will be plugged in later without changing this JSON shape.",
    ];

    return NextResponse.json({ text: lines.join("\n") });
  } catch (error: any) {
    console.error('Error in OCR preview:', error);
    return NextResponse.json({ error: 'Failed to process OCR preview' }, { status: 500 });
  }
}
