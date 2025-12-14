import { PortalShell } from "@/components/PortalShell";
import { ComingSoon } from "@/components/ComingSoon";
import { getClientNav } from "@/config/portalNav";

export default function AdsManagementPage() {
  const nav = getClientNav();
  return (
    <PortalShell role="client" title="Ads Management" nav={nav}>
      <ComingSoon
        title="Ads Management"
        text="Manage your advertising campaigns and track performance."
      />
    </PortalShell>
  );
}

