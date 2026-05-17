// ============================================================
// CramPilot — Session Type Definitions
// Core types for the exam session lifecycle
// ============================================================

export type WorkflowPhase =
  | 'triage'
  | 'coverage'
  | 'recall'
  | 'gap-repair'
  | 'simulate'
  | 'complete'

export type PhaseStatus = 'pending' | 'active' | 'completed' | 'locked'

export type Priority = 'critical' | 'high' | 'moderate' | 'skip'
export type TopicPriority = Priority

export type AITool = 'chatgpt' | 'claude' | 'gemini' | 'notebooklm'

export type TargetMarks = 'pass' | '55-70' | '70-85' | '85+'

export type ExamMode = 'emergency' | 'standard' | 'thorough'

export type SubjectCategory =
  | 'derivation-heavy'
  | 'memorization-heavy'
  | 'conceptual'
  | 'numerical-heavy'
  | 'mixed'

// Hours buckets for the exam session
export type HoursRemaining = 4 | 8 | 12 | 18 | 24 | 36 | 48 | 72

export interface Topic {
  id: string
  name: string
  priority: TopicPriority
  estimatedMinutes: number
  isCompleted: boolean
  subtopics?: string[]
  marks?: number // marks weightage in exam
  appearedInPYQ?: boolean
  lastAppeared?: string // e.g. "2023"
  notes?: string
}

export interface ExamSession {
  id: string
  sessionToken: string
  subject: string
  subjectCode?: string
  hoursRemaining: number
  targetMarks: TargetMarks
  examMode: ExamMode
  currentPhase: WorkflowPhase
  phaseStatuses: Record<WorkflowPhase, PhaseStatus>
  topics: Topic[]
  skipList: string[] // topic names explicitly marked skip
  criticalTopics: Topic[]
  weakTopics?: string[]
  createdAt: Date
  lastActiveAt: Date
  isPaid: boolean
  professorProfileId?: string
  professorArchetype?: string
  subjectCategory?: SubjectCategory
  strategy?: GeneratedStrategy
}

export interface GeneratedStrategy {
  scores: {
    survivabilityScore: number
    confidenceLevel: number
    coveragePercent: number
    estimatedMarks: string
    emergencyLevel: 'critical' | 'emergency' | 'stable' | 'recovering'
    aiConfidence: number
    recoveryChance?: string
    examRiskLevel?: 'Recoverable' | 'High Risk' | 'Stable' | 'Critical Survival Mode'
    confidenceStatus?: string
  }
  topics: {
    id: string
    name: string
    priority: TopicPriority | 'high'
    marks: number
    pyqFreq: number
    hoursNeeded: number
    isWeak: boolean
    appearedIn: string
    safeToSkipReason?: string
  }[]
  workflows: {
    id: string
    phase: string
    title: string
    tool: 'chatgpt' | 'claude' | 'gemini' | 'notebooklm'
    toolLabel: string
    toolColor: string
    duration: string
    topics: string[]
    purpose: string
    explanation: string
    icon: string
  }[]
  prompts: any[]
  revisionStrategy: any[]
  flashcards: any[]
  audioRecommendations: any[]
  timeline: any[]
  professorTips: any[]
}

export interface SessionSummary {
  sessionId: string
  subject: string
  hoursRemaining: number
  topicsCovered: number
  totalTopics: number
  currentPhase: WorkflowPhase
  completionPercent: number
  createdAt: Date
}
