import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export interface CustomProject {
  id: string;
  name: string;
  description: string | null;
  type: string;
  status: 'PLANNING' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED' | 'ON_HOLD';
  startDate: string | null;
  targetEndDate: string | null;
  completedAt: string | null;
  progress: number;
  milestones: string | null;
  deliverables: string | null;
  nextDeliverable: string | null;
  assignedTeam: string | null;
  estimatedHours: number | null;
  actualHours: number | null;
  budget: number | null;
  spent: number | null;
  repositoryUrl: string | null;
  documentationUrl: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomProjectInput {
  name: string;
  description?: string;
  type: string;
  startDate?: string;
  targetEndDate?: string;
  estimatedHours?: number;
  budget?: number;
  milestones?: string;
  deliverables?: string;
  assignedTeam?: string;
}

export interface UpdateCustomProjectInput {
  name?: string;
  description?: string;
  type?: string;
  status?: 'PLANNING' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED' | 'ON_HOLD';
  startDate?: string;
  targetEndDate?: string;
  completedAt?: string;
  progress?: number;
  milestones?: string;
  deliverables?: string;
  nextDeliverable?: string;
  assignedTeam?: string;
  estimatedHours?: number;
  actualHours?: number;
  budget?: number;
  spent?: number;
  repositoryUrl?: string;
  documentationUrl?: string;
  notes?: string;
}

export function useCustomProjects(status?: string) {
  const params = status ? `?status=${status}` : '';
  const url = `/api/client/custom${params}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  const createProject = async (input: CreateCustomProjectInput) => {
    const res = await fetch('/api/client/custom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to create custom project');
    }

    const result = await res.json();
    await mutate(); // Refresh the list
    return result.data?.project;
  };

  const updateProject = async (id: string, updates: UpdateCustomProjectInput) => {
    const res = await fetch(`/api/client/custom/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to update custom project');
    }

    const result = await res.json();
    await mutate(); // Refresh the list
    return result.data?.project;
  };

  const deleteProject = async (id: string) => {
    const res = await fetch(`/api/client/custom/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to delete custom project');
    }

    await mutate(); // Refresh the list
  };

  return {
    projects: (data?.data?.projects as CustomProject[]) || [],
    isLoading,
    error,
    refetch: mutate,
    createProject,
    updateProject,
    deleteProject,
  };
}
