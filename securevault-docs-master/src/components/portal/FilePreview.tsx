'use client';

import React, { useState } from 'react';
import { X, Download, FileText, Image as ImageIcon, File, Video, Music } from 'lucide-react';

interface FilePreviewProps {
  file: File | { name: string; url: string; type: string };
  onClose: () => void;
  onDownload?: () => void;
}

export default function FilePreview({ file, onClose, onDownload }: FilePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (file instanceof File) {
      // Create object URL for File objects
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if ('url' in file) {
      // Use provided URL for uploaded files
      setPreviewUrl(file.url);
    }
  }, [file]);

  const fileName = file.name;
  const fileType = file instanceof File ? file.type : file.type;
  const fileSize = file instanceof File ? file.size : null;

  // PostgreSQL returns BIGINT as string, so we handle both number and string inputs
  const formatFileSize = (bytes: number | string) => {
    const numBytes = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes;
    if (!numBytes || numBytes === 0 || isNaN(numBytes)) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.min(Math.floor(Math.log(numBytes) / Math.log(k)), sizes.length - 1);
    return parseFloat((numBytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileIcon = () => {
    if (fileType.startsWith('image/')) return <ImageIcon className="w-6 h-6" />;
    if (fileType.startsWith('video/')) return <Video className="w-6 h-6" />;
    if (fileType.startsWith('audio/')) return <Music className="w-6 h-6" />;
    if (fileType === 'application/pdf') return <FileText className="w-6 h-6" />;
    return <File className="w-6 h-6" />;
  };

  const renderPreview = () => {
    if (!previewUrl) {
      return (
        <div className="flex items-center justify-center h-full text-gray-400">
          <p>Loading preview...</p>
        </div>
      );
    }

    // Image preview
    if (fileType.startsWith('image/')) {
      return (
        <div className="flex items-center justify-center h-full p-4">
          <img
            src={previewUrl}
            alt={fileName}
            className="max-w-full max-h-full object-contain rounded-lg"
            onError={() => setError('Failed to load image')}
          />
        </div>
      );
    }

    // PDF preview
    if (fileType === 'application/pdf') {
      return (
        <div className="h-full w-full">
          <iframe
            src={previewUrl}
            className="w-full h-full rounded-lg"
            title={fileName}
            onError={() => setError('Failed to load PDF')}
          />
        </div>
      );
    }

    // Video preview
    if (fileType.startsWith('video/')) {
      return (
        <div className="flex items-center justify-center h-full p-4">
          <video
            src={previewUrl}
            controls
            className="max-w-full max-h-full rounded-lg"
            onError={() => setError('Failed to load video')}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    // Audio preview
    if (fileType.startsWith('audio/')) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8">
          <Music className="w-24 h-24 text-gray-400 mb-4" />
          <p className="text-gray-700 font-medium mb-4">{fileName}</p>
          <audio
            src={previewUrl}
            controls
            className="w-full max-w-md"
            onError={() => setError('Failed to load audio')}
          >
            Your browser does not support the audio tag.
          </audio>
        </div>
      );
    }

    // Text files
    if (fileType.startsWith('text/')) {
      return (
        <div className="h-full w-full overflow-auto p-6">
          <iframe
            src={previewUrl}
            className="w-full h-full border-none"
            title={fileName}
            onError={() => setError('Failed to load text file')}
          />
        </div>
      );
    }

    // Fallback for unsupported file types
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        {getFileIcon()}
        <p className="text-gray-700 font-medium mt-4 mb-2">{fileName}</p>
        <p className="text-gray-500 text-sm mb-4">
          Preview not available for this file type
        </p>
        {onDownload && (
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            Download to view
          </button>
        )}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-5xl h-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {getFileIcon()}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{fileName}</p>
              {fileSize && (
                <p className="text-sm text-gray-500">{formatFileSize(fileSize)}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onDownload && (
              <button
                onClick={onDownload}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Download"
              >
                <Download className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-hidden bg-gray-50">
          {error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-red-600 font-medium mb-2">Error loading preview</p>
                <p className="text-gray-600 text-sm">{error}</p>
              </div>
            </div>
          ) : (
            renderPreview()
          )}
        </div>
      </div>
    </div>
  );
}
