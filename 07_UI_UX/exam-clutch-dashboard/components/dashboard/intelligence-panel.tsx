'use client'
// ============================================================
// CramPilot — Intelligence Right Panel
// Exam urgency meter, preparedness score, study intensity,
// recommended workflow
// ============================================================

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Zap,
  Shield,
  Flame,
  GitBranch,
  ChevronRight,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { staggerContainer, staggerItem } from '@/lib/animations'

// ── Types ────────────────────────────────────────────────────
interface IntelligencePanelProps {
  subject: string
  hoursRemaining: number | ''
  targetMarks: string
  weakTopicsCount: number
  hasSyllabus: boolean
  hasPYQ: boolean
  className?: string
}

// ── Urgency computation ──────────────────────────────────────
function computeUrgency(hours: number | ''): {
  level: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW'
  color: string
  dimColor: string
  pct: number
  label: string
} {
  if (hours === '' || hours > 72)
    return { level: 'LOW', color: '#4ADE80', dimColor: 'rgba(74,222,128,0.12)', pct: 15, label: 'You have time. Start strategically.' }
  if (hours > 48)
    return { level: 'MODERATE', color: '#818CF8', dimColor: 'rgba(129,140,248,0.12)', pct: 35, label: 'Moderate pressure. Prioritize.' }
  if (hours > 24)
    return { level: 'HIGH', color: '#FBBF24', dimColor: 'rgba(251,191,36,0.12)', pct: 65, label: 'High urgency. Focus ruthlessly.' }
  if (hours > 12)
    return { level: 'HIGH', color: '#FBBF24', dimColor: 'rgba(251,191,36,0.12)', pct: 80, label: 'Exam tomorrow. Emergency mode.' }
  return { level: 'CRITICAL', color: '#F87171', dimColor: 'rgba(248,113,113,0.12)', pct: 95, label: 'Critical. Survival strategy only.' }
}

// ── Preparedness computation ─────────────────────────────────
function computePreparedness(params: {
  subject: string
  targetMarks: string
  weakTopicsCount: number
  hasSyllabus: boolean
  hasPYQ: boolean
}): { score: number; grade: string; color: string } {
  let score = 20
  if (params.subject.trim()) score += 20
  if (params.targetMarks) score += 15
  if (params.weakTopicsCount > 0) score += 15
  if (params.hasSyllabus) score += 15
  if (params.hasPYQ) score += 15

  if (score >= 80) return { score, grade: 'A', color: '#4ADE80' }
  if (score >= 60) return { score, grade: 'B', color: '#818CF8' }
  if (score >= 40) return { score, grade: 'C', color: '#FBBF24' }
  return { score, grade: 'D', color: '#F87171' }
}

// ── Study intensity ──────────────────────────────────────────
function computeIntensity(hours: number | ''): {
  label: string
  hoursPerDay: number
  breaks: string
  color: string
  bars: number
} {
  if (hours === '' || hours > 72)
    return { label: 'Relaxed', hoursPerDay: 4, breaks: '15 min every hour', color: '#4ADE80', bars: 2 }
  if (hours > 48)
    return { label: 'Focused', hoursPerDay: 6, breaks: '10 min every 45 min', color: '#818CF8', bars: 3 }
  if (hours > 24)
    return { label: 'Intense', hoursPerDay: 9, breaks: '5 min every 30 min', color: '#FBBF24', bars: 4 }
  return { label: 'Maximum', hoursPerDay: 12, breaks: 'No breaks — review only', color: '#F87171', bars: 5 }
}

// ── Recommended workflow ─────────────────────────────────────
function computeWorkflow(
  hours: number | '',
  hasPYQ: boolean,
  targetMarks: string
): { name: string; steps: string[]; color: string } {
  if (hours !== '' && hours <= 12)
    return {
      name: 'Emergency Triage',
      color: '#F87171',
      steps: ['Identify 20% topics → 80% marks', 'Speed-read summaries only', 'Attempt all PYQ last-year', 'Memorize key formulas'],
    }
  if (hours !== '' && hours <= 24)
    return {
      name: '24-Hour Sprint',
      color: '#FBBF24',
      steps: ['Professor analysis → topic triage', 'Deep dive critical topics', 'PYQ pattern review', 'Mock answer writing'],
    }
  if (hasPYQ)
    return {
      name: 'PYQ-First Strategy',
      color: '#818CF8',
      steps: ['Analyze 3 years of PYQs', 'Build topic frequency map', 'Study high-yield chapters', 'Practice answer writing'],
    }
  return {
    name: 'Standard Roadmap',
    color: '#4ADE80',
    steps: ['Syllabus coverage mapping', 'Topic-wise deep study', 'Concept + application balance', 'Scheduled revision cycles'],
  }
}

