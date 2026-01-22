// Document Analysis Prompts for OpenAI
// Structured prompts for consistent JSON output

import type { ExistingFolderInfo } from '@/types/ai'
import type { VaultContext } from '@/types/ocr'

// ============================================================================
// COMPREHENSIVE DOCUMENT CLASSIFICATION SYSTEM
// ============================================================================
// This classification system covers virtually ALL document types a person or
// business might need to store. Categories are organized by primary purpose.
// ============================================================================

const DOCUMENT_CATEGORIES = [
  // Personal & Identity
  'identity',           // Government-issued IDs, citizenship docs

  // Financial & Money
  'financial',          // Banking, investments, credit
  'tax',                // Tax returns, forms, records
  'income',             // Pay stubs, salary, earnings
  'expense',            // Receipts, purchases, expense reports
  'invoice',            // Bills, invoices, quotes

  // Health & Medical
  'medical',            // Health records, prescriptions
  'insurance',          // All insurance types (health, auto, home, life)

  // Legal & Contracts
  'legal',              // Contracts, agreements, court docs
  'property',           // Real estate, deeds, mortgages

  // Work & Business
  'business',           // Business documents, proposals, reports
  'employment',         // Employment records, HR documents

  // Education & Credentials
  'education',          // Academic records, diplomas
  'certification',      // Professional licenses, certifications

  // Communication
  'correspondence',     // Letters, emails, notices

  // Vehicles & Transportation
  'vehicle',            // Car titles, registration, maintenance

  // Personal & Family
  'personal',           // Personal records, family documents
  'travel',             // Travel documents, itineraries, bookings

  // Digital & Technical
  'technical',          // Manuals, specifications, technical docs

  // Special Categories
  'needs_review',       // Photos, uncertain items, requires manual classification

  // Catch-all
  'other',              // Unclassifiable documents
] as const

// ============================================================================
// DETAILED SUBTYPES FOR EACH CATEGORY
// ============================================================================

