'use client'
// ============================================================
// CramPilot — Emergency Banner
// Displays when hours remaining < 12 (emergency mode)
// Amber-tinted, pulse animation, calm messaging
// ============================================================

import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { emergencyPulse } from '@/lib/animations'
import { formatHoursRemaining } from '@/lib/format'
import { cn } from '@/lib/utils'

interface EmergencyBannerProps {
  hoursRemaining: number
  subject: string
  criticalTopicCount: number
  className?: string
}

export function EmergencyBanner({
  hoursRemaining,
  subject,
  criticalTopicCount,
  className,
}: EmergencyBannerProps) {
  const isExtreme = hoursRemaining <= 4
  const hoursPerTopic = criticalTopicCount > 0
    ? (hoursRemaining / criticalTopicCount).toFixed(1)
    : hoursRemaining

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'card-warning rounded-lg',
        isExtreme && 'emergency-glow',
        className
      )}
    >
      <div className="flex items-start gap-3">
        <motion.div
          variants={emergencyPulse}
          animate="animate"
          className="shrink-0"
        >
          <Clock className="w-5 h-5 text-amber-ec" />
        </motion.div>

        <div>
          <p className="text-label text-amber-ec mb-1">
            {isExtreme ? 'CRITICAL — EMERGENCY MODE' : 'EMERGENCY PLAN ACTIVE'}
          </p>
          <p className="text-body-sm text-primary-ec font-medium">
            {formatHoursRemaining(hoursRemaining)} for {subject}
          </p>
          <p className="text-body-sm text-secondary-ec mt-1">
            {criticalTopicCount} critical topics · {hoursPerTopic}h each.{' '}
            {hoursRemaining <= 4
              ? 'Cover only the top 2 topics. Skip everything else.'
              : 'This plan is achievable. Focus on critical topics only.'}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
