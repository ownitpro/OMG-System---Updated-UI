// app/portal/[portalId]/page.tsx (Portal Access & Main Hub)
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Upload,
  FileText,
  CheckCircle2,
  Clock,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  CalendarX2,
  Folder,
  FolderOpen,
  ChevronRight,
  Download,
  Home
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  fileSize: number;
  uploadedAt: string;
  folderPath?: string[];
}

interface FolderNode {
  name: string;
  files: UploadedFile[];
  subfolders: Map<string, FolderNode>;
}

type Props = {
  params: Promise<{ portalId: string }>;
};

export default function PortalPage({ params }: Props) {
  const [portalId, setPortalId] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [portal, setPortal] = useState<any>(null);
  const [org, setOrg] = useState<any>(null);
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [expiredAt, setExpiredAt] = useState<string | null>(null);

  // Portal data for authenticated view
  const [requests, setRequests] = useState<any[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [stats, setStats] = useState({ total: 0, uploaded: 0, pending: 0 });

  // Uploaded files state
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  useEffect(() => {
    params.then(p => {
      setPortalId(p.portalId);
      // Try to load portal data - if user has valid session cookie, it will work
      checkAuthAndLoadData(p.portalId);
    });
  }, [params]);

  // Re-fetch uploaded files when page becomes visible (e.g., returning from upload page)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && portalId && isAuthenticated) {
        loadUploadedFiles(portalId);
      }
    };

    const handleFocus = () => {
      if (portalId && isAuthenticated) {
        loadUploadedFiles(portalId);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [portalId, isAuthenticated]);

  const checkAuthAndLoadData = async (pid: string) => {
    try {
      setIsChecking(true);

      // Try to fetch portal info (public endpoint)
      const portalInfo = await fetchPortalInfo(pid);

      // Try to fetch requests - if this succeeds, user is authenticated
      const res = await fetch(`/api/portal/${pid}/requests`, {
        cache: 'no-store',
        credentials: 'include', // Important: send cookies
      });

      if (res.ok) {
        // User is authenticated!
        setIsAuthenticated(true);
        const data = await res.json();
        setRequests(data.requests || []);
        calculateStats(data.requests || []);
        // Also load uploaded files
        loadUploadedFiles(pid);
      } else if (res.status === 401) {
        // Not authenticated - check if PIN is required
        if (portalInfo && !portalInfo.requiresPin) {
          // No PIN required - auto-authenticate by calling verify-pin
          // The API will auto-grant access for portals without a PIN
          const verifyRes = await fetch(`/api/portal/${pid}/verify-pin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ pin: '' }), // Empty PIN for no-PIN portals
          });

          if (verifyRes.ok) {
            // Successfully auto-authenticated
            setIsAuthenticated(true);
            loadPortalData(pid);
            loadUploadedFiles(pid);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          // PIN is required - show PIN form
          setIsAuthenticated(false);
        }
      } else {
        console.error('Unexpected response status:', res.status);
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Error checking auth:', err);
      setIsAuthenticated(false);
    } finally {
      setIsChecking(false);
    }
  };

  const fetchPortalInfo = async (pid: string): Promise<{ requiresPin: boolean } | null> => {
    try {
      const res = await fetch(`/api/portal/${pid}/info`);
      if (res.ok) {
        const data = await res.json();
        setPortal(data.portal);
        setOrg(data.organization);
        return { requiresPin: data.portal.requiresPin ?? true };
      }
      return null;
    } catch (err) {
      console.error('Error fetching portal info:', err);
      return null;
    }
  };

  const loadPortalData = async (pid: string) => {
    try {
      setLoadingRequests(true);

      // Fetch requests
      const res = await fetch(`/api/portal/${pid}/requests`, {
        cache: 'no-store',
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        const reqs = data.requests || [];
        setRequests(reqs);
        calculateStats(reqs);
      }
    } catch (err) {
      console.error('Error loading portal data:', err);
    } finally {
      setLoadingRequests(false);
    }
  };

  const calculateStats = (reqs: any[]) => {
    const totalItems = reqs.reduce((acc: number, req: any) => acc + req.items.length, 0);
    const uploadedItems = reqs.reduce(
      (acc: number, req: any) => acc + req.items.filter((i: any) => i.uploaded).length,
      0
    );
    setStats({
      total: totalItems,
      uploaded: uploadedItems,
      pending: totalItems - uploadedItems,
    });
  };

  // Load uploaded files for this portal
  const loadUploadedFiles = async (pid: string) => {
    try {
      const res = await fetch(`/api/portal/${pid}/my-uploads`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setUploadedFiles(data.uploads || []);
      }
    } catch (err) {
      console.error('Error loading uploaded files:', err);
    }
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };

  // Build folder tree from uploaded files
  const buildFolderTree = (): FolderNode => {
    const root: FolderNode = { name: 'My Vault', files: [], subfolders: new Map() };

    for (const file of uploadedFiles) {
      const path = file.folderPath || [];
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
      current.files.push(file);
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
    const hasContent = node.files.length > 0 || node.subfolders.size > 0;

    return (
      <div key={fullPath || 'root'}>
        {/* Folder header (skip for root) */}
        {depth > 0 && (
          <button
            onClick={() => toggleFolder(fullPath)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition-colors ${
              depth === 1 ? 'font-medium' : ''
            }`}
            style={{ paddingLeft: `${(depth - 1) * 16 + 12}px` }}
          >
            <ChevronRight
              className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            />
            {isExpanded ? (
              <FolderOpen className="w-5 h-5 text-blue-500" />
            ) : (
              <Folder className="w-5 h-5 text-blue-500" />
            )}
            <span className="text-gray-900">{node.name}</span>
            {node.files.length > 0 && (
              <span className="text-xs text-gray-500 ml-auto">{node.files.length} files</span>
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
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg"
                style={{ paddingLeft: `${depth * 16 + 12}px` }}
              >
                <FileText className="w-5 h-5 text-gray-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.fileSize)} · {new Date(file.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pin || pin.trim() === '') {
      setError('Please enter your PIN');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const res = await fetch(`/api/portal/${portalId}/verify-pin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Important: receive and store cookies
        body: JSON.stringify({ pin }),
      });

      const data = await res.json();

      if (res.ok) {
        // Success - cookie is now set automatically
        setIsAuthenticated(true);
        setRemainingAttempts(null);
        loadPortalData(portalId);
      } else if (res.status === 403 && data.expired) {
        // Portal has expired
        setIsExpired(true);
        setExpiredAt(data.expiredAt);
        setError('');
        setPin('');
      } else if (res.status === 429) {
        // Rate limited
        setError(data.error || 'Too many failed attempts. Please try again later.');
        setPin('');
      } else {
        // Invalid PIN
        setError(data.error || 'Invalid PIN. Please try again.');
        setRemainingAttempts(data.remainingAttempts ?? null);
        setPin('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('PIN verification error:', err);
    } finally {
      setIsVerifying(false);
    }
  };

  // Loading state
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Expired Portal Screen
  if (isExpired) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Branding */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                <CalendarX2 className="w-10 h-10 text-orange-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Portal Expired</h1>
          </div>

          {/* Expired Message */}
          <div className="bg-white rounded-2xl shadow-xl border border-orange-200 p-8 text-center">
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                This portal access has expired and is no longer available.
              </p>
              {expiredAt && (
                <p className="text-sm text-gray-500">
                  Expired on: {new Date(expiredAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              )}
            </div>

            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-800">
                Please contact your service provider if you need continued access to this portal.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Powered by <span className="font-medium">SecureVault Docs</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // PIN Entry Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Branding */}
          <div className="text-center mb-8">
            {org?.logoUrl ? (
              <img
                src={org.logoUrl}
                alt={org.name || 'Organization'}
                className="h-16 mx-auto mb-4"
              />
            ) : (
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </div>
            )}
            <h1 className="text-2xl font-bold text-gray-900">
              {org?.name || 'SecureVault Docs'}
            </h1>
            <p className="text-gray-600 mt-2">Secure Portal Access</p>
          </div>

          {/* PIN Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Enter Your PIN</h2>
              <p className="text-sm text-gray-600 mt-1">
                Please enter the PIN you received to access your secure portal.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
                  PIN
                </label>
                <div className="relative">
                  <input
                    id="pin"
                    type={showPin ? 'text' : 'password'}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter your PIN"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-mono"
                    disabled={isVerifying}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {remainingAttempts !== null && remainingAttempts > 0 && (
                  <p className="text-xs text-orange-600 mt-1">
                    {remainingAttempts} {remainingAttempts === 1 ? 'attempt' : 'attempts'} remaining
                  </p>
                )}
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying || !pin}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Access Portal
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Your connection is secured and all uploads are encrypted
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Powered by <span className="font-medium">SecureVault Docs</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Portal View
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {org?.logoUrl ? (
                <img src={org.logoUrl} alt={org.name || 'Organization'} className="h-10" />
              ) : (
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
              )}
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {org?.name || 'SecureVault Docs'}
                </h1>
                <p className="text-sm text-gray-500">Secure Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="w-4 h-4" />
              <span className="hidden sm:inline">Secure Connection</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loadingRequests ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">
                Welcome{portal?.clientName ? `, ${portal.clientName}` : ''}!
              </h2>
              <p className="text-blue-100 mb-6">
                This is your secure space for uploading and managing documents. All files are encrypted and stored securely.
              </p>

              {stats.total > 0 && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm">{stats.uploaded} of {stats.total} uploaded</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all"
                      style={{ width: `${stats.total > 0 ? (stats.uploaded / stats.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Document Requests */}
              <Link
                href={`/portal/${portalId}/requests`}
                className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  {stats.pending > 0 && (
                    <span className="px-2.5 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                      {stats.pending} pending
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Document Requests</h3>
                <p className="text-sm text-gray-600">
                  Upload requested documents and track your progress
                </p>
              </Link>

              {/* General Upload */}
              <Link
                href={`/portal/${portalId}/upload`}
                className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <Upload className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">General Upload</h3>
                <p className="text-sm text-gray-600">
                  Upload any document with a description of its purpose
                </p>
              </Link>
            </div>

            {/* My Documents - Folder Structure View */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Home className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">My Vault</h3>
                    <p className="text-sm text-gray-500">{uploadedFiles.length} documents uploaded</p>
                  </div>
                </div>
                <Link
                  href={`/portal/${portalId}/upload`}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <Upload className="w-4 h-4" />
                  Upload
                </Link>
              </div>

              {uploadedFiles.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload your first document to get started
                  </p>
                  <Link
                    href={`/portal/${portalId}/upload`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Documents
                  </Link>
                </div>
              ) : (
                <div className="p-4">
                  {/* Folder Tree */}
                  <div className="space-y-1">
                    {renderFolderTree(buildFolderTree())}
                  </div>
                </div>
              )}
            </div>

            {/* Recent Activity / Request Summary */}
            {requests.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Requests</h3>
                <div className="space-y-3">
                  {requests.map((request) => {
                    const requestUploaded = request.items.filter((i: any) => i.uploaded).length;
                    const requestTotal = request.items.length;
                    const isComplete = requestUploaded === requestTotal;

                    return (
                      <div
                        key={request.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          {isComplete ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                          ) : (
                            <Clock className="w-5 h-5 text-orange-500 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900">{request.title || 'Document Request'}</p>
                            <p className="text-sm text-gray-600">
                              {requestUploaded} of {requestTotal} items completed
                            </p>
                          </div>
                        </div>
                        <Link
                          href={`/portal/${portalId}/requests`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap"
                        >
                          {isComplete ? 'View' : 'Continue'} →
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            Powered by SecureVault Docs · All uploads are encrypted and secure
          </p>
        </div>
      </footer>
    </div>
  );
}
