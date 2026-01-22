'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Download, AlertCircle, FileText, Sheet, File, Video, Music, Loader2, Maximize2, Minimize2, ExternalLink, Printer, ZoomIn, ZoomOut } from 'lucide-react'
import { mockStorage } from '@/lib/mockStorage'

// Cache for presigned URLs (5 minute TTL)
const urlCache = new Map<string, { url: string; timestamp: number }>()
const URL_CACHE_TTL = 5 * 60 * 1000 // 5 minutes

interface Document {
  id: string
  name: string
  type: string
  sizeBytes: number
  s3Key: string
  s3Bucket: string
  createdAt: string
  labels: string[]
}

interface DocumentPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  document: Document | null
  onDownload?: (document: Document) => void
}

// Get file extension from filename
const getFileExtension = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  return ext
}

// Check if file type can be previewed
const canPreviewType = (type: string, extension: string): boolean => {
  const previewableTypes = ['image', 'pdf', 'word', 'excel', 'powerpoint', 'video', 'audio', 'text']
  const previewableExtensions = [
    'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', // images
    'pdf', // pdf
    'doc', 'docx', // word
    'xls', 'xlsx', 'csv', // excel
    'ppt', 'pptx', // powerpoint
    'mp4', 'webm', 'ogg', 'mov', // video
    'mp3', 'wav', 'ogg', 'aac', // audio
    'txt', 'md', 'json', 'xml', 'html', 'css', 'js', 'ts', 'tsx', 'jsx' // text
  ]
  return previewableTypes.includes(type) || previewableExtensions.includes(extension)
}

// Check if file can use Google Docs Viewer
const canUseGoogleViewer = (type: string, extension: string): boolean => {
  const googleViewerTypes = ['powerpoint'] // Only PowerPoint uses Google Viewer now
  const googleViewerExtensions = ['ppt', 'pptx']
  return googleViewerTypes.includes(type) || googleViewerExtensions.includes(extension)
}

// Check if file can use our own preview API (Word, Excel, and PowerPoint)
const canUseOurPreviewAPI = (type: string, extension: string): boolean => {
  const supportedTypes = ['word', 'excel', 'powerpoint']
  const supportedExtensions = ['doc', 'docx', 'xls', 'xlsx', 'csv', 'ppt', 'pptx']
  return supportedTypes.includes(type) || supportedExtensions.includes(extension)
}

// Check if file is a text file
const isTextFile = (extension: string): boolean => {
  const textExtensions = ['txt', 'md', 'json', 'xml', 'html', 'css', 'js', 'ts', 'tsx', 'jsx', 'csv', 'log', 'yaml', 'yml']
  return textExtensions.includes(extension)
}

// Check if file is video
const isVideoFile = (type: string, extension: string): boolean => {
  return type === 'video' || ['mp4', 'webm', 'ogg', 'mov'].includes(extension)
}

// Check if file is audio
const isAudioFile = (type: string, extension: string): boolean => {
  return type === 'audio' || ['mp3', 'wav', 'ogg', 'aac', 'm4a'].includes(extension)
}

