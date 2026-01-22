'use client'

import { useState, useEffect } from 'react'
import { X, Sparkles, FileText, Folder, Calendar, Clock, Check, Edit2, AlertCircle, Loader2, ChevronDown, ChevronUp, FolderOpen, Plus, Tag } from 'lucide-react'
import type { AIDocumentAnalysisResult, ExistingFolderInfo, SuggestedCategory } from '@/types/ai'

interface BulkUploadItem {
  file: File
  s3Key: string
  documentId: string
  analysis: AIDocumentAnalysisResult
  // Editable fields
  finalFilename: string
  expirationDate: string | null
  enableTracking: boolean
  // Due date fields
  dueDate: string | null
  enableDueDateTracking: boolean
  // Custom destination folder (overrides AI suggestion)
  customFolderId?: string | null
  customFolderPath?: string | null
  // Custom folder creation
  createCustomPath?: string[] | null
}

interface BulkUploadSummaryModalProps {
  isOpen: boolean
  onClose: () => void
  items: BulkUploadItem[]
  onConfirmAll: (items: BulkUploadItem[]) => Promise<void>
  onCancel: () => void
  isProcessing?: boolean
  existingFolders?: ExistingFolderInfo[]
  isBusinessAccount?: boolean
}

export default function BulkUploadSummaryModal({
  isOpen,
  onClose,
  items: initialItems,
  onConfirmAll,
  onCancel,
  isProcessing = false,
  existingFolders = [],
  isBusinessAccount = false,
}: BulkUploadSummaryModalProps) {
  const vaultName = isBusinessAccount ? 'Business Vault' : 'My Vault'
  const [items, setItems] = useState<BulkUploadItem[]>([])
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingFolderIndex, setEditingFolderIndex] = useState<number | null>(null)
  const [creatingCustomFolderIndex, setCreatingCustomFolderIndex] = useState<number | null>(null)
  const [customFolderInput, setCustomFolderInput] = useState('')
  const [editingFolderPathIndex, setEditingFolderPathIndex] = useState<number | null>(null)

  // Initialize items when modal opens
  useEffect(() => {
    if (isOpen && initialItems.length > 0) {
      setItems(initialItems)
      // Auto-expand when there's only 1 file so user can easily edit
      setExpandedIndex(initialItems.length === 1 ? 0 : null)
      setEditingIndex(null)
      setEditingFolderIndex(null)
      setCreatingCustomFolderIndex(null)
      setCustomFolderInput('')
      setEditingFolderPathIndex(null)
    }
  }, [isOpen, initialItems])

  if (!isOpen || items.length === 0) return null

  // Get confidence label and color
  const getConfidenceInfo = (conf: number) => {
    if (conf >= 0.9) return { label: 'High', color: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30' }
    if (conf >= 0.7) return { label: 'Medium', color: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30' }
    return { label: 'Low', color: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30' }
  }

  // Update item
  const updateItem = (index: number, updates: Partial<BulkUploadItem>) => {
    setItems(prev => prev.map((item, i) =>
      i === index ? { ...item, ...updates } : item
    ))
  }

  // Get destination folder display
  const getDestinationFolder = (item: BulkUploadItem) => {
    // If user is creating a custom folder path
    if (item.createCustomPath && item.createCustomPath.length > 0) {
      return `Create: ${item.createCustomPath.join(' / ')}`
    }
    // If user set a custom folder, use that
    if (item.customFolderPath) {
      return item.customFolderPath
    }
    if (item.customFolderId === null) {
      return `${vaultName} (Root)`
    }
    // Otherwise use AI suggestion
    return item.analysis.folderSuggestion.matchedExistingFolder?.path ||
      item.analysis.folderSuggestion.pathSegments.join(' / ') ||
      `${vaultName} (Root)`
  }

  // Handle folder selection change
  const handleFolderChange = (index: number, folderId: string | null, folderPath: string | null) => {
    updateItem(index, {
      customFolderId: folderId,
      customFolderPath: folderPath,
      createCustomPath: null, // Clear any custom path
    })
    setEditingFolderIndex(null)
  }

  // Handle custom folder path creation
  const handleCreateCustomFolder = (index: number, pathInput: string) => {
    if (!pathInput.trim()) {
      setCreatingCustomFolderIndex(null)
      setCustomFolderInput('')
      return
    }

    // Parse path input (supports "folder / subfolder" or "folder/subfolder" format)
    const pathSegments = pathInput
      .split(/[\/\\]/)
      .map(s => s.trim())
      .filter(s => s.length > 0)

    if (pathSegments.length === 0) {
      setCreatingCustomFolderIndex(null)
      setCustomFolderInput('')
      return
    }

    updateItem(index, {
      customFolderId: undefined,
      customFolderPath: undefined,
      createCustomPath: pathSegments,
    })
    setCreatingCustomFolderIndex(null)
    setEditingFolderIndex(null)
    setCustomFolderInput('')
  }

  // Count items with expiration dates
  const itemsWithExpiration = items.filter(item => item.expirationDate).length

  // Count items with due dates
  const itemsWithDueDate = items.filter(item => item.dueDate).length

  // Count low confidence items
  const lowConfidenceItems = items.filter(item => item.analysis.classification.confidence < 0.7).length

  const handleConfirmAll = async () => {
    await onConfirmAll(items)
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Smart Document Analysis - {items.length} Files
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Review and confirm all documents at once
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Summary Stats */}
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span>{items.length} documents</span>
          </div>
          {itemsWithExpiration > 0 && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-yellow-500" />
              <span>{itemsWithExpiration} with expiration dates</span>
            </div>
          )}
          {itemsWithDueDate > 0 && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>{itemsWithDueDate} with due dates</span>
            </div>
          )}
          {lowConfidenceItems > 0 && (
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
              <AlertCircle className="w-4 h-4" />
              <span>{lowConfidenceItems} need review</span>
            </div>
          )}
        </div>

        {/* Document List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {items.map((item, index) => {
            const confidenceInfo = getConfidenceInfo(item.analysis.classification.confidence)
            const isExpanded = expandedIndex === index
            const isEditing = editingIndex === index

            return (
              <div
                key={item.documentId}
                className={`border rounded-lg transition-all ${
                  item.analysis.classification.confidence < 0.7
                    ? 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                }`}
              >
                {/* Collapsed View */}
                <div
                  className="p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                >
                  <div className="flex-shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white truncate">
                        {item.finalFilename}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${confidenceInfo.color}`}>
                        {confidenceInfo.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      <Folder className="w-3 h-3" />
                      <span className="truncate">{getDestinationFolder(item)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {item.expirationDate && (
                      <div className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded">
                        <Calendar className="w-3 h-3" />
                        <span>{item.expirationDate}</span>
                      </div>
                    )}
                    {item.dueDate && (
                      <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                        <Clock className="w-3 h-3" />
                        <span>{item.dueDate}</span>
                      </div>
                    )}
                    <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {item.analysis.classification.category}
                    </span>
                  </div>
                </div>

                {/* Expanded View */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-gray-100 dark:border-gray-700 space-y-3">
                    {/* Original filename */}
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Original: {item.file.name}
                    </div>

                    {/* Filename Edit */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Filename
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={item.finalFilename}
                          onChange={(e) => updateItem(index, { finalFilename: e.target.value })}
                          onBlur={() => setEditingIndex(null)}
                          onKeyDown={(e) => e.key === 'Enter' && setEditingIndex(null)}
                          autoFocus
                          className="w-full px-3 py-2 border border-blue-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <div
                          className="flex items-center justify-between px-3 py-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/50"
                          onClick={(e) => {
                            e.stopPropagation()
                            setEditingIndex(index)
                          }}
                        >
                          <span className="text-sm text-gray-900 dark:text-white truncate">{item.finalFilename}</span>
                          <Edit2 className="w-3 h-3 text-blue-600 dark:text-blue-400 flex-shrink-0 ml-2" />
                        </div>
                      )}
                    </div>

                    {/* Document Type and Destination Folder - Side by Side */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Document Type */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Document Type
                        </label>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {item.analysis.classification.category} - {item.analysis.classification.subtype}
                        </span>
                      </div>

                      {/* Destination Folder - Always Editable */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Destination Folder
                        </label>
                        {creatingCustomFolderIndex === index ? (
                          /* Custom folder input mode */
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={customFolderInput}
                                onChange={(e) => setCustomFolderInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleCreateCustomFolder(index, customFolderInput)
                                  } else if (e.key === 'Escape') {
                                    setCreatingCustomFolderIndex(null)
                                    setCustomFolderInput('')
                                  }
                                }}
                                onClick={(e) => e.stopPropagation()}
                                placeholder="e.g., Work / Projects / 2025"
                                autoFocus
                                className="flex-1 px-3 py-2 border border-blue-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Use / to create nested folders (e.g., &quot;Work / Projects&quot;)
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleCreateCustomFolder(index, customFolderInput)
                                }}
                                className="text-xs px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
                              >
                                Create Folder
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setCreatingCustomFolderIndex(null)
                                  setCustomFolderInput('')
                                  setEditingFolderIndex(index)
                                }}
                                className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : editingFolderPathIndex === index ? (
                          /* Direct folder path editing mode */
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={customFolderInput}
                              onChange={(e) => setCustomFolderInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleCreateCustomFolder(index, customFolderInput)
                                  setEditingFolderPathIndex(null)
                                } else if (e.key === 'Escape') {
                                  setEditingFolderPathIndex(null)
                                  setCustomFolderInput('')
                                }
                              }}
                              onClick={(e) => e.stopPropagation()}
                              placeholder="e.g., Personal Documents / Business / 2025 / Proposals"
                              autoFocus
                              className="w-full px-3 py-2 border border-blue-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Edit the folder path. Use / to separate folders.
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleCreateCustomFolder(index, customFolderInput)
                                  setEditingFolderPathIndex(null)
                                }}
                                className="text-xs px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
                              >
                                Save
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setEditingFolderPathIndex(null)
                                  setCustomFolderInput('')
                                }}
                                className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setEditingFolderPathIndex(null)
                                  setCustomFolderInput('')
                                  setEditingFolderIndex(index)
                                }}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 ml-auto"
                              >
                                Choose existing folder
                              </button>
                            </div>
                          </div>
                        ) : editingFolderIndex === index ? (
                          <div className="space-y-2">
                            <select
                              className="w-full px-3 py-2 border border-blue-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              value={item.createCustomPath ? '__custom__' : (item.customFolderId ?? (item.analysis.folderSuggestion.matchedExistingFolder?.id || '__new__'))}
                              onChange={(e) => {
                                const value = e.target.value
                                if (value === '__root__') {
                                  handleFolderChange(index, null, `${vaultName} (Root)`)
                                } else if (value === '__new__') {
                                  // Keep AI suggestion (create new)
                                  handleFolderChange(index, undefined as unknown as null, undefined as unknown as null)
                                } else if (value === '__custom__') {
                                  // Open custom folder input
                                  setCreatingCustomFolderIndex(index)
                                  setEditingFolderIndex(null)
                                  setCustomFolderInput(item.createCustomPath?.join(' / ') || '')
                                } else {
                                  const folder = existingFolders.find(f => f.id === value)
                                  if (folder) {
                                    handleFolderChange(index, folder.id, folder.path)
                                  }
                                }
                              }}
                              onClick={(e) => e.stopPropagation()}
                              autoFocus
                            >
                              <option value="__root__">{vaultName} (Root)</option>
                              <option value="__new__" disabled={!item.analysis.folderSuggestion.pathSegments.length}>
                                {item.analysis.folderSuggestion.pathSegments.length
                                  ? `Create: ${item.analysis.folderSuggestion.pathSegments.join(' / ')}`
                                  : '(AI suggested folder)'}
                              </option>
                              <option value="__custom__">+ Create custom folder...</option>
                              {item.createCustomPath && item.createCustomPath.length > 0 && (
                                <option value="__custom__">
                                  Create: {item.createCustomPath.join(' / ')}
                                </option>
                              )}
                              {existingFolders.length > 0 && (
                                <optgroup label="Existing Folders">
                                  {existingFolders.map(folder => (
                                    <option key={folder.id} value={folder.id}>
                                      {folder.path}
                                    </option>
                                  ))}
                                </optgroup>
                              )}
                            </select>
                            <div className="flex items-center gap-2 mt-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setEditingFolderIndex(null)
                                }}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                              >
                                Done
                              </button>
                              <span className="text-gray-300 dark:text-gray-600">|</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  // Pre-populate with current folder path for editing
                                  const currentPath = item.createCustomPath?.join(' / ') ||
                                    item.customFolderPath ||
                                    item.analysis.folderSuggestion.pathSegments.join(' / ') ||
                                    ''
                                  setCustomFolderInput(currentPath)
                                  setEditingFolderIndex(null)
                                  setEditingFolderPathIndex(index)
                                }}
                                className="text-xs text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 flex items-center gap-1"
                              >
                                <Edit2 className="w-3 h-3" />
                                Edit path manually
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="flex items-center justify-between px-3 py-2 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/50"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Show dropdown with existing folders option
                              setEditingFolderIndex(index)
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <FolderOpen className="w-4 h-4 text-green-600 dark:text-green-400" />
                              <span className="text-sm text-gray-900 dark:text-white truncate">{getDestinationFolder(item)}</span>
                            </div>
                            <ChevronDown className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 ml-2" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expiration Date */}
                    {item.analysis.expirationDate && (
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Expiration Date Detected</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <input
                            type="date"
                            value={item.expirationDate || ''}
                            onChange={(e) => updateItem(index, { expirationDate: e.target.value })}
                            onClick={(e) => e.stopPropagation()}
                            className="px-2 py-1 border border-yellow-300 dark:border-yellow-700 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <label className="flex items-center gap-2 cursor-pointer" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={item.enableTracking}
                              onChange={(e) => updateItem(index, { enableTracking: e.target.checked })}
                              className="w-4 h-4 rounded border-gray-300 text-blue-600"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Enable tracking</span>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Due Date */}
                    {item.analysis.dueDate && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Due Date Detected</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <input
                            type="date"
                            value={item.dueDate || ''}
                            onChange={(e) => updateItem(index, { dueDate: e.target.value })}
                            onClick={(e) => e.stopPropagation()}
                            className="px-2 py-1 border border-blue-300 dark:border-blue-700 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <label className="flex items-center gap-2 cursor-pointer" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={item.enableDueDateTracking}
                              onChange={(e) => updateItem(index, { enableDueDateTracking: e.target.checked })}
                              className="w-4 h-4 rounded border-gray-300 text-blue-600"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Enable tracking</span>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Low Confidence Warning */}
                    {item.analysis.classification.confidence < 0.7 && (
                      <div className="flex items-start gap-2 p-2 bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-orange-500 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-orange-700 dark:text-orange-300">
                          Low confidence detection. Please verify the filename and folder are correct.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 ${isProcessing ? 'opacity-75' : ''}`}>
          <button
            onClick={onCancel}
            disabled={isProcessing}
            className={`px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg transition-colors ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Cancel Upload
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {items.length} files ready
            </span>
            <button
              onClick={handleConfirmAll}
              disabled={isProcessing}
              className={`px-6 py-2 bg-teal-600 text-white rounded-lg transition-colors flex items-center gap-2 ${
                isProcessing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-teal-700'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Confirm All ({items.length})
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export type { BulkUploadItem }
