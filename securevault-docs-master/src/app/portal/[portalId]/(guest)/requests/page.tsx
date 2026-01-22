'use client';

import * as React from 'react';
import Link from 'next/link';
import RequestItemUpload from '@/components/portal/RequestItemUpload';
import { Loader2, ArrowLeft } from 'lucide-react';

type PageProps = {
  params: Promise<{ portalId: string }>;
};

export default function PortalRequests({ params }: PageProps) {
  const [portalId, setPortalId] = React.useState<string>('');
  const [requests, setRequests] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    params.then((p) => {
      setPortalId(p.portalId);
      loadRequests(p.portalId);
    });
  }, [params]);

  const loadRequests = async (pid: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/portal/${pid}/requests`, {
        cache: 'no-store',
        credentials: 'include', // Important: send session cookie
      });

      if (!res.ok) {
        throw new Error('Failed to fetch requests');
      }

      const data = await res.json();
      setRequests(data.requests || []);
    } catch (err: any) {
      console.error('Error loading requests:', err);
      setError(err.message || 'Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = () => {
    loadRequests(portalId);
  };

  if (loading) {
    return (
      <main className="container max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      </main>
    );
  }

  const totalItems = requests.reduce((acc, req) => acc + req.items.length, 0);
  const uploadedItems = requests.reduce(
    (acc, req) => acc + req.items.filter((i: any) => i.uploaded).length,
    0
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl mx-auto p-6 space-y-6">
        {/* Back Button */}
        <Link
          href={`/portal/${portalId}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portal
        </Link>

        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Document Requests</h1>
          <p className="text-gray-600">Please upload the requested documents below</p>

        {/* Progress Summary */}
        {totalItems > 0 && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">Overall Progress</span>
              <span className="text-sm text-blue-700">
                {uploadedItems} of {totalItems} uploaded
              </span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${totalItems > 0 ? (uploadedItems / totalItems) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {requests.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-600">
          <p>No document requests at this time.</p>
        </div>
      ) : (
        requests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl shadow p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">{request.title || 'Document Request'}</h2>
              {request.dueAt && (
                <p className="text-sm text-gray-500 mt-1">
                  Due: {new Date(request.dueAt).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Progress bar for this request */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Request Progress</span>
                <span className="text-sm text-gray-600">
                  {request.items.filter((i: any) => i.uploaded).length} of {request.items.length} items
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${
                      request.items.length > 0
                        ? (request.items.filter((i: any) => i.uploaded).length / request.items.length) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Upload component */}
            <RequestItemUpload
              portalId={portalId}
              requestId={request.id}
              items={request.items}
              onUploadComplete={handleUploadComplete}
            />
          </div>
        ))
      )}
      </div>
    </main>
  );
}

