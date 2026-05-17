'use client'
// ============================================================
// CramPilot — Prompt Generation Section
// Shows actual prompt card with copy interaction
// ============================================================

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Copy, Check, ExternalLink, MessageSquare, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const SAMPLE_PROMPT = `You are a Corporate Law tutor preparing an LLB student for an exam with a theory-heavy professor who rewards scholarly frameworks.

Explain the essential elements of a valid contract under the Indian Contract Act in exactly this structure:
1. Definition (one precise sentence citing the Act)
2. Each essential element — name it, define it, state the section number
3. A brief case law example for the 2 most important elements
4. One sentence on what happens if any element is missing

Keep each element explanation under 80 words. Use formal legal language. Do not include conversational preamble.

Subject: Corporate Law
Topic: Contract Formation`

const PROMPT_TYPES = [
  { label: 'Concept Load', tool: 'ChatGPT', active: true },
  { label: 'Practice Qs', tool: 'ChatGPT', active: false },
  { label: 'Deep Dive', tool: 'Claude', active: false },
  { label: 'Flashcards', tool: 'ChatGPT', active: false },
  { label: 'Answer Framework', tool: 'Claude', active: false },
  { label: 'Last-Minute Summary', tool: 'ChatGPT', active: false },
]

export function PromptSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(SAMPLE_PROMPT).catch(() => {})
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1500)
  }

  return (
    <section id="prompts" ref={ref} className="py-24 px-4 sm:px-6 relative">
      <div className="absolute left-0 top-1/3 w-[300px] h-[400px] bg-purple-ec/[0.03] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-label text-purple-ec mb-3"
          >
            PROMPT GENERATION SYSTEM
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-h1 sm:text-[2rem] text-primary-ec font-medium tracking-tight mb-4"
          >
            Ready-to-paste AI prompts, calibrated to your professor
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.15 }}
            className="text-body text-secondary-ec"
          >
            No more wondering what to ask. Every prompt is pre-engineered for 
            your topic, your professor's style, and your AI tool of choice.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Prompt type filter */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-2"
          >
            <p className="text-label text-tertiary-ec mb-4">PROMPT TYPES</p>
            {PROMPT_TYPES.map((type) => (
              <div
                key={type.label}
                className={cn(
                  'flex items-center justify-between px-4 py-3 rounded-lg border cursor-pointer transition-all duration-150',
                  type.active
                    ? 'border-purple-ec/40 bg-purple-ec/8 text-primary-ec'
                    : 'border-white/[0.06] text-secondary-ec hover:border-white/[0.12] hover:text-primary-ec'
                )}
              >
                <span className="text-body-sm">{type.label}</span>
                <span
                  className={cn(
                    'text-caption px-1.5 py-0.5 rounded border',
                    type.tool === 'ChatGPT'
                      ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10'
                      : 'text-orange-400 border-orange-500/20 bg-orange-500/10'
                  )}
                >
                  {type.tool}
                </span>
              </div>
            ))}

            {/* Stat callout */}
            <div className="mt-6 p-4 rounded-xl border border-white/[0.06] bg-surface-ec">
              <p className="text-h3 text-primary-ec">847</p>
              <p className="text-caption text-secondary-ec">students used this prompt this week</p>
              <div className="mt-2 flex items-center gap-1">
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i} className="text-amber-ec text-sm">★</span>
                ))}
                <span className="text-caption text-tertiary-ec ml-1">4.8 rating</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Prompt card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <div className="glass rounded-2xl border border-white/[0.08] overflow-hidden">
              {/* Card header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-primary-ec">
                      Contract Formation — Concept Load
                    </p>
                    <p className="text-caption text-tertiary-ec">ChatGPT · 612 characters</p>
                  </div>
                </div>
                <span className="text-label text-purple-ec px-2 py-0.5 rounded border border-purple-ec/25 bg-purple-ec/8">
                  CONCEPT LOAD
                </span>
              </div>

              {/* Prompt body */}
              <div className="p-5">
                <pre className="text-mono text-secondary-ec leading-relaxed whitespace-pre-wrap text-sm overflow-hidden max-h-56 relative">
                  {SAMPLE_PROMPT}
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#1C1C1A] to-transparent pointer-events-none" />
                </pre>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 px-5 pb-5">
                <button
                  onClick={handleCopy}
                  className={cn(
                    'flex-1 touch-target flex items-center justify-center gap-2 rounded-xl border py-2.5 text-body-sm font-medium transition-all duration-150',
                    isCopied
                      ? 'border-sage-ec/40 bg-sage-ec/10 text-sage-ec'
                      : 'border-purple-ec/40 text-purple-ec hover:bg-purple-ec/8'
                  )}
                >
                  {isCopied ? (
                    <><Check className="w-4 h-4" /> Copied ✓</>
                  ) : (
                    <><Copy className="w-4 h-4" /> Copy Prompt</>
                  )}
                </button>
                <a
                  href="https://chat.openai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-secondary-ec text-body-sm hover:border-white/20 hover:text-primary-ec transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open ChatGPT
                </a>
              </div>
            </div>

            {/* Professor calibration note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-4 flex items-start gap-3 p-4 rounded-xl border border-purple-ec/15 bg-purple-ec/[0.04]"
            >
              <Sparkles className="w-4 h-4 text-purple-ec mt-0.5 shrink-0" />
              <p className="text-body-sm text-secondary-ec">
                <span className="text-purple-ec font-medium">Professor-calibrated:</span> This prompt 
                instructs ChatGPT to use formal legal language and scholarly structure — matching the 
                Theory Scholar archetype identified in your survey.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
