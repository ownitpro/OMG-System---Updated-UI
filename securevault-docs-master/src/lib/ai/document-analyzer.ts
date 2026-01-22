// OpenAI Document Analyzer Service
// Analyzes documents using GPT-4 Vision for classification, expiration detection,
// filename suggestion, and smart folder matching

import OpenAI from 'openai'
import type {
  AIDocumentAnalysisResult,
  AIAnalysisRequest,
  ExistingFolderInfo,
  OpenAIAnalysisResponse,
  SuggestedCategory,
} from '@/types/ai'
import type { DocumentCategory, DocumentSubtype, VaultContext } from '@/types/ocr'
import {
  buildSystemPrompt,
  buildAnalysisPrompt,
  validateAnalysisResponse,
  sanitizeFilename,
  getExtensionFromFilename,
  getFolderName,
} from './prompts/document-analysis'
import {
  isPdf,
  isDocx,
  prepareDocumentForVision,
} from './pdf-converter'
import {
  DOCUMENT_ANALYSIS_SCHEMA,
  isValidCategory,
} from './structured-output-schema'

// Valid categories and subtypes for validation - matches document-analysis.ts
const VALID_CATEGORIES: DocumentCategory[] = [
  'identity',
  'financial',
  'tax',
  'income',
  'expense',
  'invoice',
  'medical',
  'insurance',
  'legal',
  'property',
  'business',
  'employment',
  'education',
  'certification',
  'correspondence',
  'vehicle',
  'personal',
  'travel',
  'technical',
  'needs_review', // Added for Phase 2 Photo Detection
  'other',
]

const VALID_SUBTYPES: DocumentSubtype[] = [
  // Identity
  'drivers_license', 'passport', 'id_card', 'birth_certificate', 'social_security',
  'citizenship', 'green_card', 'visa', 'marriage_certificate', 'death_certificate',
  'name_change', 'adoption_papers',
  // Financial
  'bank_statement', 'credit_card_statement', 'loan_document', 'mortgage_document',
  'investment_report', 'retirement_statement', '401k', 'ira', 'brokerage',
  'stock_certificate', 'bond', 'cryptocurrency', 'wire_transfer', 'check', 'direct_deposit',
  // Tax
  'w2', '1099', 'tax_return', '1040', 'schedule_c', 'schedule_d', 'w4', 'w9',
  'state_tax', 'property_tax', 'estimated_tax', 'tax_payment', 'tax_refund',
  'irs_notice', 'tax_transcript', 'amended_return',
  // Income
  'pay_stub', 'paycheck', 'salary_statement', 'bonus', 'commission', 'severance',
  'unemployment', 'disability', 'social_security_benefits', 'pension', 'annuity',
  'rental_income', 'royalty', 'dividend', 'interest_income', 'capital_gains',
  // Expense
  'receipt', 'expense_report', 'mileage_log', 'business_expense', 'travel_expense',
  'meal_receipt', 'office_supplies', 'equipment_purchase', 'subscription',
  'membership_fee', 'donation_receipt', 'charitable_contribution',
  // Invoice
  'invoice', 'bill', 'utility_bill', 'phone_bill', 'internet_bill', 'cable_bill',
  'water_bill', 'gas_bill', 'electric_bill', 'credit_card_bill', 'medical_bill',
  'tuition_bill', 'rent_invoice', 'purchase_order', 'estimate', 'quote', 'pro_forma',
  // Medical
  'medical_record', 'prescription', 'lab_results', 'xray', 'mri', 'ct_scan',
  'vaccination_record', 'immunization', 'allergy_record', 'discharge_summary',
  'operative_report', 'pathology_report', 'referral', 'prior_authorization',
  'dme_prescription', 'mental_health_record', 'therapy_notes', 'dental_record',
  'vision_record', 'hearing_test',
  // Insurance
  'insurance_card', 'health_insurance', 'dental_insurance', 'vision_insurance',
  'life_insurance', 'auto_insurance', 'home_insurance', 'renters_insurance',
  'umbrella_policy', 'disability_insurance', 'long_term_care', 'pet_insurance',
  'travel_insurance', 'insurance_claim', 'eob', 'coverage_summary', 'declaration_page',
  // Legal
  'contract', 'agreement', 'deed', 'title', 'will', 'trust', 'power_of_attorney',
  'court_document', 'lawsuit', 'judgment', 'settlement', 'divorce_decree',
  'custody_agreement', 'prenuptial', 'nda', 'non_compete', 'release_form',
  'notarized_document', 'affidavit', 'subpoena', 'cease_desist',
  // Property
  'deed', 'title', 'mortgage', 'home_appraisal', 'property_survey', 'hoa_document',
  'lease', 'rental_agreement', 'property_tax_bill', 'home_inspection', 'warranty_deed',
  'quit_claim', 'closing_document', 'escrow_statement', 'home_warranty',
  // Business
  'business_license', 'articles_of_incorporation', 'operating_agreement', 'bylaws',
  'partnership_agreement', 'shareholder_agreement', 'board_minutes', 'resolution',
  'annual_report', 'quarterly_report', 'profit_loss', 'balance_sheet', 'cash_flow',
  'audit_report', 'business_plan', 'pitch_deck', 'investor_agreement', 'term_sheet',
  // Employment
  'offer_letter', 'employment_contract', 'employee_handbook', 'performance_review',
  'termination_letter', 'resignation_letter', 'reference_letter', 'recommendation',
  'background_check', 'drug_test', 'i9', 'work_permit', 'non_disclosure',
  'intellectual_property', 'benefits_enrollment', 'cobra', 'severance_agreement',
  'resume', 'cv', 'cover_letter', 'curriculum_vitae',
  // Education
  'transcript', 'diploma', 'degree', 'report_card', 'enrollment', 'acceptance_letter',
  'financial_aid', 'scholarship', 'student_loan', 'course_material', 'syllabus',
  'thesis', 'dissertation', 'research_paper', 'academic_paper',
  'book_chapter', 'textbook', 'lecture_notes', 'assignment',
  'essay', 'project_report', 'lab_report', 'continuing_education', 'certification_exam',
  'gre_score', 'sat_score', 'act_score', 'toefl', 'recommendation',
  // Certification
  'professional_license', 'certification', 'accreditation', 'credential',
  'training_certificate', 'cpe_certificate', 'continuing_education', 'award',
  'badge', 'achievement', 'completion_certificate',
  // Correspondence
  'letter', 'email', 'memo', 'notice', 'announcement', 'invitation',
  'greeting_card', 'thank_you', 'sympathy', 'rsvp',
  // Vehicle
  'vehicle_title', 'registration', 'bill_of_sale', 'loan_payoff', 'lien_release',
  'smog_certificate', 'inspection_report', 'repair_receipt', 'maintenance_record',
  'warranty', 'recall_notice', 'accident_report', 'insurance_claim',
  // Personal
  'photo', 'family_photo', 'portrait', 'event_photo', 'document_scan',
  'journal', 'diary', 'recipe', 'family_tree', 'genealogy', 'obituary', 'memorial',
  // Travel
  'itinerary', 'boarding_pass', 'hotel_reservation', 'car_rental', 'cruise_booking',
  'tour_confirmation', 'travel_insurance', 'visa_application', 'travel_advisory',
  'vaccination_certificate', 'covid_test', 'travel_receipt',
  // Technical
  'user_manual', 'installation_guide', 'troubleshooting', 'api_documentation',
  'code_documentation', 'architecture_diagram', 'network_diagram', 'specification',
  'requirements', 'test_plan', 'bug_report', 'release_notes', 'changelog',
  // General
  'general', 'unknown',
]

// ============================================================================
// FILENAME PATTERN PRE-CLASSIFICATION
// Detects common document patterns from filename before calling OpenAI
// This ensures documents with clear filename indicators get classified correctly
// ============================================================================
interface FilenameClassification {
  category: DocumentCategory
  subtype: DocumentSubtype
  confidence: number
  reason: string
}

function preClassifyByFilename(fileName: string): FilenameClassification | null {
  const fileNameLower = fileName.toLowerCase()

  // MEXICAN DOCUMENT PATTERNS (HIGH PRIORITY)

  // CURP - Mexican population registry
  if (fileNameLower.includes('curp') || /curp[_\-]?[a-z]{4}\d{6}[a-z]{6}\d{2}/i.test(fileName)) {
    console.log('[FILENAME-CLASSIFIER] Detected CURP document')
    return { category: 'identity', subtype: 'id_card', confidence: 0.95, reason: 'CURP pattern in filename' }
  }

  // CIF - Mexican tax ID (Cédula de Identificación Fiscal)
  if (fileNameLower.includes('cif') && !fileNameLower.includes('certificate') && !fileNameLower.includes('certif')) {
    console.log('[FILENAME-CLASSIFIER] Detected CIF document')
    return { category: 'tax', subtype: 'tax_return', confidence: 0.90, reason: 'CIF pattern in filename' }
  }

  // RFC - Mexican tax registry
  if (/\brfc\b/i.test(fileName) || /rfc[_\-]?[a-z]{3,4}\d{6}/i.test(fileName)) {
    console.log('[FILENAME-CLASSIFIER] Detected RFC document')
    return { category: 'tax', subtype: 'tax_return', confidence: 0.90, reason: 'RFC pattern in filename' }
  }

  // NSS - Mexican social security (tarjeta NSS, NSS card)
  if (fileNameLower.includes('nss') || fileNameLower.includes('tarjetanss') || fileNameLower.includes('tarjeta_nss') || fileNameLower.includes('tarjeta-nss')) {
    console.log('[FILENAME-CLASSIFIER] Detected NSS document')
    return { category: 'identity', subtype: 'social_security', confidence: 0.95, reason: 'NSS pattern in filename' }
  }

  // INE/IFE - Mexican voter ID
  if (/\b(ine|ife)\b/i.test(fileName) && !fileNameLower.includes('line') && !fileNameLower.includes('wine')) {
    console.log('[FILENAME-CLASSIFIER] Detected INE/IFE document')
    return { category: 'identity', subtype: 'id_card', confidence: 0.90, reason: 'INE/IFE pattern in filename' }
  }

  // MEXICAN CONTRACTS - "X Días" patterns (28, 90, 180 días contracts)
  if (/\d+\s*(dias|días)/i.test(fileName)) {
    console.log('[FILENAME-CLASSIFIER] Detected Mexican días contract pattern')
    return { category: 'legal', subtype: 'contract', confidence: 0.90, reason: 'Días contract pattern in filename' }
  }

  // Contrato (Spanish for contract)
  if (fileNameLower.includes('contrato')) {
    console.log('[FILENAME-CLASSIFIER] Detected contrato document')
    return { category: 'legal', subtype: 'contract', confidence: 0.85, reason: 'Contrato in filename' }
  }

  // FINANCIAL PATTERNS

  // Bank info/statement
  if (fileNameLower.includes('bank') && (fileNameLower.includes('info') || fileNameLower.includes('statement') || fileNameLower.includes('account'))) {
    console.log('[FILENAME-CLASSIFIER] Detected bank document')
    return { category: 'financial', subtype: 'bank_statement', confidence: 0.85, reason: 'Bank info pattern in filename' }
  }

  // Estado de cuenta (Spanish bank statement)
  if (fileNameLower.includes('estado') && fileNameLower.includes('cuenta')) {
    console.log('[FILENAME-CLASSIFIER] Detected estado de cuenta')
    return { category: 'financial', subtype: 'bank_statement', confidence: 0.85, reason: 'Estado de cuenta in filename' }
  }

  // Factura (Spanish invoice)
  if (fileNameLower.includes('factura')) {
    console.log('[FILENAME-CLASSIFIER] Detected factura')
    return { category: 'invoice', subtype: 'invoice', confidence: 0.85, reason: 'Factura in filename' }
  }

  // Recibo (Spanish receipt)
  if (fileNameLower.includes('recibo')) {
    console.log('[FILENAME-CLASSIFIER] Detected recibo')
    return { category: 'expense', subtype: 'receipt', confidence: 0.85, reason: 'Recibo in filename' }
  }

  // IDENTITY PATTERNS

  // Passport
  if (fileNameLower.includes('passport') || fileNameLower.includes('pasaporte')) {
    console.log('[FILENAME-CLASSIFIER] Detected passport')
    return { category: 'identity', subtype: 'passport', confidence: 0.90, reason: 'Passport in filename' }
  }

  // License / Licencia
  if (fileNameLower.includes('license') || fileNameLower.includes('licencia') || fileNameLower.includes('driver')) {
    console.log('[FILENAME-CLASSIFIER] Detected license')
    return { category: 'identity', subtype: 'drivers_license', confidence: 0.85, reason: 'License in filename' }
  }

  // Birth certificate / Acta de nacimiento
  if (fileNameLower.includes('birth') || (fileNameLower.includes('acta') && fileNameLower.includes('nacimiento'))) {
    console.log('[FILENAME-CLASSIFIER] Detected birth certificate')
    return { category: 'identity', subtype: 'birth_certificate', confidence: 0.90, reason: 'Birth certificate in filename' }
  }

  return null // No strong pattern match
}

// Initialize OpenAI client
function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set')
  }

  return new OpenAI({ apiKey })
}

