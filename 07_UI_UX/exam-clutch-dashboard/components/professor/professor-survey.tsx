'use client'
// ============================================================
// CramPilot — Professor Survey
// Multi-step, panic-friendly professor profiling flow
// Mobile-first, large tap targets, smooth Framer Motion transitions
// ============================================================

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  PenLine,
  Calculator,
  RotateCcw,
  Zap,
  Lightbulb,
  Hash,
  Layout,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  Brain,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useProfessorStore } from '@/store/professor.store'
import type { ProfessorSurveyAnswersV2, YesNoMaybe, ImportanceScale } from '@/types'
import { generateProfessorProfile } from '@/lib/professor-profile-generator'
import { ProfessorProfileCard } from './professor-profile-card'

// ── Question definitions ──────────────────────────────────────

type QuestionType = 'yes-no-maybe' | 'importance-scale' | 'choice-cards'

interface SurveyQuestion {
  id: keyof ProfessorSurveyAnswersV2
  type: QuestionType
  icon: React.ReactNode
  shortLabel: string
  headline: string
  subtext: string
  panicTip?: string
}

const QUESTIONS: SurveyQuestion[] = [
  {
    id: 'prefersLongAnswers',
    type: 'yes-no-maybe',
    icon: <BookOpen className="w-5 h-5" />,
    shortLabel: 'Long Answers',
    headline: 'Does your professor prefer long, detailed answers?',
    subtext: 'Think about past paper model answers or how they explain marks breakdown.',
    panicTip: 'Long answer professors reward structure over brevity.',
  },
  {
    id: 'diagramsImportance',
    type: 'importance-scale',
    icon: <PenLine className="w-5 h-5" />,
    shortLabel: 'Diagrams',
    headline: 'How important are diagrams and visual representations?',
    subtext: 'Do they mark you down for missing a diagram? Does the syllabus have many diagram-based topics?',
    panicTip: 'If diagrams are important, drawing one (even rough) can save 1–2 marks.',
  },
  {
    id: 'derivationsHeavilyMarked',
    type: 'yes-no-maybe',
    icon: <Hash className="w-5 h-5" />,
    shortLabel: 'Derivations',
    headline: 'Are derivations and proofs heavily marked?',
    subtext: 'Does the professor ask you to derive formulas step-by-step rather than just state them?',
    panicTip: 'Show every derivation step — partial marks are given for correct method.',
  },
  {
    id: 'repeatsPYQs',
    type: 'yes-no-maybe',
    icon: <RotateCcw className="w-5 h-5" />,
    shortLabel: 'Repeats PYQs',
    headline: 'Does the professor repeat past year questions (PYQs)?',
    subtext: 'Look at the last 3–5 years. How many questions appeared verbatim or nearly identical?',
    panicTip: 'High PYQ repetition = your fastest path to marks. Solve them first.',
  },
  {
    id: 'isStrictChecker',
    type: 'yes-no-maybe',
    icon: <Zap className="w-5 h-5" />,
    shortLabel: 'Strict Checking',
    headline: 'Is the professor known for strict, meticulous checking?',
    subtext: 'Do they deduct for spelling, missing steps, incorrect units, or sloppy handwriting?',
    panicTip: 'Strict professors reward structure. Neat, well-organized answers score higher.',
  },
  {
    id: 'conceptualQuestionsCommon',
    type: 'yes-no-maybe',
    icon: <Lightbulb className="w-5 h-5" />,
    shortLabel: 'Conceptual',
    headline: 'Are conceptual "why/how" questions common?',
    subtext: 'Do they ask you to explain concepts, compare theories, or analyze rather than just recall facts?',
    panicTip: 'For conceptual profs, understand the "why" behind each topic — not just definitions.',
  },
  {
    id: 'numericalProblemsImportance',
    type: 'importance-scale',
    icon: <Calculator className="w-5 h-5" />,
    shortLabel: 'Numericals',
    headline: 'How important are numerical / calculation problems?',
    subtext: 'What percentage of marks typically come from numerical solving vs theory?',
    panicTip: 'Numericals professors need you to practice problems, not just read theory.',
  },
  {
    id: 'presentationMatters',
    type: 'yes-no-maybe',
    icon: <Layout className="w-5 h-5" />,
    shortLabel: 'Presentation',
    headline: 'Does presentation and answer structure matter?',
    subtext: 'Are you marked on headings, neat structure, margins, and how your answer looks on paper?',
    panicTip: 'Underline headings, use sub-points, and keep your answer visually clear.',
  },
]

