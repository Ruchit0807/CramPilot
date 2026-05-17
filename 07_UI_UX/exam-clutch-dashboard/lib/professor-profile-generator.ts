// ============================================================
// CramPilot — Professor Profile Generator
// Rule-based engine: survey answers → ProfessorProfile
// ============================================================

import type {
  ProfessorSurveyAnswersV2,
  ProfessorProfile,
  ProfessorArchetype,
  MarksTrap,
  AnswerStyleGuide,
} from '@/types'

// ── Archetype derivation ──────────────────────────────────────

export function deriveArchetypeV2(answers: Partial<ProfessorSurveyAnswersV2>): ProfessorArchetype {
  const {
    markingStyle,
    examFormat,
    pyqConsistency,
    successPattern,
    isStrictChecker,
    derivationsHeavilyMarked,
    conceptualQuestionsCommon,
    repeatsPYQs,
    numericalProblemsImportance,
  } = answers

  // Hard rules first (high specificity)
  if (isStrictChecker === 'yes' && markingStyle === 'strict') return 'strict-marker'
  if (derivationsHeavilyMarked === 'yes' || examFormat === 'derivations' || (numericalProblemsImportance ?? 0) >= 4) {
    return 'problem-setter'
  }
  if (repeatsPYQs === 'yes' || pyqConsistency === 'very-consistent') return 'pyq-repeater'
  if (examFormat === 'case-scenarios') return 'case-analyst'
  if (
    (successPattern === 'memorize-definitions' && examFormat === 'essays') ||
    conceptualQuestionsCommon === 'yes'
  ) return 'theory-scholar'
  if (markingStyle === 'rewards-depth') return 'depth-seeker'
  if (markingStyle === 'rewards-coverage') return 'coverage-checker'
  return 'mixed-generalist'
}

// ── Archetype metadata ────────────────────────────────────────

const ARCHETYPE_META: Record<ProfessorArchetype, {
  label: string
  markingPhilosophy: string
  pyqReliability: number
  difficultyRating: number
}> = {
  'theory-scholar': {
    label: 'Theory Scholar',
    markingPhilosophy: 'Rewards precise definitions, frameworks, and well-cited examples. Deducts for vague answers.',
    pyqReliability: 55,
    difficultyRating: 3,
  },
  'problem-setter': {
    label: 'Problem Setter',
    markingPhilosophy: 'Marks derivations step-by-step. Partial credit given for correct method even if final answer is wrong.',
    pyqReliability: 60,
    difficultyRating: 4,
  },
  'case-analyst': {
    label: 'Case Analyst',
    markingPhilosophy: 'Rewards application of theory to real scenarios. Pure memorization doesn\'t help here.',
    pyqReliability: 45,
    difficultyRating: 4,
  },
  'strict-marker': {
    label: 'Strict Marker',
    markingPhilosophy: 'Deducts for spelling errors, incorrect units, missing diagrams, and deviation from expected structure.',
    pyqReliability: 65,
    difficultyRating: 5,
  },
  'pyq-repeater': {
    label: 'PYQ Repeater',
    markingPhilosophy: 'Frequently reuses past paper questions. Focus on model answers from previous years.',
    pyqReliability: 80,
    difficultyRating: 2,
  },
  'depth-seeker': {
    label: 'Depth Seeker',
    markingPhilosophy: 'Rewards thorough, insightful answers. Depth over breadth. One perfect answer beats three shallow ones.',
    pyqReliability: 50,
    difficultyRating: 4,
  },
  'coverage-checker': {
    label: 'Coverage Checker',
    markingPhilosophy: 'Tests breadth across the full syllabus. Can\'t afford to skip any unit.',
    pyqReliability: 55,
    difficultyRating: 3,
  },
  'mixed-generalist': {
    label: 'Mixed Generalist',
    markingPhilosophy: 'Unpredictable marking style. Focus on covering fundamentals across all topics.',
    pyqReliability: 50,
    difficultyRating: 3,
  },
}

// ── Strategy & marks-trap generation ─────────────────────────

