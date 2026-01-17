# Admin Content Workflow - Complete Implementation Guide

**Date:** January 17, 2026
**Goal:** Build admin interface for content team to manage client content requests

---

## 🎯 What We're Building

**Admin Portal Page** where content team can:
1. View all content requests from clients
2. Update project status (DRAFT → IN_PROGRESS → REVIEW → PUBLISHED)
3. Add draft URLs (Google Docs, Figma, etc.)
4. Add final URLs (published blog post, video, etc.)
5. Assign projects to team members
6. Add internal notes

---

## 📁 Files to Create

### **1. Admin API Endpoint**
**File:** `src/app/api/admin/content-projects/[id]/route.ts`

```typescript
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";
import { NextResponse } from "next/server";

/**
 * PATCH /api/admin/content-projects/:id
 * Update a content project (admin only)
 */
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  // Check admin access
  if (!session?.user || session.user.role !== 'ADMIN') {
    return apiError('Unauthorized - Admin access required', 401);
  }

  try {
    const body = await req.json();
    const { status, draftUrl, finalUrl, assignedTo, note } = body;

    // Find project
    const project = await prisma.contentProject.findUnique({
      where: { id: params.id },
    });

    if (!project) {
      return apiError('Project not found', 404);
    }

    // Update project
    const updated = await prisma.contentProject.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(draftUrl !== undefined && { draftUrl }),
        ...(finalUrl !== undefined && { finalUrl }),
        ...(assignedTo && { assignedTo }),
        ...(note !== undefined && {
          description: `${project.description}\n\n--- Admin Note (${new Date().toLocaleDateString()}) ---\n${note}`
        }),
        ...(status === 'PUBLISHED' && !project.publishedAt && {
          publishedAt: new Date()
        }),
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    // TODO: Send email notification to client
    console.log(`📧 Would send email to ${updated.user.email}`);

    return apiSuccess({ project: updated });
  } catch (error) {
    console.error('Error updating project:', error);
    return apiError('Failed to update project', 500);
  }
}

/**
 * GET /api/admin/content-projects/:id
 * Get project details (admin only)
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'ADMIN') {
    return apiError('Unauthorized', 401);
  }

  try {
    const project = await prisma.contentProject.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: { id: true, name: true, email: true, company: true },
        },
      },
    });

    if (!project) {
      return apiError('Project not found', 404);
    }

    return apiSuccess({ project });
  } catch (error) {
    console.error('Error fetching project:', error);
    return apiError('Failed to fetch project', 500);
  }
}
```

---

### **2. Admin List API Endpoint**
**File:** `src/app/api/admin/content-projects/route.ts`

```typescript
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

/**
 * GET /api/admin/content-projects
 * List all content projects (admin only)
 */
export async function GET(req: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'ADMIN') {
    return apiError('Unauthorized', 401);
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status'); // DRAFT, IN_PROGRESS, REVIEW, PUBLISHED
  const search = searchParams.get('search');

  try {
    const projects = await prisma.contentProject.findMany({
      where: {
        ...(status && { status }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { user: { name: { contains: search, mode: 'insensitive' } } },
          ],
        }),
      },
      include: {
        user: {
          select: { id: true, name: true, email: true, company: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Calculate stats
    const stats = {
      total: projects.length,
      draft: projects.filter(p => p.status === 'DRAFT').length,
      inProgress: projects.filter(p => p.status === 'IN_PROGRESS').length,
      review: projects.filter(p => p.status === 'REVIEW').length,
      published: projects.filter(p => p.status === 'PUBLISHED').length,
    };

    return apiSuccess({ projects, stats });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return apiError('Failed to fetch projects', 500);
  }
}
```

---

### **3. React Hook for Admin**
**File:** `src/hooks/useAdminContentProjects.ts`

