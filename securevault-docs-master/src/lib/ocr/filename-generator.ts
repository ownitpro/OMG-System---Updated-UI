// Filename Generator
// Generates smart filename suggestions based on OCR classification and metadata

import type {
  ClassificationResult,
  ExtractedMetadata,
  DocumentCategory,
  DocumentSubtype,
} from '@/types/ocr';

// ============================================================================
// TYPES
// ============================================================================

export interface SuggestedFilename {
  suggested: string;           // e.g., "Driver License - John Doe - Exp 2025"
  original: string;            // e.g., "IMG_20231215.jpg"
  hasGoodName: boolean;        // true if original name is descriptive
  confidence: number;          // 0-1 confidence in suggestion
  components: {                // What made up the suggestion
    documentType?: string;
    personName?: string;
    date?: string;
    vendor?: string;
    amount?: string;
    documentNumber?: string;
  };
}

// ============================================================================
// CONFIGURATION
// ============================================================================

// Generic filename patterns that indicate a non-descriptive name
const GENERIC_PATTERNS = [
  /^IMG[_-]?\d/i,
  /^DSC[_-]?\d/i,
  /^DCIM/i,
  /^Screenshot/i,
  /^Photo/i,
  /^Image/i,
  /^Scan[_-]?\d/i,
  /^Document[_-]?\d/i,
  /^File[_-]?\d/i,
  /^Untitled/i,
  /^[A-Z]{2,4}[_-]\d{4,}/i, // Camera codes like "DSCN_1234"
  /^\d{8,}/,                  // Just numbers like timestamps
  /^[0-9a-f]{8,}/i,           // Hash-like names
];

// Document type to readable name mapping
const DOCUMENT_TYPE_NAMES: Partial<Record<DocumentSubtype, string>> = {
  drivers_license: 'Driver License',
  passport: 'Passport',
  id_card: 'ID Card',
  birth_certificate: 'Birth Certificate',
  social_security: 'Social Security Card',
  bank_statement: 'Bank Statement',
  tax_document: 'Tax Document',
  w2: 'W-2',
  '1099': '1099 Form',
  investment_report: 'Investment Report',
  pay_stub: 'Pay Stub',
  medical_record: 'Medical Record',
  prescription: 'Prescription',
  insurance_card: 'Insurance Card',
  lab_results: 'Lab Results',
  contract: 'Contract',
  deed: 'Property Deed',
  will: 'Will',
  court_document: 'Court Document',
  power_of_attorney: 'Power of Attorney',
  receipt: 'Receipt',
  invoice: 'Invoice',
  bill: 'Bill',
  purchase_order: 'Purchase Order',
  general: 'Document',
  unknown: 'Document',
};

const CATEGORY_NAMES: Record<DocumentCategory, string> = {
  identity: 'ID Document',
  financial: 'Financial Document',
  medical: 'Medical Document',
  legal: 'Legal Document',
  expense: 'Expense',
  invoice: 'Invoice',
  contract: 'Contract',
  report: 'Report',
  correspondence: 'Correspondence',
  other: 'Document',
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if a filename is generic (not descriptive)
 */
export function isGenericFilename(filename: string): boolean {
  // Remove extension for checking
  const nameWithoutExt = filename.replace(/\.[^.]+$/, '');

  // Check against generic patterns
  for (const pattern of GENERIC_PATTERNS) {
    if (pattern.test(nameWithoutExt)) {
      return true;
    }
  }

  // Check if it's mostly numbers/special chars (less than 3 letter sequences)
  const letterSequences = nameWithoutExt.match(/[a-zA-Z]{3,}/g);
  if (!letterSequences || letterSequences.length === 0) {
    return true;
  }

  return false;
}

/**
 * Get file extension from filename
 */
function getExtension(filename: string): string {
  const match = filename.match(/\.[^.]+$/);
  return match ? match[0] : '';
}

/**
 * Format date for filename
 */
function formatDateForFilename(dateStr: string | undefined): string | undefined {
  if (!dateStr) return undefined;

  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return undefined;

    // Format as "Jan 2025" or "2025" depending on precision
    const year = date.getFullYear();
    const month = date.toLocaleDateString('en-US', { month: 'short' });

    return `${month} ${year}`;
  } catch {
    return undefined;
  }
}

