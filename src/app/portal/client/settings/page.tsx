"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getClientNavV2 } from "@/config/portalNav";
import { useEntitlements } from "@/hooks/useEntitlements";
import { useState } from "react";
import {
  Cog6ToothIcon,
  BellIcon,
  GlobeAltIcon,
  PaintBrushIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  CheckIcon,
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

export default function ClientSettingsPage() {
  const nav = getClientNavV2();
  const entitlements = useEntitlements();
  const lockedCount = Object.values(entitlements).filter((s) => s === "locked").length;

  // Settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [productUpdates, setProductUpdates] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  const [theme, setTheme] = useState<"system" | "light" | "dark">("system");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("America/New_York");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <PortalShellV2 role="client" title="Settings" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl border border-[#47BD79]/30 bg-gradient-to-br from-[#47BD79]/10 via-transparent to-[#3B82F6]/10 p-6 backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#47BD79]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#47BD79]/20 flex items-center justify-center">
              <Cog6ToothIcon className="w-7 h-7 text-[#47BD79]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Settings</h1>
              <p className="text-white/60">
                Customize your portal experience and preferences
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Notifications */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
                  <BellIcon className="w-5 h-5 text-[#47BD79]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Notifications</h2>
                  <p className="text-sm text-white/50">Manage how you receive updates</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Email Notifications */}
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <EnvelopeIcon className="w-5 h-5 text-white/50" />
                    <div>
                      <div className="text-sm font-medium text-white">Email Notifications</div>
                      <div className="text-xs text-white/50">Receive updates via email</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      emailNotifications ? "bg-[#47BD79]" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        emailNotifications ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Push Notifications */}
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <DevicePhoneMobileIcon className="w-5 h-5 text-white/50" />
                    <div>
                      <div className="text-sm font-medium text-white">Push Notifications</div>
                      <div className="text-xs text-white/50">Browser push notifications</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setPushNotifications(!pushNotifications)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      pushNotifications ? "bg-[#47BD79]" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        pushNotifications ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                {/* SMS Notifications */}
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <DevicePhoneMobileIcon className="w-5 h-5 text-white/50" />
                    <div>
                      <div className="text-sm font-medium text-white">SMS Notifications</div>
                      <div className="text-xs text-white/50">Important alerts via text</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSmsNotifications(!smsNotifications)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      smsNotifications ? "bg-[#47BD79]" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        smsNotifications ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Marketing Emails */}
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <EnvelopeIcon className="w-5 h-5 text-white/50" />
                    <div>
                      <div className="text-sm font-medium text-white">Marketing Emails</div>
                      <div className="text-xs text-white/50">Promotions and special offers</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setMarketingEmails(!marketingEmails)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      marketingEmails ? "bg-[#47BD79]" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        marketingEmails ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Product Updates */}
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <BellIcon className="w-5 h-5 text-white/50" />
                    <div>
                      <div className="text-sm font-medium text-white">Product Updates</div>
                      <div className="text-xs text-white/50">New features and improvements</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setProductUpdates(!productUpdates)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      productUpdates ? "bg-[#47BD79]" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        productUpdates ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Weekly Digest */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <EnvelopeIcon className="w-5 h-5 text-white/50" />
                    <div>
                      <div className="text-sm font-medium text-white">Weekly Digest</div>
                      <div className="text-xs text-white/50">Summary of your activity</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setWeeklyDigest(!weeklyDigest)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      weeklyDigest ? "bg-[#47BD79]" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        weeklyDigest ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#A855F7]/20 flex items-center justify-center">
                  <PaintBrushIcon className="w-5 h-5 text-[#A855F7]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Appearance</h2>
                  <p className="text-sm text-white/50">Customize how the portal looks</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-3">Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setTheme("system")}
                      className={`flex flex-col items-center gap-2 rounded-xl p-4 border transition-all ${
                        theme === "system"
                          ? "border-[#47BD79] bg-[#47BD79]/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <ComputerDesktopIcon className={`w-6 h-6 ${theme === "system" ? "text-[#47BD79]" : "text-white/50"}`} />
                      <span className={`text-sm ${theme === "system" ? "text-[#47BD79]" : "text-white/70"}`}>System</span>
                    </button>
                    <button
                      onClick={() => setTheme("light")}
                      className={`flex flex-col items-center gap-2 rounded-xl p-4 border transition-all ${
                        theme === "light"
                          ? "border-[#47BD79] bg-[#47BD79]/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <SunIcon className={`w-6 h-6 ${theme === "light" ? "text-[#47BD79]" : "text-white/50"}`} />
                      <span className={`text-sm ${theme === "light" ? "text-[#47BD79]" : "text-white/70"}`}>Light</span>
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className={`flex flex-col items-center gap-2 rounded-xl p-4 border transition-all ${
                        theme === "dark"
                          ? "border-[#47BD79] bg-[#47BD79]/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <MoonIcon className={`w-6 h-6 ${theme === "dark" ? "text-[#47BD79]" : "text-white/50"}`} />
                      <span className={`text-sm ${theme === "dark" ? "text-[#47BD79]" : "text-white/70"}`}>Dark</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Localization */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center">
                  <GlobeAltIcon className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Localization</h2>
                  <p className="text-sm text-white/50">Language and regional settings</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white focus:border-[#47BD79] focus:outline-none focus:ring-1 focus:ring-[#47BD79] transition-colors"
                  >
                    <option value="en" className="bg-[#1e293b]">English</option>
                    <option value="es" className="bg-[#1e293b]">Español</option>
                    <option value="fr" className="bg-[#1e293b]">Français</option>
                    <option value="de" className="bg-[#1e293b]">Deutsch</option>
                    <option value="pt" className="bg-[#1e293b]">Português</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white focus:border-[#47BD79] focus:outline-none focus:ring-1 focus:ring-[#47BD79] transition-colors"
                  >
                    <option value="America/New_York" className="bg-[#1e293b]">Eastern Time (ET)</option>
                    <option value="America/Chicago" className="bg-[#1e293b]">Central Time (CT)</option>
                    <option value="America/Denver" className="bg-[#1e293b]">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles" className="bg-[#1e293b]">Pacific Time (PT)</option>
                    <option value="UTC" className="bg-[#1e293b]">UTC</option>
                    <option value="Europe/London" className="bg-[#1e293b]">London (GMT)</option>
                    <option value="Europe/Paris" className="bg-[#1e293b]">Paris (CET)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Date Format</label>
                  <select
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white focus:border-[#47BD79] focus:outline-none focus:ring-1 focus:ring-[#47BD79] transition-colors"
                  >
                    <option value="MM/DD/YYYY" className="bg-[#1e293b]">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY" className="bg-[#1e293b]">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD" className="bg-[#1e293b]">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Save Button */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#47BD79] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3da86a] disabled:opacity-50 transition-all shadow-lg shadow-[#47BD79]/30 hover:shadow-[#47BD79]/50"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : saved ? (
                  <>
                    <CheckIcon className="w-4 h-4" />
                    Saved!
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>

              {saved && (
                <p className="mt-3 text-center text-sm text-[#47BD79]">
                  Your settings have been saved
                </p>
              )}
            </div>

            {/* Quick Info */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Need Help?</h3>
              <p className="text-sm text-white/60 mb-4">
                Having trouble with your settings? Our support team is here to help.
              </p>
              <a
                href="/portal/client/support"
                className="inline-flex items-center gap-2 text-sm text-[#47BD79] hover:text-[#5ed492] transition-colors"
              >
                Contact Support
                <span>→</span>
              </a>
            </div>

            {/* Data & Privacy */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 backdrop-blur-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Data & Privacy</h3>
              <div className="space-y-3">
                <button className="w-full text-left text-sm text-white/70 hover:text-white transition-colors py-2 border-b border-white/10">
                  Download My Data
                </button>
                <button className="w-full text-left text-sm text-white/70 hover:text-white transition-colors py-2 border-b border-white/10">
                  Privacy Settings
                </button>
                <button className="w-full text-left text-sm text-red-400 hover:text-red-300 transition-colors py-2">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalShellV2>
  );
}
