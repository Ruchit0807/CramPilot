// ============================================================
// CramPilot — Mock Strategy Engine
// Generates dynamic, frontend-only exam strategy data
// ============================================================

import { GeneratedStrategy } from '@/types'

type Mode = 'pass' | '60+' | 'topper'

// Helper to determine mode
function getMode(targetMarks: string): Mode {
  if (targetMarks === 'pass') return 'pass'
  if (targetMarks === '55-70') return '60+'
  return 'topper' // 70-85 or 85+
}

export function generateMockStrategy(params: {
  subject: string
  subjectCategory?: string
  professorArchetype?: string[]
  hoursRemaining: number
  targetMarks: string
  weakTopics: string[]
}): GeneratedStrategy {
  const { subject, subjectCategory = 'mixed', professorArchetype = [], hoursRemaining, weakTopics } = params
  const mode = getMode(params.targetMarks)

  const isEmergency = hoursRemaining <= 12
  const isCritical = hoursRemaining <= 6

  // 1. Emotional State Engine
  let emotionalState: GeneratedStrategy['scores']['emergencyLevel'] = 'stable'
  let survivabilityScore = 85
  let confidenceLevel = 80
  let coveragePercent = 90
  let estimatedMarks = '80–85'

  if (isCritical) {
    emotionalState = 'critical'
    survivabilityScore = mode === 'pass' ? 65 : 45
    confidenceLevel = 50
    coveragePercent = 40
    estimatedMarks = mode === 'pass' ? '40–50' : '55–65'
  } else if (isEmergency) {
    emotionalState = 'emergency'
    survivabilityScore = 75
    confidenceLevel = 65
    coveragePercent = 65
    estimatedMarks = '65–75'
  } else if (hoursRemaining > 48) {
    emotionalState = 'recovering'
    survivabilityScore = 95
    confidenceLevel = 90
    coveragePercent = 100
    estimatedMarks = '85–95'
  }

  // Adjust scores based on subject category
  if (subjectCategory === 'derivation-heavy' || subjectCategory === 'numerical-heavy') {
    survivabilityScore -= 10
    confidenceLevel -= 5
  } else if (subjectCategory === 'memorization-heavy') {
    survivabilityScore += 5
    confidenceLevel += 10
  }

  let recoveryChance = 'High'
  let examRiskLevel: 'Recoverable' | 'High Risk' | 'Stable' | 'Critical Survival Mode' = 'Stable'
  let confidenceStatus = 'Confident'

  if (survivabilityScore < 50) {
    recoveryChance = 'Low'
    examRiskLevel = 'Critical Survival Mode'
    confidenceStatus = 'Panicking'
  } else if (survivabilityScore < 70) {
    recoveryChance = 'Moderate'
    examRiskLevel = 'High Risk'
    confidenceStatus = 'Anxious'
  } else if (survivabilityScore < 85) {
    recoveryChance = 'High'
    examRiskLevel = 'Recoverable'
    confidenceStatus = 'Cautiously Optimistic'
  }

  // 2. Topic Prioritization with "Safe to Skip" logic
  // Generate 8 mock topics dynamically
  const baseTopics = [
    'Core Fundamentals',
    'Advanced Applications',
    'Theoretical Proofs',
    'Numerical Problems',
    'Edge Cases & Exceptions',
    'Historical Context',
    'Complex Derivations',
    'Applied Case Studies',
  ]

  // Add user's weak topics to the start
  const allTopicNames = [...new Set([...weakTopics, ...baseTopics])].slice(0, 8)

  const topics: GeneratedStrategy['topics'] = allTopicNames.map((name, i) => {
    let priority: 'critical' | 'high' | 'moderate' | 'skip' = 'moderate'
    let safeToSkipReason = undefined
    const pyqFreq = Math.max(0, 5 - i)
    const isWeak = weakTopics.includes(name)

    // Mode-based and Time-based prioritization
    if (isCritical) {
      if (i < 2 || isWeak) priority = 'critical'
      else {
        priority = 'skip'
        safeToSkipReason = 'Not enough time. High risk, low ROI.'
      }
    } else if (isEmergency) {
      if (i < 3 || isWeak) priority = 'critical'
      else if (i < 5) priority = 'high'
      else {
        priority = 'skip'
        safeToSkipReason = 'Focus on high-yield PYQ topics instead.'
      }
    } else {
      if (i < 2 || (isWeak && mode === 'topper')) priority = 'critical'
      else if (i < 5) priority = 'high'
      else if (mode === 'pass') {
        priority = 'skip'
        safeToSkipReason = 'You only need to pass. This is unnecessary.'
      }
    }

    if (priority === 'skip' && !safeToSkipReason) {
      safeToSkipReason = `Why This Matters: Zero PYQ appearances — skip to save ${isWeak ? 2.5 : 1.5} hours of revision time.`
    }

    return {
      id: `t${i}`,
      name: name === 'Core Fundamentals' ? `${subject} Basics` : name,
      priority,
      marks: Math.max(4, 15 - i * 2),
      pyqFreq,
      hoursNeeded: priority === 'skip' ? 0 : isWeak ? 2.5 : 1.5,
      isWeak,
      appearedIn: pyqFreq > 3 ? '2023, 2022, 2021' : pyqFreq > 0 ? '2023' : 'Never',
      safeToSkipReason,
    }
  })

  // 3. AI Workflows with explanations
  const workflows: GeneratedStrategy['workflows'] = [
    {
      id: 'wf1',
      phase: 'Phase 1 · Learn',
      title: 'Deep Concept Loading',
      tool: 'claude',
      toolLabel: 'Claude',
      toolColor: '#F97316',
      duration: `${Math.max(1, Math.floor(hoursRemaining * 0.3))} hours`,
      topics: topics.filter((t) => t.priority === 'critical').map((t) => t.name),
      purpose: 'Build strong mental models with step-by-step explanations',
      explanation: 'Why This Matters: Claude is the only tool that can break down derivation-heavy concepts into intuitive steps without skipping logic.',
      icon: '🧠',
    },
    {
      id: 'wf2',
      phase: 'Phase 2 · Practice',
      title: 'Problem-Solving Practice',
      tool: 'chatgpt',
      toolLabel: 'ChatGPT',
      toolColor: '#10B981',
      duration: `${Math.max(1, Math.floor(hoursRemaining * 0.4))} hours`,
      topics: weakTopics.length > 0 ? weakTopics : ['All Critical Topics'],
      purpose: 'Solve exam-style problems with guided hints if stuck',
      explanation: 'Why This Matters: Active recall through practice problems is the highest ROI activity for long-term retention.',
      icon: '⚡',
    },
  ]

  if (!isCritical) {
    workflows.push({
      id: 'wf3',
      phase: 'Phase 3 · Audio',
      title: 'Audio Source Memorization',
      tool: 'notebooklm',
      toolLabel: 'NotebookLM',
      toolColor: '#8B5CF6',
      duration: '1 hour',
      topics: ['All Topics'],
      purpose: 'Generate audio podcast, listen while resting',
      explanation: 'Why This Matters: Your brain solidifies memories during rest. Audio revision turns downtime into passive study.',
      icon: '🎧',
    })
  }

  workflows.push({
    id: 'wf4',
    phase: isCritical ? 'Phase 3 · Revise' : 'Phase 4 · Revise',
    title: 'Final Rapid Revision',
    tool: 'gemini',
    toolLabel: 'Gemini',
    toolColor: '#3B82F6',
    duration: `${Math.max(1, Math.floor(hoursRemaining * 0.15))} hours`,
    topics: ['All Critical Topics'],
    purpose: 'Generate last-minute cheat sheets and formula cards',
    explanation: 'Why This Matters: Concise visual summaries right before the exam reduce panic and keep concepts fresh.',
    icon: '🚀',
  })

  // 4. Prompts
  const prompts = [
    {
      id: 'p1', tool: 'claude', toolLabel: 'Claude', toolColor: '#F97316', toolUrl: 'https://claude.ai',
      badge: 'Deep Learn', badgeColor: '#F97316',
      title: `Concept Master — ${weakTopics[0] || subject}`,
      purpose: 'Build deep intuition for complex derivations',
      estimatedMinutes: 25,
      body: `I have an exam in ${hoursRemaining} hours on ${subject}.\nTeach me ${weakTopics[0] || 'the core concepts'} with step-by-step walkthroughs and common exam traps.`,
      isPro: false,
    },
    {
      id: 'p2', tool: 'chatgpt', toolLabel: 'ChatGPT', toolColor: '#10B981', toolUrl: 'https://chat.openai.com',
      badge: 'Practice', badgeColor: '#10B981',
      title: '5 Exam Problems',
      purpose: 'Solve real exam-style problems',
      estimatedMinutes: 45,
      body: `Give me 5 exam-style problems for ${subject} ordered from easy to hard. Provide hints only if I ask.`,
      isPro: false,
    },
  ]

  // 5. Timeline (Roadmap)
  const timeline = []
  let currentHour = 18 // Start at 6:00 PM for mock purposes
  
  timeline.push({
    id: 'b1', startTime: '6:00 PM', endTime: '6:30 PM', durationMin: 30,
    type: 'study', urgency: emotionalState === 'critical' ? 'critical' : 'high',
    label: 'Triage & Plan Review', topic: 'Strategy Setup',
    tool: 'claude', method: 'deep-learn',
    promptHint: `"Confirm my ${hoursRemaining}h ${subject} study plan"`,
    isCheckpoint: true, checkpointLabel: 'Plan locked ✓', pyqFrequency: 0,
  })

  timeline.push({
    id: 'b2', startTime: '6:30 PM', endTime: '8:30 PM', durationMin: 120,
    type: 'study', urgency: 'critical',
    label: topics[0].name, topic: topics[0].name,
    tool: 'claude', method: 'deep-learn',
    promptHint: `"Teach ${topics[0].name} for exam"`,
    pyqFrequency: 5, isWeak: topics[0].isWeak,
  })

  timeline.push({
    id: 'b3', startTime: '8:30 PM', endTime: '8:45 PM', durationMin: 15,
    type: 'break', urgency: 'low',
    label: 'Break — Hydrate', topic: 'Walk, drink water, no screens',
    tool: null, method: null,
  })

  // Add more dynamic blocks based on hours
  if (hoursRemaining > 6) {
    timeline.push({
      id: 'b4', startTime: '8:45 PM', endTime: '10:45 PM', durationMin: 120,
      type: 'study', urgency: 'high',
      label: topics[1]?.name || 'Secondary Topic', topic: topics[1]?.name || 'Practice',
      tool: 'chatgpt', method: 'practice',
      promptHint: `"Practice problems for ${topics[1]?.name}"`,
      pyqFrequency: 4, isWeak: topics[1]?.isWeak,
      isCheckpoint: true, checkpointLabel: 'First major block done ✓'
    })
  }

  timeline.push({
    id: 'b-exam', startTime: '10:00 AM', endTime: '1:00 PM', durationMin: 180,
    type: 'exam', urgency: 'critical',
    label: '📝 EXAM — Execute', topic: subject,
    tool: null, method: null,
  })


  return {
    scores: {
      survivabilityScore,
      confidenceLevel,
      coveragePercent,
      estimatedMarks,
      emergencyLevel: emotionalState,
      aiConfidence: confidenceLevel + 5,
      recoveryChance,
      examRiskLevel,
      confidenceStatus,
    },
    topics,
    workflows,
    prompts,
    revisionStrategy: [
      { id: 'rs1', label: 'Active Recall', description: 'After reading each topic, close notes and write everything you remember.', icon: '🧠', color: '#818CF8' },
      { id: 'rs2', label: 'Spaced Repetition', description: 'Review critical topics at: 1h, 4h, and exam morning.', icon: '🔁', color: '#4ADE80' },
      ...(subjectCategory === 'memorization-heavy' ? [{ id: 'rs3', label: 'Mnemonic Association', description: 'Create visual memory hooks for factual data.', icon: '👁️', color: '#FBBF24' }] : []),
      ...(subjectCategory === 'numerical-heavy' ? [{ id: 'rs4', label: 'Formula Drill', description: 'Write all formulas repeatedly without looking.', icon: '🔢', color: '#F87171' }] : []),
    ],
    flashcards: [
      { q: `What is the core formula for ${subject}?`, a: 'Depends on the exact application, always check edge cases.', topic: 'Fundamentals' },
      { q: `How do you handle exceptions in ${weakTopics[0] || 'this topic'}?`, a: 'Isolate the base case and handle it first.', topic: weakTopics[0] || 'Core' },
      ...(subjectCategory === 'conceptual' ? [{ q: `Explain the fundamental theory behind ${weakTopics[0] || subject}?`, a: 'Ensure you focus on the underlying physical or logical meaning before formulas.', topic: 'Theory' }] : [])
    ],
    audioRecommendations: [
      { id: 'ar1', title: `${subject} Audio Overview`, duration: '15 min', tool: 'notebooklm', description: 'Upload notes → generate audio' },
    ],
    timeline,
    professorTips: [
      ...(professorArchetype.includes('strict') ? [{ id: 'pt1', tip: 'Strict Marker: Always show full working for maximum marks. Do not skip steps.', urgency: 'critical' }] : []),
      ...(professorArchetype.includes('conceptual') ? [{ id: 'pt2', tip: 'Concept Seeker: Focus on the "why". Include theoretical justifications before jumping to math.', urgency: 'high' }] : []),
      ...(professorArchetype.includes('previous') ? [{ id: 'pt3', tip: 'PYQ Repeater: Highly likely to repeat questions from 2021-2023 papers.', urgency: 'critical' }] : []),
      ...(professorArchetype.includes('numerical') ? [{ id: 'pt4', tip: 'Problem Setter: Expect unseen numericals. Memorize core formulas and edge cases.', urgency: 'high' }] : []),
      ...(professorArchetype.length === 0 ? [{ id: 'pt5', tip: 'Unknown Professor: Focus strictly on syllabus and recent past papers.', urgency: 'moderate' }] : []),
    ]
  }
}
