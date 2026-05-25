// ============================================================
// CramPilot — AI Functions
// 6 modular, cached, rate-limited AI functions
// Each: prompt → call → parse → cache → track
// ============================================================

import { AI_CONFIG } from './config'
import { callAI, AIError } from './client'
import { buildCacheKey, getCachedResponse, setCachedResponse, trackAIUsage } from './cache'
import { checkRateLimit, getUserTier, RateLimitError, reserveCredits, rollbackCredits } from './rate-limit'
import { getFallbackStrategy } from './fallback'

export const WORKFLOW_VERSION = 'v1.1.0'
import {
  buildStrategyPrompt,
  buildTopicExtractionPrompt,
  buildPYQAnalysisPrompt,
  buildPromptPackPrompt,
  buildFlashcardPrompt,
  buildProfessorInsightsPrompt,
} from './prompts'
import {
  parseStrategyResponse,
  parseTopicsResponse,
  parsePYQResponse,
  parsePromptsResponse,
  parseFlashcardsResponse,
  parseProfessorTipsResponse,
} from './parse'
import type { GeneratedStrategy } from '@/types'

// ── Result type for all AI functions ────────────────────────
export interface AIFunctionResult<T> {
  data: T
  meta: {
    source: 'ai' | 'cache' | 'fallback'
    tokensUsed: number
    estimatedCostUSD: number
    latencyMs: number
    model: string
    cacheKey: string
  }
}

// ── Helper: wrap the full flow ──────────────────────────────
async function executeAIFunction<T>(params: {
  functionName: string
  cachePrefix: string
  cacheParams: Record<string, unknown>
  cacheTTL: number
  systemPrompt: string
  parseResponse: (raw: string) => { success: true; data: T } | { success: false; error: string }
  aiConfig: { maxTokens: number; temperature: number; model: 'normal' | 'premium'; creditCost?: number }
  sessionId?: string
  fallbackGenerator?: () => T
  promptVersion?: string
}): Promise<AIFunctionResult<T>> {
  const startTime = Date.now()
  const cacheKey = buildCacheKey(params.cachePrefix, params.cacheParams)

  // 1. Check cache first
  const cached = await getCachedResponse<T>(cacheKey)
  if (cached) {
    return {
      data: cached.data,
      meta: {
        source: 'cache',
        tokensUsed: 0,
        estimatedCostUSD: 0,
        latencyMs: Date.now() - startTime,
        model: 'cache',
        cacheKey,
      },
    }
  }

  // 2. Rate limit check & Credit Reservation
  const { tier, userId, guestId } = await getUserTier()
  
  if (tier === 'premium' && userId && params.aiConfig.creditCost) {
    await reserveCredits(userId, params.aiConfig.creditCost)
  } else {
    await checkRateLimit(tier, userId, guestId) // Throws RateLimitError if exceeded
  }

  // 3. Call AI
  let aiResult;
  try {
    aiResult = await callAI(
      [
        { role: 'user', content: params.systemPrompt },
      ],
      {
        model: params.aiConfig.model,
        temperature: params.aiConfig.temperature,
        maxTokens: params.aiConfig.maxTokens,
        jsonMode: true,
      }
    )
  } catch (error) {
    // Rollback credits on AI failure
    if (tier === 'premium' && userId && params.aiConfig.creditCost) {
      await rollbackCredits(userId, params.aiConfig.creditCost)
    }
    
    if (params.fallbackGenerator) {
      console.warn(`[AI] Failure in ${params.functionName}, using deterministic fallback. Error:`, error)
      return {
        data: params.fallbackGenerator(),
        meta: {
          source: 'fallback',
          tokensUsed: 0,
          estimatedCostUSD: 0,
          latencyMs: Date.now() - startTime,
          model: 'deterministic_fallback',
          cacheKey,
        }
      }
    }
    throw error
  }

  // 4. Parse & validate
  const parsed = params.parseResponse(aiResult.content)
  if (!parsed.success) {
    // Rollback credits on parse failure
    if (tier === 'premium' && userId && params.aiConfig.creditCost) {
      await rollbackCredits(userId, params.aiConfig.creditCost)
    }
    
    if (params.fallbackGenerator) {
      console.warn(`[AI] Parse failure in ${params.functionName}, using deterministic fallback. Error:`, parsed.error)
      return {
        data: params.fallbackGenerator(),
        meta: {
          source: 'fallback',
          tokensUsed: aiResult.tokensUsed.total,
          estimatedCostUSD: aiResult.estimatedCostUSD,
          latencyMs: aiResult.latencyMs,
          model: aiResult.model,
          cacheKey,
        }
      }
    }

    throw new AIError(
      `AI output validation failed for ${params.functionName}: ${parsed.error}`,
      'PARSE_ERROR',
      200,
      false
    )
  }

  // 5. Cache the validated result
  await setCachedResponse(cacheKey, parsed.data, params.cacheTTL)

  // 6. Track usage (fire-and-forget)
  trackAIUsage({
    sessionId: params.sessionId,
    userId,
    guestId,
    eventType: `ai_${params.functionName}`,
    metadata: {
      model: aiResult.model,
      tokensUsed: aiResult.tokensUsed,
      estimatedCostUSD: aiResult.estimatedCostUSD,
      latencyMs: aiResult.latencyMs,
      cacheHit: false,
      functionName: params.functionName,
      promptVersion: params.promptVersion || 'v1.0',
      workflowVersion: WORKFLOW_VERSION,
    } as any,
  }).catch(() => {}) // Non-critical

  return {
    data: parsed.data,
    meta: {
      source: 'ai',
      tokensUsed: aiResult.tokensUsed.total,
      estimatedCostUSD: aiResult.estimatedCostUSD,
      latencyMs: aiResult.latencyMs,
      model: aiResult.model,
      cacheKey,
    },
  }
}

