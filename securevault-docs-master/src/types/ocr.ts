// OCR Types for SecureVault Docs
// Defines all types used in the OCR processing pipeline

// Document categories for classification - comprehensive list for AI sorting
export type DocumentCategory =
  | 'identity'
  | 'financial'
  | 'tax'
  | 'income'
  | 'expense'
  | 'invoice'
  | 'medical'
  | 'insurance'
  | 'legal'
  | 'property'
  | 'business'
  | 'employment'
  | 'education'
  | 'certification'
  | 'correspondence'
  | 'vehicle'
  | 'personal'
  | 'travel'
  | 'technical'
  | 'needs_review' // For photos, uncertain documents, and items requiring manual classification
  | 'other';

// Document subtypes for more specific classification - comprehensive list
export type DocumentSubtype =
  // Identity
  | 'drivers_license' | 'passport' | 'id_card' | 'birth_certificate' | 'social_security'
  | 'citizenship' | 'green_card' | 'visa' | 'marriage_certificate' | 'death_certificate'
  | 'name_change' | 'adoption_papers'
  // Financial
  | 'bank_statement' | 'credit_card_statement' | 'loan_document' | 'mortgage_document'
  | 'investment_report' | 'retirement_statement' | '401k' | 'ira' | 'brokerage'
  | 'stock_certificate' | 'bond' | 'cryptocurrency' | 'wire_transfer' | 'check' | 'direct_deposit'
  // Tax
  | 'w2' | '1099' | 'tax_return' | '1040' | 'schedule_c' | 'schedule_d' | 'w4' | 'w9'
  | 'state_tax' | 'property_tax' | 'estimated_tax' | 'tax_payment' | 'tax_refund'
  | 'irs_notice' | 'tax_transcript' | 'amended_return'
  // Income
  | 'pay_stub' | 'paycheck' | 'salary_statement' | 'bonus' | 'commission' | 'severance'
  | 'unemployment' | 'disability' | 'social_security_benefits' | 'pension' | 'annuity'
  | 'rental_income' | 'royalty' | 'dividend' | 'interest_income' | 'capital_gains'
  // Expense
  | 'receipt' | 'expense_report' | 'mileage_log' | 'business_expense' | 'travel_expense'
  | 'meal_receipt' | 'office_supplies' | 'equipment_purchase' | 'subscription'
  | 'membership_fee' | 'donation_receipt' | 'charitable_contribution'
  // Invoice
  | 'invoice' | 'bill' | 'utility_bill' | 'phone_bill' | 'internet_bill' | 'cable_bill'
  | 'water_bill' | 'gas_bill' | 'electric_bill' | 'credit_card_bill' | 'medical_bill'
  | 'tuition_bill' | 'rent_invoice' | 'purchase_order' | 'estimate' | 'quote' | 'pro_forma'
  // Medical
  | 'medical_record' | 'prescription' | 'lab_results' | 'xray' | 'mri' | 'ct_scan'
  | 'vaccination_record' | 'immunization' | 'allergy_record' | 'discharge_summary'
  | 'operative_report' | 'pathology_report' | 'referral' | 'prior_authorization'
  | 'dme_prescription' | 'mental_health_record' | 'therapy_notes' | 'dental_record'
  | 'vision_record' | 'hearing_test'
  // Insurance
  | 'insurance_card' | 'health_insurance' | 'dental_insurance' | 'vision_insurance'
  | 'life_insurance' | 'auto_insurance' | 'home_insurance' | 'renters_insurance'
  | 'umbrella_policy' | 'disability_insurance' | 'long_term_care' | 'pet_insurance'
  | 'travel_insurance' | 'insurance_claim' | 'eob' | 'coverage_summary' | 'declaration_page'
  // Legal
  | 'contract' | 'agreement' | 'deed' | 'title' | 'will' | 'trust' | 'power_of_attorney'
  | 'court_document' | 'lawsuit' | 'judgment' | 'settlement' | 'divorce_decree'
  | 'custody_agreement' | 'prenuptial' | 'nda' | 'non_compete' | 'release_form'
  | 'notarized_document' | 'affidavit' | 'subpoena' | 'cease_desist'
  // Property
  | 'mortgage' | 'home_appraisal' | 'property_survey' | 'hoa_document'
  | 'lease' | 'rental_agreement' | 'property_tax_bill' | 'home_inspection' | 'warranty_deed'
  | 'quit_claim' | 'closing_document' | 'escrow_statement' | 'home_warranty'
  // Business
  | 'business_license' | 'articles_of_incorporation' | 'operating_agreement' | 'bylaws'
  | 'partnership_agreement' | 'shareholder_agreement' | 'board_minutes' | 'resolution'
  | 'annual_report' | 'quarterly_report' | 'profit_loss' | 'balance_sheet' | 'cash_flow'
  | 'audit_report' | 'business_plan' | 'pitch_deck' | 'investor_agreement' | 'term_sheet'
  // Employment
  | 'offer_letter' | 'employment_contract' | 'employee_handbook' | 'performance_review'
  | 'termination_letter' | 'resignation_letter' | 'reference_letter' | 'recommendation'
  | 'background_check' | 'drug_test' | 'i9' | 'work_permit' | 'non_disclosure'
  | 'intellectual_property' | 'benefits_enrollment' | 'cobra' | 'severance_agreement'
  | 'resume' | 'cv' | 'cover_letter' | 'curriculum_vitae'
  // Education
  | 'transcript' | 'diploma' | 'degree' | 'report_card' | 'enrollment' | 'acceptance_letter'
  | 'financial_aid' | 'scholarship' | 'student_loan' | 'course_material' | 'syllabus'
  | 'thesis' | 'dissertation' | 'research_paper' | 'academic_paper'
  | 'book_chapter' | 'textbook' | 'lecture_notes' | 'assignment'
  | 'essay' | 'project_report' | 'lab_report' | 'continuing_education' | 'certification_exam'
  | 'gre_score' | 'sat_score' | 'act_score' | 'toefl'
  // Certification
  | 'professional_license' | 'certification' | 'accreditation' | 'credential'
  | 'training_certificate' | 'cpe_certificate' | 'award' | 'badge' | 'achievement'
  | 'completion_certificate'
  // Correspondence
  | 'letter' | 'email' | 'memo' | 'notice' | 'announcement' | 'invitation'
  | 'greeting_card' | 'thank_you' | 'sympathy' | 'rsvp'
  // Vehicle
  | 'vehicle_title' | 'registration' | 'bill_of_sale' | 'loan_payoff' | 'lien_release'
  | 'smog_certificate' | 'inspection_report' | 'repair_receipt' | 'maintenance_record'
  | 'warranty' | 'recall_notice' | 'accident_report'
  // Personal
  | 'photo' | 'family_photo' | 'portrait' | 'event_photo' | 'document_scan'
  | 'journal' | 'diary' | 'recipe' | 'family_tree' | 'genealogy' | 'obituary' | 'memorial'
  // Travel
  | 'itinerary' | 'boarding_pass' | 'hotel_reservation' | 'car_rental' | 'cruise_booking'
  | 'tour_confirmation' | 'visa_application' | 'travel_advisory'
  | 'vaccination_certificate' | 'covid_test' | 'travel_receipt'
  // Technical
  | 'user_manual' | 'installation_guide' | 'troubleshooting' | 'api_documentation'
  | 'code_documentation' | 'architecture_diagram' | 'network_diagram' | 'specification'
  | 'requirements' | 'test_plan' | 'bug_report' | 'release_notes' | 'changelog'
  // General
  | 'general' | 'unknown';

