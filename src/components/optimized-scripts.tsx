import React from "react";
import Script from 'next/script';

// Extend Window interface for custom properties
declare global {
  interface Window {
    omg_consent?: string;
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function OptimizedScripts() {
  return (
    <>
      {/* Google Analytics - Load after consent */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.omg_consent === 'accepted') {
            window.dataLayer = window.dataLayer || [];
            function gtag(...args: any[]){window.dataLayer!.push(args);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          }
        }}
      />
      
      {/* Meta Pixel - Load after consent */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            if(window.omg_consent === 'accepted') {
              fbq('init', 'META_PIXEL_ID');
              fbq('track', 'PageView');
            }
          `
        }}
      />
    </>
  );
}