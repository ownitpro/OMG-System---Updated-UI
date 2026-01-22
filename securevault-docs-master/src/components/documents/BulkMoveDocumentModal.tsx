'use client'

import { useState } from 'react'
import { X, Folder, Home, FolderInput } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface FolderOption {
  id: string
  name: string
}

interface BulkMoveDocumentModalProps {
  isOpen: boolean
  onClose: () => void
  onMove: (documentIds: string[], folderId: string | null) => Promise<void>
  documentIds: string[]
  folders: FolderOption[]
  isBusinessAccount?: boolean
}

export default function BulkMoveDocumentModal({
  isOpen,
  onClose,
  onMove,
  documentIds,
  folders,
  isBusinessAccount = false,
}: BulkMoveDocumentModalProps) {
  const { isDarkMode } = useTheme()
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const vaultName = isBusinessAccount ? 'Business Vault' : 'My Vault'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (documentIds.length === 0) return

    setLoading(true)
    setError(null)
    try {
      await onMove(documentIds, selectedFolderId)
      onClose()
    } catch (err: any) {
      console.error('Error moving documents:', err)
      setError(err.message || 'Failed to move documents')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || documentIds.length === 0) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`rounded-lg shadow-xl max-w-md w-full mx-4 ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <div className={`flex items-center justify-between p-6 border-b ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
              <FolderInput className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h2 className={`text-xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Move {documentIds.length} Document{documentIds.length > 1 ? 's' : ''}</h2>
          </div>
          <button
            onClick={onClose}
            className={isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-gray-400 hover:text-gray-600'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
            Select a destination folder for {documentIds.length} selected document{documentIds.length > 1 ? 's' : ''}:
          </p>

          {error && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-600'
            }`}>
              {error}
            </div>
          )}

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {/* Root/Vault option */}
            <button
              type="button"
              onClick={() => setSelectedFolderId(null)}
              className={`w-full text-left px-4 py-3 rounded-md border transition-colors flex items-center gap-3 ${
                selectedFolderId === null
                  ? isDarkMode
                    ? 'bg-blue-900/40 border-blue-700 text-blue-300'
                    : 'bg-blue-50 border-blue-300 text-blue-700'
                  : isDarkMode
                    ? 'bg-slate-700 border-slate-600 hover:bg-slate-600 text-slate-200'
                    : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">{vaultName} (Root)</span>
            </button>

            {/* Folder options */}
            {folders.map((folder) => (
              <button
                key={folder.id}
                type="button"
                onClick={() => setSelectedFolderId(folder.id)}
                className={`w-full text-left px-4 py-3 rounded-md border transition-colors flex items-center gap-3 ${
                  selectedFolderId === folder.id
                    ? isDarkMode
                      ? 'bg-blue-900/40 border-blue-700 text-blue-300'
                      : 'bg-blue-50 border-blue-300 text-blue-700'
                    : isDarkMode
                      ? 'bg-slate-700 border-slate-600 hover:bg-slate-600 text-slate-200'
                      : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900'
                }`}
              >
                <Folder className="w-5 h-5" />
                <span className="font-medium">{folder.name}</span>
              </button>
            ))}
          </div>

          {folders.length === 0 && (
            <p className={`text-sm py-4 text-center ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              No folders available. Documents will be moved to the root.
            </p>
          )}

          <div className="flex justify-end gap-3 mt-6">
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
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Moving...
                </>
              ) : (
                <>
                  <FolderInput className="w-4 h-4" />
                  Move {documentIds.length} Document{documentIds.length > 1 ? 's' : ''}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
