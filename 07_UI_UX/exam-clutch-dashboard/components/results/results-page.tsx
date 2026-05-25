'use client'
// ============================================================
// CramPilot — Results Page (client component)
// Assembles all 10 sections with tab navigation
// ============================================================

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Download, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { pageVariants, staggerContainer } from '@/lib/animations'
import { useSessionStore } from '@/store/session.store'
import {
  EmergencyExamSummary, AIWorkflowSection, TopicPrioritySection,
  StudySkipSection, ProfessorRecommendationsSection,
} from '@/components/results/sections-1-5'
import {
  PromptCardsSection, RevisionStrategySection, FlashcardSection,
  AudioRevisionSection,
} from '@/components/results/sections-6-10'
import { ExamRoadmapTimeline } from '@/components/timeline/exam-roadmap-timeline'
import { ResultsSidebar } from '@/components/results/results-sidebar'

// ── Tab navigation ───────────────────────────────────────────
const TABS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'topics',     label: 'Topics' },
  { id: 'prompts',    label: 'Prompts' },
  { id: 'timeline',   label: 'Timeline' },
  { id: 'flashcards', label: 'Flashcards' },
] as const

type TabId = (typeof TABS)[number]['id']

// ── Section groupings per tab ────────────────────────────────
function OverviewTab() {
  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
      <EmergencyExamSummary />
      <AIWorkflowSection />
      <ProfessorRecommendationsSection />
      <RevisionStrategySection />
      <AudioRevisionSection />
    </motion.div>
  )
}

function TopicsTab() {
  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
      <TopicPrioritySection />
      <StudySkipSection />
    </motion.div>
  )
}

function PromptsTab() {
  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
      <PromptCardsSection />
    </motion.div>
  )
}

function TimelineTab() {
  return <ExamRoadmapTimeline />
}

function FlashcardsTab() {
  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
      <FlashcardSection />
    </motion.div>
  )
}

// ── Main component ───────────────────────────────────────────
export function ResultsPage() {
  const router = useRouter()
  const session = useSessionStore((s) => s.session)
  const activeTab = useSessionStore((s) => s.activeTab)
  const setActiveTab = useSessionStore((s) => s.setActiveTab)

  // Handle SSR hydration manually to prevent mismatch
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!session || !session.strategy) {
      router.replace('/dashboard')
    }
  }, [session, router])

  if (!mounted || !session || !session.strategy) {
    return (
      <div className="min-h-screen bg-[#111110] flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-2 border-[rgba(129,140,248,0.2)] border-t-[#818CF8] rounded-full mb-4"
        />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[14px] font-[500] text-[#818CF8] tracking-wide"
        >
          CramPilot is navigating your recovery strategy...
        </motion.p>
        <p className="text-[12px] text-[#706E67] mt-2">Restoring your co-pilot session and AI roadmap</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={pageVariants} initial="initial" animate="animate"
      className="min-h-screen bg-[#111110]">

      {/* Background ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-[15%] w-[500px] h-[400px] bg-[rgba(248,113,113,0.03)] rounded-full blur-[120px]" />
        <div className="absolute top-[30%] left-[5%] w-[350px] h-[300px] bg-[rgba(129,140,248,0.04)] rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 py-6 lg:px-8 lg:py-8">

        {/* ── Top bar ──────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-1.5 text-[13px] text-[#9E9C96] hover:text-[#F0EFE8] transition-colors">
              <ArrowLeft className="w-4 h-4" />Back to Dashboard
            </Link>
            <span className="text-[#706E67]">·</span>
            <div>
              <p className="text-[10px] font-[700] uppercase tracking-[0.08em] text-[#818CF8]">Exam Survival Strategy</p>
              <p className="text-[15px] font-[500] text-[#F0EFE8]">{session.subject}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-[rgba(255,255,255,0.09)] text-[12px] text-[#9E9C96] hover:text-[#F0EFE8] hover:border-[rgba(255,255,255,0.15)] transition-colors">
              <Share2 className="w-3.5 h-3.5" />Share
            </button>
            <button className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-[rgba(255,255,255,0.09)] text-[12px] text-[#9E9C96] hover:text-[#F0EFE8] hover:border-[rgba(255,255,255,0.15)] transition-colors">
              <Download className="w-3.5 h-3.5" />Export PDF
            </button>
          </div>
        </div>

        {/* ── Tab bar ──────────────────────────────────────── */}
        <div className="relative flex gap-6 p-2 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] mb-6 overflow-x-auto no-scrollbar">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative px-4 py-2.5 text-[12px] font-[500] uppercase tracking-[0.06em] transition-colors whitespace-nowrap rounded-lg',
                activeTab === tab.id ? 'text-[#F0EFE8]' : 'text-[#706E67] hover:text-[#9E9C96]'
              )}
            >
              {activeTab === tab.id && (
                <motion.div layoutId="tab-indicator"
                  className="absolute inset-0 rounded-lg bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ── Main layout ───────────────────────────────────── */}
        {mounted && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-6">

            {/* Left: Tab content */}
            <div className="min-w-0">
              <AnimatePresence mode="wait">
                <motion.div key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.16,1,0.3,1] }}>
                  {activeTab === 'overview'   && <OverviewTab />}
                  {activeTab === 'topics'     && <TopicsTab />}
                  {activeTab === 'prompts'    && <PromptsTab />}
                  {activeTab === 'timeline'   && <TimelineTab />}
                  {activeTab === 'flashcards' && <FlashcardsTab />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Sticky sidebar */}
            <div className="order-first lg:order-last">
              <ResultsSidebar />
            </div>
          </div>
        )}

        {/* ── Mobile Action Bar ─────────────────────────────── */}
        <div className="fixed bottom-0 inset-x-0 p-4 bg-[rgba(17,17,16,0.95)] backdrop-blur-md border-t border-[rgba(255,255,255,0.06)] lg:hidden z-50">
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('timeline')}
              className="flex-1 h-11 rounded-xl bg-[#818CF8] text-[#111110] text-[13px] font-[600] flex items-center justify-center shadow-[0_0_15px_rgba(129,140,248,0.2)]"
            >
              Continue Revision
            </button>
            <button 
              onClick={() => setActiveTab('prompts')}
              className="flex-1 h-11 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[#F0EFE8] text-[13px] font-[500] flex items-center justify-center"
            >
              Open Prompts
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  )
}
