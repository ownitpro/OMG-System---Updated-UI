import useSWR from 'swr';
import { ContentRequestInput } from '@/components/portal/ContentRequestModal';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * Hook for managing content requests
 */
export function useContentRequests() {
  const { data, error, isLoading, mutate } = useSWR('/api/client/content', fetcher);

  /**
   * Create a new content request
   */
  const createRequest = async (input: ContentRequestInput) => {
    const res = await fetch('/api/client/content-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to create content request');
    }

    const result = await res.json();

    // Refresh the content projects list
    await mutate();

    return result.data;
  };

  return {
    projects: data?.projects ?? [],
    isLoading,
    error,
    createRequest,
    refetch: mutate,
  };
}
