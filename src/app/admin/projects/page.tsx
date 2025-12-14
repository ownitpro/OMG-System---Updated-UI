import React from "react";
import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { AdminProjectsIndex } from "@/components/admin/admin-projects-index";

export const dynamic = 'force-dynamic';
export default async function AdminProjectsPage() {
  await requireAdmin();

  // Fetch projects with related data
  const projects = await prisma.project.findMany({
    include: {
      user: { select: { name: true, email: true } },
      organization: { select: { name: true, slug: true } },
      tasks: {
        include: {
          user: { select: { name: true } }
        }
      },
      _count: {
        select: {
          tasks: true,
          messages: true,
          attachments: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  // Get summary stats
  const stats = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: "PLANNING" } }),
    prisma.project.count({ where: { status: "IN_PROGRESS" } }),
    prisma.project.count({ where: { status: "COMPLETED" } }),
    prisma.project.count({ where: { status: "ON_HOLD" } }),
    prisma.task.count({ where: { status: "TODO" } }),
    prisma.task.count({ where: { status: "IN_PROGRESS" } }),
    prisma.task.count({ where: { status: "COMPLETED" } })
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Projects & Tasks</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage projects and tasks across all organizations
        </p>
      </div>

      <AdminProjectsIndex 
        projects={projects}
        stats={{
          totalProjects: stats[0],
          planning: stats[1],
          inProgress: stats[2],
          completed: stats[3],
          onHold: stats[4],
          totalTasks: stats[5] + stats[6] + stats[7],
          todoTasks: stats[5],
          inProgressTasks: stats[6],
          completedTasks: stats[7]
        }}
      />
    </div>
  );
}
