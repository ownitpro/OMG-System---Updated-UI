// src/app/(auth)/layout.tsx
// Minimal Auth layout to allow pages to control their own styling

'use client';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-white">
      {children}
    </div>
  );
}
