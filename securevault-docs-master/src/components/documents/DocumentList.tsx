'use client'

import { useState } from 'react'
import { Grid, List as ListIcon, FileText, File, Sheet, Image as ImageIcon, Star, MoreVertical, Download, Edit2, Trash2, FolderInput, Tag, Eye, Clock, Upload } from 'lucide-react'
import DocumentCard from './DocumentCard'
import { ExpirationBadgeCompact } from './ExpirationBadge'
import { getFileExtension } from '@/lib/mockStorage'
import { useTheme } from '@/contexts/ThemeContext'

interface Document {
  id: string
  name: string
  type: string
  sizeBytes: number | string
  s3Key: string
  s3Bucket: string
  createdAt: string
  labels: string[]
  expirationDate?: string | null
  expirationTrackingEnabled?: boolean
  isFavorite?: boolean
}

interface DocumentListProps {
  documents: Document[]
  viewMode?: 'grid' | 'list'
  onViewModeChange?: (mode: 'grid' | 'list') => void
  onRename?: (document: Document) => void
  onDelete?: (document: Document) => void
  onMove?: (document: Document) => void
  onDownload?: (document: Document) => void
  onManageTags?: (document: Document) => void
  onPreview?: (document: Document) => void
  onViewVersions?: (document: Document) => void
  onUploadNewVersion?: (document: Document) => void
  onToggleFavorite?: (document: Document) => void
  selectionMode?: boolean
  selectedDocuments?: string[]
  onToggleSelect?: (document: Document) => void
}

