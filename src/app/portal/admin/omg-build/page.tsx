import { PortalShell } from "@/components/PortalShell";
import { ComingSoon } from "@/components/ComingSoon";
import { getAdminNav } from "@/config/portalNav";

export default function AdminOmgBuildPage() {
  const nav = getAdminNav();
  return (
    <PortalShell role="admin" title="OMG Build" nav={nav}>
      <ComingSoon
        title="OMG Build Admin"
        text="Admin interface for OMG Build system management."
      />
    </PortalShell>
  );
}

