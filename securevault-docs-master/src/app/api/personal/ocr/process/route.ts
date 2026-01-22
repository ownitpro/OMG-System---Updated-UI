// Personal Vault OCR Processing API
// POST: Process a document with OCR and auto-sort

import { NextRequest, NextResponse } from 'next/server';
import { processDocumentWithOCR, retryOCRProcess, manualSortDocument } from '@/lib/ocr/ocr-processor';
import { previewDocumentClassification } from '@/lib/ocr/ocr-processor';
import type { OCRProcessRequest } from '@/types/ocr';

// ============================================================================
// HELPER: Verify user exists
// ============================================================================

async function verifyUser(userId: string) {
  if (!userId) return null;

  const { query, queryOne } = await import('@/lib/db')
  const { getTableName } = await import('@/lib/db-utils')

  try {
    const user = await queryOne(
      `SELECT id FROM ${getTableName('User')} WHERE id = $1`,
      [userId]
    );

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
}

// ============================================================================
// POST: Process document with OCR
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, documentId, s3Key, fileName, mimeType, personalVaultId, targetFolderId, userId } = body;

    // Verify user exists using userId from request body
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized - userId required' }, { status: 401 });
    }

    const user = await verifyUser(userId);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized - user not found' }, { status: 401 });
    }

    // Handle different actions
    switch (action) {
      case 'process':
        return handleProcess(user.id, documentId, s3Key, fileName, mimeType, personalVaultId);

      case 'retry':
        return handleRetry(user.id, documentId);

      case 'manual_sort':
        return handleManualSort(user.id, documentId, targetFolderId);

      case 'preview':
        return handlePreview(s3Key, fileName, mimeType);

      default:
        // Default to process if no action specified
        if (documentId && s3Key) {
          return handleProcess(user.id, documentId, s3Key, fileName, mimeType, personalVaultId);
        }
        return NextResponse.json({ error: 'Invalid action or missing required fields' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('[OCR API] Error:', error);
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
  documentId: string,
  s3Key: string,
  fileName: string,
  mimeType: string,
  personalVaultId: string
) {
  if (!documentId || !s3Key || !personalVaultId) {
    return NextResponse.json(
      { error: 'documentId, s3Key, and personalVaultId are required' },
      { status: 400 }
    );
  }

  const request: OCRProcessRequest = {
    documentId,
    s3Key,
    fileName: fileName || 'document',
    mimeType: mimeType || 'application/octet-stream',
    vaultContext: 'personal',
    personalVaultId,
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
