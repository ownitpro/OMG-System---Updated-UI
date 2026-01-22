'use client'

import { useState, useEffect } from 'react'
import { X, Edit2, Sparkles, Loader2, Check, AlertCircle, Calendar, FolderOpen, FileText } from 'lucide-react'
import type { CapturedImage } from './CameraScanModal'
import type { AIDocumentAnalysisResult } from '@/types/ai'
import { CATEGORY_ICONS, CATEGORY_LABELS } from '@/types/analysis'

interface ScanNameEntry {
  originalIndex: number
  image: CapturedImage
  proposedName: string
  editedName: string
  isEditing: boolean
  isProcessing: boolean
  analysisResult?: AIDocumentAnalysisResult
  analysisError?: string
  // Folder editing
  editedFolderPath?: string[]
  isEditingFolder: boolean
}

interface ScanNamingModalProps {
  isOpen: boolean
  onClose: () => void
  images: CapturedImage[]
  onConfirm: (namedImages: { image: CapturedImage; name: string; analysisResult?: AIDocumentAnalysisResult }[]) => void
  onBack: () => void
  personalVaultId?: string
  organizationId?: string
  vaultContext?: 'personal' | 'organization'
  userId?: string
}

export default function ScanNamingModal({
  isOpen,
  onClose,
  images,
  onConfirm,
  onBack,
  personalVaultId,
  organizationId,
  vaultContext = 'personal',
  userId,
}: ScanNamingModalProps) {
  const [entries, setEntries] = useState<ScanNameEntry[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzeError, setAnalyzeError] = useState<string | null>(null)

  // Initialize entries when modal opens
  useEffect(() => {
    if (isOpen && images.length > 0) {
      const initialEntries: ScanNameEntry[] = images.map((image, index) => ({
        originalIndex: index,
        image,
        proposedName: generateDefaultName(index),
        editedName: '',
        isEditing: false,
        isProcessing: false,
        isEditingFolder: false,
      }))
      setEntries(initialEntries)
      setAnalyzeError(null)

      // Start OCR preview analysis for smart naming
      analyzeImagesForNaming(initialEntries)
    }
  }, [isOpen, images])

  // Generate default name based on date
  const generateDefaultName = (index: number): string => {
    const now = new Date()
    const dateStr = now.toISOString().split('T')[0] // YYYY-MM-DD
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-').substring(0, 5) // HH-MM
    return `Scan_${dateStr}_${timeStr}_${String(index + 1).padStart(2, '0')}`
  }

  // Convert blob to base64
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        // Remove data URL prefix to get raw base64
        const base64 = result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  // Analyze images using the /api/documents/analyze endpoint
  const analyzeImagesForNaming = async (entries: ScanNameEntry[]) => {
    setIsAnalyzing(true)
    setAnalyzeError(null)

    const updatedEntries = [...entries]

    // Process images in parallel for speed
    const analysisPromises = updatedEntries.map(async (entry, i) => {
      try {
        // Mark as processing
        updatedEntries[i] = { ...entry, isProcessing: true }
        setEntries([...updatedEntries])

        // Convert image blob to base64
        const fileBase64 = await blobToBase64(entry.image.blob)

        // Call the analyze API
        const response = await fetch('/api/documents/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': userId || '',
          },
          body: JSON.stringify({
            fileBase64,
            fileName: `scan_${i + 1}.jpg`,
            mimeType: 'image/jpeg',
            vaultContext,
            personalVaultId,
            organizationId,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Analysis failed')
        }

        const data = await response.json()
        const result = data.result as AIDocumentAnalysisResult

        // Update entry with analysis result
        updatedEntries[i] = {
          ...entry,
          proposedName: result.suggestedFilename || generateDefaultName(i),
          isProcessing: false,
          analysisResult: result,
        }
        setEntries([...updatedEntries])
      } catch (error: any) {
        console.error('Error analyzing image:', error)
        updatedEntries[i] = {
          ...entry,
          isProcessing: false,
          proposedName: generateDefaultName(i),
          analysisError: error.message || 'Analysis failed',
        }
        setEntries([...updatedEntries])
      }
    })

    // Wait for all analyses to complete
    await Promise.all(analysisPromises)

    setIsAnalyzing(false)
  }

  // Handle name edit
  const handleStartEdit = (index: number) => {
    setEntries(prev =>
      prev.map((entry, i) =>
        i === index
          ? { ...entry, isEditing: true, editedName: entry.editedName || entry.proposedName }
          : entry
      )
    )
  }

  // Handle name change
  const handleNameChange = (index: number, value: string) => {
    setEntries(prev =>
      prev.map((entry, i) =>
        i === index ? { ...entry, editedName: value } : entry
      )
    )
  }

  // Handle save edit
  const handleSaveEdit = (index: number) => {
    setEntries(prev =>
      prev.map((entry, i) =>
        i === index
          ? {
              ...entry,
              isEditing: false,
              proposedName: entry.editedName || entry.proposedName,
            }
          : entry
      )
    )
  }

  // Handle cancel edit
  const handleCancelEdit = (index: number) => {
    setEntries(prev =>
      prev.map((entry, i) =>
        i === index ? { ...entry, isEditing: false, editedName: '' } : entry
      )
    )
  }

  // Handle folder edit start
  const handleStartFolderEdit = (index: number) => {
    setEntries(prev =>
      prev.map((entry, i) =>
        i === index
          ? {
              ...entry,
              isEditingFolder: true,
              editedFolderPath: entry.editedFolderPath || entry.analysisResult?.folderSuggestion?.pathSegments || [],
            }
          : entry
      )
    )
  }

  // Handle folder path change
  const handleFolderPathChange = (index: number, pathString: string) => {
    const pathSegments = pathString.split('/').map(s => s.trim()).filter(s => s.length > 0)
    setEntries(prev =>
      prev.map((entry, i) =>
        i === index ? { ...entry, editedFolderPath: pathSegments } : entry
      )
    )
  }

  // Handle save folder edit
  const handleSaveFolderEdit = (index: number) => {
    setEntries(prev =>
      prev.map((entry, i) => {
        if (i !== index) return entry

        // Update the analysis result with the new folder path
        const updatedAnalysisResult = entry.analysisResult
          ? {
              ...entry.analysisResult,
              folderSuggestion: {
                ...entry.analysisResult.folderSuggestion,
                pathSegments: entry.editedFolderPath || entry.analysisResult.folderSuggestion.pathSegments,
                matchedExistingFolder: undefined, // Clear match since user changed it
              },
            }
          : undefined

        return {
          ...entry,
          isEditingFolder: false,
          analysisResult: updatedAnalysisResult,
        }
      })
    )
  }

  // Handle cancel folder edit
  const handleCancelFolderEdit = (index: number) => {
    setEntries(prev =>
      prev.map((entry, i) =>
        i === index ? { ...entry, isEditingFolder: false, editedFolderPath: undefined } : entry
      )
    )
  }

  // Get the folder path for display (edited or original)
  const getFolderPath = (entry: ScanNameEntry): string[] | null => {
    if (entry.editedFolderPath && entry.editedFolderPath.length > 0) {
      return entry.editedFolderPath
    }
    return entry.analysisResult?.folderSuggestion?.pathSegments || null
  }

  // Handle confirm all
  const handleConfirm = () => {
    const namedImages = entries.map(entry => ({
      image: entry.image,
      name: entry.editedName || entry.proposedName,
      analysisResult: entry.analysisResult,
    }))
    onConfirm(namedImages)
  }

  // Format expiration date for display
  const formatExpirationDate = (dateStr: string | null): string | null => {
    if (!dateStr) return null
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    } catch {
      return dateStr
    }
  }

  // Get category display info
  const getCategoryDisplay = (result: AIDocumentAnalysisResult): { icon: string; label: string } => {
    const category = result.classification.category
    return {
      icon: CATEGORY_ICONS[category] || '📄',
      label: CATEGORY_LABELS[category] || 'Document',
    }
  }

  // Get display name
  const getDisplayName = (entry: ScanNameEntry): string => {
    return entry.editedName || entry.proposedName
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Name Your Scans
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing documents for smart naming...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  Smart names suggested based on content
                </span>
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {analyzeError && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{analyzeError}</p>
            </div>
          )}

          <div className="space-y-4">
            {entries.map((entry, index) => {
              const categoryDisplay = entry.analysisResult ? getCategoryDisplay(entry.analysisResult) : null
              const expirationDate = entry.analysisResult ? formatExpirationDate(entry.analysisResult.expirationDate) : null
              const folderPathSegments = getFolderPath(entry)
              const folderPath = folderPathSegments?.join(' / ') || null

              return (
                <div
                  key={index}
                  className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  {/* Thumbnail */}
                  <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img
                      src={entry.image.dataUrl}
                      alt={`Scan ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header row */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Scan {index + 1}
                      </span>
                      {entry.isProcessing && (
                        <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
                      )}
                      {entry.image.isBlurry && (
                        <span className="text-xs px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded">
                          Blurry
                        </span>
                      )}
                      {categoryDisplay && (
                        <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded flex items-center gap-1">
                          <span>{categoryDisplay.icon}</span>
                          {categoryDisplay.label}
                        </span>
                      )}
                      {entry.analysisError && (
                        <span className="text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded">
                          Analysis failed
                        </span>
                      )}
                    </div>

                    {/* Name input */}
                    {entry.isEditing ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={entry.editedName}
                          onChange={e => handleNameChange(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          autoFocus
                          onKeyDown={e => {
                            if (e.key === 'Enter') handleSaveEdit(index)
                            if (e.key === 'Escape') handleCancelEdit(index)
                          }}
                        />
                        <button
                          onClick={() => handleSaveEdit(index)}
                          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleCancelEdit(index)}
                          className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="text-gray-900 dark:text-white font-medium truncate">
                          {getDisplayName(entry)}
                        </p>
                        <button
                          onClick={() => handleStartEdit(index)}
                          className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                          title="Edit name"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* AI-detected info row */}
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {expirationDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Expires: {expirationDate}
                        </span>
                      )}
                      {!entry.isProcessing && !entry.analysisResult && !entry.analysisError && (
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          Will be saved as: {getDisplayName(entry)}.jpg
                        </span>
                      )}
                    </div>

                    {/* Folder path - editable */}
                    {(folderPath || entry.analysisResult) && (
                      <div className="mt-2">
                        {entry.isEditingFolder ? (
                          <div className="flex gap-2 items-center">
                            <FolderOpen className="w-3 h-3 text-gray-400 flex-shrink-0" />
                            <input
                              type="text"
                              value={entry.editedFolderPath?.join('/') || ''}
                              onChange={e => handleFolderPathChange(index, e.target.value)}
                              placeholder="Folder / Subfolder / ..."
                              className="flex-1 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                              autoFocus
                              onKeyDown={e => {
                                if (e.key === 'Enter') handleSaveFolderEdit(index)
                                if (e.key === 'Escape') handleCancelFolderEdit(index)
                              }}
                            />
                            <button
                              onClick={() => handleSaveFolderEdit(index)}
                              className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleCancelFolderEdit(index)}
                              className="p-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <FolderOpen className="w-3 h-3" />
                            <span>{folderPath || 'No folder (root)'}</span>
                            <button
                              onClick={() => handleStartFolderEdit(index)}
                              className="p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                              title="Edit folder"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <button
            onClick={onBack}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Back
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isAnalyzing}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Upload {entries.length} {entries.length === 1 ? 'Scan' : 'Scans'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
