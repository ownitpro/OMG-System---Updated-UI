/**
 * Two-Pass Routing
 *
 * Implements escalation logic for uncertain documents.
 * Pass 1: Quick classification with GPT-4o-mini
 * Pass 2: Thorough analysis with vision for uncertain documents
 *
 * Part of the AI Analysis Improvements initiative (Phase 7).
 */

import OpenAI from 'openai'
import type { DocumentCategory } from '@/types/ocr'
import type { MultiSignalConfidenceResult } from './confidence-calculator'
import { DOCUMENT_ANALYSIS_SCHEMA } from './structured-output-schema'

/**
 * Criteria for determining if a document needs escalation to Pass 2.
 */
export interface EscalationCriteria {
  /** Final confidence from multi-signal calculation */
  confidence: number
  /** Similarity score from embeddings comparison */
  similarityScore: number
  /** Whether AI and embeddings agree on category */
  modelAgreement: boolean
  /** OCR quality assessment */
  ocrQuality: 'high' | 'medium' | 'low'
}

/**
 * Result of escalation check
 */
export interface EscalationResult {
  /** Whether document should be escalated to Pass 2 */
  shouldEscalate: boolean
  /** Reason for escalation (or why not) */
  reason: string
  /** Priority level for escalation queue */
  priority: 'high' | 'medium' | 'low'
}

/**
 * Determine if a document needs escalation to Pass 2.
 *
 * Escalation triggers:
 * - Confidence < 0.7
 * - Similarity score < 0.6
 * - Model disagreement with strong embedding match
 * - Low OCR quality with borderline confidence
 */
export function shouldEscalate(criteria: EscalationCriteria): EscalationResult {
  const reasons: string[] = []
  let priority: 'high' | 'medium' | 'low' = 'low'

  // Rule 1: Low confidence always escalates
  if (criteria.confidence < 0.5) {
    reasons.push('Very low confidence')
    priority = 'high'
  } else if (criteria.confidence < 0.7) {
    reasons.push('Low confidence')
    priority = priority === 'high' ? 'high' : 'medium'
  }

  // Rule 2: Weak similarity match
  if (criteria.similarityScore < 0.4) {
    reasons.push('No similar documents in gold set')
    priority = priority === 'high' ? 'high' : 'medium'
  } else if (criteria.similarityScore < 0.6) {
    reasons.push('Weak similarity to known documents')
    priority = priority === 'low' ? 'medium' : priority
  }

  // Rule 3: Model disagreement
  if (!criteria.modelAgreement && criteria.similarityScore > 0.6) {
    reasons.push('AI category conflicts with similar documents')
    priority = 'high'
  }

  // Rule 4: Low OCR quality with borderline confidence
  if (criteria.ocrQuality === 'low' && criteria.confidence < 0.8) {
    reasons.push('Poor OCR quality limits classification accuracy')
    priority = priority === 'low' ? 'medium' : priority
  }

  const shouldEscalate = reasons.length > 0

  return {
    shouldEscalate,
    reason: shouldEscalate ? reasons.join('; ') : 'Confidence meets threshold',
    priority,
  }
}

/**
 * Pass 2 analysis prompt - more thorough with forced choice
 */
const PASS_2_SYSTEM_PROMPT = `You are a document classification expert performing a THOROUGH second-pass analysis.

The first-pass classification was uncertain. Your task is to:
1. Carefully examine the document content
2. Look for specific identifiers, dates, and key fields
3. Choose the MOST LIKELY category from the candidates provided
4. If truly uncertain, choose "needs_review"

IMPORTANT: You MUST choose one of the candidate categories. Do not suggest alternatives.`

/**
 * Build Pass 2 user prompt with candidate categories
 */
