// PDF and Document Content Extractor
// Extracts text content from PDFs and DOCX files for AI analysis
// When text extraction fails (scanned PDFs), converts PDF pages to images for Vision API

// Supported image types by OpenAI Vision API
export const VISION_SUPPORTED_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp']

// Check if a MIME type is directly supported by Vision API
export function isVisionSupported(mimeType: string): boolean {
  return VISION_SUPPORTED_TYPES.includes(mimeType.toLowerCase())
}

// Check if file is a PDF
export function isPdf(mimeType: string, fileName: string): boolean {
  return (
    mimeType === 'application/pdf' ||
    mimeType === 'application/x-pdf' ||
    fileName.toLowerCase().endsWith('.pdf')
  )
}

// Check if file is a DOCX
export function isDocx(mimeType: string, fileName: string): boolean {
  return (
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimeType === 'application/msword' ||
    fileName.toLowerCase().endsWith('.docx') ||
    fileName.toLowerCase().endsWith('.doc')
  )
}

// Check if file needs text extraction for AI analysis
export function needsTextExtraction(mimeType: string, fileName: string): boolean {
  return isPdf(mimeType, fileName) || isDocx(mimeType, fileName)
}

/**
 * Result from PDF text extraction including page count
 */
export interface PdfExtractionResult {
  text: string
  pageCount: number
}

/**
 * Extract text content from a PDF file
 * Uses pdfjs-dist for reliable text extraction in Node.js
 * Handles both URLs and base64 data URLs
 * Returns both text content and page count for PU tracking
 */
