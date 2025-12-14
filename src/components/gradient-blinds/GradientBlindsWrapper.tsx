"use client";

import dynamic from "next/dynamic";

const GradientBlinds = dynamic(
  () => import("./GradientBlinds"),
  { ssr: false }
);

interface GradientBlindsWrapperProps {
  gradientColors?: string[];
  angle?: number;
  noise?: number;
  blindCount?: number;
  blindMinWidth?: number;
  spotlightRadius?: number;
  spotlightSoftness?: number;
  spotlightOpacity?: number;
  mouseDampening?: number;
  distortAmount?: number;
  shineDirection?: "left" | "right";
  mixBlendMode?: string;
  className?: string;
}

export function GradientBlindsWrapper(props: GradientBlindsWrapperProps) {
  return <GradientBlinds {...props} />;
}












