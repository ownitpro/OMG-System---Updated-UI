'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { X, Upload, File, AlertCircle, Sparkles, Brain, Loader2, AlertTriangle } from 'lucide-react'
import { formatFileSize, getFileMimeType } from '@/lib/mockStorage'

// Wake Lock API type declarations (not yet in all TypeScript versions)
interface WakeLockSentinel {
  readonly released: boolean
  readonly type: 'screen'
  release(): Promise<void>
  addEventListener(type: 'release', listener: () => void): void
  removeEventListener(type: 'release', listener: () => void): void
}

interface WakeLock {
  request(type: 'screen'): Promise<WakeLockSentinel>
}

declare global {
  interface Navigator {
    wakeLock?: WakeLock
  }
}

// Batch upload limits
const MAX_BATCH_FILES = 10
const MAX_FILE_SIZE_PROXY = 50 * 1024 * 1024 // 50MB per file for proxy upload
const MAX_FILE_SIZE_DIRECT = 5 * 1024 * 1024 * 1024 // 5GB for direct S3 upload

// Use direct S3 upload for files larger than this threshold (or when enabled)
const DIRECT_UPLOAD_THRESHOLD = 10 * 1024 * 1024 // 10MB

// Determine max file size based on upload strategy
const MAX_FILE_SIZE = MAX_FILE_SIZE_DIRECT // Now support up to 5GB
import { usePlanEnforcement } from '@/hooks/usePlanEnforcement'
import { getUpgradeSuggestion } from '@/lib/plan-limits'
import UpgradePromptModal from '@/components/UpgradePromptModal'
import { useAuth } from '@/contexts/AuthContext'
import { useOCRUpload } from '@/hooks/useOCRUpload'
import OCRProcessingModal from '@/components/ocr/OCRProcessingModal'
import FolderAccessPopup from '@/components/ocr/FolderAccessPopup'
import FileNameReviewModal, { type FileReviewItem } from '@/components/upload/FileNameReviewModal'
import BulkUploadSummaryModal, { type BulkUploadItem } from './BulkUploadSummaryModal'
import { generateSuggestedFilename } from '@/lib/ocr/filename-generator'
// Note: FilenameSuggestionModal removed - using BulkUploadSummaryModal for all uploads
import { useDocumentAnalysis } from '@/hooks/useDocumentAnalysis'
import type { OCRResult } from '@/types/ocr'
import type { AIDocumentAnalysisResult } from '@/types/ai'

interface UploadDocumentModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (files: FileUpload[]) => Promise<{ documentId: string; s3Key: string }[]>
  currentFolderName?: string
  personalVaultId?: string
  organizationId?: string
  enableOCR?: boolean
  onNavigateToFolder?: (folderId: string) => void
  onRefresh?: () => void // Callback to refresh document list after bulk upload
  initialFiles?: File[] // Files to pre-populate from drag-and-drop
}

interface FileUpload {
  file: File
  storageKey: string
  storageUrl: string
}

interface UploadedFile {
  fileName: string
  documentId: string
  s3Key: string
  ocrStatus: 'pending' | 'processing' | 'completed' | 'failed' | 'skipped'
  ocrResult?: OCRResult
}