// Main document analysis function
export async function analyzeDocument(
  request: AIAnalysisRequest
): Promise<AIDocumentAnalysisResult> {
  const startTime = Date.now()

  console.log('[AI-ANALYZER] Starting document analysis:', request.fileName)

  // Filename pre-classification is a LAST RESORT only
  // Content-based classification (via Textract/pdfjs) is always preferred
  // Filename patterns only used when NO content can be extracted
  const filenameClassification = preClassifyByFilename(request.fileName)
  if (filenameClassification) {
    console.log('[AI-ANALYZER] Filename pattern detected (will use only if content extraction fails):', filenameClassification.reason)
  }

  try {
    const openai = getOpenAIClient()

    // Check document type to determine analysis method
    // OpenAI Vision API only supports: PNG, JPEG, GIF, WebP
    // For PDFs and DOCX, we extract text and use text-based analysis
    const imageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp']
    const isImageFile = imageTypes.includes(request.mimeType.toLowerCase())
    const isPdfFile = isPdf(request.mimeType, request.fileName)
    const isDocxFile = isDocx(request.mimeType, request.fileName)

    // Build prompts
    const systemPrompt = buildSystemPrompt()
    const userPrompt = buildAnalysisPrompt(
      request.fileName,
      request.vaultContext,
      request.existingFolders,
      request.orgCustomCategories
    )

    let response

    // For PDF/DOCX: Try to extract text, if fails try image conversion for Vision API
    if (isPdfFile || isDocxFile) {
      console.log('[AI-ANALYZER] Document is PDF/DOCX:', request.mimeType)

      let extractedText = ''
      let convertedImageUrl = ''
      let preAnalyzedCategory: DocumentCategory | null = null
      let preAnalyzedSubtype: DocumentSubtype | null = null

      // CRITICAL FIX: Use Textract text if available (from route.ts async PDF processing)
      // This is more reliable than prepareDocumentForVision for scanned PDFs
      if (request.textractText && request.textractText.length > 50) {
        extractedText = request.textractText
        console.log('[AI-ANALYZER] Using Textract text for PDF, length:', extractedText.length)

        // Include Textract metadata hints if available
        if (request.textractMetadata) {
          const meta = request.textractMetadata
          const hints: string[] = []
          if (meta.fullName) hints.push(`Name detected: ${meta.fullName}`)
          if (meta.dateOfBirth) hints.push(`DOB detected: ${meta.dateOfBirth}`)
          if (meta.expirationDate) hints.push(`Expiration detected: ${meta.expirationDate}`)
          if (meta.documentNumber) hints.push(`Document number: ${meta.documentNumber}`)
          if (meta.vendor) hints.push(`Vendor detected: ${meta.vendor}`)
          if (meta.total) hints.push(`Total amount: ${meta.total}`)
          if (meta.receiptDate) hints.push(`Receipt date: ${meta.receiptDate}`)

          if (hints.length > 0) {
            extractedText = `⚡ TEXTRACT PRE-ANALYSIS:\n${hints.join('\n')}\n\n${extractedText}`
          }
        }
      }

      // Fallback: If no Textract text, try prepareDocumentForVision
      if (!extractedText) try {
        const conversionResult = await prepareDocumentForVision(
          request.documentUrl,
          request.mimeType,
          request.fileName,
          request.s3Key
        )

        // Check for extracted text first
        if (conversionResult.extractedText && conversionResult.extractedText.length > 50) {
          extractedText = conversionResult.extractedText
          console.log('[AI-ANALYZER] Text extracted successfully, length:', extractedText.length)

          // Pre-analyze extracted text to detect education content
          const preAnalysis = preAnalyzeTextContent(extractedText, request.fileName)
          if (preAnalysis.isEducation) {
            preAnalyzedCategory = 'education'
            preAnalyzedSubtype = preAnalysis.subtype
            console.log('[AI-ANALYZER] Pre-analysis detected EDUCATION document:', preAnalysis.subtype, 'confidence:', preAnalysis.confidence)
          }
        }
        // Check for converted image (scanned PDFs)
        else if (conversionResult.convertedImageUrl) {
          convertedImageUrl = conversionResult.convertedImageUrl
          console.log('[AI-ANALYZER] PDF converted to image for Vision API')
        }
      } catch (extractionError) {
        console.log('[AI-ANALYZER] Text extraction failed:', extractionError)
      }

      // CONTENT-FIRST ANALYSIS: Use the best available content source
      if (extractedText) {
        // Case 1: We have extracted text - use text-based analysis
        const preAnalysisHint = preAnalyzedCategory === 'education'
          ? `\n\n⚠️ PRE-ANALYSIS NOTE: This document contains academic/educational content (${preAnalyzedSubtype}). Unless you see CLEAR evidence of a different document type (like a physical ID card), classify this as "education" category.`
          : ''

        const analysisPrompt = `${userPrompt}${preAnalysisHint}\n\n--- DOCUMENT TEXT CONTENT ---\n${extractedText}\n--- END OF DOCUMENT ---`

        // Debug logging before OpenAI call
        console.log('[AI-ANALYZER] Calling OpenAI for PDF text analysis...')
        console.log('[AI-ANALYZER] Text preview (first 300 chars):', extractedText.substring(0, 300).replace(/\n/g, ' '))

        response = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: analysisPrompt },
          ],
          max_tokens: 1000,
          temperature: 0.1,
          // Phase 3: Use structured outputs to enforce strict category enum
          response_format: DOCUMENT_ANALYSIS_SCHEMA as unknown as { type: 'json_object' },
        })
      } else if (convertedImageUrl) {
        // Case 2: Scanned PDF - use Vision API with converted image
        // This is CRITICAL for content-first analysis of scanned documents
        console.log('[AI-ANALYZER] Using Vision API to read scanned PDF content')

        response = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            {
              role: 'user',
              content: [
                { type: 'text', text: userPrompt },
                {
                  type: 'image_url',
                  image_url: {
                    url: convertedImageUrl,
                    detail: 'high',  // High detail for reading document content
                  },
                },
              ],
            },
          ],
          max_tokens: 1000,
          temperature: 0.1,
          // Phase 3: Use structured outputs to enforce strict category enum
          response_format: DOCUMENT_ANALYSIS_SCHEMA as unknown as { type: 'json_object' },
        })
      } else {
        // Case 3: No content available - use filename-only as last resort
        // This should be rare with the PDF-to-image conversion
        console.log('[AI-ANALYZER] No content extracted, using filename-only analysis')

        const analysisPrompt = `${userPrompt}\n\nNote: This is a ${isPdfFile ? 'PDF' : 'DOCX'} document. The content could not be extracted or read. Please analyze based on the filename "${request.fileName}" to determine the best classification and folder path.`

        response = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: analysisPrompt },
          ],
          max_tokens: 1000,
          temperature: 0.1,
          // Phase 3: Use structured outputs to enforce strict category enum
          response_format: DOCUMENT_ANALYSIS_SCHEMA as unknown as { type: 'json_object' },
        })
      }
    }
    // For images: Use Textract text if available AND real, otherwise Vision API
    else if (isImageFile) {
      // Check if Textract text looks like real document content vs mock/placeholder data
      const isMockTextract = request.textractText && (
        request.textractText.includes('SAMPLE DOCUMENT') ||
        request.textractText.includes('Document Title: Test Document') ||
        request.textractText.includes('Sample Merchant Inc.') ||
        request.textractText.includes('JOHN DOE') && request.textractText.includes('DL Number: D1234567')
      )

      // Check if this is a generic scan filename that needs image analysis
      const isGenericScanFilename = /^(scan|img|image|photo|capture|doc|document)[\s_\-]?\d*/i.test(request.fileName)

      // Use text-based analysis only if we have REAL Textract text (not mock data)
      // AND the filename suggests a specific document type OR we have structured metadata
      const hasRealTextractText = request.textractText &&
        request.textractText.length > 50 &&
        !isMockTextract

      const hasStructuredMetadata = request.textractMetadata && (
        request.textractMetadata.vendor ||
        request.textractMetadata.total ||
        request.textractMetadata.fullName ||
        request.textractMetadata.expirationDate
      )

      // For scanned images with generic filenames and no structured metadata,
      // prefer Vision API to actually see the document content
      const shouldUseVisionApi = isGenericScanFilename && !hasStructuredMetadata

      if (hasRealTextractText && !shouldUseVisionApi) {
        console.log('[AI-ANALYZER] Document is image with real Textract text, using text-based analysis')

        // Include Textract metadata hints if available
        let textractHints = ''
        if (request.textractMetadata) {
          const meta = request.textractMetadata
          const hints: string[] = []
          if (meta.fullName) hints.push(`Name detected: ${meta.fullName}`)
          if (meta.dateOfBirth) hints.push(`DOB detected: ${meta.dateOfBirth}`)
          if (meta.expirationDate) hints.push(`Expiration detected: ${meta.expirationDate}`)
          if (meta.documentNumber) hints.push(`Document number: ${meta.documentNumber}`)
          if (meta.vendor) hints.push(`Vendor detected: ${meta.vendor}`)
          if (meta.total) hints.push(`Total amount: ${meta.total}`)
          if (meta.receiptDate) hints.push(`Receipt date: ${meta.receiptDate}`)

          if (hints.length > 0) {
            textractHints = `\n\n⚡ TEXTRACT PRE-ANALYSIS (structured data extraction):\n${hints.join('\n')}`
          }
        }

        const analysisPrompt = `${userPrompt}${textractHints}\n\n--- DOCUMENT TEXT (extracted via OCR) ---\n${request.textractText}\n--- END OF DOCUMENT ---`

        response = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: analysisPrompt },
          ],
          max_tokens: 1000,
          temperature: 0.1,
          // Phase 3: Use structured outputs to enforce strict category enum
          response_format: DOCUMENT_ANALYSIS_SCHEMA as unknown as { type: 'json_object' },
        })
      } else {
        // Use Vision API for:
        // 1. No Textract text available
        // 2. Mock/placeholder Textract text detected
        // 3. Generic scan filenames that need image content analysis
        const reason = isMockTextract ? 'mock Textract detected' :
                       shouldUseVisionApi ? 'generic scan filename' :
                       'no Textract text'
        console.log('[AI-ANALYZER] Document is image, using Vision API:', reason)
        response = await openai.chat.completions.create({
          model: 'gpt-4o-mini', // GPT-4o has vision capabilities
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: userPrompt,
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: request.documentUrl,
                    detail: 'high', // High detail for better text extraction
                  },
                },
              ],
            },
          ],
          max_tokens: 1000,
          temperature: 0.1, // Low temperature for consistent output
          // Phase 3: Use structured outputs to enforce strict category enum
          response_format: DOCUMENT_ANALYSIS_SCHEMA as unknown as { type: 'json_object' },
        })
      }
    }
    // For other file types (video, audio, etc.): Use OpenAI to analyze filename
    else {
      console.log('[AI-ANALYZER] Non-image file, using OpenAI filename analysis:', request.mimeType)

      // Determine file type description
      let fileTypeDesc = 'file'
      if (request.mimeType.startsWith('video/')) {
        fileTypeDesc = 'video file'
      } else if (request.mimeType.startsWith('audio/')) {
        fileTypeDesc = 'audio/recording file'
      }

      const filenamePrompt = `${userPrompt}\n\nNote: This is a ${fileTypeDesc} (${request.mimeType}). Please analyze based on the filename "${request.fileName}" to determine the best classification and folder path. For videos, consider using a "Videos" folder. For audio/recordings, consider using a "Recordings" folder.`

      response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: filenamePrompt,
          },
        ],
        max_tokens: 1000,
        temperature: 0.1,
        // Phase 3: Use structured outputs to enforce strict category enum
        response_format: DOCUMENT_ANALYSIS_SCHEMA as unknown as { type: 'json_object' },
      })
    }

    // Parse response
    if (!response) {
      throw new Error('No response from OpenAI')
    }
    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response content from OpenAI')
    }

    console.log('[AI-ANALYZER] Raw response:', content)

    let parsedResponse: OpenAIAnalysisResponse
    try {
      parsedResponse = JSON.parse(content)
    } catch (parseError) {
      console.error('[AI-ANALYZER] Failed to parse JSON response:', parseError)
      throw new Error('Invalid JSON response from OpenAI')
    }

    // Validate response structure
    if (!validateAnalysisResponse(parsedResponse)) {
      console.error('[AI-ANALYZER] Invalid response structure:', parsedResponse)
      throw new Error('Invalid response structure from OpenAI')
    }

    // Normalize and validate classification
    let category = normalizeCategory(parsedResponse.classification.category)
    let subtype = normalizeSubtype(parsedResponse.classification.subtype)

    // Get file extension
    const extension = getExtensionFromFilename(request.fileName)

    // Normalize confidence to 0-1 range
    let confidence = Math.min(Math.max(parsedResponse.classification.confidence, 0), 1)

    // ========================================================================
    // FILENAME PRE-CLASSIFICATION - LAST RESORT ONLY
    // Only use filename patterns when:
    // 1. AI returned "other" (couldn't classify) with low confidence, OR
    // 2. Content extraction failed (no Textract text, no pdfjs text)
    // We TRUST the AI when it has content to analyze
    // ========================================================================
    const aiCouldNotClassify = category === 'other' && confidence < 0.5
    const noContentExtracted = !request.textractText || request.textractText.length < 50

    if (filenameClassification && filenameClassification.confidence >= 0.85) {
      if (aiCouldNotClassify && noContentExtracted) {
        // TRUE LAST RESORT: No content was extracted, AI couldn't classify
        // In this case, filename patterns are our best guess
        console.log('[AI-ANALYZER] LAST RESORT: Using filename pattern (no content extracted, AI uncertain)')
        console.log('[AI-ANALYZER] AI said:', { category, subtype, confidence })
        console.log('[AI-ANALYZER] Using filename pattern:', filenameClassification)

        category = filenameClassification.category
        subtype = filenameClassification.subtype
        confidence = filenameClassification.confidence
      } else if (category === filenameClassification.category) {
        // AI agrees with filename - boost confidence
        console.log('[AI-ANALYZER] AI classification matches filename pattern - boosting confidence')
        confidence = Math.min(confidence + 0.1, 0.95)
      } else {
        // AI has content and made a different decision - TRUST THE AI
        // The AI can read "contrato" in the document content, which is more reliable than "28 Dias" in filename
        console.log('[AI-ANALYZER] AI classification differs from filename pattern - TRUSTING AI (content-based)')
        console.log('[AI-ANALYZER] Filename suggested:', filenameClassification.category, '/', filenameClassification.subtype)
        console.log('[AI-ANALYZER] AI decided:', category, '/', subtype, '- using AI decision')
      }
    }

    // ========================================================================
    // STRICT VALIDATION: Prevent misclassification of text documents as identity
    // ========================================================================
    const isTextDocument = isPdfFile || isDocxFile || ['text/plain', 'application/rtf'].includes(request.mimeType.toLowerCase())

    // Identity documents should ONLY come from image files (scans of physical IDs)
    // or have very high confidence with specific ID-related content
    if (category === 'identity' && isTextDocument) {
      console.log('[AI-ANALYZER] WARNING: Text document classified as identity - applying strict validation')

      // Check if the filename strongly suggests education content
      const educationIndicators = [
        'chapter', 'thesis', 'research', 'paper', 'study', 'analysis',
        'framework', 'methodology', 'literature', 'review', 'abstract',
        'conclusion', 'introduction', 'essay', 'report', 'assignment',
        'lecture', 'notes', 'course', 'academic', 'project', 'final',
        'dissertation', 'module', 'syllabus', 'textbook', 'book'
      ]

      const lowerFilename = request.fileName.toLowerCase()
      const hasEducationIndicator = educationIndicators.some(indicator => lowerFilename.includes(indicator))

      if (hasEducationIndicator) {
        console.log('[AI-ANALYZER] Reclassifying: Text document with education indicators should NOT be identity')
        category = 'education'
        subtype = detectEducationSubtype(lowerFilename)
        confidence = 0.7
      } else if (confidence < 0.85) {
        // For text documents, require very high confidence to classify as identity
        console.log('[AI-ANALYZER] Reclassifying: Low confidence identity classification for text document')
        category = 'other'
        subtype = 'unknown'
        confidence = 0.4
      }
    }

    // Additional check: PDFs should rarely be identity documents unless scanned ID
    if (category === 'identity' && isPdfFile && !request.fileName.toLowerCase().includes('scan')) {
      const idKeywords = ['license', 'passport', 'id_card', 'ssn', 'social security', 'birth cert', 'green card', 'visa']
      const hasIdKeyword = idKeywords.some(kw => request.fileName.toLowerCase().includes(kw.replace(' ', '')))

      if (!hasIdKeyword && confidence < 0.9) {
        console.log('[AI-ANALYZER] Reclassifying: PDF without ID keywords should not be identity')
        // Try to detect what it actually is
        const lowerFilename = request.fileName.toLowerCase()
        if (lowerFilename.includes('chapter') || lowerFilename.includes('final') || lowerFilename.includes('project')) {
          category = 'education'
          subtype = detectEducationSubtype(lowerFilename)
        } else {
          category = 'other'
          subtype = 'unknown'
        }
        confidence = 0.5
      }
    }

    // ========================================================================
    // CONTENT-FIRST POST-PROCESSING OVERRIDES
    // These rules use Textract text as the SOURCE OF TRUTH
    // Filename is SECONDARY - only used when content confirms the type
    // ========================================================================

    const text = (request.textractText || '').toUpperCase()
    const fileNameLower = request.fileName.toLowerCase()

    // -------------------------------------------------------------------------
    // RULE GROUP 1: Canadian Tax Documents (T1, T2, Notice of Assessment)
    // -------------------------------------------------------------------------
    const isCanadianTaxContent =
      text.includes('CANADA REVENUE AGENCY') ||
      (text.includes('CRA') && text.includes('TAX')) ||
      text.includes('T1 GENERAL') ||
      text.includes('T2 CORPORATION') ||
      text.includes('NOTICE OF ASSESSMENT') ||
      text.includes('INCOME TAX AND BENEFIT') ||
      (text.includes('TAXABLE INCOME') && text.includes('FEDERAL'))

    if (isCanadianTaxContent && ['other', 'education', 'technical', 'business'].includes(category)) {
      console.log('[AI-ANALYZER] CONTENT-FIRST: Canadian tax document detected in text')
      category = 'tax'
      // Determine subtype from content
      if (text.includes('T1 GENERAL') || text.includes('T1-') || fileNameLower.includes('t1')) {
        subtype = 'tax_return'
      } else if (text.includes('T2 CORPORATION') || text.includes('T2-') || fileNameLower.includes('t2')) {
        subtype = 'corporate_tax'  // Match existing subtype name
      } else if (text.includes('NOTICE OF ASSESSMENT')) {
        subtype = 'tax_notice'  // Use existing subtype for CRA notices
      } else {
        subtype = 'tax_return'
      }
      confidence = Math.max(confidence, 0.85)
    }

    // -------------------------------------------------------------------------
    // RULE GROUP 2: Financial Statements (Balance Sheet, P&L, Income Statement)
    // -------------------------------------------------------------------------
    const isFinancialStatement =
      text.includes('BALANCE SHEET') ||
      text.includes('STATEMENT OF FINANCIAL POSITION') ||
      (text.includes('PROFIT') && text.includes('LOSS')) ||
      text.includes('INCOME STATEMENT') ||
      text.includes('STATEMENT OF OPERATIONS') ||
      (text.includes('CASH FLOW') && text.includes('STATEMENT')) ||
      (text.includes('ASSETS') && text.includes('LIABILITIES') && text.includes('EQUITY'))

    if (isFinancialStatement && ['other', 'education', 'technical'].includes(category)) {
      console.log('[AI-ANALYZER] CONTENT-FIRST: Financial statement detected in text')
      category = 'financial'
      if (text.includes('BALANCE SHEET') || (text.includes('ASSETS') && text.includes('LIABILITIES'))) {
        subtype = 'balance_sheet'
      } else if (text.includes('PROFIT') && text.includes('LOSS')) {
        subtype = 'profit_loss'  // Match existing subtype name
      } else if (text.includes('CASH FLOW')) {
        subtype = 'cash_flow'  // Match existing subtype name
      } else {
        subtype = 'balance_sheet'  // Default to balance_sheet for general financial statements
      }
      confidence = Math.max(confidence, 0.85)
    }

    // -------------------------------------------------------------------------
    // RULE GROUP 3: Mexican Government Documents (content-first)
    // -------------------------------------------------------------------------
    const isMexicanTaxContent =
      (text.includes('SAT') && (text.includes('HACIENDA') || text.includes('TRIBUTARIA'))) ||
      text.includes('SERVICIO DE ADMINISTRACIÓN TRIBUTARIA') ||
      (text.includes('RFC') && text.includes('REGISTRO FEDERAL'))

    if (isMexicanTaxContent && ['other', 'education'].includes(category)) {
      console.log('[AI-ANALYZER] CONTENT-FIRST: Mexican SAT/tax document detected')
      category = 'tax'
      subtype = 'tax_return'
      confidence = Math.max(confidence, 0.85)
    }

    const isMexicanIdentityContent =
      text.includes('CLAVE ÚNICA DE REGISTRO DE POBLACIÓN') ||
      (text.includes('CURP') && text.includes('ESTADOS UNIDOS MEXICANOS')) ||
      text.includes('INSTITUTO NACIONAL ELECTORAL') ||
      text.includes('CREDENCIAL PARA VOTAR')

    if (isMexicanIdentityContent && ['other', 'education'].includes(category)) {
      console.log('[AI-ANALYZER] CONTENT-FIRST: Mexican identity document detected')
      category = 'identity'
      if (text.includes('CURP')) {
        subtype = 'curp'
      } else if (text.includes('ELECTORAL') || text.includes('VOTAR')) {
        subtype = 'ine'
      } else {
        subtype = 'id_card'
      }
      confidence = Math.max(confidence, 0.85)
    }

    // -------------------------------------------------------------------------
    // RULE GROUP 4: Contracts and Legal Documents
    // -------------------------------------------------------------------------
    const isContractContent =
      (text.includes('CONTRATO') && (text.includes('PARTES') || text.includes('CLÁUSULA'))) ||
      (text.includes('CONTRACT') && text.includes('AGREEMENT')) ||
      text.includes('TÉRMINOS Y CONDICIONES') ||
      (text.includes('TERMS AND CONDITIONS') && text.includes('PARTIES'))

    if (isContractContent && ['other', 'education'].includes(category)) {
      console.log('[AI-ANALYZER] CONTENT-FIRST: Contract/legal document detected')
      category = 'legal'
      subtype = 'contract'
      confidence = Math.max(confidence, 0.85)
    }

    // -------------------------------------------------------------------------
    // RULE GROUP 5: Bank Statements (content-first)
    // -------------------------------------------------------------------------
    const isBankStatement =
      ((text.includes('BANK') || text.includes('BANCO')) &&
       (text.includes('STATEMENT') || text.includes('ESTADO DE CUENTA'))) ||
      text.includes('ACCOUNT BALANCE') ||
      (text.includes('DEPOSITS') && text.includes('WITHDRAWALS'))

    if (isBankStatement && ['other', 'education'].includes(category)) {
      console.log('[AI-ANALYZER] CONTENT-FIRST: Bank statement detected')
      category = 'financial'
      subtype = 'bank_statement'
      confidence = Math.max(confidence, 0.85)
    }

    // -------------------------------------------------------------------------
    // FALLBACK: Filename-based hints (only if content rules didn't match)
    // These are LOWER PRIORITY and only fix obvious mismatches
    // -------------------------------------------------------------------------

    // Mexican employment contracts with "Dias" pattern
    const hasDiasPattern = /\d+\s*d[ií]as/i.test(request.fileName)
    if (hasDiasPattern && category === 'education') {
      console.log('[AI-ANALYZER] FILENAME-HINT: Dias pattern suggests contract, not education')
      category = 'legal'
      subtype = 'contract'
      confidence = Math.max(confidence, 0.75)
    }

    // For very low confidence (unrecognizable), use Uncategorized folder
    let folderPathSegments = parsedResponse.folderMatch.suggestedPath || []
    if (confidence < 0.3) {
      folderPathSegments = ['Uncategorized']
      console.log('[AI-ANALYZER] Very low confidence, using Uncategorized folder')
    }

    // If we reclassified from identity to education, update the folder path
    if (category === 'education' && parsedResponse.classification.category.toLowerCase() === 'identity') {
      const year = new Date().getFullYear().toString()
      const subtypeFolderName = getEducationFolderName(subtype)
      if (request.vaultContext === 'personal') {
        folderPathSegments = ['Personal Documents', 'Education', year, subtypeFolderName]
      } else {
        folderPathSegments = ['Education', year, subtypeFolderName]
      }
      console.log('[AI-ANALYZER] Updated folder path for reclassified education document:', folderPathSegments.join('/'))
    }

    // =========================================================================
    // FALLBACK: Generate folder path if OpenAI returned empty suggestedPath
    // This ensures documents ALWAYS have a target folder, never stuck in root
    // =========================================================================
    if (folderPathSegments.length === 0 && confidence >= 0.3) {
      // For financial/accounting documents, try to extract year from document
      let year = new Date().getFullYear().toString()
      if (isFinancialOrAccountingDocument(category, subtype)) {
        const documentYear = extractDocumentYear(parsedResponse, request)
        if (documentYear) {
          year = documentYear
          console.log('[AI-ANALYZER] Using extracted document year for fallback:', year)
        }
      }

      const categoryFolderName = getFolderName(category)
      const subtypeFolderName = getFolderName(subtype)

      if (request.vaultContext === 'personal') {
        folderPathSegments = ['Personal Documents', categoryFolderName, year, subtypeFolderName]
      } else {
        folderPathSegments = [categoryFolderName, year, subtypeFolderName]
      }
      console.log('[AI-ANALYZER] FALLBACK: Generated folder path from category/subtype:', folderPathSegments.join('/'))
    }

    // =========================================================================
    // REPLACE YEAR IN FOLDER PATH FOR FINANCIAL/ACCOUNTING DOCUMENTS
    // Extract document year and replace current year in path if applicable
    // =========================================================================
    if (isFinancialOrAccountingDocument(category, subtype)) {
      const documentYear = extractDocumentYear(parsedResponse, request)
      if (documentYear) {
        folderPathSegments = replaceYearInPath(folderPathSegments, documentYear)
        console.log('[AI-ANALYZER] Updated folder path with document year:', folderPathSegments.join('/'))
      } else {
        console.log('[AI-ANALYZER] Could not extract document year, using current year in path')
      }
    }

    // Build result
    const result: AIDocumentAnalysisResult = {
      classification: {
        category,
        subtype,
        confidence,
      },
      suggestedFilename: sanitizeFilename(parsedResponse.suggestedFilename, extension),
      expirationDate: normalizeDate(parsedResponse.expirationDate),
      expirationConfidence: Math.min(Math.max(parsedResponse.expirationConfidence || 0, 0), 1),
      dueDate: normalizeDate(parsedResponse.dueDate),
      dueDateConfidence: Math.min(Math.max(parsedResponse.dueDateConfidence || 0, 0), 1),
      folderSuggestion: {
        pathSegments: folderPathSegments,
        matchedExistingFolder: confidence >= 0.3 && parsedResponse.folderMatch.existingFolderId
          ? findFolderById(request.existingFolders, parsedResponse.folderMatch.existingFolderId)
          : null,
        isNewFolder: confidence < 0.3 || !parsedResponse.folderMatch.existingFolderId,
      },
      extractedMetadata: {
        issueDate: parsedResponse.metadata?.issueDate,
        personName: parsedResponse.metadata?.personName,
        documentNumber: parsedResponse.metadata?.documentNumber,
        vendor: parsedResponse.metadata?.vendor,
        amount: parsedResponse.metadata?.amount,
        companyName: parsedResponse.metadata?.companyName,
        clientName: parsedResponse.metadata?.clientName,
        address: parsedResponse.metadata?.address,
      },
      // Add suggested categories for low confidence classifications
      suggestedCategories: confidence < 0.7 ? getSuggestedCategories(request.vaultContext) : undefined,
      processingTimeMs: Date.now() - startTime,
      modelUsed: 'gpt-4o-mini',
    }

    console.log('[AI-ANALYZER] Analysis complete:', {
      category: result.classification.category,
      subtype: result.classification.subtype,
      confidence: result.classification.confidence,
      expirationDate: result.expirationDate,
      dueDate: result.dueDate,
      suggestedFilename: result.suggestedFilename,
      folderPath: result.folderSuggestion.pathSegments.join('/'),
      processingTime: result.processingTimeMs,
    })

    return result
  } catch (error) {
    // Improved error logging to diagnose OpenAI failures
    console.error('[AI-ANALYZER] OPENAI FAILED - triggering fallback')
    console.error('[AI-ANALYZER] Error message:', error instanceof Error ? error.message : String(error))
    console.error('[AI-ANALYZER] Error stack:', error instanceof Error ? error.stack : 'No stack')
    console.error('[AI-ANALYZER] File being analyzed:', request.fileName)
    console.error('[AI-ANALYZER] Had Textract text:', !!request.textractText, 'length:', request.textractText?.length || 0)

    // Return fallback result
    return createFallbackResult(request, Date.now() - startTime, error)
  }
}