export async function extractPdfText(pdfUrl: string): Promise<PdfExtractionResult> {
  console.log('[PDF-EXTRACTOR] Starting PDF text extraction...')

  try {
    let pdfBuffer: ArrayBuffer

    // Check if it's a base64 data URL
    if (pdfUrl.startsWith('data:')) {
      console.log('[PDF-EXTRACTOR] Extracting from base64 data URL')
      // Extract base64 from data URL: data:application/pdf;base64,XXXXXX
      const base64Match = pdfUrl.match(/^data:[^;]+;base64,(.+)$/)
      if (!base64Match) {
        throw new Error('Invalid data URL format')
      }
      const base64Data = base64Match[1]
      // Convert base64 to ArrayBuffer using Node.js Buffer (not browser atob)
      const nodeBuffer = Buffer.from(base64Data, 'base64')
      pdfBuffer = nodeBuffer.buffer.slice(nodeBuffer.byteOffset, nodeBuffer.byteOffset + nodeBuffer.byteLength)
      console.log('[PDF-EXTRACTOR] Decoded base64 with Node.js Buffer, size:', pdfBuffer.byteLength, 'bytes')
    } else {
      // Fetch the PDF from the URL
      console.log('[PDF-EXTRACTOR] Fetching from URL:', pdfUrl.substring(0, 100) + '...')
      const response = await fetch(pdfUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`)
      }
      pdfBuffer = await response.arrayBuffer()
      console.log('[PDF-EXTRACTOR] PDF fetched, size:', pdfBuffer.byteLength, 'bytes')
    }

    // Use pdfjs-dist for text extraction (more reliable than pdf-lib for this)
    try {
      // @ts-ignore - pdfjs-dist types can be tricky
      const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs')

      // Disable worker for Node.js environment
      pdfjsLib.GlobalWorkerOptions.workerSrc = ''

      const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(pdfBuffer),
        disableFontFace: true,
        isEvalSupported: false,
        useSystemFonts: true,
      })

      const pdf = await loadingTask.promise
      console.log('[PDF-EXTRACTOR] PDF loaded, pages:', pdf.numPages)

      // Extract text from first few pages (limit to avoid huge documents)
      const maxPages = Math.min(pdf.numPages, 3)
      let fullText = ''

      for (let i = 1; i <= maxPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ')
        fullText += pageText + '\n\n'
      }

      console.log('[PDF-EXTRACTOR] Extracted text length:', fullText.length, 'from', pdf.numPages, 'pages')
      // Show preview of extracted text for debugging
      if (fullText.length > 0) {
        console.log('[PDF-EXTRACTOR] Text preview (first 300 chars):', fullText.substring(0, 300).replace(/\n/g, ' '))
      } else {
        console.log('[PDF-EXTRACTOR] WARNING: No text extracted from PDF!')
      }

      // Return first 4000 chars to avoid token limits, plus page count for PU tracking
      return {
        text: fullText.trim().substring(0, 4000),
        pageCount: pdf.numPages
      }
    } catch (pdfjsError) {
      console.error('[PDF-EXTRACTOR] pdfjs-dist error:', pdfjsError)

      // Fallback: Try basic text extraction from raw PDF bytes
      const rawText = extractRawTextFromPdf(new Uint8Array(pdfBuffer))
      if (rawText.length > 50) {
        // Fallback can't determine page count, default to 1
        console.log('[PDF-EXTRACTOR] Using fallback extraction, page count unknown - defaulting to 1')
        return {
          text: rawText.substring(0, 4000),
          pageCount: 1
        }
      }

      throw pdfjsError
    }
  } catch (error) {
    console.error('[PDF-EXTRACTOR] Error extracting PDF text:', error)
    throw error
  }
}

/**
 * Basic text extraction from raw PDF bytes
 * Fallback method when pdfjs fails
 */
function extractRawTextFromPdf(pdfBytes: Uint8Array): string {
  try {
    // Convert to string and look for text patterns
    const decoder = new TextDecoder('utf-8', { fatal: false })
    const rawContent = decoder.decode(pdfBytes)

    // Extract text between stream markers (simplified)
    const textPatterns: string[] = []

    // Look for BT...ET text blocks
    const btMatches = rawContent.matchAll(/BT\s*([\s\S]*?)\s*ET/g)
    for (const match of btMatches) {
      // Extract Tj or TJ text operators
      const tjMatches = match[1].matchAll(/\(([^)]*)\)\s*T[jJ]/g)
      for (const tjMatch of tjMatches) {
        const text = tjMatch[1]
          .replace(/\\([0-7]{3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)))
          .replace(/\\\(/g, '(')
          .replace(/\\\)/g, ')')
          .replace(/\\\\/g, '\\')
        if (text.trim()) {
          textPatterns.push(text)
        }
      }
    }

    return textPatterns.join(' ').trim()
  } catch {
    return ''
  }
}

/**
 * Convert PDF page to image for Vision API
 * Used when text extraction fails (scanned/image-based PDFs)
 * Returns base64 data URL for Vision API consumption
 * Handles both URLs and base64 data URLs
 */
export async function convertPdfToImage(pdfUrl: string): Promise<string | null> {
  console.log('[PDF-TO-IMAGE] Converting PDF to image for Vision API...')

  try {
    let pdfBuffer: ArrayBuffer

    // Check if it's a base64 data URL
    if (pdfUrl.startsWith('data:')) {
      console.log('[PDF-TO-IMAGE] Extracting from base64 data URL')
      const base64Match = pdfUrl.match(/^data:[^;]+;base64,(.+)$/)
      if (!base64Match) {
        throw new Error('Invalid data URL format')
      }
      const base64Data = base64Match[1]
      // Convert base64 to ArrayBuffer using Node.js Buffer (not browser atob)
      const nodeBuffer = Buffer.from(base64Data, 'base64')
      pdfBuffer = nodeBuffer.buffer.slice(nodeBuffer.byteOffset, nodeBuffer.byteOffset + nodeBuffer.byteLength)
      console.log('[PDF-TO-IMAGE] Decoded base64 with Node.js Buffer, size:', pdfBuffer.byteLength, 'bytes')
    } else {
      // Fetch the PDF from the URL
      const response = await fetch(pdfUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`)
      }
      pdfBuffer = await response.arrayBuffer()
      console.log('[PDF-TO-IMAGE] PDF fetched, size:', pdfBuffer.byteLength, 'bytes')
    }

    // Use pdfjs-dist to render PDF to canvas
    // @ts-ignore - pdfjs-dist types can be tricky
    const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs')

    // Disable worker for Node.js environment
    pdfjsLib.GlobalWorkerOptions.workerSrc = ''

    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(pdfBuffer),
      disableFontFace: true,
      isEvalSupported: false,
      useSystemFonts: true,
    })

    const pdf = await loadingTask.promise
    console.log('[PDF-TO-IMAGE] PDF loaded, pages:', pdf.numPages)

    // Get the first page
    const page = await pdf.getPage(1)

    // Set scale for good quality (2x for higher resolution)
    const scale = 2.0
    const viewport = page.getViewport({ scale })

    // Create canvas using node-canvas
    const { createCanvas } = await import('canvas')
    const canvas = createCanvas(viewport.width, viewport.height)
    const context = canvas.getContext('2d')

    // Render PDF page to canvas
    const renderContext = {
      canvasContext: context as unknown as CanvasRenderingContext2D,
      viewport: viewport,
      canvas: canvas as unknown as HTMLCanvasElement,
    }

    // @ts-ignore - pdfjs types don't match node-canvas exactly
    await page.render(renderContext).promise
    console.log('[PDF-TO-IMAGE] PDF page rendered to canvas:', viewport.width, 'x', viewport.height)

    // Convert canvas to base64 PNG data URL
    const dataUrl = canvas.toDataURL('image/png')
    console.log('[PDF-TO-IMAGE] Converted to data URL, length:', dataUrl.length)

    return dataUrl
  } catch (error) {
    console.error('[PDF-TO-IMAGE] Error converting PDF to image:', error)
    return null
  }
}

