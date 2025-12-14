export type AdminSettings = {
  showDevToolsPill: boolean;
  compactTables: boolean;
  defaultCurrency: "USD" | "CAD";
};

const KEY = "omg_admin_settings";

export const adminDefaults: AdminSettings = {
  showDevToolsPill: true,
  compactTables: false,
  defaultCurrency: "USD",
};

export function readAdminSettings(): AdminSettings {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...adminDefaults, ...JSON.parse(raw) } : adminDefaults;
  } catch {
    return adminDefaults;
  }
}

