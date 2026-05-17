'use client'
// ============================================================
// CramPilot — Premium Exam Survival Roadmap Timeline
// Mobile-first, interactive, animated study timeline
// ============================================================

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { CheckCircle, ExternalLink, ChevronDown, ChevronUp, Clock, Flame, AlertTriangle, BookOpen, Copy, Check, Brain, Zap, RotateCcw, Lightbulb, ClipboardList, Headphones, Coffee, Moon } from 'lucide-react'
import { toast } from 'sonner'
import { cn, copyToClipboard } from '@/lib/utils'
import {
  TOOL_META, METHOD_META, URGENCY_META,
  PHASE_LEGEND,
  type TimelineBlock,
} from '@/data/timeline.data'
import { useSessionStore } from '@/store/session.store'

// ─────────────────────────────────────────────
// TYPE NODE ICON
// ─────────────────────────────────────────────
function BlockIcon({ block }: { block: TimelineBlock }) {
  const size = 'w-4 h-4'
  if (block.type === 'break')  return <Coffee   className={cn(size, 'text-[#4ADE80]')} />
  if (block.type === 'sleep')  return <Moon     className={cn(size, 'text-[#3B82F6]')} />
  if (block.type === 'exam')   return <ClipboardList className={cn(size, 'text-[#F87171]')} />
  if (!block.method)           return <BookOpen className={cn(size, 'text-[#818CF8]')} />
  const icons: Record<string, React.ReactNode> = {
    'deep-learn': <Brain      className={cn(size, 'text-[#818CF8]')} />,
    'practice':   <Zap        className={cn(size, 'text-[#FBBF24]')} />,
    'revise':     <RotateCcw  className={cn(size, 'text-[#4ADE80]')} />,
    'recall':     <Lightbulb  className={cn(size, 'text-[#F97316]')} />,
    'simulate':   <ClipboardList className={cn(size, 'text-[#F87171]')} />,
    'audio':      <Headphones className={cn(size, 'text-[#8B5CF6]')} />,
  }
  return <>{icons[block.method] ?? <BookOpen className={cn(size)} />}</>
}

// ─────────────────────────────────────────────
// NODE COLOR
// ─────────────────────────────────────────────
function getNodeColors(block: TimelineBlock) {
  if (block.type === 'exam')   return { border: '#F87171', bg: 'rgba(248,113,113,0.12)' }
  if (block.type === 'sleep')  return { border: '#3B82F6', bg: 'rgba(59,130,246,0.1)'  }
  if (block.type === 'break')  return { border: '#4ADE80', bg: 'rgba(74,222,128,0.08)' }
  const urgency = URGENCY_META[block.urgency]
  return { border: urgency.color, bg: urgency.bg }
}

