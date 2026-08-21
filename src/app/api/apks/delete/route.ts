import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { FALLBACK_APK } from '@/lib/apks';
import { getDb } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { version } = await request.json();
    if (!version) {
      return NextResponse.json({ error: 'Version is required' }, { status: 400 });
    }

    // Prevent deleting the fallback APK version
    if (version === FALLBACK_APK.version) {
      return NextResponse.json({ error: 'Cannot delete fallback APK' }, { status: 400 });
    }

    const db = getDb();
    const apk = db.prepare("SELECT * FROM apks WHERE version = ?").get(version) as any;
    
    if (!apk) {
      return NextResponse.json({ error: 'APK release not found in database' }, { status: 404 });
    }

    if (apk.isFallback === 1) {
      return NextResponse.json({ error: 'Cannot delete fallback APK' }, { status: 400 });
    }

    // Delete from Vercel Blob if it was uploaded there
    if (apk.url.includes('public.blob.vercel-storage.com')) {
      const token = process.env.BLOB_READ_WRITE_TOKEN;
      if (token) {
        try {
          await del(apk.url, { token });
        } catch (err) {
          console.error('Failed to delete Vercel Blob file:', err);
        }
      }
    }

    // Delete from SQLite
    db.prepare("DELETE FROM apks WHERE version = ?").run(version);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}


