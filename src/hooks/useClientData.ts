/**
 * Custom React Hooks for Client Portal Data Fetching
 * Connects frontend pages to backend APIs
 */

import { useState, useEffect } from 'react';

// Generic fetch hook type
interface UseDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Generic API response type
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ============================================================================
// BILLING HOOKS
// ============================================================================

export function useInvoices() {
  return useApiData<any[]>('/api/client/billing/invoices');
}

export function useSubscriptions() {
  return useApiData<any[]>('/api/client/billing/subscriptions');
}

export function usePaymentMethods() {
  return useApiData<any[]>('/api/client/billing/payment-methods');
}

// ============================================================================
// SUPPORT HOOKS
// ============================================================================

export function useSupportTickets(status?: string) {
  const url = status ? `/api/client/support/tickets?status=${status}` : '/api/client/support/tickets';
  return useApiData<any[]>(url);
}

export function useTicketMessages(ticketId: string) {
  return useApiData<any[]>(`/api/client/support/tickets/${ticketId}/messages`);
}

// ============================================================================
// STRATEGY SESSIONS HOOKS
// ============================================================================

export function useStrategySessions(status?: string) {
  const url = status ? `/api/client/sessions?status=${status}` : '/api/client/sessions';
  return useApiData<any[]>(url);
}

// ============================================================================
// TIMEGUARD-AI HOOKS
// ============================================================================

export function useTimeEntries() {
  return useApiData<any[]>('/api/client/time-entries');
}

export function useRunningTimer() {
  return useApiData<any>('/api/client/time-entries/running');
}

// ============================================================================
// AD CAMPAIGNS HOOKS
// ============================================================================

export function useAdCampaigns(status?: string) {
  const url = status ? `/api/client/ads/campaigns?status=${status}` : '/api/client/ads/campaigns';
  return useApiData<any[]>(url);
}

// ============================================================================
// CONTENT PROJECTS HOOKS
// ============================================================================

export function useContentProjects(status?: string) {
  const url = status ? `/api/client/content?status=${status}` : '/api/client/content';
  return useApiData<any[]>(url);
}

// ============================================================================
// AUTOMATIONS HOOKS
// ============================================================================

export function useAutomations(status?: string) {
  const url = status ? `/api/client/automations?status=${status}` : '/api/client/automations';
  return useApiData<any[]>(url);
}

// ============================================================================
// BRAND ASSETS HOOKS
// ============================================================================

export function useBrandAssets(type?: string) {
  const url = type ? `/api/client/brand-assets?type=${type}` : '/api/client/brand-assets';
  return useApiData<any[]>(url);
}

// ============================================================================
// CUSTOM PROJECTS HOOKS
// ============================================================================

export function useCustomProjects(status?: string) {
  const url = status ? `/api/client/custom-projects?status=${status}` : '/api/client/custom-projects';
  return useApiData<any[]>(url);
}

// ============================================================================
// PROFILE HOOKS
// ============================================================================

export function useProfile() {
  return useApiData<any>('/api/client/profile');
}

// ============================================================================
// GENERIC API DATA HOOK
// ============================================================================

function useApiData<T>(url: string): UseDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const json: ApiResponse<T> = await response.json();

        console.log(`[HOOK DEBUG] ${url} response:`, json);

        if (cancelled) return;

        if (json.success && json.data !== undefined) {
          console.log(`[HOOK DEBUG] Setting data from json.data:`, json.data);
          setData(json.data);
        } else if (json.data !== undefined) {
          // Some APIs might not have success flag, just data
          console.log(`[HOOK DEBUG] Setting data (no success flag):`, json.data);
          setData(json.data);
        } else {
          console.error(`[HOOK DEBUG] No data in response:`, json);
          throw new Error(json.error || 'Unknown error');
        }
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error('Unknown error'));
        console.error(`Error fetching ${url}:`, err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url, refetchTrigger]);

  const refetch = () => setRefetchTrigger(prev => prev + 1);

  return { data, loading, error, refetch };
}

// ============================================================================
// MUTATION HOOKS (Create, Update, Delete)
// ============================================================================

export function useCreateInvoice() {
  return useMutation('/api/client/billing/invoices', 'POST');
}

export function useCreateTicket() {
  return useMutation('/api/client/support/tickets', 'POST');
}

export function useCreateAdCampaign() {
  return useMutation('/api/client/ads/campaigns', 'POST');
}

export function useCreateContentProject() {
  return useMutation('/api/client/content', 'POST');
}

export function useCreateAutomation() {
  return useMutation('/api/client/automations', 'POST');
}

export function useCreateCustomProject() {
  return useMutation('/api/client/custom-projects', 'POST');
}

export function useCreateTimeEntry() {
  return useMutation('/api/client/time-entries', 'POST');
}

// Generic mutation hook
interface UseMutationResult<T> {
  mutate: (data: any) => Promise<T>;
  loading: boolean;
  error: Error | null;
  data: T | null;
}

function useMutation<T>(url: string, method: 'POST' | 'PATCH' | 'DELETE'): UseMutationResult<T> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const mutate = async (body: any): Promise<T> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const json: ApiResponse<T> = await response.json();

      if (json.success && json.data !== undefined) {
        setData(json.data);
        return json.data;
      } else {
        throw new Error(json.error || 'Unknown error');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error, data };
}
