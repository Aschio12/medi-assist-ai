import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize a new Upstash Redis instance
// Requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

/**
 * Global API Rate Limiter
 * 100 requests per 10 seconds per IP
 * Used for standard API routes (fetching patient lists, etc.)
 */
export const globalRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '10 s'),
  analytics: true,
  prefix: '@upstash/ratelimit/global',
});

/**
 * AI Generation Rate Limiter
 * 10 requests per minute per User ID
 * Used for expensive LLM inference endpoints to prevent abuse and manage API costs.
 */
export const aiGenerationRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.tokenBucket(10, '1 m', 10),
  analytics: true,
  prefix: '@upstash/ratelimit/ai',
});

/**
 * Auth Brute-Force Rate Limiter
 * 5 attempts per 15 minutes per IP
 * Strict limit for login and MFA routes.
 */
export const authRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, '15 m'),
  analytics: true,
  prefix: '@upstash/ratelimit/auth',
});
