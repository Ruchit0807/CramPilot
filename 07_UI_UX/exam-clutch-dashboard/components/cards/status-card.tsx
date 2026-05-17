'use client'
// ============================================================
// CramPilot — Status Card (Topic Priority)
// Critical / Moderate / Skip / Completed states
// Color-coded left bar, priority badge
// ============================================================

import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { staggerItem } from '@/lib/animations'
import {
  formatPriorityLabel,
  formatPriorityBarColor,
  formatPriorityColor,
  formatTopicTime,
} from '@/lib/format'
import type { Topic } from '@/types'

interface StatusCardProps {
  topic: Topic
  onComplete?: (topicId: string) => void
  onUncomplete?: (topicId: string) => void
  showTime?: boolean
  showSubtopics?: boolean
  animate?: boolean
  className?: string
}

export function StatusCard({
  topic,
  onComplete,
  onUncomplete,
  showTime = true,
  showSubtopics = false,
  animate = true,
  className,
}: StatusCardProps) {
  const isSkip = topic.priority === 'skip'
  const isCompleted = topic.isCompleted

  const Wrapper = animate ? motion.div : 'div'
  const motionProps = animate ? { variants: staggerItem, layout: true } : {}

  return (
    <Wrapper
      {...motionProps}
      className={cn(
        'relative flex items-start gap-3 rounded-lg border border-ec p-4',
        'transition-all duration-200',
        isCompleted && 'opacity-60',
        isSkip && 'opacity-50',
        topic.priority === 'critical' && !isCompleted && 'bg-purple-ec/[0.03]',
        className
      )}
    >
      {/* Priority bar */}
      <div
        className={cn(
          'absolute left-0 top-0 bottom-0 w-[3px] rounded-l-lg',
          isCompleted
            ? 'bg-ec-sage'
            : formatPriorityBarColor(topic.priority)
        )}
      />

      {/* Content */}
      <div className="flex-1 pl-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          {/* Topic name */}
          <span
            className={cn(
              'text-body font-medium leading-snug',
              isCompleted && 'completed-topic',
              isSkip && 'text-tertiary-ec',
              !isSkip && !isCompleted && 'text-primary-ec'
            )}
          >
            {topic.name}
          </span>

          {/* Priority badge or skip marker */}
          {isSkip ? (
            <span className="flex items-center gap-1 text-label text-tertiary-ec shrink-0">
              <X className="w-3 h-3" />
              SKIP
            </span>
          ) : (
            <span
              className={cn(
                'text-label shrink-0',
                isCompleted ? 'text-sage-ec' : formatPriorityColor(topic.priority)
              )}
            >
              {isCompleted ? '✓' : formatPriorityLabel(topic.priority)}
            </span>
          )}
        </div>

        {/* Time estimate */}
        {showTime && topic.estimatedMinutes > 0 && (
          <p className="text-caption">{formatTopicTime(topic.estimatedMinutes)}</p>
        )}

        {/* Subtopics */}
        {showSubtopics && topic.subtopics && topic.subtopics.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {topic.subtopics.map((st) => (
              <span
                key={st}
                className="text-caption px-2 py-0.5 rounded-sm bg-recessed-ec border border-ec"
              >
                {st}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Complete toggle button */}
      {!isSkip && (onComplete || onUncomplete) && (
        <button
          onClick={() =>
            isCompleted
              ? onUncomplete?.(topic.id)
              : onComplete?.(topic.id)
          }
          className={cn(
            'touch-target shrink-0 w-6 h-6 rounded-sm border transition-all duration-150',
            'flex items-center justify-center',
            isCompleted
              ? 'bg-sage-ec/20 border-sage-ec/40 text-sage-ec'
              : 'border-ec hover:border-ec-hover bg-transparent'
          )}
          aria-label={isCompleted ? `Unmark ${topic.name}` : `Complete ${topic.name}`}
        >
          <AnimatePresence>
            {isCompleted && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Check className="w-3 h-3" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      )}
    </Wrapper>
  )
}
