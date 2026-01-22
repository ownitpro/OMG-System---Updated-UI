// Folder Path Builder
// Builds folder paths based on document classification and vault context

import type {
  DocumentCategory,
  DocumentSubtype,
  VaultContext,
  ClassificationResult,
  ExtractedMetadata,
} from '@/types/ocr';

// ============================================================================
// FOLDER PATH CONFIGURATIONS
// ============================================================================

// Personal vault folder structure
const PERSONAL_FOLDER_STRUCTURE: Record<DocumentCategory, string[]> = {
  identity: ['Personal Documents', 'Identity'],
  financial: ['Personal Documents', 'Financial'],
  medical: ['Personal Documents', 'Medical'],
  legal: ['Personal Documents', 'Legal'],
  expense: ['Expenses'],
  invoice: ['Invoices'],
  contract: ['Personal Documents', 'Legal', 'Contracts'],
  report: ['Personal Documents', 'Reports'],
  correspondence: ['Personal Documents', 'Correspondence'],
  other: ['Other'],
};

// Organization vault folder structure (client-centric)
const ORGANIZATION_FOLDER_STRUCTURE: Record<DocumentCategory, string[]> = {
  identity: ['Identity Documents'],
  financial: ['Financial'],
  medical: ['Medical'],
  legal: ['Legal'],
  expense: ['Expenses'],
  invoice: ['Invoices'],
  contract: ['Contracts'],
  report: ['Reports'],
  correspondence: ['Correspondence'],
  other: ['Other'],
};

// Subtype to folder name mapping
const SUBTYPE_FOLDER_NAMES: Record<DocumentSubtype, string> = {
  // Identity
  drivers_license: 'Driver Licenses',
  passport: 'Passports',
  id_card: 'ID Cards',
  birth_certificate: 'Birth Certificates',
  social_security: 'Social Security',
  // Financial
  bank_statement: 'Bank Statements',
  tax_document: 'Tax Documents',
  w2: 'W-2 Forms',
  '1099': '1099 Forms',
  investment_report: 'Investment Reports',
  pay_stub: 'Pay Stubs',
  // Medical
  medical_record: 'Medical Records',
  prescription: 'Prescriptions',
  insurance_card: 'Insurance Cards',
  lab_results: 'Lab Results',
  // Legal
  contract: 'Contracts',
  deed: 'Property Deeds',
  will: 'Wills & Trusts',
  court_document: 'Court Documents',
  power_of_attorney: 'Power of Attorney',
  // Expense
  receipt: 'Receipts',
  invoice: 'Invoices',
  bill: 'Bills',
  purchase_order: 'Purchase Orders',
  // Other
  general: 'General',
  unknown: 'Unsorted',
};

// ============================================================================
// FOLDER PATH BUILDER CLASS
// ============================================================================

export interface FolderPathOptions {
  includeYearMonth?: boolean;
  includeSubtype?: boolean;
  clientName?: string;
  customBasePath?: string[];
  useUploadDate?: boolean;
  date?: Date;
}

export class FolderPathBuilder {
  private defaultOptions: FolderPathOptions = {
    includeYearMonth: true,
    includeSubtype: true,
    useUploadDate: true,
  };

  /**
   * Build folder path for personal vault
   * Path structure: Category / Year / Subtype
   * Example: Personal Documents / Identity / 2025 / Driver Licenses
   */
  buildPersonalPath(
    classification: ClassificationResult,
    metadata?: ExtractedMetadata,
    options?: FolderPathOptions
  ): string[] {
    const opts = { ...this.defaultOptions, ...options };
    const path: string[] = [];

    // Get base path from category
    const basePath = PERSONAL_FOLDER_STRUCTURE[classification.category] || ['Other'];
    path.push(...basePath);

    // Add year after category (before subtype)
    if (opts.includeYearMonth) {
      const { year } = this.getYearMonth(metadata, opts);
      path.push(year);
    }

    // Add subtype folder if enabled and not already in base path
    if (opts.includeSubtype && classification.subtype !== 'unknown') {
      const subtypeFolder = SUBTYPE_FOLDER_NAMES[classification.subtype];
      if (subtypeFolder && !basePath.includes(subtypeFolder)) {
        // For expenses and invoices, subtype folder is not needed as category is enough
        if (!['expense', 'invoice'].includes(classification.category)) {
          path.push(subtypeFolder);
        }
      }
    }

    return path;
  }

