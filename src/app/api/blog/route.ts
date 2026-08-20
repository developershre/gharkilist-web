import { NextResponse } from 'next/server';
import { INITIAL_BLOG_POSTS, BlogUpdate } from '@/lib/blog-data';

export const dynamic = 'force-dynamic';

let blogPosts: BlogUpdate[] = [...INITIAL_BLOG_POSTS];

export async function GET() {
  return NextResponse.json(blogPosts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newPost: BlogUpdate = {
      ...body,
      id: `update-${Date.now()}`,
    };
    blogPosts.unshift(newPost);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const index = blogPosts.findIndex(p => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    blogPosts[index] = { ...blogPosts[index], ...updates };
    return NextResponse.json(blogPosts[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    blogPosts = blogPosts.filter(p => p.id !== id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 400 });
  }
}
