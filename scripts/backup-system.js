#!/usr/bin/env node

/**
 * OMGsystems Backup System Script
 * 
 * This script creates comprehensive backups of the OMGsystems application including:
 * - Database backup
 * - File uploads backup
 * - Configuration backup
 * - Full system backup
 * 
 * Usage: node scripts/backup-system.js [--type=full|db|files|config] [--compress] [--retention=7]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');

class BackupSystem {
  constructor(options = {}) {
    this.projectRoot = path.resolve(__dirname, '..');
    this.backupDir = path.join(this.projectRoot, 'backups');
    this.type = options.type || 'full';
    this.compress = options.compress !== false;
    this.retention = parseInt(options.retention) || 7; // days
    this.timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = {
      info: '📦',
      success: '✅',
      error: '❌',
      warning: '⚠️'
    }[type] || 'ℹ️';

    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  ensureBackupDirectory() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
      this.log('Created backup directory', 'success');
    }
  }

  generateChecksum(filePath) {
    const data = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  async backupDatabase() {
    this.log('Starting database backup...');
    
    const dbPath = path.join(this.projectRoot, 'prisma', 'dev.db');
    const backupName = `db_backup_${this.timestamp}.db`;
    const backupPath = path.join(this.backupDir, backupName);
    
    if (!fs.existsSync(dbPath)) {
      throw new Error('Database file not found');
    }

    try {
      // Copy database file
      fs.copyFileSync(dbPath, backupPath);
      
      // Generate checksum
      const checksum = this.generateChecksum(backupPath);
      const checksumPath = backupPath + '.sha256';
      fs.writeFileSync(checksumPath, checksum);
      
      // Compress if requested
      if (this.compress) {
        execSync(`gzip "${backupPath}"`);
        execSync(`gzip "${checksumPath}"`);
        this.log(`Database backup compressed: ${backupName}.gz`, 'success');
      } else {
        this.log(`Database backup created: ${backupName}`, 'success');
      }
      
      return {
        type: 'database',
        file: this.compress ? `${backupName}.gz` : backupName,
        size: fs.statSync(this.compress ? `${backupPath}.gz` : backupPath).size,
        checksum: checksum
      };
    } catch (error) {
      throw new Error(`Database backup failed: ${error.message}`);
    }
  }

  async backupFiles() {
    this.log('Starting files backup...');
    
    const filesToBackup = [
      'public/uploads',
      'public/og',
      'public/icons'
    ];
    
    const backupName = `files_backup_${this.timestamp}.tar.gz`;
    const backupPath = path.join(this.backupDir, backupName);
    
    const existingPaths = filesToBackup.filter(dir => 
      fs.existsSync(path.join(this.projectRoot, dir))
    );
    
    if (existingPaths.length === 0) {
      this.log('No files to backup', 'warning');
      return null;
    }
    
    try {
      // Create tar archive
      const tarCommand = `tar -czf "${backupPath}" -C "${this.projectRoot}" ${existingPaths.join(' ')}`;
      execSync(tarCommand);
      
      // Generate checksum
      const checksum = this.generateChecksum(backupPath);
      const checksumPath = backupPath + '.sha256';
      fs.writeFileSync(checksumPath, checksum);
      
      this.log(`Files backup created: ${backupName}`, 'success');
      
      return {
        type: 'files',
        file: backupName,
        size: fs.statSync(backupPath).size,
        checksum: checksum,
        paths: existingPaths
      };
    } catch (error) {
      throw new Error(`Files backup failed: ${error.message}`);
    }
  }

  async backupConfiguration() {
    this.log('Starting configuration backup...');
    
    const configFiles = [
      '.env.local',
      '.env',
      'next.config.ts',
      'tailwind.config.js',
      'tsconfig.json',
      'package.json',
      'package-lock.json'
    ];
    
    const backupName = `config_backup_${this.timestamp}.tar.gz`;
    const backupPath = path.join(this.backupDir, backupName);
    
    const existingFiles = configFiles.filter(file => 
      fs.existsSync(path.join(this.projectRoot, file))
    );
    
    if (existingFiles.length === 0) {
      this.log('No configuration files to backup', 'warning');
      return null;
    }
    
    try {
      // Create tar archive
      const tarCommand = `tar -czf "${backupPath}" -C "${this.projectRoot}" ${existingFiles.join(' ')}`;
      execSync(tarCommand);
      
      // Generate checksum
      const checksum = this.generateChecksum(backupPath);
      const checksumPath = backupPath + '.sha256';
      fs.writeFileSync(checksumPath, checksum);
      
      this.log(`Configuration backup created: ${backupName}`, 'success');
      
      return {
        type: 'configuration',
        file: backupName,
        size: fs.statSync(backupPath).size,
        checksum: checksum,
        files: existingFiles
      };
    } catch (error) {
      throw new Error(`Configuration backup failed: ${error.message}`);
    }
  }

  async backupFullSystem() {
    this.log('Starting full system backup...');
    
    const backupName = `full_backup_${this.timestamp}.tar.gz`;
    const backupPath = path.join(this.backupDir, backupName);
    
    try {
      // Create full system backup excluding unnecessary files
      const excludePatterns = [
        '--exclude=node_modules',
        '--exclude=.next',
        '--exclude=.git',
        '--exclude=backups',
        '--exclude=*.log',
        '--exclude=.DS_Store',
        '--exclude=*.tmp'
      ];
      
      const tarCommand = `tar ${excludePatterns.join(' ')} -czf "${backupPath}" -C "${this.projectRoot}" .`;
      execSync(tarCommand);
      
      // Generate checksum
      const checksum = this.generateChecksum(backupPath);
      const checksumPath = backupPath + '.sha256';
      fs.writeFileSync(checksumPath, checksum);
      
      this.log(`Full system backup created: ${backupName}`, 'success');
      
      return {
        type: 'full_system',
        file: backupName,
        size: fs.statSync(backupPath).size,
        checksum: checksum
      };
    } catch (error) {
      throw new Error(`Full system backup failed: ${error.message}`);
    }
  }

  async cleanupOldBackups() {
    this.log(`Cleaning up backups older than ${this.retention} days...`);
    
    try {
      const files = fs.readdirSync(this.backupDir);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - this.retention);
      
      let deletedCount = 0;
      
      for (const file of files) {
        const filePath = path.join(this.backupDir, file);
        const stats = fs.statSync(filePath);
        
        if (stats.mtime < cutoffDate) {
          fs.unlinkSync(filePath);
          deletedCount++;
          this.log(`Deleted old backup: ${file}`, 'info');
        }
      }
      
      if (deletedCount > 0) {
        this.log(`Cleaned up ${deletedCount} old backup files`, 'success');
      } else {
        this.log('No old backups to clean up', 'info');
      }
    } catch (error) {
      this.log(`Cleanup failed: ${error.message}`, 'error');
    }
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  async runBackup() {
    this.log('Starting backup process...');
    this.log(`Backup type: ${this.type}`);
    this.log(`Compression: ${this.compress ? 'enabled' : 'disabled'}`);
    this.log(`Retention: ${this.retention} days`);
    
    this.ensureBackupDirectory();
    
    const results = [];
    
    try {
      switch (this.type) {
        case 'db':
          results.push(await this.backupDatabase());
          break;
        case 'files':
          results.push(await this.backupFiles());
          break;
        case 'config':
          results.push(await this.backupConfiguration());
          break;
        case 'full':
        default:
          results.push(await this.backupDatabase());
          results.push(await this.backupFiles());
          results.push(await this.backupConfiguration());
          results.push(await this.backupFullSystem());
          break;
      }
      
      // Clean up old backups
      await this.cleanupOldBackups();
      
      // Generate backup report
      const report = {
        timestamp: this.timestamp,
        type: this.type,
        results: results.filter(r => r !== null),
        totalSize: results.reduce((sum, r) => sum + (r?.size || 0), 0)
      };
      
      const reportPath = path.join(this.backupDir, `backup_report_${this.timestamp}.json`);
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      
      // Print summary
      console.log('\n' + '='.repeat(50));
      console.log('BACKUP SUMMARY');
      console.log('='.repeat(50));
      console.log(`Timestamp: ${this.timestamp}`);
      console.log(`Type: ${this.type}`);
      console.log(`Total Size: ${this.formatBytes(report.totalSize)}`);
      console.log(`Files Created: ${results.filter(r => r !== null).length}`);
      
      results.filter(r => r !== null).forEach(result => {
        console.log(`  - ${result.type}: ${result.file} (${this.formatBytes(result.size)})`);
      });
      
      console.log(`Report saved: backup_report_${this.timestamp}.json`);
      console.log('='.repeat(50));
      
      this.log('Backup process completed successfully!', 'success');
      
      return report;
    } catch (error) {
      this.log(`Backup failed: ${error.message}`, 'error');
      throw error;
    }
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {};
  
  args.forEach(arg => {
    if (arg.startsWith('--type=')) {
      options.type = arg.split('=')[1];
    } else if (arg.startsWith('--retention=')) {
      options.retention = arg.split('=')[1];
    } else if (arg === '--no-compress') {
      options.compress = false;
    }
  });
  
  const backupSystem = new BackupSystem(options);
  backupSystem.runBackup().catch(console.error);
}

module.exports = BackupSystem;
