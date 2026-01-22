// API route to generate document preview/thumbnail
// Converts DOCX, Excel, and PowerPoint files to HTML for preview

import { NextRequest, NextResponse } from 'next/server'
import * as mammoth from 'mammoth'
import * as XLSX from 'xlsx'
import JSZip from 'jszip'

type Props = {
  params: Promise<{ documentId: string }>
}

// Extract text content from PowerPoint slides
async function extractPptxContent(buffer: Buffer): Promise<{ slides: string[], title: string | null }> {
  const zip = await JSZip.loadAsync(buffer)
  const slides: string[] = []
  let title: string | null = null

  // Get slide files (slide1.xml, slide2.xml, etc.)
  const slideFiles = Object.keys(zip.files)
    .filter(name => name.match(/ppt\/slides\/slide\d+\.xml$/))
    .sort((a, b) => {
      const numA = parseInt(a.match(/slide(\d+)/)?.[1] || '0')
      const numB = parseInt(b.match(/slide(\d+)/)?.[1] || '0')
      return numA - numB
    })

  for (const slideFile of slideFiles) {
    const content = await zip.file(slideFile)?.async('string')
    if (content) {
      // Extract text from XML - look for <a:t> tags (text content)
      const textMatches = content.match(/<a:t>([^<]*)<\/a:t>/g) || []
      const slideText = textMatches
        .map(match => match.replace(/<\/?a:t>/g, ''))
        .filter(text => text.trim().length > 0)
        .join(' ')

      if (slideText.trim()) {
        slides.push(slideText.trim())
        // First non-empty text is likely the title
        if (!title && slides.length === 1) {
          title = slideText.split(/[.\n]/)[0]?.trim() || null
        }
      }
    }
  }

  return { slides, title }
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { documentId } = await params

    // Get the document's S3 key from query params or fetch from DB
    const s3Key = request.nextUrl.searchParams.get('key')

    if (!s3Key) {
      return NextResponse.json({ error: 'Missing s3Key parameter' }, { status: 400 })
    }

    // Determine file type from key
    const extension = s3Key.split('.').pop()?.toLowerCase()

    const supportedFormats = ['doc', 'docx', 'xls', 'xlsx', 'csv', 'ppt', 'pptx', 'pdf']
    if (!supportedFormats.includes(extension || '')) {
      return NextResponse.json({
        error: 'Preview only available for Word, Excel, PowerPoint, and PDF documents',
        supported: supportedFormats
      }, { status: 400 })
    }

    // Get presigned URL from S3
    const { presignGetObject } = await import('@/lib/aws/s3')
    const fileUrl = await presignGetObject(s3Key)

    if (!fileUrl) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Fetch the file content
    const fileResponse = await fetch(fileUrl)
    if (!fileResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 })
    }

    const arrayBuffer = await fileResponse.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Handle PDF files - return buffer with correct Content-Type
    if (extension === 'pdf') {
      // Log for debugging
      console.log('[PDF Preview] Buffer size:', buffer.length, 'bytes')
      console.log('[PDF Preview] First 10 bytes:', buffer.slice(0, 10).toString('hex'))

      // Verify it's a PDF (starts with %PDF)
      const header = buffer.slice(0, 4).toString('ascii')
      if (header !== '%PDF') {
        console.error('[PDF Preview] Invalid PDF header:', header)
        return NextResponse.json({ error: 'Invalid PDF file', header }, { status: 500 })
      }

      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline',
          'Content-Length': buffer.length.toString(),
          'Cache-Control': 'public, max-age=3600',
        },
      })
    }

    let htmlContent = ''

    // Handle Word documents
    if (['doc', 'docx'].includes(extension || '')) {
      const result = await mammoth.convertToHtml({ buffer })
      htmlContent = result.value
    }
    // Handle Excel files
    else if (['xls', 'xlsx', 'csv'].includes(extension || '')) {
      const workbook = XLSX.read(buffer, { type: 'buffer' })

      // Get the first sheet
      const firstSheetName = workbook.SheetNames[0]
      if (!firstSheetName) {
        return NextResponse.json({ error: 'No sheets found in workbook' }, { status: 400 })
      }
      const worksheet = workbook.Sheets[firstSheetName]
      if (!worksheet) {
        return NextResponse.json({ error: 'Sheet not found' }, { status: 400 })
      }

      // Convert to HTML with styling
      const htmlTable = XLSX.utils.sheet_to_html(worksheet, {
        editable: false,
      })

      // Get sheet count info
      const sheetCount = workbook.SheetNames.length
      const sheetInfo = sheetCount > 1
        ? `<div class="sheet-info">Sheet 1 of ${sheetCount}: ${firstSheetName}</div>`
        : ''

      htmlContent = sheetInfo + htmlTable
    }
    // Handle PowerPoint files
    else if (['ppt', 'pptx'].includes(extension || '')) {
      const { slides, title } = await extractPptxContent(buffer)

      if (slides.length === 0) {
        htmlContent = '<div class="no-content">No text content found in presentation</div>'
      } else {
        // Create HTML for each slide
        const slidesHtml = slides.map((slideText, index) => `
          <div class="slide">
            <div class="slide-header">Slide ${index + 1}</div>
            <div class="slide-content">${slideText}</div>
          </div>
        `).join('')

        const titleHtml = title ? `<div class="pptx-title">${title}</div>` : ''
        const slideCount = `<div class="slide-count">${slides.length} slide${slides.length !== 1 ? 's' : ''}</div>`

        htmlContent = titleHtml + slideCount + slidesHtml
      }
    }

    // Create a styled HTML preview
    const isExcel = ['xls', 'xlsx', 'csv'].includes(extension || '')
    const isPowerPoint = ['ppt', 'pptx'].includes(extension || '')
    const styledHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 11px;
            line-height: 1.4;
            padding: ${isExcel ? '8px' : '12px'};
            background: white;
            color: #333;
            overflow: auto;
          }
          p { margin-bottom: 8px; }
          h1 { font-size: 16px; margin-bottom: 10px; }
          h2 { font-size: 14px; margin-bottom: 8px; }
          h3 { font-size: 12px; margin-bottom: 6px; }
          table {
            border-collapse: collapse;
            width: 100%;
            margin: 0;
            font-size: ${isExcel ? '9px' : '10px'};
          }
          td, th {
            border: 1px solid ${isExcel ? '#d0d7de' : '#ddd'};
            padding: ${isExcel ? '2px 4px' : '4px'};
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 150px;
          }
          th {
            background: ${isExcel ? '#f6f8fa' : '#f5f5f5'};
            font-weight: 600;
          }
          tr:nth-child(even) td {
            background: ${isExcel ? '#f6f8fa' : 'transparent'};
          }
          img { max-width: 100%; height: auto; }
          ul, ol { margin-left: 16px; margin-bottom: 8px; }
          .sheet-info {
            background: #16a34a;
            color: white;
            padding: 4px 8px;
            font-size: 10px;
            font-weight: 500;
            margin-bottom: 8px;
            border-radius: 4px;
          }
          .pptx-title {
            font-size: 14px;
            font-weight: 600;
            color: #c2410c;
            margin-bottom: 4px;
          }
          .slide-count {
            font-size: 10px;
            color: #666;
            margin-bottom: 10px;
          }
          .slide {
            background: #fef3e2;
            border: 1px solid #fdba74;
            border-radius: 4px;
            padding: 8px;
            margin-bottom: 8px;
          }
          .slide-header {
            font-size: 9px;
            font-weight: 600;
            color: #c2410c;
            margin-bottom: 4px;
          }
          .slide-content {
            font-size: 10px;
            color: #333;
            line-height: 1.4;
          }
          .no-content {
            color: #666;
            font-style: italic;
            padding: 20px;
            text-align: center;
          }
        </style>
      </head>
      <body>${htmlContent}</body>
      </html>
    `

    // Return the HTML for iframe embedding
    return new NextResponse(styledHtml, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (error: any) {
    console.error('Error generating document preview:', error)
    return NextResponse.json({
      error: 'Failed to generate preview',
      details: error.message
    }, { status: 500 })
  }
}
