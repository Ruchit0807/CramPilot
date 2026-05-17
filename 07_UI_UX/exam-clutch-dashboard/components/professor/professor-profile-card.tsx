'use client'
// ============================================================
// CramPilot — Professor Profile Card
// Summary card shown after completing the professor survey
// ============================================================

import { motion } from 'framer-motion'
import {
  Brain,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  Star,
  TrendingUp,
  Shield,
  BookMarked,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProfessorProfile, ProfessorArchetype } from '@/types'
import { ProfessorTag } from './professor-tag'

// ── Archetype visual config ───────────────────────────────────

const ARCHETYPE_CONFIG: Record<
  ProfessorArchetype,
  { emoji: string; gradient: string; accentClass: string; bgClass: string }
> = {
  'theory-scholar': {
    emoji: '📚',
    gradient: 'from-violet-500/20 to-purple-500/5',
    accentClass: 'text-violet-400',
    bgClass: 'bg-violet-500/10 border-violet-500/25',
  },
  'problem-setter': {
    emoji: '🔢',
    gradient: 'from-blue-500/20 to-cyan-500/5',
    accentClass: 'text-blue-400',
    bgClass: 'bg-blue-500/10 border-blue-500/25',
  },
  'case-analyst': {
    emoji: '🔍',
    gradient: 'from-cyan-500/20 to-teal-500/5',
    accentClass: 'text-cyan-400',
    bgClass: 'bg-cyan-500/10 border-cyan-500/25',
  },
  'strict-marker': {
    emoji: '⚡',
    gradient: 'from-amber-500/20 to-orange-500/5',
    accentClass: 'text-amber-400',
    bgClass: 'bg-amber-500/10 border-amber-500/25',
  },
  'pyq-repeater': {
    emoji: '🔄',
    gradient: 'from-emerald-500/20 to-green-500/5',
    accentClass: 'text-emerald-400',
    bgClass: 'bg-emerald-500/10 border-emerald-500/25',
  },
  'depth-seeker': {
    emoji: '🎯',
    gradient: 'from-purple-500/20 to-indigo-500/5',
    accentClass: 'text-purple-400',
    bgClass: 'bg-purple-500/10 border-purple-500/25',
  },
  'coverage-checker': {
    emoji: '📋',
    gradient: 'from-orange-500/20 to-amber-500/5',
    accentClass: 'text-orange-400',
    bgClass: 'bg-orange-500/10 border-orange-500/25',
  },
  'mixed-generalist': {
    emoji: '🎲',
    gradient: 'from-slate-500/20 to-slate-500/5',
    accentClass: 'text-slate-400',
    bgClass: 'bg-slate-500/10 border-slate-500/25',
  },
}

// ── Sub-components ────────────────────────────────────────────

function DifficultyStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'w-3.5 h-3.5',
            i < rating ? 'text-amber-400 fill-amber-400' : 'text-white/15'
          )}
        />
      ))}
      <span className="ml-1.5 text-xs text-[var(--ec-text-tertiary)]">Difficulty</span>
    </div>
  )
}

function SeverityDot({ severity }: { severity: 'low' | 'medium' | 'high' }) {
  return (
    <span
      className={cn(
        'inline-block w-2 h-2 rounded-full shrink-0 mt-1',
        severity === 'high' && 'bg-red-400',
        severity === 'medium' && 'bg-amber-400',
        severity === 'low' && 'bg-emerald-400'
      )}
    />
  )
}

// ── Main Card ─────────────────────────────────────────────────

interface ProfessorProfileCardProps {
  profile: ProfessorProfile
  onReset?: () => void
  onConfirm?: () => void
  compact?: boolean
  className?: string
}

