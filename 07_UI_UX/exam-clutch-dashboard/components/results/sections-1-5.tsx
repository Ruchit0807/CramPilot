'use client'
// ============================================================
// Results Page — Sections 1–5
// Emergency Summary · AI Workflows · Topic Rankings
// Study-Now/Skip · Professor Recommendations
// ============================================================

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap, Brain, Target, SkipForward, UserSearch,
  TrendingUp, Clock, CheckCircle, AlertTriangle,
  ChevronRight, BarChart2, Shield, Flame,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { useSessionStore } from '@/store/session.store'
import type { AITool } from '@/types'

// ── Shared helpers ───────────────────────────────────────────
const TOOL_META: Record<AITool, { color: string; bg: string; label: string; url: string }> = {
  claude:      { color: '#F97316', bg: 'rgba(249,115,22,0.1)',  label: 'Claude',      url: 'https://claude.ai' },
  notebooklm:  { color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)', label: 'NotebookLM',  url: 'https://notebooklm.google.com' },
  chatgpt:     { color: '#10B981', bg: 'rgba(16,185,129,0.1)', label: 'ChatGPT',     url: 'https://chat.openai.com' },
  gemini:      { color: '#3B82F6', bg: 'rgba(59,130,246,0.1)', label: 'Gemini',      url: 'https://gemini.google.com' },
}

const PRIORITY_META = {
  critical: { color: '#F87171', bg: 'rgba(248,113,113,0.1)', label: 'CRITICAL', border: 'rgba(248,113,113,0.25)' },
  high:     { color: '#FBBF24', bg: 'rgba(251,191,36,0.08)', label: 'HIGH',     border: 'rgba(251,191,36,0.25)' },
  moderate: { color: '#818CF8', bg: 'rgba(129,140,248,0.08)',label: 'MODERATE', border: 'rgba(129,140,248,0.2)' },
  low:      { color: '#706E67', bg: 'rgba(112,110,103,0.06)',label: 'LOW',      border: 'rgba(112,110,103,0.15)' },
  skip:     { color: '#706E67', bg: 'rgba(112,110,103,0.06)',label: 'SKIP',     border: 'rgba(112,110,103,0.15)' },
}

