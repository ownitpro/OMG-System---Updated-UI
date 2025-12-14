import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  variant?: 'png' | 'svg';
  darkMode?: boolean; // For dark backgrounds, use white version
}

export function Logo({ 
  className = '', 
  width, 
  height, 
  priority = false, 
  variant = 'png',
  darkMode = false 
}: LogoProps) {
  // Logo aspect ratio is approximately 1.71:1 (1800x1050)
  // Default sizes maintain this ratio
  const defaultWidth = width || 40;
  const defaultHeight = height || Math.round(defaultWidth / 1.71);

  // Use the main "OMG logo final.png" file from public root
  // For dark backgrounds, use white version if available
  const logoPath = darkMode 
    ? "/brandinglogodesign (1)/OMG logo finalw.png" 
    : "/OMG logo final.png";

  if (variant === 'svg') {
    return (
      <div 
        className={`relative flex-shrink-0 ${className}`}
        style={{ width: `${defaultWidth}px`, height: `${defaultHeight}px` }}
      >
        <Image
          src={logoPath}
          alt="OMGSystems Logo"
          width={defaultWidth}
          height={defaultHeight}
          className="w-full h-full object-contain object-left"
          priority={priority}
          sizes="(max-width: 768px) 40px, 48px"
        />
      </div>
    );
  }

  return (
    <div 
      className={`relative flex-shrink-0 ${className}`}
      style={{ width: `${defaultWidth}px`, height: `${defaultHeight}px` }}
    >
      <Image
        src={logoPath}
        alt="OMGSystems Logo"
        fill
        className="object-contain object-left"
        priority={priority}
        sizes="(max-width: 768px) 40px, 48px"
      />
    </div>
  );
}

