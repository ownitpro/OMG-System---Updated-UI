// Structured data utilities for SEO and rich snippets

export function generateCaseSnapshotsStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Case Snapshots | OMGsystems",
    "description": "Real results from businesses across industries — see how property, real estate, contractors, accounting, cleaning & healthcare firms grew with OMGsystems.",
    "url": "https://www.omgsystems.com/case-snapshots",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Case Studies",
      "description": "Success stories from businesses using OMGsystems automation",
      "numberOfItems": 6,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Article",
            "headline": "From Spreadsheet Chaos to a Predictable 3-Day Turnaround",
            "description": "How a Durham property management firm automated owner statements and cut ticket resolution time by 57%",
            "author": {
              "@type": "Organization",
              "name": "OMGsystems"
            },
            "publisher": {
              "@type": "Organization",
              "name": "OMGsystems"
            },
            "datePublished": "2024-01-01",
            "url": "https://www.omgsystems.com/case-snapshots/property-management-3-day-turnaround"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Article",
            "headline": "How a GTA Renovation Firm Cut Quote Time by 80%",
            "description": "From 3-day quote delays to 45-minute turnarounds with automated lead scoring and proposal generation",
            "author": {
              "@type": "Organization",
              "name": "OMGsystems"
            },
            "publisher": {
              "@type": "Organization",
              "name": "OMGsystems"
            },
            "datePublished": "2024-01-01",
            "url": "https://www.omgsystems.com/case-snapshots/contractor-80-percent-quote-time"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Article",
            "headline": "Never Miss a Showing Again: Self-Booking + SMS Reminders",
            "description": "Toronto real estate agent eliminates scheduling conflicts and increases showing attendance by 40%",
            "author": {
              "@type": "Organization",
              "name": "OMGsystems"
            },
            "publisher": {
              "@type": "Organization",
              "name": "OMGsystems"
            },
            "datePublished": "2024-01-01",
            "url": "https://www.omgsystems.com/case-snapshots/real-estate-self-booking-showings"
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "Article",
            "headline": "From Chasing Documents to 70% Time Savings",
            "description": "Small CPA firm in Mississauga automates client onboarding and document collection",
            "author": {
              "@type": "Organization",
              "name": "OMGsystems"
            },
            "publisher": {
              "@type": "Organization",
              "name": "OMGsystems"
            },
            "datePublished": "2024-01-01",
            "url": "https://www.omgsystems.com/case-snapshots/accounting-document-automation-70"
          }
        },
        {
          "@type": "ListItem",
          "position": 5,
          "item": {
            "@type": "Article",
            "headline": "Route Optimization + Auto-Invoicing = 50% Faster Payments",
            "description": "GTA cleaning company eliminates manual invoicing and reduces receivables by 50%",
            "author": {
              "@type": "Organization",
              "name": "OMGsystems"
            },
            "publisher": {
              "@type": "Organization",
              "name": "OMGsystems"
            },
            "datePublished": "2024-01-01",
            "url": "https://www.omgsystems.com/case-snapshots/cleaning-route-optimization"
          }
        },
        {
          "@type": "ListItem",
          "position": 6,
          "item": {
            "@type": "Article",
            "headline": "Digital Intake + OCR Reduces Patient Wait Times by 50%",
            "description": "Toronto healthcare clinic automates patient intake and document processing",
            "author": {
              "@type": "Organization",
              "name": "OMGsystems"
            },
            "publisher": {
              "@type": "Organization",
              "name": "OMGsystems"
            },
            "datePublished": "2024-01-01",
            "url": "https://www.omgsystems.com/case-snapshots/healthcare-intake-automation-50"
          }
        }
      ]
    }
  };
}

export function generateHomepageStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OMGsystems",
    "description": "Automation platform for property management, real estate, contractors, accounting, cleaning, and healthcare businesses",
    "url": "https://www.omgsystems.com",
    "logo": "https://www.omgsystems.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-OMG-SYSTEMS",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.linkedin.com/company/omgsystems",
      "https://twitter.com/omgsystems"
    ],
    "offers": {
      "@type": "Offer",
      "description": "Business automation software and services",
      "category": "Software"
    }
  };
}

export function generateBlogStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "OMGsystems Blog",
    "description": "Insights, tips, and success stories about business automation",
    "url": "https://www.omgsystems.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "OMGsystems",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.omgsystems.com/logo.png"
      }
    }
  };
}
