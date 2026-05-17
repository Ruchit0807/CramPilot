'use client'
// ============================================================
// CramPilot — How It Works (v2)
// Improvements for stressed students:
// - Time estimate on each step reduces anxiety about setup time
// - Cleaner visual hierarchy with larger step numbers
// - "What you get" outcome per step — concrete, not vague
// - Removed connector line complexity
// ============================================================

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Target, Cpu, Clipboard, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = [
  {
    number: '01',
    icon: Target,
    time: '~90 seconds',
    title: 'Tell us your situation',
    description:
      'Enter your subject and hours remaining. Answer 6 quick questions about your professor\'s exam style — marking behavior, format, past paper consistency.',
    outcome: 'You get: professor archetype + exam format diagnosis',
    accent: 'border-[#818CF8]/20 bg-[#818CF8]/[0.03]',
    iconBg: 'bg-[#818CF8]/10 border-[#818CF8]/25 text-[#818CF8]',
    numberColor: 'text-[#818CF8]/20',
  },
  {
    number: '02',
    icon: Cpu,
    time: '~60 seconds',
    title: 'AI builds your strategy',
    description:
      'Our engine analyzes past paper patterns for your subject, ranks topics by exam probability, and calculates exactly how many hours each critical topic needs.',
    outcome: 'You get: priority list + skip list + hour-by-hour schedule',
    accent: 'border-[#818CF8]/20 bg-[#818CF8]/[0.03]',
    iconBg: 'bg-[#818CF8]/10 border-[#818CF8]/25 text-[#818CF8]',
    numberColor: 'text-[#818CF8]/20',
  },
  {
    number: '03',
    icon: Clipboard,
    time: 'Ongoing',
    title: 'Execute with ready-made prompts',
    description:
      'Get topic-by-topic AI prompts — pre-written, professor-calibrated, and matched to the right tool. Copy, paste, study. Tick each topic as you finish.',
    outcome: 'You get: 6–15 ready-to-paste prompts per subject',
    accent: 'border-[#4ADE80]/15 bg-[#4ADE80]/[0.03]',
    iconBg: 'bg-[#4ADE80]/10 border-[#4ADE80]/25 text-[#4ADE80]',
    numberColor: 'text-[#4ADE80]/20',
  },
]

export function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" ref={ref} className="py-24 px-4 sm:px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#818CF8]/[0.035] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-label text-[#818CF8] mb-3"
          >
            THE PROCESS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-h1 sm:text-[2rem] text-[#F0EFE8] font-medium tracking-tight"
          >
            From panic to plan in 3 minutes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.12 }}
            className="text-body text-[#9E9C96] mt-3 max-w-md mx-auto"
          >
            Total setup time: under 4 minutes. Then you study.
          </motion.p>
        </div>

        {/* Steps — stacked on mobile, side by side on desktop */}
        <div className="space-y-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.16 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'relative flex gap-5 p-5 sm:p-6 rounded-2xl border transition-colors duration-200',
                  step.accent
                )}
              >
                {/* Step number — large background watermark */}
                <span
                  className={cn(
                    'absolute right-5 top-4 font-medium leading-none select-none pointer-events-none',
                    step.numberColor
                  )}
                  style={{ fontSize: '4rem' }}
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                {/* Icon */}
                <div className={cn('shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center mt-0.5', step.iconBg)}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Title + time badge */}
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-h3 text-[#F0EFE8] font-medium">{step.title}</h3>
                    <span className="inline-flex items-center gap-1 text-caption text-[#9E9C96] px-2 py-0.5 rounded-full border border-white/[0.08] bg-white/[0.04]">
                      <Clock className="w-2.5 h-2.5" />
                      {step.time}
                    </span>
                  </div>

                  <p className="text-body-sm text-[#9E9C96] leading-relaxed mb-3">
                    {step.description}
                  </p>

                  {/* Outcome callout */}
                  <div className="inline-flex items-center gap-2 text-caption text-[#706E67] border-t border-white/[0.05] pt-3">
                    <span className="text-[#818CF8]">→</span>
                    <span>{step.outcome}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
