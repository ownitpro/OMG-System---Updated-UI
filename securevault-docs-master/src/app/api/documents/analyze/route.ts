import { NextRequest, NextResponse } from 'next/server'
import { analyzeDocument, isOpenAIConfigured } from '@/lib/ai/document-analyzer'
import { applyOcrQualityGate, type OcrQualityResult } from '@/lib/ai/ocr-quality-gate'
import { detectPhotoVsDocument, shouldDetectPhoto, getPhotoSuggestedTags, type PhotoDetectionResult } from '@/lib/ai/photo-detector'
import { compareToGoldSet, type SimilarityResult } from '@/lib/ai/embeddings'
import { calculateMultiSignalConfidence, type MultiSignalConfidenceResult } from '@/lib/ai/confidence-calculator'
import { shouldEscalate, performPass2Analysis, getTopCandidates } from '@/lib/ai/two-pass-routing'
import { smartAnalyze, extractIdData, extractExpenseData, detectDocumentText } from '@/lib/aws/textract'
import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import type { AIAnalysisRequest, ExistingFolderInfo } from '@/types/ai'
import type { VaultContext, TextractResult } from '@/types/ocr'
import type { DocumentAnalysisResult, ExtractedMetadata } from '@/types/analysis'
import { randomUUID } from 'crypto'

export const maxDuration = 60 // Allow up to 60 seconds for Textract + OpenAI

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ca-central-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

const S3_BUCKET = process.env.S3_BUCKET || 'svd-prod-data-ca'

// Check if file is an image type that Textract can process
function isImageType(mimeType: string): boolean {
  const imageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/tiff', 'image/gif']
  return imageTypes.includes(mimeType.toLowerCase())
}

// Check if file is a PDF that Textract can process (via async API)
function isPdfType(mimeType: string, fileName: string): boolean {
  return mimeType === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf')
}

// Check if Textract can process this file type
function canTextractProcess(mimeType: string, fileName: string): boolean {
  return isImageType(mimeType) || isPdfType(mimeType, fileName)
}

// Check if Textract is enabled (production mode)
function isTextractEnabled(): boolean {
  // Textract is enabled unless explicitly set to mock mode
  return process.env.TEXTRACT_MODE !== 'mock'
}

// Upload base64 data to temp S3 location for Textract processing
async function uploadToTempS3(base64Data: string, mimeType: string, userId: string): Promise<string> {
  const extension = mimeType.split('/')[1] || 'jpg'
  const tempKey = `temp/textract/${userId}/${randomUUID()}.${extension}`

  // Convert base64 to buffer
  const buffer = Buffer.from(base64Data, 'base64')

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: tempKey,
    Body: buffer,
    ContentType: mimeType,
  })

  await s3Client.send(command)
  console.log('[ANALYZE] Uploaded to temp S3:', tempKey)

  return tempKey
}

// Delete temp S3 file after processing
async function deleteTempS3(s3Key: string): Promise<void> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: S3_BUCKET,
      Key: s3Key,
    })
    await s3Client.send(command)
    console.log('[ANALYZE] Deleted temp S3 file:', s3Key)
  } catch (error) {
    console.error('[ANALYZE] Failed to delete temp S3 file:', s3Key, error)
    // Non-fatal - file will be cleaned up by lifecycle policy
  }
}