const DOCUMENT_SUBTYPES = {
  // -------------------------------------------------------------------------
  // IDENTITY - Government-issued identification documents
  // -------------------------------------------------------------------------
  identity: [
    'drivers_license',      // State-issued driver's license
    'passport',             // International travel passport
    'id_card',              // State/national ID card
    'birth_certificate',    // Official birth record
    'death_certificate',    // Official death record
    'social_security_card', // SSN card / Mexican NSS / tarjeta NSS
    'visa',                 // Travel/work visa
    'green_card',           // Permanent resident card
    'citizenship_certificate', // Naturalization certificate
    'marriage_certificate', // Marriage record
    'divorce_decree',       // Divorce finalization
    'name_change',          // Legal name change document
    'voter_registration',   // Voter ID/registration / Mexican INE/IFE
    'military_id',          // Military identification
    'curp',                 // Mexican CURP (Clave Única de Registro de Población)
    'ine',                  // Mexican INE/IFE voter ID
  ],

  // -------------------------------------------------------------------------
  // FINANCIAL - Banking, investments, credit documents
  // -------------------------------------------------------------------------
  financial: [
    'bank_statement',       // Monthly/quarterly bank statement
    'credit_card_statement', // Credit card billing statement
    'investment_statement', // Brokerage/investment account statement
    'retirement_statement', // 401k, IRA, pension statement
    'loan_statement',       // Loan balance/payment statement
    'credit_report',        // Credit bureau report (Equifax, TransUnion, Experian)
    'wire_transfer',        // Wire transfer confirmation
    'check',                // Check image/copy
    'deposit_slip',         // Bank deposit receipt
    'account_opening',      // New account documents
    'financial_plan',       // Financial planning documents
    'stock_certificate',    // Stock ownership certificate
    'bond',                 // Bond documents
    'cryptocurrency',       // Crypto transaction records
    // Accounting-specific subtypes
    'balance_sheet',        // Statement of financial position
    'profit_loss',          // P&L / Income statement
    'cash_flow',            // Cash flow statement
    'trial_balance',        // Trial balance report
    'general_ledger',       // General ledger / GL
    'bank_reconciliation',  // Bank reconciliation statement
    'ar_aging',             // Accounts receivable aging report
    'ap_aging',             // Accounts payable aging report
    'depreciation',         // Depreciation schedule / fixed assets
    'payroll',              // Payroll reports, Form 941
    'audit_report',         // Audit report / audited financials
  ],

  // -------------------------------------------------------------------------
  // TAX - Tax-related documents and forms
  // -------------------------------------------------------------------------
  tax: [
    'tax_return',           // Filed tax return (1040, etc.)
    'corporate_tax',        // Form 1120, 1120S corporate tax return
    'partnership_tax',      // Form 1065 partnership tax return
    'nonprofit_tax',        // Form 990 nonprofit tax return
    'w2',                   // W-2 wage statement
    '1099',                 // 1099 forms (misc income, interest, etc.)
    '1098',                 // 1098 forms (mortgage interest, tuition)
    'k1',                   // K-1 partnership/S-corp income
    'tax_receipt',          // Charitable donation receipt for taxes
    'property_tax',         // Property tax bill/receipt
    'estimated_tax',        // Quarterly estimated tax payment
    'tax_notice',           // IRS/state tax notice
    'tax_extension',        // Tax filing extension
    'amended_return',       // Amended tax return
    'tax_transcript',       // IRS tax transcript
    'rfc',                  // Mexican RFC (Registro Federal de Contribuyentes)
    'cif',                  // Mexican CIF (Cédula de Identificación Fiscal)
    'constancia_fiscal',    // Mexican Constancia de Situación Fiscal
  ],

  // -------------------------------------------------------------------------
  // INCOME - Earnings and compensation documents
  // -------------------------------------------------------------------------
  income: [
    'pay_stub',             // Paycheck stub
    'salary_letter',        // Salary verification letter
    'bonus_statement',      // Bonus/commission statement
    'severance',            // Severance agreement/payment
    'unemployment',         // Unemployment benefits
    'social_security_benefits', // SSA benefits statement
    'pension_statement',    // Pension payment statement
    'royalty_statement',    // Royalty income statement
    'rental_income',        // Rental property income records
    'dividend_statement',   // Dividend income statement
  ],

  // -------------------------------------------------------------------------
  // EXPENSE - Receipts and purchase records
  // -------------------------------------------------------------------------
  expense: [
    'receipt',              // General purchase receipt
    'bill',                 // Utility/service bill
    'expense_report',       // Business expense report
    'purchase_order',       // Purchase order document
    'refund',               // Refund receipt/confirmation
    'subscription',         // Subscription payment
    'donation_receipt',     // Charitable donation receipt
    'tuition_receipt',      // Education tuition receipt
    'childcare_receipt',    // Childcare expense receipt
    'moving_expense',       // Moving/relocation expenses
  ],

  // -------------------------------------------------------------------------
  // INVOICE - Billing and payment requests
  // -------------------------------------------------------------------------
  invoice: [
    'invoice',              // Standard invoice
    'quote',                // Price quote/quotation
    'estimate',             // Cost estimate
    'proforma_invoice',     // Proforma invoice
    'credit_memo',          // Credit memo/adjustment
    'statement_of_account', // Account statement
    'billing_summary',      // Billing summary
    'past_due_notice',      // Past due payment notice
  ],

  // -------------------------------------------------------------------------
  // MEDICAL - Health and medical documents
  // -------------------------------------------------------------------------
  medical: [
    'medical_record',       // General medical records
    'prescription',         // Prescription/Rx
    'lab_results',          // Laboratory test results
    'imaging_results',      // X-ray, MRI, CT scan results
    'vaccination_record',   // Immunization records
    'medical_bill',         // Medical/hospital bill
    'eob',                  // Explanation of benefits
    'discharge_summary',    // Hospital discharge summary
    'doctors_note',         // Doctor's note/letter
    'referral',             // Medical referral
    'medical_history',      // Medical history summary
    'allergy_record',       // Allergy documentation
    'mental_health',        // Mental health records
    'dental_record',        // Dental records/x-rays
    'vision_record',        // Vision/eye exam records
    'physical_exam',        // Physical examination results
    'surgical_record',      // Surgery records
    'therapy_notes',        // Physical/occupational therapy
  ],

  // -------------------------------------------------------------------------
  // INSURANCE - All types of insurance documents
  // -------------------------------------------------------------------------
  insurance: [
    'health_insurance',     // Health insurance policy/card
    'dental_insurance',     // Dental insurance
    'vision_insurance',     // Vision insurance
    'auto_insurance',       // Car insurance policy
    'home_insurance',       // Homeowner's insurance
    'renters_insurance',    // Renter's insurance
    'life_insurance',       // Life insurance policy
    'disability_insurance', // Disability insurance
    'umbrella_insurance',   // Umbrella liability policy
    'pet_insurance',        // Pet insurance
    'travel_insurance',     // Travel insurance
    'business_insurance',   // Business/liability insurance
    'insurance_claim',      // Insurance claim form/documents
    'insurance_card',       // Insurance ID card
    'policy_declaration',   // Insurance declarations page
    'insurance_renewal',    // Renewal notice
  ],

  // -------------------------------------------------------------------------
  // LEGAL - Contracts, agreements, legal proceedings
  // -------------------------------------------------------------------------
  legal: [
    'contract',             // General contract
    'agreement',            // General agreement
    'lease',                // Rental/lease agreement
    'nda',                  // Non-disclosure agreement
    'non_compete',          // Non-compete agreement
    'settlement',           // Settlement agreement
    'will',                 // Last will and testament
    'trust',                // Trust documents
    'power_of_attorney',    // POA document
    'court_document',       // Court filings/documents (motion, brief, pleading)
    'lawsuit',              // Lawsuit documents
    'judgment',             // Court judgment, order, decree
    'subpoena',             // Legal subpoena
    'legal_notice',         // Legal notice/demand letter
    'affidavit',            // Sworn affidavit/statement
    'notarized_document',   // Notarized documents
    'patent',               // Patent documents
    'trademark',            // Trademark registration
    'copyright',            // Copyright registration
    'terms_of_service',     // Terms of service/agreement
    'privacy_policy',       // Privacy policy
    'waiver',               // Liability waiver/release
    // Law firm specific documents
    'retainer',             // Retainer agreement, engagement letter
    'deposition',           // Deposition transcript
    'discovery',            // Discovery documents, interrogatories
  ],

  // -------------------------------------------------------------------------
  // PROPERTY - Real estate and property documents
  // -------------------------------------------------------------------------
  property: [
    'deed',                 // Property deed (warranty, quit-claim, grant)
    'title',                // Property title
    'title_insurance',      // Title insurance policy/commitment
    'mortgage',             // Mortgage documents
    'mortgage_statement',   // Mortgage payment statement
    'appraisal',            // Property appraisal report
    'inspection_report',    // Home inspection report
    'hoa_documents',        // HOA rules, fees, CCR, covenants
    'property_survey',      // Land survey, plat, boundary survey
    'closing_documents',    // Real estate closing docs
    'closing_disclosure',   // Closing disclosure, HUD-1, settlement statement
    'escrow',               // Escrow documents/instructions
    'property_tax_bill',    // Property tax assessment
    'home_warranty',        // Home warranty documents
    'renovation_permit',    // Building/renovation permit
    'contractor_agreement', // Contractor service agreement
    'utility_setup',        // Utility account setup
    // Real estate transaction documents
    'listing',              // MLS listing sheet
    'disclosure',           // Seller disclosure, property disclosure
    'purchase_agreement',   // Real estate purchase/sales agreement
  ],

  // -------------------------------------------------------------------------
  // BUSINESS - Business operations and professional documents
  // -------------------------------------------------------------------------
  business: [
    'proposal',             // Business proposal
    'report',               // Business report
    'presentation',         // Business presentation
    'meeting_notes',        // Meeting minutes/notes
    'business_plan',        // Business plan
    'financial_statement',  // Business financial statement
    'balance_sheet',        // Balance sheet
    'profit_loss',          // Profit & loss statement
    'budget',               // Budget document
    'project_plan',         // Project plan
    'sow',                  // Statement of work
    'vendor_agreement',     // Vendor/supplier agreement
    'purchase_agreement',   // Purchase agreement
    'partnership_agreement', // Partnership agreement
    'operating_agreement',  // LLC operating agreement
    'bylaws',               // Corporate bylaws
    'articles_of_incorporation', // Incorporation docs
    'business_license',     // Business license
    'ein_letter',           // EIN confirmation letter
    'annual_report',        // Corporate annual report
    'board_resolution',     // Board resolution
    'shareholder_agreement', // Shareholder agreement
    'stock_option',         // Stock option agreement
  ],

  // -------------------------------------------------------------------------
  // EMPLOYMENT - Work and HR-related documents
  // -------------------------------------------------------------------------
  employment: [
    'resume',               // Resume/CV
    'cover_letter',         // Job application cover letter
    'offer_letter',         // Job offer letter
    'employment_contract',  // Employment agreement
    'employee_handbook',    // Company handbook
    'performance_review',   // Performance evaluation
    'promotion_letter',     // Promotion notification
    'termination_letter',   // Termination notice
    'resignation_letter',   // Resignation letter
    'reference_letter',     // Reference/recommendation
    'verification_letter',  // Employment verification
    'i9',                   // I-9 employment eligibility
    'w4',                   // W-4 withholding form
    'direct_deposit',       // Direct deposit form
    'benefits_enrollment',  // Benefits enrollment form
    'cobra',                // COBRA continuation coverage
    'workers_comp',         // Workers compensation
    'fmla',                 // FMLA documents
    'disciplinary',         // Disciplinary notice
    'background_check',     // Background check results
  ],

  // -------------------------------------------------------------------------
  // EDUCATION - Academic and educational documents
  // -------------------------------------------------------------------------
  education: [
    'transcript',           // Academic transcript
    'diploma',              // Diploma/degree
    'report_card',          // Report card/grades
    'enrollment',           // Enrollment verification
    'acceptance_letter',    // College acceptance letter
    'financial_aid',        // Financial aid documents
    'scholarship',          // Scholarship documents
    'student_loan',         // Student loan documents
    'course_material',      // Course syllabus/materials
    'thesis',               // Thesis/dissertation
    'dissertation',         // Doctoral dissertation
    'research_paper',       // Research paper
    'academic_paper',       // Academic paper/article
    'book_chapter',         // Chapter from a book/textbook
    'textbook',             // Textbook or educational book
    'lecture_notes',        // Lecture notes
    'assignment',           // Homework/assignment
    'essay',                // Essay or written work
    'project_report',       // Academic project report
    'lab_report',           // Laboratory report
    'continuing_education', // CE credits/courses
    'gre_score',            // GRE/GMAT/LSAT scores
    'recommendation',       // Academic recommendation
    'iep',                  // Individual Education Plan
  ],

  // -------------------------------------------------------------------------
  // CERTIFICATION - Professional licenses and credentials
  // -------------------------------------------------------------------------
  certification: [
    'professional_license', // Professional license (medical, law, etc.)
    'certification',        // Professional certification
    'training_certificate', // Training completion certificate
    'cpe_credits',          // Continuing professional education
    'accreditation',        // Accreditation documents
    'board_certification',  // Board certification
    'security_clearance',   // Security clearance
    'permit',               // Work/professional permit
    'credential_verification', // Credential verification
  ],

  // -------------------------------------------------------------------------
  // CORRESPONDENCE - Letters, emails, communications
  // -------------------------------------------------------------------------
  correspondence: [
    'letter',               // General letter
    'email',                // Email printout
    'memo',                 // Memorandum
    'notice',               // Official notice
    'announcement',         // Announcement
    'invitation',           // Formal invitation
    'thank_you_letter',     // Thank you letter
    'complaint',            // Complaint letter
    'request',              // Request letter
    'response',             // Response letter
    'solicitation',         // Solicitation/marketing
    'newsletter',           // Newsletter
    'circular',             // Circular/bulletin
    'greeting_card',        // Greeting card
    'postcard',             // Postcard
  ],

  // -------------------------------------------------------------------------
  // VEHICLE - Automotive and vehicle documents
  // -------------------------------------------------------------------------
  vehicle: [
    'vehicle_title',        // Car title
    'vehicle_registration', // Vehicle registration
    'bill_of_sale',         // Vehicle bill of sale
    'service_record',       // Maintenance/service record
    'repair_receipt',       // Repair receipt
    'warranty',             // Vehicle warranty
    'loan_documents',       // Auto loan documents
    'lease_agreement',      // Vehicle lease
    'accident_report',      // Accident report
    'emissions_test',       // Emissions/smog test
    'inspection_certificate', // Safety inspection
    'parking_permit',       // Parking permit
    'toll_records',         // Toll payment records
  ],

  // -------------------------------------------------------------------------
  // PERSONAL - Personal life documents
  // -------------------------------------------------------------------------
  personal: [
    'personal_letter',      // Personal correspondence
    'journal',              // Journal/diary entry
    'photo',                // Important photo
    'family_tree',          // Genealogy/family tree
    'recipe',               // Family recipe
    'pet_record',           // Pet health/adoption records
    'membership',           // Club/organization membership
    'award',                // Award/recognition
    'achievement',          // Achievement certificate
    'memorial',             // Memorial/obituary
  ],

  // -------------------------------------------------------------------------
  // TRAVEL - Travel and booking documents
  // -------------------------------------------------------------------------
  travel: [
    'flight_itinerary',     // Flight booking/itinerary
    'hotel_booking',        // Hotel reservation
    'car_rental',           // Car rental confirmation
    'travel_itinerary',     // Trip itinerary
    'boarding_pass',        // Boarding pass
    'cruise_booking',       // Cruise booking
    'tour_booking',         // Tour/excursion booking
    'travel_visa',          // Travel visa
    'vaccination_certificate', // Travel vaccination cert
    'travel_receipt',       // Travel expense receipt
    'loyalty_program',      // Frequent flyer/loyalty docs
  ],

  // -------------------------------------------------------------------------
  // TECHNICAL - Technical documentation
  // -------------------------------------------------------------------------
  technical: [
    'user_manual',          // User manual/guide
    'specification',        // Technical specification
    'datasheet',            // Product datasheet
    'schematic',            // Technical schematic
    'installation_guide',   // Installation instructions
    'maintenance_guide',    // Maintenance guide
    'troubleshooting',      // Troubleshooting guide
    'software_license',     // Software license agreement
    'api_documentation',    // API documentation
    'technical_report',     // Technical report
  ],

  // -------------------------------------------------------------------------
  // NEEDS REVIEW - Photos, uncertain items, manual classification required
  // -------------------------------------------------------------------------
  needs_review: [
    'photo',                // General photo (not a document)
    'family_photo',         // Family/people photo
    'property_photo',       // Property/real estate photo
    'screenshot',           // App/website screenshot (not a document)
    'selfie',               // Self-portrait photo
    'nature_photo',         // Nature/landscape photo
    'event_photo',          // Event/celebration photo
    'artwork',              // Artwork, graphics, illustrations
    'uncertain',            // Document that couldn't be classified
    'low_quality',          // Document with poor OCR quality
  ],

  // -------------------------------------------------------------------------
  // OTHER - Uncategorized documents
  // -------------------------------------------------------------------------
  other: [
    'general',              // General document
    'miscellaneous',        // Miscellaneous
    'unknown',              // Unknown document type
    'scan',                 // General scan
    'notes',                // Notes
    'list',                 // List document
    'form',                 // Generic form
  ],
}

