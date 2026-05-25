import type { GeneratedStrategy } from '@/types'

export function getFallbackStrategy(params: {
  subject: string
  subjectCategory: string
  hoursRemaining: number
  targetMarks: string
  weakTopics: string[]
  examMode?: string
}): GeneratedStrategy {
  const { subject, hoursRemaining, targetMarks, weakTopics, examMode = 'standard' } = params

  const survivability = targetMarks === 'pass' ? 80 : 50
  
  return {
    scores: {
      survivabilityScore: survivability,
      confidenceLevel: survivability - 10,
      coveragePercent: 50,
      estimatedMarks: targetMarks,
      emergencyLevel: hoursRemaining <= 12 ? 'emergency' : 'stable',
      aiConfidence: 100,
      recoveryChance: survivability > 60 ? 'High' : 'Medium',
      examRiskLevel: hoursRemaining <= 12 ? 'High Risk' : 'Stable',
      confidenceStatus: 'Fallback Generation Active'
    },
    topics: weakTopics.length > 0 ? weakTopics.map((topic, index) => ({
      id: `topic-${index}`,
      name: topic,
      priority: index === 0 ? 'critical' : 'high',
      marks: 10,
      pyqFreq: 3,
      hoursNeeded: Math.max(1, Math.floor(hoursRemaining / weakTopics.length)),
      isWeak: true,
      appearedIn: 'Recent PYQs',
    })) : [
      {
        id: 'topic-1',
        name: 'Core Fundamentals',
        priority: 'critical',
        marks: 20,
        pyqFreq: 5,
        hoursNeeded: Math.max(2, Math.floor(hoursRemaining * 0.4)),
        isWeak: false,
        appearedIn: 'Every Year',
      }
    ],
    workflows: [
      {
        id: 'wf-1',
        phase: 'triage',
        title: 'Emergency Review',
        tool: 'chatgpt',
        toolLabel: 'ChatGPT',
        toolColor: '#10A37F',
        duration: `${Math.floor(hoursRemaining * 0.4)}h`,
        topics: weakTopics.length > 0 ? weakTopics : ['Core Fundamentals'],
        purpose: 'Understand the basics required to pass.',
        explanation: 'Focus on the most heavily weighted topics first. Do not learn anything new.',
        icon: 'Flame'
      }
    ],
    prompts: [],
    revisionStrategy: [],
    flashcards: [],
    audioRecommendations: [],
    timeline: [
      {
        id: 'phase-1',
        title: 'Phase 1: Triage',
        timeAllocation: Math.floor(hoursRemaining * 0.4),
        description: 'Focus on high-weightage topics.',
      },
      {
        id: 'phase-2',
        title: 'Phase 2: PYQ Review',
        timeAllocation: Math.floor(hoursRemaining * 0.4),
        description: 'Solve past year questions.',
      }
    ],
    professorTips: [
      {
        tip: 'Focus only on what you can confidently complete.',
        context: 'Fallback emergency plan.'
      }
    ]
  }
}
