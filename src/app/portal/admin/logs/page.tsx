"use client";

import { PortalShell } from "@/components/PortalShell";
import { getAdminNav } from "@/config/portalNav";
import LogsTable from "./LogsTable";
import { MOCK_LOGS } from "@/lib/admin/mockLogs";

export default function AdminLogsPage() {
  const nav = getAdminNav();

  return (
    <PortalShell role="admin" title="Logs" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Logs</h1>
          <p className="text-sm text-zinc-600">
            Track key activity across the portal. (Like security cameras, but less creepy.)
          </p>
        </div>

        <LogsTable initialLogs={MOCK_LOGS} />
      </div>
    </PortalShell>
  );
}

