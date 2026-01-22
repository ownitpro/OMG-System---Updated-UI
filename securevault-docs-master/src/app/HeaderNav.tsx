"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNav() {
  const pathname = usePathname();
  const inOrg = pathname?.startsWith("/org/") ?? false;

  if (inOrg) {
    return (
      <div className="flex items-center gap-4 text-sm">
        <Link href={pathname.split("/").slice(0, 3).join("/") + "/overview"}>
          Workspace
        </Link>
        <Link href="/pricing">Billing</Link>
        <Link href="/support">Support</Link>
      </div>
    );
  }

  return (
    <nav className="flex items-center gap-4 text-sm">
      <Link href="/pricing">Pricing</Link>
      <Link href="/docs">Docs</Link>
      <Link href="/login" className="text-xs">Sign in</Link>
      <Link
        href="/signup"
        className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white"
      >
        Get started
      </Link>
    </nav>
  );
}

