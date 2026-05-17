'use client'
// ============================================================
// CramPilot — Workflow Engine Section
// Phase system visualization + topic priority demo
// ============================================================

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Target, BookOpen, Brain, Wrench, ClipboardList, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const PHASES = [
  { icon: Target, label: 'Triage', desc: '10% of time', status: 'done', color: 'text-sage-ec', bg: 'bg-sage-ec/10 border-sage-ec/30' },
  { icon: BookOpen, label: 'Coverage', desc: '50% of time', status: 'active', color: 'text-purple-ec', bg: 'bg-purple-ec/10 border-purple-ec/30' },
  { icon: Brain, label: 'Recall', desc: '20% of time', status: 'locked', color: 'text-tertiary-ec', bg: 'bg-transparent border-white/10' },
  { icon: Wrench, label: 'Gap Repair', desc: '15% of time', status: 'locked', color: 'text-tertiary-ec', bg: 'bg-transparent border-white/10' },
  { icon: ClipboardList, label: 'Simulate', desc: '5% of time', status: 'locked', color: 'text-tertiary-ec', bg: 'bg-transparent border-white/10' },
]

const TOPICS_DEMO = [
  { name: 'Contract Formation', priority: 'CRITICAL', minutes: 150, bar: 'bg-purple-ec', completed: true },
  { name: 'Breach & Remedies', priority: 'CRITICAL', minutes: 120, bar: 'bg-purple-ec', completed: false },
  { name: "Directors' Duties", priority: 'CRITICAL', minutes: 120, bar: 'bg-purple-ec', completed: false },
  { name: 'Company Formation', priority: 'MODERATE', minutes: 90, bar: 'bg-white/20', completed: false },
  { name: 'Historical Dev.', priority: 'SKIP', minutes: 0, bar: 'bg-transparent', completed: false },
]

const FEATURES = [
  'Phase-locked progression prevents wasted time',
  'AI rebalances your plan if you fall behind',
  'Skip list automatically removes low-probability topics',
  'Emergency mode activates when < 12 hours remain',
]

export function WorkflowSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" ref={ref} className="py-24 px-4 sm:px-6 relative">
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-purple-ec/[0.04] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-label text-purple-ec mb-3"
          >
            STUDY WORKFLOW ENGINE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-h1 sm:text-[2rem] text-primary-ec font-medium tracking-tight mb-4"
          >
            A system that tells you exactly what to do next
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.15 }}
            className="text-body text-secondary-ec"
          >
            Five phases calibrated to your available hours. Every topic gets its 
            allocation. Nothing important gets forgotten.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Phase indicator + topic list preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-2xl border border-white/[0.08] overflow-hidden"
          >
            {/* Phase strip */}
            <div className="px-6 pt-5 pb-4 border-b border-white/[0.06]">
              <p className="text-label text-tertiary-ec mb-4">CURRENT PHASE</p>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {PHASES.map((phase, i) => {
                  const Icon = phase.icon
                  return (
                    <div key={phase.label} className="flex items-center shrink-0">
                      <div className="flex flex-col items-center gap-1.5">
                        <div
                          className={cn(
                            'w-8 h-8 rounded-lg border flex items-center justify-center',
                            phase.bg
                          )}
                        >
                          {phase.status === 'done' ? (
                            <CheckCircle className="w-4 h-4 text-sage-ec" />
                          ) : (
                            <Icon className={cn('w-4 h-4', phase.color)} />
                          )}
                        </div>
                        <span
                          className={cn(
                            'text-caption whitespace-nowrap',
                            phase.status === 'active' && 'text-primary-ec font-medium',
                            phase.status === 'done' && 'text-secondary-ec',
                            phase.status === 'locked' && 'text-tertiary-ec'
                          )}
                        >
                          {phase.label}
                        </span>
                      </div>
                      {i < PHASES.length - 1 && (
                        <div className="w-6 h-px bg-white/10 mx-1 shrink-0 mb-4" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Topic list */}
            <div className="p-5 space-y-2.5">
              <p className="text-label text-tertiary-ec mb-3">PRIORITY LIST — CORPORATE LAW</p>
              {TOPICS_DEMO.map((topic, i) => (
                <div
                  key={topic.name}
                  className={cn(
                    'relative flex items-center gap-3 pl-3 pr-4 py-3 rounded-lg border',
                    topic.priority === 'CRITICAL' && !topic.completed && 'border-purple-ec/20 bg-purple-ec/[0.03]',
                    topic.priority === 'MODERATE' && 'border-white/[0.06]',
                    topic.priority === 'SKIP' && 'border-white/[0.04] opacity-40',
                    topic.completed && 'border-sage-ec/20 bg-sage-ec/[0.03]'
                  )}
                >
                  {/* Priority bar */}
                  <div className={cn('absolute left-0 top-0 bottom-0 w-[3px] rounded-l-lg', topic.bar)} />
                  {/* Completed check */}
                  <div
                    className={cn(
                      'shrink-0 w-5 h-5 rounded border flex items-center justify-center',
                      topic.completed ? 'bg-sage-ec/20 border-sage-ec/40' : 'border-white/15'
                    )}
                  >
                    {topic.completed && <CheckCircle className="w-3 h-3 text-sage-ec" />}
                  </div>
                  <span
                    className={cn(
                      'text-body-sm flex-1',
                      topic.completed ? 'text-secondary-ec line-through decoration-tertiary-ec' : 'text-primary-ec',
                      topic.priority === 'SKIP' && 'text-tertiary-ec'
                    )}
                  >
                    {topic.name}
                  </span>
                  <span
                    className={cn(
                      'text-label shrink-0',
                      topic.priority === 'CRITICAL' && !topic.completed && 'text-purple-ec',
                      topic.priority === 'CRITICAL' && topic.completed && 'text-sage-ec',
                      topic.priority === 'MODERATE' && 'text-secondary-ec',
                      topic.priority === 'SKIP' && 'text-tertiary-ec'
                    )}
                  >
                    {topic.completed ? '✓' : topic.priority}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Feature list */}
          <div className="space-y-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-4"
              >
                <div className="shrink-0 w-8 h-8 rounded-lg bg-purple-ec/10 border border-purple-ec/20 flex items-center justify-center mt-0.5">
                  <span className="text-caption text-purple-ec font-medium">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="text-body text-secondary-ec leading-relaxed">{feature}</p>
              </motion.div>
            ))}

            {/* Achievability message */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="card-intelligence rounded-xl mt-8"
            >
              <p className="text-label text-purple-ec mb-2">AI CALCULATION</p>
              <p className="text-body text-primary-ec font-medium">
                "You have 18 hours and 3 critical topics — that's 6 hours each.
                This plan is achievable."
              </p>
              <p className="text-caption text-tertiary-ec mt-2">
                Always accurate · Always honest · Never optimistic if it isn't realistic
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
