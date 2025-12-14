"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BuildingOfficeIcon, CheckIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export const dynamic = 'force-dynamic';
export default function SelectOrgPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = session?.user as any;
  const memberships = user?.memberships || [];

  useEffect(() => {
    // If user already has an active org, redirect to portal
    if (user?.activeOrgId) {
      router.push("/portal");
    }
  }, [user?.activeOrgId, router]);

  const handleOrgSelect = async (orgId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/switch-org", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orgId }),
      });

      if (!response.ok) {
        throw new Error("Failed to switch organization");
      }

      // Update the session with the new active org
      await update({
        ...session,
        user: {
          ...user,
          activeOrgId: orgId,
        },
      });

      // Redirect to portal
      router.push("/portal");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <BuildingOfficeIcon className="mx-auto h-12 w-12 text-blue-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Select Organization</h1>
          <p className="mt-2 text-sm text-gray-600">
            Choose which organization you want to access.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div className="space-y-4">
            {memberships.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You don't have access to any organizations.</p>
                <Link
                  href="/"
                  className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                >
                  Go to Home
                </Link>
              </div>
            ) : (
              memberships.map((membership: any) => (
                <button
                  key={membership.orgId}
                  onClick={() => handleOrgSelect(membership.orgId)}
                  disabled={isLoading}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <BuildingOfficeIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="ml-4 text-left">
                      <div className="text-sm font-medium text-gray-900">
                        {membership.organization.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Role: {membership.role}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    ) : (
                      <ArrowRightIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </button>
              ))
            )}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
