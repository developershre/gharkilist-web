import { getSortedApks } from '@/lib/apks';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const apks = await getSortedApks();
  return NextResponse.json(apks);
}
