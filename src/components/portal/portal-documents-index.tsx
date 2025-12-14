"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  DocumentTextIcon, 
  DocumentIcon,
  PhotoIcon,
  PaperClipIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  UserIcon,
  BuildingOfficeIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

interface Document {
  id: string;
  name: string;
  url: string;
  size: number;
  mimeType: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string | null;
    email: string;
  };
  organization: {
    name: string;
    slug: string;
  };
}

interface PortalDocumentsIndexProps {
  documents: Document[];
  stats: {
    totalDocuments: number;
    recent: number;
    byType: {
      pdf: number;
      image: number;
      document: number;
      other: number;
    };
  };
}

export function PortalDocumentsIndex({ documents, stats }: PortalDocumentsIndexProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortBy, setSortBy] = useState<"createdAt" | "updatedAt" | "name" | "size">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filter and sort documents
  const filteredDocuments = useMemo(() => {
    let filtered = documents.filter(doc => {
      const matchesSearch = 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = !filterType || 
        (filterType === "pdf" && doc.mimeType === "application/pdf") ||
        (filterType === "image" && doc.mimeType.startsWith("image/")) ||
        (filterType === "document" && (doc.mimeType.includes("document") || doc.mimeType.includes("text"))) ||
        (filterType === "other" && !doc.mimeType.includes("pdf") && !doc.mimeType.startsWith("image/") && !doc.mimeType.includes("document") && !doc.mimeType.includes("text"));
      
      return matchesSearch && matchesType;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case "createdAt":
          aValue = a.createdAt;
          bValue = b.createdAt;
          break;
        case "updatedAt":
          aValue = a.updatedAt;
          bValue = b.updatedAt;
          break;
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "size":
          aValue = a.size;
          bValue = b.size;
          break;
        default:
          aValue = a.createdAt;
          bValue = b.createdAt;
      }
      
      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [documents, searchQuery, filterType, sortBy, sortOrder]);

  const getDocumentIcon = (mimeType: string) => {
    if (mimeType === "application/pdf") {
      return DocumentTextIcon;
    } else if (mimeType.startsWith("image/")) {
      return PhotoIcon;
    } else if (mimeType.includes("document") || mimeType.includes("text")) {
      return DocumentIcon;
    } else {
      return PaperClipIcon;
    }
  };

  const getDocumentTypeColor = (mimeType: string) => {
    if (mimeType === "application/pdf") {
      return "bg-red-100 text-red-800";
    } else if (mimeType.startsWith("image/")) {
      return "bg-green-100 text-green-800";
    } else if (mimeType.includes("document") || mimeType.includes("text")) {
      return "bg-blue-100 text-blue-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentTextIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Documents
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalDocuments}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Recent (7 days)
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.recent}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentTextIcon className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    PDFs
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.byType.pdf}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <PhotoIcon className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Images
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.byType.image}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Documents ({filteredDocuments.length})
            </h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Types</option>
              <option value="pdf">PDF</option>
              <option value="image">Images</option>
              <option value="document">Documents</option>
              <option value="other">Other</option>
            </select>

            {/* Sort */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as any);
                setSortOrder(order as any);
              }}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="updatedAt-desc">Recently Updated</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="size-desc">Largest First</option>
              <option value="size-asc">Smallest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.map((document) => {
          const DocumentIcon = getDocumentIcon(document.mimeType);
          
          return (
            <div key={document.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <DocumentIcon className="h-8 w-8 text-gray-400 mr-3" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {document.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {document.mimeType}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <UserIcon className="h-4 w-4 mr-2" />
                    <span>{document.user.name || document.user.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span>{getTimeAgo(document.createdAt)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <PaperClipIcon className="h-4 w-4 mr-2" />
                    <span>{formatFileSize(document.size)}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDocumentTypeColor(document.mimeType)}`}>
                    {document.mimeType === "application/pdf" ? "PDF" :
                     document.mimeType.startsWith("image/") ? "Image" :
                     document.mimeType.includes("document") || document.mimeType.includes("text") ? "Document" :
                     "Other"}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <a
                      href={document.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-900"
                      title="View document"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </a>
                    <a
                      href={document.url}
                      download
                      className="text-gray-600 hover:text-gray-900"
                      title="Download document"
                    >
                          <ArrowDownTrayIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No documents found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}
