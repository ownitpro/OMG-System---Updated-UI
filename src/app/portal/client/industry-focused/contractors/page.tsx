import { PortalShell } from "@/components/PortalShell";
import { ComingSoon } from "@/components/ComingSoon";
import { getClientNav } from "@/config/portalNav";

export default function ContractorsPage() {
  const nav = getClientNav();
  return (
    <PortalShell role="client" title="Contractors" nav={nav}>
      <ComingSoon
        title="Contractor Solutions"
        text="Industry-specific tools and automations for contractors."
      />
    </PortalShell>
  );
}

