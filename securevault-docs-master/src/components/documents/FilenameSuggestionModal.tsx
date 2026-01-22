'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Sparkles, FileText, Folder, Calendar, Check, Edit2, AlertCircle, Loader2 } from 'lucide-react'

interface FilenameSuggestionModalProps {
  isOpen: boolean
  onClose: () => void
  originalFilename: string
  suggestedFilename: string
  documentType: string
  confidence: number
  expirationDate: string | null
  destinationFolder: string
  onConfirm: (finalFilename: string, expirationDate: string | null, enableTracking: boolean) => void
  onSkip: () => void
  isProcessing?: boolean
}

export default function FilenameSuggestionModal({
  isOpen,
  onClose,
  originalFilename,
  suggestedFilename,
  documentType,
  confidence,
  expirationDate: initialExpirationDate,
  destinationFolder,
  onConfirm,
  onSkip,
  isProcessing = false,
}: FilenameSuggestionModalProps) {
  const [filename, setFilename] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [expirationDate, setExpirationDate] = useState<string>('')
  const [enableExpirationTracking, setEnableExpirationTracking] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize state when modal opens
  useEffect(() => {
    if (isOpen) {
      setFilename(suggestedFilename || originalFilename)
      setExpirationDate(initialExpirationDate || '')
      setEnableExpirationTracking(!!initialExpirationDate)
      setIsEditing(false)
    }
  }, [isOpen, suggestedFilename, originalFilename, initialExpirationDate])

  // Focus input when editing
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  if (!isOpen) return null

  // Determine if folder is new (contains "New folder" or path doesn't exist)
  const isNewFolder = destinationFolder.toLowerCase().includes('new') || destinationFolder === ''

  // Get confidence label and color
  const getConfidenceInfo = (conf: number) => {
    if (conf >= 0.9) return { label: 'High', color: 'text-green-600 bg-green-100' }
    if (conf >= 0.7) return { label: 'Medium', color: 'text-yellow-600 bg-yellow-100' }
    return { label: 'Low', color: 'text-orange-600 bg-orange-100' }
  }

  const confidenceInfo = getConfidenceInfo(confidence)

  const handleConfirm = () => {
    onConfirm(
      filename,
      enableExpirationTracking ? expirationDate : null,
      enableExpirationTracking
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isEditing) {
      handleConfirm()
    } else if (e.key === 'Escape') {
      if (isEditing) {
        setIsEditing(false)
        setFilename(suggestedFilename || originalFilename)
      } else {
        onClose()
      }
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Smart Document Analysis</h2>
              <p className="text-sm text-gray-500">Review and confirm the suggested details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Document Type Detection */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Detected Document Type</span>
              <span className={`text-xs px-2 py-1 rounded-full ${confidenceInfo.color}`}>
                {confidenceInfo.label} confidence
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-500" />
              <span className="text-gray-900 font-medium">{documentType}</span>
            </div>
          </div>

          {/* Filename Suggestion */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Suggested Filename
            </label>
            <div className="relative">
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setIsEditing(false)
                    }
                  }}
                  className="w-full px-4 py-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div
                  className="flex items-center justify-between px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => setIsEditing(true)}
                >
                  <span className="text-gray-900 truncate">{filename}</span>
                  <Edit2 className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" />
                </div>
              )}
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Original: {originalFilename}
            </p>
          </div>

          {/* Folder Destination */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination Folder
            </label>
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
              <Folder className={`w-5 h-5 ${isNewFolder ? 'text-green-500' : 'text-gray-500'}`} />
              <span className="text-gray-900 truncate">{destinationFolder || 'Root'}</span>
              {isNewFolder && (
                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full flex-shrink-0">
                  New folder
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {isNewFolder
                ? 'This folder will be created automatically'
                : 'Document will be placed in existing folder'}
            </p>
          </div>

          {/* Expiration Date Detection */}
          {initialExpirationDate && (
            <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      Expiration Date Detected
                    </span>
                  </div>

                  <input
                    type="date"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    className="mt-2 w-full px-3 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
                  />

                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableExpirationTracking}
                      onChange={(e) => setEnableExpirationTracking(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Enable expiration tracking & reminders
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Low Confidence Warning */}
          {confidence < 0.7 && (
            <div className="flex items-start gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
              <p className="text-sm text-orange-700">
                The document type detection has low confidence. Please verify the suggested filename and folder are correct.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50 ${isProcessing ? 'opacity-75' : ''}`}>
          <button
            onClick={onSkip}
            disabled={isProcessing}
            className={`px-4 py-2 text-gray-700 rounded-lg transition-colors ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
            }`}
          >
            Keep Original Name
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className={`px-4 py-2 border border-gray-300 text-gray-700 rounded-lg transition-colors ${
                isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isProcessing}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2 ${
                isProcessing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Confirm & Upload
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
