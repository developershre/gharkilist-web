import { getSortedApks } from '@/lib/apks';
import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const apks = await getSortedApks();
  return NextResponse.json(apks);
}

export async function POST(request: Request) {
  try {
    const apk = await request.json();
    if (!apk.url || !apk.version) {
      return NextResponse.json({ error: 'URL and version are required' }, { status: 400 });
    }

    const db = getDb();
    const newApk = {
      url: apk.url,
      pathname: apk.pathname || apk.url.split('/').pop() || `GharKiList-v${apk.version}.apk`,
      size: apk.size || 0,
      uploadedAt: new Date().toISOString(),
      version: apk.version,
      isFallback: 0,
    };

    db.prepare(`
      INSERT OR REPLACE INTO apks (url, pathname, size, uploadedAt, version, isFallback)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      newApk.url,
      newApk.pathname,
      newApk.size,
      newApk.uploadedAt,
      newApk.version,
      newApk.isFallback
    );

    return NextResponse.json(newApk, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}