```typescript
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Filters = {
  status?: 'DRAFT' | 'IN_PROGRESS' | 'REVIEW' | 'PUBLISHED';
  search?: string;
};

export function useAdminContentProjects(filters: Filters = {}) {
  const params = new URLSearchParams();
  if (filters.status) params.set('status', filters.status);
  if (filters.search) params.set('search', filters.search);

  const url = `/api/admin/content-projects${params.toString() ? `?${params}` : ''}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  /**
   * Update a content project
   */
  const updateProject = async (
    id: string,
    updates: {
      status?: string;
      draftUrl?: string;
      finalUrl?: string;
      assignedTo?: string;
      note?: string;
    }
  ) => {
    const res = await fetch(`/api/admin/content-projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to update project');
    }

    const result = await res.json();
    await mutate(); // Refresh list
    return result.data;
  };

  return {
    projects: data?.projects ?? [],
    stats: data?.stats,
    isLoading,
    error,
    updateProject,
    refetch: mutate,
  };
}
```

---

### **4. Admin Content Projects Page**
**File:** `src/app/portal/admin/content-projects/page.tsx`

```typescript
'use client';

import React from 'react';
import { useAdminContentProjects } from '@/hooks/useAdminContentProjects';
import PortalShellV2 from '@/components/portal/PortalShellV2';

export default function AdminContentProjectsPage() {
  const [statusFilter, setStatusFilter] = React.useState<string>('');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [editingProject, setEditingProject] = React.useState<any>(null);

  const { projects, stats, isLoading, updateProject } = useAdminContentProjects({
    status: statusFilter as any,
    search: searchTerm,
  });

  const handleUpdateStatus = async (projectId: string, newStatus: string) => {
    try {
      await updateProject(projectId, { status: newStatus });
      // Success toast
    } catch (error) {
      console.error('Failed to update status:', error);
      // Error toast
    }
  };

  const handleAddDraftUrl = async (projectId: string, draftUrl: string) => {
    try {
      await updateProject(projectId, {
        status: 'REVIEW', // Move to review when draft is added
        draftUrl
      });
    } catch (error) {
      console.error('Failed to add draft URL:', error);
    }
  };

  const handlePublish = async (projectId: string, finalUrl: string) => {
    try {
      await updateProject(projectId, {
        status: 'PUBLISHED',
        finalUrl
      });
    } catch (error) {
      console.error('Failed to publish:', error);
    }
  };

  if (isLoading) {
    return (
      <PortalShellV2 isAdmin role="ADMIN">
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-400">Loading projects...</div>
        </div>
      </PortalShellV2>
    );
  }

  return (
    <PortalShellV2 isAdmin role="ADMIN">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Content Projects</h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage client content requests
            </p>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-gray-400 text-xs">Total</div>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-gray-400 text-xs">Draft</div>
              <div className="text-2xl font-bold text-gray-300">{stats.draft}</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-gray-400 text-xs">In Progress</div>
              <div className="text-2xl font-bold text-blue-400">{stats.inProgress}</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-gray-400 text-xs">Review</div>
              <div className="text-2xl font-bold text-yellow-400">{stats.review}</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-gray-400 text-xs">Published</div>
              <div className="text-2xl font-bold text-green-400">{stats.published}</div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white"
          >
            <option value="">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="REVIEW">Review</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>

        {/* Projects Table */}
        <div className="bg-slate-800/50 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400">
                  Client
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400">
                  Title
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400">
                  Type
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400">
                  Due Date
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {projects.map((project: any) => (
                <tr key={project.id} className="hover:bg-slate-700/30">
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">{project.user.name}</div>
                    <div className="text-xs text-gray-400">{project.user.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-white">{project.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{project.type}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={project.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setEditingProject(project)}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal (simplified) */}
        {editingProject && (
          <ProjectEditModal
            project={editingProject}
            onClose={() => setEditingProject(null)}
            onUpdate={updateProject}
          />
        )}
      </div>
    </PortalShellV2>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const colors = {
    DRAFT: 'bg-gray-500/20 text-gray-300',
    IN_PROGRESS: 'bg-blue-500/20 text-blue-300',
    REVIEW: 'bg-yellow-500/20 text-yellow-300',
    PUBLISHED: 'bg-green-500/20 text-green-300',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs ${colors[status as keyof typeof colors] || colors.DRAFT}`}>
      {status.replace('_', ' ')}
    </span>
  );
}

