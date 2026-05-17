'use client'
// ============================================================
// CramPilot — Professor Summary Card
// Displays the AI-generated professor archetype and insights
// ============================================================

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  UserSearch,
  ChevronDown,
  Check,
  Brain,
  Star,
  AlertCircle,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { fadeInUp } from '@/lib/animations'

// ── Teaching behavior patterns ───────────────────────────────
const BEHAVIOR_PATTERNS = [
  {
    id: 'conceptual',
    label: 'Concept-heavy',
    description: 'Prefers deep understanding over memorization',
    icon: Brain,
  },
  {
    id: 'numerical',
    label: 'Numericals first',
    description: 'Expects calculation-based derivations',
    icon: Star,
  },
  {
    id: 'theory',
    label: 'Theory-focused',
    description: 'Values definitions & structured explanations',
    icon: UserSearch,
  },
  {
    id: 'previous',
    label: 'Repeats questions',
    description: 'Often lifts directly from past papers',
    icon: AlertCircle,
  },
  {
    id: 'application',
    label: 'Application-based',
    description: 'Real-world context expected in answers',
    icon: Sparkles,
  },
]

// ── Archetype profiles ──────────────────────────────────────
const ARCHETYPES: Record<
  string,
  { label: string; color: string; strategy: string }
> = {
  strict: {
    label: 'Strict Marker',
    color: '#F87171',
    strategy: 'Focus on exact definitions and step-by-step derivations. Every mark counts.',
  },
  conceptual: {
    label: 'Concept Seeker',
    color: '#818CF8',
    strategy: 'Deep understanding over rote learning. Explain the "why" before the "how".',
  },
  numerical: {
    label: 'Problem Setter',
    color: '#FBBF24',
    strategy: 'Practice 2× the numericals. Show full working — partial credit is available.',
  },
  pattern: {
    label: 'PYQ Repeater',
    color: '#4ADE80',
    strategy: 'Solve the last 5 years of papers. High repeat probability (70–80%).',
  },
}

function deriveArchetype(patterns: string[]): string {
  if (patterns.includes('previous')) return 'pattern'
  if (patterns.includes('numerical')) return 'numerical'
  if (patterns.includes('conceptual')) return 'conceptual'
  return 'strict'
}

interface ProfessorSummaryCardProps {
  className?: string
  professorName: string
  onNameChange: (name: string) => void
  selectedPatterns: string[]
  onPatternsChange: (patterns: string[]) => void
}

