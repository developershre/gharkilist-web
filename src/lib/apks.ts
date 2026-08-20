export interface ApkRelease {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
  version: string;
  isFallback: boolean;
}

export const FALLBACK_APK: ApkRelease = {
  url: 'https://github.com/developershre/gharkilist/releases/download/beta_v0.0.6%2B1/GharKiList-vbeta_0.0.6%2B1.apk',
  pathname: 'GharKiList-vbeta_0.0.6+1.apk',
  size: 28323994,
  uploadedAt: new Date('2026-08-20T08:22:18Z').toISOString(),
  version: '0.0.6+1',
  isFallback: true,
};

export const OLDER_APKS: ApkRelease[] = [
  {
    url: 'https://github.com/developershre/gharkilist/releases/download/beta_v0.0.6%2B1/GharKiList-vbeta_0.0.6%2B1.apk',
    pathname: 'GharKiList-vbeta_0.0.6+1.apk',
    size: 28323994,
    uploadedAt: new Date('2026-08-20T08:22:18Z').toISOString(),
    version: '0.0.6+1',
    isFallback: false,
  },
  {
    url: 'https://github.com/developershre/gharkilist/releases/download/beta-v0.0.6/GharKiList-vbeta_0.0.6-Modern_Phones-64bit.apk',
    pathname: 'GharKiList-vbeta_0.0.6-Modern_Phones-64bit.apk',
    size: 22031124,
    uploadedAt: new Date('2026-08-19T22:00:00Z').toISOString(),
    version: '0.0.6',
    isFallback: false,
  },
];

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
  return [FALLBACK_APK, ...OLDER_APKS];
}
