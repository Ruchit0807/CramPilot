'use client'
// ============================================================
// CramPilot — Professor Tag
// Visual tag for professor archetype classification
// ============================================================

import { cn } from '@/lib/utils'
import type { ProfessorArchetype } from '@/types'

const ARCHETYPE_CONFIG: Record<ProfessorArchetype, {
  label: string
  emoji: string
  color: string
}> = {
  'theory-scholar': {
    label: 'Theory Scholar',
    emoji: '📚',
    color: 'text-purple-ec bg-purple-ec/10 border-purple-ec/20',
  },
  'problem-setter': {
    label: 'Problem Setter',
    emoji: '🔢',
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  },
  'case-analyst': {
    label: 'Case Analyst',
    emoji: '🔍',
    color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  },
  'strict-marker': {
    label: 'Strict Marker',
    emoji: '⚡',
    color: 'text-amber-ec bg-amber-ec/10 border-amber-ec/20',
  },
  'pyq-repeater': {
    label: 'PYQ Repeater',
    emoji: '🔄',
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  'depth-seeker': {
    label: 'Depth Seeker',
    emoji: '🎯',
    color: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  },
  'coverage-checker': {
    label: 'Coverage Checker',
    emoji: '📋',
    color: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  },
  'mixed-generalist': {
    label: 'Mixed Generalist',
    emoji: '🎲',
    color: 'text-secondary-ec bg-surface-ec border-ec',
  },
}

interface ProfessorTagProps {
  archetype: ProfessorArchetype
  size?: 'sm' | 'md'
  showEmoji?: boolean
  className?: string
}

export function ProfessorTag({
  archetype,
  size = 'md',
  showEmoji = true,
  className,
}: ProfessorTagProps) {
  const config = ARCHETYPE_CONFIG[archetype]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded border font-medium',
        size === 'sm' && 'text-caption px-2 py-0.5',
        size === 'md' && 'text-body-sm px-3 py-1',
        config.color,
        className
      )}
    >
      {showEmoji && <span>{config.emoji}</span>}
      {config.label}
    </span>
  )
}
