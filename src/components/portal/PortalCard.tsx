"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useProductLaunch, PRODUCT_IDS, type ProductId } from "@/hooks/useProductLaunch";

interface PortalCardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  accent?: "emerald" | "purple" | "blue" | "amber" | "teal" | "sky" | "default";
  glow?: boolean;
  hover?: boolean;
}

const accentColors = {
  emerald: {
    border: "border-[#47BD79]/30",
    glow: "shadow-[0_0_20px_rgba(71,189,121,0.15)]",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(71,189,121,0.25)]",
    bg: "bg-[#47BD79]/5",
  },
  purple: {
    border: "border-[#A855F7]/30",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]",
    bg: "bg-[#A855F7]/5",
  },
  blue: {
    border: "border-[#3B82F6]/30",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]",
    bg: "bg-[#3B82F6]/5",
  },
  amber: {
    border: "border-amber-500/30",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]",
    bg: "bg-amber-500/5",
  },
  teal: {
    border: "border-[#14B8A6]/30",
    glow: "shadow-[0_0_20px_rgba(20,184,166,0.15)]",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(20,184,166,0.25)]",
    bg: "bg-[#14B8A6]/5",
  },
  sky: {
    border: "border-[#38BDF8]/30",
    glow: "shadow-[0_0_20px_rgba(56,189,248,0.15)]",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(56,189,248,0.25)]",
    bg: "bg-[#38BDF8]/5",
  },
  default: {
    border: "border-white/10",
    glow: "",
    hoverGlow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]",
    bg: "bg-white/5",
  },
};

export function PortalCard({
  title,
  description,
  children,
  className = "",
  accent = "default",
  glow = false,
  hover = true,
}: PortalCardProps) {
  const colors = accentColors[accent];

  return (
    <div
      className={`
        rounded-2xl border backdrop-blur-xl p-6
        ${colors.border} ${colors.bg}
        ${glow ? colors.glow : ""}
        ${hover ? `${colors.hoverGlow} hover:bg-white/10 hover:scale-[1.01] hover:-translate-y-0.5` : ""}
        transition-all duration-300 ease-out
        ${className}
      `}
    >
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {description && <p className="mt-1 text-sm text-white/60">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

// Stat Card Component
interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ElementType;
  trend?: { value: number; positive: boolean };
  accent?: "emerald" | "purple" | "blue" | "amber" | "teal" | "sky";
}

export function StatCard({ label, value, icon: Icon, trend, accent = "emerald" }: StatCardProps) {
  const colorMap = {
    emerald: {
      iconBg: "bg-[#47BD79]/20",
      iconColor: "text-[#47BD79]",
      valueColor: "text-[#47BD79]",
      glowColor: "rgba(71, 189, 121, 0.2)",
    },
    purple: {
      iconBg: "bg-[#A855F7]/20",
      iconColor: "text-[#A855F7]",
      valueColor: "text-[#A855F7]",
      glowColor: "rgba(168, 85, 247, 0.2)",
    },
    blue: {
      iconBg: "bg-[#3B82F6]/20",
      iconColor: "text-[#3B82F6]",
      valueColor: "text-[#3B82F6]",
      glowColor: "rgba(59, 130, 246, 0.2)",
    },
    amber: {
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-400",
      valueColor: "text-amber-400",
      glowColor: "rgba(245, 158, 11, 0.2)",
    },
    teal: {
      iconBg: "bg-[#14B8A6]/20",
      iconColor: "text-[#14B8A6]",
      valueColor: "text-[#14B8A6]",
      glowColor: "rgba(20, 184, 166, 0.2)",
    },
    sky: {
      iconBg: "bg-[#38BDF8]/20",
      iconColor: "text-[#38BDF8]",
      valueColor: "text-[#38BDF8]",
      glowColor: "rgba(56, 189, 248, 0.2)",
    },
  };

  const colors = colorMap[accent];

  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300"
      style={{ boxShadow: `0 0 25px ${colors.glowColor}` }}
    >
      <div className="flex items-start justify-between">
        {Icon && (
          <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${colors.iconColor}`} />
          </div>
        )}
        {trend && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              trend.positive ? "text-[#47BD79]" : "text-red-400"
            }`}
          >
            <span>{trend.positive ? "+" : ""}{trend.value}%</span>
          </div>
        )}
      </div>
      <div className={`text-3xl font-bold mt-4 ${colors.valueColor}`}>{value}</div>
      <div className="text-sm text-white/60 mt-1">{label}</div>
    </div>
  );
}

// Action Card Component
interface ActionCardProps {
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ElementType;
  accent?: "emerald" | "purple" | "blue" | "amber" | "teal" | "sky";
  buttonLabel?: string;
  disabled?: boolean;
  comingSoon?: boolean;
}

