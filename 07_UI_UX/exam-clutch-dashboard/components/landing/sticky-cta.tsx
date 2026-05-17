'use client'
// ============================================================
// CramPilot — Sticky Mobile CTA
// Always-visible "Build My Plan" button that appears after
// user scrolls past hero. Critical for mobile students who
// decide mid-scroll to start. Disappears at footer.
// ============================================================

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function StickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => {
      // Show after scrolling 80% of the viewport height (past hero CTA)
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden safe-bottom"
        >
          {/* Gradient backdrop */}
          <div className="bg-gradient-to-t from-[#111110] via-[#111110]/95 to-transparent pt-4 pb-4 px-4">
            <Link
              href="/session/new"
              className="flex items-center justify-center gap-2 w-full h-13 py-3.5 rounded-2xl bg-[#818CF8] text-[#111110] font-medium text-body shadow-xl shadow-[#818CF8]/30 hover:bg-[#818CF8]/90 transition-all duration-150 active:scale-[0.98]"
            >
              Build My Study Plan →
            </Link>
            <p className="text-caption text-[#706E67] text-center mt-2">
              No account · Free · 60 seconds
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
