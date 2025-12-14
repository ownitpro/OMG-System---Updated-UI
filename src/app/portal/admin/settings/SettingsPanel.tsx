"use client";

import * as React from "react";
import { readAdminSettings, adminDefaults, type AdminSettings } from "@/lib/admin/adminSettings";

const KEY = "omg_admin_settings";

function write(next: AdminSettings) {
  localStorage.setItem(KEY, JSON.stringify(next));
}

export default function SettingsPanel() {
  const [settings, setSettings] = React.useState<AdminSettings>(adminDefaults);
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    setSettings(readAdminSettings());
  }, []);

  function save(next: AdminSettings) {
    setSettings(next);
    write(next);
    window.dispatchEvent(new Event("omg-admin-settings-updated"));
    setMsg("Saved");
    window.setTimeout(() => setMsg(""), 900);
  }

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold">Admin preferences</h2>
        {msg ? <span className="text-xs text-zinc-600">{msg}</span> : null}
      </div>

      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
          <div>
            <div className="text-sm font-medium">Show Dev Tools pill</div>
            <div className="text-xs text-zinc-600">
              Toggles the ⚙ Dev Tools shortcut in the portal top bar (dev only).
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.showDevToolsPill}
            onChange={(e) => save({ ...settings, showDevToolsPill: e.target.checked })}
            className="h-5 w-5"
          />
        </div>

        <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
          <div>
            <div className="text-sm font-medium">Compact tables</div>
            <div className="text-xs text-zinc-600">
              Makes tables tighter for power users.
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.compactTables}
            onChange={(e) => save({ ...settings, compactTables: e.target.checked })}
            className="h-5 w-5"
          />
        </div>

        <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
          <div>
            <div className="text-sm font-medium">Default currency</div>
            <div className="text-xs text-zinc-600">
              Used for Week 1 mock displays.
            </div>
          </div>
          <select
            value={settings.defaultCurrency}
            onChange={(e) => save({ ...settings, defaultCurrency: e.target.value as any })}
            className="rounded-lg border px-3 py-2 text-sm"
          >
            <option value="USD">USD</option>
            <option value="CAD">CAD</option>
          </select>
        </div>

        <div className="rounded-lg border bg-slate-50 p-3">
          <div className="text-xs text-zinc-600">Storage key</div>
          <div className="mt-1 font-mono text-sm">{KEY}</div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => save(adminDefaults)}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
          >
            Reset to defaults
          </button>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem(KEY);
              setSettings(adminDefaults);
              window.dispatchEvent(new Event("omg-admin-settings-updated"));
              setMsg("Reset");
              window.setTimeout(() => setMsg(""), 900);
            }}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
          >
            Clear saved settings
          </button>
        </div>
      </div>
    </div>
  );
}

