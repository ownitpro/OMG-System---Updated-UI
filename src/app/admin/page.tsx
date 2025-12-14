import { redirect } from 'next/navigation';

// Redirect /admin to /dashboard/admin
export default function AdminPage() {
  redirect('/dashboard/admin');
}