function buildStrategyDetails(
  archetype: ProfessorArchetype,
  answers: Partial<ProfessorSurveyAnswersV2>
): string[] {
  const base: Record<ProfessorArchetype, string[]> = {
    'theory-scholar': [
      'Memorize key definitions — write them out word-for-word',
      'Use the "Define → Explain → Example" structure for every answer',
      'Quote relevant frameworks or models when applicable',
      'Avoid bullet points — write in paragraphs',
    ],
    'problem-setter': [
      'Show every step of derivations — no shortcutting',
      'Write units at each step to earn partial marks',
      'Practice 5+ numerical problems per topic before exam',
      'Attempt derivation questions first, they carry maximum marks',
    ],
    'case-analyst': [
      'Connect every concept to a real-world example',
      'Structure answers as: Situation → Theory Applied → Outcome',
      'Read 2–3 case studies related to each topic',
      'Avoid abstract definitions without application',
    ],
    'strict-marker': [
      'Double-check spelling of all technical terms',
      'Follow answer structure exactly as taught in class',
      'Include all diagrams even when not explicitly asked',
      'Margins, neat handwriting, and headings matter here',
    ],
    'pyq-repeater': [
      'Solve the last 5 years of past papers — this is your primary study strategy',
      'Prepare model answers for the top 15 most repeated questions',
      'PYQs have an ~80% chance of appearing in some form',
      'Spend 60% of your time on PYQ practice, not reading',
    ],
    'depth-seeker': [
      'Pick 3–4 topics and master them completely rather than skimming all',
      'Write answers with clear arguments, evidence, and synthesis',
      'Structure answers with introduction, core argument, and conclusion',
      'Depth of analysis earns more marks than listing points',
    ],
    'coverage-checker': [
      'Cover at least one concept from every unit — do not skip chapters',
      'Prioritize breadth over depth in your revision strategy',
      'Write concise, accurate answers for maximum topic coverage',
      'Use mind maps to ensure all units are touched before the exam',
    ],
    'mixed-generalist': [
      'Balance your prep across all major topics',
      'Focus on fundamentals — definitions, key formulas, one example per concept',
      'Prepare for both theory and numerical questions equally',
      'Attempt all questions — partial marks are available',
    ],
  }

  const tips = [...base[archetype]]

  // Contextual additions from survey answers
  if (answers.diagramsImportance && answers.diagramsImportance >= 4) {
    tips.push('Draw neat, labelled diagrams for every applicable concept')
  }
  if (answers.presentationMatters === 'yes') {
    tips.push('Use underlining, headings, and clean structure — presentation is evaluated')
  }
  if (answers.prefersLongAnswers === 'yes') {
    tips.push('Aim for 200–300 words per answer — padding with examples is acceptable')
  }
  if (answers.prefersLongAnswers === 'no') {
    tips.push('Be concise — this professor cuts marks for unnecessary length')
  }

  return tips
}

function buildMarksTrapList(archetype: ProfessorArchetype): MarksTrap[] {
  const traps: Record<ProfessorArchetype, MarksTrap[]> = {
    'strict-marker': [
      {
        id: 'mt-strict-1',
        title: 'Missing diagram',
        deductionRange: '-1 to -2 marks',
        condition: 'When the topic has a standard diagram (e.g. circuit, graph)',
        prevention: 'Always draw and label the standard diagram for the topic',
        severity: 'high',
      },
      {
        id: 'mt-strict-2',
        title: 'Wrong terminology',
        deductionRange: '-0.5 to -1 mark',
        condition: 'Using informal language instead of technical terms',
        prevention: 'Memorize and use exact technical vocabulary',
        severity: 'medium',
      },
      {
        id: 'mt-strict-3',
        title: 'Incomplete derivation steps',
        deductionRange: '-1 to -3 marks',
        condition: 'Skipping intermediate steps in proofs or derivations',
        prevention: 'Write every step even if it seems obvious',
        severity: 'high',
      },
    ],
    'problem-setter': [
      {
        id: 'mt-ps-1',
        title: 'Missing units',
        deductionRange: '-0.5 to -1 mark',
        condition: 'Writing numerical answers without units',
        prevention: 'Write units at every step of the calculation',
        severity: 'medium',
      },
      {
        id: 'mt-ps-2',
        title: 'Skipped derivation step',
        deductionRange: '-1 to -2 marks',
        condition: 'Jumping directly to the final formula',
        prevention: 'Show the derivation from first principles when asked',
        severity: 'high',
      },
    ],
    'theory-scholar': [
      {
        id: 'mt-ts-1',
        title: 'Vague definition',
        deductionRange: '-1 mark',
        condition: 'Giving an approximate or informal definition',
        prevention: 'Use the textbook definition verbatim for 1-mark questions',
        severity: 'medium',
      },
      {
        id: 'mt-ts-2',
        title: 'No example given',
        deductionRange: '-1 mark',
        condition: 'Explaining a concept without a supporting example',
        prevention: 'Always back up explanations with a concrete example',
        severity: 'low',
      },
    ],
    'pyq-repeater': [
      {
        id: 'mt-pyq-1',
        title: 'Not answering from expected angle',
        deductionRange: '-1 to -2 marks',
        condition: 'The question is from a PYQ but answered from a different perspective than model answer',
        prevention: 'Compare your answer to the model answer for repeated questions',
        severity: 'medium',
      },
    ],
    'case-analyst': [
      {
        id: 'mt-ca-1',
        title: 'Pure theory without application',
        deductionRange: '-2 to -3 marks',
        condition: 'Answering a case question with only definitions and theory',
        prevention: 'Always connect theory to the specific case/scenario given',
        severity: 'high',
      },
    ],
    'depth-seeker': [
      {
        id: 'mt-ds-1',
        title: 'Superficial analysis',
        deductionRange: '-2 marks',
        condition: 'Listing points without developing arguments',
        prevention: 'Elaborate each point with reasoning and evidence',
        severity: 'high',
      },
    ],
    'coverage-checker': [
      {
        id: 'mt-cc-1',
        title: 'Blank attempt on any unit',
        deductionRange: 'Up to -10 marks total',
        condition: 'Leaving an entire unit unattempted',
        prevention: 'Write at least 2–3 points for every question, even if unsure',
        severity: 'high',
      },
    ],
    'mixed-generalist': [
      {
        id: 'mt-mg-1',
        title: 'Leaving questions blank',
        deductionRange: 'Full marks for that question',
        condition: 'Not attempting a question due to uncertainty',
        prevention: 'Always write something — partial credit is usually available',
        severity: 'high',
      },
    ],
  }
  return traps[archetype] ?? []
}

