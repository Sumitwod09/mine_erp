import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DEMO_USERS } from '@/lib/data';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const user = DEMO_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  }

  // Return user data and set cookies for middleware and client state
  const response = NextResponse.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  // Set cookie for middleware to check login state (httpOnly for security)
  response.cookies.set('verp_token', 'logged_in', {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: 'lax',
  });

  // Set cookie for client to read user state (non-httpOnly)
  response.cookies.set('verp_user', JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }), {
    httpOnly: false,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: 'lax',
  });

  return response;
}