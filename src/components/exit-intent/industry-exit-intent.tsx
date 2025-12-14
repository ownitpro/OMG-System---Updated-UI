"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ExitIntentModal } from "./exit-intent-modal";

const industryMap: Record<string, string> = {
  'property-management': 'Property Management',
  'real-estate': 'Real Estate',
  'contractors': 'Contractors',
  'accounting': 'Accounting',
  'cleaning': 'Cleaning',
  'healthcare': 'Healthcare'
};

export function IndustryExitIntent() {
  const pathname = usePathname();
  
  // Check if we're on an industry page
  const industryMatch = pathname.match(/^\/industries\/([^\/]+)/);
  if (!industryMatch) {
    return null;
  }
  
  const industry = industryMatch[1];
  const industryName = industryMap[industry];
  
  if (!industryName) {
    return null;
  }
  
  return <ExitIntentModal industry={industry} industryName={industryName} />;
}