export function ProfessorProfileCard({
  profile,
  onReset,
  onConfirm,
  compact = false,
  className,
}: ProfessorProfileCardProps) {
  const config = ARCHETYPE_CONFIG[profile.archetype]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className={cn('w-full space-y-4', className)}
    >
      {/* ── Profile Hero Card ── */}
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border border-white/12',
          'bg-gradient-to-br',
          config.gradient
        )}
        style={{ background: `linear-gradient(135deg, var(--ec-bg-elevated) 0%, var(--ec-bg-surface) 100%)` }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse at top left, ${
              profile.archetype === 'strict-marker' ? 'rgba(251,191,36,0.15)' :
              profile.archetype === 'pyq-repeater' ? 'rgba(74,222,128,0.15)' :
              'rgba(129,140,248,0.15)'
            } 0%, transparent 70%)`,
          }}
        />

        <div className="relative p-6">
          {/* Top row */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-2xl border', config.bgClass)}>
                {config.emoji}
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--ec-text-tertiary)] uppercase tracking-wider mb-0.5">
                  Professor Profile
                </p>
                <ProfessorTag archetype={profile.archetype} size="md" />
              </div>
            </div>
            <div className="text-right space-y-1">
              <DifficultyStars rating={profile.difficultyRating} />
              <div className="flex items-center justify-end gap-1.5">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span className="text-xs text-emerald-400 font-medium">
                  {profile.pyqReliability}% PYQ match
                </span>
              </div>
            </div>
          </div>

          {/* Summary sentence */}
          <div className={cn('rounded-xl border p-4', config.bgClass)}>
            <div className="flex items-start gap-2">
              <Brain className={cn('w-4 h-4 mt-0.5 shrink-0', config.accentClass)} />
              <p className="text-sm font-medium text-[var(--ec-text-primary)] leading-relaxed">
                {profile.profileSummary}
              </p>
            </div>
          </div>

          {/* Marking philosophy */}
          <p className="mt-3 text-xs text-[var(--ec-text-secondary)] leading-relaxed">
            <span className="font-semibold text-[var(--ec-text-primary)]">Marking philosophy: </span>
            {profile.markingPhilosophy}
          </p>
        </div>
      </div>

      {/* ── Strategy Details ── */}
      {!compact && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-white/10 bg-white/3 p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-4 h-4 text-[var(--ec-sage)]" />
            <h3 className="text-sm font-semibold text-[var(--ec-text-primary)]">
              Your Study Strategy
            </h3>
          </div>
          <ul className="space-y-2.5">
            {profile.strategyDetails.map((tip, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="flex items-start gap-2.5 text-sm text-[var(--ec-text-secondary)]"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--ec-sage)]/60 shrink-0" />
                {tip}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* ── Answer Style Guide ── */}
      {!compact && profile.answerStyleGuide && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl border border-white/10 bg-white/3 p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <BookMarked className="w-4 h-4 text-[var(--ec-purple)]" />
            <h3 className="text-sm font-semibold text-[var(--ec-text-primary)]">
              Answer Structure
            </h3>
          </div>
          <ol className="space-y-2">
            {profile.answerStyleGuide.structure.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--ec-text-secondary)]">
                <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--ec-purple)]/15 border border-[var(--ec-purple)]/25 text-[var(--ec-purple)] text-xs flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          {profile.answerStyleGuide.wordCountGuidance && (
            <p className="mt-3 text-xs text-[var(--ec-text-tertiary)] border-t border-white/8 pt-3">
              📏 {profile.answerStyleGuide.wordCountGuidance}
            </p>
          )}
          {profile.answerStyleGuide.diagramExpected && (
            <p className="mt-1.5 text-xs text-amber-400/80">
              ✏️ Diagrams are expected — prepare standard diagrams for each topic
            </p>
          )}
        </motion.div>
      )}

      {/* ── Marks Traps ── */}
      {!compact && profile.marksTrapList.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-semibold text-[var(--ec-text-primary)]">
              Marks Traps to Avoid
            </h3>
          </div>
          <div className="space-y-3">
            {profile.marksTrapList.map((trap) => (
              <div
                key={trap.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/8"
              >
                <SeverityDot severity={trap.severity} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-[var(--ec-text-primary)]">
                      {trap.title}
                    </span>
                    <span className="text-xs text-red-400/80 font-mono">{trap.deductionRange}</span>
                  </div>
                  <p className="text-xs text-[var(--ec-text-tertiary)] mt-0.5">{trap.condition}</p>
                  <div className="flex items-start gap-1.5 mt-1.5">
                    <Shield className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-emerald-400/80">{trap.prevention}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Actions ── */}
      {(onReset || onConfirm) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3 pt-1"
        >
          {onReset && (
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/15 text-sm text-[var(--ec-text-secondary)] hover:text-[var(--ec-text-primary)] hover:border-white/25 hover:bg-white/5 transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              Redo survey
            </button>
          )}
          {onConfirm && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              onClick={onConfirm}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[var(--ec-purple)] text-white font-semibold text-sm hover:bg-violet-500 shadow-lg shadow-[var(--ec-purple)]/25 transition-all duration-200"
            >
              Use this profile
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}
