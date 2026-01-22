/**
 * OCR Quality Gating
 *
 * Caps AI confidence based on OCR extraction quality.
 * Bad OCR input should never produce high-confidence classifications.
 *
 * Part of the AI Analysis Improvements initiative.
 */

import type { ExtractedMetadata } from '@/types/analysis'

export interface OcrQualityResult {
  /** Average OCR confidence from Textract (0-1) */
  ocrConfidence: number
  /** Whether required fields for the detected category are present */
  hasRequiredFields: boolean
  /** Maximum allowed AI confidence based on OCR quality */
  maxAllowedConfidence: number
  /** Quality assessment: 'high' | 'medium' | 'low' */
  quality: 'high' | 'medium' | 'low'
  /** Reasons for quality assessment */
  reasons: string[]
}

/** Required fields by document category */
const REQUIRED_FIELDS_BY_CATEGORY: Record<string, string[]> = {
  // Identity documents need name OR document number
  identity: ['personName', 'documentNumber', 'fullName'],

  // Financial documents need account info OR date
  financial: ['accountNumber', 'documentDate', 'amount', 'vendor'],

  // Tax documents need date OR tax-related identifiers
  tax: ['documentDate', 'amount', 'personName', 'vendor'],

  // Medical documents need provider OR date
  medical: ['vendor', 'documentDate', 'personName', 'provider'],

  // Insurance documents need policy info
  insurance: ['documentNumber', 'vendor', 'amount', 'personName'],

  // Legal documents need parties OR date
  legal: ['personName', 'documentDate', 'documentNumber'],

  // Property documents need address OR property identifiers
  property: ['address', 'amount', 'documentDate'],

  // Expense/Invoice need vendor OR amount
  expense: ['vendor', 'amount', 'documentDate'],
  invoice: ['vendor', 'amount', 'documentDate', 'invoiceNumber'],

  // Employment documents need employer OR date
  employment: ['vendor', 'documentDate', 'personName', 'amount'],

  // Education documents need institution OR date
  education: ['vendor', 'documentDate', 'personName'],

  // Vehicle documents need vehicle info
  vehicle: ['documentNumber', 'documentDate', 'vendor'],

  // Travel documents need booking info
  travel: ['documentDate', 'vendor', 'amount'],
}

/**
 * Check if the extracted metadata has required fields for a category.
 * Requires at least ONE of the required fields to be present.
 */
export function hasRequiredFieldsForCategory(
  category: string,
  metadata: ExtractedMetadata | undefined,
  textractMetadata?: {
    fullName?: string
    dateOfBirth?: string
    documentNumber?: string
    expirationDate?: string
    address?: string
    vendor?: string
    receiptDate?: string
    total?: string
    subtotal?: string
    tax?: string
  }
): boolean {
  if (!metadata && !textractMetadata) return false

  const requiredFields = REQUIRED_FIELDS_BY_CATEGORY[category]
  if (!requiredFields) {
    // Unknown category - check for any identifier or date
    return hasAnyIdentifier(metadata, textractMetadata)
  }

  // Check if at least one required field is present
  for (const field of requiredFields) {
    // Check in OpenAI metadata
    if (metadata && (metadata as Record<string, unknown>)[field]) {
      return true
    }

    // Check in Textract metadata (map field names)
    if (textractMetadata) {
      switch (field) {
        case 'personName':
        case 'fullName':
          if (textractMetadata.fullName) return true
          break
        case 'documentNumber':
          if (textractMetadata.documentNumber) return true
          break
        case 'vendor':
          if (textractMetadata.vendor) return true
          break
        case 'amount':
          if (textractMetadata.total) return true
          break
        case 'documentDate':
          if (textractMetadata.receiptDate || textractMetadata.expirationDate) return true
          break
        case 'address':
          if (textractMetadata.address) return true
          break
      }
    }
  }

  return false
}

/**
 * Check if any identifier or date is present (fallback for unknown categories)
 */
