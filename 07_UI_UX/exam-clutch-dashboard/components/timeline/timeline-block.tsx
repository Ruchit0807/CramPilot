'use client'
// ============================================================
// CramPilot — Timeline Block
// Hour-by-hour schedule item
// ============================================================

import { motion } from 'framer-motion'
import { Clock, Coffee, Moon, GraduationCap, BookOpen, Brain, PenLine, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { staggerItem } from '@/lib/animations'
import { AI_TOOLS } from '@/constants'
import type { RoadmapBlock } from '@/types'

const BLOCK_ICONS: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-4 h-4" />,
  Brain: <Brain className="w-4 h-4" />,
  PenLine: <PenLine className="w-4 h-4" />,
  Coffee: <Coffee className="w-4 h-4" />,
  Moon: <Moon className="w-4 h-4" />,
  GraduationCap: <GraduationCap className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />,
  Clock: <Clock className="w-4 h-4" />,
}

interface TimelineBlockProps {
  block: RoadmapBlock
  onComplete?: (blockId: string) => void
  showConnector?: boolean
  animate?: boolean
  className?: string
}

const blockTypeStyles = {
  study: 'border-ec',
  break: 'border-amber-ec/20 bg-amber-ec/5',
  stop: 'border-tertiary-ec/20',
  'exam-day': 'border-purple-ec/30 bg-purple-ec/5',
}

export function TimelineBlock({
  block,
  onComplete,
  showConnector = true,
  animate = true,
  className,
}: TimelineBlockProps) {
  const Wrapper = animate ? motion.div : 'div'
  const motionProps = animate ? { variants: staggerItem } : {}

  const isBreak = block.type === 'break'
  const isStop = block.type === 'stop'
  const isExamDay = block.type === 'exam-day'

  return (
    <div className={cn('flex gap-4', className)}>
      {/* Time column */}
      <div className="flex flex-col items-center shrink-0 w-16">
        <span className="text-caption text-secondary-ec text-right w-full">
          {block.startTime}
        </span>
        {showConnector && !isStop && (
          <div
            className={cn(
              'flex-1 w-px my-1 min-h-6',
              isBreak ? 'bg-amber-ec/20' : 'bg-ec'
            )}
          />
        )}
      </div>

      {/* Block content */}
      <Wrapper
        {...motionProps}
        className={cn(
          'flex-1 min-w-0 rounded-lg border p-3 mb-3 transition-all duration-150',
          blockTypeStyles[block.type],
          block.isCompleted && 'opacity-50',
          !isBreak && !isStop && !block.isCompleted && 'hover:border-ec-hover'
        )}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <span
            className={cn(
              'shrink-0 w-8 h-8 rounded flex items-center justify-center',
              isBreak && 'bg-amber-ec/10 text-amber-ec',
              isStop && 'bg-surface-ec text-tertiary-ec',
              isExamDay && 'bg-purple-ec/10 text-purple-ec',
              !isBreak && !isStop && !isExamDay && 'bg-recessed-ec text-secondary-ec'
            )}
          >
            {BLOCK_ICONS[block.icon] ?? <Clock className="w-4 h-4" />}
          </span>

          <div className="flex-1 min-w-0">
            {/* Label */}
            <p
              className={cn(
                'text-body-sm font-medium leading-snug',
                block.isCompleted ? 'completed-topic' : 'text-primary-ec',
                isStop && 'text-tertiary-ec'
              )}
            >
              {block.label}
            </p>

            {/* Tool + duration */}
            {block.toolRecommended && !isBreak && !isStop && (
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={cn(
                    'text-caption px-1.5 py-0.5 rounded-sm border',
                    AI_TOOLS[block.toolRecommended].color
                  )}
                >
                  {AI_TOOLS[block.toolRecommended].shortLabel}
                </span>
                <span className="text-caption">{block.durationMinutes} min</span>
              </div>
            )}

            {/* Break/stop duration */}
            {isBreak && (
              <p className="text-caption mt-0.5">{block.durationMinutes} min</p>
            )}
          </div>

          {/* Complete button (study blocks only) */}
          {!isBreak && !isStop && !isExamDay && onComplete && (
            <button
              onClick={() => onComplete(block.id)}
              className={cn(
                'shrink-0 touch-target w-6 h-6 rounded-sm border flex items-center justify-center transition-all duration-150',
                block.isCompleted
                  ? 'border-sage-ec/40 bg-sage-ec/10 text-sage-ec'
                  : 'border-ec hover:border-ec-hover'
              )}
              aria-label={`Mark ${block.label} as complete`}
            >
              {block.isCompleted && <span className="text-caption">✓</span>}
            </button>
          )}
        </div>
      </Wrapper>
    </div>
  )
}
