import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export interface DesignRequest {
  id: string;
  projectName: string;
  designType: string;
  description: string;
  deadline: string | null;
  budget: string | null;
  existingAssets: string | null;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export interface CreateDesignRequestInput {
  projectName: string;
  designType: string;
  description: string;
  deadline?: string;
  budget?: string;
  assets?: string;
}

export interface UpdateDesignRequestInput {
  projectName?: string;
  designType?: string;
  description?: string;
  deadline?: string | null;
  budget?: string;
  existingAssets?: string;
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

export function useDesignRequests(status?: string) {
  const params = status ? `?status=${status}` : '';
  const url = `/api/client/design-requests${params}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  const createDesignRequest = async (input: CreateDesignRequestInput) => {
    const res = await fetch('/api/client/design-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to create design request');
    }

    const result = await res.json();
    await mutate(); // Refresh the list
    return result.data?.designRequest;
  };

  const updateDesignRequest = async (id: string, updates: UpdateDesignRequestInput) => {
    const res = await fetch(`/api/client/design-requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to update design request');
    }

    const result = await res.json();
    await mutate(); // Refresh the list
    return result.data?.designRequest;
  };

  const deleteDesignRequest = async (id: string) => {
    const res = await fetch(`/api/client/design-requests/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to delete design request');
    }

    await mutate(); // Refresh the list
  };

  return {
    designRequests: (data?.data?.designRequests as DesignRequest[]) || [],
    isLoading,
    error,
    refetch: mutate,
    createDesignRequest,
    updateDesignRequest,
    deleteDesignRequest,
  };
}
