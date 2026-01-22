// AWS Rekognition Integration for Image Analysis
// Used for detecting labels, text, and ID documents in images

import type {
  RekognitionResult,
  RekognitionLabel,
  TextDetection,
} from '@/types/ocr';

const USE_MOCK_REKOGNITION = process.env.TEXTRACT_MODE === 'mock' || !process.env.AWS_ACCESS_KEY_ID;
const AWS_REGION = process.env.AWS_REGION || 'ca-central-1';
const S3_BUCKET = process.env.S3_BUCKET || process.env.S3_BUCKET_PERSONAL || 'securevault-documents';

// ============================================================================
// MOCK RESPONSES FOR DEVELOPMENT
// ============================================================================

function getMockRekognitionResult(type: 'labels' | 'text' | 'id'): RekognitionResult {
  const mockResponses: Record<string, RekognitionResult> = {
    labels: {
      success: true,
      labels: [
        { name: 'Document', confidence: 98.5 },
        { name: 'Text', confidence: 95.2 },
        { name: 'Paper', confidence: 92.1 },
        { name: 'Page', confidence: 88.7 },
        { name: 'Receipt', confidence: 75.4 },
      ],
    },
    text: {
      success: true,
      labels: [],
      textDetections: [
        { text: 'SAMPLE DOCUMENT', confidence: 99.1, type: 'LINE' },
        { text: 'Date: 2024-01-15', confidence: 95.5, type: 'LINE' },
        { text: 'Reference: DOC-001', confidence: 92.3, type: 'LINE' },
        { text: 'Total: $100.00', confidence: 97.8, type: 'LINE' },
      ],
    },
    id: {
      success: true,
      labels: [
        { name: 'Id Cards', confidence: 96.8 },
        { name: 'Document', confidence: 98.2 },
        { name: 'Driving License', confidence: 85.5 },
      ],
      idDocument: {
        documentType: 'DRIVER_LICENSE',
        fields: {
          FIRST_NAME: 'JOHN',
          LAST_NAME: 'DOE',
          DATE_OF_BIRTH: '01/15/1985',
          DOCUMENT_NUMBER: 'D1234567',
          EXPIRATION_DATE: '01/15/2028',
          ADDRESS: '123 MAIN ST, ANYTOWN, CA 90210',
        },
        confidence: 92.5,
      },
    },
  };

  return mockResponses[type] || mockResponses.labels;
}

// ============================================================================
// REKOGNITION CLIENT
// ============================================================================

