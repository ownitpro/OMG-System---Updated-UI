// API route to analyze documents using AI for portal uploads
import { NextRequest, NextResponse } from 'next/server';
import { requirePortalAuth } from '@/lib/portalAuth';

type Props = {
  params: Promise<{ portalId: string }>;
};

async function handler(req: NextRequest, session: any, portalId: string) {
  try {
    const { fileName, mimeType, fileData } = await req.json();

    if (!fileName || !mimeType || !fileData) {
      return NextResponse.json(
        { error: 'Missing required fields: fileName, mimeType, fileData' },
        { status: 400 }
      );
    }

    // Check if OpenAI is configured
    const { isOpenAIConfigured, analyzeDocumentFromBase64 } = await import('@/lib/ai/document-analyzer');

    const openAIConfigured = isOpenAIConfigured();
    console.log('[ANALYZE] OpenAI configured:', openAIConfigured);
    console.log('[ANALYZE] File:', fileName, 'Type:', mimeType, 'Data length:', fileData?.length || 0);

    if (!openAIConfigured) {
      // Return mock analysis if OpenAI is not configured
      console.log('[ANALYZE] Using mock analysis (no OpenAI key)');
      const mockAnalysis = createMockAnalysis(fileName, mimeType);
      return NextResponse.json({ analysis: mockAnalysis });
    }

    // Perform AI analysis
    console.log('[ANALYZE] Calling OpenAI for analysis...');
    const result = await analyzeDocumentFromBase64(
      fileData,
      mimeType,
      fileName,
      'organization', // Portal context is organization
      [], // No existing folders to match against for portal uploads
      undefined // No custom categories
    );
    console.log('[ANALYZE] OpenAI result:', JSON.stringify(result, null, 2));

    // Format result for client
    const analysis = {
      suggestedFilename: result.suggestedFilename,
      category: result.classification.category,
      subtype: result.classification.subtype,
      confidence: result.classification.confidence,
      folderPath: result.folderSuggestion.pathSegments,
      expirationDate: result.expirationDate,
    };

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('[ANALYZE] Error analyzing document:', error);

    // Return fallback analysis on error
    const body = await req.text();
    let fileName = 'document';
    try {
      const parsed = JSON.parse(body);
      fileName = parsed.fileName || 'document';
    } catch {
      // Ignore parse error
    }

    const fallbackAnalysis = createMockAnalysis(fileName, 'application/octet-stream');
    return NextResponse.json({ analysis: fallbackAnalysis });
  }
}

