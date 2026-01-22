# 🚀 Production Deployment Checklist

## ⚠️ CRITICAL SECURITY REQUIREMENTS

Before deploying SecureVault Docs to production, complete ALL items in this checklist.

---

## 🔐 Authentication & Security

### 1. Hash PINs with bcrypt
- [ ] Install bcrypt: `npm install bcrypt @types/bcrypt`
- [ ] Update PIN creation to hash before storage
- [ ] Update PIN verification to use bcrypt.compare
- [ ] **File to modify:** `src/app/api/portal/[portalId]/verify-pin/route.ts`

**Implementation:**
```typescript
// When creating a portal/PIN
import bcrypt from 'bcrypt';
const hashedPin = await bcrypt.hash(pin, 10);

// When verifying PIN (in verify-pin/route.ts line 61-63)
// Replace:
validPin = clientPortal.pin && clientPortal.pin === pin;

// With:
validPin = clientPortal.pin && await bcrypt.compare(pin, clientPortal.pin);
```

### 2. Migrate Session Storage to Redis
- [ ] Install Redis client: `npm install ioredis`
- [ ] Set up Redis instance (AWS ElastiCache, Railway, or local)
- [ ] Add Redis connection configuration
- [ ] **Files to modify:** `src/lib/portalAuth.ts` (lines 22-29, 58-67)

**Configuration:**
```typescript
// Add to .env
REDIS_URL=redis://your-redis-instance:6379

// Update portalAuth.ts
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

// Replace Map-based session storage with Redis
async function createPortalSession(portalId: string): Promise<string> {
  const sessionId = generateSessionToken();
  const session = { portalId, authenticatedAt: Date.now(), expiresAt: Date.now() + MAX_SESSION_AGE };
  await redis.setex(sessionId, MAX_SESSION_AGE / 1000, JSON.stringify(session));
  return sessionId;
}
```

### 3. Migrate Rate Limiting to Redis
- [ ] Move rate limit storage from in-memory Map to Redis
- [ ] Test rate limiting across multiple server instances
- [ ] **File to modify:** `src/lib/portalAuth.ts` (lines 74-134)

**Implementation:**
```typescript
// Replace Map-based rateLimitStore with Redis
async function checkPinRateLimit(portalId: string) {
  const key = `pin_rate_limit:${portalId}`;
  const record = await redis.get(key);

  if (!record) {
    return { allowed: true, remainingAttempts: PIN_ATTEMPT_LIMIT };
  }

  const { attempts, resetAt } = JSON.parse(record);

  if (Date.now() > resetAt) {
    await redis.del(key);
    return { allowed: true, remainingAttempts: PIN_ATTEMPT_LIMIT };
  }

  if (attempts >= PIN_ATTEMPT_LIMIT) {
    return { allowed: false, lockoutEndsAt: resetAt };
  }

  return { allowed: true, remainingAttempts: PIN_ATTEMPT_LIMIT - attempts };
}
```

---

## 🌐 HTTPS & Cookies

