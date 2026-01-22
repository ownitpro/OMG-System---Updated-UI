'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Upload, FileText, Loader2, CheckCircle } from 'lucide-react'

// Share Target Page
// Handles files shared from other apps via Web Share Target API

function ShareTargetContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'receiving' | 'processing' | 'success' | 'error'>('receiving')
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check for shared text/URL
    const title = searchParams.get('title')
    const text = searchParams.get('text')
    const url = searchParams.get('url')

    // For now, redirect to documents page with shared info
    if (title || text || url) {
      const shareInfo = { title, text, url }
      sessionStorage.setItem('share-target-text', JSON.stringify(shareInfo))
      router.push('/documents?action=upload&source=share')
      return
    }

    // Files are shared via POST with FormData
    // The service worker or browser will have stored them
    handleSharedFiles()
  }, [searchParams, router])

  const handleSharedFiles = async () => {
    try {
      setStatus('processing')

      // Check if there are files in the session
      const sharedFilesData = sessionStorage.getItem('share-target-files')

      if (!sharedFilesData) {
        // No files shared, redirect to upload page
        router.push('/documents?action=upload')
        return
      }

      // Files should be stored as an array of file info
      const fileInfo = JSON.parse(sharedFilesData)
      console.log('[SHARE-TARGET] Processing shared files:', fileInfo)

      // If files were shared, redirect to documents page with upload action
      sessionStorage.removeItem('share-target-files')
      setStatus('success')

      setTimeout(() => {
        router.push('/documents?action=upload&source=share')
      }, 1500)
    } catch (err) {
      console.error('[SHARE-TARGET] Error processing shared files:', err)
      setError('Failed to process shared files')
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {status === 'receiving' && (
          <>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Receiving Files
            </h1>
            <p className="text-gray-500">
              Please wait while we receive your shared files...
            </p>
            <div className="mt-6">
              <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-600" />
            </div>
          </>
        )}

        {status === 'processing' && (
          <>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Processing Files
            </h1>
            <p className="text-gray-500">
              Preparing your documents for upload...
            </p>
            <div className="mt-6">
              <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-600" />
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Files Received
            </h1>
            <p className="text-gray-500">
              Redirecting to upload page...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Error
            </h1>
            <p className="text-gray-500 mb-4">
              {error || 'Failed to process shared files'}
            </p>
            <button
              onClick={() => router.push('/documents')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Documents
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default function ShareTargetPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>}>
      <ShareTargetContent />
    </Suspense>
  )
}
