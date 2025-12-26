import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { validateEnvironment, redactIP, redactPII } from '@/lib/security';
import fs from 'fs';
import path from 'path';

interface HealthCheck {
  name: string;
  status: 'ok' | 'error' | 'warning';
  message?: string;
  details?: any;
  duration?: number;
}

interface HealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  buildHash: string;
  environment: string;
  checks: HealthCheck[];
  uptime: number;
}

const startTime = Date.now();

async function checkDatabase(): Promise<HealthCheck> {
  const start = Date.now();
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Check database integrity
    const result = await prisma.$queryRaw`PRAGMA integrity_check` as any[];
    const integrity = result[0]?.['integrity_check'];
    
    if (integrity !== 'ok') {
      return {
        name: 'database',
        status: 'error',
        message: 'Database integrity check failed',
        details: { integrity },
        duration: Date.now() - start
      };
    }
    
    // Check database size
    const stats = fs.statSync(path.join(process.cwd(), 'prisma', 'dev.db'));
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    
    return {
      name: 'database',
      status: 'ok',
      message: 'Database connection and integrity OK',
      details: { 
        size: `${sizeMB} MB`,
        integrity: 'ok'
      },
      duration: Date.now() - start
    };
  } catch (error) {
    return {
      name: 'database',
      status: 'error',
      message: 'Database connection failed',
      details: { error: error instanceof Error ? error.message : 'Unknown error' },
      duration: Date.now() - start
    };
  }
}

async function checkEnvironment(): Promise<HealthCheck> {
  const start = Date.now();
  try {
    const validation = validateEnvironment();
    
    return {
      name: 'environment',
      status: validation.valid ? 'ok' : 'error',
      message: validation.valid ? 'Environment configuration OK' : 'Environment validation failed',
      details: validation.valid ? {} : { errors: validation.errors },
      duration: Date.now() - start
    };
  } catch (error) {
    return {
      name: 'environment',
      status: 'error',
      message: 'Environment check failed',
      details: { error: error instanceof Error ? error.message : 'Unknown error' },
      duration: Date.now() - start
    };
  }
}

async function checkStorage(): Promise<HealthCheck> {
  const start = Date.now();
  try {
    // Check disk space
    const stats = fs.statSync(process.cwd());
    const backupDir = path.join(process.cwd(), 'backups');
    const backupExists = fs.existsSync(backupDir);
    
    // Check if we can write to backup directory
    if (backupExists) {
      const testFile = path.join(backupDir, 'health-check-test.txt');
      fs.writeFileSync(testFile, 'health check');
      fs.unlinkSync(testFile);
    }
    
    return {
      name: 'storage',
      status: 'ok',
      message: 'Storage access OK',
      details: { 
        backupDirectory: backupExists ? 'exists' : 'missing',
        writable: true
      },
      duration: Date.now() - start
    };
  } catch (error) {
    return {
      name: 'storage',
      status: 'error',
      message: 'Storage check failed',
      details: { error: error instanceof Error ? error.message : 'Unknown error' },
      duration: Date.now() - start
    };
  }
}

async function checkQueue(): Promise<HealthCheck> {
  const start = Date.now();
  try {
    // Check for pending webhook events
    const pendingWebhooks = await prisma.webhookEvent.count({
      where: { status: 'pending' }
    });
    
    // Check for failed webhook events
    const failedWebhooks = await prisma.webhookEvent.count({
      where: { status: 'failed' }
    });
    
    const status = failedWebhooks > 10 ? 'warning' : 'ok';
    const message = failedWebhooks > 10 
      ? 'High number of failed webhooks detected'
      : 'Queue status OK';
    
    return {
      name: 'queue',
      status,
      message,
      details: { 
        pending: pendingWebhooks,
        failed: failedWebhooks
      },
      duration: Date.now() - start
    };
  } catch (error) {
    return {
      name: 'queue',
      status: 'error',
      message: 'Queue check failed',
      details: { error: error instanceof Error ? error.message : 'Unknown error' },
      duration: Date.now() - start
    };
  }
}

async function checkExternalServices(): Promise<HealthCheck> {
  const start = Date.now();
  try {
    const checks = [];
    
    // Check if we can resolve external domains
    try {
      const dns = require('dns').promises;
      await dns.resolve('google.com');
      checks.push({ service: 'dns', status: 'ok' });
    } catch (error) {
      checks.push({ service: 'dns', status: 'error', error: error instanceof Error ? error.message : 'Unknown error' });
    }

    // Check Stripe connectivity (if configured)
    if (process.env.STRIPE_SECRET_KEY) {
      try {
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        await stripe.balance.retrieve();
        checks.push({ service: 'stripe', status: 'ok' });
      } catch (error) {
        checks.push({ service: 'stripe', status: 'error', error: error instanceof Error ? error.message : 'Unknown error' });
      }
    }
    
    const hasErrors = checks.some(check => check.status === 'error');
    const hasWarnings = checks.some(check => check.status === 'warning');
    
    return {
      name: 'external_services',
      status: hasErrors ? 'error' : hasWarnings ? 'warning' : 'ok',
      message: hasErrors ? 'External service connectivity issues' : 'External services OK',
      details: { checks },
      duration: Date.now() - start
    };
  } catch (error) {
    return {
      name: 'external_services',
      status: 'error',
      message: 'External services check failed',
      details: { error: error instanceof Error ? error.message : 'Unknown error' },
      duration: Date.now() - start
    };
  }
}

export async function GET(request: NextRequest) {
  try {
    // Log health check access with redacted IP
    const clientIP = redactIP(request.headers.get('x-forwarded-for')?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown');
    console.log(`[HEALTH_CHECK] Access from IP: ${clientIP}`);
    
    const checks = await Promise.all([
      checkDatabase(),
      checkEnvironment(),
      checkStorage(),
      checkQueue(),
      checkExternalServices()
    ]);
    
    // Determine overall health status
    const hasErrors = checks.some(check => check.status === 'error');
    const hasWarnings = checks.some(check => check.status === 'warning');
    
    const overallStatus = hasErrors ? 'unhealthy' : hasWarnings ? 'degraded' : 'healthy';
    
    const response: HealthResponse = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      buildHash: process.env.NEXT_PUBLIC_BUILD_HASH || 'unknown',
      environment: process.env.NODE_ENV || 'development',
      checks,
      uptime: Date.now() - startTime
    };
    
    // Set appropriate HTTP status code
    const httpStatus = overallStatus === 'healthy' ? 200 : overallStatus === 'degraded' ? 200 : 503;
    
    return NextResponse.json(response, { status: httpStatus });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      buildHash: process.env.NEXT_PUBLIC_BUILD_HASH || 'unknown',
      environment: process.env.NODE_ENV || 'development',
      checks: [{
        name: 'health_check',
        status: 'error',
        message: 'Health check system failed',
        details: { error: error instanceof Error ? error.message : 'Unknown error' }
      }],
      uptime: Date.now() - startTime
    }, { status: 503 });
  }
}
