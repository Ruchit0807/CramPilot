// ============================================================
// CramPilot — AI Router Utility
// Determines the best AI tool for a given task type
// Also provides prompt character count enforcement
// ============================================================

import type { AITool, TaskType } from '@/types'
import type { ProfessorArchetype } from '@/types'
import { FREE_CHAR_LIMITS } from '@/constants'

export interface AIRoutingResult {
  primaryTool: AITool
  fallbackTool: AITool
  reason: string
  estimatedResponseQuality: 'excellent' | 'good' | 'adequate'
  withinFreeLimit: boolean
}

// Task → best AI tool mapping
const TASK_TOOL_MAP: Record<TaskType, AITool> = {
  'concept-load': 'chatgpt',
  'deep-understanding': 'claude',
  'practice-questions': 'chatgpt',
  'flashcards': 'chatgpt',
  'revision-notes': 'claude',
  'last-minute-summary': 'chatgpt',
  'answer-framework': 'claude',
  'marks-trap-review': 'gemini',
}

// Professor archetype → best tool for answer style
const PROFESSOR_TOOL_MAP: Partial<Record<ProfessorArchetype, AITool>> = {
  'theory-scholar': 'claude',      // Claude excels at scholarly, structured prose
  'strict-marker': 'claude',       // Claude is precise and doesn't pad
  'problem-setter': 'chatgpt',     // GPT handles math/numericals well
  'case-analyst': 'gemini',        // Gemini good for broad analytical coverage
  'pyq-repeater': 'chatgpt',       // GPT for concise, exam-ready answers
}

/**
 * Select the optimal AI tool for a given task + professor combination
 */
export function routeToAITool(
  taskType: TaskType,
  professorArchetype?: ProfessorArchetype,
  promptCharCount?: number
): AIRoutingResult {
  const taskBestTool = TASK_TOOL_MAP[taskType] ?? 'chatgpt'
  const profBestTool = professorArchetype
    ? PROFESSOR_TOOL_MAP[professorArchetype]
    : null

  // If both agree, use that tool
  const primaryTool = profBestTool ?? taskBestTool
  const fallbackTool: AITool =
    primaryTool === 'chatgpt' ? 'gemini' : 'chatgpt'

  const charLimit = FREE_CHAR_LIMITS[primaryTool]
  const withinFreeLimit = promptCharCount
    ? promptCharCount <= charLimit
    : true

  let reason = `Best for ${taskType.replace(/-/g, ' ')}`
  if (profBestTool) {
    reason += ` with a ${professorArchetype?.replace(/-/g, ' ')} professor`
  }

  return {
    primaryTool,
    fallbackTool,
    reason,
    estimatedResponseQuality: profBestTool === taskBestTool ? 'excellent' : 'good',
    withinFreeLimit,
  }
}

/**
 * Given a prompt body, trim it to fit within the tool's free-tier limit
 * and return a warning if truncation occurred
 */
export function enforceCharLimit(
  promptBody: string,
  tool: AITool
): { body: string; wasTruncated: boolean; charCount: number } {
  const limit = FREE_CHAR_LIMITS[tool]
  const charCount = promptBody.length
  if (charCount <= limit) {
    return { body: promptBody, wasTruncated: false, charCount }
  }
  const truncated = promptBody.slice(0, limit - 3) + '...'
  return { body: truncated, wasTruncated: true, charCount: limit }
}

/**
 * Fill a prompt template body with variable values
 * Variables are in [VARIABLE_NAME] format
 */
export function fillPromptTemplate(
  templateBody: string,
  variables: Record<string, string>
): string {
  return templateBody.replace(/\[([A-Z_]+)\]/g, (match, key) => {
    return variables[key] ?? match
  })
}
