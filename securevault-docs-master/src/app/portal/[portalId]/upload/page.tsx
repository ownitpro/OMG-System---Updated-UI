// app/portal/[portalId]/upload/page.tsx
// Bulk upload page with AI analysis, smart folder creation, and purpose field
// Supports up to 10 files per batch

'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Upload, FileText, CheckCircle2, Loader2, AlertCircle, X, ArrowLeft, Sparkles, FolderOpen, Calendar, Edit3, ChevronDown, Plus, AlertTriangle, File } from 'lucide-react';

// Batch upload limits
const MAX_BATCH_FILES = 10;
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB per file

// Predefined folder options for users to choose from
const FOLDER_OPTIONS = [
  { value: 'tax', label: 'Tax Documents', path: ['Tax Documents', new Date().getFullYear().toString()] },
  { value: 'financial', label: 'Financial', path: ['Financial', new Date().getFullYear().toString()] },
  { value: 'legal', label: 'Legal Documents', path: ['Legal', new Date().getFullYear().toString()] },
  { value: 'employment', label: 'Employment / HR', path: ['Employment', new Date().getFullYear().toString()] },
  { value: 'insurance', label: 'Insurance', path: ['Insurance', new Date().getFullYear().toString()] },
  { value: 'medical', label: 'Medical Records', path: ['Medical', new Date().getFullYear().toString()] },
  { value: 'identity', label: 'Identity Documents', path: ['Identity Documents'] },
  { value: 'business', label: 'Business Documents', path: ['Business Documents', new Date().getFullYear().toString()] },
  { value: 'training', label: 'HR & Training', path: ['HR & Training', new Date().getFullYear().toString()] },
  { value: 'certifications', label: 'Certifications', path: ['Certifications', new Date().getFullYear().toString()] },
  { value: 'receipts', label: 'Receipts & Invoices', path: ['Receipts & Invoices', new Date().getFullYear().toString()] },
  { value: 'contracts', label: 'Contracts', path: ['Contracts', new Date().getFullYear().toString()] },
  { value: 'reports', label: 'Reports & Presentations', path: ['Reports & Presentations', new Date().getFullYear().toString()] },
  { value: 'personal', label: 'Personal Documents', path: ['Personal Documents', new Date().getFullYear().toString()] },
  { value: 'uploads', label: 'General Uploads', path: ['Uploads', new Date().getFullYear().toString()] },
];

type Props = {
  params: Promise<{ portalId: string }>;
};

interface AIAnalysisResult {
  suggestedFilename: string;
  category: string;
  subtype: string;
  confidence: number;
  folderPath: string[];
  expirationDate: string | null;
}

interface FileUploadItem {
  file: File;
  id: string;
  status: 'pending' | 'analyzing' | 'ready' | 'uploading' | 'success' | 'error';
  aiAnalysis: AIAnalysisResult | null;
  customFilename: string;
  selectedFolder: string;
  customFolderPath: string[];
  error?: string;
}

