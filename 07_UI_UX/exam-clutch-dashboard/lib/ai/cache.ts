// ============================================================
// CramPilot — AI Response Cache
// Supabase ai_cache table integration for cost optimization
// ============================================================

import { createAdminClient } from '@/lib/supabase/server'
import { AI_CONFIG } from './config'

/**
 * Generate a deterministic cache key from input parameters.
 * Uses a simple string hash for compact, collision-resistant keys.
 * Works in all Next.js runtimes (Node, Edge, Turbopack).
 */
export function buildCacheKey(prefix: string, params: Record<string, unknown>): string {
  const normalized = JSON.stringify(params, Object.keys(params).sort())
  // Simple djb2 hash — fast, deterministic, no crypto dependency
  let hash = 5381
  for (let i = 0; i < normalized.length; i++) {
    hash = ((hash << 5) + hash + normalized.charCodeAt(i)) >>> 0
  }
  return `${prefix}:${hash.toString(36)}`
}

/**
 * Check the ai_cache table for a cached response.
 * Returns null if not found or expired.
 */
export async function getCachedResponse<T = unknown>(cacheKey: string): Promise<{
  data: T
  cacheHit: true
} | null> {
  try {
    const supabase = await createAdminClient()

    const { data, error } = await supabase
      .from('ai_cache')
      .select('output_json, expires_at')
      .eq('cache_key', cacheKey)
      .single()

    if (error || !data) return null

    // Check expiry
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      // Expired — delete in background (fire-and-forget)
      supabase.from('ai_cache').delete().eq('cache_key', cacheKey).then(() => {})
      return null
    }

    return { data: data.output_json as T, cacheHit: true }
  } catch {
    // Cache miss is not an error — just proceed without cache
    return null
  }
}

/**
 * Store a response in the ai_cache table.
 * Uses upsert so repeated calls with the same key just refresh the data.
 */
export async function setCachedResponse(
  cacheKey: string,
  data: unknown,
  ttlSeconds: number
): Promise<void> {
  try {
    const supabase = await createAdminClient()

    const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString()

    await supabase
      .from('ai_cache')
      .upsert({
        cache_key: cacheKey,
        output_json: data,
        created_at: new Date().toISOString(),
        expires_at: expiresAt,
      }, { onConflict: 'cache_key' })
  } catch (error) {
    // Cache write failure is non-critical — log and continue
    console.error('Cache write failed:', error)
  }
}

/**
 * Track AI usage in the usage_tracking table for analytics.
 */
export async function trackAIUsage(params: {
  sessionId?: string
  userId?: string | null
  guestId?: string | null
  eventType: string
  metadata: {
    model: string
    tokensUsed: { prompt: number; completion: number; total: number }
    estimatedCostUSD: number
    latencyMs: number
    cacheHit: boolean
    functionName: string
  }
}): Promise<void> {
  try {
    const supabase = await createAdminClient()

    await supabase.from('usage_tracking').insert({
      session_id: params.sessionId || null,
      user_id: params.userId || null,
      guest_id: params.guestId || null,
      event_type: params.eventType,
      metadata: params.metadata,
    })
  } catch (error) {
    // Usage tracking failure is non-critical
    console.error('Usage tracking failed:', error)
  }
}
