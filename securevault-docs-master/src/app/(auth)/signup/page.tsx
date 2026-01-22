// src/app/(auth)/signup/page.tsx
// Signup page using NextAuth/Cognito authentication

'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { useAuth } from '@/contexts/AuthContext';

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const { signUp } = useAuth();
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(email, password, name || undefined, accountType);

      if (error) {
        setError(error.message || 'Failed to create account');
        setLoading(false);
        return;
      }

      router.push(redirect || '/dashboard');
    } catch (err) {
      console.error('Signup error:', err);
      setError('Failed to create account. Please try again.');
      setLoading(false);
    }
  };

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
            <h1 className="text-4xl font-bold font-headline text-white">Create your account</h1>
            <p className="text-slate-300">Sign up to get started with SecureVault Docs</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-card p-8 space-y-5 border-0 shadow-2xl">
              {/* Account Type Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAccountType('personal')}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      accountType === 'personal'
                        ? 'border-teal-500 bg-teal-500/10 ring-2 ring-teal-500/20'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="font-semibold text-white">Personal</div>
                    <div className="text-xs text-slate-400 mt-1">For individual use</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType('business')}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      accountType === 'business'
                        ? 'border-teal-500 bg-teal-500/10 ring-2 ring-teal-500/20'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="font-semibold text-white">Business</div>
                    <div className="text-xs text-slate-400 mt-1">For organizations</div>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-white">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition backdrop-blur-sm [&:-webkit-autofill]:[transition:background-color_5000000s_ease-in-out_0s] [&:-webkit-autofill]:[text-fill-color:white]"
                />
              </div>

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
                <label htmlFor="password" className="text-sm font-medium text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
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

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-white">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition backdrop-blur-sm [&:-webkit-autofill]:[transition:background-color_5000000s_ease-in-out_0s] [&:-webkit-autofill]:[text-fill-color:white]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
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
                  id="terms"
                  className="rounded border-white/20 text-teal-600 focus:ring-teal-500 bg-white/5 cursor-pointer"
                  required
                />
                <label htmlFor="terms" className="text-sm text-slate-300">
                  I agree to the{' '}
                  <Link href="/terms" className="text-teal-400 hover:text-teal-300 underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-teal-400 hover:text-teal-300 underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-900/20 border border-red-800">
                  <p className="text-sm text-red-400 font-medium">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-landing-primary shadow-lg shadow-teal-900/20"
              >
                {loading ? 'Creating account...' : 'Sign up for free'}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-slate-300">
            Already have an account?{' '}
            <Link href="/login" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div suppressHydrationWarning>
      <Suspense fallback={
        <div className="min-h-screen landing-bg flex flex-col items-center justify-center">
          <div className="grain-overlay"></div>
          <div className="text-slate-400 font-outfit relative z-10">Preparing SecureVault...</div>
        </div>
      }>
        <SignupContent />
      </Suspense>
    </div>
  );
}
