// AI Module Exports
// Central export point for AI-powered document analysis

export {
  analyzeDocument,
  analyzeDocumentFromBase64,
  isOpenAIConfigured,
} from './document-analyzer'

export {
  buildSystemPrompt,
  buildAnalysisPrompt,
  validateAnalysisResponse,
  sanitizeFilename,
  getExtensionFromFilename,
} from './prompts/document-analysis'

// Re-export types
export type {
  AIDocumentAnalysisResult,
  AIAnalysisRequest,
  ExistingFolderInfo,
  AIBatchAnalysisRequest,
  AIBatchAnalysisResult,
  AIAnalysisStatus,
  AIAnalysisProgress,
} from '@/types/ai'
