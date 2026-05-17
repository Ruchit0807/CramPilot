'use client'
// ============================================================
// CramPilot — Page Transition Provider
// Wraps each page with AnimatePresence + motion.div
// keyed on pathname so transitions fire on every route change
// ============================================================

import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
