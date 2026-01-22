'use client'

import { useState, useEffect, useRef } from 'react'
import { MoreVertical, Download, Edit2, Trash2, FolderInput, Tag, Eye, FileText, File, Sheet, Image as ImageIcon, Paperclip, Clock, Upload as UploadIcon, Star, Play, Video, Zap, AlertCircle } from 'lucide-react'
import { formatFileSize, getFileExtension, mockStorage } from '@/lib/mockStorage'
import ExpirationBadge from './ExpirationBadge'
import DueDateBadge from './DueDateBadge'

interface Document {
  id: string
  name: string
  type: string
  sizeBytes: number | string // PostgreSQL returns BIGINT as string
  s3Key: string
  s3Bucket: string
  createdAt: string
  labels: string[]
  expirationDate?: string | null
  expirationTrackingEnabled?: boolean
  dueDate?: string | null
  dueDateTrackingEnabled?: boolean
  isFavorite?: boolean
  quickStore?: boolean // Saved but not processed (limit exceeded)
}

interface DocumentCardProps {
  document: Document
  onRename?: (document: Document) => void
  onDelete?: (document: Document) => void
  onMove?: (document: Document) => void
  onDownload?: (document: Document) => void
  onManageTags?: (document: Document) => void
  onPreview?: (document: Document) => void
  onViewVersions?: (document: Document) => void
  onUploadNewVersion?: (document: Document) => void
  onToggleFavorite?: (document: Document) => void
  onProcessNow?: (document: Document) => void // Process Quick Store document
  selectionMode?: boolean
  isSelected?: boolean
  onToggleSelect?: (document: Document) => void
  draggable?: boolean
}

