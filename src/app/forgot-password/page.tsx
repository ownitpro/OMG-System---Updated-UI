"use client";

import { useState } from "react";
import Link from "next/link";
import { EnvelopeIcon, ShieldCheckIcon, SparklesIcon, ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // TODO: Implement password reset API call
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send reset email");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden pt-32 sm:pt-40 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* SVG Animated Grid Pattern */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="forgotGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0.1)" />
            </linearGradient>
            <linearGradient id="forgotGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.2)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.05)" />
            </linearGradient>
          </defs>

          {/* Animated circles */}
          <circle cx="200" cy="200" r="150" fill="none" stroke="url(#forgotGradient1)" strokeWidth="1" opacity="0.3">
            <animate attributeName="r" values="150;180;150" dur="8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.5;0.3" dur="8s" repeatCount="indefinite" />
          </circle>
          <circle cx="1000" cy="600" r="200" fill="none" stroke="url(#forgotGradient2)" strokeWidth="1" opacity="0.2">
            <animate attributeName="r" values="200;230;200" dur="10s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.4;0.2" dur="10s" repeatCount="indefinite" />
          </circle>
          <circle cx="600" cy="100" r="100" fill="none" stroke="url(#forgotGradient1)" strokeWidth="0.5" opacity="0.2">
            <animate attributeName="r" values="100;120;100" dur="6s" repeatCount="indefinite" />
          </circle>

          {/* Floating dots */}
          <circle cx="300" cy="400" r="3" fill="#10B981" opacity="0.6">
            <animate attributeName="cy" values="400;350;400" dur="5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="5s" repeatCount="indefinite" />
          </circle>
          <circle cx="900" cy="300" r="2" fill="#06B6D4" opacity="0.5">
            <animate attributeName="cy" values="300;260;300" dur="4s" repeatCount="indefinite" begin="1s" />
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="4s" repeatCount="indefinite" begin="1s" />
          </circle>
          <circle cx="700" cy="500" r="2.5" fill="#10B981" opacity="0.4">
            <animate attributeName="cy" values="500;460;500" dur="6s" repeatCount="indefinite" begin="2s" />
          </circle>
        </svg>

        {/* Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-[180px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          {/* Logo/Icon */}
          <div className="mx-auto w-20 h-20 mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl rotate-6 opacity-50 blur-sm" />
            <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <EnvelopeIcon className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {isSuccess ? "Check Your Email" : "Forgot Password?"}
          </h1>
          <p className="text-white/60">
            {isSuccess
              ? "We've sent you a password reset link"
              : "No worries! Enter your email and we'll send you a reset link"
            }
          </p>
        </div>

        {/* Card */}
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 shadow-2xl shadow-black/20">
          {isSuccess ? (
            /* Success Message */
            <div className="space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircleIcon className="w-10 h-10 text-emerald-400" />
              </div>

              <div className="text-center space-y-2">
                <p className="text-white/80">
                  We've sent a password reset link to
                </p>
                <p className="text-emerald-400 font-medium">
                  {email}
                </p>
                <p className="text-white/60 text-sm pt-2">
                  Click the link in the email to reset your password. The link will expire in 1 hour.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-white/50 text-sm text-center mb-4">
                  Didn't receive the email?
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="w-full py-3 border border-emerald-500/30 text-emerald-400 font-medium rounded-xl hover:bg-emerald-500/10 transition-all"
                >
                  Try Again
                </button>
              </div>

              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02]"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                Back to Login
              </Link>
            </div>
          ) : (
            /* Reset Form */
            <>
              {/* Error Alert */}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <EnvelopeIcon className="w-5 h-5 text-white/30" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                  <p className="mt-2 text-xs text-white/40">
                    Enter the email address associated with your account
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending Reset Link...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Back to Login Link */}
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-white/10 text-white/70 font-medium rounded-xl hover:bg-white/5 hover:border-white/20 transition-all"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  Back to Login
                </Link>
              </form>
            </>
          )}
        </div>

        {/* Additional Help */}
        {!isSuccess && (
          <div className="text-center mt-8">
            <p className="text-white/50 text-sm">
              Need more help?{" "}
              <Link href="/contact" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                Contact Support
              </Link>
            </p>
          </div>
        )}

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <ShieldCheckIcon className="w-4 h-4" />
            <span>Secure reset process</span>
          </div>
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <SparklesIcon className="w-4 h-4" />
            <span>Canadian data residency</span>
          </div>
        </div>
      </div>
    </div>
  );
}
