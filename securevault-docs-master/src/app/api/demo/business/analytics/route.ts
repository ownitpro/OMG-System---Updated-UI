import { NextResponse } from 'next/server';

export async function GET(){
  return NextResponse.json({
    uploadsPerDay: [4,6,2,9,7,5,8],
    ocrPagesPerDay: [20,10,40,12,30,25,33],
    egressGbPerDay: [0.1,0.2,0.05,0.3,0.15,0.18,0.22]
  });
}
