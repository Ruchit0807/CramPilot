// ============================================================
// CramPilot — Workflow Constants
// Phase definitions, step counts, timing configs
// ============================================================

import type { WorkflowPhase } from '@/types'

export const WORKFLOW_PHASES: Record<WorkflowPhase, {
  label: string
  shortLabel: string
  description: string
  icon: string
  order: number
  percentOfTime: number
}> = {
  triage: {
    label: 'Triage & Strategy',
    shortLabel: 'Triage',
    description: 'Identify what matters. Build your priority list.',
    icon: 'Target',
    order: 1,
    percentOfTime: 10,
  },
  coverage: {
    label: 'Topic Coverage',
    shortLabel: 'Coverage',
    description: 'Work through critical topics systematically.',
    icon: 'BookOpen',
    order: 2,
    percentOfTime: 50,
  },
  recall: {
    label: 'Active Recall',
    shortLabel: 'Recall',
    description: 'Test your retention with practice questions.',
    icon: 'Brain',
    order: 3,
    percentOfTime: 20,
  },
  'gap-repair': {
    label: 'Gap Repair',
    shortLabel: 'Gaps',
    description: 'Reinforce weak areas identified during recall.',
    icon: 'Wrench',
    order: 4,
    percentOfTime: 15,
  },
  simulate: {
    label: 'Exam Simulation',
    shortLabel: 'Simulate',
    description: 'Final run-through under exam conditions.',
    icon: 'ClipboardList',
    order: 5,
    percentOfTime: 5,
  },
  complete: {
    label: 'Complete',
    shortLabel: 'Done',
    description: 'You are prepared. Rest and confidence.',
    icon: 'CheckCircle',
    order: 6,
    percentOfTime: 0,
  },
}

export const PHASE_ORDER: WorkflowPhase[] = [
  'triage',
  'coverage',
  'recall',
  'gap-repair',
  'simulate',
  'complete',
]

export const MAX_API_CALLS_FREE = 3
export const MAX_API_CALLS_PAID = 6
export const SESSION_STORAGE_KEY = 'ec_session'
export const WORKFLOW_STORAGE_KEY = 'ec_workflow'