// Run Textract analysis on a document
async function runTextractAnalysis(
  s3Key: string,
  mimeType: string,
  fileName: string
): Promise<{
  text: string
  metadata: AIAnalysisRequest['textractMetadata']
  confidence: number
  pageCount: number
}> {
  console.log('[ANALYZE] Running Textract analysis on:', s3Key)

  // Use smartAnalyze to auto-detect document type and use best Textract API
  const textractResult = await smartAnalyze(s3Key, mimeType, fileName)

  if (!textractResult.success) {
    console.log('[ANALYZE] Textract failed, falling back to empty text:', textractResult.error)
    return { text: '', metadata: undefined, confidence: 0, pageCount: 1 }
  }

  console.log('[ANALYZE] Textract extracted', textractResult.text?.length || 0, 'characters, pageCount:', textractResult.pageCount || 1)

  // Extract structured metadata based on document type
  const metadata: AIAnalysisRequest['textractMetadata'] = {}

  // Check if this looks like an ID document
  const idData = extractIdData(textractResult)
  if (idData.fullName || idData.expirationDate || idData.documentNumber) {
    metadata.fullName = idData.fullName
    metadata.dateOfBirth = idData.dateOfBirth
    metadata.expirationDate = idData.expirationDate
    metadata.documentNumber = idData.documentNumber
    metadata.address = idData.address
    console.log('[ANALYZE] Textract extracted ID data:', idData)
  }

  // Check if this looks like an expense document
  const expenseData = extractExpenseData(textractResult)
  if (expenseData.vendor || expenseData.total) {
    metadata.vendor = expenseData.vendor
    metadata.receiptDate = expenseData.date
    metadata.total = expenseData.total
    metadata.subtotal = expenseData.subtotal
    metadata.tax = expenseData.tax
    console.log('[ANALYZE] Textract extracted expense data:', expenseData)
  }

  return {
    text: textractResult.text || '',
    metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
    confidence: textractResult.confidence || 0,
    pageCount: textractResult.pageCount || 1,
  }
}

