'use client'
// ============================================================
// CramPilot — AI Tools Strip
// Logos + names of supported AI platforms
// ============================================================

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { MessageSquare, Sparkles, Zap, BookMarked } from 'lucide-react'
import { cn } from '@/lib/utils'

const AI_TOOLS = [
  {
    name: 'ChatGPT',
    icon: MessageSquare,
    color: '#10B981',
    description: 'Concept mastery & practice',
  },
  {
    name: 'Claude',
    icon: Sparkles,
    color: '#F97316',
    description: 'Deep understanding & essays',
  },
  {
    name: 'Gemini',
    icon: Zap,
    color: '#818CF8',
    description: 'Broad analysis & research',
  },
  {
    name: 'NotebookLM',
    icon: BookMarked,
    color: '#8B5CF6',
    description: 'Source-grounded study',
  },
]

export function AIToolsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-20 px-4 sm:px-6 overflow-hidden">
      {/* Divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-caption text-tertiary-ec mb-10 tracking-widest"
        >
          WORKS WITH YOUR PREFERRED AI TOOLS — ALL FREE TIERS
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {AI_TOOLS.map((tool, i) => {
            const Icon = tool.icon
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-3 p-5 rounded-xl glass border border-white/[0.06] hover:border-white/[0.12] transition-all duration-200 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${tool.color}18`, border: `1px solid ${tool.color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color: tool.color }} />
                </div>
                <div className="text-center">
                  <p className="text-body-sm font-medium text-primary-ec">{tool.name}</p>
                  <p className="text-caption text-tertiary-ec mt-0.5">{tool.description}</p>
                </div>
                {/* Free badge */}
                <span
                  className="text-caption px-2 py-0.5 rounded-sm border"
                  style={{ color: tool.color, borderColor: `${tool.color}30`, backgroundColor: `${tool.color}10` }}
                >
                  Free tier
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* Context note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center text-caption text-tertiary-ec mt-8"
        >
          Each prompt is calibrated to the right tool — no paid subscriptions required.
        </motion.p>
      </div>
    </section>
  )
}
