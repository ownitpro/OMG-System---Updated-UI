'use client'

import { useState } from 'react'
import { X, Upload, File, AlertCircle } from 'lucide-react'
import { formatFileSize } from '@/lib/mockStorage'
import { useToast } from '../shared/ToastContainer'
import { useTheme } from '@/contexts/ThemeContext'

interface UploadNewVersionModalProps {
  isOpen: boolean
  onClose: () => void
  document: {
    id: string
    name: string
  }
  userId: string
  onVersionUploaded: () => void
}

export default function UploadNewVersionModal({
  isOpen,
  onClose,
  document,
  userId,
  onVersionUploaded,
}: UploadNewVersionModalProps) {
  const { isDarkMode } = useTheme()
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const { showToast } = useToast()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      setError(null)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setError(null)

    try {
      // 1. Get presigned URL for S3 upload
      const presignResponse = await fetch('/api/personal/upload/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: file.name,
          type: file.type || 'application/octet-stream',
          size: file.size,
          userId: userId,
        }),
      })

      if (!presignResponse.ok) {
        const errorData = await presignResponse.json()
        throw new Error(errorData.error || 'Failed to get upload URL')
      }

      const { url, key, headers } = await presignResponse.json()

      // 2. Upload file to S3 using presigned URL
      const uploadResponse = await fetch(url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type || 'application/octet-stream',
          ...headers,
        },
      })

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file to storage')
      }

      // 3. Create new version record via API
      const response = await fetch(`/api/documents/${document.id}/versions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storageKey: key,
          size: file.size,
          uploadedById: userId,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create new version')
      }

      showToast('New version uploaded successfully', 'success')
      onVersionUploaded()
      setFile(null)
      onClose()
    } catch (err: any) {
      console.error('Upload error:', err)
      setError(err.message || 'Failed to upload new version')
      showToast('Failed to upload new version', 'error')
    } finally {
      setUploading(false)
    }
  }

  const handleClose = () => {
    if (!uploading) {
      setFile(null)
      setError(null)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`rounded-lg shadow-xl max-w-lg w-full mx-4 ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <div className={`flex items-center justify-between p-6 border-b ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <div>
            <h2 className={`text-xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Upload New Version</h2>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{document.name}</p>
          </div>
          <button
            onClick={handleClose}
            className={isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-gray-400 hover:text-gray-600'}
            disabled={uploading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Drag and Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? isDarkMode
                  ? 'border-blue-500 bg-blue-900/30'
                  : 'border-blue-500 bg-blue-50'
                : isDarkMode
                  ? 'border-slate-600 hover:border-slate-500'
                  : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <Upload className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`} />
            <p className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
              Drop new version here or click to browse
            </p>
            <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              The current version will be saved in history
            </p>
            <input
              type="file"
              onChange={handleFileInput}
              className="hidden"
              id="version-file-upload"
              disabled={uploading}
            />
            <label
              htmlFor="version-file-upload"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
            >
              Select File
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className={`mt-4 p-4 rounded-md flex items-start gap-2 ${
              isDarkMode
                ? 'bg-red-900/30 border border-red-700'
                : 'bg-red-50 border border-red-200'
            }`}>
              <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
              <p className={`text-sm ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>{error}</p>
            </div>
          )}

          {/* Selected File */}
          {file && (
            <div className={`mt-4 p-4 rounded-md flex items-center gap-3 ${
              isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
            }`}>
              <File className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {file.name}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                  {formatFileSize(file.size)}
                </p>
              </div>
              {!uploading && (
                <button
                  onClick={() => setFile(null)}
                  className={isDarkMode ? 'text-slate-400 hover:text-red-400' : 'text-gray-400 hover:text-red-600'}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>

        <div className={`flex justify-end gap-3 p-6 border-t ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <button
            type="button"
            onClick={handleClose}
            className={`px-4 py-2 rounded-md ${
              isDarkMode
                ? 'text-slate-300 bg-slate-700 hover:bg-slate-600'
                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
            }`}
            disabled={uploading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={uploading || !file}
          >
            {uploading ? 'Uploading...' : 'Upload Version'}
          </button>
        </div>
      </div>
    </div>
  )
}