// ── 1. Generate Full Strategy ───────────────────────────────
export async function generateStrategy(params: {
  subject: string
  subjectCategory?: string
  professorArchetype?: string
  hoursRemaining: number
  targetMarks: string
  weakTopics?: string[]
  sessionId?: string
  syllabusText?: string
  pyqText?: string
}): Promise<AIFunctionResult<GeneratedStrategy>> {
  const promptParams = {
    subject: params.subject,
    subjectCategory: params.subjectCategory || 'mixed',
    professorArchetype: params.professorArchetype || 'standard',
    hoursRemaining: params.hoursRemaining,
    targetMarks: params.targetMarks,
    weakTopics: params.weakTopics || [],
    syllabusText: params.syllabusText,
    pyqText: params.pyqText,
  }

  return executeAIFunction({
    functionName: 'generateStrategy',
    cachePrefix: 'strategy',
    cacheParams: promptParams,
    cacheTTL: AI_CONFIG.cacheTTL.strategy,
    systemPrompt: buildStrategyPrompt(promptParams),
    parseResponse: parseStrategyResponse,
    aiConfig: AI_CONFIG.functions.generateStrategy,
    sessionId: params.sessionId,
    promptVersion: 'v1.1',
    fallbackGenerator: () => getFallbackStrategy({
      subject: params.subject,
      subjectCategory: params.subjectCategory || 'mixed',
      hoursRemaining: params.hoursRemaining,
      targetMarks: params.targetMarks,
      weakTopics: params.weakTopics || [],
      examMode: 'standard',
    }) as any,
  })
}

// ── 2. Extract Topics from Syllabus ─────────────────────────
export async function extractTopicsFromSyllabus(params: {
  subject: string
  syllabusText: string
  hoursRemaining: number
  sessionId?: string
}): Promise<AIFunctionResult<any>> {
  // Enforce upload limits
  if (params.syllabusText.length > AI_CONFIG.uploadLimits.maxSyllabusChars) {
    params.syllabusText = params.syllabusText.slice(0, AI_CONFIG.uploadLimits.maxSyllabusChars)
  }

  return executeAIFunction({
    functionName: 'extractTopics',
    cachePrefix: 'topics',
    cacheParams: { subject: params.subject, syllabusHash: params.syllabusText.slice(0, 200), hours: params.hoursRemaining },
    cacheTTL: AI_CONFIG.cacheTTL.topics,
    systemPrompt: buildTopicExtractionPrompt(params),
    parseResponse: parseTopicsResponse,
    aiConfig: AI_CONFIG.functions.extractTopics,
    sessionId: params.sessionId,
  })
}

