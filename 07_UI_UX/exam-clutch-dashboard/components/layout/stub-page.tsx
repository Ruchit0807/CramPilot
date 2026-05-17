'use client'
// ============================================================
// CramPilot — Premium Stub Page
// Shared component for routes that require a generated session
// Shows an intentional "start here" state, never feels unfinished
// ============================================================

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowRight, Sparkles, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSessionStore } from '@/store/session.store'

interface StubPageProps {
  icon: React.ReactNode
  title: string
  description: string
  accentColor?: string
  accentBg?: string
  badge?: string
  features?: string[]
  /** If true, shows "coming soon" even with a session */
  comingSoon?: boolean
}

const stagger: Variants = {
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}
const item: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
}

export function StubPage({
  icon,
  title,
  description,
  accentColor = '#818CF8',
  accentBg = 'rgba(129,140,248,0.1)',
  badge,
  features = [],
  comingSoon = false,
}: StubPageProps) {
  const session = useSessionStore((s) => s.session)
  const hasSession = !!session

  return (
    <div className="min-h-[calc(100vh-3.5rem)] lg:min-h-screen bg-[#111110] flex items-center justify-center px-4 py-12">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute top-[10%] left-[5%] w-[400px] h-[300px] rounded-full blur-[120px] opacity-30"
          style={{ background: accentColor }}
        />
        <div className="absolute bottom-[15%] right-[5%] w-[300px] h-[250px] rounded-full blur-[100px] bg-[rgba(129,140,248,0.06)]" />
      </div>

      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="relative max-w-lg w-full text-center"
      >
        {/* Icon */}
        <motion.div variants={item} className="flex justify-center mb-6">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center border"
            style={{ background: accentBg, borderColor: `${accentColor}35`, color: accentColor }}
          >
            {icon}
          </div>
        </motion.div>

        {/* Badge */}
        {badge && (
          <motion.div variants={item} className="flex justify-center mb-3">
            <span
              className="text-[11px] font-[700] px-3 py-1 rounded-full uppercase tracking-wider"
              style={{ color: accentColor, background: accentBg, border: `1px solid ${accentColor}30` }}
            >
              {badge}
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1 variants={item} className="text-[28px] sm:text-[34px] font-[500] text-[#F0EFE8] tracking-tight mb-3">
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p variants={item} className="text-[15px] text-[#9E9C96] leading-[1.6] mb-8 max-w-sm mx-auto">
          {description}
        </motion.p>

        {/* Features list */}
        {features.length > 0 && (
          <motion.div variants={item} className="mb-8">
            <div className="inline-flex flex-col gap-2 text-left">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accentColor }} />
                  <span className="text-[13px] text-[#9E9C96]">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA block */}
        <motion.div variants={item}>
          {!hasSession ? (
            /* No session — soft prompt */
            <div className="p-5 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(28,28,26,0.8)] text-left">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[rgba(129,140,248,0.1)] border border-[rgba(129,140,248,0.25)] flex items-center justify-center shrink-0">
                  <Lock className="w-3.5 h-3.5 text-[#818CF8]" />
                </div>
                <div>
                  <p className="text-[13px] font-[500] text-[#F0EFE8] mb-0.5">Generate your strategy first</p>
                  <p className="text-[12px] text-[#9E9C96] leading-[1.5]">
                    This section is personalized to your exam, professor, and weak topics. Start on the Dashboard to unlock it.
                  </p>
                </div>
              </div>
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-2 w-full h-10 rounded-xl text-[13px] font-[600] text-[#111110] transition-all hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` }}
              >
                <Sparkles className="w-4 h-4" />
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : comingSoon ? (
            /* Has session, but page is coming soon */
            <div className="p-5 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(28,28,26,0.8)]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentColor }} />
                <p className="text-[12px] font-[600] uppercase tracking-wider" style={{ color: accentColor }}>
                  In development
                </p>
              </div>
              <p className="text-[13px] text-[#9E9C96] leading-[1.6] mb-4">
                This module is being built. Your session data is ready — it will populate automatically when this section launches.
              </p>
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-2 w-full h-10 rounded-xl text-[13px] font-[500] text-[#9E9C96] border border-[rgba(255,255,255,0.09)] hover:text-[#F0EFE8] hover:border-[rgba(255,255,255,0.15)] transition-colors"
              >
                Back to Dashboard
              </Link>
            </div>
          ) : (
            /* Has session, content available — link to strategy */
            <Link
              href={`/session/${session.id}/strategy`}
              className="flex items-center justify-center gap-2 w-full h-12 rounded-2xl text-[14px] font-[600] text-[#111110] transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` }}
            >
              <Sparkles className="w-4 h-4" />
              View Your Strategy
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </motion.div>

        {/* Bottom hint */}
        <motion.p variants={item} className="mt-6 text-[11px] text-[#706E67]">
          {hasSession
            ? `Active session: ${session.subject}`
            : 'Takes under 30 seconds to generate your personalized plan'}
        </motion.p>
      </motion.div>
    </div>
  )
}
