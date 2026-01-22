'use client'

import React, { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { OrgSidebar } from "@/components/layout/OrgSidebar";
import { Topbar } from "@/components/layout/Topbar";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  children: React.ReactNode;
  params: Promise<{ orgId: string }>;
};

export default function OrgLayout({ children, params }: Props) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { orgId } = use(params);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  // Show loading while checking auth
  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Topbar />
      <div className="flex flex-1 min-h-0">
        <OrgSidebar orgId={orgId} />
        <main className="flex-1 min-w-0 overflow-y-auto bg-background">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
            {children}
          </div>
        </main>
      </div>
      <footer className="px-4 py-6 text-xs text-muted-foreground text-center border-t border-border">
        Powered by OMGsystems • 2025
      </footer>
    </div>
  );
}

