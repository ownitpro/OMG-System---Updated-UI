/**
 * Photo Detector
 *
 * Uses GPT-4o-mini vision to distinguish photos from documents.
 * Photos should be routed to Quick Store / Needs Review instead of
 * being misclassified as documents.
 *
 * Part of the AI Analysis Improvements initiative (Phase 2).
 */

import OpenAI from 'openai'

export interface PhotoDetectionResult {
  /** Whether this is a photo (true) or document (false) */
  isPhoto: boolean
  /** Type of document or photo detected */
  type: 'document' | 'photo'
  /** Subtype for photos: family, property, screenshot, selfie, nature, event, artwork, other */
  photoSubtype?: 'family' | 'property' | 'screenshot' | 'selfie' | 'nature' | 'event' | 'artwork' | 'other'
  /** Confidence score (0-1) */
  confidence: number
  /** Brief description of what was detected */
  description: string
}

const PHOTO_DETECTION_PROMPT = `You are an image classifier. Your task is to determine if this image is a DOCUMENT or a PHOTO.

DOCUMENTS are text-heavy, formal, structured items designed to convey information:
- Receipts, invoices, bills
- IDs (driver's license, passport, ID cards)
- Letters, forms, certificates
- Bank statements, tax forms
- Contracts, legal documents
- Medical records, prescriptions
- Any image that is primarily TEXT on paper/card

PHOTOS are pictures capturing real-world scenes, people, or objects:
- Family photos, portraits, selfies
- Property/real estate photos
- Screenshots of apps/websites (NOT documents)
- Nature, landscape, travel photos
- Event photos (weddings, parties)
- Product photos
- Artwork, graphics, illustrations
- Memes, social media images

IMPORTANT CLASSIFICATION RULES:
- If the image contains significant text as its PRIMARY content = DOCUMENT
- If the image shows a scanned/photographed document = DOCUMENT
- If the image shows people, places, objects as the main subject = PHOTO
- Screenshots of documents (PDFs, forms) = DOCUMENT
- Screenshots of apps, chats, games, websites = PHOTO
- Handwritten notes on paper = DOCUMENT
- A photo of a person holding an ID = DOCUMENT (the ID is the subject)

Respond with ONLY this JSON (no markdown):
{
  "type": "document" | "photo",
  "photoSubtype": "family" | "property" | "screenshot" | "selfie" | "nature" | "event" | "artwork" | "other" (only if type is "photo"),
  "confidence": 0.0 to 1.0,
  "description": "Brief description of what you see"
}`

/**
 * Detect whether an image is a photo or document using GPT-4o-mini vision.
 *
 * @param imageUrl - URL or base64 data URL of the image
 * @returns PhotoDetectionResult with classification
 */
export async function detectPhotoVsDocument(imageUrl: string): Promise<PhotoDetectionResult> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  try {
    console.log('[PHOTO-DETECTOR] Analyzing image...')
    const startTime = Date.now()

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: PHOTO_DETECTION_PROMPT,
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
                detail: 'low', // Use low detail for faster/cheaper detection
              },
            },
          ],
        },
      ],
      max_tokens: 200,
      temperature: 0.1, // Low temperature for consistent classification
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      console.error('[PHOTO-DETECTOR] Empty response from OpenAI')
      return {
        isPhoto: false,
        type: 'document',
        confidence: 0.5,
        description: 'Unable to analyze image',
      }
    }

    // Parse JSON response
    const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim()
    const result = JSON.parse(cleanedContent)

    const processingTime = Date.now() - startTime
    console.log('[PHOTO-DETECTOR] Detection complete:', {
      type: result.type,
      photoSubtype: result.photoSubtype,
      confidence: result.confidence,
      processingTimeMs: processingTime,
    })

    return {
      isPhoto: result.type === 'photo',
      type: result.type,
      photoSubtype: result.photoSubtype,
      confidence: result.confidence,
      description: result.description || '',
    }
  } catch (error: any) {
    console.error('[PHOTO-DETECTOR] Error:', error.message)
    // On error, assume document (safer default - will go through normal classification)
    return {
      isPhoto: false,
      type: 'document',
      confidence: 0.5,
      description: 'Error during detection, defaulting to document',
    }
  }
}

/**
 * Check if photo detection should be applied to this file.
 * Only applies to images, not PDFs or other document formats.
 */
export function shouldDetectPhoto(mimeType: string): boolean {
  const photoCapableMimeTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
    'image/gif',
  ]
  return photoCapableMimeTypes.includes(mimeType.toLowerCase())
}

/**
 * Get suggested tags for a detected photo type.
 */
export function getPhotoSuggestedTags(photoSubtype: PhotoDetectionResult['photoSubtype']): string[] {
  const baseTags = ['photo']

  switch (photoSubtype) {
    case 'family':
      return [...baseTags, 'family', 'people']
    case 'property':
      return [...baseTags, 'property', 'real-estate']
    case 'screenshot':
      return [...baseTags, 'screenshot', 'digital']
    case 'selfie':
      return [...baseTags, 'selfie', 'portrait']
    case 'nature':
      return [...baseTags, 'nature', 'landscape']
    case 'event':
      return [...baseTags, 'event', 'celebration']
    case 'artwork':
      return [...baseTags, 'artwork', 'creative']
    default:
      return baseTags
  }
}
