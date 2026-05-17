// ============================================================
// CramPilot — Professor Type Definitions
// Types for professor intelligence & behavior profiling
// ============================================================

export type ExamFormat =
  | 'definitions'
  | 'problems'
  | 'essays'
  | 'case-scenarios'
  | 'derivations'
  | 'mixed'

export type MarkingStyle =
  | 'fair'
  | 'strict'
  | 'unpredictable'
  | 'rewards-depth'
  | 'rewards-coverage'

export type PYQConsistency =
  | 'very-consistent'
  | 'same-topics-different-angle'
  | 'hard-to-predict'
  | 'no-data'

export type SuccessPattern =
  | 'memorize-definitions'
  | 'practice-problems'
  | 'know-past-papers'
  | 'apply-concepts'
  | 'best-presented'

export type ProfessorArchetype =
  | 'theory-scholar'       // Definition-heavy, rewards scholarly frameworks
  | 'problem-setter'       // Numerical, derivation-focused
  | 'case-analyst'         // Real-world application, analysis
  | 'strict-marker'        // Meticulous, deducts for small errors
  | 'pyq-repeater'         // Repeats past paper questions often
  | 'depth-seeker'         // Rewards thorough, well-structured answers
  | 'coverage-checker'     // Tests breadth across full syllabus
  | 'mixed-generalist'     // Unpredictable, general approach

// ── Extended survey answer types (v2) ─────────────────────────

/** Scale 1–5 (1 = not at all, 5 = extremely important) */
export type ImportanceScale = 1 | 2 | 3 | 4 | 5

export type YesNoMaybe = 'yes' | 'no' | 'sometimes'

/** Original survey answers interface (kept for backwards compat) */
export interface ProfessorSurveyAnswers {
  examFormat: ExamFormat
  successPattern: SuccessPattern
  markingStyle: MarkingStyle
  pyqConsistency: PYQConsistency
  targetMarks: string
  hoursAvailable: number
}

/** Extended survey answers covering all 8 UX questions */
export interface ProfessorSurveyAnswersV2 extends ProfessorSurveyAnswers {
  // Q1: Long answers preferred?
  prefersLongAnswers: YesNoMaybe
  // Q2: Diagrams important?
  diagramsImportance: ImportanceScale
  // Q3: Derivations heavily marked?
  derivationsHeavilyMarked: YesNoMaybe
  // Q4: Repeats PYQs?
  repeatsPYQs: YesNoMaybe
  // Q5: Strict checking?
  isStrictChecker: YesNoMaybe
  // Q6: Conceptual questions common?
  conceptualQuestionsCommon: YesNoMaybe
  // Q7: Numerical problems important?
  numericalProblemsImportance: ImportanceScale
  // Q8: Presentation matters?
  presentationMatters: YesNoMaybe
}

export interface MarksTrap {
  id: string
  title: string
  deductionRange: string    // e.g. "-1 to -2 marks"
  condition: string         // When it applies
  prevention: string        // One-sentence fix
  severity: 'low' | 'medium' | 'high'
}

export interface AnswerStyleGuide {
  structure: string[]        // Recommended answer structure steps
  openingPhrase?: string     // How to open answers
  closingRequirement: string // Must-have closing (e.g. "Always end with conclusion")
  formatPreferences: string[]
  wordCountGuidance?: string
  diagramExpected?: boolean
}

export interface ProfessorProfile {
  id: string
  archetype: ProfessorArchetype
  archetypeLabel: string      // Human-readable, e.g. "Theory Scholar"
  surveyAnswers: ProfessorSurveyAnswersV2
  strategyBrief: string       // One-line preparation brief
  strategyDetails: string[]   // Actionable bullet points
  markingPhilosophy: string   // How they assess answers
  marksTrapList: MarksTrap[]
  answerStyleGuide: AnswerStyleGuide
  pyqReliability: number      // 0–100 percentage of questions from PYQs
  difficultyRating: number    // 1–5
  profileSummary: string      // e.g. "Strict conceptual professor who rewards diagrams"
  createdAt: Date
}
