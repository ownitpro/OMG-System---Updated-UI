import React from 'react';
import { metadata } from './metadata';
import { CTASection } from '@/components/common/cta-section';
import SnapshotCard from '@/components/cases/SnapshotCard';

export { metadata };

const snapshots = [
  {
    slug: 'property-management-3-day-turnaround',
    industry: 'Property Management',
    title: 'From Spreadsheet Chaos to a Predictable 3-Day Turnaround',
    subtitle:
      'How a Durham property management firm automated owner statements and cut ticket resolution time by 57%',
    metricLabel: 'Average ticket close time',
    metricValue: '-57%',
  },
  {
    slug: 'contractor-80-percent-quote-time',
    industry: 'Contractors',
    title: 'How a GTA Renovation Firm Cut Quote Time by 80%',
    subtitle:
      'From 3-day quote delays to 45-minute turnarounds with automated lead scoring and proposal generation',
    metricLabel: 'Quote turnaround time',
    metricValue: '-80%',
  },
  {
    slug: 'real-estate-self-booking-showings',
    industry: 'Real Estate',
    title: 'Never Miss a Showing Again: Self-Booking + SMS Reminders',
    subtitle:
      'Toronto real estate agent eliminates scheduling conflicts and increases showing attendance by 40%',
    metricLabel: 'Showing attendance',
    metricValue: '+40%',
  },
  {
    slug: 'accounting-document-automation-70',
    industry: 'Accounting',
    title: 'From Chasing Documents to 70% Time Savings',
    subtitle:
      'Small CPA firm in Mississauga automates client onboarding and document collection',
    metricLabel: 'Document collection time',
    metricValue: '-70%',
  },
  {
    slug: 'cleaning-route-optimization',
    industry: 'Cleaning',
    title: 'Route Optimization + Auto-Invoicing = 50% Faster Payments',
    subtitle:
      'GTA cleaning company eliminates manual invoicing and reduces receivables by 50%',
    metricLabel: 'Payment collection time',
    metricValue: '-50%',
  },
  {
    slug: 'healthcare-intake-automation-50',
    industry: 'Healthcare',
    title: 'Digital Intake + OCR Reduces Patient Wait Times by 50%',
    subtitle:
      'Toronto healthcare clinic automates patient intake and document processing',
    metricLabel: 'Patient intake time',
    metricValue: '-50%',
  },
];

export default function CaseSnapshotsPage() {
  return (
    <main>
      <section className="case-hero py-16 text-center">
        <h1 className="text-4xl font-bold">Case Snapshots</h1>
        <p className="mt-4 text-lg">
          Real results from real businesses. See how companies across industries
          achieved remarkable growth with OMGsystems.
        </p>
        <div className="mt-8 space-x-4">
          <a href="/demo/crm" className="btn btn-primary">Get Your Free Demo</a>
          <a href="/tools/roi-calculator" className="btn btn-outline">Calculate Your ROI</a>
        </div>
      </section>

      <section className="snapshot-filters py-8 text-center">
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/case-snapshots" className="filter-pill active">All Industries</a>
          <a href="/case-snapshots?industry=property-management" className="filter-pill">Property Management</a>
          <a href="/case-snapshots?industry=contractors" className="filter-pill">Contractors</a>
          <a href="/case-snapshots?industry=real-estate" className="filter-pill">Real Estate</a>
          <a href="/case-snapshots?industry=accounting" className="filter-pill">Accounting</a>
          <a href="/case-snapshots?industry=cleaning" className="filter-pill">Cleaning</a>
          <a href="/case-snapshots?industry=healthcare" className="filter-pill">Healthcare</a>
        </div>
      </section>

      <section className="snapshot-grid py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {snapshots.map((snap) => (
            <SnapshotCard
              key={snap.slug}
              slug={snap.slug}
              industry={snap.industry}
              title={snap.title}
              subtitle={snap.subtitle}
              metricLabel={snap.metricLabel}
              metricValue={snap.metricValue}
            />
          ))}
        </div>
      </section>

      <CTASection
        title="Join Thousands of Successful Businesses"
        subtitle="10,000+ Active Users • 500+ Companies • 24/7 Support"
        primaryCta={{ label: "Start Your Free Demo", href: "/demo/crm" }}
      />

      <section className="final-cta py-16 bg-electric-lime text-white text-center">
        <h2 className="text-3xl font-bold">Ready to Write Your Success Story?</h2>
        <p className="mt-4">Join the businesses that have transformed their operations with OMGsystems.</p>
        <div className="mt-6">
          <a href="/demo/crm" className="btn btn-primary">Start Your Free Demo</a>
          <a href="/contact" className="btn btn-outline">Talk to an Expert</a>
        </div>
      </section>
    </main>
  );
}