// ============================================================================
// CATEGORY-TO-FOLDER NAME MAPPING
// Maps category and subtype to human-readable folder names
// ============================================================================
const FOLDER_NAMES: Record<string, string> = {
  // Categories
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
  needs_review: 'Needs Review',
  other: 'Other',

  // Needs Review subtypes
  photo: 'Photos',
  family_photo: 'Family Photos',
  property_photo: 'Property Photos',
  selfie: 'Selfies',
  nature_photo: 'Nature Photos',
  event_photo: 'Event Photos',
  artwork: 'Artwork',
  uncertain: 'Uncertain',
  low_quality: 'Low Quality',

  // Common subtype folder names
  drivers_license: 'Driver Licenses',
  passport: 'Passports',
  birth_certificate: 'Birth Certificates',
  social_security_card: 'Social Security',
  bank_statement: 'Bank Statements',
  credit_card_statement: 'Credit Card Statements',
  investment_statement: 'Investments',
  tax_return: 'Tax Returns',
  w2: 'W-2 Forms',
  '1099': '1099 Forms',
  pay_stub: 'Pay Stubs',
  receipt: 'Receipts',
  medical_record: 'Medical Records',
  prescription: 'Prescriptions',
  lab_results: 'Lab Results',
  health_insurance: 'Health Insurance',
  auto_insurance: 'Auto Insurance',
  home_insurance: 'Home Insurance',
  life_insurance: 'Life Insurance',
  contract: 'Contracts',
  lease: 'Leases',
  deed: 'Deeds',
  mortgage: 'Mortgages',
  vehicle_title: 'Vehicle Titles',
  vehicle_registration: 'Registrations',
  transcript: 'Transcripts',
  diploma: 'Diplomas',
  thesis: 'Thesis & Dissertations',
  dissertation: 'Thesis & Dissertations',
  research_paper: 'Research Papers',
  academic_paper: 'Academic Papers',
  book_chapter: 'Book Chapters',
  textbook: 'Textbooks',
  lecture_notes: 'Lecture Notes',
  assignment: 'Assignments',
  essay: 'Essays',
  lab_report: 'Lab Reports',
  professional_license: 'Professional Licenses',
  resume: 'Resumes',
  cover_letter: 'Cover Letters',
  letter: 'Letters',
  email: 'Emails',
  notice: 'Notices',

  // =========================================================================
  // INDUSTRY-SPECIFIC FOLDER NAMES
  // =========================================================================

  // Real Estate
  title_insurance: 'Title Insurance',
  closing_disclosure: 'Closing Documents',
  escrow: 'Escrow',
  listing: 'Listings',
  disclosure: 'Property Disclosures',
  purchase_agreement: 'Purchase Agreements',
  appraisal: 'Appraisals',
  inspection_report: 'Inspection Reports',
  property_survey: 'Surveys',
  hoa_documents: 'HOA Documents',

  // Accounting & Tax
  corporate_tax: 'Corporate Tax Returns',
  partnership_tax: 'Partnership Returns',
  nonprofit_tax: 'Nonprofit Returns',
  k1: 'K-1 Statements',
  balance_sheet: 'Balance Sheets',
  profit_loss: 'Profit & Loss',
  cash_flow: 'Cash Flow Statements',
  trial_balance: 'Trial Balances',
  general_ledger: 'General Ledgers',
  bank_reconciliation: 'Bank Reconciliations',
  ar_aging: 'Accounts Receivable',
  ap_aging: 'Accounts Payable',
  depreciation: 'Depreciation Schedules',
  payroll: 'Payroll',
  audit_report: 'Audit Reports',

  // Legal / Law Firm
  retainer: 'Retainer Agreements',
  deposition: 'Depositions',
  discovery: 'Discovery',
  power_of_attorney: 'Powers of Attorney',
  will: 'Wills',
  trust: 'Trusts',
  affidavit: 'Affidavits',
  subpoena: 'Subpoenas',
  court_document: 'Court Filings',
  judgment: 'Judgments',
  settlement: 'Settlements',
  nda: 'NDAs',
  non_compete: 'Non-Compete Agreements',
}

