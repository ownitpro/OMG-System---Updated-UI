'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface RenameFolderModalProps {
  isOpen: boolean
  onClose: () => void
  onRenameFolder: (folderId: string, newName: string) => Promise<void>
  folder: { id: string; name: string } | null
}

export default function RenameFolderModal({
  isOpen,
  onClose,
  onRenameFolder,
  folder,
}: RenameFolderModalProps) {
  const { isDarkMode } = useTheme()
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (folder) {
      setName(folder.name)
    }
  }, [folder])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !folder) return

    setLoading(true)
    try {
      await onRenameFolder(folder.id, name.trim())
      onClose()
    } catch (error) {
      console.error('Error renaming folder:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !folder) return null

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
          }`}>Rename Folder</h2>
          <button
            onClick={onClose}
            className={isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-gray-400 hover:text-gray-600'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div>
            <label htmlFor="folderName" className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>
              Folder Name
            </label>
            <input
              id="folderName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter new folder name"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              autoFocus
              disabled={loading}
            />
          </div>

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
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={loading || !name.trim() || name === folder.name}
            >
              {loading ? 'Renaming...' : 'Rename'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