function buildAnswerStyleGuide(
  archetype: ProfessorArchetype,
  answers: Partial<ProfessorSurveyAnswersV2>
): AnswerStyleGuide {
  const diagramExpected = (answers.diagramsImportance ?? 0) >= 3

  const base: Record<ProfessorArchetype, AnswerStyleGuide> = {
    'theory-scholar': {
      structure: ['Define the term/concept', 'Explain with theory', 'Give a real-world example', 'Conclude with significance'],
      openingPhrase: 'According to [theorist/standard definition], ...',
      closingRequirement: 'End with a one-sentence significance or application',
      formatPreferences: ['Paragraphs over bullet points', 'Underline key terms', 'Use proper headings'],
      wordCountGuidance: '200–400 words for 5+ mark questions',
      diagramExpected,
    },
    'problem-setter': {
      structure: ['State the given data', 'Write the formula used', 'Show each derivation step', 'Write the final answer with units'],
      openingPhrase: 'Given: ... ; To find: ...',
      closingRequirement: 'Box the final answer and include units',
      formatPreferences: ['Numbered steps', 'Show all working', 'Draw diagrams for physical setups'],
      wordCountGuidance: 'N/A for numericals — focus on steps',
      diagramExpected: true,
    },
    'case-analyst': {
      structure: ['Identify the key issue in the case', 'Name the relevant theory/framework', 'Apply it to the case', 'Give recommendation or conclusion'],
      openingPhrase: 'The case presents a scenario of ... which relates to ...',
      closingRequirement: 'Always end with a practical recommendation',
      formatPreferences: ['Use frameworks explicitly (e.g. SWOT, Porter\'s)', 'Bullet points for analysis', 'Subheadings for structure'],
      wordCountGuidance: '300–500 words for case questions',
      diagramExpected,
    },
    'strict-marker': {
      structure: ['Definition (verbatim)', 'Explanation with steps', 'Labelled diagram', 'Example if applicable'],
      openingPhrase: undefined,
      closingRequirement: 'Check: all diagrams labelled, all steps shown, correct terminology used',
      formatPreferences: ['Neat handwriting', 'Underline headings', 'Margins and spacing'],
      wordCountGuidance: 'Match the marks: 1 mark ≈ 1–2 lines',
      diagramExpected: true,
    },
    'pyq-repeater': {
      structure: ['Match your answer structure to the PYQ model answer', 'Cover all points from the marking scheme', 'Use same examples as the model answer when possible'],
      openingPhrase: undefined,
      closingRequirement: 'Cross-check with PYQ model answer before exam',
      formatPreferences: ['Same structure as the previous year\'s model answer'],
      wordCountGuidance: 'Same as model answer length',
      diagramExpected,
    },
    'depth-seeker': {
      structure: ['Brief introduction to the topic', 'Core argument with evidence', 'Counter-argument or nuance', 'Synthesis and conclusion'],
      openingPhrase: 'The concept of ... is significant because ...',
      closingRequirement: 'End with a synthesized conclusion that shows understanding beyond surface level',
      formatPreferences: ['Full paragraphs', 'Academic tone', 'No mere listing'],
      wordCountGuidance: '400–600 words for essay questions',
      diagramExpected,
    },
    'coverage-checker': {
      structure: ['One-line definition', '3–5 key points', 'One example', 'Quick conclusion'],
      openingPhrase: undefined,
      closingRequirement: 'Ensure all parts of the question are addressed',
      formatPreferences: ['Bullet points acceptable', 'Concise and complete'],
      wordCountGuidance: '100–200 words; focus on coverage',
      diagramExpected,
    },
    'mixed-generalist': {
      structure: ['Definition', 'Explanation', 'Example', 'Diagram if applicable'],
      openingPhrase: undefined,
      closingRequirement: 'Attempt every question — partial marks add up',
      formatPreferences: ['Balanced between bullets and paragraphs'],
      wordCountGuidance: 'Match marks: ~50 words per mark',
      diagramExpected,
    },
  }
  return base[archetype]
}

