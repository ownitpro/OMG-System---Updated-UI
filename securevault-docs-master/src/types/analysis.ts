// Shared types for document analysis (Textract + OpenAI pipeline)

export interface FolderInfo {
  id: string
  name: string
  path: string
}

export interface DocumentAnalysisRequest {
  fileData: string          // Base64 encoded file data OR presigned S3 URL
  fileName: string          // Original filename
  mimeType: string          // e.g., "image/jpeg", "application/pdf"
  vaultContext: 'personal' | 'organization'
  existingFolders?: FolderInfo[]
  organizationId?: string
  personalVaultId?: string
}

export interface DocumentTypeInfo {
  category: string          // e.g., "identity", "financial", "medical"
  subtype: string           // e.g., "drivers_license", "bank_statement"
  confidence: number        // 0-1
}

export interface SuggestedFolderInfo {
  path: string[]            // e.g., ["Identity", "Driver Licenses"]
  existingFolderId: string | null
  isNewFolder: boolean
}

export interface ExtractedMetadata {
  personName?: string
  dateOfBirth?: string
  documentNumber?: string
  expirationDate?: string
  issueDate?: string
  vendor?: string
  amount?: string
  currency?: string
  invoiceNumber?: string
  address?: string
  companyName?: string
  clientName?: string
}

export interface DocumentAnalysisResult {
  success: boolean
  suggestedName: string
  documentType: DocumentTypeInfo
  expirationDate: string | null
  expirationConfidence: number
  dueDate: string | null
  dueDateConfidence: number
  suggestedFolder: SuggestedFolderInfo
  extractedMetadata: ExtractedMetadata
  textractRaw?: string       // Raw text from Textract (for debugging)
  error?: string
  processingTimeMs?: number
}

export type AnalysisStatus = 'pending' | 'analyzing' | 'complete' | 'error'

export interface AnalysisState {
  status: AnalysisStatus
  result?: DocumentAnalysisResult
  error?: string
}

// For scan modal - analysis results per captured image
export interface ScanAnalysisState {
  [index: number]: AnalysisState
}

// For upload modal - analysis results per file
export interface UploadAnalysisState {
  [fileName: string]: AnalysisState
}

// Category icons mapping
export const CATEGORY_ICONS: Record<string, string> = {
  identity: '🪪',
  financial: '💰',
  tax: '📋',
  income: '💵',
  expense: '🧾',
  invoice: '📄',
  medical: '🏥',
  insurance: '🛡️',
  legal: '⚖️',
  property: '🏠',
  business: '💼',
  employment: '👔',
  education: '🎓',
  certification: '📜',
  correspondence: '✉️',
  vehicle: '🚗',
  personal: '👤',
  travel: '✈️',
  technical: '⚙️',
  other: '📁',
}

// Human-readable category names
export const CATEGORY_LABELS: Record<string, string> = {
  identity: 'Identity Document',
  financial: 'Financial Document',
  tax: 'Tax Document',
  income: 'Income Document',
  expense: 'Expense/Receipt',
  invoice: 'Invoice/Bill',
  medical: 'Medical Record',
  insurance: 'Insurance Document',
  legal: 'Legal Document',
  property: 'Property Document',
  business: 'Business Document',
  employment: 'Employment Document',
  education: 'Education Document',
  certification: 'Certificate',
  correspondence: 'Correspondence',
  vehicle: 'Vehicle Document',
  personal: 'Personal Document',
  travel: 'Travel Document',
  technical: 'Technical Document',
  other: 'Document',
}
