#!/usr/bin/env node

/**
 * Content Ingestion Runner
 * 
 * This script runs the knowledge base ingestion process.
 * It can be called from CI/CD pipelines or manually.
 */

const { execSync } = require('child_process');
const path = require('path');

async function runIngestion() {
  console.log('🔄 Running content ingestion...');
  
  try {
    // Run the knowledge base builder
    const scriptPath = path.join(__dirname, 'buildKnowledgeBase.js');
    execSync(`node ${scriptPath}`, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log('✅ Content ingestion completed successfully!');
  } catch (error) {
    console.error('❌ Content ingestion failed:', error.message);
    process.exit(1);
  }
}

runIngestion();
