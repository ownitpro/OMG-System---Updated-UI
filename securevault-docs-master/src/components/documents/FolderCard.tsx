'use client'

import { useState, useRef, useEffect } from 'react'
import { Folder, FolderOpen, MoreVertical, Edit2, Trash2, FolderInput } from 'lucide-react'

interface FolderData {
  id: string
  name: string
  parentId: string | null
  createdAt: string
  personalVaultId?: string | null
  organizationId?: string | null
}

interface FolderCardProps {
  folder: FolderData
  documentCount?: number
  onClick: (folderId: string) => void
  onRename?: (folder: FolderData) => void
  onDelete?: (folder: FolderData) => void
  onMove?: (folder: FolderData) => void
  onDocumentDrop?: (documentId: string, folderId: string) => void
  isDraggable?: boolean
}

export default function FolderCard({
  folder,
  documentCount,
  onClick,
  onRename,
  onDelete,
  onMove,
  onDocumentDrop,
  isDraggable = true,
}: FolderCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.types.includes('application/document-id')) {
      setIsDragOver(true)
    }
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
    const documentId = e.dataTransfer.getData('application/document-id')
    if (documentId && onDocumentDrop) {
      onDocumentDrop(documentId, folder.id)
    }
  }

  return (
    <div
      onClick={() => onClick(folder.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative glass-card-premium border rounded-xl overflow-hidden
        hover:-translate-y-1 transition-all cursor-pointer group shadow-sm hover:shadow-md
        ${isDragOver
          ? 'border-teal-mid ring-4 ring-teal-mid/20 bg-teal-mid/10'
          : 'border-white/20'
        }`}
    >
      {/* Folder Icon Area - 30% smaller container */}
      <div className={`aspect-[5/3] flex items-center justify-center transition-colors border-b border-white/10
        ${isDragOver
          ? 'bg-teal-mid/20'
          : 'bg-teal-mid/5 group-hover:bg-teal-mid/10'
        }`}
      >
        {isHovered || isDragOver ? (
          <FolderOpen className={`w-10 h-10 transition-transform duration-300 scale-110 ${isDragOver ? 'text-teal-bright drop-shadow-md' : 'text-teal-mid'}`} />
        ) : (
          <Folder className="w-10 h-10 text-teal-dark/70" />
        )}
      </div>

      {/* Menu Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          setShowMenu(!showMenu)
        }}
        className="absolute top-2 right-2 p-1.5 rounded-md opacity-0 group-hover:opacity-100
          transition-opacity bg-white dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600
          shadow-sm"
      >
        <MoreVertical className="w-4 h-4 text-gray-600 dark:text-slate-300" />
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute top-10 right-2 z-50 glass-card-premium rounded-xl shadow-xl
            border border-white/20 py-1 min-w-[140px] backdrop-blur-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {onRename && (
            <button
              onClick={() => {
                setShowMenu(false)
                onRename(folder)
              }}
              className="w-full px-3 py-2 text-left text-sm text-navy font-medium
                hover:bg-teal-mid/10 flex items-center gap-2 transition-colors"
            >
              <Edit2 className="w-4 h-4 text-teal-dark" />
              Rename
            </button>
          )}
          {onMove && (
            <button
              onClick={() => {
                setShowMenu(false)
                onMove(folder)
              }}
              className="w-full px-3 py-2 text-left text-sm text-navy font-medium
                hover:bg-teal-mid/10 flex items-center gap-2 transition-colors"
            >
              <FolderInput className="w-4 h-4 text-teal-dark" />
              Move
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => {
                setShowMenu(false)
                onDelete(folder)
              }}
              className="w-full px-3 py-2 text-left text-sm text-red-600 font-medium
                hover:bg-red-500/10 flex items-center gap-2 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
        </div>
      )}

      {/* Folder Info - reduced padding */}
      <div className="px-3 py-2">
        <h3 className="text-xs font-bold truncate text-navy font-display tracking-wide">
          {folder.name}
        </h3>
        {documentCount !== undefined && documentCount > 0 && (
          <p className="text-[10px] mt-0.5 text-slate-500 font-medium font-outfit">
            {documentCount} item{documentCount !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  )
}
