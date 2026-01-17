"use client";

import React from 'react';
import SolutionsLeadForm from './SolutionsLeadForm';
import MarketingLeadForm from './MarketingLeadForm';
import IndustriesLeadForm from './IndustriesLeadForm';
import ConfigurableLeadForm, { COLOR_SCHEMES } from './ConfigurableLeadForm';
import StickyGetStartedButton from './StickyGetStartedButton';
import MobileFormDrawer from './MobileFormDrawer';

interface LeadFormWrapperProps {
  variant: 'solutions' | 'marketing' | 'industries';
  colorScheme?: keyof typeof COLOR_SCHEMES;
  customGradient?: string;
  customShadow?: string;
}

export default function LeadFormWrapper({
  variant,
  colorScheme,
  customGradient,
  customShadow
}: LeadFormWrapperProps) {
  const renderForm = () => {
    // If a custom color scheme is provided, use ConfigurableLeadForm
    if (colorScheme) {
      return (
        <ConfigurableLeadForm
          formType={variant}
          colorScheme={COLOR_SCHEMES[colorScheme]}
        />
      );
    }

    // Otherwise use the default forms
    switch (variant) {
      case 'solutions':
        return <SolutionsLeadForm />;
      case 'marketing':
        return <MarketingLeadForm />;
      case 'industries':
        return <IndustriesLeadForm />;
      default:
        return <SolutionsLeadForm />;
    }
  };

  return (
    <>
      {/* Lead Form Section */}
      {renderForm()}

      {/* Sticky Button (Desktop) */}
      <StickyGetStartedButton
        variant={variant}
        customGradient={customGradient}
        customShadow={customShadow}
      />

      {/* Mobile Drawer */}
      <MobileFormDrawer variant={variant} />
    </>
  );
}