function buildProfileSummary(
  archetype: ProfessorArchetype,
  answers: Partial<ProfessorSurveyAnswersV2>
): string {
  const traits: string[] = []

  if (answers.isStrictChecker === 'yes' || archetype === 'strict-marker') {
    traits.push('strict')
  }
  if (answers.conceptualQuestionsCommon === 'yes' || archetype === 'theory-scholar') {
    traits.push('conceptual')
  }
  if (answers.derivationsHeavilyMarked === 'yes' || archetype === 'problem-setter') {
    traits.push('derivation-focused')
  }
  if (answers.repeatsPYQs === 'yes' || archetype === 'pyq-repeater') {
    traits.push('PYQ-dependent')
  }

  const rewardParts: string[] = []
  if ((answers.diagramsImportance ?? 0) >= 4) rewardParts.push('diagrams')
  if (answers.prefersLongAnswers === 'yes') rewardParts.push('structured long answers')
  if (answers.presentationMatters === 'yes') rewardParts.push('neat presentation')

  const archetypeLabelMap: Record<ProfessorArchetype, string> = {
    'strict-marker': 'Strict marker',
    'theory-scholar': 'Theory-focused professor',
    'problem-setter': 'Derivation-heavy professor',
    'case-analyst': 'Case-study focused professor',
    'pyq-repeater': 'PYQ-repeating professor',
    'depth-seeker': 'Depth-seeking professor',
    'coverage-checker': 'Coverage-focused professor',
    'mixed-generalist': 'Mixed-style professor',
  }

  let summary = archetypeLabelMap[archetype]

  if (traits.length > 0 && archetype !== 'strict-marker' && archetype !== 'theory-scholar') {
    summary += ` who is ${traits.slice(0, 2).join(' and ')}`
  }

  if (rewardParts.length > 0) {
    summary += ` — rewards ${rewardParts.join(', ')}`
  }

  return summary + '.'
}

// ── Main generator ────────────────────────────────────────────

let profileCounter = 0

export function generateProfessorProfile(
  answers: Partial<ProfessorSurveyAnswersV2>
): ProfessorProfile {
  const archetype = deriveArchetypeV2(answers)
  const meta = ARCHETYPE_META[archetype]

  return {
    id: `prof_${Date.now()}_${++profileCounter}`,
    archetype,
    archetypeLabel: meta.label,
    surveyAnswers: answers as ProfessorSurveyAnswersV2,
    strategyBrief: buildProfileSummary(archetype, answers),
    strategyDetails: buildStrategyDetails(archetype, answers),
    markingPhilosophy: meta.markingPhilosophy,
    marksTrapList: buildMarksTrapList(archetype),
    answerStyleGuide: buildAnswerStyleGuide(archetype, answers),
    pyqReliability: meta.pyqReliability,
    difficultyRating: meta.difficultyRating,
    profileSummary: buildProfileSummary(archetype, answers),
    createdAt: new Date(),
  }
}
