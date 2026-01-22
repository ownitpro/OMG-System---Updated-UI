/**
 * Embeddings Module
 *
 * Generates and compares document embeddings using OpenAI's text-embedding-3-small.
 * Used to compare new documents against the gold set for similarity-based classification.
 *
 * Part of the AI Analysis Improvements initiative (Phase 6).
 */

import OpenAI from 'openai'
import type { DocumentCategory } from '@/types/ocr'
import { getGoldSetExamples, type GoldSetExample } from './gold-set'

// Cache for embeddings to reduce API calls
const embeddingCache = new Map<string, number[]>()

/**
 * Generate an embedding for a text using OpenAI's text-embedding-3-small.
 * Uses a simple in-memory cache to avoid redundant API calls.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  // Create a cache key from first 100 chars (for deduplication)
  const cacheKey = text.substring(0, 100)

  // Check cache first
  if (embeddingCache.has(cacheKey)) {
    return embeddingCache.get(cacheKey)!
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  try {
    // Truncate text to fit token limit (8191 tokens ≈ ~32000 chars)
    const truncatedText = text.substring(0, 8000)

    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: truncatedText,
    })

    const embedding = response.data[0].embedding

    // Cache the result (limit cache size to prevent memory issues)
    if (embeddingCache.size > 1000) {
      // Clear oldest entries (simple approach - clear half)
      const keys = Array.from(embeddingCache.keys())
      keys.slice(0, 500).forEach(k => embeddingCache.delete(k))
    }
    embeddingCache.set(cacheKey, embedding)

    return embedding
  } catch (error: any) {
    console.error('[EMBEDDINGS] Error generating embedding:', error.message)
    throw error
  }
}

/**
 * Calculate cosine similarity between two embeddings.
 * Returns a value between -1 and 1, where 1 means identical.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Embeddings must have the same dimension')
  }

  let dotProduct = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }

  normA = Math.sqrt(normA)
  normB = Math.sqrt(normB)

  if (normA === 0 || normB === 0) {
    return 0
  }

  return dotProduct / (normA * normB)
}

/**
 * Result of comparing a document against the gold set.
 */
export interface SimilarityResult {
  /** Best matching category from gold set */
  matchedCategory: DocumentCategory | null
  /** Best matching subtype */
  matchedSubtype: string | null
  /** Similarity score (0-1) */
  similarity: number
  /** Number of gold set examples compared */
  examplesCompared: number
  /** Whether the AI category matches the embedding match */
  agreesWithAI: boolean
}

/**
 * Compare a document's text against the gold set to find similar examples.
 * Returns the best matching category and similarity score.
 */
export async function compareToGoldSet(
  documentText: string,
  aiCategory: DocumentCategory,
  organizationId?: string
): Promise<SimilarityResult> {
  try {
    // Get gold set examples for the AI-suggested category and a few alternatives
    const categoriesToCheck: DocumentCategory[] = [
      aiCategory,
      // Also check related categories for cross-validation
      ...getRelatedCategories(aiCategory),
    ]

    let bestMatch: {
      category: DocumentCategory
      subtype: string | null
      similarity: number
    } | null = null

    let totalExamples = 0

    // Generate embedding for the current document
    const docEmbedding = await generateEmbedding(documentText)

    for (const category of categoriesToCheck) {
      const examples = await getGoldSetExamples(category, organizationId, 10)

      for (const example of examples) {
        totalExamples++

        // Generate embedding for the gold set example
        const exampleEmbedding = await generateEmbedding(example.textSample)

        // Calculate similarity
        const similarity = cosineSimilarity(docEmbedding, exampleEmbedding)

        // Update best match if this is better
        if (!bestMatch || similarity > bestMatch.similarity) {
          bestMatch = {
            category: example.category as DocumentCategory,
            subtype: example.subtype,
            similarity,
          }
        }
      }
    }

    // If no examples found, return neutral result
    if (!bestMatch) {
      return {
        matchedCategory: null,
        matchedSubtype: null,
        similarity: 0,
        examplesCompared: 0,
        agreesWithAI: true, // No data to disagree
      }
    }

    return {
      matchedCategory: bestMatch.category,
      matchedSubtype: bestMatch.subtype,
      similarity: bestMatch.similarity,
      examplesCompared: totalExamples,
      agreesWithAI: bestMatch.category === aiCategory,
    }
  } catch (error: any) {
    console.error('[EMBEDDINGS] Error comparing to gold set:', error.message)
    // Return neutral result on error
    return {
      matchedCategory: null,
      matchedSubtype: null,
      similarity: 0,
      examplesCompared: 0,
      agreesWithAI: true,
    }
  }
}

/**
 * Get related categories for cross-validation.
 * If embeddings strongly match a different category, it may indicate misclassification.
 */
function getRelatedCategories(category: DocumentCategory): DocumentCategory[] {
  const relatedMap: Record<string, DocumentCategory[]> = {
    identity: ['personal', 'legal'],
    financial: ['tax', 'income', 'expense', 'invoice'],
    tax: ['financial', 'income'],
    income: ['financial', 'tax', 'employment'],
    expense: ['financial', 'invoice'],
    invoice: ['expense', 'financial'],
    medical: ['insurance', 'personal'],
    insurance: ['medical', 'financial', 'legal'],
    legal: ['property', 'business', 'employment'],
    property: ['legal', 'financial'],
    business: ['legal', 'financial', 'employment'],
    employment: ['income', 'business', 'legal'],
    education: ['certification', 'personal'],
    certification: ['education', 'employment'],
    correspondence: ['personal', 'legal'],
    vehicle: ['insurance', 'legal'],
    personal: ['identity', 'correspondence'],
    travel: ['expense', 'personal'],
    technical: ['business', 'education'],
    needs_review: [],
    other: [],
  }

  return relatedMap[category] || []
}

/**
 * Check if we have enough gold set examples to reliably use embeddings.
 * Requires at least 5 examples per category for meaningful comparison.
 */
export async function hasEnoughExamples(
  category: DocumentCategory,
  organizationId?: string,
  minimumRequired: number = 5
): Promise<boolean> {
  const examples = await getGoldSetExamples(category, organizationId, minimumRequired)
  return examples.length >= minimumRequired
}
