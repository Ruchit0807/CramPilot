// ============================================================
// CramPilot — Section Label
// Uppercase category label — "SETUP YOUR EXAM" style
// ============================================================

import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'purple' | 'amber' | 'muted'
}

export function SectionLabel({
  children,
  className,
  variant = 'default',
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        'text-label',
        variant === 'default' && 'text-secondary-ec',
        variant === 'purple' && 'text-purple-ec',
        variant === 'amber' && 'text-amber-ec',
        variant === 'muted' && 'text-tertiary-ec',
        className
      )}
    >
      {children}
    </p>
  )
}
