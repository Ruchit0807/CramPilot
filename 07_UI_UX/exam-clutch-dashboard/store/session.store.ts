'use client'
// ============================================================
// CramPilot — Session Store (Zustand)
// Core exam session state: subject, hours, topics, phase
// ============================================================

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type {
  ExamSession,
  Topic,
  WorkflowPhase,
  TopicPriority,
  TargetMarks,
  ExamMode,
} from '@/types'

interface SessionState {
  // ── State ──────────────────────────────────────────────────
  session: ExamSession | null
  sessionHistory: ExamSession[]
  activeTab: string
  completedBlocks: string[]
  isLoading: boolean
  error: string | null

  // ── Actions ────────────────────────────────────────────────
  createSession: (params: {
    subject: string
    hoursRemaining: number
    targetMarks: TargetMarks
    weakTopics?: string[]
    professorArchetype?: string
    subjectCategory?: any
    examMode?: ExamMode
  }) => ExamSession
  
  setStrategy: (strategy: any) => void

  updateSession: (updates: Partial<ExamSession>) => void
  clearSession: () => void

  setTopics: (topics: Topic[]) => void
  updateTopicPriority: (topicId: string, priority: TopicPriority) => void
  markTopicComplete: (topicId: string) => void
  unmarkTopicComplete: (topicId: string) => void

  advancePhase: () => void
  setPhase: (phase: WorkflowPhase) => void

  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void

  // ── UI Persistence Actions ───────────────────────────────────
  setActiveTab: (tab: string) => void
  toggleBlock: (blockId: string) => void
  loadSession: (sessionId: string) => void
  archiveSession: () => void

  // ── Computed helpers ───────────────────────────────────────
  getCompletionPercent: () => number
  getCriticalTopics: () => Topic[]
  getRemainingCriticalTopics: () => Topic[]
}

const PHASE_ORDER: WorkflowPhase[] = [
  'triage', 'coverage', 'recall', 'gap-repair', 'simulate', 'complete',
]

