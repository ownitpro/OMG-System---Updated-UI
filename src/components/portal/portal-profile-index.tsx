"use client";

import React, { useState } from "react";
import { 
  UserIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

interface User {
  id: string;
  name: string | null;
  email: string;
  createdAt: Date;
  memberships: Array<{
    id: string;
    role: string;
    createdAt: Date;
    organization: {
      name: string;
      slug: string;
    };
  }>;
}

interface PortalProfileIndexProps {
  user: User;
}

export function PortalProfileIndex({ user }: PortalProfileIndexProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email,
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "ADMIN":
        return ShieldCheckIcon;
      case "STAFF":
        return UserCircleIcon;
      case "CLIENT":
        return UserIcon;
      default:
        return UserIcon;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800";
      case "STAFF":
        return "bg-blue-100 text-blue-800";
      case "CLIENT":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  const handleSave = () => {
    // In a real app, this would make an API call to update the user profile
    console.log('Updating user profile:', formData);
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      email: user.email,
    });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-gray-300 rounded-full flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-gray-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.name || "No name set"}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">
                  {user.name || "No name set"}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">{user.email}</p>
              )}
            </div>
          </div>
          
          {isEditing && (
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <XMarkIcon className="h-4 w-4 mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <CheckIcon className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Organization Memberships */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Organization Memberships</h3>
          
          <div className="space-y-4">
            {user.memberships.map((membership) => {
              const RoleIcon = getRoleIcon(membership.role);
              
              return (
                <div key={membership.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <BuildingOfficeIcon className="h-6 w-6 text-gray-400" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {membership.organization.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Joined {getTimeAgo(membership.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(membership.role)}`}>
                      <RoleIcon className="h-3 w-3 mr-1" />
                      {membership.role}
                    </span>
                  </div>
                </div>
              );
            })}
            
            {user.memberships.length === 0 && (
              <div className="text-center py-8">
                <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No organization memberships</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You are not a member of any organizations yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Change Password</h4>
                <p className="text-sm text-gray-500">Update your account password</p>
              </div>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Change Password
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Enable 2FA
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Delete Account</h4>
                <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
              </div>
              <button className="inline-flex items-center px-3 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
