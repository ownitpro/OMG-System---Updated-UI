'use client'

import { useState } from 'react'
import { X, Folder, Home } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface FolderOption {
  id: string
  name: string
  parentId: string | null
}

interface MoveFolderModalProps {
  isOpen: boolean
  onClose: () => void
  onMove: (folderId: string, newParentId: string | null) => Promise<void>
  folder: { id: string; name: string; parentId: string | null } | null
  folders: FolderOption[]
  isBusinessAccount?: boolean
}

export default function MoveFolderModal({
  isOpen,
  onClose,
  onMove,
  folder,
  folders,
  isBusinessAccount = false,
}: MoveFolderModalProps) {
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { isDarkMode } = useTheme()
  const vaultName = isBusinessAccount ? 'Business Vault' : 'My Vault'

  // Get all descendant folder IDs to prevent circular references
  const getDescendantIds = (parentId: string): string[] => {
    const children = folders.filter(f => f.parentId === parentId)
    return children.flatMap(c => [c.id, ...getDescendantIds(c.id)])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!folder) return

    // Don't move if selecting the same parent
    if (selectedParentId === folder.parentId) {
      onClose()
      return
    }

    setLoading(true)
    try {
      await onMove(folder.id, selectedParentId)
      onClose()
    } catch (error) {
      console.error('Error moving folder:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !folder) return null

  // Exclude: the folder itself and all its descendants (prevent circular references)
  const descendantIds = getDescendantIds(folder.id)
  const excludeIds = new Set([folder.id, ...descendantIds])
  const availableFolders = folders.filter(f => !excludeIds.has(f.id))

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`rounded-lg shadow-xl max-w-md w-full mx-4 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className={`flex items-center justify-between p-6 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className={`text-xl font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Move Folder</h2>
          <button
            onClick={onClose}
            className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Move &quot;{folder.name}&quot; to:
          </p>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {/* Root/Vault option */}
            <button
              type="button"
              onClick={() => setSelectedParentId(null)}
              className={`w-full text-left px-4 py-3 rounded-md border transition-colors flex items-center gap-3 ${
                selectedParentId === null
                  ? isDarkMode
                    ? 'bg-blue-900/50 border-blue-500 text-blue-300'
                    : 'bg-blue-50 border-blue-300 text-blue-700'
                  : isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600'
                    : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">{vaultName} (Root)</span>
            </button>

            {/* Folder options - exclude current parent from visual selection */}
            {availableFolders
              .filter(f => f.id !== folder.parentId)
              .map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedParentId(f.id)}
                  className={`w-full text-left px-4 py-3 rounded-md border transition-colors flex items-center gap-3 ${
                    selectedParentId === f.id
                      ? isDarkMode
                        ? 'bg-blue-900/50 border-blue-500 text-blue-300'
                        : 'bg-blue-50 border-blue-300 text-blue-700'
                      : isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600'
                        : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900'
                  }`}
                >
                  <Folder className="w-5 h-5" />
                  <span className="font-medium">{f.name}</span>
                </button>
              ))}
          </div>

          {availableFolders.filter(f => f.id !== folder.parentId).length === 0 && folder.parentId !== null && (
            <p className={`text-sm py-4 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No other folders available. You can move to root.
            </p>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-md ${
                isDarkMode
                  ? 'text-gray-200 bg-gray-700 hover:bg-gray-600'
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={loading || selectedParentId === folder.parentId}
            >
              {loading ? 'Moving...' : 'Move'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
