import { getSortedApks } from '@/lib/apks';
import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const version = searchParams.get('version');

    const db = getDb();
    const apks = await getSortedApks();

    if (apks.length === 0) {
      return NextResponse.json({ error: 'No APKs found' }, { status: 404 });
    }

    let selectedApk = apks[0]; // fallback to latest
    if (version) {
      const found = apks.find(a => a.version === version);
      if (found) selectedApk = found;
    }

    // Increment download count in SQLite
    try {
      db.prepare("UPDATE apks SET downloads = downloads + 1 WHERE version = ?").run(selectedApk.version);
    } catch (err) {
      console.error('Failed to increment download count:', err);
    }

    // Resolve relative URLs to absolute ones
    let redirectUrl = selectedApk.url;
    if (redirectUrl.startsWith('/')) {
      const { origin } = new URL(request.url);
      redirectUrl = `${origin}${redirectUrl}`;
    }

    return NextResponse.redirect(redirectUrl, { status: 307 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
