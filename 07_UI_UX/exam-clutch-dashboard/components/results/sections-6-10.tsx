'use client'
// ============================================================
// Results Page — Sections 6–10
// Prompt Cards · Revision Strategy · Flashcards
// Audio Revision · Hour-by-Hour Timeline
// ============================================================

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Copy, Check, ExternalLink, Headphones, RotateCcw,
  Mic, ChevronDown, ChevronUp, Clock, Coffee,
  Moon, ClipboardList, Sparkles, Zap, BookOpen,
} from 'lucide-react'
import { copyToClipboard, cn } from '@/lib/utils'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { useSessionStore } from '@/store/session.store'
import type { AITool } from '@/types'

// ── Shared ─────────────────────────────────────────────────
const TOOL_META: Record<AITool, { color: string; bg: string; url: string }> = {
  claude:     { color: '#F97316', bg: 'rgba(249,115,22,0.1)',  url: 'https://claude.ai' },
  notebooklm: { color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)', url: 'https://notebooklm.google.com' },
  chatgpt:    { color: '#10B981', bg: 'rgba(16,185,129,0.1)', url: 'https://chat.openai.com' },
  gemini:     { color: '#3B82F6', bg: 'rgba(59,130,246,0.1)', url: 'https://gemini.google.com' },
}