export default function UploadDocumentModal({
  isOpen,
  onClose,
  onUpload,
  currentFolderName,
  personalVaultId,
  organizationId,
  enableOCR = true,
  onNavigateToFolder,
  onRefresh,
  initialFiles,
}: UploadDocumentModalProps) {
  const router = useRouter()
  const { user } = useAuth()
  const { canUploadFile, plan, trialExpired } = usePlanEnforcement()
  const [files, setFiles] = useState<File[]>([])

  // Pre-populate files from drag-and-drop
  useEffect(() => {
    if (isOpen && initialFiles && initialFiles.length > 0) {
      setFiles(initialFiles)
    }
  }, [isOpen, initialFiles])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [upgradeMessage, setUpgradeMessage] = useState({
    title: '',
    message: '',
    suggestedPlan: 'starter',
    benefits: [] as string[],
  })

  // OCR-specific state
  const [useOCRSort, setUseOCRSort] = useState(enableOCR)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [currentOCRIndex, setCurrentOCRIndex] = useState(-1)
  const [showOCRModal, setShowOCRModal] = useState(false)
  const [showFolderPopup, setShowFolderPopup] = useState(false)
  const [lastOCRResult, setLastOCRResult] = useState<OCRResult | null>(null)

  // Filename review state
  const [showFileNameReview, setShowFileNameReview] = useState(false)
  const [fileReviewItems, setFileReviewItems] = useState<FileReviewItem[]>([])

  // AI Analysis state - Bulk upload approach
  const [useAIAnalysis, setUseAIAnalysis] = useState(true) // Enable by default
  const [showBulkSummaryModal, setShowBulkSummaryModal] = useState(false)
  const [bulkUploadItems, setBulkUploadItems] = useState<BulkUploadItem[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzingProgress, setAnalyzingProgress] = useState({ current: 0, total: 0 })
  const [isConfirmProcessing, setIsConfirmProcessing] = useState(false)
  const [existingFolders, setExistingFolders] = useState<{ id: string; path: string }[]>([])

  // Processing Units exhaustion state
  const [puExhausted, setPuExhausted] = useState(false)
  const [puWarningMessage, setPuWarningMessage] = useState<string | null>(null)

  // Upload progress state for direct S3 uploads
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [currentUploadingFile, setCurrentUploadingFile] = useState<string | null>(null)

  // Helper function for direct S3 upload with progress tracking
  const uploadToS3Direct = useCallback(async (
    file: File,
    presignedUrl: string,
    contentType: string,
    onProgress?: (percent: number) => void
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const percent = Math.round((event.loaded / event.total) * 100)
          onProgress(percent)
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(true)
        } else {
          reject(new Error(`S3 upload failed with status ${xhr.status}`))
        }
      })

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during S3 upload'))
      })

      xhr.addEventListener('abort', () => {
        reject(new Error('Upload was aborted'))
      })

      xhr.open('PUT', presignedUrl)
      xhr.setRequestHeader('Content-Type', contentType)
      xhr.send(file)
    })
  }, [])

  // OCR hook
  const vaultContext = personalVaultId ? 'personal' : 'organization'
  const {
    state: ocrState,
    processDocument,
    retryDocument,
    reset: resetOCR,
  } = useOCRUpload({
    vaultContext,
    personalVaultId,
    organizationId,
    userId: user?.id,
    onSuccess: (result) => {
      setLastOCRResult(result)
      // Update the uploaded file status
      setUploadedFiles(prev =>
        prev.map((f, i) =>
          i === currentOCRIndex
            ? { ...f, ocrStatus: 'completed', ocrResult: result }
            : f
        )
      )
    },
    onError: () => {
      setUploadedFiles(prev =>
        prev.map((f, i) =>
          i === currentOCRIndex ? { ...f, ocrStatus: 'failed' } : f
        )
      )
    },
  })

  // AI Analysis hook
  const {
    analyzeDocument: runAIAnalysis,
    reset: resetAIAnalysis,
  } = useDocumentAnalysis({
    vaultContext,
    personalVaultId,
    organizationId,
    userId: user?.id || '',
  })

  // Track upload progress to prevent tab-switch interruption
  const uploadInProgressRef = useRef(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Prevent tab visibility from affecting uploads - request wake lock if available
  useEffect(() => {
    if (!uploading) return

    // Try to keep the tab active during uploads
    let wakeLock: WakeLockSentinel | null = null

    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await navigator.wakeLock.request('screen')
          console.log('[UPLOAD] Wake lock acquired to prevent tab throttling')
        }
      } catch (err) {
        // Wake lock not supported or denied - fall back to visibility handling
        console.log('[UPLOAD] Wake lock not available, using visibility fallback')
      }
    }

    if (uploading) {
      requestWakeLock()
    }

    // Cleanup wake lock when upload completes
    return () => {
      if (wakeLock) {
        wakeLock.release()
        console.log('[UPLOAD] Wake lock released')
      }
    }
  }, [uploading])

  // Also listen for visibility changes to warn user
  useEffect(() => {
    if (!uploading) return

    const handleVisibilityChange = () => {
      if (document.hidden && uploadInProgressRef.current) {
        console.log('[UPLOAD] Tab hidden during upload - uploads may be throttled')
        // Note: We can't prevent throttling, but the upload will resume when tab is visible
      } else if (!document.hidden && uploadInProgressRef.current) {
        console.log('[UPLOAD] Tab visible again - uploads continuing')
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [uploading])

  // Check PU exhaustion when modal opens
  useEffect(() => {
    if (!isOpen) return

    const checkPUUsage = async () => {
      try {
        const res = await fetch('/api/user/usage')
        if (res.ok) {
          const data = await res.json()
          const puUsed = data.usage?.processing?.monthlyUsed || 0
          const puLimit = data.usage?.processing?.monthlyLimit || 0
          const puRemaining = puLimit - puUsed

          if (puRemaining <= 0 && puLimit > 0) {
            setPuExhausted(true)
            setUseAIAnalysis(false)
            setPuWarningMessage('Processing Units exhausted. Documents will be uploaded without AI analysis.')
          } else {
            setPuExhausted(false)
            setPuWarningMessage(null)
          }
        }
      } catch (error) {
        console.error('Error checking PU usage:', error)
      }
    }

    checkPUUsage()
  }, [isOpen])

  // Fetch existing folders for the modal
  const fetchExistingFolders = useCallback(async () => {
    try {
      const vaultParam = personalVaultId
        ? `personalVaultId=${personalVaultId}`
        : `organizationId=${organizationId}`

      const response = await fetch(`/api/folders?${vaultParam}&includeAll=true`)
      const data = await response.json()

      if (data.folders) {
        setExistingFolders(data.folders.map((f: any) => ({ id: f.id, path: f.path || f.name })))
      }
    } catch (error) {
      console.error('Error fetching folders:', error)
    }
  }, [personalVaultId, organizationId])

  // Process AI analysis for ALL uploaded files, then show bulk summary
  const processAIAnalysisBulk = useCallback(async (
    uploadedDocs: { file: File; s3Key: string; documentId: string }[]
  ) => {
    if (uploadedDocs.length === 0) return

    setIsAnalyzing(true)
    setAnalyzingProgress({ current: 0, total: uploadedDocs.length })

    // Fetch existing folders for the dropdown
    await fetchExistingFolders()

    const analyzedItems: BulkUploadItem[] = []

    // Analyze all files sequentially
    for (let i = 0; i < uploadedDocs.length; i++) {
      const item = uploadedDocs[i]
      if (!item) continue

      setAnalyzingProgress({ current: i + 1, total: uploadedDocs.length })

      // Run AI analysis - pass the file for mock mode base64 conversion
      const result = await runAIAnalysis({
        s3Key: item.s3Key,
        fileName: item.file.name,
        mimeType: item.file.type,
        file: item.file, // Pass file for mock mode - will be converted to base64
      })

      if (result) {
        analyzedItems.push({
          file: item.file,
          s3Key: item.s3Key,
          documentId: item.documentId,
          analysis: result,
          finalFilename: result.suggestedFilename,
          expirationDate: result.expirationDate,
          enableTracking: !!result.expirationDate,
          dueDate: result.dueDate,
          enableDueDateTracking: !!result.dueDate,
        })
      } else {
        // Fallback if analysis fails - keep original name
        analyzedItems.push({
          file: item.file,
          s3Key: item.s3Key,
          documentId: item.documentId,
          analysis: {
            classification: { category: 'other', subtype: 'unknown', confidence: 0.3 },
            suggestedFilename: item.file.name,
            expirationDate: null,
            expirationConfidence: 0,
            dueDate: null,
            dueDateConfidence: 0,
            folderSuggestion: { pathSegments: [], matchedExistingFolder: null, isNewFolder: true },
            extractedMetadata: {},
            processingTimeMs: 0,
            modelUsed: 'fallback',
          },
          finalFilename: item.file.name,
          expirationDate: null,
          enableTracking: false,
          dueDate: null,
          enableDueDateTracking: false,
        })
      }
    }

    setIsAnalyzing(false)

    // Show bulk summary modal with all results
    if (analyzedItems.length > 0) {
      setBulkUploadItems(analyzedItems)
      setShowBulkSummaryModal(true)
    }
  }, [runAIAnalysis, fetchExistingFolders])

  // Handle bulk confirm all - process all documents at once
  const handleBulkConfirmAll = useCallback(async (items: BulkUploadItem[]) => {
    if (items.length === 0) return

    setIsConfirmProcessing(true)

    try {
      // Process all items
      for (const item of items) {
        // 1. Rename document
        await fetch(`/api/documents/${item.documentId}/rename`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: item.finalFilename }),
        })

        // 2. Set expiration if enabled
        if (item.expirationDate && item.enableTracking) {
          await fetch(`/api/documents/${item.documentId}/expiration`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              expirationDate: item.expirationDate,
              trackingEnabled: item.enableTracking,
            }),
          })
        }

        // 3. Set due date if enabled
        if (item.dueDate && item.enableDueDateTracking) {
          await fetch(`/api/documents/${item.documentId}/due-date`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              dueDate: item.dueDate,
              trackingEnabled: item.enableDueDateTracking,
            }),
          })
        }

        // 4. Move document to correct folder
        const folderSuggestion = item.analysis.folderSuggestion

        // Check if user wants to create a custom folder path
        if (item.createCustomPath && item.createCustomPath.length > 0) {
          // User specified a custom folder path to create
          console.log('[BULK-UPLOAD] Creating custom folder:', item.finalFilename, '->', item.createCustomPath.join('/'))
          await fetch(`/api/documents/${item.documentId}/smart-move`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              suggestedPath: item.createCustomPath,
              vaultContext,
              personalVaultId,
              organizationId,
            }),
          })
        }
        // Check if user selected an existing folder
        else if (item.customFolderId !== undefined) {
          // User explicitly chose a folder (or root)
          if (item.customFolderId === null) {
            // User chose root - set folderId to null
            console.log('[BULK-UPLOAD] Moving to root:', item.finalFilename)
            await fetch(`/api/documents/${item.documentId}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ folderId: null }),
            })
          } else {
            // User chose a specific existing folder
            console.log('[BULK-UPLOAD] Moving to custom folder:', item.finalFilename, '->', item.customFolderPath)
            await fetch(`/api/documents/${item.documentId}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ folderId: item.customFolderId }),
            })
          }
        }
        // Case 1: OpenAI matched an existing folder - directly update folderId
        else if (folderSuggestion.matchedExistingFolder?.id) {
          console.log('[BULK-UPLOAD] Moving to matched folder:', item.finalFilename, '->', folderSuggestion.matchedExistingFolder.path)
          await fetch(`/api/documents/${item.documentId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              folderId: folderSuggestion.matchedExistingFolder.id,
            }),
          })
        }
        // Case 2: Need to create new folder or use smart matching
        else if (folderSuggestion.pathSegments.length > 0) {
          console.log('[BULK-UPLOAD] Smart-moving:', item.finalFilename, '->', folderSuggestion.pathSegments.join('/'))
          console.log('[BULK-UPLOAD] Smart-move params:', { vaultContext, personalVaultId, organizationId })
          const smartMoveRes = await fetch(`/api/documents/${item.documentId}/smart-move`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              suggestedPath: folderSuggestion.pathSegments,
              vaultContext,
              personalVaultId,
              organizationId,
            }),
          })
          if (!smartMoveRes.ok) {
            const errData = await smartMoveRes.json().catch(() => ({}))
            console.error('[BULK-UPLOAD] Smart-move FAILED:', smartMoveRes.status, errData)
          } else {
            const successData = await smartMoveRes.json()
            console.log('[BULK-UPLOAD] Smart-move SUCCESS:', successData.folder?.path)
          }
        }
        // FALLBACK: Generate folder path from category if all else fails
        // This prevents documents from being stuck in root
        else {
          const { category, subtype } = item.analysis.classification
          const year = new Date().getFullYear().toString()
          // Convert snake_case to Title Case
          const formatName = (s: string) => s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
          const categoryFolder = formatName(category)
          const subtypeFolder = formatName(subtype)
          const fallbackPath = vaultContext === 'personal'
            ? ['Personal Documents', categoryFolder, year, subtypeFolder]
            : [categoryFolder, year, subtypeFolder]

          console.log('[BULK-UPLOAD] FALLBACK: No folder suggestion, generating from category:', item.finalFilename, '->', fallbackPath.join('/'))
          console.log('[BULK-UPLOAD] Fallback params:', { vaultContext, personalVaultId, organizationId })
          const fallbackRes = await fetch(`/api/documents/${item.documentId}/smart-move`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              suggestedPath: fallbackPath,
              vaultContext,
              personalVaultId,
              organizationId,
            }),
          })
          if (!fallbackRes.ok) {
            const errData = await fallbackRes.json().catch(() => ({}))
            console.error('[BULK-UPLOAD] Fallback smart-move FAILED:', fallbackRes.status, errData)
          } else {
            const successData = await fallbackRes.json()
            console.log('[BULK-UPLOAD] Fallback smart-move SUCCESS:', successData.folder?.path)
          }
        }

        // 5. Confirm document (changes status from 'pending' to 'confirmed', makes it visible in vault)
        // Pass wasAnalyzed and pageCount to track Processing Units usage
        const pageCount = item.analysis?.pageCount || 1
        console.log('[BULK-UPLOAD] Confirming document:', item.documentId, 'pageCount:', pageCount)
        const confirmRes = await fetch(`/api/documents/${item.documentId}/confirm`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ wasAnalyzed: true, pageCount }),
        })
        if (confirmRes.ok) {
          const confirmData = await confirmRes.json()
          console.log('[BULK-UPLOAD] Confirm succeeded:', item.documentId, confirmData)
        } else {
          const errData = await confirmRes.json().catch(() => ({}))
          console.error('[BULK-UPLOAD] Confirm FAILED:', item.documentId, confirmRes.status, errData)
        }
      }

      // All done - close everything
      setShowBulkSummaryModal(false)
      setBulkUploadItems([])
      onClose()

      // Refresh document list - use callback if provided, otherwise use soft router refresh
      if (onRefresh) {
        // Small delay to ensure modal is closed before refreshing
        setTimeout(() => {
          onRefresh()
        }, 100)
      } else {
        // Fallback: use Next.js router refresh (soft refresh, preserves auth state)
        setTimeout(() => {
          router.refresh()
        }, 100)
      }
    } catch (error) {
      console.error('Error processing bulk upload:', error)
    } finally {
      setIsConfirmProcessing(false)
    }
  }, [vaultContext, personalVaultId, organizationId, onClose, onRefresh, router])

  // Handle bulk cancel - delete uploaded documents when user cancels
  const handleBulkCancel = useCallback(async () => {
    // Delete all documents that were uploaded but not confirmed
    if (bulkUploadItems.length > 0) {
      console.log('[BULK-UPLOAD] Cancelling upload, deleting', bulkUploadItems.length, 'documents')

      for (const item of bulkUploadItems) {
        try {
          await fetch(`/api/documents/${item.documentId}`, {
            method: 'DELETE',
          })
          console.log('[BULK-UPLOAD] Deleted document:', item.documentId)
        } catch (error) {
          console.error('[BULK-UPLOAD] Failed to delete document:', item.documentId, error)
        }
      }
    }

    setShowBulkSummaryModal(false)
    setBulkUploadItems([])
    onClose()

    // Refresh to show updated state (documents removed)
    if (onRefresh) {
      setTimeout(() => {
        onRefresh()
      }, 100)
    } else {
      setTimeout(() => {
        router.refresh()
      }, 100)
    }
  }, [bulkUploadItems, onClose, onRefresh, router])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFiles = Array.from(e.dataTransfer.files)

    // Validate batch limit
    const totalFiles = files.length + droppedFiles.length
    if (totalFiles > MAX_BATCH_FILES) {
      setError(`You can upload a maximum of ${MAX_BATCH_FILES} files at once. Please select fewer files or upload in batches.`)
      return
    }

    // Validate individual file sizes
    const oversizedFiles = droppedFiles.filter(f => f.size > MAX_FILE_SIZE)
    if (oversizedFiles.length > 0) {
      setError(`Some files exceed the ${formatFileSize(MAX_FILE_SIZE)} limit: ${oversizedFiles.map(f => f.name).join(', ')}`)
      return
    }

    setFiles((prev) => [...prev, ...droppedFiles])
    setError(null)
  }, [files.length])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)

      // Validate batch limit
      const totalFiles = files.length + selectedFiles.length
      if (totalFiles > MAX_BATCH_FILES) {
        setError(`You can upload a maximum of ${MAX_BATCH_FILES} files at once. Please select fewer files or upload in batches.`)
        e.target.value = '' // Reset input
        return
      }

      // Validate individual file sizes
      const oversizedFiles = selectedFiles.filter(f => f.size > MAX_FILE_SIZE)
      if (oversizedFiles.length > 0) {
        setError(`Some files exceed the ${formatFileSize(MAX_FILE_SIZE)} limit: ${oversizedFiles.map(f => f.name).join(', ')}`)
        e.target.value = '' // Reset input
        return
      }

      setFiles((prev) => [...prev, ...selectedFiles])
      setError(null)
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // Process OCR for uploaded files sequentially
  const processOCRQueue = async (uploadedDocs: UploadedFile[], originalFiles: File[]) => {
    const completedResults: { doc: UploadedFile; result: OCRResult; file: File }[] = []

    for (let i = 0; i < uploadedDocs.length; i++) {
      const doc = uploadedDocs[i]
      if (!doc) continue

      setCurrentOCRIndex(i)
      setShowOCRModal(true)

      // Mark as processing
      setUploadedFiles(prev =>
        prev.map((f, idx) =>
          idx === i ? { ...f, ocrStatus: 'processing' } : f
        )
      )

      // Process the document
      await processDocument(
        doc.documentId,
        doc.s3Key,
        doc.fileName,
        originalFiles[i]?.type || 'application/octet-stream'
      )

      // Wait a bit before processing next file
      if (i < uploadedDocs.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }

    // All done - close OCR modal
    setShowOCRModal(false)

    // Get the completed documents with OCR results
    const completedDocs = uploadedFiles.filter(f => f.ocrStatus === 'completed' && f.ocrResult)

    // Generate filename suggestions and show review modal
    if (completedDocs.length > 0) {
      const reviewItems: FileReviewItem[] = completedDocs.map((doc, idx) => {
        const originalFile = originalFiles[idx]
        const suggestion = generateSuggestedFilename(
          doc.ocrResult!.classification,
          doc.ocrResult!.metadata,
          doc.fileName
        )
        return {
          documentId: doc.documentId,
          originalFile: originalFile || new File([], doc.fileName),
          ocrResult: doc.ocrResult!,
          suggestion,
        }
      })

      // Only show review if at least one file has a generic name
      const hasGenericNames = reviewItems.some(item => !item.suggestion.hasGoodName)
      if (hasGenericNames) {
        setFileReviewItems(reviewItems)
        setShowFileNameReview(true)
      } else {
        // All files have good names - show folder popup
        if (lastOCRResult?.success) {
          setShowFolderPopup(true)
        }
      }
    } else if (lastOCRResult?.success) {
      setShowFolderPopup(true)
    }
  }

  // Handle filename review confirmation
  const handleFileNameConfirm = useCallback(async (
    finalNames: { documentId: string; newName: string }[]
  ) => {
    // Rename documents
    for (const { documentId, newName } of finalNames) {
      try {
        await fetch(`/api/documents/${documentId}/rename`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newName }),
        })
      } catch (error) {
        console.error('Error renaming document:', error)
      }
    }

    setShowFileNameReview(false)
    setFileReviewItems([])

    // Show folder popup after renaming
    if (lastOCRResult?.success) {
      setShowFolderPopup(true)
    }
  }, [lastOCRResult])

  const handleUpload = async () => {
    if (files.length === 0) return

    console.log('[UPLOAD] handleUpload called')
    console.log('[UPLOAD] Props - personalVaultId:', personalVaultId)
    console.log('[UPLOAD] Props - organizationId:', organizationId)

    if (!user) {
      setError('You must be logged in to upload files')
      return
    }

    // Validate user ID format - corrupted sessions can have malformed IDs
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    const demoOrgRegex = /^org_demo(_\w+)?$/
    const isValidOrgId = (id: string) => uuidRegex.test(id) || demoOrgRegex.test(id)

    if (!uuidRegex.test(user.id)) {
      console.error('[UPLOAD] Invalid user ID format detected:', user.id)
      setError('Your session appears to be corrupted. Please sign out and sign back in to fix this issue.')
      return
    }

    // Validate organizationId format if provided (allow UUIDs and demo org IDs)
    if (organizationId) {
      if (!isValidOrgId(organizationId)) {
        console.error('[UPLOAD] Invalid organization ID format detected:', organizationId)
        setError('Organization ID appears to be corrupted. Please refresh the page and try again.')
        return
      }
    }

    // Validate personalVaultId format if provided
    if (personalVaultId) {
      if (!uuidRegex.test(personalVaultId)) {
        console.error('[UPLOAD] Invalid personal vault ID format detected:', personalVaultId)
        setError('Personal vault ID appears to be corrupted. Please refresh the page and try again.')
        return
      }
    }

    // Check storage limits for all files
    const totalSize = files.reduce((sum, file) => sum + file.size, 0)
    const enforcementResult = canUploadFile(totalSize)

    if (!enforcementResult.allowed) {
      setError(enforcementResult.reason || 'Upload not allowed')

      if (enforcementResult.showUpgradePrompt) {
        const upgrade = getUpgradeSuggestion(plan, 'storage')
        if (upgrade) {
          setUpgradeMessage({
            title: trialExpired ? 'Trial Expired' : 'Storage Limit Reached',
            message: enforcementResult.reason || 'Upgrade to get more storage',
            suggestedPlan: enforcementResult.suggestedPlan || upgrade.suggestedPlan,
            benefits: upgrade.benefits,
          })
          setShowUpgradeModal(true)
        }
      }
      return
    }

    setUploading(true)
    setError(null)
    uploadInProgressRef.current = true

    // Create abort controller for cleanup
    abortControllerRef.current = new AbortController()

    try {
      const uploads: FileUpload[] = []

      // Add a small delay between uploads to prevent Turbopack race condition
      // This helps avoid "Response body object should not be disturbed or locked" errors
      const addUploadDelay = async (index: number) => {
        if (index > 0) {
          await new Promise(resolve => setTimeout(resolve, 100))
        }
      }

      let fileIndex = 0
      const savedDocs: { documentId: string; s3Key: string }[] = []

      for (const file of files) {
        // Add delay between uploads to avoid race condition
        await addUploadDelay(fileIndex)
        fileIndex++

        // Get MIME type with fallback for files without browser-detected type
        const mimeType = getFileMimeType(file)

        // Determine upload strategy: direct S3 for large files, proxy for small
        const useDirectUpload = file.size > DIRECT_UPLOAD_THRESHOLD

        if (useDirectUpload) {
          // DIRECT S3 UPLOAD for large files
          console.log(`[UPLOAD] Using DIRECT S3 upload for ${file.name} (${formatFileSize(file.size)})`)
          setCurrentUploadingFile(file.name)

          // Step 1: Get presigned URL from unified endpoint
          let presignRes: Response | null = null
          let retryCount = 0
          const maxRetries = 2

          while (retryCount <= maxRetries && !presignRes) {
            try {
              const response = await fetch('/api/upload/presign-direct', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                  name: file.name,
                  type: mimeType,
                  size: file.size,
                  userId: user.id,
                  personalVaultId,
                  organizationId,
                }),
                signal: abortControllerRef.current?.signal,
              })
              presignRes = response
            } catch (fetchError: any) {
              retryCount++
              console.error(`[UPLOAD] Presign attempt ${retryCount}/${maxRetries + 1} failed for ${file.name}:`, fetchError)

              if (retryCount > maxRetries) {
                throw new Error(`Network error while getting upload URL for ${file.name}. Please check your connection and try again.`)
              }

              await new Promise(resolve => setTimeout(resolve, 1000 * retryCount))
            }
          }

          if (!presignRes || !presignRes.ok) {
            let errorMessage = 'Failed to get upload URL'
            try {
              const errorData = await presignRes?.json()
              errorMessage = errorData?.error || errorMessage
            } catch {
              // Response wasn't JSON
            }
            console.error('[UPLOAD] Presign API error:', presignRes?.status, errorMessage)
            throw new Error(`${errorMessage} (${file.name})`)
          }

          const { url: presignedUrl, key, mock } = await presignRes.json()

          // Step 2: Upload directly to S3 (skip if mock mode)
          if (!mock) {
            try {
              await uploadToS3Direct(
                file,
                presignedUrl,
                mimeType,
                (percent) => {
                  setUploadProgress(prev => ({ ...prev, [file.name]: percent }))
                }
              )
              console.log(`[UPLOAD] Direct S3 upload complete for ${file.name}`)
            } catch (s3Error: any) {
              console.error(`[UPLOAD] Direct S3 upload failed for ${file.name}:`, s3Error)
              // Fall back to proxy upload
              console.log(`[UPLOAD] Falling back to proxy upload for ${file.name}`)

              const proxyFormData = new FormData()
              proxyFormData.append('file', file)
              proxyFormData.append('userId', user.id)

              const proxyUrl = organizationId
                ? `/api/org/${organizationId}/upload`
                : '/api/personal/upload'

              const proxyResponse = await fetch(proxyUrl, {
                method: 'POST',
                body: proxyFormData,
                credentials: 'include',
                signal: abortControllerRef.current?.signal,
              })

              if (!proxyResponse.ok) {
                const proxyError = await proxyResponse.json()
                throw new Error(proxyError.error || `Upload failed for ${file.name}`)
              }

              const proxyResult = await proxyResponse.json()

              // Step 3: Create document record (for proxy fallback)
              const completeRes = await fetch('/api/upload/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                  name: file.name,
                  mimeType,
                  size: file.size,
                  storageKey: proxyResult.key,
                  personalVaultId,
                  organizationId,
                  folderId: null,
                  uploadedById: user.id,
                  tags: [],
                }),
              })

              if (!completeRes.ok) {
                const completeError = await completeRes.json()
                throw new Error(completeError.error || 'Failed to create document record')
              }

              const { documentId, s3Key } = await completeRes.json()
              savedDocs.push({ documentId, s3Key })
              uploads.push({ file, storageKey: s3Key, storageUrl: proxyResult.url })
              continue
            }
          } else {
            console.log(`[UPLOAD] Mock mode - skipping S3 upload for ${file.name}`)
          }

          // Step 3: Create document record
          const completeRes = await fetch('/api/upload/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              name: file.name,
              mimeType,
              size: file.size,
              storageKey: key,
              personalVaultId,
              organizationId,
              folderId: null,
              uploadedById: user.id,
              tags: [],
            }),
          })

          if (!completeRes.ok) {
            const completeError = await completeRes.json()
            throw new Error(completeError.error || 'Failed to create document record')
          }

          const { documentId, s3Key } = await completeRes.json()
          savedDocs.push({ documentId, s3Key })
          uploads.push({ file, storageKey: key, storageUrl: presignedUrl.split('?')[0] })

          setUploadProgress(prev => ({ ...prev, [file.name]: 100 }))

        } else {
          // PROXY UPLOAD for smaller files (existing behavior)
          console.log(`[UPLOAD] Using proxy upload for ${file.name} (${formatFileSize(file.size)})`)

          const proxyUrl = organizationId
            ? `/api/org/${organizationId}/upload`
            : '/api/personal/upload'

          let proxyResult: any = null
          let proxyRetryCount = 0
          const proxyMaxRetries = 2
          let lastError: Error | null = null

          while (proxyRetryCount <= proxyMaxRetries && !proxyResult) {
            try {
              const proxyFormData = new FormData()
              proxyFormData.append('file', file)
              proxyFormData.append('userId', user.id)

              const response = await fetch(proxyUrl, {
                method: 'POST',
                body: proxyFormData,
                credentials: 'include',
                signal: abortControllerRef.current?.signal,
              })

              const responseData = await response.json()

              if (!response.ok) {
                console.error('[UPLOAD] Proxy upload error:', response.status, responseData)
                lastError = new Error(responseData.error || `Upload failed for ${file.name}`)
                proxyRetryCount++
                if (proxyRetryCount <= proxyMaxRetries) {
                  const delayMs = response.status === 503 ? 2000 * proxyRetryCount : 1000 * proxyRetryCount
                  await new Promise(resolve => setTimeout(resolve, delayMs))
                }
                continue
              }

              proxyResult = responseData
            } catch (proxyError: any) {
              proxyRetryCount++
              console.error(`[UPLOAD] Proxy upload attempt ${proxyRetryCount}/${proxyMaxRetries + 1} failed for ${file.name}:`, proxyError)
              lastError = new Error(`Network error while uploading ${file.name}. Please try again.`)

              if (proxyRetryCount <= proxyMaxRetries) {
                await new Promise(resolve => setTimeout(resolve, 1500 * proxyRetryCount))
              }
            }
          }

          if (!proxyResult) {
            throw lastError || new Error(`Failed to upload ${file.name} after ${proxyMaxRetries + 1} attempts.`)
          }

          uploads.push({
            file,
            storageKey: proxyResult.key,
            storageUrl: proxyResult.url,
          })
        }
      }

      setCurrentUploadingFile(null)
      setUploadProgress({})

      // For proxy uploads, call onUpload to save to database and get document IDs
      // Direct uploads already created their document records
      const proxyUploads = uploads.filter(u => !savedDocs.find(d => d.s3Key === u.storageKey))
      let allSavedDocs = [...savedDocs]

      if (proxyUploads.length > 0) {
        const proxySavedDocs = await onUpload(proxyUploads)
        allSavedDocs = [...savedDocs, ...proxySavedDocs]
      }

      // If AI Analysis is enabled, process with OpenAI (bulk approach)
      if (useAIAnalysis && allSavedDocs && allSavedDocs.length > 0) {
        const uploadedDocs = allSavedDocs.map((doc, i) => ({
          file: files[i]!,
          s3Key: doc.s3Key,
          documentId: doc.documentId,
        }))

        // Clear files and start bulk analysis
        setFiles([])
        setUploading(false)

        // Analyze all files, then show bulk summary modal
        await processAIAnalysisBulk(uploadedDocs)
        return
      }

      // If OCR is enabled (fallback when AI not used) and we have document IDs, process with OCR
      if (useOCRSort && !useAIAnalysis && allSavedDocs && allSavedDocs.length > 0) {
        const ocrDocs: UploadedFile[] = allSavedDocs.map((doc, i) => ({
          fileName: files[i]?.name || `file-${i}`,
          documentId: doc.documentId,
          s3Key: doc.s3Key,
          ocrStatus: 'pending' as const,
        }))

        // Keep a copy of files for filename review
        const originalFiles = [...files]
        setUploadedFiles(ocrDocs)
        setFiles([])
        setUploading(false)

        // Process OCR queue with original files reference
        await processOCRQueue(ocrDocs, originalFiles)
      } else {
        // No processing - just close
        setFiles([])
        onClose()
      }
    } catch (err: any) {
      console.error('Upload error:', err)
      // Don't show error if it was an abort (user cancelled or navigated away)
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to upload files')
      }
    } finally {
      setUploading(false)
      uploadInProgressRef.current = false
      abortControllerRef.current = null
    }
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[9999] p-4 sm:p-6 animate-fadeIn">
      <div className="rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-slideUp bg-gradient-to-br from-teal-500 to-teal-600 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white font-display">Upload Documents</h2>
            {currentFolderName && (
              <p className="text-sm text-white/80 mt-1 font-medium">
                Uploading to: <span className="font-bold">{currentFolderName}</span>
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors text-white/70 hover:text-white hover:bg-white/10"
            disabled={uploading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Drag and Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
              dragActive
                ? 'border-white bg-white/20 scale-[1.02]'
                : 'border-white/40 bg-white/10 hover:border-white/60 hover:bg-white/15'
            }`}
          >
            <div className="p-4 rounded-2xl bg-white/20 w-fit mx-auto mb-4">
              <Upload className="w-12 h-12 text-white" />
            </div>
            <p className="text-lg font-bold text-white mb-2">
              Drop files here or click to browse
            </p>
            <p className="text-sm text-white/70 mb-4 font-medium">
              Max {MAX_BATCH_FILES} files per batch • {formatFileSize(MAX_FILE_SIZE)} per file
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
              disabled={uploading}
            />
            <label
              htmlFor="file-upload"
              className="inline-block px-6 py-3 bg-white/40 hover:bg-white/60 text-navy rounded-xl cursor-pointer transition-all font-bold border border-white/20"
            >
              Select Files
            </label>
          </div>

          {/* AI Analysis Toggle (Primary) */}
          <div className="p-5 border rounded-2xl transition-colors bg-white/20 border-white/30 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/30">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">
                    Smart Document Analysis
                  </p>
                  <p className="text-sm text-white/90 font-medium">
                    AI-powered naming, expiration detection & folder organization
                  </p>
                </div>
              </div>
              <label className={`relative inline-flex items-center ${puExhausted ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                <input
                  type="checkbox"
                  checked={useAIAnalysis}
                  onChange={(e) => {
                    if (puExhausted) return // Don't allow changes when exhausted
                    setUseAIAnalysis(e.target.checked)
                    // If AI analysis is enabled, disable OCR (they're mutually exclusive)
                    if (e.target.checked) {
                      setUseOCRSort(false)
                    }
                  }}
                  className="sr-only peer"
                  disabled={uploading || isAnalyzing || puExhausted}
                />
                <div className={`w-14 h-7 bg-white/30 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/20 after:border-2 after:rounded-full after:h-6 after:w-6 after:transition-all after:shadow-lg peer-checked:bg-blue-400 ${puExhausted ? 'opacity-50' : ''}`}></div>
              </label>
            </div>
            {isAnalyzing && (
              <div className="mt-3 flex items-center gap-2 text-sm text-white font-bold">
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing documents... ({analyzingProgress.current}/{analyzingProgress.total})
              </div>
            )}
            {puExhausted && puWarningMessage && (
              <div className="mt-3 flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                <AlertTriangle className="w-4 h-4" />
                {puWarningMessage}
              </div>
            )}
          </div>

          {/* OCR Toggle (Fallback when AI not enabled) */}
          {enableOCR && !useAIAnalysis && (
            <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Smart OCR Sorting
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Pattern-based classification (fallback)
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useOCRSort}
                    onChange={(e) => setUseOCRSort(e.target.checked)}
                    className="sr-only peer"
                    disabled={uploading}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Selected Files ({files.length}/{MAX_BATCH_FILES})
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total: {formatFileSize(totalSize)}
                </p>
              </div>

              {/* Warning when approaching batch limit */}
              {files.length >= MAX_BATCH_FILES - 2 && files.length < MAX_BATCH_FILES && (
                <div className="mb-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    You're approaching the batch limit. {MAX_BATCH_FILES - files.length} more file{MAX_BATCH_FILES - files.length !== 1 ? 's' : ''} allowed.
                  </p>
                </div>
              )}

              {/* Info when at batch limit */}
              {files.length === MAX_BATCH_FILES && (
                <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Batch limit reached. Upload these files first, then add more in another batch.
                  </p>
                </div>
              )}
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-1 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <File className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatFileSize(file.size)}
                          {file.size > DIRECT_UPLOAD_THRESHOLD && (
                            <span className="ml-2 text-blue-600 dark:text-blue-400">• Direct upload</span>
                          )}
                        </p>
                      </div>
                      {!uploading && (
                        <button
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    {/* Upload progress bar for direct uploads */}
                    {uploading && currentUploadingFile === file.name && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                          <span>Uploading...</span>
                          <span>{uploadProgress[file.name] || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                          <div
                            className="bg-teal-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress[file.name] || 0}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-white/20">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-xl transition-colors bg-white/40 hover:bg-white/60 text-navy font-bold border border-white/20"
            disabled={uploading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpload}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-400 text-white rounded-xl hover:from-teal-600 hover:to-teal-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-teal-500/25 transition-all font-bold"
            disabled={uploading || files.length === 0}
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Uploading...
              </>
            ) : (
              `Upload ${files.length} File${files.length !== 1 ? 's' : ''}`
            )}
          </button>
        </div>
      </div>

      <UpgradePromptModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        title={upgradeMessage.title}
        message={upgradeMessage.message}
        suggestedPlan={upgradeMessage.suggestedPlan}
        benefits={upgradeMessage.benefits}
      />

      {/* OCR Processing Modal */}
      <OCRProcessingModal
        isOpen={showOCRModal}
        onClose={() => {
          setShowOCRModal(false)
          resetOCR()
        }}
        fileName={uploadedFiles[currentOCRIndex]?.fileName || ''}
        status={ocrState.status}
        progress={ocrState.progress}
        result={ocrState.result || undefined}
        onRetry={async () => {
          const doc = uploadedFiles[currentOCRIndex]
          if (doc) {
            await retryDocument(doc.documentId)
          }
        }}
        onManualSort={() => {
          setShowOCRModal(false)
          // Could open manual sort modal here
        }}
        onViewFolder={(folderId) => {
          setShowOCRModal(false)
          onClose()
          if (onNavigateToFolder) {
            onNavigateToFolder(folderId)
          }
        }}
      />

      {/* Filename Review Modal */}
      <FileNameReviewModal
        isOpen={showFileNameReview}
        files={fileReviewItems}
        onConfirm={handleFileNameConfirm}
        onClose={() => {
          setShowFileNameReview(false)
          setFileReviewItems([])
          if (lastOCRResult?.success) {
            setShowFolderPopup(true)
          }
        }}
      />

      {/* Folder Access Popup */}
      <FolderAccessPopup
        isOpen={showFolderPopup}
        onClose={() => {
          setShowFolderPopup(false)
          onClose()
        }}
        folderPath={lastOCRResult?.targetFolder.path || ''}
        folderCreated={lastOCRResult?.targetFolder.created || false}
        onNavigate={() => {
          setShowFolderPopup(false)
          onClose()
          if (onNavigateToFolder && lastOCRResult?.targetFolder.id) {
            onNavigateToFolder(lastOCRResult.targetFolder.id)
          }
        }}
      />

      {/* Bulk Upload Summary Modal */}
      <BulkUploadSummaryModal
        isOpen={showBulkSummaryModal}
        onClose={() => {
          if (isConfirmProcessing) return
          setShowBulkSummaryModal(false)
          setBulkUploadItems([])
        }}
        items={bulkUploadItems}
        onConfirmAll={handleBulkConfirmAll}
        onCancel={handleBulkCancel}
        isProcessing={isConfirmProcessing}
        existingFolders={existingFolders}
        isBusinessAccount={!!organizationId}
      />
    </div>
  )
}
