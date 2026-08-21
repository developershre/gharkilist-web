// @ts-ignore
import { DatabaseSync } from 'node:sqlite';
import path from 'path';

let dbInstance: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (dbInstance) return dbInstance;

  // Locate db file in workspace root
  const dbPath = path.resolve(process.cwd(), 'sqlite.db');
  const db = new DatabaseSync(dbPath);
  dbInstance = db;

  // 1. Create tables if they do not exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS apks (
      url TEXT NOT NULL,
      pathname TEXT NOT NULL,
      size INTEGER NOT NULL,
      uploadedAt TEXT NOT NULL,
      version TEXT PRIMARY KEY,
      isFallback INTEGER DEFAULT 0,
      downloads INTEGER DEFAULT 0
    );
  `);

  // Migration: Safe check to add downloads column to apks if the database exists from before
  try {
    db.exec(`ALTER TABLE apks ADD COLUMN downloads INTEGER DEFAULT 0;`);
  } catch (e) {
    // Column already exists, ignore
  }

  db.exec(`
    CREATE TABLE IF NOT EXISTS visits (
      page TEXT PRIMARY KEY,
      count INTEGER DEFAULT 0
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS blogs (
      id TEXT PRIMARY KEY,
      version TEXT,
      date_en TEXT NOT NULL,
      date_hi TEXT NOT NULL,
      title_en TEXT NOT NULL,
      title_hi TEXT NOT NULL,
      category TEXT NOT NULL,
      excerpt_en TEXT,
      excerpt_hi TEXT,
      bullets_en TEXT, -- Stringified JSON array
      bullets_hi TEXT, -- Stringified JSON array
      apkLink TEXT,
      apkSize TEXT,
      content_en TEXT, -- Rich HTML text
      content_hi TEXT, -- Rich HTML text
      createdAt TEXT NOT NULL
    );
  `);

  // 2. Seed tables if they are empty
  seedData(db);

  return db;
}

function seedData(db: DatabaseSync) {
  // Seed fallback APK
  const apkCountResult = db.prepare("SELECT COUNT(*) as count FROM apks").all() as any[];
  const apkCount = apkCountResult[0]?.count ?? 0;
  if (apkCount === 0) {
    db.prepare(`
      INSERT INTO apks (url, pathname, size, uploadedAt, version, isFallback)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      'https://zbswyacaz2jb2esm.public.blob.vercel-storage.com/GharKiList-vbeta_0.0.6%2B2.apk',
      'GharKiList-vbeta_0.0.6+2.apk',
      28442720,
      new Date('2026-08-20T15:36:27Z').toISOString(),
      '0.0.6+2',
      1
    );
  }

  // Seed initial blog posts
  const blogCountResult = db.prepare("SELECT COUNT(*) as count FROM blogs").all() as any[];
  const blogCount = blogCountResult[0]?.count ?? 0;
  if (blogCount === 0) {
    const initialPosts = [
      {
        id: 'update-006',
        version: 'v0.0.6+1',
        date_en: 'August 20, 2026',
        date_hi: '20 अगस्त, 2026',
        title_en: 'v0.0.6+1 — Installation Bug Fix',
        title_hi: 'v0.0.6+1 — इंस्टॉलेशन बग फिक्स',
        category: 'release',
        excerpt_en: 'This release fixes installation issues and consolidates to a universal APK for all device architectures.',
        excerpt_hi: 'यह रिलीज़ इंस्टॉलेशन समस्याओं को ठीक करती है और सभी डिवाइस आर्किटेक्चर के लिए एक यूनिवर्सल APK में समेकित करती है।',
        bullets_en: JSON.stringify([
          "Universal APK: Single APK containing native libraries for all supported architectures (ARM64, ARM32, x86_64).",
          "V1/V2 Signing: Enabled both signing configurations for consistent validation across Android versions.",
          "Native Library Extraction: Set extractNativeLibs=true to prevent installation crashes."
        ]),
        bullets_hi: JSON.stringify([
          "यूनिवर्सल APK: सभी समर्थित आर्किटेक्चर के लिए नेटिव लाइब्रेरी वाला एकल APK।",
          "V1/V2 साइनिंग: Android संस्करणों में सुसंगत सत्यापन के लिए दोनों साइनिंग कॉन्फ़िगरेशन सक्षम।",
          "नेटिव लाइब्रेरी एक्सट्रैक्शन: इंस्टॉलेशन क्रैश को रोकने के लिए extractNativeLibs=true सेट।"
        ]),
        apkLink: '/api/apks/latest',
        apkSize: '~27 MB',
        content_en: '',
        content_hi: '',
        createdAt: new Date('2026-08-20T08:22:18Z').toISOString()
      },
      {
        id: 'update-005',
        version: 'v0.0.6',
        date_en: 'August 19, 2026',
        date_hi: '19 अगस्त, 2026',
        title_en: 'v0.0.6 — Fixed Drag and Drop Feature',
        title_hi: 'v0.0.6 — ड्रैग एंड ड्रॉप फीचर फिक्स किया गया',
        category: 'improvement',
        excerpt_en: 'This release resolves a critical issue with the drag-and-drop item reordering when list filters or search queries are active.',
        excerpt_hi: 'यह रिलीज़ सक्रिय फ़िल्टर या खोज क्वेरी होने पर ड्रैग-एंड-ड्रॉप आइटम रीऑर्डरिंग से संबंधित एक महत्वपूर्ण समस्या का समाधान करता है।',
        bullets_en: JSON.stringify([
          "Drag-and-Drop Reordering: Fixed incorrect index mapping when reordering items while filtering by category, search query, or stock status.",
          "Visual Order Mapping: The reorder logic now correctly maps visual list positions back to database order indexes."
        ]),
        bullets_hi: JSON.stringify([
          "ड्रैग-एंड-ड्रॉप रीऑर्डरिंग: श्रेणी, खोज क्वेरी या स्टॉक स्थिति के अनुसार फ़िल्टर करते समय आइटम रीऑर्डरिंग में गलत इंडेक्स मैपिंग को ठीक किया गया।",
          "विज़ुअल ऑर्डर मैपिंग: रीऑर्डर लॉजिक अब विज़ुअल सूची की स्थिति को डेटाबेस ऑर्डर इंडेक्स पर सही ढंग से मैप करता है।"
        ]),
        apkLink: '/api/apks/latest',
        apkSize: '~21 MB',
        content_en: '',
        content_hi: '',
        createdAt: new Date('2026-08-19T22:00:00Z').toISOString()
      }
    ];

    const insert = db.prepare(`
      INSERT INTO blogs (id, version, date_en, date_hi, title_en, title_hi, category, excerpt_en, excerpt_hi, bullets_en, bullets_hi, apkLink, apkSize, content_en, content_hi, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const post of initialPosts) {
      insert.run(
        post.id,
        post.version,
        post.date_en,
        post.date_hi,
        post.title_en,
        post.title_hi,
        post.category,
        post.excerpt_en,
        post.excerpt_hi,
        post.bullets_en,
        post.bullets_hi,
        post.apkLink,
        post.apkSize,
        post.content_en,
        post.content_hi,
        post.createdAt
      );
    }
  }

  // Seed visits table
  const visitCountResult = db.prepare("SELECT COUNT(*) as count FROM visits").all() as any[];
  const visitCount = visitCountResult[0]?.count ?? 0;
  if (visitCount === 0) {
    const insertVisit = db.prepare("INSERT INTO visits (page, count) VALUES (?, ?)");
    insertVisit.run('/', 0);
    insertVisit.run('/blog', 0);
  }
}