// POST /api/documents/analyze
// Analyze a document using Textract OCR + OpenAI GPT-4
export async function POST(request: NextRequest) {
  let tempS3Key: string | null = null

  try {
    // Check if OpenAI is configured
    if (!isOpenAIConfigured()) {
      return NextResponse.json(
        { error: 'OpenAI is not configured. Please set OPENAI_API_KEY environment variable.' },
        { status: 503 }
      )
    }

    // Get user ID from header
    const userId = request.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized - user ID required' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const {
      s3Key,
      fileName,
      mimeType,
      vaultContext,
      personalVaultId,
      organizationId,
      fileBase64, // Optional: base64 file data for direct upload analysis
    } = body

    // Validate required fields - either s3Key or fileBase64 is required
    if (!fileName || !mimeType) {
      return NextResponse.json(
        { error: 'Missing required fields: fileName, mimeType' },
        { status: 400 }
      )
    }

    if (!s3Key && !fileBase64) {
      return NextResponse.json(
        { error: 'Either s3Key or fileBase64 is required' },
        { status: 400 }
      )
    }

    if (!vaultContext || !['personal', 'organization'].includes(vaultContext)) {
      return NextResponse.json(
        { error: 'Invalid vaultContext. Must be "personal" or "organization"' },
        { status: 400 }
      )
    }

    if (vaultContext === 'personal' && !personalVaultId) {
      return NextResponse.json(
        { error: 'personalVaultId is required for personal vault context' },
        { status: 400 }
      )
    }

    if (vaultContext === 'organization' && !organizationId) {
      return NextResponse.json(
        { error: 'organizationId is required for organization vault context' },
        { status: 400 }
      )
    }

    console.log('[ANALYZE] Starting analysis for:', fileName)
    const startTime = Date.now()

    // Determine the S3 key to use for Textract
    let textractS3Key = s3Key
    let documentUrl: string

    // If we have base64 data, upload to temp S3 for Textract processing
    if (fileBase64 && isTextractEnabled() && canTextractProcess(mimeType, fileName)) {
      tempS3Key = await uploadToTempS3(fileBase64, mimeType, userId)
      textractS3Key = tempS3Key
      // Create data URL for OpenAI fallback (only works for images)
      if (isImageType(mimeType)) {
        documentUrl = `data:${mimeType};base64,${fileBase64}`
      } else {
        // For PDFs, we'll rely on Textract text extraction
        documentUrl = `data:${mimeType};base64,${fileBase64}`
      }
    } else if (s3Key) {
      // Get presigned URL for the existing S3 file
      documentUrl = await getPresignedUrl(s3Key)
      textractS3Key = s3Key
    } else if (fileBase64) {
      // Non-image with base64 - use data URL directly
      documentUrl = `data:${mimeType};base64,${fileBase64}`
    } else {
      return NextResponse.json(
        { error: 'Unable to process document - no valid source' },
        { status: 400 }
      )
    }

    // Phase 2: Photo Detection - Route photos to Quick Store / Needs Review
    // Run before document classification to avoid misclassifying photos as documents
    let photoDetectionResult: PhotoDetectionResult | undefined

    if (shouldDetectPhoto(mimeType)) {
      console.log('[ANALYZE] Running photo detection...')
      photoDetectionResult = await detectPhotoVsDocument(documentUrl)

      // If high-confidence photo detected, skip document classification and route to needs_review
      if (photoDetectionResult.isPhoto && photoDetectionResult.confidence >= 0.8) {
        const processingTime = Date.now() - startTime
        console.log('[ANALYZE] Photo detected with high confidence:', {
          type: photoDetectionResult.photoSubtype,
          confidence: photoDetectionResult.confidence,
          description: photoDetectionResult.description,
          processingTimeMs: processingTime,
        })

        // Return photo result - routes to Quick Store / Needs Review
        return NextResponse.json({
          success: true,
          result: {
            classification: {
              category: 'needs_review',
              subtype: 'photo',
              confidence: photoDetectionResult.confidence,
            },
            folderSuggestion: {
              matchedExistingFolder: null,
              pathSegments: ['Quick Store', 'Photos'],
              confidence: photoDetectionResult.confidence,
            },
            suggestedFilename: fileName,
            extractedMetadata: {
              rawText: photoDetectionResult.description,
            },
            expirationDate: null,
            expirationConfidence: 0,
            dueDate: null,
            dueDateConfidence: 0,
            processingTimeMs: processingTime,
          },
          textractUsed: false,
          pageCount: 1, // Photos are always 1 page
          isPhoto: true,
          photoDetection: {
            isPhoto: true,
            photoSubtype: photoDetectionResult.photoSubtype,
            confidence: photoDetectionResult.confidence,
            description: photoDetectionResult.description,
            suggestedTags: getPhotoSuggestedTags(photoDetectionResult.photoSubtype),
          },
        })
      } else {
        console.log('[ANALYZE] Photo detection result:', {
          isPhoto: photoDetectionResult.isPhoto,
          confidence: photoDetectionResult.confidence,
          continuing: 'with document classification',
        })
      }
    }

    // Run Textract for images and PDFs when enabled
    let textractText: string | undefined
    let textractMetadata: AIAnalysisRequest['textractMetadata'] | undefined
    let ocrConfidence = 0 // Track OCR confidence for quality gating
    let documentPageCount = 1 // Track page count for PU (Processing Units)

    if (isTextractEnabled() && canTextractProcess(mimeType, fileName) && textractS3Key) {
      try {
        const textractResult = await runTextractAnalysis(textractS3Key, mimeType, fileName)
        textractText = textractResult.text
        textractMetadata = textractResult.metadata
        ocrConfidence = textractResult.confidence // Store for quality gating
        documentPageCount = textractResult.pageCount // Store for PU tracking
        console.log('[ANALYZE] Textract completed in', Date.now() - startTime, 'ms, confidence:', (ocrConfidence * 100).toFixed(0) + '%, pages:', documentPageCount)
        console.log('[ANALYZE] Textract text length:', textractText?.length || 0, 'chars')
      } catch (textractError: any) {
        console.error('[ANALYZE] Textract error (continuing with OpenAI):', textractError.message)
        // Continue with OpenAI Vision/text API as fallback
      }
    } else if (!isTextractEnabled()) {
      console.log('[ANALYZE] Textract disabled (mock mode), skipping OCR')
    } else if (!canTextractProcess(mimeType, fileName)) {
      console.log('[ANALYZE] Unsupported file type for Textract:', mimeType)
    }

    // Fetch existing folders for smart matching
    const existingFolders = await fetchExistingFolders(
      vaultContext as VaultContext,
      personalVaultId,
      organizationId
    )

    console.log('[ANALYZE] Found', existingFolders.length, 'existing folders')

    // Build analysis request with Textract data
    const analysisRequest: AIAnalysisRequest = {
      documentUrl,
      s3Key: s3Key || undefined, // Pass S3 key for direct download (more reliable than presigned URLs)
      fileName,
      mimeType,
      vaultContext: vaultContext as VaultContext,
      personalVaultId,
      organizationId,
      existingFolders,
      textractText,
      textractMetadata,
    }

    // Perform OpenAI analysis
    const result = await analyzeDocument(analysisRequest)

    // Debug: Log raw AI classification before any adjustments
    console.log('[ANALYZE] Raw AI classification:', {
      category: result.classification.category,
      subtype: result.classification.subtype,
      confidence: result.classification.confidence,
    })

    // Merge Textract metadata into result if OpenAI didn't extract it
    if (textractMetadata) {
      if (!result.extractedMetadata.personName && textractMetadata.fullName) {
        result.extractedMetadata.personName = textractMetadata.fullName
      }
      if (!result.expirationDate && textractMetadata.expirationDate) {
        // Try to parse Textract expiration date
        result.expirationDate = normalizeTextractDate(textractMetadata.expirationDate)
        result.expirationConfidence = 0.85 // Textract confidence
      }
      if (!result.extractedMetadata.documentNumber && textractMetadata.documentNumber) {
        result.extractedMetadata.documentNumber = textractMetadata.documentNumber
      }
      if (!result.extractedMetadata.vendor && textractMetadata.vendor) {
        result.extractedMetadata.vendor = textractMetadata.vendor
      }
      if (!result.extractedMetadata.amount && textractMetadata.total) {
        result.extractedMetadata.amount = textractMetadata.total
      }
    }

    // Apply OCR quality gating to cap AI confidence based on extraction quality
    let qualityGateResult: {
      cappedConfidence: number
      wasLimited: boolean
      qualityAssessment: OcrQualityResult
    } | undefined

    // Only apply quality gating if we have OCR data (images with Textract)
    if (textractText !== undefined) {
      qualityGateResult = applyOcrQualityGate(
        result.classification.confidence,
        ocrConfidence,
        result.classification.category,
        result.extractedMetadata,
        textractMetadata
      )

      // Apply the capped confidence
      const originalConfidence = result.classification.confidence
      result.classification.confidence = qualityGateResult.cappedConfidence

      if (qualityGateResult.wasLimited) {
        console.log('[ANALYZE] OCR Quality Gate applied:', {
          original: originalConfidence,
          capped: qualityGateResult.cappedConfidence,
          ocrQuality: qualityGateResult.qualityAssessment.quality,
          reasons: qualityGateResult.qualityAssessment.reasons,
        })
      }
    }

    // Phase 6: Compare against gold set using embeddings
    let similarityResult: SimilarityResult | null = null
    if (textractText && textractText.length > 50) {
      try {
        console.log('[ANALYZE] Comparing against gold set...')
        similarityResult = await compareToGoldSet(
          textractText,
          result.classification.category,
          organizationId
        )
        console.log('[ANALYZE] Gold set comparison:', {
          matchedCategory: similarityResult.matchedCategory,
          similarity: similarityResult.similarity.toFixed(2),
          examplesCompared: similarityResult.examplesCompared,
          agreesWithAI: similarityResult.agreesWithAI,
        })
      } catch (embeddingError: any) {
        console.error('[ANALYZE] Embeddings comparison failed:', embeddingError.message)
        // Continue without embeddings
      }
    }

    // Phase 5: Calculate multi-signal confidence
    let multiSignalResult: MultiSignalConfidenceResult | null = null
    if (qualityGateResult) {
      multiSignalResult = calculateMultiSignalConfidence({
        ocrQuality: qualityGateResult.qualityAssessment,
        similarityResult,
        aiConfidence: result.classification.confidence,
        aiCategory: result.classification.category,
      })

      // Update confidence with multi-signal score
      result.classification.confidence = multiSignalResult.finalConfidence

      console.log('[ANALYZE] Multi-signal confidence:', {
        final: multiSignalResult.finalConfidence,
        signals: multiSignalResult.signals,
        canAutoFile: multiSignalResult.canAutoFile,
        wasAdjusted: multiSignalResult.wasAdjusted,
      })
    }

    // Phase 7: Two-pass routing - escalate uncertain documents
    let pass2Used = false
    if (multiSignalResult && textractText) {
      const escalation = shouldEscalate({
        confidence: multiSignalResult.finalConfidence,
        similarityScore: similarityResult?.similarity || 0.5,
        modelAgreement: similarityResult?.agreesWithAI ?? true,
        ocrQuality: qualityGateResult?.qualityAssessment.quality || 'medium',
      })

      if (escalation.shouldEscalate) {
        console.log('[ANALYZE] Escalating to Pass 2:', escalation.reason)

        const topCandidates = getTopCandidates(
          result.classification.category,
          result.classification.confidence,
          similarityResult?.matchedCategory || null,
          similarityResult?.similarity || 0,
          3
        )

        try {
          const pass2Result = await performPass2Analysis(
            documentUrl,
            textractText,
            fileName,
            mimeType,
            topCandidates
          )

          // Update result with Pass 2 findings
          result.classification.category = pass2Result.category
          result.classification.subtype = pass2Result.subtype
          result.classification.confidence = pass2Result.confidence
          pass2Used = true

          console.log('[ANALYZE] Pass 2 complete:', {
            category: pass2Result.category,
            subtype: pass2Result.subtype,
            confidence: pass2Result.confidence,
          })
        } catch (pass2Error: any) {
          console.error('[ANALYZE] Pass 2 failed:', pass2Error.message)
          // Continue with Pass 1 results
        }
      }
    }

    console.log('[ANALYZE] Analysis complete:', {
      category: result.classification.category,
      subtype: result.classification.subtype,
      confidence: result.classification.confidence,
      ocrQuality: qualityGateResult?.qualityAssessment.quality || 'n/a',
      expirationDate: result.expirationDate,
      suggestedFilename: result.suggestedFilename,
      folderPath: result.folderSuggestion.pathSegments.join('/'),
      matchedFolder: result.folderSuggestion.matchedExistingFolder?.path || 'new folder',
      processingTime: result.processingTimeMs,
      textractUsed: !!textractText,
    })

    return NextResponse.json({
      success: true,
      result,
      textractUsed: !!textractText,
      pageCount: documentPageCount, // Page count for PU (Processing Units) tracking
      ocrQuality: qualityGateResult?.qualityAssessment ? {
        quality: qualityGateResult.qualityAssessment.quality,
        ocrConfidence: qualityGateResult.qualityAssessment.ocrConfidence,
        hasRequiredFields: qualityGateResult.qualityAssessment.hasRequiredFields,
        wasLimited: qualityGateResult.wasLimited,
      } : undefined,
      // Phase 5+6: Multi-signal confidence data
      multiSignal: multiSignalResult ? {
        finalConfidence: multiSignalResult.finalConfidence,
        signals: multiSignalResult.signals,
        canAutoFile: multiSignalResult.canAutoFile,
        autoFileBlockReason: multiSignalResult.autoFileBlockReason,
        wasAdjusted: multiSignalResult.wasAdjusted,
      } : undefined,
      // Phase 6: Embeddings comparison
      embeddings: similarityResult ? {
        matchedCategory: similarityResult.matchedCategory,
        similarity: similarityResult.similarity,
        examplesCompared: similarityResult.examplesCompared,
        agreesWithAI: similarityResult.agreesWithAI,
      } : undefined,
      // Phase 7: Two-pass routing
      pass2Used,
    })
  } catch (error: any) {
    console.error('[ANALYZE] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Analysis failed' },
      { status: 500 }
    )
  } finally {
    // Clean up temp S3 file if created
    if (tempS3Key) {
      await deleteTempS3(tempS3Key)
    }
  }
}

