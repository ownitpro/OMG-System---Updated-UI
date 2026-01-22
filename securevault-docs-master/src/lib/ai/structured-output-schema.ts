/**
 * Structured Output Schema for OpenAI Document Classification
 *
 * Uses OpenAI's Structured Outputs feature to enforce strict category enums.
 * This prevents the model from returning invalid or vague categories.
 *
 * Part of the AI Analysis Improvements initiative (Phase 3).
 */

/**
 * Valid document categories - must match DocumentCategory type in types/ocr.ts
 */
export const VALID_CATEGORIES = [
  'identity',
  'financial',
  'tax',
  'income',
  'expense',
  'invoice',
  'medical',
  'insurance',
  'legal',
  'property',
  'business',
  'employment',
  'education',
  'certification',
  'correspondence',
  'vehicle',
  'personal',
  'travel',
  'technical',
  'needs_review',
  'other',
] as const

/**
 * JSON Schema for OpenAI Structured Outputs
 * Forces the model to output valid categories and structured metadata
 */
export const DOCUMENT_ANALYSIS_SCHEMA = {
  type: 'json_schema',
  json_schema: {
    name: 'document_classification',
    strict: true,
    schema: {
      type: 'object',
      properties: {
        classification: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              enum: VALID_CATEGORIES,
              description: 'The document category - must be one of the allowed values',
            },
            subtype: {
              type: 'string',
              description: 'Specific document subtype within the category',
            },
            confidence: {
              type: 'number',
              minimum: 0,
              maximum: 1,
              description: 'Confidence score from 0 to 1',
            },
          },
          required: ['category', 'subtype', 'confidence'],
          additionalProperties: false,
        },
        expirationDate: {
          type: ['string', 'null'],
          description: 'Expiration date in YYYY-MM-DD format, or null if not found',
        },
        expirationConfidence: {
          type: 'number',
          minimum: 0,
          maximum: 1,
          description: 'Confidence in the expiration date extraction',
        },
        dueDate: {
          type: ['string', 'null'],
          description: 'Due date in YYYY-MM-DD format, or null if not found',
        },
        dueDateConfidence: {
          type: 'number',
          minimum: 0,
          maximum: 1,
          description: 'Confidence in the due date extraction',
        },
        suggestedFilename: {
          type: 'string',
          description: 'Suggested filename based on document content',
        },
        folderMatch: {
          type: 'object',
          properties: {
            existingFolderId: {
              type: ['string', 'null'],
              description: 'ID of matched existing folder, or null if no match',
            },
            suggestedPath: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of folder path segments',
            },
          },
          required: ['existingFolderId', 'suggestedPath'],
          additionalProperties: false,
        },
        metadata: {
          type: 'object',
          properties: {
            issueDate: { type: ['string', 'null'] },
            personName: { type: ['string', 'null'] },
            documentNumber: { type: ['string', 'null'] },
            vendor: { type: ['string', 'null'] },
            amount: { type: ['string', 'null'] },
            companyName: { type: ['string', 'null'] },
            clientName: { type: ['string', 'null'] },
            address: { type: ['string', 'null'] },
          },
          // OpenAI strict mode requires ALL properties in required array
          // Values can still be null (as defined by type: ['string', 'null'])
          required: ['issueDate', 'personName', 'documentNumber', 'vendor', 'amount', 'companyName', 'clientName', 'address'],
          additionalProperties: false,
        },
      },
      required: [
        'classification',
        'expirationDate',
        'expirationConfidence',
        'dueDate',
        'dueDateConfidence',
        'suggestedFilename',
        'folderMatch',
        'metadata',
      ],
      additionalProperties: false,
    },
  },
} as const

/**
 * Type for the structured output response
 */
export interface StructuredAnalysisResponse {
  classification: {
    category: typeof VALID_CATEGORIES[number]
    subtype: string
    confidence: number
  }
  expirationDate: string | null
  expirationConfidence: number
  dueDate: string | null
  dueDateConfidence: number
  suggestedFilename: string
  folderMatch: {
    existingFolderId: string | null
    suggestedPath: string[]
  }
  metadata: {
    issueDate?: string | null
    personName?: string | null
    documentNumber?: string | null
    vendor?: string | null
    amount?: string | null
    companyName?: string | null
    clientName?: string | null
    address?: string | null
  }
}

/**
 * Validate that a category is in the allowed list
 */
export function isValidCategory(category: string): category is typeof VALID_CATEGORIES[number] {
  return VALID_CATEGORIES.includes(category as typeof VALID_CATEGORIES[number])
}

/**
 * Get the response format config for OpenAI API call
 * Returns either structured output schema or basic json_object based on useStructuredOutputs flag
 */
export function getResponseFormat(useStructuredOutputs: boolean = true): { type: 'json_object' } | typeof DOCUMENT_ANALYSIS_SCHEMA {
  if (useStructuredOutputs) {
    return DOCUMENT_ANALYSIS_SCHEMA
  }
  return { type: 'json_object' }
}
