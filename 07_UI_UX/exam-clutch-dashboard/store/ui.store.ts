'use client'
// ============================================================
// CramPilot — UI Store (Zustand)
// Global UI state: sidebar, modals, toasts, mobile nav
// ============================================================

import { create } from 'zustand'

type ModalId =
  | 'professor-survey'
  | 'pyq-upload'
  | 'phase-complete'
  | 'session-complete'
  | 'unlock-predictions'
  | null

interface UIState {
  // ── Navigation ─────────────────────────────────────────────
  isSidebarOpen: boolean
  activeMobileTab: 'session' | 'prompts' | 'schedule' | 'profile'

  // ── Modals ─────────────────────────────────────────────────
  activeModal: ModalId
  modalPayload: Record<string, unknown>

  // ── Loading overlays ───────────────────────────────────────
  isGlobalLoading: boolean
  globalLoadingMessage: string

  // ── Emergency indicator ────────────────────────────────────
  isEmergencyMode: boolean

  // ── Actions ────────────────────────────────────────────────
  toggleSidebar: () => void
  setSidebarOpen: (v: boolean) => void

  setActiveMobileTab: (tab: UIState['activeMobileTab']) => void

  openModal: (id: ModalId, payload?: Record<string, unknown>) => void
  closeModal: () => void

  setGlobalLoading: (v: boolean, message?: string) => void
  setEmergencyMode: (v: boolean) => void
}

export const useUIStore = create<UIState>()((set) => ({
  isSidebarOpen: false,
  activeMobileTab: 'session',

  activeModal: null,
  modalPayload: {},

  isGlobalLoading: false,
  globalLoadingMessage: '',

  isEmergencyMode: false,

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (v) => set({ isSidebarOpen: v }),

  setActiveMobileTab: (tab) => set({ activeMobileTab: tab }),

  openModal: (id, payload = {}) =>
    set({ activeModal: id, modalPayload: payload }),
  closeModal: () => set({ activeModal: null, modalPayload: {} }),

  setGlobalLoading: (v, message = '') =>
    set({ isGlobalLoading: v, globalLoadingMessage: message }),

  setEmergencyMode: (v) => set({ isEmergencyMode: v }),
}))
