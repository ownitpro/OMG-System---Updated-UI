"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function Topbar() {
  const params = useParams();
  const orgId = (params?.orgId as string) || "demo";
  const { isDarkMode, toggleDarkMode, isLoaded } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur">
      <div className="mx-auto max-w-[1400px] px-4 h-24 flex items-center justify-between">
        <Link href={`/org/${orgId}/overview`} className="flex items-center py-2">
          <img src={isDarkMode ? "/logo-dark.png" : "/logo.png"} alt="SecureVault Docs" className="h-20" />
        </Link>
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle */}
          {isLoaded && (
            <button
              onClick={toggleDarkMode}
              className="relative p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <div className="relative w-5 h-5">
                <Sun className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
                <Moon className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
              </div>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

