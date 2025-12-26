"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getAdminNavV2 } from "@/config/portalNav";
import LogsTable from "./LogsTable";
import { MOCK_LOGS } from "@/lib/admin/mockLogs";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function AdminLogsPage() {
  const nav = getAdminNavV2();

  return (
    <PortalShellV2 role="admin" title="Audit Logs" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center">
            <DocumentMagnifyingGlassIcon className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Audit Logs</h1>
            <p className="text-sm text-white/60">
              Track key activity across the portal. (Like security cameras, but less creepy.)
            </p>
          </div>
        </div>

        <LogsTable initialLogs={MOCK_LOGS} />
      </div>
    </PortalShellV2>
  );
}
