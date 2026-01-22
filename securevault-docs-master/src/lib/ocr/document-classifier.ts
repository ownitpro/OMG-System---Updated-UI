// Document Classifier
// AI-powered classification using extracted text and image labels

import type {
  DocumentCategory,
  DocumentSubtype,
  ClassificationResult,
  ExtractedMetadata,
  TextractResult,
  RekognitionLabel,
} from '@/types/ocr';

// ============================================================================
// PATTERN DEFINITIONS
// ============================================================================

interface PatternSet {
  category: DocumentCategory;
  subtype: DocumentSubtype;
  patterns: RegExp[];
  weight: number; // Higher weight = stronger indicator
}

const CLASSIFICATION_PATTERNS: PatternSet[] = [
  // Identity Documents
  {
    category: 'identity',
    subtype: 'drivers_license',
    patterns: [
      /driver'?s?\s*licen[cs]e/i,
      /\bDL\s*#?\s*[A-Z0-9]+/i,
      /class\s*[A-Z]/i,
      /license\s*number/i,
      /state\s*of\s*[A-Z]/i,
    ],
    weight: 1.0,
  },
  {
    category: 'identity',
    subtype: 'passport',
    patterns: [
      /\bpassport\b/i,
      /passport\s*no\.?/i,
      /nationality/i,
      /place\s*of\s*birth/i,
      /\bMRZ\b/i,
      /P<[A-Z]{3}/i, // MRZ pattern
    ],
    weight: 1.0,
  },
  {
    category: 'identity',
    subtype: 'id_card',
    patterns: [
      /\bid\s*card\b/i,
      /identification\s*card/i,
      /national\s*id/i,
      /identity\s*card/i,
    ],
    weight: 0.9,
  },
  {
    category: 'identity',
    subtype: 'birth_certificate',
    patterns: [
      /birth\s*certificate/i,
      /certificate\s*of\s*(?:live\s*)?birth/i,
      /certificate\s*of\s*live\s*birth/i,
      /vital\s*records/i,
      /live\s*birth/i,
      /registrar/i,
      /child'?s?\s*name/i,
      /place\s*of\s*birth/i,
      /mother'?s?\s*name/i,
      /father'?s?\s*name/i,
      /date\s*filed/i,
    ],
    weight: 1.2, // Higher weight than driver's license to ensure birth certificates win
  },
  {
    category: 'identity',
    subtype: 'social_security',
    patterns: [
      /social\s*security/i,
      /\bSSN\b/i,
      /\bSSA\b/i,
      /\d{3}-\d{2}-\d{4}/,
    ],
    weight: 1.0,
  },

  // Financial Documents
  {
    category: 'financial',
    subtype: 'bank_statement',
    patterns: [
      /bank\s*statement/i,
      /account\s*statement/i,
      /statement\s*period/i,
      /beginning\s*balance/i,
      /ending\s*balance/i,
      /account\s*summary/i,
      /account\s*number/i,
    ],
    weight: 1.0,
  },
  {
    category: 'financial',
    subtype: 'tax_document',
    patterns: [
      /form\s*1040/i,
      /tax\s*return/i,
      /internal\s*revenue/i,
      /\bIRS\b/i,
      /taxable\s*income/i,
      /tax\s*year/i,
    ],
    weight: 1.0,
  },
  {
    category: 'financial',
    subtype: 'w2',
    patterns: [
      /\bW-?2\b/i,
      /wage\s*and\s*tax\s*statement/i,
      /employer'?s?\s*federal\s*EIN/i,
      /wages,?\s*tips/i,
    ],
    weight: 1.0,
  },
  {
    category: 'financial',
    subtype: '1099',
    patterns: [
      /\b1099\b/i,
      /1099-MISC/i,
      /1099-NEC/i,
      /1099-INT/i,
      /nonemployee\s*compensation/i,
    ],
    weight: 1.0,
  },
  {
    category: 'financial',
    subtype: 'investment_report',
    patterns: [
      /investment\s*report/i,
      /portfolio\s*statement/i,
      /brokerage\s*statement/i,
      /dividend/i,
      /stock\s*holdings/i,
      /mutual\s*fund/i,
    ],
    weight: 0.9,
  },
  {
    category: 'financial',
    subtype: 'pay_stub',
    patterns: [
      /pay\s*stub/i,
      /pay\s*statement/i,
      /earnings\s*statement/i,
      /gross\s*pay/i,
      /net\s*pay/i,
      /deductions/i,
      /pay\s*period/i,
    ],
    weight: 1.0,
  },

  // Medical Documents
  {
    category: 'medical',
    subtype: 'medical_record',
    patterns: [
      /medical\s*record/i,
      /patient\s*record/i,
      /clinical\s*notes/i,
      /diagnosis/i,
      /treatment\s*plan/i,
      /physician/i,
      /healthcare\s*provider/i,
    ],
    weight: 0.9,
  },
  {
    category: 'medical',
    subtype: 'prescription',
    patterns: [
      /\bRx\b/i,
      /prescription/i,
      /pharmacy/i,
      /dosage/i,
      /refills/i,
      /take\s*\d+\s*tablet/i,
      /mg\s*tablet/i,
    ],
    weight: 1.0,
  },
  {
    category: 'medical',
    subtype: 'insurance_card',
    patterns: [
      /health\s*insurance/i,
      /member\s*id/i,
      /group\s*number/i,
      /copay/i,
      /\bPPO\b/i,
      /\bHMO\b/i,
      /subscriber/i,
    ],
    weight: 1.0,
  },
  {
    category: 'medical',
    subtype: 'lab_results',
    patterns: [
      /lab\s*results/i,
      /laboratory\s*report/i,
      /blood\s*test/i,
      /test\s*results/i,
      /specimen/i,
      /reference\s*range/i,
    ],
    weight: 1.0,
  },

  // Legal Documents
  {
    category: 'legal',
    subtype: 'contract',
    patterns: [
      /\bcontract\b/i,
      /agreement\b/i,
      /terms\s*and\s*conditions/i,
      /hereby\s*agree/i,
      /party\s*of\s*the\s*first/i,
      /witnesseth/i,
      /executed\s*on/i,
    ],
    weight: 0.8,
  },
  {
    category: 'legal',
    subtype: 'deed',
    patterns: [
      /\bdeed\b/i,
      /property\s*deed/i,
      /title\s*deed/i,
      /grantor/i,
      /grantee/i,
      /real\s*property/i,
      /legal\s*description/i,
    ],
    weight: 1.0,
  },
  {
    category: 'legal',
    subtype: 'will',
    patterns: [
      /last\s*will/i,
      /testament/i,
      /\bwill\b.*\bestate\b/i,
      /executor/i,
      /beneficiary/i,
      /bequeath/i,
      /hereby\s*revoke/i,
    ],
    weight: 1.0,
  },
  {
    category: 'legal',
    subtype: 'court_document',
    patterns: [
      /court\s*of/i,
      /case\s*no\.?/i,
      /plaintiff/i,
      /defendant/i,
      /docket/i,
      /\bvs?\.?\b/i,
      /judgment/i,
      /petition/i,
    ],
    weight: 0.9,
  },
  {
    category: 'legal',
    subtype: 'power_of_attorney',
    patterns: [
      /power\s*of\s*attorney/i,
      /\bPOA\b/,
      /attorney.in.fact/i,
      /principal\s*hereby/i,
      /authorize.*act\s*on/i,
    ],
    weight: 1.0,
  },

  // Expense Documents
  {
    category: 'expense',
    subtype: 'receipt',
    patterns: [
      /\breceipt\b/i,
      /thank\s*you\s*for\s*(your\s*)?(purchase|shopping)/i,
      /\btotal\b/i,
      /\bsubtotal\b/i,
      /\bchange\s*due\b/i,
      /visa|mastercard|amex|discover/i,
      /\*{4}\d{4}/i, // Masked card number
    ],
    weight: 0.9,
  },
  {
    category: 'invoice',
    subtype: 'invoice',
    patterns: [
      /\binvoice\b/i,
      /invoice\s*#/i,
      /invoice\s*number/i,
      /bill\s*to/i,
      /ship\s*to/i,
      /due\s*date/i,
      /payment\s*terms/i,
      /amount\s*due/i,
    ],
    weight: 1.0,
  },
  {
    category: 'expense',
    subtype: 'bill',
    patterns: [
      /\bbill\b/i,
      /utility\s*bill/i,
      /amount\s*due/i,
      /due\s*by/i,
      /service\s*period/i,
      /account\s*balance/i,
    ],
    weight: 0.8,
  },
  {
    category: 'expense',
    subtype: 'purchase_order',
    patterns: [
      /purchase\s*order/i,
      /\bP\.?O\.?\s*#/i,
      /order\s*number/i,
      /ship\s*date/i,
      /delivery\s*date/i,
      /ordered\s*by/i,
    ],
    weight: 1.0,
  },
];

