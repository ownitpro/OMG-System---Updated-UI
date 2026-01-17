import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export interface AdCampaign {
  id: string;
  name: string;
  description: string | null;
  platform: string;
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  budget: number;
  spent: number;
  currency: string;
  startDate: string;
  endDate: string | null;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number | null;
  cpc: number | null;
  targetAudience: string | null;
  adCreativeUrl: string | null;
  landingPageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCampaignInput {
  name: string;
  description?: string;
  platform: string;
  budget: number;
  startDate: string;
  endDate?: string;
  targetAudience?: string;
  landingPageUrl?: string;
}

export interface UpdateCampaignInput {
  name?: string;
  description?: string;
  platform?: string;
  budget?: number;
  spent?: number;
  status?: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  impressions?: number;
  clicks?: number;
  conversions?: number;
  targetAudience?: string;
  landingPageUrl?: string;
}

export function useAdsCampaigns(status?: string) {
  const params = status ? `?status=${status}` : '';
  const url = `/api/client/ads/campaigns${params}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  const createCampaign = async (input: CreateCampaignInput) => {
    const res = await fetch('/api/client/ads/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to create campaign');
    }

    const result = await res.json();
    await mutate(); // Refresh the list
    return result.data?.campaign;
  };

  const updateCampaign = async (id: string, updates: UpdateCampaignInput) => {
    const res = await fetch(`/api/client/ads/campaigns/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to update campaign');
    }

    const result = await res.json();
    await mutate(); // Refresh the list
    return result.data?.campaign;
  };

  const deleteCampaign = async (id: string) => {
    const res = await fetch(`/api/client/ads/campaigns/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to delete campaign');
    }

    await mutate(); // Refresh the list
  };

  return {
    campaigns: (data?.data?.campaigns as AdCampaign[]) || [],
    isLoading,
    error,
    refetch: mutate,
    createCampaign,
    updateCampaign,
    deleteCampaign,
  };
}