// List View Row Component
function ListViewRow({
  document,
  onToggleFavorite,
  onPreview,
  onDownload,
  onRename,
  onDelete,
  onMove,
  onManageTags,
  onViewVersions,
  onUploadNewVersion,
  selectionMode,
  isSelected,
  onToggleSelect,
  isDarkMode,
}: {
  document: Document
  onToggleFavorite?: (document: Document) => void
  onPreview?: (document: Document) => void
  onDownload?: (document: Document) => void
  onRename?: (document: Document) => void
  onDelete?: (document: Document) => void
  onMove?: (document: Document) => void
  onManageTags?: (document: Document) => void
  onViewVersions?: (document: Document) => void
  onUploadNewVersion?: (document: Document) => void
  selectionMode?: boolean
  isSelected?: boolean
  onToggleSelect?: (document: Document) => void
  isDarkMode: boolean
}) {
  const [isFavorite, setIsFavorite] = useState(document.isFavorite || false)
  const [favoriteLoading, setFavoriteLoading] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const extension = getFileExtension(document.name)

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (favoriteLoading) return

    setFavoriteLoading(true)
    try {
      const response = await fetch(`/api/documents/${document.id}/favorite`, {
        method: 'PATCH',
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsFavorite(data.document.isFavorite)
        if (onToggleFavorite) {
          onToggleFavorite({ ...document, isFavorite: data.document.isFavorite })
        }
      } else {
        console.error('Favorite toggle failed:', data.error || 'Unknown error')
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    } finally {
      setFavoriteLoading(false)
    }
  }

  const getFileIcon = () => {
    if (document.type === 'pdf') {
      return <FileText className="w-5 h-5 text-red-500" />
    } else if (document.type === 'word') {
      return <FileText className="w-5 h-5 text-blue-600" />
    } else if (document.type === 'excel' || extension === 'csv') {
      return <Sheet className="w-5 h-5 text-green-600" />
    } else if (document.type === 'image') {
      return <ImageIcon className="w-5 h-5 text-purple-500" />
    }
    return <File className="w-5 h-5 text-gray-500" />
  }

  // PostgreSQL returns BIGINT as string, so we handle both number and string inputs
  const formatFileSize = (bytes: number | string) => {
    const numBytes = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes
    if (!numBytes || numBytes === 0 || isNaN(numBytes)) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.min(Math.floor(Math.log(numBytes) / Math.log(k)), sizes.length - 1)
    return parseFloat((numBytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div
      className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group ${
        isSelected
          ? 'bg-teal-mid/20 border border-teal-mid ring-1 ring-teal-mid/30'
          : 'bg-white/60 backdrop-blur-md border border-white/40 hover:bg-white/70 hover:shadow-lg'
      } ${!selectionMode && onPreview ? 'cursor-pointer' : ''}`}
      onClick={() => !selectionMode && onPreview && onPreview(document)}
    >
      {/* Selection Checkbox */}
      {selectionMode && onToggleSelect && (
        <div onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(document)}
            className="w-5 h-5 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Favorite Button */}
      {!selectionMode && (
        <button
          onClick={handleToggleFavorite}
          disabled={favoriteLoading}
          className={`p-1 rounded transition-colors ${
            isFavorite
              ? 'text-yellow-500 hover:text-yellow-600 opacity-100'
              : 'text-gray-400 hover:text-yellow-500 opacity-100'
          } ${favoriteLoading ? 'cursor-wait' : ''}`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star className={`w-4 h-4 ${isFavorite ? 'fill-yellow-500' : ''}`} />
        </button>
      )}

      {/* File Icon */}
      <div className="flex-shrink-0">
        {getFileIcon()}
      </div>

      {/* Document Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-teal-900 font-display truncate" title={document.name}>
          {document.name}
        </h3>
        <div className={`flex items-center gap-2 text-xs ${isDarkMode ? 'text-slate-400' : 'text-teal-800'}`}>
          <span>{formatFileSize(document.sizeBytes)}</span>
          <span>•</span>
          <span>{new Date(document.createdAt).toLocaleDateString()}</span>
          {document.expirationDate && (
            <>
              <span>•</span>
              <ExpirationBadgeCompact
                expirationDate={document.expirationDate}
              />
            </>
          )}
        </div>
      </div>

      {/* Labels */}
      {document.labels && document.labels.length > 0 && (
        <div className="hidden md:flex items-center gap-1">
          {document.labels.slice(0, 2).map((label, index) => (
            <span
              key={index}
              className={`px-2 py-0.5 text-xs rounded ${
                isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-50 text-blue-700'
              }`}
            >
              {label}
            </span>
          ))}
          {document.labels.length > 2 && (
            <span className={`px-2 py-0.5 text-xs rounded ${
              isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-white/30 text-teal-800'
            }`}>
              +{document.labels.length - 2}
            </span>
          )}
        </div>
      )}

      {/* Actions Menu */}
      {!selectionMode && (
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowMenu(!showMenu)
            }}
            className={`p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity ${
              isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-white/40'
            }`}
          >
            <MoreVertical className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowMenu(false)
                }}
              />
              <div className={`absolute right-0 mt-1 w-48 rounded-md shadow-lg border py-1 z-20 ${
                isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white/90 border-white/40'
              }`}>
                {onPreview && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onPreview(document)
                      setShowMenu(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                      isDarkMode ? 'text-slate-200 hover:bg-slate-700' : 'text-teal-900 hover:bg-white/40'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                )}
                {onDownload && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDownload(document)
                      setShowMenu(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                      isDarkMode ? 'text-slate-200 hover:bg-slate-700' : 'text-teal-900 hover:bg-white/40'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                )}
                {onRename && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onRename(document)
                      setShowMenu(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                      isDarkMode ? 'text-slate-200 hover:bg-slate-700' : 'text-teal-900 hover:bg-white/40'
                    }`}
                  >
                    <Edit2 className="w-4 h-4" />
                    Rename
                  </button>
                )}
                {onManageTags && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onManageTags(document)
                      setShowMenu(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                      isDarkMode ? 'text-slate-200 hover:bg-slate-700' : 'text-teal-900 hover:bg-white/40'
                    }`}
                  >
                    <Tag className="w-4 h-4" />
                    Manage Tags
                  </button>
                )}
                {onViewVersions && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onViewVersions(document)
                      setShowMenu(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                      isDarkMode ? 'text-slate-200 hover:bg-slate-700' : 'text-teal-900 hover:bg-white/40'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    Version History
                  </button>
                )}
                {onUploadNewVersion && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onUploadNewVersion(document)
                      setShowMenu(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                      isDarkMode ? 'text-slate-200 hover:bg-slate-700' : 'text-teal-900 hover:bg-white/40'
                    }`}
                  >
                    <Upload className="w-4 h-4" />
                    Upload New Version
                  </button>
                )}
                {onMove && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onMove(document)
                      setShowMenu(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                      isDarkMode ? 'text-slate-200 hover:bg-slate-700' : 'text-teal-900 hover:bg-white/40'
                    }`}
                  >
                    <FolderInput className="w-4 h-4" />
                    Move
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(document)
                      setShowMenu(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                      isDarkMode ? 'text-red-400 hover:bg-slate-700' : 'text-red-600 hover:bg-white/40'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default function DocumentList({
  documents,
  viewMode = 'grid',
  onViewModeChange,
  onRename,
  onDelete,
  onMove,
  onDownload,
  onManageTags,
  onPreview,
  onViewVersions,
  onUploadNewVersion,
  onToggleFavorite,
  selectionMode = false,
  selectedDocuments = [],
  onToggleSelect,
}: DocumentListProps) {
  const { isDarkMode } = useTheme()

  if (documents.length === 0) {
    return null
  }

  return (
    <div>
      {/* View Mode Toggle */}
      {onViewModeChange && (
        <div className="flex justify-end mb-4">
          <div className="inline-flex rounded-md glass-card-premium p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`px-3 py-2 text-sm font-bold border transition-colors ${
                viewMode === 'grid'
                  ? 'bg-teal-mid text-white border-teal-mid'
                  : 'bg-white/10 text-teal-900 border-teal-900/10 hover:bg-white/20'
              } rounded-l-md`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`px-3 py-2 text-sm font-bold border-t border-r border-b transition-colors ${
                viewMode === 'list'
                  ? 'bg-teal-mid text-white border-teal-mid'
                  : 'bg-white/10 text-teal-900 border-teal-900/10 hover:bg-white/20'
              } rounded-r-md`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {documents.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
              onRename={onRename}
              onDelete={onDelete}
              onMove={onMove}
              onDownload={onDownload}
              onManageTags={onManageTags}
              onPreview={onPreview}
              onViewVersions={onViewVersions}
              onUploadNewVersion={onUploadNewVersion}
              onToggleFavorite={onToggleFavorite}
              selectionMode={selectionMode}
              isSelected={selectedDocuments.includes(document.id)}
              onToggleSelect={onToggleSelect}
            />
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-2">
          {documents.map((document) => (
            <ListViewRow
              key={document.id}
              document={document}
              onToggleFavorite={onToggleFavorite}
              onPreview={onPreview}
              onDownload={onDownload}
              onRename={onRename}
              onDelete={onDelete}
              onMove={onMove}
              onManageTags={onManageTags}
              onViewVersions={onViewVersions}
              onUploadNewVersion={onUploadNewVersion}
              selectionMode={selectionMode}
              isSelected={selectedDocuments.includes(document.id)}
              onToggleSelect={onToggleSelect}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      )}
    </div>
  )
}