function hasAnyIdentifier(
  metadata: ExtractedMetadata | undefined,
  textractMetadata?: {
    fullName?: string
    documentNumber?: string
    vendor?: string
    total?: string
    receiptDate?: string
    expirationDate?: string
  }
): boolean {
  // Check OpenAI metadata
  if (metadata) {
    if (metadata.documentDate) return true
    if (metadata.personName) return true
    if (metadata.vendor) return true
    if (metadata.amount) return true
    if (metadata.documentNumber) return true
    if (metadata.invoiceNumber) return true
  }

  // Check Textract metadata
  if (textractMetadata) {
    if (textractMetadata.fullName) return true
    if (textractMetadata.documentNumber) return true
    if (textractMetadata.vendor) return true
    if (textractMetadata.total) return true
    if (textractMetadata.receiptDate) return true
    if (textractMetadata.expirationDate) return true
  }

  return false
}

/**
 * Assess OCR quality and determine maximum allowed AI confidence.
 *
 * Quality gating rules:
 * - OCR confidence < 0.6 → cap at 0.5 (low quality input)
 * - No required fields → cap at 0.6 (can't verify classification)
 * - OCR confidence < 0.8 → cap at 0.8 (medium quality)
 * - Otherwise → no cap (high quality)
 */
export function assessOcrQuality(
  ocrConfidence: number,
  category: string,
  aiMetadata: ExtractedMetadata | undefined,
  textractMetadata?: {
    fullName?: string
    dateOfBirth?: string
    documentNumber?: string
    expirationDate?: string
    address?: string
    vendor?: string
    receiptDate?: string
    total?: string
    subtotal?: string
    tax?: string
  }
): OcrQualityResult {
  const reasons: string[] = []
  let maxAllowedConfidence = 1.0
  let quality: 'high' | 'medium' | 'low' = 'high'

  // Check if required fields are present
  const hasFields = hasRequiredFieldsForCategory(category, aiMetadata, textractMetadata)

  // Rule 1: Very low OCR confidence → cap at 0.5
  if (ocrConfidence < 0.6) {
    maxAllowedConfidence = Math.min(maxAllowedConfidence, 0.5)
    quality = 'low'
    reasons.push(`Low OCR confidence (${(ocrConfidence * 100).toFixed(0)}%)`)
  }

  // Rule 2: No required fields → cap at 0.7 (was 0.6, too aggressive for cold start)
  // For "other" and unknown categories, don't penalize for missing fields
  if (!hasFields && category !== 'other' && category !== 'needs_review') {
    maxAllowedConfidence = Math.min(maxAllowedConfidence, 0.7)
    if (quality !== 'low') quality = 'medium'
    reasons.push(`Missing required fields for ${category}`)
  }

  // Rule 3: Medium OCR confidence → cap at 0.8
  if (ocrConfidence >= 0.6 && ocrConfidence < 0.8 && maxAllowedConfidence > 0.8) {
    maxAllowedConfidence = Math.min(maxAllowedConfidence, 0.8)
    if (quality === 'high') quality = 'medium'
    reasons.push(`Medium OCR confidence (${(ocrConfidence * 100).toFixed(0)}%)`)
  }

  // If no issues found
  if (reasons.length === 0) {
    reasons.push('Good OCR quality and required fields present')
  }

  return {
    ocrConfidence,
    hasRequiredFields: hasFields,
    maxAllowedConfidence,
    quality,
    reasons,
  }
}

/**
 * Apply OCR quality gating to cap AI confidence.
 * Returns the capped confidence and quality assessment.
 */
export function applyOcrQualityGate(
  aiConfidence: number,
  ocrConfidence: number,
  category: string,
  aiMetadata: ExtractedMetadata | undefined,
  textractMetadata?: {
    fullName?: string
    dateOfBirth?: string
    documentNumber?: string
    expirationDate?: string
    address?: string
    vendor?: string
    receiptDate?: string
    total?: string
    subtotal?: string
    tax?: string
  }
): {
  cappedConfidence: number
  wasLimited: boolean
  qualityAssessment: OcrQualityResult
} {
  const qualityAssessment = assessOcrQuality(
    ocrConfidence,
    category,
    aiMetadata,
    textractMetadata
  )

  const cappedConfidence = Math.min(aiConfidence, qualityAssessment.maxAllowedConfidence)
  const wasLimited = cappedConfidence < aiConfidence

  if (wasLimited) {
    console.log('[OCR-QUALITY-GATE] Confidence capped:', {
      original: aiConfidence,
      capped: cappedConfidence,
      maxAllowed: qualityAssessment.maxAllowedConfidence,
      reasons: qualityAssessment.reasons,
    })
  }

  return {
    cappedConfidence,
    wasLimited,
    qualityAssessment,
  }
}
