import { getSortedApks } from '@/lib/apks';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const apks = await getSortedApks();
  const latest = apks[0];

  // Resolve relative URLs to absolute ones as Next.js redirects require absolute URLs
  let redirectUrl = latest.url;
  if (redirectUrl.startsWith('/')) {
    const { origin } = new URL(request.url);
    redirectUrl = `${origin}${redirectUrl}`;
  }

  // Issue a 307 Temporary Redirect to the actual APK URL
  return NextResponse.redirect(redirectUrl, { status: 307 });
}
