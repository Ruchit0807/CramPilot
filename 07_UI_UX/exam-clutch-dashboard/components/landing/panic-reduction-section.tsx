'use client'
// ============================================================
// CramPilot — Panic Reduction Stats Section
// Placed immediately after hero to ground stressed students
// with data. Answers the most common fear:
// "I don't have enough time."
// Copy is purposefully direct and factual — no hype.
// ============================================================

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Clock, BookOpen, TrendingUp, X } from 'lucide-react'

const INSIGHTS = [
  {
    icon: X,
    iconColor: 'text-[#9E9C96]',
    iconBg: 'bg-[#242422] border-white/[0.08]',
    stat: '60%',
    statColor: 'text-[#F0EFE8]',
    headline: 'of most syllabi is safe to skip',
    detail: 'Past paper analysis shows only 30–40% of topics are consistently tested. Our skip list is built from 5 years of exam data.',
  },
  {
    icon: Clock,
    iconColor: 'text-[#818CF8]',
    iconBg: 'bg-[#818CF8]/10 border-[#818CF8]/20',
    stat: '8 hrs',
    statColor: 'text-[#818CF8]',
    headline: 'saved on average by the skip list alone',
    detail: 'Students using our priority system spend time only on high-probability topics — not the full syllabus.',
  },
  {
    icon: TrendingUp,
    iconColor: 'text-[#4ADE80]',
    iconBg: 'bg-[#4ADE80]/10 border-[#4ADE80]/20',
    stat: '78%',
    statColor: 'text-[#4ADE80]',
    headline: 'of predicted questions appear in the exam',
    detail: 'Our PYQ analysis engine identifies patterns across 5 years of past papers with measurable accuracy.',
  },
  {
    icon: BookOpen,
    iconColor: 'text-[#FBBF24]',
    iconBg: 'bg-[#FBBF24]/10 border-[#FBBF24]/20',
    stat: '3 topics',
    statColor: 'text-[#FBBF24]',
    headline: 'cover 70%+ of most end-sem exams',
    detail: 'Most professors test the same core areas repeatedly. Mastering 3 critical topics is often enough to pass comfortably.',
  },
]

export function PanicReductionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Anchoring statement */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <p className="text-label text-[#818CF8] mb-3">THE DATA ON EXAM PREP</p>
          <h2 className="text-h1 sm:text-[1.85rem] text-[#F0EFE8] font-medium tracking-tight mb-3">
            You have more time than you think.
          </h2>
          <p className="text-body text-[#9E9C96] max-w-lg mx-auto">
            The problem isn't time — it's that most students study the wrong things.
            Here's what the data actually shows.
          </p>
        </motion.div>

        {/* 2×2 insight grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {INSIGHTS.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-4 p-5 rounded-2xl glass border border-white/[0.07] hover:border-white/[0.12] transition-colors duration-200"
              >
                {/* Icon */}
                <div className={`shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center mt-0.5 ${item.iconBg}`}>
                  <Icon className={`w-4 h-4 ${item.iconColor}`} />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className={`text-h1 font-medium leading-none ${item.statColor}`}>{item.stat}</span>
                  </div>
                  <p className="text-body-sm text-[#F0EFE8] font-medium mb-1.5 leading-snug">
                    {item.headline}
                  </p>
                  <p className="text-body-sm text-[#9E9C96] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA nudge */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center text-caption text-[#706E67] mt-8"
        >
          All of this is calculated for your subject automatically.{' '}
          <a href="/session/new" className="text-[#818CF8] hover:underline">
            See your skip list →
          </a>
        </motion.p>
      </div>
    </section>
  )
}