  /**
   * Build folder path for organization vault (client-centric)
   * Path structure: Clients / ClientName / Category / Year / Subtype
   */
  buildOrganizationPath(
    classification: ClassificationResult,
    metadata?: ExtractedMetadata,
    options?: FolderPathOptions
  ): string[] {
    const opts = { ...this.defaultOptions, ...options };
    const path: string[] = [];

    // Client folder first (if available)
    const clientName = opts.clientName || metadata?.clientName || 'General';
    path.push('Clients', this.sanitizeFolderName(clientName));

    // Get category folder
    const categoryPath = ORGANIZATION_FOLDER_STRUCTURE[classification.category] || ['Other'];
    path.push(...categoryPath);

    // Add year after category (before subtype)
    if (opts.includeYearMonth) {
      const { year } = this.getYearMonth(metadata, opts);
      path.push(year);
    }

    // Add subtype folder for certain categories
    if (opts.includeSubtype && this.shouldIncludeSubtype(classification.category)) {
      const subtypeFolder = SUBTYPE_FOLDER_NAMES[classification.subtype];
      if (subtypeFolder && classification.subtype !== 'unknown') {
        path.push(subtypeFolder);
      }
    }

    return path;
  }

  /**
   * Build folder path based on vault context
   */
  buildPath(
    vaultContext: VaultContext,
    classification: ClassificationResult,
    metadata?: ExtractedMetadata,
    options?: FolderPathOptions
  ): string[] {
    if (vaultContext === 'personal') {
      return this.buildPersonalPath(classification, metadata, options);
    }
    return this.buildOrganizationPath(classification, metadata, options);
  }

  /**
   * Get year and month for folder path
   */
  private getYearMonth(
    metadata?: ExtractedMetadata,
    options?: FolderPathOptions
  ): { year: string; month: string } {
    let date: Date;

    if (options?.date) {
      date = options.date;
    } else if (options?.useUploadDate || !metadata?.documentDate) {
      // Use upload date (current date)
      date = new Date();
    } else {
      // Try to parse document date
      date = this.parseDate(metadata.documentDate) || new Date();
    }

    return {
      year: date.getFullYear().toString(),
      month: (date.getMonth() + 1).toString().padStart(2, '0'),
    };
  }

  /**
   * Parse date string to Date object
   */
  private parseDate(dateStr: string): Date | null {
    if (!dateStr) return null;

    // Try common date formats
    const formats = [
      // MM/DD/YYYY, MM-DD-YYYY
      /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/,
      // YYYY/MM/DD, YYYY-MM-DD
      /^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/,
      // Month DD, YYYY
      /^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/,
      // DD Month YYYY
      /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/,
    ];

    for (const format of formats) {
      const match = dateStr.match(format);
      if (match) {
        try {
          const parsed = new Date(dateStr);
          if (!isNaN(parsed.getTime())) {
            return parsed;
          }
        } catch {
          continue;
        }
      }
    }

    // Fallback: try native Date parsing
    try {
      const parsed = new Date(dateStr);
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }
    } catch {
      // Ignore
    }

    return null;
  }

  /**
   * Check if subtype folder should be included for category
   */
  private shouldIncludeSubtype(category: DocumentCategory): boolean {
    // For expenses and invoices, the category is specific enough
    return !['expense', 'invoice'].includes(category);
  }

  /**
   * Sanitize folder name (remove special characters)
   */
  private sanitizeFolderName(name: string): string {
    return name
      .trim()
      .replace(/[\/\\:*?"<>|]/g, '') // Remove invalid characters
      .replace(/\s+/g, ' ') // Normalize whitespace
      .slice(0, 100); // Limit length
  }

  /**
   * Get folder path as string (for display)
   */
  static pathToString(path: string[]): string {
    return path.join(' / ');
  }

  /**
   * Parse string path back to array
   */
  static stringToPath(pathStr: string): string[] {
    return pathStr.split('/').map(s => s.trim()).filter(Boolean);
  }
}

// Export singleton instance
export const folderPathBuilder = new FolderPathBuilder();

// Export convenience functions
export function buildFolderPath(
  vaultContext: VaultContext,
  classification: ClassificationResult,
  metadata?: ExtractedMetadata,
  options?: FolderPathOptions
): string[] {
  return folderPathBuilder.buildPath(vaultContext, classification, metadata, options);
}

export function buildPersonalFolderPath(
  classification: ClassificationResult,
  metadata?: ExtractedMetadata,
  options?: FolderPathOptions
): string[] {
  return folderPathBuilder.buildPersonalPath(classification, metadata, options);
}

export function buildOrganizationFolderPath(
  classification: ClassificationResult,
  metadata?: ExtractedMetadata,
  options?: FolderPathOptions
): string[] {
  return folderPathBuilder.buildOrganizationPath(classification, metadata, options);
}
