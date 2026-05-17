'use client'
// ============================================================
// CramPilot — Professor Survey Page
// Route: /session/professor
// Dedicated page for the professor intelligence survey flow
// ============================================================

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { ProfessorSurvey } from '@/components/professor/professor-survey'

export default function ProfessorSurveyPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[var(--ec-bg-page)]">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-[var(--ec-bg-page)]/90 backdrop-blur-md border-b border-white/8 px-4 py-3">
        <div className="max-w-xl mx-auto flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm text-[var(--ec-text-secondary)] hover:text-[var(--ec-text-primary)] transition-colors p-1.5 -ml-1.5 rounded-lg hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-xl mx-auto px-4 py-6 pb-28"
      >
        {/* Heading */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-[var(--ec-purple)] uppercase tracking-wider mb-1">
            Step 2 of 3
          </p>
          <h1 className="text-2xl font-bold text-[var(--ec-text-primary)] leading-tight">
            Tell us about your professor
          </h1>
          <p className="text-[var(--ec-text-secondary)] text-sm mt-2 leading-relaxed">
            8 quick questions. We'll build a personalized strategy that accounts for how
            <em> your specific professor</em> checks papers.
          </p>
        </div>

        {/* Survey */}
        <ProfessorSurvey
          onComplete={() => router.push('/dashboard')}
          onSkip={() => router.push('/dashboard')}
        />
      </motion.div>
    </div>
  )
}
