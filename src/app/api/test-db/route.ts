import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Simple query to test the connection
    const result = await prisma.$queryRaw`SELECT 1 as test` as Array<{ test: number }>;

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      result: Number(result[0]?.test ?? 0)
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
