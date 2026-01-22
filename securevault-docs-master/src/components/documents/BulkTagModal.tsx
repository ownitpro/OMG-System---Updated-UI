'use client'

import { useState, useEffect } from 'react'
import { X, Tag, Plus, Trash2, Tags } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface Document {
  id: string
  name: string
  labels: string[]
}

interface BulkTagModalProps {
  isOpen: boolean
  onClose: () => void
  onApplyTags: (documentIds: string[], tagsToAdd: string[], tagsToRemove: string[]) => Promise<void>
  documents: Document[]
}

export default function BulkTagModal({
  isOpen,
  onClose,
  onApplyTags,
  documents,
}: BulkTagModalProps) {
  const { isDarkMode } = useTheme()
  const [tagsToAdd, setTagsToAdd] = useState<string[]>([])
  const [tagsToRemove, setTagsToRemove] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<'add' | 'remove' | 'both'>('add')

  // Get all unique tags across selected documents
  const allExistingTags = [...new Set(documents.flatMap(d => d.labels || []))].sort()

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setTagsToAdd([])
      setTagsToRemove([])
      setNewTag('')
      setError(null)
      setMode('add')
    }
  }, [isOpen])

  if (!isOpen || documents.length === 0) return null

  const handleAddNewTag = () => {
    const trimmedTag = newTag.trim()
    if (trimmedTag && !tagsToAdd.includes(trimmedTag)) {
      setTagsToAdd([...tagsToAdd, trimmedTag])
      setNewTag('')
    }
  }

  const handleRemoveFromAddList = (tag: string) => {
    setTagsToAdd(tagsToAdd.filter(t => t !== tag))
  }

  const handleToggleRemoveTag = (tag: string) => {
    if (tagsToRemove.includes(tag)) {
      setTagsToRemove(tagsToRemove.filter(t => t !== tag))
    } else {
      setTagsToRemove([...tagsToRemove, tag])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddNewTag()
    }
  }

  const handleSubmit = async () => {
    if (tagsToAdd.length === 0 && tagsToRemove.length === 0) {
      setError('Please add or select tags to apply')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const documentIds = documents.map(d => d.id)
      await onApplyTags(documentIds, tagsToAdd, tagsToRemove)
      onClose()
    } catch (err: any) {
      console.error('Error applying tags:', err)
      setError(err.message || 'Failed to apply tags')
    } finally {
      setLoading(false)
    }
  }

  const totalChanges = tagsToAdd.length + tagsToRemove.length

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] flex flex-col ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
              <Tags className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <h2 className={`text-xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Manage Tags for {documents.length} Document{documents.length > 1 ? 's' : ''}</h2>
          </div>
          <button
            onClick={onClose}
            className={isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-gray-400 hover:text-gray-600'}
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {error && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-600'
            }`}>
              {error}
            </div>
          )}

          {/* Mode selector */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>
              What would you like to do?
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode('add')}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  mode === 'add'
                    ? 'bg-green-600 text-white'
                    : isDarkMode
                      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Plus className="w-4 h-4 inline mr-1" />
                Add Tags
              </button>
              <button
                type="button"
                onClick={() => setMode('remove')}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  mode === 'remove'
                    ? 'bg-red-600 text-white'
                    : isDarkMode
                      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Trash2 className="w-4 h-4 inline mr-1" />
                Remove Tags
              </button>
              <button
                type="button"
                onClick={() => setMode('both')}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  mode === 'both'
                    ? 'bg-purple-600 text-white'
                    : isDarkMode
                      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Both
              </button>
            </div>
          </div>

          {/* Add new tags section */}
          {(mode === 'add' || mode === 'both') && (
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-700'
              }`}>
                Add New Tags
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter tag name..."
                  className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    isDarkMode
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                  disabled={loading}
                />
                <button
                  onClick={handleAddNewTag}
                  disabled={!newTag.trim() || loading}
                  className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:cursor-not-allowed flex items-center gap-2 ${
                    isDarkMode ? 'disabled:bg-slate-600' : 'disabled:bg-gray-300'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              {/* Tags to add */}
              {tagsToAdd.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tagsToAdd.map((tag) => (
                    <span
                      key={tag}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                        isDarkMode
                          ? 'bg-green-900/40 text-green-300'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      <Plus className="w-3 h-3" />
                      {tag}
                      <button
                        onClick={() => handleRemoveFromAddList(tag)}
                        className={`ml-1 rounded-full p-0.5 ${
                          isDarkMode ? 'hover:bg-green-800' : 'hover:bg-green-200'
                        }`}
                        disabled={loading}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Remove existing tags section */}
          {(mode === 'remove' || mode === 'both') && allExistingTags.length > 0 && (
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-700'
              }`}>
                Select Tags to Remove
              </label>
              <p className={`text-xs mb-3 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                Click on tags below to mark them for removal from all selected documents
              </p>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 rounded-lg border ${
                isDarkMode ? 'border-slate-600 bg-slate-700/50' : 'border-gray-200 bg-gray-50'
              }">
                {allExistingTags.map((tag) => {
                  const isSelected = tagsToRemove.includes(tag)
                  return (
                    <button
                      key={tag}
                      onClick={() => handleToggleRemoveTag(tag)}
                      disabled={loading}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                        isSelected
                          ? isDarkMode
                            ? 'bg-red-900/60 text-red-300 ring-2 ring-red-500'
                            : 'bg-red-100 text-red-700 ring-2 ring-red-400'
                          : isDarkMode
                            ? 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {isSelected ? <Trash2 className="w-3 h-3" /> : <Tag className="w-3 h-3" />}
                      {tag}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {(mode === 'remove' || mode === 'both') && allExistingTags.length === 0 && (
            <p className={`text-sm italic mb-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              No existing tags found on selected documents
            </p>
          )}

          {/* Summary */}
          {totalChanges > 0 && (
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-200' : 'text-gray-700'}`}>
                Summary:
              </p>
              <ul className={`text-sm mt-1 space-y-1 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                {tagsToAdd.length > 0 && (
                  <li className="flex items-center gap-1">
                    <Plus className="w-3 h-3 text-green-500" />
                    Adding {tagsToAdd.length} tag{tagsToAdd.length > 1 ? 's' : ''} to {documents.length} document{documents.length > 1 ? 's' : ''}
                  </li>
                )}
                {tagsToRemove.length > 0 && (
                  <li className="flex items-center gap-1">
                    <Trash2 className="w-3 h-3 text-red-500" />
                    Removing {tagsToRemove.length} tag{tagsToRemove.length > 1 ? 's' : ''} from {documents.length} document{documents.length > 1 ? 's' : ''}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`flex justify-end gap-3 px-6 py-4 border-t ${
          isDarkMode ? 'border-slate-700 bg-slate-700/50' : 'border-gray-200 bg-gray-50'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-md ${
              isDarkMode
                ? 'text-slate-300 bg-slate-700 hover:bg-slate-600'
                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
            }`}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2"
            disabled={loading || totalChanges === 0}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Applying...
              </>
            ) : (
              <>
                <Tags className="w-4 h-4" />
                Apply Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