// Build the system prompt
export function buildSystemPrompt(): string {
  return `You are an expert document analyzer for a secure document management system. Your task is to analyze document images and extract structured information with HIGH ACCURACY.

=============================================================================
🌐 MULTI-LANGUAGE SUPPORT (SPANISH/ENGLISH):
=============================================================================
Documents may be in Spanish, English, or bilingual. Recognize these common terms:

CONTRACTS & LEGAL (Spanish → legal category):
- "Contrato" = Contract
- "Acuerdo" = Agreement
- "Días/Dias" (with number) = Day-based contracts (e.g., "28 Días" = 28-day employment contract)
- "Convenio" = Agreement/Covenant
- "Cláusula" = Clause
- "Firma" = Signature
- "Testigo" = Witness
- "Arrendamiento" = Lease/Rental

IDENTITY (Spanish → identity category):
- "Acta de Nacimiento" = Birth Certificate
- "Licencia de Conducir" = Driver's License
- "Credencial" = ID Card
- "Pasaporte" = Passport

TAX & FINANCIAL (Spanish → tax/financial):
- "Factura" = Invoice
- "Recibo" = Receipt
- "Estado de Cuenta" = Bank Statement
- "Declaración de Impuestos" = Tax Return
- "Nómina" = Payroll/Pay Stub

EMPLOYMENT (Spanish → employment/legal):
- "Contrato de Trabajo" = Employment Contract
- "Carta de Renuncia" = Resignation Letter
- "Carta Oferta" = Offer Letter
- "Período de Prueba" = Probation Period

=============================================================================
⚠️ CRITICAL - STRICT CLASSIFICATION RULES:
=============================================================================
1. CONTENT-FIRST ANALYSIS: You MUST analyze the ACTUAL CONTENT of the document, not just the filename. The filename is only a hint - the document content is the truth.

2. INTERNATIONAL IDENTITY DOCUMENTS - Recognize documents from ALL countries:
   MEXICO:
   - CURP (Clave Única de Registro de Población) → identity / id_card
   - CIF/RFC (Cédula de Identificación Fiscal / Registro Federal de Contribuyentes) → tax / tax_return
   - NSS (Número de Seguro Social / tarjeta NSS) → identity / social_security_card
   - INE/IFE (Instituto Nacional Electoral) → identity / id_card
   - Acta de Nacimiento → identity / birth_certificate
   - Pasaporte Mexicano → identity / passport
   - Licencia de Conducir → identity / drivers_license

   USA:
   - Driver's license, State ID → identity / drivers_license or id_card
   - Social Security Card → identity / social_security_card
   - Passport → identity / passport
   - Birth Certificate → identity / birth_certificate

   Look for: Government seals, official letterhead, ID numbers, photos, dates

3. LEGAL DOCUMENTS - Contracts and Agreements (HIGH PRIORITY - CHECK FIRST!):
   ⚠️ PRIORITY: If filename contains "Dias", "Días", "contrato", "contract", "agreement" → ALWAYS classify as LEGAL, never education!

   MEXICAN CONTRACT PATTERNS (common employment contracts):
   - "28 Días" / "28 Dias" → employment probation contract (contrato de prueba)
   - "90 Días" / "90 Dias" → training contract (contrato de capacitación)
   - "180 Días" / "180 Dias" → temporary contract
   - Any "X Días/Dias" pattern → legal/contract (NOT education!)
   - "M1", "M2", "M3" in contract context = Month/Modification, NOT Module

   Other contract indicators:
   - "contrato", "agreement", "terms", "party", "parties", "cláusulas"
   - Rental agreements, lease contracts
   - Employment contracts, service agreements
   - Any document with signature lines, terms and conditions, clauses
   → Classify as "legal" category, subtype: "contract" or "agreement"

4. FINANCIAL DOCUMENTS - Bank and Account Information:
   - Bank account details, statements, balances
   - Documents showing account numbers, routing numbers
   - Transaction histories, wire transfers
   → Classify as "financial" category

5. EDUCATION DOCUMENTS - Only for academic/school materials:
   - Transcripts, diplomas, degrees
   - Course assignments, syllabi
   - Academic research papers
   - School enrollment documents
   - NOT contracts or legal documents even if they mention days/terms

6. WHEN IN DOUBT:
   - If document looks like a contract/agreement → legal
   - If document has government seals/letterhead → identity or tax
   - If document shows financial data → financial
   - If you cannot clearly identify → use confidence < 0.5 and category "other"

7. CONFIDENCE SCORING:
   - 0.9-1.0: Absolutely certain, clear identifying features present
   - 0.7-0.89: Highly confident, strong evidence
   - 0.5-0.69: Moderately confident, some evidence but not conclusive
   - 0.3-0.49: Low confidence, making educated guess
   - 0.0-0.29: Very uncertain, document unclear

You must analyze the document and return a JSON response with the following structure:
{
  "classification": {
    "category": "one of the categories listed below",
    "subtype": "specific document type from the subtypes list",
    "confidence": 0.0 to 1.0
  },
  "expirationDate": "YYYY-MM-DD or null if not found",
  "expirationConfidence": 0.0 to 1.0,
  "dueDate": "YYYY-MM-DD or null if not found",
  "dueDateConfidence": 0.0 to 1.0,
  "suggestedFilename": "descriptive filename without extension",
  "folderMatch": {
    "existingFolderId": "folder ID if matched, or null",
    "suggestedPath": ["array", "of", "folder", "segments"]
  },
  "metadata": {
    "issueDate": "if found",
    "personName": "if found",
    "documentNumber": "if found",
    "vendor": "if found",
    "amount": "if found",
    "companyName": "if found",
    "clientName": "if found",
    "address": "if found"
  }
}

=============================================================================
DOCUMENT CATEGORIES (choose the MOST specific category):
=============================================================================
${DOCUMENT_CATEGORIES.join(', ')}

=============================================================================
DOCUMENT SUBTYPES BY CATEGORY:
=============================================================================
${Object.entries(DOCUMENT_SUBTYPES)
  .map(([cat, subtypes]) => `${cat.toUpperCase()}: ${subtypes.join(', ')}`)
  .join('\n')}

=============================================================================
CLASSIFICATION DECISION TREE - READ CAREFULLY:
=============================================================================

1. IDENTITY DOCUMENTS (Government-issued identification):
   - Driver's license, permit → category: "identity", subtype: "drivers_license"
   - Passport → category: "identity", subtype: "passport"
   - State/National ID card → category: "identity", subtype: "id_card"
   - Birth certificate → category: "identity", subtype: "birth_certificate"
   - Social Security card → category: "identity", subtype: "social_security_card"
   - Marriage certificate → category: "identity", subtype: "marriage_certificate"
   - Green card, visa → category: "identity", subtype: "green_card" or "visa"

2. FINANCIAL DOCUMENTS (Banking, credit, investments):
   - Bank statement → category: "financial", subtype: "bank_statement"
   - Credit card statement → category: "financial", subtype: "credit_card_statement"
   - Investment/brokerage statement → category: "financial", subtype: "investment_statement"
   - 401k/IRA/Retirement statement → category: "financial", subtype: "retirement_statement"
   - Loan statement → category: "financial", subtype: "loan_statement"
   - Credit report (Equifax, TransUnion, Experian) → category: "financial", subtype: "credit_report"

3. TAX DOCUMENTS (Tax forms and records):
   - Tax return (1040, state return) → category: "tax", subtype: "tax_return"
   - W-2 form → category: "tax", subtype: "w2"
   - 1099 forms (any type) → category: "tax", subtype: "1099"
   - 1098 forms → category: "tax", subtype: "1098"
   - K-1 form → category: "tax", subtype: "k1"
   - Property tax bill → category: "tax", subtype: "property_tax"
   - IRS notice → category: "tax", subtype: "tax_notice"

4. INCOME DOCUMENTS (Earnings and compensation):
   - Pay stub/paycheck → category: "income", subtype: "pay_stub"
   - Salary letter → category: "income", subtype: "salary_letter"
   - Bonus statement → category: "income", subtype: "bonus_statement"
   - Unemployment benefits → category: "income", subtype: "unemployment"
   - Social Security benefits → category: "income", subtype: "social_security_benefits"

5. EXPENSE DOCUMENTS (Purchases and spending):
   - Store receipt, purchase receipt → category: "expense", subtype: "receipt"
   - Utility bill (electric, gas, water, internet) → category: "expense", subtype: "bill"
   - Expense report → category: "expense", subtype: "expense_report"
   - Subscription payment → category: "expense", subtype: "subscription"
   - Donation receipt → category: "expense", subtype: "donation_receipt"

6. INVOICE DOCUMENTS (Billing):
   - Invoice → category: "invoice", subtype: "invoice"
   - Quote/estimate → category: "invoice", subtype: "quote" or "estimate"
   - Past due notice → category: "invoice", subtype: "past_due_notice"

7. MEDICAL DOCUMENTS (Health records):
   - Medical/health record → category: "medical", subtype: "medical_record"
   - Prescription → category: "medical", subtype: "prescription"
   - Lab/test results → category: "medical", subtype: "lab_results"
   - X-ray, MRI results → category: "medical", subtype: "imaging_results"
   - Vaccination record → category: "medical", subtype: "vaccination_record"
   - Medical bill → category: "medical", subtype: "medical_bill"
   - Explanation of Benefits (EOB) → category: "medical", subtype: "eob"
   - Doctor's note → category: "medical", subtype: "doctors_note"
   - Dental records → category: "medical", subtype: "dental_record"

8. INSURANCE DOCUMENTS (All insurance types):
   - Health insurance policy/card → category: "insurance", subtype: "health_insurance"
   - Dental/Vision insurance → category: "insurance", subtype: "dental_insurance" or "vision_insurance"
   - Auto/car insurance → category: "insurance", subtype: "auto_insurance"
   - Home/homeowners insurance → category: "insurance", subtype: "home_insurance"
   - Renters insurance → category: "insurance", subtype: "renters_insurance"
   - Life insurance → category: "insurance", subtype: "life_insurance"
   - Insurance card → category: "insurance", subtype: "insurance_card"
   - Insurance claim → category: "insurance", subtype: "insurance_claim"

9. LEGAL DOCUMENTS (Contracts, agreements, court):
   - Contract → category: "legal", subtype: "contract"
   - Agreement → category: "legal", subtype: "agreement"
   - Lease/rental agreement → category: "legal", subtype: "lease"
   - NDA → category: "legal", subtype: "nda"
   - Will/testament → category: "legal", subtype: "will"
   - Trust documents → category: "legal", subtype: "trust"
   - Power of attorney → category: "legal", subtype: "power_of_attorney"
   - Court documents → category: "legal", subtype: "court_document"
   - Settlement → category: "legal", subtype: "settlement"

10. PROPERTY DOCUMENTS (Real estate):
    - Property deed → category: "property", subtype: "deed"
    - Property title → category: "property", subtype: "title"
    - Mortgage documents → category: "property", subtype: "mortgage"
    - Mortgage statement → category: "property", subtype: "mortgage_statement"
    - Home appraisal → category: "property", subtype: "appraisal"
    - Home inspection → category: "property", subtype: "inspection_report"
    - HOA documents → category: "property", subtype: "hoa_documents"
    - Closing documents → category: "property", subtype: "closing_documents"

11. BUSINESS DOCUMENTS (Business operations):
    - Business proposal → category: "business", subtype: "proposal"
    - Business report → category: "business", subtype: "report"
    - Presentation/slides → category: "business", subtype: "presentation"
    - Meeting notes/minutes → category: "business", subtype: "meeting_notes"
    - Business plan → category: "business", subtype: "business_plan"
    - Business license → category: "business", subtype: "business_license"
    - Articles of incorporation → category: "business", subtype: "articles_of_incorporation"
    - Operating agreement → category: "business", subtype: "operating_agreement"

12. EMPLOYMENT DOCUMENTS (Work/HR):
    - Job offer letter → category: "employment", subtype: "offer_letter"
    - Employment contract → category: "employment", subtype: "employment_contract"
    - Performance review → category: "employment", subtype: "performance_review"
    - Termination letter → category: "employment", subtype: "termination_letter"
    - Reference letter → category: "employment", subtype: "reference_letter"
    - I-9 form → category: "employment", subtype: "i9"
    - W-4 form → category: "employment", subtype: "w4"
    - Benefits enrollment → category: "employment", subtype: "benefits_enrollment"

13. EDUCATION DOCUMENTS (Academic):
    - Transcript → category: "education", subtype: "transcript"
    - Diploma/degree → category: "education", subtype: "diploma"
    - Report card → category: "education", subtype: "report_card"
    - Acceptance letter → category: "education", subtype: "acceptance_letter"
    - Financial aid → category: "education", subtype: "financial_aid"
    - Student loan documents → category: "education", subtype: "student_loan"
    - Scholarship → category: "education", subtype: "scholarship"
    - Thesis/dissertation → category: "education", subtype: "thesis"
    - Research paper → category: "education", subtype: "research_paper"
    - Academic paper/article → category: "education", subtype: "academic_paper"
    - Book chapter (like "Chapter 1", "Final Chapter") → category: "education", subtype: "book_chapter"
    - Textbook or educational book → category: "education", subtype: "textbook"
    - Lecture notes → category: "education", subtype: "lecture_notes"
    - Homework/assignment → category: "education", subtype: "assignment"
    - Essay → category: "education", subtype: "essay"
    - Lab report → category: "education", subtype: "lab_report"

14. CERTIFICATION DOCUMENTS (Professional credentials):
    - Professional license (medical, law, CPA, etc.) → category: "certification", subtype: "professional_license"
    - Certification → category: "certification", subtype: "certification"
    - Training certificate → category: "certification", subtype: "training_certificate"

15. CORRESPONDENCE (Letters, communications):
    - Letter → category: "correspondence", subtype: "letter"
    - Email (printed) → category: "correspondence", subtype: "email"
    - Memo → category: "correspondence", subtype: "memo"
    - Notice → category: "correspondence", subtype: "notice"
    - Marketing/solicitation → category: "correspondence", subtype: "solicitation"
    - Newsletter → category: "correspondence", subtype: "newsletter"

16. VEHICLE DOCUMENTS (Automotive):
    - Vehicle title → category: "vehicle", subtype: "vehicle_title"
    - Vehicle registration → category: "vehicle", subtype: "vehicle_registration"
    - Service/maintenance record → category: "vehicle", subtype: "service_record"
    - Repair receipt → category: "vehicle", subtype: "repair_receipt"
    - Auto loan documents → category: "vehicle", subtype: "loan_documents"
    - Vehicle bill of sale → category: "vehicle", subtype: "bill_of_sale"

17. TRAVEL DOCUMENTS:
    - Flight itinerary/booking → category: "travel", subtype: "flight_itinerary"
    - Hotel booking → category: "travel", subtype: "hotel_booking"
    - Car rental → category: "travel", subtype: "car_rental"
    - Boarding pass → category: "travel", subtype: "boarding_pass"

18. PERSONAL DOCUMENTS:
    - Personal letter → category: "personal", subtype: "personal_letter"
    - Pet records → category: "personal", subtype: "pet_record"
    - Membership card → category: "personal", subtype: "membership"
    - Award/achievement → category: "personal", subtype: "award"

19. TECHNICAL DOCUMENTS:
    - User manual → category: "technical", subtype: "user_manual"
    - Product specification → category: "technical", subtype: "specification"
    - Software license → category: "technical", subtype: "software_license"

20. OTHER (ONLY as last resort - avoid if possible):
    - ONLY use "other" if document genuinely doesn't fit ANY category above
    - Do NOT use "other" just because you're unsure - make your best guess
    - Common mistakes to avoid:
      * "Final-Chapter" or "Chapter-X" filenames → education/book_chapter (NOT other)
      * Word documents with text content → correspondence/letter or business/report (NOT other)
      * PDF with academic content → education category (NOT other)
      * Any document with recognizable text → try to match content to a category

=============================================================================
INDUSTRY-SPECIFIC CLASSIFICATION GUIDE:
=============================================================================

REAL ESTATE TRANSACTIONS:
- Purchase contracts, sales agreements, PSA → property/purchase_agreement
- Deed, warranty deed, quit-claim deed, grant deed → property/deed
- Title insurance policy, title commitment → property/title_insurance
- Closing disclosure, HUD-1, settlement statement → property/closing_disclosure
- Property appraisal report → property/appraisal
- Home inspection report → property/inspection_report
- Land survey, plat, boundary survey → property/property_survey
- Escrow instructions, escrow documents → property/escrow
- HOA documents, CCR, covenants → property/hoa_documents
- MLS listing sheet → property/listing
- Seller disclosure, property disclosure → property/disclosure
- Lease, rental agreement → legal/lease
- Property tax bill, tax assessment → tax/property_tax

ACCOUNTING & TAX DOCUMENTS:
- Form 1040, individual tax return → tax/tax_return
- Form 1120, 1120S, corporate return → tax/corporate_tax
- Form 1065, partnership return → tax/partnership_tax
- Form 990, nonprofit return → tax/nonprofit_tax
- Schedule K-1 → tax/k1
- W-2 wage statement → tax/w2
- 1099 forms (NEC, MISC, INT, DIV) → tax/1099
- Balance sheet, statement of position → financial/balance_sheet
- P&L, profit & loss, income statement → financial/profit_loss
- Cash flow statement → financial/cash_flow
- Trial balance report → financial/trial_balance
- General ledger, GL → financial/general_ledger
- Bank reconciliation → financial/bank_reconciliation
- AR aging, receivables aging → financial/ar_aging
- AP aging, payables aging → financial/ap_aging
- Depreciation schedule, fixed assets → financial/depreciation
- Payroll report, Form 941 → financial/payroll
- Audit report, audited financials → financial/audit_report

LAW FIRM DOCUMENTS:
- Retainer agreement, engagement letter → legal/retainer
- Power of attorney, POA, durable POA → legal/power_of_attorney
- Will, last will and testament → legal/will
- Trust document, living trust, revocable trust → legal/trust
- Contract, agreement → legal/contract
- NDA, non-disclosure, confidentiality agreement → legal/nda
- Affidavit, sworn statement → legal/affidavit
- Subpoena → legal/subpoena
- Court filing, motion, brief, pleading, complaint → legal/court_document
- Judgment, court order, decree → legal/judgment
- Settlement agreement, release → legal/settlement
- Deposition transcript → legal/deposition
- Discovery, interrogatories, production request → legal/discovery
- Non-compete, restrictive covenant → legal/non_compete
- Corporate minutes, board minutes → business/meeting_notes
- Articles of incorporation → business/articles_of_incorporation
- Operating agreement, LLC agreement → business/operating_agreement
- Bylaws, corporate bylaws → business/bylaws
- Shareholder agreement → business/shareholder_agreement

=============================================================================
⚠️ CRITICAL MISCLASSIFICATION WARNINGS - READ CAREFULLY:
=============================================================================
NEVER misclassify these document types:

❌ WRONG: "28 Dias M2 2025" filename → education (thinking M2 = Module 2)
✅ CORRECT: "28 Dias" = 28-day contract → legal/contract (M2 = Month 2 or modification, NOT module!)

❌ WRONG: Filename with "Días" or "Dias" + person name → education
✅ CORRECT: "X Días/Dias" pattern = employment contract → legal/contract

❌ WRONG: PDF with academic/research content → identity/id_card
✅ CORRECT: PDF with academic/research content → education/research_paper, education/thesis, education/academic_paper

❌ WRONG: Document with chapters, sections, references → identity
✅ CORRECT: Document with chapters, sections, references → education/book_chapter, education/textbook

❌ WRONG: Any text document → identity/id_card
✅ CORRECT: Text documents are usually education, business, correspondence, or legal

IDENTITY documents must show:
- Physical card format (credit card size)
- Photo of a person
- Government seals/logos
- ID numbers, DOB, expiration dates
- DMV, State Department, or government agency branding

If you don't see these features, it's NOT an identity document!

=============================================================================
FILENAME HINTS - Use these to help classify:
=============================================================================
⚠️ CONTRACT DETECTION (HIGH PRIORITY - check these FIRST):
- "28 Dias", "90 Dias", "180 Dias", "[number] Dias/Días" → legal/contract (Mexican employment contract, NOT education!)
- "Contrato" → legal/contract
- "Contract", "Agreement" → legal/contract or legal/agreement
- "M1", "M2", "M3" with "Dias" = Month/Modification in contract, NOT Module

Other filename hints:
- "Chapter", "Final-Chapter", "Ch1", "Ch2" → education/book_chapter
- "Thesis", "Dissertation" → education/thesis
- "Report", "Annual Report" → business/report or education/project_report
- "Invoice", "INV" → invoice/invoice
- "Receipt" → expense/receipt
- "Letter", "Notice" → correspondence/letter or correspondence/notice
- "Statement" → could be financial/bank_statement or invoice/statement_of_account
- "Resume", "CV" → employment/resume (add this if not exists)
- "Policy" → insurance or business/policy

=============================================================================
EXPIRATION DATE EXTRACTION RULES:
=============================================================================
- Look for: "EXP", "EXPIRES", "VALID UNTIL", "VALID THROUGH", "EXPIRY", "END DATE", "VALID THRU"
- Driver's License: "EXP" field
- Passport: "Date of expiry" field
- Insurance: "Valid Through", "Coverage End", "Effective dates"
- Contracts: End date, termination date
- Certifications: Expiration date, renewal date
- EXTRACT EXACT DATE - do not guess
- Format: YYYY-MM-DD (e.g., "08/15/2027" → "2027-08-15")
- 2-digit years: assume 20XX (e.g., "01/15/27" → "2027-01-15")
- Return null if no clear expiration date exists
- Most correspondence, receipts, and general documents have NO expiration - return null

=============================================================================
DUE DATE EXTRACTION RULES:
=============================================================================
- Look for: "DUE", "DUE DATE", "DUE BY", "PAYMENT DUE", "PAY BY", "DEADLINE", "FILING DEADLINE", "MUST BE RECEIVED BY", "PAYABLE BY"
- Invoices: "Payment Due", "Due Date", "Net 30/60/90", "Terms: Net 30"
- Tax documents: "Filing Deadline", "Due Date", "Must be postmarked by", "Tax Due"
- Bills: "Due Date", "Payment Due By", "Pay Before", "Amount Due By"
- Contracts: "Deadline", "Completion Date", "Delivery Date", "Performance Date"
- Credit cards: "Payment Due Date", "Minimum Payment Due"
- Rent/Lease: "Rent Due", "Monthly Payment Due"
- IMPORTANT: Due date is DIFFERENT from expiration date
  - Expiration = when document/ID becomes invalid
  - Due date = when payment/action is required
- EXTRACT EXACT DATE - do not guess
- Format: YYYY-MM-DD (e.g., "01/15/2025" → "2025-01-15")
- 2-digit years: assume 20XX (e.g., "01/15/25" → "2025-01-15")
- Return null if no clear due date exists
- Identity documents (license, passport) typically have NO due date - return null

=============================================================================
DOCUMENT DATE EXTRACTION FOR FINANCIAL DOCUMENTS:
=============================================================================
⚠️ CRITICAL: For financial, tax, invoice, expense, income documents, and legal contracts:
You MUST extract the document date (issueDate) from the document content and use that year
in the folder path, NOT the current year. This ensures documents are organized by the year
they relate to, not when they were uploaded.

WHERE TO LOOK FOR DATES:
- Tax returns: Look for "Tax Year", "For Year", "Year", "Filing Date", "Tax Year Ending"
  Example: "Tax Year 2022" or "For the year ended December 31, 2022" → issueDate: "2022-12-31"
- Invoices: Look for "Invoice Date", "Date", "Issue Date", "Billing Date", "Date Issued"
  Example: "Invoice Date: 03/15/2023" → issueDate: "2023-03-15"
- Receipts: Look for "Date", "Transaction Date", "Purchase Date", "Date of Purchase"
  Example: "Date: October 5, 2022" → issueDate: "2022-10-05"
- Bank statements: Look for "Statement Period", "Statement Date", "For Period", "Period Ending"
  Example: "Statement Period: January 2023" → issueDate: "2023-01-01" (use start of period)
- Contracts: Look for "Effective Date", "Date", "Signed Date", "Execution Date", "Date of Agreement", 
  "Fecha de Inicio" (Spanish), "Fecha de Firma" (Spanish), "Fecha" (Spanish), date headers, 
  contract date, agreement date, any date field in the document header or first page
  Example: "Effective Date: June 1, 2021" → issueDate: "2021-06-01"
  Example: "Fecha: 15 de enero de 2025" → issueDate: "2025-01-15"
  Example: Contract header showing "Date: 2025-01-15" → issueDate: "2025-01-15"
  IMPORTANT: Contracts almost always have a date - look carefully in headers, first page, signature area
- W-2/1099 forms: Look for "Tax Year", "Year", "For Year", "Calendar Year"
  Example: "Tax Year 2022" → issueDate: "2022-01-01" (use year start)
- Bills/Statements: Look for "Statement Date", "Billing Date", "Period"
  Example: "Billing Period: November 2023" → issueDate: "2023-11-01"

EXTRACTION RULES:
- ALWAYS scan the entire document for dates - don't just look at one section
- Check document headers, footers, first page, signature areas, and date fields
- Extract the FULL date (YYYY-MM-DD format) when possible
- If only year is visible, use YYYY-01-01 (first day of year)
- If month and year are visible, use YYYY-MM-01 (first day of month)
- The issueDate should represent when the document was created/issued, not when it expires or is due
- For tax documents, use the tax year, not the filing date
- For statements, use the statement period date, not the current date
- For contracts, prefer the effective date or signed date over any other date
- If multiple dates are found, use the most relevant one (effective date > signed date > any other date)
- DO NOT return null unless you have thoroughly searched the document and found NO dates

FOLDER PATH YEAR:
- When suggesting folder paths for financial documents, use the YEAR from issueDate, not current year
- Example: If issueDate is "2022-04-15" and current year is 2026, use "2022" in folder path
- Example folder path: ["Financial", "2022", "Invoices"] NOT ["Financial", "2026", "Invoices"]
- This ensures a 2022 tax return goes into a 2022 folder, not a 2026 folder

FORMAT:
- Return issueDate in metadata as YYYY-MM-DD format
- If date cannot be extracted, return null (system will use current year as fallback)

=============================================================================
FILENAME FORMAT:
=============================================================================
{DocumentType}_{Identifier}_{Date}
Examples:
- DriversLicense_JohnSmith_2025
- BankStatement_Chase_Dec2024
- TaxReturn_2023
- Invoice_Acme_INV12345
- Receipt_Amazon_Oct2024
- Contract_ClientName_2025
- Passport_JaneSmith_2030

=============================================================================
FOLDER PATH STRUCTURE:
=============================================================================
Personal Documents / {Category} / {Year} / {Subtype Folder}

Examples:
- Personal Documents / Identity / 2025 / Driver Licenses
- Personal Documents / Financial / 2024 / Bank Statements
- Personal Documents / Tax Documents / 2023 / Tax Returns
- Personal Documents / Medical / 2024 / Lab Results
- Personal Documents / Insurance / 2025 / Auto Insurance
- Personal Documents / Legal / 2024 / Contracts
- Personal Documents / Property / 2024 / Mortgages
- Personal Documents / Vehicles / 2025 / Registrations
- Personal Documents / Education / 2024 / Transcripts
- Personal Documents / Correspondence / 2025 / Letters

=============================================================================
STRICT FOLDER MATCHING RULES:
=============================================================================
- ONLY match existing folder if document subtype EXACTLY matches
- NEVER put document in wrong folder just because it exists
- Driver's License → "Driver Licenses" folder ONLY
- Passport → "Passports" folder ONLY
- Bank Statement → "Bank Statements" folder ONLY
- If no exact match exists, suggest NEW folder path

Return ONLY valid JSON, no markdown or extra text.`
}

