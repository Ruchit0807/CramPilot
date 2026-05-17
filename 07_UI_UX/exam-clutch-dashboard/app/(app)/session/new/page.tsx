'use client'
// ============================================================
// CramPilot — New Session Page
// Route: /session/new
// Entry point for the onboarding flow
// ============================================================

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  Target,
  BookOpen,
  ChevronRight,
  Zap,
  Brain,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSessionStore } from '@/store/session.store'
import type { TargetMarks } from '@/types'

const TARGET_OPTIONS: { value: TargetMarks; label: string; sublabel: string; color: string }[] = [
  { value: 'pass', label: 'Just Pass', sublabel: '35–55%', color: 'border-red-500/30 bg-red-500/8 text-red-400' },
  { value: '55-70', label: 'Decent Marks', sublabel: '55–70%', color: 'border-amber-500/30 bg-amber-500/8 text-amber-400' },
  { value: '70-85', label: 'Good Score', sublabel: '70–85%', color: 'border-blue-500/30 bg-blue-500/8 text-blue-400' },
  { value: '85+', label: 'Top Score', sublabel: '85%+', color: 'border-[var(--ec-purple)]/30 bg-[var(--ec-purple)]/8 text-[var(--ec-purple)]' },
]

const HOUR_OPTIONS = [4, 8, 12, 18, 24, 36, 48, 72]

function getHourLabel(h: number): string {
  if (h <= 8) return `${h}h 🔥`
  if (h <= 24) return `${h}h`
  return `${h}h`
}

function getUrgencyMessage(hours: number, subject: string): string {
  if (!subject) return ''
  if (hours <= 8) return `${hours} hours is tight — we'll cut your syllabus in half and focus only on what matters.`
  if (hours <= 24) return `${hours} hours is doable. We'll build a focused sprint plan.`
  return `${hours} hours gives us room. You can score well if you follow the plan.`
}

export default function NewSessionPage() {
  const router = useRouter()
  const { createSession } = useSessionStore()

  const [subject, setSubject] = useState('')
  const [hours, setHours] = useState<number>(12)
  const [targetMarks, setTargetMarks] = useState<TargetMarks>('70-85')
  const [step, setStep] = useState<1 | 2 | 3>(1)

  const urgencyMessage = getUrgencyMessage(hours, subject)
  const canProceedStep1 = subject.trim().length >= 2
  const canProceedStep2 = hours > 0

  function handleStartSession() {
    createSession({ subject: subject.trim(), hoursRemaining: hours, targetMarks })
    router.push('/session/professor')
  }

  return (
    <div className="min-h-screen bg-[var(--ec-bg-page)]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-lg mx-auto px-4 py-8 pb-28"
      >
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-[var(--ec-purple)] uppercase tracking-wider mb-1">
            New Session
          </p>
          <h1 className="text-2xl font-bold text-[var(--ec-text-primary)] leading-tight">
            What exam are you surviving?
          </h1>
          <p className="text-[var(--ec-text-secondary)] text-sm mt-2">
            Takes 2 minutes. Gets you a full study plan.
          </p>
        </div>

        <div className="space-y-5">
          {/* Step 1 — Subject */}
          <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[var(--ec-purple)]/15 border border-[var(--ec-purple)]/25 flex items-center justify-center">
                <BookOpen className="w-3.5 h-3.5 text-[var(--ec-purple)]" />
              </div>
              <h2 className="text-sm font-semibold text-[var(--ec-text-primary)]">Subject</h2>
            </div>
            <input
              id="subject-input"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Computer Networks, Thermodynamics..."
              className={cn(
                'w-full rounded-xl border bg-white/5 px-4 py-3.5 text-sm text-[var(--ec-text-primary)] placeholder:text-[var(--ec-text-tertiary)] outline-none transition-all duration-200',
                subject.length > 0
                  ? 'border-[var(--ec-purple)]/40 ring-1 ring-[var(--ec-purple)]/20'
                  : 'border-white/15 focus:border-white/25'
              )}
              autoFocus
              maxLength={60}
            />
            {subject.length > 0 && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-xs text-[var(--ec-text-tertiary)] mt-2 pl-1"
              >
                Planning for: <span className="text-[var(--ec-text-secondary)] font-medium">{subject}</span>
              </motion.p>
            )}
          </div>

          {/* Step 2 — Hours */}
          <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <h2 className="text-sm font-semibold text-[var(--ec-text-primary)]">
                Hours until exam
              </h2>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {HOUR_OPTIONS.map((h) => (
                <motion.button
                  key={h}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setHours(h)}
                  className={cn(
                    'flex flex-col items-center justify-center rounded-xl border py-3 text-sm font-semibold transition-all duration-200 cursor-pointer min-h-[56px]',
                    hours === h
                      ? h <= 12
                        ? 'border-amber-500/50 bg-amber-500/15 text-amber-300'
                        : 'border-[var(--ec-purple)]/50 bg-[var(--ec-purple)]/15 text-[var(--ec-purple)]'
                      : 'border-white/10 bg-white/5 text-[var(--ec-text-secondary)] hover:border-white/20'
                  )}
                >
                  {h <= 8 && <Zap className="w-3 h-3 mb-0.5 text-amber-400" />}
                  {getHourLabel(h)}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {urgencyMessage && (
                <motion.div
                  key={hours}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'mt-3 flex items-start gap-2 px-3 py-2.5 rounded-xl border text-xs',
                    hours <= 12
                      ? 'bg-amber-500/8 border-amber-500/20 text-amber-300/90'
                      : 'bg-white/4 border-white/10 text-[var(--ec-text-secondary)]'
                  )}
                >
                  <Brain className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  {urgencyMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Step 3 — Target */}
          <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <h2 className="text-sm font-semibold text-[var(--ec-text-primary)]">Target marks</h2>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {TARGET_OPTIONS.map((opt) => (
                <motion.button
                  key={opt.value}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setTargetMarks(opt.value)}
                  className={cn(
                    'flex flex-col items-start rounded-xl border px-4 py-3.5 transition-all duration-200 cursor-pointer text-left',
                    targetMarks === opt.value
                      ? opt.color
                      : 'border-white/10 bg-white/5 text-[var(--ec-text-secondary)] hover:border-white/20'
                  )}
                >
                  <span className="text-sm font-semibold">{opt.label}</span>
                  <span className="text-xs opacity-70 mt-0.5">{opt.sublabel}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: canProceedStep1 ? 1.01 : 1 }}
            onClick={handleStartSession}
            disabled={!canProceedStep1}
            className={cn(
              'w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-base transition-all duration-300',
              canProceedStep1
                ? 'bg-[var(--ec-purple)] text-white shadow-xl shadow-[var(--ec-purple)]/30 hover:bg-violet-500 cursor-pointer'
                : 'bg-white/8 text-[var(--ec-text-disabled)] cursor-not-allowed border border-white/10'
            )}
          >
            <span>Continue to Professor Setup</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <p className="text-center text-xs text-[var(--ec-text-tertiary)]">
            Next: 8 quick questions about your professor's checking style
          </p>
        </div>
      </motion.div>
    </div>
  )
}