// ── Arc Gauge component ──────────────────────────────────────
function ArcGauge({
  pct,
  color,
  size = 100,
}: {
  pct: number
  color: string
  size?: number
}) {
  const radius = (size - 16) / 2
  const circumference = Math.PI * radius  // semicircle
  const dashOffset = circumference * (1 - pct / 100)

  return (
    <svg width={size} height={size / 2 + 10} viewBox={`0 0 ${size} ${size / 2 + 10}`}>
      {/* Track */}
      <path
        d={`M 8 ${size / 2 + 4} A ${radius} ${radius} 0 0 1 ${size - 8} ${size / 2 + 4}`}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Fill */}
      <motion.path
        d={`M 8 ${size / 2 + 4} A ${radius} ${radius} 0 0 1 ${size - 8} ${size / 2 + 4}`}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: dashOffset }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  )
}

// ── Panel Card ───────────────────────────────────────────────
function PanelCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        'rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(28,28,26,0.8)] backdrop-blur-sm p-4',
        className
      )}
    >
      {children}
    </motion.div>
  )
}

// ── Main Export ──────────────────────────────────────────────
export function IntelligencePanel({
  subject,
  hoursRemaining,
  targetMarks,
  weakTopicsCount,
  hasSyllabus,
  hasPYQ,
  className,
}: IntelligencePanelProps) {
  const urgency = useMemo(() => computeUrgency(hoursRemaining), [hoursRemaining])
  const preparedness = useMemo(
    () => computePreparedness({ subject, targetMarks, weakTopicsCount, hasSyllabus, hasPYQ }),
    [subject, targetMarks, weakTopicsCount, hasSyllabus, hasPYQ]
  )
  const intensity = useMemo(() => computeIntensity(hoursRemaining), [hoursRemaining])
  const workflow = useMemo(
    () => computeWorkflow(hoursRemaining, hasPYQ, targetMarks),
    [hoursRemaining, hasPYQ, targetMarks]
  )

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className={cn('space-y-3', className)}
    >
      {/* ── 1. Exam Urgency Meter ──────────────────────────── */}
      <PanelCard>
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4" style={{ color: urgency.color }} />
          <h3 className="text-[13px] font-[500] text-[#F0EFE8]">Exam Urgency</h3>
          <span
            className="ml-auto text-[10px] font-[700] px-1.5 py-0.5 rounded-sm tracking-wider"
            style={{
              color: urgency.color,
              background: urgency.dimColor,
              border: `1px solid ${urgency.color}30`,
            }}
          >
            {urgency.level}
          </span>
        </div>

        {/* Arc gauge */}
        <div className="flex justify-center mb-1">
          <div className="relative">
            <ArcGauge pct={urgency.pct} color={urgency.color} size={120} />
            <div className="absolute inset-0 flex items-end justify-center pb-1">
              <div className="text-center">
                <p className="text-[22px] font-[600] leading-none" style={{ color: urgency.color }}>
                  {urgency.pct}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[12px] text-[#9E9C96] text-center leading-[1.5]">{urgency.label}</p>

        {/* Hours display */}
        {hoursRemaining !== '' && (
          <div className="mt-3 flex items-center justify-center gap-2 p-2 rounded-lg" style={{ background: urgency.dimColor }}>
            <p className="text-[13px] font-[600]" style={{ color: urgency.color }}>
              {hoursRemaining}h
            </p>
            <p className="text-[12px] text-[#9E9C96]">remaining</p>
          </div>
        )}
      </PanelCard>

      {/* ── 2. Preparedness Score ─────────────────────────── */}
      <PanelCard>
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-[#818CF8]" />
          <h3 className="text-[13px] font-[500] text-[#F0EFE8]">Preparedness Score</h3>
        </div>

        {/* Circular score display */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 shrink-0">
            <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
              <circle
                cx="32" cy="32" r="26"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="5"
              />
              <motion.circle
                cx="32" cy="32" r="26"
                fill="none"
                stroke={preparedness.color}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 26}`}
                initial={{ strokeDashoffset: `${2 * Math.PI * 26}` }}
                animate={{
                  strokeDashoffset: `${2 * Math.PI * 26 * (1 - preparedness.score / 100)}`,
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-[15px] font-[700]" style={{ color: preparedness.color }}>
                {preparedness.grade}
              </p>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-[22px] font-[600] text-[#F0EFE8] leading-none">
              {preparedness.score}
              <span className="text-[14px] text-[#706E67] font-[400]">/100</span>
            </p>
            <p className="text-[12px] text-[#9E9C96] mt-0.5">Data completeness</p>

            {/* Progress bar */}
            <div className="mt-2 h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${preparedness.score}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full"
                style={{ background: preparedness.color }}
              />
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="mt-3 space-y-1.5">
          {[
            { label: 'Subject defined', done: !!subject.trim() },
            { label: 'Target marks set', done: !!targetMarks },
            { label: 'Weak topics added', done: weakTopicsCount > 0 },
            { label: 'Syllabus uploaded', done: hasSyllabus },
            { label: 'PYQs uploaded', done: hasPYQ },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className={cn(
                  'w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all',
                  item.done
                    ? 'bg-[#4ADE80] border-[#4ADE80]'
                    : 'border-[rgba(255,255,255,0.15)]'
                )}
              >
                {item.done && (
                  <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-[#111110]">
                    <path d="M2 6l2.5 2.5L10 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className={cn('text-[12px]', item.done ? 'text-[#9E9C96]' : 'text-[#706E67]')}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </PanelCard>

      {/* ── 3. Study Intensity ─────────────────────────────── */}
      <PanelCard>
        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-4 h-4" style={{ color: intensity.color }} />
          <h3 className="text-[13px] font-[500] text-[#F0EFE8]">Study Intensity</h3>
          <span
            className="ml-auto text-[11px] font-[600]"
            style={{ color: intensity.color }}
          >
            {intensity.label}
          </span>
        </div>

        {/* Intensity bars */}
        <div className="flex gap-1.5 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="flex-1 h-8 rounded-sm origin-bottom"
              style={{
                background: i < intensity.bars ? intensity.color : 'rgba(255,255,255,0.06)',
                opacity: i < intensity.bars ? 1 - i * 0.12 : 1,
              }}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
            <p className="text-[11px] text-[#706E67] mb-0.5">Hours/day</p>
            <p className="text-[16px] font-[600] text-[#F0EFE8]">{intensity.hoursPerDay}h</p>
          </div>
          <div className="p-2.5 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
            <p className="text-[11px] text-[#706E67] mb-0.5">Breaks</p>
            <p className="text-[11px] font-[500] text-[#9E9C96] leading-tight">{intensity.breaks}</p>
          </div>
        </div>
      </PanelCard>

      {/* ── 4. Recommended Workflow ───────────────────────── */}
      <PanelCard>
        <div className="flex items-center gap-2 mb-3">
          <GitBranch className="w-4 h-4 text-[#818CF8]" />
          <h3 className="text-[13px] font-[500] text-[#F0EFE8]">Recommended Workflow</h3>
        </div>

        <div
          className="px-3 py-2 rounded-lg mb-3"
          style={{
            background: `${workflow.color}0C`,
            border: `1px solid ${workflow.color}25`,
          }}
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5" style={{ color: workflow.color }} />
            <p className="text-[13px] font-[500]" style={{ color: workflow.color }}>
              {workflow.name}
            </p>
          </div>
        </div>

        <ol className="space-y-2">
          {workflow.steps.map((step, i) => (
            <li key={step} className="flex items-start gap-2.5">
              <span
                className="text-[11px] font-[700] w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  background: `${workflow.color}15`,
                  color: workflow.color,
                  border: `1px solid ${workflow.color}25`,
                }}
              >
                {i + 1}
              </span>
              <p className="text-[12px] text-[#9E9C96] leading-[1.5]">{step}</p>
            </li>
          ))}
        </ol>
      </PanelCard>
    </motion.div>
  )
}
