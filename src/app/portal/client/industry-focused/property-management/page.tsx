import { PortalShell } from "@/components/PortalShell";
import { ComingSoon } from "@/components/ComingSoon";
import { getClientNav } from "@/config/portalNav";

export default function PropertyManagementPage() {
  const nav = getClientNav();
  return (
    <PortalShell role="client" title="Property Management" nav={nav}>
      <ComingSoon
        title="Property Management Solutions"
        text="Tools and automations designed for property management companies."
      />
    </PortalShell>
  );
}