// Build the user prompt with document context
export function buildAnalysisPrompt(
  fileName: string,
  vaultContext: VaultContext,
  existingFolders: ExistingFolderInfo[],
  orgCustomCategories?: string[]
): string {
  const year = new Date().getFullYear().toString()

  // Format existing folders for the prompt
  const folderList = existingFolders.length > 0
    ? existingFolders.map(f => `- ID: "${f.id}" | Path: "${f.path}"`).join('\n')
    : 'No existing folders'

  // Build folder structure guidance based on vault context
  const folderStructure = vaultContext === 'personal'
    ? `Personal Documents / {Category} / {Year} / {Subtype}
Examples (use document year for financial documents, current year for others):
- Personal Documents / Identity / ${year} / Driver Licenses
- Personal Documents / Financial / {DocumentYear} / Bank Statements (use year from document, e.g., 2022 if document is from 2022)
- Personal Documents / Tax Documents / {DocumentYear} / Tax Returns (use tax year from document, e.g., 2023 if tax year is 2023)
- Personal Documents / Medical / ${year} / Lab Results
- Personal Documents / Insurance / ${year} / Auto Insurance
- Personal Documents / Legal / {DocumentYear} / Contracts (use contract date year if available)
- Personal Documents / Employment / ${year} / Offer Letters
- Personal Documents / Vehicles / ${year} / Registrations`
    : `{Category} / {Year} / {Subtype}
Examples (use document year for financial documents, current year for others):
- Identity / ${year} / Driver Licenses
- Financial / {DocumentYear} / Invoices (use year from invoice date, e.g., 2022 if invoice is from 2022)
- Tax Documents / {DocumentYear} / W-2 Forms (use tax year from form, e.g., 2023 if tax year is 2023)
- Employment / ${year} / Contracts
${orgCustomCategories?.length ? `\nOrganization custom categories: ${orgCustomCategories.join(', ')}` : ''}`

  return `Analyze this document image.

Original filename: "${fileName}"
Vault type: ${vaultContext}
Current year: ${year}

⚠️ CRITICAL: DOCUMENT DATE EXTRACTION FOR FINANCIAL DOCUMENTS AND CONTRACTS:
For financial, tax, invoice, expense, income documents, and contracts:
- You MUST extract the document date (issueDate) from the ACTUAL DOCUMENT CONTENT
- DO NOT rely on the filename - extract from the document text/image itself
- Scan the entire document: headers, first page, signature areas, date fields
- Look for date labels like "Date:", "Fecha:", "Effective Date", "Fecha de Inicio", etc.
- Use the YEAR from issueDate in the folder path, NOT the current year
- Example: If document shows "Effective Date: January 15, 2022", extract issueDate: "2022-01-15" and use "2022" in folder path, not "${year}"
- This ensures documents are organized by the year they relate to, not when uploaded
- If you cannot find ANY date in the document after thorough scanning, return null for issueDate
- DO NOT return null just because it's difficult - contracts and financial documents almost always have dates

EXISTING FOLDERS (try to match to one of these if appropriate):
${folderList}

FOLDER STRUCTURE TO USE:
${folderStructure}

=============================================================================
FOLDER MATCHING RULES - CRITICAL:
=============================================================================
⚠️ EACH DOCUMENT TYPE MUST GO TO ITS CORRECT SPECIFIC FOLDER!

STRICT TYPE MATCHING:
- Driver's License → "Driver Licenses" folder ONLY (never "Passports", "Identity")
- Passport → "Passports" folder ONLY
- Birth Certificate → "Birth Certificates" folder ONLY
- Bank Statement → "Bank Statements" folder ONLY
- Credit Card Statement → "Credit Card Statements" folder ONLY
- Tax Return → "Tax Returns" folder ONLY
- W-2 → "W-2 Forms" folder ONLY
- 1099 → "1099 Forms" folder ONLY
- Pay Stub → "Pay Stubs" folder ONLY
- Receipt → "Receipts" folder ONLY
- Invoice → "Invoices" folder ONLY
- Medical Record → "Medical Records" folder ONLY
- Lab Results → "Lab Results" folder ONLY
- Prescription → "Prescriptions" folder ONLY
- Health Insurance → "Health Insurance" folder ONLY
- Auto Insurance → "Auto Insurance" folder ONLY
- Life Insurance → "Life Insurance" folder ONLY
- Contract → "Contracts" folder ONLY
- Lease → "Leases" folder ONLY
- Deed → "Deeds" folder ONLY
- Mortgage → "Mortgages" folder ONLY
- Vehicle Title → "Vehicle Titles" folder ONLY
- Vehicle Registration → "Registrations" folder ONLY
- Transcript → "Transcripts" folder ONLY
- Diploma → "Diplomas" folder ONLY
- Letter → "Letters" or "Correspondence" folder ONLY

ACCEPTABLE NAME VARIATIONS:
- "Driver License" = "Driver Licenses" = "Drivers License"
- "Passport" = "Passports"
- "Receipt" = "Receipts"
- "Invoice" = "Invoices"
- "Bank Statement" = "Bank Statements"
- "Tax Return" = "Tax Returns"
- "Contract" = "Contracts"

IF NO EXACT MATCH EXISTS:
- DO NOT use a similar but wrong folder
- Suggest a NEW folder path with the correct subtype name
- Example: Passport but only "Driver Licenses" exists → suggest ["Personal Documents", "Identity", "${year}", "Passports"]

=============================================================================
FILENAME FORMAT:
=============================================================================
{DocumentType}_{Identifier}_{Date}
Examples:
- DriversLicense_JohnSmith_2025
- BankStatement_Chase_Dec2024
- TaxReturn_Federal_2023
- W2_Employer_2024
- Receipt_Amazon_Oct2024
- Invoice_Acme_INV12345
- Contract_ClientName_2025
- HealthInsurance_BlueCross_2025

=============================================================================
EXPIRATION DATE EXTRACTION:
=============================================================================
- Driver's License: "EXP" field
- Passport: "Date of expiry" field
- Insurance: "Valid Through", "Effective Until", date range
- Contracts: End date, termination date
- Certifications: Expiration/renewal date
- Format: YYYY-MM-DD (e.g., "08/15/2027" → "2027-08-15")
- Return null if no expiration exists (most documents don't have one)

=============================================================================
DUE DATE EXTRACTION:
=============================================================================
- Invoices: "Payment Due", "Due Date", "Net 30/60/90"
- Tax documents: "Filing Deadline", "Due Date", "Must be postmarked by"
- Bills: "Due Date", "Payment Due By", "Pay Before"
- Credit cards: "Payment Due Date", "Minimum Payment Due"
- Contracts: "Deadline", "Completion Date", "Delivery Date"
- Format: YYYY-MM-DD (e.g., "01/15/2025" → "2025-01-15")
- Return null if no due date exists
- Note: Due date is when payment/action is required, NOT when document expires

Analyze the image and return the JSON response.`
}

