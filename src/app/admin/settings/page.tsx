import { redirect } from 'next/navigation';

// Redirect /admin/settings to /dashboard/admin/settings
export default function AdminSettingsRedirect() {
  redirect('/dashboard/admin/settings');
}
