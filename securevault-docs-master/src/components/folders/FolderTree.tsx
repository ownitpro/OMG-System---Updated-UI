'use client'

import { useState } from 'react'
import { ChevronRight, ChevronDown, Folder, FolderOpen, MoreVertical } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface FolderData {
  id: string
  name: string
  parentId: string | null
  personalVaultId: string | null
  organizationId: string | null
  createdAt: string
  children?: FolderData[]
}

interface FolderTreeProps {
  folders: FolderData[]
  selectedFolderId?: string | null
  onFolderSelect?: (folderId: string | null) => void
  onFolderRename?: (folder: FolderData) => void
  onFolderDelete?: (folder: FolderData) => void
  onFolderMove?: (folder: FolderData) => void
  onDocumentDrop?: (documentId: string, targetFolderId: string | null) => void
  isBusinessAccount?: boolean
}

function FolderTreeNode({
  folder,
  selectedFolderId,
  onFolderSelect,
  onFolderRename,
  onFolderDelete,
  onFolderMove,
  onDocumentDrop,
  isDarkMode,
}: {
  folder: FolderData
  selectedFolderId?: string | null
  onFolderSelect?: (folderId: string | null) => void
  onFolderRename?: (folder: FolderData) => void
  onFolderDelete?: (folder: FolderData) => void
  onFolderMove?: (folder: FolderData) => void
  onDocumentDrop?: (documentId: string, targetFolderId: string | null) => void
  isDarkMode: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const hasChildren = folder.children && folder.children.length > 0
  const isSelected = selectedFolderId === folder.id

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isDragOver) setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'))
      if (data.type === 'document' && data.documentId && onDocumentDrop) {
        onDocumentDrop(data.documentId, folder.id)
      }
    } catch (err) {
      console.error('Error parsing drop data:', err)
    }
  }

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex items-center gap-1 px-2 py-1.5 rounded cursor-pointer group transition-colors ${
          isDragOver
            ? isDarkMode
              ? 'bg-green-500/30 ring-2 ring-green-500'
              : 'bg-green-100 ring-2 ring-green-400'
            : isSelected
              ? isDarkMode
                ? 'bg-blue-500/20 hover:bg-blue-500/30'
                : 'bg-blue-50 hover:bg-blue-100'
              : isDarkMode
                ? 'hover:bg-slate-700/50'
                : 'hover:bg-gray-100'
        }`}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-0.5 rounded transition-colors ${isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-200'}`}
          disabled={!hasChildren}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} />
            ) : (
              <ChevronRight className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} />
            )
          ) : (
            <div className="w-4 h-4" />
          )}
        </button>

        <div
          onClick={() => onFolderSelect?.(folder.id)}
          className="flex items-center gap-2 flex-1 min-w-0"
        >
          {isExpanded ? (
            <FolderOpen className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? 'text-amber-400' : 'text-blue-500'}`} />
          ) : (
            <Folder className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? 'text-amber-400' : 'text-blue-500'}`} />
          )}
          <span className={`text-sm truncate ${
            isSelected
              ? isDarkMode ? 'text-blue-400 font-medium' : 'text-blue-700 font-medium'
              : isDarkMode ? 'text-slate-300' : 'text-gray-700'
          }`}>{folder.name}</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
              isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-200'
            }`}
          >
            <MoreVertical className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className={`absolute right-0 mt-1 w-48 rounded-md shadow-lg border py-1 z-20 ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-white border-gray-200'
              }`}>
                <button
                  onClick={() => {
                    onFolderRename?.(folder)
                    setShowMenu(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Rename
                </button>
                <button
                  onClick={() => {
                    onFolderMove?.(folder)
                    setShowMenu(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Move
                </button>
                <button
                  onClick={() => {
                    onFolderDelete?.(folder)
                    setShowMenu(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    isDarkMode ? 'text-red-400 hover:bg-slate-700' : 'text-red-600 hover:bg-gray-100'
                  }`}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {isExpanded && hasChildren && (
        <div className={`ml-4 border-l pl-2 ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
          {folder.children!.map((child) => (
            <FolderTreeNode
              key={child.id}
              folder={child}
              selectedFolderId={selectedFolderId}
              onFolderSelect={onFolderSelect}
              onFolderRename={onFolderRename}
              onFolderDelete={onFolderDelete}
              onFolderMove={onFolderMove}
              onDocumentDrop={onDocumentDrop}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function FolderTree({
  folders,
  selectedFolderId,
  onFolderSelect,
  onFolderRename,
  onFolderDelete,
  onFolderMove,
  onDocumentDrop,
  isBusinessAccount = false,
}: FolderTreeProps) {
  const { isDarkMode } = useTheme()
  const [isRootDragOver, setIsRootDragOver] = useState(false)
  const vaultName = isBusinessAccount ? 'Business Vault' : 'My Vault'

  const handleRootDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isRootDragOver) setIsRootDragOver(true)
  }

  const handleRootDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsRootDragOver(false)
  }

  const handleRootDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsRootDragOver(false)

    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'))
      if (data.type === 'document' && data.documentId && onDocumentDrop) {
        onDocumentDrop(data.documentId, null) // null means root
      }
    } catch (err) {
      console.error('Error parsing drop data:', err)
    }
  }

  // Build tree structure from flat list
  const buildTree = (folders: FolderData[]): FolderData[] => {
    const folderMap = new Map<string, FolderData>()
    const rootFolders: FolderData[] = []

    // First pass: create map of all folders
    folders.forEach((folder) => {
      folderMap.set(folder.id, { ...folder, children: [] })
    })

    // Second pass: build tree structure
    folders.forEach((folder) => {
      const node = folderMap.get(folder.id)!
      if (folder.parentId && folderMap.has(folder.parentId)) {
        const parent = folderMap.get(folder.parentId)!
        parent.children!.push(node)
      } else {
        rootFolders.push(node)
      }
    })

    return rootFolders
  }

  const tree = buildTree(folders)
  const isRootSelected = selectedFolderId === null

  return (
    <div className="space-y-0.5">
      {/* Root "My Vault" option */}
      <div
        onClick={() => onFolderSelect?.(null)}
        onDragOver={handleRootDragOver}
        onDragLeave={handleRootDragLeave}
        onDrop={handleRootDrop}
        className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${
          isRootDragOver
            ? isDarkMode
              ? 'bg-green-500/30 ring-2 ring-green-500'
              : 'bg-green-100 ring-2 ring-green-400'
            : isRootSelected
              ? isDarkMode
                ? 'bg-blue-500/20 hover:bg-blue-500/30'
                : 'bg-blue-50 hover:bg-blue-100'
              : isDarkMode
                ? 'hover:bg-slate-700/50'
                : 'hover:bg-gray-100'
        }`}
      >
        <Folder className={`w-4 h-4 flex-shrink-0 ml-5 ${isDarkMode ? 'text-amber-400' : 'text-blue-500'}`} />
        <span className={`text-sm font-medium ${
          isRootSelected
            ? isDarkMode ? 'text-blue-400' : 'text-blue-700'
            : isDarkMode ? 'text-slate-300' : 'text-gray-700'
        }`}>{vaultName}</span>
      </div>

      {/* Folder tree */}
      {tree.length === 0 ? (
        <div className={`text-sm text-center py-4 ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
          No folders yet. Create your first folder to get started.
        </div>
      ) : (
        tree.map((folder) => (
          <FolderTreeNode
            key={folder.id}
            folder={folder}
            selectedFolderId={selectedFolderId}
            onFolderSelect={onFolderSelect}
            onFolderRename={onFolderRename}
            onFolderDelete={onFolderDelete}
            onFolderMove={onFolderMove}
            onDocumentDrop={onDocumentDrop}
            isDarkMode={isDarkMode}
          />
        ))
      )}
    </div>
  )
}
