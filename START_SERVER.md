# 🚀 Start OMGsystems Development Server

## Quick Start Commands

```bash
# Navigate to project directory
cd /Users/prince/Documents/Omgsystems-Website/omgsystems-website

# Start development server
npm run dev
```

## Test Credentials

**Admin User:**
- Email: `admin@testorg.com`
- Password: `any password` (MVP authentication is simplified)
- Role: `ADMIN`
- Organization: `Test Organization`

## Testing URLs

### **Public Pages**
- Home: `http://localhost:3000/`
- Login: `http://localhost:3000/login`

### **Admin Interface** (Requires ADMIN/STAFF role)
- Admin Dashboard: `http://localhost:3000/admin`
- Organizations: `http://localhost:3000/admin/orgs`
- Demos: `http://localhost:3000/admin/demos`
- Test Org Detail: `http://localhost:3000/admin/orgs/test-org`

### **Client Portal** (Requires CLIENT/ADMIN/STAFF role)
- Portal Dashboard: `http://localhost:3000/portal`
- Onboarding: `http://localhost:3000/portal/onboarding`
- Documents: `http://localhost:3000/portal/documents`
- Billing: `http://localhost:3000/portal/billing`
- Support: `http://localhost:3000/portal/support`
- Profile: `http://localhost:3000/portal/profile`

## Testing Checklist

### ✅ **Authentication Testing**
1. Navigate to `/login`
2. Login with test credentials
3. Verify redirect to appropriate interface
4. Test logout functionality

### ✅ **Admin Interface Testing**
1. Access `/admin` routes
2. Verify sidebar navigation
3. Test organization management
4. Check demo tracking
5. Verify user management

### ✅ **Portal Interface Testing**
1. Access `/portal` routes
2. Verify client-safe navigation
3. Test document access
4. Check billing information
5. Verify support ticket system

### ✅ **Security Testing**
1. Try accessing protected routes without login
2. Verify redirect to login page
3. Test role-based access control
4. Check organization data isolation

## Troubleshooting

### **Server Won't Start**
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill any existing processes
pkill -f "next"

# Try starting again
npm run dev
```

### **Database Connection Issues**
```bash
# Check database connection
npx prisma db push

# Regenerate Prisma client
npx prisma generate
```

### **Build Errors**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

## Expected Behavior

1. **Server starts** on `http://localhost:3000`
2. **Home page loads** with OMGsystems branding
3. **Login page** accessible at `/login`
4. **Admin interface** accessible after login with ADMIN role
5. **Portal interface** accessible after login with any role
6. **Route protection** prevents unauthorized access
7. **Data displays** correctly from seeded test data

## Success Indicators

✅ Server starts without errors
✅ Home page loads successfully
✅ Login page is accessible
✅ Authentication works with test credentials
✅ Admin interface loads with proper navigation
✅ Portal interface loads with client-safe features
✅ Route protection prevents unauthorized access
✅ Test data displays correctly

---

**Ready to test!** 🎯