// Analyze document from base64 data (for client-side uploads)
export async function analyzeDocumentFromBase64(
  base64Data: string,
  mimeType: string,
  fileName: string,
  vaultContext: VaultContext,
  existingFolders: ExistingFolderInfo[],
  orgCustomCategories?: string[]
): Promise<AIDocumentAnalysisResult> {
  // Create data URL from base64
  const dataUrl = `data:${mimeType};base64,${base64Data}`

  return analyzeDocument({
    documentUrl: dataUrl,
    fileName,
    mimeType,
    vaultContext,
    existingFolders,
    orgCustomCategories,
  })
}

// Helper: Normalize category to valid type
function normalizeCategory(category: string): DocumentCategory {
  const normalized = category.toLowerCase().trim()

  if (VALID_CATEGORIES.includes(normalized as DocumentCategory)) {
    return normalized as DocumentCategory
  }

  // Map common variations
  const categoryMap: Record<string, DocumentCategory> = {
    // Identity
    id: 'identity',
    identification: 'identity',
    ids: 'identity',
    // Financial
    finance: 'financial',
    banking: 'financial',
    bank: 'financial',
    money: 'financial',
    // Tax
    taxes: 'tax',
    taxation: 'tax',
    irs: 'tax',
    // Income
    earnings: 'income',
    salary: 'income',
    wages: 'income',
    pay: 'income',
    // Expense
    receipt: 'expense',
    receipts: 'expense',
    expenses: 'expense',
    spending: 'expense',
    // Invoice
    invoices: 'invoice',
    billing: 'invoice',
    bills: 'invoice',
    // Medical
    health: 'medical',
    healthcare: 'medical',
    medicine: 'medical',
    doctor: 'medical',
    hospital: 'medical',
    // Insurance
    insurances: 'insurance',
    coverage: 'insurance',
    policy: 'insurance',
    // Legal
    law: 'legal',
    lawyer: 'legal',
    attorney: 'legal',
    court: 'legal',
    // Property
    real_estate: 'property',
    realestate: 'property',
    home: 'property',
    house: 'property',
    // Business
    company: 'business',
    corporate: 'business',
    enterprise: 'business',
    // Employment
    job: 'employment',
    work: 'employment',
    career: 'employment',
    hr: 'employment',
    // Education
    school: 'education',
    college: 'education',
    university: 'education',
    academic: 'education',
    learning: 'education',
    // Certification
    certifications: 'certification',
    license: 'certification',
    licenses: 'certification',
    credentials: 'certification',
    // Correspondence
    mail: 'correspondence',
    letters: 'correspondence',
    communication: 'correspondence',
    // Vehicle
    auto: 'vehicle',
    car: 'vehicle',
    automotive: 'vehicle',
    // Personal
    family: 'personal',
    private: 'personal',
    // Travel
    trip: 'travel',
    vacation: 'travel',
    flight: 'travel',
    // Technical
    tech: 'technical',
    technology: 'technical',
    documentation: 'technical',
  }

  return categoryMap[normalized] || 'other'
}

