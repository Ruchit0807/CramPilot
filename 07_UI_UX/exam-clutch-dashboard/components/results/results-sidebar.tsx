'use client'
// ============================================================
// Results — Sticky Right Sidebar
// Confidence meter · Survivability · Quick stats
// ============================================================

import { motion } from 'framer-motion'
import { Shield, TrendingUp, Clock, Flame, CheckCircle } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { useSessionStore } from '@/store/session.store'

function CircleGauge({ value, color, size = 80 }: { value: number; color: string; size?: number }) {
  const r = (size - 10) / 2
  const circ = 2 * Math.PI * r
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
      <motion.circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
        strokeWidth="5" strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ * (1 - value / 100) }}
        transition={{ duration: 1, ease: [0.16,1,0.3,1], delay: 0.2 }}
        transform={`rotate(-90 ${size/2} ${size/2})`} />
    </svg>
  )
}

export function ResultsSidebar() {
  const session = useSessionStore((s) => s.session)
  const strategy = session?.strategy

  if (!session || !strategy) return null

  const level = strategy.scores.emergencyLevel
  const urgColor = level === 'critical' ? '#F87171' : level === 'emergency' ? '#FBBF24' : '#4ADE80'

  const criticalDone  = strategy.topics.filter(t => t.priority === 'critical').length
  const skipCount     = strategy.topics.filter(t => t.priority === 'skip').length

  const isEmergency = session.hoursRemaining <= 12

  return (
    <motion.aside
      variants={staggerContainer} initial="initial" animate="animate"
      className="space-y-3 lg:sticky lg:top-6">

      {/* Survivability score */}
      <motion.div variants={staggerItem}
        className="rounded-2xl border p-5 text-center"
        style={{ borderColor: `${urgColor}30`, background: `${urgColor}06` }}>
        <p className="text-[10px] font-[700] uppercase tracking-[0.1em] text-[#9E9C96] mb-3">Survivability Score</p>
        <div className="relative inline-block mb-2">
          <CircleGauge value={strategy.scores.survivabilityScore} color={urgColor} size={96} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div>
              <p className="text-[24px] font-[700] leading-none" style={{ color: urgColor }}>
                {strategy.scores.survivabilityScore}
              </p>
              <p className="text-[11px] text-[#706E67]">/ 100</p>
            </div>
          </div>
        </div>
        <p className="text-[12px] text-[#9E9C96]">Achievable with this plan</p>
        <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">
          <p className="text-[11px] text-[#706E67]">Estimated grade range</p>
          <p className="text-[16px] font-[600]" style={{ color: urgColor }}>{strategy.scores.estimatedMarks}</p>
        </div>
      </motion.div>

      {/* Emotional Intelligence */}
      <motion.div variants={staggerItem}
        className="rounded-2xl border border-[rgba(255,255,255,0.08)] p-4 bg-[rgba(28,28,26,0.85)]">
        <p className="text-[10px] font-[700] uppercase tracking-[0.08em] text-[#706E67] mb-3">Emotional Intelligence</p>
        <div className="space-y-2.5">
          {[
            { label: 'Recovery Chance', value: strategy.scores.recoveryChance, color: strategy.scores.recoveryChance === 'High' ? '#4ADE80' : strategy.scores.recoveryChance === 'Moderate' ? '#FBBF24' : '#F87171' },
            { label: 'Exam Risk Level', value: strategy.scores.examRiskLevel, color: strategy.scores.examRiskLevel === 'Recoverable' ? '#4ADE80' : strategy.scores.examRiskLevel === 'High Risk' ? '#FBBF24' : '#F87171' },
            { label: 'Confidence Status', value: strategy.scores.confidenceStatus, color: strategy.scores.confidenceStatus === 'Confident' ? '#4ADE80' : strategy.scores.confidenceStatus === 'Anxious' ? '#FBBF24' : '#F87171' },
          ].map(s => (
            <div key={s.label} className="flex items-center justify-between">
              <p className="text-[12px] text-[#9E9C96]">{s.label}</p>
              <p className="text-[12px] font-[600]" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Confidence meter */}
      <motion.div variants={staggerItem}
        className="rounded-2xl border border-[rgba(129,140,248,0.2)] p-4 bg-[rgba(28,28,26,0.85)]">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-[#818CF8]" />
          <p className="text-[12px] font-[600] text-[#F0EFE8]">AI Confidence</p>
          <p className="ml-auto text-[14px] font-[700] text-[#818CF8]">{strategy.scores.aiConfidence}%</p>
        </div>
        <div className="h-2 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden mb-2">
          <motion.div initial={{ width:0 }} animate={{ width: `${strategy.scores.aiConfidence}%` }}
            transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
            className="h-full rounded-full bg-gradient-to-r from-[#818CF8] to-[#a5b4fc]" />
        </div>
        <p className="text-[11px] text-[#706E67]">Based on your inputs + PYQ pattern match</p>
      </motion.div>

      {/* Study intensity */}
      <motion.div variants={staggerItem}
        className="rounded-2xl border border-[rgba(255,255,255,0.08)] p-4 bg-[rgba(28,28,26,0.85)]">
        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-4 h-4 text-[#FBBF24]" />
          <p className="text-[12px] font-[600] text-[#F0EFE8]">Study Intensity</p>
        </div>
        <div className="flex gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div key={i}
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              className="flex-1 h-8 rounded-sm origin-bottom"
              style={{ background: isEmergency && i < 4 ? '#FBBF24' : !isEmergency && i < 3 ? '#4ADE80' : 'rgba(255,255,255,0.06)', opacity: i < 4 ? 1 - i * 0.15 : 1 }} />
          ))}
        </div>
        <p className="text-[12px] font-[600]" style={{ color: isEmergency ? '#FBBF24' : '#4ADE80' }}>
          {isEmergency ? 'HIGH' : 'MODERATE'} — {session.hoursRemaining}h exam window
        </p>
        <p className="text-[11px] text-[#706E67] mt-0.5">
          {Math.floor(session.hoursRemaining * 0.5)}h study · {Math.floor(session.hoursRemaining * 0.3)}h sleep
        </p>
      </motion.div>

      {/* Quick stats */}
      <motion.div variants={staggerItem}
        className="rounded-2xl border border-[rgba(255,255,255,0.08)] p-4 bg-[rgba(28,28,26,0.85)]">
        <p className="text-[10px] font-[700] uppercase tracking-[0.08em] text-[#706E67] mb-3">Session Stats</p>
        <div className="space-y-2.5">
          {[
            { label: 'Critical topics',   value: `${criticalDone}`,  color: '#F87171', icon: '🔴' },
            { label: 'Topics to skip',    value: `${skipCount}`,     color: '#706E67', icon: '⏭️' },
            { label: 'Hours available',   value: `${session.hoursRemaining}h`, color: '#FBBF24', icon: '⏰' },
            { label: 'Prompts generated', value: `${strategy.prompts.length}`, color: '#818CF8', icon: '✨' },
            { label: 'AI tools used',     value: `${strategy.workflows.length}`, color: '#4ADE80', icon: '🤖' },
          ].map(s => (
            <div key={s.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[14px]">{s.icon}</span>
                <p className="text-[12px] text-[#9E9C96]">{s.label}</p>
              </div>
              <p className="text-[13px] font-[600]" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Coverage bar */}
      <motion.div variants={staggerItem}
        className="rounded-2xl border border-[rgba(74,222,128,0.2)] p-4 bg-[rgba(74,222,128,0.04)]">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-[#4ADE80]" />
          <p className="text-[12px] font-[600] text-[#F0EFE8]">Exam Coverage</p>
          <p className="ml-auto text-[14px] font-[700] text-[#4ADE80]">{strategy.scores.coveragePercent}%</p>
        </div>
        <div className="h-2 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden mb-2">
          <motion.div initial={{ width:0 }} animate={{ width: `${strategy.scores.coveragePercent}%` }}
            transition={{ duration: 1, ease: [0.16,1,0.3,1] }}
            className="h-full rounded-full bg-gradient-to-r from-[#4ADE80] to-[#86efac]" />
        </div>
        <p className="text-[11px] text-[#706E67]">
          This plan covers ~{strategy.scores.coveragePercent}% of expected exam content
        </p>
      </motion.div>

      {/* Action CTA */}
      <motion.div variants={staggerItem}>
        <a href="https://claude.ai" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-[14px] font-[600] text-[#111110] transition-all hover:opacity-90 active:scale-98"
          style={{ background: 'linear-gradient(135deg, #818CF8, #a5b4fc)' }}>
          <CheckCircle className="w-4 h-4" />
          Start with Claude Now
        </a>
        <p className="text-center text-[11px] text-[#706E67] mt-2">
          Open Phase 1 prompt in Claude
        </p>
      </motion.div>
    </motion.aside>
  )
}