/**
 * Extract text content from a DOCX file
 * Accepts either a URL (http/https/data:) or an S3 key
 */
export async function extractDocxText(docxUrlOrKey: string): Promise<string> {
  console.log('[DOCX-EXTRACTOR] Starting DOCX text extraction...')

  try {
    let docxBuffer: ArrayBuffer

    // Check if it's a data URL
    if (docxUrlOrKey.startsWith('data:')) {
      console.log('[DOCX-EXTRACTOR] Extracting from base64 data URL')
      const base64Match = docxUrlOrKey.match(/^data:[^;]+;base64,(.+)$/)
      if (!base64Match) {
        throw new Error('Invalid data URL format')
      }
      const nodeBuffer = Buffer.from(base64Match[1], 'base64')
      docxBuffer = nodeBuffer.buffer.slice(nodeBuffer.byteOffset, nodeBuffer.byteOffset + nodeBuffer.byteLength)
    }
    // Check if it's an HTTP URL
    else if (docxUrlOrKey.startsWith('http://') || docxUrlOrKey.startsWith('https://')) {
      console.log('[DOCX-EXTRACTOR] Fetching from URL...')
      const response = await fetch(docxUrlOrKey)
      if (!response.ok) {
        throw new Error(`Failed to fetch DOCX: ${response.status} ${response.statusText}`)
      }
      docxBuffer = await response.arrayBuffer()
    }
    // Otherwise treat as S3 key - download directly using SDK
    else {
      console.log('[DOCX-EXTRACTOR] Downloading from S3 key:', docxUrlOrKey)
      const { downloadFile } = await import('@/lib/aws/s3')
      const buffer = await downloadFile(docxUrlOrKey)
      docxBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
    }

    console.log('[DOCX-EXTRACTOR] DOCX fetched, size:', docxBuffer.byteLength, 'bytes')

    // DOCX is a ZIP file containing XML
    const JSZip = (await import('jszip')).default
    const zip = await JSZip.loadAsync(docxBuffer)

    // Get the main document content
    const documentXml = await zip.file('word/document.xml')?.async('string')

    if (!documentXml) {
      throw new Error('Could not find document.xml in DOCX')
    }

    // Extract text from XML
    const textContent = extractTextFromDocxXml(documentXml)
    console.log('[DOCX-EXTRACTOR] Extracted text length:', textContent.length)

    // Return first 4000 chars to avoid token limits
    return textContent.trim().substring(0, 4000)
  } catch (error) {
    console.error('[DOCX-EXTRACTOR] Error extracting DOCX text:', error)
    throw error
  }
}

/**
 * Extract text content from DOCX XML
 */
