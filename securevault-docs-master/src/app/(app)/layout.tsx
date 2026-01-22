'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AppTopNav } from '@/components/layout/AppTopNav';
import { ToastProvider } from '@/components/shared/ToastContainer';
import { MigrationCheck } from '@/components/account/MigrationCheck';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

type Props = {
  children: React.ReactNode;
};

// Helper to check if user was authenticated (persists across component remounts)
const AUTH_SESSION_KEY = 'sv_was_authenticated';
const AUTH_REDIRECT_DELAY = 2000; // Wait 2 seconds before redirecting to handle race conditions

function AppLayoutContent({ children }: Props) {
  const router = useRouter();
  const { user, session, loading: authLoading } = useAuth();
  const { isDarkMode, isLoaded: themeLoaded } = useTheme();
  const [redirectTimer, setRedirectTimer] = React.useState<NodeJS.Timeout | null>(null);

  // Use useState with lazy initialization to read sessionStorage ONCE on mount
  // This prevents the value from being re-computed during navigation renders
  const [wasAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
  });

  // Track if we've ever had a valid user in this component instance
  const hadUserRef = useRef(false);
  if (user && session) {
    hadUserRef.current = true;
  }

  // Store authentication state in sessionStorage to persist across re-renders/remounts
  useEffect(() => {
    if (user && session) {
      sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
      // Clear any pending redirect timer when user is authenticated
      if (redirectTimer) {
        clearTimeout(redirectTimer);
        setRedirectTimer(null);
      }
    }
  }, [user, session, redirectTimer]);

  // Apply dark mode to document body to override root layout background
  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = '#0f172a'; // slate-900
      document.body.classList.add('dark');
    } else {
      document.body.style.backgroundColor = '#f9fafb'; // gray-50
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Redirect to login ONLY if:
  // 1. Auth loading is complete
  // 2. No user exists
  // 3. No active session exists
  // 4. User was never authenticated in this browser session
  // 5. User was never loaded in this component instance
  // 6. Wait a delay to handle race conditions during navigation
  useEffect(() => {
    // Never redirect if we had a user in this component lifecycle
    if (hadUserRef.current) return;

    if (!authLoading && !user && !session && !wasAuthenticated) {
      // Set a delayed redirect to handle race conditions
      const timer = setTimeout(() => {
        // Triple-check: sessionStorage AND ref
        if (!sessionStorage.getItem(AUTH_SESSION_KEY) && !hadUserRef.current) {
          router.push('/login');
        }
      }, AUTH_REDIRECT_DELAY);
      setRedirectTimer(timer);
      return () => clearTimeout(timer);
    }
  }, [authLoading, user, session, wasAuthenticated, router]);

  // Show loading while checking auth or theme
  if (authLoading || !themeLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If no user but session exists, was previously authenticated, or we had a user before
  // Show loading - this handles race conditions during navigation
  if (!user && (session || wasAuthenticated || hadUserRef.current)) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If no user and no session and never authenticated, show loading while redirect timer runs
  if (!user) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col font-sans">
      {/* Global Background */}
      <div className="fixed inset-0 landing-bg z-0"></div>
      <div className="grain-overlay z-0"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Migration check for existing users with both personal vault and organizations */}
        <MigrationCheck />

        <AppTopNav />
        <main className="flex-1 transition-colors duration-500 pt-24">
          <div className="mx-auto max-w-7xl px-4 py-8">
            {children}
          </div>
        </main>
        <footer className={`border-t ${isDarkMode ? 'border-slate-700/50 text-slate-400' : 'border-gray-200/50 text-gray-500'} py-6 text-xs text-center transition-colors duration-500 backdrop-blur-sm`}>
          Powered by OMGsystems • 2025
        </footer>
      </div>
    </div>
  );
}

export default function AppLayout({ children }: Props) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppLayoutContent>{children}</AppLayoutContent>
      </ToastProvider>
    </ThemeProvider>
  );
}
