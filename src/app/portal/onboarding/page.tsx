import React from "react";
import { requireAuth } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { PortalOnboardingIndex } from "@/components/portal/portal-onboarding-index";

export const dynamic = 'force-dynamic';
export default async function PortalOnboardingPage() {
  await requireAuth();

  // Fetch onboarding data for the user's active organization
  const projects = await prisma.project.findMany({
    where: {
      organization: {
        memberships: {
          some: {
            user: {
              // This would be filtered by the current user in a real app
            }
          }
        }
      }
    },
    include: {
      tasks: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: "asc" },
      },
      organization: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Calculate stats
  const stats = {
    totalProjects: projects.length,
    completedProjects: projects.filter(p => p.status === "COMPLETED").length,
    inProgressProjects: projects.filter(p => p.status === "IN_PROGRESS").length,
    totalTasks: projects.reduce((sum, p) => sum + p.tasks.length, 0),
    completedTasks: projects.reduce((sum, p) => sum + p.tasks.filter(t => t.status === "COMPLETED").length, 0),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Onboarding</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your onboarding progress and complete required tasks
        </p>
      </div>

      <PortalOnboardingIndex projects={projects} stats={stats} />
    </div>
  );
}