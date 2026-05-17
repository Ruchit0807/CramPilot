'use client'
// ============================================================
// CramPilot — Professor Survey Store (Zustand) v2
// State for the professor intelligence profiling flow
// ============================================================

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type {
  ProfessorSurveyAnswersV2,
  ProfessorProfile,
  ProfessorArchetype,
  ExamFormat,
  MarkingStyle,
  PYQConsistency,
  SuccessPattern,
  ImportanceScale,
  YesNoMaybe,
} from '@/types'

// Re-export original for backwards compat
export type { ProfessorArchetype, ExamFormat, MarkingStyle, PYQConsistency, SuccessPattern }

interface ProfessorState {
  // ── Survey state ───────────────────────────────────────────
  answers: Partial<ProfessorSurveyAnswersV2>
  currentQuestion: number   // 0–7 (8 questions total)
  isComplete: boolean
  isSurveyOpen: boolean

  // ── Derived profile ────────────────────────────────────────
  profile: ProfessorProfile | null
  isGenerating: boolean

  // ── Actions ────────────────────────────────────────────────
  setAnswer: (field: keyof ProfessorSurveyAnswersV2, value: string | number) => void
  nextQuestion: () => void
  prevQuestion: () => void
  goToQuestion: (index: number) => void
  setProfile: (profile: ProfessorProfile) => void
  clearSurvey: () => void
  openSurvey: () => void
  closeSurvey: () => void
  setGenerating: (v: boolean) => void

  // ── Computed ───────────────────────────────────────────────
  getCompletionPercent: () => number
  canSubmit: () => boolean
  canAdvance: () => boolean
}

// Derive professor archetype from survey answers (rule-based for MVP)
// Kept for backwards compatibility — use generateProfessorProfile from lib/ for full profile
export function deriveArchetype(answers: Partial<ProfessorSurveyAnswersV2>): ProfessorArchetype {
  const { markingStyle, examFormat, pyqConsistency, successPattern, isStrictChecker, derivationsHeavilyMarked } = answers

  if (isStrictChecker === 'yes' && markingStyle === 'strict') return 'strict-marker'
  if (derivationsHeavilyMarked === 'yes' || examFormat === 'derivations' || examFormat === 'problems') return 'problem-setter'
  if (markingStyle === 'strict') return 'strict-marker'
  if (examFormat === 'case-scenarios') return 'case-analyst'
  if (pyqConsistency === 'very-consistent') return 'pyq-repeater'
  if (successPattern === 'memorize-definitions' && examFormat === 'essays') return 'theory-scholar'
  if (markingStyle === 'rewards-depth') return 'depth-seeker'
  if (markingStyle === 'rewards-coverage') return 'coverage-checker'
  return 'mixed-generalist'
}

const TOTAL_QUESTIONS = 8

// Required fields per question index (for canAdvance check)
const REQUIRED_FIELD_PER_STEP: (keyof ProfessorSurveyAnswersV2)[] = [
  'prefersLongAnswers',
  'diagramsImportance',
  'derivationsHeavilyMarked',
  'repeatsPYQs',
  'isStrictChecker',
  'conceptualQuestionsCommon',
  'numericalProblemsImportance',
  'presentationMatters',
]

export const useProfessorStore = create<ProfessorState>()(
  persist(
    (set, get) => ({
      answers: {},
      currentQuestion: 0,
      isComplete: false,
      isSurveyOpen: false,
      profile: null,
      isGenerating: false,

      setAnswer: (field, value) =>
        set((state) => ({
          answers: { ...state.answers, [field]: value },
        })),

      nextQuestion: () =>
        set((state) => {
          const next = state.currentQuestion + 1
          if (next >= TOTAL_QUESTIONS) {
            return { isComplete: true, currentQuestion: TOTAL_QUESTIONS - 1 }
          }
          return { currentQuestion: next }
        }),

      prevQuestion: () =>
        set((state) => ({
          currentQuestion: Math.max(0, state.currentQuestion - 1),
        })),

      goToQuestion: (index) =>
        set({ currentQuestion: Math.max(0, Math.min(index, TOTAL_QUESTIONS - 1)) }),

      setProfile: (profile) => set({ profile }),

      clearSurvey: () =>
        set({
          answers: {},
          currentQuestion: 0,
          isComplete: false,
          profile: null,
        }),

      openSurvey: () => set({ isSurveyOpen: true }),
      closeSurvey: () => set({ isSurveyOpen: false }),
      setGenerating: (v) => set({ isGenerating: v }),

      getCompletionPercent: () => {
        const { answers } = get()
        const filled = REQUIRED_FIELD_PER_STEP.filter(
          (k) => answers[k] !== undefined && answers[k] !== ''
        ).length
        return Math.round((filled / TOTAL_QUESTIONS) * 100)
      },

      canSubmit: () => {
        const { answers } = get()
        return REQUIRED_FIELD_PER_STEP.every(
          (k) => answers[k] !== undefined && answers[k] !== ''
        )
      },

      canAdvance: () => {
        const { answers, currentQuestion } = get()
        const requiredField = REQUIRED_FIELD_PER_STEP[currentQuestion]
        if (!requiredField) return false
        return answers[requiredField] !== undefined && answers[requiredField] !== ''
      },
    }),
    {
      name: 'ec-professor',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ answers: state.answers, profile: state.profile }),
    }
  )
)
