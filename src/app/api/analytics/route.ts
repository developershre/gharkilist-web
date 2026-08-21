import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();
    
    // Get page visits
    const visits = db.prepare("SELECT * FROM visits").all() as any[];
    
    // Get download counts
    const downloads = db.prepare("SELECT version, pathname, downloads, uploadedAt FROM apks ORDER BY version DESC").all() as any[];
    
    // Calculate sums
    const totalVisits = visits.reduce((acc, curr) => acc + (curr.count || 0), 0);
    const totalDownloads = downloads.reduce((acc, curr) => acc + (curr.downloads || 0), 0);

    return NextResponse.json({
      visits,
      downloads,
      totalVisits,
      totalDownloads
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { page } = await request.json();
    if (!page) {
      return NextResponse.json({ error: 'Page is required' }, { status: 400 });
    }

    const db = getDb();
    db.prepare(`
      INSERT INTO visits (page, count)
      VALUES (?, 1)
      ON CONFLICT(page) DO UPDATE SET count = count + 1
    `).run(page);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
