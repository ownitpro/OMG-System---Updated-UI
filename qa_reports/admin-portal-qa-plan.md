# OMGsystems Admin & Portal QA Plan

## Overview
This document outlines the comprehensive QA testing plan for the OMGsystems Admin and Portal back office integration.

## Test Environment Setup

### Prerequisites
- [ ] Test database with sample data
- [ ] Admin user with OWNER role
- [ ] Staff user with STAFF role  
- [ ] Client user with CLIENT role
- [ ] Test organization with sample data
- [ ] Browser testing tools (Chrome, Firefox, Safari)
- [ ] Mobile device testing (iOS, Android)

### Test Data Requirements
- [ ] 5+ organizations with different subscription statuses
- [ ] 10+ demo requests with various statuses
- [ ] 20+ invoices (paid, unpaid, overdue)
- [ ] 15+ support tickets
- [ ] 10+ projects with tasks
- [ ] Sample documents and attachments
- [ ] Webhook endpoints and events
- [ ] Feature flags (global and org-scoped)

## 1. Admin Shell & Navigation

### 1.1 Sidebar Navigation
- [ ] All navigation items render correctly
- [ ] Active route highlighting works
- [ ] Keyboard navigation (Tab, Enter, Arrow keys)
- [ ] Mobile sidebar toggle functionality
- [ ] Proper ARIA labels and roles

### 1.2 Top Bar Components
- [ ] Global search functionality
- [ ] Search results display correctly
- [ ] Org switcher dropdown
- [ ] Notifications bell with count
- [ ] User menu display
- [ ] Build hash and environment display

### 1.3 Responsive Design
- [ ] Desktop layout (1024px+)
- [ ] Tablet layout (768px-1023px)
- [ ] Mobile layout (<768px)
- [ ] Sidebar collapse on mobile
- [ ] Touch-friendly interactions

## 2. Admin Overview Dashboard

### 2.1 Today at a Glance Cards
- [ ] New Leads count displays correctly
- [ ] Demos Booked count displays correctly
- [ ] Unpaid Invoices count displays correctly
- [ ] Open Tickets count displays correctly
- [ ] Cards are clickable and navigate correctly
- [ ] Real-time data updates

### 2.2 Subscription Status
- [ ] Active subscriptions count
- [ ] Past due subscriptions count
- [ ] Trial subscriptions count
- [ ] Color coding and icons

### 2.3 Onboarding Progress
- [ ] Progress bar displays correctly
- [ ] Percentage calculation is accurate
- [ ] Visual progress indicator

### 2.4 Automation Health
- [ ] Webhook status indicator
- [ ] Undelivered webhook count
- [ ] Last delivery timestamp
- [ ] Health status (Healthy/Issues)

### 2.5 Activity Timeline
- [ ] Recent activity displays (last 20 items)
- [ ] Proper formatting of user actions
- [ ] Organization context
- [ ] Timestamp formatting
- [ ] Timeline visual design

## 3. Global Search

### 3.1 Search Functionality
- [ ] Search across organizations
- [ ] Search across invoices
- [ ] Search across tickets
- [ ] Search across leads
- [ ] Search across projects
- [ ] Debounced search (300ms)
- [ ] Minimum 2 characters to search

### 3.2 Search Results
- [ ] Results display with proper icons
- [ ] Title and subtitle formatting
- [ ] Click to navigate functionality
- [ ] Escape key to close results
- [ ] Results limited to 10 items
- [ ] Relevance sorting

### 3.3 Search Performance
- [ ] Results return under 200ms
- [ ] No duplicate requests
- [ ] Proper error handling
- [ ] Loading states

## 4. Notifications System

### 4.1 Admin Notifications
- [ ] Notification bell displays unread count
- [ ] Dropdown shows recent notifications
- [ ] Click to navigate to resource
- [ ] Mark as read functionality
- [ ] Notification types (ticket, invoice, demo, etc.)
- [ ] Time ago formatting

### 4.2 Portal Notifications
- [ ] Client-specific notifications
- [ ] Task assignments
- [ ] Document updates
- [ ] Billing notifications
- [ ] Support updates

## 5. Authentication & Authorization

### 5.1 Role-Based Access Control
- [ ] OWNER can access all admin features
- [ ] STAFF can access most admin features
- [ ] CLIENT can only access portal
- [ ] Cross-org access blocked (403)
- [ ] Audit logging for access attempts

### 5.2 Session Management
- [ ] Session persistence
- [ ] Org switcher functionality
- [ ] Session timeout handling
- [ ] Logout functionality

## 6. UI Components & Accessibility

### 6.1 Toast Notifications
- [ ] Success toasts display correctly
- [ ] Error toasts display correctly
- [ ] Warning toasts display correctly
- [ ] Info toasts display correctly
- [ ] Auto-dismiss functionality
- [ ] Manual dismiss with X button
- [ ] Proper ARIA labels

### 6.2 Impersonation Banner
- [ ] Banner displays when impersonating
- [ ] Organization name shows correctly
- [ ] Exit impersonation button works
- [ ] Dismiss banner functionality
- [ ] Read-only warning message

### 6.3 403 Forbidden Page
- [ ] Proper error message
- [ ] Back button functionality
- [ ] Contact information
- [ ] Security logging

