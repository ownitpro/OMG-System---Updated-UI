'use client'

import { Folder } from 'lucide-react'
import FolderCard from './FolderCard'

interface FolderData {
  id: string
  name: string
  parentId: string | null
  createdAt: string
  personalVaultId?: string | null
  organizationId?: string | null
}

interface FolderSectionProps {
  folders: FolderData[]
  onFolderClick: (folderId: string) => void
  onRename?: (folder: FolderData) => void
  onDelete?: (folder: FolderData) => void
  onMove?: (folder: FolderData) => void
  onDocumentDrop?: (documentId: string, folderId: string) => void
  documentCounts?: Map<string, number>
}

export default function FolderSection({
  folders,
  onFolderClick,
  onRename,
  onDelete,
  onMove,
  onDocumentDrop,
  documentCounts,
}: FolderSectionProps) {
  if (folders.length === 0) return null

  return (
    <div className="mb-6">
      <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-teal-900 font-display uppercase tracking-wider">
        <Folder className="w-4 h-4 text-teal-dark" />
        Folders ({folders.length})
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {folders.map(folder => (
          <FolderCard
            key={folder.id}
            folder={folder}
            documentCount={documentCounts?.get(folder.id)}
            onClick={onFolderClick}
            onRename={onRename}
            onDelete={onDelete}
            onMove={onMove}
            onDocumentDrop={onDocumentDrop}
          />
        ))}
      </div>
    </div>
  )
}