// Helper: Normalize subtype to valid type
function normalizeSubtype(subtype: string): DocumentSubtype {
  const normalized = subtype.toLowerCase().trim().replace(/\s+/g, '_')

  if (VALID_SUBTYPES.includes(normalized as DocumentSubtype)) {
    return normalized as DocumentSubtype
  }

  // Map common variations
  const subtypeMap: Record<string, DocumentSubtype> = {
    // Identity variations
    driver_license: 'drivers_license',
    driving_license: 'drivers_license',
    dl: 'drivers_license',
    ssn: 'social_security',
    ss_card: 'social_security',
    ss: 'social_security',
    national_id: 'id_card',
    government_id: 'id_card',
    // Tax variations
    tax_form: 'tax_return',
    tax_filing: 'tax_return',
    w_2: 'w2',
    '1099_misc': '1099',
    '1099_nec': '1099',
    '1099_int': '1099',
    // Medical variations
    medical_records: 'medical_record',
    rx: 'prescription',
    lab_result: 'lab_results',
    test_results: 'lab_results',
    blood_test: 'lab_results',
    x_ray: 'xray',
    // Insurance variations
    health_insurance: 'health_insurance',
    medical_insurance: 'health_insurance',
    car_insurance: 'auto_insurance',
    homeowners_insurance: 'home_insurance',
    explanation_of_benefits: 'eob',
    // Legal variations
    property_deed: 'deed',
    title_deed: 'deed',
    poa: 'power_of_attorney',
    non_disclosure_agreement: 'nda',
    cease_and_desist: 'cease_desist',
    // Expense/Invoice variations
    receipts: 'receipt',
    utility_bill: 'bill',
    po: 'purchase_order',
    // Employment variations
    curriculum_vita: 'curriculum_vitae',
    job_offer: 'offer_letter',
    // Education variations
    school_transcript: 'transcript',
    college_diploma: 'diploma',
    university_degree: 'degree',
    chapter: 'book_chapter',
    research: 'research_paper',
    paper: 'academic_paper',
    // Business variations
    p_l: 'profit_loss',
    pnl: 'profit_loss',
    profit_and_loss: 'profit_loss',
    // Vehicle variations
    car_title: 'vehicle_title',
    auto_title: 'vehicle_title',
    car_registration: 'registration',
    // Travel variations
    flight_ticket: 'boarding_pass',
    plane_ticket: 'boarding_pass',
    hotel_booking: 'hotel_reservation',
  }

  return subtypeMap[normalized] || 'unknown'
}

// Helper: Normalize date string to YYYY-MM-DD format
function normalizeDate(dateStr: string | null | undefined): string | null {
  if (!dateStr || dateStr === 'null') return null

  try {
    // Try to parse the date
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return null

    // Format as YYYY-MM-DD
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  } catch {
    return null
  }
}

/**
 * Extract year from document date metadata
 * Checks issueDate first, then falls back to receiptDate from Textract, then Textract text, then filename
 * This is for folder organization, NOT expiration/due dates
 */
function extractDocumentYear(
  parsedResponse: OpenAIAnalysisResponse,
  request: AIAnalysisRequest
): string | null {
  // Try issueDate from AI response first (document date, not expiration)
  if (parsedResponse.metadata?.issueDate) {
    const year = extractYearFromDate(parsedResponse.metadata.issueDate)
    if (year) {
      console.log('[AI-ANALYZER] Extracted year from issueDate:', year)
      return year
    }
  }

  // Fall back to receiptDate from Textract metadata (for receipts/invoices)
  if (request.textractMetadata?.receiptDate) {
    const year = extractYearFromDate(request.textractMetadata.receiptDate)
    if (year) {
      console.log('[AI-ANALYZER] Extracted year from receiptDate:', year)
      return year
    }
  }

  // Fall back to extracting date from Textract text content (robust fallback)
  if (request.textractText) {
    const dateFromText = extractDateFromText(request.textractText)
    if (dateFromText) {
      const year = extractYearFromDate(dateFromText)
      if (year) {
        console.log('[AI-ANALYZER] Extracted year from Textract text:', year)
        return year
      }
    }
  }

  // Fall back to extracting year from filename (e.g., "28 Dias M2 2025" -> "2025")
  const yearFromFilename = extractYearFromFilename(request.fileName)
  if (yearFromFilename) {
    console.log('[AI-ANALYZER] Extracted year from filename:', yearFromFilename)
    return yearFromFilename
  }

  return null
}

/**
 * Extract date from document text content
 * Looks for common date patterns in contracts and financial documents
 */
