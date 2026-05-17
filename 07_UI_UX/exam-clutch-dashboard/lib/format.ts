// ============================================================
// CramPilot — Format Utilities
// Display formatting for hours, topics, time, confidence
// ============================================================

import type { TopicPriority } from '@/types'

// ── Time formatting ───────────────────────────────────────────

/**
 * "18 hours remaining" / "4 hours remaining"
 */
export function formatHoursRemaining(hours: number): string {
  if (hours < 1) return `${Math.round(hours * 60)} minutes remaining`
  return `${hours} hour${hours !== 1 ? 's' : ''} remaining`
}

/**
 * "~2.5 hours" or "~45 min"
 */
export function formatTopicTime(minutes: number): string {
  if (minutes < 60) return `~${minutes} min`
  const hours = minutes / 60
  return `~${hours % 1 === 0 ? hours : hours.toFixed(1)} hours`
}

/**
 * "09:00 PM" — format a Date to 12h time string
 */
export function formatTimeLabel(date: Date): string {
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

/**
 * "2.5h per topic" — time allocation message
 */
export function formatTimeAllocation(hours: number, topicCount: number): string {
  if (topicCount === 0) return ''
  const perTopic = (hours / topicCount).toFixed(1)
  return `${perTopic}h per topic`
}

// ── Confidence / probability formatting ───────────────────────

/**
 * Returns star rating string: "★★★", "★★☆", "★☆☆"
 */
export function formatStars(stars: 1 | 2 | 3): string {
  return '★'.repeat(stars) + '☆'.repeat(3 - stars)
}

/**
 * "78% confident" from 0–100 number
 */
export function formatConfidence(confidence: number): string {
  return `${confidence}% confident`
}

/**
 * Probability label from stars
 */
export function formatProbabilityLabel(stars: 1 | 2 | 3): string {
  const map = { 3: 'HIGH PROBABILITY', 2: 'MODERATE PROBABILITY', 1: 'LOW PROBABILITY' }
  return map[stars]
}

// ── Topic priority formatting ──────────────────────────────────

export function formatPriorityLabel(priority: TopicPriority): string {
  const map: Record<TopicPriority, string> = {
    critical: 'CRITICAL',
    moderate: 'MODERATE',
    low: 'LOW PRIORITY',
    skip: 'SKIP',
  }
  return map[priority]
}

export function formatPriorityColor(priority: TopicPriority): string {
  const map: Record<TopicPriority, string> = {
    critical: 'text-[#818CF8]',
    moderate: 'text-[#9E9C96]',
    low: 'text-[#706E67]',
    skip: 'text-[#706E67]',
  }
  return map[priority]
}

export function formatPriorityBarColor(priority: TopicPriority): string {
  const map: Record<TopicPriority, string> = {
    critical: 'bg-[#818CF8]',
    moderate: 'bg-[#9E9C96]',
    low: 'bg-[#4B4B49]',
    skip: 'bg-transparent',
  }
  return map[priority]
}

// ── Prompt / character count formatting ───────────────────────

/**
 * "312 characters · within free tier limit"
 */
export function formatCharCount(chars: number, limit: number): string {
  const withinLimit = chars <= limit
  return `${chars.toLocaleString()} characters · ${
    withinLimit ? 'within free tier limit' : 'exceeds free tier'
  }`
}

// ── Completion formatting ─────────────────────────────────────

/**
 * "6 of 9 topics covered" — always count up, not down
 */
export function formatCompletionCount(completed: number, total: number): string {
  return `${completed} of ${total} topics covered`
}

/**
 * "60%" completion percent
 */
export function formatPercent(value: number): string {
  return `${Math.round(value)}%`
}

// ── Date formatting ───────────────────────────────────────────

/**
 * "Today, 11:47 PM"
 */
export function formatRelativeDateTime(date: Date): string {
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  const isTomorrow = new Date(now.getTime() + 86400000).toDateString() === date.toDateString()

  const timeStr = formatTimeLabel(date)
  if (isToday) return `Today, ${timeStr}`
  if (isTomorrow) return `Tomorrow, ${timeStr}`
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + `, ${timeStr}`
}