function SectionHeader({ eyebrow, title, icon: Icon, color = '#818CF8' }: {
  eyebrow: string; title: string; icon: React.ElementType; color?: string
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${color}15`, border: `1px solid ${color}28` }}>
        <Icon className="w-4.5 h-4.5" style={{ color }} />
      </div>
      <div>
        <p className="text-[10px] font-[700] uppercase tracking-[0.1em]" style={{ color }}>{eyebrow}</p>
        <h2 className="text-[17px] font-[500] text-[#F0EFE8] tracking-tight">{title}</h2>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// 6. PROMPT GENERATION CARDS
// ═══════════════════════════════════════════════════════════
function PromptCard({ prompt }: { prompt: any }) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const meta = TOOL_META[prompt.tool as AITool] || TOOL_META.claude

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(prompt.body)
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 1500) }
  }, [prompt.body])

  const preview = prompt.body ? prompt.body.slice(0, 180).trimEnd() + (prompt.body.length > 180 ? '...' : '') : ''

  return (
    <motion.div variants={staggerItem}
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(28,28,26,0.85)] overflow-hidden hover:border-[rgba(255,255,255,0.14)] hover:shadow-lg transition-all group">
      {/* Left accent bar */}
      <div className="flex">
        <div className="w-[3px] shrink-0 rounded-l-xl" style={{ background: meta.color }} />
        <div className="flex-1 p-4">
          {/* Header */}
          <div className="flex flex-wrap items-start gap-2 mb-3">
            <span className="text-[11px] font-[700] px-2 py-0.5 rounded-full"
              style={{ color: meta.color, background: meta.bg, border: `1px solid ${meta.color}30` }}>
              {prompt.toolLabel}
            </span>
            <span className="text-[11px] font-[600] px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.05)] text-[#9E9C96] border border-[rgba(255,255,255,0.09)]">
              {prompt.badge}
            </span>
            {prompt.isPro && (
              <span className="text-[10px] font-[700] px-2 py-0.5 rounded-full bg-[rgba(251,191,36,0.12)] text-[#FBBF24] border border-[rgba(251,191,36,0.25)]">
                PRO
              </span>
            )}
            <span className="ml-auto flex items-center gap-1 text-[11px] text-[#706E67]">
              <Clock className="w-3 h-3" />~{prompt.estimatedMinutes} min
            </span>
          </div>

          <h3 className="text-[14px] font-[500] text-[#F0EFE8] mb-1">{prompt.title}</h3>
          <p className="text-[12px] text-[#9E9C96] mb-3 leading-[1.5]">{prompt.purpose}</p>

          {/* Prompt body */}
          <div className="font-mono text-[12px] text-[#9E9C96] bg-[rgba(22,22,21,0.8)] rounded-lg p-3 border border-[rgba(255,255,255,0.06)] leading-[1.7] mb-3 whitespace-pre-wrap">
            {expanded ? prompt.body : preview}
          </div>

          {prompt.body.length > 180 && (
            <button onClick={() => setExpanded(e => !e)}
              className="flex items-center gap-1 text-[12px] text-[#706E67] hover:text-[#9E9C96] transition-colors mb-3">
              {expanded ? <><ChevronUp className="w-3 h-3" />Show less</> : <><ChevronDown className="w-3 h-3" />Show full prompt</>}
            </button>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button onClick={handleCopy}
              className={cn('flex-1 flex items-center justify-center gap-2 h-9 rounded-lg text-[13px] font-[500] border transition-all',
                copied ? 'border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.08)] text-[#4ADE80]'
                  : 'border-current hover:opacity-90')}
              style={!copied ? { color: meta.color, borderColor: `${meta.color}40`, background: meta.bg } : {}}>
              <AnimatePresence mode="wait">
                {copied
                  ? <motion.span key="c" initial={{ opacity:0,scale:0.8 }} animate={{ opacity:1,scale:1 }} className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" />Copied!</motion.span>
                  : <motion.span key="u" initial={{ opacity:0 }} animate={{ opacity:1 }} className="flex items-center gap-1.5"><Copy className="w-3.5 h-3.5" />Copy Prompt</motion.span>
                }
              </AnimatePresence>
            </button>
            <a href={meta.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 h-9 px-3 rounded-lg text-[13px] text-[#9E9C96] border border-[rgba(255,255,255,0.09)] hover:text-[#F0EFE8] hover:border-[rgba(255,255,255,0.15)] transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />Open {prompt.toolLabel}
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function PromptCardsSection() {
  const [showAll, setShowAll] = useState(false)
  const session = useSessionStore(s => s.session)
  if (!session || !session.strategy) return null
  const strategy = session.strategy

  const prompts = strategy.prompts || []
  const visible = showAll ? prompts : prompts.slice(0, 4)

  return (
    <motion.section variants={staggerItem}>
      <SectionHeader eyebrow="Ready-to-Use Prompts" title="Critical Revision Prompts" icon={Sparkles} color="#818CF8" />
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-3">
        {visible.map((p: any) => <PromptCard key={p.id} prompt={p} />)}
      </motion.div>
      {!showAll && prompts.length > 4 && (
        <button onClick={() => setShowAll(true)}
          className="mt-3 w-full py-3 rounded-xl border border-[rgba(255,255,255,0.08)] text-[13px] text-[#9E9C96] hover:text-[#F0EFE8] hover:border-[rgba(255,255,255,0.15)] transition-colors">
          Show {strategy.prompts.length - 4} more prompts
        </button>
      )}
    </motion.section>
  )
}

// ═══════════════════════════════════════════════════════════
// 7. REVISION STRATEGY
// ═══════════════════════════════════════════════════════════
export function RevisionStrategySection() {
  const session = useSessionStore(s => s.session)
  if (!session || !session.strategy) return null
  const strategy = session.strategy

  return (
    <motion.section variants={staggerItem}>
      <SectionHeader eyebrow="Study Science" title="Revision Strategy" icon={RotateCcw} color="#4ADE80" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(strategy.revisionStrategy || []).map((s: any, i: number) => (
          <motion.div key={s.id}
            initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
            transition={{ delay: i * 0.07 }}
            className="p-4 rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(28,28,26,0.8)] hover:border-[rgba(255,255,255,0.13)] transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[22px]">{s.icon}</span>
              <p className="text-[14px] font-[500]" style={{ color: s.color }}>{s.label}</p>
            </div>
            <p className="text-[13px] text-[#9E9C96] leading-[1.6]">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

// ═══════════════════════════════════════════════════════════
// 8. FLASHCARD WORKFLOW
// ═══════════════════════════════════════════════════════════
export function FlashcardSection() {
  const session = useSessionStore(s => s.session)
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  
  if (!session || !session.strategy) return null
  const strategy = session.strategy
  const cards = strategy.flashcards || []
  if (!cards || cards.length === 0) return null

  const card = cards[current]

  const next = () => { setFlipped(false); setTimeout(() => setCurrent(i => (i + 1) % cards.length), 150) }
  const prev = () => { setFlipped(false); setTimeout(() => setCurrent(i => (i - 1 + cards.length) % cards.length), 150) }

  return (
    <motion.section variants={staggerItem}>
      <SectionHeader eyebrow="Active Recall" title="High-Retention Flashcards" icon={BookOpen} color="#FBBF24" />

      {/* Progress */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
          <div className="h-full bg-[#FBBF24] rounded-full transition-all duration-300"
            style={{ width: `${((current + 1) / cards.length) * 100}%` }} />
        </div>
        <span className="text-[12px] text-[#706E67] shrink-0">{current + 1} / {cards.length}</span>
      </div>

      {/* Card flip */}
      <div className="relative h-44 cursor-pointer mb-4" onClick={() => setFlipped(f => !f)}
        style={{ perspective: '1000px' }}>
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}>
          {/* Front */}
          <div className="absolute inset-0 rounded-2xl border border-[rgba(251,191,36,0.25)] bg-[rgba(251,191,36,0.04)] flex flex-col items-center justify-center p-6 text-center"
            style={{ backfaceVisibility: 'hidden' }}>
            <p className="text-[11px] text-[#706E67] uppercase tracking-wider mb-3">{card.topic}</p>
            <p className="text-[15px] font-[500] text-[#F0EFE8] leading-[1.5]">{card.q}</p>
            <p className="text-[11px] text-[#706E67] mt-4">Tap to reveal answer →</p>
          </div>
          {/* Back */}
          <div className="absolute inset-0 rounded-2xl border border-[rgba(74,222,128,0.25)] bg-[rgba(74,222,128,0.05)] flex flex-col items-center justify-center p-6 text-center"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <p className="text-[11px] text-[#4ADE80] uppercase tracking-wider mb-3">Answer</p>
            <p className="text-[16px] font-[500] text-[#F0EFE8] leading-[1.5]">{card.a}</p>
          </div>
        </motion.div>
      </div>

      {/* Nav */}
      <div className="flex gap-2">
        <button onClick={prev} className="flex-1 h-10 rounded-xl border border-[rgba(255,255,255,0.09)] text-[#9E9C96] hover:text-[#F0EFE8] text-[13px] transition-colors">← Prev</button>
        <button onClick={next} className="flex-1 h-10 rounded-xl border border-[rgba(255,255,255,0.09)] text-[#9E9C96] hover:text-[#F0EFE8] text-[13px] transition-colors">Next →</button>
      </div>

      <p className="text-[12px] text-[#706E67] text-center mt-2">
        {cards.length} cards · Powered by ChatGPT prompt pack
      </p>
    </motion.section>
  )
}

// ═══════════════════════════════════════════════════════════
// 9. AUDIO REVISION RECOMMENDATIONS
// ═══════════════════════════════════════════════════════════
export function AudioRevisionSection() {
  const session = useSessionStore(s => s.session)
  if (!session || !session.strategy) return null
  const strategy = session.strategy

  return (
    <motion.section variants={staggerItem}>
      <SectionHeader eyebrow="NotebookLM Audio" title="Audio Revision Workflow" icon={Headphones} color="#8B5CF6" />

      <div className="p-4 rounded-xl border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.04)] mb-3">
        <div className="flex items-start gap-3">
          <Mic className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
          <div>
            <p className="text-[13px] font-[500] text-[#F0EFE8] mb-1">How to use NotebookLM Audio</p>
            <ol className="space-y-1">
              {['Upload your notes PDF to NotebookLM', 'Click "Audio Overview" → Generate podcast', 'Listen at 1.5× speed during breaks or travel', 'Re-listen at exam morning for final recall'].map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px] text-[#9E9C96]">
                  <span className="text-[#8B5CF6] font-[700] shrink-0">{i+1}.</span>{s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {(strategy.audioRecommendations || []).map((ar: any, i: number) => (
          <motion.div key={ar.id}
            initial={{ opacity:0, x:-6 }} animate={{ opacity:1, x:0 }} transition={{ delay: i*0.06 }}
            className="flex items-center gap-3 p-3.5 rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(28,28,26,0.8)]">
            <div className="w-10 h-10 rounded-xl bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)] flex items-center justify-center shrink-0">
              <Mic className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-[500] text-[#F0EFE8]">{ar.title}</p>
              <p className="text-[12px] text-[#9E9C96]">{ar.description}</p>
            </div>
            <div className="shrink-0 text-center">
              <p className="text-[13px] font-[600] text-[#8B5CF6]">{ar.duration}</p>
              <p className="text-[10px] text-[#706E67]">audio</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

// ═══════════════════════════════════════════════════════════
// 10. HOUR-BY-HOUR TIMELINE
// ═══════════════════════════════════════════════════════════
const TIMELINE_TYPE_META = {
  study: { color: '#818CF8', bg: 'rgba(129,140,248,0.1)', icon: BookOpen },
  break: { color: '#4ADE80', bg: 'rgba(74,222,128,0.08)', icon: Coffee },
  sleep: { color: '#3B82F6', bg: 'rgba(59,130,246,0.08)', icon: Moon },
  exam:  { color: '#F87171', bg: 'rgba(248,113,113,0.1)', icon: ClipboardList },
}

const TOOL_COLORS: Record<string, string> = {
  claude: '#F97316', notebooklm: '#8B5CF6', chatgpt: '#10B981', gemini: '#3B82F6',
}

export function TimelineSection() {
  const session = useSessionStore(s => s.session)
  const [expanded, setExpanded] = useState(false)
  if (!session || !session.strategy) return null
  const strategy = session.strategy

  const timeline = strategy.timeline || []
  const visible = expanded ? timeline : timeline.slice(0, 7)

  return (
    <motion.section variants={staggerItem}>
      <SectionHeader eyebrow="Execution Plan" title="Hour-by-Hour Study Roadmap" icon={Zap} color="#FBBF24" />

      <div className="relative">
        <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-[#818CF8] via-[rgba(129,140,248,0.3)] to-transparent" />

        <div className="space-y-2">
          {visible.map((block, i) => {
            const meta = TIMELINE_TYPE_META[block.type as keyof typeof TIMELINE_TYPE_META]
            const Icon = meta.icon
            const toolColor = block.tool ? TOOL_COLORS[block.tool] : null

            return (
              <motion.div key={`${block.hour}-${i}`}
                initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
                transition={{ delay: i * 0.04 }}
                className={cn('relative flex gap-3 pl-10',
                  block.type === 'exam' && 'mt-4')}>
                {/* Node */}
                <div className="absolute left-0 w-10 h-10 flex items-center justify-center z-10">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center border-2"
                    style={{ borderColor: meta.color, background: meta.bg }}>
                    <Icon className="w-4 h-4" style={{ color: meta.color }} />
                  </div>
                </div>

                {/* Content */}
                <div className={cn('flex-1 p-3 rounded-xl border transition-colors',
                  block.type === 'exam'
                    ? 'border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.06)]'
                    : block.type === 'sleep'
                    ? 'border-[rgba(59,130,246,0.2)] bg-[rgba(59,130,246,0.04)]'
                    : block.type === 'break'
                    ? 'border-[rgba(255,255,255,0.06)] bg-transparent'
                    : 'border-[rgba(255,255,255,0.07)] bg-[rgba(28,28,26,0.7)]')}>

                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span className="text-[12px] font-[700] text-[#F0EFE8]">{block.hour}</span>
                    <span className="text-[12px] font-[500]" style={{ color: meta.color }}>{block.label}</span>
                    {block.tool && toolColor && (
                      <span className="text-[10px] font-[600] px-1.5 py-0.5 rounded-full"
                        style={{ color: toolColor, background: `${toolColor}15`, border: `1px solid ${toolColor}30` }}>
                        {TOOL_COLORS[block.tool] && block.tool.charAt(0).toUpperCase() + block.tool.slice(1)}
                      </span>
                    )}
                    <span className="ml-auto text-[11px] text-[#706E67]">{block.duration}min</span>
                  </div>
                  <p className="text-[12px] text-[#9E9C96]">{block.topic}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {!expanded && timeline.length > 7 && (
        <button onClick={() => setExpanded(true)}
          className="mt-3 w-full py-3 rounded-xl border border-[rgba(255,255,255,0.08)] text-[13px] text-[#9E9C96] hover:text-[#F0EFE8] hover:border-[rgba(255,255,255,0.15)] transition-colors">
          Show full {timeline.length - 7} more time blocks
        </button>
      )}
    </motion.section>
  )
}
