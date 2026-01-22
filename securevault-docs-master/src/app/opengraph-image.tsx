
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const alt = 'SecureVault Docs - Capture Once. Organize Forever.';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          backgroundImage: 'linear-gradient(to bottom right, #0f172a, #134e4a)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background Patterns - Decorative Circles */}
        <div
          style={{
            position: 'absolute',
            top: '-25%',
            left: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(45, 212, 191, 0.15), transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-25%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.1), transparent 70%)',
          }}
        />

        {/* Content Container */}
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '32px',
            }}
        >
            {/* Shield Logo Icon */}
            <svg
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                style={{ color: '#2dd4bf' }}
            >
                <path
                    d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"
                    fill="currentColor"
                />
            </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: 'white',
            marginBottom: 24,
            textAlign: 'center',
            letterSpacing: '-0.03em',
            textShadow: '0 4px 40px rgba(45, 212, 191, 0.4)',
            // Fallback for no gradient support in some viewers
            background: 'linear-gradient(to right, #ffffff, #99f6e4)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          SecureVault Docs
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 500,
            color: '#ccfbf1',
            textAlign: 'center',
            letterSpacing: '-0.01em',
            opacity: 0.9,
          }}
        >
          Capture Once. Organize Forever.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
