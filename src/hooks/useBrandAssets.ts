import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export interface BrandAsset {
  id: string;
  name: string;
  description: string | null;
  type: string;
  category: string | null;
  fileUrl: string | null;
  thumbnailUrl: string | null;
  fileSize: number | null;
  fileFormat: string | null;
  dimensions: string | null;
  colorCodes: string | null;
  version: string;
  tags: string | null;
  downloadCount: number;
  lastDownloadAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBrandAssetInput {
  name: string;
  description?: string;
  type: string;
  category?: string;
  fileUrl?: string;
  thumbnailUrl?: string;
  fileSize?: number;
  fileFormat?: string;
  dimensions?: string;
  colorCodes?: string;
  tags?: string;
}

export interface UpdateBrandAssetInput {
  name?: string;
  description?: string;
  type?: string;
  category?: string;
  fileUrl?: string;
  thumbnailUrl?: string;
  fileSize?: number;
  fileFormat?: string;
  dimensions?: string;
  colorCodes?: string;
  version?: string;
  tags?: string;
}

export function useBrandAssets() {
  const url = '/api/client/brand';

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  const createAsset = async (input: CreateBrandAssetInput) => {
    const res = await fetch('/api/client/brand', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to create brand asset');
    }

    const result = await res.json();
    await mutate(); // Refresh the list
    return result.data?.asset;
  };

  const updateAsset = async (id: string, updates: UpdateBrandAssetInput) => {
    const res = await fetch(`/api/client/brand/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to update brand asset');
    }

    const result = await res.json();
    await mutate(); // Refresh the list
    return result.data?.asset;
  };

  const deleteAsset = async (id: string) => {
    const res = await fetch(`/api/client/brand/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to delete brand asset');
    }

    await mutate(); // Refresh the list
  };

  const downloadAsset = async (id: string, filename: string) => {
    const res = await fetch(`/api/client/brand/${id}/download`);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to download asset');
    }

    const result = await res.json();
    const downloadUrl = result.data?.downloadUrl;

    if (downloadUrl) {
      // Trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      await mutate(); // Refresh to update download count
    }
  };

  return {
    assets: (data?.data?.assets as BrandAsset[]) || [],
    isLoading,
    error,
    refetch: mutate,
    createAsset,
    updateAsset,
    deleteAsset,
    downloadAsset,
  };
}
