'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowRight, RotateCcw, Clock, Shield, BookOpen, Flame } from 'lucide-react'
import { useSessionStore } from '@/store/session.store'
import { cn } from '@/lib/utils'

export function PreviousSessionBanner() {
  const router = useRouter()
  const session = useSessionStore((s) => s.session)
  const completedBlocks = useSessionStore((s) => s.completedBlocks)
  const archiveSession = useSessionStore((s) => s.archiveSession)

  if (!session || !session.strategy) return null

  const { strategy } = session
  const totalBlocks = strategy.timeline?.length || 0
  const progressPercent = totalBlocks > 0 ? Math.round((completedBlocks.length / totalBlocks) * 100) : 0
  const isEmergency = session.hoursRemaining <= 12

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 p-1 rounded-2xl bg-gradient-to-r from-[rgba(129,140,248,0.15)] to-[rgba(74,222,128,0.05)]"
    >
      <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(28,28,26,0.9)] p-5 lg:p-6 flex flex-col lg:flex-row items-center gap-6">
        
        {/* Left Side: Summary Info */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-[700] uppercase tracking-[0.08em] px-2 py-0.5 rounded-full bg-[rgba(129,140,248,0.1)] text-[#818CF8] border border-[rgba(129,140,248,0.2)]">
              Archived Strategy
            </span>
            <p className="text-[12px] text-[#706E67]">
              Generated {session.createdAt ? new Date(session.createdAt).toLocaleDateString() : 'recently'}
            </p>
          </div>

          <h2 className="text-[20px] font-[600] text-[#F0EFE8] mb-4">
            {session.subject} Exam Recovery Plan
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#706E67] flex items-center gap-1"><Shield className="w-3 h-3"/> Survivability</span>
              <span className="text-[14px] font-[600] text-[#4ADE80]">{strategy.scores?.survivabilityScore ?? '--'}/100</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#706E67] flex items-center gap-1"><BookOpen className="w-3 h-3"/> Professor</span>
              <span className="text-[14px] font-[600] text-[#F0EFE8] truncate">{session.professorArchetype || 'Unknown'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#706E67] flex items-center gap-1"><Clock className="w-3 h-3"/> Progress</span>
              <span className="text-[14px] font-[600] text-[#818CF8]">{progressPercent}% ({completedBlocks.length}/{totalBlocks})</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#706E67] flex items-center gap-1"><Flame className="w-3 h-3"/> Intensity</span>
              <span className={cn('text-[14px] font-[600]', isEmergency ? 'text-[#FBBF24]' : 'text-[#4ADE80]')}>
                {isEmergency ? 'High' : 'Moderate'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: CTAs */}
        <div className="flex flex-col w-full lg:w-auto gap-3 shrink-0">
          <button
            onClick={() => router.push(`/session/${session.id}/strategy`)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#818CF8] text-[#111110] text-[13px] font-[600] hover:bg-[#a5b4fc] transition-colors whitespace-nowrap shadow-[0_0_20px_rgba(129,140,248,0.2)]"
          >
            Continue Revision Mode <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => archiveSession()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#9E9C96] text-[13px] font-[500] hover:bg-[rgba(255,255,255,0.08)] hover:text-[#F0EFE8] transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-4 h-4" /> Generate New Strategy
          </button>
        </div>

      </div>
    </motion.div>
  )
}