function extractDateFromText(text: string): string | null {
  if (!text || text.length < 10) return null

  // Common date patterns in documents
  const datePatterns = [
    // "Effective Date: January 15, 2025" or "Fecha: 15 de enero de 2025"
    /(?:effective\s+date|fecha|date|fecha\s+de|fecha\s+de\s+inicio|fecha\s+de\s+firma)[:\s]+(?:(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})|(\d{1,2})\s+(?:de\s+)?(?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|january|february|march|april|may|june|july|august|september|october|november|december)[a-z]*\s+(?:de\s+)?(\d{4}))/i,
    // "2025-01-15" or "01/15/2025" or "15/01/2025"
    /\b(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})\b/,
    // "January 15, 2025" or "15 January 2025"
    /\b(?:(\d{1,2})\s+(?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|january|february|march|april|may|june|july|august|september|october|november|december)[a-z]*\s+(?:de\s+)?(\d{4})|(?:enero|february|march|april|may|june|july|august|september|october|november|december)[a-z]*\s+(\d{1,2}),?\s+(\d{4}))/i,
    // "Tax Year 2025" or "Año 2025" or "Year 2025"
    /(?:tax\s+year|año|year|año\s+fiscal)[:\s]+(\d{4})/i,
    // "2025" standalone (but only if near date-related keywords)
    /(?:date|fecha|year|año|effective|inicio)[:\s]*(\d{4})\b/i,
  ]

  // Try each pattern, prioritizing more specific ones
  for (const pattern of datePatterns) {
    const match = text.match(pattern)
    if (match) {
      // Try to construct a date from the match
      let dateStr = match[0]
      
      // If we got a full date match, try to parse it
      if (match.length >= 4) {
        // Try to construct YYYY-MM-DD format
        const year = match[match.length - 1] || match[1]
        const month = match[2] || '01'
        const day = match[3] || match[1] || '01'
        
        if (year && /^\d{4}$/.test(year)) {
          const yearNum = parseInt(year, 10)
          if (yearNum >= 1900 && yearNum <= 2100) {
            // Try to parse month if it's a name
            let monthNum = parseInt(month, 10)
            if (isNaN(monthNum)) {
              const monthNames: Record<string, number> = {
                'enero': 1, 'january': 1, 'febrero': 2, 'february': 2,
                'marzo': 3, 'march': 3, 'abril': 4, 'april': 4,
                'mayo': 5, 'may': 5, 'junio': 6, 'june': 6,
                'julio': 7, 'july': 7, 'agosto': 8, 'august': 8,
                'septiembre': 9, 'september': 9, 'octubre': 10, 'october': 10,
                'noviembre': 11, 'november': 11, 'diciembre': 12, 'december': 12,
              }
              const monthLower = month.toLowerCase()
              monthNum = monthNames[monthLower] || 1
            }
            
            const dayNum = parseInt(day, 10) || 1
            if (monthNum >= 1 && monthNum <= 12 && dayNum >= 1 && dayNum <= 31) {
              return `${year}-${String(monthNum).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
            } else if (monthNum >= 1 && monthNum <= 12) {
              // Just year and month
              return `${year}-${String(monthNum).padStart(2, '0')}-01`
            } else {
              // Just year
              return `${year}-01-01`
            }
          }
        }
      }
      
      // Fallback: try to extract just the year
      const yearMatch = dateStr.match(/\b(19|20)\d{2}\b/)
      if (yearMatch) {
        const year = parseInt(yearMatch[0], 10)
        if (year >= 1900 && year <= 2100) {
          return `${year}-01-01`
        }
      }
    }
  }

  return null
}

/**
 * Extract year from filename
 * Looks for 4-digit years (1900-2100) in the filename
 */
function extractYearFromFilename(fileName: string): string | null {
  if (!fileName) return null

  // Look for 4-digit year patterns in filename
  // Common patterns: "2025", "2025.pdf", "M2 2025", "2025-01-15", etc.
  const yearMatch = fileName.match(/\b(19|20)\d{2}\b/)
  if (yearMatch) {
    const year = parseInt(yearMatch[0], 10)
    // Validate year is reasonable (between 1900 and 2100)
    if (year >= 1900 && year <= 2100) {
      return year.toString()
    }
  }

  return null
}

/**
 * Extract year from a date string
 * Handles various date formats: YYYY-MM-DD, MM/DD/YYYY, etc.
 */
function extractYearFromDate(dateStr: string | null | undefined): string | null {
  if (!dateStr) return null

  try {
    // Try parsing as Date first
    const date = new Date(dateStr)
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear()
      // Validate year is reasonable (between 1900 and 2100)
      if (year >= 1900 && year <= 2100) {
        return year.toString()
      }
    }

    // Try extracting 4-digit year directly
    const yearMatch = dateStr.match(/\b(19|20)\d{2}\b/)
    if (yearMatch) {
      const year = parseInt(yearMatch[0], 10)
      if (year >= 1900 && year <= 2100) {
        return year.toString()
      }
    }
  } catch (error) {
    console.warn('[AI-ANALYZER] Error extracting year from date:', dateStr, error)
  }

  return null
}

/**
 * Check if document is a financial/accounting document that should use document year
 */
function isFinancialOrAccountingDocument(
  category: DocumentCategory,
  subtype: DocumentSubtype
): boolean {
  // Financial categories
  if (['financial', 'tax', 'invoice', 'expense', 'income'].includes(category)) {
    return true
  }

  // Legal contracts (including employment contracts)
  if (category === 'legal' && (subtype === 'contract' || subtype === 'employment_contract' || subtype === 'agreement')) {
    return true
  }

  // Employment contracts (can be in employment category too)
  if (category === 'employment' && (subtype === 'contract' || subtype === 'employment_contract')) {
    return true
  }

  return false
}

/**
 * Replace year in folder path segments with extracted document year
 */
function replaceYearInPath(pathSegments: string[], documentYear: string): string[] {
  const newPath = [...pathSegments]
  
  // Find and replace the year segment (4-digit number)
  for (let i = 0; i < newPath.length; i++) {
    const segment = newPath[i]
    // Check if segment is a 4-digit year (1900-2100)
    if (/^(19|20)\d{2}$/.test(segment)) {
      newPath[i] = documentYear
      console.log('[AI-ANALYZER] Replaced year in path:', segment, '->', documentYear)
      break
    }
  }

  return newPath
}

// Helper: Find folder by ID
function findFolderById(
  folders: ExistingFolderInfo[],
  folderId: string
): { id: string; path: string } | null {
  const folder = folders.find(f => f.id === folderId)
  if (!folder) return null

  return {
    id: folder.id,
    path: folder.path,
  }
}

// Helper: Create fallback result when analysis fails
function createFallbackResult(
  request: AIAnalysisRequest,
  processingTime: number,
  _error: unknown
): AIDocumentAnalysisResult {
  // Try to classify from filename AND mimeType using comprehensive matching
  const { category, subtype, folderName } = classifyFromFilename(request.fileName, request.mimeType)

  console.log('[AI-ANALYZER] Fallback classification from filename:', {
    fileName: request.fileName,
    mimeType: request.mimeType,
    category,
    subtype,
    folderName,
  })

  // Determine confidence based on how specific the match was
  const confidence = category !== 'other' ? 0.7 : 0.3

  // For financial/accounting documents, try to extract year from Textract metadata
  let year = new Date().getFullYear().toString()
  if (isFinancialOrAccountingDocument(category, subtype)) {
    // Try to extract year from Textract receiptDate
    if (request.textractMetadata?.receiptDate) {
      const documentYear = extractYearFromDate(request.textractMetadata.receiptDate)
      if (documentYear) {
        year = documentYear
        console.log('[AI-ANALYZER] Using extracted document year in fallback:', year)
      }
    }
  }

  // Build folder path based on classification
  let pathSegments: string[]

  // For very low confidence (unrecognizable), use Uncategorized folder
  if (confidence < 0.3) {
    pathSegments = ['Uncategorized']
    console.log('[AI-ANALYZER] Very low confidence fallback, using Uncategorized folder')
  }
  // Special handling for Videos and Recordings - simple folder structure
  else if (folderName === 'Videos') {
    // Videos/Year structure
    pathSegments = ['Videos', year]
    console.log('[AI-ANALYZER] Using Videos folder structure:', pathSegments.join('/'))
  } else if (folderName === 'Recordings') {
    // Recordings/Year structure
    pathSegments = ['Recordings', year]
    console.log('[AI-ANALYZER] Using Recordings folder structure:', pathSegments.join('/'))
  } else if (category !== 'other') {
    // Use proper folder structure for classified documents
    const categoryFolder = getCategoryFolderName(category)
    if (request.vaultContext === 'personal') {
      pathSegments = ['Personal Documents', categoryFolder, year]
      if (folderName && folderName !== categoryFolder) {
        pathSegments.push(folderName)
      }
    } else {
      pathSegments = [categoryFolder, year]
      if (folderName && folderName !== categoryFolder) {
        pathSegments.push(folderName)
      }
    }
  } else {
    // Default path for unclassified documents - use Uncategorized instead of Other
    pathSegments = ['Uncategorized']
    console.log('[AI-ANALYZER] Unclassified document, using Uncategorized folder')
  }

  return {
    classification: {
      category,
      subtype,
      confidence,
    },
    suggestedFilename: request.fileName, // Keep original filename
    expirationDate: null,
    expirationConfidence: 0,
    dueDate: null,
    dueDateConfidence: 0,
    folderSuggestion: {
      pathSegments,
      matchedExistingFolder: null,
      isNewFolder: true,
    },
    extractedMetadata: {},
    // Add suggested categories for low confidence classifications
    suggestedCategories: confidence < 0.7 ? getSuggestedCategories(request.vaultContext) : undefined,
    processingTimeMs: processingTime,
    modelUsed: 'fallback',
  }
}

// Comprehensive filename-based classification
function classifyFromFilename(fileName: string, mimeType?: string): {
  category: DocumentCategory;
  subtype: DocumentSubtype;
  folderName: string | null
} {
  const lowerFilename = fileName.toLowerCase()
  const lowerMimeType = (mimeType || '').toLowerCase()

  // ============================================
  // VIDEO FILES - Check first by extension and MIME type
  // ============================================
  const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv', '.wmv', '.flv', '.webm', '.m4v', '.mpeg', '.mpg', '.3gp', '.3g2', '.ogv', '.ts', '.mts', '.m2ts', '.vob', '.divx', '.xvid', '.rm', '.rmvb', '.asf']
  const isVideo = videoExtensions.some(ext => lowerFilename.endsWith(ext)) || lowerMimeType.startsWith('video/')

  if (isVideo) {
    console.log('[FILENAME-CLASSIFIER] Detected VIDEO file:', fileName)
    return { category: 'personal', subtype: 'photo', folderName: 'Videos' }
  }

  // ============================================
  // AUDIO/RECORDING FILES - Check by extension and MIME type
  // ============================================
  const audioExtensions = ['.mp3', '.wav', '.aac', '.flac', '.ogg', '.wma', '.m4a', '.aiff', '.aif', '.opus', '.amr', '.ape', '.mid', '.midi', '.ra', '.ram', '.au', '.pcm', '.3gp', '.voice', '.rec', '.recording']
  const isAudio = audioExtensions.some(ext => lowerFilename.endsWith(ext)) || lowerMimeType.startsWith('audio/')

  if (isAudio) {
    console.log('[FILENAME-CLASSIFIER] Detected AUDIO/RECORDING file:', fileName)
    return { category: 'personal', subtype: 'photo', folderName: 'Recordings' }
  }

  // ============================================
  // EDUCATION - Course code patterns (e.g., "4108", "CS101", "IT 101")
  // ============================================
  const courseCodePattern = /\b(\d{3,4})[_\-\s]*(final|project|exam|quiz|lab|report|assignment)?/i
  const subjectCodePattern = /\b(cs|it|cpe|ece|math|eng|smt|bsit|bscs|bsce|phys|chem|bio|econ|acct|mgt|hrm|psych|soc|phil|hist|pol|comm|art|mus|pe)\s*\d{2,4}/i

  if (courseCodePattern.test(lowerFilename) || subjectCodePattern.test(lowerFilename)) {
    console.log('[FILENAME-CLASSIFIER] Detected course code pattern in:', fileName)
    // Check if it's specifically a final/project
    if (lowerFilename.includes('final')) {
      return { category: 'education', subtype: 'academic_paper', folderName: 'Final Projects' }
    }
    return { category: 'education', subtype: 'course_material', folderName: 'Course Work' }
  }

  // Check for academic/education keywords
  const educationKeywords = ['framework', 'conceptual', 'theoretical', 'methodology', 'analysis',
    'study', 'research', 'literature', 'review', 'abstract', 'conclusion', 'introduction',
    'chapter', 'thesis', 'dissertation', 'paper', 'essay', 'report', 'documentation',
    'project', 'assignment', 'homework', 'exam', 'quiz', 'test', 'midterm', 'finals',
    'syllabus', 'curriculum', 'lesson', 'lecture', 'notes', 'handout', 'module',
    'presentation', 'seminar', 'workshop', 'training', 'course', 'class', 'subject',
    'student', 'professor', 'instructor', 'teacher', 'school', 'university', 'college',
    'academic', 'education', 'learning', 'study', 'revise', 'revision', 'draft']

  for (const keyword of educationKeywords) {
    if (lowerFilename.includes(keyword)) {
      console.log('[FILENAME-CLASSIFIER] Detected education keyword:', keyword, 'in:', fileName)
      // Determine more specific subtype
      if (lowerFilename.includes('final') || lowerFilename.includes('capstone')) {
        return { category: 'education', subtype: 'academic_paper', folderName: 'Final Projects' }
      }
      if (lowerFilename.includes('thesis') || lowerFilename.includes('dissertation')) {
        return { category: 'education', subtype: 'thesis', folderName: 'Thesis & Dissertations' }
      }
      if (lowerFilename.includes('research')) {
        return { category: 'education', subtype: 'research_paper', folderName: 'Research Papers' }
      }
      if (lowerFilename.includes('framework') || lowerFilename.includes('conceptual') || lowerFilename.includes('theoretical')) {
        return { category: 'education', subtype: 'research_paper', folderName: 'Research Papers' }
      }
      if (lowerFilename.includes('report')) {
        return { category: 'education', subtype: 'academic_paper', folderName: 'Reports' }
      }
      if (lowerFilename.includes('assignment') || lowerFilename.includes('homework') || lowerFilename.includes('activity')) {
        return { category: 'education', subtype: 'assignment', folderName: 'Assignments' }
      }
      if (lowerFilename.includes('presentation') || lowerFilename.includes('slides') || lowerFilename.includes('ppt')) {
        return { category: 'education', subtype: 'course_material', folderName: 'Presentations' }
      }
      // Default education classification
      return { category: 'education', subtype: 'course_material', folderName: 'Academic Documents' }
    }
  }

  // Define classification patterns in order of specificity
  const patterns: Array<{
    keywords: string[]
    category: DocumentCategory
    subtype: DocumentSubtype
    folderName: string
  }> = [
    // Education - Book chapters and academic content
    { keywords: ['chapter', 'ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7', 'ch8', 'ch9', 'ch10', 'final-chapter', 'final_chapter'],
      category: 'education', subtype: 'book_chapter', folderName: 'Book Chapters' },
    { keywords: ['final project', 'final-project', 'final_project', 'finalproject', 'capstone', 'final cs', 'final it', 'final exam', '_final', '-final'],
      category: 'education', subtype: 'academic_paper', folderName: 'Final Projects' },
    { keywords: ['project documentation', 'project-documentation', 'project_documentation'],
      category: 'education', subtype: 'academic_paper', folderName: 'Project Documentation' },
    { keywords: ['thesis', 'dissertation'],
      category: 'education', subtype: 'thesis', folderName: 'Thesis & Dissertations' },
    { keywords: ['transcript'],
      category: 'education', subtype: 'transcript', folderName: 'Transcripts' },
    { keywords: ['diploma', 'degree'],
      category: 'education', subtype: 'diploma', folderName: 'Diplomas' },
    { keywords: ['report-card', 'report_card', 'reportcard'],
      category: 'education', subtype: 'report_card', folderName: 'Report Cards' },
    { keywords: ['research-paper', 'research_paper', 'researchpaper', 'research paper'],
      category: 'education', subtype: 'research_paper', folderName: 'Research Papers' },
    { keywords: ['academic-paper', 'academic_paper', 'academicpaper', 'academic paper', 'term paper', 'term-paper'],
      category: 'education', subtype: 'academic_paper', folderName: 'Academic Papers' },
    { keywords: ['textbook', 'text-book', 'text_book'],
      category: 'education', subtype: 'textbook', folderName: 'Textbooks' },
    { keywords: ['lecture', 'lecture-notes', 'lecture_notes', 'lecture notes'],
      category: 'education', subtype: 'lecture_notes', folderName: 'Lecture Notes' },
    { keywords: ['assignment', 'homework', 'activity', 'exercise', 'worksheet'],
      category: 'education', subtype: 'assignment', folderName: 'Assignments' },
    { keywords: ['essay'],
      category: 'education', subtype: 'essay', folderName: 'Essays' },
    { keywords: ['lab-report', 'lab_report', 'labreport', 'lab report', 'laboratory'],
      category: 'education', subtype: 'lab_report', folderName: 'Lab Reports' },
    { keywords: ['syllabus', 'course-material', 'course_material', 'course material', 'module'],
      category: 'education', subtype: 'course_material', folderName: 'Course Materials' },
    { keywords: ['scholarship'],
      category: 'education', subtype: 'scholarship', folderName: 'Scholarships' },
    { keywords: ['student-loan', 'student_loan', 'studentloan'],
      category: 'education', subtype: 'student_loan', folderName: 'Student Loans' },
    // Course code patterns (like SMT 405, CS 101, MATH 201, etc.)
    { keywords: ['smt ', 'smt_', 'smt-', 'cs ', 'cs_', 'cs-', 'math ', 'math_', 'math-', 'eng ', 'eng_', 'eng-', 'cpe ', 'cpe_', 'cpe-', 'ece ', 'ece_', 'ece-', 'it ', 'it_', 'it-', 'bsit', 'bscs', 'bsce'],
      category: 'education', subtype: 'course_material', folderName: 'Course Work' },

    // Identity documents
    { keywords: ['drivers-license', 'drivers_license', 'driverslicense', 'driver-license', 'dl-'],
      category: 'identity', subtype: 'drivers_license', folderName: 'Driver Licenses' },
    { keywords: ['passport'],
      category: 'identity', subtype: 'passport', folderName: 'Passports' },
    { keywords: ['birth-cert', 'birth_cert', 'birthcert'],
      category: 'identity', subtype: 'birth_certificate', folderName: 'Birth Certificates' },
    { keywords: ['social-security', 'social_security', 'ssn', 'ss-card'],
      category: 'identity', subtype: 'social_security', folderName: 'Social Security' },
    { keywords: ['marriage-cert', 'marriage_cert', 'marriagecert'],
      category: 'identity', subtype: 'marriage_certificate', folderName: 'Marriage Certificates' },
    { keywords: ['green-card', 'green_card', 'greencard'],
      category: 'identity', subtype: 'green_card', folderName: 'Green Cards' },
    { keywords: ['visa'],
      category: 'identity', subtype: 'visa', folderName: 'Visas' },
    { keywords: ['id-card', 'id_card', 'idcard', 'national-id', 'state-id'],
      category: 'identity', subtype: 'id_card', folderName: 'ID Cards' },

    // Tax documents
    { keywords: ['w-2', 'w2', 'w_2'],
      category: 'tax', subtype: 'w2', folderName: 'W-2 Forms' },
    { keywords: ['1099'],
      category: 'tax', subtype: '1099', folderName: '1099 Forms' },
    { keywords: ['tax-return', 'tax_return', 'taxreturn', '1040'],
      category: 'tax', subtype: 'tax_return', folderName: 'Tax Returns' },
    { keywords: ['property-tax', 'property_tax', 'propertytax'],
      category: 'tax', subtype: 'property_tax', folderName: 'Property Tax' },
    { keywords: ['irs-notice', 'irs_notice', 'irsnotice'],
      category: 'tax', subtype: 'tax_notice', folderName: 'Tax Notices' },

    // Financial documents
    { keywords: ['bank-statement', 'bank_statement', 'bankstatement'],
      category: 'financial', subtype: 'bank_statement', folderName: 'Bank Statements' },
    { keywords: ['credit-card-statement', 'credit_card_statement', 'ccstatement'],
      category: 'financial', subtype: 'credit_card_statement', folderName: 'Credit Card Statements' },
    { keywords: ['investment', 'brokerage', '401k', 'ira'],
      category: 'financial', subtype: 'investment_statement', folderName: 'Investments' },
    { keywords: ['retirement', 'pension'],
      category: 'financial', subtype: 'retirement_statement', folderName: 'Retirement' },
    { keywords: ['loan-statement', 'loan_statement'],
      category: 'financial', subtype: 'loan_statement', folderName: 'Loans' },
    { keywords: ['statement'],
      category: 'financial', subtype: 'bank_statement', folderName: 'Statements' },

    // Income documents
    { keywords: ['pay-stub', 'pay_stub', 'paystub', 'paycheck'],
      category: 'income', subtype: 'pay_stub', folderName: 'Pay Stubs' },
    { keywords: ['salary'],
      category: 'income', subtype: 'salary_letter', folderName: 'Salary' },
    { keywords: ['bonus'],
      category: 'income', subtype: 'bonus_statement', folderName: 'Bonuses' },

    // Expense documents
    { keywords: ['receipt'],
      category: 'expense', subtype: 'receipt', folderName: 'Receipts' },
    { keywords: ['expense-report', 'expense_report', 'expensereport'],
      category: 'expense', subtype: 'expense_report', folderName: 'Expense Reports' },
    { keywords: ['subscription'],
      category: 'expense', subtype: 'subscription', folderName: 'Subscriptions' },
    { keywords: ['donation'],
      category: 'expense', subtype: 'donation_receipt', folderName: 'Donations' },

    // Invoice documents
    { keywords: ['invoice', 'inv-', 'inv_'],
      category: 'invoice', subtype: 'invoice', folderName: 'Invoices' },
    { keywords: ['quote', 'quotation'],
      category: 'invoice', subtype: 'quote', folderName: 'Quotes' },
    { keywords: ['estimate'],
      category: 'invoice', subtype: 'estimate', folderName: 'Estimates' },
    { keywords: ['bill', 'utility-bill', 'utility_bill'],
      category: 'invoice', subtype: 'bill', folderName: 'Bills' },

    // Medical documents
    { keywords: ['medical-record', 'medical_record', 'medicalrecord'],
      category: 'medical', subtype: 'medical_record', folderName: 'Medical Records' },
    { keywords: ['prescription', 'rx-'],
      category: 'medical', subtype: 'prescription', folderName: 'Prescriptions' },
    { keywords: ['lab-result', 'lab_result', 'labresult', 'lab-test'],
      category: 'medical', subtype: 'lab_results', folderName: 'Lab Results' },
    { keywords: ['vaccination', 'vaccine', 'immunization'],
      category: 'medical', subtype: 'vaccination_record', folderName: 'Vaccinations' },
    { keywords: ['xray', 'x-ray', 'mri', 'ct-scan', 'imaging'],
      category: 'medical', subtype: 'imaging_results', folderName: 'Imaging' },
    { keywords: ['dental'],
      category: 'medical', subtype: 'dental_record', folderName: 'Dental Records' },
    { keywords: ['eob', 'explanation-of-benefits'],
      category: 'medical', subtype: 'eob', folderName: 'EOB' },

    // Insurance documents
    { keywords: ['health-insurance', 'health_insurance', 'healthinsurance'],
      category: 'insurance', subtype: 'health_insurance', folderName: 'Health Insurance' },
    { keywords: ['auto-insurance', 'auto_insurance', 'autoinsurance', 'car-insurance'],
      category: 'insurance', subtype: 'auto_insurance', folderName: 'Auto Insurance' },
    { keywords: ['home-insurance', 'home_insurance', 'homeinsurance', 'homeowners'],
      category: 'insurance', subtype: 'home_insurance', folderName: 'Home Insurance' },
    { keywords: ['life-insurance', 'life_insurance', 'lifeinsurance'],
      category: 'insurance', subtype: 'life_insurance', folderName: 'Life Insurance' },
    { keywords: ['renters-insurance', 'renters_insurance', 'rentersinsurance'],
      category: 'insurance', subtype: 'renters_insurance', folderName: 'Renters Insurance' },
    { keywords: ['insurance-claim', 'insurance_claim', 'insuranceclaim'],
      category: 'insurance', subtype: 'insurance_claim', folderName: 'Insurance Claims' },
    { keywords: ['insurance-card', 'insurance_card', 'insurancecard'],
      category: 'insurance', subtype: 'insurance_card', folderName: 'Insurance Cards' },
    { keywords: ['insurance', 'policy'],
      category: 'insurance', subtype: 'health_insurance', folderName: 'Insurance' },

    // Legal documents
    { keywords: ['contract'],
      category: 'legal', subtype: 'contract', folderName: 'Contracts' },
    { keywords: ['agreement'],
      category: 'legal', subtype: 'agreement', folderName: 'Agreements' },
    { keywords: ['lease', 'rental-agreement', 'rental_agreement'],
      category: 'legal', subtype: 'lease', folderName: 'Leases' },
    { keywords: ['nda', 'non-disclosure', 'non_disclosure'],
      category: 'legal', subtype: 'nda', folderName: 'NDAs' },
    { keywords: ['will', 'testament'],
      category: 'legal', subtype: 'will', folderName: 'Wills' },
    { keywords: ['trust'],
      category: 'legal', subtype: 'trust', folderName: 'Trusts' },
    { keywords: ['power-of-attorney', 'power_of_attorney', 'poa'],
      category: 'legal', subtype: 'power_of_attorney', folderName: 'Power of Attorney' },
    { keywords: ['court', 'lawsuit', 'legal-notice'],
      category: 'legal', subtype: 'court_document', folderName: 'Court Documents' },

    // Property documents
    { keywords: ['deed'],
      category: 'property', subtype: 'deed', folderName: 'Deeds' },
    { keywords: ['title'],
      category: 'property', subtype: 'title', folderName: 'Titles' },
    { keywords: ['mortgage'],
      category: 'property', subtype: 'mortgage', folderName: 'Mortgages' },
    { keywords: ['appraisal', 'home-appraisal'],
      category: 'property', subtype: 'appraisal', folderName: 'Appraisals' },
    { keywords: ['inspection', 'home-inspection'],
      category: 'property', subtype: 'inspection_report', folderName: 'Inspections' },
    { keywords: ['hoa'],
      category: 'property', subtype: 'hoa_documents', folderName: 'HOA' },
    { keywords: ['closing'],
      category: 'property', subtype: 'closing_documents', folderName: 'Closing Documents' },

    // Business documents
    { keywords: ['proposal', 'business-proposal'],
      category: 'business', subtype: 'proposal', folderName: 'Proposals' },
    { keywords: ['business-plan', 'business_plan', 'businessplan'],
      category: 'business', subtype: 'business_plan', folderName: 'Business Plans' },
    { keywords: ['meeting-notes', 'meeting_notes', 'meetingnotes', 'minutes'],
      category: 'business', subtype: 'meeting_notes', folderName: 'Meeting Notes' },
    { keywords: ['presentation', 'slides', 'deck'],
      category: 'business', subtype: 'presentation', folderName: 'Presentations' },
    { keywords: ['business-license', 'business_license'],
      category: 'business', subtype: 'business_license', folderName: 'Business Licenses' },
    { keywords: ['report', 'annual-report', 'annual_report'],
      category: 'business', subtype: 'report', folderName: 'Reports' },

    // Employment documents
    { keywords: ['resume', 'cv', 'curriculum'],
      category: 'employment', subtype: 'resume', folderName: 'Resumes' },
    { keywords: ['cover-letter', 'cover_letter', 'coverletter'],
      category: 'employment', subtype: 'cover_letter', folderName: 'Cover Letters' },
    { keywords: ['offer-letter', 'offer_letter', 'offerletter', 'job-offer'],
      category: 'employment', subtype: 'offer_letter', folderName: 'Offer Letters' },
    { keywords: ['employment-contract', 'employment_contract'],
      category: 'employment', subtype: 'employment_contract', folderName: 'Employment Contracts' },
    { keywords: ['performance-review', 'performance_review', 'performancereview'],
      category: 'employment', subtype: 'performance_review', folderName: 'Performance Reviews' },
    { keywords: ['termination', 'fired', 'layoff'],
      category: 'employment', subtype: 'termination_letter', folderName: 'Terminations' },
    { keywords: ['reference-letter', 'reference_letter', 'referenceletter', 'recommendation'],
      category: 'employment', subtype: 'reference_letter', folderName: 'Reference Letters' },
    { keywords: ['i-9', 'i9', 'i_9'],
      category: 'employment', subtype: 'i9', folderName: 'I-9 Forms' },
    { keywords: ['w-4', 'w4', 'w_4'],
      category: 'employment', subtype: 'w4', folderName: 'W-4 Forms' },
    { keywords: ['benefits'],
      category: 'employment', subtype: 'benefits_enrollment', folderName: 'Benefits' },

    // Certification documents
    { keywords: ['certificate', 'certification', 'certified'],
      category: 'certification', subtype: 'certification', folderName: 'Certifications' },
    { keywords: ['professional-license', 'professional_license'],
      category: 'certification', subtype: 'professional_license', folderName: 'Professional Licenses' },
    { keywords: ['training'],
      category: 'certification', subtype: 'training_certificate', folderName: 'Training Certificates' },
    { keywords: ['accreditation'],
      category: 'certification', subtype: 'accreditation', folderName: 'Accreditations' },

    // Correspondence documents
    { keywords: ['letter'],
      category: 'correspondence', subtype: 'letter', folderName: 'Letters' },
    { keywords: ['email'],
      category: 'correspondence', subtype: 'email', folderName: 'Emails' },
    { keywords: ['memo', 'memorandum'],
      category: 'correspondence', subtype: 'memo', folderName: 'Memos' },
    { keywords: ['notice', 'notification'],
      category: 'correspondence', subtype: 'notice', folderName: 'Notices' },

    // Vehicle documents
    { keywords: ['vehicle-title', 'vehicle_title', 'vehicletitle', 'car-title', 'car_title'],
      category: 'vehicle', subtype: 'vehicle_title', folderName: 'Vehicle Titles' },
    { keywords: ['registration', 'vehicle-registration', 'vehicle_registration'],
      category: 'vehicle', subtype: 'vehicle_registration', folderName: 'Registrations' },
    { keywords: ['service-record', 'service_record', 'maintenance'],
      category: 'vehicle', subtype: 'service_record', folderName: 'Service Records' },
    { keywords: ['repair'],
      category: 'vehicle', subtype: 'repair_receipt', folderName: 'Repairs' },
    { keywords: ['smog', 'emissions'],
      category: 'vehicle', subtype: 'emissions_test', folderName: 'Emissions' },

    // Travel documents
    { keywords: ['itinerary', 'flight', 'booking', 'reservation'],
      category: 'travel', subtype: 'flight_itinerary', folderName: 'Itineraries' },
    { keywords: ['boarding-pass', 'boarding_pass', 'boardingpass'],
      category: 'travel', subtype: 'boarding_pass', folderName: 'Boarding Passes' },
    { keywords: ['hotel'],
      category: 'travel', subtype: 'hotel_booking', folderName: 'Hotels' },
    { keywords: ['car-rental', 'car_rental', 'carrental'],
      category: 'travel', subtype: 'car_rental', folderName: 'Car Rentals' },

    // Technical documents
    { keywords: ['manual', 'user-guide', 'user_guide', 'userguide'],
      category: 'technical', subtype: 'user_manual', folderName: 'Manuals' },
    { keywords: ['specification', 'spec', 'datasheet'],
      category: 'technical', subtype: 'specification', folderName: 'Specifications' },
    { keywords: ['installation'],
      category: 'technical', subtype: 'installation_guide', folderName: 'Installation Guides' },

    // Personal documents
    { keywords: ['photo', 'picture', 'image'],
      category: 'personal', subtype: 'photo', folderName: 'Photos' },
    { keywords: ['journal', 'diary'],
      category: 'personal', subtype: 'journal', folderName: 'Journals' },
    { keywords: ['membership'],
      category: 'personal', subtype: 'membership', folderName: 'Memberships' },
    { keywords: ['award'],
      category: 'personal', subtype: 'award', folderName: 'Awards' },
  ]

  // Find first matching pattern
  for (const pattern of patterns) {
    for (const keyword of pattern.keywords) {
      if (lowerFilename.includes(keyword)) {
        return {
          category: pattern.category,
          subtype: pattern.subtype,
          folderName: pattern.folderName,
        }
      }
    }
  }

  // Default: unclassified
  return {
    category: 'other',
    subtype: 'unknown',
    folderName: null,
  }
}

// Helper to get human-readable folder name for a category
function getCategoryFolderName(category: DocumentCategory): string {
  const categoryFolderNames: Record<DocumentCategory, string> = {
    identity: 'Identity',
    financial: 'Financial',
    tax: 'Tax Documents',
    income: 'Income',
    expense: 'Expenses',
    invoice: 'Invoices',
    medical: 'Medical',
    insurance: 'Insurance',
    legal: 'Legal',
    property: 'Property',
    business: 'Business',
    employment: 'Employment',
    education: 'Education',
    certification: 'Certifications',
    correspondence: 'Correspondence',
    vehicle: 'Vehicles',
    personal: 'Personal',
    travel: 'Travel',
    technical: 'Technical',
    other: 'Other',
  }
  return categoryFolderNames[category] || 'Other'
}

// Check if OpenAI is configured
export function isOpenAIConfigured(): boolean {
  return !!process.env.OPENAI_API_KEY
}

// Get suggested categories for low-confidence classifications
function getSuggestedCategories(vaultContext: VaultContext): SuggestedCategory[] {
  const year = new Date().getFullYear().toString()

  if (vaultContext === 'personal') {
    return [
      { category: 'personal', subtype: 'general', folderPath: ['Personal Documents'], label: 'Personal' },
      { category: 'financial', subtype: 'general', folderPath: ['Personal Documents', 'Financial', year], label: 'Financial' },
      { category: 'education', subtype: 'general', folderPath: ['Personal Documents', 'Education', year], label: 'Education' },
      { category: 'business', subtype: 'general', folderPath: ['Personal Documents', 'Business', year], label: 'Business' },
      { category: 'other', subtype: 'unknown', folderPath: ['Uncategorized'], label: 'Uncategorized' },
    ]
  }

  // Organization context
  return [
    { category: 'business', subtype: 'general', folderPath: ['Business Documents'], label: 'Business' },
    { category: 'financial', subtype: 'general', folderPath: ['Financial', year], label: 'Financial' },
    { category: 'legal', subtype: 'general', folderPath: ['Legal', year], label: 'Legal' },
    { category: 'employment', subtype: 'general', folderPath: ['Employment', year], label: 'Employment' },
    { category: 'other', subtype: 'unknown', folderPath: ['Uncategorized'], label: 'Uncategorized' },
  ]
}

// Helper: Pre-analyze text content to detect education documents
function preAnalyzeTextContent(text: string, filename: string): {
  isEducation: boolean
  subtype: DocumentSubtype
  confidence: number
} {
  const lowerText = text.toLowerCase()
  const lowerFilename = filename.toLowerCase()

  // Education keyword patterns with weights
  const educationPatterns = [
    // Strong academic indicators (weight: 3)
    { pattern: /\babstract\b/i, weight: 3 },
    { pattern: /\bconclusion\b/i, weight: 3 },
    { pattern: /\breferences\b/i, weight: 3 },
    { pattern: /\bbibliography\b/i, weight: 3 },
    { pattern: /\bliterature review\b/i, weight: 3 },
    { pattern: /\bmethodology\b/i, weight: 3 },
    { pattern: /\btheoretical framework\b/i, weight: 3 },
    { pattern: /\bconceptual framework\b/i, weight: 3 },
    { pattern: /\bresearch\s+(question|objective|problem)\b/i, weight: 3 },
    { pattern: /\bhypothesis\b/i, weight: 3 },
    { pattern: /\bfindings\b/i, weight: 2 },
    { pattern: /\bdiscussion\b/i, weight: 2 },

    // Chapter/section indicators (weight: 3)
    { pattern: /\bchapter\s+\d+/i, weight: 3 },
    { pattern: /\bchapter\s+(one|two|three|four|five|six|seven|eight|nine|ten)\b/i, weight: 3 },
    { pattern: /\bsection\s+\d+/i, weight: 2 },

    // Academic writing patterns (weight: 2)
    { pattern: /\baccording to\b/i, weight: 2 },
    { pattern: /\bas cited in\b/i, weight: 2 },
    { pattern: /\bet al\./i, weight: 2 },
    { pattern: /\bfigure\s+\d+/i, weight: 2 },
    { pattern: /\btable\s+\d+/i, weight: 2 },
    { pattern: /\b(2019|2020|2021|2022|2023|2024)\)/i, weight: 1 }, // Citation years

    // Thesis/dissertation patterns (weight: 3)
    { pattern: /\bthesis\b/i, weight: 3 },
    { pattern: /\bdissertation\b/i, weight: 3 },
    { pattern: /\bacademic paper\b/i, weight: 3 },
    { pattern: /\bresearch paper\b/i, weight: 3 },
    { pattern: /\bterm paper\b/i, weight: 3 },

    // Course/academic context (weight: 2)
    { pattern: /\buniversity\b/i, weight: 2 },
    { pattern: /\bcollege\b/i, weight: 2 },
    { pattern: /\bprofessor\b/i, weight: 2 },
    { pattern: /\bstudent\b/i, weight: 1 },
    { pattern: /\bcourse\b/i, weight: 1 },
    { pattern: /\bsemester\b/i, weight: 2 },
    { pattern: /\bsubmitted (to|by)\b/i, weight: 2 },
    { pattern: /\bin partial fulfillment\b/i, weight: 3 },
    { pattern: /\bdegree of\b/i, weight: 3 },
  ]

  // Calculate education score
  let educationScore = 0
  for (const { pattern, weight } of educationPatterns) {
    if (pattern.test(text)) {
      educationScore += weight
    }
  }

  // Also check filename for education indicators
  const filenameEducationKeywords = [
    'chapter', 'thesis', 'research', 'paper', 'study', 'analysis',
    'framework', 'methodology', 'literature', 'review', 'abstract',
    'conclusion', 'essay', 'report', 'assignment', 'project', 'final',
    'dissertation', 'module', 'lecture', 'notes', 'course', 'academic'
  ]

  for (const keyword of filenameEducationKeywords) {
    if (lowerFilename.includes(keyword)) {
      educationScore += 3
    }
  }

  // Identity document negative indicators - if present, reduce education score
  const identityIndicators = [
    /\bdriver'?s?\s*licen[cs]e\b/i,
    /\bpassport\b/i,
    /\bsocial\s*security\b/i,
    /\bdate\s*of\s*birth\b/i,
    /\bexpir(es?|ation|y)\s*date\b/i,
    /\baddress[:]/i,
    /\bheight[:]/i,
    /\bweight[:]/i,
    /\beyes[:]/i,
    /\bsex[:]/i,
    /\bdepartment of motor vehicles\b/i,
    /\bdmv\b/i,
  ]

  let hasIdentityIndicators = false
  for (const pattern of identityIndicators) {
    if (pattern.test(text)) {
      hasIdentityIndicators = true
      break
    }
  }

  // Determine if it's education content
  // Threshold: score >= 5 indicates education document
  const isEducation = educationScore >= 5 && !hasIdentityIndicators

  // Determine specific education subtype
  let subtype: DocumentSubtype = 'academic_paper'
  if (lowerFilename.includes('thesis') || lowerText.includes('thesis')) {
    subtype = 'thesis'
  } else if (lowerFilename.includes('dissertation') || lowerText.includes('dissertation')) {
    subtype = 'dissertation'
  } else if (lowerFilename.includes('chapter') || /chapter\s+\d+/i.test(text)) {
    subtype = 'book_chapter'
  } else if (lowerFilename.includes('research') || lowerText.includes('research paper')) {
    subtype = 'research_paper'
  } else if (lowerFilename.includes('final') || lowerFilename.includes('project')) {
    subtype = 'project_report'
  } else if (lowerFilename.includes('essay')) {
    subtype = 'essay'
  } else if (lowerFilename.includes('assignment')) {
    subtype = 'assignment'
  } else if (lowerFilename.includes('lab')) {
    subtype = 'lab_report'
  }

  // Calculate confidence
  let confidence = Math.min(educationScore / 15, 1) // Max out at 15 points
  if (hasIdentityIndicators) {
    confidence = 0
  }

  return {
    isEducation,
    subtype,
    confidence,
  }
}

// Helper: Get folder name for education subtypes
function getEducationFolderName(subtype: DocumentSubtype): string {
  const educationFolders: Record<string, string> = {
    thesis: 'Thesis & Dissertations',
    dissertation: 'Thesis & Dissertations',
    research_paper: 'Research Papers',
    academic_paper: 'Academic Papers',
    book_chapter: 'Book Chapters',
    project_report: 'Project Reports',
    essay: 'Essays',
    assignment: 'Assignments',
    lecture_notes: 'Lecture Notes',
    course_material: 'Course Materials',
    lab_report: 'Lab Reports',
    transcript: 'Transcripts',
    diploma: 'Diplomas',
    report_card: 'Report Cards',
  }
  return educationFolders[subtype] || 'Academic Documents'
}

// Helper: Detect education document subtype from filename
function detectEducationSubtype(filename: string): DocumentSubtype {
  const lowerFilename = filename.toLowerCase()

  if (lowerFilename.includes('thesis') || lowerFilename.includes('dissertation')) {
    return 'thesis'
  }
  if (lowerFilename.includes('research')) {
    return 'research_paper'
  }
  if (lowerFilename.includes('chapter') || lowerFilename.includes('ch1') || lowerFilename.includes('ch2')) {
    return 'book_chapter'
  }
  if (lowerFilename.includes('final') || lowerFilename.includes('capstone')) {
    return 'academic_paper'
  }
  if (lowerFilename.includes('report') || lowerFilename.includes('project')) {
    return 'project_report'
  }
  if (lowerFilename.includes('essay')) {
    return 'essay'
  }
  if (lowerFilename.includes('assignment') || lowerFilename.includes('homework')) {
    return 'assignment'
  }
  if (lowerFilename.includes('lecture') || lowerFilename.includes('notes')) {
    return 'lecture_notes'
  }
  if (lowerFilename.includes('syllabus') || lowerFilename.includes('course')) {
    return 'course_material'
  }
  if (lowerFilename.includes('lab')) {
    return 'lab_report'
  }

  // Default to academic_paper for general education content
  return 'academic_paper'
}

// ============================================================================
// INDUSTRY-SPECIFIC PRE-ANALYSIS FUNCTIONS
// ============================================================================

/**
 * Pre-analyze text content to detect Real Estate documents
 */
function preAnalyzeForRealEstate(text: string, filename: string): {
  isRealEstate: boolean
  subtype: DocumentSubtype
  confidence: number
} {
  const lowerText = text.toLowerCase()
  const lowerFilename = filename.toLowerCase()

  // Real Estate content indicators with weights
  const realEstatePatterns = [
    // Strong indicators (weight: 3)
    { pattern: /\bgrantor\b/i, weight: 3 },
    { pattern: /\bgrantee\b/i, weight: 3 },
    { pattern: /\blegal description\b/i, weight: 3 },
    { pattern: /\bparcel\s*(number|id|#)\b/i, weight: 3 },
    { pattern: /\bclosing disclosure\b/i, weight: 3 },
    { pattern: /\bsettlement statement\b/i, weight: 3 },
    { pattern: /\bhud-1\b/i, weight: 3 },
    { pattern: /\btitle insurance\b/i, weight: 3 },
    { pattern: /\btitle company\b/i, weight: 3 },
    { pattern: /\bwarranty deed\b/i, weight: 3 },
    { pattern: /\bquit\s*claim\s*deed\b/i, weight: 3 },
    { pattern: /\bgrant deed\b/i, weight: 3 },
    { pattern: /\bescrow\b/i, weight: 2 },
    { pattern: /\bproperty address\b/i, weight: 2 },
    { pattern: /\bmortgage\b/i, weight: 2 },
    { pattern: /\bappraisal\b/i, weight: 2 },
    { pattern: /\binspection\s*report\b/i, weight: 2 },
    { pattern: /\bhoa\b/i, weight: 2 },
    { pattern: /\bcovenants\b/i, weight: 2 },
    { pattern: /\bmls\b/i, weight: 2 },
    { pattern: /\blot\s+\d+/i, weight: 2 },
    { pattern: /\bblock\s+\d+/i, weight: 2 },
    { pattern: /\breal\s*property\b/i, weight: 2 },
    { pattern: /\bseller\s*disclosure\b/i, weight: 3 },
  ]

  let score = 0
  for (const { pattern, weight } of realEstatePatterns) {
    if (pattern.test(text)) {
      score += weight
    }
  }

  // Check filename
  const filenameKeywords = ['deed', 'title', 'escrow', 'closing', 'appraisal', 'inspection', 'hoa', 'mls', 'mortgage', 'survey']
  for (const keyword of filenameKeywords) {
    if (lowerFilename.includes(keyword)) {
      score += 3
    }
  }

  const isRealEstate = score >= 5

  // Detect subtype
  let subtype: DocumentSubtype = 'deed'
  if (/closing\s*disclosure|hud-1|settlement/i.test(text) || lowerFilename.includes('closing')) {
    subtype = 'closing_disclosure'
  } else if (/title\s*insurance|title\s*policy/i.test(text) || lowerFilename.includes('title')) {
    subtype = 'title_insurance'
  } else if (/appraisal/i.test(text) || lowerFilename.includes('appraisal')) {
    subtype = 'appraisal'
  } else if (/inspection/i.test(text) || lowerFilename.includes('inspection')) {
    subtype = 'inspection_report'
  } else if (/escrow/i.test(text) || lowerFilename.includes('escrow')) {
    subtype = 'escrow'
  } else if (/hoa|covenants/i.test(text) || lowerFilename.includes('hoa')) {
    subtype = 'hoa_documents'
  } else if (/mls|listing/i.test(text) || lowerFilename.includes('mls') || lowerFilename.includes('listing')) {
    subtype = 'listing'
  } else if (/survey|plat/i.test(text) || lowerFilename.includes('survey')) {
    subtype = 'property_survey'
  } else if (/disclosure/i.test(text) || lowerFilename.includes('disclosure')) {
    subtype = 'disclosure'
  }

  return {
    isRealEstate,
    subtype,
    confidence: Math.min(score / 10, 1),
  }
}

/**
 * Pre-analyze text content to detect Accounting/Financial documents
 */
function preAnalyzeForAccounting(text: string, filename: string): {
  isAccounting: boolean
  category: 'tax' | 'financial'
  subtype: DocumentSubtype
  confidence: number
} {
  const lowerText = text.toLowerCase()
  const lowerFilename = filename.toLowerCase()

  // Tax document indicators
  const taxPatterns = [
    { pattern: /\bform\s*1040\b/i, weight: 3, subtype: 'tax_return' },
    { pattern: /\bform\s*1120\b/i, weight: 3, subtype: 'corporate_tax' },
    { pattern: /\bform\s*1065\b/i, weight: 3, subtype: 'partnership_tax' },
    { pattern: /\bform\s*990\b/i, weight: 3, subtype: 'nonprofit_tax' },
    { pattern: /\bschedule\s*k-?1\b/i, weight: 3, subtype: 'k1' },
    { pattern: /\bw-?2\b/i, weight: 3, subtype: 'w2' },
    { pattern: /\b1099\b/i, weight: 3, subtype: '1099' },
    { pattern: /\btaxable\s*income\b/i, weight: 2, subtype: 'tax_return' },
    { pattern: /\badjusted\s*gross\s*income\b/i, weight: 3, subtype: 'tax_return' },
    { pattern: /\binternal\s*revenue\s*service\b/i, weight: 2, subtype: 'tax_return' },
    { pattern: /\birs\b/i, weight: 1, subtype: 'tax_return' },
  ]

  // Financial document indicators
  const financialPatterns = [
    { pattern: /\btotal\s*assets\b/i, weight: 3, subtype: 'balance_sheet' },
    { pattern: /\btotal\s*liabilities\b/i, weight: 3, subtype: 'balance_sheet' },
    { pattern: /\bretained\s*earnings\b/i, weight: 3, subtype: 'balance_sheet' },
    { pattern: /\bstockholders?\s*equity\b/i, weight: 3, subtype: 'balance_sheet' },
    { pattern: /\bnet\s*income\b/i, weight: 2, subtype: 'profit_loss' },
    { pattern: /\bgross\s*profit\b/i, weight: 2, subtype: 'profit_loss' },
    { pattern: /\boperating\s*expenses\b/i, weight: 2, subtype: 'profit_loss' },
    { pattern: /\bcash\s*flow\s*from\s*operations\b/i, weight: 3, subtype: 'cash_flow' },
    { pattern: /\btrial\s*balance\b/i, weight: 3, subtype: 'trial_balance' },
    { pattern: /\bgeneral\s*ledger\b/i, weight: 3, subtype: 'general_ledger' },
    { pattern: /\bdebit\b.*\bcredit\b/i, weight: 2, subtype: 'general_ledger' },
    { pattern: /\bbank\s*reconciliation\b/i, weight: 3, subtype: 'bank_reconciliation' },
    { pattern: /\baccounts\s*receivable\s*aging\b/i, weight: 3, subtype: 'ar_aging' },
    { pattern: /\baccounts\s*payable\s*aging\b/i, weight: 3, subtype: 'ap_aging' },
    { pattern: /\bdepreciation\s*schedule\b/i, weight: 3, subtype: 'depreciation' },
    { pattern: /\bpayroll\s*register\b/i, weight: 3, subtype: 'payroll' },
    { pattern: /\bform\s*941\b/i, weight: 3, subtype: 'payroll' },
    { pattern: /\bauditor'?s?\s*report\b/i, weight: 3, subtype: 'audit_report' },
    { pattern: /\bbalance\s*sheet\b/i, weight: 3, subtype: 'balance_sheet' },
    { pattern: /\bincome\s*statement\b/i, weight: 3, subtype: 'profit_loss' },
    { pattern: /\bprofit\s*(and|&)\s*loss\b/i, weight: 3, subtype: 'profit_loss' },
  ]

  let taxScore = 0
  let financialScore = 0
  let detectedSubtype: DocumentSubtype = 'balance_sheet'
  let detectedCategory: 'tax' | 'financial' = 'financial'

  for (const { pattern, weight, subtype } of taxPatterns) {
    if (pattern.test(text)) {
      taxScore += weight
      detectedSubtype = subtype as DocumentSubtype
      detectedCategory = 'tax'
    }
  }

  for (const { pattern, weight, subtype } of financialPatterns) {
    if (pattern.test(text)) {
      financialScore += weight
      if (financialScore > taxScore) {
        detectedSubtype = subtype as DocumentSubtype
        detectedCategory = 'financial'
      }
    }
  }

  // Check filename
  const taxFilenameKeywords = ['1040', '1120', '1065', '990', 'k-1', 'k1', 'w-2', 'w2', '1099', 'tax-return']
  const financialFilenameKeywords = ['balance-sheet', 'income-statement', 'p&l', 'profit-loss', 'trial-balance', 'general-ledger', 'gl-', 'ar-aging', 'ap-aging', 'payroll', 'audit']

  for (const keyword of taxFilenameKeywords) {
    if (lowerFilename.includes(keyword)) {
      taxScore += 3
    }
  }

  for (const keyword of financialFilenameKeywords) {
    if (lowerFilename.includes(keyword)) {
      financialScore += 3
    }
  }

  const totalScore = Math.max(taxScore, financialScore)
  const isAccounting = totalScore >= 5

  return {
    isAccounting,
    category: detectedCategory,
    subtype: detectedSubtype,
    confidence: Math.min(totalScore / 10, 1),
  }
}

/**
 * Pre-analyze text content to detect Legal documents
 */
function preAnalyzeForLegal(text: string, filename: string): {
  isLegal: boolean
  subtype: DocumentSubtype
  confidence: number
} {
  const lowerText = text.toLowerCase()
  const lowerFilename = filename.toLowerCase()

  // Legal content indicators with weights
  const legalPatterns = [
    // Strong indicators (weight: 3)
    { pattern: /\bwhereas\b/i, weight: 2 },
    { pattern: /\bhereby\b/i, weight: 2 },
    { pattern: /\bherein\b/i, weight: 2 },
    { pattern: /\bthereof\b/i, weight: 2 },
    { pattern: /\bplaintiff\b/i, weight: 3 },
    { pattern: /\bdefendant\b/i, weight: 3 },
    { pattern: /\bpetitioner\b/i, weight: 3 },
    { pattern: /\brespondent\b/i, weight: 3 },
    { pattern: /\bcourt\s*of\b/i, weight: 3 },
    { pattern: /\bsuperior\s*court\b/i, weight: 3 },
    { pattern: /\bdistrict\s*court\b/i, weight: 3 },
    { pattern: /\battorney\b/i, weight: 2 },
    { pattern: /\bcounsel\b/i, weight: 2 },
    { pattern: /\blaw\s*firm\b/i, weight: 2 },
    { pattern: /\bretainer\b/i, weight: 3 },
    { pattern: /\bengagement\s*letter\b/i, weight: 3 },
    { pattern: /\bpower\s*of\s*attorney\b/i, weight: 3 },
    { pattern: /\blast\s*will\s*(and\s*testament)?\b/i, weight: 3 },
    { pattern: /\btrust\s*(agreement|document)\b/i, weight: 3 },
    { pattern: /\baffidavit\b/i, weight: 3 },
    { pattern: /\bsworn\s*statement\b/i, weight: 3 },
    { pattern: /\bsubpoena\b/i, weight: 3 },
    { pattern: /\bdeposition\b/i, weight: 3 },
    { pattern: /\binterrogatories\b/i, weight: 3 },
    { pattern: /\bdiscovery\b/i, weight: 2 },
    { pattern: /\bsettlement\s*agreement\b/i, weight: 3 },
    { pattern: /\bnon-?compete\b/i, weight: 3 },
    { pattern: /\bnon-?disclosure\b/i, weight: 3 },
    { pattern: /\bconfidentiality\s*agreement\b/i, weight: 3 },
    { pattern: /\bjudgment\b/i, weight: 2 },
    { pattern: /\bmotion\s*to\b/i, weight: 3 },
    { pattern: /\bbrief\b/i, weight: 2 },
    { pattern: /\bpleading\b/i, weight: 3 },
    { pattern: /\bcomplaint\b/i, weight: 3 },
  ]

  let score = 0
  for (const { pattern, weight } of legalPatterns) {
    if (pattern.test(text)) {
      score += weight
    }
  }

  // Check filename
  const filenameKeywords = ['retainer', 'poa', 'power-of-attorney', 'will', 'trust', 'affidavit', 'subpoena', 'deposition', 'discovery', 'settlement', 'nda', 'non-compete', 'motion', 'brief', 'complaint', 'judgment']
  for (const keyword of filenameKeywords) {
    if (lowerFilename.includes(keyword)) {
      score += 3
    }
  }

  const isLegal = score >= 5

  // Detect subtype
  let subtype: DocumentSubtype = 'contract'
  if (/retainer|engagement\s*letter/i.test(text) || lowerFilename.includes('retainer')) {
    subtype = 'retainer'
  } else if (/power\s*of\s*attorney/i.test(text) || lowerFilename.includes('poa') || lowerFilename.includes('power-of-attorney')) {
    subtype = 'power_of_attorney'
  } else if (/last\s*will|testament/i.test(text) || lowerFilename.includes('will')) {
    subtype = 'will'
  } else if (/trust\s*(agreement|document)/i.test(text) || lowerFilename.includes('trust')) {
    subtype = 'trust'
  } else if (/affidavit|sworn\s*statement/i.test(text) || lowerFilename.includes('affidavit')) {
    subtype = 'affidavit'
  } else if (/subpoena/i.test(text) || lowerFilename.includes('subpoena')) {
    subtype = 'subpoena'
  } else if (/deposition/i.test(text) || lowerFilename.includes('deposition')) {
    subtype = 'deposition'
  } else if (/interrogatories|discovery/i.test(text) || lowerFilename.includes('discovery')) {
    subtype = 'discovery'
  } else if (/settlement/i.test(text) || lowerFilename.includes('settlement')) {
    subtype = 'settlement'
  } else if (/non-?compete/i.test(text) || lowerFilename.includes('non-compete')) {
    subtype = 'non_compete'
  } else if (/non-?disclosure|confidentiality/i.test(text) || lowerFilename.includes('nda')) {
    subtype = 'nda'
  } else if (/judgment|order|decree/i.test(text) || lowerFilename.includes('judgment')) {
    subtype = 'judgment'
  } else if (/motion|brief|pleading|complaint/i.test(text) || lowerFilename.includes('motion') || lowerFilename.includes('brief')) {
    subtype = 'court_document'
  }

  return {
    isLegal,
    subtype,
    confidence: Math.min(score / 10, 1),
  }
}

// Export for testing
export { normalizeCategory, normalizeSubtype, normalizeDate }
