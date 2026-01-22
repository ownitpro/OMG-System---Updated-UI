'use client'

import { useState, useEffect } from 'react'
import {
  X,
  Loader2,
  FileSearch,
  FolderTree,
  MoveRight,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Edit3,
} from 'lucide-react'
import type { OCRResult, OCRProcessingStatus } from '@/types/ocr'

interface OCRProcessingModalProps {
  isOpen: boolean
  onClose: () => void
  fileName: string
  status: OCRProcessingStatus
  progress: number
  result?: OCRResult
  onRetry?: () => void
  onManualSort?: () => void
  onViewFolder?: (folderId: string, folderPath: string) => void
}

const STATUS_MESSAGES: Record<OCRProcessingStatus, string> = {
  pending: 'Preparing document...',
  extracting: 'Extracting text from document...',
  classifying: 'Analyzing document type...',
  creating_folders: 'Creating folder structure...',
  sorting: 'Moving document to folder...',
  completed: 'Document processed successfully!',
  failed: 'Processing failed',
}

const STATUS_ICONS: Record<OCRProcessingStatus, React.ReactNode> = {
  pending: <Loader2 className="w-6 h-6 animate-spin text-blue-500" />,
  extracting: <FileSearch className="w-6 h-6 text-blue-500 animate-pulse" />,
  classifying: <Loader2 className="w-6 h-6 animate-spin text-purple-500" />,
  creating_folders: <FolderTree className="w-6 h-6 text-amber-500 animate-pulse" />,
  sorting: <MoveRight className="w-6 h-6 text-green-500 animate-pulse" />,
  completed: <CheckCircle className="w-6 h-6 text-green-500" />,
  failed: <AlertCircle className="w-6 h-6 text-red-500" />,
}

export default function OCRProcessingModal({
  isOpen,
  onClose,
  fileName,
  status,
  progress,
  result,
  onRetry,
  onManualSort,
  onViewFolder,
}: OCRProcessingModalProps) {
  const [showDetails, setShowDetails] = useState(false)

  // Auto-show details when completed
  useEffect(() => {
    if (status === 'completed' && result?.success) {
      setShowDetails(true)
    }
  }, [status, result])

  if (!isOpen) return null

  const isProcessing = !['completed', 'failed'].includes(status)
  const canClose = !isProcessing

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-lg w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {isProcessing ? 'Processing Document' : 'OCR Complete'}
          </h2>
          {canClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* File name */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {fileName}
            </p>
          </div>

          {/* Status indicator */}
          <div className="flex flex-col items-center mb-6">
            <div className="mb-3">{STATUS_ICONS[status]}</div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              {STATUS_MESSAGES[status]}
            </p>

            {/* Progress bar */}
            {isProcessing && (
              <div className="w-full mt-4">
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                  {progress}%
                </p>
              </div>
            )}
          </div>

          {/* Success result */}
          {status === 'completed' && result?.success && (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-green-700 dark:text-green-400 font-medium">
                    Document sorted successfully!
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                    Moved to: <span className="font-mono">{result.targetFolder.path}</span>
                  </p>
                  {result.targetFolder.created && (
                    <p className="text-xs text-green-500 dark:text-green-600 mt-1">
                      New folders were created automatically
                    </p>
                  )}
                </div>
              </div>

              {/* Classification details */}
              {showDetails && (
                <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
                  <p className="text-xs text-green-600 dark:text-green-500 mb-2 font-medium">
                    Classification Details
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-green-500">Category:</span>{' '}
                      <span className="text-green-700 dark:text-green-400 capitalize">
                        {result.classification.category}
                      </span>
                    </div>
                    <div>
                      <span className="text-green-500">Confidence:</span>{' '}
                      <span className="text-green-700 dark:text-green-400">
                        {Math.round(result.classification.confidence * 100)}%
                      </span>
                    </div>
                    {result.metadata.vendor && (
                      <div className="col-span-2">
                        <span className="text-green-500">Vendor:</span>{' '}
                        <span className="text-green-700 dark:text-green-400">
                          {result.metadata.vendor}
                        </span>
                      </div>
                    )}
                    {result.metadata.amount && (
                      <div>
                        <span className="text-green-500">Amount:</span>{' '}
                        <span className="text-green-700 dark:text-green-400">
                          {result.metadata.amount}
                        </span>
                      </div>
                    )}
                    {result.metadata.documentDate && (
                      <div>
                        <span className="text-green-500">Date:</span>{' '}
                        <span className="text-green-700 dark:text-green-400">
                          {result.metadata.documentDate}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error result */}
          {status === 'failed' && (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-red-700 dark:text-red-400 font-medium">
                    Failed to process document
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-500 mt-1">
                    {result?.error || 'An unexpected error occurred'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 p-6 pt-0">
          {status === 'completed' && result?.success && onViewFolder && (
            <button
              onClick={() => onViewFolder(result.targetFolder.id, result.targetFolder.path)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
            >
              <FolderTree className="w-4 h-4" />
              View Folder
            </button>
          )}

          {status === 'failed' && (
            <>
              {result?.retryable && onRetry && (
                <button
                  onClick={onRetry}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry
                </button>
              )}
              {onManualSort && (
                <button
                  onClick={onManualSort}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Sort Manually
                </button>
              )}
            </>
          )}

          {canClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
