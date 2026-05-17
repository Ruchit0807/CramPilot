// ============================================================
// CramPilot — Mock Professor Profiles
// Realistic professor archetypes with marks traps and strategies
// ============================================================

import type { ProfessorProfile } from '@/types'

export const MOCK_PROFESSORS: ProfessorProfile[] = [
  {
    id: 'prof_theory_scholar_01',
    archetype: 'theory-scholar',
    archetypeLabel: 'Theory Scholar',
    surveyAnswers: {
      examFormat: 'essays',
      successPattern: 'memorize-definitions',
      markingStyle: 'strict',
      pyqConsistency: 'same-topics-different-angle',
      targetMarks: '70-85',
      hoursAvailable: 18,
      prefersLongAnswers: 'yes',
      diagramsImportance: 2,
      derivationsHeavilyMarked: 'no',
      repeatsPYQs: 'sometimes',
      isStrictChecker: 'yes',
      conceptualQuestionsCommon: 'yes',
      numericalProblemsImportance: 1,
      presentationMatters: 'yes',
    },
    strategyBrief:
      'This professor values theoretical precision above all else.',
    strategyDetails: [
      'Memorize key definitions verbatim — write them out',
      'Use the "Define → Explain → Example" answer structure',
      'Quote relevant frameworks or models when applicable',
      'Write in formal academic paragraphs, not bullet points',
      'Always end with a clear conclusion paragraph',
    ],
    profileSummary: 'Theory-focused professor who is strict and conceptual — rewards structured long answers and neat presentation.',
    markingPhilosophy:
      'Rewards students who demonstrate command of the conceptual vocabulary. Values structure — introduction, body, conclusion — over creative insight. Penalizes missing structural elements harshly.',
    marksTrapList: [
      {
        id: 'mt_01',
        title: 'Missing conclusion paragraph',
        deductionRange: '-1 to -2 marks',
        condition: 'Every long-form answer without a dedicated conclusion paragraph',
        prevention: 'Always end with a 2-3 sentence conclusion that restates your thesis.',
        severity: 'high',
      },
      {
        id: 'mt_02',
        title: 'Informal language',
        deductionRange: '-0.5 to -1 mark',
        condition: 'Colloquial expressions or informal phrasing in academic answers',
        prevention: 'Use formal academic language. Avoid contractions and casual terms.',
        severity: 'medium',
      },
      {
        id: 'mt_03',
        title: 'Definition not stated in the opening',
        deductionRange: '-1 mark',
        condition: 'Answers that begin with analysis without first defining the key term',
        prevention: 'Open every answer with the precise legal or academic definition.',
        severity: 'high',
      },
    ],
    answerStyleGuide: {
      structure: [
        'Open with precise statutory/scholarly definition',
        'State the legal test or framework by name',
        'Apply facts to each element of the test',
        'Cite case law or textbook authority',
        'Write a clear conclusion restating your position',
      ],
      openingPhrase: 'The doctrine of [CONCEPT] is defined as...',
      closingRequirement: 'Always end with a conclusion paragraph restating your answer.',
      formatPreferences: ['Paragraphs (no bullet points)', 'Case citations in parentheses', 'Numbered steps for multi-part answers'],
      wordCountGuidance: '400–600 words per 10-mark answer',
      diagramExpected: false,
    },
    pyqReliability: 72,
    difficultyRating: 4,
    createdAt: new Date('2026-01-01'),
  },
  {
    id: 'prof_problem_setter_01',
    archetype: 'problem-setter',
    archetypeLabel: 'Problem Setter',
    surveyAnswers: {
      examFormat: 'problems',
      successPattern: 'practice-problems',
      markingStyle: 'strict',
      pyqConsistency: 'same-topics-different-angle',
      targetMarks: '70-85',
      hoursAvailable: 18,
      prefersLongAnswers: 'no',
      diagramsImportance: 5,
      derivationsHeavilyMarked: 'yes',
      repeatsPYQs: 'sometimes',
      isStrictChecker: 'yes',
      conceptualQuestionsCommon: 'no',
      numericalProblemsImportance: 5,
      presentationMatters: 'yes',
    },
    strategyBrief:
      'Derivation-heavy professor — rewards step-by-step working and correct units.',
    strategyDetails: [
      'Show every step of derivations — no shortcutting',
      'Write units at each step to earn partial marks',
      'Practice 5+ numerical problems per topic before exam',
      'Attempt derivation questions first, they carry maximum marks',
      'Draw neat, labelled diagrams for every applicable concept',
    ],
    profileSummary: 'Derivation-heavy professor who is strict — rewards step-by-step working, diagrams and correct units.',
    markingPhilosophy:
      'Step-by-step method matters more than the final answer. Correct setup with arithmetic error: partial credit. Missing intermediate steps: no partial credit.',
    marksTrapList: [
      {
        id: 'mt_04',
        title: 'Missing units in numerical answers',
        deductionRange: '-0.5 to -1 mark per question',
        condition: 'Any numerical answer submitted without units (e.g., "42" instead of "42 J/mol")',
        prevention: 'Always write the unit after every numerical answer.',
        severity: 'high',
      },
      {
        id: 'mt_05',
        title: 'Formula stated without derivation',
        deductionRange: '-1 to -2 marks',
        condition: 'Applying formula directly without showing where it comes from (in derivation questions)',
        prevention: 'In derivation questions, derive the formula from first principles before applying.',
        severity: 'medium',
      },
      {
        id: 'mt_06',
        title: 'Skipping intermediate steps',
        deductionRange: '-0.5 mark per skipped step',
        condition: 'Going from step 1 to step 4 without showing steps 2 and 3',
        prevention: 'Show every algebraic step, even if it seems obvious.',
        severity: 'high',
      },
    ],
    answerStyleGuide: {
      structure: [
        'State given data clearly (list format)',
        'Write the governing formula or principle',
        'Substitute values with units',
        'Show all calculation steps',
        'Box the final answer with units',
      ],
      closingRequirement: 'Box your final numerical answer. Include units.',
      formatPreferences: ['Step-by-step layout', 'Diagrams where applicable', 'Given/Find/Solution structure'],
      diagramExpected: true,
    },
    pyqReliability: 80,
    difficultyRating: 4,
    createdAt: new Date('2026-01-01'),
  },
  {
    id: 'prof_pyq_repeater_01',
    archetype: 'pyq-repeater',
    archetypeLabel: 'PYQ Repeater',
    surveyAnswers: {
      examFormat: 'mixed',
      successPattern: 'know-past-papers',
      markingStyle: 'fair',
      pyqConsistency: 'very-consistent',
      targetMarks: '70-85',
      hoursAvailable: 18,
      prefersLongAnswers: 'sometimes',
      diagramsImportance: 2,
      derivationsHeavilyMarked: 'no',
      repeatsPYQs: 'yes',
      isStrictChecker: 'no',
      conceptualQuestionsCommon: 'sometimes',
      numericalProblemsImportance: 2,
      presentationMatters: 'no',
    },
    strategyBrief:
      'PYQ-repeating professor — solving past papers covers 80% of your exam.',
    strategyDetails: [
      'Solve the last 5 years of past papers — this is your primary study strategy',
      'Prepare model answers for the top 15 most repeated questions',
      'PYQs have an ~80% chance of appearing in some form',
      'Spend 60% of your time on PYQ practice, not reading',
    ],
    profileSummary: 'PYQ-dependent professor — solving past papers is your most efficient preparation strategy.',
    markingPhilosophy:
      'Fair and straightforward. Expects standard answers aligned with the textbook. Students who know past papers well consistently outperform those who study comprehensively.',
    marksTrapList: [
      {
        id: 'mt_07',
        title: 'Answering a different version of the question',
        deductionRange: '-2 to -5 marks',
        condition: 'Student recognizes a past paper question but answers the old version instead of the current wording',
        prevention: 'Read the current question carefully even when it looks familiar. Small modifications change the required answer.',
        severity: 'high',
      },
    ],
    answerStyleGuide: {
      structure: [
        'Match your answer structure to the PYQ model answer',
        'Use the same key terms the question uses',
        'Keep answers within the implied word count (marks × 80 words)',
        'Add one original point if possible to differentiate',
      ],
      closingRequirement: 'End with a clear answer to the question asked.',
      formatPreferences: ['Textbook-aligned structure', 'Bullet points acceptable for 5+ mark answers', 'Diagrams only if present in PYQ answers'],
    },
    pyqReliability: 85,
    difficultyRating: 2,
    createdAt: new Date('2026-01-01'),
  },
]

export const MOCK_PROFESSOR_MAP: Record<string, ProfessorProfile> = Object.fromEntries(
  MOCK_PROFESSORS.map((p) => [p.id, p])
)
