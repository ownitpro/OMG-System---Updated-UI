/**
 * Multi-Signal Confidence Calculator
 *
 * Computes final confidence from multiple hard signals instead of relying
 * solely on GPT's self-reported confidence ("model vibes").
 *
 * Formula:
 *   FinalConfidence = 40% OCR Quality + 40% Similarity Score + 20% Model Agreement
 *
 * Part of the AI Analysis Improvements initiative (Phase 5).
 */

import type { DocumentCategory } from '@/types/ocr'
import type { OcrQualityResult } from './ocr-quality-gate'
import type { SimilarityResult } from './embeddings'

/**
 * Input factors for confidence calculation
 */
export interface ConfidenceFactors {
  /** OCR quality assessment (from Phase 1) */
  ocrQuality: OcrQualityResult
  /** Similarity to gold set (from Phase 6) */
  similarityResult: SimilarityResult | null
  /** AI's self-reported confidence (0-1) */
  aiConfidence: number
  /** AI's predicted category */
  aiCategory: DocumentCategory
}

/**
 * Result of multi-signal confidence calculation
 */
export interface MultiSignalConfidenceResult {
  /** Final weighted confidence score (0-1) */
  finalConfidence: number
  /** Individual signal scores */
  signals: {
    ocrQuality: number      // 0-1
    similarity: number      // 0-1
    modelAgreement: number  // 0-1
  }
  /** Whether document can be auto-filed */
  canAutoFile: boolean
  /** Reason if auto-file is blocked */
  autoFileBlockReason: string | null
  /** Whether confidence was significantly adjusted */
  wasAdjusted: boolean
  /** Original AI confidence for comparison */
  originalAiConfidence: number
}

/**
 * Calculate multi-signal confidence from OCR quality, embeddings similarity,
 * and model agreement.
 *
 * Weights:
 * - 40% OCR Quality: How well did we extract the document text?
 * - 40% Similarity: How similar is this to known-good examples?
 * - 20% Model Agreement: Does GPT agree with embedding match?
 */
export function calculateMultiSignalConfidence(
  factors: ConfidenceFactors
): MultiSignalConfidenceResult {
  // Calculate individual signal scores

  // 1. OCR Quality Score (0-1)
  // Based on OCR confidence and required fields
  let ocrQualityScore = factors.ocrQuality.ocrConfidence
  if (!factors.ocrQuality.hasRequiredFields) {
    ocrQualityScore *= 0.7 // Penalize missing required fields
  }
  // Cap based on quality assessment
  if (factors.ocrQuality.quality === 'low') {
    ocrQualityScore = Math.min(ocrQualityScore, 0.5)
  } else if (factors.ocrQuality.quality === 'medium') {
    ocrQualityScore = Math.min(ocrQualityScore, 0.8)
  }

  // 2. Similarity Score (0-1)
  // If no gold set examples, trust AI confidence (don't penalize cold start)
  let similarityScore = 0.5 // Neutral default
  let hasGoldSetData = factors.similarityResult && factors.similarityResult.examplesCompared > 0

  if (hasGoldSetData) {
    // Convert cosine similarity (-1 to 1) to (0 to 1) range
    similarityScore = (factors.similarityResult!.similarity + 1) / 2
    // Boost if we have many examples to compare against
    if (factors.similarityResult!.examplesCompared >= 10) {
      similarityScore = Math.min(similarityScore * 1.1, 1.0)
    }
  } else {
    // No gold set data (cold start) - trust AI confidence without penalty
    // The gold set will build up over time as users correct classifications
    similarityScore = factors.aiConfidence
  }

  // 3. Model Agreement Score (0-1)
  // Does the AI category match the embedding-suggested category?
  let modelAgreementScore = 0.5 // Neutral default
  if (hasGoldSetData && factors.similarityResult!.matchedCategory) {
    if (factors.similarityResult!.agreesWithAI) {
      // Agreement boosts confidence
      modelAgreementScore = 1.0
    } else {
      // Disagreement reduces confidence
      // Scale by how strong the similarity was
      if (factors.similarityResult!.similarity > 0.8) {
        modelAgreementScore = 0.2 // Strong disagreement
      } else if (factors.similarityResult!.similarity > 0.6) {
        modelAgreementScore = 0.4 // Moderate disagreement
      } else {
        modelAgreementScore = 0.6 // Weak disagreement (embeddings not confident)
      }
    }
  } else {
    // No embedding data - trust AI confidence
    modelAgreementScore = factors.aiConfidence
  }

  // Calculate weighted final confidence
  const finalConfidence =
    ocrQualityScore * 0.40 +
    similarityScore * 0.40 +
    modelAgreementScore * 0.20

  // Round to 2 decimal places
  const roundedConfidence = Math.round(finalConfidence * 100) / 100

  // Determine if document can be auto-filed
  const canAutoFile = roundedConfidence >= 0.80 && factors.ocrQuality.hasRequiredFields
  let autoFileBlockReason: string | null = null

  if (!canAutoFile) {
    if (roundedConfidence < 0.80) {
      autoFileBlockReason = `Confidence too low (${(roundedConfidence * 100).toFixed(0)}% < 80%)`
    } else if (!factors.ocrQuality.hasRequiredFields) {
      autoFileBlockReason = 'Missing required fields for category'
    }
  }

  // Check if confidence was significantly adjusted
  const wasAdjusted = Math.abs(roundedConfidence - factors.aiConfidence) > 0.1

  return {
    finalConfidence: roundedConfidence,
    signals: {
      ocrQuality: Math.round(ocrQualityScore * 100) / 100,
      similarity: Math.round(similarityScore * 100) / 100,
      modelAgreement: Math.round(modelAgreementScore * 100) / 100,
    },
    canAutoFile,
    autoFileBlockReason,
    wasAdjusted,
    originalAiConfidence: factors.aiConfidence,
  }
}

/**
 * Quick check if a document should be auto-filed based on confidence.
 * Used for simple threshold checks without full calculation.
 */
export function shouldAutoFile(
  confidence: number,
  hasRequiredFields: boolean,
  threshold: number = 0.80
): boolean {
  return confidence >= threshold && hasRequiredFields
}

/**
 * Get a human-readable explanation of the confidence calculation.
 */
export function explainConfidence(result: MultiSignalConfidenceResult): string {
  const parts: string[] = []

  parts.push(`Final confidence: ${(result.finalConfidence * 100).toFixed(0)}%`)

  if (result.wasAdjusted) {
    const direction = result.finalConfidence > result.originalAiConfidence ? 'up' : 'down'
    parts.push(`(adjusted ${direction} from AI's ${(result.originalAiConfidence * 100).toFixed(0)}%)`)
  }

  parts.push(`[OCR: ${(result.signals.ocrQuality * 100).toFixed(0)}%`)
  parts.push(`Similarity: ${(result.signals.similarity * 100).toFixed(0)}%`)
  parts.push(`Agreement: ${(result.signals.modelAgreement * 100).toFixed(0)}%]`)

  if (result.autoFileBlockReason) {
    parts.push(`⚠️ ${result.autoFileBlockReason}`)
  }

  return parts.join(' ')
}
