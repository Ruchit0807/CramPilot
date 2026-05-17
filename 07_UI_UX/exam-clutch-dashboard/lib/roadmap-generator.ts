// ============================================================
// CramPilot — Roadmap Generator
// Builds the hour-by-hour study schedule from session data
// ============================================================

import type { Topic, WorkflowPhase } from '@/types'
import type { StudyRoadmap, RoadmapBlock, DayPlan } from '@/types'
import type { AITool, EmergencyLevel } from '@/types'
import { formatTimeLabel } from './format'

export interface RoadmapGeneratorInput {
  sessionId: string
  subject: string
  hoursRemaining: number
  topics: Topic[]
  examDatetime?: Date
  emergencyLevel?: EmergencyLevel
}

const BREAK_INTERVAL_MINUTES = 90  // Break every 90 min of study
const BREAK_DURATION_MINUTES = 10
const SLEEP_THRESHOLD_HOUR = 2     // Stop studying after 2 AM

function getRecommendedTool(taskType: string, index: number): AITool {
  const tools: AITool[] = ['chatgpt', 'claude', 'gemini', 'chatgpt']
  return tools[index % tools.length]
}

function createTimeBlock(
  startDate: Date,
  durationMinutes: number,
  topic: Topic | null,
  type: RoadmapBlock['type'],
  phase: string,
  blockIndex: number
): RoadmapBlock {
  const endDate = new Date(startDate.getTime() + durationMinutes * 60000)

  if (type === 'break') {
    return {
      id: `break_${blockIndex}`,
      order: blockIndex,
      startTime: formatTimeLabel(startDate),
      endTime: formatTimeLabel(endDate),
      durationMinutes,
      type: 'break',
      isCompleted: false,
      icon: 'Coffee',
      label: 'Short Break',
      detail: 'Step away from your screen. Hydrate. Return sharp.',
    }
  }

  if (type === 'stop') {
    return {
      id: `stop_${blockIndex}`,
      order: blockIndex,
      startTime: formatTimeLabel(startDate),
      endTime: formatTimeLabel(endDate),
      durationMinutes: 0,
      type: 'stop',
      isCompleted: false,
      icon: 'Moon',
      label: 'Stop studying',
      detail: 'Sleep is now more valuable than content. Rest well.',
    }
  }

  if (!topic) {
    return {
      id: `block_${blockIndex}`,
      order: blockIndex,
      startTime: formatTimeLabel(startDate),
      endTime: formatTimeLabel(endDate),
      durationMinutes,
      type: 'study',
      isCompleted: false,
      icon: 'BookOpen',
      label: 'Study Block',
    }
  }

  const isConceptLoad = blockIndex % 3 === 0
  const isPractice = blockIndex % 3 === 2
  const taskType = isConceptLoad ? 'concept-load' : isPractice ? 'practice-questions' : 'deep-understanding'
  const icon = isConceptLoad ? 'BookOpen' : isPractice ? 'PenLine' : 'Brain'
  const label = isConceptLoad
    ? `${topic.name} — Concept Load`
    : isPractice
    ? `${topic.name} — Practice`
    : `${topic.name} — Deep Understanding`

  return {
    id: `block_${blockIndex}`,
    order: blockIndex,
    startTime: formatTimeLabel(startDate),
    endTime: formatTimeLabel(endDate),
    durationMinutes,
    type: 'study',
    phase: phase as WorkflowPhase,
    topicName: topic.name,
    topicPriority: topic.priority,
    taskType,
    toolRecommended: getRecommendedTool(taskType, blockIndex),
    isCompleted: false,
    icon,
    label,
    detail: `Focus on ${topic.name}. Use the provided prompt with your recommended AI tool.`,
  }
}