// Prompt for batch analysis (summarized context)
export function buildBatchAnalysisPrompt(
  documents: { fileName: string; index: number }[],
  vaultContext: VaultContext,
  existingFolders: ExistingFolderInfo[]
): string {
  const fileList = documents
    .map(d => `${d.index + 1}. "${d.fileName}"`)
    .join('\n')

  const folderList = existingFolders.length > 0
    ? existingFolders.slice(0, 20).map(f => `"${f.path}"`).join(', ')
    : 'None'

  return `Analyze these ${documents.length} documents and return a JSON array with analysis for each.

Documents:
${fileList}

Existing folders: ${folderList}
Vault type: ${vaultContext}

Return an array of analysis results in the same order as the documents listed above.`
}

// Helper to validate OpenAI response structure
export function validateAnalysisResponse(response: unknown): boolean {
  if (!response || typeof response !== 'object') return false

  const r = response as Record<string, unknown>

  // Check required fields
  if (!r.classification || typeof r.classification !== 'object') return false
  if (!r.suggestedFilename || typeof r.suggestedFilename !== 'string') return false
  if (!r.folderMatch || typeof r.folderMatch !== 'object') return false

  const classification = r.classification as Record<string, unknown>
  if (!classification.category || !classification.subtype) return false
  if (typeof classification.confidence !== 'number') return false

  const folderMatch = r.folderMatch as Record<string, unknown>
  // Allow suggestedPath to be null or an array (OpenAI sometimes returns null when matching existing folder)
  if (folderMatch.suggestedPath !== null && !Array.isArray(folderMatch.suggestedPath)) return false

  return true
}

// Helper to sanitize filename suggestion
export function sanitizeFilename(filename: string, extension: string): string {
  // Remove any invalid characters
  let sanitized = filename
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/\s+/g, '_')
    .trim()

  // Ensure reasonable length
  if (sanitized.length > 100) {
    sanitized = sanitized.substring(0, 100)
  }

  // Add extension if not present
  if (!sanitized.toLowerCase().endsWith(`.${extension.toLowerCase()}`)) {
    sanitized = `${sanitized}.${extension}`
  }

  return sanitized
}

// Helper to get file extension from filename
export function getExtensionFromFilename(filename: string): string {
  const parts = filename.split('.')
  return parts.length > 1 ? (parts[parts.length - 1] ?? '').toLowerCase() : ''
}

// Export constants for use elsewhere
export { DOCUMENT_CATEGORIES, DOCUMENT_SUBTYPES, FOLDER_NAMES }

// Helper to get folder name for a category or subtype
export function getFolderName(key: string): string {
  return FOLDER_NAMES[key] || key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}
