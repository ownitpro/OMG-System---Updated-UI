'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Camera, SwitchCamera, Zap, ZapOff, AlertCircle } from 'lucide-react'
import { useCamera } from '@/hooks/useCamera'
import { detectBlur, getBlurLevelDescription } from '@/lib/image/blurDetection'

interface CapturedImage {
  blob: Blob
  dataUrl: string
  blurScore: number
  isBlurry: boolean
}

interface CameraScanModalProps {
  isOpen: boolean
  onClose: () => void
  onCapture: (images: CapturedImage[]) => void
  maxImages?: number
}

export default function CameraScanModal({
  isOpen,
  onClose,
  onCapture,
  maxImages = 10,
}: CameraScanModalProps) {
  const {
    state: cameraState,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    switchCamera,
    captureImage,
    captureImageAsDataURL,
  } = useCamera({ preferredFacingMode: 'environment' })

  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([])
  const [isCapturing, setIsCapturing] = useState(false)
  const [flashEnabled, setFlashEnabled] = useState(false)
  const [showBlurWarning, setShowBlurWarning] = useState(false)
  const [lastBlurResult, setLastBlurResult] = useState<{ score: number; isBlurry: boolean } | null>(null)

  // Start camera when modal opens
  useEffect(() => {
    if (isOpen) {
      startCamera()
    } else {
      stopCamera()
      setCapturedImages([])
      setShowBlurWarning(false)
      setLastBlurResult(null)
    }
  }, [isOpen, startCamera, stopCamera])

  // Handle capture
  const handleCapture = useCallback(async () => {
    if (isCapturing || capturedImages.length >= maxImages) return

    setIsCapturing(true)

    try {
      // Flash effect
      if (flashEnabled) {
        const flashEl = document.getElementById('camera-flash')
        if (flashEl) {
          flashEl.classList.add('flash-active')
          setTimeout(() => flashEl.classList.remove('flash-active'), 150)
        }
      }

      const blob = await captureImage()
      const dataUrl = captureImageAsDataURL()

      if (!blob || !dataUrl) {
        throw new Error('Failed to capture image')
      }

      // Check blur
      const blurResult = await detectBlur(dataUrl)
      setLastBlurResult({ score: blurResult.score, isBlurry: blurResult.isBlurry })

      const newImage: CapturedImage = {
        blob,
        dataUrl,
        blurScore: blurResult.score,
        isBlurry: blurResult.isBlurry,
      }

      if (blurResult.isBlurry) {
        // Show warning but still allow to proceed
        setShowBlurWarning(true)
        // Add to captured images anyway - user can retake
        setCapturedImages(prev => [...prev, newImage])
      } else {
        setShowBlurWarning(false)
        setCapturedImages(prev => [...prev, newImage])
      }
    } catch (error) {
      console.error('Capture error:', error)
    } finally {
      setIsCapturing(false)
    }
  }, [isCapturing, capturedImages.length, maxImages, flashEnabled, captureImage, captureImageAsDataURL])

  // Remove last captured image (retake)
  const handleRetakeLast = useCallback(() => {
    setCapturedImages(prev => prev.slice(0, -1))
    setShowBlurWarning(false)
    setLastBlurResult(null)
  }, [])

  // Done - proceed with captured images
  const handleDone = useCallback(() => {
    if (capturedImages.length > 0) {
      onCapture(capturedImages)
    }
  }, [capturedImages, onCapture])

  // Close and cancel
  const handleClose = useCallback(() => {
    stopCamera()
    setCapturedImages([])
    onClose()
  }, [stopCamera, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Flash overlay */}
        <div
          id="camera-flash"
          className="absolute inset-0 bg-white opacity-0 pointer-events-none transition-opacity duration-150 z-10 rounded-2xl"
          style={{ opacity: 0 }}
        />

        {/* Header */}
        <div className="bg-gray-800 p-4 flex items-center justify-between">
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-700 text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-white text-center">
            <p className="font-medium">Scan Document</p>
            <p className="text-sm text-gray-400">
              {capturedImages.length} / {maxImages} captured
            </p>
          </div>
          <div className="w-9" /> {/* Spacer for alignment */}
        </div>

        {/* Camera View */}
        <div className="relative h-[50vh] sm:h-[60vh] bg-black">
        {cameraState.isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
              <p>Starting camera...</p>
            </div>
          </div>
        )}

        {cameraState.error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
            <div className="text-center text-white p-8">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
              <p className="text-lg font-medium mb-2">Camera Error</p>
              <p className="text-gray-400 mb-4">{cameraState.error}</p>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    console.log('[CAMERA] Try Again clicked');
                    startCamera();
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer font-medium"
                >
                  Try Again
                </button>
                <p className="text-xs text-gray-500 mt-4">
                  Tip: Make sure no other app is using the camera, <br />
                  and check that camera permission is allowed for this site.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Video element */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />

        {/* Hidden canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Document guide overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Document frame */}
          <div className="absolute inset-6 sm:inset-10 border-2 border-white/50 rounded-lg">
            {/* Corner markers */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-lg" />
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-lg" />
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-lg" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-lg" />
          </div>

          {/* Guide text */}
          <div className="absolute bottom-16 left-0 right-0 text-center">
            <p className="text-white text-xs bg-black/50 inline-block px-3 py-1.5 rounded-full">
              Position document within the frame
            </p>
          </div>
        </div>

        {/* Blur warning popup */}
        {showBlurWarning && lastBlurResult && (
          <div className="absolute top-4 left-4 right-4 bg-yellow-500/90 text-black rounded-lg p-3 z-30">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">Image appears blurry</p>
                <p className="text-sm opacity-80">
                  Blur score: {lastBlurResult.score.toFixed(0)} (min recommended: 100)
                </p>
                <p className="text-sm opacity-80">
                  This may affect OCR accuracy. Consider retaking.
                </p>
              </div>
              <button
                onClick={() => setShowBlurWarning(false)}
                className="p-1 hover:bg-black/10 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleRetakeLast}
                className="flex-1 px-3 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900"
              >
                Retake
              </button>
              <button
                onClick={() => setShowBlurWarning(false)}
                className="flex-1 px-3 py-2 bg-white/20 text-black rounded-lg text-sm font-medium hover:bg-white/30"
              >
                Keep Anyway
              </button>
            </div>
          </div>
        )}

        {/* Captured images thumbnails */}
        {capturedImages.length > 0 && (
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {capturedImages.map((img, index) => (
                <div
                  key={index}
                  className={`relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 ${
                    img.isBlurry ? 'border-yellow-500' : 'border-white'
                  }`}
                >
                  <img
                    src={img.dataUrl}
                    alt={`Scan ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs text-center py-0.5">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>

        {/* Bottom controls */}
        <div className="bg-gray-800 p-4">
          <div className="flex items-center justify-center gap-6">
            {/* Flash toggle */}
            <button
              onClick={() => setFlashEnabled(!flashEnabled)}
              className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600"
              title={flashEnabled ? 'Disable flash effect' : 'Enable flash effect'}
            >
              {flashEnabled ? <Zap className="w-5 h-5" /> : <ZapOff className="w-5 h-5" />}
            </button>

            {/* Capture button */}
            <button
              onClick={handleCapture}
              disabled={isCapturing || capturedImages.length >= maxImages || !cameraState.isActive}
              className={`w-16 h-16 rounded-full border-4 border-white flex items-center justify-center transition-all ${
                isCapturing
                  ? 'bg-white/50 scale-95'
                  : capturedImages.length >= maxImages
                  ? 'bg-gray-500 opacity-50 cursor-not-allowed'
                  : 'bg-white/20 hover:bg-white/30 active:scale-95'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full ${
                  isCapturing ? 'bg-white' : 'bg-white'
                }`}
              />
            </button>

            {/* Switch camera */}
            {cameraState.hasMultipleCameras && (
              <button
                onClick={switchCamera}
                className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600"
                title="Switch camera"
              >
                <SwitchCamera className="w-5 h-5" />
              </button>
            )}

            {/* Placeholder if no switch button */}
            {!cameraState.hasMultipleCameras && <div className="w-11" />}
          </div>

          {/* Done button */}
          {capturedImages.length > 0 && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleDone}
                className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors text-sm"
              >
                Done ({capturedImages.length} {capturedImages.length === 1 ? 'scan' : 'scans'})
              </button>
            </div>
          )}
        </div>

        <style jsx>{`
          #camera-flash.flash-active {
            opacity: 1 !important;
          }
        `}</style>
      </div>
    </div>
  )
}

export type { CapturedImage }
