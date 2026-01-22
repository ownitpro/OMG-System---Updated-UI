'use client'

import { ChevronDown, ChevronRight, Folder, FileText, ExternalLink } from 'lucide-react'
import FolderCard from './FolderCard'
import DocumentCard from './DocumentCard'

interface FolderData {
  id: string
  name: string
  parentId: string | null
  createdAt: string
}

interface DocumentData {
  id: string
  name: string
  type: string
  sizeBytes: number | string
  s3Key: string
  s3Bucket: string
  createdAt: string
  labels: string[]
  folderId?: string | null
  expirationDate?: string | null
  expirationTrackingEnabled?: boolean
  dueDate?: string | null
  dueDateTrackingEnabled?: boolean
  isFavorite?: boolean
  quickStore?: boolean
}

interface GroupedDocuments {
  path: string
  documents: DocumentData[]
}

interface SearchResultsProps {
  searchQuery: string
  matchedFolders: FolderData[]
  groupedDocuments: Map<string, GroupedDocuments>
  expandedFolders: Set<string>
  onToggleFolder: (folderId: string) => void
  onFolderClick: (folderId: string | null) => void
  // Document action handlers
  onDocumentPreview?: (document: DocumentData) => void
  onDocumentRename?: (document: DocumentData) => void
  onDocumentDelete?: (document: DocumentData) => void
  onDocumentMove?: (document: DocumentData) => void
  onDocumentDownload?: (document: DocumentData) => void
  onDocumentManageTags?: (document: DocumentData) => void
  onDocumentToggleFavorite?: (document: DocumentData) => void
}

export default function SearchResults({
  searchQuery,
  matchedFolders,
  groupedDocuments,
  expandedFolders,
  onToggleFolder,
  onFolderClick,
  onDocumentPreview,
  onDocumentRename,
  onDocumentDelete,
  onDocumentMove,
  onDocumentDownload,
  onDocumentManageTags,
  onDocumentToggleFavorite,
}: SearchResultsProps) {
  const totalDocuments = Array.from(groupedDocuments.values())
    .reduce((sum, group) => sum + group.documents.length, 0)

  const hasResults = matchedFolders.length > 0 || totalDocuments > 0

  if (!hasResults) {
    return (
      <div className="text-center py-12">
        <FileText className="w-12 h-12 mx-auto text-gray-400 dark:text-slate-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No results found
        </h3>
        <p className="text-sm text-gray-500 dark:text-slate-400">
          No folders or documents match "{searchQuery}"
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search Summary */}
      <div className="text-sm text-teal-800 dark:text-slate-400">
        Found {matchedFolders.length} folder{matchedFolders.length !== 1 ? 's' : ''} and {totalDocuments} document{totalDocuments !== 1 ? 's' : ''} matching "{searchQuery}"
      </div>

      {/* Matched Folders Section */}
      {matchedFolders.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-teal-900 dark:text-white">
            <Folder className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            Folders ({matchedFolders.length})
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {matchedFolders.map(folder => (
              <FolderCard
                key={folder.id}
                folder={folder}
                onClick={() => onFolderClick(folder.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Grouped Documents by Folder */}
      {totalDocuments > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold flex items-center gap-2 text-teal-900 dark:text-white">
            <FileText className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            Documents ({totalDocuments})
          </h3>

          {Array.from(groupedDocuments.entries()).map(([folderId, { path, documents }]) => (
            <div
              key={folderId}
              className="rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/30 overflow-hidden"
            >
              {/* Collapsible Header */}
              <button
                onClick={() => onToggleFolder(folderId)}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {expandedFolders.has(folderId) ? (
                    <ChevronDown className="w-4 h-4 text-gray-500 dark:text-slate-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500 dark:text-slate-400" />
                  )}
                  <Folder className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span className="text-sm font-medium text-teal-900 dark:text-white">
                    {path}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-slate-400">
                    ({documents.length})
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onFolderClick(folderId === 'root' ? null : folderId)
                  }}
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Go to folder
                </button>
              </button>

              {/* Documents Grid */}
              {expandedFolders.has(folderId) && (
                <div className="p-3 pt-0 border-t border-gray-200 dark:border-slate-700">
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mt-3">
                    {documents.map(doc => (
                      <DocumentCard
                        key={doc.id}
                        document={doc}
                        onPreview={onDocumentPreview}
                        onRename={onDocumentRename}
                        onDelete={onDocumentDelete}
                        onMove={onDocumentMove}
                        onDownload={onDocumentDownload}
                        onManageTags={onDocumentManageTags}
                        onToggleFavorite={onDocumentToggleFavorite}
                        draggable={false}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
