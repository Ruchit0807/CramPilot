// ============================================================
// CramPilot — Workflow Type Definitions
// Types for the 24-hour survival workflow engine
// ============================================================

import type { WorkflowPhase } from './session.types'

export type AITool = 'chatgpt' | 'claude' | 'gemini' | 'notebooklm'

export type TaskType =
  | 'concept-load'
  | 'deep-understanding'
  | 'practice-questions'
  | 'flashcards'
  | 'revision-notes'
  | 'last-minute-summary'
  | 'answer-framework'
  | 'marks-trap-review'

export type EmergencyLevel = 'critical' | 'high' | 'medium' | 'low'

export interface WorkflowStep {
  id: string
  phase: WorkflowPhase
  order: number
  title: string
  description: string
  estimatedMinutes: number
  topicId?: string
  taskType: TaskType
  recommendedTool: AITool
  promptId?: string         // links to PromptTemplate
  isCompleted: boolean
  isOptional: boolean
  breakAfter?: boolean      // indicates a rest break should follow
}

export interface PhaseDefinition {
  id: WorkflowPhase
  order: number
  label: string
  shortLabel: string
  description: string
  estimatedPercentOfTime: number // % of total study time
  steps: WorkflowStep[]
}

export interface WorkflowSchedule {
  sessionId: string
  startTime: Date
  examTime: Date
  totalHours: number
  phases: PhaseDefinition[]
  timeBlocks: TimeBlock[]
  breakCount: number
  totalStudyMinutes: number
}

export interface TimeBlock {
  id: string
  startTime: Date
  endTime: Date
  durationMinutes: number
  label: string
  type: 'study' | 'break' | 'sleep' | 'exam'
  phase?: WorkflowPhase
  taskType?: TaskType
  topicName?: string
  promptId?: string
  toolRecommended?: AITool
  isCompleted: boolean
}

export interface AIRecommendation {
  id: string
  type: 'topic-priority' | 'strategy-adjustment' | 'time-warning' | 'encouragement'
  title: string
  body: string
  urgency: EmergencyLevel
  actionLabel?: string
  actionTarget?: string   // route or modal id
  isDismissed: boolean
  createdAt: Date
}

export interface GeneratedWorkflow {
  sessionId: string
  schedule: WorkflowSchedule
  recommendations: AIRecommendation[]
  emergencyLevel: EmergencyLevel
  confidence: number         // 0–100 how confident the system is in this plan
  estimatedCoveragePercent: number
  generatedAt: Date
  modelUsed?: string
  tokensUsed?: number
}
