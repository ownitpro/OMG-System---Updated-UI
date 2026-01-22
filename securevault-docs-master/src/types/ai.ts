// AI Document Analysis Types
// Types for OpenAI-powered document analysis

import type { DocumentCategory, DocumentSubtype, VaultContext } from './ocr'

// Suggested category for low-confidence classifications
export interface SuggestedCategory {
  category: DocumentCategory
  subtype: DocumentSubtype
  folderPath: string[]
  label: string // Display label for UI
}

// Result from OpenAI document analysis
export interface AIDocumentAnalysisResult {
  // Document classification
  classification: {
    category: DocumentCategory
    subtype: DocumentSubtype
    confidence: number
  }

  // Suggested filename based on document content
  suggestedFilename: string

  // Expiration date detection
  expirationDate: string | null // YYYY-MM-DD format
  expirationConfidence: number

  // Due date detection (for invoices, tax filings, bills, etc.)
  dueDate: string | null // YYYY-MM-DD format
  dueDateConfidence: number

  // Folder matching result
  folderSuggestion: {
    pathSegments: string[] // e.g., ["Personal Documents", "Identity", "2025", "Driver Licenses"]
    matchedExistingFolder: {
      id: string
      path: string
    } | null
    isNewFolder: boolean
  }

  // Extracted metadata from document
  extractedMetadata: {
    issueDate?: string
    personName?: string
    documentNumber?: string
    vendor?: string
    amount?: string
    companyName?: string
    clientName?: string
    address?: string
  }

  // For low-confidence classifications - suggested categories for user selection
  suggestedCategories?: SuggestedCategory[]

  // Processing info
  processingTimeMs: number
  modelUsed: string

  // Page count for PU (Processing Units) tracking
  pageCount?: number
}

// Request for document analysis
export interface AIAnalysisRequest {
  // Document info
  documentUrl: string // Presigned S3 URL for the document
  s3Key?: string // Original S3 key for direct download (more reliable for server-side extraction)
  fileName: string
  mimeType: string

  // Vault context
  vaultContext: VaultContext
  personalVaultId?: string
  organizationId?: string

  // Existing folders for smart matching
  existingFolders: ExistingFolderInfo[]

  // Optional org-specific settings
  orgCustomCategories?: string[]

  // Pre-extracted text from Textract (optional)
  // When provided, OpenAI will use this text instead of Vision API
  textractText?: string

  // Pre-extracted metadata from Textract (ID fields, expense fields)
  textractMetadata?: {
    // ID document fields
    fullName?: string
    dateOfBirth?: string
    documentNumber?: string
    expirationDate?: string
    address?: string
    // Expense document fields
    vendor?: string
    receiptDate?: string
    total?: string
    subtotal?: string
    tax?: string
  }
}

// Simplified folder info for AI matching
export interface ExistingFolderInfo {
  id: string
  name: string
  path: string // Full path like "Personal Documents/Identity/2025"
  parentId: string | null
}

// OpenAI API response structure (internal)
export interface OpenAIAnalysisResponse {
  classification: {
    category: string
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
    issueDate?: string
    personName?: string
    documentNumber?: string
    vendor?: string
    amount?: string
    companyName?: string
    clientName?: string
    address?: string
  }
}

// Batch analysis for multiple documents
export interface AIBatchAnalysisRequest {
  documents: AIAnalysisRequest[]
}

export interface AIBatchAnalysisResult {
  results: AIDocumentAnalysisResult[]
  totalProcessingTimeMs: number
  successCount: number
  failedCount: number
}

// Analysis status for UI
export type AIAnalysisStatus =
  | 'idle'
  | 'uploading'
  | 'analyzing'
  | 'matching_folders'
  | 'completed'
  | 'failed'

// Progress update for UI
export interface AIAnalysisProgress {
  status: AIAnalysisStatus
  progress: number // 0-100
  message: string
  currentFile?: string
  result?: AIDocumentAnalysisResult
  error?: string
}
