import { PortalShell } from "@/components/PortalShell";
import { ComingSoon } from "@/components/ComingSoon";
import { getClientNav } from "@/config/portalNav";

export default function AccountingPage() {
  const nav = getClientNav();
  return (
    <PortalShell role="client" title="Accounting" nav={nav}>
      <ComingSoon
        title="Accounting Solutions"
        text="Tools and automations designed for accounting firms."
      />
    </PortalShell>
  );
}

