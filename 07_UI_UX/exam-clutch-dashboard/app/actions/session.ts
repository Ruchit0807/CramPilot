'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import type { ExamSession } from '@/types'

export async function syncSessionToDb(session: ExamSession) {
  try {
    const supabase = await createAdminClient()
    const cookieStore = await cookies()
    const guestId = cookieStore.get('ec_guest_id')?.value

    const { data: { user } } = await supabase.auth.getUser()

    // Map UI enum values to DB enum values if necessary
    const targetMarksMap: Record<string, string> = {
      'Pass': 'pass',
      '55-70%': '55-70',
      '70-85%': '70-85',
      '85%+': '85+'
    }

    const targetMarks = session.targetMarks 
      ? targetMarksMap[session.targetMarks] || 'pass'
      : null

    const { error } = await supabase
      .from('sessions')
      .upsert({
        id: session.id,
        user_id: user?.id || null,
        guest_id: user ? null : guestId,
        subject: session.subject,
        subject_category: session.subjectCategory,
        hours_remaining: session.hoursRemaining,
        target_marks: targetMarks,
        weak_topics: session.weakTopics,
        professor_archetype: session.professorArchetype,
        exam_mode: session.examMode,
        current_phase: session.currentPhase,
        created_at: session.createdAt,
        last_active_at: session.lastActiveAt,
        is_paid: session.isPaid
      }, { onConflict: 'id' })

    if (error) {
      console.error('Supabase Sync Error:', error)
      return { success: false, error: error.message }
    }
    
    return { success: true }
  } catch (error: any) {
    console.error('Failed to sync session:', error.message)
    return { success: false, error: error.message }
  }
}

export async function saveStrategyToDb(sessionId: string, strategy: any) {
  try {
    const supabase = await createAdminClient()
    
    // First check if a strategy already exists for this session
    const { data: existing } = await supabase
      .from('ai_generations')
      .select('id')
      .eq('session_id', sessionId)
      .eq('generation_type', 'strategy')
      .single()

    if (existing) {
      const { error } = await supabase
        .from('ai_generations')
        .update({ content: strategy, created_at: new Date().toISOString() })
        .eq('id', existing.id)
      if (error) throw error
    } else {
      const { error } = await supabase
        .from('ai_generations')
        .insert({
          session_id: sessionId,
          generation_type: 'strategy',
          content: strategy
        })
      if (error) throw error
    }

    return { success: true }
  } catch (error: any) {
    console.error('Failed to save strategy:', error.message)
    return { success: false, error: error.message }
  }
}

// ── AI Strategy Generation (real AI with mock fallback) ─────

export async function generateAIStrategy(params: {
  subject: string
  subjectCategory?: string
  professorArchetype?: string
  hoursRemaining: number
  targetMarks: string
  weakTopics?: string[]
  sessionId: string
  syllabusText?: string
  pyqText?: string
}): Promise<{
  success: boolean
  strategy: any
  source: 'ai' | 'cache' | 'fallback'
  meta?: {
    tokensUsed: number
    estimatedCostUSD: number
    latencyMs: number
    model: string
  }
  error?: string
}> {
  console.log('[CramPilot Server] generateAIStrategy called for:', params.subject, 'session:', params.sessionId)
  try {
    // Import dynamically to keep the AI layer isolated
    const { generateStrategy } = await import('@/lib/ai/functions')
    console.log('[CramPilot Server] AI functions imported, calling generateStrategy...')

    // Enforce 25s timeout for AI generation
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('AI generation timed out after 25s')), 25000)
    )

    const result = await Promise.race([
      generateStrategy({
        subject: params.subject,
        subjectCategory: params.subjectCategory,
        professorArchetype: params.professorArchetype,
        hoursRemaining: params.hoursRemaining,
        targetMarks: params.targetMarks,
        weakTopics: params.weakTopics,
        sessionId: params.sessionId,
        syllabusText: params.syllabusText,
        pyqText: params.pyqText,
      }),
      timeoutPromise
    ]) as any

    // Save to DB
    await saveStrategyToDb(params.sessionId, result.data)

    return {
      success: true,
      strategy: result.data,
      source: result.meta.source,
      meta: {
        tokensUsed: result.meta.tokensUsed,
        estimatedCostUSD: result.meta.estimatedCostUSD,
        latencyMs: result.meta.latencyMs,
        model: result.meta.model,
      },
    }
  } catch (error: any) {
    console.error('AI Strategy generation failed, falling back to mock:', error.message)

    // FALLBACK: Never allow complete strategy generation failure
    try {
      const { generateMockStrategy } = await import('@/lib/mock-engine')

      const mockStrategy = generateMockStrategy({
        subject: params.subject,
        subjectCategory: params.subjectCategory,
        professorArchetype: params.professorArchetype
          ? params.professorArchetype.split(',')
          : [],
        hoursRemaining: params.hoursRemaining,
        targetMarks: params.targetMarks,
        weakTopics: params.weakTopics || [],
      })

      // Save mock strategy to DB too
      await saveStrategyToDb(params.sessionId, mockStrategy)

      return {
        success: true,
        strategy: mockStrategy,
        source: 'fallback',
        error: `AI unavailable: ${error.message}. Using instant strategy.`,
      }
    } catch (fallbackError: any) {
      return {
        success: false,
        strategy: null,
        source: 'fallback',
        error: `Complete failure: ${fallbackError.message}`,
      }
    }
  }
}

