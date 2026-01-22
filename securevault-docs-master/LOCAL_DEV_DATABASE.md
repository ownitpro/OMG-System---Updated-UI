# Database Setup Guide

This guide walks through setting up PostgreSQL for SecureVault Docs development.

---

## Prerequisites

- Node.js 20.11+ installed
- PostgreSQL 15+ installed locally
- Project dependencies installed (`npm install`)

---

## Step 1: Install PostgreSQL

### Option A: Windows Installer (Recommended)

1. Download from https://www.postgresql.org/download/windows/
2. Run the installer
3. During installation:
   - **Password**: `password` (or your choice - remember it!)
   - **Port**: `5432` (default)
   - **Locale**: Default
4. Uncheck "Stack Builder" at the end

### Option B: Chocolatey

```powershell
choco install postgresql15 --params '/Password:password'
```

### Option C: Winget

```powershell
winget install PostgreSQL.PostgreSQL
```

---

## Step 2: Verify PostgreSQL Installation

Open a new terminal and run:

```bash
psql --version
```

You should see output like: `psql (PostgreSQL) 15.x`

---

## Step 3: Create Database

### Windows Command Prompt

```cmd
psql -U postgres
```

Enter the password you set during installation.

### Create the Database

Once in the PostgreSQL prompt:

```sql
CREATE DATABASE securevault;
\q
```

---

## Step 4: Configure Environment Variables

### Create `.env.local`

Copy the example file:

```bash
copy .env.local.example .env.local
```

### Update Database Connection

Open `.env.local` and ensure the `DATABASE_URL` matches your PostgreSQL setup:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/securevault?schema=public"
```

**Important**: Replace `password` with your actual PostgreSQL password if different.

---

## Step 5: Push Schema to Database

Run the following command to create all tables:

```bash
npm run db:push
```

This will:
- Connect to your PostgreSQL database
- Create all 22 tables defined in `prisma/schema.prisma`
- Set up indexes and relationships

**Expected Output:**

```
Environment variables loaded from .env.local
Prisma schema loaded from prisma\schema.prisma
Datasource "db": PostgreSQL database "securevault" at "localhost:5432"

🚀  Your database is now in sync with your Prisma schema. Done in 2.45s
```

---

## Step 6: Generate Prisma Client

Generate the TypeScript client for database operations:

```bash
npm run db:generate
```

**Expected Output:**

```
✔ Generated Prisma Client (v7.0.0) to .\src\generated\prisma in 345ms
```

---

## Step 7: Seed Database with Test Data

Populate the database with sample organizations, users, documents, and portals:

```bash
npm run db:seed
```

**Expected Output:**

```
🌱 Starting database seed...
🧹 Cleaning existing data...
🏢 Creating organizations...
👤 Creating users...
📁 Creating folders...
📄 Creating documents...
📋 Creating request templates...
🚪 Creating portals...
📊 Creating usage records...
📝 Creating audit logs...

✅ Database seeded successfully!

📊 Summary:
   Organizations: 2
   Users: 5
   Personal Vaults: 1
   Folders: 5
   Documents: 4
   Templates: 3
   Portals: 2

🔑 Test Accounts:
   Business Owner: john@acme-accounting.com
   Business Admin: sarah@acme-accounting.com
   Business Member: mike@acme-accounting.com
   Personal User: alex@personal.com
```

---

## Step 8: Explore Database (Optional)

Open Prisma Studio - a visual database browser:

```bash
npm run db:studio
```

This opens a GUI at `http://localhost:5555` where you can:
- View all tables and data
- Edit records
- Run queries
- Explore relationships

---

## Database Schema Overview

Your database now contains **22 models**:

### Core Models
- `User` - User accounts
- `Organization` - Business accounts
- `PersonalVault` - Individual user vaults
- `Account`, `Session`, `VerificationToken` - NextAuth.js auth

### Documents
- `Folder` - Hierarchical folder structure
- `Document` - Document records
- `DocumentVersion` - Version history

### Client Portals
- `Portal` - Client portal instances
- `PortalRequest` - Document requests
- `PortalSubmission` - Submitted documents
- `GuestToken` - Guest access tokens
- `RequestTemplate`, `RequestTemplateItem` - Request templates

### Sharing
- `ShareLink` - Secure share links
- `ShareLinkAccess` - Access logs

### Billing & Usage
- `Connector` - Drive integrations
- `UsageRecord` - Usage tracking
- `UsageAlert` - Threshold alerts
- `Invoice` - Billing invoices

### Audit
- `AuditLog` - All system events

---

## Useful Commands

| Command | Description |
|---------|-------------|
| `npm run db:push` | Push schema changes to database |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:seed` | Seed database with test data |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:migrate` | Create a new migration |
| `npm run db:reset` | Reset database (drop & recreate) |

---

## Troubleshooting

### Error: "Can't reach database server"

**Cause**: PostgreSQL is not running.

**Solution**:
- Windows: Check Services (Win+R → `services.msc` → PostgreSQL)
- Or restart: `net stop postgresql-x64-15 && net start postgresql-x64-15`

### Error: "password authentication failed"

**Cause**: Incorrect password in `DATABASE_URL`.

**Solution**: Update `.env.local` with correct password.

### Error: "database does not exist"

**Cause**: Database not created.

**Solution**: Run `psql -U postgres` then `CREATE DATABASE securevault;`

### Error: "Port 5432 already in use"

**Cause**: Another PostgreSQL instance or app using port.

**Solution**:
1. Check running instances: `netstat -ano | findstr :5432`
2. Use different port in both PostgreSQL config and `DATABASE_URL`

---

## Next Steps

After completing database setup:

1. ✅ **Database is ready!**
2. ➡️ **Implement Authentication** (Phase 2: Auth.js with Google/Microsoft OAuth)
3. ➡️ **Replace Mock Data** (Update API routes to use Prisma instead of mock DBs)

See [TODO.md](TODO.md) for full development roadmap.

---

## Database Diagram

```
┌─────────────┐     ┌──────────────┐     ┌───────────────┐
│Organization │────<│     User     │────>│ PersonalVault │
└─────────────┘     └──────────────┘     └───────────────┘
       │                    │                     │
       ├───────────┬────────┴─────┬──────────────┤
       │           │              │              │
   ┌────────┐  ┌─────────┐  ┌─────────┐    ┌──────────┐
   │Document│  │ Folder  │  │ Portal  │    │AuditLog  │
   └────────┘  └─────────┘  └─────────┘    └──────────┘
       │                         │
   ┌───────────┐         ┌──────────────┐
   │ShareLink  │         │PortalRequest │
   └───────────┘         └──────────────┘
```

---

*For production deployment, see [DEPLOYMENT.md](DEPLOYMENT.md) (coming soon)*
