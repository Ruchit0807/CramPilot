'use client'
// ============================================================
// CramPilot — Dashboard Page
// The AI-powered exam command center
// ============================================================

import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Clock, BookOpen, Gem } from 'lucide-react'
import { InputPanel, type InputPanelState } from '@/components/dashboard/input-panel'
import { ProfessorSummaryCard } from '@/components/dashboard/professor-summary-card'
import { IntelligencePanel } from '@/components/dashboard/intelligence-panel'
import { GenerateCTA } from '@/components/dashboard/generate-cta'
import { PreviousSessionBanner } from '@/components/dashboard/previous-session-banner'
import { pageVariants } from '@/lib/animations'
import { useSessionStore } from '@/store/session.store'

// ── Default state ────────────────────────────────────────────
const DEFAULT_STATE: InputPanelState = {
  subject: '',
  subjectCategory: '',
  hoursRemaining: '',
  targetMarks: '',
  weakTopics: [],
  syllabusFile: null,
  pyqFile: null,
  professorName: '',
  professorPatterns: [],
}

// ── Top Stats Bar ────────────────────────────────────────────
function StatsBar({ state, credits }: { state: InputPanelState, credits: number }) {
  const now = new Date()
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

  const stats = [
    {
      icon: Clock,
      label: 'Current Time',
      value: timeStr,
      color: '#818CF8',
    },
    {
      icon: BookOpen,
      label: 'Subject',
      value: state.subject || '—',
      color: '#818CF8',
    },
    {
      icon: Zap,
      label: 'Hours Left',
      value: state.hoursRemaining !== '' ? `${state.hoursRemaining}h` : '—',
      color:
        state.hoursRemaining !== ''
          ? state.hoursRemaining <= 12
            ? '#F87171'
            : state.hoursRemaining <= 24
            ? '#FBBF24'
            : '#4ADE80'
          : '#706E67',
    },
    {
      icon: Sparkles,
      label: 'Weak Topics',
      value: state.weakTopics.length > 0 ? `${state.weakTopics.length} added` : '—',
      color: state.weakTopics.length > 0 ? '#F87171' : '#706E67',
    },
    {
      icon: Gem,
      label: 'Credits',
      value: credits.toString(),
      color: credits > 0 ? '#FBBF24' : '#706E67',
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.1)] transition-colors"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${stat.color}12`, border: `1px solid ${stat.color}22` }}
            >
              <Icon className="w-3.5 h-3.5" style={{ color: stat.color }} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-[500] text-[#706E67] uppercase tracking-[0.05em] leading-none mb-0.5">
                {stat.label}
              </p>
              <p
                className="text-[13px] font-[500] truncate"
                style={{ color: stat.value === '—' ? '#706E67' : '#F0EFE8' }}
              >
                {stat.value}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// ── Main Dashboard ───────────────────────────────────────────
export function DashboardPage({ initialCredits = 0 }: { initialCredits?: number }) {
  const [state, setState] = useState<InputPanelState>(DEFAULT_STATE)
  const session = useSessionStore((s) => s.session)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => setMounted(true), [])

  const handleChange = useCallback((updates: Partial<InputPanelState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }, [])

  const isReady =
    state.subject.trim().length >= 2 &&
    state.hoursRemaining !== '' &&
    state.targetMarks !== ''

  const handleGenerate = useCallback(() => {
    // TODO: wire to actual generation flow (Phase 3)
    console.log('Generating strategy with state:', state)
  }, [state])

  if (!mounted) {
    return <div className="min-h-screen bg-[#111110]" />
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-[#111110]"
    >
      {/* ── Background ambience ─────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[20%] w-[600px] h-[400px] bg-[rgba(129,140,248,0.04)] rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[300px] bg-[rgba(251,191,36,0.03)] rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 py-6 lg:px-8 lg:py-8">

        {/* ── Page Header ──────────────────────────────── */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-[11px] font-[600] text-[#818CF8] uppercase tracking-[0.08em]">
              Command Center
            </p>
            <span className="w-1 h-1 rounded-full bg-[#706E67]" />
            <p className="text-[11px] text-[#706E67]">AI-Powered Exam Intelligence</p>
          </div>
          <h1 className="text-[28px] font-[500] text-[#F0EFE8] tracking-[-0.02em] leading-[1.2] mb-2">
            Exam Survival Dashboard
          </h1>
          <p className="text-[14px] text-[#9E9C96] max-w-[520px] leading-[1.6]">
            Configure your exam session below. The AI will generate a personalized survival strategy,
            prioritized roadmap, and ready-to-use prompts.
          </p>
        </div>

        {/* ── Archived Session Banner ─────────────────────── */}
        {mounted && session && session.strategy && (
          <PreviousSessionBanner />
        )}

        {/* ── Quick Stats Bar ───────────────────────────── */}
        <StatsBar state={state} credits={initialCredits} />

        {/* ── 3-Column Layout ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr_1fr] gap-4 xl:gap-6">

          {/* Left Column: Input Panel */}
          <div className="flex flex-col gap-3 order-2 lg:order-1">
            <div>
              <p className="text-[11px] font-[600] text-[#706E67] uppercase tracking-[0.08em] mb-3">
                Exam Configuration
              </p>
              <InputPanel value={state} onChange={handleChange} />
            </div>
          </div>

          {/* Center Column: Professor Summary + CTA */}
          <div className="flex flex-col gap-4 order-1 lg:order-2">
            {/* Section label */}
            <div>
              <p className="text-[11px] font-[600] text-[#706E67] uppercase tracking-[0.08em] mb-3">
                Professor Intelligence
              </p>
              <ProfessorSummaryCard 
                professorName={state.professorName}
                onNameChange={(v) => handleChange({ professorName: v })}
                selectedPatterns={state.professorPatterns}
                onPatternsChange={(v) => handleChange({ professorPatterns: v })}
              />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
              <p className="text-[11px] text-[#706E67] uppercase tracking-[0.06em]">Ready to generate</p>
              <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
            </div>

            {/* Generate CTA */}
            <GenerateCTA
              isReady={isReady}
              subject={state.subject}
              subjectCategory={state.subjectCategory as any}
              hoursRemaining={state.hoursRemaining as number}
              targetMarks={state.targetMarks}
              weakTopics={state.weakTopics}
              professorArchetype={state.professorPatterns}
              syllabusFile={state.syllabusFile}
              pyqFile={state.pyqFile}
              onGenerate={handleGenerate}
            />

            {/* Session info footer */}
            <div className="flex items-center justify-between text-[11px] text-[#706E67] px-1">
              <span>All data stays local — never sent to servers</span>
              <span className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                AI Ready
              </span>
            </div>
          </div>

          {/* Right Column: Intelligence Panel */}
          <div className="order-3">
            <p className="text-[11px] font-[600] text-[#706E67] uppercase tracking-[0.08em] mb-3">
              Exam Intelligence
            </p>
            <IntelligencePanel
              subject={state.subject}
              hoursRemaining={state.hoursRemaining}
              targetMarks={state.targetMarks}
              weakTopicsCount={state.weakTopics.length}
              hasSyllabus={!!state.syllabusFile}
              hasPYQ={!!state.pyqFile}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
