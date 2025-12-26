"use client";

import * as React from "react";
import { readAdminSettings, adminDefaults, type AdminSettings } from "@/lib/admin/adminSettings";
import { ArrowPathIcon, TrashIcon } from "@heroicons/react/24/outline";

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
    <div
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
      style={{ boxShadow: "0 0 20px rgba(245, 158, 11, 0.1)" }}
    >
      <div className="flex items-center justify-between gap-3 mb-6">
        <h2 className="text-lg font-semibold text-white">Admin Preferences</h2>
        {msg ? <span className="text-xs text-[#47BD79]">{msg}</span> : null}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
          <div>
            <div className="text-sm font-medium text-white">Show Dev Tools pill</div>
            <div className="text-xs text-white/50">
              Toggles the Dev Tools shortcut in the portal top bar (dev only).
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.showDevToolsPill}
              onChange={(e) => save({ ...settings, showDevToolsPill: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#47BD79]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#47BD79]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
          <div>
            <div className="text-sm font-medium text-white">Compact tables</div>
            <div className="text-xs text-white/50">
              Makes tables tighter for power users.
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.compactTables}
              onChange={(e) => save({ ...settings, compactTables: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#47BD79]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#47BD79]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
          <div>
            <div className="text-sm font-medium text-white">Default currency</div>
            <div className="text-xs text-white/50">
              Used for Week 1 mock displays.
            </div>
          </div>
          <select
            value={settings.defaultCurrency}
            onChange={(e) => save({ ...settings, defaultCurrency: e.target.value as any })}
            className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-amber-500/50"
          >
            <option value="USD" className="bg-zinc-900">USD</option>
            <option value="CAD" className="bg-zinc-900">CAD</option>
          </select>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs text-white/50">Storage key</div>
          <div className="mt-1 font-mono text-sm text-white">{KEY}</div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={() => save(adminDefaults)}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <ArrowPathIcon className="w-4 h-4" />
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
            className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/20 transition-all"
          >
            <TrashIcon className="w-4 h-4" />
            Clear saved settings
          </button>
        </div>
      </div>
    </div>
  );
}
