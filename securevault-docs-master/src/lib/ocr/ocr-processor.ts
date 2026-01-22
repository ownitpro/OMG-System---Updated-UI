// OCR Processor - PostgreSQL ONLY

import { smartAnalyze } from '@/lib/aws/textract';
import { detectLabels } from '@/lib/aws/rekognition';
import { classifyDocument, extractDocumentMetadata } from './document-classifier';
import { buildFolderPath } from './folder-path-builder';
import { getOrCreateFolderPath } from './auto-folder-creator';
import { checkOCRLimit, incrementOCRUsage } from '@/lib/ocr-tracking';
import { getPlanLimits, isTrialExpired } from '@/lib/plan-limits';
import { expirationService } from '@/lib/services/expiration-service';
import type { Plan } from '@/lib/plan-limits';

import type {
  OCRResult,
  OCRProcessRequest,
  VaultContext,
  ClassificationResult,
  ExtractedMetadata,
  TargetFolder,
  OCRConfig,
} from '@/types/ocr';

const OCR_CONFIG: OCRConfig = {
  confidenceThreshold: parseFloat(process.env.OCR_CONFIDENCE_THRESHOLD || '0.7'),
  autoSortEnabled: process.env.OCR_AUTO_SORT_ENABLED !== 'false',
  maxPagesPerDocument: parseInt(process.env.OCR_MAX_PAGES || '10'),
  enableIdDetection: true,
  enableExpenseAnalysis: true,
};

export class OCRProcessor {
  private config: OCRConfig;

  constructor(config: Partial<OCRConfig> = {}) {
    this.config = { ...OCR_CONFIG, ...config };
  }

  async processDocument(request: OCRProcessRequest): Promise<OCRResult> {
    const startTime = Date.now();
    const { documentId, s3Key, fileName, mimeType, vaultContext, personalVaultId, organizationId, userId } = request;

    try {
      const limitCheck = await this.checkLimits(userId, 1);
      if (!limitCheck.allowed) {
        return {
          success: false, documentId, classification: this.getDefaultClassification(),
          metadata: {}, targetFolder: this.getDefaultFolder(),
          processingTime: Date.now() - startTime, pagesProcessed: 0,
          error: limitCheck.error, retryable: false,
        };
      }

      const { textResult, classification, metadata } = await this.analyzeDocument(s3Key, fileName, mimeType);

      if (!textResult.success) {
        return {
          success: false, documentId, classification: this.getDefaultClassification(),
          metadata: {}, targetFolder: this.getDefaultFolder(),
          processingTime: Date.now() - startTime, pagesProcessed: 0,
          error: textResult.error || 'Failed to extract text', retryable: true,
        };
      }

      const folderPath = buildFolderPath(vaultContext, classification, metadata, { useUploadDate: true });
      const targetFolder = await getOrCreateFolderPath(folderPath, { vaultContext, personalVaultId, organizationId });

      await this.updateDocument(documentId, targetFolder.id, classification, metadata);

      if (metadata.expirationDate) {
        await expirationService.saveExpirationData(documentId, metadata.expirationDate, userId, true);
      }

      await incrementOCRUsage(userId, 1);

      return {
        success: true, documentId, classification, metadata, targetFolder,
        processingTime: Date.now() - startTime, pagesProcessed: 1,
      };
    } catch (error: any) {
      return {
        success: false, documentId, classification: this.getDefaultClassification(),
        metadata: {}, targetFolder: this.getDefaultFolder(),
        processingTime: Date.now() - startTime, pagesProcessed: 0,
        error: error?.message || 'An unexpected error occurred', retryable: true,
      };
    }
  }

  private async checkLimits(userId: string, pageCount: number): Promise<{ allowed: boolean; error?: string }> {
    const { queryOne } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    const user = await queryOne(
      `SELECT id, plan, "trialExpiresAt" FROM ${getTableName('User')} WHERE id = $1`,
      [userId]
    );

    if (!user) return { allowed: false, error: 'User not found' };

    if (user.trialExpiresAt && isTrialExpired(user.trialExpiresAt)) {
      return { allowed: false, error: 'Your trial has expired. Please upgrade to continue using OCR.' };
    }

    const plan = (user.plan || 'free') as Plan;
    const limits = getPlanLimits(plan);
    const limitCheck = await checkOCRLimit(userId, pageCount, limits.ocrPagesPerMonth);

    if (!limitCheck.allowed) {
      return { allowed: false, error: `You've reached your OCR limit of ${limits.ocrPagesPerMonth} pages per month.` };
    }

    return { allowed: true };
  }

