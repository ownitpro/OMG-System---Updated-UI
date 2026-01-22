'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { X, Camera, Upload, RotateCcw, Check, Loader2, Trash2, ImageIcon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useCamera } from '@/hooks/useCamera'

interface ProfileImageModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
  currentImage?: string | null
  onImageUpdated: (imageUrl: string | null) => void
}

type ModalView = 'options' | 'camera' | 'preview' | 'uploading'

export default function ProfileImageModal({
  isOpen,
  onClose,
  userId,
  currentImage,
  onImageUpdated,
}: ProfileImageModalProps) {
  const { isDarkMode } = useTheme()
  const [view, setView] = useState<ModalView>('options')
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    state: cameraState,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    switchCamera,
    captureImageAsDataURL,
  } = useCamera({ preferredFacingMode: 'user' })

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setView('options')
      setPreviewImage(null)
      setError(null)
      stopCamera()
    }
  }, [isOpen, stopCamera])

  const handleStartCamera = useCallback(async () => {
    setError(null)
    setView('camera')
    const success = await startCamera()
    if (!success) {
      setView('options')
    }
  }, [startCamera])

  const handleCapture = useCallback(() => {
    const dataUrl = captureImageAsDataURL()
    if (dataUrl) {
      setPreviewImage(dataUrl)
      setView('preview')
      stopCamera()
    }
  }, [captureImageAsDataURL, stopCamera])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      setError('Please select a JPEG, PNG, WebP, or GIF image')
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB')
      return
    }

    // Read file as data URL
    const reader = new FileReader()
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string)
      setView('preview')
    }
    reader.onerror = () => {
      setError('Failed to read image file')
    }
    reader.readAsDataURL(file)

    // Reset input so same file can be selected again
    e.target.value = ''
  }, [])

  const handleUpload = useCallback(async () => {
    if (!previewImage) return

    setIsUploading(true)
    setError(null)

    try {
      // Parse the data URL to extract MIME type and base64 data
      const arr = previewImage.split(',')
      const mimeMatch = arr[0].match(/:(.*?);/)
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg'
      const base64Data = arr[1]

      // Map MIME types to extensions
      const mimeToExt: Record<string, string> = {
        'image/jpeg': 'jpg',
        'image/jpg': 'jpg',
        'image/png': 'png',
        'image/webp': 'webp',
        'image/gif': 'gif',
      }
      const ext = mimeToExt[mimeType] || 'jpg'

      console.log('Upload details:', { mimeType, ext, dataLength: base64Data?.length })

      // Upload using JSON body with dataUrl (more reliable than FormData in Next.js)
      const uploadResponse = await fetch('/api/user/profile/image', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({
          dataUrl: previewImage,
        }),
      })

      // Get response as text first to handle errors
      const responseText = await uploadResponse.text()

      let data
      try {
        data = JSON.parse(responseText)
      } catch {
        console.error('Non-JSON response from profile image API:', responseText.substring(0, 200))
        throw new Error('Server returned an invalid response. Please try again.')
      }

      if (!uploadResponse.ok) {
        throw new Error(data.error || 'Failed to upload image')
      }

      onImageUpdated(data.imageUrl)
      onClose()
    } catch (err: any) {
      console.error('Profile image upload error:', err)
      setError(err.message || 'Failed to upload image')
      setIsUploading(false)
    }
  }, [previewImage, userId, onImageUpdated, onClose])

  const handleRemoveImage = useCallback(async () => {
    setIsUploading(true)
    setError(null)

    try {
      const response = await fetch('/api/user/profile/image', {
        method: 'DELETE',
        headers: {
          'x-user-id': userId,
        },
      })

      // Get response as text first to handle errors
      const responseText = await response.text()

      let data
      try {
        data = JSON.parse(responseText)
      } catch {
        console.error('Non-JSON response from profile image API:', responseText.substring(0, 200))
        throw new Error('Server returned an invalid response. Please try again.')
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to remove image')
      }

      onImageUpdated(null)
      onClose()
    } catch (err: any) {
      console.error('Profile image remove error:', err)
      setError(err.message || 'Failed to remove image')
      setIsUploading(false)
    }
  }, [userId, onImageUpdated, onClose])

  const handleRetake = useCallback(() => {
    setPreviewImage(null)
    setError(null)
    setView('camera')
    startCamera()
  }, [startCamera])

  const handleBackToOptions = useCallback(() => {
    setPreviewImage(null)
    setError(null)
    stopCamera()
    setView('options')
  }, [stopCamera])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${
        isDarkMode
          ? 'bg-slate-800/90 backdrop-blur-xl border border-slate-700/50'
          : 'bg-white/90 backdrop-blur-xl border border-gray-200'
      }`}>
        {/* Header */}
        <div className={`relative px-6 py-4 border-b ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
              <Camera className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {view === 'options' && 'Update Profile Picture'}
              {view === 'camera' && 'Take a Selfie'}
              {view === 'preview' && 'Preview'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-xl transition-colors ${
              isDarkMode ? 'hover:bg-slate-700/50 text-slate-400' : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Error Message */}
          {error && (
            <div className={`mb-4 p-3 rounded-xl text-sm ${
              isDarkMode ? 'bg-red-500/20 text-red-300' : 'bg-red-50 text-red-700'
            }`}>
              {error}
            </div>
          )}

          {/* Options View */}
          {view === 'options' && (
            <div className="space-y-4">
              {/* Take Selfie Button */}
              <button
                onClick={handleStartCamera}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all hover:scale-[1.02] ${
                  isDarkMode
                    ? 'border-slate-600 bg-slate-700/50 hover:bg-slate-700 text-white'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900'
                }`}
              >
                <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                  <Camera className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Take a Selfie</p>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                    Use your camera to capture a photo
                  </p>
                </div>
              </button>

              {/* Upload Image Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all hover:scale-[1.02] ${
                  isDarkMode
                    ? 'border-slate-600 bg-slate-700/50 hover:bg-slate-700 text-white'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900'
                }`}
              >
                <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                  <Upload className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Upload Image</p>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                    Choose a photo from your device
                  </p>
                </div>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Remove Current Image (if exists) */}
              {currentImage && (
                <button
                  onClick={handleRemoveImage}
                  disabled={isUploading}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all hover:scale-[1.02] ${
                    isDarkMode
                      ? 'border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400'
                      : 'border-red-200 bg-red-50 hover:bg-red-100 text-red-700'
                  } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-red-500/20' : 'bg-red-100'}`}>
                    {isUploading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <Trash2 className="w-6 h-6" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Remove Current Photo</p>
                    <p className={`text-sm ${isDarkMode ? 'text-red-300/70' : 'text-red-600'}`}>
                      Delete your profile picture
                    </p>
                  </div>
                </button>
              )}
            </div>
          )}

          {/* Camera View */}
          {view === 'camera' && (
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-black">
                {cameraState.isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
                {cameraState.error && (
                  <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                    <p className="text-red-400 text-sm">{cameraState.error}</p>
                  </div>
                )}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }} // Mirror for selfie
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleBackToOptions}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                    isDarkMode
                      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Cancel
                </button>
                {cameraState.hasMultipleCameras && (
                  <button
                    onClick={switchCamera}
                    className={`p-3 rounded-xl transition-all ${
                      isDarkMode
                        ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={handleCapture}
                  disabled={!cameraState.isActive}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/25 transition-all font-medium disabled:opacity-50"
                >
                  <Camera className="w-5 h-5" />
                  Capture
                </button>
              </div>
            </div>
          )}

          {/* Preview View */}
          {view === 'preview' && previewImage && (
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-black">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }} // Mirror to match camera view
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleRetake}
                  disabled={isUploading}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                    isDarkMode
                      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Retake
                </button>
                <button
                  onClick={handleBackToOptions}
                  disabled={isUploading}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                    isDarkMode
                      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:from-green-700 hover:to-green-600 shadow-lg shadow-green-500/25 transition-all font-medium disabled:opacity-50"
                >
                  {isUploading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Check className="w-5 h-5" />
                  )}
                  {isUploading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