// ── Animation variants ────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
  }),
}

// ── Sub-components ────────────────────────────────────────────

function YesNoMaybeSelector({
  value,
  onChange,
}: {
  value?: YesNoMaybe
  onChange: (v: YesNoMaybe) => void
}) {
  const options: { value: YesNoMaybe; label: string; emoji: string; color: string }[] = [
    { value: 'yes', label: 'Yes', emoji: '✅', color: 'border-ec-sage/40 bg-ec-sage/10 text-ec-sage' },
    { value: 'sometimes', label: 'Sometimes', emoji: '🤔', color: 'border-amber-500/40 bg-amber-500/10 text-amber-400' },
    { value: 'no', label: 'No', emoji: '❌', color: 'border-ec-red/40 bg-ec-red/10 text-ec-red' },
  ]

  return (
    <div className="grid grid-cols-3 gap-3 mt-6">
      {options.map((opt) => (
        <motion.button
          key={opt.value}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => onChange(opt.value)}
          className={cn(
            'flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-5 min-h-[100px] transition-all duration-200 cursor-pointer',
            value === opt.value
              ? opt.color
              : 'border-white/10 bg-white/5 text-[var(--ec-text-secondary)] hover:border-white/20 hover:bg-white/8'
          )}
          aria-pressed={value === opt.value}
        >
          <span className="text-2xl">{opt.emoji}</span>
          <span className="text-sm font-semibold">{opt.label}</span>
        </motion.button>
      ))}
    </div>
  )
}

function ImportanceScaleSelector({
  value,
  onChange,
}: {
  value?: ImportanceScale
  onChange: (v: ImportanceScale) => void
}) {
  const options: { value: ImportanceScale; label: string; sublabel: string }[] = [
    { value: 1, label: 'Not at all', sublabel: '—' },
    { value: 2, label: 'Slightly', sublabel: '○' },
    { value: 3, label: 'Moderate', sublabel: '◐' },
    { value: 4, label: 'Important', sublabel: '●' },
    { value: 5, label: 'Critical', sublabel: '🔥' },
  ]

  return (
    <div className="mt-6 space-y-3">
      {/* Visual scale bar */}
      <div className="flex items-center gap-2 px-1">
        <span className="text-xs text-[var(--ec-text-tertiary)] shrink-0">Not at all</span>
        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--ec-purple)] to-violet-400 rounded-full"
            animate={{ width: value ? `${((value - 1) / 4) * 100}%` : '0%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
        <span className="text-xs text-[var(--ec-text-tertiary)] shrink-0">Critical</span>
      </div>

      {/* Tap targets */}
      <div className="grid grid-cols-5 gap-2">
        {options.map((opt) => (
          <motion.button
            key={opt.value}
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => onChange(opt.value)}
            className={cn(
              'flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 py-4 transition-all duration-200 cursor-pointer min-h-[80px]',
              value === opt.value
                ? 'border-[var(--ec-purple)] bg-[var(--ec-purple)]/15 text-[var(--ec-purple)]'
                : 'border-white/10 bg-white/5 text-[var(--ec-text-secondary)] hover:border-white/20'
            )}
            aria-pressed={value === opt.value}
          >
            <span className="text-lg font-bold">{opt.value}</span>
            <span className="text-[10px] text-center leading-tight opacity-70">{opt.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-1.5 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            width: i === current ? 20 : 6,
            backgroundColor:
              i < current
                ? 'var(--ec-sage)'
                : i === current
                ? 'var(--ec-purple)'
                : 'rgba(255,255,255,0.15)',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="h-1.5 rounded-full"
        />
      ))}
    </div>
  )
}

