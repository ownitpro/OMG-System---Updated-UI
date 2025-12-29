"use client";

import React, { useState } from "react";
import {
  UserIcon,
  KeyIcon,
  BellIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  EnvelopeIcon,
  PhoneIcon
} from "@heroicons/react/24/outline";

interface User {
  id: string;
  name: string | null;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  memberships: Array<{
    id: string;
    role: string;
    organization: {
      name: string;
      slug: string;
    };
  }>;
}

interface PortalProfileTabsProps {
  user: User;
}

export function PortalProfileTabs({ user }: PortalProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email,
    phone: "",
    timezone: "America/Toronto",
    language: "en",
    dateFormat: "MM/DD/YYYY",
    notifications: {
      email: true,
      push: false,
      sms: false
    }
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-[#A855F7]/20 text-[#A855F7] border-[#A855F7]/30";
      case "STAFF":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "CLIENT":
        return "bg-[#47BD79]/20 text-[#47BD79] border-[#47BD79]/30";
      default:
        return "bg-white/10 text-white/60 border-white/20";
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any || {}),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSaveProfile = () => {
    // In a real app, this would make an API call to update the profile
    console.log('Saving profile:', formData);
  };

  const handleChangePassword = () => {
    // In a real app, this would open a change password modal
    console.log('Changing password');
  };

  const tabs = [
    { id: "profile", name: "Profile", icon: UserIcon },
    { id: "security", name: "Security", icon: ShieldCheckIcon },
    { id: "notifications", name: "Notifications", icon: BellIcon },
    { id: "organizations", name: "Organizations", icon: BuildingOfficeIcon },
  ];

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#47BD79] to-[#3da86a] flex items-center justify-center shadow-lg shadow-[#47BD79]/30">
            <span className="text-2xl font-bold text-white">
              {(user.name || user.email).charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{user.name || user.email}</h2>
            <p className="text-sm text-white/60">{user.email}</p>
            <p className="text-xs text-white/40 mt-1">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
        <div className="border-b border-white/10">
          <nav className="flex gap-1 px-4 pt-2" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? "bg-[#47BD79]/20 text-[#47BD79] border-b-2 border-[#47BD79]"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  } whitespace-nowrap py-3 px-4 font-medium text-sm flex items-center gap-2 rounded-t-xl transition-all`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-6 py-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50 focus:ring-2 focus:ring-[#47BD79]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50 focus:ring-2 focus:ring-[#47BD79]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50 focus:ring-2 focus:ring-[#47BD79]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-white/70 mb-2">
                      Timezone
                    </label>
                    <select
                      id="timezone"
                      value={formData.timezone}
                      onChange={(e) => handleInputChange("timezone", e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#47BD79]/50 focus:ring-2 focus:ring-[#47BD79]/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="America/Toronto" className="bg-[#1e293b]">Eastern Time (Toronto)</option>
                      <option value="America/Vancouver" className="bg-[#1e293b]">Pacific Time (Vancouver)</option>
                      <option value="America/Edmonton" className="bg-[#1e293b]">Mountain Time (Edmonton)</option>
                      <option value="America/Winnipeg" className="bg-[#1e293b]">Central Time (Winnipeg)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8">
                <h3 className="text-lg font-semibold text-white mb-4">Preferences</h3>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-white/70 mb-2">
                      Language
                    </label>
                    <select
                      id="language"
                      value={formData.language}
                      onChange={(e) => handleInputChange("language", e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#47BD79]/50 focus:ring-2 focus:ring-[#47BD79]/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="en" className="bg-[#1e293b]">English</option>
                      <option value="fr" className="bg-[#1e293b]">Français</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="dateFormat" className="block text-sm font-medium text-white/70 mb-2">
                      Date Format
                    </label>
                    <select
                      id="dateFormat"
                      value={formData.dateFormat}
                      onChange={(e) => handleInputChange("dateFormat", e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#47BD79]/50 focus:ring-2 focus:ring-[#47BD79]/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="MM/DD/YYYY" className="bg-[#1e293b]">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY" className="bg-[#1e293b]">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD" className="bg-[#1e293b]">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2.5 rounded-xl bg-[#47BD79] text-sm font-semibold text-white hover:bg-[#3da86a] transition-all shadow-lg shadow-[#47BD79]/30 hover:shadow-[#47BD79]/50"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Password</h3>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <KeyIcon className="w-5 h-5 text-white/60" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Password</h4>
                        <p className="text-sm text-white/50">Last changed 30 days ago</p>
                      </div>
                    </div>
                    <button
                      onClick={handleChangePassword}
                      className="px-4 py-2 rounded-xl border border-white/20 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-all"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h3>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <ShieldCheckIcon className="w-5 h-5 text-white/60" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">2FA Status</h4>
                        <p className="text-sm text-white/50">Two-factor authentication is not enabled</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-[#47BD79] text-sm font-semibold text-white hover:bg-[#3da86a] transition-all shadow-lg shadow-[#47BD79]/30">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Active Sessions</h3>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-[#47BD79] animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Current Session</h4>
                        <p className="text-sm text-white/50">This device • Last active now</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#47BD79]/20 text-[#47BD79] border border-[#47BD79]/30">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <EnvelopeIcon className="w-5 h-5 text-white/60" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Email Notifications</h4>
                        <p className="text-sm text-white/50">Receive notifications via email</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.notifications.email}
                        onChange={(e) => handleInputChange("notifications.email", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#47BD79]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#47BD79]"></div>
                    </label>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <BellIcon className="w-5 h-5 text-white/60" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Push Notifications</h4>
                        <p className="text-sm text-white/50">Receive push notifications in your browser</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.notifications.push}
                        onChange={(e) => handleInputChange("notifications.push", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#47BD79]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#47BD79]"></div>
                    </label>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <PhoneIcon className="w-5 h-5 text-white/60" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">SMS Notifications</h4>
                        <p className="text-sm text-white/50">Receive notifications via SMS</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.notifications.sms}
                        onChange={(e) => handleInputChange("notifications.sms", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#47BD79]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#47BD79]"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2.5 rounded-xl bg-[#47BD79] text-sm font-semibold text-white hover:bg-[#3da86a] transition-all shadow-lg shadow-[#47BD79]/30 hover:shadow-[#47BD79]/50"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Organizations Tab */}
          {activeTab === "organizations" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Your Organizations</h3>
                <div className="space-y-4">
                  {user.memberships.map((membership) => (
                    <div key={membership.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#47BD79]/20 to-[#3da86a]/20 flex items-center justify-center border border-[#47BD79]/30">
                            <BuildingOfficeIcon className="w-6 h-6 text-[#47BD79]" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-white">{membership.organization.name}</h4>
                            <p className="text-sm text-white/50">/{membership.organization.slug}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(membership.role)}`}>
                            {membership.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
