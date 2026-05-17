// ============================================================
// CramPilot — Animation Presets (Framer Motion)
// All animation variants used across the app
// Respects prefers-reduced-motion
// ============================================================

import type { Variants, Transition } from 'framer-motion'

// ── Base transitions ──────────────────────────────────────────
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
}

export const easeOutTransition: Transition = {
  duration: 0.2,
  ease: [0.16, 1, 0.3, 1],
}

export const pageTransition: Transition = {
  duration: 0.3,
  ease: [0.16, 1, 0.3, 1],
}

// ── Page-level transitions ────────────────────────────────────
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: pageTransition },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
}

// ── Card animations ───────────────────────────────────────────
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: easeOutTransition },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
}

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

// ── Stagger container (for lists of cards) ─────────────────────
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
}

// ── Card expand (for prompt preview cards) ─────────────────────
export const cardExpandVariants: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
}

// ── Priority bar (topic completion state change) ───────────────
export const priorityBarVariants: Variants = {
  initial: { scaleY: 0 },
  animate: {
    scaleY: 1,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
}

// ── Checkmark draw animation ───────────────────────────────────
export const checkmarkVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.15, ease: 'easeOut' },
  },
}

// ── Slide up (phase transitions — always upward for progress) ──
export const slideUpEnter: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
}

export const slideUpExit: Variants = {
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
}

// ── Loading progress bar (irregular fill speed) ────────────────
export const loadingBarVariants: Variants = {
  initial: { scaleX: 0, transformOrigin: 'left' },
  animate: {
    scaleX: [0, 0.3, 0.5, 0.65, 0.75, 0.82, 0.9, 0.95],
    transition: {
      duration: 8,
      times: [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
      ease: 'linear',
    },
  },
  complete: {
    scaleX: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

// ── Emergency banner pulse ──────────────────────────────────────
export const emergencyPulse: Variants = {
  animate: {
    opacity: [0.8, 1, 0.8],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
}

// ── Modal overlay ──────────────────────────────────────────────
export const overlayVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
}

export const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.15, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.1 },
  },
}

// ── Bottom sheet (mobile modals) ───────────────────────────────
export const bottomSheetVariants: Variants = {
  initial: { y: '100%' },
  animate: {
    y: 0,
    transition: { type: 'spring', stiffness: 350, damping: 35 },
  },
  exit: {
    y: '100%',
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}
