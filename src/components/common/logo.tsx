import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  variant?: 'png' | 'svg';
  /**
   * Letter color variant for SVG logos:
   * - 'white': White letters (for dark backgrounds - default)
   * - 'black': Black letters (for light backgrounds/future light mode)
   */
  letterColor?: 'white' | 'black';
  /** @deprecated Use letterColor instead */
  darkMode?: boolean;
}

export function Logo({
  className = '',
  width,
  height,
  priority = false,
  variant = 'svg',
  letterColor = 'white',
  darkMode
}: LogoProps) {
  // Logo aspect ratio is approximately 1.71:1 (1800x1050)
  // Default sizes maintain this ratio
  const defaultWidth = width || 40;
  const defaultHeight = height || Math.round(defaultWidth / 1.71);

  // Determine which logo to use based on letterColor (or deprecated darkMode)
  const effectiveLetterColor = darkMode !== undefined
    ? (darkMode ? 'white' : 'black')
    : letterColor;

  // SVG logos with white or black letters
  const svgLogoPath = effectiveLetterColor === 'white'
    ? "/OMG-Logo-White-letters.svg"
    : "/OMG-Logo-Black-letters.svg";

  // PNG fallback logos
  const pngLogoPath = effectiveLetterColor === 'white'
    ? "/brandinglogodesign (1)/OMG logo finalw.png"
    : "/OMG logo final.png";

  const logoPath = variant === 'svg' ? svgLogoPath : pngLogoPath;

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

