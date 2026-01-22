// AWS Textract Integration for OCR
// Extracts text from documents (PDFs, images, scanned documents)

import type {
  TextractResult,
  TextractBlock,
  ExpenseField,
} from '@/types/ocr';

const USE_MOCK_TEXTRACT = process.env.TEXTRACT_MODE === 'mock' || !process.env.AWS_ACCESS_KEY_ID;
const AWS_REGION = process.env.AWS_REGION || 'ca-central-1';
const S3_BUCKET = process.env.S3_BUCKET || process.env.S3_BUCKET_PERSONAL || 'securevault-documents';

// ============================================================================
// MOCK RESPONSES FOR DEVELOPMENT
// ============================================================================

function getMockTextractResult(type: 'general' | 'expense' | 'id', fileName?: string): TextractResult {
  // In mock mode, we return generic responses since we can't actually read document content
  // The document classifier will use the extracted text to determine the type
  // For realistic mock testing, we return text that matches common document patterns

  console.log('[MOCK TEXTRACT] Processing:', fileName, 'type hint:', type);

  // Detect specific ID document type from filename
  const fileNameLower = (fileName || '').toLowerCase();
  let idType = 'id'; // default to driver's license

  // Check for birth certificate FIRST (before generic "certificate")
  if (fileNameLower.includes('birth') || fileNameLower.includes('birth_cert') || fileNameLower.includes('birthcert')) {
    idType = 'birth_certificate';
  } else if (fileNameLower.includes('passport')) {
    idType = 'passport';
  } else if (fileNameLower.includes('social') || fileNameLower.includes('ssn') || fileNameLower.includes('ss-card') || fileNameLower.includes('ss_card')) {
    idType = 'social_security';
  } else if (fileNameLower.includes('id_card') || fileNameLower.includes('id-card') || fileNameLower.includes('identification')) {
    idType = 'id_card';
  } else if (fileNameLower.includes('license') || fileNameLower.includes('driver')) {
    idType = 'id'; // driver's license
  }

  console.log('[MOCK TEXTRACT] Detected ID type from filename:', idType, 'for file:', fileName);

  const mockResponses: Record<string, TextractResult> = {
    general: {
      success: true,
      text: `SAMPLE DOCUMENT
Document Title: Test Document
Date: ${new Date().toLocaleDateString()}
Reference Number: DOC-2024-001

This is a sample extracted text from a document.
It contains multiple lines and paragraphs.

Section 1: Introduction
Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Section 2: Details
Additional document content would appear here.

Thank you for using SecureVault Docs.`,
      confidence: 0.95,
      blocks: [
        { type: 'LINE', text: 'SAMPLE DOCUMENT', confidence: 0.98 },
        { type: 'LINE', text: 'Document Title: Test Document', confidence: 0.95 },
        { type: 'LINE', text: `Date: ${new Date().toLocaleDateString()}`, confidence: 0.92 },
      ],
      pageCount: 1,
    },
    expense: {
      success: true,
      text: `RECEIPT
Store: Sample Merchant Inc.
Date: ${new Date().toLocaleDateString()}
Receipt #: REC-12345

Items:
- Product A: $25.00
- Product B: $15.50
- Product C: $8.99

Subtotal: $49.49
Tax (8%): $3.96
TOTAL: $53.45

Thank you for your purchase!`,
      confidence: 0.92,
      blocks: [],
      expenseFields: [
        { type: 'VENDOR_NAME', value: 'Sample Merchant Inc.', confidence: 0.95 },
        { type: 'INVOICE_RECEIPT_DATE', value: new Date().toLocaleDateString(), confidence: 0.90 },
        { type: 'TOTAL', value: '$53.45', confidence: 0.98 },
        { type: 'SUBTOTAL', value: '$49.49', confidence: 0.94 },
        { type: 'TAX', value: '$3.96', confidence: 0.92 },
      ],
      pageCount: 1,
    },
    id: {
      success: true,
      text: `DRIVER LICENSE
State: California
DL Number: D1234567
Class: C

Name: JOHN DOE
Address: 123 MAIN ST
ANYTOWN, CA 90210

DOB: 01/15/1985
EXP: 01/15/2028
SEX: M  EYES: BRN  HT: 5-10`,
      confidence: 0.88,
      blocks: [
        { type: 'LINE', text: 'DRIVER LICENSE', confidence: 0.99 },
        { type: 'LINE', text: 'Name: JOHN DOE', confidence: 0.95 },
        { type: 'LINE', text: 'DOB: 01/15/1985', confidence: 0.92 },
      ],
      pageCount: 1,
    },
    passport: {
      success: true,
      text: `PASSPORT
UNITED STATES OF AMERICA

Surname: DOE
Given Names: JOHN MICHAEL

Nationality: UNITED STATES OF AMERICA
Date of Birth: 15 JAN 1985
Sex: M
Place of Birth: NEW YORK, U.S.A.
Date of Issue: 20 MAR 2020
Date of Expiration: 19 MAR 2030
Passport No: 123456789`,
      confidence: 0.90,
      blocks: [
        { type: 'LINE', text: 'PASSPORT', confidence: 0.99 },
        { type: 'LINE', text: 'UNITED STATES OF AMERICA', confidence: 0.98 },
        { type: 'LINE', text: 'Surname: DOE', confidence: 0.95 },
        { type: 'LINE', text: 'Given Names: JOHN MICHAEL', confidence: 0.95 },
      ],
      expenseFields: [
        { type: 'FULL_NAME', value: 'JOHN MICHAEL DOE', confidence: 0.95 },
        { type: 'DATE_OF_BIRTH', value: '15 JAN 1985', confidence: 0.92 },
        { type: 'DOCUMENT_NUMBER', value: '123456789', confidence: 0.94 },
        { type: 'EXPIRATION_DATE', value: '19 MAR 2030', confidence: 0.93 },
      ],
      pageCount: 1,
    },
    birth_certificate: {
      success: true,
      text: `CERTIFICATE OF LIVE BIRTH
STATE OF CALIFORNIA

CHILD'S NAME: JOHN MICHAEL DOE
DATE OF BIRTH: JANUARY 15, 1985
TIME OF BIRTH: 3:45 PM
SEX: MALE
PLACE OF BIRTH: LOS ANGELES, CALIFORNIA

MOTHER'S NAME: JANE DOE
FATHER'S NAME: JAMES DOE

CERTIFICATE NUMBER: 1985-123456
DATE FILED: JANUARY 20, 1985`,
      confidence: 0.87,
      blocks: [
        { type: 'LINE', text: 'CERTIFICATE OF LIVE BIRTH', confidence: 0.99 },
        { type: 'LINE', text: 'CHILD\'S NAME: JOHN MICHAEL DOE', confidence: 0.95 },
        { type: 'LINE', text: 'DATE OF BIRTH: JANUARY 15, 1985', confidence: 0.94 },
      ],
      pageCount: 1,
    },
    social_security: {
      success: true,
      text: `SOCIAL SECURITY
THIS NUMBER HAS BEEN ESTABLISHED FOR

JOHN MICHAEL DOE

XXX-XX-1234

SIGNATURE`,
      confidence: 0.85,
      blocks: [
        { type: 'LINE', text: 'SOCIAL SECURITY', confidence: 0.99 },
        { type: 'LINE', text: 'JOHN MICHAEL DOE', confidence: 0.95 },
      ],
      pageCount: 1,
    },
    id_card: {
      success: true,
      text: `IDENTIFICATION CARD
STATE OF CALIFORNIA

ID NUMBER: I1234567

Name: JOHN DOE
Address: 123 MAIN ST
ANYTOWN, CA 90210

DOB: 01/15/1985
EXP: 01/15/2028
SEX: M  EYES: BRN  HT: 5-10`,
      confidence: 0.88,
      blocks: [
        { type: 'LINE', text: 'IDENTIFICATION CARD', confidence: 0.99 },
        { type: 'LINE', text: 'Name: JOHN DOE', confidence: 0.95 },
      ],
      pageCount: 1,
    },
  };

  // In mock mode, return the appropriate type response
  // The actual document classification happens in the classifier based on extracted text
  // For ID documents, use the detected idType to get the right mock data
  if (type === 'id') {
    return mockResponses[idType] || mockResponses.id;
  }
  return mockResponses[type] || mockResponses.general;
}