export function ActionCard({
  title,
  description,
  href,
  onClick,
  icon: Icon,
  accent = "emerald",
  buttonLabel = "Open",
  disabled = false,
  comingSoon = false,
}: ActionCardProps) {
  const colorMap = {
    emerald: {
      iconBg: "bg-[#47BD79]/20",
      iconColor: "text-[#47BD79]",
      buttonBg: "bg-[#47BD79]",
      buttonHover: "hover:bg-[#3da86a]",
      borderColor: "border-[#47BD79]/30",
      glowColor: "rgba(71, 189, 121, 0.15)",
    },
    purple: {
      iconBg: "bg-[#A855F7]/20",
      iconColor: "text-[#A855F7]",
      buttonBg: "bg-[#A855F7]",
      buttonHover: "hover:bg-[#9333ea]",
      borderColor: "border-[#A855F7]/30",
      glowColor: "rgba(168, 85, 247, 0.15)",
    },
    blue: {
      iconBg: "bg-[#3B82F6]/20",
      iconColor: "text-[#3B82F6]",
      buttonBg: "bg-[#3B82F6]",
      buttonHover: "hover:bg-[#2563eb]",
      borderColor: "border-[#3B82F6]/30",
      glowColor: "rgba(59, 130, 246, 0.15)",
    },
    amber: {
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-400",
      buttonBg: "bg-amber-500",
      buttonHover: "hover:bg-amber-600",
      borderColor: "border-amber-500/30",
      glowColor: "rgba(245, 158, 11, 0.15)",
    },
    teal: {
      iconBg: "bg-[#14B8A6]/20",
      iconColor: "text-[#14B8A6]",
      buttonBg: "bg-[#14B8A6]",
      buttonHover: "hover:bg-[#0d9488]",
      borderColor: "border-[#14B8A6]/30",
      glowColor: "rgba(20, 184, 166, 0.15)",
    },
    sky: {
      iconBg: "bg-[#38BDF8]/20",
      iconColor: "text-[#38BDF8]",
      buttonBg: "bg-[#38BDF8]",
      buttonHover: "hover:bg-[#0ea5e9]",
      borderColor: "border-[#38BDF8]/30",
      glowColor: "rgba(56, 189, 248, 0.15)",
    },
  };

  const colors = colorMap[accent];

  const content = (
    <div
      className={`
        flex flex-col h-full rounded-2xl border bg-white/5 backdrop-blur-xl p-6
        ${colors.borderColor}
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-white/10 hover:scale-[1.01] cursor-pointer"}
        transition-all duration-300
      `}
      style={{ boxShadow: `0 0 20px ${colors.glowColor}` }}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-6 h-6 ${colors.iconColor}`} />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            {comingSoon && (
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/50">
                Coming Soon
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-white/60">{description}</p>
        </div>
      </div>

      <div className="mt-auto pt-4">
        <div
          className={`
            inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white
            ${disabled ? "bg-white/10 cursor-not-allowed" : `${colors.buttonBg} ${colors.buttonHover}`}
            transition-all duration-300 group
          `}
        >
          {buttonLabel}
          {!disabled && <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
        </div>
      </div>
    </div>
  );

  if (href && !disabled) {
    return <Link href={href}>{content}</Link>;
  }

  if (onClick && !disabled) {
    return <button onClick={onClick} className="text-left w-full">{content}</button>;
  }

  return content;
}

// Map product keys to SSO product IDs
const productKeyToSSOId: Record<string, ProductId> = {
  securevault_docs: PRODUCT_IDS.SECUREVAULT_DOCS,
  omg_crm: PRODUCT_IDS.OMG_CRM,
  omg_leads: PRODUCT_IDS.OMG_LEADS,
  omg_iq: PRODUCT_IDS.OMG_IQ,
  omg_ai_mastery: PRODUCT_IDS.OMG_AI_MASTERY,
};

// Product Card Component
interface ProductCardV2Props {
  name: string;
  description: string;
  status: "active" | "locked" | "coming_soon";
  icon?: React.ElementType;
  launchUrl?: string;
  unlockUrl?: string;
  accent?: "emerald" | "purple" | "blue" | "amber" | "teal" | "sky";
  /** Product key for SSO launch (e.g., 'securevault_docs') */
  productKey?: string;
  /** Enable SSO launch instead of direct URL navigation */
  useSSO?: boolean;
}

export function ProductCardV2({
  name,
  description,
  status,
  icon: Icon,
  launchUrl,
  unlockUrl,
  accent = "emerald",
  productKey,
  useSSO = false, // SSO disabled for initial launch - will be enabled after SSO integration
}: ProductCardV2Props) {
  const { launchProduct, launching, error } = useProductLaunch();

  // Get SSO product ID if available
  const ssoProductId = productKey ? productKeyToSSOId[productKey] : undefined;
  const canUseSSO = useSSO && ssoProductId && status === "active";
  const isLaunching = launching === ssoProductId;

  // Handle SSO launch
  const handleSSOLaunch = async () => {
    if (ssoProductId) {
      await launchProduct(ssoProductId);
    }
  };
  const statusConfig = {
    active: {
      badge: "Active",
      badgeClass: "bg-[#47BD79]/20 text-[#47BD79] border-[#47BD79]/30",
      buttonLabel: "Launch",
      buttonClass: "bg-[#47BD79] hover:bg-[#3da86a]",
      href: launchUrl,
    },
    locked: {
      badge: "Locked",
      badgeClass: "bg-white/10 text-white/50 border-white/20",
      buttonLabel: "Unlock",
      buttonClass: "bg-white/10 hover:bg-white/20 border border-white/20",
      href: unlockUrl,
    },
    coming_soon: {
      badge: "Coming Soon",
      badgeClass: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      buttonLabel: "Notify Me",
      buttonClass: "bg-white/10 hover:bg-white/20 border border-white/20",
      href: undefined,
    },
  };

  const config = statusConfig[status];

  const colorMap = {
    emerald: { iconBg: "bg-[#47BD79]/20", iconColor: "text-[#47BD79]", buttonBg: "bg-[#47BD79]", buttonHover: "hover:bg-[#3da86a]" },
    purple: { iconBg: "bg-[#A855F7]/20", iconColor: "text-[#A855F7]", buttonBg: "bg-[#A855F7]", buttonHover: "hover:bg-[#9333EA]" },
    blue: { iconBg: "bg-[#3B82F6]/20", iconColor: "text-[#3B82F6]", buttonBg: "bg-[#3B82F6]", buttonHover: "hover:bg-[#2563EB]" },
    amber: { iconBg: "bg-amber-500/20", iconColor: "text-amber-400", buttonBg: "bg-amber-500", buttonHover: "hover:bg-amber-600" },
    teal: { iconBg: "bg-[#14B8A6]/20", iconColor: "text-[#14B8A6]", buttonBg: "bg-[#14B8A6]", buttonHover: "hover:bg-[#0d9488]" },
    sky: { iconBg: "bg-[#38BDF8]/20", iconColor: "text-[#38BDF8]", buttonBg: "bg-[#38BDF8]", buttonHover: "hover:bg-[#0ea5e9]" },
  };

  const colors = colorMap[accent];

  return (
    <div className="flex flex-col h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:bg-white/10 hover:scale-[1.01] transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        {Icon && (
          <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${colors.iconColor}`} />
          </div>
        )}
        <span className={`rounded-full px-3 py-1 text-xs font-medium border ${config.badgeClass}`}>
          {config.badge}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
      <p className="text-sm text-white/60 flex-1">{description}</p>

      <div className="mt-4 flex gap-2">
        {status === "active" ? (
          <>
            {canUseSSO ? (
              /* SSO Launch Button - Uses API to generate token and open product */
              <button
                onClick={handleSSOLaunch}
                disabled={isLaunching}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white ${colors.buttonBg} ${colors.buttonHover} transition-all duration-300 group disabled:opacity-70 disabled:cursor-wait`}
              >
                {isLaunching ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Launching...
                  </>
                ) : (
                  <>
                    Launch
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            ) : launchUrl ? (
              /* Fallback: Direct URL navigation (when SSO not configured) */
              <Link
                href={launchUrl}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white ${colors.buttonBg} ${colors.buttonHover} transition-all duration-300 group`}
              >
                Launch
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : null}
            {unlockUrl && (
              <Link
                href={unlockUrl}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300"
              >
                Details
              </Link>
            )}
          </>
        ) : config.href ? (
          <Link
            href={config.href}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white ${config.buttonClass} transition-all duration-300 group`}
          >
            {config.buttonLabel}
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <button
            disabled
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white/50 bg-white/10 cursor-not-allowed"
          >
            {config.buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
}

// Quick Action Button
interface QuickActionButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  icon?: React.ElementType;
}

export function QuickActionButton({
  label,
  href,
  onClick,
  variant = "secondary",
  disabled = false,
  icon: Icon,
}: QuickActionButtonProps) {
  const variants = {
    primary: "bg-[#47BD79] hover:bg-[#3da86a] text-white shadow-lg shadow-[#47BD79]/30 hover:shadow-[#47BD79]/50",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/20",
    ghost: "bg-transparent hover:bg-white/10 text-white/70 hover:text-white",
  };

  const className = `
    inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold
    ${variants[variant]}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    transition-all duration-300
  `;

  const content = (
    <>
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </>
  );

  if (href && !disabled) {
    return <Link href={href} className={className}>{content}</Link>;
  }

  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {content}
    </button>
  );
}

// Section Header Component
interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: { label: string; href: string };
}

export function SectionHeader({ title, description, action }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {description && <p className="mt-1 text-sm text-white/60">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="text-sm font-medium text-[#47BD79] hover:text-[#5fcd8f] transition-colors flex items-center gap-1 group"
        >
          {action.label}
          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}

// Badge Component
interface BadgeProps {
  label: string;
  variant?: "success" | "warning" | "error" | "info" | "default";
  icon?: React.ElementType;
}

export function Badge({ label, variant = "default", icon: Icon }: BadgeProps) {
  const variants = {
    success: "bg-[#47BD79]/20 text-[#47BD79] border-[#47BD79]/30",
    warning: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    error: "bg-red-500/20 text-red-400 border-red-500/30",
    info: "bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]/30",
    default: "bg-white/10 text-white/70 border-white/20",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border ${variants[variant]}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {label}
    </span>
  );
}
