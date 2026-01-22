import { NextResponse } from 'next/server';

export async function GET(){
  return NextResponse.json({ requests:[ { id:'r1', title:'KYC Docs', status:'open' }, { id:'r2', title:'Year-end package', status:'open' } ] });
}

export async function POST(req: Request){
  const body = await req.json().catch(()=>({}));
  return NextResponse.json({ ok:true, request:{ id:'r_new', ...body, status:'open' } });
}
