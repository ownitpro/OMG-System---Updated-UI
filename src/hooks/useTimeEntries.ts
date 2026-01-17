import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export interface TimeEntry {
  id: string;
  project: string;
  description: string | null;
  startTime: string;
  endTime: string | null;
  duration: number | null; // minutes
  billable: boolean;
  tags: string[];
  createdAt: string;
}

export interface CreateTimeEntryInput {
  project: string;
  description?: string;
  startTime?: string; // Default to now if not provided
  endTime?: string; // Null for running entries
  billable?: boolean;
  tags?: string[];
}

export interface UpdateTimeEntryInput {
  project?: string;
  description?: string;
  startTime?: string;
  endTime?: string | null;
  billable?: boolean;
  tags?: string[];
}

export interface TimeEntryFilters {
  startDate?: string;
  endDate?: string;
  project?: string;
}

export function useTimeEntries(filters: TimeEntryFilters = {}) {
  const params = new URLSearchParams();
  if (filters.startDate) params.set('startDate', filters.startDate);
  if (filters.endDate) params.set('endDate', filters.endDate);
  if (filters.project) params.set('project', filters.project);

  const queryString = params.toString();
  const url = `/api/client/time-entries${queryString ? `?${queryString}` : ''}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  const startTimer = async (input: CreateTimeEntryInput) => {
    const res = await fetch('/api/client/time-entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...input,
        startTime: input.startTime || new Date().toISOString(),
        endTime: null, // Running entry
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to start timer');
    }

    const result = await res.json();
    await mutate(); // Refresh the list
    return result.data?.entry;
  };

  const stopTimer = async (id: string) => {
    const res = await fetch(`/api/client/time-entries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endTime: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to stop timer');
    }

    const result = await res.json();
    await mutate(); // Refresh the list
    return result.data?.entry;
  };

  const createEntry = async (input: CreateTimeEntryInput) => {
    const res = await fetch('/api/client/time-entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...input,
        startTime: input.startTime || new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to create time entry');
    }

    const result = await res.json();
    await mutate(); // Refresh the list
    return result.data?.entry;
  };

  const updateEntry = async (id: string, updates: UpdateTimeEntryInput) => {
    const res = await fetch(`/api/client/time-entries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to update time entry');
    }

    const result = await res.json();
    await mutate(); // Refresh the list
    return result.data?.entry;
  };

  const deleteEntry = async (id: string) => {
    const res = await fetch(`/api/client/time-entries/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to delete time entry');
    }

    await mutate(); // Refresh the list
  };

  return {
    entries: (data?.data?.entries as TimeEntry[]) || [],
    isLoading,
    error,
    refetch: mutate,
    startTimer,
    stopTimer,
    createEntry,
    updateEntry,
    deleteEntry,
  };
}
