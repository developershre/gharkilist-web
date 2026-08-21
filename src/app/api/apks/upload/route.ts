import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json(
        { error: 'Filename query parameter is required.' },
        { status: 400 }
      );
    }

    if (!request.body) {
      return NextResponse.json(
        { error: 'File content body is required.' },
        { status: 400 }
      );
    }

    // Upload the file content stream to Vercel Blob
    const blob = await put(filename, request.body, {
      access: 'public',
    });

    return NextResponse.json(blob);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
