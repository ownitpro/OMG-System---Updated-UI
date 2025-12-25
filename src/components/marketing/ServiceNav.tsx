"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/marketing/services", label: "Services", hoverColor: "blue" },
  { href: "/marketing/ads-management", label: "Ads Management", hoverColor: "blue" },
  { href: "/marketing/branding-creative", label: "Branding & Creative", hoverColor: "purple" },
  { href: "/marketing/content-development", label: "Content Development", hoverColor: "emerald" },
];

export default function ServiceNav() {
  const pathname = usePathname();

  const getHoverClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "hover:text-blue-300 hover:bg-white/[0.08]";
      case "purple":
        return "hover:text-purple-300 hover:bg-white/[0.08]";
      case "emerald":
        return "hover:text-emerald-300 hover:bg-white/[0.08]";
      default:
        return "hover:text-blue-300 hover:bg-white/[0.08]";
    }
  };

  const getGradientClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "from-blue-500/0 via-blue-500/20 to-blue-500/0";
      case "purple":
        return "from-purple-500/0 via-purple-500/20 to-purple-500/0";
      case "emerald":
        return "from-emerald-500/0 via-emerald-500/20 to-emerald-500/0";
      default:
        return "from-blue-500/0 via-blue-500/20 to-blue-500/0";
    }
  };

  return (
    <div className="mb-8">
      <p className="text-white/50 text-sm mb-4">Marketing Services:</p>
      <nav
        className="inline-flex items-center gap-1 px-4 py-2 rounded-full border transition-all duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: 'rgba(59, 130, 246, 0.25)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <div key={item.href} className="flex items-center">
              {index > 0 && <div className="w-px h-5 bg-white/[0.15] mx-1" />}
              <Link
                href={item.href}
                className={`group relative px-4 py-2 rounded-xl text-[13px] font-medium overflow-hidden transition-all duration-300 ${
                  isActive
                    ? "text-blue-300 bg-white/[0.12] shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                    : `text-white/80 ${getHoverClasses(item.hoverColor)}`
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {!isActive && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${getGradientClasses(item.hoverColor)} translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-xl`} />
                )}
              </Link>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
