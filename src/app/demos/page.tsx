import { redirect } from 'next/navigation';

// Redirect /demos to /try-live-demo
export default function DemosPage() {
  redirect('/try-live-demo');
}
