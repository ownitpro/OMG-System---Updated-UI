// app/api/personal/ocr/preview/route.ts

import { NextResponse } from "next/server";
import { getPlanLimits, isTrialExpired } from '@/lib/plan-limits';
import type { Plan } from '@/lib/plan-limits';
import { runOcrFromS3 } from "@/lib/aws/ocr";

const OCR_MODE = process.env.TEXTRACT_MODE || "mock"; // "mock" | "analyze_expense" | "detect_text"
const OCR_SAMPLE_PCT = Number(process.env.OCR_SAMPLE_PCT || 25); // % of uploads to OCR in dev
const OCR_MAX_PAGES = Number(process.env.OCR_MAX_PAGES || 1);

export async function POST(req: Request) {
  const { query, queryOne } = await import('@/lib/db')
  const { getTableName } = await import('@/lib/db-utils')

  // Get user ID from request headers
  const userId = req.headers.get('x-user-id');

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get user plan and check trial status using PostgreSQL
  const user = await queryOne(
    `SELECT id, plan, "trialExpiresAt" FROM ${getTableName('User')} WHERE id = $1`,
    [userId]
  );

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const plan = (user.plan || 'free') as Plan;
  const limits = getPlanLimits(plan);

  // Check if trial has expired
  if (user.trialExpiresAt && isTrialExpired(user.trialExpiresAt)) {
    return NextResponse.json({
      error: 'Your trial has expired. Please upgrade to continue using OCR.',
      code: 'TRIAL_EXPIRED'
    }, { status: 402 });
  }

  // Check OCR usage for current month using PostgreSQL
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const ocrCountResult = await queryOne(
    `SELECT COUNT(*) as count FROM ${getTableName('Document')}
     WHERE "uploadedById" = $1 AND "ocrProcessed" = true AND "createdAt" >= $2`,
    [userId, monthStart]
  );

  const currentOcrPages = parseInt(ocrCountResult?.count || '0', 10);

  if (currentOcrPages >= limits.ocrPagesPerMonth) {
    return NextResponse.json({
      error: `You've reached your OCR limit of ${limits.ocrPagesPerMonth} pages per month. Upgrade for more OCR capacity.`,
      code: 'OCR_LIMIT_EXCEEDED',
      currentCount: currentOcrPages,
      limit: limits.ocrPagesPerMonth
    }, { status: 402 });
  }

  // Always safe for dev/testing
  const body = await req.json().catch(() => ({}));
  if (OCR_MODE === "mock" || !body?.key) {
    return NextResponse.json({
      text: `Sample OCR result: Merchant ABC
Date: 2025-11-14
Total: $12.34
Thank you!`,
    });
  }

  // simple sampling gate to control spend
  if (Math.random() * 100 > OCR_SAMPLE_PCT) {
    return NextResponse.json({
      text: "OCR deferred to save costs (sample gate).",
    });
  }

  // Choose Textract API based on mode
  if (OCR_MODE === "analyze_expense") {
    const { TextractClient, AnalyzeExpenseCommand } = await import(
      "@aws-sdk/client-textract"
    );
    const client = new TextractClient({ region: process.env.AWS_REGION! });
    const cmd = new AnalyzeExpenseCommand({
      Document: {
        S3Object: {
          Bucket: process.env.S3_BUCKET_PERSONAL!,
          Name: body.key,
        },
      },
    });
    try {
      const out = await client.send(cmd);
      const vendor =
        out.ExpenseDocuments?.[0]?.SummaryFields?.find(
          (f) => f.Type?.Text === "VENDOR_NAME"
        )?.ValueDetection?.Text;
      const total =
        out.ExpenseDocuments?.[0]?.SummaryFields?.find(
          (f) => f.Type?.Text === "TOTAL"
        )?.ValueDetection?.Text;
      const date =
        out.ExpenseDocuments?.[0]?.SummaryFields?.find(
          (f) => f.Type?.Text === "INVOICE_RECEIPT_DATE"
        )?.ValueDetection?.Text;
      const lines = [
        `Vendor: ${vendor || "(unknown)"}`,
        `Date: ${date || "(unknown)"}`,
        `Total: ${total || "(unknown)"}`,
      ];
      return NextResponse.json({ text: lines.join("\n") });
    } catch (e: any) {
      return NextResponse.json({
        text: `OCR error (Textract AnalyzeExpense): ${e?.name || "Error"}`,
      });
    }
  }

  if (OCR_MODE === "detect_text") {
    const { TextractClient, DetectDocumentTextCommand } = await import(
      "@aws-sdk/client-textract"
    );
    const client = new TextractClient({ region: process.env.AWS_REGION! });
    try {
      const out = await client.send(
        new DetectDocumentTextCommand({
          Document: {
            S3Object: {
              Bucket: process.env.S3_BUCKET_PERSONAL!,
              Name: body.key,
            },
          },
        })
      );
      const text = (out.Blocks || [])
        .filter((b) => b.BlockType === "LINE")
        .map((b) => b.Text)
        .join("\n");
      return NextResponse.json({ text: text.slice(0, 4000) });
    } catch (e: any) {
      return NextResponse.json({
        text: `OCR error (Textract DetectDocumentText): ${e?.name || "Error"}`,
      });
    }
  }

  return NextResponse.json({ text: "OCR mode not recognized." });
}
