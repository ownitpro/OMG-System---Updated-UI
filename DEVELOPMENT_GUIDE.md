# OMGsystems Development Guide 🚀

## 🎯 Current Status

### ✅ **Completed**
- Database setup with PostgreSQL
- Prisma schema synchronized
- Test data created (1 user, 1 organization, 1 project)
- All TypeScript compilation errors fixed
- Docker container running

### 🔄 **In Progress**
- Development server startup
- API endpoint testing

### 📋 **Next Steps**

## 🛠️ Development Workflow

### 1. **Start Development Environment**
```bash
# Start Docker (if not running)
open -a Docker

# Start PostgreSQL container
docker start omgsystems-postgres

# Start development server
npm run dev
```

### 2. **Test System Status**
```bash
# Check overall system status
node scripts/check-status.js

# Test database connectivity
node scripts/test-system.js

# Test API endpoints
node scripts/test-api.js
```

### 3. **Database Management**
```bash
# Open Prisma Studio (Database GUI)
npx prisma studio

# Run database migrations
npx prisma db push

# Generate Prisma client
npx prisma generate
```

## 🔐 Authentication System

### Current Setup
- NextAuth.js configured
- Prisma adapter for user management
- Session management ready
- Role-based access control (ADMIN, STAFF, CLIENT)

### Test Authentication
1. **User Registration**
   - Navigate to `/signup`
   - Create test account
   - Verify user created in database

2. **User Login**
   - Navigate to `/login`
   - Login with test credentials
   - Verify session created

3. **Protected Routes**
   - Test `/dashboard` access
   - Test `/admin` access
   - Verify role-based permissions

## 📊 API Endpoints

### Public Endpoints
- `GET /` - Homepage
- `POST /api/contact` - Contact form
- `POST /api/demo/crm` - CRM demo request
- `POST /api/demo/svd` - SecureVault demo request

### Protected Endpoints (Require Authentication)
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `GET /api/invoices` - List invoices
- `POST /api/invoices` - Create invoice
- `GET /api/documents` - List documents
- `POST /api/documents` - Upload document

## 🧪 Testing Strategy

### 1. **Manual Testing**
```bash
# Test homepage
curl http://localhost:3000/

# Test contact API
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message","industry":"Technology"}'

# Test demo APIs
curl -X POST http://localhost:3000/api/demo/crm \
  -H "Content-Type: application/json" \
  -d '{"industry":"Property Management (ON)"}'
```

### 2. **Database Testing**
```bash
# Connect to database
docker exec -it omgsystems-postgres psql -U postgres -d omgsystems

# Run queries
SELECT * FROM users;
SELECT * FROM organizations;
SELECT * FROM projects;
```

### 3. **Frontend Testing**
- Test all pages load correctly
- Test form submissions
- Test navigation
- Test responsive design

## 🚀 Deployment Preparation

### Environment Variables
```bash
# Required for production
DATABASE_URL=postgresql://user:password@host:port/database
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://yourdomain.com
```

### Build Process
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Troubleshooting

### Common Issues

1. **Server Won't Start**
   ```bash
   # Check for port conflicts
   lsof -i :3000
   
   # Kill existing processes
   pkill -f "next dev"
   
   # Restart server
   npm run dev
   ```

2. **Database Connection Issues**
   ```bash
   # Check Docker status
   docker ps
   
   # Restart PostgreSQL
   docker restart omgsystems-postgres
   
   # Test connection
   npx prisma db push
   ```

3. **Build Errors**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   
   # Rebuild
   npm run build
   ```

## 📈 Performance Optimization

### Database
- Add indexes for frequently queried fields
- Optimize Prisma queries
- Use connection pooling

### Frontend
- Optimize images
- Add loading states
- Implement caching
- Use React.memo for components

### API
- Add rate limiting
- Implement caching
- Add request validation
- Use compression

## 🔒 Security Checklist

- [ ] Input validation on all forms
- [ ] SQL injection prevention (Prisma handles this)
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Secure session management
- [ ] File upload validation
- [ ] Environment variable security
- [ ] HTTPS in production

## 📝 Development Notes

### Current Test Data
- **User**: demo@omgsystems.com
- **Organization**: OMGsystems Demo
- **Project**: Demo Project

### Key Features to Test
1. User authentication and authorization
2. Project management
3. Document upload and management
4. Invoice generation
5. Contact form processing
6. Demo request handling

### Next Development Priorities
1. Complete API endpoint testing
2. Implement user dashboard
3. Add file upload functionality
4. Test email notifications
5. Add admin panel features
