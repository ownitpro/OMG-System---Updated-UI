import { PortalShell } from "@/components/PortalShell";
import { ComingSoon } from "@/components/ComingSoon";
import { getClientNav } from "@/config/portalNav";

export default function RealEstatePage() {
  const nav = getClientNav();
  return (
    <PortalShell role="client" title="Real Estate" nav={nav}>
      <ComingSoon
        title="Real Estate Solutions"
        text="Industry-specific tools and automations for real estate professionals."
      />
    </PortalShell>
  );
}

