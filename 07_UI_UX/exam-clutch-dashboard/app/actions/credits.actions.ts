'use server'

import { createClient, createAdminClient } from '@/lib/supabase/server'
import { getUserTier } from '@/lib/ai/rate-limit'

export type AccessStatus = {
  tier: 'guest' | 'free' | 'premium'
  creditsRemaining: number
  creditsExpiresAt: string | null
  hasPremiumAccess: boolean
}

export async function checkAccessStatus(): Promise<AccessStatus> {
  const { tier, userId } = await getUserTier()
  
  if (!userId) {
    return { tier, creditsRemaining: 0, creditsExpiresAt: null, hasPremiumAccess: false }
  }

  const supabase = await createAdminClient()
  const { data: user } = await supabase
    .from('users')
    .select('credits_remaining, credits_expires_at')
    .eq('id', userId)
    .single()

  const creditsRemaining = user?.credits_remaining || 0
  const creditsExpiresAt = user?.credits_expires_at || null
  
  // Premium access is based purely on having valid credits
  const hasPremiumAccess = 
    creditsRemaining > 0 && 
    (creditsExpiresAt ? new Date(creditsExpiresAt) > new Date() : false)

  return {
    tier: hasPremiumAccess ? 'premium' : tier,
    creditsRemaining,
    creditsExpiresAt,
    hasPremiumAccess
  }
}
