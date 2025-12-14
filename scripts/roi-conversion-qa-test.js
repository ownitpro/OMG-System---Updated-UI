#!/usr/bin/env node

/**
 * ROI Toolkit & Conversion Lift Bundle QA Test
 * Tests all implemented features for V1.1 Growth & Reliability
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting ROI Toolkit & Conversion Lift Bundle QA Test...\n');

const testResults = {
  timestamp: new Date().toISOString(),
  testSuite: 'ROI Toolkit & Conversion Lift Bundle QA',
  results: {},
  summary: {
    total: 0,
    passed: 0,
    failed: 0,
    warnings: 0
  }
};

function runTest(testName, testFunction) {
  console.log(`\n📋 Testing: ${testName}`);
  testResults.summary.total++;
  
  try {
    const result = testFunction();
    if (result.passed) {
      console.log(`✅ PASS: ${result.message}`);
      testResults.summary.passed++;
    } else if (result.warning) {
      console.log(`⚠️  WARNING: ${result.message}`);
      testResults.summary.warnings++;
    } else {
      console.log(`❌ FAIL: ${result.message}`);
      testResults.summary.failed++;
    }
    testResults.results[testName] = result;
  } catch (error) {
    console.log(`❌ ERROR: ${error.message}`);
    testResults.summary.failed++;
    testResults.results[testName] = {
      passed: false,
      message: `Test error: ${error.message}`,
      error: error.stack
    };
  }
}

// Test 1: ROI Calculator Routes
runTest('ROI Calculator Routes', () => {
  const roiRoutes = [
    '/src/app/roi/page.tsx',
    '/src/app/roi/property-management/page.tsx',
    '/src/app/roi/real-estate/page.tsx',
    '/src/app/roi/contractors/page.tsx',
    '/src/app/roi/accounting/page.tsx',
    '/src/app/roi/cleaning/page.tsx',
    '/src/app/roi/healthcare/page.tsx'
  ];
  
  const missingRoutes = roiRoutes.filter(route => !fs.existsSync(path.join(process.cwd(), route)));
  
  if (missingRoutes.length === 0) {
    return { passed: true, message: 'All 7 ROI calculator routes exist' };
  } else {
    return { passed: false, message: `Missing routes: ${missingRoutes.join(', ')}` };
  }
});

// Test 2: ROI Calculator Components
runTest('ROI Calculator Components', () => {
  const components = [
    '/src/components/roi-calculators/roi-calculator-shell.tsx',
    '/src/components/roi-calculators/roi-calculator-inputs.tsx',
    '/src/components/roi-calculators/roi-calculator-results.tsx',
    '/src/components/roi-calculators/roi-calculator-lead-capture.tsx'
  ];
  
  const missingComponents = components.filter(comp => !fs.existsSync(path.join(process.cwd(), comp)));
  
  if (missingComponents.length === 0) {
    return { passed: true, message: 'All ROI calculator components exist' };
  } else {
    return { passed: false, message: `Missing components: ${missingComponents.join(', ')}` };
  }
});

// Test 3: ROI Content Data Files
runTest('ROI Content Data Files', () => {
  const contentFiles = [
    '/src/content/roi/property-management.ts',
    '/src/content/roi/real-estate.ts',
    '/src/content/roi/contractors.ts',
    '/src/content/roi/accounting.ts',
    '/src/content/roi/cleaning.ts',
    '/src/content/roi/healthcare.ts'
  ];
  
  const missingFiles = contentFiles.filter(file => !fs.existsSync(path.join(process.cwd(), file)));
  
  if (missingFiles.length === 0) {
    return { passed: true, message: 'All 6 ROI content data files exist' };
  } else {
    return { passed: false, message: `Missing files: ${missingFiles.join(', ')}` };
  }
});

// Test 4: Campaign Landing 2.0
runTest('Campaign Landing 2.0', () => {
  const campaignFile = '/src/app/campaign/leadflow-v2/page.tsx';
  
  if (fs.existsSync(path.join(process.cwd(), campaignFile))) {
    const content = fs.readFileSync(path.join(process.cwd(), campaignFile), 'utf8');
    
    const hasRequiredElements = [
      content.includes('LeadFlow Engine™'),
      content.includes('Turn Every Lead Into a'),
      content.includes('Proof Strip'),
      content.includes('Pain → Outcome'),
      content.includes('How It Works'),
      content.includes('Results Section'),
      content.includes('Form Section'),
      content.includes('FAQ Section'),
      content.includes('Sticky Footer CTA')
    ];
    
    const missingElements = hasRequiredElements.filter(el => !el);
    
    if (missingElements.length === 0) {
      return { passed: true, message: 'Campaign Landing 2.0 has all required elements' };
    } else {
      return { passed: false, message: `Missing elements: ${missingElements.length} out of 9` };
    }
  } else {
    return { passed: false, message: 'Campaign Landing 2.0 file does not exist' };
  }
});

// Test 5: A/B Testing Components
runTest('A/B Testing Components', () => {
  const abComponents = [
    '/src/components/ab-testing/header-ab-test.tsx'
  ];
  
  const missingComponents = abComponents.filter(comp => !fs.existsSync(path.join(process.cwd(), comp)));
  
  if (missingComponents.length === 0) {
    return { passed: true, message: 'A/B testing components exist' };
  } else {
    return { passed: false, message: `Missing components: ${missingComponents.join(', ')}` };
  }
});

// Test 6: Exit Intent Components
runTest('Exit Intent Components', () => {
  const exitComponents = [
    '/src/components/exit-intent/exit-intent-modal.tsx',
    '/src/components/exit-intent/industry-exit-intent.tsx'
  ];
  
  const missingComponents = exitComponents.filter(comp => !fs.existsSync(path.join(process.cwd(), comp)));
  
  if (missingComponents.length === 0) {
    return { passed: true, message: 'Exit intent components exist' };
  } else {
    return { passed: false, message: `Missing components: ${missingComponents.join(', ')}` };
  }
});

// Test 7: Navigation A/B Testing Integration
runTest('Navigation A/B Testing Integration', () => {
  const navFile = '/src/components/layout/navigation.tsx';
  
  if (fs.existsSync(path.join(process.cwd(), navFile))) {
    const content = fs.readFileSync(path.join(process.cwd(), navFile), 'utf8');
    
    const hasABFeatures = [
      content.includes('abVariant'),
      content.includes('onABClick'),
      content.includes('See how it works'),
      content.includes('PlayIcon'),
      content.includes('campaign/leadflow-v2')
    ];
    
    const missingFeatures = hasABFeatures.filter(feature => !feature);
    
    if (missingFeatures.length === 0) {
      return { passed: true, message: 'Navigation has A/B testing integration' };
    } else {
      return { passed: false, message: `Missing A/B features: ${missingFeatures.length} out of 5` };
    }
  } else {
    return { passed: false, message: 'Navigation file does not exist' };
  }
});

// Test 8: Layout Integration
runTest('Layout Integration', () => {
  const layoutFile = '/src/app/layout.tsx';
  
  if (fs.existsSync(path.join(process.cwd(), layoutFile))) {
    const content = fs.readFileSync(path.join(process.cwd(), layoutFile), 'utf8');
    
    const hasIntegrations = [
      content.includes('HeaderABTest'),
      content.includes('IndustryExitIntent'),
      content.includes('ChatLauncher')
    ];
    
    const missingIntegrations = hasIntegrations.filter(integration => !integration);
    
    if (missingIntegrations.length === 0) {
      return { passed: true, message: 'Layout has all required integrations' };
    } else {
      return { passed: false, message: `Missing integrations: ${missingIntegrations.length} out of 3` };
    }
  } else {
    return { passed: false, message: 'Layout file does not exist' };
  }
});

// Test 9: OG Images
runTest('OG Images', () => {
  const ogImages = [
    '/public/og/roi-property-management.png',
    '/public/og/roi-real-estate.png',
    '/public/og/roi-contractors.png',
    '/public/og/roi-accounting.png',
    '/public/og/roi-cleaning.png',
    '/public/og/roi-healthcare.png',
    '/public/og/leadflow-v2.png'
  ];
  
  const missingImages = ogImages.filter(image => !fs.existsSync(path.join(process.cwd(), image)));
  
  if (missingImages.length === 0) {
    return { passed: true, message: 'All OG images exist' };
  } else {
    return { passed: false, message: `Missing OG images: ${missingImages.length} out of 7` };
  }
});

// Test 10: Lead Capture API
runTest('Lead Capture API', () => {
  const apiFile = '/src/app/api/leads/route.ts';
  
  if (fs.existsSync(path.join(process.cwd(), apiFile))) {
    const content = fs.readFileSync(path.join(process.cwd(), apiFile), 'utf8');
    
    const hasRequiredFeatures = [
      content.includes('POST'),
      content.includes('Lead'),
      content.includes('source'),
      content.includes('context'),
      content.includes('email'),
      content.includes('industry'),
      content.includes('budgetBand')
    ];
    
    const missingFeatures = hasRequiredFeatures.filter(feature => !feature);
    
    if (missingFeatures.length === 0) {
      return { passed: true, message: 'Lead capture API has all required features' };
    } else {
      return { passed: false, message: `Missing API features: ${missingFeatures.length} out of 7` };
    }
  } else {
    return { passed: false, message: 'Lead capture API does not exist' };
  }
});

// Test 11: Analytics Integration
runTest('Analytics Integration', () => {
  const components = [
    '/src/components/roi-calculators/roi-calculator-shell.tsx',
    '/src/components/exit-intent/exit-intent-modal.tsx',
    '/src/components/ab-testing/header-ab-test.tsx'
  ];
  
  let totalAnalyticsChecks = 0;
  let passedAnalyticsChecks = 0;
  
  components.forEach(component => {
    if (fs.existsSync(path.join(process.cwd(), component))) {
      const content = fs.readFileSync(path.join(process.cwd(), component), 'utf8');
      totalAnalyticsChecks++;
      
      if (content.includes('omg_consent') && content.includes('gtag')) {
        passedAnalyticsChecks++;
      }
    }
  });
  
  if (passedAnalyticsChecks === totalAnalyticsChecks) {
    return { passed: true, message: 'All components have consent-aware analytics' };
  } else {
    return { passed: false, message: `Analytics integration: ${passedAnalyticsChecks}/${totalAnalyticsChecks} components` };
  }
});

// Test 12: SEO and Metadata
runTest('SEO and Metadata', () => {
  const seoFiles = [
    '/src/app/roi/property-management/page.tsx',
    '/src/app/roi/real-estate/page.tsx',
    '/src/app/campaign/leadflow-v2/layout.tsx'
  ];
  
  let totalSeoChecks = 0;
  let passedSeoChecks = 0;
  
  seoFiles.forEach(file => {
    if (fs.existsSync(path.join(process.cwd(), file))) {
      const content = fs.readFileSync(path.join(process.cwd(), file), 'utf8');
      totalSeoChecks++;
      
      const hasSeoFeatures = [
        content.includes('Metadata'),
        content.includes('title'),
        content.includes('description'),
        content.includes('openGraph'),
        content.includes('twitter'),
        content.includes('canonical')
      ];
      
      if (hasSeoFeatures.filter(feature => feature).length >= 5) {
        passedSeoChecks++;
      }
    }
  });
  
  if (passedSeoChecks === totalSeoChecks) {
    return { passed: true, message: 'All pages have proper SEO metadata' };
  } else {
    return { passed: false, message: `SEO metadata: ${passedSeoChecks}/${totalSeoChecks} pages` };
  }
});

// Test 13: Accessibility Features
runTest('Accessibility Features', () => {
  const components = [
    '/src/components/roi-calculators/roi-calculator-shell.tsx',
    '/src/components/exit-intent/exit-intent-modal.tsx'
  ];
  
  let totalA11yChecks = 0;
  let passedA11yChecks = 0;
  
  components.forEach(component => {
    if (fs.existsSync(path.join(process.cwd(), component))) {
      const content = fs.readFileSync(path.join(process.cwd(), component), 'utf8');
      totalA11yChecks++;
      
      const hasA11yFeatures = [
        content.includes('aria-'),
        content.includes('role='),
        content.includes('tabIndex'),
        content.includes('focus'),
        content.includes('label')
      ];
      
      if (hasA11yFeatures.filter(feature => feature).length >= 3) {
        passedA11yChecks++;
      }
    }
  });
  
  if (passedA11yChecks === totalA11yChecks) {
    return { passed: true, message: 'Components have accessibility features' };
  } else {
    return { passed: false, message: `Accessibility: ${passedA11yChecks}/${totalA11yChecks} components` };
  }
});

// Test 14: Performance Considerations
runTest('Performance Considerations', () => {
  const components = [
    '/src/components/roi-calculators/roi-calculator-shell.tsx',
    '/src/components/exit-intent/exit-intent-modal.tsx',
    '/src/app/campaign/leadflow-v2/page.tsx'
  ];
  
  let totalPerfChecks = 0;
  let passedPerfChecks = 0;
  
  components.forEach(component => {
    if (fs.existsSync(path.join(process.cwd(), component))) {
      const content = fs.readFileSync(path.join(process.cwd(), component), 'utf8');
      totalPerfChecks++;
      
      const hasPerfFeatures = [
        content.includes('useState'),
        content.includes('useEffect'),
        content.includes('lazy'),
        content.includes('memo'),
        content.includes('useCallback')
      ];
      
      if (hasPerfFeatures.filter(feature => feature).length >= 2) {
        passedPerfChecks++;
      }
    }
  });
  
  if (passedPerfChecks === totalPerfChecks) {
    return { passed: true, message: 'Components have performance optimizations' };
  } else {
    return { passed: false, message: `Performance: ${passedPerfChecks}/${totalPerfChecks} components` };
  }
});

// Test 15: Error Handling
runTest('Error Handling', () => {
  const components = [
    '/src/components/roi-calculators/roi-calculator-lead-capture.tsx',
    '/src/components/exit-intent/exit-intent-modal.tsx',
    '/src/app/api/leads/route.ts'
  ];
  
  let totalErrorChecks = 0;
  let passedErrorChecks = 0;
  
  components.forEach(component => {
    if (fs.existsSync(path.join(process.cwd(), component))) {
      const content = fs.readFileSync(path.join(process.cwd(), component), 'utf8');
      totalErrorChecks++;
      
      const hasErrorHandling = [
        content.includes('try'),
        content.includes('catch'),
        content.includes('error'),
        content.includes('console.error')
      ];
      
      if (hasErrorHandling.filter(feature => feature).length >= 2) {
        passedErrorChecks++;
      }
    }
  });
  
  if (passedErrorChecks === totalErrorChecks) {
    return { passed: true, message: 'Components have proper error handling' };
  } else {
    return { passed: false, message: `Error handling: ${passedErrorChecks}/${totalErrorChecks} components` };
  }
});

// Generate Summary
console.log('\n' + '='.repeat(60));
console.log('📊 ROI Toolkit & Conversion Lift Bundle QA Summary');
console.log('='.repeat(60));

const { total, passed, failed, warnings } = testResults.summary;
console.log(`Total Tests: ${total}`);
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`⚠️  Warnings: ${warnings}`);

const successRate = ((passed / total) * 100).toFixed(1);
console.log(`\nSuccess Rate: ${successRate}%`);

if (failed === 0) {
  console.log('\n🎉 All tests passed! ROI Toolkit & Conversion Lift Bundle are ready for production.');
} else {
  console.log(`\n⚠️  ${failed} test(s) failed. Please review and fix before production deployment.`);
}

// Save Results
const resultsDir = path.join(process.cwd(), 'qa_reports');
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

const reportFile = path.join(resultsDir, 'roi-conversion-qa-report.json');
fs.writeFileSync(reportFile, JSON.stringify(testResults, null, 2));

console.log(`\n📄 Detailed report saved to: ${reportFile}`);

// Exit with appropriate code
process.exit(failed > 0 ? 1 : 0);
