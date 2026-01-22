'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, FolderOpen, ArrowRight, X } from 'lucide-react'

interface FolderAccessPopupProps {
  isOpen: boolean
  onClose: () => void
  folderPath: string
  folderCreated: boolean
  onNavigate?: () => void
  autoCloseDelay?: number // milliseconds, 0 to disable auto-close
}

export default function FolderAccessPopup({
  isOpen,
  onClose,
  folderPath,
  folderCreated,
  onNavigate,
  autoCloseDelay = 5000, // Auto-close after 5 seconds by default
}: FolderAccessPopupProps) {
  const [countdown, setCountdown] = useState<number | null>(null)

  // Auto-close timer
  useEffect(() => {
    if (!isOpen || autoCloseDelay <= 0) {
      setCountdown(null)
      return
    }

    setCountdown(Math.ceil(autoCloseDelay / 1000))

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isOpen, autoCloseDelay])

  // Separate effect to handle close when countdown reaches 0
  useEffect(() => {
    if (countdown === 0) {
      onClose()
    }
  }, [countdown, onClose])

  if (!isOpen) return null

  // Parse folder path for display
  const pathSegments = folderPath.split('/').filter(Boolean)

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 max-w-sm w-full">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-medium text-gray-900 dark:text-white">
              Document Sorted
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Your document has been automatically sorted to:
          </p>

          {/* Folder path visualization */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-1 flex-wrap">
              {pathSegments.map((segment, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && (
                    <ArrowRight className="w-3 h-3 text-gray-400 mx-1" />
                  )}
                  <span className="inline-flex items-center gap-1 text-sm bg-white dark:bg-gray-700 px-2 py-1 rounded border border-gray-200 dark:border-gray-600">
                    <FolderOpen className="w-3 h-3 text-amber-500" />
                    <span className="text-gray-700 dark:text-gray-300">{segment}</span>
                  </span>
                </div>
              ))}
            </div>

            {folderCreated && (
              <p className="text-xs text-green-600 dark:text-green-500 mt-2 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                New folders created automatically
              </p>
            )}
          </div>

          {/* How to access */}
          <div className="mt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
              How to access:
            </p>
            <ol className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-decimal list-inside">
              <li>Go to Documents tab</li>
              <li>Navigate through the folder tree on the left</li>
              <li>Click on each folder to expand</li>
            </ol>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-4 pt-0">
          {countdown !== null && (
            <span className="text-xs text-gray-400">
              Closing in {countdown}s
            </span>
          )}
          {onNavigate && (
            <button
              onClick={onNavigate}
              className="ml-auto px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center gap-1"
            >
              <FolderOpen className="w-4 h-4" />
              Open Folder
            </button>
          )}
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
