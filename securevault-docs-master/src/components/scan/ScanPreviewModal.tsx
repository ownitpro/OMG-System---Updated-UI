'use client'

import { useState } from 'react'
import { X, RotateCcw, Trash2, Check, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react'
import { getBlurLevelDescription } from '@/lib/image/blurDetection'
import type { CapturedImage } from './CameraScanModal'

interface ScanPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  images: CapturedImage[]
  onRetake: () => void
  onRemove: (index: number) => void
  onConfirm: (images: CapturedImage[]) => void
}

export default function ScanPreviewModal({
  isOpen,
  onClose,
  images,
  onRetake,
  onRemove,
  onConfirm,
}: ScanPreviewModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!isOpen || images.length === 0) return null

  const currentImage = images[currentIndex]
  const blurLevel = getBlurLevelDescription(currentImage.blurScore)

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0))
  }

  const handleRemoveCurrent = () => {
    onRemove(currentIndex)
    if (currentIndex >= images.length - 1 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const hasBlurryImages = images.some(img => img.isBlurry)

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 p-4 flex items-center justify-between">
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-800 text-white"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="text-white text-center">
          <p className="font-medium">Review Scans</p>
          <p className="text-sm text-gray-400">
            {currentIndex + 1} of {images.length}
          </p>
        </div>
        <div className="w-10" />
      </div>

      {/* Main preview area */}
      <div className="flex-1 relative bg-gray-950 flex items-center justify-center overflow-hidden">
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </>
        )}

        {/* Image */}
        <img
          src={currentImage.dataUrl}
          alt={`Scan ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain"
        />

        {/* Blur warning badge */}
        {currentImage.isBlurry && (
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-yellow-500 text-black rounded-lg p-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm">This image appears blurry</p>
                <p className="text-xs opacity-80">
                  Score: {currentImage.blurScore.toFixed(0)} - Consider retaking for better OCR results
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quality indicator */}
        <div className="absolute bottom-4 left-4">
          <div
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              blurLevel.level === 'sharp'
                ? 'bg-green-500 text-white'
                : blurLevel.level === 'acceptable'
                ? 'bg-blue-500 text-white'
                : blurLevel.level === 'slightly_blurry'
                ? 'bg-yellow-500 text-black'
                : 'bg-red-500 text-white'
            }`}
          >
            {blurLevel.description}
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="bg-gray-900 p-4">
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? 'border-blue-500 ring-2 ring-blue-500/50'
                    : img.isBlurry
                    ? 'border-yellow-500/50'
                    : 'border-gray-700'
                }`}
              >
                <img
                  src={img.dataUrl}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {img.isBlurry && (
                  <div className="absolute top-0.5 right-0.5">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs text-center py-0.5">
                  {index + 1}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom actions */}
      <div className="bg-gray-900 border-t border-gray-800 p-4 space-y-3">
        {/* Warning if any blurry images */}
        {hasBlurryImages && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 flex items-center gap-2 text-yellow-500">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">
              Some images are blurry. This may affect OCR accuracy.
            </p>
          </div>
        )}

        <div className="flex gap-3">
          {/* Retake all */}
          <button
            onClick={onRetake}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Retake All</span>
          </button>

          {/* Remove current */}
          {images.length > 1 && (
            <button
              onClick={handleRemoveCurrent}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600/20 text-red-500 rounded-lg hover:bg-red-600/30 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}

          {/* Confirm */}
          <button
            onClick={() => onConfirm(images)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Check className="w-5 h-5" />
            <span>Continue</span>
          </button>
        </div>
      </div>
    </div>
  )
}
