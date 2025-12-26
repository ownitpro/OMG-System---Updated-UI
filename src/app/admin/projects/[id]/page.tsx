import React from "react";
import { requireAuth } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { ProjectDetailTabs } from "@/components/admin/project-detail-tabs";

interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = 'force-dynamic';
export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  await requireAuth();
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      organization: {
        select: {
          name: true,
          slug: true,
        },
      },
      tasks: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
      messages: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
      attachments: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!project) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Project not found</h1>
        <p className="mt-2 text-gray-600">The project you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div>
      <ProjectDetailTabs 
        project={project} 
        showClientView={false}
        onToggleClientView={() => {}} // This would be handled by a client component wrapper
      />
    </div>
  );
}
