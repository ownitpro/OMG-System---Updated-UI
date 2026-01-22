'use client';

import * as React from 'react';
import { CheckCircle2, Upload, Loader2 } from 'lucide-react';

interface RequestItem {
  key: string;
  label: string;
  required?: boolean;
  uploaded?: boolean;
  folderId?: string;
}

interface Props {
  portalId: string;
  requestId: string;
  items: RequestItem[];
  onUploadComplete: () => void;
}

export default function RequestItemUpload({ portalId, requestId, items, onUploadComplete }: Props) {
  const [selectedItem, setSelectedItem] = React.useState<RequestItem | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);

  const handleUploadClick = (item: RequestItem) => {
    if (item.uploaded) return;
    setSelectedItem(item);
    setUploadError(null);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, item: RequestItem) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      // 1. Get presigned URL
      const presignResponse = await fetch(`/api/portal/${portalId}/presign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileSize: file.size,
          contentType: file.type,
        }),
      });

      if (!presignResponse.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadUrl, fileKey, mock } = await presignResponse.json();

      // 2. Upload to S3 (skip if mock mode)
      if (uploadUrl && !mock) {
        const uploadResponse = await fetch(uploadUrl, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type },
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload file');
        }
      } else if (mock) {
        // In mock mode, we might want to send the file content to a mock storage endpoint
        // so it can be downloaded later. For now, we'll just skip the PUT to S3.
        console.log('Mock mode detected, skipping S3 upload for:', file.name);
        
        // Optional: Call mock-upload endpoint if we want to store the file data in memory
        // This makes the "My Vault" view capable of actually downloading files in dev
        try {
           const reader = new FileReader();
           reader.onload = async () => {
             const base64 = (reader.result as string).split(',')[1];
             await fetch(`/api/portal/${portalId}/mock-upload`, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                 fileKey,
                 fileName: file.name,
                 fileData: base64,
                 contentType: file.type,
                 size: file.size
               })
             });
           };
           reader.readAsDataURL(file);
        } catch (e) {
          console.warn('Failed to store mock file content:', e);
        }
      }

      // 3. Submit to our system with request item info
      const submitResponse = await fetch(`/api/portal/${portalId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          bytes: file.size,
          fileKey: fileKey || `mock/${portalId}/${file.name}`,
          requestId: requestId,
          itemKey: item.key,
        }),
      });

      if (!submitResponse.ok) {
        const errorData = await submitResponse.json();
        throw new Error(errorData.error || 'Submission failed');
      }

      // 4. Success - refresh data
      setSelectedItem(null);
      onUploadComplete();
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadError(error.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.key}
          className={`bg-white border rounded-lg p-4 transition-all ${
            selectedItem?.key === item.key ? 'border-blue-500 shadow-sm' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900">{item.label}</h3>
                {item.required && (
                  <span className="text-xs px-2 py-0.5 bg-red-50 text-red-600 rounded-full">
                    Required
                  </span>
                )}
              </div>
            </div>

            {item.uploaded ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">Uploaded</span>
              </div>
            ) : uploading && selectedItem?.key === item.key ? (
              <div className="flex items-center gap-2 text-blue-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm">Uploading...</span>
              </div>
            ) : (
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, item)}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.zip"
                  disabled={uploading}
                />
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">Upload File</span>
                </div>
              </label>
            )}
          </div>

          {uploadError && selectedItem?.key === item.key && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{uploadError}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
