"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Link2, Copy, Trash2, Plus, Clock, Shield } from "lucide-react";
import { getSharesByOrg } from "@/lib/mockDb";
import { usePlanEnforcement } from "@/hooks/usePlanEnforcement";

export default function OrgShares() {
  const params = useParams();
  const router = useRouter();
  const orgId = params.orgId as string;
  const { limits, currentUsage, plan } = usePlanEnforcement();

  const [shares, setShares] = React.useState<any[]>([]);
  const [copied, setCopied] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (orgId) {
      const orgShares = getSharesByOrg(orgId);
      setShares(orgShares);
    }
  }, [orgId]);

  const copyToClipboard = (url: string, token: string) => {
    navigator.clipboard.writeText(url);
    setCopied(token);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDelete = (token: string) => {
    // TODO: Implement delete functionality
    setShares(shares.filter(s => s.token !== token));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isExpired = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  const shareLimit = limits.secureShareLinks;
  const shareCount = shares.length;
  const canCreateMore = shareLimit === -1 || shareCount < shareLimit;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-teal-900">Secure Share Links</h1>
          <p className="text-sm text-teal-800 mt-1">
            Create secure, expiring links to share documents with clients
          </p>
        </div>
        <button
          onClick={() => router.push(`/org/${orgId}/shares/new`)}
          disabled={!canCreateMore}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          New Share Link
        </button>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-teal-800 font-bold">Active Links</p>
              <p className="text-2xl font-semibold text-teal-900 mt-1">
                {shares.filter(s => !isExpired(s.expiresAt)).length}
              </p>
            </div>
            <Link2 className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-teal-800 font-bold">Total Links</p>
              <p className="text-2xl font-semibold text-teal-900 mt-1">{shareCount}</p>
            </div>
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-teal-800 font-bold">Plan Limit</p>
              <p className="text-2xl font-semibold text-teal-900 mt-1">
                {shareLimit === -1 ? '∞' : `${shareCount}/${shareLimit}`}
              </p>
            </div>
            <Clock className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Shares List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {shares.length === 0 ? (
          <div className="p-12 text-center">
            <Link2 className="w-12 h-12 mx-auto text-teal-800/50 mb-4" />
            <h3 className="text-lg font-medium text-teal-900 mb-2">No share links yet</h3>
            <p className="text-sm text-teal-800 mb-4">
              Create your first secure share link to share documents with clients
            </p>
            <button
              onClick={() => router.push(`/org/${orgId}/shares/new`)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Create Share Link
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {shares.map((share) => {
              const expired = isExpired(share.expiresAt);
              const baseUrl = typeof window !== 'undefined'
                ? window.location.origin
                : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
              const shareUrl = `${baseUrl}/s/${share.token}`;

              return (
                <div key={share.token} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-teal-900">{share.label}</h3>
                        {expired && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">
                            Expired
                          </span>
                        )}
                        {share.pin && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            PIN Protected
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-teal-800">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Expires {formatDate(share.expiresAt)}
                        </span>
                        {share.allowDownload && (
                          <span>Downloads allowed</span>
                        )}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded flex-1 overflow-hidden text-ellipsis">
                          {shareUrl}
                        </code>
                        <button
                          onClick={() => copyToClipboard(shareUrl, share.token)}
                          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded flex items-center gap-1"
                        >
                          <Copy className="w-4 h-4" />
                          {copied === share.token ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(share.token)}
                      className="ml-4 p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {!canCreateMore && (
        <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-xl">
          <p className="text-sm text-orange-700">
            <strong>Limit reached:</strong> You've reached your {shareLimit} share link limit on the {plan} plan.
            Upgrade to create more links.
          </p>
        </div>
      )}
    </div>
  );
}

