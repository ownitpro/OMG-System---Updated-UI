import { NextResponse } from 'next/server';

export async function GET(){
  return NextResponse.json({ uploadsPerDay:[1,0,2,0,1,3,1], ocrPagesPerDay:[5,0,7,0,3,8,4], egressGbPerDay:[0.01,0,0.02,0,0.01,0.03,0.02] });
}

