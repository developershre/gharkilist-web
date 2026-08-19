import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  return NextResponse.json(
    { error: 'Delete feature is currently disabled.' },
    { status: 501 }
  );
}