export default function DocumentPreviewModal({
  isOpen,
  onClose,
  document,
  onDownload,
}: DocumentPreviewModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [textContent, setTextContent] = useState<string | null>(null)
  const [isMaximized, setIsMaximized] = useState(false)
  const [zoom, setZoom] = useState(100)

  useEffect(() => {
    if (isOpen && document) {
      loadPreview()
    } else {
      setPreviewUrl(null)
      setError(null)
      setTextContent(null)
    }
  }, [isOpen, document])

  const loadPreview = async () => {
    if (!document) return

    setLoading(true)
    setError(null)
    setTextContent(null)

    try {
      let url: string | null = null

      // Check cache first
      const cached = urlCache.get(document.s3Key)
      if (cached && Date.now() - cached.timestamp < URL_CACHE_TTL) {
        url = cached.url
      } else {
        // Try mockStorage first (for recently uploaded files in session)
        url = await mockStorage.getFileUrl(document.s3Key)

        // Fallback to S3 presigned URL
        if (!url) {
          const response = await fetch('/api/documents/presign-get', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key: document.s3Key }),
          })

          if (!response.ok) {
            setError('File not found')
            return
          }

          const data = await response.json()
          if (!data.url) {
            setError('File not found')
            return
          }
          url = data.url
        }

        // Cache the URL
        if (url) {
          urlCache.set(document.s3Key, { url, timestamp: Date.now() })
        }
      }

      if (!url) {
        setError('File not found')
        return
      }

      setPreviewUrl(url)

      // For text files, fetch and display content
      const extension = getFileExtension(document.name)
      if (isTextFile(extension)) {
        try {
          const textResponse = await fetch(url)
          if (textResponse.ok) {
            const text = await textResponse.text()
            setTextContent(text)
          }
        } catch (e) {
          console.error('Error loading text content:', e)
        }
      }
    } catch (err) {
      console.error('Error loading preview:', err)
      setError('Failed to load preview')
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    // For PDFs and images we can try to print the iframe/img directly
    // but the most reliable way is to print the whole window after isolating the content
    // However, for this implementation, we'll use a simple window.print() 
    // and rely on CSS media queries if they exist, or just print the current view.
    window.print();
  }

  const handleOpenExternal = () => {
    if (previewUrl) {
      window.open(previewUrl, '_blank');
    }
  }

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 300))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 25))

  if (!isOpen || !document) return null

  const extension = getFileExtension(document.name)
  const canPreview = canPreviewType(document.type, extension)
  const useGoogleViewer = canUseGoogleViewer(document.type, extension)
  const useOurPreviewAPI = canUseOurPreviewAPI(document.type, extension)
  const isVideo = isVideoFile(document.type, extension)
  const isAudio = isAudioFile(document.type, extension)
  const isText = isTextFile(extension)

  // Build our preview API URL for Word/Excel files
  const ourPreviewUrl = useOurPreviewAPI && document
    ? `/api/documents/${document.id}/preview?key=${encodeURIComponent(document.s3Key)}`
    : null

  // Get icon for file type
  const getFileIcon = () => {
    if (document.type === 'pdf' || extension === 'pdf') return <FileText className="w-16 h-16 text-red-500" />
    if (document.type === 'word' || ['doc', 'docx'].includes(extension)) return <FileText className="w-16 h-16 text-blue-600" />
    if (document.type === 'excel' || ['xls', 'xlsx', 'csv'].includes(extension)) return <Sheet className="w-16 h-16 text-green-600" />
    if (document.type === 'powerpoint' || ['ppt', 'pptx'].includes(extension)) return <FileText className="w-16 h-16 text-orange-500" />
    if (isVideo) return <Video className="w-16 h-16 text-purple-500" />
    if (isAudio) return <Music className="w-16 h-16 text-pink-500" />
    return <File className="w-16 h-16 text-gray-500 dark:text-gray-400" />
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-0 sm:p-4">
      <div className={`bg-white dark:bg-slate-800 shadow-xl flex flex-col transition-all duration-300 ${
        isMaximized 
          ? 'w-full h-full rounded-none' 
          : 'max-w-7xl w-full max-h-[90vh] rounded-lg'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {document.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {document.type.toUpperCase()} • {(document.sizeBytes / 1024).toFixed(1)} KB •{' '}
              {new Date(document.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 ml-4">
            <div className="flex items-center gap-1 mr-2 border-r border-gray-200 dark:border-slate-700 pr-2">
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300 min-w-[3rem] text-center">
                {zoom}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors"
              title={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? (
                <Minimize2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Maximize2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <button
              onClick={handleOpenExternal}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors"
              title="Open in New Tab"
            >
              <ExternalLink className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors"
              title="Print"
            >
              <Printer className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            {onDownload && (
              <button
                onClick={() => onDownload(document)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors"
                title="Download"
              >
                <Download className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors"
              title="Close"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className={`flex-1 overflow-auto bg-gray-50 dark:bg-slate-900 ${isMaximized ? 'p-0' : 'p-6'}`}>
          <div 
            className="w-full h-full flex flex-col"
            style={{ zoom: zoom / 100, minHeight: '100%' }}
          >
          {loading ? (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading preview...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <div className="text-center text-gray-600 dark:text-gray-400">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
                <p className="text-lg font-medium mb-2">Preview Not Available</p>
                <p className="text-sm">{error}</p>
                {onDownload && (
                  <button
                    onClick={() => onDownload(document)}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4" />
                    Download to View
                  </button>
                )}
              </div>
            </div>
          ) : !canPreview ? (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <div className="text-center text-gray-600 dark:text-gray-400">
                {getFileIcon()}
                <p className="text-lg font-medium mb-2 mt-4">Preview Not Available</p>
                <p className="text-sm mb-4">
                  {extension.toUpperCase()} files cannot be previewed in the browser.
                </p>
                {onDownload && (
                  <button
                    onClick={() => onDownload(document)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4" />
                    Download to View
                  </button>
                )}
              </div>
            </div>
          ) : document.type === 'image' && previewUrl ? (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <img
                src={previewUrl}
                alt={document.name}
                className="max-w-full max-h-full object-contain rounded"
              />
            </div>
          ) : document.type === 'pdf' || extension === 'pdf' ? (
            // Use our proxy API for PDFs to ensure correct Content-Type header
            <iframe
              src={`/api/documents/${document.id}/preview?key=${encodeURIComponent(document.s3Key)}`}
              className="w-full h-full min-h-[600px] rounded-none border-0"
              title={document.name}
            />
          ) : useOurPreviewAPI && ourPreviewUrl ? (
            // Use our own preview API for Word, Excel, and PowerPoint files
            <iframe
              src={ourPreviewUrl}
              className="w-full h-full min-h-[600px] rounded-none border-0 bg-white"
              title={document.name}
            />
          ) : useGoogleViewer && previewUrl ? (
            // Use Google Docs Viewer for PowerPoint files
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(previewUrl)}&embedded=true`}
              className="w-full h-full min-h-[600px] rounded-none border-0 bg-white"
              title={document.name}
            />
          ) : isVideo && previewUrl ? (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <video
                src={previewUrl}
                controls
                className="max-w-full max-h-full rounded"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          ) : isAudio && previewUrl ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
              <Music className="w-24 h-24 text-pink-500 mb-6" />
              <audio
                src={previewUrl}
                controls
                className="w-full max-w-md"
              >
                Your browser does not support the audio tag.
              </audio>
            </div>
          ) : isText && textContent !== null ? (
            <div className="h-full min-h-[400px]">
              <pre className="w-full h-full p-4 bg-white dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-700 overflow-auto text-sm text-gray-800 dark:text-gray-200 font-mono whitespace-pre-wrap">
                {textContent}
              </pre>
            </div>
          ) : null}
          </div>
        </div>

        {/* Footer - Tags */}
        {document.labels && document.labels.length > 0 && (
          <div className="px-6 py-3 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Tags:</span>
              <div className="flex flex-wrap gap-1">
                {document.labels.map((label, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
