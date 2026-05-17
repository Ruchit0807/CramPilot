'use client'
// ============================================================
// CramPilot — Emergency Roadmap Preview Section
// Visual timeline of a full exam prep session
// ============================================================

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { BookOpen, Brain, PenLine, Coffee, Moon, GraduationCap, Clock, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const TIMELINE_BLOCKS = [
  {
    time: '09:00 PM',
    type: 'study',
    label: 'Contract Formation — Concept Load',
    tool: 'ChatGPT',
    toolColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    duration: '45 min',
    icon: BookOpen,
    priority: 'CRITICAL',
    priorityColor: 'bg-purple-ec',
  },
  {
    time: '09:45 PM',
    type: 'study',
    label: 'Contract Formation — Practice Questions',
    tool: 'ChatGPT',
    toolColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    duration: '35 min',
    icon: PenLine,
    priority: 'CRITICAL',
    priorityColor: 'bg-purple-ec',
  },
  {
    time: '10:20 PM',
    type: 'break',
    label: 'Short Break',
    duration: '10 min',
    icon: Coffee,
    priority: null,
    priorityColor: '',
  },
  {
    time: '10:30 PM',
    type: 'study',
    label: 'Breach & Remedies — Concept Load',
    tool: 'Claude',
    toolColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    duration: '45 min',
    icon: Brain,
    priority: 'CRITICAL',
    priorityColor: 'bg-purple-ec',
  },
  {
    time: '11:15 PM',
    type: 'study',
    label: 'Breach & Remedies — Answer Framework',
    tool: 'Claude',
    toolColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    duration: '30 min',
    icon: PenLine,
    priority: 'CRITICAL',
    priorityColor: 'bg-purple-ec',
  },
  {
    time: '02:00 AM',
    type: 'stop',
    label: 'Stop studying. Sleep now.',
    duration: '—',
    icon: Moon,
    priority: null,
    priorityColor: '',
  },
  {
    time: '09:30 AM',
    type: 'exam',
    label: 'Exam time. Arrive early. You\'re prepared.',
    duration: '3 hrs',
    icon: GraduationCap,
    priority: null,
    priorityColor: '',
  },
]

const SKIP_ITEMS = [
  'Historical Development of Company Law',
  'Comparative International Law',
  'Pre-Independence Case Law',
  'Quasi-Contracts (Sec 68–72)',
]

export function RoadmapSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a18]/40 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-ec/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-label text-amber-ec mb-3"
          >
            EMERGENCY EXAM ROADMAP
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-h1 sm:text-[2rem] text-primary-ec font-medium tracking-tight mb-4"
          >
            Your hour-by-hour schedule. No decisions required.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.15 }}
            className="text-body text-secondary-ec"
          >
            When panic sets in, you don't need more options. You need to know
            exactly what to do right now, and for the next 18 hours.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 glass rounded-2xl border border-white/[0.08] p-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/[0.06]">
              <div>
                <p className="text-label text-amber-ec">EMERGENCY PLAN ACTIVE</p>
                <p className="text-body-sm text-secondary-ec mt-0.5">
                  Corporate Law · 18 hours remaining
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-ec/8 border border-amber-ec/20">
                <Clock className="w-3.5 h-3.5 text-amber-ec" />
                <span className="text-caption text-amber-ec">18h 00m</span>
              </div>
            </div>

            {/* Timeline items */}
            <div className="space-y-1">
              {TIMELINE_BLOCKS.map((block, i) => {
                const Icon = block.icon
                const isBreak = block.type === 'break'
                const isStop = block.type === 'stop'
                const isExam = block.type === 'exam'
                const isTruncated = i === 4

                return (
                  <div key={i}>
                    {/* Truncation indicator */}
                    {isTruncated && (
                      <div className="flex items-center gap-3 py-2 my-1">
                        <div className="w-16 shrink-0" />
                        <div className="flex items-center gap-2 text-caption text-tertiary-ec">
                          <div className="flex-1 h-px border-t border-dashed border-white/10" />
                          <span>3 more blocks · Directors' Duties</span>
                          <div className="flex-1 h-px border-t border-dashed border-white/10" />
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      {/* Time */}
                      <div className="w-16 shrink-0 pt-3">
                        <span className="text-caption text-tertiary-ec tabular-nums">
                          {block.time}
                        </span>
                      </div>

                      {/* Connector column */}
                      <div className="flex flex-col items-center shrink-0">
                        <div
                          className={cn(
                            'w-2 h-2 rounded-full mt-3.5',
                            isStop && 'bg-tertiary-ec/40',
                            isBreak && 'bg-amber-ec/40',
                            isExam && 'bg-purple-ec',
                            block.type === 'study' && 'bg-purple-ec'
                          )}
                        />
                        {i < TIMELINE_BLOCKS.length - 1 && (
                          <div className={cn(
                            'w-px flex-1 min-h-6 my-1',
                            isStop ? 'border-l border-dashed border-white/10' : 'bg-white/[0.07]'
                          )} />
                        )}
                      </div>

                      {/* Block content */}
                      <div
                        className={cn(
                          'flex-1 flex items-start gap-3 rounded-xl border p-3 mb-2 transition-colors',
                          isBreak && 'border-amber-ec/15 bg-amber-ec/[0.04]',
                          isStop && 'border-white/[0.05] opacity-60',
                          isExam && 'border-purple-ec/25 bg-purple-ec/[0.04]',
                          block.type === 'study' && 'border-white/[0.07] hover:border-white/[0.14]'
                        )}
                      >
                        {/* Priority bar */}
                        {block.priorityColor && (
                          <div className={cn('absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl', block.priorityColor)} />
                        )}

                        <div
                          className={cn(
                            'shrink-0 w-7 h-7 rounded-lg flex items-center justify-center',
                            isBreak && 'bg-amber-ec/10 text-amber-ec',
                            isStop && 'bg-surface-ec text-tertiary-ec',
                            isExam && 'bg-purple-ec/15 text-purple-ec',
                            block.type === 'study' && 'bg-recessed-ec text-secondary-ec'
                          )}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              'text-body-sm font-medium leading-snug',
                              isStop && 'text-tertiary-ec',
                              !isStop && 'text-primary-ec'
                            )}
                          >
                            {block.label}
                          </p>
                          {block.tool && (
                            <span className={cn('inline-block mt-1 text-caption px-1.5 py-0.5 rounded border', block.toolColor)}>
                              {block.tool}
                            </span>
                          )}
                        </div>

                        <span className="text-caption text-tertiary-ec shrink-0">{block.duration}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Right column: skip list + stats */}
          <div className="space-y-5">
            {/* Skip list */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl border border-white/[0.08] p-5"
            >
              <p className="text-label text-tertiary-ec mb-4">SAFE TO SKIP</p>
              <div className="space-y-2">
                {SKIP_ITEMS.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 py-2 border-b border-white/[0.04] last:border-0"
                  >
                    <span className="text-tertiary-ec text-sm">✕</span>
                    <span className="text-body-sm text-tertiary-ec line-through decoration-tertiary-ec/40">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-caption text-tertiary-ec mt-4">
                Never appeared in 5 years of past papers
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="card-intelligence rounded-2xl"
            >
              <p className="text-label text-purple-ec mb-4">PLAN SUMMARY</p>
              <div className="space-y-3">
                {[
                  { label: 'Critical topics', value: '3', sub: 'Must cover' },
                  { label: 'Topics to skip', value: '4', sub: 'Never appeared' },
                  { label: 'Coverage estimate', value: '85%', sub: 'Of exam content' },
                  { label: 'Prediction accuracy', value: '78%', sub: 'Based on 4 years PYQ' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-body-sm text-secondary-ec">{stat.label}</p>
                      <p className="text-caption text-tertiary-ec">{stat.sub}</p>
                    </div>
                    <span className="text-h2 text-primary-ec font-medium">{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievability message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="flex items-start gap-3 p-4 rounded-xl border border-sage-ec/20 bg-sage-ec/[0.04]"
            >
              <TrendingUp className="w-4 h-4 text-sage-ec mt-0.5 shrink-0" />
              <p className="text-body-sm text-secondary-ec">
                <span className="text-sage-ec font-medium">This plan is achievable.</span>{' '}
                You have 18 hours and 3 critical topics — 6h each. Critical content 
                represents 85% of likely exam questions.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