/**
 * Format expiration year for filename
 */
function formatExpirationYear(dateStr: string | undefined): string | undefined {
  if (!dateStr) return undefined;

  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return undefined;
    return date.getFullYear().toString();
  } catch {
    return undefined;
  }
}

/**
 * Sanitize string for use in filename
 */
function sanitizeForFilename(str: string): string {
  return str
    .replace(/[\/\\:*?"<>|]/g, '') // Remove invalid chars
    .replace(/\s+/g, ' ')          // Normalize whitespace
    .trim()
    .slice(0, 50);                 // Limit length
}

/**
 * Format currency amount
 */
function formatAmount(amount: string | undefined): string | undefined {
  if (!amount) return undefined;

  // Remove currency symbols and clean up
  const cleaned = amount.replace(/[$€£¥,]/g, '').trim();
  const num = parseFloat(cleaned);

  if (isNaN(num)) return amount;

  // Format nicely
  return `$${num.toFixed(2)}`;
}

// ============================================================================
// FILENAME GENERATOR CLASS
// ============================================================================

export class FilenameGenerator {
  /**
   * Generate suggested filename based on classification and metadata
   */
  generateSuggestedName(
    classification: ClassificationResult,
    metadata: ExtractedMetadata,
    originalFilename: string
  ): SuggestedFilename {
    const extension = getExtension(originalFilename);
    const hasGoodName = !isGenericFilename(originalFilename);
    const components: SuggestedFilename['components'] = {};

    let suggestedParts: string[] = [];
    let confidence = classification.confidence;

    // Get document type name
    const typeName = DOCUMENT_TYPE_NAMES[classification.subtype] ||
                     CATEGORY_NAMES[classification.category] ||
                     'Document';
    components.documentType = typeName;
    suggestedParts.push(typeName);

    // Add type-specific components
    switch (classification.category) {
      case 'identity':
        suggestedParts = this.buildIdentityFilename(metadata, typeName, components);
        break;

      case 'financial':
        suggestedParts = this.buildFinancialFilename(metadata, typeName, classification.subtype, components);
        break;

      case 'medical':
        suggestedParts = this.buildMedicalFilename(metadata, typeName, components);
        break;

      case 'expense':
      case 'invoice':
        suggestedParts = this.buildExpenseFilename(metadata, typeName, components);
        break;

      case 'legal':
      case 'contract':
        suggestedParts = this.buildLegalFilename(metadata, typeName, components);
        break;

      default:
        suggestedParts = this.buildGenericFilename(metadata, typeName, components);
    }

    // Build final suggested name
    const suggested = suggestedParts
      .filter(Boolean)
      .join(' - ')
      .slice(0, 100) + extension;

    // Reduce confidence if few components matched
    const componentCount = Object.values(components).filter(Boolean).length;
    if (componentCount <= 1) {
      confidence = Math.min(confidence, 0.5);
    }

    return {
      suggested,
      original: originalFilename,
      hasGoodName,
      confidence,
      components,
    };
  }

  /**
   * Build filename for identity documents
   */
  private buildIdentityFilename(
    metadata: ExtractedMetadata,
    typeName: string,
    components: SuggestedFilename['components']
  ): string[] {
    const parts = [typeName];

    // Add person's name
    if (metadata.fullName) {
      components.personName = sanitizeForFilename(metadata.fullName);
      parts.push(components.personName);
    }

    // Add expiration year
    if (metadata.expirationDate) {
      const expYear = formatExpirationYear(metadata.expirationDate);
      if (expYear) {
        components.date = `Exp ${expYear}`;
        parts.push(components.date);
      }
    }

    return parts;
  }

  /**
   * Build filename for financial documents
   */
  private buildFinancialFilename(
    metadata: ExtractedMetadata,
    typeName: string,
    subtype: DocumentSubtype,
    components: SuggestedFilename['components']
  ): string[] {
    const parts: string[] = [];

    // For bank statements, lead with institution
    if (subtype === 'bank_statement' && metadata.institution) {
      components.vendor = sanitizeForFilename(metadata.institution);
      parts.push(components.vendor);
      parts.push('Statement');
    } else {
      parts.push(typeName);
    }

    // Add period if available
    if (metadata.period) {
      components.date = sanitizeForFilename(metadata.period);
      parts.push(components.date);
    } else if (metadata.documentDate) {
      const formattedDate = formatDateForFilename(metadata.documentDate);
      if (formattedDate) {
        components.date = formattedDate;
        parts.push(formattedDate);
      }
    }

    return parts;
  }

  /**
   * Build filename for medical documents
   */
  private buildMedicalFilename(
    metadata: ExtractedMetadata,
    typeName: string,
    components: SuggestedFilename['components']
  ): string[] {
    const parts = [typeName];

    // Add person's name
    if (metadata.fullName) {
      components.personName = sanitizeForFilename(metadata.fullName);
      parts.push(components.personName);
    }

    // Add date
    if (metadata.documentDate) {
      const formattedDate = formatDateForFilename(metadata.documentDate);
      if (formattedDate) {
        components.date = formattedDate;
        parts.push(formattedDate);
      }
    }

    return parts;
  }

  /**
   * Build filename for expense/invoice documents
   */
  private buildExpenseFilename(
    metadata: ExtractedMetadata,
    typeName: string,
    components: SuggestedFilename['components']
  ): string[] {
    const parts = [typeName];

    // Add vendor
    if (metadata.vendor) {
      components.vendor = sanitizeForFilename(metadata.vendor);
      parts.push(components.vendor);
    }

    // Add amount
    if (metadata.amount) {
      components.amount = formatAmount(metadata.amount);
      if (components.amount) {
        parts.push(components.amount);
      }
    }

    // Add date
    if (metadata.documentDate) {
      const formattedDate = formatDateForFilename(metadata.documentDate);
      if (formattedDate) {
        components.date = formattedDate;
        parts.push(formattedDate);
      }
    }

    return parts;
  }

  /**
   * Build filename for legal documents
   */
  private buildLegalFilename(
    metadata: ExtractedMetadata,
    typeName: string,
    components: SuggestedFilename['components']
  ): string[] {
    const parts = [typeName];

    // Add client/company name
    if (metadata.clientName) {
      components.personName = sanitizeForFilename(metadata.clientName);
      parts.push(components.personName);
    } else if (metadata.companyName) {
      components.personName = sanitizeForFilename(metadata.companyName);
      parts.push(components.personName);
    }

    // Add date
    if (metadata.documentDate) {
      const formattedDate = formatDateForFilename(metadata.documentDate);
      if (formattedDate) {
        components.date = formattedDate;
        parts.push(formattedDate);
      }
    }

    return parts;
  }

  /**
   * Build filename for generic documents
   */
  private buildGenericFilename(
    metadata: ExtractedMetadata,
    typeName: string,
    components: SuggestedFilename['components']
  ): string[] {
    const parts = [typeName];

    // Try to add any identifying info
    if (metadata.fullName) {
      components.personName = sanitizeForFilename(metadata.fullName);
      parts.push(components.personName);
    } else if (metadata.vendor) {
      components.vendor = sanitizeForFilename(metadata.vendor);
      parts.push(components.vendor);
    } else if (metadata.clientName) {
      components.personName = sanitizeForFilename(metadata.clientName);
      parts.push(components.personName);
    }

    // Add date
    if (metadata.documentDate) {
      const formattedDate = formatDateForFilename(metadata.documentDate);
      if (formattedDate) {
        components.date = formattedDate;
        parts.push(formattedDate);
      }
    }

    return parts;
  }
}

// Export singleton instance
export const filenameGenerator = new FilenameGenerator();

// Export convenience function
export function generateSuggestedFilename(
  classification: ClassificationResult,
  metadata: ExtractedMetadata,
  originalFilename: string
): SuggestedFilename {
  return filenameGenerator.generateSuggestedName(classification, metadata, originalFilename);
}