// Project Edit Modal Component (simplified - full implementation would be larger)
function ProjectEditModal({ project, onClose, onUpdate }: any) {
  const [status, setStatus] = React.useState(project.status);
  const [draftUrl, setDraftUrl] = React.useState(project.draftUrl || '');
  const [finalUrl, setFinalUrl] = React.useState(project.finalUrl || '');
  const [assignedTo, setAssignedTo] = React.useState(project.assignedTo || '');
  const [note, setNote] = React.useState('');

  const handleSave = async () => {
    try {
      await onUpdate(project.id, {
        status,
        draftUrl: draftUrl || null,
        finalUrl: finalUrl || null,
        assignedTo,
        note: note || undefined,
      });
      onClose();
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-white mb-4">Manage Project</h2>

        {/* Status Dropdown */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
          >
            <option value="DRAFT">Draft</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="REVIEW">Review</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>

        {/* Draft URL */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Draft URL</label>
          <input
            type="url"
            value={draftUrl}
            onChange={(e) => setDraftUrl(e.target.value)}
            placeholder="https://docs.google.com/..."
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
          />
        </div>

        {/* Final URL */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Final URL</label>
          <input
            type="url"
            value={finalUrl}
            onChange={(e) => setFinalUrl(e.target.value)}
            placeholder="https://blog.example.com/..."
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
          />
        </div>

        {/* Assigned To */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Assigned To</label>
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            placeholder="Sarah Johnson"
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
          />
        </div>

        {/* Internal Note */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Add Note (optional)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Internal notes for team..."
            rows={3}
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 🚀 Implementation Steps

### **Step 1: Create API Endpoints** (30-45 min)
1. Create `src/app/api/admin/content-projects/route.ts` (list endpoint)
2. Create `src/app/api/admin/content-projects/[id]/route.ts` (update endpoint)
3. Test with curl or Postman

### **Step 2: Create React Hook** (15-20 min)
1. Create `src/hooks/useAdminContentProjects.ts`
2. Test data fetching

### **Step 3: Create Admin Page** (1-2 hours)
1. Create `src/app/portal/admin/content-projects/page.tsx`
2. Build table view
3. Add filters and search
4. Create edit modal

### **Step 4: Add to Admin Navigation** (5 min)
Update `src/config/portalNav.ts`:
```typescript
{
  label: 'Content Projects',
  href: '/portal/admin/content-projects',
  icon: DocumentTextIcon,
}
```

### **Step 5: Test Complete Workflow** (30 min)
1. Client submits content request
2. Admin sees it in Content Projects page
3. Admin updates status to "In Progress"
4. Admin adds draft URL, status becomes "Review"
5. Client sees draft URL, clicks Eye button
6. Admin adds final URL, status becomes "Published"
7. Client sees published content

---

## 📧 Email Notifications (Optional Enhancement)

Add email service to notify clients when status changes:

```typescript
// In API endpoint after updating project
import { sendEmail } from '@/lib/email';

if (status === 'REVIEW' && draftUrl) {
  await sendEmail({
    to: updated.user.email,
    subject: 'Your content draft is ready for review',
    template: 'content-draft-ready',
    data: { project: updated, draftUrl },
  });
}

if (status === 'PUBLISHED' && finalUrl) {
  await sendEmail({
    to: updated.user.email,
    subject: 'Your content has been published!',
    template: 'content-published',
    data: { project: updated, finalUrl },
  });
}
```

---

## ✅ Success Criteria

**When Implementation is Complete:**
- [ ] Admin can view all content requests in one place
- [ ] Admin can update project status via dropdown
- [ ] Admin can add draft URL → Eye button works for client
- [ ] Admin can add final URL → Project marked as published
- [ ] Admin can assign team members
- [ ] Admin can add internal notes
- [ ] Client receives email when draft is ready (optional)
- [ ] Client receives email when content is published (optional)
- [ ] All changes persist in PostgreSQL database

---

## 🎯 Time Estimate

| Task | Time |
|------|------|
| API endpoints | 30-45 min |
| React hook | 15-20 min |
| Admin page UI | 1-2 hours |
| Testing | 30 min |
| **Total** | **2.5-3.5 hours** |

---

**Next Step:** Start with creating the API endpoints first, then build the UI on top of them.