// ── 3. Analyze PYQs ────────────────────────────────────────
export async function analyzePYQs(params: {
  subject: string
  pyqText: string
  sessionId?: string
}): Promise<AIFunctionResult<any>> {
  // Enforce upload limits
  if (params.pyqText.length > AI_CONFIG.uploadLimits.maxPYQChars) {
    params.pyqText = params.pyqText.slice(0, AI_CONFIG.uploadLimits.maxPYQChars)
  }

  return executeAIFunction({
    functionName: 'analyzePYQs',
    cachePrefix: 'pyq',
    cacheParams: { subject: params.subject, pyqHash: params.pyqText.slice(0, 200) },
    cacheTTL: AI_CONFIG.cacheTTL.pyqAnalysis,
    systemPrompt: buildPYQAnalysisPrompt(params),
    parseResponse: parsePYQResponse,
    aiConfig: AI_CONFIG.functions.analyzePYQs,
    sessionId: params.sessionId,
  })
}

// ── 4. Generate Prompt Pack ─────────────────────────────────
export async function generatePromptPack(params: {
  subject: string
  topics: string[]
  professorArchetype?: string
  hoursRemaining: number
  sessionId?: string
}): Promise<AIFunctionResult<any>> {
  return executeAIFunction({
    functionName: 'generatePrompts',
    cachePrefix: 'prompts',
    cacheParams: { subject: params.subject, topics: params.topics, archetype: params.professorArchetype },
    cacheTTL: AI_CONFIG.cacheTTL.promptPack,
    systemPrompt: buildPromptPackPrompt({
      subject: params.subject,
      topics: params.topics,
      professorArchetype: params.professorArchetype || 'unknown',
      hoursRemaining: params.hoursRemaining,
    }),
    parseResponse: parsePromptsResponse,
    aiConfig: AI_CONFIG.functions.generatePrompts,
    sessionId: params.sessionId,
  })
}

// ── 5. Generate Flashcards ──────────────────────────────────
export async function generateFlashcards(params: {
  subject: string
  topic: string
  count?: number
  sessionId?: string
}): Promise<AIFunctionResult<any>> {
  return executeAIFunction({
    functionName: 'generateFlashcards',
    cachePrefix: 'flashcards',
    cacheParams: { subject: params.subject, topic: params.topic, count: params.count || 5 },
    cacheTTL: AI_CONFIG.cacheTTL.flashcards, // Shorter TTL for flashcards
    systemPrompt: buildFlashcardPrompt({
      subject: params.subject,
      topic: params.topic,
      count: params.count || 5,
    }),
    parseResponse: parseFlashcardsResponse,
    aiConfig: AI_CONFIG.functions.generateFlashcards,
    sessionId: params.sessionId,
  })
}

// ── 6. Generate Professor Insights ──────────────────────────
export async function generateProfessorInsights(params: {
  subject: string
  professorArchetype: string
  targetMarks?: string
  sessionId?: string
}): Promise<AIFunctionResult<any>> {
  return executeAIFunction({
    functionName: 'professorInsights',
    cachePrefix: 'profinsight',
    cacheParams: { subject: params.subject, archetype: params.professorArchetype, target: params.targetMarks },
    cacheTTL: AI_CONFIG.cacheTTL.professorInsights,
    systemPrompt: buildProfessorInsightsPrompt({
      subject: params.subject,
      professorArchetype: params.professorArchetype,
      targetMarks: params.targetMarks || 'pass',
    }),
    parseResponse: parseProfessorTipsResponse,
    aiConfig: AI_CONFIG.functions.professorInsights,
    sessionId: params.sessionId,
  })
}
