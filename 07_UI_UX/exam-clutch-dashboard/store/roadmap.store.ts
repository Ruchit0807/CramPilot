'use client'
// ============================================================
// CramPilot — Roadmap Store (Zustand)
// State for study roadmap and PYQ analysis
// ============================================================

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { StudyRoadmap, PYQAnalysis, PredictedQuestion } from '@/types'

interface RoadmapState {
  roadmap: StudyRoadmap | null
  pyqAnalysis: PYQAnalysis | null
  isPyqLoading: boolean
  isRoadmapLoading: boolean

  setRoadmap: (roadmap: StudyRoadmap) => void
  setPYQAnalysis: (analysis: PYQAnalysis) => void
  clearRoadmap: () => void
  clearPYQ: () => void

  setPyqLoading: (v: boolean) => void
  setRoadmapLoading: (v: boolean) => void

  // Computed
  getTopPredictions: (limit?: number) => PredictedQuestion[]
  getHighProbabilityTopics: () => string[]
}

export const useRoadmapStore = create<RoadmapState>()(
  persist(
    (set, get) => ({
      roadmap: null,
      pyqAnalysis: null,
      isPyqLoading: false,
      isRoadmapLoading: false,

      setRoadmap: (roadmap) => set({ roadmap }),
      setPYQAnalysis: (analysis) => set({ pyqAnalysis: analysis }),
      clearRoadmap: () => set({ roadmap: null }),
      clearPYQ: () => set({ pyqAnalysis: null }),
      setPyqLoading: (v) => set({ isPyqLoading: v }),
      setRoadmapLoading: (v) => set({ isRoadmapLoading: v }),

      getTopPredictions: (limit = 5) => {
        const { pyqAnalysis } = get()
        if (!pyqAnalysis) return []
        return [...pyqAnalysis.topPredictions]
          .sort((a, b) => b.stars - a.stars)
          .slice(0, limit)
      },

      getHighProbabilityTopics: () => {
        const { pyqAnalysis } = get()
        if (!pyqAnalysis) return []
        return pyqAnalysis.frequencyTable
          .filter((f) => f.probability >= 70)
          .map((f) => f.topic)
      },
    }),
    {
      name: 'ec-roadmap',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        roadmap: state.roadmap,
        pyqAnalysis: state.pyqAnalysis,
      }),
    }
  )
)
