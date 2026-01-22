'use client'

import { useState, useCallback } from 'react'
import CameraScanModal, { type CapturedImage } from './CameraScanModal'
import ScanPreviewModal from './ScanPreviewModal'
import ScanNamingModal from './ScanNamingModal'
import type { AIDocumentAnalysisResult } from '@/types/ai'

type ScanStep = 'camera' | 'preview' | 'naming' | 'uploading'

interface NamedImage {
  image: CapturedImage
  name: string
  analysisResult?: AIDocumentAnalysisResult
}

interface DocumentScannerProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (files: { file: File; name: string; analysisResult?: AIDocumentAnalysisResult }[]) => Promise<void>
  maxImages?: number
  personalVaultId?: string
  organizationId?: string
  vaultContext?: 'personal' | 'organization'
  userId?: string
}

export default function DocumentScanner({
  isOpen,
  onClose,
  onUpload,
  maxImages = 10,
  personalVaultId,
  organizationId,
  vaultContext = 'personal',
  userId,
}: DocumentScannerProps) {
  const [step, setStep] = useState<ScanStep>('camera')
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([])
  const [isUploading, setIsUploading] = useState(false)

  // Reset state when closing
  const handleClose = useCallback(() => {
    setCapturedImages([])
    setStep('camera')
    onClose()
  }, [onClose])

  // Handle images captured from camera
  const handleCapture = useCallback((images: CapturedImage[]) => {
    setCapturedImages(images)
    setStep('preview')
  }, [])

  // Handle retake - go back to camera
  const handleRetake = useCallback(() => {
    setCapturedImages([])
    setStep('camera')
  }, [])

  // Handle remove single image
  const handleRemoveImage = useCallback((index: number) => {
    setCapturedImages(prev => {
      const newImages = prev.filter((_, i) => i !== index)
      if (newImages.length === 0) {
        setStep('camera')
      }
      return newImages
    })
  }, [])

  // Handle confirm preview - go to naming
  const handleConfirmPreview = useCallback((images: CapturedImage[]) => {
    setCapturedImages(images)
    setStep('naming')
  }, [])

  // Handle back from naming to preview
  const handleBackToPreview = useCallback(() => {
    setStep('preview')
  }, [])

  // Handle final upload
  const handleConfirmUpload = useCallback(
    async (namedImages: NamedImage[]) => {
      setIsUploading(true)
      setStep('uploading')

      try {
        // Convert captured images to File objects with analysis results
        const files = namedImages.map(({ image, name, analysisResult }) => {
          const fileName = name.endsWith('.jpg') ? name : `${name}.jpg`
          const file = new File([image.blob], fileName, { type: 'image/jpeg' })
          return { file, name: fileName, analysisResult }
        })

        // Call parent upload handler
        await onUpload(files)

        // Success - close modal
        handleClose()
      } catch (error) {
        console.error('Upload error:', error)
        // Go back to naming step on error
        setStep('naming')
      } finally {
        setIsUploading(false)
      }
    },
    [onUpload, handleClose]
  )

  if (!isOpen) return null

  return (
    <>
      {/* Camera step */}
      <CameraScanModal
        isOpen={isOpen && step === 'camera'}
        onClose={handleClose}
        onCapture={handleCapture}
        maxImages={maxImages}
      />

      {/* Preview step */}
      <ScanPreviewModal
        isOpen={isOpen && step === 'preview'}
        onClose={handleClose}
        images={capturedImages}
        onRetake={handleRetake}
        onRemove={handleRemoveImage}
        onConfirm={handleConfirmPreview}
      />

      {/* Naming step */}
      <ScanNamingModal
        isOpen={isOpen && step === 'naming'}
        onClose={handleClose}
        images={capturedImages}
        onConfirm={handleConfirmUpload}
        onBack={handleBackToPreview}
        personalVaultId={personalVaultId}
        organizationId={organizationId}
        vaultContext={vaultContext}
        userId={userId}
      />

      {/* Uploading overlay */}
      {step === 'uploading' && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 text-center max-w-sm mx-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Uploading Scans
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Please wait while your documents are being uploaded...
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export { type CapturedImage, type NamedImage }