// ─────────────────────────────────────────────
// SINGLE BLOCK CARD
// ─────────────────────────────────────────────
function TimelineCard({ block, index }: { block: TimelineBlock; index: number }) {
  const [expanded, setExpanded]   = useState(false)
  const [copied, setCopied]       = useState(false)
  const ref                        = useRef<HTMLDivElement>(null)
  const inView                     = useInView(ref, { once: true, margin: '-60px' })

  const done = useSessionStore((s) => s.completedBlocks.includes(block.id))
  const toggleBlock = useSessionStore((s) => s.toggleBlock)

  const { border, bg } = getNodeColors(block)
  const urgency         = URGENCY_META[block.urgency]
  const tool            = block.tool ? TOOL_META[block.tool] : null
  const method          = block.method ? METHOD_META[block.method] : null

  const isSpecial = block.type !== 'study'

  async function handleCopy() {
    if (!block.promptHint) return
    const ok = await copyToClipboard(block.promptHint)
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 1500) }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className={cn('relative flex gap-3 sm:gap-4', block.type === 'exam' && 'mt-2')}
    >
      {/* ── Timeline node ── */}
      <div className="relative flex flex-col items-center shrink-0" style={{ width: 40 }}>
        <motion.div
          animate={done ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.3 }}
          className={cn(
            'w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 shrink-0 transition-all duration-300',
            done && 'border-[#4ADE80] bg-[rgba(74,222,128,0.12)]'
          )}
          style={!done ? { borderColor: border, background: bg } : {}}
        >
          {done ? <CheckCircle className="w-4 h-4 text-[#4ADE80]" /> : <BlockIcon block={block} />}
        </motion.div>
      </div>

      {/* ── Card ── */}
      <div className={cn(
        'flex-1 mb-3 rounded-2xl border overflow-hidden transition-all duration-200',
        done
          ? 'border-[rgba(74,222,128,0.2)] bg-[rgba(74,222,128,0.04)] opacity-75'
          : block.type === 'exam'
          ? 'border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.06)]'
          : block.type === 'sleep'
          ? 'border-[rgba(59,130,246,0.2)] bg-[rgba(59,130,246,0.04)]'
          : block.type === 'break'
          ? 'border-[rgba(255,255,255,0.07)] bg-[rgba(28,28,26,0.5)]'
          : 'border-[rgba(255,255,255,0.08)] bg-[rgba(28,28,26,0.85)] hover:border-[rgba(255,255,255,0.14)]'
      )}>

        {/* Top accent stripe */}
        {block.type === 'study' && (
          <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${border}, transparent)` }} />
        )}

        <div className="p-4">
          {/* ── Row 1: time + badges ── */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[12px] font-[700] text-[#F0EFE8] tabular-nums">
              {block.startTime} – {block.endTime}
            </span>

            <span className="text-[11px] text-[#706E67] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {block.durationMin >= 60
                ? `${(block.durationMin / 60).toFixed(1).replace('.0', '')}h`
                : `${block.durationMin}m`}
            </span>

            {/* Urgency badge — study only */}
            {block.type === 'study' && (
              <span
                className="text-[10px] font-[700] px-2 py-0.5 rounded-full tracking-wider"
                style={{ color: urgency.color, background: urgency.bg, border: `1px solid ${urgency.color}30` }}
              >
                {urgency.label}
              </span>
            )}

            {/* Weak area flag */}
            {block.isWeak && (
              <span className="flex items-center gap-1 text-[10px] font-[700] text-[#F87171] bg-[rgba(248,113,113,0.1)] border border-[rgba(248,113,113,0.25)] px-2 py-0.5 rounded-full">
                <AlertTriangle className="w-2.5 h-2.5" /> WEAK
              </span>
            )}

            {/* PYQ frequency */}
            {block.pyqFrequency !== undefined && block.pyqFrequency > 0 && (
              <span className="ml-auto text-[10px] text-[#FBBF24] flex items-center gap-0.5 font-[600]">
                <Flame className="w-3 h-3" />
                {block.pyqFrequency}× PYQ
              </span>
            )}
          </div>

          {/* ── Row 2: topic label ── */}
          <h3 className={cn(
            'text-[15px] font-[500] leading-snug mb-1.5',
            done ? 'text-[#706E67] line-through' : 'text-[#F0EFE8]',
            block.type === 'exam' && 'text-[#F87171] text-[17px]',
            block.type === 'sleep' && 'text-[#3B82F6]',
          )}>
            {block.label}
          </h3>

          {/* ── Row 3: topic description ── */}
          <p className="text-[13px] text-[#9E9C96] mb-3">{block.topic}</p>

          {/* ── Tool + Method pills ── */}
          {(tool || method) && (
            <div className="flex flex-wrap gap-2 mb-3">
              {method && (
                <span
                  className="inline-flex items-center gap-1.5 text-[11px] font-[600] px-2.5 py-1 rounded-lg"
                  style={{ color: method.color, background: `${method.color}12`, border: `1px solid ${method.color}25` }}
                >
                  <span>{method.icon}</span>{method.label}
                </span>
              )}
              {tool && (
                <a
                  href={tool.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-[600] px-2.5 py-1 rounded-lg transition-opacity hover:opacity-80"
                  style={{ color: tool.color, background: tool.bg, border: `1px solid ${tool.color}30` }}
                >
                  {tool.emoji} {tool.label}
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          )}

          {/* ── Expand toggle ── */}
          {(block.subtopics?.length || block.revisionStrategy || block.promptHint) && (
            <button
              onClick={() => setExpanded(e => !e)}
              className="flex items-center gap-1 text-[12px] text-[#706E67] hover:text-[#9E9C96] transition-colors"
            >
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              {expanded ? 'Less detail' : 'See details'}
            </button>
          )}

          {/* ── Expanded detail ── */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-3 space-y-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">

                  {/* Subtopics */}
                  {block.subtopics && block.subtopics.length > 0 && (
                    <div>
                      <p className="text-[10px] font-[700] uppercase tracking-wider text-[#706E67] mb-2">Cover</p>
                      <div className="flex flex-wrap gap-1.5">
                        {block.subtopics.map(s => (
                          <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-[rgba(255,255,255,0.04)] text-[#9E9C96] border border-[rgba(255,255,255,0.08)]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Revision strategy */}
                  {block.revisionStrategy && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-[rgba(129,140,248,0.06)] border border-[rgba(129,140,248,0.15)]">
                      <Lightbulb className="w-3.5 h-3.5 text-[#818CF8] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-[700] text-[#818CF8] uppercase tracking-wider mb-1">Revision Strategy</p>
                        <p className="text-[12px] text-[#9E9C96] leading-[1.6]">{block.revisionStrategy}</p>
                      </div>
                    </div>
                  )}

                  {/* Prompt hint + copy */}
                  {block.promptHint && tool && (
                    <div className="flex items-start gap-2 p-3 rounded-xl border"
                      style={{ background: tool.bg, borderColor: `${tool.color}25` }}>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-[700] uppercase tracking-wider mb-1" style={{ color: tool.color }}>
                          {tool.label} Prompt Hint
                        </p>
                        <p className="text-[12px] text-[#9E9C96] leading-[1.5] font-mono">{block.promptHint}</p>
                      </div>
                      <button
                        onClick={handleCopy}
                        className="shrink-0 p-1.5 rounded-lg transition-colors"
                        style={{ background: `${tool.color}20`, color: tool.color }}
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

            {/* Done toggle */}
            {block.type !== 'exam' && (
              <button
                onClick={() => {
                  toggleBlock(block.id)
                  if (!done) {
                    if (block.urgency === 'critical') toast.success('Critical revision completed 🎯')
                    else if (block.method === 'practice') toast.success('Problem practice secured ⚡')
                    else toast.success('High ROI topic secured ✅')
                  }
                }}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all mt-3',
                  done
                    ? 'border-[#4ADE80] bg-[rgba(74,222,128,0.15)] text-[#4ADE80]'
                    : 'border-[rgba(255,255,255,0.08)] bg-transparent hover:bg-[rgba(255,255,255,0.04)] text-[#9E9C96]'
                )}
              >
                {done ? <Check className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-sm border border-current opacity-60" />}
                <span className="text-[11px] font-[600] tracking-wide">{done ? 'DONE' : 'MARK DONE'}</span>
              </button>
            )}
        </div>

        {/* ── Checkpoint banner ── */}
        {block.isCheckpoint && (
          <div className="px-4 py-2 bg-[rgba(129,140,248,0.08)] border-t border-[rgba(129,140,248,0.15)] flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-[#818CF8] shrink-0" />
            <p className="text-[11px] font-[700] text-[#818CF8] uppercase tracking-wider">{block.checkpointLabel}</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// TIMELINE CONNECTOR LINE
// ─────────────────────────────────────────────
function ConnectorLine({ color }: { color: string }) {
  return (
    <div
      className="absolute left-[19px] top-0 bottom-0 w-px z-0"
      style={{ background: `linear-gradient(to bottom, ${color}60, ${color}20, transparent)` }}
    />
  )
}

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────
export function ExamRoadmapTimeline() {
  const [showAll, setShowAll] = useState(false)
  const session = useSessionStore(s => s.session)
  if (!session || !session.strategy) return null
  const strategy = session.strategy

  const timelineBlocks = strategy.timeline as TimelineBlock[]

  const PREVIEW_COUNT = 6
  const visible = showAll ? timelineBlocks : timelineBlocks.slice(0, PREVIEW_COUNT)

  // Compute stats
  const studyMins = timelineBlocks.filter(b => b.type === 'study').reduce((a, b) => a + b.durationMin, 0)
  const breakMins = timelineBlocks.filter(b => b.type === 'break').reduce((a, b) => a + b.durationMin, 0)
  const sleepMins = timelineBlocks.filter(b => b.type === 'sleep').reduce((a, b) => a + b.durationMin, 0)

  const stats = [
    { label: 'Study',  value: `${(studyMins / 60).toFixed(1)}h`,  color: '#818CF8' },
    { label: 'Sleep',  value: `${(sleepMins / 60).toFixed(1)}h`,  color: '#3B82F6' },
    { label: 'Breaks', value: `${(breakMins / 60).toFixed(1)}h`,  color: '#4ADE80' },
  ]

  return (
    <div className="max-w-2xl mx-auto w-full px-4 sm:px-0 py-6">

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full blur-[120px] bg-[rgba(129,140,248,0.04)]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[300px] h-[300px] rounded-full blur-[100px] bg-[rgba(248,113,113,0.03)]" />
      </div>

      <div className="mb-6">
        {/* Title row */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-[10px] font-[700] uppercase tracking-[0.1em] text-[#FBBF24] mb-1">
              Execution Plan · {session.hoursRemaining}h Window
            </p>
            <h2 className="text-[22px] sm:text-[26px] font-[500] text-[#F0EFE8] tracking-tight leading-tight">
              Exam Survival Roadmap
            </h2>
            <p className="text-[13px] text-[#9E9C96] mt-1">
              {session.subject}
            </p>
          </div>

          {/* Urgency pulse */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[rgba(251,191,36,0.3)] bg-[rgba(251,191,36,0.06)]">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-[#FBBF24]"
            />
            <p className="text-[12px] font-[700] text-[#FBBF24]">
              {strategy.scores.emergencyLevel === 'critical' ? 'CRITICAL MODE' : 'LIVE PLAN'}
            </p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {stats.map(s => (
            <div key={s.label} className="text-center p-2.5 rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(28,28,26,0.7)]">
              <p className="text-[16px] font-[700]" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] text-[#706E67] uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Phase legend */}
        <div className="flex flex-wrap gap-2">
          {PHASE_LEGEND.map(p => {
            // Count dynamically
            const count = p.label === 'Deep Learning' ? timelineBlocks.filter(b => b.method === 'deep-learn').length
              : p.label === 'Practice' ? timelineBlocks.filter(b => b.method === 'practice').length
              : p.label === 'Revision' ? timelineBlocks.filter(b => b.method === 'revise').length
              : timelineBlocks.filter(b => b.method === 'audio').length

            return (
              <span key={p.label}
                className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border"
                style={{ color: p.color, background: `${p.color}10`, borderColor: `${p.color}25` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
                {p.label} ×{count}
              </span>
            )
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <ConnectorLine color="#818CF8" />

        <div className="space-y-0">
          {visible.map((block, i) => (
            <TimelineCard key={block.id} block={block} index={i} />
          ))}
        </div>
      </div>

      {/* Show more */}
      {!showAll && timelineBlocks.length > PREVIEW_COUNT && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowAll(true)}
          className="mt-2 w-full py-3.5 rounded-2xl border border-[rgba(255,255,255,0.09)] text-[13px] text-[#9E9C96] hover:text-[#F0EFE8] hover:border-[rgba(255,255,255,0.16)] transition-all flex items-center justify-center gap-2"
        >
          <ChevronDown className="w-4 h-4" />
          Show {timelineBlocks.length - PREVIEW_COUNT} more blocks
        </motion.button>
      )}

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between text-[11px] text-[#706E67]">
        <span>{timelineBlocks.length} time blocks · {timelineBlocks.filter(b => b.isCheckpoint).length} checkpoints</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
          AI Generated
        </span>
      </div>
    </div>
  )
}
