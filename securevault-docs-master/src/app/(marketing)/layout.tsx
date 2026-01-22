'use client';

import React from "react";
import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-900 landing-bg text-white font-sans selection:bg-teal-500/30">
      <Header />
      <main className="pt-24 min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
}