export default function PortalUpload({ params }: Props) {
  const [portalId, setPortalId] = useState<string>('');
  const [files, setFiles] = useState<FileUploadItem[]>([]);
  const [purpose, setPurpose] = useState('');
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successCount, setSuccessCount] = useState(0);
  const [error, setError] = useState('');
  const [useAiSuggestions, setUseAiSuggestions] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    params.then(p => setPortalId(p.portalId));
  }, [params]);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64 || '');
      };
      reader.onerror = reject;
    });
  };

  const formatCategory = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, ' ');
  };

  const formatFileSize = (bytes: number): string => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Analyze a single file with AI
  const analyzeFile = async (fileItem: FileUploadItem): Promise<AIAnalysisResult | null> => {
    if (!portalId) return null;

    try {
      const base64 = await fileToBase64(fileItem.file);

      const response = await fetch(`/api/portal/${portalId}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          fileName: fileItem.file.name,
          mimeType: fileItem.file.type,
          fileData: base64,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.analysis;
      }
    } catch (err) {
      console.error('AI analysis failed:', err);
    }
    return null;
  };

  // Process files sequentially for AI analysis
  const processFilesForAnalysis = useCallback(async (newFiles: FileUploadItem[]) => {
    for (const fileItem of newFiles) {
      // Update status to analyzing
      setFiles(prev => prev.map(f =>
        f.id === fileItem.id ? { ...f, status: 'analyzing' } : f
      ));

      // Add delay between analyses to prevent race conditions
      await new Promise(resolve => setTimeout(resolve, 300));

      const analysis = await analyzeFile(fileItem);

      // Update file with analysis results
      setFiles(prev => prev.map(f => {
        if (f.id === fileItem.id) {
          return {
            ...f,
            status: 'ready',
            aiAnalysis: analysis,
            customFilename: analysis?.suggestedFilename || f.file.name,
            selectedFolder: analysis?.folderPath ? 'ai' : 'uploads',
          };
        }
        return f;
      }));
    }
  }, [portalId]);

  const handleFileSelect = async (selectedFiles: FileList | File[]) => {
    const fileArray = Array.from(selectedFiles);

    // Validate batch limit
    const totalFiles = files.length + fileArray.length;
    if (totalFiles > MAX_BATCH_FILES) {
      setError(`You can upload a maximum of ${MAX_BATCH_FILES} files at once. Please select fewer files.`);
      return;
    }

    // Validate file sizes
    const oversizedFiles = fileArray.filter(f => f.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      setError(`Some files exceed the ${formatFileSize(MAX_FILE_SIZE)} limit: ${oversizedFiles.map(f => f.name).join(', ')}`);
      return;
    }

    setError('');
    setSuccess(false);

    // Create file items
    const newFileItems: FileUploadItem[] = fileArray.map(file => ({
      file,
      id: generateId(),
      status: 'pending',
      aiAnalysis: null,
      customFilename: file.name,
      selectedFolder: 'uploads',
      customFolderPath: [],
    }));

    setFiles(prev => [...prev, ...newFileItems]);

    // Start AI analysis for new files
    await processFilesForAnalysis(newFileItems);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await handleFileSelect(e.target.files);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await handleFileSelect(e.dataTransfer.files);
    }
  }, [files.length, processFilesForAnalysis]);

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const updateFileFolder = (id: string, folder: string, customPath?: string[]) => {
    setFiles(prev => prev.map(f => {
      if (f.id === id) {
        return {
          ...f,
          selectedFolder: folder,
          customFolderPath: customPath || f.customFolderPath,
        };
      }
      return f;
    }));
  };

  const updateFilename = (id: string, newName: string) => {
    setFiles(prev => prev.map(f =>
      f.id === id ? { ...f, customFilename: newName } : f
    ));
  };

  const getCurrentFolderPath = (fileItem: FileUploadItem): string[] => {
    if (fileItem.selectedFolder === 'ai' && fileItem.aiAnalysis?.folderPath) {
      return fileItem.aiAnalysis.folderPath;
    }
    if (fileItem.selectedFolder === 'custom' && fileItem.customFolderPath.length > 0) {
      return fileItem.customFolderPath;
    }
    const folderOption = FOLDER_OPTIONS.find(f => f.value === fileItem.selectedFolder);
    if (folderOption) {
      return folderOption.path;
    }
    return ['Uploads', new Date().getFullYear().toString()];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0) {
      setError('Please select at least one file to upload');
      return;
    }

    if (!purpose || purpose.trim() === '') {
      setError('Please describe the purpose of these documents');
      return;
    }

    // Check if any files are still analyzing
    if (files.some(f => f.status === 'analyzing')) {
      setError('Please wait for AI analysis to complete');
      return;
    }

    setUploading(true);
    setError('');
    let uploadedCount = 0;

    try {
      // Process files sequentially with delay
      for (let i = 0; i < files.length; i++) {
        const fileItem = files[i];
        if (!fileItem) continue;

        // Add delay between uploads
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 300));
        }

        // Update status to uploading
        setFiles(prev => prev.map(f =>
          f.id === fileItem.id ? { ...f, status: 'uploading' } : f
        ));

        try {
          // Step 1: Get presigned URL
          const presignResponse = await fetch(`/api/portal/${portalId}/presign`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              fileName: fileItem.file.name,
              fileSize: fileItem.file.size,
              contentType: fileItem.file.type,
            }),
          });

          if (!presignResponse.ok) {
            throw new Error('Failed to get upload URL');
          }

          const presignData = await presignResponse.json();
          const { uploadUrl, fileKey } = presignData;
          const isMockUpload = presignData.mock === true;

          // Step 2: Upload to S3 or mock storage
          if (isMockUpload) {
            const base64Data = await fileToBase64(fileItem.file);
            const mockUploadResponse = await fetch(`/api/portal/${portalId}/mock-upload`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({
                fileKey,
                fileName: fileItem.file.name,
                fileData: base64Data,
                contentType: fileItem.file.type,
                size: fileItem.file.size,
              }),
            });

            if (!mockUploadResponse.ok) {
              throw new Error('Failed to store file');
            }
          } else if (uploadUrl) {
            const uploadResponse = await fetch(uploadUrl, {
              method: 'PUT',
              body: fileItem.file,
              headers: { 'Content-Type': fileItem.file.type },
            });

            if (!uploadResponse.ok) {
              throw new Error('Failed to upload file');
            }
          }

          // Step 3: Submit to our system
          const currentFolderPath = getCurrentFolderPath(fileItem);
          const finalFilename = useAiSuggestions && fileItem.aiAnalysis
            ? fileItem.customFilename
            : fileItem.file.name;

          const submitResponse = await fetch(`/api/portal/${portalId}/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              fileName: finalFilename,
              originalFileName: fileItem.file.name,
              bytes: fileItem.file.size,
              fileKey: fileKey || `mock/${portalId}/${fileItem.file.name}`,
              purpose: purpose.trim(),
              aiAnalysis: {
                category: fileItem.aiAnalysis?.category || 'other',
                subtype: fileItem.aiAnalysis?.subtype || 'general',
                confidence: fileItem.aiAnalysis?.confidence || 0.5,
                suggestedFolderPath: currentFolderPath,
                expirationDate: fileItem.aiAnalysis?.expirationDate || null,
              },
            }),
          });

          if (!submitResponse.ok) {
            const errorData = await submitResponse.json();
            throw new Error(errorData.error || 'Submission failed');
          }

          // Mark as success
          setFiles(prev => prev.map(f =>
            f.id === fileItem.id ? { ...f, status: 'success' } : f
          ));
          uploadedCount++;

        } catch (err: any) {
          // Mark as error
          setFiles(prev => prev.map(f =>
            f.id === fileItem.id ? { ...f, status: 'error', error: err.message } : f
          ));
        }
      }

      // Show success if any files uploaded
      if (uploadedCount > 0) {
        setSuccess(true);
        setSuccessCount(uploadedCount);
        // Clear successful files after a delay
        setTimeout(() => {
          setFiles(prev => prev.filter(f => f.status !== 'success'));
          if (files.every(f => f.status === 'success')) {
            setPurpose('');
          }
        }, 2000);
      }

    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const isAnalyzing = files.some(f => f.status === 'analyzing');
  const readyFiles = files.filter(f => f.status === 'ready' || f.status === 'pending');
  const totalSize = files.reduce((sum, f) => sum + f.file.size, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href={`/portal/${portalId}`}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portal
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upload Documents</h1>
          <p className="mt-2 text-gray-600">
            Upload up to {MAX_BATCH_FILES} documents at once - AI will automatically analyze and organize them
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-green-900">Upload successful!</p>
              <p className="text-sm text-green-700 mt-1">
                {successCount} document{successCount !== 1 ? 's' : ''} {successCount !== 1 ? 'have' : 'has'} been securely uploaded and organized.
              </p>
            </div>
          </div>
        )}

        {/* Upload Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Selection Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Files <span className="text-red-600">*</span>
              </label>

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop your files here, or click to browse
                  </p>
                  <p className="text-xs text-gray-500">
                    Max {MAX_BATCH_FILES} files per batch • {formatFileSize(MAX_FILE_SIZE)} per file
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: PDF, JPG, PNG, DOC, DOCX, XLS, XLSX, ZIP
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.zip"
                  disabled={uploading}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  disabled={uploading || files.length >= MAX_BATCH_FILES}
                >
                  Choose Files
                </button>
              </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">
                    Selected Files ({files.length}/{MAX_BATCH_FILES})
                  </h3>
                  <p className="text-sm text-gray-500">
                    Total: {formatFileSize(totalSize)}
                  </p>
                </div>

                {/* Warning when approaching batch limit */}
                {files.length >= MAX_BATCH_FILES - 2 && files.length < MAX_BATCH_FILES && (
                  <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <p className="text-sm text-amber-700">
                      You're approaching the batch limit. {MAX_BATCH_FILES - files.length} more file{MAX_BATCH_FILES - files.length !== 1 ? 's' : ''} allowed.
                    </p>
                  </div>
                )}

                {/* Info when at batch limit */}
                {files.length === MAX_BATCH_FILES && (
                  <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      Batch limit reached. Upload these files first, then add more in another batch.
                    </p>
                  </div>
                )}

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {files.map((fileItem) => (
                    <FileItemCard
                      key={fileItem.id}
                      fileItem={fileItem}
                      onRemove={() => removeFile(fileItem.id)}
                      onUpdateFolder={(folder, customPath) => updateFileFolder(fileItem.id, folder, customPath)}
                      onUpdateFilename={(name) => updateFilename(fileItem.id, name)}
                      useAiSuggestions={useAiSuggestions}
                      disabled={uploading}
                      getCurrentFolderPath={getCurrentFolderPath}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* AI Suggestions Toggle */}
            {files.length > 0 && files.some(f => f.aiAnalysis) && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useAiSuggestions}
                  onChange={(e) => setUseAiSuggestions(e.target.checked)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Use AI suggestions for filenames and folders</span>
              </label>
            )}

            {/* Purpose Field */}
            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
                Document Purpose <span className="text-red-600">*</span>
              </label>
              <textarea
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g., Tax Returns 2024, Receipt for office supplies, Employment contract, etc."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={uploading}
              />
              <p className="mt-2 text-sm text-gray-500">
                Describe what these documents are for. This helps organize your files.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <Link
                href={`/portal/${portalId}`}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={uploading || isAnalyzing || files.length === 0 || !purpose}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Uploading...
                  </>
                ) : isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Upload {files.length} Document{files.length !== 1 ? 's' : ''}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-purple-900">AI-Powered Organization</p>
              <p className="text-sm text-purple-700 mt-1">
                Our AI automatically analyzes your documents to suggest proper naming, detect document types, and organize them into smart folders.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// File Item Card Component
