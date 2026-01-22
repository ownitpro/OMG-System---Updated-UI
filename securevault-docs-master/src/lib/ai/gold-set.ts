/**
 * Gold Set Management
 *
 * Builds and manages a "gold set" of correctly classified documents.
 * When users correct document classifications (move to correct folder),
 * we store the OCR text embedding for future similarity matching.
 *
 * Part of the AI Analysis Improvements initiative (Phase 4).
 */

import type { DocumentCategory, DocumentSubtype } from '@/types/ocr'

/**
 * Gold set example - a correctly classified document
 */
export interface GoldSetExample {
  id: string
  category: DocumentCategory
  subtype: DocumentSubtype | null
  textSample: string // First 500 chars of OCR text
  folderPath: string
  source: 'user_correction' | 'seed' | 'admin'
  organizationId: string | null // null for personal vault
  userId: string
  createdAt: Date
}

/**
 * Input for adding a gold set example
 */
export interface AddGoldSetExampleInput {
  category: DocumentCategory
  subtype: DocumentSubtype | null
  ocrText: string
  folderPath: string
  userId: string
  organizationId?: string
}

/**
 * Add a gold set example when a user corrects document classification.
 * Called when user moves a document to a folder (confirming correct category).
 */
export async function addToGoldSet(input: AddGoldSetExampleInput): Promise<GoldSetExample | null> {
  try {
    const { query, queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    // Truncate text sample to 500 chars
    const textSample = input.ocrText.substring(0, 500)

    // Check if we already have a very similar example (avoid duplicates)
    // Simple check: same category + subtype + first 100 chars match
    const textPrefix = textSample.substring(0, 100)
    const existingExample = await queryOne<{ id: string }>(
      `SELECT id FROM ${getTableName('GoldSetExample')}
       WHERE category = $1
       AND (subtype = $2 OR ($2 IS NULL AND subtype IS NULL))
       AND "textSample" LIKE $3 || '%'
       AND ("organizationId" = $4 OR ($4 IS NULL AND "organizationId" IS NULL))
       LIMIT 1`,
      [input.category, input.subtype, textPrefix, input.organizationId || null]
    )

    if (existingExample) {
      console.log('[GOLD-SET] Similar example already exists, skipping:', existingExample.id)
      return null
    }

    // Insert new gold set example
    const result = await queryOne<GoldSetExample>(
      `INSERT INTO ${getTableName('GoldSetExample')}
       (category, subtype, "textSample", "folderPath", source, "organizationId", "userId", "createdAt")
       VALUES ($1, $2, $3, $4, 'user_correction', $5, $6, NOW())
       RETURNING *`,
      [
        input.category,
        input.subtype,
        textSample,
        input.folderPath,
        input.organizationId || null,
        input.userId,
      ]
    )

    if (result) {
      console.log('[GOLD-SET] Added new example:', {
        id: result.id,
        category: result.category,
        subtype: result.subtype,
        folderPath: result.folderPath,
      })
    }

    return result || null
  } catch (error: any) {
    console.error('[GOLD-SET] Error adding example:', error.message)
    return null
  }
}

/**
 * Get gold set examples for a category.
 * Used for similarity matching during classification.
 */
export async function getGoldSetExamples(
  category: DocumentCategory,
  organizationId?: string,
  limit: number = 20
): Promise<GoldSetExample[]> {
  try {
    const { query } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    // Get examples for this category (org-specific + global)
    const examples = await query<GoldSetExample>(
      `SELECT * FROM ${getTableName('GoldSetExample')}
       WHERE category = $1
       AND ("organizationId" = $2 OR "organizationId" IS NULL)
       ORDER BY "createdAt" DESC
       LIMIT $3`,
      [category, organizationId || null, limit]
    )

    return examples || []
  } catch (error: any) {
    console.error('[GOLD-SET] Error getting examples:', error.message)
    return []
  }
}

/**
 * Get the count of gold set examples per category.
 * Useful for determining if we have enough examples for similarity matching.
 */
export async function getGoldSetStats(organizationId?: string): Promise<Record<string, number>> {
  try {
    const { query } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const stats = await query<{ category: string; count: string }>(
      `SELECT category, COUNT(*) as count FROM ${getTableName('GoldSetExample')}
       WHERE "organizationId" = $1 OR "organizationId" IS NULL
       GROUP BY category`,
      [organizationId || null]
    )

    const result: Record<string, number> = {}
    for (const row of stats || []) {
      result[row.category] = parseInt(row.count, 10)
    }

    return result
  } catch (error: any) {
    console.error('[GOLD-SET] Error getting stats:', error.message)
    return {}
  }
}

/**
 * Infer category from folder path.
 * Maps folder names back to document categories.
 */
export function inferCategoryFromPath(folderPath: string): DocumentCategory | null {
  const pathLower = folderPath.toLowerCase()

  // Map folder paths to categories
  if (pathLower.includes('identity') || pathLower.includes('passport') || pathLower.includes('license')) {
    return 'identity'
  }
  if (pathLower.includes('financial') || pathLower.includes('bank') || pathLower.includes('investment')) {
    return 'financial'
  }
  if (pathLower.includes('tax') || pathLower.includes('w-2') || pathLower.includes('1099')) {
    return 'tax'
  }
  if (pathLower.includes('income') || pathLower.includes('pay stub') || pathLower.includes('salary')) {
    return 'income'
  }
  if (pathLower.includes('expense') || pathLower.includes('receipt')) {
    return 'expense'
  }
  if (pathLower.includes('invoice') || pathLower.includes('bill')) {
    return 'invoice'
  }
  if (pathLower.includes('medical') || pathLower.includes('health') || pathLower.includes('prescription')) {
    return 'medical'
  }
  if (pathLower.includes('insurance')) {
    return 'insurance'
  }
  if (pathLower.includes('legal') || pathLower.includes('contract') || pathLower.includes('agreement')) {
    return 'legal'
  }
  if (pathLower.includes('property') || pathLower.includes('deed') || pathLower.includes('mortgage')) {
    return 'property'
  }
  if (pathLower.includes('business') || pathLower.includes('proposal')) {
    return 'business'
  }
  if (pathLower.includes('employment') || pathLower.includes('job') || pathLower.includes('offer')) {
    return 'employment'
  }
  if (pathLower.includes('education') || pathLower.includes('transcript') || pathLower.includes('diploma')) {
    return 'education'
  }
  if (pathLower.includes('certification') || pathLower.includes('certificate')) {
    return 'certification'
  }
  if (pathLower.includes('correspondence') || pathLower.includes('letter')) {
    return 'correspondence'
  }
  if (pathLower.includes('vehicle') || pathLower.includes('car') || pathLower.includes('auto')) {
    return 'vehicle'
  }
  if (pathLower.includes('personal') || pathLower.includes('family')) {
    return 'personal'
  }
  if (pathLower.includes('travel') || pathLower.includes('trip') || pathLower.includes('vacation')) {
    return 'travel'
  }
  if (pathLower.includes('technical') || pathLower.includes('manual')) {
    return 'technical'
  }
  if (pathLower.includes('quick store') || pathLower.includes('needs review') || pathLower.includes('photo')) {
    return 'needs_review'
  }

  return null
}

/**
 * Infer subtype from folder path.
 * Maps folder names back to document subtypes.
 */
export function inferSubtypeFromPath(folderPath: string): DocumentSubtype | null {
  const pathLower = folderPath.toLowerCase()

  // Identity subtypes
  if (pathLower.includes('driver') || pathLower.includes('license')) return 'drivers_license'
  if (pathLower.includes('passport')) return 'passport'
  if (pathLower.includes('birth')) return 'birth_certificate'
  if (pathLower.includes('social security') || pathLower.includes('ssn')) return 'social_security'

  // Financial subtypes
  if (pathLower.includes('bank statement')) return 'bank_statement'
  if (pathLower.includes('credit card')) return 'credit_card_statement'

  // Tax subtypes
  if (pathLower.includes('w-2') || pathLower.includes('w2')) return 'w2'
  if (pathLower.includes('1099')) return '1099'
  if (pathLower.includes('tax return')) return 'tax_return'

  // Expense subtypes
  if (pathLower.includes('receipt')) return 'receipt'

  // Invoice subtypes
  if (pathLower.includes('invoice')) return 'invoice'

  // Medical subtypes
  if (pathLower.includes('prescription')) return 'prescription'
  if (pathLower.includes('lab result')) return 'lab_results'

  // Photos
  if (pathLower.includes('photo')) return 'photo'

  return null
}
