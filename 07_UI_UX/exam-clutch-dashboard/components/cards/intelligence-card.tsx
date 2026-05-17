'use client'
// ============================================================
// CramPilot — Intelligence Card
// For AI-generated content: predictions, professor insights
// Purple-tinted border, left accent bar
// ============================================================

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { staggerItem } from '@/lib/animations'
import type { ReactNode } from 'react'

interface IntelligenceCardProps {
  category?: string          // e.g. "PREDICTION" — uppercase label
  title: string
  children: ReactNode
  sourceText?: string        // e.g. "Based on 5 years of past papers"
  confidence?: number        // 0–100
  stars?: 1 | 2 | 3
  isPaid?: boolean
  className?: string
  animate?: boolean
}

function StarRating({ stars }: { stars: 1 | 2 | 3 }) {
  return (
    <span className="text-sm" aria-label={`${stars} out of 3 stars`}>
      {'★'.repeat(stars)}
      <span className="opacity-30">{'★'.repeat(3 - stars)}</span>
    </span>
  )
}

export function IntelligenceCard({
  category,
  title,
  children,
  sourceText,
  confidence,
  stars,
  isPaid = false,
  className,
  animate = true,
}: IntelligenceCardProps) {
  const Wrapper = animate ? motion.div : 'div'
  const motionProps = animate ? { variants: staggerItem } : {}

  return (
    <Wrapper
      {...motionProps}
      className={cn(
        'card-intelligence relative overflow-hidden',
        isPaid && 'content-locked',
        className
      )}
    >
      {/* Header */}
      {(category || stars) && (
        <div className="flex items-center justify-between mb-3">
          {category && (
            <span className="text-label text-purple-ec">{category}</span>
          )}
          {stars && (
            <span className="text-purple-ec">
              <StarRating stars={stars} />
            </span>
          )}
        </div>
      )}

      {/* Title */}
      <h3 className="text-h3 text-primary-ec mb-3 font-medium leading-snug">
        {title}
      </h3>

      {/* Content */}
      <div className="text-body-sm text-secondary-ec">{children}</div>

      {/* Confidence bar */}
      {confidence !== undefined && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-caption">Confidence</span>
            <span className="text-caption text-purple-ec">{confidence}%</span>
          </div>
          <div className="h-0.5 rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-purple-ec transition-all duration-500"
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>
      )}

      {/* Source citation */}
      {sourceText && (
        <p className="mt-4 text-caption border-t border-ec pt-3">{sourceText}</p>
      )}

      {/* Paid overlay */}
      {isPaid && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="glass rounded-lg px-4 py-2 border border-ec-purple">
            <span className="text-label text-purple-ec">Unlock predictions →</span>
          </div>
        </div>
      )}
    </Wrapper>
  )
}