function generateSessionId(): string {
  return `ec_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

function generateToken(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function getInitialPhaseStatuses(): ExamSession['phaseStatuses'] {
  return {
    triage: 'active',
    coverage: 'locked',
    recall: 'locked',
    'gap-repair': 'locked',
    simulate: 'locked',
    complete: 'locked',
  }
}

function inferExamMode(hours: number): ExamMode {
  if (hours <= 12) return 'emergency'
  if (hours <= 36) return 'standard'
  return 'thorough'
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      session: null,
      sessionHistory: [],
      activeTab: 'overview',
      completedBlocks: [],
      isLoading: false,
      error: null,

      createSession: ({ subject, hoursRemaining, targetMarks, weakTopics, examMode, professorArchetype, subjectCategory }) => {
        const mode = examMode ?? inferExamMode(hoursRemaining)
        const newSession: ExamSession = {
          id: generateSessionId(),
          sessionToken: generateToken(),
          subject,
          subjectCategory,
          professorArchetype,
          hoursRemaining,
          targetMarks,
          weakTopics: weakTopics ?? [],
          examMode: mode,
          currentPhase: 'triage',
          phaseStatuses: getInitialPhaseStatuses(),
          topics: [],
          skipList: [],
          criticalTopics: [],
          createdAt: new Date(),
          lastActiveAt: new Date(),
          isPaid: false,
        }
        
        const currentState = get()
        const newHistory = currentState.session 
          ? [currentState.session, ...currentState.sessionHistory].slice(0, 5) 
          : currentState.sessionHistory

        set({ 
          session: newSession, 
          sessionHistory: newHistory,
          activeTab: 'overview',
          completedBlocks: [],
          error: null 
        })
        return newSession
      },

      setStrategy: (strategy) =>
        set((state) => ({
          session: state.session
            ? { ...state.session, strategy, lastActiveAt: new Date() }
            : null,
        })),

      updateSession: (updates) =>
        set((state) => ({
          session: state.session
            ? { ...state.session, ...updates, lastActiveAt: new Date() }
            : null,
        })),

      clearSession: () => set({ session: null, error: null }),

      setTopics: (topics) =>
        set((state) => {
          if (!state.session) return {}
          const criticalTopics = topics.filter((t) => t.priority === 'critical')
          const skipList = topics
            .filter((t) => t.priority === 'skip')
            .map((t) => t.name)
          return {
            session: {
              ...state.session,
              topics,
              criticalTopics,
              skipList,
              lastActiveAt: new Date(),
            },
          }
        }),

      updateTopicPriority: (topicId, priority) =>
        set((state) => {
          if (!state.session) return {}
          const topics = state.session.topics.map((t) =>
            t.id === topicId ? { ...t, priority } : t
          )
          const criticalTopics = topics.filter((t) => t.priority === 'critical')
          const skipList = topics
            .filter((t) => t.priority === 'skip')
            .map((t) => t.name)
          return {
            session: { ...state.session, topics, criticalTopics, skipList },
          }
        }),

      markTopicComplete: (topicId) =>
        set((state) => {
          if (!state.session) return {}
          return {
            session: {
              ...state.session,
              topics: state.session.topics.map((t) =>
                t.id === topicId ? { ...t, isCompleted: true } : t
              ),
              lastActiveAt: new Date(),
            },
          }
        }),

      unmarkTopicComplete: (topicId) =>
        set((state) => {
          if (!state.session) return {}
          return {
            session: {
              ...state.session,
              topics: state.session.topics.map((t) =>
                t.id === topicId ? { ...t, isCompleted: false } : t
              ),
            },
          }
        }),

      advancePhase: () =>
        set((state) => {
          if (!state.session) return {}
          const currentIndex = PHASE_ORDER.indexOf(state.session.currentPhase)
          const nextPhase = PHASE_ORDER[currentIndex + 1] ?? 'complete'
          const phaseStatuses = { ...state.session.phaseStatuses }
          phaseStatuses[state.session.currentPhase] = 'completed'
          phaseStatuses[nextPhase] = 'active'
          return {
            session: {
              ...state.session,
              currentPhase: nextPhase,
              phaseStatuses,
              lastActiveAt: new Date(),
            },
          }
        }),

      setPhase: (phase) =>
        set((state) => {
          if (!state.session) return {}
          return {
            session: { ...state.session, currentPhase: phase },
          }
        }),

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      getCompletionPercent: () => {
        const { session } = get()
        if (!session || session.topics.length === 0) return 0
        const completed = session.topics.filter((t) => t.isCompleted).length
        return Math.round((completed / session.topics.length) * 100)
      },

      getCriticalTopics: () => {
        const { session } = get()
        return session?.topics.filter((t) => t.priority === 'critical') ?? []
      },

      getRemainingCriticalTopics: () => {
        const { session } = get()
        return (
          session?.topics.filter(
            (t) => t.priority === 'critical' && !t.isCompleted
          ) ?? []
        )
      },

      setActiveTab: (tab) => set({ activeTab: tab }),

      toggleBlock: (blockId) => set((state) => {
        const isDone = state.completedBlocks.includes(blockId)
        const newBlocks = isDone
          ? state.completedBlocks.filter(id => id !== blockId)
          : [...state.completedBlocks, blockId]

        // Dynamically update confidence status & coverage based on timeline progress
        const session = state.session
        if (session && session.strategy) {
          const totalBlocks = session.strategy.timeline.length
          const completedCount = newBlocks.length
          const progressPercent = Math.round((completedCount / totalBlocks) * 100)
          
          let newConfidenceStatus = session.strategy.scores.confidenceStatus
          if (progressPercent > 75) newConfidenceStatus = 'Confident'
          else if (progressPercent > 40) newConfidenceStatus = 'Cautiously Optimistic'
          
          const newScores = {
            ...session.strategy.scores,
            coveragePercent: Math.min(100, session.strategy.scores.coveragePercent + (isDone ? -2 : 2)),
            confidenceStatus: newConfidenceStatus
          }
          
          return {
            completedBlocks: newBlocks,
            session: {
              ...session,
              strategy: {
                ...session.strategy,
                scores: newScores
              }
            }
          }
        }

        return { completedBlocks: newBlocks }
      }),

      loadSession: (sessionId) => set((state) => {
        const target = state.sessionHistory.find(s => s.id === sessionId)
        if (!target) return state
        
        const currentSession = state.session
        const newHistory = state.sessionHistory.filter(s => s.id !== sessionId)
        if (currentSession) {
          newHistory.unshift(currentSession)
        }

        return {
          session: target,
          sessionHistory: newHistory,
          activeTab: 'overview',
          completedBlocks: [],
        }
      }),

      archiveSession: () => set((state) => {
        if (!state.session) return state
        return {
          sessionHistory: [state.session, ...state.sessionHistory].slice(0, 5),
          session: null,
          activeTab: 'overview',
          completedBlocks: []
        }
      }),
    }),
    {
      name: 'ec-session',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        session: state.session,
        sessionHistory: state.sessionHistory,
        activeTab: state.activeTab,
        completedBlocks: state.completedBlocks
      }),
    }
  )
)
