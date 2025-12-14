# Emergency Quick Reference Card

## 🚨 CRITICAL INCIDENT RESPONSE

### Immediate Actions (0-5 minutes)
1. **Stop all services**
   ```bash
   pkill -f "next dev"
   pkill -f "npm run dev"
   ```

2. **Check system status**
   ```bash
   ps aux | grep node
   lsof -i :3000
   ```

3. **Access database directly**
   ```bash
   cd /Users/prince/Documents/Omgsystems-Website/omgsystems-website
   sqlite3 prisma/dev.db
   ```

### Emergency Admin Access
```sql
-- Reset admin password (replace with actual hash)
UPDATE User SET password = '$2a$10$hashedpassword' WHERE email = 'admin@omgsystems.com';
```

### Emergency Feature Disable
```bash
# Add to .env.local
DISABLE_LEAD_CAPTURE=true
DISABLE_PAYMENT_PROCESSING=true
DISABLE_USER_REGISTRATION=true
```

## 🔄 BACKUP & RESTORE

### Quick Backup
```bash
# Database
cp prisma/dev.db "backups/db_$(date +%Y%m%d_%H%M%S).db"

# Files
tar -czf "backups/files_$(date +%Y%m%d_%H%M%S).tar.gz" public/uploads/
```

### Quick Restore
```bash
# Stop services first
pkill -f "next dev"

# Restore database
cp backups/db_20241014_120000.db prisma/dev.db

# Restart
npm run dev
```

## 🔍 DIAGNOSTIC COMMANDS

### System Health
```bash
# Check resources
top
df -h
free -h

# Check processes
ps aux | grep node
lsof -i :3000
```

### Database Health
```bash
# Integrity check
sqlite3 prisma/dev.db "PRAGMA integrity_check;"

# Quick check
sqlite3 prisma/dev.db "PRAGMA quick_check;"
```

### Application Logs
```bash
# Server logs
tail -f server.log
tail -f .next/server.log

# Build logs
tail -f build.log
```

## 🚀 RECOVERY PROCEDURES

### Complete System Restart
```bash
# 1. Stop everything
pkill -f "next dev"
pkill -f "npm"

# 2. Clean and rebuild
rm -rf node_modules .next
npm install
npm run build

# 3. Start fresh
npm run dev
```

### Database Recovery
```bash
# Check integrity
sqlite3 prisma/dev.db "PRAGMA integrity_check;"

# If corrupted, restore from backup
cp backups/latest_backup.db prisma/dev.db

# Regenerate Prisma client
npx prisma generate
```

## 📞 EMERGENCY CONTACTS

- **Primary On-Call**: [Contact]
- **Secondary On-Call**: [Contact]
- **System Admin**: [Contact]
- **Hosting Provider**: [Contact]

## ⚡ QUICK FIXES

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000
kill -9 [PID]

# Or use different port
PORT=3001 npm run dev
```

### Build Failures
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Database Connection Issues
```bash
# Check database file
ls -la prisma/dev.db

# Regenerate Prisma client
npx prisma generate
npx prisma db push
```

### Memory Issues
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run dev
```

---

**Remember**: Always document what you do during an incident!
**Last Updated**: October 14, 2024
