'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

export interface CameraState {
  isActive: boolean
  isLoading: boolean
  error: string | null
  facingMode: 'user' | 'environment'
  hasMultipleCameras: boolean
  stream: MediaStream | null
}

export interface UseCameraOptions {
  preferredFacingMode?: 'user' | 'environment'
  onError?: (error: string) => void
}

export interface UseCameraReturn {
  state: CameraState
  videoRef: React.RefObject<HTMLVideoElement>
  canvasRef: React.RefObject<HTMLCanvasElement>
  startCamera: () => Promise<boolean>
  stopCamera: () => void
  switchCamera: () => Promise<void>
  captureImage: () => Promise<Blob | null>
  captureImageAsDataURL: () => string | null
}

const initialState: CameraState = {
  isActive: false,
  isLoading: false,
  error: null,
  facingMode: 'environment',
  hasMultipleCameras: false,
  stream: null,
}

export function useCamera(options: UseCameraOptions = {}): UseCameraReturn {
  const { preferredFacingMode = 'environment', onError } = options

  const [state, setState] = useState<CameraState>({
    ...initialState,
    facingMode: preferredFacingMode,
  })

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Check for multiple cameras
  const checkMultipleCameras = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = devices.filter(device => device.kind === 'videoinput')
      setState(prev => ({ ...prev, hasMultipleCameras: videoDevices.length > 1 }))
    } catch {
      // Silently fail - not critical
    }
  }, [])

  // Start camera
  const startCamera = useCallback(async (): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Check if camera API is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported on this device or browser')
      }

      // Request camera permission
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: state.facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream

      // Attach stream to video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }

      await checkMultipleCameras()

      setState(prev => ({
        ...prev,
        isActive: true,
        isLoading: false,
        stream,
        error: null,
      }))

      return true
    } catch (err: any) {
      const errorMessage = getErrorMessage(err)
      setState(prev => ({
        ...prev,
        isActive: false,
        isLoading: false,
        error: errorMessage,
      }))
      onError?.(errorMessage)
      return false
    }
  }, [state.facingMode, checkMultipleCameras, onError])

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setState(prev => ({
      ...prev,
      isActive: false,
      stream: null,
    }))
  }, [])

  // Switch between front and back camera
  const switchCamera = useCallback(async () => {
    const newFacingMode = state.facingMode === 'user' ? 'environment' : 'user'

    // Stop current stream
    stopCamera()

    // Update facing mode and restart
    setState(prev => ({ ...prev, facingMode: newFacingMode }))

    // Small delay to ensure state is updated
    await new Promise(resolve => setTimeout(resolve, 100))

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: newFacingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }

      setState(prev => ({
        ...prev,
        isActive: true,
        stream,
        facingMode: newFacingMode,
      }))
    } catch (err: any) {
      const errorMessage = getErrorMessage(err)
      setState(prev => ({ ...prev, error: errorMessage }))
      onError?.(errorMessage)
    }
  }, [state.facingMode, stopCamera, onError])

  // Capture image as Blob
  const captureImage = useCallback(async (): Promise<Blob | null> => {
    if (!videoRef.current || !canvasRef.current) return null

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx) return null

    // Set canvas size to video dimensions
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Convert to blob
    return new Promise<Blob | null>(resolve => {
      canvas.toBlob(
        blob => resolve(blob),
        'image/jpeg',
        0.92 // Quality
      )
    })
  }, [])

  // Capture image as Data URL
  const captureImageAsDataURL = useCallback((): string | null => {
    if (!videoRef.current || !canvasRef.current) return null

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx) return null

    // Set canvas size to video dimensions
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Return as data URL
    return canvas.toDataURL('image/jpeg', 0.92)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  return {
    state,
    videoRef: videoRef as React.RefObject<HTMLVideoElement>,
    canvasRef: canvasRef as React.RefObject<HTMLCanvasElement>,
    startCamera,
    stopCamera,
    switchCamera,
    captureImage,
    captureImageAsDataURL,
  }
}

// Helper function to get user-friendly error messages
function getErrorMessage(error: any): string {
  if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
    return 'Camera permission denied. Please allow camera access in your browser settings.'
  }
  if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
    return 'No camera found on this device.'
  }
  if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
    return 'Camera is already in use by another application.'
  }
  if (error.name === 'OverconstrainedError') {
    return 'Camera does not support the requested settings.'
  }
  if (error.name === 'TypeError') {
    return 'Camera not supported on this device or browser.'
  }
  return error.message || 'Failed to access camera'
}

export default useCamera
