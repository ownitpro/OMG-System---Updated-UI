'use client'

import { useState, useEffect } from 'react'
import { X, Clock, RotateCcw, Download, Upload, ArrowUp, ArrowDown, Minus, History } from 'lucide-react'
import { formatFileSize } from '@/lib/mockStorage'
import { useToast } from '../shared/ToastContainer'
import { useTheme } from '@/contexts/ThemeContext'

interface DocumentVersion {
  id: string
  documentId: string
  versionNumber: number
  sizeBytes: number
  s3Key: string
  uploadedById: string
  createdAt: string
}

interface Document {
  id: string
  name: string
  sizeBytes: number
  s3Key: string
  createdAt?: string
  updatedAt?: string
}

interface DocumentVersionHistoryModalProps {
  isOpen: boolean
  onClose: () => void
  document: Document
  onVersionRestored: () => void
  onUploadNewVersion?: () => void
}

// Helper to format relative time
const formatRelativeTime = (dateString: string): string => {
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now.getTime() - date.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30)

  if (diffSecs < 60) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffWeeks < 4) return `${diffWeeks}w ago`
  return `${diffMonths}mo ago`
}

// Helper to format size difference
const formatSizeDiff = (currentSize: number, versionSize: number): { text: string; icon: 'up' | 'down' | 'same'; color: string } => {
  const diff = currentSize - versionSize
  if (Math.abs(diff) < 1024) return { text: 'Same size', icon: 'same', color: 'gray' }

  const formatted = formatFileSize(Math.abs(diff))
  if (diff > 0) {
    return { text: `+${formatted}`, icon: 'up', color: 'green' }
  }
  return { text: `-${formatted}`, icon: 'down', color: 'red' }
}

