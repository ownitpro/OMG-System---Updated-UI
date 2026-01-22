/**
 * Client-side blur detection using Laplacian variance
 *
 * This algorithm calculates the variance of the Laplacian of the image,
 * which measures the amount of edges/detail in the image.
 * A low variance indicates a blurry image.
 */

export interface BlurDetectionResult {
  isBlurry: boolean
  score: number // Higher = sharper, Lower = blurrier
  threshold: number
  message: string
}

export interface BlurDetectionOptions {
  threshold?: number // Default: 100
  sampleSize?: number // Resize image for faster processing
}

const DEFAULT_THRESHOLD = 100
const DEFAULT_SAMPLE_SIZE = 500 // Resize to max 500px for processing

/**
 * Detect if an image is blurry using Laplacian variance
 */
export async function detectBlur(
  imageSource: HTMLImageElement | HTMLCanvasElement | Blob | string,
  options: BlurDetectionOptions = {}
): Promise<BlurDetectionResult> {
  const { threshold = DEFAULT_THRESHOLD, sampleSize = DEFAULT_SAMPLE_SIZE } = options

  try {
    // Convert source to ImageData
    const imageData = await getImageData(imageSource, sampleSize)

    // Convert to grayscale
    const grayscale = toGrayscale(imageData)

    // Calculate Laplacian variance
    const score = calculateLaplacianVariance(grayscale, imageData.width, imageData.height)

    const isBlurry = score < threshold

    return {
      isBlurry,
      score: Math.round(score * 100) / 100,
      threshold,
      message: isBlurry
        ? 'Image appears blurry. Consider retaking for better OCR results.'
        : 'Image quality is good.',
    }
  } catch (error: any) {
    console.error('Blur detection error:', error)
    // Return non-blurry by default if detection fails
    return {
      isBlurry: false,
      score: threshold,
      threshold,
      message: 'Could not analyze image quality.',
    }
  }
}

/**
 * Quick blur check - returns just boolean
 */
export async function isImageBlurry(
  imageSource: HTMLImageElement | HTMLCanvasElement | Blob | string,
  threshold: number = DEFAULT_THRESHOLD
): Promise<boolean> {
  const result = await detectBlur(imageSource, { threshold })
  return result.isBlurry
}

/**
 * Convert various image sources to ImageData
 */
async function getImageData(
  source: HTMLImageElement | HTMLCanvasElement | Blob | string,
  maxSize: number
): Promise<ImageData> {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  let img: HTMLImageElement

  if (source instanceof HTMLImageElement) {
    img = source
  } else if (source instanceof HTMLCanvasElement) {
    // Create image from canvas
    img = new Image()
    img.src = source.toDataURL()
    await new Promise<void>(resolve => {
      img.onload = () => resolve()
    })
  } else if (source instanceof Blob) {
    // Create image from blob
    img = new Image()
    const url = URL.createObjectURL(source)
    img.src = url
    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        URL.revokeObjectURL(url)
        resolve()
      }
      img.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('Failed to load image from blob'))
      }
    })
  } else if (typeof source === 'string') {
    // Data URL or image URL
    img = new Image()
    img.src = source
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = () => reject(new Error('Failed to load image from URL'))
    })
  } else {
    throw new Error('Invalid image source')
  }

  // Calculate resize dimensions
  const ratio = Math.min(maxSize / img.width, maxSize / img.height, 1)
  const width = Math.floor(img.width * ratio)
  const height = Math.floor(img.height * ratio)

  canvas.width = width
  canvas.height = height

  ctx.drawImage(img, 0, 0, width, height)

  return ctx.getImageData(0, 0, width, height)
}

/**
 * Convert ImageData to grayscale array
 */
function toGrayscale(imageData: ImageData): Uint8Array {
  const { data, width, height } = imageData
  const grayscale = new Uint8Array(width * height)

  for (let i = 0; i < width * height; i++) {
    const r = data[i * 4]
    const g = data[i * 4 + 1]
    const b = data[i * 4 + 2]
    // Standard grayscale conversion
    grayscale[i] = Math.round(0.299 * r + 0.587 * g + 0.114 * b)
  }

  return grayscale
}

/**
 * Calculate Laplacian variance
 *
 * The Laplacian operator highlights regions of rapid intensity change.
 * The variance of the Laplacian gives a single value representing image sharpness.
 */
function calculateLaplacianVariance(
  grayscale: Uint8Array,
  width: number,
  height: number
): number {
  // Laplacian kernel (3x3)
  // [ 0,  1,  0]
  // [ 1, -4,  1]
  // [ 0,  1,  0]

  const laplacian: number[] = []

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x

      // Apply Laplacian kernel
      const value =
        grayscale[idx - width] +      // top
        grayscale[idx - 1] +          // left
        -4 * grayscale[idx] +         // center
        grayscale[idx + 1] +          // right
        grayscale[idx + width]        // bottom

      laplacian.push(value)
    }
  }

  // Calculate variance
  const mean = laplacian.reduce((sum, val) => sum + val, 0) / laplacian.length
  const variance = laplacian.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / laplacian.length

  return variance
}

/**
 * Get blur level description
 */
export function getBlurLevelDescription(score: number): {
  level: 'sharp' | 'acceptable' | 'slightly_blurry' | 'very_blurry'
  description: string
  color: string
} {
  if (score >= 200) {
    return {
      level: 'sharp',
      description: 'Excellent quality',
      color: 'green',
    }
  } else if (score >= 100) {
    return {
      level: 'acceptable',
      description: 'Good quality',
      color: 'blue',
    }
  } else if (score >= 50) {
    return {
      level: 'slightly_blurry',
      description: 'Slightly blurry - may affect OCR accuracy',
      color: 'yellow',
    }
  } else {
    return {
      level: 'very_blurry',
      description: 'Very blurry - please retake',
      color: 'red',
    }
  }
}
