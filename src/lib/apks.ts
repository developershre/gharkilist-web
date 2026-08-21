import { getDb } from './db';

export interface ApkRelease {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
  version: string;
  isFallback: boolean;
}

export const FALLBACK_APK: ApkRelease = {
  url: 'https://zbswyacaz2jb2esm.public.blob.vercel-storage.com/GharKiList-vbeta_0.0.6%2B2.apk',
  pathname: 'GharKiList-vbeta_0.0.6+2.apk',
  size: 28442720,
  uploadedAt: new Date('2026-08-20T15:36:27Z').toISOString(),
  version: '0.0.6+2',
  isFallback: true,
};

export const OLDER_APKS: ApkRelease[] = [];

export function parseVersion(pathname: string): string {
  const match = pathname.match(/v?(\d+\.\d+(?:\.\d+)?(?:\+\d+)?(?:-[a-zA-Z0-9.]+)?)/i);
  return match ? match[1] : '0.0.0';
}

export function compareVersions(a: string, b: string): number {
  const cleanA = a.replace(/^v/i, '');
  const cleanB = b.replace(/^v/i, '');

  const aParts = cleanA.split(/[.+/-]/).map(x => parseInt(x, 10) || 0);
  const bParts = cleanB.split(/[.+/-]/).map(x => parseInt(x, 10) || 0);

  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const aVal = aParts[i] || 0;
    const bVal = bParts[i] || 0;
    if (aVal !== bVal) {
      return aVal - bVal;
    }
  }
  return 0;
}

export async function getSortedApks(): Promise<ApkRelease[]> {
  try {
    const db = getDb();
    const rows = db.prepare("SELECT * FROM apks").all() as any[];
    
    const apks: ApkRelease[] = rows.map(row => ({
      url: row.url,
      pathname: row.pathname,
      size: row.size,
      uploadedAt: row.uploadedAt,
      version: row.version,
      isFallback: row.isFallback === 1 || row.url === FALLBACK_APK.url,
    }));

    if (apks.length === 0) {
      return [FALLBACK_APK];
    }

    return apks.sort((a, b) => compareVersions(b.version, a.version));
  } catch (error) {
    console.error('Error fetching APKs from SQLite database:', error);
    return [FALLBACK_APK];
  }
}