// Vault context for determining folder structure
export type VaultContext = 'personal' | 'organization';

// Classification result from document classifier
export interface ClassificationResult {
  category: DocumentCategory;
  subtype: DocumentSubtype;
  confidence: number;
  patterns: string[]; // Patterns that matched
  suggestedFolderPath: string[];
}

// Extracted metadata from documents
export interface ExtractedMetadata {
  // Common fields
  documentDate?: string;

  // Expense/Invoice fields
  vendor?: string;
  amount?: string;
  currency?: string;

  // Identity fields
  fullName?: string;
  dateOfBirth?: string;
  documentNumber?: string;
  expirationDate?: string;

  // Financial fields
  accountNumber?: string;
  institution?: string;
  period?: string;

  // Business fields
  clientName?: string;
  companyName?: string;
  invoiceNumber?: string;
  dueDate?: string;

  // Raw extracted text (truncated)
  rawText?: string;
}

// Textract analysis result
export interface TextractResult {
  success: boolean;
  text: string;
  confidence: number;
  blocks?: TextractBlock[];
  expenseFields?: ExpenseField[];
  error?: string;
  pageCount?: number; // Number of pages in the document (for PU tracking)
}

export interface TextractBlock {
  type: 'LINE' | 'WORD' | 'PAGE';
  text: string;
  confidence: number;
}

