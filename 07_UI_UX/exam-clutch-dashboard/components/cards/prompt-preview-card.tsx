'use client'
// ============================================================
// CramPilot — Prompt Preview Card
// Compact, scannable prompt list item
// ============================================================

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { copyToClipboard, truncate } from '@/lib/utils'
import { ANIMATION, AI_TOOLS } from '@/constants'
import type { PromptTemplate } from '@/types'

interface PromptPreviewCardProps {
  template: PromptTemplate
  onCopy?: (templateId: string) => void
  className?: string
}

export function PromptPreviewCard({
  template,
  onCopy,
  className,
}: PromptPreviewCardProps) {
  const [isCopied, setIsCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const toolConfig = AI_TOOLS[template.targetTool]
  const preview = truncate(template.templateBody, 80)

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(template.templateBody)
    if (success) {
      setIsCopied(true)
      onCopy?.(template.id)
      setTimeout(() => setIsCopied(false), ANIMATION.copyConfirm)
    }
  }, [template, onCopy])

  return (
    <div className={cn('card-action rounded-lg group', className)}>
      {/* Header row */}
      <div className="flex items-center gap-2 mb-2">
        {/* Tool dot */}
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: toolConfig.badgeColor }}
        />
        <span className="text-caption text-secondary-ec">{toolConfig.label}</span>
        <span className="text-caption text-tertiary-ec">·</span>
        <span className="text-body-sm font-medium text-primary-ec flex-1 truncate">
          {template.title}
        </span>
        {/* Copy — always visible */}
        <button
          onClick={handleCopy}
          className={cn(
            'shrink-0 flex items-center gap-1 px-2 py-1 rounded text-caption transition-all duration-150',
            isCopied
              ? 'text-sage-ec'
              : 'text-tertiary-ec group-hover:text-purple-ec'
          )}
          aria-label={`Copy ${template.title}`}
        >
          {isCopied ? (
            <>
              <Check className="w-3 h-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Preview */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left"
      >
        <p className="text-mono text-tertiary-ec leading-relaxed">
          {isExpanded ? template.templateBody : preview}
        </p>
        {template.templateBody.length > 80 && (
          <span className="flex items-center gap-1 mt-1 text-caption text-tertiary-ec">
            <ChevronDown
              className={cn(
                'w-3 h-3 transition-transform duration-200',
                isExpanded && 'rotate-180'
              )}
            />
            {isExpanded ? 'Collapse' : 'Expand'}
          </span>
        )}
      </button>
    </div>
  )
}
