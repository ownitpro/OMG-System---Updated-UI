'use client'

import { useState, useCallback, useRef } from 'react'
import type {
  OCRResult,
  OCRProcessingStatus,
  OCRProgressUpdate,
  VaultContext,
} from '@/types/ocr'

// ============================================================================
// TYPES
// ============================================================================

interface OCRUploadState {
  isProcessing: boolean
  currentFile: string | null
  status: OCRProcessingStatus
  progress: number
  result: OCRResult | null
  error: string | null
}

interface UseOCRUploadOptions {
  vaultContext: VaultContext
  personalVaultId?: string
  organizationId?: string
  userId?: string
  onSuccess?: (result: OCRResult) => void
  onError?: (error: string, fileName: string) => void
  onComplete?: () => void
}

interface OCRUploadReturn {
  state: OCRUploadState
  processDocument: (
    documentId: string,
    s3Key: string,
    fileName: string,
    mimeType: string
  ) => Promise<OCRResult | null>
  retryDocument: (documentId: string) => Promise<OCRResult | null>
  manualSort: (documentId: string, targetFolderId: string) => Promise<boolean>
  reset: () => void
  isOCREnabled: boolean
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState: OCRUploadState = {
  isProcessing: false,
  currentFile: null,
  status: 'pending',
  progress: 0,
  result: null,
  error: null,
}

// ============================================================================
// PROGRESS SIMULATION
// ============================================================================

const STATUS_PROGRESS_MAP: Record<OCRProcessingStatus, number> = {
  pending: 5,
  extracting: 30,
  classifying: 55,
  creating_folders: 75,
  sorting: 90,
  completed: 100,
  failed: 100,
}

// ============================================================================
// HOOK
// ============================================================================

export function useOCRUpload(options: UseOCRUploadOptions): OCRUploadReturn {
  const {
    vaultContext,
    personalVaultId,
    organizationId,
    userId,
    onSuccess,
    onError,
    onComplete,
  } = options

  const [state, setState] = useState<OCRUploadState>(initialState)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Update state helper
  const updateState = useCallback((updates: Partial<OCRUploadState>) => {
    setState(prev => ({ ...prev, ...updates }))
  }, [])

  // Simulate progress through statuses
  const simulateProgress = useCallback(
    (status: OCRProcessingStatus) => {
      updateState({
        status,
        progress: STATUS_PROGRESS_MAP[status],
      })
    },
    [updateState]
  )

  // Process a document with OCR
  const processDocument = useCallback(
    async (
      documentId: string,
      s3Key: string,
      fileName: string,
      mimeType: string
    ): Promise<OCRResult | null> => {
      // Cancel any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      abortControllerRef.current = new AbortController()

      updateState({
        isProcessing: true,
        currentFile: fileName,
        status: 'pending',
        progress: 5,
        result: null,
        error: null,
      })

      try {
        // Simulate progress through extraction
        simulateProgress('extracting')

        // Build API URL based on context
        const apiUrl =
          vaultContext === 'personal'
            ? '/api/personal/ocr/process'
            : `/api/org/${organizationId}/ocr/process`

        // Make API call
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'process',
            documentId,
            s3Key,
            fileName,
            mimeType,
            personalVaultId: vaultContext === 'personal' ? personalVaultId : undefined,
            userId,
          }),
          signal: abortControllerRef.current.signal,
        })

        // Simulate classifying stage
        simulateProgress('classifying')

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'OCR processing failed')
        }

        // Simulate folder creation and sorting
        simulateProgress('creating_folders')
        await new Promise(resolve => setTimeout(resolve, 300))
        simulateProgress('sorting')
        await new Promise(resolve => setTimeout(resolve, 300))

        // Success
        const result: OCRResult = data.result
        updateState({
          isProcessing: false,
          status: 'completed',
          progress: 100,
          result,
          error: null,
        })

        onSuccess?.(result)
        onComplete?.()
        return result
      } catch (error: any) {
        // Handle abort
        if (error.name === 'AbortError') {
          return null
        }

        const errorMessage = error?.message || 'An unexpected error occurred'
        updateState({
          isProcessing: false,
          status: 'failed',
          progress: 100,
          error: errorMessage,
          result: {
            success: false,
            documentId,
            classification: {
              category: 'other',
              subtype: 'unknown',
              confidence: 0,
              patterns: [],
              suggestedFolderPath: ['Unsorted'],
            },
            metadata: {},
            targetFolder: {
              id: '',
              name: 'Unsorted',
              path: 'Unsorted',
              pathSegments: ['Unsorted'],
              created: false,
            },
            processingTime: 0,
            pagesProcessed: 0,
            error: errorMessage,
            retryable: true,
          },
        })

        onError?.(errorMessage, fileName)
        onComplete?.()
        return null
      }
    },
    [
      vaultContext,
      personalVaultId,
      organizationId,
      userId,
      updateState,
      simulateProgress,
      onSuccess,
      onError,
      onComplete,
    ]
  )

  // Retry a failed document
  const retryDocument = useCallback(
    async (documentId: string): Promise<OCRResult | null> => {
      updateState({
        isProcessing: true,
        status: 'pending',
        progress: 5,
        error: null,
      })

      try {
        simulateProgress('extracting')

        const apiUrl =
          vaultContext === 'personal'
            ? '/api/personal/ocr/process'
            : `/api/org/${organizationId}/ocr/process`

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'retry',
            documentId,
            userId,
          }),
        })

        simulateProgress('classifying')

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Retry failed')
        }

        simulateProgress('sorting')

        const result: OCRResult = data.result
        updateState({
          isProcessing: false,
          status: 'completed',
          progress: 100,
          result,
          error: null,
        })

        onSuccess?.(result)
        return result
      } catch (error: any) {
        const errorMessage = error?.message || 'Retry failed'
        updateState({
          isProcessing: false,
          status: 'failed',
          error: errorMessage,
        })

        onError?.(errorMessage, state.currentFile || 'Unknown')
        return null
      }
    },
    [vaultContext, organizationId, userId, updateState, simulateProgress, onSuccess, onError, state.currentFile]
  )

  // Manual sort
  const manualSort = useCallback(
    async (documentId: string, targetFolderId: string): Promise<boolean> => {
      try {
        const apiUrl =
          vaultContext === 'personal'
            ? '/api/personal/ocr/process'
            : `/api/org/${organizationId}/ocr/process`

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'manual_sort',
            documentId,
            targetFolderId,
            userId,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Manual sort failed')
        }

        return true
      } catch (error: any) {
        onError?.(error?.message || 'Manual sort failed', state.currentFile || 'Unknown')
        return false
      }
    },
    [vaultContext, organizationId, userId, onError, state.currentFile]
  )

  // Reset state
  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    setState(initialState)
  }, [])

  return {
    state,
    processDocument,
    retryDocument,
    manualSort,
    reset,
    isOCREnabled: true, // Can be extended to check feature flags
  }
}

// Export types for external use
export type { OCRUploadState, UseOCRUploadOptions, OCRUploadReturn }