function SectionHeader({ eyebrow, title, icon: Icon, color = '#818CF8' }: {
  eyebrow: string; title: string; icon: React.ElementType; color?: string
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${color}15`, border: `1px solid ${color}28` }}>
        <Icon className="w-4.5 h-4.5" style={{ color }} />
      </div>
      <div>
        <p className="text-[10px] font-[700] uppercase tracking-[0.1em]" style={{ color }}>{eyebrow}</p>
        <h2 className="text-[17px] font-[500] text-[#F0EFE8] tracking-tight">{title}</h2>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// 1. EMERGENCY EXAM SUMMARY
// ═══════════════════════════════════════════════════════════
export function EmergencyExamSummary() {
  const session = useSessionStore(s => s.session)
  if (!session || !session.strategy) return null
  const strategy = session.strategy
  
  const level = strategy.scores?.emergencyLevel || 'stable'
  const urgColor = level === 'critical' ? '#F87171' : level === 'emergency' ? '#FBBF24' : '#4ADE80'

  return (
    <motion.section variants={staggerItem} className="relative rounded-2xl overflow-hidden border"
      style={{ borderColor: `${urgColor}30`, background: `rgba(28,28,26,0.9)` }}>
      {/* Top accent */}
      <div className="absolute top-0 inset-x-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${urgColor}, ${urgColor}60, transparent)` }} />
      {/* Ambient glow */}
      <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        style={{ background: `${urgColor}08` }} />

      <div className="relative p-6 lg:p-8">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}>
                <Zap className="w-4 h-4" style={{ color: urgColor }} />
              </motion.div>
              <p className="text-[11px] font-[700] uppercase tracking-[0.1em]" style={{ color: urgColor }}>
                Emergency Exam Summary · {(strategy.scores?.emergencyLevel || 'stable').toUpperCase()} ALERT
              </p>
            </div>
            <h1 className="text-[26px] lg:text-[32px] font-[500] text-[#F0EFE8] tracking-[-0.02em] leading-tight">
              {session.subject}
            </h1>
            <p className="text-[14px] text-[#9E9C96] mt-1">
              {session.hoursRemaining}h remaining · Target: {session.targetMarks} score
            </p>
          </div>

          {/* Survivability badge */}
          <div className="text-center px-5 py-3 rounded-xl border"
            style={{ borderColor: `${urgColor}30`, background: `${urgColor}0A` }}>
            <p className="text-[11px] font-[600] uppercase tracking-wider text-[#9E9C96] mb-1">Survivability</p>
            <p className="text-[40px] font-[700] leading-none" style={{ color: urgColor }}>
              {strategy.scores?.survivabilityScore ?? '--'}<span className="text-[20px] font-[400]">%</span>
            </p>
            <p className="text-[11px] text-[#706E67] mt-1">Achievable with this plan</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Confidence Level', value: `${strategy.scores?.confidenceLevel ?? '--'}%`, color: '#818CF8', bar: strategy.scores?.confidenceLevel ?? 0 },
            { label: 'AI Coverage',      value: `${strategy.scores?.coveragePercent ?? '--'}%`, color: '#4ADE80', bar: strategy.scores?.coveragePercent ?? 0 },
            { label: 'Estimated Marks',  value: strategy.scores?.estimatedMarks ?? '--',       color: '#FBBF24', bar: null },
            { label: 'AI Confidence',    value: `${strategy.scores?.aiConfidence ?? '--'}%`,   color: '#818CF8', bar: strategy.scores?.aiConfidence ?? 0 },
          ].map((s) => (
            <div key={s.label} className="p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)]">
              <p className="text-[11px] text-[#706E67] mb-1">{s.label}</p>
              <motion.p 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[18px] font-[600]" 
                style={{ color: s.color }}>
                {s.value}
              </motion.p>
              {s.bar !== null && (
                <div className="mt-2 h-1 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.bar}%` }}
                    transition={{ duration: 0.8, ease: [0.16,1,0.3,1], delay: 0.3 }}
                    className="h-full rounded-full" style={{ background: s.color }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Critical alert */}
        <div className="mt-4 flex items-start gap-3 p-4 rounded-xl"
          style={{ background: `${urgColor}08`, border: `1px solid ${urgColor}20` }}>
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: urgColor }} />
          <div>
            <p className="text-[13px] font-[500] text-[#F0EFE8]">
              {strategy.scores?.emergencyLevel === 'critical'
                ? 'Critical mode: Focus ONLY on the top topics. Skip everything else.'
                : `You have ${session.hoursRemaining}h. This plan covers ${strategy.scores?.coveragePercent ?? '--'}% of likely exam content. Trust the system.`}
            </p>
            <p className="text-[12px] text-[#9E9C96] mt-1">
              {(strategy.topics || []).filter(t => t.priority === 'critical').length} critical topics · {(strategy.topics || []).filter(t => t.priority === 'skip').length} topics safely skippable
            </p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]"
            >
              <p className="text-[11px] font-[600] tracking-wider uppercase mb-1" style={{ color: urgColor }}>
                Strategy Confidence: {strategy.scores?.confidenceStatus || 'High'}
              </p>
              <p className="text-[11px] text-[#9E9C96]">
                This roadmap is strictly optimized for your remaining time. Follow it exactly to maximize {session.targetMarks} marks.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// ═══════════════════════════════════════════════════════════
// 2. AI WORKFLOW RECOMMENDATIONS
// ═══════════════════════════════════════════════════════════
export function AIWorkflowSection() {
  const session = useSessionStore(s => s.session)
  if (!session || !session.strategy) return null
  const strategy = session.strategy

  return (
    <motion.section variants={staggerItem}>
      <SectionHeader eyebrow="Multi-AI Workflow" title="Recommended AI Learning Path" icon={Brain} color="#818CF8" />

      <div className="relative">
        {/* Vertical connector */}
        <div className="absolute left-[22px] top-8 bottom-8 w-px bg-gradient-to-b from-[#818CF8] via-[rgba(129,140,248,0.3)] to-transparent hidden sm:block" />

        <div className="space-y-3">
          {(strategy.workflows || []).map((wf, i) => {
            const meta = TOOL_META[wf.tool as AITool] || TOOL_META.claude
            return (
              <motion.div key={wf.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                className="relative flex gap-4 p-4 rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(28,28,26,0.8)] hover:border-[rgba(255,255,255,0.13)] transition-colors group"
              >
                {/* Step circle */}
                <div className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-[18px] border-2 z-10"
                  style={{ borderColor: meta.color, background: meta.bg }}>
                  {wf.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-[700] uppercase tracking-wider text-[#706E67]">{wf.phase}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full font-[600]"
                      style={{ color: meta.color, background: meta.bg, border: `1px solid ${meta.color}30` }}>
                      {meta.label}
                    </span>
                    <span className="ml-auto text-[11px] text-[#706E67] flex items-center gap-1">
                      <Clock className="w-3 h-3" />{wf.duration}
                    </span>
                  </div>
                  <h3 className="text-[14px] font-[500] text-[#F0EFE8] mb-1">{wf.title}</h3>
                  <p className="text-[12px] text-[#9E9C96] mb-1.5">{wf.purpose}</p>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-2 px-2 border-l border-[rgba(255,255,255,0.1)]"
                  >
                    <p className="text-[11px] text-[#706E67] italic">{wf.explanation}</p>
                    <p className="text-[10px] font-[600] text-[#818CF8] mt-1">Why this matters: Critical for mastering this phase quickly.</p>
                  </motion.div>
                  <div className="flex flex-wrap gap-1.5">
                    {wf.topics.map(t => (
                      <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.04)] text-[#706E67] border border-[rgba(255,255,255,0.08)]">{t}</span>
                    ))}
                  </div>
                </div>

                <a href={TOOL_META[wf.tool].url} target="_blank" rel="noopener noreferrer"
                  className="shrink-0 self-center p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: meta.bg, color: meta.color }}>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}

// ═══════════════════════════════════════════════════════════
// 3. TOPIC PRIORITY RANKINGS
// ═══════════════════════════════════════════════════════════
export function TopicPrioritySection() {
  const [filter, setFilter] = useState<'all' | 'critical' | 'skip'>('all')
  const session = useSessionStore(s => s.session)
  if (!session || !session.strategy) return null
  const strategy = session.strategy

  const topicsList = strategy.topics || []
  const displayed = filter === 'all' ? topicsList
    : topicsList.filter(t => t.priority === filter || (filter === 'critical' && t.priority === 'high'))

  return (
    <motion.section variants={staggerItem}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <SectionHeader eyebrow="AI Topic Analysis" title="Priority Rankings" icon={Target} color="#FBBF24" />
        <div className="flex gap-1.5">
          {(['all', 'critical', 'skip'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={cn('text-[11px] px-3 py-1.5 rounded-lg border font-[500] transition-all capitalize',
                filter === f ? 'bg-[rgba(129,140,248,0.15)] border-[rgba(129,140,248,0.35)] text-[#818CF8]'
                  : 'border-[rgba(255,255,255,0.08)] text-[#706E67] hover:text-[#9E9C96]')}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {displayed.map((topic, i) => {
          const meta = PRIORITY_META[topic.priority]
          return (
            <motion.div key={topic.id}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={cn('flex items-center gap-3 p-3.5 rounded-xl border transition-all',
                topic.priority === 'skip' ? 'opacity-60' : '')}
              style={{ borderColor: meta.border, background: meta.bg }}>

              {/* Rank */}
              <span className="text-[12px] font-[700] w-6 text-center" style={{ color: meta.color }}>
                {topic.priority === 'skip' ? '—' : `#${i + 1}`}
              </span>

              {/* Priority dot */}
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: meta.color }} />

              {/* Topic name */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={cn('text-[13px] font-[500]',
                    topic.priority === 'skip' ? 'line-through text-[#706E67]' : 'text-[#F0EFE8]')}>
                    {topic.name}
                  </p>
                  {topic.isWeak && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[rgba(248,113,113,0.12)] text-[#F87171] border border-[rgba(248,113,113,0.2)] font-[600]">WEAK</span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-0.5">
                  <p className="text-[11px] text-[#706E67]">
                    PYQ: {topic.pyqFreq}× · Last: {topic.appearedIn}
                  </p>
                  {topic.priority === 'critical' && (
                    <p className="text-[10px] font-[600] text-[#FBBF24]">
                      → High ROI Concept
                    </p>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="hidden sm:flex items-center gap-4 shrink-0">
                <div className="text-center">
                  <p className="text-[13px] font-[600] text-[#F0EFE8]">{topic.marks}</p>
                  <p className="text-[10px] text-[#706E67]">marks</p>
                </div>
                <div className="text-center">
                  <p className="text-[13px] font-[600] text-[#F0EFE8]">{topic.hoursNeeded}h</p>
                  <p className="text-[10px] text-[#706E67]">needed</p>
                </div>
              </div>

              {/* Badge */}
              <span className="text-[10px] font-[700] px-2 py-1 rounded-md shrink-0 tracking-wider"
                style={{ color: meta.color, background: `${meta.color}15`, border: `1px solid ${meta.color}30` }}>
                {meta.label}
              </span>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}

// ═══════════════════════════════════════════════════════════
// 4. STUDY-NOW vs SKIP-LATER
// ═══════════════════════════════════════════════════════════
export function StudySkipSection() {
  const session = useSessionStore(s => s.session)
  if (!session || !session.strategy) return null
  const strategy = session.strategy

  const topicsList = strategy.topics || []
  const studyNow = topicsList.filter(t => t.priority === 'critical' || t.priority === 'high')
  const skipLater = topicsList.filter(t => t.priority === 'skip')
  const totalStudyHours = studyNow.reduce((a, t) => a + t.hoursNeeded, 0)
  const savedHours = skipLater.reduce((a, t) => a + t.hoursNeeded, 0)

  return (
    <motion.section variants={staggerItem}>
      <SectionHeader eyebrow="Time Allocation" title="Study-Now vs Skip-Later" icon={SkipForward} color="#4ADE80" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Study now */}
        <div className="p-4 rounded-xl border border-[rgba(74,222,128,0.2)] bg-[rgba(74,222,128,0.04)]">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-[#4ADE80]" />
            <p className="text-[12px] font-[700] text-[#4ADE80] uppercase tracking-wider">Study NOW</p>
            <span className="ml-auto text-[11px] text-[#706E67]">{totalStudyHours.toFixed(1)}h total</span>
          </div>
          <div className="space-y-2">
            {studyNow.map(t => (
              <div key={t.id} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                  <p className="text-[13px] text-[#F0EFE8]">{t.name}</p>
                  {t.isWeak && <span className="text-[10px] text-[#F87171]">⚠</span>}
                </div>
                <span className="text-[12px] text-[#706E67] shrink-0">{t.hoursNeeded}h</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skip later */}
        <div className="p-4 rounded-xl border border-[rgba(112,110,103,0.15)] bg-[rgba(112,110,103,0.04)]">
          <div className="flex items-center gap-2 mb-3">
            <SkipForward className="w-4 h-4 text-[#706E67]" />
            <p className="text-[12px] font-[700] text-[#706E67] uppercase tracking-wider">SKIP</p>
            <span className="ml-auto text-[11px] text-[#4ADE80]">saves {savedHours}h</span>
          </div>
          <div className="space-y-2">
            {skipLater.map(t => (
              <div key={t.id} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#706E67]" />
                  <p className="text-[13px] line-through text-[#706E67]">{t.name}</p>
                </div>
                <span className="text-[12px] text-[#706E67] shrink-0">{t.hoursNeeded}h saved</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">
            <p className="text-[11px] text-[#706E67] italic">
              {skipLater.length > 0 && skipLater[0].safeToSkipReason 
                ? skipLater[0].safeToSkipReason 
                : 'Zero PYQ appearances — safe to skip.'}
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// ═══════════════════════════════════════════════════════════
// 5. PROFESSOR-SPECIFIC RECOMMENDATIONS
// ═══════════════════════════════════════════════════════════
export function ProfessorRecommendationsSection() {
  const session = useSessionStore(s => s.session)
  if (!session || !session.strategy) return null
  const strategy = session.strategy

  const URGENCY_STYLE: Record<string, any> = {
    critical: { color: '#F87171', icon: '🔴' },
    high:     { color: '#FBBF24', icon: '🟡' },
    moderate: { color: '#818CF8', icon: '🔵' },
  }

  return (
    <motion.section variants={staggerItem}>
      <SectionHeader eyebrow="Professor Intelligence" title={`Dr. Mehta's Exam Style — What to Expect`} icon={UserSearch} color="#818CF8" />

      <div className="p-4 rounded-xl border border-[rgba(129,140,248,0.2)] bg-[rgba(129,140,248,0.04)] mb-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-[700] text-[#818CF8] uppercase tracking-wider">Archetype</span>
          <span className="text-[12px] px-2 py-0.5 rounded bg-[rgba(251,191,36,0.12)] text-[#FBBF24] border border-[rgba(251,191,36,0.25)] font-[600]">
            Problem Setter
          </span>
        </div>
        <p className="text-[13px] text-[#9E9C96]">
          Dr. Mehta designs problems from scratch each year. Expect derivation-heavy questions with slight variations of classic algorithms. Partial credit is generous — always show your work.
        </p>
      </div>

      <div className="space-y-2">
        {(strategy.professorTips || []).map((tip, i) => {
          const style = URGENCY_STYLE[tip.urgency] || URGENCY_STYLE.moderate
          return (
            <motion.div key={tip.id}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 p-3.5 rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(28,28,26,0.7)]">
              <span className="text-base shrink-0">{style.icon}</span>
              <p className="text-[13px] text-[#F0EFE8] leading-[1.6]">{tip.tip}</p>
              <span className="ml-auto text-[10px] font-[700] uppercase tracking-wider shrink-0 pt-0.5"
                style={{ color: style.color }}>{tip.urgency}</span>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
