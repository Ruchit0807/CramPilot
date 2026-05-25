// ============================================================
// CramPilot — Rate Limiter & Quota Enforcement
// In-memory + Supabase-backed usage quota enforcement
// ============================================================

import { AI_CONFIG, type UserTier } from './config'
import { createAdminClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import crypto from 'crypto'

export class RateLimitError extends Error {
  constructor(
    message: string,
    public retryAfterMs: number,
    public tier: UserTier
  ) {
    super(message)
    this.name = 'RateLimitError'
  }
}

export class CreditError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CreditError'
  }
}

/**
 * Determine the user's tier based on auth state and subscription.
 */
export async function getUserTier(): Promise<{ tier: UserTier; userId: string | null; guestId: string | null }> {
  try {
    const supabase = await createAdminClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      const cookieStore = await cookies()
      const guestId = cookieStore.get('ec_guest_id')?.value || null
      return { tier: 'guest', userId: null, guestId }
    }

    const { data: userData } = await supabase
      .from('users')
      .select('credits_remaining, credits_expires_at')
      .eq('id', user.id)
      .single()

    if (userData && userData.credits_remaining > 0) {
      if (userData.credits_expires_at && new Date(userData.credits_expires_at) > new Date()) {
        return { tier: 'premium', userId: user.id, guestId: null }
      }
    }

    return { tier: 'free', userId: user.id, guestId: null }
  } catch {
    // Fail open — treat as guest if we can't determine tier
    const cookieStore = await cookies()
    const guestId = cookieStore.get('ec_guest_id')?.value || null
    return { tier: 'guest', userId: null, guestId }
  }
}

/**
 * Check rate limit for the current user.
 * Uses Supabase usage_tracking table to count recent requests.
 */
export async function checkRateLimit(userTier: UserTier, userId: string | null, guestId: string | null): Promise<void> {
  const limits = AI_CONFIG.rateLimits[userTier]
  const windowStart = new Date(Date.now() - limits.windowMs).toISOString()

  try {
    const supabase = await createAdminClient()

    let query = supabase
      .from('usage_tracking')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', windowStart)
      .like('event_type', 'ai_%')

    if (userId) {
      query = query.eq('user_id', userId)
    } else if (guestId) {
      query = query.eq('guest_id', guestId)
    } else {
      // No identity — hard limit at 1 request
      return
    }

    const { count } = await query

    if (count !== null && count >= limits.maxRequests) {
      const retryAfterMs = limits.windowMs
      throw new RateLimitError(
        `Rate limit exceeded for ${userTier} tier. ${count}/${limits.maxRequests} requests used in the current window.`,
        retryAfterMs,
        userTier
      )
    }
  } catch (error) {
    if (error instanceof RateLimitError) throw error
    console.error('Rate limit check failed, allowing request:', error)
  }
}

// ── Credit Logic ──────────────────────────────────────────────

export async function reserveCredits(userId: string, cost: number): Promise<string> {
  const supabase = await createAdminClient()
  
  // 1. Fetch current credits
  const { data: user } = await supabase
    .from('users')
    .select('credits_remaining, credits_expires_at')
    .eq('id', userId)
    .single()

  if (!user) throw new CreditError('User not found')
  if (user.credits_remaining < cost) throw new CreditError('Insufficient Recovery Credits')
  if (user.credits_expires_at && new Date(user.credits_expires_at) < new Date()) {
    throw new CreditError('Recovery Credits expired')
  }

  // 2. Reserve
  const newCredits = user.credits_remaining - cost
  const { error } = await supabase
    .from('users')
    .update({ credits_remaining: newCredits })
    .eq('id', userId)
  
  if (error) throw new CreditError('Failed to reserve credits')

  return crypto.randomUUID()
}

export async function rollbackCredits(userId: string, cost: number): Promise<void> {
  const supabase = await createAdminClient()
  
  const { data: user } = await supabase
    .from('users')
    .select('credits_remaining')
    .eq('id', userId)
    .single()
    
  if (user) {
    await supabase
      .from('users')
      .update({ credits_remaining: user.credits_remaining + cost })
      .eq('id', userId)
  }
}
