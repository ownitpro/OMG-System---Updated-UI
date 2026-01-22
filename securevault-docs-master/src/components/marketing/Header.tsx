'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Wait for component to mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock scroll
  useEffect(() => {
    if (!mounted) return;

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, mounted]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
        <nav className="nav-container max-w-5xl w-full px-6 py-3 flex items-center justify-between pointer-events-auto glass-card-enhanced rounded-2xl shadow-xl">
          <Link href="/" className="flex items-center">
            <img src="/svd-logo-dark.png" alt="SecureVault Docs" className="h-[40px]" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/features" className="text-base font-medium nav-link text-slate-100 hover:text-teal-400 transition-colors">Features</Link>
            <Link href="/pricing" className="text-base font-medium nav-link text-slate-100 hover:text-teal-400 transition-colors">Pricing</Link>
            <Link href="/about" className="text-base font-medium nav-link text-slate-100 hover:text-teal-400 transition-colors">About</Link>
            <Link href="/docs" className="text-base font-medium nav-link text-slate-100 hover:text-teal-400 transition-colors">Docs</Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
             <Link
              href="/download"
              className="hidden xl:flex items-center gap-2 text-base font-medium text-slate-100 hover:text-teal-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Get the App
            </Link>
            <Link
              href="/login"
              className="btn-nav-cta"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-colors text-white hover:bg-white/10"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer - Only render after mounting to prevent hydration issues */}
      {mounted && (
        <>
          {isMobileMenuOpen && (
            <div
              className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          <div
            className={`lg:hidden fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } bg-slate-900/95 backdrop-blur-xl border-l border-slate-700 shadow-2xl`}
          >
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-700">
          <span className="text-lg font-semibold text-white">Menu</span>
           <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-colors text-slate-300 hover:bg-slate-800"
          >
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col h-[calc(100%-73px)] overflow-y-auto">
           <nav className="flex flex-col p-4 gap-1">
              <Link href="/features" className="px-4 py-3 min-h-[48px] flex items-center text-base font-medium rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">Features</Link>
              <Link href="/pricing" className="px-4 py-3 min-h-[48px] flex items-center text-base font-medium rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">Pricing</Link>
              <Link href="/about" className="px-4 py-3 min-h-[48px] flex items-center text-base font-medium rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">About</Link>
              <Link href="/docs" className="px-4 py-3 min-h-[48px] flex items-center text-base font-medium rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">Documentation</Link>
           </nav>
           <div className="border-t mx-4 border-slate-700" />
           <div className="p-4">
               <Link href="/download" className="w-full px-4 py-3 min-h-[48px] flex items-center gap-3 text-base font-medium rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">
                  Get the App
               </Link>
           </div>
           <div className="mt-auto p-4 border-t border-slate-700">
              <Link href="/login" className="w-full px-4 py-3 min-h-[48px] flex items-center justify-center text-base font-semibold rounded-lg btn-nav-cta mb-2">Login</Link>
              <Link href="/signup" className="w-full px-4 py-3 min-h-[48px] flex items-center justify-center text-base font-semibold rounded-xl btn-enhanced-secondary">Get Started Free</Link>
           </div>
        </div>
          </div>
        </>
      )}
    </>
  );
}
