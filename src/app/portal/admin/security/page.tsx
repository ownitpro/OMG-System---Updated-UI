"use client";

import { useState, useEffect } from "react";
import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import Link from "next/link";
import { getAdminNavV2 } from "@/config/portalNav";
import {
  ShieldCheckIcon,
  ArrowLeftIcon,
  KeyIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  FingerPrintIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

// Mock security data
const MOCK_SESSIONS = [
  {
    id: "1",
    device: "Chrome on Windows",
    location: "Toronto, Canada",
    ip: "192.168.1.100",
    lastActive: "Active now",
    current: true,
    icon: ComputerDesktopIcon,
  },
  {
    id: "2",
    device: "Safari on iPhone",
    location: "Toronto, Canada",
    ip: "192.168.1.101",
    lastActive: "2 hours ago",
    current: false,
    icon: DevicePhoneMobileIcon,
  },
  {
    id: "3",
    device: "Firefox on MacOS",
    location: "Vancouver, Canada",
    ip: "10.0.0.50",
    lastActive: "3 days ago",
    current: false,
    icon: ComputerDesktopIcon,
  },
];

const MOCK_LOGIN_HISTORY = [
  { date: "2024-12-27 10:30 AM", location: "Toronto, Canada", device: "Chrome", status: "success" },
  { date: "2024-12-26 09:15 AM", location: "Toronto, Canada", device: "Chrome", status: "success" },
  { date: "2024-12-25 03:45 PM", location: "Unknown", device: "Firefox", status: "failed" },
  { date: "2024-12-24 11:20 AM", location: "Toronto, Canada", device: "Safari", status: "success" },
];

type MFASetupStep = "idle" | "setup" | "verify" | "complete" | "backup-codes" | "disable";

export default function AdminSecurityPage() {
  const nav = getAdminNavV2();
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [mfaLoading, setMfaLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // MFA Setup State
  const [mfaStep, setMfaStep] = useState<MFASetupStep>("idle");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [verifyCode, setVerifyCode] = useState("");
  const [disablePassword, setDisablePassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch MFA status on mount
  useEffect(() => {
    fetchMfaStatus();
  }, []);

  const fetchMfaStatus = async () => {
    try {
      const res = await fetch("/api/auth/mfa/status");
      if (res.ok) {
        const data = await res.json();
        setMfaEnabled(data.mfaEnabled);
      }
    } catch (err) {
      console.error("Failed to fetch MFA status:", err);
    } finally {
      setMfaLoading(false);
    }
  };

  const handleEnableMFA = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/mfa/setup", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to setup MFA");
        return;
      }

      setQrCodeUrl(data.qrCodeUrl);
      setBackupCodes(data.backupCodes);
      setMfaStep("setup");
    } catch (err) {
      setError("Failed to setup MFA. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyMFA = async () => {
    if (verifyCode.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }

    setError("");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: verifyCode }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid code");
        return;
      }

      setMfaStep("complete");
      setMfaEnabled(true);
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDisableMFA = async () => {
    if (!disablePassword) {
      setError("Please enter your password");
      return;
    }

    setError("");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/mfa/disable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: disablePassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to disable MFA");
        return;
      }

      setMfaEnabled(false);
      setMfaStep("idle");
      setDisablePassword("");
    } catch (err) {
      setError("Failed to disable MFA. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewBackupCodes = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/mfa/backup-codes");
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to get backup codes");
        return;
      }

      setBackupCodes(data.backupCodes);
      setMfaStep("backup-codes");
    } catch (err) {
      setError("Failed to get backup codes. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join("\n"));
  };

  const securityScore = mfaEnabled ? 100 : 75;

  return (
    <PortalShellV2 role="admin" title="Security" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#A855F7]/20 flex items-center justify-center">
              <ShieldCheckIcon className="w-5 h-5 text-[#A855F7]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Security Settings</h1>
              <p className="text-sm text-white/60">
                Manage your account security and authentication
              </p>
            </div>
          </div>
          <Link
            href="/portal/admin"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back
          </Link>
        </div>

        {/* Security Score Card */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#A855F7]/10 via-transparent to-[#47BD79]/10 backdrop-blur-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className={`w-20 h-20 rounded-full border-4 ${mfaEnabled ? "border-[#47BD79]" : "border-amber-500"} flex items-center justify-center`}>
                  <span className="text-2xl font-bold text-white">{securityScore}%</span>
                </div>
                {!mfaEnabled && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                    <ExclamationTriangleIcon className="w-4 h-4 text-white" />
                  </div>
                )}
                {mfaEnabled && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#47BD79] flex items-center justify-center">
                    <CheckCircleIcon className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Security Score</h2>
                <p className="text-sm text-white/60">
                  {mfaEnabled ? "Your account is well protected" : "Your account security can be improved"}
                </p>
              </div>
            </div>
            <div className="hidden md:flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircleIcon className="w-4 h-4 text-[#47BD79]" />
                <span className="text-white/70">Strong password</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {mfaEnabled ? (
                  <CheckCircleIcon className="w-4 h-4 text-[#47BD79]" />
                ) : (
                  <XMarkIcon className="w-4 h-4 text-red-400" />
                )}
                <span className="text-white/70">2FA {mfaEnabled ? "enabled" : "not enabled"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircleIcon className="w-4 h-4 text-[#47BD79]" />
                <span className="text-white/70">Email verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Password & 2FA Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Password */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <KeyIcon className="w-5 h-5 text-white/60" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Password</h3>
                <p className="text-sm text-white/50">Last changed 30 days ago</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-white/20 bg-[#1e293b] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#A855F7]/50 focus:ring-2 focus:ring-[#A855F7]/20 transition-all pr-10"
                    style={{
                      WebkitBoxShadow: '0 0 0 1000px #1e293b inset',
                      WebkitTextFillColor: 'white',
                      caretColor: 'white'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                  >
                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-white/20 bg-[#1e293b] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#A855F7]/50 focus:ring-2 focus:ring-[#A855F7]/20 transition-all"
                  style={{
                    WebkitBoxShadow: '0 0 0 1000px #1e293b inset',
                    WebkitTextFillColor: 'white',
                    caretColor: 'white'
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-white/20 bg-[#1e293b] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#A855F7]/50 focus:ring-2 focus:ring-[#A855F7]/20 transition-all"
                  style={{
                    WebkitBoxShadow: '0 0 0 1000px #1e293b inset',
                    WebkitTextFillColor: 'white',
                    caretColor: 'white'
                  }}
                />
              </div>
              <button className="w-full py-2.5 rounded-xl bg-[#A855F7] text-sm font-semibold text-white hover:bg-[#9333EA] transition-all shadow-lg shadow-[#A855F7]/30">
                Update Password
              </button>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <FingerPrintIcon className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Two-Factor Auth</h3>
                  <p className="text-sm text-white/50">Add an extra layer of security</p>
                </div>
              </div>
              {mfaLoading ? (
                <ArrowPathIcon className="w-5 h-5 text-white/40 animate-spin" />
              ) : (
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  mfaEnabled
                    ? "bg-[#47BD79]/20 text-[#47BD79] border border-[#47BD79]/30"
                    : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                }`}>
                  {mfaEnabled ? "Enabled" : "Disabled"}
                </div>
              )}
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Idle State - Not Enabled */}
            {mfaStep === "idle" && !mfaEnabled && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                <div className="flex gap-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-amber-400">2FA Not Enabled</h4>
                    <p className="text-sm text-white/60 mt-1">
                      Enable two-factor authentication to add an extra layer of security to your account.
                    </p>
                    <button
                      onClick={handleEnableMFA}
                      disabled={isSubmitting}
                      className="mt-3 px-4 py-2 rounded-xl bg-amber-500 text-sm font-semibold text-white hover:bg-amber-600 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                      {isSubmitting && <ArrowPathIcon className="w-4 h-4 animate-spin" />}
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Setup Step - Show QR Code */}
            {mfaStep === "setup" && (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-white/70 mb-4">
                    Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                  </p>
                  {qrCodeUrl && (
                    <div className="inline-block p-4 bg-white rounded-xl">
                      <img src={qrCodeUrl} alt="MFA QR Code" className="w-48 h-48" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Enter the 6-digit code from your app
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="000000"
                    className="w-full rounded-xl border border-white/20 bg-[#1e293b] px-4 py-3 text-sm text-white text-center tracking-[0.5em] font-mono placeholder:text-white/40 outline-none focus:border-[#A855F7]/50 focus:ring-2 focus:ring-[#A855F7]/20 transition-all"
                    style={{
                      WebkitBoxShadow: '0 0 0 1000px #1e293b inset',
                      WebkitTextFillColor: 'white',
                      caretColor: 'white'
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setMfaStep("idle"); setError(""); }}
                    className="flex-1 py-2.5 rounded-xl border border-white/20 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleVerifyMFA}
                    disabled={isSubmitting || verifyCode.length !== 6}
                    className="flex-1 py-2.5 rounded-xl bg-[#A855F7] text-sm font-semibold text-white hover:bg-[#9333EA] transition-all shadow-lg shadow-[#A855F7]/30 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting && <ArrowPathIcon className="w-4 h-4 animate-spin" />}
                    Verify & Enable
                  </button>
                </div>
              </div>
            )}

            {/* Complete Step - Show Backup Codes */}
            {mfaStep === "complete" && (
              <div className="space-y-4">
                <div className="rounded-xl border border-[#47BD79]/30 bg-[#47BD79]/10 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircleIcon className="w-5 h-5 text-[#47BD79]" />
                    <h4 className="text-sm font-medium text-[#47BD79]">2FA Enabled Successfully!</h4>
                  </div>
                  <p className="text-sm text-white/60">
                    Save these backup codes in a safe place. You can use them to access your account if you lose your device.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 p-4 rounded-xl bg-[#1e293b] border border-white/10">
                  {backupCodes.map((code, i) => (
                    <code key={i} className="text-sm text-white/80 font-mono">{code}</code>
                  ))}
                </div>
                <button
                  onClick={copyBackupCodes}
                  className="w-full py-2.5 rounded-xl border border-white/20 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <DocumentDuplicateIcon className="w-4 h-4" />
                  Copy Backup Codes
                </button>
                <button
                  onClick={() => setMfaStep("idle")}
                  className="w-full py-2.5 rounded-xl bg-[#A855F7] text-sm font-semibold text-white hover:bg-[#9333EA] transition-all shadow-lg shadow-[#A855F7]/30"
                >
                  Done
                </button>
              </div>
            )}

            {/* Idle State - Enabled */}
            {mfaStep === "idle" && mfaEnabled && (
              <div className="rounded-xl border border-[#47BD79]/30 bg-[#47BD79]/10 p-4">
                <div className="flex gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-[#47BD79] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-[#47BD79]">2FA Enabled</h4>
                    <p className="text-sm text-white/60 mt-1">
                      Your account is protected with two-factor authentication.
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={handleViewBackupCodes}
                        disabled={isSubmitting}
                        className="px-4 py-2 rounded-xl border border-white/20 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-all"
                      >
                        View Backup Codes
                      </button>
                      <button
                        onClick={() => setMfaStep("disable")}
                        className="px-4 py-2 rounded-xl border border-red-500/30 bg-red-500/10 text-sm font-medium text-red-400 hover:bg-red-500/20 transition-all"
                      >
                        Disable
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* View Backup Codes */}
            {mfaStep === "backup-codes" && (
              <div className="space-y-4">
                <p className="text-sm text-white/70">
                  These are your backup codes. Each code can only be used once.
                </p>
                <div className="grid grid-cols-2 gap-2 p-4 rounded-xl bg-[#1e293b] border border-white/10">
                  {backupCodes.map((code, i) => (
                    <code key={i} className="text-sm text-white/80 font-mono">{code}</code>
                  ))}
                </div>
                <button
                  onClick={copyBackupCodes}
                  className="w-full py-2.5 rounded-xl border border-white/20 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <DocumentDuplicateIcon className="w-4 h-4" />
                  Copy Backup Codes
                </button>
                <button
                  onClick={() => setMfaStep("idle")}
                  className="w-full py-2.5 rounded-xl bg-[#A855F7] text-sm font-semibold text-white hover:bg-[#9333EA] transition-all shadow-lg shadow-[#A855F7]/30"
                >
                  Done
                </button>
              </div>
            )}

            {/* Disable Step */}
            {mfaStep === "disable" && (
              <div className="space-y-4">
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                  <h4 className="text-sm font-medium text-red-400">Disable Two-Factor Authentication</h4>
                  <p className="text-sm text-white/60 mt-1">
                    Enter your password to confirm disabling 2FA. This will make your account less secure.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={disablePassword}
                    onChange={(e) => setDisablePassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-white/20 bg-[#1e293b] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all"
                    style={{
                      WebkitBoxShadow: '0 0 0 1000px #1e293b inset',
                      WebkitTextFillColor: 'white',
                      caretColor: 'white'
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setMfaStep("idle"); setError(""); setDisablePassword(""); }}
                    className="flex-1 py-2.5 rounded-xl border border-white/20 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDisableMFA}
                    disabled={isSubmitting || !disablePassword}
                    className="flex-1 py-2.5 rounded-xl bg-red-500 text-sm font-semibold text-white hover:bg-red-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting && <ArrowPathIcon className="w-4 h-4 animate-spin" />}
                    Disable 2FA
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Active Sessions */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <GlobeAltIcon className="w-5 h-5 text-white/60" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Active Sessions</h3>
                <p className="text-sm text-white/50">Manage your logged-in devices</p>
              </div>
            </div>
            <button className="px-4 py-2 rounded-xl border border-red-500/30 bg-red-500/10 text-sm font-medium text-red-400 hover:bg-red-500/20 transition-all flex items-center gap-2">
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              Sign Out All
            </button>
          </div>

          <div className="divide-y divide-white/5">
            {MOCK_SESSIONS.map((session) => {
              const Icon = session.icon;
              return (
                <div key={session.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${session.current ? "bg-[#47BD79]/20" : "bg-white/10"}`}>
                      <Icon className={`w-5 h-5 ${session.current ? "text-[#47BD79]" : "text-white/60"}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-white">{session.device}</p>
                        {session.current && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-[#47BD79]/20 text-[#47BD79] border border-[#47BD79]/30">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white/50">
                        {session.location} • {session.ip} • {session.lastActive}
                      </p>
                    </div>
                  </div>
                  {!session.current && (
                    <button className="px-3 py-1.5 rounded-xl border border-white/20 bg-white/5 text-xs font-medium text-white hover:bg-white/10 transition-all">
                      Revoke
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Login History */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <ClockIcon className="w-5 h-5 text-white/60" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Login History</h3>
                <p className="text-sm text-white/50">Recent login attempts</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr className="text-xs uppercase tracking-wide text-white/50 border-b border-white/10">
                  <th className="px-6 py-3 text-left">Date & Time</th>
                  <th className="px-6 py-3 text-left">Location</th>
                  <th className="px-6 py-3 text-left">Device</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {MOCK_LOGIN_HISTORY.map((login, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white/70">{login.date}</td>
                    <td className="px-6 py-4 text-white/70">{login.location}</td>
                    <td className="px-6 py-4 text-white/70">{login.device}</td>
                    <td className="px-6 py-4">
                      {login.status === "success" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#47BD79]/20 text-[#47BD79] border border-[#47BD79]/30">
                          <CheckCircleIcon className="w-3.5 h-3.5" />
                          Success
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                          <XMarkIcon className="w-3.5 h-3.5" />
                          Failed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalShellV2>
  );
}
