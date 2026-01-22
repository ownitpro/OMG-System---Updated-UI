'use client'

import { AlertCircle, RefreshCw, Edit3, X } from 'lucide-react'

interface OCRRetryPromptProps {
  isOpen: boolean
  onClose: () => void
  fileName: string
  errorMessage?: string
  onRetry: () => void
  onManualSort: () => void
  onSkip: () => void
  isRetrying?: boolean
}

export default function OCRRetryPrompt({
  isOpen,
  onClose,
  fileName,
  errorMessage,
  onRetry,
  onManualSort,
  onSkip,
  isRetrying = false,
}: OCRRetryPromptProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              OCR Processing Failed
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            disabled={isRetrying}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We couldn't automatically process <strong className="text-gray-900 dark:text-white">"{fileName}"</strong>.
          </p>

          {errorMessage && (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-6">
              <p className="text-sm text-red-600 dark:text-red-400">
                {errorMessage}
              </p>
            </div>
          )}

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            What would you like to do?
          </p>

          {/* Options */}
          <div className="space-y-3">
            {/* Retry option */}
            <button
              onClick={onRetry}
              disabled={isRetrying}
              className="w-full flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <RefreshCw className={`w-5 h-5 text-blue-500 ${isRetrying ? 'animate-spin' : ''}`} />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">
                  {isRetrying ? 'Retrying...' : 'Try Again'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Attempt OCR processing again
                </p>
              </div>
            </button>

            {/* Manual sort option */}
            <button
              onClick={onManualSort}
              disabled={isRetrying}
              className="w-full flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                <Edit3 className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">
                  Sort Manually
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Choose where to put this document
                </p>
              </div>
            </button>

            {/* Skip option */}
            <button
              onClick={onSkip}
              disabled={isRetrying}
              className="w-full flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <X className="w-5 h-5 text-gray-500" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">
                  Skip OCR
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Leave document unsorted for now
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
