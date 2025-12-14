#!/usr/bin/env node

/**
 * Knowledge Base Builder Script
 * 
 * This script builds the chatbot knowledge base by ingesting all public content.
 * It should be run after content updates or during deployment.
 */

// Import the buildKnowledgeIndex function
// Note: This is a TypeScript file, so we need to use dynamic import
async function importBuildFunction() {
  const { buildKnowledgeIndex } = await import('../src/lib/chatbot/ingestKnowledge.ts');
  return buildKnowledgeIndex;
}

async function main() {
  console.log('🚀 Starting knowledge base build...');
  
  try {
    const buildKnowledgeIndex = await importBuildFunction();
    await buildKnowledgeIndex();
    console.log('✅ Knowledge base build completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Knowledge base build failed:', error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

main();
