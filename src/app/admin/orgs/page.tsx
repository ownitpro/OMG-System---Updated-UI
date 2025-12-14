import { redirect } from 'next/navigation';

// Redirect /admin/orgs to /dashboard/admin/organizations
export default function AdminOrgsRedirect() {
  redirect('/dashboard/admin/organizations');
}