// ============================================================================
// TEXTRACT CLIENT
// ============================================================================

async function getTextractClient() {
  const { TextractClient } = await import('@aws-sdk/client-textract');

  return new TextractClient({
    region: AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
}

// ============================================================================
// DOCUMENT TEXT DETECTION
// ============================================================================

/**
 * Extract all text from a document using DetectDocumentText
 * Best for: General documents, letters, forms
 */
export async function detectDocumentText(s3Key: string): Promise<TextractResult> {
  if (USE_MOCK_TEXTRACT) {
    console.log('[MOCK TEXTRACT] detectDocumentText called for:', s3Key);
    return getMockTextractResult('general');
  }

  try {
    const { DetectDocumentTextCommand } = await import('@aws-sdk/client-textract');
    const client = await getTextractClient();

    const command = new DetectDocumentTextCommand({
      Document: {
        S3Object: {
          Bucket: S3_BUCKET,
          Name: s3Key,
        },
      },
    });

    const response = await client.send(command);

    const blocks: TextractBlock[] = (response.Blocks || [])
      .filter(b => b.BlockType === 'LINE' || b.BlockType === 'WORD')
      .map(b => ({
        type: b.BlockType as 'LINE' | 'WORD',
        text: b.Text || '',
        confidence: b.Confidence || 0,
      }));

    const textLines = blocks
      .filter(b => b.type === 'LINE')
      .map(b => b.text);

    const avgConfidence = blocks.length > 0
      ? blocks.reduce((sum, b) => sum + b.confidence, 0) / blocks.length
      : 0;

    return {
      success: true,
      text: textLines.join('\n'),
      confidence: avgConfidence / 100,
      blocks,
      pageCount: 1, // Single image = 1 page
    };
  } catch (error: any) {
    console.error('[TEXTRACT] detectDocumentText error:', error);
    return {
      success: false,
      text: '',
      confidence: 0,
      error: error?.message || 'Failed to extract text',
      pageCount: 1, // Default to 1 page on error
    };
  }
}

// ============================================================================
// EXPENSE ANALYSIS
// ============================================================================

/**
 * Analyze receipts and invoices using AnalyzeExpense
 * Best for: Receipts, invoices, bills
 */
export async function analyzeExpense(s3Key: string): Promise<TextractResult> {
  if (USE_MOCK_TEXTRACT) {
    console.log('[MOCK TEXTRACT] analyzeExpense called for:', s3Key);
    return getMockTextractResult('expense');
  }

  try {
    const { AnalyzeExpenseCommand } = await import('@aws-sdk/client-textract');
    const client = await getTextractClient();

    const command = new AnalyzeExpenseCommand({
      Document: {
        S3Object: {
          Bucket: S3_BUCKET,
          Name: s3Key,
        },
      },
    });

    const response = await client.send(command);

    // Extract expense fields
    const expenseFields: ExpenseField[] = [];
    const expenseDoc = response.ExpenseDocuments?.[0];

    if (expenseDoc?.SummaryFields) {
      for (const field of expenseDoc.SummaryFields) {
        if (field.Type?.Text && field.ValueDetection?.Text) {
          expenseFields.push({
            type: field.Type.Text,
            value: field.ValueDetection.Text,
            confidence: field.ValueDetection.Confidence || 0,
          });
        }
      }
    }

    // Extract line items text
    const lineItemsText: string[] = [];
    if (expenseDoc?.LineItemGroups) {
      for (const group of expenseDoc.LineItemGroups) {
        for (const lineItem of group.LineItems || []) {
          const itemParts: string[] = [];
          for (const field of lineItem.LineItemExpenseFields || []) {
            if (field.ValueDetection?.Text) {
              itemParts.push(field.ValueDetection.Text);
            }
          }
          if (itemParts.length > 0) {
            lineItemsText.push(itemParts.join(' - '));
          }
        }
      }
    }

    // Build full text from expense fields
    const textParts: string[] = [];
    for (const field of expenseFields) {
      textParts.push(`${field.type}: ${field.value}`);
    }
    if (lineItemsText.length > 0) {
      textParts.push('\nLine Items:');
      textParts.push(...lineItemsText.map(item => `  - ${item}`));
    }

    const avgConfidence = expenseFields.length > 0
      ? expenseFields.reduce((sum, f) => sum + f.confidence, 0) / expenseFields.length
      : 0;

    return {
      success: true,
      text: textParts.join('\n'),
      confidence: avgConfidence / 100,
      expenseFields,
      pageCount: 1, // Single image = 1 page
    };
  } catch (error: any) {
    console.error('[TEXTRACT] analyzeExpense error:', error);
    return {
      success: false,
      text: '',
      confidence: 0,
      error: error?.message || 'Failed to analyze expense',
      pageCount: 1, // Default to 1 page on error
    };
  }
}

// ============================================================================
// DOCUMENT ANALYSIS
// ============================================================================

/**
 * Full document analysis using AnalyzeDocument
 * Best for: Forms, tables, structured documents
 */
export async function analyzeDocument(
  s3Key: string,
  features: ('FORMS' | 'TABLES' | 'SIGNATURES')[] = ['FORMS', 'TABLES']
): Promise<TextractResult> {
  if (USE_MOCK_TEXTRACT) {
    console.log('[MOCK TEXTRACT] analyzeDocument called for:', s3Key);
    return getMockTextractResult('general');
  }

  try {
    const { AnalyzeDocumentCommand } = await import('@aws-sdk/client-textract');
    const client = await getTextractClient();

    const command = new AnalyzeDocumentCommand({
      Document: {
        S3Object: {
          Bucket: S3_BUCKET,
          Name: s3Key,
        },
      },
      FeatureTypes: features,
    });

    const response = await client.send(command);

    const blocks: TextractBlock[] = (response.Blocks || [])
      .filter(b => b.BlockType === 'LINE' || b.BlockType === 'WORD')
      .map(b => ({
        type: b.BlockType as 'LINE' | 'WORD',
        text: b.Text || '',
        confidence: b.Confidence || 0,
      }));

    const textLines = blocks
      .filter(b => b.type === 'LINE')
      .map(b => b.text);

    const avgConfidence = blocks.length > 0
      ? blocks.reduce((sum, b) => sum + b.confidence, 0) / blocks.length
      : 0;

    return {
      success: true,
      text: textLines.join('\n'),
      confidence: avgConfidence / 100,
      blocks,
      pageCount: 1, // Single image = 1 page
    };
  } catch (error: any) {
    console.error('[TEXTRACT] analyzeDocument error:', error);
    return {
      success: false,
      text: '',
      confidence: 0,
      error: error?.message || 'Failed to analyze document',
      pageCount: 1, // Default to 1 page on error
    };
  }
}

// ============================================================================
// ID DOCUMENT ANALYSIS
// ============================================================================

/**
 * Analyze ID documents using AnalyzeID
 * Best for: Driver's licenses, passports, ID cards
 */
export async function analyzeIdDocument(s3Key: string, fileName?: string): Promise<TextractResult> {
  if (USE_MOCK_TEXTRACT) {
    console.log('[MOCK TEXTRACT] analyzeIdDocument called for:', s3Key, 'fileName:', fileName);
    return getMockTextractResult('id', fileName);
  }

  try {
    const { AnalyzeIDCommand } = await import('@aws-sdk/client-textract');
    const client = await getTextractClient();

    const command = new AnalyzeIDCommand({
      DocumentPages: [
        {
          S3Object: {
            Bucket: S3_BUCKET,
            Name: s3Key,
          },
        },
      ],
    });

    const response = await client.send(command);

    // Extract ID fields
    const idFields: ExpenseField[] = [];
    const textParts: string[] = [];

    for (const doc of response.IdentityDocuments || []) {
      for (const field of doc.IdentityDocumentFields || []) {
        if (field.Type?.Text && field.ValueDetection?.Text) {
          const fieldType = field.Type.Text;
          const fieldValue = field.ValueDetection.Text;
          const confidence = field.ValueDetection.Confidence || 0;

          idFields.push({
            type: fieldType,
            value: fieldValue,
            confidence,
          });

          textParts.push(`${fieldType}: ${fieldValue}`);
        }
      }
    }

    const avgConfidence = idFields.length > 0
      ? idFields.reduce((sum, f) => sum + f.confidence, 0) / idFields.length
      : 0;

    return {
      success: true,
      text: textParts.join('\n'),
      confidence: avgConfidence / 100,
      expenseFields: idFields, // Reusing expenseFields for ID fields
      pageCount: 1, // ID documents are single page
    };
  } catch (error: any) {
    console.error('[TEXTRACT] analyzeIdDocument error:', error);

    // Fallback to general text detection for unsupported ID formats
    console.log('[TEXTRACT] Falling back to detectDocumentText');
    return detectDocumentText(s3Key);
  }
}

// ============================================================================
// ASYNC PDF TEXT DETECTION
// ============================================================================

/**
 * Analyze PDF documents using async Textract APIs
 * Required because sync APIs don't support PDFs
 */
export async function analyzePdfDocument(s3Key: string): Promise<TextractResult> {
  if (USE_MOCK_TEXTRACT) {
    console.log('[MOCK TEXTRACT] analyzePdfDocument called for:', s3Key);
    return getMockTextractResult('general');
  }

  try {
    const {
      StartDocumentTextDetectionCommand,
      GetDocumentTextDetectionCommand
    } = await import('@aws-sdk/client-textract');
    const client = await getTextractClient();

    // Start async job
    console.log('[TEXTRACT] Starting async PDF text detection for:', s3Key);
    const startCommand = new StartDocumentTextDetectionCommand({
      DocumentLocation: {
        S3Object: {
          Bucket: S3_BUCKET,
          Name: s3Key,
        },
      },
    });

    const startResponse = await client.send(startCommand);
    const jobId = startResponse.JobId;

    if (!jobId) {
      throw new Error('Failed to start Textract job - no JobId returned');
    }

    console.log('[TEXTRACT] Async job started, JobId:', jobId);

    // Poll for completion (max 60 seconds to match route timeout)
    // Reduced delays for faster response on small PDFs
    let status = 'IN_PROGRESS';
    let result: TextractResult | null = null;
    const maxAttempts = 60;
    const pollInterval = 1000; // 1 second - faster polling for better responsiveness
    const initialDelay = 1000; // 1 second initial delay (AWS allows immediate polling)
    const startTime = Date.now();

    // Brief initial delay before first poll
    console.log('[TEXTRACT] Waiting 1 second before first poll...');
    await new Promise(resolve => setTimeout(resolve, initialDelay));

    for (let attempt = 0; attempt < maxAttempts && status === 'IN_PROGRESS'; attempt++) {
      const getCommand = new GetDocumentTextDetectionCommand({ JobId: jobId });
      const getResponse = await client.send(getCommand);

      status = getResponse.JobStatus || 'FAILED';
      const elapsed = Math.round((Date.now() - startTime) / 1000);
      console.log('[TEXTRACT] Job status:', status, 'attempt:', attempt + 1, 'elapsed:', elapsed + 's');

      if (status === 'SUCCEEDED') {
        // Extract page count from DocumentMetadata
        const pageCount = getResponse.DocumentMetadata?.Pages || 1;
        console.log('[TEXTRACT] Document has', pageCount, 'pages');

        // Extract text from blocks
        const blocks: TextractBlock[] = (getResponse.Blocks || [])
          .filter(b => b.BlockType === 'LINE' || b.BlockType === 'WORD')
          .map(b => ({
            type: b.BlockType as 'LINE' | 'WORD',
            text: b.Text || '',
            confidence: b.Confidence || 0,
          }));

        const textLines = blocks
          .filter(b => b.type === 'LINE')
          .map(b => b.text);

        const avgConfidence = blocks.length > 0
          ? blocks.reduce((sum, b) => sum + b.confidence, 0) / blocks.length
          : 0;

        result = {
          success: true,
          text: textLines.join('\n'),
          confidence: avgConfidence / 100,
          blocks,
          pageCount, // Include page count for PU tracking
        };
        break;
      } else if (status === 'FAILED') {
        throw new Error('Textract job failed');
      } else if (status === 'IN_PROGRESS') {
        // Wait before next poll
        await new Promise(resolve => setTimeout(resolve, pollInterval));
      }
    }

    if (!result) {
      const totalTime = Math.round((Date.now() - startTime) / 1000);
      throw new Error(`Textract job timed out after ${totalTime} seconds`);
    }

    console.log('[TEXTRACT] PDF analysis complete, extracted', result.text?.length || 0, 'characters');
    // Debug: show first 200 chars of extracted text
    if (result.text && result.text.length > 0) {
      console.log('[TEXTRACT] Sample text:', result.text.substring(0, 200).replace(/\n/g, ' '));
    } else {
      console.log('[TEXTRACT] WARNING: No text extracted from PDF!');
    }
    return result;
  } catch (error: any) {
    console.error('[TEXTRACT] analyzePdfDocument error:', error);
    return {
      success: false,
      text: '',
      confidence: 0,
      error: error?.message || 'Failed to analyze PDF',
    };
  }
}

// ============================================================================
// SMART ANALYSIS (AUTO-DETECT BEST METHOD)
// ============================================================================

/**
 * Smart analysis that chooses the best extraction method based on file type
 * and content hints
 */
export async function smartAnalyze(
  s3Key: string,
  mimeType: string,
  fileName: string
): Promise<TextractResult> {
  const fileNameLower = fileName.toLowerCase();
  const isPdfFile = mimeType === 'application/pdf' || fileNameLower.endsWith('.pdf');

  // For PDFs, use async Textract API
  if (isPdfFile) {
    console.log('[SMART ANALYZE] PDF detected, using async Textract');
    return analyzePdfDocument(s3Key);
  }

  // Check for expense-related documents
  const isExpense =
    fileNameLower.includes('receipt') ||
    fileNameLower.includes('invoice') ||
    fileNameLower.includes('bill') ||
    fileNameLower.includes('expense');

  // Check for ID documents (includes identity documents like birth certificates, SSN cards)
  const isId =
    fileNameLower.includes('license') ||
    fileNameLower.includes('passport') ||
    fileNameLower.includes('id_card') ||
    fileNameLower.includes('id-card') ||
    fileNameLower.includes('identity') ||
    fileNameLower.includes('birth') ||           // Birth certificates
    fileNameLower.includes('certificate') ||     // Various certificates
    fileNameLower.includes('social') ||          // Social Security
    fileNameLower.includes('ssn') ||             // SSN
    fileNameLower.includes('ss-card') ||         // SS Card
    /(?:^|[^a-z])id(?:[^a-z]|$)/.test(fileNameLower); // Match "id" not surrounded by letters (e.g., "ID 2.jpeg", "my-id.png", "ID_2.jpeg")

  console.log('[SMART ANALYZE] fileName:', fileName, 'isExpense:', isExpense, 'isId:', isId);

  if (isExpense) {
    return analyzeExpense(s3Key);
  }

  if (isId) {
    return analyzeIdDocument(s3Key, fileName);
  }

  // Default to general text detection
  return detectDocumentText(s3Key);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Extract specific fields from expense analysis result
 */
export function extractExpenseData(result: TextractResult): {
  vendor?: string;
  date?: string;
  total?: string;
  subtotal?: string;
  tax?: string;
} {
  const fields = result.expenseFields || [];

  return {
    vendor: fields.find(f => f.type === 'VENDOR_NAME')?.value,
    date: fields.find(f => f.type === 'INVOICE_RECEIPT_DATE')?.value,
    total: fields.find(f => f.type === 'TOTAL')?.value,
    subtotal: fields.find(f => f.type === 'SUBTOTAL')?.value,
    tax: fields.find(f => f.type === 'TAX')?.value,
  };
}

/**
 * Extract ID document fields
 */
export function extractIdData(result: TextractResult): {
  fullName?: string;
  dateOfBirth?: string;
  documentNumber?: string;
  expirationDate?: string;
  address?: string;
} {
  const fields = result.expenseFields || [];

  return {
    fullName:
      fields.find(f => f.type === 'FIRST_NAME')?.value +
        ' ' +
        fields.find(f => f.type === 'LAST_NAME')?.value ||
      fields.find(f => f.type === 'FULL_NAME')?.value,
    dateOfBirth: fields.find(f => f.type === 'DATE_OF_BIRTH')?.value,
    documentNumber:
      fields.find(f => f.type === 'DOCUMENT_NUMBER')?.value ||
      fields.find(f => f.type === 'ID_NUMBER')?.value,
    expirationDate: fields.find(f => f.type === 'EXPIRATION_DATE')?.value,
    address: fields.find(f => f.type === 'ADDRESS')?.value,
  };
}
