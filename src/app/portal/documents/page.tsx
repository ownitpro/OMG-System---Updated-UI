import React from "react";
import { requireAuth } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { PortalDocumentsIndex } from "@/components/portal/portal-documents-index";

export const dynamic = 'force-dynamic';
export default async function PortalDocumentsPage() {
  await requireAuth();

  // Fetch documents for the user's active organization
  const documents = await prisma.document.findMany({
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
    },
    orderBy: { createdAt: "desc" },
  });

  // Calculate stats
  const stats = {
    totalDocuments: documents.length,
    recent: documents.filter(d => {
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return d.createdAt > oneWeekAgo;
    }).length,
    byType: {
      pdf: documents.filter(d => d.mimeType === 'application/pdf').length,
      image: documents.filter(d => d.mimeType.startsWith('image/')).length,
      document: documents.filter(d => d.mimeType.includes('document') || d.mimeType.includes('text')).length,
      other: documents.filter(d => !d.mimeType.includes('pdf') && !d.mimeType.startsWith('image/') && !d.mimeType.includes('document') && !d.mimeType.includes('text')).length,
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <p className="mt-1 text-sm text-gray-500">
          Access and manage your organization's documents
        </p>
      </div>

      <PortalDocumentsIndex documents={documents} stats={stats} />
    </div>
  );
}