'use client'
// ============================================================
// CramPilot — Phase Indicator
// [✓ Triage] → [● Coverage] → [○ Recall] → ...
// ============================================================

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { WORKFLOW_PHASES, PHASE_ORDER } from '@/constants'
import type { WorkflowPhase, PhaseStatus } from '@/types'

interface PhaseIndicatorProps {
  currentPhase: WorkflowPhase
  phaseStatuses: Record<WorkflowPhase, PhaseStatus>
  onPhaseClick?: (phase: WorkflowPhase) => void
  variant?: 'horizontal' | 'vertical'
  className?: string
}

function PhaseNode({
  phase,
  status,
  label,
  isLast,
  onClick,
}: {
  phase: WorkflowPhase
  status: PhaseStatus
  label: string
  isLast: boolean
  onClick?: (phase: WorkflowPhase) => void
}) {
  const isCompleted = status === 'completed'
  const isActive = status === 'active'
  const isLocked = status === 'locked'

  return (
    <div className="flex items-center">
      <button
        onClick={() => !isLocked && onClick?.(phase)}
        className={cn(
          'flex items-center gap-2 group',
          isLocked && 'cursor-not-allowed',
          !isLocked && 'cursor-pointer'
        )}
        title={isLocked ? 'Complete current phase first' : undefined}
        aria-current={isActive ? 'step' : undefined}
      >
        {/* Node circle */}
        <div
          className={cn(
            'w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 shrink-0',
            isCompleted && 'bg-sage-ec/20 border-sage-ec text-sage-ec',
            isActive && 'bg-purple-ec/20 border-purple-ec text-purple-ec',
            isLocked && 'bg-transparent border-ec text-tertiary-ec'
          )}
        >
          {isCompleted ? (
            <Check className="w-2.5 h-2.5" />
          ) : isActive ? (
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-purple-ec"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-tertiary-ec/30" />
          )}
        </div>

        {/* Label */}
        <span
          className={cn(
            'text-body-sm transition-colors duration-200',
            isCompleted && 'text-secondary-ec',
            isActive && 'text-primary-ec font-medium',
            isLocked && 'text-tertiary-ec'
          )}
        >
          {label}
        </span>
      </button>

      {/* Connector */}
      {!isLast && (
        <div
          className={cn(
            'w-8 h-px mx-2 shrink-0',
            isCompleted ? 'bg-sage-ec/30' : 'bg-ec'
          )}
        />
      )}
    </div>
  )
}

export function PhaseIndicator({
  currentPhase,
  phaseStatuses,
  onPhaseClick,
  variant = 'horizontal',
  className,
}: PhaseIndicatorProps) {
  const phases = PHASE_ORDER.filter((p) => p !== 'complete')

  if (variant === 'vertical') {
    return (
      <div className={cn('flex flex-col gap-3', className)}>
        {phases.map((phase, index) => {
          const config = WORKFLOW_PHASES[phase]
          const status = phaseStatuses[phase]
          const isCompleted = status === 'completed'
          const isActive = status === 'active'
          const isLocked = status === 'locked'

          return (
            <div key={phase} className="flex items-start gap-3">
              {/* Node + connector column */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border flex items-center justify-center shrink-0',
                    isCompleted && 'bg-sage-ec/20 border-sage-ec',
                    isActive && 'bg-purple-ec/20 border-purple-ec',
                    isLocked && 'border-ec'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-2.5 h-2.5 text-sage-ec" />
                  ) : isActive ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-ec" />
                  ) : null}
                </div>
                {index < phases.length - 1 && (
                  <div
                    className={cn(
                      'w-px flex-1 mt-1',
                      isCompleted ? 'bg-sage-ec/20 min-h-4' : 'bg-ec min-h-4'
                    )}
                  />
                )}
              </div>

              {/* Text */}
              <div className="pb-4">
                <p
                  className={cn(
                    'text-body-sm font-medium',
                    isActive && 'text-primary-ec',
                    isCompleted && 'text-secondary-ec',
                    isLocked && 'text-tertiary-ec'
                  )}
                >
                  {config.label}
                </p>
                {isActive && (
                  <p className="text-caption mt-0.5">{config.description}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={cn('flex items-center flex-wrap gap-y-2 overflow-x-auto', className)}>
      {phases.map((phase, index) => (
        <PhaseNode
          key={phase}
          phase={phase}
          status={phaseStatuses[phase]}
          label={WORKFLOW_PHASES[phase].shortLabel}
          isLast={index === phases.length - 1}
          onClick={onPhaseClick}
        />
      ))}
    </div>
  )
}
