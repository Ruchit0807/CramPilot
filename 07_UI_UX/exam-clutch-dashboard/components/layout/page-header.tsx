// ============================================================
// CramPilot — Page Header
// Consistent page-level header with breadcrumb context
// ============================================================

import { cn } from '@/lib/utils'
import { SectionLabel } from './section-label'

interface PageHeaderProps {
  eyebrow?: string        // e.g. "PHASE 1 — TRIAGE"
  title: string
  subtitle?: string
  action?: React.ReactNode  // right-aligned action button
  className?: string
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-4 mb-8', className)}>
      <div>
        {eyebrow && (
          <SectionLabel variant="purple" className="mb-2">
            {eyebrow}
          </SectionLabel>
        )}
        <h1 className="text-h1 text-primary-ec">{title}</h1>
        {subtitle && (
          <p className="text-body-sm text-secondary-ec mt-1">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
