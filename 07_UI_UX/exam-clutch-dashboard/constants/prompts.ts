// ============================================================
// CramPilot — Prompt Constants
// AI tool definitions, prompt categories, task type configs
// ============================================================

import type { AITool, TaskType } from '@/types'
import type { PromptCategory } from '@/types'

export const AI_TOOLS: Record<AITool, {
  label: string
  shortLabel: string
  color: string         // Tailwind bg color token
  badgeColor: string    // For badge pill
  url: string
  freeTokenLimit?: number
  icon: string
}> = {
  chatgpt: {
    label: 'ChatGPT',
    shortLabel: 'GPT',
    color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    badgeColor: '#10B981',
    url: 'https://chat.openai.com',
    freeTokenLimit: 8192,
    icon: 'MessageSquare',
  },
  claude: {
    label: 'Claude',
    shortLabel: 'Claude',
    color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    badgeColor: '#F97316',
    url: 'https://claude.ai',
    freeTokenLimit: 4096,
    icon: 'Sparkles',
  },
  gemini: {
    label: 'Gemini',
    shortLabel: 'Gemini',
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    badgeColor: '#3B82F6',
    url: 'https://gemini.google.com',
    freeTokenLimit: 32768,
    icon: 'Zap',
  },
  notebooklm: {
    label: 'NotebookLM',
    shortLabel: 'NLM',
    color: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    badgeColor: '#8B5CF6',
    url: 'https://notebooklm.google.com',
    icon: 'BookMarked',
  },
}

export const TASK_TYPE_LABELS: Record<TaskType, string> = {
  'concept-load': 'Concept Overview',
  'deep-understanding': 'Deep Understanding',
  'practice-questions': 'Practice Questions',
  'flashcards': 'Flashcard Generation',
  'revision-notes': 'Revision Notes',
  'last-minute-summary': 'Last-Minute Summary',
  'answer-framework': 'Answer Framework',
  'marks-trap-review': 'Marks Trap Check',
}

export const PROMPT_CATEGORY_LABELS: Record<PromptCategory, string> = {
  'concept-learning': 'Concept Learning',
  'practice-questions': 'Practice Questions',
  'revision-notes': 'Revision Notes',
  'flashcards': 'Flashcards',
  'answer-framework': 'Answer Framework',
  'marks-trap-check': 'Marks Trap Check',
  'last-minute-summary': 'Last-Minute Summary',
  'examiner-perspective': "Examiner's View",
  'topic-deep-dive': 'Topic Deep Dive',
  'skip-verification': 'Skip Verification',
}

// Free tier character limits for each AI tool
export const FREE_CHAR_LIMITS: Record<AITool, number> = {
  chatgpt: 12000,
  claude: 8000,
  gemini: 50000,
  notebooklm: 500000,
}