// Create mock analysis when AI is not available
function createMockAnalysis(fileName: string, mimeType: string) {
  const lowerFilename = fileName.toLowerCase();
  const year = new Date().getFullYear().toString();

  // Basic categorization based on filename/extension
  let category = 'other';
  let subtype = 'unknown';
  let folderPath = ['Uploads', year];

  // Training & HR documents
  if (lowerFilename.includes('training') || lowerFilename.includes('onboarding') ||
      lowerFilename.includes('handbook') || lowerFilename.includes('orientation')) {
    category = 'employment';
    subtype = lowerFilename.includes('plan') ? 'training_plan' : 'training_certificate';
    folderPath = ['HR & Training', year];
  }
  // Business plans & proposals
  else if (lowerFilename.includes('plan') || lowerFilename.includes('proposal') ||
           lowerFilename.includes('strategy') || lowerFilename.includes('roadmap')) {
    category = 'business';
    subtype = lowerFilename.includes('business') ? 'business_plan' :
              lowerFilename.includes('proposal') ? 'proposal' : 'report';
    folderPath = ['Business Documents', year];
  }
  // Resume/CV documents
  else if (lowerFilename.includes('resume') || lowerFilename.includes('cv') ||
           lowerFilename.includes('curriculum')) {
    category = 'employment';
    subtype = 'resume';
    folderPath = ['Employment', 'Resumes'];
  }
  // Tax documents
  else if (lowerFilename.includes('w2') || lowerFilename.includes('w-2') ||
      lowerFilename.includes('1099') || lowerFilename.includes('tax')) {
    category = 'tax';
    subtype = lowerFilename.includes('w2') || lowerFilename.includes('w-2') ? 'w2' :
              lowerFilename.includes('1099') ? '1099' : 'tax_return';
    folderPath = ['Tax Documents', year];
  }
  // Financial documents
  else if (lowerFilename.includes('statement') || lowerFilename.includes('bank') ||
           lowerFilename.includes('invoice') || lowerFilename.includes('receipt')) {
    category = 'financial';
    subtype = lowerFilename.includes('bank') ? 'bank_statement' :
              lowerFilename.includes('invoice') ? 'invoice' :
              lowerFilename.includes('receipt') ? 'receipt' : 'general';
    folderPath = ['Financial', year];
  }
  // Identity documents
  else if (lowerFilename.includes('license') || lowerFilename.includes('passport') ||
           lowerFilename.includes('id card') || lowerFilename.includes('id_card')) {
    category = 'identity';
    subtype = lowerFilename.includes('license') ? 'drivers_license' :
              lowerFilename.includes('passport') ? 'passport' : 'id_card';
    folderPath = ['Identity Documents'];
  }
  // Legal documents
  else if (lowerFilename.includes('contract') || lowerFilename.includes('agreement') ||
           lowerFilename.includes('legal') || lowerFilename.includes('nda') ||
           lowerFilename.includes('terms')) {
    category = 'legal';
    subtype = lowerFilename.includes('contract') ? 'contract' :
              lowerFilename.includes('nda') ? 'nda' : 'agreement';
    folderPath = ['Legal', year];
  }
  // Insurance documents
  else if (lowerFilename.includes('insurance') || lowerFilename.includes('policy') ||
           lowerFilename.includes('coverage')) {
    category = 'insurance';
    subtype = 'health_insurance';
    folderPath = ['Insurance', year];
  }
  // Medical documents
  else if (lowerFilename.includes('medical') || lowerFilename.includes('health') ||
           lowerFilename.includes('prescription') || lowerFilename.includes('doctor')) {
    category = 'medical';
    subtype = lowerFilename.includes('prescription') ? 'prescription' : 'medical_record';
    folderPath = ['Medical', year];
  }
  // Reports & Presentations
  else if (lowerFilename.includes('report') || lowerFilename.includes('presentation') ||
           lowerFilename.includes('slides') || lowerFilename.includes('deck')) {
    category = 'business';
    subtype = lowerFilename.includes('report') ? 'report' : 'presentation';
    folderPath = ['Reports & Presentations', year];
  }
  // Certificates & Certifications
  else if (lowerFilename.includes('certificate') || lowerFilename.includes('certification') ||
           lowerFilename.includes('diploma') || lowerFilename.includes('award')) {
    category = 'certification';
    subtype = 'certification';
    folderPath = ['Certifications', year];
  }
  // Images/Photos based on mime type
  else if (mimeType.startsWith('image/')) {
    category = 'personal';
    subtype = 'photo';
    folderPath = ['Images', year];
  }
  // PDFs default to documents
  else if (mimeType === 'application/pdf' || lowerFilename.endsWith('.pdf')) {
    category = 'business';
    subtype = 'general';
    folderPath = ['Documents', year];
  }

  // Generate suggested filename
  const ext = fileName.includes('.') ? fileName.split('.').pop() : '';
  const baseName = fileName.replace(/\.[^/.]+$/, '');
  const cleanName = baseName
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  const suggestedFilename = ext ? `${cleanName}.${ext}` : cleanName;

  // Calculate confidence based on how specific the match is
  // - 'other' category = 30% (unknown)
  // - Generic match = 60%
  // - Specific match with subtype = 75%
  const confidence = category === 'other' ? 0.3 :
                     subtype === 'unknown' || subtype === 'general' ? 0.6 : 0.75;

  return {
    suggestedFilename,
    category,
    subtype,
    confidence,
    folderPath,
    expirationDate: null,
  };
}

export const POST = requirePortalAuth(handler);