export default function DocumentCard({
  document,
  onRename,
  onDelete,
  onMove,
  onDownload,
  onManageTags,
  onPreview,
  onViewVersions,
  onUploadNewVersion,
  onToggleFavorite,
  onProcessNow,
  selectionMode = false,
  isSelected = false,
  onToggleSelect,
  draggable = true,
}: DocumentCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)
  const [isFavorite, setIsFavorite] = useState(document.isFavorite || false)
  const [favoriteLoading, setFavoriteLoading] = useState(false)
  const [officePreviewUrl, setOfficePreviewUrl] = useState<string | null>(null)
  const [officePreviewLoading, setOfficePreviewLoading] = useState(false)
  const [officePreviewError, setOfficePreviewError] = useState(false)
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null)
  const [videoThumbnailLoading, setVideoThumbnailLoading] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Sync local state with prop changes
  useEffect(() => {
    setIsFavorite(document.isFavorite || false)
  }, [document.isFavorite])

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
        // Optionally revert the optimistic update or show toast here
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    } finally {
      setFavoriteLoading(false)
    }
  }

  const extension = getFileExtension(document.name).toLowerCase()
  const isImage = document.type === 'image'
  const isPdf = document.type === 'pdf' || extension === 'pdf'
  const isWord = document.type === 'word' || ['doc', 'docx'].includes(extension)
  const isExcel = document.type === 'excel' || ['xls', 'xlsx'].includes(extension)
  const isPowerPoint = ['ppt', 'pptx'].includes(extension)
  const isCsv = extension === 'csv'
  const isVideo = document.type === 'video' || ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv', 'wmv', 'flv', 'm4v', '3gp'].includes(extension)
  const isOfficeDoc = isWord || isExcel || isPowerPoint || isCsv
  const canShowThumbnail = isImage || isPdf
  // Word, Excel, and PowerPoint docs can show real preview (using mammoth, xlsx, and jszip)
  const canShowOfficePreview = isWord || isExcel || isCsv || isPowerPoint

  useEffect(() => {
    if (canShowThumbnail && !imageError && !thumbnailUrl) {
      // First try mockStorage (for recently uploaded files in session)
      mockStorage.getFileUrl(document.s3Key).then(url => {
        if (url) {
          setThumbnailUrl(url)
        } else {
          // Fallback to S3 presigned URL for persisted documents
          fetch('/api/documents/presign-get', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key: document.s3Key }),
          })
            .then(res => res.json())
            .then(data => {
              if (data.url) {
                setThumbnailUrl(data.url)
              }
            })
            .catch(() => {
              setImageError(true)
            })
        }
      }).catch(() => {
        // Try S3 presigned URL directly
        fetch('/api/documents/presign-get', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: document.s3Key }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.url) {
              setThumbnailUrl(data.url)
            }
          })
          .catch(() => {
            setImageError(true)
          })
      })
    }
  }, [canShowThumbnail, document.s3Key, imageError, thumbnailUrl])

  // Fetch Office document preview (Word docs only for now)
  useEffect(() => {
    if (canShowOfficePreview && !officePreviewError && !officePreviewUrl && !officePreviewLoading) {
      setOfficePreviewLoading(true)
      // Build the preview URL with the s3Key
      const previewUrl = `/api/documents/${document.id}/preview?key=${encodeURIComponent(document.s3Key)}`
      setOfficePreviewUrl(previewUrl)
      setOfficePreviewLoading(false)
    }
  }, [canShowOfficePreview, document.id, document.s3Key, officePreviewError, officePreviewUrl, officePreviewLoading])

  // Generate video thumbnail using Canvas API
  useEffect(() => {
    if (isVideo && !videoThumbnail && !videoThumbnailLoading) {
      setVideoThumbnailLoading(true)

      // Get video URL first
      const getVideoUrl = async () => {
        // Try mockStorage first
        let url = await mockStorage.getFileUrl(document.s3Key).catch(() => null)

        if (!url) {
          // Fallback to S3 presigned URL
          try {
            const res = await fetch('/api/documents/presign-get', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ key: document.s3Key }),
            })
            const data = await res.json()
            if (data.url) {
              url = data.url
            }
          } catch {
            setVideoThumbnailLoading(false)
            return
          }
        }

        if (!url) {
          setVideoThumbnailLoading(false)
          return
        }

        // Create a hidden video element to extract thumbnail
        const video = window.document.createElement('video')
        video.crossOrigin = 'anonymous'
        video.muted = true
        video.preload = 'metadata'

        video.onloadeddata = () => {
          // Seek to 1 second or 10% of duration, whichever is smaller
          video.currentTime = Math.min(1, video.duration * 0.1)
        }

        video.onseeked = () => {
          // Create canvas and draw the video frame
          const canvas = window.document.createElement('canvas')
          canvas.width = 320
          canvas.height = 180
          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            const thumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.7)
            setVideoThumbnail(thumbnailDataUrl)
          }
          setVideoThumbnailLoading(false)
          // Clean up
          video.src = ''
          video.load()
        }

        video.onerror = () => {
          console.error('Failed to load video for thumbnail:', document.name)
          setVideoThumbnailLoading(false)
        }

        video.src = url
        video.load()
      }

      getVideoUrl()
    }
  }, [isVideo, videoThumbnail, videoThumbnailLoading, document.s3Key, document.name])

  const handleCardClick = () => {
    if (!selectionMode && onPreview) {
      onPreview(document)
    }
  }

  // Handle drag start
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('application/json', JSON.stringify({
      type: 'document',
      documentId: document.id,
      documentName: document.name,
    }))
    e.dataTransfer.effectAllowed = 'move'
    // Add a subtle visual effect
    if (e.currentTarget) {
      e.currentTarget.style.opacity = '0.5'
    }
  }

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    // Reset visual effect
    if (e.currentTarget) {
      e.currentTarget.style.opacity = '1'
    }
  }

  return (
    <div
      draggable={draggable && !selectionMode}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`bg-white/60 backdrop-blur-md border border-white/40 rounded-xl shadow-lg transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl ${
        isSelected ? 'border-teal-mid ring-2 ring-teal-mid/50 bg-teal-mid/10' : 'hover:bg-white/70'
      } ${draggable && !selectionMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
    >
      {/* Preview Area */}
      <div
        className={`aspect-square bg-white/50 dark:bg-slate-700/40 rounded-t-xl flex items-center justify-center relative ${
          !selectionMode && onPreview ? 'cursor-pointer' : ''
        }`}
        onClick={handleCardClick}
      >
        <div className="absolute inset-0 overflow-hidden rounded-t-lg">
        {/* Show actual thumbnail for images and PDFs */}
        {thumbnailUrl && !imageError ? (
          isImage ? (
            <img
              src={thumbnailUrl}
              alt={document.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : isPdf ? (
            <div className="w-full h-full bg-white/30 dark:bg-slate-600/30 relative">
              {/* PDF thumbnail using our proxy API for correct Content-Type */}
              <object
                data={`/api/documents/${document.id}/preview?key=${encodeURIComponent(document.s3Key)}#page=1&view=FitH`}
                type="application/pdf"
                className="w-full h-full"
                onError={() => setImageError(true)}
              >
                {/* Fallback to iframe if object doesn't work */}
                <iframe
                  src={`/api/documents/${document.id}/preview?key=${encodeURIComponent(document.s3Key)}#page=1&view=FitH&toolbar=0&navpanes=0`}
                  className="w-full h-full border-0"
                  title={document.name}
                />
              </object>
              {/* PDF badge overlay */}
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-red-500 text-white rounded text-xs font-medium shadow">
                PDF
              </div>
            </div>
          ) : (
            <img
              src={thumbnailUrl}
              alt={document.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )
        ) : canShowThumbnail && !imageError ? (
          /* Loading state while fetching thumbnail */
          <div className="w-full h-full flex items-center justify-center bg-white/30 dark:bg-slate-600/30">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 bg-white/50 dark:bg-slate-500/50 rounded-lg mb-2"></div>
              <div className="w-12 h-3 bg-white/50 dark:bg-slate-500/50 rounded"></div>
            </div>
          </div>
        ) : canShowOfficePreview && officePreviewUrl && !officePreviewError ? (
          /* Real Office document preview using iframe */
          <div className="w-full h-full bg-white/50 dark:bg-slate-200/50 relative">
            <iframe
              src={officePreviewUrl}
              className="w-full h-full border-0"
              title={document.name}
              sandbox="allow-same-origin"
              onError={() => setOfficePreviewError(true)}
            />
            {/* File type badge overlay */}
            <div className={`absolute bottom-2 right-2 px-2 py-1 text-white rounded text-xs font-medium shadow ${
              isExcel || isCsv ? 'bg-green-600' : isPowerPoint ? 'bg-orange-500' : 'bg-blue-600'
            }`}>
              {extension.toUpperCase()}
            </div>
          </div>
        ) : isOfficeDoc ? (
          /* Office document preview placeholder - styled to look like a document (for Excel, PPT, CSV) */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-white/40 to-white/60 dark:from-slate-600/40 dark:to-slate-700/40 relative">
            {/* Document page representation */}
            <div className={`relative w-20 h-24 sm:w-24 sm:h-28 rounded-sm shadow-lg ${
              isWord ? 'bg-white dark:bg-slate-200' :
              isExcel ? 'bg-white dark:bg-slate-200' :
              isPowerPoint ? 'bg-white dark:bg-slate-200' :
              'bg-white dark:bg-slate-200'
            }`}>
              {/* Document header bar */}
              <div className={`h-2 rounded-t-sm ${
                isWord ? 'bg-blue-600' :
                isExcel ? 'bg-green-600' :
                isPowerPoint ? 'bg-orange-500' :
                'bg-emerald-500'
              }`} />
              {/* Document content lines */}
              <div className="p-2 space-y-1.5">
                <div className={`h-1.5 rounded-full w-full ${
                  isWord ? 'bg-blue-100' :
                  isExcel ? 'bg-green-100' :
                  isPowerPoint ? 'bg-orange-100' :
                  'bg-emerald-100'
                }`} />
                <div className={`h-1.5 rounded-full w-4/5 ${
                  isWord ? 'bg-blue-100' :
                  isExcel ? 'bg-green-100' :
                  isPowerPoint ? 'bg-orange-100' :
                  'bg-emerald-100'
                }`} />
                <div className={`h-1.5 rounded-full w-full ${
                  isWord ? 'bg-blue-100' :
                  isExcel ? 'bg-green-100' :
                  isPowerPoint ? 'bg-orange-100' :
                  'bg-emerald-100'
                }`} />
                <div className={`h-1.5 rounded-full w-3/5 ${
                  isWord ? 'bg-blue-100' :
                  isExcel ? 'bg-green-100' :
                  isPowerPoint ? 'bg-orange-100' :
                  'bg-emerald-100'
                }`} />
                {isExcel || isCsv ? (
                  /* Grid lines for spreadsheets */
                  <div className="mt-2 grid grid-cols-3 gap-0.5">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-2 bg-green-50 border border-green-200 rounded-sm" />
                    ))}
                  </div>
                ) : (
                  <>
                    <div className={`h-1.5 rounded-full w-full ${
                      isWord ? 'bg-blue-100' :
                      isPowerPoint ? 'bg-orange-100' :
                      'bg-gray-100'
                    }`} />
                    <div className={`h-1.5 rounded-full w-2/3 ${
                      isWord ? 'bg-blue-100' :
                      isPowerPoint ? 'bg-orange-100' :
                      'bg-gray-100'
                    }`} />
                  </>
                )}
              </div>
              {/* File type icon overlay */}
              <div className={`absolute -bottom-2 -right-2 p-1.5 rounded-full shadow-md ${
                isWord ? 'bg-blue-600' :
                isExcel ? 'bg-green-600' :
                isPowerPoint ? 'bg-orange-500' :
                'bg-emerald-500'
              }`}>
                {isWord ? (
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={2} />
                ) : isExcel || isCsv ? (
                  <Sheet className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={2} />
                ) : (
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={2} />
                )}
              </div>
            </div>
            {/* File type badge */}
            <div className={`mt-3 px-3 py-1 rounded text-xs font-semibold shadow-sm ${
              isWord ? 'bg-blue-600 text-white' :
              isExcel ? 'bg-green-600 text-white' :
              isPowerPoint ? 'bg-orange-500 text-white' :
              'bg-emerald-500 text-white'
            }`}>
              {extension.toUpperCase()}
            </div>
          </div>
        ) : isVideo ? (
          /* Video thumbnail with play button overlay */
          <div className="w-full h-full bg-slate-900/60 relative flex items-center justify-center">
            {videoThumbnail ? (
              <>
                <img
                  src={videoThumbnail}
                  alt={document.name}
                  className="w-full h-full object-cover"
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-black/70 transition-colors">
                    <Play className="w-7 h-7 text-white ml-1" fill="white" />
                  </div>
                </div>
              </>
            ) : videoThumbnailLoading ? (
              /* Loading state for video thumbnail */
              <div className="animate-pulse flex flex-col items-center">
                <Video className="w-16 h-16 text-gray-500 mb-2" strokeWidth={1.5} />
                <div className="w-12 h-3 bg-gray-600 rounded"></div>
              </div>
            ) : (
              /* Fallback if thumbnail extraction fails */
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Video className="w-16 h-16 text-purple-400" strokeWidth={1.5} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                  </div>
                </div>
              </div>
            )}
            {/* Video badge overlay */}
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-purple-600 text-white rounded text-xs font-medium shadow">
              {extension.toUpperCase()}
            </div>
            {/* Duration indicator placeholder - could be enhanced later */}
          </div>
        ) : (
          /* Fallback icon for other non-previewable files or errors */
          <div className="w-full h-full flex flex-col items-center justify-center bg-white/30 dark:bg-slate-600/30">
            <div className="mb-3">
              {isPdf ? (
                <FileText className="w-16 h-16 text-red-500" strokeWidth={1.5} />
              ) : isImage ? (
                <ImageIcon className="w-16 h-16 text-purple-500" strokeWidth={1.5} />
              ) : isVideo ? (
                <Video className="w-16 h-16 text-purple-500" strokeWidth={1.5} />
              ) : (
                <File className="w-16 h-16 text-gray-500 dark:text-gray-400" strokeWidth={1.5} />
              )}
            </div>
            <div className="px-3 py-1 bg-white/50 dark:bg-slate-500/50 text-gray-700 dark:text-gray-200 rounded text-xs font-medium">
              {extension.toUpperCase()}
            </div>
          </div>
        )}
        </div>

        {/* Selection Checkbox */}
        {selectionMode && onToggleSelect && (
          <div className="absolute top-2 left-2" onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelect(document)}
              className="w-5 h-5 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Favorite Button - Always visible */}
        {!selectionMode && (
          <button
            onClick={handleToggleFavorite}
            disabled={favoriteLoading}
            className={`absolute top-2 left-2 z-10 p-1.5 rounded-md shadow-sm transition-all ${
              isFavorite
                ? 'opacity-100 bg-yellow-50 dark:bg-yellow-900/30 hover:bg-yellow-100 dark:hover:bg-yellow-900/50'
                : 'opacity-100 bg-white/60 backdrop-blur-sm dark:bg-slate-700/60 hover:bg-white/80 dark:hover:bg-slate-600'
            } ${favoriteLoading ? 'cursor-wait' : ''}`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star
              className={`w-4 h-4 transition-colors ${
                isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'
              }`}
            />
          </button>
        )}

        {/* Quick Store Badge - Unprocessed document indicator */}
        {document.quickStore && (
          <div className="absolute bottom-2 left-2 z-10">
            <div className="flex items-center gap-1 px-2 py-1 bg-amber-500 text-white rounded-md shadow-sm text-xs font-medium">
              <AlertCircle className="w-3 h-3" />
              <span>Unprocessed</span>
            </div>
          </div>
        )}

        {/* Menu Button */}
        {!selectionMode && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowMenu(!showMenu)
              }}
              className="p-1.5 bg-white dark:bg-slate-700 rounded-md shadow-sm hover:bg-gray-100 dark:hover:bg-slate-600"
            >
              <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-300" />
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
              <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg border border-gray-200 dark:border-slate-600 py-1 z-20 max-h-96 overflow-y-auto">
                {/* Process Now - for Quick Store documents */}
                {document.quickStore && onProcessNow && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onProcessNow(document)
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 flex items-center gap-2 font-medium"
                  >
                    <Zap className="w-4 h-4" />
                    Process Now
                  </button>
                )}
                {onPreview && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onPreview(document)
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
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
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
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
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
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
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
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
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
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
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
                  >
                    <UploadIcon className="w-4 h-4" />
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
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
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
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
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

      {/* Document Info */}
      <div
        className={`p-2 ${!selectionMode && onPreview ? 'cursor-pointer' : ''}`}
        onClick={handleCardClick}
      >
        <h3 className="text-xs font-bold text-teal-900 font-display truncate mb-1" title={document.name}>
          {document.name}
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-[10px] text-teal-800 dark:text-gray-400">
            {formatFileSize(document.sizeBytes)}
          </p>
          {/* Expiration Badge */}
          {document.expirationDate && (
            <ExpirationBadge
              expirationDate={document.expirationDate}
              trackingEnabled={document.expirationTrackingEnabled}
              size="sm"
            />
          )}
          {/* Due Date Badge */}
          {document.dueDate && (
            <DueDateBadge
              dueDate={document.dueDate}
              trackingEnabled={document.dueDateTrackingEnabled}
              size="sm"
            />
          )}
        </div>

        {/* Labels */}
        {document.labels && document.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {document.labels.slice(0, 2).map((label, index) => (
              <span
                key={index}
                className="px-1.5 py-0.5 bg-teal-mid/10 text-teal-dark border border-teal-mid/20 text-[10px] rounded font-bold"
              >
                {label}
              </span>
            ))}
            {document.labels.length > 2 && (
              <span className="px-1.5 py-0.5 bg-white/40 text-teal-700 border border-teal-900/10 text-[10px] rounded font-bold">
                +{document.labels.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
