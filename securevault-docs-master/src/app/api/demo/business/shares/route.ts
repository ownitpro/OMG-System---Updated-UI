import { NextResponse } from 'next/server';

export async function GET(){
  return NextResponse.json({ shares:[ { id:'s1', label:'KYC', pin:true, expires:'2025-12-31', url:'#' } ] });
}

export async function POST(req: Request){
  const body = await req.json().catch(()=>({}));
  return NextResponse.json({ ok:true, share:{ id:'s_new', ...body, url:'#', pin:!!body.pin } });
}
