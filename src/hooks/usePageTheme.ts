"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { getPageTheme, ThemeColor } from "@/lib/page-theme-config";

export function usePageTheme(): ThemeColor {
  const pathname = usePathname();

  const theme = useMemo(() => {
    return getPageTheme(pathname);
  }, [pathname]);

  return theme;
}
