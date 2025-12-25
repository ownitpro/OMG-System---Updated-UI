'use client';

import React from 'react';
import Link from 'next/link';
import {
  HeartIcon,
  ShieldCheckIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { usePageTheme } from '@/hooks/usePageTheme';

// Social Media Icon Components
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
  </svg>
);
import { Logo } from '@/components/common/logo';

const footerLinks = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Contact', href: '/contact' }
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Security', href: '/security' },
    { name: 'Compliance', href: '/compliance' }
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Help Center', href: '/help' },
    { name: 'Documentation', href: '/docs' },
    { name: 'API', href: '/api-reference' }
  ],
  social: [
    { name: 'Instagram', href: 'https://instagram.com/omgsystems', Icon: InstagramIcon, color: 'hover:bg-pink-500/20 hover:text-pink-400' },
    { name: 'Facebook', href: 'https://facebook.com/omgsystems', Icon: FacebookIcon, color: 'hover:bg-blue-600/20 hover:text-blue-400' },
    { name: 'Twitter', href: 'https://twitter.com/omgsystems', Icon: TwitterIcon, color: 'hover:bg-blue-400/20 hover:text-blue-300' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/omgsystems', Icon: LinkedinIcon, color: 'hover:bg-blue-700/20 hover:text-blue-400' },
    { name: 'YouTube', href: 'https://youtube.com/@omgsystems', Icon: YoutubeIcon, color: 'hover:bg-red-600/20 hover:text-red-400' }
  ]
};

const trustBadges = [
  {
    icon: ShieldCheckIcon,
    text: 'Canadian Data Residency',
    description: 'Your data stays in Canada'
  },
  {
    icon: ClockIcon,
    text: '24/7 Expert Support',
    description: 'Always here to help'
  },
  {
    icon: HeartIcon,
    text: '99.9% Uptime Guarantee',
    description: 'Reliable service'
  },
  {
    icon: ChatBubbleLeftRightIcon,
    text: 'No Setup Fees',
    description: 'Start free, scale as you grow'
  }
];

export function Footer() {
  const { rgb: themeRgb, hex: themeHex } = usePageTheme();

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Background matching nav - dark slate */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* Subtle glow orbs - dynamic color */}
      <div
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl pointer-events-none transition-all duration-500"
        style={{ backgroundColor: `rgba(${themeRgb}, 0.05)` }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-500"
        style={{ backgroundColor: `rgba(${themeRgb}, 0.03)` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Glass Container - matching nav style */}
        <div
          className="rounded-3xl border p-8 md:p-10 transition-all duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderColor: `rgba(${themeRgb}, 0.25)`,
            boxShadow: `0 0 30px rgba(${themeRgb}, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)`,
          }}
        >
          {/* Trust Badges */}
          <div className="mb-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all duration-500 group"
                  style={{
                    // @ts-expect-error CSS custom properties for hover state
                    '--hover-border-color': `rgba(${themeRgb}, 0.3)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `rgba(${themeRgb}, 0.3)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <div className="flex-shrink-0">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-500"
                      style={{
                        backgroundColor: `rgba(${themeRgb}, 0.2)`,
                      }}
                    >
                      <badge.icon
                        className="w-4 h-4 transition-all duration-500"
                        style={{ color: themeHex }}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-medium text-xs">{badge.text}</p>
                    <p className="text-white/50 text-[10px]">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/10 mb-8" />

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Links */}
            <div>
              <h3 className="text-white/90 font-semibold mb-4 text-[13px] uppercase tracking-wider">Company</h3>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/60 transition-all duration-500 text-[13px] inline-block"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = themeHex;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '';
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-white/90 font-semibold mb-4 text-[13px] uppercase tracking-wider">Legal</h3>
              <ul className="space-y-2.5">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/60 transition-all duration-500 text-[13px] inline-block"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = themeHex;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '';
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-white/90 font-semibold mb-4 text-[13px] uppercase tracking-wider">Resources</h3>
              <ul className="space-y-2.5">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/60 transition-all duration-500 text-[13px] inline-block"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = themeHex;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '';
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-white/90 font-semibold mb-4 text-[13px] uppercase tracking-wider">Connect with Us</h3>
              <div className="flex space-x-2">
                {footerLinks.social.map((social) => {
                  const IconComponent = social.Icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/60 ${social.color} hover:scale-105 transition-all duration-300 border border-white/10 hover:border-white/20`}
                      title={social.name}
                      aria-label={social.name}
                    >
                      <IconComponent className="w-4.5 h-4.5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/10 mb-8" />

          {/* Newsletter Signup */}
          <div
            className="relative p-5 bg-white/5 rounded-2xl border border-white/10 transition-all duration-500 overflow-hidden group mb-8"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `rgba(${themeRgb}, 0.3)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            {/* Subtle glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `linear-gradient(to right, rgba(${themeRgb}, 0), rgba(${themeRgb}, 0.05))`,
              }}
            />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-white font-semibold text-sm mb-0.5">Stay Updated</h3>
                <p className="text-white/50 text-[13px]">Get the latest automation tips and industry insights</p>
              </div>
              <div className="flex w-full md:w-auto">
                <input
                  type="email"
                  id="footer-newsletter-email"
                  name="newsletter-email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-2.5 bg-white/5 border border-white/10 rounded-l-xl text-white text-[13px] placeholder-white/40 focus:outline-none transition-all duration-500"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = `rgba(${themeRgb}, 0.5)`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                />
                <button
                  className="px-5 py-2.5 text-white text-[13px] font-semibold rounded-r-xl transition-all duration-500 active:scale-[0.98]"
                  style={{
                    backgroundColor: themeHex,
                    boxShadow: `0 2px 12px rgba(${themeRgb}, 0.3)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 4px 20px rgba(${themeRgb}, 0.4)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 2px 12px rgba(${themeRgb}, 0.3)`;
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center group">
              <div
                className="transition-all duration-500"
                style={{
                  filter: `drop-shadow(0 0 8px rgba(${themeRgb}, 0.4))`,
                }}
              >
                <Logo width={100} variant="svg" letterColor="white" />
              </div>
            </div>

            <div className="flex items-center text-[12px] text-white/40">
              <span>© 2025 OMGsystems. All rights reserved. Proudly developed in Canada.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
