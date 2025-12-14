# OMGsystems Operational Playbooks

## Table of Contents
1. [Break-Glass Procedures](#break-glass-procedures)
2. [Backup & Restore Procedures](#backup--restore-procedures)
3. [Incident Response Runbooks](#incident-response-runbooks)
4. [Emergency Contacts](#emergency-contacts)
5. [System Recovery Procedures](#system-recovery-procedures)

---

## Break-Glass Procedures

### Emergency Admin Access
**When to use:** Complete system lockout, critical security incident, or admin account compromise.

#### Immediate Actions (0-5 minutes)
1. **Assess the situation**
   - Document the incident details
   - Identify affected systems and users
   - Determine if this is a security breach

2. **Emergency database access**
   ```bash
   # Direct database access (SQLite)
   cd /Users/prince/Documents/Omgsystems-Website/omgsystems-website
   sqlite3 prisma/dev.db
   
   # Reset admin user password
   UPDATE User SET password = '$2a$10$hashedpassword' WHERE email = 'admin@omgsystems.com';
   ```

3. **Emergency system access**
   ```bash
   # Stop all services
   pkill -f "next dev"
   pkill -f "npm run dev"
   
   # Start in maintenance mode
   NODE_ENV=maintenance npm run dev
   ```

#### Recovery Steps (5-30 minutes)
1. **Verify system integrity**
   - Check database integrity: `PRAGMA integrity_check;`
   - Verify file permissions
   - Check for unauthorized changes

2. **Reset authentication**
   - Generate new admin credentials
   - Update environment variables
   - Clear all active sessions

3. **Security audit**
   - Review access logs
   - Check for data exfiltration
   - Document all changes made

### Emergency Feature Disable
**When to use:** Critical bug in production, security vulnerability, or system overload.

#### Immediate Actions
1. **Disable specific features via environment**
   ```bash
   # Add to .env.local
   DISABLE_LEAD_CAPTURE=true
   DISABLE_PAYMENT_PROCESSING=true
   DISABLE_USER_REGISTRATION=true
   ```

2. **Emergency feature flags**
   ```bash
   # Update database directly
   UPDATE FeatureFlag SET enabled = false WHERE name = 'CRITICAL_FEATURE';
   ```

3. **Rate limiting**
   ```bash
   # Add to next.config.ts
   async headers() {
     return [
       {
         source: '/api/:path*',
         headers: [
           {
             key: 'X-RateLimit-Limit',
             value: '1',
           },
         ],
       },
     ]
   }
   ```

---

## Backup & Restore Procedures

### Automated Backup Schedule
- **Database**: Every 6 hours
- **File uploads**: Daily
- **Configuration**: Weekly
- **Full system**: Monthly

### Manual Backup Procedures

#### Database Backup
```bash
# Create timestamped backup
cd /Users/prince/Documents/Omgsystems-Website/omgsystems-website
cp prisma/dev.db "backups/db_backup_$(date +%Y%m%d_%H%M%S).db"

# Compress backup
gzip "backups/db_backup_$(date +%Y%m%d_%H%M%S).db"
```

#### File System Backup
```bash
# Backup uploads and public files
tar -czf "backups/files_backup_$(date +%Y%m%d_%H%M%S).tar.gz" public/uploads/ public/og/

# Backup configuration
cp .env.local "backups/env_backup_$(date +%Y%m%d_%H%M%S).env"
cp next.config.ts "backups/config_backup_$(date +%Y%m%d_%H%M%S).ts"
```

#### Full System Backup
```bash
# Create complete system backup
tar --exclude='node_modules' --exclude='.next' --exclude='.git' \
    -czf "backups/full_backup_$(date +%Y%m%d_%H%M%S).tar.gz" .
```

### Restore Procedures

#### Database Restore
```bash
# Stop the application
pkill -f "next dev"

# Restore from backup
cp "backups/db_backup_20241014_120000.db.gz" prisma/dev.db.gz
gunzip prisma/dev.db.gz

# Verify integrity
sqlite3 prisma/dev.db "PRAGMA integrity_check;"

# Restart application
npm run dev
```

#### File System Restore
```bash
# Restore files
tar -xzf "backups/files_backup_20241014_120000.tar.gz"

# Restore configuration
cp "backups/env_backup_20241014_120000.env" .env.local
cp "backups/config_backup_20241014_120000.ts" next.config.ts
```

#### Full System Restore
```bash
# Stop all services
pkill -f "next dev"

# Restore from full backup
tar -xzf "backups/full_backup_20241014_120000.tar.gz"

# Reinstall dependencies
npm install

# Restart services
npm run dev
```

---

## Incident Response Runbooks

### Severity Levels
- **P1 (Critical)**: Complete system down, data loss, security breach
- **P2 (High)**: Major feature down, performance degradation
- **P3 (Medium)**: Minor feature issues, cosmetic problems
- **P4 (Low)**: Enhancement requests, documentation issues

### P1 Critical Incident Response

#### Immediate Response (0-15 minutes)
1. **Acknowledge the incident**
   - Send immediate notification to team
   - Create incident ticket
   - Begin documentation

2. **Assess impact**
   - How many users affected?
   - What functionality is down?
   - Is data at risk?

3. **Implement immediate mitigation**
   - Activate break-glass procedures if needed
   - Deploy emergency fixes
   - Communicate with users

#### Investigation (15-60 minutes)
1. **Gather information**
   ```bash
   # Check system logs
   tail -f server.log
   tail -f .next/server.log
   
   # Check database status
   sqlite3 prisma/dev.db "SELECT COUNT(*) FROM User;"
   
   # Check system resources
   top
   df -h
   ```

2. **Identify root cause**
   - Review error logs
   - Check recent deployments
   - Analyze system metrics

3. **Document findings**
   - Timeline of events
   - Root cause analysis
   - Impact assessment

#### Resolution (1-4 hours)
1. **Implement fix**
   - Deploy hotfix if needed
   - Test in staging environment
   - Monitor system stability

2. **Verify resolution**
   - Confirm all systems operational
   - Validate data integrity
   - Test critical user flows

3. **Post-incident actions**
   - Update monitoring alerts
   - Document lessons learned
   - Schedule post-mortem

### P2 High Priority Incident

#### Response Timeline (0-2 hours)
1. **Initial assessment** (15 minutes)
2. **Investigation** (30-60 minutes)
3. **Resolution** (1-2 hours)
4. **Verification** (15 minutes)

#### Common P2 Scenarios
- **Payment processing down**
  ```bash
  # Check Stripe integration
  curl -H "Authorization: Bearer $STRIPE_SECRET_KEY" \
       https://api.stripe.com/v1/charges
  ```

- **Email delivery issues**
  ```bash
  # Check email service status
  # Review email logs
  # Test email functionality
  ```

- **Performance degradation**
  ```bash
  # Monitor system resources
  top
  iostat 1
  netstat -an | grep :3000
  ```

### P3/P4 Incident Response

#### Standard Process
1. **Acknowledge** (within 4 hours)
2. **Investigate** (within 24 hours)
3. **Resolve** (within 72 hours)
4. **Document** (within 1 week)

---

## Emergency Contacts

### Internal Team
- **Primary On-Call**: [Contact Information]
- **Secondary On-Call**: [Contact Information]
- **System Administrator**: [Contact Information]
- **Security Team**: [Contact Information]

### External Services
- **Hosting Provider**: [Contact Information]
- **Database Provider**: [Contact Information]
- **CDN Provider**: [Contact Information]
- **Payment Processor**: [Contact Information]

### Escalation Matrix
1. **Level 1**: On-call engineer
2. **Level 2**: Team lead
3. **Level 3**: Engineering manager
4. **Level 4**: CTO/VP Engineering

---

## System Recovery Procedures

### Complete System Failure

#### Recovery Steps
1. **Assess damage**
   ```bash
   # Check file system integrity
   fsck /dev/sda1
   
   # Check database integrity
   sqlite3 prisma/dev.db "PRAGMA integrity_check;"
   ```

2. **Restore from backup**
   - Use most recent full backup
   - Verify backup integrity
   - Restore in isolated environment first

3. **Rebuild system**
   ```bash
   # Clean installation
   rm -rf node_modules .next
   npm install
   npm run build
   ```

4. **Validate functionality**
   - Run automated tests
   - Perform manual testing
   - Monitor system metrics

### Database Corruption Recovery

#### Detection
```bash
# Check database integrity
sqlite3 prisma/dev.db "PRAGMA integrity_check;"

# Check for corruption
sqlite3 prisma/dev.db "PRAGMA quick_check;"
```

#### Recovery Options
1. **Minor corruption**
   ```bash
   # Attempt repair
   sqlite3 prisma/dev.db "PRAGMA repair;"
   ```

2. **Major corruption**
   ```bash
   # Restore from backup
   cp backup.db prisma/dev.db
   ```

3. **Data extraction**
   ```bash
   # Extract data from corrupted database
   sqlite3 corrupted.db ".dump" > data.sql
   sqlite3 new.db < data.sql
   ```

### Network/Connectivity Issues

#### Diagnosis
```bash
# Check network connectivity
ping google.com
nslookup omgsystems.com

# Check port availability
netstat -an | grep :3000
lsof -i :3000
```

#### Resolution
1. **Restart network services**
2. **Check firewall rules**
3. **Verify DNS configuration**
4. **Test with different network**

---

## Monitoring & Alerting

### Key Metrics to Monitor
- **System Health**: CPU, Memory, Disk usage
- **Application Health**: Response times, error rates
- **Database Health**: Connection count, query performance
- **Business Metrics**: User registrations, payment success rates

### Alert Thresholds
- **CPU Usage**: > 80% for 5 minutes
- **Memory Usage**: > 90% for 2 minutes
- **Error Rate**: > 5% for 3 minutes
- **Response Time**: > 2 seconds for 5 minutes

### Automated Responses
- **Auto-scaling**: Increase resources when thresholds exceeded
- **Circuit breakers**: Disable failing services
- **Rate limiting**: Prevent system overload
- **Health checks**: Automatic service restart

---

## Documentation Updates

This document should be updated:
- After each incident (lessons learned)
- When new procedures are implemented
- Quarterly review and validation
- When team members change

**Last Updated**: October 14, 2024
**Next Review**: January 14, 2025
**Document Owner**: System Administrator
