import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Snapshot {
  slug: string;
  industry: string;
  title: string;
  subtitle: string;
  metricLabel: string;
  metricValue: string;
  heroImage?: string;
  content: string; // HTML or markdown
}

const allSnapshots: Snapshot[] = [
  {
    slug: 'property-management-3-day-turnaround',
    industry: 'Property Management',
    title: 'From Spreadsheet Chaos to a Predictable 3-Day Turnaround',
    subtitle: 'How a Durham property management firm automated owner statements and cut ticket resolution time by 57%',
    metricLabel: 'Average ticket close time',
    metricValue: '-57%',
    heroImage: '/cases/pm-dashboard.png',
    content: `
      <h2>The Challenge</h2>
      <p>Durham Property Management was drowning in spreadsheets. With 200+ properties and thousands of maintenance requests, their team was spending 12+ hours weekly just on owner statements and ticket management.</p>
      
      <h2>The Solution</h2>
      <p>OMGsystems automated their entire workflow:</p>
      <ul>
        <li>Automated owner statement generation</li>
        <li>Smart ticket routing and prioritization</li>
        <li>Real-time dashboard for property managers</li>
        <li>Automated follow-up reminders</li>
      </ul>
      
      <h2>The Results</h2>
      <p>Within 30 days, Durham Property Management saw dramatic improvements:</p>
      <ul>
        <li>57% reduction in average ticket close time</li>
        <li>12 hours of admin time saved weekly</li>
        <li>96% owner satisfaction rate</li>
        <li>Zero missed maintenance requests</li>
      </ul>
    `
  },
  {
    slug: 'contractor-80-percent-quote-time',
    industry: 'Contractors',
    title: 'How a GTA Renovation Firm Cut Quote Time by 80%',
    subtitle: 'From 3-day quote delays to 45-minute turnarounds with automated lead scoring and proposal generation',
    metricLabel: 'Quote turnaround time',
    metricValue: '-80%',
    heroImage: '/cases/contractor-quote-approved.png',
    content: `
      <h2>The Challenge</h2>
      <p>GTA Renovations was losing potential clients due to slow quote turnaround times. Their manual process took 3+ days, causing frustrated customers to seek faster alternatives.</p>
      
      <h2>The Solution</h2>
      <p>OMGsystems transformed their quoting process:</p>
      <ul>
        <li>Automated lead scoring and qualification</li>
        <li>Template-based proposal generation</li>
        <li>Real-time material cost calculations</li>
        <li>Automated follow-up sequences</li>
      </ul>
      
      <h2>The Results</h2>
      <p>GTA Renovations now delivers quotes in under 45 minutes:</p>
      <ul>
        <li>80% reduction in quote turnaround time</li>
        <li>40% increase in quote acceptance rate</li>
        <li>25% growth in monthly revenue</li>
        <li>95% customer satisfaction score</li>
      </ul>
    `
  },
  {
    slug: 'real-estate-self-booking-showings',
    industry: 'Real Estate',
    title: 'Never Miss a Showing Again: Self-Booking + SMS Reminders',
    subtitle: 'Toronto real estate agent eliminates scheduling conflicts and increases showing attendance by 40%',
    metricLabel: 'Showing attendance',
    metricValue: '+40%',
    heroImage: '/cases/realestate-showings.png',
    content: `
      <h2>The Challenge</h2>
      <p>Sarah Chen, a Toronto real estate agent, was constantly juggling showing schedules and dealing with no-shows. Manual coordination was eating into her time and costing her sales.</p>
      
      <h2>The Solution</h2>
      <p>OMGsystems automated her showing process:</p>
      <ul>
        <li>Self-booking calendar integration</li>
        <li>Automated SMS reminders</li>
        <li>Smart conflict detection</li>
        <li>Automated follow-up sequences</li>
      </ul>
      
      <h2>The Results</h2>
      <p>Sarah's business transformed within weeks:</p>
      <ul>
        <li>40% increase in showing attendance</li>
        <li>60% reduction in scheduling conflicts</li>
        <li>8 hours saved weekly on coordination</li>
        <li>30% increase in closed deals</li>
      </ul>
    `
  },
  {
    slug: 'accounting-document-automation-70',
    industry: 'Accounting',
    title: 'From Chasing Documents to 70% Time Savings',
    subtitle: 'Small CPA firm in Mississauga automates client onboarding and document collection',
    metricLabel: 'Document collection time',
    metricValue: '-70%',
    heroImage: '/cases/accounting-intake.png',
    content: `
      <h2>The Challenge</h2>
      <p>Mississauga CPA firm was spending 15+ hours weekly chasing client documents. Manual follow-ups and paper-based processes were slowing down tax season.</p>
      
      <h2>The Solution</h2>
      <p>OMGsystems automated their document workflow:</p>
      <ul>
        <li>Automated document request sequences</li>
        <li>Digital document collection portal</li>
        <li>Smart reminder system</li>
        <li>Automated client onboarding</li>
      </ul>
      
      <h2>The Results</h2>
      <p>The firm saw immediate improvements:</p>
      <ul>
        <li>70% reduction in document collection time</li>
        <li>90% of clients submit documents digitally</li>
        <li>50% faster tax return preparation</li>
        <li>100% client satisfaction rate</li>
      </ul>
    `
  },
  {
    slug: 'cleaning-route-optimization',
    industry: 'Cleaning',
    title: 'Route Optimization + Auto-Invoicing = 50% Faster Payments',
    subtitle: 'GTA cleaning company eliminates manual invoicing and reduces receivables by 50%',
    metricLabel: 'Payment collection time',
    metricValue: '-50%',
    heroImage: '/cases/cleaning-route-invoice.png',
    content: `
      <h2>The Challenge</h2>
      <p>GTA Cleaning Services was struggling with manual invoicing and slow payment collection. Their team was spending 10+ hours weekly on paperwork and follow-ups.</p>
      
      <h2>The Solution</h2>
      <p>OMGsystems automated their entire billing process:</p>
      <ul>
        <li>Route optimization for cleaning teams</li>
        <li>Automated invoice generation</li>
        <li>Digital payment processing</li>
        <li>Automated payment reminders</li>
      </ul>
      
      <h2>The Results</h2>
      <p>GTA Cleaning Services transformed their operations:</p>
      <ul>
        <li>50% reduction in payment collection time</li>
        <li>30% improvement in route efficiency</li>
        <li>85% of invoices paid within 7 days</li>
        <li>40% reduction in administrative overhead</li>
      </ul>
    `
  },
  {
    slug: 'healthcare-intake-automation-50',
    industry: 'Healthcare',
    title: 'Digital Intake + OCR Reduces Patient Wait Times by 50%',
    subtitle: 'Toronto healthcare clinic automates patient intake and document processing',
    metricLabel: 'Patient intake time',
    metricValue: '-50%',
    heroImage: '/cases/healthcare-intake-ocr.png',
    content: `
      <h2>The Challenge</h2>
      <p>Toronto Healthcare Clinic was experiencing long patient wait times due to manual intake processes. Paper forms and manual data entry were creating bottlenecks.</p>
      
      <h2>The Solution</h2>
      <p>OMGsystems digitized their patient intake:</p>
      <ul>
        <li>Digital intake forms</li>
        <li>OCR document processing</li>
        <li>Automated data validation</li>
        <li>Real-time patient updates</li>
      </ul>
      
      <h2>The Results</h2>
      <p>The clinic saw dramatic improvements:</p>
      <ul>
        <li>50% reduction in patient intake time</li>
        <li>95% accuracy in document processing</li>
        <li>40% increase in patient satisfaction</li>
        <li>60% reduction in administrative errors</li>
      </ul>
    `
  }
];

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const snap = allSnapshots.find((s) => s.slug === params.slug);
  if (!snap) {
    return {
      title: "Not Found | OMGsystems",
      description: "Case not found",
    };
  }
  return {
    title: snap.title + " | Case Snapshots | OMGsystems",
    description: snap.subtitle,
    openGraph: {
      title: snap.title,
      description: snap.subtitle,
      url: `https://www.omgsystems.com/case-snapshots/${snap.slug}`,
      images: snap.heroImage
        ? [
            {
              url: snap.heroImage,
              width: 1200,
              height: 630,
              alt: snap.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: snap.title,
      description: snap.subtitle,
      images: snap.heroImage ? [snap.heroImage] : [],
    },
  };
}

export default function SnapshotDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const snap = allSnapshots.find((s) => s.slug === params.slug);
  if (!snap) {
    notFound();
  }
  return (
    <article className="max-w-4xl mx-auto px-4 py-16">
      <h1>{snap.title}</h1>
      <p className="text-lg text-gray-600 mt-2">{snap.subtitle}</p>
      {snap.heroImage && (
        <img src={snap.heroImage} alt={snap.title} className="mt-6 rounded-lg" />
      )}
      <div className="mt-8 prose" dangerouslySetInnerHTML={{ __html: snap.content }} />
      {/* At bottom, include metric callout and link back to listing */}
      <div className="mt-12 border-l-4 border-electric-lime pl-4">
        <span className="text-xl font-bold">
          {snap.metricValue}
        </span>{' '}
        <span className="text-gray-700">{snap.metricLabel}</span>
      </div>
      <div className="mt-8">
        <a href="/case-snapshots" className="text-electric-lime underline">
          ← Back to Case Snapshots
        </a>
      </div>
    </article>
  );
}