export function generateStudyRoadmap(input: RoadmapGeneratorInput): StudyRoadmap {
  const {
    sessionId,
    subject,
    hoursRemaining,
    topics,
    examDatetime,
    emergencyLevel = 'medium',
  } = input

  const startDatetime = new Date()
  const examDt = examDatetime ?? new Date(startDatetime.getTime() + hoursRemaining * 3600000)

  const studyableTopics = topics.filter((t) => t.priority !== 'skip')
  const skipList = topics.filter((t) => t.priority === 'skip').map((t) => t.name)
  const criticalPath = topics
    .filter((t) => t.priority === 'critical')
    .sort((a, b) => (b.marks ?? 0) - (a.marks ?? 0))
    .map((t) => t.id)

  const blocks: RoadmapBlock[] = []
  let currentTime = new Date(startDatetime)
  let blockIndex = 0
  let studyMinutesSinceBreak = 0

  for (const topic of studyableTopics) {
    const totalMin = topic.estimatedMinutes
    const chunkCount = Math.ceil(totalMin / 45)

    for (let i = 0; i < chunkCount; i++) {
      const chunkMin = Math.min(45, totalMin - i * 45)

      // Check if we should insert a break
      if (studyMinutesSinceBreak >= BREAK_INTERVAL_MINUTES) {
        const breakBlock = createTimeBlock(currentTime, BREAK_DURATION_MINUTES, null, 'break', '', blockIndex++)
        blocks.push(breakBlock)
        currentTime = new Date(currentTime.getTime() + BREAK_DURATION_MINUTES * 60000)
        studyMinutesSinceBreak = 0
      }

      // Check if past sleep threshold (2 AM)
      if (currentTime.getHours() >= SLEEP_THRESHOLD_HOUR && currentTime.getHours() < 6) {
        const stopBlock = createTimeBlock(currentTime, 0, null, 'stop', '', blockIndex++)
        blocks.push(stopBlock)
        // Jump to 8 AM next day
        const nextDay = new Date(currentTime)
        nextDay.setHours(8, 0, 0, 0)
        nextDay.setDate(nextDay.getDate() + 1)
        currentTime = nextDay
        studyMinutesSinceBreak = 0
      }

      const studyBlock = createTimeBlock(
        currentTime,
        chunkMin,
        topic,
        'study',
        'coverage',
        blockIndex
      )
      blocks.push(studyBlock)
      currentTime = new Date(currentTime.getTime() + chunkMin * 60000)
      studyMinutesSinceBreak += chunkMin
      blockIndex++
    }
  }

  // Exam day block
  const examBlock: RoadmapBlock = {
    id: 'exam_day',
    order: blockIndex++,
    startTime: formatTimeLabel(new Date(examDt.getTime() - 30 * 60000)),
    endTime: formatTimeLabel(examDt),
    durationMinutes: 30,
    type: 'exam-day',
    isCompleted: false,
    icon: 'GraduationCap',
    label: 'Exam time',
    detail: 'Arrive early. You are prepared.',
  }
  blocks.push(examBlock)

  // Group blocks into days
  const dayMap = new Map<string, RoadmapBlock[]>()
  for (const block of blocks) {
    // We'll use order to group — simplified: first 60% today, rest tomorrow
    const dayKey = block.order < Math.ceil(blocks.length * 0.6) ? 'today' : 'tomorrow'
    if (!dayMap.has(dayKey)) dayMap.set(dayKey, [])
    dayMap.get(dayKey)!.push(block)
  }

  const days: DayPlan[] = Array.from(dayMap.entries()).map(([label, dayBlocks]) => ({
    label: label as DayPlan['label'],
    date: new Date().toISOString(),
    blocks: dayBlocks,
    totalStudyMinutes: dayBlocks
      .filter((b) => b.type === 'study')
      .reduce((s, b) => s + b.durationMinutes, 0),
    totalBreakMinutes: dayBlocks
      .filter((b) => b.type === 'break')
      .reduce((s, b) => s + b.durationMinutes, 0),
    topicsCovered: [
      ...new Set(
        dayBlocks
          .filter((b) => b.topicName)
          .map((b) => b.topicName!)
      ),
    ],
  }))

  const criticalTopics = topics.filter((t) => t.priority === 'critical')
  const hoursPerTopic =
    criticalTopics.length > 0
      ? parseFloat((hoursRemaining / criticalTopics.length).toFixed(1))
      : hoursRemaining

  return {
    sessionId,
    emergencyLevel,
    totalHours: hoursRemaining,
    examDatetime: examDt.toISOString(),
    startDatetime: startDatetime.toISOString(),
    days,
    skipList,
    criticalPath,
    estimatedCoveragePercent: Math.min(
      100,
      Math.round((studyableTopics.length / topics.length) * 100)
    ),
    timeCalculation: {
      hoursAvailable: hoursRemaining,
      criticalTopicCount: criticalTopics.length,
      hoursPerTopic,
      message: `You have ${hoursRemaining} hours and ${criticalTopics.length} critical topics — ${hoursPerTopic}h each. This plan is achievable.`,
    },
    generatedAt: new Date(),
  }
}
