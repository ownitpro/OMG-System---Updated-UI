import React from "react";
import { DocumentIcon, EyeIcon, ArrowDownTrayIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";

interface Document {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  organization: {
    name: string;
    slug: string;
  };
}

interface DocumentsPageProps {
  documents: Document[];
}

export function DocumentsPage({ documents }: DocumentsPageProps) {
  const getCategoryBadge = (category: string | null) => {
    if (!category) return null;
    
    switch (category.toLowerCase()) {
      case "contract":
        return <Badge variant="info">Contract</Badge>;
      case "invoice":
        return <Badge variant="warning">Invoice</Badge>;
      case "report":
        return <Badge variant="secondary">Report</Badge>;
      case "manual":
        return <Badge variant="success">Manual</Badge>;
      default:
        return <Badge variant="outline">{category}</Badge>;
    }
  };

  const getVisibilityBadge = (isPublic: boolean) => {
    return isPublic ? (
      <Badge variant="success">Public</Badge>
    ) : (
      <Badge variant="secondary">Private</Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Upload New Document */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Upload Documents</h3>
            <p className="mt-1 text-sm text-gray-500">
              Share important files with your team
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Upload Document
          </button>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Your Documents</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            All documents you have access to across your organizations
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {documents.length === 0 ? (
            <li className="px-4 py-4 sm:px-6">
              <div className="text-center">
                <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You don't have access to any documents yet
                </p>
              </div>
            </li>
          ) : (
            documents.map((document) => (
              <li key={document.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <DocumentIcon className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-blue-600">
                            {document.title}
                          </p>
                          <div className="ml-2 flex space-x-1">
                            {getCategoryBadge(document.category)}
                            {getVisibilityBadge(document.isPublic)}
                          </div>
                        </div>
                        {document.description && (
                          <p className="text-sm text-gray-500 truncate">
                            {document.description}
                          </p>
                        )}
                        <div className="mt-1 text-sm text-gray-400">
                          <span className="font-medium">{document.organization.name}</span>
                          {" • "}
                          Created {new Date(document.createdAt).toLocaleDateString()}
                          {document.updatedAt.getTime() !== document.createdAt.getTime() && (
                            <> • Updated {new Date(document.updatedAt).toLocaleDateString()}</>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <EyeIcon className="h-4 w-4 mr-1" />
                        View
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Document Categories */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Document Categories</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900">Contracts</h4>
            <p className="text-sm text-gray-500">
              {documents.filter(d => d.category?.toLowerCase() === "contract").length} documents
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900">Invoices</h4>
            <p className="text-sm text-gray-500">
              {documents.filter(d => d.category?.toLowerCase() === "invoice").length} documents
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900">Reports</h4>
            <p className="text-sm text-gray-500">
              {documents.filter(d => d.category?.toLowerCase() === "report").length} documents
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900">Manuals</h4>
            <p className="text-sm text-gray-500">
              {documents.filter(d => d.category?.toLowerCase() === "manual").length} documents
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}