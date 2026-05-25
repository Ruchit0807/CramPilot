import { createAdminClient } from '@/lib/supabase/server'

export interface EmergencyControls {
  force_disable_ai: boolean
  emergency_free_mode: boolean
  provider_disable_switches: string[]
}

export class AISafetyError extends Error {
  constructor(message: string, public code: 'GLOBAL_LIMIT_EXCEEDED' | 'EMERGENCY_STOP') {
    super(message)
    this.name = 'AISafetyError'
  }
}

/**
 * Get current emergency controls from the database.
 * Falls back to safe defaults if DB fails.
 */
export async function getEmergencyControls(): Promise<EmergencyControls> {
  try {
    const supabase = await createAdminClient()
    const { data } = await supabase
      .from('app_config')
      .select('value')
      .eq('key', 'emergency_controls')
      .single()

    if (data && data.value) {
      return data.value as unknown as EmergencyControls
    }
  } catch (err) {
    console.error('Failed to load emergency controls, defaulting to safe.', err)
  }
  return {
    force_disable_ai: false,
    emergency_free_mode: false,
    provider_disable_switches: []
  }
}

/**
 * Calculate total spend today in USD.
 * Abstracted so we can swap to Redis/Upstash later without refactoring orchestration.
 */
export async function getTodaySpendUSD(): Promise<number> {
  try {
    const supabase = await createAdminClient()
    const startOfDay = new Date()
    startOfDay.setUTCHours(0, 0, 0, 0)
    
    // In the future: Redis.get('daily_spend_YYYY_MM_DD')
    const { data, error } = await supabase
      .from('usage_tracking')
      .select('estimated_cost')
      .gte('created_at', startOfDay.toISOString())

    if (error) throw error

    return data.reduce((sum, row) => sum + (Number(row.estimated_cost) || 0), 0)
  } catch (err) {
    console.error('Failed to get today spend', err)
    return 0 // Fail open so we don't break production on analytics outage
  }
}
