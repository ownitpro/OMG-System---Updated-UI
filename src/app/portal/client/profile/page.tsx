"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import Link from "next/link";
import Image from "next/image";
import { getClientNavV2 } from "@/config/portalNav";
import { useEntitlements } from "@/hooks/useEntitlements";
import {
  UserCircleIcon,
  ArrowLeftIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  CameraIcon,
  CheckCircleIcon,
  PencilIcon,
  GlobeAltIcon,
  CalendarIcon,
  BriefcaseIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function ClientProfilePage() {
  const nav = getClientNavV2();
  const { data: session } = useSession();
  const entitlements = useEntitlements();
  const lockedCount = Object.values(entitlements).filter((s) => s === "locked").length;
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    location: "",
    timezone: "America/Toronto",
    bio: "",
    avatar: "",
  });

  useEffect(() => {
    if (session?.user) {
      setProfile((prev) => ({
        ...prev,
        name: session.user.name || "Client User",
        email: session.user.email || "",
        role: (session.user as any).role || "CLIENT",
        avatar: session.user.image || "",
      }));
      if (session.user.image) {
        setAvatarPreview(session.user.image);
      }
    }
  }, [session]);

  // Close avatar menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showAvatarMenu) {
        const target = e.target as HTMLElement;
        if (!target.closest('.avatar-menu-container')) {
          setShowAvatarMenu(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAvatarMenu]);

  const handleAvatarClick = () => {
    setShowAvatarMenu(!showAvatarMenu);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setShowAvatarMenu(false);
        // Here you would typically upload to your server/cloud storage
        handleAvatarUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = async (file: File) => {
    setIsUploadingAvatar(true);
    try {
      // Simulate upload - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real implementation, you would:
      // 1. Upload the file to your server or cloud storage (S3, Cloudinary, etc.)
      // 2. Get back the URL
      // 3. Update the user's profile with the new avatar URL

      console.log('Avatar uploaded:', file.name);
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      alert('Failed to upload avatar. Please try again.');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    setProfile(prev => ({ ...prev, avatar: '' }));
    setShowAvatarMenu(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <PortalShellV2 role="client" title="Profile" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
              <UserCircleIcon className="w-5 h-5 text-[#47BD79]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">My Profile</h1>
              <p className="text-sm text-white/60">
                Manage your personal information
              </p>
            </div>
          </div>
          <Link
            href="/portal/client"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back
          </Link>
        </div>

        {/* Profile Header Card */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#47BD79]/10 via-transparent to-[#3B82F6]/10 backdrop-blur-xl p-6 overflow-visible">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative avatar-menu-container z-10">
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Avatar display */}
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#47BD79] to-[#3da86a] flex items-center justify-center text-4xl font-bold text-white shadow-lg shadow-[#47BD79]/30 overflow-hidden">
                {avatarPreview ? (
                  <Image
                    src={avatarPreview}
                    alt="Profile"
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  profile.name.charAt(0).toUpperCase()
                )}
                {isUploadingAvatar && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
                    <svg className="w-8 h-8 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Camera button */}
              <button
                onClick={handleAvatarClick}
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-[#47BD79] flex items-center justify-center text-white hover:bg-[#3da86a] transition-all shadow-lg"
              >
                <CameraIcon className="w-4 h-4" />
              </button>

              {/* Avatar menu dropdown */}
              {showAvatarMenu && (
                <div className="absolute top-full left-0 mt-2 w-48 rounded-xl border border-white/10 bg-[#1e293b] shadow-xl z-50">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/10 transition-all"
                  >
                    <PhotoIcon className="w-5 h-5 text-[#47BD79]" />
                    Upload Photo
                  </button>
                  {avatarPreview && (
                    <button
                      onClick={handleRemoveAvatar}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-white/10 transition-all border-t border-white/10"
                    >
                      <XMarkIcon className="w-5 h-5" />
                      Remove Photo
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#47BD79]/20 text-[#47BD79] border border-[#47BD79]/30 w-fit mx-auto md:mx-0">
                  <CheckCircleIcon className="w-3.5 h-3.5" />
                  {profile.role}
                </span>
              </div>
              <p className="text-white/60 mt-1">{profile.email}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3 text-sm text-white/50">
                <span className="flex items-center gap-1.5">
                  <BuildingOfficeIcon className="w-4 h-4" />
                  Test Organization
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPinIcon className="w-4 h-4" />
                  Toronto, Canada
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4" />
                  Member since Dec 2024
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                isEditing
                  ? "border border-white/20 bg-white/5 text-white hover:bg-white/10"
                  : "bg-[#47BD79] text-white hover:bg-[#3da86a] shadow-lg shadow-[#47BD79]/30"
              }`}
            >
              <PencilIcon className="w-4 h-4" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <UserCircleIcon className="w-5 h-5 text-white/60" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                <p className="text-sm text-white/50">Your basic profile details</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full rounded-xl border border-white/20 bg-[#1e293b] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50 focus:ring-2 focus:ring-[#47BD79]/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    WebkitBoxShadow: '0 0 0 1000px #1e293b inset',
                    WebkitTextFillColor: 'white',
                    caretColor: 'white'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full rounded-xl border border-white/20 bg-[#1e293b] pl-12 pr-4 py-3 text-sm text-white placeholder:text-white/40 outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      WebkitBoxShadow: '0 0 0 1000px #1e293b inset',
                      WebkitTextFillColor: 'white',
                    }}
                  />
                </div>
                <p className="text-xs text-white/40 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!isEditing}
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-xl border border-white/20 bg-[#1e293b] pl-12 pr-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50 focus:ring-2 focus:ring-[#47BD79]/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      WebkitBoxShadow: '0 0 0 1000px #1e293b inset',
                      WebkitTextFillColor: 'white',
                      caretColor: 'white'
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Bio
                </label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Tell us a little about yourself..."
                  rows={3}
                  className="w-full rounded-xl border border-white/20 bg-[#1e293b] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50 focus:ring-2 focus:ring-[#47BD79]/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed resize-none"
                />
              </div>
            </div>
          </div>

          {/* Work Information */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <BriefcaseIcon className="w-5 h-5 text-white/60" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Work Information</h3>
                <p className="text-sm text-white/50">Your organization details</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Company / Organization
                </label>
                <div className="relative">
                  <BuildingOfficeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    value={profile.company || "Test Organization"}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    disabled={!isEditing}
                    className="w-full rounded-xl border border-white/20 bg-[#1e293b] pl-12 pr-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50 focus:ring-2 focus:ring-[#47BD79]/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      WebkitBoxShadow: '0 0 0 1000px #1e293b inset',
                      WebkitTextFillColor: 'white',
                      caretColor: 'white'
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    value={profile.location || "Toronto, Canada"}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    disabled={!isEditing}
                    placeholder="City, Country"
                    className="w-full rounded-xl border border-white/20 bg-[#1e293b] pl-12 pr-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50 focus:ring-2 focus:ring-[#47BD79]/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      WebkitBoxShadow: '0 0 0 1000px #1e293b inset',
                      WebkitTextFillColor: 'white',
                      caretColor: 'white'
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Timezone
                </label>
                <div className="relative">
                  <GlobeAltIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <select
                    value={profile.timezone}
                    onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                    disabled={!isEditing}
                    className="w-full rounded-xl border border-white/20 bg-[#1e293b] pl-12 pr-4 py-3 text-sm text-white outline-none focus:border-[#47BD79]/50 focus:ring-2 focus:ring-[#47BD79]/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed appearance-none"
                  >
                    <option value="America/Toronto">Eastern Time (Toronto)</option>
                    <option value="America/Vancouver">Pacific Time (Vancouver)</option>
                    <option value="America/Denver">Mountain Time (Denver)</option>
                    <option value="America/Chicago">Central Time (Chicago)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-2.5 rounded-xl border border-white/20 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-[#47BD79] text-sm font-semibold text-white hover:bg-[#3da86a] transition-all shadow-lg shadow-[#47BD79]/30 disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircleIcon className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}

        {/* Quick Links */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/portal/client/security"
              className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#47BD79]/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#47BD79]/20 flex items-center justify-center group-hover:bg-[#47BD79]/30 transition-all">
                <svg className="w-5 h-5 text-[#47BD79]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Security Settings</p>
                <p className="text-xs text-white/50">Password & 2FA</p>
              </div>
            </Link>

            <Link
              href="/portal/client/billing"
              className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#3B82F6]/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center group-hover:bg-[#3B82F6]/30 transition-all">
                <svg className="w-5 h-5 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Billing</p>
                <p className="text-xs text-white/50">Plans & payments</p>
              </div>
            </Link>

            <Link
              href="/portal/client/settings"
              className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30 transition-all">
                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Settings</p>
                <p className="text-xs text-white/50">Preferences</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </PortalShellV2>
  );
}