function extractTextFromDocxXml(xml: string): string {
  // Extract all text between <w:t> tags
  const textMatches = xml.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || []
  const texts: string[] = []

  for (const match of textMatches) {
    const text = match.replace(/<w:t[^>]*>/, '').replace(/<\/w:t>/, '')
    if (text.trim()) {
      texts.push(text)
    }
  }

  // Also check for paragraph breaks
  let result = ''
  let inParagraph = false

  for (let i = 0; i < xml.length; i++) {
    // Check for paragraph start
    if (xml.substring(i, i + 5) === '<w:p ' || xml.substring(i, i + 4) === '<w:p>') {
      if (inParagraph && result.length > 0 && !result.endsWith('\n')) {
        result += '\n'
      }
      inParagraph = true
    }
    // Check for text content
    if (xml.substring(i, i + 5) === '<w:t>' || xml.substring(i, i + 5).match(/<w:t /)) {
      const endTag = xml.indexOf('</w:t>', i)
      if (endTag > i) {
        const startContent = xml.indexOf('>', i) + 1
        const text = xml.substring(startContent, endTag)
        result += text
        i = endTag + 5
      }
    }
    // Check for paragraph end
    if (xml.substring(i, i + 6) === '</w:p>') {
      inParagraph = false
    }
  }

  return result.trim() || texts.join(' ')
}

/**
 * Result from document text extraction
 */
export interface DocumentExtractionResult {
  text: string
  pageCount: number
}

/**
 * Extract text from a document for AI analysis
 * Returns extracted text and page count, or null if extraction fails
 * @param documentUrl - URL or data URL of the document
 * @param mimeType - MIME type of the document
 * @param fileName - Original file name
 * @param s3Key - Optional S3 key for direct download (more reliable than presigned URLs)
 */
export async function extractDocumentText(
  documentUrl: string,
  mimeType: string,
  fileName: string,
  s3Key?: string
): Promise<DocumentExtractionResult | null> {
  try {
    if (isPdf(mimeType, fileName)) {
      console.log('[DOC-EXTRACTOR] Document is PDF, extracting text...')
      const result = await extractPdfText(documentUrl)
      return result
    }

    if (isDocx(mimeType, fileName)) {
      console.log('[DOC-EXTRACTOR] Document is DOCX, extracting text...')
      // Use S3 key for direct download if available (more reliable)
      const text = await extractDocxText(s3Key || documentUrl)
      // DOCX is always 1 page for PU purposes (or could estimate based on content)
      return { text, pageCount: 1 }
    }

    console.log('[DOC-EXTRACTOR] Unsupported document type for text extraction:', mimeType)
    return null
  } catch (error) {
    console.error('[DOC-EXTRACTOR] Failed to extract text:', error)
    return null
  }
}

