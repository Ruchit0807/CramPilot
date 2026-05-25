import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if the user has premium access (credits > 0 and not expired)
    const { data: userData } = await supabase
      .from('users')
      .select('credits_remaining, credits_expires_at')
      .eq('id', user.id)
      .single()

    if (
      userData &&
      userData.credits_remaining > 0 &&
      userData.credits_expires_at &&
      new Date(userData.credits_expires_at) > new Date()
    ) {
      return NextResponse.json({ status: 'succeeded', credits_remaining: userData.credits_remaining })
    }

    // If credits are not there yet, it might still be processing
    return NextResponse.json({ status: 'pending' })
  } catch (error) {
    console.error('Error polling checkout status:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