### 6.4 Short-lived Link Warning
- [ ] Warning displays when link expires soon
- [ ] Countdown timer accuracy
- [ ] Expired link handling
- [ ] Security messaging

## 7. Performance Testing

### 7.1 Core Web Vitals
- [ ] Admin pages LCP < 2.2s (4G)
- [ ] Portal pages LCP < 2.0s (4G)
- [ ] CLS < 0.05
- [ ] FID < 100ms

### 7.2 Page Load Performance
- [ ] Admin Overview loads < 1.0s
- [ ] Search results < 200ms
- [ ] Navigation transitions smooth
- [ ] Image optimization
- [ ] Font loading optimization

### 7.3 Database Performance
- [ ] Pagination for large lists (25/50 items)
- [ ] Batched queries (no N+1)
- [ ] Proper indexing
- [ ] Query optimization

## 8. Security Testing

### 8.1 Authentication Security
- [ ] JWT token validation
- [ ] Session expiration
- [ ] CSRF protection
- [ ] Rate limiting on login

### 8.2 Authorization Security
- [ ] RBAC enforcement at query layer
- [ ] Cross-org data isolation
- [ ] Admin-only features protected
- [ ] Client data isolation

### 8.3 Data Security
- [ ] No PII in client bundles
- [ ] Secure document links
- [ ] Audit logging
- [ ] Input validation

## 9. Browser Compatibility

### 9.1 Desktop Browsers
- [ ] Chrome (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Edge (latest 2 versions)

### 9.2 Mobile Browsers
- [ ] Chrome Mobile
- [ ] Safari Mobile
- [ ] Firefox Mobile
- [ ] Samsung Internet

## 10. Error Handling

### 10.1 Network Errors
- [ ] Offline handling
- [ ] Network timeout handling
- [ ] Retry mechanisms
- [ ] User-friendly error messages

### 10.2 Server Errors
- [ ] 500 error handling
- [ ] Database connection errors
- [ ] API error responses
- [ ] Error logging

## 11. Data Integrity

### 11.1 CRUD Operations
- [ ] Create operations work correctly
- [ ] Read operations return correct data
- [ ] Update operations persist changes
- [ ] Delete operations remove data safely

### 11.2 Data Validation
- [ ] Form validation
- [ ] Server-side validation
- [ ] Data type validation
- [ ] Business rule validation

## 12. Integration Testing

### 12.1 API Integration
- [ ] Search API responses
- [ ] Notifications API
- [ ] Authentication API
- [ ] CRUD operations API

### 12.2 Database Integration
- [ ] Prisma queries work correctly
- [ ] Transaction handling
- [ ] Data relationships
- [ ] Migration compatibility

## Test Execution

### Phase 1: Core Functionality (Week 1)
- [ ] Admin shell and navigation
- [ ] Overview dashboard
- [ ] Global search
- [ ] Basic authentication

### Phase 2: Advanced Features (Week 2)
- [ ] Notifications system
- [ ] UI components
- [ ] Performance optimization
- [ ] Security testing

### Phase 3: Integration & Polish (Week 3)
- [ ] Browser compatibility
- [ ] Error handling
- [ ] Data integrity
- [ ] Final bug fixes

## Success Criteria

### Must Have (Blocking Issues)
- [ ] All core admin features functional
- [ ] Portal access working for clients
- [ ] Security requirements met
- [ ] Performance targets achieved
- [ ] Accessibility compliance (AA)

### Should Have (Important)
- [ ] All UI components working
- [ ] Search functionality complete
- [ ] Notifications system functional
- [ ] Error handling comprehensive

### Nice to Have (Enhancements)
- [ ] Advanced search filters
- [ ] Bulk operations
- [ ] Export functionality
- [ ] Advanced analytics

## Bug Tracking

### Severity Levels
- **Critical**: System crashes, data loss, security vulnerabilities
- **High**: Core functionality broken, major UI issues
- **Medium**: Minor functionality issues, UI polish
- **Low**: Cosmetic issues, minor improvements

### Bug Report Template
```
**Title**: Brief description of the issue
**Severity**: Critical/High/Medium/Low
**Environment**: Browser, OS, device
**Steps to Reproduce**: 
1. Step one
2. Step two
3. Step three
**Expected Result**: What should happen
**Actual Result**: What actually happens
**Screenshots**: If applicable
**Additional Notes**: Any other relevant information
```

## Sign-off Checklist

### Development Team
- [ ] All features implemented
- [ ] Code review completed
- [ ] Unit tests passing
- [ ] Integration tests passing

### QA Team
- [ ] All test cases executed
- [ ] Critical bugs resolved
- [ ] Performance targets met
- [ ] Security requirements verified

### Product Team
- [ ] Requirements met
- [ ] User experience approved
- [ ] Documentation complete
- [ ] Training materials ready

### Final Approval
- [ ] **QA Lead**: _________________ Date: _______
- [ ] **Dev Lead**: _________________ Date: _______
- [ ] **Product Owner**: _____________ Date: _______

---

**Document Version**: 1.0  
**Last Updated**: [Current Date]  
**Next Review**: [Date + 1 month]
