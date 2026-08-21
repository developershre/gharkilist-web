import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

// HTML Parsing Helpers
function cleanHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTitle(html: string, fallback: string): string {
  // Try to find first heading tag h1, h2, h3 or bold tag
  const match = html.match(/<(h1|h2|h3|b|strong)[^>]*>(.*?)<\/\1>/i);
  if (match && match[2]) {
    const titleText = cleanHtml(match[2]);
    if (titleText) return titleText;
  }
  
  // Otherwise, take the first 50 characters of plain text
  const plain = cleanHtml(html);
  if (plain) {
    const limit = 50;
    return plain.length > limit ? plain.substring(0, limit) + '...' : plain;
  }
  
  return fallback;
}

function extractExcerpt(html: string): string {
  const plain = cleanHtml(html);
  if (plain) {
    const limit = 150;
    return plain.length > limit ? plain.substring(0, limit) + '...' : plain;
  }
  return '';
}

function extractVersion(html: string): string | undefined {
  const plain = cleanHtml(html);
  // Search for version numbers e.g. v1.0.0 or 0.0.6
  const match = plain.match(/\bv?(\d+\.\d+(?:\.\d+)?(?:\+\d+)?)\b/);
  return match ? `v${match[1]}` : undefined;
}

function extractCategory(html: string): 'release' | 'feature' | 'improvement' {
  const plain = cleanHtml(html).toLowerCase();
  if (plain.includes('feature') || plain.includes('सुविधा') || plain.includes('फीचर')) {
    return 'feature';
  }
  if (plain.includes('improvement') || plain.includes('सुधार') || plain.includes('अनुकूलन')) {
    return 'improvement';
  }
  return 'release';
}

// Live Translation Helpers
async function translateText(text: string): Promise<string> {
  if (!text.trim()) return '';
  // Check if it's purely a version number or symbol list to avoid translation side effects
  if (/^[v\d\s.+\-/_*#()\[\]{}]+$/i.test(text)) {
    return text;
  }
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) return text;
    const json = await res.json();
    if (json && json[0]) {
      return json[0].map((item: any) => item[0]).join('');
    }
  } catch (error) {
    console.error('Translation error:', error);
  }
  return text;
}

async function translateHtml(html: string): Promise<string> {
  if (!html) return '';
  // Split HTML into tag tokens and text content tokens
  const chunks = html.split(/(<[^>]+>)/g);
  const translatedChunks = await Promise.all(
    chunks.map(async (chunk) => {
      // Keep HTML tags intact
      if (chunk.startsWith('<') && chunk.endsWith('>')) {
        return chunk;
      }
      // Keep pure whitespace intact
      if (!chunk.trim()) {
        return chunk;
      }
      // Translate text blocks
      return await translateText(chunk);
    })
  );
  return translatedChunks.join('');
}

export async function GET() {
  try {
    const db = getDb();
    const rows = db.prepare("SELECT * FROM blogs ORDER BY createdAt DESC").all() as any[];
    
    const blogs = rows.map(row => ({
      ...row,
      bullets_en: row.bullets_en ? JSON.parse(row.bullets_en) : [],
      bullets_hi: row.bullets_hi ? JSON.parse(row.bullets_hi) : [],
      content_en: row.content_en || '',
      content_hi: row.content_hi || '',
    }));
    
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();
    
    const content_en = body.content_en || '';
    let content_hi = body.content_hi || '';

    // Auto-translate English content to Hindi if Hindi is not provided
    if (content_en && (!content_hi || cleanHtml(content_hi) === '')) {
      content_hi = await translateHtml(content_en);
    }
    
    const id = `update-${Date.now()}`;
    const version = extractVersion(content_en) || extractVersion(content_hi) || '';
    const category = extractCategory(content_en);
    const title_en = extractTitle(content_en, 'New Update');
    const title_hi = extractTitle(content_hi, 'नया अपडेट');
    const excerpt_en = extractExcerpt(content_en);
    const excerpt_hi = extractExcerpt(content_hi);
    
    const date_en = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const date_hi = new Date().toLocaleDateString('hi-IN', { month: 'long', day: 'numeric', year: 'numeric' });
    const bullets_en = JSON.stringify([]);
    const bullets_hi = JSON.stringify([]);
    const apkLink = body.apkLink || '/api/apks/latest';
    const apkSize = body.apkSize || '';
    const createdAt = new Date().toISOString();

    db.prepare(`
      INSERT INTO blogs (id, version, date_en, date_hi, title_en, title_hi, category, excerpt_en, excerpt_hi, bullets_en, bullets_hi, apkLink, apkSize, content_en, content_hi, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, version, date_en, date_hi, title_en, title_hi, category, excerpt_en, excerpt_hi, bullets_en, bullets_hi, apkLink, apkSize, content_en, content_hi, createdAt);

    const newPost = {
      id, version, date_en, date_hi, title_en, title_hi, category, excerpt_en, excerpt_hi, 
      bullets_en: [], 
      bullets_hi: [], 
      apkLink, apkSize, content_en, content_hi, createdAt
    };

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const db = getDb();

    // Check if post exists
    const post = db.prepare("SELECT * FROM blogs WHERE id = ?").get(id) as any;
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Auto-update metadata and translate if content_en is changing
    if (updates.content_en !== undefined) {
      // Auto-translate English content to Hindi if Hindi content is not explicitly provided or is blank
      if (updates.content_hi === undefined || !updates.content_hi || cleanHtml(updates.content_hi) === '') {
        updates.content_hi = await translateHtml(updates.content_en);
      }
      
      updates.title_en = extractTitle(updates.content_en, 'Update');
      updates.excerpt_en = extractExcerpt(updates.content_en);
      updates.category = extractCategory(updates.content_en);
      updates.version = extractVersion(updates.content_en) || updates.version || post.version || '';
    }
    if (updates.content_hi !== undefined) {
      updates.title_hi = extractTitle(updates.content_hi, 'अपडेट');
      updates.excerpt_hi = extractExcerpt(updates.content_hi);
    }

    // Build updates query dynamically
    const keys = Object.keys(updates);
    if (keys.length > 0) {
      const setClause = keys.map(key => `${key} = ?`).join(', ');
      const values = keys.map(key => {
        const val = updates[key];
        if (key === 'bullets_en' || key === 'bullets_hi') {
          return JSON.stringify(val);
        }
        return val;
      });
      values.push(id);

      db.prepare(`UPDATE blogs SET ${setClause} WHERE id = ?`).run(...values);
    }

    const updatedPost = db.prepare("SELECT * FROM blogs WHERE id = ?").get(id) as any;
    return NextResponse.json({
      ...updatedPost,
      bullets_en: updatedPost.bullets_en ? JSON.parse(updatedPost.bullets_en) : [],
      bullets_hi: updatedPost.bullets_hi ? JSON.parse(updatedPost.bullets_hi) : [],
      content_en: updatedPost.content_en || '',
      content_hi: updatedPost.content_hi || '',
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const db = getDb();
    db.prepare("DELETE FROM blogs WHERE id = ?").run(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
