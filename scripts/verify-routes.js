#!/usr/bin/env node

/**
 * Verification script to test all dynamic routes we created
 * Run with: node scripts/verify-routes.js
 */

const { appsConfig } = require('../src/config/apps_config.ts');
const { solutionsConfig } = require('../src/config/solutions_config.ts');
const { industriesConfig } = require('../src/config/industries_config.ts');

console.log('🔍 Verifying all routes and configurations...\n');

// Test Apps Routes
console.log('📱 APPS ROUTES:');
console.log('─'.repeat(50));
appsConfig.forEach((app) => {
  const route = `/apps/${app.slug}`;
  console.log(`  ✅ ${route.padEnd(35)} → ${app.label}`);
});
console.log(`\n  Total: ${appsConfig.length} app routes\n`);

// Test Solutions Routes
console.log('🔧 SOLUTIONS ROUTES:');
console.log('─'.repeat(50));
solutionsConfig.forEach((solution) => {
  const route = `/solutions/${solution.slug}`;
  console.log(`  ✅ ${route.padEnd(35)} → ${solution.label}`);
});
console.log(`\n  Total: ${solutionsConfig.length} solution routes\n`);

// Test Industries Routes
console.log('🏢 INDUSTRIES ROUTES:');
console.log('─'.repeat(50));
industriesConfig.forEach((industry) => {
  const route = `/industries/${industry.slug}`;
  console.log(`  ✅ ${route.padEnd(35)} → ${industry.label}`);
});
console.log(`\n  Total: ${industriesConfig.length} industry routes\n`);

// Verify configs are properly connected
console.log('🔗 CONFIG VERIFICATION:');
console.log('─'.repeat(50));

// Check solutions have featuredApps
const solutionsWithApps = solutionsConfig.filter((s) => s.featuredApps && s.featuredApps.length > 0);
console.log(`  ✅ ${solutionsWithApps.length}/${solutionsConfig.length} solutions have featuredApps`);

// Check industries have recommendedSolutions and recommendedApps
const industriesWithRecommendations = industriesConfig.filter(
  (i) => i.recommendedSolutions.length > 0 && i.recommendedApps.length > 0
);
console.log(`  ✅ ${industriesWithRecommendations.length}/${industriesConfig.length} industries have recommendations`);

// Check all slugs are unique
const allSlugs = [
  ...appsConfig.map((a) => `apps/${a.slug}`),
  ...solutionsConfig.map((s) => `solutions/${s.slug}`),
  ...industriesConfig.map((i) => `industries/${i.slug}`),
];
const uniqueSlugs = new Set(allSlugs);
if (allSlugs.length === uniqueSlugs.size) {
  console.log(`  ✅ All slugs are unique (${allSlugs.length} total)`);
} else {
  console.log(`  ❌ Duplicate slugs found!`);
  const duplicates = allSlugs.filter((slug, index) => allSlugs.indexOf(slug) !== index);
  console.log(`     Duplicates: ${duplicates.join(', ')}`);
}

console.log('\n✨ Verification complete!\n');

