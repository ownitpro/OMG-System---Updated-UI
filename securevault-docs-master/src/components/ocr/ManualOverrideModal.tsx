'use client'

import { useState, useEffect } from 'react'
import { X, Folder, ChevronRight, Plus, FileText, Home } from 'lucide-react'
import type { DocumentCategory, ClassificationResult } from '@/types/ocr'

interface FolderOption {
  id: string
  name: string
  parentId: string | null
}

interface ManualOverrideModalProps {
  isOpen: boolean
  onClose: () => void
  fileName: string
  classification?: ClassificationResult
  folders: FolderOption[]
  onSubmit: (targetFolderId: string, category?: DocumentCategory) => Promise<void>
  onCreateFolder?: (name: string, parentId: string | null) => Promise<FolderOption>
}

const CATEGORY_OPTIONS: { value: DocumentCategory; label: string }[] = [
  { value: 'identity', label: 'Identity Document' },
  { value: 'financial', label: 'Financial' },
  { value: 'medical', label: 'Medical' },
  { value: 'legal', label: 'Legal' },
  { value: 'expense', label: 'Expense/Receipt' },
  { value: 'invoice', label: 'Invoice' },
  { value: 'contract', label: 'Contract' },
  { value: 'report', label: 'Report' },
  { value: 'correspondence', label: 'Correspondence' },
  { value: 'other', label: 'Other' },
]

export default function ManualOverrideModal({
  isOpen,
  onClose,
  fileName,
  classification,
  folders,
  onSubmit,
  onCreateFolder,
}: ManualOverrideModalProps) {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>(
    classification?.category || 'other'
  )
  const [loading, setLoading] = useState(false)
  const [showCreateFolder, setShowCreateFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [newFolderParent, setNewFolderParent] = useState<string | null>(null)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedFolderId(null)
      setSelectedCategory(classification?.category || 'other')
      setShowCreateFolder(false)
      setNewFolderName('')
      setExpandedFolders(new Set())
    }
  }, [isOpen, classification])

  if (!isOpen) return null

  // Build folder tree
  const buildFolderTree = () => {
    const rootFolders = folders.filter(f => !f.parentId)
    const childMap = new Map<string, FolderOption[]>()

    folders.forEach(folder => {
      if (folder.parentId) {
        const children = childMap.get(folder.parentId) || []
        children.push(folder)
        childMap.set(folder.parentId, children)
      }
    })

    return { rootFolders, childMap }
  }

  const { rootFolders, childMap } = buildFolderTree()

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const renderFolder = (folder: FolderOption, depth: number = 0) => {
    const children = childMap.get(folder.id) || []
    const hasChildren = children.length > 0
    const isExpanded = expandedFolders.has(folder.id)
    const isSelected = selectedFolderId === folder.id

    return (
      <div key={folder.id}>
        <button
          type="button"
          onClick={() => {
            setSelectedFolderId(folder.id)
            if (hasChildren) toggleFolder(folder.id)
          }}
          className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
            isSelected
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
        >
          {hasChildren && (
            <ChevronRight
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isExpanded ? 'rotate-90' : ''
              }`}
            />
          )}
          {!hasChildren && <span className="w-4" />}
          <Folder
            className={`w-4 h-4 ${
              isSelected ? 'text-blue-500' : 'text-amber-500'
            }`}
          />
          <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
            {folder.name}
          </span>
        </button>
        {isExpanded && hasChildren && (
          <div>
            {children.map(child => renderFolder(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFolderId) return

    setLoading(true)
    try {
      await onSubmit(selectedFolderId, selectedCategory)
      onClose()
    } catch (error) {
      console.error('Error submitting:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateFolder = async () => {
    if (!newFolderName.trim() || !onCreateFolder) return

    setLoading(true)
    try {
      const newFolder = await onCreateFolder(newFolderName.trim(), newFolderParent)
      setSelectedFolderId(newFolder.id)
      setShowCreateFolder(false)
      setNewFolderName('')
    } catch (error) {
      console.error('Error creating folder:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Sort Document
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-hidden flex flex-col">
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            {/* Document info */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <FileText className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                {fileName}
              </span>
            </div>

            {/* Category selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Document Type
              </label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value as DocumentCategory)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {CATEGORY_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Folder selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Choose Folder
                </label>
                {onCreateFolder && (
                  <button
                    type="button"
                    onClick={() => setShowCreateFolder(!showCreateFolder)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    New Folder
                  </button>
                )}
              </div>

              {/* Create folder form */}
              {showCreateFolder && (
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newFolderName}
                      onChange={e => setNewFolderName(e.target.value)}
                      placeholder="Folder name"
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={handleCreateFolder}
                      disabled={!newFolderName.trim() || loading}
                      className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                      Create
                    </button>
                  </div>
                </div>
              )}

              {/* Folder tree */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg max-h-64 overflow-y-auto">
                {/* Root option */}
                <button
                  type="button"
                  onClick={() => setSelectedFolderId(null)}
                  className={`w-full text-left px-3 py-2 flex items-center gap-2 transition-colors border-b border-gray-100 dark:border-gray-800 ${
                    selectedFolderId === null
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Home className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Root (No Folder)
                  </span>
                </button>

                {/* Folders */}
                <div className="py-2">
                  {rootFolders.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                      No folders available
                    </p>
                  ) : (
                    rootFolders.map(folder => renderFolder(folder))
                  )}
                </div>
              </div>
            </div>

            {/* Classification hint */}
            {classification && classification.confidence > 0 && (
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <p className="mb-1">
                  <strong>AI Suggestion:</strong> {classification.category} ({Math.round(classification.confidence * 100)}% confidence)
                </p>
                <p>
                  Suggested path: {classification.suggestedFolderPath.join(' → ')}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Moving...' : 'Move Document'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
