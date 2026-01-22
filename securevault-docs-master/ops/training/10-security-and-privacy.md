# Security & Privacy

## Share Security

### PIN Protection

**Features:**
- Optional but recommended
- 4-6 digit PIN
- Required to access share link
- Prevents unauthorized access

**Best Practices:**
- Always use PIN for sensitive documents
- Share PIN separately from link
- Use strong PINs (not obvious numbers)

### Expiry Dates

**Features:**
- Optional expiry date
- Automatic link deactivation
- Prevents long-term access
- Can be set from 1-30 days

**Best Practices:**
- Set expiry for time-sensitive docs
- Use shorter expiry for sensitive content
- Monitor expiry dates

### Watermark Viewer

**Features:**
- Documents displayed with watermark
- Prevents screenshot sharing
- Copy-block option available
- Download restrictions (optional)

**Security:**
- Watermark includes user/org info
- Visible on all pages
- Cannot be easily removed

### Revoke Access

**Features:**
- Revoke share links at any time
- Immediate access termination
- Works even if link was shared
- No notification to recipients

**Use Cases:**
- Document no longer needed
- Security concern
- Accidental sharing
- Access control

## Authentication

### WebAuthn (Future)

**For Admins:**
- Enroll WebAuthn on first login
- Policy ready (off by default in test)
- Enhanced security for org admins
- Recovery codes provided

**Setup:**
1. Go to Settings → Security
2. Enable WebAuthn
3. Register device
4. Save recovery codes

### Login Methods

**Available:**
- Email/password
- Google OAuth
- Microsoft OAuth
- Optional Beta checkbox (staging only)

**Security:**
- Password requirements enforced
- OAuth tokens secure
- Session management
- Login alerts available

## Audit Events

**Tracked Actions:**
- Authentication (login/logout)
- Invites sent/accepted
- Document uploads
- Labels applied
- Shares created/revoked
- Settings changes
- Portal creation
- Request sending

**Access:**
- Admins can view org audit logs
- Support can view shared audit table
- Filter by user, action, date range
- Export logs (future)

## Data Protection

### Encryption

**In Transit:**
- All connections use HTTPS
- TLS 1.2+ required
- Secure API endpoints

**At Rest:**
- Data encrypted in storage
- Secure key management
- Regular backups

### Access Control

**Role-Based:**
- Admins: Full access
- Members: Limited access
- Clients: Portal-only access
- Support: Read-only audit access

**Permissions:**
- Granular permission system
- Org-scoped access
- Personal vault isolation

## Privacy Features

### Data Ownership

**User Rights:**
- Users own their documents
- Full control over sharing
- Can delete at any time
- Export data available

### Data Retention

**Active Accounts:**
- Data kept while account active
- Can delete files anytime
- Account deletion removes all data

**Legal/Backup:**
- Some logs retained for security
- Backup retention policies
- Compliance requirements

### External Sharing

**User Control:**
- Share links with PIN/expiry
- Watermark protection
- Revoke access anytime
- Monitor access history

## Compliance

### GDPR

**Features:**
- Data export available
- Account deletion
- Privacy policy accessible
- Consent management

### SOC 2 (Future)

**Planned:**
- Security audits
- Compliance certifications
- Regular assessments

## Best Practices

1. **Share Security**
   - Always use PIN for sensitive docs
   - Set expiry dates
   - Monitor access history
   - Revoke unused shares

2. **Authentication**
   - Use strong passwords
   - Enable WebAuthn (admins)
   - Use OAuth when available
   - Save recovery codes

3. **Access Control**
   - Review team permissions regularly
   - Remove inactive members
   - Monitor audit logs
   - Limit admin access

4. **Data Protection**
   - Regular backups
   - Secure sharing practices
   - Monitor for suspicious activity
   - Report security concerns

