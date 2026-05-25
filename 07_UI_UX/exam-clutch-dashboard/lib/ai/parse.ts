// ============================================================
// CramPilot — AI Output Parser & Validator
// Zod runtime schema validation for all AI outputs
// Validates, sanitizes, and normalizes before reaching frontend
// ============================================================

import { z } from 'zod'
import type { GeneratedStrategy } from '@/types'

// ── Zod Schemas ─────────────────────────────────────────────

const TopicSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  priority: z.enum(['critical', 'high', 'moderate', 'skip']),
  marks: z.number().min(0).max(100).default(10),
  pyqFreq: z.number().min(0).max(10).default(0),
  hoursNeeded: z.number().min(0).max(100).default(1),
  isWeak: z.boolean().default(false),
  appearedIn: z.string().default('Unknown'),
  safeToSkipReason: z.string().nullable().optional(),
})

const WorkflowSchema = z.object({
  id: z.string(),
  phase: z.string(),
  title: z.string(),
  tool: z.enum(['chatgpt', 'claude', 'gemini', 'notebooklm']),
  toolLabel: z.string(),
  toolColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default('#818CF8'),
  duration: z.string(),
  topics: z.array(z.string()).default([]),
  purpose: z.string(),
  explanation: z.string(),
  icon: z.string().default('📚'),
})

const PromptSchema = z.object({
  id: z.string(),
  tool: z.enum(['claude', 'chatgpt', 'gemini']).default('chatgpt'),
  toolLabel: z.string().default('ChatGPT'),
  toolColor: z.string().default('#10B981'),
  toolUrl: z.string().url().optional().default('https://chat.openai.com'),
  badge: z.string().default('Study'),
  badgeColor: z.string().default('#818CF8'),
  title: z.string(),
  purpose: z.string(),
  estimatedMinutes: z.number().min(1).max(180).default(30),
  body: z.string().min(10),
  isPro: z.boolean().default(false),
})

const RevisionStrategySchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  icon: z.string().default('📖'),
  color: z.string().default('#818CF8'),
})

const FlashcardSchema = z.object({
  q: z.string().min(3),
  a: z.string().min(3),
  topic: z.string().default('General'),
})

const AudioRecommendationSchema = z.object({
  id: z.string(),
  title: z.string(),
  duration: z.string(),
  tool: z.literal('notebooklm').default('notebooklm'),
  description: z.string(),
})

const TimelineBlockSchema = z.object({
  id: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  durationMin: z.number().min(1),
  type: z.enum(['study', 'break', 'exam']),
  urgency: z.enum(['critical', 'high', 'low']).default('high'),
  label: z.string(),
  topic: z.string(),
  tool: z.string().nullable().optional(),
  method: z.string().nullable().optional(),
  promptHint: z.string().nullable().optional(),
  isCheckpoint: z.boolean().nullable().optional(),
  checkpointLabel: z.string().nullable().optional(),
  pyqFrequency: z.number().nullable().optional(),
  isWeak: z.boolean().nullable().optional(),
})

const ProfessorTipSchema = z.object({
  id: z.string(),
  tip: z.string().min(5),
  urgency: z.enum(['critical', 'high', 'moderate']).default('moderate'),
})

const ScoresSchema = z.object({
  survivabilityScore: z.number().min(0).max(100),
  confidenceLevel: z.number().min(0).max(100),
  coveragePercent: z.number().min(0).max(100),
  estimatedMarks: z.string(),
  emergencyLevel: z.enum(['critical', 'emergency', 'stable', 'recovering']),
  aiConfidence: z.number().min(0).max(100),
  recoveryChance: z.string().optional(),
  examRiskLevel: z.enum(['Recoverable', 'High Risk', 'Stable', 'Critical Survival Mode']).optional(),
  confidenceStatus: z.string().optional(),
})

export const GeneratedStrategySchema = z.object({
  scores: ScoresSchema,
  topics: z.array(TopicSchema).min(1),
  workflows: z.array(WorkflowSchema).min(1),
  prompts: z.array(PromptSchema).default([]),
  revisionStrategy: z.array(RevisionStrategySchema).default([]),
  flashcards: z.array(FlashcardSchema).default([]),
  audioRecommendations: z.array(AudioRecommendationSchema).default([]),
  timeline: z.array(TimelineBlockSchema).min(1),
  professorTips: z.array(ProfessorTipSchema).default([]),
})

export const TopicsArraySchema = z.array(TopicSchema).min(1)

const PYQFrequencySchema = z.object({
  topic: z.string(),
  appearances: z.number(),
  years: z.array(z.string()),
  probability: z.number().min(0).max(100),
})

const PredictedQuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  probability: z.enum(['high', 'moderate', 'low']),
  stars: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  appearedYears: z.array(z.string()),
  estimatedPrepMinutes: z.number(),
  isPaid: z.boolean().default(false),
})

export const PYQAnalysisSchema = z.object({
  papersAnalyzed: z.number(),
  yearsRange: z.string(),
  frequencyTable: z.array(PYQFrequencySchema),
  topPredictions: z.array(PredictedQuestionSchema),
  safeToSkip: z.array(z.string()),
  patternSummary: z.string(),
  confidence: z.number().min(0).max(100),
})

export const PromptsArraySchema = z.array(PromptSchema).min(1)
export const FlashcardsArraySchema = z.array(FlashcardSchema).min(1)
export const ProfessorTipsArraySchema = z.array(ProfessorTipSchema).min(1)

// ── Parsers ─────────────────────────────────────────────────

/**
 * Extract JSON from AI response text.
 * Handles cases where the model wraps JSON in markdown code fences.
 */
function extractJSON(raw: string): string {
  // Strip markdown code fences if present
  let cleaned = raw.trim()
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7)
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3)
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3)
  }
  return cleaned.trim()
}

/**
 * Parse and validate the full GeneratedStrategy from AI output.
 */
export function parseStrategyResponse(raw: string): { success: true; data: GeneratedStrategy } | { success: false; error: string } {
  try {
    const json = JSON.parse(extractJSON(raw))
    const result = GeneratedStrategySchema.safeParse(json)

    if (result.success) {
      return { success: true, data: result.data as GeneratedStrategy }
    }

    // Log validation errors for debugging
    const errorMessages = result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ')
    console.error('Strategy validation errors:', errorMessages)
    return { success: false, error: `Validation failed: ${errorMessages}` }
  } catch (error: any) {
    return { success: false, error: `JSON parse failed: ${error.message}` }
  }
}

/**
 * Parse and validate topic extraction output.
 */
export function parseTopicsResponse(raw: string): { success: true; data: z.infer<typeof TopicsArraySchema> } | { success: false; error: string } {
  try {
    const json = JSON.parse(extractJSON(raw))
    const result = TopicsArraySchema.safeParse(json)
    if (result.success) return { success: true, data: result.data }
    return { success: false, error: result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ') }
  } catch (error: any) {
    return { success: false, error: `JSON parse failed: ${error.message}` }
  }
}

/**
 * Parse and validate PYQ analysis output.
 */
export function parsePYQResponse(raw: string): { success: true; data: z.infer<typeof PYQAnalysisSchema> } | { success: false; error: string } {
  try {
    const json = JSON.parse(extractJSON(raw))
    const result = PYQAnalysisSchema.safeParse(json)
    if (result.success) return { success: true, data: result.data }
    return { success: false, error: result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ') }
  } catch (error: any) {
    return { success: false, error: `JSON parse failed: ${error.message}` }
  }
}

/**
 * Parse and validate prompt pack output.
 */
export function parsePromptsResponse(raw: string): { success: true; data: z.infer<typeof PromptsArraySchema> } | { success: false; error: string } {
  try {
    const json = JSON.parse(extractJSON(raw))
    const result = PromptsArraySchema.safeParse(json)
    if (result.success) return { success: true, data: result.data }
    return { success: false, error: result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ') }
  } catch (error: any) {
    return { success: false, error: `JSON parse failed: ${error.message}` }
  }
}

/**
 * Parse and validate flashcard output.
 */
export function parseFlashcardsResponse(raw: string): { success: true; data: z.infer<typeof FlashcardsArraySchema> } | { success: false; error: string } {
  try {
    const json = JSON.parse(extractJSON(raw))
    const result = FlashcardsArraySchema.safeParse(json)
    if (result.success) return { success: true, data: result.data }
    return { success: false, error: result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ') }
  } catch (error: any) {
    return { success: false, error: `JSON parse failed: ${error.message}` }
  }
}

/**
 * Parse and validate professor tips output.
 */
export function parseProfessorTipsResponse(raw: string): { success: true; data: z.infer<typeof ProfessorTipsArraySchema> } | { success: false; error: string } {
  try {
    const json = JSON.parse(extractJSON(raw))
    const result = ProfessorTipsArraySchema.safeParse(json)
    if (result.success) return { success: true, data: result.data }
    return { success: false, error: result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ') }
  } catch (error: any) {
    return { success: false, error: `JSON parse failed: ${error.message}` }
  }
}
