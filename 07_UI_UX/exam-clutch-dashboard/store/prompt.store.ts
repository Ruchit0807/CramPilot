'use client'
// ============================================================
// CramPilot — Prompt Pack Store (Zustand)
// State for the prompt template library and filled prompts
// ============================================================

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { PromptPack, PromptTemplate, FilledPrompt } from '@/types'
import type { AITool, TaskType } from '@/types'
import type { PromptCategory } from '@/types'

interface PromptFilters {
  tool: AITool | 'all'
  category: PromptCategory | 'all'
  taskType: TaskType | 'all'
  showPaidOnly: boolean
}

interface PromptState {
  // ── State ──────────────────────────────────────────────────
  pack: PromptPack | null
  copiedPromptId: string | null   // for "Copied ✓" feedback
  expandedPromptId: string | null // for expanded card state
  filters: PromptFilters
  usedPromptIds: string[]         // prompts marked as used

  // ── Actions ────────────────────────────────────────────────
  setPack: (pack: PromptPack) => void
  clearPack: () => void

  setFilter: <K extends keyof PromptFilters>(key: K, value: PromptFilters[K]) => void
  resetFilters: () => void

  markCopied: (promptId: string) => void
  clearCopied: () => void
  toggleExpanded: (promptId: string | null) => void
  markUsed: (promptId: string) => void

  // ── Computed ───────────────────────────────────────────────
  getFilteredTemplates: () => PromptTemplate[]
  getFilteredFilledPrompts: () => FilledPrompt[]
}

const defaultFilters: PromptFilters = {
  tool: 'all',
  category: 'all',
  taskType: 'all',
  showPaidOnly: false,
}

export const usePromptStore = create<PromptState>()(
  persist(
    (set, get) => ({
      pack: null,
      copiedPromptId: null,
      expandedPromptId: null,
      filters: defaultFilters,
      usedPromptIds: [],

      setPack: (pack) => set({ pack }),
      clearPack: () => set({ pack: null }),

      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      resetFilters: () => set({ filters: defaultFilters }),

      markCopied: (promptId) => set({ copiedPromptId: promptId }),
      clearCopied: () => set({ copiedPromptId: null }),

      toggleExpanded: (promptId) =>
        set((state) => ({
          expandedPromptId:
            state.expandedPromptId === promptId ? null : promptId,
        })),

      markUsed: (promptId) =>
        set((state) => ({
          usedPromptIds: state.usedPromptIds.includes(promptId)
            ? state.usedPromptIds
            : [...state.usedPromptIds, promptId],
        })),

      getFilteredTemplates: () => {
        const { pack, filters } = get()
        if (!pack) return []
        return pack.templates.filter((t) => {
          if (filters.tool !== 'all' && t.targetTool !== filters.tool) return false
          if (filters.category !== 'all' && t.category !== filters.category) return false
          if (filters.taskType !== 'all' && t.taskType !== filters.taskType) return false
          return true
        })
      },

      getFilteredFilledPrompts: () => {
        const { pack, filters } = get()
        if (!pack) return []
        return pack.filledPrompts.filter((p) => {
          if (filters.tool !== 'all' && p.toolTarget !== filters.tool) return false
          return true
        })
      },
    }),
    {
      name: 'ec-prompts',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        pack: state.pack,
        usedPromptIds: state.usedPromptIds,
      }),
    }
  )
)
