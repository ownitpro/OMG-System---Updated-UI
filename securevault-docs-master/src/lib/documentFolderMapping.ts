// src/lib/documentFolderMapping.ts
// Maps document item keys to their respective folder names

export const DOCUMENT_TYPE_FOLDERS: Record<string, string> = {
  // Tax documents
  't1_t2': 'Tax Returns',
  'noa': 'Notice of Assessment',
  'gst_hst': 'GST HST Returns',
  'payroll': 'Payroll Records',

  // Real estate
  'kyc': 'KYC Documents',
  'offer': 'Offer Packages',
  'mortgage': 'Mortgage Documents',

  // Contractors
  'permit': 'Permits',
  'quote': 'Quotes',
  'change_order': 'Change Orders',
  'invoice': 'Invoices',

  // Project management
  'sow': 'Statement of Work',
  'po': 'Purchase Orders',
  'signoff': 'Sign-offs',

  // General
  'id': 'Identification',
  'bank': 'Bank Statements',
  'contract': 'Contracts',
};

/**
 * Get folder name for a document type
 * Falls back to a formatted version of the key if not found
 */
export function getFolderNameForDocumentType(key: string): string {
  // Check if we have a predefined folder name
  if (DOCUMENT_TYPE_FOLDERS[key]) {
    return DOCUMENT_TYPE_FOLDERS[key];
  }

  // Fall back to formatting the key: "some_key" -> "Some Key"
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Normalize folder name to ensure consistency
 */
export function normalizeFolderName(name: string): string {
  return name.trim();
}
