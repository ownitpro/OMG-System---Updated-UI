'use client'

import { useState, useCallback } from 'react'
import type { AIDocumentAnalysisResult, AIAnalysisStatus, AIAnalysisProgress } from '@/types/ai'
import type { VaultContext } from '@/types/ocr'

interface UseDocumentAnalysisOptions {
  vaultContext: VaultContext
  personalVaultId?: string
  organizationId?: string
  userId: string
}

interface AnalyzeDocumentParams {
  s3Key: string
  fileName: string
  mimeType: string
  file?: File // Optional file for mock mode - will be converted to base64
}

export function useDocumentAnalysis(options: UseDocumentAnalysisOptions) {
  const { vaultContext, personalVaultId, organizationId, userId } = options

  const [status, setStatus] = useState<AIAnalysisStatus>('idle')
  const [progress, setProgress] = useState<AIAnalysisProgress | null>(null)
  const [result, setResult] = useState<AIDocumentAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Reset state
  const reset = useCallback(() => {
    setStatus('idle')
    setProgress(null)
    setResult(null)
    setError(null)
  }, [])

  // Analyze a single document
  const analyzeDocument = useCallback(async (params: AnalyzeDocumentParams): Promise<AIDocumentAnalysisResult | null> => {
    const { s3Key, fileName, mimeType, file } = params

    setStatus('analyzing')
    setError(null)
    setProgress({
      status: 'analyzing',
      progress: 20,
      message: 'Analyzing document...',
      currentFile: fileName,
    })

    try {
      // If file is provided (mock mode), convert to base64 for direct analysis
      let fileBase64: string | undefined
      if (file) {
        const arrayBuffer = await file.arrayBuffer()
        const bytes = new Uint8Array(arrayBuffer)
        let binary = ''
        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i])
        }
        fileBase64 = btoa(binary)
      }

      const response = await fetch('/api/documents/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({
          s3Key,
          fileName,
          mimeType,
          vaultContext,
          personalVaultId,
          organizationId,
          fileBase64, // Pass base64 data for mock mode
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Analysis failed')
      }

      const data = await response.json()

      if (!data.success || !data.result) {
        throw new Error('Invalid response from analysis API')
      }

      // Include pageCount from API response for PU tracking
      const analysisResult: AIDocumentAnalysisResult = {
        ...data.result,
        pageCount: data.pageCount || 1,
      }

      setResult(analysisResult)
      setStatus('completed')
      setProgress({
        status: 'completed',
        progress: 100,
        message: 'Analysis complete',
        currentFile: fileName,
        result: analysisResult,
      })

      return analysisResult
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed'
      setError(errorMessage)
      setStatus('failed')
      setProgress({
        status: 'failed',
        progress: 0,
        message: errorMessage,
        currentFile: fileName,
        error: errorMessage,
      })
      return null
    }
  }, [vaultContext, personalVaultId, organizationId, userId])

  // Analyze multiple documents (for bulk upload)
  const analyzeDocuments = useCallback(async (
    documents: AnalyzeDocumentParams[]
  ): Promise<(AIDocumentAnalysisResult | null)[]> => {
    const results: (AIDocumentAnalysisResult | null)[] = []

    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i]

      setProgress({
        status: 'analyzing',
        progress: Math.round(((i + 0.5) / documents.length) * 100),
        message: `Analyzing document ${i + 1} of ${documents.length}...`,
        currentFile: doc.fileName,
      })

      const result = await analyzeDocument(doc)
      results.push(result)
    }

    return results
  }, [analyzeDocument])

  // Check if OpenAI analysis is available
  const checkAvailability = useCallback(async (): Promise<boolean> => {
    try {
      // For now, just return true - the API will return 503 if not configured
      return true
    } catch {
      return false
    }
  }, [])

  return {
    status,
    progress,
    result,
    error,
    analyzeDocument,
    analyzeDocuments,
    checkAvailability,
    reset,
    isAnalyzing: status === 'analyzing',
    isComplete: status === 'completed',
    isFailed: status === 'failed',
  }
}

export default useDocumentAnalysis
