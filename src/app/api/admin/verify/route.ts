import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const serverPassword = process.env.ADMIN_PASSWORD;

    if (!serverPassword) {
      return NextResponse.json(
        { error: 'ADMIN_PASSWORD environment variable is not configured on the server.' },
        { status: 500 }
      );
    }

    if (password === serverPassword) {
      return NextResponse.json({ verified: true });
    }

    return NextResponse.json(
      { verified: false, error: 'Invalid password.' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
