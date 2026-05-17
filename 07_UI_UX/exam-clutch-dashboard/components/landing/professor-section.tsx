'use client'
// ============================================================
// CramPilot — Professor Intelligence Section
// Showcases professor archetype analysis + marks trap detection
// ============================================================

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { AlertTriangle, CheckCircle, BookOpen, Calculator, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

const ARCHETYPES = [
  {
    emoji: '📚',
    label: 'Theory Scholar',
    color: 'text-purple-ec',
    bg: 'bg-purple-ec/10 border-purple-ec/20',
    strategy: 'Rewards definition-led, structured prose with case law citations.',
    traps: ['Missing conclusion: −2 marks', 'Informal language: −1 mark'],
  },
  {
    emoji: '🔢',
    label: 'Problem Setter',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    strategy: 'Marks step-by-step working. Method matters more than final answer.',
    traps: ['Missing units: −1 mark', 'Skipped steps: −0.5/step'],
  },
  {
    emoji: '🔄',
    label: 'PYQ Repeater',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    strategy: 'Past paper patterns repeat 70–80% every year. Memorize model answers.',
    traps: ['Reading old version of question: −5 marks'],
  },
]

const SURVEY_QUESTIONS = [
  { q: 'What type of questions appear most?', tag: 'Format' },
  { q: 'What does success look like for past toppers?', tag: 'Pattern' },
  { q: 'How does your professor mark essays?', tag: 'Marking' },
  { q: 'How consistent are past paper topics?', tag: 'PYQ' },
  { q: 'What\'s your target score?', tag: 'Goal' },
  { q: 'How many hours do you have?', tag: 'Time' },
]

export function ProfessorSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="professor" ref={ref} className="py-24 px-4 sm:px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1C1C1A]/30 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-label text-purple-ec mb-3"
          >
            PROFESSOR INTELLIGENCE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-h1 sm:text-[2rem] text-primary-ec font-medium tracking-tight mb-4"
          >
            Your strategy changes based on who marks your paper
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-body text-secondary-ec leading-relaxed"
          >
            6 questions about your professor unlocks a complete marking psychology 
            report — the exact answer structure they reward, and the hidden mistakes 
            that silently cost you marks.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Survey preview */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-2xl border border-white/[0.08] overflow-hidden"
          >
            {/* Card header */}
            <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <div>
                <p className="text-label text-purple-ec">PROFESSOR SURVEY</p>
                <p className="text-caption text-tertiary-ec mt-0.5">Question 3 of 6</p>
              </div>
              {/* Progress bar */}
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-6 h-1 rounded-full',
                      i < 3 ? 'bg-purple-ec' : 'bg-white/10'
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Active question */}
            <div className="p-6">
              <p className="text-body text-primary-ec font-medium mb-5">
                How does your professor mark essays?
              </p>
              <div className="space-y-2">
                {[
                  { label: 'Strict — exact terms required', active: false },
                  { label: 'Fair — rewards clear reasoning', active: true },
                  { label: 'Rewards depth over coverage', active: false },
                  { label: 'Rewards coverage over depth', active: false },
                ].map((opt) => (
                  <div
                    key={opt.label}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-150 cursor-pointer',
                      opt.active
                        ? 'border-purple-ec/40 bg-purple-ec/8 text-primary-ec'
                        : 'border-white/[0.06] text-secondary-ec hover:border-white/[0.12]'
                    )}
                  >
                    <div
                      className={cn(
                        'w-4 h-4 rounded-full border flex items-center justify-center shrink-0',
                        opt.active ? 'border-purple-ec bg-purple-ec' : 'border-white/20'
                      )}
                    >
                      {opt.active && <div className="w-1.5 h-1.5 rounded-full bg-[#111110]" />}
                    </div>
                    <span className="text-body-sm">{opt.label}</span>
                  </div>
                ))}
              </div>
              <button className="mt-5 w-full py-3 rounded-xl bg-purple-ec text-[#111110] text-body-sm font-medium hover:bg-purple-ec/90 transition-colors">
                Next question →
              </button>
            </div>
          </motion.div>

          {/* Right: Archetype cards */}
          <div className="space-y-4">
            {ARCHETYPES.map((arch, i) => (
              <motion.div
                key={arch.label}
                initial={{ opacity: 0, x: 24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-xl border border-white/[0.07] p-5 hover:border-white/[0.14] transition-colors duration-200"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-xl">{arch.emoji}</span>
                  <div>
                    <span className={cn('text-label', arch.color)}>{arch.label}</span>
                    <p className="text-body-sm text-secondary-ec mt-1">{arch.strategy}</p>
                  </div>
                </div>
                {/* Marks traps */}
                <div className="flex flex-wrap gap-2">
                  {arch.traps.map((trap) => (
                    <span
                      key={trap}
                      className="inline-flex items-center gap-1.5 text-caption px-2.5 py-1 rounded-md bg-amber-ec/8 border border-amber-ec/20 text-amber-ec"
                    >
                      <AlertTriangle className="w-2.5 h-2.5 shrink-0" />
                      {trap}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
