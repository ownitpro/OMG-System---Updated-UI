import React from "react";
import { requireAuth } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { PortalProjectDetailTabs } from "@/components/portal/portal-project-detail-tabs";

interface PortalProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = 'force-dynamic';
export default async function PortalProjectDetailPage({ params }: PortalProjectDetailPageProps) {
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
        orderBy: { createdAt: "asc" },
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
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
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
      <PortalProjectDetailTabs project={project} />
    </div>
  );
}
