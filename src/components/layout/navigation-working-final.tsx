"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface NavDropdown {
  label: string;
  items: { label: string; href: string }[];
}

const navDropdowns: NavDropdown[] = [
  {
    label: "Industries",
    items: [
      { label: "Property Management", href: "/industries/property-management" },
      { label: "Real Estate", href: "/industries/real-estate" },
      { label: "Contractors", href: "/industries/contractors" },
      { label: "Accounting", href: "/industries/accounting" },
      { label: "Cleaning", href: "/industries/cleaning" },
      { label: "Healthcare", href: "/industries/healthcare" },
    ],
  },
  {
    label: "Apps",
    items: [
      { label: "CRM", href: "/apps/crm" },
      { label: "SecureVault Docs", href: "/apps/securevault-docs" },
      { label: "LeadFlow Engine", href: "/apps/leadflow-engine" },
      { label: "IndustryIQ", href: "/apps/industry-iq" },
    ],
  },
  {
    label: "Demos",
    items: [
      { label: "Try a Live Demo", href: "/try-live-demo" },
      { label: "CRM Demo", href: "/apps/demo/crm" },
      { label: "SecureVault Demo", href: "/apps/demo/securevault-docs" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "AI Agents", href: "/solutions/ai-agents" },
      { label: "Content Engine", href: "/apps/content-engine" },
      { label: "Custom Apps", href: "/custom-apps" },
    ],
  },
  {
    label: "Automation & Workflows",
    items: [
      { label: "Workflow Builder", href: "/workflow-builder" },
      { label: "Smart Automations", href: "/smart-automations" },
      { label: "Explore Automations", href: "/automations" },
    ],
  },
];

export default function NavBar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md" ref={navRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-800">
            OMGsystems
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex space-x-8">
            {navDropdowns.map((nav) => (
              <div className="relative" key={nav.label}>
                <button
                  className="text-gray-700 hover:text-black px-3 py-2 flex items-center"
                  onClick={() =>
                    setOpenDropdown((prev) =>
                      prev === nav.label ? null : nav.label
                    )
                  }
                >
                  {nav.label}
                  <span className="ml-1">▾</span>
                </button>
                {openDropdown === nav.label && (
                  <div
                    className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                  >
                    {nav.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Other static links */}
            <Link
              href="/about"
              className="text-gray-700 hover:text-black px-3 py-2"
            >
              About Us
            </Link>
            
            {/* Log In Button */}
            <Link
              href="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ml-4"
            >
              Log In
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              className="text-gray-700 hover:text-black focus:outline-none"
              onClick={() => setOpenDropdown((prev) => (prev ? null : "mobile"))}
            >
              {openDropdown === "mobile" ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {openDropdown === "mobile" && (
        <div className="md:hidden bg-white border-t border-gray-200">
          {navDropdowns.map((nav) => (
            <div key={nav.label} className="border-b border-gray-100">
              <button
                className="w-full text-left px-4 py-3 flex justify-between items-center text-gray-700"
                onClick={() =>
                  setOpenDropdown((prev) =>
                    prev === nav.label ? "mobile" : nav.label
                  )
                }
              >
                {nav.label}
                <span>{openDropdown === nav.label ? "▴" : "▾"}</span>
              </button>
              {openDropdown === nav.label && (
                <div className="bg-gray-50">
                  {nav.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-6 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/about"
            className="block px-4 py-3 text-gray-700"
            onClick={() => setOpenDropdown(null)}
          >
            About Us
          </Link>
          
          {/* Mobile Log In Button */}
          <div className="px-4 py-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              onClick={() => setOpenDropdown(null)}
            >
              Log In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}