  private async analyzeDocument(s3Key: string, fileName: string, mimeType: string): Promise<{
    textResult: { success: boolean; text: string; error?: string };
    classification: ClassificationResult;
    metadata: ExtractedMetadata;
  }> {
    const isImage = mimeType.startsWith('image/');
    const textResult = await smartAnalyze(s3Key, mimeType, fileName);

    let labels: { name: string; confidence: number }[] = [];
    if (isImage && this.config.enableIdDetection) {
      const labelResult = await detectLabels(s3Key);
      if (labelResult.success) labels = labelResult.labels;
    }

    const classification = classifyDocument(textResult.text, labels, fileName);
    const metadata = extractDocumentMetadata(textResult.text, textResult);

    return { textResult: { success: textResult.success, text: textResult.text, error: textResult.error }, classification, metadata };
  }

  private async updateDocument(documentId: string, folderId: string, classification: ClassificationResult, metadata: ExtractedMetadata): Promise<void> {
    const { query } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    await query(`UPDATE ${getTableName('Document')} SET "folderId" = $1, "updatedAt" = NOW() WHERE id = $2`, [folderId, documentId]);

    try {
      await query(
        `UPDATE ${getTableName('Document')} SET "ocrProcessed" = true, "ocrConfidence" = $1, "documentCategory" = $2, "documentSubtype" = $3, "extractedMetadata" = $4 WHERE id = $5`,
        [classification.confidence, classification.category, classification.subtype, JSON.stringify(metadata), documentId]
      );
    } catch (err) {
      console.warn('[OCR] OCR metadata update skipped:', err);
    }
  }

  private getDefaultClassification(): ClassificationResult {
    return { category: 'other', subtype: 'unknown', confidence: 0, patterns: [], suggestedFolderPath: ['Unsorted'] };
  }

  private getDefaultFolder(): TargetFolder {
    return { id: '', name: 'Unsorted', path: 'Unsorted', pathSegments: ['Unsorted'], created: false };
  }

  async retryProcess(documentId: string, userId: string): Promise<OCRResult> {
    const { queryOne } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    const document = await queryOne(`SELECT * FROM ${getTableName('Document')} WHERE id = $1`, [documentId]);

    if (!document) {
      return {
        success: false, documentId, classification: this.getDefaultClassification(),
        metadata: {}, targetFolder: this.getDefaultFolder(),
        processingTime: 0, pagesProcessed: 0, error: 'Document not found', retryable: false,
      };
    }

    const vaultContext: VaultContext = document.personalVaultId ? 'personal' : 'organization';

    return this.processDocument({
      documentId: document.id, s3Key: document.s3Key, fileName: document.name,
      mimeType: document.mimeType || 'application/octet-stream', vaultContext,
      personalVaultId: document.personalVaultId, organizationId: document.organizationId, userId,
    });
  }

  async previewClassification(s3Key: string, fileName: string, mimeType: string): Promise<{
    success: boolean; classification: ClassificationResult; metadata: ExtractedMetadata; suggestedPath: string[]; error?: string;
  }> {
    try {
      const { textResult, classification, metadata } = await this.analyzeDocument(s3Key, fileName, mimeType);

      if (!textResult.success) {
        return { success: false, classification: this.getDefaultClassification(), metadata: {}, suggestedPath: ['Unsorted'], error: textResult.error };
      }

      const suggestedPath = buildFolderPath('personal', classification, metadata);
      return { success: true, classification, metadata, suggestedPath };
    } catch (error: any) {
      return { success: false, classification: this.getDefaultClassification(), metadata: {}, suggestedPath: ['Unsorted'], error: error?.message };
    }
  }

  async manualSort(documentId: string, targetFolderId: string, userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { query } = await import('@/lib/db');
      const { getTableName } = await import('@/lib/db-utils');

      await query(`UPDATE ${getTableName('Document')} SET "folderId" = $1, "ocrProcessed" = false WHERE id = $2`, [targetFolderId, documentId]);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error?.message };
    }
  }
}

export const ocrProcessor = new OCRProcessor();

export async function processDocumentWithOCR(request: OCRProcessRequest): Promise<OCRResult> {
  return ocrProcessor.processDocument(request);
}

export async function retryOCRProcess(documentId: string, userId: string): Promise<OCRResult> {
  return ocrProcessor.retryProcess(documentId, userId);
}

export async function previewDocumentClassification(s3Key: string, fileName: string, mimeType: string) {
  return ocrProcessor.previewClassification(s3Key, fileName, mimeType);
}

export async function manualSortDocument(documentId: string, targetFolderId: string, userId: string) {
  return ocrProcessor.manualSort(documentId, targetFolderId, userId);
}
