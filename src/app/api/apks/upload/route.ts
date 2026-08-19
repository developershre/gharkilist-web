import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Upload feature is currently disabled.' },
    { status: 501 }
  );
}
