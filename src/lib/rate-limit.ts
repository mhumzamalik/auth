import { env } from "./env";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Sliding window in-memory fallback store
const memoryStore = new Map<string, number[]>();

function inMemoryRateLimit(ip: string, limit = 5, windowMs = 60000): { success: boolean; limit: number; remaining: number; reset: number } {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  let requests = memoryStore.get(ip) || [];
  // Filter out requests outside the current window
  requests = requests.filter(timestamp => timestamp > windowStart);
  
  if (requests.length >= limit) {
    const oldestRequest = requests[0];
    const resetTime = oldestRequest + windowMs;
    memoryStore.set(ip, requests);
    return {
      success: false,
      limit,
      remaining: 0,
      reset: resetTime,
    };
  }
  
  requests.push(now);
  memoryStore.set(ip, requests);
  return {
    success: true,
    limit,
    remaining: limit - requests.length,
    reset: now + windowMs,
  };
}

/**
 * Checks rate limiting for a given IP/identifier.
 * Will attempt to use Upstash Redis, falling back to in-memory token bucket if config is missing.
 */
export async function rateLimit(ip: string, limit = 5, windowSeconds = 60) {
  if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      const redis = new Redis({
        url: env.UPSTASH_REDIS_REST_URL,
        token: env.UPSTASH_REDIS_REST_TOKEN,
      });

      const ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
        analytics: true,
        prefix: "@upstash/ratelimit",
      });

      const result = await ratelimit.limit(ip);
      return {
        success: result.success,
        limit: result.limit,
        remaining: result.remaining,
        reset: result.reset,
      };
    } catch (error) {
      console.warn("⚠️ Upstash Redis error, falling back to in-memory limiter:", error);
    }
  }

  // Fallback to in-memory rate limiter
  return inMemoryRateLimit(ip, limit, windowSeconds * 1000);
}
