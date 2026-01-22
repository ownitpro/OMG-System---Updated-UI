// Organization OCR Processing API
// POST: Process a document with OCR and auto-sort for business organizations

import { NextRequest, NextResponse } from 'next/server';
import { processDocumentWithOCR, retryOCRProcess, manualSortDocument } from '@/lib/ocr/ocr-processor';
import { previewDocumentClassification } from '@/lib/ocr/ocr-processor';
import type { OCRProcessRequest } from '@/types/ocr';

// ============================================================================
// HELPER: Verify organization membership
// ============================================================================

async function verifyOrgMembership(userId: string, orgId: string): Promise<boolean> {
  const { query, queryOne } = await import('@/lib/db');
  const { getTableName } = await import('@/lib/db-utils');

  // Check if user is owner or member of the organization
  const org = await queryOne(
    `SELECT id, "ownerId" FROM ${getTableName('Organization')} WHERE id = $1`,
    [orgId]
  );

  if (!org) {
    return false;
  }

  // Check if owner
  if (org.ownerId === userId) {
    return true;
  }

  // Check if member
  const membership = await queryOne(
    `SELECT id FROM ${getTableName('OrganizationMember')}
     WHERE "organizationId" = $1 AND "userId" = $2`,
    [orgId, userId]
  );

  return !!membership;
}

// ============================================================================
// POST: Process document with OCR
// ============================================================================

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ orgId: string }> }
) {
  try {
    const { orgId } = await params;

    // Get authenticated user from headers (auth handled by middleware)
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify organization membership
    const isMember = await verifyOrgMembership(userId, orgId);
    if (!isMember) {
      return NextResponse.json(
        { error: 'You do not have access to this organization' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { action, documentId, s3Key, fileName, mimeType, targetFolderId, clientName } = body;

    // Handle different actions
    switch (action) {
      case 'process':
        return handleProcess(userId, orgId, documentId, s3Key, fileName, mimeType, clientName);

      case 'retry':
        return handleRetry(userId, documentId);

      case 'manual_sort':
        return handleManualSort(userId, documentId, targetFolderId);

      case 'preview':
        return handlePreview(s3Key, fileName, mimeType);

      default:
        // Default to process if no action specified
        if (documentId && s3Key) {
          return handleProcess(userId, orgId, documentId, s3Key, fileName, mimeType, clientName);
        }
        return NextResponse.json(
          { error: 'Invalid action or missing required fields' },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error('[ORG OCR API] Error:', error);
    return NextResponse.json(
      { error: error?.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// ============================================================================
// Action Handlers
// ============================================================================

async function handleProcess(
  userId: string,
  orgId: string,
  documentId: string,
  s3Key: string,
  fileName: string,
  mimeType: string,
  clientName?: string
) {
  if (!documentId || !s3Key) {
    return NextResponse.json(
      { error: 'documentId and s3Key are required' },
      { status: 400 }
    );
  }

  const request: OCRProcessRequest = {
    documentId,
    s3Key,
    fileName: fileName || 'document',
    mimeType: mimeType || 'application/octet-stream',
    vaultContext: 'organization',
    organizationId: orgId,
    userId,
  };

  const result = await processDocumentWithOCR(request);

  if (!result.success) {
    const statusCode = result.retryable ? 500 : 402;
    return NextResponse.json(
      {
        error: result.error,
        code: result.retryable ? 'OCR_FAILED' : 'OCR_LIMIT_EXCEEDED',
        retryable: result.retryable,
        result,
      },
      { status: statusCode }
    );
  }

  return NextResponse.json({
    success: true,
    result,
    message: `Document sorted to: ${result.targetFolder.path}`,
  });
}

async function handleRetry(userId: string, documentId: string) {
  if (!documentId) {
    return NextResponse.json({ error: 'documentId is required' }, { status: 400 });
  }

  const result = await retryOCRProcess(documentId, userId);

  if (!result.success) {
    return NextResponse.json(
      {
        error: result.error,
        code: 'OCR_RETRY_FAILED',
        retryable: result.retryable,
        result,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    result,
    message: `Document sorted to: ${result.targetFolder.path}`,
  });
}

async function handleManualSort(userId: string, documentId: string, targetFolderId: string) {
  if (!documentId || !targetFolderId) {
    return NextResponse.json(
      { error: 'documentId and targetFolderId are required' },
      { status: 400 }
    );
  }

  const result = await manualSortDocument(documentId, targetFolderId, userId);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: 'Document moved successfully',
  });
}

async function handlePreview(s3Key: string, fileName: string, mimeType: string) {
  if (!s3Key) {
    return NextResponse.json({ error: 's3Key is required' }, { status: 400 });
  }

  const result = await previewDocumentClassification(
    s3Key,
    fileName || 'document',
    mimeType || 'application/octet-stream'
  );

  if (!result.success) {
    return NextResponse.json(
      {
        error: result.error,
        code: 'PREVIEW_FAILED',
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    classification: result.classification,
    metadata: result.metadata,
    suggestedPath: result.suggestedPath,
  });
}
