'use client'
// ============================================================
// CramPilot — Warning Card (Marks Trap)
// Amber-tinted, left amber accent bar
// ============================================================

import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { staggerItem } from '@/lib/animations'
import type { MarksTrap } from '@/types'

interface WarningCardProps {
  trap: MarksTrap
  className?: string
  animate?: boolean
}

const severityColors = {
  low: 'text-amber-ec/60',
  medium: 'text-amber-ec/80',
  high: 'text-amber-ec',
}

export function WarningCard({ trap, className, animate = true }: WarningCardProps) {
  const Wrapper = animate ? motion.div : 'div'
  const motionProps = animate ? { variants: staggerItem } : {}

  return (
    <Wrapper
      {...motionProps}
      className={cn('card-warning rounded-lg', className)}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle
          className={cn('w-4 h-4 shrink-0', severityColors[trap.severity])}
        />
        <span className="text-label text-amber-ec">MARKS TRAP</span>
      </div>

      {/* Title */}
      <h3 className="text-h3 text-primary-ec mb-3 font-medium">{trap.title}</h3>

      {/* Details */}
      <div className="space-y-2">
        <div>
          <span className="text-caption text-amber-ec">Cost: </span>
          <span className="text-body-sm text-primary-ec font-medium">
            {trap.deductionRange}
          </span>
        </div>
        <div>
          <span className="text-caption text-amber-ec">When: </span>
          <span className="text-body-sm text-secondary-ec">{trap.condition}</span>
        </div>
        <div className="pt-2 border-t border-amber-ec/10">
          <span className="text-caption text-amber-ec">Fix: </span>
          <span className="text-body-sm text-primary-ec">{trap.prevention}</span>
        </div>
      </div>
    </Wrapper>
  )
}