// ── Main Survey Component ─────────────────────────────────────

interface ProfessorSurveyProps {
  onComplete?: () => void
  onSkip?: () => void
  className?: string
}

export function ProfessorSurvey({ onComplete, onSkip, className }: ProfessorSurveyProps) {
  const {
    answers,
    currentQuestion,
    isComplete,
    profile,
    isGenerating,
    setAnswer,
    nextQuestion,
    prevQuestion,
    setProfile,
    setGenerating,
    canAdvance,
    clearSurvey,
  } = useProfessorStore()

  const [direction, setDirection] = useState(1)
  const [showProfile, setShowProfile] = useState(false)

  const question = QUESTIONS[currentQuestion]
  const isLast = currentQuestion === QUESTIONS.length - 1
  const totalQuestions = QUESTIONS.length

  const handleNext = useCallback(() => {
    if (!canAdvance() && !isLast) return
    if (isLast) {
      handleGenerate()
      return
    }
    setDirection(1)
    nextQuestion()
  }, [canAdvance, isLast, nextQuestion])

  const handleBack = useCallback(() => {
    setDirection(-1)
    prevQuestion()
  }, [prevQuestion])

  const handleGenerate = useCallback(async () => {
    setGenerating(true)
    // Simulate brief AI-like processing moment for UX
    await new Promise((resolve) => setTimeout(resolve, 1200))
    const generatedProfile = generateProfessorProfile(answers)
    setProfile(generatedProfile)
    setGenerating(false)
    setShowProfile(true)
  }, [answers, setGenerating, setProfile])

  const handleAnswerChange = useCallback(
    (value: string | number) => {
      if (!question) return
      setAnswer(question.id, value)
    },
    [question, setAnswer]
  )

  // Show completed profile
  if (showProfile && profile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn('w-full', className)}
      >
        <ProfessorProfileCard
          profile={profile}
          onReset={() => {
            clearSurvey()
            setShowProfile(false)
          }}
          onConfirm={() => {
            onComplete?.()
          }}
        />
      </motion.div>
    )
  }

  // Generating state
  if (isGenerating) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          'flex flex-col items-center justify-center min-h-[400px] gap-6 p-8',
          className
        )}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-full border-2 border-[var(--ec-purple)]/30 border-t-[var(--ec-purple)]"
        />
        <div className="text-center space-y-2">
          <p className="text-[var(--ec-text-primary)] font-semibold text-lg">
            Building your professor profile...
          </p>
          <p className="text-[var(--ec-text-secondary)] text-sm">
            Analyzing teaching style and marking patterns
          </p>
        </div>
        <div className="flex gap-2">
          {['Analyzing answers', 'Detecting archetype', 'Building strategy'].map((step, i) => (
            <motion.span
              key={step}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ delay: i * 0.4, duration: 1.2, repeat: Infinity }}
              className="text-xs text-[var(--ec-text-tertiary)] bg-white/5 px-2 py-1 rounded-full border border-white/10"
            >
              {step}
            </motion.span>
          ))}
        </div>
      </motion.div>
    )
  }

  if (!question) return null

  const currentValue = answers[question.id]
  const isAnswered = currentValue !== undefined && currentValue !== ''

  return (
    <div className={cn('w-full', className)}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--ec-purple)]/15 border border-[var(--ec-purple)]/25 flex items-center justify-center text-[var(--ec-purple)]">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--ec-purple)] uppercase tracking-wider">
                Professor Intelligence
              </p>
              <p className="text-xs text-[var(--ec-text-tertiary)]">
                Question {currentQuestion + 1} of {totalQuestions}
              </p>
            </div>
          </div>
          {onSkip && (
            <button
              onClick={onSkip}
              className="text-xs text-[var(--ec-text-tertiary)] hover:text-[var(--ec-text-secondary)] transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
            >
              Skip survey
            </button>
          )}
        </div>

        <ProgressDots total={totalQuestions} current={currentQuestion} />
      </div>

      {/* Question card */}
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
        style={{ minHeight: 340 }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="p-6"
          >
            {/* Question header */}
            <div className="flex items-start gap-3 mb-2">
              <div className="mt-0.5 w-9 h-9 rounded-lg bg-[var(--ec-purple)]/10 border border-[var(--ec-purple)]/20 flex items-center justify-center text-[var(--ec-purple)] shrink-0">
                {question.icon}
              </div>
              <div>
                <h2 className="text-[var(--ec-text-primary)] font-semibold text-base leading-snug">
                  {question.headline}
                </h2>
                <p className="text-[var(--ec-text-secondary)] text-sm mt-1 leading-relaxed">
                  {question.subtext}
                </p>
              </div>
            </div>

            {/* Panic tip */}
            {question.panicTip && (
              <div className="mt-4 flex items-start gap-2 px-3 py-2.5 rounded-lg bg-amber-500/8 border border-amber-500/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-300/90 leading-relaxed">{question.panicTip}</p>
              </div>
            )}

            {/* Answer input */}
            {question.type === 'yes-no-maybe' && (
              <YesNoMaybeSelector
                value={currentValue as YesNoMaybe | undefined}
                onChange={handleAnswerChange}
              />
            )}
            {question.type === 'importance-scale' && (
              <ImportanceScaleSelector
                value={currentValue as ImportanceScale | undefined}
                onChange={handleAnswerChange}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-4 gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          disabled={currentQuestion === 0}
          className={cn(
            'flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200',
            currentQuestion === 0
              ? 'border-white/5 text-[var(--ec-text-disabled)] opacity-40 cursor-not-allowed'
              : 'border-white/15 text-[var(--ec-text-secondary)] hover:border-white/25 hover:text-[var(--ec-text-primary)] hover:bg-white/5 cursor-pointer'
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: isAnswered ? 1.02 : 1 }}
          onClick={handleNext}
          disabled={!isAnswered}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200',
            isAnswered
              ? isLast
                ? 'bg-[var(--ec-purple)] text-white hover:bg-violet-500 shadow-lg shadow-[var(--ec-purple)]/25 cursor-pointer'
                : 'bg-[var(--ec-purple)]/90 text-white hover:bg-[var(--ec-purple)] cursor-pointer'
              : 'bg-white/5 text-[var(--ec-text-disabled)] cursor-not-allowed border border-white/10'
          )}
        >
          {isLast ? (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Profile
            </>
          ) : (
            <>
              Next
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </div>

      {/* Step labels strip */}
      <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {QUESTIONS.map((q, i) => {
          const isDone = answers[q.id] !== undefined && answers[q.id] !== ''
          const isCurrent = i === currentQuestion
          return (
            <button
              key={q.id}
              onClick={() => {
                // Allow going back to any answered question
                if (i < currentQuestion || isDone) {
                  setDirection(i < currentQuestion ? -1 : 1)
                  useProfessorStore.getState().goToQuestion(i)
                }
              }}
              className={cn(
                'shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all duration-200 border',
                isCurrent
                  ? 'bg-[var(--ec-purple)]/15 border-[var(--ec-purple)]/30 text-[var(--ec-purple)]'
                  : isDone
                  ? 'bg-[var(--ec-sage)]/8 border-[var(--ec-sage)]/20 text-[var(--ec-sage)]/80 cursor-pointer hover:bg-[var(--ec-sage)]/15'
                  : 'bg-white/5 border-white/8 text-[var(--ec-text-tertiary)] opacity-60'
              )}
            >
              {isDone && !isCurrent && <CheckCircle2 className="w-3 h-3" />}
              {q.shortLabel}
            </button>
          )
        })}
      </div>
    </div>
  )
}
