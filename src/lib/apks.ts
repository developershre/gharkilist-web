export interface ApkRelease {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
  version: string;
  isFallback: boolean;
}

export const FALLBACK_APK: ApkRelease = {
  url: 'https://github.com/developershre/gharkilist/releases/tag/beta-v0.0.6',
  pathname: 'GharKiList-vbeta_0.0.6-Modern_Phones-64bit.apk',
  size: 22031124,
  uploadedAt: new Date('2026-08-19T22:48:00Z').toISOString(),
  version: '0.0.6',
  isFallback: true,
};

export const OLDER_APKS: ApkRelease[] = [
  {
    url: 'https://github.com/developershre/gharkilist/releases/tag/beta-v0.0.6',
    pathname: 'gharkilist-v0.0.6-Modern_Phones-64bit.apk',
    size: 22031124,
    uploadedAt: new Date('2026-08-19T22:00:00Z').toISOString(),
    version: '0.0.6',
    isFallback: false,
  },
  {
    url: 'https://github.com/developershre/gharkilist/releases/tag/beta-v0.0.6',
    pathname: 'gharkilist-v0.0.6-Older_Phones-32bit.apk',
    size: 19542056,
    uploadedAt: new Date('2026-08-19T22:00:00Z').toISOString(),
    version: '0.0.6',
    isFallback: false,
  },
  {
    url: 'https://github.com/developershre/gharkilist/releases/tag/beta-v0.0.6',
    pathname: 'gharkilist-v0.0.6-PC_Emulators-x86_64.apk',
    size: 23423408,
    uploadedAt: new Date('2026-08-19T22:00:00Z').toISOString(),
    version: '0.0.6',
    isFallback: false,
  },
  {
    url: 'https://github.com/developershre/gharkilist/releases/tag/beta-v0.0.5',
    pathname: 'gharkilist-v0.0.5',
    size: 0,
    uploadedAt: new Date('2026-08-19T22:00:00Z').toISOString(),
    version: '0.0.5',
    isFallback: false,
  },
  {
    url: 'https://github.com/developershre/gharkilist/releases/tag/beta-v0.0.4',
    pathname: 'gharkilist-v0.0.4',
    size: 0,
    uploadedAt: new Date('2026-08-19T18:00:00Z').toISOString(),
    version: '0.0.4',
    isFallback: false,
  },
  {
    url: 'https://github.com/developershre/gharkilist/releases/tag/beta-v0.0.3',
    pathname: 'gharkilist-v0.0.3',
    size: 0,
    uploadedAt: new Date('2026-08-17T18:00:00Z').toISOString(),
    version: '0.0.3',
    isFallback: false,
  },
  {
    url: 'https://github.com/developershre/gharkilist/releases/tag/beta-v0.0.2',
    pathname: 'gharkilist-v0.0.2',
    size: 0,
    uploadedAt: new Date('2026-08-16T18:00:00Z').toISOString(),
    version: '0.0.2',
    isFallback: false,
  },
  {
    url: 'https://github.com/developershre/gharkilist/releases/tag/beta-v0.0.1',
    pathname: 'gharkilist-v0.0.1',
    size: 0,
    uploadedAt: new Date('2026-08-14T18:00:00Z').toISOString(),
    version: '0.0.1',
    isFallback: false,
  }
];

export function parseVersion(pathname: string): string {
  // Matches version patterns like v1.0.0, v1.0.1, 0.0.6, etc.
  const match = pathname.match(/v?(\d+\.\d+(?:\.\d+)?(?:-[a-zA-Z0-9.]+)?)/i);
  return match ? match[1] : '0.0.0';
}

export function compareVersions(a: string, b: string): number {
  const cleanA = a.replace(/^v/i, '');
  const cleanB = b.replace(/^v/i, '');

  const aParts = cleanA.split(/[.-]/).map(x => parseInt(x, 10) || 0);
  const bParts = cleanB.split(/[.-]/).map(x => parseInt(x, 10) || 0);

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
