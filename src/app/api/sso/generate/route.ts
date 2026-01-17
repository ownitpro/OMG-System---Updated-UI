/**
 * SSO Token Generation API Endpoint
 *
 * POST /api/sso/generate
 *
 * Generates a short-lived JWT token for Single Sign-On to external products.
 * User must be authenticated to generate tokens.
 *
 * Request Body:
 * {
 *   "targetProduct": "app_securevault" | "app_omg_crm" | "app_omg_leads" | etc.
 * }
 *
 * Response:
 * {
 *   "token": "eyJhbG...",
 *   "expiresIn": 300,
 *   "redirectUrl": "https://product.com/sso/login?token=..."
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import {
  generateSSOToken,
  buildSSORedirectUrl,
  normalizeTierId,
  PRODUCT_IDS,
  type ProductId,
  type SSOUserData,
} from '@/lib/sso/jwt';

// Product URLs configuration
// These will be replaced with actual URLs when database is connected
const PRODUCT_URLS: Record<ProductId, string> = {
  [PRODUCT_IDS.SECUREVAULT_DOCS]: process.env.SECUREVAULT_DOCS_URL || 'http://localhost:3001',
  [PRODUCT_IDS.OMG_CRM]: process.env.OMG_CRM_URL || 'http://localhost:3002',
  [PRODUCT_IDS.OMG_LEADS]: process.env.OMG_LEADS_URL || 'http://localhost:3003',
  [PRODUCT_IDS.OMG_IQ]: process.env.OMG_IQ_URL || 'http://localhost:3005',
  [PRODUCT_IDS.OMG_AI_MASTERY]: process.env.OMG_AI_MASTERY_URL || 'http://localhost:3004',
};

// Validate product ID
function isValidProductId(value: string): value is ProductId {
  return Object.values(PRODUCT_IDS).includes(value as ProductId);
}

export async function POST(req: NextRequest) {
  try {
    // Get authenticated user
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'You must be logged in to generate SSO tokens' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { targetProduct } = body;

    // Validate target product
    if (!targetProduct) {
      return NextResponse.json(
        { error: 'Bad Request', message: 'targetProduct is required' },
        { status: 400 }
      );
    }

    if (!isValidProductId(targetProduct)) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: `Invalid targetProduct. Must be one of: ${Object.values(PRODUCT_IDS).join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Build user data for token
    const user = session.user as any; // Type assertion for extended fields
    const userData: SSOUserData = {
      userId: user.id,
      email: user.email || '',
      name: user.name || '',
      role: user.role || 'CLIENT',
      tier: normalizeTierId(user.tier),
      organizationId: user.organizationId,
    };

    // Generate SSO token
    const token = generateSSOToken(userData, targetProduct);

    // Build redirect URL
    const productUrl = PRODUCT_URLS[targetProduct];
    const redirectUrl = buildSSORedirectUrl(productUrl, token);

    // TODO: When database is connected, log SSO token generation for audit
    // await db.ssoToken.create({
    //   data: {
    //     userId: user.id,
    //     tokenHash: hashToken(token),
    //     targetProduct,
    //     expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    //     used: false,
    //   },
    // });

    console.log(`[SSO] Generated token for user ${user.email} to ${targetProduct}`);

    return NextResponse.json({
      token,
      expiresIn: 300, // 5 minutes in seconds
      redirectUrl,
      targetProduct,
    });
  } catch (error) {
    console.error('[SSO] Token generation error:', error);

    // Check for specific error types
    if (error instanceof Error && error.message.includes('SSO_SECRET')) {
      return NextResponse.json(
        { error: 'Configuration Error', message: 'SSO is not configured on this server' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Failed to generate SSO token' },
      { status: 500 }
    );
  }
}

// GET endpoint for health check
export async function GET() {
  const isConfigured = !!process.env.SSO_SECRET;

  return NextResponse.json({
    status: 'ok',
    ssoConfigured: isConfigured,
    availableProducts: Object.keys(PRODUCT_URLS),
    message: isConfigured
      ? 'SSO is configured and ready'
      : 'SSO_SECRET environment variable not set',
  });
}
