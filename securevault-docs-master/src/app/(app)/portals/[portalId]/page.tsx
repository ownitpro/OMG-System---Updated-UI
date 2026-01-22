'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  Users,
  FileText,
  Clock,
  Settings,
  Download,
  ExternalLink,
  Folder,
  FolderOpen,
  ChevronRight,
  CheckCircle2,
  Home,
  Eye,
  X,
  Image as ImageIcon,
  File,
  Video,
  Music
} from 'lucide-react';

interface Portal {
  id: string;
  name: string;
  description: string;
  client: {
    name: string;
    email: string;
  };
  createdAt: string;
  organizationId: string;
  personalVaultId: string | null;
}

interface PortalUpload {
  id: string;
  portalId: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  status: 'open' | 'partial' | 'complete' | 'closed';
  storageKey?: string;
  folderPath?: string[];
}

interface FolderNode {
  name: string;
  files: PortalUpload[];
  subfolders: Map<string, FolderNode>;
}

export default function PortalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { activeOrg, isPersonalVault } = useOrganization();
  const { user } = useAuth();
  const portalId = params.portalId as string;

  const [portal, setPortal] = useState<Portal | null>(null);
  const [uploads, setUploads] = useState<PortalUpload[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [previewFile, setPreviewFile] = useState<PortalUpload | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  useEffect(() => {
    if (!activeOrg || !user?.id) return;

    const fetchPortalData = async () => {
      try {
        setLoading(true);

        // Fetch portal details
        const endpoint = isPersonalVault
          ? `/api/personal/portals/${portalId}`
          : `/api/org/${activeOrg.id}/portals/${portalId}`;

        const portalRes = await fetch(endpoint, {
          headers: {
            'x-user-id': user.id,
          },
        });
        if (portalRes.ok) {
          const portalData = await portalRes.json();
          setPortal(portalData.portal || portalData);
        }

        // Fetch portal uploads (documents uploaded by client)
        const uploadsRes = await fetch(`/api/portal/${portalId}/uploads`, {
          headers: {
            'x-user-id': user.id,
          },
        });
        if (uploadsRes.ok) {
          const uploadsData = await uploadsRes.json();
          setUploads(uploadsData.requests || []);
        }
      } catch (error) {
        console.error('Error fetching portal data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortalData();
  }, [activeOrg, portalId, isPersonalVault, user?.id]);

  // PostgreSQL returns BIGINT as string, so we handle both number and string inputs
  const formatFileSize = (bytes: number | string) => {
    const numBytes = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes;
    if (!numBytes || numBytes === 0 || isNaN(numBytes)) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.min(Math.floor(Math.log(numBytes) / Math.log(k)), sizes.length - 1);
    return parseFloat((numBytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleDownload = async (upload: PortalUpload) => {
    if (!upload.storageKey) return;

    try {
      const response = await fetch(`/api/portal/${portalId}/download?requestId=${upload.id}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = upload.fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  // Helper to detect MIME type from filename
  const getMimeType = (fileName: string): string => {
    const ext = fileName.toLowerCase().split('.').pop();
    const mimeTypes: Record<string, string> = {
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      svg: 'image/svg+xml',
      mp4: 'video/mp4',
      webm: 'video/webm',
      mp3: 'audio/mpeg',
      wav: 'audio/wav',
      txt: 'text/plain',
      csv: 'text/csv',
    };
    return mimeTypes[ext || ''] || 'application/octet-stream';
  };

  // Check if file can be previewed
  const canPreview = (fileName: string): boolean => {
    const mimeType = getMimeType(fileName);
    return mimeType.startsWith('image/') ||
           mimeType === 'application/pdf' ||
           mimeType.startsWith('video/') ||
           mimeType.startsWith('audio/') ||
           mimeType.startsWith('text/');
  };

  // Handle preview click
  const handlePreview = async (upload: PortalUpload) => {
    if (!upload.storageKey) return;

    setPreviewFile(upload);
    setPreviewLoading(true);
    setPreviewError(null);
    setPreviewUrl(null);

    try {
      const response = await fetch(`/api/portal/${portalId}/preview?storageKey=${encodeURIComponent(upload.storageKey)}`, {
        headers: {
          'x-user-id': user?.id || '',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPreviewUrl(data.url);
      } else {
        setPreviewError('Failed to load preview');
      }
    } catch (error) {
      console.error('Error loading preview:', error);
      setPreviewError('Failed to load preview');
    } finally {
      setPreviewLoading(false);
    }
  };

  // Close preview modal
  const closePreview = () => {
    setPreviewFile(null);
    setPreviewUrl(null);
    setPreviewError(null);
  };

  // Get file icon based on type
  const getFileIcon = (fileName: string) => {
    const mimeType = getMimeType(fileName);
    if (mimeType.startsWith('image/')) return <ImageIcon className="w-6 h-6 text-purple-500" />;
    if (mimeType.startsWith('video/')) return <Video className="w-6 h-6 text-pink-500" />;
    if (mimeType.startsWith('audio/')) return <Music className="w-6 h-6 text-blue-500" />;
    if (mimeType === 'application/pdf') return <FileText className="w-6 h-6 text-red-500" />;
    return <File className="w-6 h-6 text-teal-600" />;
  };

  // Render preview content
  const renderPreviewContent = () => {
    if (!previewFile || !previewUrl) return null;

    const mimeType = getMimeType(previewFile.fileName);

    // Image preview
    if (mimeType.startsWith('image/')) {
      return (
        <div className="flex items-center justify-center h-full p-4">
          <img
            src={previewUrl}
            alt={previewFile.fileName}
            className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
          />
        </div>
      );
    }

    // PDF preview
    if (mimeType === 'application/pdf') {
      return (
        <div className="h-full w-full">
          <iframe
            src={previewUrl}
            className="w-full h-full rounded-lg"
            title={previewFile.fileName}
          />
        </div>
      );
    }

    // Video preview
    if (mimeType.startsWith('video/')) {
      return (
        <div className="flex items-center justify-center h-full p-4">
          <video
            src={previewUrl}
            controls
            className="max-w-full max-h-full rounded-lg shadow-lg"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    // Audio preview
    if (mimeType.startsWith('audio/')) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8">
          <div className="p-8 rounded-full bg-blue-500/10 mb-6">
            <Music className="w-24 h-24 text-blue-500" />
          </div>
          <p className="font-bold text-navy text-xl mb-6 font-display">
            {previewFile.fileName}
          </p>
          <audio src={previewUrl} controls className="w-full max-w-md">
            Your browser does not support the audio tag.
          </audio>
        </div>
      );
    }

    // Text files
    if (mimeType.startsWith('text/')) {
      return (
        <div className="h-full w-full overflow-auto p-6 bg-white rounded-lg border border-slate-200">
          <iframe
            src={previewUrl}
            className="w-full h-full border-none"
            title={previewFile.fileName}
          />
        </div>
      );
    }

    // Fallback for unsupported file types
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="p-6 rounded-full bg-slate-100 mb-6">
          {getFileIcon(previewFile.fileName)}
        </div>
        <p className="font-bold text-navy text-lg mt-4 mb-2 font-display">
          {previewFile.fileName}
        </p>
        <p className="text-sm mb-6 text-slate-500 font-medium">
          Preview not available for this file type
        </p>
        <button
          onClick={() => handleDownload(previewFile)}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold transition-all shadow-lg shadow-blue-500/20"
        >
          <Download className="w-4 h-4" />
          Download to view
        </button>
      </div>
    );
  };

  // Build folder tree from uploads
  const buildFolderTree = (): FolderNode => {
    const root: FolderNode = { name: 'Client Vault', files: [], subfolders: new Map() };

    for (const upload of uploads) {
      const path = upload.folderPath || ['Uploads', new Date(upload.uploadedAt).getFullYear().toString()];
      let current = root;

      // Navigate/create folder path
      for (const folderName of path) {
        if (!current.subfolders.has(folderName)) {
          current.subfolders.set(folderName, {
            name: folderName,
            files: [],
            subfolders: new Map(),
          });
        }
        current = current.subfolders.get(folderName)!;
      }

      // Add file to current folder
      current.files.push(upload);
    }

    return root;
  };

  // Toggle folder expansion
  const toggleFolder = (folderPath: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folderPath)) {
        next.delete(folderPath);
      } else {
        next.add(folderPath);
      }
      return next;
    });
  };

  // Render folder tree recursively
  const renderFolderTree = (node: FolderNode, path: string[] = [], depth: number = 0) => {
    const fullPath = path.join('/');
    const isExpanded = expandedFolders.has(fullPath) || depth === 0;

    return (
      <div key={fullPath || 'root'}>
        {/* Folder header (skip for root) */}
        {depth > 0 && (
          <button
            onClick={() => toggleFolder(fullPath)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
              depth === 1 ? 'font-bold' : 'font-medium'
            } hover:bg-white/40`}
            style={{ paddingLeft: `${(depth - 1) * 16 + 12}px` }}
          >
            <ChevronRight
              className={`w-4 h-4 transition-transform text-slate-400 ${isExpanded ? 'rotate-90' : ''}`}
            />
            {isExpanded ? (
              <FolderOpen className="w-5 h-5 text-blue-500" />
            ) : (
              <Folder className="w-5 h-5 text-blue-500" />
            )}
            <span className="text-navy font-display text-sm">{node.name}</span>
            {node.files.length > 0 && (
              <span className="text-xs ml-auto text-slate-500 font-medium font-mono">
                {node.files.length} files
              </span>
            )}
          </button>
        )}

        {/* Folder contents */}
        {isExpanded && (
          <div>
            {/* Subfolders */}
            {Array.from(node.subfolders.entries()).map(([name, subfolder]) =>
              renderFolderTree(subfolder, [...path, name], depth + 1)
            )}

            {/* Files */}
            {node.files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/40 group transition-all"
                style={{ paddingLeft: `${depth * 16 + 12}px` }}
              >
                <div className="opacity-70 group-hover:opacity-100 transition-opacity">
                  {getFileIcon(file.fileName)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-navy truncate font-display">
                    {file.fileName}
                  </p>
                  <p className="text-xs text-slate-500 font-medium font-mono">
                    {formatFileSize(file.fileSize)} · {new Date(file.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {file.storageKey && canPreview(file.fileName) && (
                    <button
                      onClick={() => handlePreview(file)}
                      className="flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg transition-colors bg-purple-50 text-purple-600 hover:bg-purple-100 font-bold"
                      title="Preview file"
                    >
                      <Eye className="w-3 h-3" />
                      Preview
                    </button>
                  )}
                  <button
                    onClick={() => handleDownload(file)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-blue-600 bg-blue-50 rounded-lg transition-colors hover:bg-blue-100 font-bold"
                    title="Download file"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </div>
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
          <div className="text-slate-500 font-medium animate-pulse">Loading portal...</div>
        </div>
      </div>
    );
  }

  if (!portal) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-slate-500 font-medium">Portal not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-navy font-display tracking-tight">{portal.name}</h1>
          <p className="mt-2 text-slate-500 font-medium text-lg">{portal.description}</p>
        </div>
        <button
          onClick={() => router.push(`/portals/${portalId}/settings`)}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/40 text-navy hover:bg-white/60 font-bold transition-all border border-white/20 shadow-sm hover:shadow-md"
        >
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="w-24 h-24 text-blue-600 transform translate-x-4 -translate-y-4" />
          </div>
          <div className="relative">
            <div className="p-3 rounded-xl bg-blue-500/10 w-fit mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Client Email</p>
            <p className="text-xl font-black mt-1 text-navy font-display truncate" title={portal.client.email}>{portal.client.email}</p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FileText className="w-24 h-24 text-teal-600 transform translate-x-4 -translate-y-4" />
          </div>
          <div className="relative">
            <div className="p-3 rounded-xl bg-teal-500/10 w-fit mb-4">
              <FileText className="w-6 h-6 text-teal-600" />
            </div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Documents Uploaded</p>
            <p className="text-2xl font-black mt-1 text-navy font-display">{uploads.length}</p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Clock className="w-24 h-24 text-purple-600 transform translate-x-4 -translate-y-4" />
          </div>
          <div className="relative">
            <div className="p-3 rounded-xl bg-purple-500/10 w-fit mb-4">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Created</p>
            <p className="text-lg font-black mt-1 text-navy font-display">
              {new Date(portal.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Client Uploads - Folder Structure View */}
      <div className="glass-card rounded-2xl overflow-hidden min-h-[400px]">
        <div className="p-6 border-b border-white/20 flex items-center justify-between bg-white/30 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-navy font-display">Client Uploads</h2>
              <p className="text-sm text-slate-500 font-medium">{uploads.length} documents uploaded</p>
            </div>
          </div>
          <a
            href={`${typeof window !== 'undefined' ? window.location.origin : ''}/portal/${portalId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-bold bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Portal Link
          </a>
        </div>

        {uploads.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-50 flex items-center justify-center">
              <FileText className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-navy font-display">No uploads yet</h3>
            <p className="text-slate-500 font-medium max-w-sm mx-auto">
              Client hasn't uploaded any documents yet. Share the portal link with them to start receiving files.
            </p>
          </div>
        ) : (
          <div className="p-6">
            {/* Folder Tree */}
            <div className="space-y-2">
              {renderFolderTree(buildFolderTree())}
            </div>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewFile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={closePreview}
        >
          <div
            className="relative rounded-2xl shadow-2xl w-full max-w-5xl h-full max-h-[90vh] flex flex-col glass-card overflow-hidden border-2 border-white/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20 bg-white/40 backdrop-blur-md">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="p-2 rounded-lg bg-white/50">
                  {getFileIcon(previewFile.fileName)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-navy truncate font-display text-lg">
                    {previewFile.fileName}
                  </p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">
                    {formatFileSize(previewFile.fileSize)} · {new Date(previewFile.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(previewFile)}
                  className="p-2.5 rounded-xl transition-colors text-navy hover:bg-white/50"
                  title="Download"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={closePreview}
                  className="p-2.5 rounded-xl transition-colors text-navy hover:bg-red-50 hover:text-red-600"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 overflow-hidden bg-slate-50/50 backdrop-blur-sm relative">
              <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none" />
              <div className="relative h-full z-10">
                {previewLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Loader2 className="w-12 h-12 animate-spin text-teal-600 mx-auto mb-4" />
                      <p className="text-slate-500 font-medium animate-pulse">Loading preview...</p>
                    </div>
                  </div>
                ) : previewError ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center p-8 glass-card rounded-2xl max-w-md mx-auto">
                      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                        <XCircle className="w-8 h-8 text-red-500" />
                      </div>
                      <p className="text-red-600 font-bold mb-2 text-lg">Error loading preview</p>
                      <p className="text-slate-500 mb-6">{previewError}</p>
                      <button
                        onClick={() => handleDownload(previewFile)}
                        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold w-full transition-all hover:scale-[1.02] shadow-lg shadow-blue-500/20"
                      >
                        <Download className="w-4 h-4" />
                        Download instead
                      </button>
                    </div>
                  </div>
                ) : (
                  renderPreviewContent()
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
