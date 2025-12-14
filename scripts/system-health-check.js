#!/usr/bin/env node

/**
 * OMGsystems System Health Check Script
 * 
 * This script performs comprehensive system health checks including:
 * - Database integrity
 * - File system health
 * - Process monitoring
 * - Resource usage
 * - Network connectivity
 * 
 * Usage: node scripts/system-health-check.js [--verbose] [--fix]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class SystemHealthChecker {
  constructor(options = {}) {
    this.verbose = options.verbose || false;
    this.autoFix = options.fix || false;
    this.issues = [];
    this.warnings = [];
    this.projectRoot = path.resolve(__dirname, '..');
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = {
      info: '✅',
      warn: '⚠️',
      error: '❌',
      fix: '🔧'
    }[type] || 'ℹ️';

    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  async checkDatabaseHealth() {
    this.log('Checking database health...');
    
    try {
      const dbPath = path.join(this.projectRoot, 'prisma', 'dev.db');
      
      if (!fs.existsSync(dbPath)) {
        this.issues.push('Database file not found');
        return false;
      }

      // Check database integrity
      try {
        const result = execSync(`sqlite3 "${dbPath}" "PRAGMA integrity_check;"`, { encoding: 'utf8' });
        if (result.trim() !== 'ok') {
          this.issues.push(`Database integrity check failed: ${result.trim()}`);
          return false;
        }
        this.log('Database integrity check passed');
      } catch (error) {
        this.issues.push(`Database integrity check error: ${error.message}`);
        return false;
      }

      // Check database size
      const stats = fs.statSync(dbPath);
      const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
      this.log(`Database size: ${sizeMB} MB`);

      if (stats.size > 100 * 1024 * 1024) { // 100MB
        this.warnings.push(`Database is large (${sizeMB} MB). Consider archiving old data.`);
      }

      return true;
    } catch (error) {
      this.issues.push(`Database health check failed: ${error.message}`);
      return false;
    }
  }

  async checkFileSystemHealth() {
    this.log('Checking file system health...');
    
    const criticalPaths = [
      'package.json',
      'next.config.ts',
      'prisma/schema.prisma',
      '.env.local',
      'src/app/layout.tsx',
      'src/app/page.tsx'
    ];

    for (const filePath of criticalPaths) {
      const fullPath = path.join(this.projectRoot, filePath);
      if (!fs.existsSync(fullPath)) {
        this.issues.push(`Critical file missing: ${filePath}`);
      } else {
        this.log(`Found: ${filePath}`);
      }
    }

    // Check backup directory
    const backupDir = path.join(this.projectRoot, 'backups');
    if (!fs.existsSync(backupDir)) {
      this.warnings.push('Backup directory not found. Creating...');
      if (this.autoFix) {
        fs.mkdirSync(backupDir, { recursive: true });
        this.log('Created backup directory', 'fix');
      }
    }

    // Check disk space
    try {
      const result = execSync('df -h .', { encoding: 'utf8' });
      const lines = result.split('\n');
      const diskInfo = lines[1].split(/\s+/);
      const usedPercent = parseInt(diskInfo[4]);
      
      this.log(`Disk usage: ${diskInfo[4]} (${diskInfo[2]} used of ${diskInfo[1]})`);
      
      if (usedPercent > 90) {
        this.issues.push(`Disk space critically low: ${usedPercent}% used`);
      } else if (usedPercent > 80) {
        this.warnings.push(`Disk space getting low: ${usedPercent}% used`);
      }
    } catch (error) {
      this.warnings.push(`Could not check disk space: ${error.message}`);
    }
  }

  async checkProcessHealth() {
    this.log('Checking process health...');
    
    try {
      // Check if Node.js processes are running
      const nodeProcesses = execSync('ps aux | grep node | grep -v grep', { encoding: 'utf8' });
      const processCount = nodeProcesses.split('\n').filter(line => line.trim()).length;
      
      this.log(`Found ${processCount} Node.js processes running`);
      
      if (processCount === 0) {
        this.warnings.push('No Node.js processes running. Development server may be down.');
      }

      // Check port 3000
      try {
        const portCheck = execSync('lsof -i :3000', { encoding: 'utf8' });
        this.log('Port 3000 is in use');
      } catch (error) {
        this.warnings.push('Port 3000 is not in use. Development server may be down.');
      }

      // Check memory usage
      const memoryInfo = execSync('free -h', { encoding: 'utf8' });
      const memoryLines = memoryInfo.split('\n');
      const memInfo = memoryLines[1].split(/\s+/);
      const usedPercent = Math.round((parseInt(memInfo[2]) / parseInt(memInfo[1])) * 100);
      
      this.log(`Memory usage: ${memInfo[2]} / ${memInfo[1]} (${usedPercent}%)`);
      
      if (usedPercent > 90) {
        this.issues.push(`Memory usage critically high: ${usedPercent}%`);
      } else if (usedPercent > 80) {
        this.warnings.push(`Memory usage high: ${usedPercent}%`);
      }

    } catch (error) {
      this.warnings.push(`Process health check failed: ${error.message}`);
    }
  }

  async checkNetworkConnectivity() {
    this.log('Checking network connectivity...');
    
    try {
      // Check internet connectivity
      execSync('ping -c 1 google.com', { stdio: 'pipe' });
      this.log('Internet connectivity: OK');
    } catch (error) {
      this.issues.push('Internet connectivity failed');
    }

    try {
      // Check localhost connectivity
      execSync('ping -c 1 localhost', { stdio: 'pipe' });
      this.log('Localhost connectivity: OK');
    } catch (error) {
      this.issues.push('Localhost connectivity failed');
    }
  }

  async checkApplicationHealth() {
    this.log('Checking application health...');
    
    try {
      // Check if we can reach the application
      const response = execSync('curl -s -o /dev/null -w "%{http_code}" http://localhost:3000', { encoding: 'utf8' });
      
      if (response.trim() === '200') {
        this.log('Application responding: OK');
      } else {
        this.issues.push(`Application not responding properly. HTTP status: ${response.trim()}`);
      }
    } catch (error) {
      this.issues.push(`Application health check failed: ${error.message}`);
    }
  }

  async checkDependencies() {
    this.log('Checking dependencies...');
    
    try {
      // Check if node_modules exists
      const nodeModulesPath = path.join(this.projectRoot, 'node_modules');
      if (!fs.existsSync(nodeModulesPath)) {
        this.issues.push('node_modules directory not found. Run npm install.');
        if (this.autoFix) {
          this.log('Installing dependencies...', 'fix');
          execSync('npm install', { cwd: this.projectRoot, stdio: 'inherit' });
        }
        return;
      }

      // Check package-lock.json
      const packageLockPath = path.join(this.projectRoot, 'package-lock.json');
      if (!fs.existsSync(packageLockPath)) {
        this.warnings.push('package-lock.json not found. Dependencies may be out of sync.');
      }

      // Check for outdated packages
      try {
        const outdated = execSync('npm outdated --json', { cwd: this.projectRoot, encoding: 'utf8' });
        const outdatedPackages = JSON.parse(outdated);
        const count = Object.keys(outdatedPackages).length;
        
        if (count > 0) {
          this.warnings.push(`${count} packages are outdated. Consider running npm update.`);
        } else {
          this.log('All packages are up to date');
        }
      } catch (error) {
        // npm outdated returns non-zero exit code when packages are outdated
        this.log('Some packages may be outdated');
      }

    } catch (error) {
      this.issues.push(`Dependency check failed: ${error.message}`);
    }
  }

  async generateReport() {
    this.log('Generating health report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      status: this.issues.length === 0 ? 'HEALTHY' : 'ISSUES_FOUND',
      issues: this.issues,
      warnings: this.warnings,
      summary: {
        totalIssues: this.issues.length,
        totalWarnings: this.warnings.length,
        criticalIssues: this.issues.filter(issue => 
          issue.includes('critical') || issue.includes('failed')
        ).length
      }
    };

    // Save report to file
    const reportPath = path.join(this.projectRoot, 'health-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    this.log(`Health report saved to: ${reportPath}`);

    return report;
  }

  async runAllChecks() {
    this.log('Starting comprehensive system health check...');
    this.log(`Project root: ${this.projectRoot}`);
    
    await this.checkDatabaseHealth();
    await this.checkFileSystemHealth();
    await this.checkProcessHealth();
    await this.checkNetworkConnectivity();
    await this.checkApplicationHealth();
    await this.checkDependencies();
    
    const report = await this.generateReport();
    
    // Print summary
    console.log('\n' + '='.repeat(50));
    console.log('SYSTEM HEALTH SUMMARY');
    console.log('='.repeat(50));
    console.log(`Status: ${report.status}`);
    console.log(`Issues: ${report.summary.totalIssues}`);
    console.log(`Warnings: ${report.summary.totalWarnings}`);
    console.log(`Critical Issues: ${report.summary.criticalIssues}`);
    
    if (this.issues.length > 0) {
      console.log('\n🚨 ISSUES FOUND:');
      this.issues.forEach((issue, index) => {
        console.log(`  ${index + 1}. ${issue}`);
      });
    }
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach((warning, index) => {
        console.log(`  ${index + 1}. ${warning}`);
      });
    }
    
    if (this.issues.length === 0 && this.warnings.length === 0) {
      console.log('\n🎉 All systems are healthy!');
    }
    
    console.log('='.repeat(50));
    
    return report;
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    verbose: args.includes('--verbose'),
    fix: args.includes('--fix')
  };
  
  const checker = new SystemHealthChecker(options);
  checker.runAllChecks().catch(console.error);
}

module.exports = SystemHealthChecker;
