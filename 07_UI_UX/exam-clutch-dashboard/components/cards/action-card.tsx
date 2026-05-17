'use client'
// ============================================================
// CramPilot — Action Card (Prompt / Task)
// Ready-to-paste prompts with copy button and tool badge
// ============================================================

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { copyToClipboard } from '@/lib/utils'
import { cardExpandVariants, staggerItem } from '@/lib/animations'
import { AI_TOOLS, ANIMATION } from '@/constants'
import { truncate } from '@/lib/utils'
import type { PromptTemplate, FilledPrompt, AITool } from '@/types'

interface ActionCardProps {
  template: PromptTemplate
  filledPrompt?: FilledPrompt
  onMarkUsed?: (promptId: string) => void
  isUsed?: boolean
  animate?: boolean
  className?: string
}

function ToolBadge({ tool }: { tool: AITool }) {
  const config = AI_TOOLS[tool]
  return (
    <span className={cn('text-caption px-2 py-0.5 rounded-sm border', config.color)}>
      {config.label}
    </span>
  )
}

export function ActionCard({
  template,
  filledPrompt,
  onMarkUsed,
  isUsed = false,
  animate = true,
  className,
}: ActionCardProps) {
  const [isCopied, setIsCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const promptBody = filledPrompt?.filledBody ?? template.templateBody
  const previewText = truncate(promptBody, 160)
  const isLong = promptBody.length > 160

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(promptBody)
    if (success) {
      setIsCopied(true)
      onMarkUsed?.(template.id)
      setTimeout(() => setIsCopied(false), ANIMATION.copyConfirm)
    }
  }, [promptBody, template.id, onMarkUsed])

  const Wrapper = animate ? motion.div : 'div'
  const motionProps = animate ? { variants: staggerItem } : {}

  return (
    <Wrapper
      {...motionProps}
      className={cn('card-action rounded-lg', isUsed && 'opacity-60', className)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <ToolBadge tool={template.targetTool} />
          <span className="text-caption text-secondary-ec">{template.title}</span>
        </div>
        {template.isPaid && (
          <span className="text-label text-amber-ec shrink-0">PRO</span>
        )}
      </div>

      {/* Prompt body */}
      <div className="relative">
        <div
          className={cn(
            'prompt-block rounded',
            isExpanded && 'expanded max-h-none'
          )}
        >
          {isExpanded ? promptBody : previewText}
        </div>

        {/* Expand/collapse */}
        {isLong && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-1 flex items-center gap-1 text-caption text-tertiary-ec hover:text-secondary-ec transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-3 h-3" /> Show less
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3" /> Show full prompt
              </>
            )}
          </button>
        )}
      </div>

      {/* Character count */}
      <p className="mt-2 text-caption text-tertiary-ec">
        {template.characterCount.toLocaleString()} characters
      </p>

      {/* Action buttons */}
      <div className="mt-4 flex items-center gap-2">
        {/* Copy button — primary action */}
        <button
          onClick={handleCopy}
          className={cn(
            'touch-target flex-1 flex items-center justify-center gap-2 rounded border px-3 py-2',
            'text-body-sm font-medium transition-all duration-150',
            isCopied
              ? 'border-sage-ec/40 bg-sage-ec/10 text-sage-ec'
              : 'border-ec-purple text-purple-ec hover:bg-purple-ec/5'
          )}
        >
          <AnimatePresence mode="wait">
            {isCopied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                Copied ✓
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Prompt
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Open tool button — secondary */}
        <a
          href={AI_TOOLS[template.targetTool].url}
          target="_blank"
          rel="noopener noreferrer"
          className="touch-target flex items-center gap-1.5 rounded border border-ec px-3 py-2 text-body-sm text-secondary-ec hover:text-primary-ec hover:border-ec-hover transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Open {AI_TOOLS[template.targetTool].shortLabel}
        </a>

        {/* Mark as done */}
        {onMarkUsed && !isUsed && (
          <button
            onClick={() => onMarkUsed(template.id)}
            className="text-caption text-tertiary-ec hover:text-secondary-ec transition-colors px-2"
          >
            Mark done
          </button>
        )}
      </div>
    </Wrapper>
  )
}