// Normalize Textract date string to YYYY-MM-DD format
function normalizeTextractDate(dateStr: string): string | null {
  if (!dateStr) return null

  try {
    // Common Textract date formats:
    // MM/DD/YYYY, MM-DD-YYYY, DD/MM/YYYY, YYYY-MM-DD
    // Jan 15, 2028, January 15, 2028, 15 Jan 2028

    // Try to parse with Date object first
    const parsed = new Date(dateStr)
    if (!isNaN(parsed.getTime())) {
      const year = parsed.getFullYear()
      const month = String(parsed.getMonth() + 1).padStart(2, '0')
      const day = String(parsed.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    // Try MM/DD/YYYY or MM-DD-YYYY format
    const slashMatch = dateStr.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/)
    if (slashMatch) {
      const [, month, day, year] = slashMatch
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }

    return null
  } catch {
    return null
  }
}

// Generate presigned URL for S3 object
async function getPresignedUrl(s3Key: string): Promise<string> {
  const bucket = process.env.S3_BUCKET

  if (!bucket) {
    throw new Error('S3_BUCKET environment variable is not set')
  }

  // Check if using mock S3
  if (process.env.USE_MOCK_S3 === 'true') {
    // Return a placeholder URL for mock mode
    // In mock mode, we'd need to handle this differently
    console.log('[ANALYZE] Mock S3 mode - returning placeholder URL')
    return `https://mock-s3.local/${bucket}/${s3Key}`
  }

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: s3Key,
  })

  // Generate presigned URL valid for 15 minutes
  const url = await getSignedUrl(s3Client, command, { expiresIn: 900 })

  return url
}

