import { getSortedApks } from '@/lib/apks';
import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const apks = await getSortedApks();
  if (apks.length === 0) {
    return NextResponse.json({ error: 'No APKs found' }, { status: 404 });
  }
  const latest = apks[0];

  // Increment download count
  try {
    const db = getDb();
    db.prepare("UPDATE apks SET downloads = downloads + 1 WHERE version = ?").run(latest.version);
  } catch (err) {
    console.error('Failed to increment download count:', err);
  }

  // Resolve relative URLs to absolute ones as Next.js redirects require absolute URLs
  let redirectUrl = latest.url;
  if (redirectUrl.startsWith('/')) {
    const { origin } = new URL(request.url);
    redirectUrl = `${origin}${redirectUrl}`;
  }

  // Issue a 307 Temporary Redirect to the actual APK URL
  return NextResponse.redirect(redirectUrl, { status: 307 });
}
