'use client'
// ============================================================
// CramPilot — Workflow Store (Zustand)
// State for the generated workflow, schedule, AI recommendations
// ============================================================

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type {
  GeneratedWorkflow,
  TimeBlock,
  AIRecommendation,
  EmergencyLevel,
} from '@/types'

interface WorkflowState {
  // ── State ──────────────────────────────────────────────────
  workflow: GeneratedWorkflow | null
  isGenerating: boolean
  generationStep: string    // e.g. "Analyzing your syllabus..."
  error: string | null

  // ── Actions ────────────────────────────────────────────────
  setWorkflow: (workflow: GeneratedWorkflow) => void
  clearWorkflow: () => void

  markBlockComplete: (blockId: string) => void
  dismissRecommendation: (recId: string) => void

  setGenerating: (v: boolean) => void
  setGenerationStep: (step: string) => void
  setError: (err: string | null) => void

  // ── Computed ───────────────────────────────────────────────
  getActiveBlock: () => TimeBlock | null
  getEmergencyLevel: () => EmergencyLevel
  getCompletedBlockCount: () => number
  getActiveRecommendations: () => AIRecommendation[]
}

export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set, get) => ({
      workflow: null,
      isGenerating: false,
      generationStep: '',
      error: null,

      setWorkflow: (workflow) => set({ workflow, error: null }),
      clearWorkflow: () => set({ workflow: null }),

      markBlockComplete: (blockId) =>
        set((state) => {
          if (!state.workflow) return {}
          return {
            workflow: {
              ...state.workflow,
              schedule: {
                ...state.workflow.schedule,
                timeBlocks: state.workflow.schedule.timeBlocks.map((b) =>
                  b.id === blockId ? { ...b, isCompleted: true } : b
                ),
              },
            },
          }
        }),

      dismissRecommendation: (recId) =>
        set((state) => {
          if (!state.workflow) return {}
          return {
            workflow: {
              ...state.workflow,
              recommendations: state.workflow.recommendations.map((r) =>
                r.id === recId ? { ...r, isDismissed: true } : r
              ),
            },
          }
        }),

      setGenerating: (v) => set({ isGenerating: v }),
      setGenerationStep: (step) => set({ generationStep: step }),
      setError: (err) => set({ error: err }),

      getActiveBlock: () => {
        const { workflow } = get()
        if (!workflow) return null
        const now = new Date()
        return (
          workflow.schedule.timeBlocks.find((b) => {
            const start = new Date(b.startTime)
            const end = new Date(b.endTime)
            return start <= now && now < end && !b.isCompleted
          }) ?? null
        )
      },

      getEmergencyLevel: () => {
        const { workflow } = get()
        return workflow?.emergencyLevel ?? 'medium'
      },

      getCompletedBlockCount: () => {
        const { workflow } = get()
        return workflow?.schedule.timeBlocks.filter((b) => b.isCompleted).length ?? 0
      },

      getActiveRecommendations: () => {
        const { workflow } = get()
        return workflow?.recommendations.filter((r) => !r.isDismissed) ?? []
      },
    }),
    {
      name: 'ec-workflow',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ workflow: state.workflow }),
    }
  )
)
