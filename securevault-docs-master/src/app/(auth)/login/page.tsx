// src/app/(auth)/login/page.tsx
// Login page using NextAuth/Cognito authentication

'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/contexts/AuthContext';

// localStorage keys
const STORAGE_KEYS = {
  REMEMBER_ME: 'svd_remember_me',
  REMEMBERED_EMAIL: 'svd_remembered_email',
  BETA_ACCEPTED: 'svd_beta_ok',
};

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const errorParam = searchParams.get('error');
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    errorParam === 'session_corrupted'
      ? 'Your session was corrupted and has been cleared. Please sign in again.'
      : null
  );

  const [rememberMe, setRememberMe] = useState(false);
  const [betaAccepted, setBetaAccepted] = useState(false);
  const [hasBetaConsent, setHasBetaConsent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const savedBetaConsent = localStorage.getItem(STORAGE_KEYS.BETA_ACCEPTED) === 'true';
      setHasBetaConsent(savedBetaConsent);
      setBetaAccepted(savedBetaConsent);

      const savedRememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
      setRememberMe(savedRememberMe);

      if (savedRememberMe) {
        const savedEmail = localStorage.getItem(STORAGE_KEYS.REMEMBERED_EMAIL);
        if (savedEmail) {
          setEmail(savedEmail);
        }
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!hasBetaConsent && !betaAccepted) {
      setError('Please agree to the Beta Terms to continue.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        setError(error.message || 'Failed to sign in');
        setLoading(false);
        return;
      }

      if (typeof window !== 'undefined') {
        if (betaAccepted) {
          localStorage.setItem(STORAGE_KEYS.BETA_ACCEPTED, 'true');
        }

        if (rememberMe) {
          localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'true');
          localStorage.setItem(STORAGE_KEYS.REMEMBERED_EMAIL, email);
        } else {
          localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
          localStorage.removeItem(STORAGE_KEYS.REMEMBERED_EMAIL);
        }
      }

      router.push(redirect || '/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to sign in. Please try again.');
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen landing-bg flex flex-col items-center justify-center">
        <div className="grain-overlay"></div>
        <div className="text-slate-400 font-outfit relative z-10">Preparing SecureVault...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen landing-bg font-outfit relative flex flex-col overflow-x-hidden">
      <div className="grain-overlay"></div>
      
      {/* Header with Logo Only */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
        <div className="nav-container max-w-5xl w-full px-6 py-3 flex items-center justify-between pointer-events-auto">
          <Link href="/" className="flex items-center">
            <img src="/svd-logo-dark.png" alt="SecureVault Docs" className="h-[50px]" />
          </Link>
          <Link href="/" className="text-sm font-medium nav-link">
            Back to home
          </Link>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-4 pt-32 pb-12 relative z-10">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2 mb-2">
            <h1 className="text-4xl font-bold font-headline text-white">Welcome back</h1>
            <p className="text-slate-300">Sign in to your SecureVault Docs account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-card p-8 space-y-5 border-0 shadow-2xl">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition backdrop-blur-sm [&:-webkit-autofill]:[transition:background-color_5000000s_ease-in-out_0s] [&:-webkit-autofill]:[text-fill-color:white]"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-white">
                    Password
                  </label>
                  <Link href="/forgot-password" shakes-on-click="true" className="text-xs text-teal-400 hover:text-teal-300 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition backdrop-blur-sm [&:-webkit-autofill]:[transition:background-color_5000000s_ease-in-out_0s] [&:-webkit-autofill]:[text-fill-color:white]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 text-teal-600 focus:ring-teal-500 bg-white/5 cursor-pointer"
                />
                <label htmlFor="remember" className="text-sm text-slate-300 cursor-pointer select-none">
                  Remember me for 30 days
                </label>
              </div>

              {!hasBetaConsent && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="beta"
                    checked={betaAccepted}
                    onChange={(e) => setBetaAccepted(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 text-teal-600 focus:ring-teal-500 bg-white/5 cursor-pointer"
                    required
                  />
                  <label htmlFor="beta" className="text-sm text-slate-300 cursor-pointer select-none">
                    I agree to the{' '}
                    <Link href="/beta-terms" className="text-teal-400 hover:text-teal-300 underline">
                      Beta Terms
                    </Link>
                  </label>
                </div>
              )}

              {error && (
                <div className="p-3 rounded-lg bg-red-900/20 border border-red-800">
                  <p className="text-sm text-red-400 font-medium">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || (!hasBetaConsent && !betaAccepted)}
                className="w-full btn-landing-primary shadow-lg shadow-teal-900/20"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-slate-300">
            Don't have an account?{' '}
            <Link href="/signup" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div suppressHydrationWarning>
      <Suspense fallback={
        <div className="min-h-screen landing-bg flex flex-col items-center justify-center">
          <div className="grain-overlay"></div>
          <div className="text-slate-400 font-outfit relative z-10">Preparing SecureVault...</div>
        </div>
      }>
        <LoginContent />
      </Suspense>
    </div>
  );
}
