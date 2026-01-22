'use client'

import { useState, useEffect } from 'react'
import { X, Tag, Plus } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface Document {
  id: string
  name: string
  labels: string[]
}

interface ManageTagsModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (documentId: string, tags: string[]) => Promise<void>
  document: Document | null
}

export default function ManageTagsModal({
  isOpen,
  onClose,
  onSave,
  document,
}: ManageTagsModalProps) {
  const { isDarkMode } = useTheme()
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (document) {
      setTags(document.labels || [])
    }
  }, [document])

  if (!isOpen || !document) return null

  const handleAddTag = () => {
    const trimmedTag = newTag.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await onSave(document.id, tags)
      onClose()
    } catch (error) {
      console.error('Error saving tags:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`rounded-lg shadow-xl max-w-md w-full mx-4 ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <div className={`flex items-center justify-between p-6 border-b ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <h2 className={`text-xl font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Manage Tags</h2>
          <button
            onClick={onClose}
            className={`p-1 rounded ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}
            disabled={loading}
          >
            <X className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <p className={`text-sm mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>Document: {document.name}</p>
          </div>

          {/* Add New Tag */}
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>
              Add Tag
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter tag name..."
                className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
                disabled={loading}
              />
              <button
                onClick={handleAddTag}
                disabled={!newTag.trim() || loading}
                className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:cursor-not-allowed flex items-center gap-2 ${
                  isDarkMode ? 'disabled:bg-slate-600' : 'disabled:bg-gray-300'
                }`}
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>

          {/* Current Tags */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>
              Current Tags
            </label>
            {tags.length === 0 ? (
              <p className={`text-sm italic ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>No tags yet</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                      isDarkMode
                        ? 'bg-blue-900/40 text-blue-300'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className={`ml-1 rounded-full p-0.5 ${
                        isDarkMode ? 'hover:bg-blue-800' : 'hover:bg-blue-200'
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
        </div>

        <div className={`flex justify-end gap-3 px-6 py-4 rounded-b-lg ${
          isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'
        }`}>
          <button
            onClick={onClose}
            disabled={loading}
            className={`px-4 py-2 rounded-md disabled:opacity-50 ${
              isDarkMode
                ? 'text-slate-300 bg-slate-700 border border-slate-600 hover:bg-slate-600'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? 'Saving...' : 'Save Tags'}
          </button>
        </div>
      </div>
    </div>
  )
}
