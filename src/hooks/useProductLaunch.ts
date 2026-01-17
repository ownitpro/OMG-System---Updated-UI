"use client";

/**
 * Product Launch Hook for OMG System Hub
 *
 * Handles SSO token generation and product launches from the client portal.
 * This hook provides the functionality for the "Launch" button on product cards.
 *
 * Usage:
 * ```tsx
 * const { launchProduct, launching, error } = useProductLaunch();
 *
 * <button onClick={() => launchProduct('app_securevault')} disabled={launching === 'app_securevault'}>
 *   {launching === 'app_securevault' ? 'Launching...' : 'Launch'}
 * </button>
 * ```
 */

import { useState, useCallback } from 'react';
import { PRODUCT_IDS, type ProductId } from '@/lib/sso/jwt';

// Re-export product IDs for convenience
export { PRODUCT_IDS };
export type { ProductId };

// Product metadata for display in portal
export interface ProductInfo {
  id: ProductId;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: 'vault' | 'crm' | 'leads' | 'analytics' | 'learning';
}

// All OMG products
export const PRODUCTS: Record<ProductId, ProductInfo> = {
  [PRODUCT_IDS.SECUREVAULT_DOCS]: {
    id: PRODUCT_IDS.SECUREVAULT_DOCS,
    name: 'SecureVault Docs',
    description: 'Secure document storage and sharing',
    icon: 'DocumentIcon',
    color: 'emerald',
    category: 'vault',
  },
  [PRODUCT_IDS.OMG_CRM]: {
    id: PRODUCT_IDS.OMG_CRM,
    name: 'OMG-CRM',
    description: 'Customer relationship management',
    icon: 'UsersIcon',
    color: 'blue',
    category: 'crm',
  },
  [PRODUCT_IDS.OMG_LEADS]: {
    id: PRODUCT_IDS.OMG_LEADS,
    name: 'OMG-Leads',
    description: 'Lead capture and management',
    icon: 'FunnelIcon',
    color: 'purple',
    category: 'leads',
  },
  [PRODUCT_IDS.OMG_IQ]: {
    id: PRODUCT_IDS.OMG_IQ,
    name: 'OMG-IQ',
    description: 'AI-powered analytics',
    icon: 'ChartBarIcon',
    color: 'cyan',
    category: 'analytics',
  },
  [PRODUCT_IDS.OMG_AI_MASTERY]: {
    id: PRODUCT_IDS.OMG_AI_MASTERY,
    name: 'AI Mastery',
    description: 'AI training and courses',
    icon: 'AcademicCapIcon',
    color: 'orange',
    category: 'learning',
  },
};

// SSO API response type
interface SSOResponse {
  token: string;
  expiresIn: number;
  redirectUrl: string;
  targetProduct: ProductId;
}

// Hook return type
interface UseProductLaunchReturn {
  launchProduct: (productId: ProductId) => Promise<void>;
  launching: ProductId | null;
  error: Error | null;
  clearError: () => void;
}

/**
 * Hook to handle product launches via SSO
 */
export function useProductLaunch(): UseProductLaunchReturn {
  const [launching, setLaunching] = useState<ProductId | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const launchProduct = useCallback(async (productId: ProductId) => {
    // Validate product ID
    if (!Object.values(PRODUCT_IDS).includes(productId)) {
      setError(new Error(`Invalid product ID: ${productId}`));
      return;
    }

    setLaunching(productId);
    setError(null);

    try {
      // Request SSO token from backend
      const response = await fetch('/api/sso/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ targetProduct: productId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to generate SSO token (${response.status})`);
      }

      const data: SSOResponse = await response.json();

      // Open product in new tab with SSO token
      window.open(data.redirectUrl, '_blank', 'noopener,noreferrer');

      console.log(`[ProductLaunch] Launched ${productId}`);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to launch product');
      setError(error);
      console.error(`[ProductLaunch] Error launching ${productId}:`, error);
    } finally {
      setLaunching(null);
    }
  }, []);

  return {
    launchProduct,
    launching,
    error,
    clearError,
  };
}

/**
 * Hook to check SSO configuration status
 */
export function useSSOStatus() {
  const [status, setStatus] = useState<{
    configured: boolean;
    products: string[];
    checked: boolean;
  }>({
    configured: false,
    products: [],
    checked: false,
  });

  const checkStatus = useCallback(async () => {
    try {
      const response = await fetch('/api/sso/generate');
      const data = await response.json();

      setStatus({
        configured: data.ssoConfigured,
        products: data.availableProducts || [],
        checked: true,
      });
    } catch {
      setStatus({
        configured: false,
        products: [],
        checked: true,
      });
    }
  }, []);

  return { ...status, checkStatus };
}

/**
 * Get product info by ID
 */
export function getProductInfo(productId: ProductId): ProductInfo | undefined {
  return PRODUCTS[productId];
}

/**
 * Get all products as array
 */
export function getAllProducts(): ProductInfo[] {
  return Object.values(PRODUCTS);
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: ProductInfo['category']): ProductInfo[] {
  return Object.values(PRODUCTS).filter(p => p.category === category);
}
