// Personal Vault Tabs component with Portal tab (PRO-gated)

'use client';

import Link from 'next/link';
import { isPersonalPro } from '@/lib/portal/plan';

export default function PersonalVaultTabs({
  active,
  plan,
}: {
  active: string;
  plan?: string;
}) {
  const tabs = [
    { id: 'overview', label: 'Overview', href: '/personal/overview' },
    { id: 'documents', label: 'Documents', href: '/personal/documents' },
  ];

  if (isPersonalPro(plan)) {
    tabs.push({ id: 'portal', label: 'Portal', href: '/personal/portal' });
  }

  return (
    <div className="flex gap-2 text-sm">
      {tabs.map(t => (
        <Link
          key={t.id}
          className={`px-3 py-2 rounded-xl ${
            active === t.id
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted hover:bg-muted/70'
          }`}
          href={t.href}
        >
          {t.label}
        </Link>
      ))}
    </div>
  );
}

