'use client'

import { useState, useCallback, useMemo } from 'react'
import { X, Check, Edit2, RefreshCw, FileText, AlertCircle, Sparkles } from 'lucide-react'
import type { SuggestedFilename } from '@/lib/ocr/filename-generator'
import type { OCRResult } from '@/types/ocr'

interface FileReviewItem {
  documentId: string
  originalFile: File
  ocrResult: OCRResult
  suggestion: SuggestedFilename
}

interface FileNameReviewModalProps {
  isOpen: boolean
  files: FileReviewItem[]
  onConfirm: (finalNames: { documentId: string; newName: string }[]) => Promise<void>
  onClose: () => void
}

interface EditableFile {
  documentId: string
  currentName: string
  suggestedName: string
  originalName: string
  hasGoodName: boolean
  useOriginal: boolean
  isEditing: boolean
}

export default function FileNameReviewModal({
  isOpen,
  files,
  onConfirm,
  onClose,
}: FileNameReviewModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize editable state for each file
  const [editableFiles, setEditableFiles] = useState<EditableFile[]>(() =>
    files.map(f => ({
      documentId: f.documentId,
      currentName: f.suggestion.hasGoodName ? f.suggestion.original : f.suggestion.suggested,
      suggestedName: f.suggestion.suggested,
      originalName: f.suggestion.original,
      hasGoodName: f.suggestion.hasGoodName,
      useOriginal: f.suggestion.hasGoodName,
      isEditing: false,
    }))
  )

  // Update editable files when props change
  useMemo(() => {
    if (files.length !== editableFiles.length) {
      setEditableFiles(
        files.map(f => ({
          documentId: f.documentId,
          currentName: f.suggestion.hasGoodName ? f.suggestion.original : f.suggestion.suggested,
          suggestedName: f.suggestion.suggested,
          originalName: f.suggestion.original,
          hasGoodName: f.suggestion.hasGoodName,
          useOriginal: f.suggestion.hasGoodName,
          isEditing: false,
        }))
      )
    }
  }, [files, editableFiles.length])

  // Toggle between suggested and original name
  const toggleUseOriginal = useCallback((index: number) => {
    setEditableFiles(prev =>
      prev.map((f, i) =>
        i === index
          ? {
              ...f,
              useOriginal: !f.useOriginal,
              currentName: !f.useOriginal ? f.originalName : f.suggestedName,
              isEditing: false,
            }
          : f
      )
    )
  }, [])

  // Start editing a filename
  const startEditing = useCallback((index: number) => {
    setEditableFiles(prev =>
      prev.map((f, i) => ({ ...f, isEditing: i === index }))
    )
  }, [])

  // Update filename
  const updateFilename = useCallback((index: number, newName: string) => {
    setEditableFiles(prev =>
      prev.map((f, i) =>
        i === index
          ? { ...f, currentName: newName, useOriginal: false }
          : f
      )
    )
  }, [])

  // Finish editing
  const finishEditing = useCallback((index: number) => {
    setEditableFiles(prev =>
      prev.map((f, i) => (i === index ? { ...f, isEditing: false } : f))
    )
  }, [])

  // Reset to suggested name
  const resetToSuggested = useCallback((index: number) => {
    setEditableFiles(prev =>
      prev.map((f, i) =>
        i === index
          ? { ...f, currentName: f.suggestedName, useOriginal: false, isEditing: false }
          : f
      )
    )
  }, [])

  // Handle confirm
  const handleConfirm = useCallback(async () => {
    setIsSubmitting(true)
    try {
      const finalNames = editableFiles.map(f => ({
        documentId: f.documentId,
        newName: f.currentName,
      }))
      await onConfirm(finalNames)
    } finally {
      setIsSubmitting(false)
    }
  }, [editableFiles, onConfirm])

  // Get file thumbnail URL
  const getThumbnailUrl = useCallback((file: File): string | null => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file)
    }
    return null
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Review File Names
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Smart suggestions based on document content
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {editableFiles.map((file, index) => {
            const originalFile = files[index]?.originalFile
            const thumbnailUrl = originalFile ? getThumbnailUrl(originalFile) : null

            return (
              <div
                key={file.documentId}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
              >
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    {thumbnailUrl ? (
                      <img
                        src={thumbnailUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FileText className="w-8 h-8 text-gray-400" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Original name */}
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Original:{' '}
                      <span className={file.hasGoodName ? '' : 'line-through opacity-60'}>
                        {file.originalName}
                      </span>
                      {file.hasGoodName && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400">
                          <Check className="w-3 h-3 mr-1" />
                          Good name
                        </span>
                      )}
                    </p>

                    {/* Editable name */}
                    {file.isEditing ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={file.currentName}
                          onChange={e => updateFilename(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          autoFocus
                          onKeyDown={e => {
                            if (e.key === 'Enter') finishEditing(index)
                            if (e.key === 'Escape') finishEditing(index)
                          }}
                        />
                        <button
                          onClick={() => finishEditing(index)}
                          className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="text-gray-900 dark:text-white font-medium truncate flex-1">
                          {file.currentName}
                        </p>
                        <button
                          onClick={() => startEditing(index)}
                          className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                          title="Edit name"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Suggestion controls */}
                    {!file.hasGoodName && !file.isEditing && (
                      <div className="flex items-center gap-3 mt-2">
                        {file.currentName !== file.suggestedName && (
                          <button
                            onClick={() => resetToSuggested(index)}
                            className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                          >
                            <RefreshCw className="w-3 h-3" />
                            Use suggestion
                          </button>
                        )}
                        <label className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={file.useOriginal}
                            onChange={() => toggleUseOriginal(index)}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          Keep original name
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Info */}
        <div className="px-6 py-3 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-100 dark:border-blue-900/30">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-700 dark:text-blue-300">
              File names are generated from document content. You can edit them or keep the original names.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : `Confirm ${files.length} File${files.length !== 1 ? 's' : ''}`}
          </button>
        </div>
      </div>
    </div>
  )
}

export type { FileReviewItem, FileNameReviewModalProps }
