// src/app/auth/exchange/page.tsx
// This page is deprecated - NextAuth handles OAuth callbacks automatically
// Redirect to login page

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthExchangePage() {
  const router = useRouter();

  useEffect(() => {
    // NextAuth handles OAuth callbacks at /api/auth/callback/[provider]
    // This legacy Supabase exchange page is no longer needed
    console.log('[Auth Exchange] Redirecting to login - OAuth is now handled by NextAuth');
    router.push('/login');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
