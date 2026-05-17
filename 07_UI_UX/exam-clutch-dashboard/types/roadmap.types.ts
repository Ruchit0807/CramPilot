// ============================================================
// CramPilot — Roadmap Type Definitions
// Types for the hour-by-hour study roadmap system
// ============================================================

import type { Topic, TopicPriority } from './session.types'
import type { AITool, TaskType, EmergencyLevel } from './workflow.types'

export interface RoadmapBlock {
  id: string
  order: number
  startTime: string      // "09:00 PM" formatted
  endTime: string        // "09:45 PM" formatted
  durationMinutes: number
  type: 'study' | 'break' | 'stop' | 'exam-day'
  phase?: string
  topicName?: string
  topicPriority?: TopicPriority
  taskType?: TaskType
  toolRecommended?: AITool
  promptId?: string
  isCompleted: boolean
  icon: string           // Lucide icon name
  label: string          // Short label for timeline
  detail?: string        // Longer explanation shown on expand
}

export interface DayPlan {
  label: 'today' | 'tomorrow' | 'exam-day' | string
  date: string           // ISO date string
  blocks: RoadmapBlock[]
  totalStudyMinutes: number
  totalBreakMinutes: number
  topicsCovered: string[]
}

export interface StudyRoadmap {
  sessionId: string
  emergencyLevel: EmergencyLevel
  totalHours: number
  examDatetime: string
  startDatetime: string
  days: DayPlan[]
  skipList: string[]       // Topics explicitly safe to skip
  criticalPath: string[]   // Topic IDs in priority order
  estimatedCoveragePercent: number
  timeCalculation: {
    hoursAvailable: number
    criticalTopicCount: number
    hoursPerTopic: number
    message: string        // e.g. "You have 18 hours and 6 critical topics — 2.5h each. This is achievable."
  }
  generatedAt: Date
}

export interface PYQAnalysis {
  sessionId: string
  papersAnalyzed: number    // how many years' papers
  yearsRange: string        // e.g. "2019–2023"
  frequencyTable: Array<{
    topic: string
    appearances: number
    years: string[]
    probability: number     // 0–100
  }>
  topPredictions: PredictedQuestion[]
  safeToSkip: string[]      // Topics that never appear
  patternSummary: string    // 2–3 sentence summary
  confidence: number        // Overall confidence in predictions 0–100
  analyzedAt: Date
}

export interface PredictedQuestion {
  id: string
  question: string
  probability: 'high' | 'moderate' | 'low'
  stars: 1 | 2 | 3          // ★★★, ★★☆, ★☆☆
  appearedYears: string[]
  estimatedPrepMinutes: number
  topicId?: string
  isPaid: boolean
}
