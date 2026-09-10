import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { globalRateLimit, authRateLimit, aiGenerationRateLimit } from '@/lib/rate-limit';

export async function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? request.ip ?? '127.0.0.1';
  const path = request.nextUrl.pathname;

  // 1. Auth Rate Limiting (Strict)
  if (path.startsWith('/api/auth')) {
    const { success, pending, limit, reset, remaining } = await authRateLimit.limit(ip);
    if (!success) {
      return new NextResponse('Too Many Authentication Attempts. Please try again later.', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      });
    }
  }

  // 2. AI Generation Rate Limiting
  // Uses a mock user ID based on session token or falls back to IP
  if (path.startsWith('/api/ai')) {
    const userId = request.cookies.get('session_token')?.value || ip;
    const { success, limit, reset, remaining } = await aiGenerationRateLimit.limit(userId);
    if (!success) {
      return new NextResponse('AI Generation Quota Exceeded. Please upgrade your plan or wait.', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      });
    }
  }

  // 3. Global API Rate Limiting (Broad)
  if (path.startsWith('/api/')) {
    const { success } = await globalRateLimit.limit(ip);
    if (!success) {
      return new NextResponse('API Rate Limit Exceeded.', { status: 429 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
