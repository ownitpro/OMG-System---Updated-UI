import { NextResponse } from 'next/server';
import { mockStore } from '@/lib/marketplace/mockStore';

export async function GET() {
  return NextResponse.json({ items: mockStore.templates });
}