export function ProfessorSummaryCard({ 
  className,
  professorName,
  onNameChange,
  selectedPatterns,
  onPatternsChange
}: ProfessorSummaryCardProps) {
  const [showPatterns, setShowPatterns] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)

  const togglePattern = (id: string) =>
    onPatternsChange(
      selectedPatterns.includes(id) 
        ? selectedPatterns.filter((p) => p !== id) 
        : [...selectedPatterns, id]
    )

  const archetype =
    selectedPatterns.length > 0
      ? ARCHETYPES[deriveArchetype(selectedPatterns)]
      : null

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className={cn(
        'relative rounded-xl overflow-hidden',
        'bg-[rgba(28,28,26,0.8)] backdrop-blur-sm',
        'border border-[rgba(129,140,248,0.2)]',
        className
      )}
    >
      {/* Purple accent left border */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#818CF8] via-[#818CF8]/50 to-transparent" />

      {/* AI shimmer top bar */}
      <div className="absolute top-0 left-[3px] right-0 h-[1px] bg-gradient-to-r from-[rgba(129,140,248,0.6)] via-[rgba(129,140,248,0.2)] to-transparent" />

      <div className="p-5 pl-6">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-[rgba(129,140,248,0.1)] border border-[rgba(129,140,248,0.25)] flex items-center justify-center shrink-0">
            <UserSearch className="w-4 h-4 text-[#818CF8]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-[14px] font-[500] text-[#F0EFE8]">Professor Intelligence</h3>
              <span className="text-[10px] font-[600] px-1.5 py-0.5 rounded-sm bg-[rgba(129,140,248,0.15)] text-[#818CF8] border border-[rgba(129,140,248,0.25)] tracking-wider">
                AI
              </span>
            </div>
            <p className="text-[12px] text-[#706E67] mt-0.5">
              Tailor strategy to your professor's exam style
            </p>
          </div>
        </div>

        {/* Professor name */}
        <div className="mb-3">
          <label className="text-[11px] font-[500] text-[#706E67] uppercase tracking-[0.06em] mb-1.5 block">
            Professor Name (optional)
          </label>
          <input
            id="input-professor-name"
            type="text"
            placeholder="e.g., Dr. Sharma, Prof. Mehta..."
            value={professorName}
            onChange={(e) => onNameChange(e.target.value)}
            className={cn(
              'w-full h-10 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.09)] rounded-lg',
              'px-3 text-[13px] text-[#F0EFE8] placeholder:text-[#706E67]',
              'focus:outline-none focus:border-[rgba(129,140,248,0.4)] transition-all duration-150'
            )}
          />
        </div>

        {/* Teaching patterns dropdown */}
        <div className="mb-3">
          <label className="text-[11px] font-[500] text-[#706E67] uppercase tracking-[0.06em] mb-1.5 block">
            Teaching Patterns
          </label>
          <button
            onClick={() => setShowPatterns(!showPatterns)}
            className={cn(
              'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left',
              'bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.09)] transition-all duration-150',
              showPatterns && 'border-[rgba(129,140,248,0.3)]'
            )}
          >
            <span className="text-[13px] text-[#9E9C96]">
              {selectedPatterns.length > 0
                ? `${selectedPatterns.length} pattern${selectedPatterns.length > 1 ? 's' : ''} selected`
                : 'Select exam behavior patterns'}
            </span>
            <ChevronDown
              className={cn(
                'w-4 h-4 text-[#706E67] transition-transform duration-200',
                showPatterns && 'rotate-180'
              )}
            />
          </button>

          <AnimatePresence>
            {showPatterns && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-1 bg-[#1A1A18] border border-[rgba(255,255,255,0.09)] rounded-lg p-1.5 space-y-0.5">
                  {BEHAVIOR_PATTERNS.map((pattern) => {
                    const Icon = pattern.icon
                    const isSelected = selectedPatterns.includes(pattern.id)
                    return (
                      <button
                        key={pattern.id}
                        onClick={() => togglePattern(pattern.id)}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150',
                          isSelected
                            ? 'bg-[rgba(129,140,248,0.1)] border border-[rgba(129,140,248,0.2)]'
                            : 'hover:bg-[rgba(255,255,255,0.04)] border border-transparent'
                        )}
                      >
                        <div
                          className={cn(
                            'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all',
                            isSelected
                              ? 'bg-[#818CF8] border-[#818CF8]'
                              : 'border-[rgba(255,255,255,0.15)]'
                          )}
                        >
                          {isSelected && <Check className="w-3 h-3 text-[#111110]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              'text-[13px] font-[450]',
                              isSelected ? 'text-[#F0EFE8]' : 'text-[#9E9C96]'
                            )}
                          >
                            {pattern.label}
                          </p>
                          <p className="text-[11px] text-[#706E67] truncate">
                            {pattern.description}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Archetype reveal */}
        <AnimatePresence>
          {archetype && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-lg p-4"
              style={{
                background: `${archetype.color}08`,
                border: `1px solid ${archetype.color}25`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: archetype.color }}
                />
                <p className="text-[12px] font-[600] uppercase tracking-wider" style={{ color: archetype.color }}>
                  {archetype.label}
                </p>
                <span className="ml-auto text-[10px] text-[#706E67]">Detected archetype</span>
              </div>
              <p className="text-[13px] text-[#9E9C96] leading-[1.6]">
                {archetype.strategy}
              </p>

              <button
                onClick={() => setIsRevealed(!isRevealed)}
                className="mt-3 flex items-center gap-1 text-[12px] transition-colors"
                style={{ color: archetype.color }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isRevealed ? 'Hide' : 'See'} AI recommendations
                <ChevronDown
                  className={cn('w-3 h-3 transition-transform', isRevealed && 'rotate-180')}
                />
              </button>

              <AnimatePresence>
                {isRevealed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t overflow-hidden"
                    style={{ borderColor: `${archetype.color}20` }}
                  >
                    <ul className="space-y-1.5">
                      {['Focus on high-yield topics first', 'Structure answers with headings', 'Include worked examples'].map((tip) => (
                        <li key={tip} className="flex items-start gap-2 text-[12px] text-[#9E9C96]">
                          <div
                            className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                            style={{ background: archetype.color }}
                          />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {selectedPatterns.length === 0 && (
          <p className="text-[12px] text-[#706E67] italic">
            Select teaching patterns above to unlock your professor's exam archetype
          </p>
        )}
      </div>
    </motion.div>
  )
}