interface FileItemCardProps {
  fileItem: FileUploadItem;
  onRemove: () => void;
  onUpdateFolder: (folder: string, customPath?: string[]) => void;
  onUpdateFilename: (name: string) => void;
  useAiSuggestions: boolean;
  disabled: boolean;
  getCurrentFolderPath: (fileItem: FileUploadItem) => string[];
}

function FileItemCard({
  fileItem,
  onRemove,
  onUpdateFolder,
  onUpdateFilename,
  useAiSuggestions,
  disabled,
  getCurrentFolderPath,
}: FileItemCardProps) {
  const [showFolderDropdown, setShowFolderDropdown] = useState(false);
  const [editingFilename, setEditingFilename] = useState(false);
  const [showCustomFolderInput, setShowCustomFolderInput] = useState(false);
  const [customFolderInput, setCustomFolderInput] = useState('');
  const [editingFolderPath, setEditingFolderPath] = useState(false);
  const folderDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (folderDropdownRef.current && !folderDropdownRef.current.contains(event.target as Node)) {
        setShowFolderDropdown(false);
        // Don't close editing mode on click outside - user might be typing
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getStatusIcon = () => {
    switch (fileItem.status) {
      case 'analyzing':
        return <Loader2 className="w-4 h-4 text-purple-600 animate-spin" />;
      case 'uploading':
        return <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBg = () => {
    switch (fileItem.status) {
      case 'analyzing':
        return 'bg-purple-50 border-purple-200';
      case 'uploading':
        return 'bg-blue-50 border-blue-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const handleFolderSelect = (value: string) => {
    onUpdateFolder(value);
    setShowFolderDropdown(false);
    setShowCustomFolderInput(false);
  };

  const handleCreateCustomFolder = () => {
    if (customFolderInput.trim()) {
      const path = customFolderInput.trim().split('/').map(s => s.trim()).filter(Boolean);
      onUpdateFolder('custom', path);
      setShowCustomFolderInput(false);
      setShowFolderDropdown(false);
      setCustomFolderInput('');
    }
  };

  const folderPath = getCurrentFolderPath(fileItem);

  return (
    <div className={`border rounded-lg p-4 ${getStatusBg()}`}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
          {getStatusIcon()}
        </div>

        <div className="flex-1 min-w-0">
          {/* Filename */}
          <div className="flex items-center gap-2">
            {editingFilename ? (
              <input
                type="text"
                value={fileItem.customFilename}
                onChange={(e) => onUpdateFilename(e.target.value)}
                onBlur={() => setEditingFilename(false)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingFilename(false)}
                className="flex-1 text-sm font-medium border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                autoFocus
              />
            ) : (
              <>
                <p className="font-medium text-gray-900 truncate">
                  {useAiSuggestions && fileItem.aiAnalysis ? fileItem.customFilename : fileItem.file.name}
                </p>
                {fileItem.aiAnalysis && (
                  <button
                    type="button"
                    onClick={() => setEditingFilename(true)}
                    className="text-gray-400 hover:text-gray-600"
                    disabled={disabled}
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                )}
              </>
            )}
          </div>

          {/* File info and status */}
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs text-gray-500">{formatFileSize(fileItem.file.size)}</p>
            {fileItem.status === 'analyzing' && (
              <span className="text-xs text-purple-600">Analyzing with AI...</span>
            )}
            {fileItem.status === 'uploading' && (
              <span className="text-xs text-blue-600">Uploading...</span>
            )}
            {fileItem.status === 'success' && (
              <span className="text-xs text-green-600">Uploaded successfully</span>
            )}
            {fileItem.status === 'error' && (
              <span className="text-xs text-red-600">{fileItem.error || 'Upload failed'}</span>
            )}
          </div>

          {/* AI Analysis Info - Category badge */}
          {fileItem.aiAnalysis && fileItem.status === 'ready' && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                {fileItem.aiAnalysis.category}
              </span>

              {/* Expiration badge */}
              {fileItem.aiAnalysis.expirationDate && (
                <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Expires: {new Date(fileItem.aiAnalysis.expirationDate).toLocaleDateString()}
                </span>
              )}
            </div>
          )}

          {/* Folder selector - Always show when file is ready or pending */}
          {(fileItem.status === 'ready' || fileItem.status === 'pending') && (
            <div className="mt-2">
              <div className="relative" ref={folderDropdownRef}>
                {editingFolderPath ? (
                  /* Direct folder path editing mode */
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={customFolderInput}
                      onChange={(e) => setCustomFolderInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleCreateCustomFolder();
                          setEditingFolderPath(false);
                        } else if (e.key === 'Escape') {
                          setEditingFolderPath(false);
                          setCustomFolderInput('');
                        }
                      }}
                      placeholder="e.g., Personal Documents / Tax / 2025"
                      autoFocus
                      className="w-full px-2 py-1.5 text-xs border border-green-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          handleCreateCustomFolder();
                          setEditingFolderPath(false);
                        }}
                        className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingFolderPath(false);
                          setCustomFolderInput('');
                        }}
                        className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingFolderPath(false);
                          setShowFolderDropdown(true);
                        }}
                        className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800 ml-auto"
                      >
                        Choose from list
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowFolderDropdown(!showFolderDropdown)}
                      className="text-xs px-2 py-1.5 bg-green-100 text-green-700 rounded-lg flex items-center gap-1 hover:bg-green-200 w-full justify-between"
                      disabled={disabled}
                    >
                      <div className="flex items-center gap-1 truncate">
                        <FolderOpen className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{folderPath.join(' / ')}</span>
                      </div>
                      <ChevronDown className={`w-3 h-3 flex-shrink-0 transition-transform ${showFolderDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showFolderDropdown && (
                      <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto min-w-56">
                        {/* Edit path manually option */}
                        <button
                          type="button"
                          onClick={() => {
                            setCustomFolderInput(folderPath.join(' / '));
                            setShowFolderDropdown(false);
                            setEditingFolderPath(true);
                          }}
                          className="w-full px-3 py-2 text-left text-xs text-green-600 hover:bg-green-50 flex items-center gap-2 border-b border-gray-100"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit folder path...</span>
                        </button>

                        {/* AI Suggested Option */}
                        {fileItem.aiAnalysis?.folderPath && (
                          <button
                            type="button"
                            onClick={() => handleFolderSelect('ai')}
                            className={`w-full px-3 py-2 text-left text-xs hover:bg-purple-50 flex items-center gap-2 ${fileItem.selectedFolder === 'ai' ? 'bg-purple-50 text-purple-700' : 'text-gray-700'}`}
                          >
                            <Sparkles className="w-3 h-3 text-purple-500" />
                            <span className="truncate">AI: {fileItem.aiAnalysis.folderPath.join(' / ')}</span>
                          </button>
                        )}

                        <div className="border-t border-gray-100 my-1" />

                        {/* All folder options */}
                        {FOLDER_OPTIONS.map((folder) => (
                          <button
                            key={folder.value}
                            type="button"
                            onClick={() => handleFolderSelect(folder.value)}
                            className={`w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 ${fileItem.selectedFolder === folder.value ? 'bg-green-50 text-green-700' : 'text-gray-700'}`}
                          >
                            {folder.label}
                          </button>
                        ))}

                        <div className="border-t border-gray-100 my-1" />

                        {showCustomFolderInput ? (
                          <div className="p-2">
                            <div className="flex items-center gap-1">
                              <input
                                type="text"
                                value={customFolderInput}
                                onChange={(e) => setCustomFolderInput(e.target.value)}
                                placeholder="Folder / Subfolder"
                                className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleCreateCustomFolder();
                                  }
                                }}
                                autoFocus
                              />
                              <button
                                type="button"
                                onClick={handleCreateCustomFolder}
                                className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setShowCustomFolderInput(true)}
                            className="w-full px-3 py-1.5 text-left text-xs text-green-600 hover:bg-green-50 flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            Create Custom Folder
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Remove button */}
        {!disabled && fileItem.status !== 'uploading' && fileItem.status !== 'success' && (
          <button
            type="button"
            onClick={onRemove}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
}
