'use client'
// ============================================================
// CramPilot — Improved Hero Section
// Designed for stressed students under time pressure:
// - Single focused CTA (no decision fatigue)
// - Inline quick-start form (hours + subject = instant value)
// - Calming reassurance below CTA
// - Floating cards simplified to reduce visual noise
// - Panic-reducing subheadline copy
// ============================================================

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight, Clock, Target, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const QUICK_SUBJECTS = [
  'Corporate Law', 'Thermodynamics', 'Data Structures',
  'Financial Accounting', 'Organic Chemistry', 'Marketing Management',
]

// The 3 most calming stat facts for panicked students
const CALM_STATS = [
  { value: '60 sec', label: 'to your study plan', icon: Clock },
  { value: '78%', label: 'question prediction rate', icon: Target },
  { value: '4.9★', label: 'from students in crunch', icon: CheckCircle },
]

export function HeroSection() {
  const [subject, setSubject] = useState('')
  const [hours, setHours] = useState('')
  const [showSubjects, setShowSubjects] = useState(false)

  const filteredSubjects = subject.length > 1
    ? QUICK_SUBJECTS.filter(s => s.toLowerCase().includes(subject.toLowerCase()))
    : QUICK_SUBJECTS

  const isReady = subject.trim().length > 2 && hours.trim().length > 0
  const hoursNum = parseFloat(hours) || 0
  const timeMessage = isReady
    ? hoursNum <= 12
      ? `Emergency mode: ${hoursNum}h is enough to cover what matters.`
      : `You have ${hoursNum} hours. That's more than enough with the right plan.`
    : null

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-24 pb-20">

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Central glow */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#818CF8]/[0.055] blur-[90px]" />
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        {/* Top shine */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-px bg-gradient-to-r from-transparent via-[#818CF8]/25 to-transparent" />
      </div>

      {/* ── Side context cards (desktop only — hidden on mobile to reduce noise) ── */}
      {/* Left: Critical topic card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-[3%] top-[22%] hidden xl:flex flex-col gap-2 glass rounded-xl p-3.5 w-52 shadow-lg shadow-black/30 border border-[#818CF8]/20"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#818CF8]/15 border border-[#818CF8]/25 flex items-center justify-center">
            <Target className="w-3 h-3 text-[#818CF8]" />
          </div>
          <span className="text-caption text-[#818CF8] font-medium">★★★ CRITICAL</span>
        </div>
        <p className="text-body-sm text-[#F0EFE8] font-medium leading-snug">Contract Formation</p>
        <p className="text-caption text-[#9E9C96]">~2.5 hours · 4/5 years PYQ</p>
      </motion.div>

      {/* Right: Prediction card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-[3%] top-[22%] hidden xl:flex flex-col gap-2 glass rounded-xl p-3.5 w-52 shadow-lg shadow-black/30 border border-[#818CF8]/20"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#818CF8]/15 border border-[#818CF8]/25 flex items-center justify-center">
            <CheckCircle className="w-3 h-3 text-[#818CF8]" />
          </div>
          <span className="text-caption text-[#818CF8] font-medium">HIGH PROBABILITY</span>
        </div>
        <p className="text-body-sm text-[#F0EFE8] font-medium leading-snug">Predicted Question</p>
        <p className="text-caption text-[#9E9C96]">Appeared 2021 · 2022 · 2023</p>
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#818CF8]/25 bg-[#818CF8]/8 mb-7"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#818CF8] animate-pulse" />
          <span className="text-caption text-[#818CF8] font-medium tracking-wide">
            AI exam intelligence · used by 47K+ students
          </span>
        </motion.div>

        {/* Headline — calm and factual, not hyped */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="font-medium leading-[1.08] tracking-[-0.03em] text-[#F0EFE8] mb-5"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 3.75rem)' }}
        >
          Your Last-Minute{' '}
          <span
            className="inline-block pb-2"
            style={{
              background: 'linear-gradient(135deg, #818CF8 0%, #a5b4fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Exam Co-Pilot
          </span>
        </motion.h1>

        {/* Subheadline — speaks directly to the fear */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#9E9C96] mb-9 mx-auto leading-relaxed max-w-xl"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)' }}
        >
          The AI-powered exam survival operating system. Get{' '}
          <span className="text-[#F0EFE8]">intelligent prioritization</span>,{' '}
          <span className="text-[#F0EFE8]">professor-aware strategies</span>, and{' '}
          <span className="text-[#F0EFE8]">emergency workflows</span> to find calm during panic.
        </motion.p>

        {/* ── Quick-start form — the core conversion element ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="glass-elevated rounded-2xl border border-white/10 p-4 sm:p-5 shadow-2xl shadow-black/40 mb-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Subject input */}
              <div className="relative flex-1">
                <input
                  type="text"
                  value={subject}
                  onChange={e => { setSubject(e.target.value); setShowSubjects(true) }}
                  onFocus={() => setShowSubjects(true)}
                  onBlur={() => setTimeout(() => setShowSubjects(false), 150)}
                  placeholder="What subject? e.g. Corporate Law"
                  className="w-full h-12 px-4 rounded-xl bg-[#161615] border border-white/10 text-[#F0EFE8] text-body-sm placeholder:text-[#706E67] outline-none focus:border-[#818CF8]/50 focus:ring-1 focus:ring-[#818CF8]/20 transition-all duration-150"
                  aria-label="Subject name"
                  autoComplete="off"
                />
                {/* Subject suggestions */}
                {showSubjects && subject.length > 0 && filteredSubjects.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 glass rounded-xl border border-white/10 overflow-hidden z-20 shadow-xl shadow-black/30">
                    {filteredSubjects.slice(0, 4).map(s => (
                      <button
                        key={s}
                        onMouseDown={() => { setSubject(s); setShowSubjects(false) }}
                        className="w-full px-4 py-2.5 text-left text-body-sm text-[#9E9C96] hover:bg-white/5 hover:text-[#F0EFE8] transition-colors border-b border-white/[0.04] last:border-0"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Hours input */}
              <div className="relative sm:w-40 shrink-0">
                <input
                  type="number"
                  value={hours}
                  onChange={e => setHours(e.target.value)}
                  placeholder="Hours left"
                  min={1}
                  max={168}
                  className="w-full h-12 px-4 rounded-xl bg-[#161615] border border-white/10 text-[#F0EFE8] text-body-sm placeholder:text-[#706E67] outline-none focus:border-[#818CF8]/50 focus:ring-1 focus:ring-[#818CF8]/20 transition-all duration-150 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  aria-label="Hours remaining before exam"
                />
              </div>

              {/* CTA button */}
              <Link
                href={
                  isReady
                    ? `/session/new?subject=${encodeURIComponent(subject)}&hours=${hours}`
                    : '/session/new'
                }
                className={cn(
                  'h-12 px-5 rounded-xl font-medium text-body-sm inline-flex items-center justify-center gap-2 shrink-0 transition-all duration-150 sm:whitespace-nowrap',
                  isReady
                    ? 'bg-[#818CF8] text-[#111110] hover:bg-[#818CF8]/90 shadow-lg shadow-[#818CF8]/25'
                    : 'bg-[#818CF8]/80 text-[#111110] hover:bg-[#818CF8]/90'
                )}
              >
                Build My Plan
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Inline AI feedback — only shows when form has data */}
            {timeMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.2 }}
                className="mt-3 pt-3 border-t border-white/[0.06] flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] shrink-0" />
                <p className="text-caption text-[#9E9C96]">{timeMessage}</p>
              </motion.div>
            )}
          </div>

          {/* Reassurance line — single most important trust-builder */}
          <p className="text-caption text-[#706E67]">
            No account required · Free forever · Works on your phone
          </p>
        </motion.div>

        {/* ── Calm stats strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.42, duration: 0.5 }}
          className="mt-10 flex items-center justify-center gap-6 sm:gap-10"
        >
          {CALM_STATS.map(({ value, label, icon: Icon }, i) => (
            <div key={i} className="flex flex-col items-center gap-1 text-center">
              <div className="flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5 text-[#818CF8]" />
                <span className="text-h2 text-[#F0EFE8] font-medium tabular-nums">{value}</span>
              </div>
              <span className="text-caption text-[#706E67]">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* ── App preview card ── */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.55, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 relative mx-auto"
          aria-hidden="true"
        >
          {/* Glow */}
          <div className="absolute -inset-6 bg-[#818CF8]/[0.05] blur-3xl rounded-3xl pointer-events-none" />

          <div className="relative glass-elevated rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/40 text-left">
            {/* Mac-style title bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.05] bg-[#1a1a18]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
              </div>
              <p className="text-caption text-[#706E67] flex-1 text-center">
                Corporate Law · 18 hours · Emergency plan ready
              </p>
            </div>

            {/* Content: 3 topic cards + skip callout */}
            <div className="p-4 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3.5">
                {[
                  { label: 'CRITICAL', name: 'Contract Formation', time: '~2.5h · cover first', bar: 'bg-[#818CF8]', bg: 'bg-[#818CF8]/[0.04] border-[#818CF8]/20' },
                  { label: 'CRITICAL', name: 'Breach & Remedies', time: '~2h · cover second', bar: 'bg-[#818CF8]', bg: 'bg-[#818CF8]/[0.04] border-[#818CF8]/20' },
                  { label: 'SKIP', name: 'Historical Dev.', time: 'safe to skip', bar: 'bg-transparent', bg: 'bg-transparent border-white/[0.05] opacity-45' },
                ].map((item, i) => (
                  <div key={i} className={cn('relative rounded-xl border pl-4 pr-3 py-3 overflow-hidden', item.bg)}>
                    <div className={cn('absolute left-0 top-0 bottom-0 w-[3px]', item.bar)} />
                    <p className="text-caption text-[#818CF8] mb-1">{item.label}</p>
                    <p className="text-body-sm text-[#F0EFE8] font-medium leading-snug">{item.name}</p>
                    <p className="text-caption text-[#9E9C96] mt-0.5">{item.time}</p>
                  </div>
                ))}
              </div>

              {/* Achievability message — the most calming element */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#4ADE80]/[0.06] border border-[#4ADE80]/15">
                <CheckCircle className="w-4 h-4 text-[#4ADE80] shrink-0" />
                <p className="text-body-sm text-[#9E9C96]">
                  <span className="text-[#4ADE80] font-medium">This plan is achievable.</span>{' '}
                  You have 18 hours and 3 critical topics — 6 hours each. 4 topics safely skipped.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom page fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#111110] to-transparent pointer-events-none" />
    </section>
  )
}
