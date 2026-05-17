// ============================================================
// CramPilot — Topic Prioritizer
// Rule-based topic prioritization engine for MVP
// Takes raw topic list + context → returns prioritized topics
// ============================================================

import type { Topic, TopicPriority, ExamSession } from '@/types'

export interface PrioritizationInput {
  topics: Array<{
    id: string
    name: string
    marks?: number
    appearedInPYQ?: boolean
    lastAppeared?: string
    subtopics?: string[]
  }>
  hoursRemaining: number
  targetMarks: string
  pyqFrequencyMap?: Record<string, number>  // topic name → appearance count
}

export interface PrioritizationResult {
  topics: Topic[]
  criticalCount: number
  moderateCount: number
  skipCount: number
  estimatedTotalMinutes: number
  achievabilityMessage: string
  skipReason: Record<string, string>   // topic name → reason for skip
}

// ── Core prioritization logic ─────────────────────────────────

/**
 * Assigns priority to each topic based on:
 * 1. PYQ appearance frequency (highest weight)
 * 2. Marks weightage
 * 3. Hours available (emergency = stricter skip criteria)
 * 4. Target marks (85%+ = fewer skips)
 */
export function prioritizeTopics(input: PrioritizationInput): PrioritizationResult {
  const {
    topics,
    hoursRemaining,
    targetMarks,
    pyqFrequencyMap = {},
  } = input

  const isEmergency = hoursRemaining <= 12
  const isAggressive = targetMarks === 'pass' || targetMarks === '55-70'

  const scored = topics.map((topic) => {
    const pyqScore = pyqFrequencyMap[topic.name] ?? 0      // 0–5+
    const marksScore = topic.marks ? topic.marks / 10 : 0  // normalized
    const pyqRecency = topic.lastAppeared
      ? 2025 - parseInt(topic.lastAppeared, 10) <= 2 ? 2 : 1
      : 0

    const totalScore =
      pyqScore * 3 +           // PYQ frequency is 3x weighted
      marksScore * 1.5 +       // Marks weightage
      pyqRecency * 1 +         // Recent appearances valued
      (topic.appearedInPYQ ? 2 : 0)

    return { ...topic, totalScore }
  }).sort((a, b) => b.totalScore - a.totalScore)

  const totalTopics = scored.length
  let criticalCutoff: number
  let skipCutoff: number

  // Adjust cutoffs based on emergency and target
  if (isEmergency && isAggressive) {
    criticalCutoff = Math.ceil(totalTopics * 0.35)   // top 35%
    skipCutoff = Math.floor(totalTopics * 0.5)        // bottom 50%
  } else if (isEmergency) {
    criticalCutoff = Math.ceil(totalTopics * 0.4)
    skipCutoff = Math.floor(totalTopics * 0.4)
  } else if (isAggressive) {
    criticalCutoff = Math.ceil(totalTopics * 0.45)
    skipCutoff = Math.floor(totalTopics * 0.35)
  } else {
    criticalCutoff = Math.ceil(totalTopics * 0.5)
    skipCutoff = Math.floor(totalTopics * 0.25)
  }

  const prioritizedTopics: Topic[] = scored.map((topic, index) => {
    let priority: TopicPriority
    if (index < criticalCutoff) priority = 'critical'
    else if (index >= totalTopics - skipCutoff) priority = 'skip'
    else priority = 'moderate'

    // Topics with 0 PYQ appearances in emergency mode → skip
    if (isEmergency && topic.totalScore < 2 && priority !== 'critical') {
      priority = 'skip'
    }

    const estimatedMinutes = calculateTopicTime(priority, hoursRemaining, criticalCutoff)

    return {
      id: topic.id,
      name: topic.name,
      priority,
      estimatedMinutes,
      isCompleted: false,
      subtopics: topic.subtopics,
      marks: topic.marks,
      appearedInPYQ: topic.appearedInPYQ,
      lastAppeared: topic.lastAppeared,
    }
  })

  const criticalCount = prioritizedTopics.filter((t) => t.priority === 'critical').length
  const moderateCount = prioritizedTopics.filter((t) => t.priority === 'moderate').length
  const skipCount = prioritizedTopics.filter((t) => t.priority === 'skip').length

  const totalStudyMinutes = prioritizedTopics
    .filter((t) => t.priority !== 'skip')
    .reduce((sum, t) => sum + t.estimatedMinutes, 0)

  const hoursPerCritical = criticalCount > 0
    ? (hoursRemaining / criticalCount).toFixed(1)
    : '0'

  const achievabilityMessage =
    `You have ${hoursRemaining} hours and ${criticalCount} critical topic${criticalCount !== 1 ? 's' : ''}. ` +
    `That's ${hoursPerCritical}h per topic. This plan is achievable.`

  // Build skip reason map
  const skipReason: Record<string, string> = {}
  prioritizedTopics
    .filter((t) => t.priority === 'skip')
    .forEach((t) => {
      const pyqCount = pyqFrequencyMap[t.name] ?? 0
      if (pyqCount === 0) {
        skipReason[t.name] = `Has not appeared in past papers — safe to skip.`
      } else {
        skipReason[t.name] = `Low probability given available time — safe to skip.`
      }
    })

  return {
    topics: prioritizedTopics,
    criticalCount,
    moderateCount,
    skipCount,
    estimatedTotalMinutes: totalStudyMinutes,
    achievabilityMessage,
    skipReason,
  }
}

function calculateTopicTime(
  priority: TopicPriority,
  hoursRemaining: number,
  criticalCount: number
): number {
  const isEmergency = hoursRemaining <= 12
  if (priority === 'skip') return 0
  if (priority === 'critical') {
    if (criticalCount === 0) return 60
    const minutesPerCritical = (hoursRemaining * 60 * 0.7) / criticalCount
    return Math.min(Math.max(Math.round(minutesPerCritical), 30), 180)
  }
  // Moderate topics get 30–60 min each
  return isEmergency ? 30 : 45
}

/**
 * Calculate emergency score for a session (0–100)
 * Higher = more urgent = more aggressive prioritization
 */
export function calculateEmergencyScore(
  hoursRemaining: number,
  totalTopics: number,
  targetMarks: string
): number {
  let score = 0

  // Time pressure component (0–50)
  if (hoursRemaining <= 4) score += 50
  else if (hoursRemaining <= 8) score += 40
  else if (hoursRemaining <= 12) score += 30
  else if (hoursRemaining <= 24) score += 15
  else score += 5

  // Topic count vs time (0–30)
  const topicsPerHour = totalTopics / hoursRemaining
  if (topicsPerHour > 3) score += 30
  else if (topicsPerHour > 2) score += 20
  else if (topicsPerHour > 1) score += 10

  // Target ambition (0–20)
  if (targetMarks === '85+') score += 20
  else if (targetMarks === '70-85') score += 10
  else if (targetMarks === '55-70') score += 5

  return Math.min(100, score)
}
