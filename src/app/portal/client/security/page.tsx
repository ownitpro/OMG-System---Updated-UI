"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getClientNavV2 } from "@/config/portalNav";
import { useEntitlements } from "@/hooks/useEntitlements";
import { useState } from "react";
import {
  ShieldCheckIcon,
  KeyIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { formatDateTime, formatTimeAgo } from "@/lib/client/formatters";

export default function ClientSecurityPage() {
  const nav = getClientNavV2();
  const entitlements = useEntitlements();
  const lockedCount = Object.values(entitlements).filter((s) => s === "locked").length;

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // 2FA state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);

  // Updated to match API response structure (ActiveSession model)
  const sessions = [
    {
      id: "1",
      sessionToken: "token_abc123",
      device: "Windows",
      browser: "Chrome 120",
      os: "Windows 11",
      ip: "192.168.1.100",
      location: "New York, NY",
      lastActive: new Date().toISOString(), // Now
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      current: true,
    },
    {
      id: "2",
      sessionToken: "token_def456",
      device: "iPhone 14",
      browser: "Safari 17",
      os: "iOS 17",
      ip: "192.168.1.105",
      location: "New York, NY",
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      current: false,
    },
    {
      id: "3",
      sessionToken: "token_ghi789",
      device: "MacBook Pro",
      browser: "Firefox 121",
      os: "macOS 14",
      ip: "10.0.0.50",
      location: "Boston, MA",
      lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      current: false,
    },
  ];

  // Updated to match API response structure (LoginHistory model)
  const loginHistory = [
    {
      id: "1",
      ip: "192.168.1.100",
      device: "Windows",
      browser: "Chrome 120",
      location: "New York, NY",
      success: true,
      createdAt: "2024-12-27T10:30:00Z"
    },
    {
      id: "2",
      ip: "192.168.1.105",
      device: "iPhone 14",
      browser: "Safari 17",
      location: "New York, NY",
      success: true,
      createdAt: "2024-12-26T15:15:00Z"
    },
    {
      id: "3",
      ip: "192.168.1.100",
      device: "Windows",
      browser: "Chrome 120",
      location: "New York, NY",
      success: true,
      createdAt: "2024-12-25T09:00:00Z"
    },
    {
      id: "4",
      ip: "45.123.45.67",
      device: "Unknown",
      browser: "Unknown",
      location: "Miami, FL",
      success: false,
      createdAt: "2024-12-24T23:45:00Z"
    },
    {
      id: "5",
      ip: "192.168.1.100",
      device: "Windows",
      browser: "Chrome 120",
      location: "New York, NY",
      success: true,
      createdAt: "2024-12-24T18:20:00Z"
    },
  ];

  const handlePasswordChange = async () => {
    setPasswordError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    setPasswordSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setPasswordSaving(false);
    setPasswordSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  const handleRevokeSession = (sessionId: string) => {
    // Simulate revoking session
    console.log("Revoking session:", sessionId);
  };

  return (
    <PortalShellV2 role="client" title="Security" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl border border-[#47BD79]/30 bg-gradient-to-br from-[#47BD79]/10 via-transparent to-[#3B82F6]/10 p-6 backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#47BD79]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#47BD79]/20 flex items-center justify-center">
              <ShieldCheckIcon className="w-7 h-7 text-[#47BD79]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Security</h1>
              <p className="text-white/60">
                Manage your account security and authentication settings
              </p>
            </div>
          </div>
        </div>

        {/* Security Score */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Security Score</h2>
            <span className="text-2xl font-bold text-[#47BD79]">75%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[#47BD79] to-[#3da86a]" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#47BD79]/20 border border-[#47BD79]/30 px-3 py-1 text-xs text-[#47BD79]">
              <CheckCircleIcon className="w-3 h-3" /> Strong Password
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs text-white/60">
              <ExclamationTriangleIcon className="w-3 h-3" /> 2FA Not Enabled
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#47BD79]/20 border border-[#47BD79]/30 px-3 py-1 text-xs text-[#47BD79]">
              <CheckCircleIcon className="w-3 h-3" /> Email Verified
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Change Password */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
                <KeyIcon className="w-5 h-5 text-[#47BD79]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Change Password</h2>
                <p className="text-sm text-white/50">Update your password regularly</p>
              </div>
            </div>

            {passwordSuccess && (
              <div className="mb-4 rounded-xl bg-[#47BD79]/20 border border-[#47BD79]/30 p-4">
                <div className="flex items-center gap-2 text-[#47BD79]">
                  <CheckCircleIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Password updated successfully!</span>
                </div>
              </div>
            )}

            {passwordError && (
              <div className="mb-4 rounded-xl bg-red-500/20 border border-red-500/30 p-4">
                <div className="flex items-center gap-2 text-red-400">
                  <ExclamationTriangleIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">{passwordError}</span>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 pr-12 text-white placeholder-white/30 focus:border-[#47BD79] focus:outline-none focus:ring-1 focus:ring-[#47BD79] transition-colors"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    {showCurrentPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 pr-12 text-white placeholder-white/30 focus:border-[#47BD79] focus:outline-none focus:ring-1 focus:ring-[#47BD79] transition-colors"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    {showNewPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 pr-12 text-white placeholder-white/30 focus:border-[#47BD79] focus:outline-none focus:ring-1 focus:ring-[#47BD79] transition-colors"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                onClick={handlePasswordChange}
                disabled={passwordSaving}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#47BD79] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3da86a] disabled:opacity-50 transition-all shadow-lg shadow-[#47BD79]/30"
              >
                {passwordSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#A855F7]/20 flex items-center justify-center">
                <DevicePhoneMobileIcon className="w-5 h-5 text-[#A855F7]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Two-Factor Authentication</h2>
                <p className="text-sm text-white/50">Add an extra layer of security</p>
              </div>
            </div>

            {twoFactorEnabled ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-[#47BD79]/20 border border-[#47BD79]/30 p-4">
                  <div className="flex items-center gap-2 text-[#47BD79]">
                    <CheckCircleIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">2FA is enabled</span>
                  </div>
                  <p className="mt-2 text-sm text-white/60">
                    Your account is protected with two-factor authentication.
                  </p>
                </div>
                <button
                  onClick={() => setTwoFactorEnabled(false)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-red-500/20 border border-red-500/30 px-6 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/30 transition-all"
                >
                  Disable 2FA
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-xl bg-amber-500/20 border border-amber-500/30 p-4">
                  <div className="flex items-center gap-2 text-amber-400">
                    <ExclamationTriangleIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">2FA is not enabled</span>
                  </div>
                  <p className="mt-2 text-sm text-white/60">
                    Enable two-factor authentication to better protect your account.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="text-sm text-white/70">Available methods:</div>
                  <button
                    onClick={() => setShowTwoFactorSetup(true)}
                    className="w-full flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#47BD79]/20 flex items-center justify-center">
                      <DevicePhoneMobileIcon className="w-5 h-5 text-[#47BD79]" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-white">Authenticator App</div>
                      <div className="text-xs text-white/50">Use Google Authenticator or similar</div>
                    </div>
                  </button>
                </div>

                {showTwoFactorSetup && (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-center mb-4">
                      <div className="w-32 h-32 mx-auto bg-white rounded-lg flex items-center justify-center mb-3">
                        <span className="text-xs text-gray-500">[QR Code Placeholder]</span>
                      </div>
                      <p className="text-sm text-white/60">Scan this QR code with your authenticator app</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowTwoFactorSetup(false)}
                        className="flex-1 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setTwoFactorEnabled(true);
                          setShowTwoFactorSetup(false);
                        }}
                        className="flex-1 rounded-xl bg-[#47BD79] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3da86a] transition-colors"
                      >
                        Verify & Enable
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Active Sessions */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center">
                <ComputerDesktopIcon className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Active Sessions</h2>
                <p className="text-sm text-white/50">Devices currently logged into your account</p>
              </div>
            </div>
            <button className="text-sm text-red-400 hover:text-red-300 transition-colors">
              Sign out all devices
            </button>
          </div>

          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`flex items-center justify-between rounded-xl border p-4 ${
                  session.current
                    ? "border-[#47BD79]/30 bg-[#47BD79]/5"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <ComputerDesktopIcon className="w-5 h-5 text-white/50" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{session.device}</span>
                      {session.current && (
                        <span className="rounded-full bg-[#47BD79]/20 border border-[#47BD79]/30 px-2 py-0.5 text-xs text-[#47BD79]">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-white/50">
                      {session.location} • {session.ip} • {formatTimeAgo(session.lastActive)}
                    </div>
                  </div>
                </div>
                {!session.current && (
                  <button
                    onClick={() => handleRevokeSession(session.id)}
                    className="text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Login History */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-white/50" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Login History</h2>
              <p className="text-sm text-white/50">Recent login attempts to your account</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-xs font-medium text-white/50 uppercase tracking-wider">Date</th>
                  <th className="text-left py-3 text-xs font-medium text-white/50 uppercase tracking-wider">Device</th>
                  <th className="text-left py-3 text-xs font-medium text-white/50 uppercase tracking-wider">Location</th>
                  <th className="text-left py-3 text-xs font-medium text-white/50 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {loginHistory.map((entry) => (
                  <tr key={entry.id}>
                    <td className="py-4 text-sm text-white/70">{formatDateTime(entry.createdAt)}</td>
                    <td className="py-4 text-sm text-white/70">{entry.browser} on {entry.device}</td>
                    <td className="py-4 text-sm text-white/70">{entry.location}</td>
                    <td className="py-4">
                      {entry.success ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#47BD79]/20 border border-[#47BD79]/30 px-2 py-0.5 text-xs text-[#47BD79]">
                          <CheckCircleIcon className="w-3 h-3" /> Success
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 border border-red-500/30 px-2 py-0.5 text-xs text-red-400">
                          <ExclamationTriangleIcon className="w-3 h-3" /> Blocked
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