// Legacy exports for compatibility
export { needsTextExtraction as needsConversion }
export async function prepareDocumentForVision(
  documentUrl: string,
  mimeType: string,
  fileName: string,
  s3Key?: string
): Promise<{
  url: string
  isConverted: boolean
  originalMimeType: string
  extractedText?: string
  convertedImageUrl?: string  // Image URL when PDF is converted to image
  pageCount?: number  // Page count for PU tracking
}> {
  // If already a supported image type, use as-is
  if (isVisionSupported(mimeType)) {
    console.log('[DOC-CONVERTER] Document is already Vision-supported:', mimeType)
    return {
      url: documentUrl,
      isConverted: false,
      originalMimeType: mimeType,
      pageCount: 1, // Images are always 1 page
    }
  }

  // For PDF, try text extraction first, then fall back to image conversion
  if (isPdf(mimeType, fileName)) {
    console.log('[DOC-CONVERTER] PDF document - attempting text extraction...')

    try {
      const extractionResult = await extractDocumentText(documentUrl, mimeType, fileName, s3Key)

      if (extractionResult && extractionResult.text.length > 50) {
        console.log('[DOC-CONVERTER] Text extraction successful, length:', extractionResult.text.length, 'pages:', extractionResult.pageCount)
        return {
          url: documentUrl,
          isConverted: true,
          originalMimeType: mimeType,
          extractedText: extractionResult.text,
          pageCount: extractionResult.pageCount,
        }
      }
    } catch (textError) {
      console.log('[DOC-CONVERTER] Text extraction failed:', textError)
    }

    // Text extraction failed or returned insufficient content
    // This is likely a scanned/image-based PDF - convert to image for Vision API
    console.log('[DOC-CONVERTER] Text extraction insufficient - converting PDF to image for Vision API...')

    try {
      const imageDataUrl = await convertPdfToImage(documentUrl)

      if (imageDataUrl) {
        console.log('[DOC-CONVERTER] PDF successfully converted to image for Vision API')
        // Try to get page count separately for scanned PDFs
        const pageCount = await getPdfPageCount(documentUrl)
        return {
          url: documentUrl,
          isConverted: true,
          originalMimeType: mimeType,
          convertedImageUrl: imageDataUrl,  // Vision API can read this image
          pageCount: pageCount,
        }
      }
    } catch (imageError) {
      console.error('[DOC-CONVERTER] PDF to image conversion failed:', imageError)
    }

    // Both text extraction and image conversion failed
    // Return with minimal info - let the analyzer handle with filename only
    console.log('[DOC-CONVERTER] Both text extraction and image conversion failed for PDF')
    return {
      url: documentUrl,
      isConverted: false,
      originalMimeType: mimeType,
      pageCount: 1, // Fallback to 1 page
    }
  }

  // For DOCX, extract text (no image conversion needed)
  if (isDocx(mimeType, fileName)) {
    console.log('[DOC-CONVERTER] DOCX document - extracting text...')
    const extractionResult = await extractDocumentText(documentUrl, mimeType, fileName, s3Key)

    if (extractionResult && extractionResult.text.length > 50) {
      console.log('[DOC-CONVERTER] Text extraction successful, length:', extractionResult.text.length)
      return {
        url: documentUrl,
        isConverted: true,
        originalMimeType: mimeType,
        extractedText: extractionResult.text,
        pageCount: extractionResult.pageCount,
      }
    }

    // DOCX text extraction failed
    console.log('[DOC-CONVERTER] DOCX text extraction failed or insufficient')
    return {
      url: documentUrl,
      isConverted: false,
      originalMimeType: mimeType,
      pageCount: 1, // DOCX default to 1 page
    }
  }

  // For other unsupported types, return as-is
  console.log('[DOC-CONVERTER] Unsupported document type:', mimeType)
  return {
    url: documentUrl,
    isConverted: false,
    originalMimeType: mimeType,
    pageCount: 1, // Unknown types default to 1 page
  }
}

/**
 * Get just the page count from a PDF without extracting text
 * Used for scanned PDFs where text extraction fails
 */
export async function getPdfPageCount(pdfUrl: string): Promise<number> {
  console.log('[PDF-PAGE-COUNT] Getting page count from PDF...')

  try {
    let pdfBuffer: ArrayBuffer

    // Check if it's a base64 data URL
    if (pdfUrl.startsWith('data:')) {
      const base64Match = pdfUrl.match(/^data:[^;]+;base64,(.+)$/)
      if (!base64Match) {
        console.log('[PDF-PAGE-COUNT] Invalid data URL, defaulting to 1 page')
        return 1
      }
      const nodeBuffer = Buffer.from(base64Match[1], 'base64')
      pdfBuffer = nodeBuffer.buffer.slice(nodeBuffer.byteOffset, nodeBuffer.byteOffset + nodeBuffer.byteLength)
    } else {
      const response = await fetch(pdfUrl)
      if (!response.ok) {
        console.log('[PDF-PAGE-COUNT] Failed to fetch PDF, defaulting to 1 page')
        return 1
      }
      pdfBuffer = await response.arrayBuffer()
    }

    // @ts-ignore
    const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs')
    pdfjsLib.GlobalWorkerOptions.workerSrc = ''

    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(pdfBuffer),
      disableFontFace: true,
      isEvalSupported: false,
      useSystemFonts: true,
    })

    const pdf = await loadingTask.promise
    console.log('[PDF-PAGE-COUNT] PDF has', pdf.numPages, 'pages')
    return pdf.numPages
  } catch (error) {
    console.error('[PDF-PAGE-COUNT] Error getting page count:', error)
    return 1 // Fallback to 1 page on error
  }
}
