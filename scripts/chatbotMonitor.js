#!/usr/bin/env node

/**
 * Chatbot Monitoring Script
 * 
 * This script monitors the chatbot system health and performance:
 * - Knowledge base status
 * - API endpoint health
 * - Performance metrics
 * - Error rates
 * - Usage statistics
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  knowledgeBasePath: path.join(process.cwd(), 'data', 'enhanced-chatbot-index.json'),
  apiEndpoint: 'http://localhost:3000/api/chatbot/enhanced',
  healthCheckInterval: 30000, // 30 seconds
  maxRetries: 3,
  alertThresholds: {
    responseTime: 5000, // 5 seconds
    errorRate: 0.1, // 10%
    knowledgeBaseAge: 24 * 60 * 60 * 1000 // 24 hours
  }
};

// Monitoring data
const monitoringData = {
  startTime: new Date(),
  checks: [],
  errors: [],
  performance: {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    averageResponseTime: 0,
    responseTimes: []
  }
};

// Utility functions
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function calculateAverageResponseTime() {
  if (monitoringData.performance.responseTimes.length === 0) return 0;
  const sum = monitoringData.performance.responseTimes.reduce((a, b) => a + b, 0);
  return sum / monitoringData.performance.responseTimes.length;
}

function calculateErrorRate() {
  const total = monitoringData.performance.totalRequests;
  if (total === 0) return 0;
  return monitoringData.performance.failedRequests / total;
}

// Knowledge base monitoring
function checkKnowledgeBase() {
  try {
    if (!fs.existsSync(CONFIG.knowledgeBasePath)) {
      return {
        status: 'error',
        message: 'Knowledge base file not found',
        details: { path: CONFIG.knowledgeBasePath }
      };
    }

    const stats = fs.statSync(CONFIG.knowledgeBasePath);
    const age = Date.now() - stats.mtime.getTime();
    
    if (age > CONFIG.alertThresholds.knowledgeBaseAge) {
      return {
        status: 'warning',
        message: 'Knowledge base is outdated',
        details: { 
          lastModified: stats.mtime.toISOString(),
          ageHours: Math.round(age / (1000 * 60 * 60))
        }
      };
    }

    const data = JSON.parse(fs.readFileSync(CONFIG.knowledgeBasePath, 'utf-8'));
    const chunkCount = Array.isArray(data) ? data.length : 0;

    return {
      status: 'success',
      message: 'Knowledge base is healthy',
      details: {
        chunkCount,
        lastModified: stats.mtime.toISOString(),
        fileSize: stats.size
      }
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Failed to check knowledge base',
      details: { error: error.message }
    };
  }
}

// API health check
async function checkAPIHealth() {
  try {
    const startTime = Date.now();
    const response = await fetch(CONFIG.apiEndpoint, { method: 'GET' });
    const responseTime = Date.now() - startTime;

    monitoringData.performance.totalRequests++;
    monitoringData.performance.responseTimes.push(responseTime);

    if (response.ok) {
      monitoringData.performance.successfulRequests++;
      return {
        status: 'success',
        message: 'API is healthy',
        details: {
          responseTime,
          statusCode: response.status
        }
      };
    } else {
      monitoringData.performance.failedRequests++;
      return {
        status: 'error',
        message: 'API returned error',
        details: {
          responseTime,
          statusCode: response.status
        }
      };
    }
  } catch (error) {
    monitoringData.performance.failedRequests++;
    monitoringData.performance.totalRequests++;
    
    return {
      status: 'error',
      message: 'API health check failed',
      details: { error: error.message }
    };
  }
}

// Performance monitoring
function checkPerformance() {
  const errorRate = calculateErrorRate();
  const avgResponseTime = calculateAverageResponseTime();

  const issues = [];
  
  if (errorRate > CONFIG.alertThresholds.errorRate) {
    issues.push(`High error rate: ${(errorRate * 100).toFixed(1)}%`);
  }
  
  if (avgResponseTime > CONFIG.alertThresholds.responseTime) {
    issues.push(`Slow response time: ${avgResponseTime.toFixed(0)}ms`);
  }

  return {
    status: issues.length === 0 ? 'success' : 'warning',
    message: issues.length === 0 ? 'Performance is good' : 'Performance issues detected',
    details: {
      errorRate: (errorRate * 100).toFixed(1) + '%',
      averageResponseTime: avgResponseTime.toFixed(0) + 'ms',
      totalRequests: monitoringData.performance.totalRequests,
      issues
    }
  };
}

// System resource monitoring
function checkSystemResources() {
  try {
    const memUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    
    return {
      status: 'success',
      message: 'System resources are normal',
      details: {
        memory: {
          rss: Math.round(memUsage.rss / 1024 / 1024) + 'MB',
          heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + 'MB',
          heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + 'MB'
        },
        uptime: Math.round(process.uptime()) + 's'
      }
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Failed to check system resources',
      details: { error: error.message }
    };
  }
}

// Run all health checks
async function runHealthChecks() {
  const timestamp = new Date();
  const checks = {
    timestamp: timestamp.toISOString(),
    knowledgeBase: checkKnowledgeBase(),
    apiHealth: await checkAPIHealth(),
    performance: checkPerformance(),
    systemResources: checkSystemResources()
  };

  monitoringData.checks.push(checks);

  // Log results
  log('=== Health Check Results ===');
  log(`Knowledge Base: ${checks.knowledgeBase.status} - ${checks.knowledgeBase.message}`);
  log(`API Health: ${checks.apiHealth.status} - ${checks.apiHealth.message}`);
  log(`Performance: ${checks.performance.status} - ${checks.performance.message}`);
  log(`System Resources: ${checks.systemResources.status} - ${checks.systemResources.message}`);

  // Check for alerts
  const alerts = [];
  if (checks.knowledgeBase.status === 'error') alerts.push('Knowledge base error');
  if (checks.apiHealth.status === 'error') alerts.push('API health error');
  if (checks.performance.status === 'warning') alerts.push('Performance warning');
  if (checks.systemResources.status === 'error') alerts.push('System resource error');

  if (alerts.length > 0) {
    log(`🚨 ALERTS: ${alerts.join(', ')}`, 'warning');
  }

  return checks;
}

// Generate monitoring report
function generateReport() {
  const uptime = Date.now() - monitoringData.startTime.getTime();
  const uptimeHours = Math.round(uptime / (1000 * 60 * 60));
  
  const report = {
    summary: {
      startTime: monitoringData.startTime.toISOString(),
      uptime: uptimeHours + ' hours',
      totalChecks: monitoringData.checks.length,
      totalErrors: monitoringData.errors.length
    },
    performance: {
      ...monitoringData.performance,
      averageResponseTime: calculateAverageResponseTime(),
      errorRate: calculateErrorRate()
    },
    recentChecks: monitoringData.checks.slice(-5), // Last 5 checks
    alerts: monitoringData.errors.slice(-10) // Last 10 errors
  };

  return report;
}

// Save monitoring data
function saveMonitoringData() {
  const report = generateReport();
  const reportPath = path.join(process.cwd(), 'data', 'chatbot-monitoring-report.json');
  
  try {
    const dataDir = path.dirname(reportPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    log(`📊 Monitoring report saved to: ${reportPath}`);
  } catch (error) {
    log(`Failed to save monitoring report: ${error.message}`, 'error');
  }
}

// Main monitoring loop
async function startMonitoring() {
  log('🚀 Starting chatbot monitoring...');
  log(`📊 Monitoring configuration:`, 'info');
  log(`  - Knowledge base path: ${CONFIG.knowledgeBasePath}`);
  log(`  - API endpoint: ${CONFIG.apiEndpoint}`);
  log(`  - Check interval: ${CONFIG.healthCheckInterval / 1000}s`);
  
  // Initial health check
  await runHealthChecks();
  
  // Set up periodic monitoring
  const monitoringInterval = setInterval(async () => {
    try {
      await runHealthChecks();
      
      // Save monitoring data every 10 checks
      if (monitoringData.checks.length % 10 === 0) {
        saveMonitoringData();
      }
    } catch (error) {
      log(`Monitoring error: ${error.message}`, 'error');
      monitoringData.errors.push({
        timestamp: new Date().toISOString(),
        error: error.message
      });
    }
  }, CONFIG.healthCheckInterval);

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    log('🛑 Shutting down monitoring...');
    clearInterval(monitoringInterval);
    saveMonitoringData();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    log('🛑 Shutting down monitoring...');
    clearInterval(monitoringInterval);
    saveMonitoringData();
    process.exit(0);
  });
}

// Run single check if requested
if (process.argv.includes('--single-check')) {
  runHealthChecks().then(() => {
    saveMonitoringData();
    process.exit(0);
  }).catch(error => {
    log(`Single check failed: ${error.message}`, 'error');
    process.exit(1);
  });
} else {
  startMonitoring();
}
