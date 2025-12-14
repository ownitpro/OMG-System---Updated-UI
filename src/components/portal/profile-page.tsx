import React from "react";
import { UserIcon, EnvelopeIcon, BuildingOfficeIcon, KeyIcon } from "@heroicons/react/24/outline";

interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  memberships: Array<{
    role: string;
    organization: {
      name: string;
      slug: string;
    };
  }>;
}

interface ProfilePageProps {
  user: User;
}

export function ProfilePage({ user }: ProfilePageProps) {
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Admin</span>;
      case "STAFF":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Staff</span>;
      case "CLIENT":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Client</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{role}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0">
            <img
              className="h-20 w-20 rounded-full"
              src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name || user.email}`}
              alt={user.name || user.email}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900">
              {user.name || "No name set"}
            </h1>
            <p className="text-sm text-gray-500">{user.email}</p>
            <div className="mt-2">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <UserIcon className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Account Information</h3>
          <div className="mt-5 space-y-4">
            <div className="flex items-center">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                <dd className="text-sm text-gray-900">{user.email}</dd>
              </div>
            </div>
            <div className="flex items-center">
              <UserIcon className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                <dd className="text-sm text-gray-900">{user.name || "Not set"}</dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Organization Memberships */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Organization Memberships</h3>
          <div className="mt-5">
            <ul className="divide-y divide-gray-200">
              {user.memberships.map((membership, index) => (
                <li key={index} className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {membership.organization.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {membership.organization.slug}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getRoleBadge(membership.role)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Security</h3>
          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <KeyIcon className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <dt className="text-sm font-medium text-gray-900">Password</dt>
                  <dd className="text-sm text-gray-500">Last changed 30 days ago</dd>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white shadow rounded-lg border border-red-200">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-red-900">Danger Zone</h3>
          <div className="mt-5">
            <p className="text-sm text-red-600">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