export default function DocumentVersionHistoryModal({
  isOpen,
  onClose,
  document,
  onVersionRestored,
  onUploadNewVersion,
}: DocumentVersionHistoryModalProps) {
  const { isDarkMode } = useTheme()
  const [versions, setVersions] = useState<DocumentVersion[]>([])
  const [loading, setLoading] = useState(false)
  const [restoring, setRestoring] = useState<string | null>(null)
  const [downloading, setDownloading] = useState<string | null>(null)
  const { showToast } = useToast()

  useEffect(() => {
    if (isOpen && document) {
      fetchVersions()
    }
  }, [isOpen, document])

  const fetchVersions = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/documents/${document.id}/versions`)
      const data = await response.json()
      setVersions(data.versions || [])
    } catch (error) {
      console.error('Error fetching versions:', error)
      showToast('Failed to load version history', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleRestoreVersion = async (versionId: string, versionNumber: number) => {
    if (!confirm(`Are you sure you want to restore version ${versionNumber}? The current version will be saved in history.`)) {
      return
    }

    setRestoring(versionId)
    try {
      const response = await fetch(`/api/documents/${document.id}/versions/${versionId}/restore`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to restore version')
      }

      showToast(`Version ${versionNumber} restored successfully`, 'success')
      onVersionRestored()
      fetchVersions()
    } catch (error) {
      console.error('Error restoring version:', error)
      showToast('Failed to restore version', 'error')
    } finally {
      setRestoring(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleDownloadVersion = async (version: DocumentVersion) => {
    setDownloading(version.id)
    try {
      // Get presigned URL for the version's S3 key
      const response = await fetch('/api/documents/presign-get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: version.s3Key }),
      })

      if (!response.ok) {
        throw new Error('Failed to get download URL')
      }

      const { url } = await response.json()

      // Create filename with version number
      const extension = document.name.includes('.') ? document.name.substring(document.name.lastIndexOf('.')) : ''
      const baseName = document.name.includes('.') ? document.name.substring(0, document.name.lastIndexOf('.')) : document.name
      const versionedName = `${baseName}_v${version.versionNumber}${extension}`

      // Trigger download
      const link = window.document.createElement('a')
      link.href = url
      link.download = versionedName
      window.document.body.appendChild(link)
      link.click()
      window.document.body.removeChild(link)

      showToast(`Downloading version ${version.versionNumber}`, 'success')
    } catch (error) {
      console.error('Error downloading version:', error)
      showToast('Failed to download version', 'error')
    } finally {
      setDownloading(null)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
            }`}>
              <History className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div>
              <h2 className={`text-xl font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Version History</h2>
              <p className={`text-sm mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{document.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? 'text-slate-400 hover:text-slate-300 hover:bg-slate-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : versions.length === 0 ? (
            <div className="text-center py-12">
              <Clock className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-slate-600' : 'text-gray-300'}`} />
              <p className={`text-lg font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>No version history yet</p>
              <p className={`text-sm mt-2 max-w-sm mx-auto ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>
                When you upload a new version, the current version will be saved here for easy access and restoration.
              </p>
              {onUploadNewVersion && (
                <button
                  onClick={() => { onClose(); onUploadNewVersion(); }}
                  className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Upload New Version
                </button>
              )}
            </div>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className={`absolute left-5 top-6 bottom-6 w-0.5 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`} />

              <div className="space-y-4">
                {/* Current Version */}
                <div className="relative">
                  <div className={`border-2 rounded-xl p-4 ml-10 ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-blue-900/40 to-blue-900/20 border-blue-700'
                      : 'bg-gradient-to-r from-blue-50 to-white border-blue-200'
                  }`}>
                    {/* Timeline dot */}
                    <div className={`absolute left-3 top-6 w-5 h-5 rounded-full border-4 ${
                      isDarkMode ? 'bg-blue-500 border-slate-800' : 'bg-blue-500 border-white'
                    }`} />

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Current Version</span>
                          <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded-full">
                            Active
                          </span>
                          {document.updatedAt && (
                            <span className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                              {formatRelativeTime(document.updatedAt)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                            {formatFileSize(document.sizeBytes)}
                          </span>
                          {document.updatedAt && (
                            <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>
                              {formatDate(document.updatedAt)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Previous Versions */}
                {versions.map((version, index) => {
                  const sizeDiff = formatSizeDiff(document.sizeBytes, version.sizeBytes)
                  const isLast = index === versions.length - 1

                  return (
                    <div key={version.id} className="relative">
                      <div className={`border rounded-xl p-4 ml-10 transition-all ${
                        isDarkMode
                          ? 'bg-slate-700/30 border-slate-600 hover:bg-slate-700/50 hover:border-slate-500'
                          : 'bg-white border-gray-200 hover:shadow-md hover:border-gray-300'
                      }`}>
                        {/* Timeline dot */}
                        <div className={`absolute left-3 top-6 w-5 h-5 rounded-full border-4 ${
                          version.versionNumber === 0
                            ? isDarkMode ? 'bg-amber-500 border-slate-800' : 'bg-amber-500 border-white'
                            : isDarkMode ? 'bg-slate-500 border-slate-800' : 'bg-gray-400 border-white'
                        }`} />

                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Version {version.versionNumber}
                              </span>
                              {version.versionNumber === 0 && (
                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                  isDarkMode
                                    ? 'bg-amber-900/50 text-amber-400'
                                    : 'bg-amber-100 text-amber-700'
                                }`}>
                                  Original
                                </span>
                              )}
                              <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                                {formatRelativeTime(version.createdAt)}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 mt-2 flex-wrap">
                              <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                                {formatFileSize(version.sizeBytes)}
                              </span>
                              {/* Size difference badge */}
                              <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                                sizeDiff.color === 'green'
                                  ? isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                                  : sizeDiff.color === 'red'
                                    ? isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
                                    : isDarkMode ? 'bg-slate-600 text-slate-400' : 'bg-gray-100 text-gray-500'
                              }`}>
                                {sizeDiff.icon === 'up' && <ArrowUp className="w-3 h-3" />}
                                {sizeDiff.icon === 'down' && <ArrowDown className="w-3 h-3" />}
                                {sizeDiff.icon === 'same' && <Minus className="w-3 h-3" />}
                                {sizeDiff.text}
                              </span>
                              <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>
                                {formatDate(version.createdAt)}
                              </span>
                            </div>
                          </div>

                          {/* Action buttons */}
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                              onClick={() => handleDownloadVersion(version)}
                              disabled={downloading === version.id}
                              title="Download this version"
                              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                isDarkMode
                                  ? 'text-slate-300 hover:bg-slate-600'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              {downloading === version.id ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                              ) : (
                                <Download className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleRestoreVersion(version.id, version.versionNumber)}
                              disabled={restoring === version.id}
                              title="Restore this version"
                              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                isDarkMode
                                  ? 'text-blue-400 hover:bg-blue-900/30'
                                  : 'text-blue-600 hover:bg-blue-50'
                              }`}
                            >
                              {restoring === version.id ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                  <span className="hidden sm:inline">Restoring...</span>
                                </>
                              ) : (
                                <>
                                  <RotateCcw className="w-4 h-4" />
                                  <span className="hidden sm:inline">Restore</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-between gap-3 p-6 border-t ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <div className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
            {versions.length > 0 && (
              <span>{versions.length} version{versions.length !== 1 ? 's' : ''} saved</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {onUploadNewVersion && versions.length > 0 && (
              <button
                onClick={() => { onClose(); onUploadNewVersion(); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isDarkMode
                    ? 'text-blue-400 bg-blue-900/30 hover:bg-blue-900/50'
                    : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                }`}
              >
                <Upload className="w-4 h-4" />
                Upload New Version
              </button>
            )}
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg font-medium ${
                isDarkMode
                  ? 'text-slate-300 bg-slate-700 hover:bg-slate-600'
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