async function getRekognitionClient() {
  const { RekognitionClient } = await import('@aws-sdk/client-rekognition');

  return new RekognitionClient({
    region: AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
}

// ============================================================================
// LABEL DETECTION
// ============================================================================

/**
 * Detect labels in an image (objects, scenes, concepts)
 * Useful for understanding what type of document/image it is
 */
export async function detectLabels(
  s3Key: string,
  maxLabels: number = 20,
  minConfidence: number = 50
): Promise<RekognitionResult> {
  if (USE_MOCK_REKOGNITION) {
    console.log('[MOCK REKOGNITION] detectLabels called for:', s3Key);
    return getMockRekognitionResult('labels');
  }

  try {
    const { DetectLabelsCommand } = await import('@aws-sdk/client-rekognition');
    const client = await getRekognitionClient();

    const command = new DetectLabelsCommand({
      Image: {
        S3Object: {
          Bucket: S3_BUCKET,
          Name: s3Key,
        },
      },
      MaxLabels: maxLabels,
      MinConfidence: minConfidence,
    });

    const response = await client.send(command);

    const labels: RekognitionLabel[] = (response.Labels || []).map(label => ({
      name: label.Name || '',
      confidence: label.Confidence || 0,
    }));

    return {
      success: true,
      labels,
    };
  } catch (error: any) {
    console.error('[REKOGNITION] detectLabels error:', error);
    return {
      success: false,
      labels: [],
      error: error?.message || 'Failed to detect labels',
    };
  }
}

// ============================================================================
// TEXT DETECTION
// ============================================================================

/**
 * Detect text in an image
 * Alternative to Textract for simple text extraction from images
 */
export async function detectText(s3Key: string): Promise<RekognitionResult> {
  if (USE_MOCK_REKOGNITION) {
    console.log('[MOCK REKOGNITION] detectText called for:', s3Key);
    return getMockRekognitionResult('text');
  }

  try {
    const { DetectTextCommand } = await import('@aws-sdk/client-rekognition');
    const client = await getRekognitionClient();

    const command = new DetectTextCommand({
      Image: {
        S3Object: {
          Bucket: S3_BUCKET,
          Name: s3Key,
        },
      },
    });

    const response = await client.send(command);

    const textDetections: TextDetection[] = (response.TextDetections || [])
      .filter(det => det.Type === 'LINE' || det.Type === 'WORD')
      .map(det => ({
        text: det.DetectedText || '',
        confidence: det.Confidence || 0,
        type: det.Type as 'LINE' | 'WORD',
      }));

    return {
      success: true,
      labels: [],
      textDetections,
    };
  } catch (error: any) {
    console.error('[REKOGNITION] detectText error:', error);
    return {
      success: false,
      labels: [],
      error: error?.message || 'Failed to detect text',
    };
  }
}

// ============================================================================
// DOCUMENT TYPE DETECTION HELPERS
// ============================================================================

// Labels that indicate ID documents
const ID_DOCUMENT_LABELS = [
  'id cards',
  'driving license',
  'driver license',
  'passport',
  'identification',
  'id card',
  'license',
  'government id',
  'identity document',
];

// Labels that indicate receipts/invoices
const RECEIPT_LABELS = [
  'receipt',
  'invoice',
  'bill',
  'ticket',
  'purchase order',
];

// Labels that indicate financial documents
const FINANCIAL_LABELS = [
  'bank statement',
  'check',
  'cheque',
  'tax form',
  'financial document',
];

// Labels that indicate medical documents
const MEDICAL_LABELS = [
  'prescription',
  'medical',
  'pharmacy',
  'healthcare',
  'hospital',
];

/**
 * Analyze labels to determine document type
 */
export function analyzeLabelsForDocumentType(labels: RekognitionLabel[]): {
  isIdDocument: boolean;
  isReceipt: boolean;
  isFinancial: boolean;
  isMedical: boolean;
  confidence: number;
  suggestedType: string;
} {
  const normalizedLabels = labels.map(l => ({
    name: l.name.toLowerCase(),
    confidence: l.confidence,
  }));

  const isIdDocument = normalizedLabels.some(l =>
    ID_DOCUMENT_LABELS.some(idLabel => l.name.includes(idLabel))
  );

  const isReceipt = normalizedLabels.some(l =>
    RECEIPT_LABELS.some(receiptLabel => l.name.includes(receiptLabel))
  );

  const isFinancial = normalizedLabels.some(l =>
    FINANCIAL_LABELS.some(finLabel => l.name.includes(finLabel))
  );

  const isMedical = normalizedLabels.some(l =>
    MEDICAL_LABELS.some(medLabel => l.name.includes(medLabel))
  );

  // Determine the most likely document type
  let suggestedType = 'document';
  let highestConfidence = 0;

  if (isIdDocument) {
    const idLabel = normalizedLabels.find(l =>
      ID_DOCUMENT_LABELS.some(idL => l.name.includes(idL))
    );
    if (idLabel && idLabel.confidence > highestConfidence) {
      suggestedType = 'identity';
      highestConfidence = idLabel.confidence;
    }
  }

  if (isReceipt) {
    const receiptLabel = normalizedLabels.find(l =>
      RECEIPT_LABELS.some(rL => l.name.includes(rL))
    );
    if (receiptLabel && receiptLabel.confidence > highestConfidence) {
      suggestedType = 'expense';
      highestConfidence = receiptLabel.confidence;
    }
  }

  if (isFinancial) {
    const finLabel = normalizedLabels.find(l =>
      FINANCIAL_LABELS.some(fL => l.name.includes(fL))
    );
    if (finLabel && finLabel.confidence > highestConfidence) {
      suggestedType = 'financial';
      highestConfidence = finLabel.confidence;
    }
  }

  if (isMedical) {
    const medLabel = normalizedLabels.find(l =>
      MEDICAL_LABELS.some(mL => l.name.includes(mL))
    );
    if (medLabel && medLabel.confidence > highestConfidence) {
      suggestedType = 'medical';
      highestConfidence = medLabel.confidence;
    }
  }

  return {
    isIdDocument,
    isReceipt,
    isFinancial,
    isMedical,
    confidence: highestConfidence / 100,
    suggestedType,
  };
}

// ============================================================================
// COMBINED ANALYSIS
// ============================================================================

/**
 * Perform comprehensive image analysis
 * Combines label detection and text detection
 */
export async function analyzeImage(s3Key: string): Promise<{
  labels: RekognitionResult;
  text: RekognitionResult;
  documentTypeAnalysis: ReturnType<typeof analyzeLabelsForDocumentType>;
}> {
  // Run both analyses in parallel
  const [labelsResult, textResult] = await Promise.all([
    detectLabels(s3Key),
    detectText(s3Key),
  ]);

  const documentTypeAnalysis = analyzeLabelsForDocumentType(labelsResult.labels);

  return {
    labels: labelsResult,
    text: textResult,
    documentTypeAnalysis,
  };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if an image likely contains an ID document
 */
export async function isIdDocument(s3Key: string): Promise<{
  isId: boolean;
  confidence: number;
  documentType?: string;
}> {
  const result = await detectLabels(s3Key, 10, 70);

  if (!result.success) {
    return { isId: false, confidence: 0 };
  }

  const analysis = analyzeLabelsForDocumentType(result.labels);

  let documentType: string | undefined;
  if (analysis.isIdDocument) {
    const idLabel = result.labels.find(l =>
      ID_DOCUMENT_LABELS.some(idL => l.name.toLowerCase().includes(idL))
    );
    documentType = idLabel?.name;
  }

  return {
    isId: analysis.isIdDocument,
    confidence: analysis.confidence,
    documentType,
  };
}

/**
 * Get combined text from text detections
 */
export function getTextFromDetections(textDetections: TextDetection[]): string {
  return textDetections
    .filter(det => det.type === 'LINE')
    .map(det => det.text)
    .join('\n');
}
