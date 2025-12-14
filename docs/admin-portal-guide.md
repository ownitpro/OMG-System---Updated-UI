# OMGsystems Admin & Portal Guide

## Overview
This guide provides comprehensive documentation for the OMGsystems Admin and Portal back office integration, including setup, usage, and maintenance instructions.

## Table of Contents
1. [System Architecture](#system-architecture)
2. [Admin Dashboard](#admin-dashboard)
3. [Client Portal](#client-portal)
4. [Authentication & Authorization](#authentication--authorization)
5. [API Endpoints](#api-endpoints)
6. [Database Schema](#database-schema)
7. [Deployment Guide](#deployment-guide)
8. [Troubleshooting](#troubleshooting)
9. [Security Considerations](#security-considerations)
10. [Performance Optimization](#performance-optimization)

## System Architecture

### Technology Stack
- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js with JWT
- **State Management**: React hooks and context
- **Icons**: Heroicons
- **Notifications**: Custom toast system

### Key Components
- **AdminShell**: Main admin interface with sidebar and top bar
- **PortalShell**: Client portal interface
- **AdminOverview**: Dashboard with metrics and activity
- **ToastContainer**: Global notification system
- **Search API**: Global search functionality
- **Notifications API**: Real-time notifications

## Admin Dashboard

### Navigation Structure
The admin dashboard is organized into the following sections:

1. **Overview** (`/admin`) - Main dashboard with metrics
2. **Organizations** (`/admin/orgs`) - Organization management
3. **Demos** (`/admin/demos`) - Demo request management
4. **Orders** (`/admin/orders`) - Order processing
5. **Subscriptions** (`/admin/subscriptions`) - Subscription management
6. **Projects** (`/admin/projects`) - Project and task management
7. **Tickets** (`/admin/tickets`) - Support ticket system
8. **Documents** (`/admin/documents`) - Document management
9. **Usage & Webhooks** (`/admin/usage`) - Analytics and integrations
10. **Feature Flags** (`/admin/flags`) - Feature toggle management
11. **People** (`/admin/people`) - User and membership management
12. **Settings** (`/admin/settings`) - System configuration

### Overview Dashboard

#### Today at a Glance
- **New Leads**: Count of leads created in the last 24 hours
- **Demos Booked**: Count of demo requests booked in the last 24 hours
- **Unpaid Invoices**: Count of invoices with SENT or OVERDUE status
- **Open Tickets**: Count of tickets with OPEN or IN_PROGRESS status

#### Subscription Status
- **Active**: Count of active subscriptions
- **Past Due**: Count of past due subscriptions
- **Trial**: Count of trial subscriptions

#### Onboarding Progress
- Displays average completion percentage across all active projects
- Visual progress bar with percentage indicator

#### Automation Health
- **Webhook Status**: Shows if webhook system is healthy
- **Undelivered Count**: Number of undelivered webhook events
- **Last Delivery**: Timestamp of last successful webhook delivery

#### Activity Timeline
- Shows last 20 audit log entries
- Includes user actions, resource types, and timestamps
- Provides context for recent system activity

### Global Search
- Search across organizations, invoices, tickets, leads, and projects
- Debounced search with 300ms delay
- Minimum 2 characters required
- Results limited to 10 items with relevance sorting
- Click to navigate to resource

### Notifications
- Real-time notifications for important events
- Unread count badge on notification bell
- Dropdown with recent notifications
- Click to navigate to relevant resource
- Auto-mark as read functionality

## Client Portal

### Navigation Structure
The client portal includes:

1. **Overview** (`/portal`) - Client dashboard
2. **Onboarding** (`/portal/onboarding`) - Task management
3. **Documents** (`/portal/documents`) - Document access
4. **Billing** (`/portal/billing`) - Invoice management
5. **Support** (`/portal/support`) - Ticket system
6. **Profile** (`/portal/profile`) - Account settings

### Client Permissions
- Clients can only access their organization's data
- Read-only access to most resources
- Can create support tickets
- Can update their profile information
- Can view and download paid invoices

## Authentication & Authorization

### Role-Based Access Control (RBAC)

#### Roles
- **OWNER**: Full system access, can manage all organizations
- **STAFF**: Admin access, can manage assigned organizations
- **CLIENT**: Portal access only, limited to their organization

#### Permission Matrix
| Feature | OWNER | STAFF | CLIENT |
|---------|-------|-------|--------|
| Admin Dashboard | ✅ | ✅ | ❌ |
| Organization Management | ✅ | ✅ | ❌ |
| User Management | ✅ | ✅ | ❌ |
| System Settings | ✅ | ❌ | ❌ |
| Portal Access | ✅ | ❌ | ✅ |
| Cross-Org Access | ✅ | ❌ | ❌ |

### Session Management
- JWT-based authentication
- Session includes user, memberships[], and activeOrgId
- Org switcher for users with multiple memberships
- Session timeout handling
- Audit logging for all actions

## API Endpoints

### Admin APIs

#### Search API
```
GET /api/admin/search?q={query}&orgId={orgId}
```
- Searches across organizations, invoices, tickets, leads, projects
- Requires admin role
- Returns formatted results with navigation links

#### Notifications API
```
GET /api/admin/notifications?orgId={orgId}
```
- Returns recent notifications for admin users
- Includes ticket updates, invoice payments, demo bookings
- Supports org-scoped filtering

### Portal APIs

#### Portal Notifications API
```
GET /api/portal/notifications?orgId={orgId}
```
- Returns client-specific notifications
- Includes task assignments, document updates, billing notifications
- Requires client membership in organization

## Database Schema

### Key Models

#### User & Authentication
- `User`: User accounts with email, name, image
- `Account`: OAuth provider accounts
- `Session`: User sessions
- `UserMembership`: User-organization relationships with roles

#### Organization & Business
- `Organization`: Company/organization data
- `Order`: Purchase orders
- `Invoice`: Billing invoices
- `Project`: Client projects
- `Task`: Project tasks

#### Communication & Support
- `Ticket`: Support tickets
- `Message`: Project messages
- `Comment`: Task comments
- `AuditLog`: System audit trail

#### Files & Documents
- `Attachment`: File attachments
- `SecureDoc`: Secure document references
- `WebhookEndpoint`: Webhook configurations
- `WebhookEvent`: Webhook delivery events

### Relationships
- Users can have multiple memberships (multi-tenant)
- Organizations have many projects, invoices, tickets
- Projects have many tasks and messages
- All actions are logged in AuditLog

## Deployment Guide

### Environment Variables
```bash
# Database
DATABASE_URL="file:./dev.db"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Build Information
NEXT_PUBLIC_BUILD_HASH="$(git rev-parse --short HEAD)"
NODE_ENV="production"
```

### Build Process
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Build application
npm run build

# Start production server
npm start
```

### Database Setup
```bash
# Initialize database
npx prisma db push

# Seed with sample data (optional)
npm run seed
```

## Troubleshooting

### Common Issues

#### Authentication Problems
- **Issue**: User cannot log in
- **Solution**: Check NEXTAUTH_SECRET and database connection
- **Debug**: Verify user exists in database and session is valid

#### Permission Errors
- **Issue**: 403 Forbidden errors
- **Solution**: Check user role and organization membership
- **Debug**: Verify RBAC rules and audit logs

#### Search Not Working
- **Issue**: Global search returns no results
- **Solution**: Check database indexes and query performance
- **Debug**: Verify search API endpoint and database connectivity

#### Notifications Not Showing
- **Issue**: Notification bell shows no updates
- **Solution**: Check notification API and database queries
- **Debug**: Verify audit log entries and notification formatting

### Performance Issues

#### Slow Page Loads
- **Check**: Database query performance
- **Optimize**: Add indexes, implement pagination
- **Monitor**: Core Web Vitals metrics

#### Search Timeout
- **Check**: Search query complexity
- **Optimize**: Implement debouncing, limit results
- **Monitor**: API response times

## Security Considerations

### Data Protection
- All admin and portal routes are marked `noindex`
- PII is not exposed in client bundles
- Short-lived links for document access
- Audit logging for all sensitive actions

### Access Control
- RBAC enforced at database query level
- Cross-organization access blocked
- Session-based authentication with JWT
- CSRF protection on all forms

### Compliance
- Canadian data residency (PHIPA/PIPEDA)
- Encryption at rest and in transit
- Regular security audits
- Incident response procedures

## Performance Optimization

### Frontend Optimization
- Image optimization with Next.js
- Font preloading and display swap
- Code splitting and lazy loading
- Bundle size optimization

### Backend Optimization
- Database query optimization
- Pagination for large datasets
- Caching strategies
- API response compression

### Monitoring
- Core Web Vitals tracking
- Error monitoring and logging
- Performance metrics collection
- User experience analytics

## Maintenance

### Regular Tasks
- [ ] Monitor system performance
- [ ] Review audit logs
- [ ] Update dependencies
- [ ] Backup database
- [ ] Security updates

### Backup Procedures
- Daily automated database backups
- 7-day and 30-day retention policies
- Test restore procedures monthly
- Document recovery processes

### Updates and Patches
- Regular dependency updates
- Security patch management
- Feature flag rollouts
- Gradual deployment strategies

---

**Document Version**: 1.0  
**Last Updated**: [Current Date]  
**Maintained By**: OMGsystems Development Team