export interface ExpenseField {
  type: string;
  value: string;
  confidence: number;
}

// Rekognition result for ID documents
export interface RekognitionResult {
  success: boolean;
  labels: RekognitionLabel[];
  textDetections?: TextDetection[];
  idDocument?: IDDocumentResult;
  error?: string;
}

export interface RekognitionLabel {
  name: string;
  confidence: number;
}

export interface TextDetection {
  text: string;
  confidence: number;
  type: 'LINE' | 'WORD';
}

export interface IDDocumentResult {
  documentType: string;
  fields: Record<string, string>;
  confidence: number;
}

// Folder information after auto-creation
export interface TargetFolder {
  id: string;
  name: string;
  path: string;
  pathSegments: string[];
  created: boolean; // true if newly created
}

// Main OCR processing result
export interface OCRResult {
  success: boolean;
  documentId: string;

  // Classification
  classification: ClassificationResult;

  // Extracted data
  metadata: ExtractedMetadata;

  // Folder placement
  targetFolder: TargetFolder;

  // Processing stats
  processingTime: number;
  pagesProcessed: number;

  // Error info (if failed)
  error?: string;
  retryable?: boolean;
}

// OCR processing request
export interface OCRProcessRequest {
  documentId: string;
  s3Key: string;
  fileName: string;
  mimeType: string;
  vaultContext: VaultContext;
  personalVaultId?: string;
  organizationId?: string;
  userId: string;
}

// OCR processing status
export type OCRProcessingStatus =
  | 'pending'
  | 'extracting'
  | 'classifying'
  | 'creating_folders'
  | 'sorting'
  | 'completed'
  | 'failed';

// Real-time progress update
export interface OCRProgressUpdate {
  documentId: string;
  status: OCRProcessingStatus;
  progress: number; // 0-100
  message: string;
  result?: OCRResult;
}

// Batch OCR request
export interface BatchOCRRequest {
  documents: OCRProcessRequest[];
  vaultContext: VaultContext;
  personalVaultId?: string;
  organizationId?: string;
}

// Batch OCR result
export interface BatchOCRResult {
  totalDocuments: number;
  successful: number;
  failed: number;
  results: OCRResult[];
  totalPagesProcessed: number;
  totalProcessingTime: number;
}

// OCR usage info
export interface OCRUsageInfo {
  currentUsage: number;
  limit: number;
  remaining: number;
  resetDate: string;
  percentUsed: number;
}

// Manual override request
export interface ManualOverrideRequest {
  documentId: string;
  targetFolderId: string;
  category?: DocumentCategory;
  subtype?: DocumentSubtype;
  metadata?: Partial<ExtractedMetadata>;
}

// OCR configuration
export interface OCRConfig {
  confidenceThreshold: number;
  autoSortEnabled: boolean;
  maxPagesPerDocument: number;
  enableIdDetection: boolean;
  enableExpenseAnalysis: boolean;
}

// Default OCR configuration
export const DEFAULT_OCR_CONFIG: OCRConfig = {
  confidenceThreshold: 0.7,
  autoSortEnabled: true,
  maxPagesPerDocument: 10,
  enableIdDetection: true,
  enableExpenseAnalysis: true,
};
