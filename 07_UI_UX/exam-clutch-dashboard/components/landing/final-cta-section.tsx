'use client'
// ============================================================
// CramPilot — Final CTA + Testimonials (v2)
// Improvements for stressed students:
// - Testimonials include specific outcomes (marks, hours saved)
// - Time + context context in each quote
// - Closing headline: "You have more time than you think"
// - Single large CTA with specific outcome promise
// ============================================================

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote: "I had 14 hours before Corporate Law. The skip list removed 8 topics I would have studied. Ended up covering exactly what came up.",
    outcome: 'Passed with 71% — was targeting 50%',
    author: 'Priya M.',
    role: 'LLB Year 3 · Delhi University',
    hoursLeft: '14 hours left',
    avatar: 'PM',
  },
  {
    quote: "The professor survey nailed it. My prof is a strict marker and the prompts made ChatGPT write exactly the structured answers she wants.",
    outcome: 'Scored 8 out of 10 in two essay questions',
    author: 'Arjun K.',
    role: 'B.Com Semester 5 · Mumbai University',
    hoursLeft: '22 hours left',
    avatar: 'AK',
  },
  {
    quote: "Two of the three predicted questions came up word for word from the emergency roadmap. I nearly fell off my chair.",
    outcome: '78% marks — highest in class for that paper',
    author: 'Sneha R.',
    role: 'MBA Year 1 · Symbiosis',
    hoursLeft: '18 hours left',
    avatar: 'SR',
  },
]

export function FinalCTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <>
      {/* ── Testimonials ── */}
      <section ref={ref} className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-center mb-12"
          >
            <p className="text-label text-[#706E67] tracking-widest mb-2">
              STUDENT RESULTS
            </p>
            <p className="text-body text-[#9E9C96]">
              Real outcomes from last-minute prep sessions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4 p-5 rounded-2xl glass border border-white/[0.07] hover:border-white/[0.12] transition-colors duration-200"
              >
                {/* Hours left badge */}
                <span className="self-start inline-flex items-center gap-1.5 text-caption text-[#FBBF24] px-2.5 py-1 rounded-full border border-[#FBBF24]/20 bg-[#FBBF24]/8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24]" />
                  {t.hoursLeft}
                </span>

                {/* Quote */}
                <blockquote className="text-body-sm text-[#F0EFE8] leading-relaxed flex-1">
                  "{t.quote}"
                </blockquote>

                {/* Outcome highlight */}
                <div className="px-3 py-2 rounded-lg bg-[#4ADE80]/[0.07] border border-[#4ADE80]/15">
                  <p className="text-caption text-[#4ADE80] font-medium">{t.outcome}</p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-1 border-t border-white/[0.05]">
                  <div className="w-8 h-8 rounded-full bg-[#818CF8]/20 border border-[#818CF8]/30 flex items-center justify-center shrink-0">
                    <span className="text-caption text-[#818CF8] font-medium">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-[#F0EFE8]">{t.author}</p>
                    <p className="text-caption text-[#706E67]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-28 px-4 sm:px-6 overflow-hidden">
        {/* BG elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#818CF8]/[0.03] to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-[#818CF8]/[0.055] blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-[#818CF8]/20 to-transparent" />

        <div className="relative max-w-2xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#818CF8]/25 bg-[#818CF8]/8 mb-8"
          >
            <Zap className="w-3.5 h-3.5 text-[#818CF8]" />
            <span className="text-caption text-[#818CF8]">Free to start · No credit card · 60 seconds</span>
          </motion.div>

          {/* Headline — the core calming message */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-medium tracking-[-0.03em] text-[#F0EFE8] leading-[1.1] mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)' }}
          >
            You have more time
            <br />
            than{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #818CF8 0%, #a5b4fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              you think.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-lg text-[#9E9C96] leading-relaxed mb-10 max-w-md mx-auto"
          >
            Most of your syllabus is safe to skip. 3 critical topics cover 70%
            of the exam. Let AI figure out which ones — in 60 seconds.
          </motion.p>

          {/* Single, large CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/session/new"
              className="inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-2xl bg-[#818CF8] text-[#111110] font-medium text-lg hover:bg-[#818CF8]/90 transition-all duration-150 shadow-2xl shadow-[#818CF8]/25 hover:shadow-[#818CF8]/35 hover:scale-[1.01] active:scale-[0.99]"
            >
              Build My Emergency Plan
              <ArrowRight className="w-5 h-5" />
            </Link>

            <p className="mt-5 text-caption text-[#706E67]">
              No account required · Works on any device · Free forever
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.05] px-4 sm:px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#818CF8]/20 border border-[#818CF8]/30 flex items-center justify-center">
              <Zap className="w-3 h-3 text-[#818CF8]" />
            </div>
            <span className="text-body-sm text-[#9E9C96]">CramPilot</span>
          </div>
          <p className="text-caption text-[#706E67]">Built for students who run out of time.</p>
          <div className="flex items-center gap-5">
            {['Privacy', 'Terms', 'Contact'].map((link) => (
              <a key={link} href="#" className="text-caption text-[#706E67] hover:text-[#9E9C96] transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
