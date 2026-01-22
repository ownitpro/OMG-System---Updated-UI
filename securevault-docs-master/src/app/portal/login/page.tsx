// app/portal/login/page.tsx
// Client Portal Login - Email + PIN authentication

"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PortalStore } from "@/lib/mock/portalStore";

function PortalLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleLogin = async () => {
    if (!email || !pin) {
      setError("Please enter both email and PIN");
      return;
    }

    setLoading(true);
    setError(null);

    // Mock: Look up portal by email and verify PIN
    // In production, this would call an API
    const portal = PortalStore.getPortalByEmail(email);

    if (!portal) {
      setError("No portal found for this email. Please check your invitation email.");
      setLoading(false);
      return;
    }

    const isValid = PortalStore.verifyPin(portal.token, pin);

    if (!isValid) {
      setError("Invalid PIN. Please check your invitation email.");
      setLoading(false);
      return;
    }

    // Store session and redirect to portal
    localStorage.setItem("svd_portal_token", portal.token);
    localStorage.setItem("svd_portal_id", portal.portalId);
    localStorage.setItem("svd_portal_email", email);
    localStorage.setItem("svd_portal_client_name", portal.clientName);

    router.push("/portal/dashboard");
  };

  // Demo login bypass - for UI design work
  const handleDemoLogin = () => {
    PortalStore.seed(); // Ensure demo portal exists
    const demoPortal = PortalStore.getPortalByEmail("client@acme.com");

    if (demoPortal) {
      localStorage.setItem("svd_portal_token", demoPortal.token);
      localStorage.setItem("svd_portal_id", demoPortal.portalId);
      localStorage.setItem("svd_portal_email", demoPortal.clientEmail);
      localStorage.setItem("svd_portal_client_name", demoPortal.clientName);
      router.push("/portal/dashboard");
    }
  };

  return (
    <div className="min-h-screen landing-bg flex items-center justify-center">
      {/* Grain Overlay */}
      <div className="grain-overlay"></div>

      <div className="relative max-w-md w-full mx-auto px-4 z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 mb-4 shadow-lg shadow-teal-500/30">
            <span className="text-2xl font-bold text-white">SVD</span>
          </div>
          <h1 className="text-4xl font-black mb-3 text-white font-display drop-shadow-lg">Client Portal</h1>
          <p className="text-lg text-white/90 font-medium">Sign in to upload your documents</p>
        </div>

        <div className="glass-card rounded-2xl p-8 space-y-6 border-0 shadow-2xl">
          <div>
            <label className="block text-base font-bold mb-2 text-slate-900">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-medium"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <div>
            <label className="block text-base font-bold mb-2 text-slate-900">
              6-Digit PIN
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="••••••"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-center text-2xl tracking-widest font-medium"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <p className="text-sm mt-2 text-slate-600 font-medium">
              Check your invitation email for your PIN
            </p>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-4">
              <p className="text-sm font-bold text-red-700">{error}</p>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading || !email || pin.length !== 6}
            className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold px-6 py-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-500/25"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-slate-600 font-medium">For Design Testing</span>
            </div>
          </div>

          <button
            onClick={handleDemoLogin}
            className="w-full rounded-xl bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white font-bold px-6 py-3 transition-all shadow-lg shadow-teal-500/25"
          >
            Demo Login (Bypass Auth)
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-slate-900 bg-yellow-50 border border-yellow-300 rounded-xl p-3 font-medium">
          <strong className="font-bold">Demo Credentials:</strong> client@acme.com / PIN: 246810
        </div>

        <div className="mt-6 text-center text-sm text-white/70 font-medium">
          Powered by OMGsystems • 2025
        </div>
      </div>
    </div>
  );
}

export default function PortalLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-400">Loading...</div></div>}>
      <PortalLoginContent />
    </Suspense>
  );
}
