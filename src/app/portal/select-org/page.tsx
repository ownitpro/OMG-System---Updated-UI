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
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[#47BD79]/20 flex items-center justify-center">
            <BuildingOfficeIcon className="h-8 w-8 text-[#47BD79]" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-white">Select Organization</h1>
          <p className="mt-2 text-sm text-white/60">
            Choose which organization you want to access.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl py-8 px-4 sm:px-10">
          {error && (
            <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 p-4">
              <div className="text-sm text-red-400">{error}</div>
            </div>
          )}

          <div className="space-y-4">
            {memberships.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-white/50 mb-4">You don't have access to any organizations.</p>
                <Link
                  href="/"
                  className="text-[#47BD79] hover:text-[#5fcd8f] text-sm font-medium"
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
                  className="w-full flex items-center justify-between p-4 border border-white/10 rounded-xl bg-white/5 hover:border-[#47BD79]/30 hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-[#47BD79]/50 focus:ring-offset-2 focus:ring-offset-[#0f172a] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-[#A855F7]/20 flex items-center justify-center">
                        <BuildingOfficeIcon className="h-5 w-5 text-[#A855F7]" />
                      </div>
                    </div>
                    <div className="ml-4 text-left">
                      <div className="text-sm font-medium text-white">
                        {membership.organization.name}
                      </div>
                      <div className="text-sm text-white/50">
                        Role: {membership.role}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#47BD79]"></div>
                    ) : (
                      <ArrowRightIcon className="h-5 w-5 text-white/40" />
                    )}
                  </div>
                </button>
              ))
            )}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-white/50 hover:text-white/70"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