### 4. Enable HTTPS
- [ ] Obtain SSL/TLS certificate (Let's Encrypt, AWS Certificate Manager, etc.)
- [ ] Configure web server (Nginx, Apache) or platform (Vercel, Railway) for HTTPS
- [ ] Force HTTPS redirect (no HTTP traffic allowed)
- [ ] Update `NODE_ENV=production` in environment variables

**Verification:**
```bash
# Test that HTTP redirects to HTTPS
curl -I http://yourdomain.com
# Should return: 301 Moved Permanently, Location: https://yourdomain.com

# Verify secure cookie flag is set
curl -I https://yourdomain.com/api/portal/p_demo1/verify-pin \
  -X POST -H "Content-Type: application/json" -d '{"pin":"1234"}'
# Check Set-Cookie header includes: Secure; HttpOnly; SameSite=Strict
```

### 5. Verify Secure Cookie Configuration
- [ ] Confirm cookies only sent over HTTPS in production
- [ ] Verify HttpOnly flag prevents JavaScript access
- [ ] Verify SameSite=Strict prevents CSRF
- [ ] **File to verify:** `src/lib/portalAuth.ts` line 225-230

---

## 📝 Logging & Monitoring

### 6. Add Authentication Logging
- [ ] Log all PIN verification attempts (success and failure)
- [ ] Log session creation and expiration
- [ ] Log rate limit violations
- [ ] Use structured logging (Winston, Pino)

**Implementation:**
```typescript
// Add to verify-pin/route.ts
import logger from '@/lib/logger'; // Create this file

// On successful auth
logger.info('PIN verification successful', {
  portalId,
  timestamp: Date.now(),
  ip: req.headers.get('x-forwarded-for') || 'unknown'
});

// On failed auth
logger.warn('PIN verification failed', {
  portalId,
  remainingAttempts,
  ip: req.headers.get('x-forwarded-for') || 'unknown'
});

// On rate limit hit
logger.error('Rate limit exceeded', {
  portalId,
  lockoutEndsAt: rateLimit.lockoutEndsAt,
  ip: req.headers.get('x-forwarded-for') || 'unknown'
});
```

### 7. Set Up Security Monitoring
- [ ] Configure alerts for repeated rate limit violations (potential attack)
- [ ] Monitor failed login attempts by IP address
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure error tracking (Sentry, LogRocket)

**Alert Thresholds:**
- 5+ rate limit violations from same IP in 1 hour → Block IP
- 20+ failed login attempts across all portals in 5 minutes → DDoS alert
- Any successful login after 3+ failed attempts → Potential breach alert

---

## 🔒 Advanced Security

### 8. Consider Two-Factor Authentication (2FA)
- [ ] Evaluate need for SMS or email verification
- [ ] Choose 2FA provider (Twilio, SendGrid, AWS SNS)
- [ ] Implement time-based one-time passwords (TOTP)
- [ ] Add 2FA toggle in portal settings

**Priority:** HIGH for portals handling sensitive data (financial, legal, healthcare)

### 9. Configure CORS Properly
- [ ] Set explicit allowed origins (no wildcards)
- [ ] Restrict to your production domain only
- [ ] **File to create:** `src/middleware.ts`

**Implementation:**
```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    'https://yourdomain.com',
    'https://www.yourdomain.com',
    'https://portal.yourdomain.com'
  ];

  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 403,
      statusText: 'Forbidden',
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
```

### 10. Add Content Security Policy (CSP)
- [ ] Define CSP header to prevent XSS attacks
- [ ] Test with CSP report-only mode first
- [ ] Whitelist only trusted sources for scripts/styles

**Implementation:**
```typescript
// Add to middleware.ts or next.config.js
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

response.headers.set('Content-Security-Policy', cspHeader.replace(/\s{2,}/g, ' ').trim());
```

---

## 🗄️ Database & Storage

### Running Database Migrations

Database migrations are stored in the `migrations/` folder and executed via the admin API endpoint.

**Run a migration:**
```bash
curl -X POST https://omgsystem.com/api/admin/migrate \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: migrate-2024" \
  -d '{"sql": "YOUR SQL STATEMENT HERE"}'
```

**Example - GoldSetExample table (AI learning):**
```bash
curl -X POST https://omgsystem.com/api/admin/migrate \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: migrate-2024" \
  -d '{
    "sql": "CREATE TABLE IF NOT EXISTS securevault.\"GoldSetExample\" (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), category VARCHAR(50) NOT NULL, subtype VARCHAR(100), \"textSample\" TEXT NOT NULL, \"folderPath\" TEXT NOT NULL, source VARCHAR(50) DEFAULT '\''user_correction'\'', \"organizationId\" UUID REFERENCES core.\"Organization\"(id) ON DELETE CASCADE, \"userId\" UUID NOT NULL REFERENCES core.\"User\"(id) ON DELETE CASCADE, \"createdAt\" TIMESTAMP WITH TIME ZONE DEFAULT NOW()); CREATE INDEX IF NOT EXISTS idx_gold_set_category ON securevault.\"GoldSetExample\"(category); CREATE INDEX IF NOT EXISTS idx_gold_set_org ON securevault.\"GoldSetExample\"(\"organizationId\"); CREATE INDEX IF NOT EXISTS idx_gold_set_user ON securevault.\"GoldSetExample\"(\"userId\");"
  }'
```

**Notes:**
- Database: Aurora PostgreSQL with 3 schemas: `core`, `hub`, `securevault`
- All migrations should use schema-prefixed table names (e.g., `securevault."TableName"`)
- Add new tables to `SCHEMA_MAP` in `src/lib/db-utils.ts`

---

### 11. Secure Database Access
- [ ] Use connection pooling (Supabase handles this)
- [ ] Verify database uses SSL/TLS connections
- [ ] Rotate database credentials regularly (90 days)
- [ ] Use read-only credentials where possible
- [ ] Enable Row Level Security (RLS) in Supabase

**Supabase RLS Policies:**
```sql
-- Enable RLS on sensitive tables
ALTER TABLE "ClientPortal" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Document" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Folder" ENABLE ROW LEVEL SECURITY;

-- Only allow server-side access (service role key)
CREATE POLICY "Server only access" ON "ClientPortal"
  FOR ALL
  USING (auth.role() = 'service_role');
```

### 12. Configure S3 for File Uploads
- [ ] Set up AWS S3 bucket with private ACL
- [ ] Enable server-side encryption (AES-256 or KMS)
- [ ] Configure CORS for upload domains only
- [ ] Implement presigned URL expiration (15 minutes max)
- [ ] **File to modify:** `src/app/api/portal/[portalId]/presign/route.ts`

**S3 Configuration:**
```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Replace mock upload URL with real presigned URL
const command = new PutObjectCommand({
  Bucket: process.env.AWS_S3_BUCKET,
  Key: fileKey,
  ContentType: contentType,
  ServerSideEncryption: 'AES256',
});

const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 }); // 15 min
```

---

## 🧪 Testing & Validation

### 13. Security Testing
- [ ] Run OWASP ZAP or Burp Suite security scan
- [ ] Test SQL injection on all input fields
- [ ] Test XSS on text inputs (purpose, file names)
- [ ] Verify CSRF protection with cross-origin requests
- [ ] Test rate limiting with automated tools

**Test Commands:**
```bash
# Install OWASP ZAP
docker pull zaproxy/zap-stable

# Run baseline security scan
docker run -v $(pwd):/zap/wrk/:rw -t zaproxy/zap-stable \
  zap-baseline.py -t https://yourdomain.com -r security-report.html

# Test rate limiting
for i in {1..10}; do
  curl -X POST https://yourdomain.com/api/portal/p_test/verify-pin \
    -H "Content-Type: application/json" -d '{"pin":"wrong"}'
done

# Test XSS protection
curl -X POST https://yourdomain.com/api/portal/p_test/submit \
  -b "portal_session=VALID_SESSION" \
  -H "Content-Type: application/json" \
  -d '{"purpose":"<script>alert(\"XSS\")</script>","fileName":"test.pdf","bytes":1000}'
```

### 14. Load Testing
- [ ] Test with 100+ concurrent users (k6, Apache JMeter)
- [ ] Verify rate limiting works under load
- [ ] Check Redis connection pool size
- [ ] Monitor memory usage and CPU

**k6 Load Test:**
```javascript
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up to 100 users
    { duration: '5m', target: 100 }, // Stay at 100 users
    { duration: '2m', target: 0 },   // Ramp down
  ],
};

export default function () {
  let res = http.post('https://yourdomain.com/api/portal/p_test/verify-pin',
    JSON.stringify({ pin: '1234' }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  check(res, { 'status is 200 or 401': (r) => [200, 401].includes(r.status) });
  sleep(1);
}

// Run: k6 run load-test.js
```

---

## 🔑 Environment & Secrets

### 15. Environment Variables
- [ ] Never commit `.env` files to git (add to `.gitignore`)
- [ ] Use different credentials for dev/staging/production
- [ ] Store secrets in secure vault (AWS Secrets Manager, Vault)
- [ ] Rotate API keys every 90 days

**Required Production Variables:**
```bash
# .env.production (NEVER commit this file)
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ... # Service role, NOT anon key
REDIS_URL=redis://your-redis:6379
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=your-secure-bucket
SESSION_SECRET=random-256-bit-secret # Generate with: openssl rand -base64 32
```

### 16. Audit Third-Party Dependencies
- [ ] Run `npm audit` and fix all HIGH/CRITICAL vulnerabilities
- [ ] Set up Dependabot or Snyk for automated dependency updates
- [ ] Review all dependencies for security advisories

```bash
# Check for vulnerabilities
npm audit

# Fix automatically (test thoroughly after!)
npm audit fix

# Check for outdated packages
npm outdated
```

---

## 📊 Performance & Reliability

### 17. Database Connection Pooling
- [ ] Configure max connections (default: 10-20)
- [ ] Set connection timeout (5 seconds)
- [ ] Enable connection retry logic

### 18. CDN & Caching
- [ ] Serve static assets via CDN (Cloudflare, AWS CloudFront)
- [ ] Cache public endpoints (info route)
- [ ] Add cache headers for images/fonts

---

## 📋 Compliance & Legal

### 19. Data Privacy
- [ ] Add Privacy Policy page
- [ ] Add Terms of Service
- [ ] Implement data retention policy (auto-delete old uploads)
- [ ] Add GDPR/CCPA data export functionality (if applicable)
- [ ] Cookie consent banner (if EU traffic)

### 20. Backup & Disaster Recovery
- [ ] Enable automated database backups (daily)
- [ ] Test backup restoration process
- [ ] Enable S3 versioning for uploaded files
- [ ] Document disaster recovery procedure (RTO/RPO)

---

## ✅ Pre-Launch Final Checks

### Day Before Launch
- [ ] Run full security scan (OWASP ZAP)
- [ ] Verify all checklist items completed
- [ ] Test portal access flow end-to-end
- [ ] Check error logging is working
- [ ] Verify backup systems active

### Launch Day
- [ ] Monitor logs in real-time
- [ ] Check error rates (should be <1%)
- [ ] Verify rate limiting working
- [ ] Test from different IPs/locations
- [ ] Have rollback plan ready

### First Week
- [ ] Daily security log review
- [ ] Monitor failed authentication attempts
- [ ] Check Redis/database performance
- [ ] Review user feedback
- [ ] Patch any issues immediately

---

## 🚨 Incident Response Plan

### If Security Breach Detected
1. **Immediately:** Revoke all active sessions via Redis: `redis.flushdb()`
2. **Within 1 hour:** Identify breach vector, patch vulnerability
3. **Within 4 hours:** Notify affected users
4. **Within 24 hours:** Full security audit, implement additional controls
5. **Within 72 hours:** Post-mortem report, update security procedures

### Emergency Contacts
- Security Team Lead: [EMAIL]
- DevOps On-Call: [PHONE]
- Legal/Compliance: [EMAIL]

---

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [Supabase Security Guide](https://supabase.com/docs/guides/platform/security)
- [AWS S3 Security](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html)

---

## Sign-Off

**Deployment Approved By:**

- [ ] Tech Lead: __________________ Date: __________
- [ ] Security Officer: __________________ Date: __________
- [ ] Product Owner: __________________ Date: __________

**Deployment Date:** __________________

**Rollback Plan Confirmed:** [ ] Yes [ ] No