// ============================================================================
// METADATA EXTRACTION PATTERNS
// ============================================================================

const METADATA_PATTERNS = {
  // Date patterns
  date: [
    /(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/,
    /(\d{4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,2})/,
    /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*\d{1,2},?\s*\d{4}/i,
    /\d{1,2}\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*\d{4}/i,
  ],

  // Amount/money patterns
  amount: [
    /\$[\d,]+\.?\d{0,2}/,
    /(?:total|amount|sum|balance)[:\s]*\$?[\d,]+\.?\d{0,2}/i,
    /[\d,]+\.?\d{0,2}\s*(?:USD|CAD|EUR|GBP)/i,
  ],

  // Name patterns
  name: [
    /(?:name|customer|client|patient)[:\s]*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/i,
    /(?:Mr\.|Mrs\.|Ms\.|Dr\.)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/i,
  ],

  // Company/vendor patterns
  vendor: [
    /(?:from|vendor|merchant|store|company)[:\s]*([A-Z][A-Za-z\s&]+(?:Inc\.?|LLC|Ltd\.?|Corp\.?)?)/i,
  ],

  // Invoice/reference number patterns
  referenceNumber: [
    /(?:invoice|receipt|order|ref|reference|confirmation)\s*(?:#|no\.?|number)?[:\s]*([A-Z0-9\-]+)/i,
  ],

  // Client name patterns (for business documents)
  clientName: [
    /(?:client|customer|patient|account)[:\s]*([A-Z][A-Za-z\s]+)/i,
    /(?:bill\s*to|ship\s*to)[:\s]*\n?\s*([A-Z][A-Za-z\s]+)/i,
  ],
};

// ============================================================================
// CLASSIFIER CLASS
// ============================================================================

export class DocumentClassifier {
  private confidenceThreshold: number;

  constructor(confidenceThreshold: number = 0.7) {
    this.confidenceThreshold = confidenceThreshold;
  }

  /**
   * Classify document based on extracted text
   */
  classify(
    text: string,
    labels?: RekognitionLabel[],
    fileName?: string
  ): ClassificationResult {
    console.log('[CLASSIFIER] Starting classification for file:', fileName);
    console.log('[CLASSIFIER] Text sample:', text.substring(0, 200));

    const matchedPatterns: { patternSet: PatternSet; matchCount: number; patterns: string[] }[] = [];

    // Match against all pattern sets
    for (const patternSet of CLASSIFICATION_PATTERNS) {
      const matchedPatternsForSet: string[] = [];
      let matchCount = 0;

      for (const pattern of patternSet.patterns) {
        if (pattern.test(text)) {
          matchCount++;
          matchedPatternsForSet.push(pattern.source);
        }
      }

      if (matchCount > 0) {
        matchedPatterns.push({
          patternSet,
          matchCount,
          patterns: matchedPatternsForSet,
        });
      }
    }

    // Sort by match count * weight
    matchedPatterns.sort(
      (a, b) =>
        b.matchCount * b.patternSet.weight - a.matchCount * a.patternSet.weight
    );

    // Check labels from Rekognition for additional hints
    let labelBoost = 0;
    let boostedCategory: DocumentCategory | null = null;

    if (labels && labels.length > 0) {
      const labelAnalysis = this.analyzeLabels(labels);
      if (labelAnalysis.confidence > 0.7) {
        labelBoost = 0.2;
        boostedCategory = labelAnalysis.category;
      }
    }

    // Check filename for hints - filename hints are very reliable for identity documents
    if (fileName) {
      const fileNameHint = this.analyzeFileName(fileName);
      if (fileNameHint) {
        // For identity documents, filename is often the most reliable indicator
        // Add with higher priority if it's an identity document type
        const isIdentityDoc = fileNameHint.category === 'identity';
        const existingMatchForSubtype = matchedPatterns.some(
          m => m.patternSet.subtype === fileNameHint.subtype
        );

        if (!existingMatchForSubtype) {
          // Filename hints for identity docs get higher weight since users often name them accurately
          const filenameWeight = isIdentityDoc ? 1.5 : 0.5;
          matchedPatterns.push({
            patternSet: {
              category: fileNameHint.category,
              subtype: fileNameHint.subtype,
              patterns: [],
              weight: filenameWeight,
            },
            matchCount: isIdentityDoc ? 3 : 1, // Boost identity doc matches
            patterns: [`filename: ${fileName}`],
          });
        }
      }
    }

    // Get best match
    if (matchedPatterns.length === 0) {
      console.log('[CLASSIFIER] No patterns matched, returning default');
      return {
        category: 'other',
        subtype: 'unknown',
        confidence: 0.3,
        patterns: [],
        suggestedFolderPath: ['Other'],
      };
    }

    // Log all matches before sorting for debugging
    console.log('[CLASSIFIER] Matched patterns before sorting:', matchedPatterns.map(m => ({
      category: m.patternSet.category,
      subtype: m.patternSet.subtype,
      matchCount: m.matchCount,
      weight: m.patternSet.weight,
      score: m.matchCount * m.patternSet.weight,
      patterns: m.patterns,
    })));

    const bestMatch = matchedPatterns[0];
    console.log('[CLASSIFIER] Best match:', bestMatch.patternSet.category, '/', bestMatch.patternSet.subtype);
    let confidence =
      Math.min(bestMatch.matchCount / bestMatch.patternSet.patterns.length, 1) *
      bestMatch.patternSet.weight;

    // Apply label boost if category matches
    if (boostedCategory === bestMatch.patternSet.category) {
      confidence = Math.min(confidence + labelBoost, 1);
    }

    const folderPath = this.buildFolderPath(
      bestMatch.patternSet.category,
      bestMatch.patternSet.subtype
    );

    return {
      category: bestMatch.patternSet.category,
      subtype: bestMatch.patternSet.subtype,
      confidence,
      patterns: bestMatch.patterns,
      suggestedFolderPath: folderPath,
    };
  }

  /**
   * Extract metadata from text
   */
  extractMetadata(
    text: string,
    textractResult?: TextractResult
  ): ExtractedMetadata {
    const metadata: ExtractedMetadata = {};

    // Use Textract expense fields if available
    if (textractResult?.expenseFields) {
      for (const field of textractResult.expenseFields) {
        switch (field.type) {
          case 'VENDOR_NAME':
            metadata.vendor = field.value;
            break;
          case 'INVOICE_RECEIPT_DATE':
            metadata.documentDate = field.value;
            break;
          case 'TOTAL':
            metadata.amount = field.value;
            break;
          case 'INVOICE_RECEIPT_ID':
            metadata.invoiceNumber = field.value;
            break;
        }
      }
    }

    // Extract date if not already found
    if (!metadata.documentDate) {
      for (const pattern of METADATA_PATTERNS.date) {
        const match = text.match(pattern);
        if (match) {
          metadata.documentDate = match[0];
          break;
        }
      }
    }

    // Extract amount if not already found
    if (!metadata.amount) {
      for (const pattern of METADATA_PATTERNS.amount) {
        const match = text.match(pattern);
        if (match) {
          metadata.amount = match[0].replace(/[^$\d.,]/g, '');
          break;
        }
      }
    }

    // Extract vendor if not already found
    if (!metadata.vendor) {
      for (const pattern of METADATA_PATTERNS.vendor) {
        const match = text.match(pattern);
        if (match && match[1]) {
          metadata.vendor = match[1].trim();
          break;
        }
      }
    }

    // Extract reference number
    for (const pattern of METADATA_PATTERNS.referenceNumber) {
      const match = text.match(pattern);
      if (match && match[1]) {
        metadata.invoiceNumber = match[1].trim();
        break;
      }
    }

    // Extract client name
    for (const pattern of METADATA_PATTERNS.clientName) {
      const match = text.match(pattern);
      if (match && match[1]) {
        metadata.clientName = match[1].trim();
        break;
      }
    }

    // Store truncated raw text
    metadata.rawText = text.slice(0, 2000);

    return metadata;
  }

  /**
   * Analyze Rekognition labels
   */
  private analyzeLabels(labels: RekognitionLabel[]): {
    category: DocumentCategory;
    confidence: number;
  } {
    const categoryScores: Record<DocumentCategory, number> = {
      identity: 0,
      financial: 0,
      medical: 0,
      legal: 0,
      expense: 0,
      invoice: 0,
      contract: 0,
      report: 0,
      correspondence: 0,
      other: 0,
    };

    for (const label of labels) {
      const name = label.name.toLowerCase();
      const confidence = label.confidence / 100;

      if (name.includes('id') || name.includes('license') || name.includes('passport')) {
        categoryScores.identity += confidence;
      }
      if (name.includes('receipt') || name.includes('bill')) {
        categoryScores.expense += confidence;
      }
      if (name.includes('invoice')) {
        categoryScores.invoice += confidence;
      }
      if (name.includes('medical') || name.includes('prescription')) {
        categoryScores.medical += confidence;
      }
      if (name.includes('bank') || name.includes('financial') || name.includes('check')) {
        categoryScores.financial += confidence;
      }
      if (name.includes('contract') || name.includes('legal')) {
        categoryScores.legal += confidence;
      }
    }

    let bestCategory: DocumentCategory = 'other';
    let bestScore = 0;

    for (const [category, score] of Object.entries(categoryScores)) {
      if (score > bestScore) {
        bestScore = score;
        bestCategory = category as DocumentCategory;
      }
    }

    return {
      category: bestCategory,
      confidence: Math.min(bestScore, 1),
    };
  }

  /**
   * Analyze filename for document type hints
   */
  private analyzeFileName(fileName: string): { category: DocumentCategory; subtype: DocumentSubtype } | null {
    const lower = fileName.toLowerCase();

    // Receipt/Expense
    if (lower.includes('receipt') || lower.includes('expense')) {
      return { category: 'expense', subtype: 'receipt' };
    }
    // Invoice
    if (lower.includes('invoice')) {
      return { category: 'invoice', subtype: 'invoice' };
    }
    // Birth Certificate - check BEFORE generic "certificate" check
    if (lower.includes('birth') || lower.includes('birth_cert') || lower.includes('birth-cert') || lower.includes('birthcert')) {
      return { category: 'identity', subtype: 'birth_certificate' };
    }
    // Social Security
    if (lower.includes('social') || lower.includes('ssn') || lower.includes('ss-card') || lower.includes('ss_card')) {
      return { category: 'identity', subtype: 'social_security' };
    }
    // Driver's License
    if (lower.includes('license') || lower.includes('dl') || lower.includes('driver')) {
      return { category: 'identity', subtype: 'drivers_license' };
    }
    // Passport
    if (lower.includes('passport')) {
      return { category: 'identity', subtype: 'passport' };
    }
    // ID Card
    if (lower.includes('id_card') || lower.includes('id-card') || lower.includes('idcard') || lower.includes('identification')) {
      return { category: 'identity', subtype: 'id_card' };
    }
    // W2
    if (lower.includes('w2') || lower.includes('w-2')) {
      return { category: 'financial', subtype: 'w2' };
    }
    // 1099
    if (lower.includes('1099')) {
      return { category: 'financial', subtype: '1099' };
    }
    // Bank Statement
    if (lower.includes('statement')) {
      return { category: 'financial', subtype: 'bank_statement' };
    }
    // Contract
    if (lower.includes('contract') || lower.includes('agreement')) {
      return { category: 'legal', subtype: 'contract' };
    }
    // Prescription
    if (lower.includes('prescription') || lower.includes('rx')) {
      return { category: 'medical', subtype: 'prescription' };
    }

    return null;
  }

  /**
   * Build suggested folder path based on classification
   * Path structure: Category / Year / Subtype
   * Example: Personal Documents / Identity / 2025 / Driver Licenses
   */
  private buildFolderPath(category: DocumentCategory, subtype: DocumentSubtype): string[] {
    const now = new Date();
    const year = now.getFullYear().toString();

    const subtypeToFolderName: Record<string, string> = {
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

    const folderName = subtypeToFolderName[subtype] || 'Other';

    // Path structure: Category / Year / Subtype
    switch (category) {
      case 'identity':
        return ['Personal Documents', 'Identity', year, folderName];
      case 'financial':
        return ['Personal Documents', 'Financial', year, folderName];
      case 'medical':
        return ['Personal Documents', 'Medical', year, folderName];
      case 'legal':
        return ['Personal Documents', 'Legal', year, folderName];
      case 'expense':
        return ['Expenses', year];
      case 'invoice':
        return ['Invoices', year];
      default:
        return ['Other', year];
    }
  }
}

// Export singleton instance
export const documentClassifier = new DocumentClassifier();

// Export convenience functions
export function classifyDocument(
  text: string,
  labels?: RekognitionLabel[],
  fileName?: string
): ClassificationResult {
  return documentClassifier.classify(text, labels, fileName);
}

export function extractDocumentMetadata(
  text: string,
  textractResult?: TextractResult
): ExtractedMetadata {
  return documentClassifier.extractMetadata(text, textractResult);
}
