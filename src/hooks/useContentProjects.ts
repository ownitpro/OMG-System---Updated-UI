import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export interface ContentProject {
  id: string;
  title: string;
  description: string | null;
  type: string;
  status: 'DRAFT' | 'IN_PROGRESS' | 'REVIEW' | 'PUBLISHED';
  dueDate: string | null;
  publishedAt: string | null;
  assignedTo: string | null;
  wordCount: number | null;
  targetKeywords: string | null;
  draftUrl: string | null;
  finalUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContentProjectInput {
  title: string;
  description?: string;
  type: string;
  dueDate?: string;
  assignedTo?: string;
  wordCount?: number;
  targetKeywords?: string;
}

export interface UpdateContentProjectInput {
  title?: string;
  description?: string;
  type?: string;
  status?: 'DRAFT' | 'IN_PROGRESS' | 'REVIEW' | 'PUBLISHED';
  dueDate?: string;
  publishedAt?: string;
  assignedTo?: string;
  wordCount?: number;
  targetKeywords?: string;
  draftUrl?: string;
  finalUrl?: string;
}

export function useContentProjects(status?: string) {
  const params = status ? `?status=${status}` : '';
  const url = `/api/client/content${params}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  const createProject = async (input: CreateContentProjectInput) => {
    const res = await fetch('/api/client/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to create content project');
    }

    const result = await res.json();
    await mutate(); // Refresh the list
    return result.data?.project;
  };

  const updateProject = async (id: string, updates: UpdateContentProjectInput) => {
    const res = await fetch(`/api/client/content/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to update content project');
    }

    const result = await res.json();
    await mutate(); // Refresh the list
    return result.data?.project;
  };

  const deleteProject = async (id: string) => {
    const res = await fetch(`/api/client/content/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to delete content project');
    }

    await mutate(); // Refresh the list
  };

  return {
    projects: (data?.data?.projects as ContentProject[]) || [],
    isLoading,
    error,
    refetch: mutate,
    createProject,
    updateProject,
    deleteProject,
  };
}
