// ============================================================
// CramPilot — Prompt Template Type Definitions
// Types for the ready-to-paste prompt pack system
// ============================================================

import type { AITool, TaskType } from './workflow.types'
import type { ProfessorArchetype } from './professor.types'

export type PromptCategory =
  | 'concept-learning'
  | 'practice-questions'
  | 'revision-notes'
  | 'flashcards'
  | 'answer-framework'
  | 'marks-trap-check'
  | 'last-minute-summary'
  | 'examiner-perspective'
  | 'topic-deep-dive'
  | 'skip-verification'

export interface PromptVariable {
  key: string            // e.g. "SUBJECT", "TOPIC", "MARKS"
  label: string          // Human-readable label
  defaultValue?: string
  isRequired: boolean
  hint?: string
}

export interface PromptTemplate {
  id: string             // e.g. "CL-001" (CL = Corporate Law)
  category: PromptCategory
  taskType: TaskType
  targetTool: AITool
  title: string
  description: string    // Short description for card preview
  templateBody: string   // Full prompt with [VARIABLE] placeholders
  variables: PromptVariable[]
  characterCount: number // Helps student know if within free-tier limits
  professorArchetypes?: ProfessorArchetype[] // Which professor types this is best for
  subjectTags?: string[] // Subject-specific templates
  isUniversal: boolean   // Works for any subject/professor
  isPaid: boolean        // Paywalled content
  version: number
  usageCount: number     // For sorting popular prompts
  rating?: number        // 1–5 stars from user feedback
}

export interface FilledPrompt {
  templateId: string
  filledBody: string
  variableValues: Record<string, string>
  topicName: string
  toolTarget: AITool
  characterCount: number
  estimatedResponseMinutes?: number
}

export interface PromptPack {
  sessionId: string
  subject: string
  professorArchetype: ProfessorArchetype
  templates: PromptTemplate[]
  filledPrompts: FilledPrompt[]
  totalPrompts: number
  paidPromptCount: number
  freePromptCount: number
  generatedAt: Date
}
