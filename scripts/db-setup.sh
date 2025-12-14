#!/bin/bash

# OMGsystems Database Setup Script

echo "🚀 Setting up OMGsystems Database..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

# Check if PostgreSQL container exists
if docker ps -a --format 'table {{.Names}}' | grep -q "omgsystems-postgres"; then
    echo "📦 PostgreSQL container found"
    
    # Check if it's running
    if docker ps --format 'table {{.Names}}' | grep -q "omgsystems-postgres"; then
        echo "✅ PostgreSQL container is already running"
    else
        echo "🔄 Starting PostgreSQL container..."
        docker start omgsystems-postgres
    fi
else
    echo "🆕 Creating new PostgreSQL container..."
    docker run --name omgsystems-postgres \
        -e POSTGRES_PASSWORD=password \
        -e POSTGRES_DB=omgsystems \
        -p 5432:5432 \
        -d postgres:15
fi

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 5

# Set up the database schema
echo "🗄️ Setting up database schema..."
export DATABASE_URL="postgresql://postgres:password@localhost:5432/omgsystems"
npx prisma db push

echo "✅ Database setup complete!"
echo ""
echo "📊 Database Details:"
echo "   Host: localhost"
echo "   Port: 5432"
echo "   Database: omgsystems"
echo "   Username: postgres"
echo "   Password: password"
echo ""
echo "🔗 Connection URL: postgresql://postgres:password@localhost:5432/omgsystems"
echo ""
echo "💡 To start Prisma Studio: npx prisma studio"
echo "💡 To stop the database: docker stop omgsystems-postgres"
echo "💡 To remove the database: docker rm omgsystems-postgres"