function buildPass2Prompt(
  topCandidates: { category: DocumentCategory; confidence: number }[],
  documentText: string,
  fileName: string
): string {
  const candidateList = topCandidates
    .map((c, i) => `${i + 1}. ${c.category} (${(c.confidence * 100).toFixed(0)}% initial)`)
    .join('\n')

  return `Analyze this document and choose the BEST category from these candidates:

${candidateList}

Document filename: ${fileName}

Document text:
---
${documentText.substring(0, 4000)}
---

Choose the most appropriate category from the candidates above. Look for:
- Document headers, titles, or labels
- Key identifiers (account numbers, ID numbers, dates)
- Sender/recipient information
- Document structure and formatting

Return your analysis in JSON format with:
- classification.category: One of the candidate categories (or "needs_review" if truly uncertain)
- classification.subtype: Specific document type
- classification.confidence: Your confidence (0-1)
- metadata: Any extracted fields (dates, names, numbers, amounts)`
}

/**
 * Perform Pass 2 analysis on an uncertain document.
 * Uses more thorough analysis with vision for images.
 */
export async function performPass2Analysis(
  documentUrl: string,
  documentText: string,
  fileName: string,
  mimeType: string,
  topCandidates: { category: DocumentCategory; confidence: number }[]
): Promise<{
  category: DocumentCategory
  subtype: string
  confidence: number
  pass2Used: true
}> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const isImage = mimeType.startsWith('image/')
  const userPrompt = buildPass2Prompt(topCandidates, documentText, fileName)

  console.log('[PASS-2] Starting thorough analysis for:', fileName)
  console.log('[PASS-2] Candidates:', topCandidates.map(c => c.category).join(', '))

  try {
    let response

    if (isImage && documentUrl.startsWith('data:')) {
      // Use vision API for images
      response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: PASS_2_SYSTEM_PROMPT },
          {
            role: 'user',
            content: [
              { type: 'text', text: userPrompt },
              {
                type: 'image_url',
                image_url: {
                  url: documentUrl,
                  detail: 'high', // High detail for Pass 2
                },
              },
            ],
          },
        ],
        max_tokens: 1000,
        temperature: 0.1,
        response_format: DOCUMENT_ANALYSIS_SCHEMA as unknown as { type: 'json_object' },
      })
    } else {
      // Text-based analysis
      response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: PASS_2_SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: 1000,
        temperature: 0.1,
        response_format: DOCUMENT_ANALYSIS_SCHEMA as unknown as { type: 'json_object' },
      })
    }

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from Pass 2 analysis')
    }

    const result = JSON.parse(content)

    console.log('[PASS-2] Result:', {
      category: result.classification.category,
      subtype: result.classification.subtype,
      confidence: result.classification.confidence,
    })

    return {
      category: result.classification.category as DocumentCategory,
      subtype: result.classification.subtype || 'general',
      confidence: result.classification.confidence,
      pass2Used: true,
    }
  } catch (error: any) {
    console.error('[PASS-2] Error:', error.message)
    // Fall back to top candidate
    return {
      category: topCandidates[0]?.category || 'needs_review',
      subtype: 'uncertain',
      confidence: 0.5,
      pass2Used: true,
    }
  }
}

/**
 * Get top N category candidates from initial analysis.
 * Used to narrow down choices for Pass 2.
 */
export function getTopCandidates(
  primaryCategory: DocumentCategory,
  primaryConfidence: number,
  embeddingCategory: DocumentCategory | null,
  embeddingSimilarity: number,
  limit: number = 3
): { category: DocumentCategory; confidence: number }[] {
  const candidates = new Map<DocumentCategory, number>()

  // Add primary AI category
  candidates.set(primaryCategory, primaryConfidence)

  // Add embedding-suggested category if different
  if (embeddingCategory && embeddingCategory !== primaryCategory) {
    candidates.set(embeddingCategory, embeddingSimilarity)
  }

  // Add needs_review as fallback option
  if (!candidates.has('needs_review')) {
    candidates.set('needs_review', 0.3)
  }

  // Sort by confidence and return top N
  return Array.from(candidates.entries())
    .map(([category, confidence]) => ({ category, confidence }))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, limit)
}
