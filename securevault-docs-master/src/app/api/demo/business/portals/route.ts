import { NextResponse } from 'next/server';

export async function GET(){
  return NextResponse.json({ portals: [ { id:'p1', name:'Acme Corp', email:'ops@acme.com', createdAt:'2025-11-01T12:00:00Z' }, { id:'p2', name:'Maple Homes', email:'admin@maple.homes', createdAt:'2025-11-03T09:00:00Z' } ] });
}

export async function POST(req: Request){
  const body = await req.json().catch(()=>({}));
  return NextResponse.json({ ok:true, portal:{ id:'p_new', ...body, createdAt:new Date().toISOString() } });
}
