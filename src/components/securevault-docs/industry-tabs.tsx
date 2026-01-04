"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const industryTabs = [
  { name: "Overview", href: "/apps/securevault-docs" },
  { name: "Real Estate", href: "/apps/securevault-docs/real-estate" },
  { name: "Accounting", href: "/apps/securevault-docs/accounting" },
  {
    name: "Contractors & Trades",
    href: "/apps/securevault-docs/contractors",
    subItems: [
      { name: "Electrical", href: "/apps/securevault-docs/contractors/electrical" },
      { name: "HVAC", href: "/apps/securevault-docs/contractors/hvac" },
      { name: "Plumbing", href: "/apps/securevault-docs/contractors/plumbing" },
    ]
  },
];

export function IndustryTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [contractorHover, setContractorHover] = useState(false);
  const [contractorMobileOpen, setContractorMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const contractorDropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if we're on a contractor page
  const isContractorPage = pathname?.startsWith('/apps/securevault-docs/contractors');

  // Find current active tab
  const activeTab = industryTabs.find(tab => {
    if (tab.href === '/apps/securevault-docs/contractors') {
      return pathname?.startsWith('/apps/securevault-docs/contractors');
    }
    return pathname === tab.href;
  }) || industryTabs[0];

  // Get the active contractor sub-item name for display
  const getContractorDisplayName = () => {
    if (!isContractorPage) return "Contractors & Trades";
    const contractorTab = industryTabs.find(t => t.href === '/apps/securevault-docs/contractors');
    const activeSubItem = contractorTab?.subItems?.find(sub => pathname === sub.href);
    if (activeSubItem) {
      return activeSubItem.name;
    }
    return "Contractors & Trades";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setContractorMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle hover with delay for desktop
  const handleContractorMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setContractorHover(true);
  };

  const handleContractorMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setContractorHover(false);
    }, 150);
  };

  const handleSelect = (href: string, hasSubItems?: boolean) => {
    if (hasSubItems) {
      // Toggle contractor submenu on mobile
      setContractorMobileOpen(!contractorMobileOpen);
    } else {
      router.push(href);
      setIsOpen(false);
      setContractorMobileOpen(false);
    }
  };

  return (
    <nav className="mt-8 mb-auto w-full flex flex-col items-center gap-3 relative z-[100]">
      {/* Mobile Dropdown (shown < md) */}
      <div className="md:hidden relative z-50" ref={dropdownRef}>
        {/* Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-outfit font-semibold uppercase tracking-wide text-white cursor-pointer focus:outline-none border border-white/20 shadow-glass backdrop-blur-xl transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(20, 184, 166, 0.8) 0%, rgba(13, 148, 136, 0.8) 100%)",
          }}
        >
          {activeTab.name === "Contractors" ? getContractorDisplayName() : activeTab.name}
          <ChevronDown
            className={`w-4 h-4 text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Dropdown Menu */}
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[200px] rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden transition-all duration-300 origin-top ${
            isOpen
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }`}
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)",
          }}
        >
          {industryTabs.map((tab, index) => {
            const isActive = tab.href === '/apps/securevault-docs/contractors'
              ? pathname?.startsWith('/apps/securevault-docs/contractors')
              : pathname === tab.href;
            const hasSubItems = tab.subItems && tab.subItems.length > 0;

            return (
              <div key={tab.href}>
                <button
                  onClick={() => hasSubItems ? handleSelect(tab.href, true) : handleSelect(tab.href)}
                  className={`w-full px-5 py-3 text-left text-sm font-outfit font-semibold uppercase tracking-wide transition-all duration-200 flex items-center justify-between ${
                    isActive
                      ? "text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  } ${!hasSubItems && index !== industryTabs.length - 1 ? 'border-b border-white/10' : ''}`}
                  style={isActive && !hasSubItems ? {
                    background: "linear-gradient(135deg, rgba(20, 184, 166, 0.6) 0%, rgba(13, 148, 136, 0.6) 100%)",
                  } : {}}
                >
                  {tab.name}
                  {hasSubItems && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${contractorMobileOpen ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>

                {/* Mobile Sub-items */}
                {hasSubItems && contractorMobileOpen && (
                  <div className="bg-black/20">
                    {tab.subItems?.map((subItem) => {
                      const isSubActive = pathname === subItem.href;
                      return (
                        <button
                          key={subItem.href}
                          onClick={() => {
                            router.push(subItem.href);
                            setIsOpen(false);
                            setContractorMobileOpen(false);
                          }}
                          className={`w-full px-7 py-2.5 text-left text-xs font-outfit font-medium uppercase tracking-wide transition-all duration-200 ${
                            isSubActive
                              ? "text-white bg-teal-500/30"
                              : "text-white/60 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {subItem.name}
                        </button>
                      );
                    })}
                  </div>
                )}

                {hasSubItems && (
                  <div className="border-b border-white/10"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Tabs (shown >= md) */}
      <div
        className="hidden md:inline-flex items-center px-2 py-1 rounded-full backdrop-blur-xl border border-white/20 shadow-glass overflow-visible"
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)",
        }}
      >
        {industryTabs.map((tab, index) => {
          const isActive = tab.href === '/apps/securevault-docs/contractors'
            ? pathname?.startsWith('/apps/securevault-docs/contractors')
            : pathname === tab.href;
          const hasSubItems = tab.subItems && tab.subItems.length > 0;

          return (
            <div key={tab.href} className="flex items-center">
              {hasSubItems ? (
                // Contractors tab with hover dropdown
                <div
                  className="relative"
                  ref={contractorDropdownRef}
                  onMouseEnter={handleContractorMouseEnter}
                  onMouseLeave={handleContractorMouseLeave}
                >
                  <Link
                    href={tab.href}
                    className={`
                      px-4 py-1.5 rounded-full text-xs font-outfit uppercase tracking-wide transition-all duration-200 text-center flex items-center gap-1
                      ${
                        isActive
                          ? "text-white font-semibold shadow-lg"
                          : "text-white/80 font-semibold hover:bg-white/10 hover:text-white"
                      }
                    `}
                    style={{
                      minWidth: "105px",
                      ...(isActive ? { background: "linear-gradient(to right, #14b8a6, #0d9488)" } : {})
                    }}
                  >
                    {tab.name}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${contractorHover ? 'rotate-180' : ''}`} />
                  </Link>

                  {/* Hover Dropdown */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[160px] rounded-xl border border-white/20 shadow-2xl overflow-hidden transition-all duration-200 origin-top z-[100] ${
                      contractorHover
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                    }`}
                    style={{
                      background: "linear-gradient(to bottom, #14b8a6, #0d9488)",
                    }}
                  >
                    {tab.subItems?.map((subItem, subIndex) => {
                      const isSubActive = pathname === subItem.href;
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`block px-4 py-3 text-xs font-outfit font-semibold uppercase tracking-wide transition-all duration-200 ${
                            isSubActive
                              ? "text-white"
                              : "text-white/80 hover:text-white hover:bg-white/10"
                          } ${subIndex !== (tab.subItems?.length || 0) - 1 ? 'border-b border-white/10' : ''}`}
                          style={isSubActive ? {
                            background: "linear-gradient(135deg, rgba(20, 184, 166, 0.5) 0%, rgba(13, 148, 136, 0.5) 100%)",
                          } : {}}
                        >
                          {subItem.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
                // Regular tab
                <Link
                  href={tab.href}
                  className={`
                    px-4 py-1.5 rounded-full text-xs font-outfit uppercase tracking-wide transition-all duration-200 text-center
                    ${
                      isActive
                        ? "text-white font-semibold shadow-lg"
                        : "text-white/80 font-semibold hover:bg-white/10 hover:text-white"
                    }
                  `}
                  style={{
                    minWidth: tab.name === "Overview" ? "85px" : tab.name === "Real Estate" ? "95px" : "95px",
                    ...(isActive ? { background: "linear-gradient(to right, #14b8a6, #0d9488)" } : {})
                  }}
                >
                  {tab.name}
                </Link>
              )}
              {index < industryTabs.length - 1 && (
                <div className="w-px h-4 bg-white/30 mx-1"></div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