// Fetch existing folders for a vault
async function fetchExistingFolders(
  vaultContext: VaultContext,
  personalVaultId?: string,
  organizationId?: string
): Promise<ExistingFolderInfo[]> {
  const { query } = await import('@/lib/db')
  const { getTableName } = await import('@/lib/db-utils')

  let folders: { id: string; name: string; parentId: string | null }[] = []

  if (vaultContext === 'personal') {
    folders = await query<{ id: string; name: string; parentId: string | null }>(
      `SELECT id, name, "parentId" FROM ${getTableName('Folder')} WHERE "personalVaultId" = $1`,
      [personalVaultId]
    )
  } else {
    folders = await query<{ id: string; name: string; parentId: string | null }>(
      `SELECT id, name, "parentId" FROM ${getTableName('Folder')} WHERE "organizationId" = $1`,
      [organizationId]
    )
  }

  if (!folders || folders.length === 0) {
    return []
  }

  // Build folder path map
  const folderById = new Map<string, { id: string; name: string; parentId: string | null }>()
  for (const folder of folders) {
    folderById.set(folder.id, folder)
  }

  // Build full paths for each folder
  const result: ExistingFolderInfo[] = []
  for (const folder of folders) {
    const path = buildFolderPath(folder.id, folderById)
    result.push({
      id: folder.id,
      name: folder.name,
      path,
      parentId: folder.parentId,
    })
  }

  return result
}

// Build full path for a folder
function buildFolderPath(
  folderId: string,
  folderById: Map<string, { id: string; name: string; parentId: string | null }>
): string {
  const parts: string[] = []
  let currentId: string | null = folderId

  while (currentId) {
    const folder = folderById.get(currentId)
    if (!folder) break

    parts.unshift(folder.name)
    currentId = folder.parentId
  }

  return parts.join('/')
}
