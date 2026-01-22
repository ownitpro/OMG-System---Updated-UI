'use client'

import { ChevronRight, Home } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface FolderData {
  id: string
  name: string
  parentId: string | null
}

interface FolderBreadcrumbProps {
  folders: FolderData[]
  currentFolderId: string | null
  onNavigate: (folderId: string | null) => void
  isBusinessAccount?: boolean
}

export default function FolderBreadcrumb({
  folders,
  currentFolderId,
  onNavigate,
  isBusinessAccount = false,
}: FolderBreadcrumbProps) {
  const { isDarkMode } = useTheme()
  const vaultName = isBusinessAccount ? 'Business Vault' : 'My Vault'
  const buildPath = (): FolderData[] => {
    if (!currentFolderId) return []

    const path: FolderData[] = []
    let current = folders.find((f) => f.id === currentFolderId)

    while (current) {
      path.unshift(current)
      current = folders.find((f) => f.id === current!.parentId)
    }

    return path
  }

  const path = buildPath()

  return (
    <nav className="flex items-center space-x-1 text-sm">
      <button
        onClick={() => onNavigate(null)}
        className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
          isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-white/20'
        } ${
          !currentFolderId
            ? isDarkMode ? 'text-blue-400 font-medium' : 'text-white font-medium'
            : isDarkMode ? 'text-slate-300' : 'text-white/70'
        }`}
      >
        <Home className="w-4 h-4" />
        <span>{vaultName}</span>
      </button>

      {path.map((folder, index) => (
        <div key={folder.id} className="flex items-center">
          <ChevronRight className={`w-4 h-4 mx-1 ${isDarkMode ? 'text-slate-500' : 'text-white/50'}`} />
          <button
            onClick={() => onNavigate(folder.id)}
            className={`px-2 py-1 rounded transition-colors ${
              isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-white/20'
            } ${
              index === path.length - 1
                ? isDarkMode ? 'text-blue-400 font-medium' : 'text-white font-medium'
                : isDarkMode ? 'text-slate-300' : 'text-white/70'
            }`}
          >
            {folder.name}
          </button>
        </div>
      ))}
    </nav>
  )
}
