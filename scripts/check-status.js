#!/usr/bin/env node

// OMGsystems Status Check Script
const { PrismaClient } = require('../src/generated/prisma');
const http = require('http');

const prisma = new PrismaClient();

async function checkDatabase() {
  console.log('🔍 Checking Database Status...');
  try {
    await prisma.$connect();
    const userCount = await prisma.user.count();
    const orgCount = await prisma.organization.count();
    const projectCount = await prisma.project.count();
    
    console.log('✅ Database: CONNECTED');
    console.log(`   Users: ${userCount}`);
    console.log(`   Organizations: ${orgCount}`);
    console.log(`   Projects: ${projectCount}`);
    return true;
  } catch (error) {
    console.log('❌ Database: DISCONNECTED');
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

async function checkServer() {
  console.log('\n🌐 Checking Server Status...');
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET',
      timeout: 5000
    }, (res) => {
      console.log('✅ Server: RUNNING');
      console.log(`   Status: ${res.statusCode}`);
      resolve(true);
    });

    req.on('error', (error) => {
      console.log('❌ Server: NOT RUNNING');
      console.log(`   Error: ${error.message}`);
      resolve(false);
    });

    req.on('timeout', () => {
      console.log('❌ Server: TIMEOUT');
      resolve(false);
    });

    req.end();
  });
}

async function checkDocker() {
  console.log('\n🐳 Checking Docker Status...');
  const { exec } = require('child_process');
  
  return new Promise((resolve) => {
    exec('docker ps --filter name=omgsystems-postgres --format "{{.Status}}"', (error, stdout, stderr) => {
      if (error) {
        console.log('❌ Docker: NOT RUNNING');
        console.log(`   Error: ${error.message}`);
        resolve(false);
      } else if (stdout.includes('Up')) {
        console.log('✅ Docker: RUNNING');
        console.log(`   PostgreSQL: ${stdout.trim()}`);
        resolve(true);
      } else {
        console.log('❌ Docker: CONTAINER NOT FOUND');
        resolve(false);
      }
    });
  });
}

async function generateReport() {
  console.log('🚀 OMGsystems Status Report\n');
  
  const dbStatus = await checkDatabase();
  const serverStatus = await checkServer();
  const dockerStatus = await checkDocker();
  
  console.log('\n📋 System Status Summary:');
  console.log(`   Database: ${dbStatus ? '✅ OPERATIONAL' : '❌ ISSUES'}`);
  console.log(`   Server: ${serverStatus ? '✅ RUNNING' : '❌ NOT RUNNING'}`);
  console.log(`   Docker: ${dockerStatus ? '✅ RUNNING' : '❌ ISSUES'}`);
  
  console.log('\n🎯 Next Actions:');
  if (!serverStatus) {
    console.log('   1. Start development server: npm run dev');
  }
  if (!dbStatus) {
    console.log('   2. Check database connection');
  }
  if (!dockerStatus) {
    console.log('   3. Start Docker and PostgreSQL container');
  }
  
  if (dbStatus && serverStatus && dockerStatus) {
    console.log('   🎉 System is fully operational!');
    console.log('   💡 Run API tests: node scripts/test-api.js');
    console.log('   💡 Open Prisma Studio: npx prisma studio');
  }
  
  await prisma.$disconnect();
}

generateReport().catch(console.error);
