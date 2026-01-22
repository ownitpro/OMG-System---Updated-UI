'use client';

import { useState } from 'react';
import { Download, Check, AlertCircle, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface MigrateTemplatesButtonProps {
  orgId: string;
  onMigrationComplete?: () => void;
}

export function MigrateTemplatesButton({
  orgId,
  onMigrationComplete,
}: MigrateTemplatesButtonProps) {
  const { user } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleMigrate = async () => {
    if (!user?.id) {
      setResult({ success: false, message: 'User not authenticated' });
      return;
    }

    setIsMigrating(true);
    setResult(null);

    try {
      const response = await fetch(`/api/org/${orgId}/email-templates/migrate-from-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message || `Migrated ${data.migrated} templates successfully`,
        });
        setTimeout(() => {
          setShowConfirm(false);
          if (onMigrationComplete) {
            onMigrationComplete();
          }
        }, 2000);
      } else {
        setResult({
          success: false,
          message: data.error || 'Migration failed',
        });
      }
    } catch (error: any) {
      setResult({
        success: false,
        message: error.message || 'Failed to migrate templates',
      });
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="btn flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Migrate from Code
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold">Migrate Email Templates</h2>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isMigrating}
                className="text-muted-foreground hover:text-foreground transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {!result ? (
                <>
                  <p className="text-muted-foreground">
                    This will copy all default email templates from the codebase into your organization's template database.
                  </p>
                  <div className="rounded-2xl bg-[#3b82f6]/10 border border-[#3b82f6]/30 p-4">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <strong className="font-medium">Note:</strong> This will only create templates that don't already exist. Existing templates will not be modified.
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <strong>Templates to migrate:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Portal Created</li>
                      <li>Document Uploaded</li>
                      <li>Welcome Email</li>
                      <li>Password Reset</li>
                      <li>Request Created</li>
                      <li>And 7 more...</li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className={`rounded-2xl p-4 ${
                  result.success
                    ? 'bg-green-500/10 border border-green-500/30'
                    : 'bg-red-500/10 border border-red-500/30'
                }`}>
                  <div className="flex gap-3">
                    {result.success ? (
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    )}
                    <div className={`text-sm ${result.success ? 'text-green-500' : 'text-red-500'}`}>
                      {result.message}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {!result && (
              <div className="flex justify-end gap-3 p-6 border-t border-border">
                <button
                  onClick={() => setShowConfirm(false)}
                  disabled={isMigrating}
                  className="btn"
                >
                  Cancel
                </button>
                <button
                  onClick={handleMigrate}
                  disabled={isMigrating}
                  className="btn btn-primary flex items-center gap-2"
                >
                  {isMigrating ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Migrating...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Migrate Templates
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
