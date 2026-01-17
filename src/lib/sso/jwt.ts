/**
 * SSO JWT Utility for OMG System Hub Integration
 *
 * This module handles JWT token generation and validation for Single Sign-On
 * between OMG System (the hub) and external products like SecureVault Docs.
 *
 * Flow:
 * 1. User clicks "Launch" on a product in OMG portal
 * 2. OMG generates a signed JWT with user data
 * 3. Product validates the JWT and creates a session
 * 4. User is automatically authenticated in the product
 */

import * as jwt from 'jsonwebtoken';

// Environment variables - SSO_SECRET must be shared between OMG and products
const SSO_SECRET = process.env.SSO_SECRET || '';
const SSO_TOKEN_EXPIRY = '5m'; // 5 minutes - short-lived for security
const SSO_ISSUER = 'omg-system';

// Product identifiers (audience values)
export const PRODUCT_IDS = {
  SECUREVAULT_DOCS: 'app_securevault',
  OMG_CRM: 'app_omg_crm',
  OMG_LEADS: 'app_omg_leads',
  OMG_IQ: 'app_omg_iq',
  OMG_AI_MASTERY: 'app_omg_ai_mastery',
} as const;

export type ProductId = typeof PRODUCT_IDS[keyof typeof PRODUCT_IDS];

// Tier identifiers matching SVD's expected values
export const TIER_IDS = {
  TRIAL: 'trial',
  STARTER: 'starter',
  GROWTH: 'growth',
  PRO: 'pro',
  BUSINESS_STARTER: 'business_starter',
  BUSINESS_GROWTH: 'business_growth',
  BUSINESS_PRO: 'business_pro',
  ENTERPRISE: 'enterprise',
} as const;

export type TierId = typeof TIER_IDS[keyof typeof TIER_IDS];

// User data structure for SSO token
export interface SSOUserData {
  userId: string;
  email: string;
  name: string;
  role: string;
  tier?: TierId;
  organizationId?: string;
}

// JWT payload structure
export interface SSOTokenPayload extends SSOUserData {
  targetProduct: ProductId;
  iat: number;
  exp?: number;
  iss?: string;
  aud?: string;
}

// Validation result
export interface SSOValidationResult {
  valid: boolean;
  payload?: SSOTokenPayload;
  error?: string;
}

/**
 * Generate an SSO token for a user to access a product
 *
 * @param user - User data to include in the token
 * @param targetProduct - The product ID the user wants to access
 * @returns Signed JWT token string
 *
 * @example
 * const token = generateSSOToken(
 *   { userId: 'user_123', email: 'john@example.com', name: 'John Doe', role: 'CLIENT', tier: 'growth' },
 *   PRODUCT_IDS.SECUREVAULT_DOCS
 * );
 */
export function generateSSOToken(user: SSOUserData, targetProduct: ProductId): string {
  if (!SSO_SECRET) {
    throw new Error('SSO_SECRET environment variable is not configured');
  }

  const payload: Omit<SSOTokenPayload, 'iat' | 'exp' | 'iss' | 'aud'> = {
    userId: user.userId,
    email: user.email,
    name: user.name,
    role: user.role,
    tier: user.tier,
    organizationId: user.organizationId,
    targetProduct,
  };

  const token = jwt.sign(payload, SSO_SECRET, {
    expiresIn: SSO_TOKEN_EXPIRY,
    issuer: SSO_ISSUER,
    audience: targetProduct,
  });

  return token;
}

/**
 * Verify an SSO token and extract the payload
 *
 * @param token - The JWT token to verify
 * @param expectedProduct - The product ID that should be in the audience
 * @returns Validation result with payload or error
 *
 * @example
 * const result = verifySSOToken(token, PRODUCT_IDS.SECUREVAULT_DOCS);
 * if (result.valid) {
 *   const { userId, email, tier } = result.payload;
 *   // Create session for user
 * }
 */
export function verifySSOToken(token: string, expectedProduct: ProductId): SSOValidationResult {
  if (!SSO_SECRET) {
    return { valid: false, error: 'SSO_SECRET not configured' };
  }

  try {
    const payload = jwt.verify(token, SSO_SECRET, {
      issuer: SSO_ISSUER,
      audience: expectedProduct,
    }) as SSOTokenPayload;

    return { valid: true, payload };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Token verification failed';
    return { valid: false, error: errorMessage };
  }
}

/**
 * Decode an SSO token without verifying the signature
 * Useful for debugging or displaying token info
 *
 * @param token - The JWT token to decode
 * @returns Decoded payload or null if invalid format
 */
export function decodeSSOToken(token: string): SSOTokenPayload | null {
  try {
    const decoded = jwt.decode(token) as SSOTokenPayload | null;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Check if an SSO token is expired
 *
 * @param token - The JWT token to check
 * @returns true if expired, false if still valid, null if invalid token
 */
export function isTokenExpired(token: string): boolean | null {
  const decoded = decodeSSOToken(token);
  if (!decoded || !decoded.exp) return null;

  const now = Math.floor(Date.now() / 1000);
  return decoded.exp < now;
}

/**
 * Get the remaining time until token expiration
 *
 * @param token - The JWT token to check
 * @returns Remaining seconds, 0 if expired, null if invalid token
 */
export function getTokenExpirySeconds(token: string): number | null {
  const decoded = decodeSSOToken(token);
  if (!decoded || !decoded.exp) return null;

  const now = Math.floor(Date.now() / 1000);
  const remaining = decoded.exp - now;
  return remaining > 0 ? remaining : 0;
}

/**
 * Build the SSO redirect URL for a product
 *
 * @param productBaseUrl - The base URL of the product (e.g., 'https://docs.securevault.com')
 * @param token - The SSO token
 * @returns Full URL with token for SSO login
 *
 * @example
 * const url = buildSSORedirectUrl('https://docs.securevault.com', token);
 * // Returns: https://docs.securevault.com/sso/login?token=eyJhbG...
 */
export function buildSSORedirectUrl(productBaseUrl: string, token: string): string {
  const url = new URL('/sso/login', productBaseUrl);
  url.searchParams.set('token', token);
  return url.toString();
}

/**
 * Map OMG System tier names to SVD-expected tier IDs
 *
 * @param omgTier - Tier name from OMG System (e.g., 'Growth', 'GROWTH', 'growth')
 * @returns Normalized tier ID for SVD
 */
export function normalizeTierId(omgTier: string | undefined | null): TierId {
  if (!omgTier) return TIER_IDS.TRIAL;

  const tierMap: Record<string, TierId> = {
    'trial': TIER_IDS.TRIAL,
    'starter': TIER_IDS.STARTER,
    'growth': TIER_IDS.GROWTH,
    'pro': TIER_IDS.PRO,
    'business_starter': TIER_IDS.BUSINESS_STARTER,
    'business_growth': TIER_IDS.BUSINESS_GROWTH,
    'business_pro': TIER_IDS.BUSINESS_PRO,
    'enterprise': TIER_IDS.ENTERPRISE,
  };

  const normalized = omgTier.toLowerCase().replace(/\s+/g, '_');
  return tierMap[normalized] || TIER_IDS.TRIAL;
}
