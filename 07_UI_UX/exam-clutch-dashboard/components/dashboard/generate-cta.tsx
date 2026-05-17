'use client'
// ============================================================
// CramPilot — Generate CTA Button
// Refined: 3s generation, AI analysis stages, emergency modes,
// emotional reassurance copy, router.push to results
// ============================================================

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, Sparkles, ArrowRight, Loader2, Check, AlertTriangle, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSessionStore } from '@/store/session.store'
import { generateMockStrategy } from '@/lib/mock-engine'

// ── Generation stage definitions ────────────────────────────
interface Stage {
  label: string         // Shown as primary status
  sublabel: string      // Emotional reassurance line
  durationMs: number    // How long to hold this stage
  progress: number      // Progress bar target 0–100
}

function buildStages(hoursRemaining: number): Stage[] {
  const isEmergency = hoursRemaining <= 12
  const isCritical  = hoursRemaining <= 6

  return [
    {
      label: 'Analyzing professor behavior patterns...',
      sublabel: isCritical
        ? '⚡ Critical mode — locking on highest ROI topics only.'
        : isEmergency
        ? '🚨 Emergency mode — prioritizing by marks × frequency.'
        : 'Building your professor intelligence profile.',
      durationMs: 500, progress: 15,
    },
    {
      label: 'Detecting high-scoring topics from PYQs...',
      sublabel: 'We\'re weighting every topic by exam frequency × marks value.',
      durationMs: 550, progress: 32,
    },
    {
      label: 'Building emergency topic roadmap...',
      sublabel: isCritical
        ? 'You still have enough time to recover — we\'re focusing only on what matters.'
        : 'Focus only on what maximizes your marks. Skipping the rest.',
      durationMs: 500, progress: 52,
    },
    {
      label: 'Optimizing AI workflows...',
      sublabel: 'Sequencing Claude → NotebookLM → ChatGPT → Gemini for your window.',
      durationMs: 500, progress: 70,
    },
    {
      label: 'Generating revision strategy...',
      sublabel: 'We\'re prioritizing the highest ROI topics for your time window.',
      durationMs: 450, progress: 86,
    },
    {
      label: 'Finalizing your survival roadmap...',
      sublabel: isEmergency
        ? 'Almost done — your exam is survivable. Trust the system.'
        : 'Your personalized hour-by-hour plan is almost ready.',
      durationMs: 250, progress: 98,
    },
  ]
}

// ── Emergency label helper ───────────────────────────────────
function getEmergencyLabel(hours: number): { label: string; color: string; bg: string } | null {
  if (hours <= 6)  return { label: '🔴 Critical Survival Mode', color: '#F87171', bg: 'rgba(248,113,113,0.08)' }
  if (hours <= 12) return { label: '🟡 Emergency Mode',        color: '#FBBF24', bg: 'rgba(251,191,36,0.07)'   }
  return null
}

// ── Props ────────────────────────────────────────────────────
interface GenerateCTAProps {
  isReady: boolean
  /** hoursRemaining from input panel for emergency state detection */
  hoursRemaining?: number
  /** subject from input panel for session creation */
  subject?: string
  targetMarks?: string
  weakTopics?: string[]
  professorArchetype?: string[]
  subjectCategory?: string
  onGenerate?: () => void
  className?: string
}

export function GenerateCTA({
  isReady,
  hoursRemaining = 18,
  subject = 'General Exam',
  targetMarks = '85+',
  weakTopics = [],
  professorArchetype = [],
  subjectCategory = 'mixed',
  onGenerate,
  className,
}: GenerateCTAProps) {
  const router = useRouter()
  const createSession = useSessionStore((s) => s.createSession)
  const setStrategy = useSessionStore((s) => s.setStrategy)

  const [phase, setPhase] = useState<'idle' | 'loading' | 'done'>('idle')
  const [stageIdx, setStageIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const sessionIdRef = useRef<string | null>(null)

  const emergency = getEmergencyLabel(hoursRemaining)
  const stages    = buildStages(hoursRemaining)

  // Run through stages sequentially
  async function runStages() {
    let idx = 0
    for (const stage of stages) {
      setStageIdx(idx)
      // Animate progress smoothly to stage target
      setProgress(stage.progress)
      await new Promise(res => setTimeout(res, stage.durationMs))
      idx++
    }
    setProgress(100)
  }

  const handleClick = async () => {
    if (!isReady || phase !== 'idle') return
    setPhase('loading')
    setStageIdx(0)
    setProgress(0)

    // Create session in store (generates a real ID)
    const newSession = createSession({
      subject,
      subjectCategory: subjectCategory as any,
      professorArchetype: professorArchetype.join(','),
      hoursRemaining,
      targetMarks: targetMarks as any,
      weakTopics,
    })
    sessionIdRef.current = newSession.id

    // Generate mock intelligence
    const strategy = generateMockStrategy({
      subject,
      subjectCategory,
      professorArchetype,
      hoursRemaining,
      targetMarks,
      weakTopics,
    })
    setStrategy(strategy)

    // Run visual stages concurrently (~3s total)
    await runStages()
    setPhase('done')
    onGenerate?.()

    // Small done-state beat, then navigate
    await new Promise(res => setTimeout(res, 400))
    router.push(`/session/${sessionIdRef.current}/strategy`)
  }

  const currentStage = stages[Math.min(stageIdx, stages.length - 1)]

  return (
    <div className={cn('relative', className)}>
      {/* Ambient glow */}
      <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-[rgba(129,140,248,0.08)] via-transparent to-[rgba(251,191,36,0.06)] blur-xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'relative rounded-2xl overflow-hidden border transition-all duration-300',
          isReady
            ? 'border-[rgba(129,140,248,0.4)] bg-gradient-to-br from-[rgba(129,140,248,0.08)] via-[rgba(36,36,34,0.9)] to-[rgba(251,191,36,0.04)]'
            : 'border-[rgba(255,255,255,0.08)] bg-[rgba(28,28,26,0.8)]'
        )}
      >
        {/* Shimmer line when ready */}
        {isReady && phase === 'idle' && (
          <motion.div
            animate={{ x: ['−100%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(129,140,248,0.7)] to-transparent"
          />
        )}

        <div className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

            {/* Icon */}
            <motion.div
              animate={isReady && phase === 'idle' ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className={cn(
                'w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-300',
                isReady
                  ? 'bg-[rgba(129,140,248,0.15)] border-[rgba(129,140,248,0.35)]'
                  : 'bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.09)]'
              )}
            >
              {phase === 'loading'
                ? <Loader2 className="w-7 h-7 text-[#818CF8] animate-spin" />
                : phase === 'done'
                ? <Check className="w-7 h-7 text-[#4ADE80]" />
                : <Rocket className={cn('w-7 h-7 transition-colors duration-300', isReady ? 'text-[#818CF8]' : 'text-[#706E67]')} />
              }
            </motion.div>

            {/* Text block */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="text-[16px] font-[500] text-[#F0EFE8]">
                  Launch CramPilot Navigation
                </h3>
                {/* Emergency mode badge */}
                {emergency && phase !== 'loading' && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[10px] font-[700] px-2 py-0.5 rounded-full"
                    style={{ color: emergency.color, background: emergency.bg, border: `1px solid ${emergency.color}35` }}
                  >
                    {emergency.label}
                  </motion.span>
                )}
              </div>

              <AnimatePresence mode="wait">
                {phase === 'idle' && (
                  <motion.p
                    key="idle-desc"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-[13px] text-[#9E9C96] leading-[1.5]"
                  >
                    {isReady
                      ? emergency
                        ? `${hoursRemaining}h remaining. AI is ready to build your survival plan — professor-calibrated, mark-optimized.`
                        : 'Your inputs are ready. AI will generate a professor-calibrated strategy with prioritized topics, ready-to-use prompts, and a timed schedule.'
                      : 'Fill in at least your subject and time remaining to unlock AI strategy generation.'}
                  </motion.p>
                )}

                {phase === 'loading' && (
                  <motion.div
                    key="loading-block"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    {/* Progress bar */}
                    <div className="h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden mt-2 mb-2">
                      <motion.div
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-[#818CF8] to-[#a5b4fc]"
                      />
                    </div>

                    {/* Stage label */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={stageIdx}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-[13px] font-[500] text-[#818CF8]">{currentStage.label}</p>
                        <p className="text-[12px] text-[#706E67] mt-0.5">{currentStage.sublabel}</p>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                )}

                {phase === 'done' && (
                  <motion.p
                    key="done-desc"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-[13px] text-[#4ADE80]"
                  >
                    Strategy generated — redirecting to your survival roadmap...
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <motion.button
              id="btn-generate-strategy"
              onClick={handleClick}
              disabled={!isReady || phase !== 'idle'}
              whileHover={isReady && phase === 'idle' ? { scale: 1.02 } : {}}
              whileTap={isReady && phase === 'idle' ? { scale: 0.98 } : {}}
              className={cn(
                'relative shrink-0 flex items-center gap-2.5 px-6 py-3.5 rounded-xl',
                'font-[500] text-[14px] transition-all duration-200 overflow-hidden whitespace-nowrap',
                isReady && phase === 'idle'
                  ? 'bg-[#818CF8] text-[#111110] shadow-[0_0_24px_rgba(129,140,248,0.35)] hover:bg-[#a5b4fc] hover:shadow-[0_0_32px_rgba(129,140,248,0.5)]'
                  : phase === 'loading'
                  ? 'bg-[rgba(129,140,248,0.2)] text-[#818CF8] border border-[rgba(129,140,248,0.3)] cursor-not-allowed'
                  : phase === 'done'
                  ? 'bg-[rgba(74,222,128,0.15)] text-[#4ADE80] border border-[rgba(74,222,128,0.3)] cursor-not-allowed'
                  : 'bg-[rgba(255,255,255,0.05)] text-[#706E67] cursor-not-allowed border border-[rgba(255,255,255,0.08)]'
              )}
            >
              <AnimatePresence mode="wait">
                {phase === 'idle' && (
                  <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    {emergency ? <Zap className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    {emergency ? 'Generate Emergency Plan' : 'Generate Strategy'}
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                )}
                {phase === 'loading' && (
                  <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </motion.span>
                )}
                {phase === 'done' && (
                  <motion.span key="done" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Done!
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Requirements hint */}
          {!isReady && phase === 'idle' && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mt-4 flex flex-wrap items-center gap-2 pt-4 border-t border-[rgba(255,255,255,0.06)]"
            >
              {['Subject', 'Hours', 'Target Marks'].map((req) => (
                <span key={req} className="text-[11px] px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.05)] text-[#706E67] border border-[rgba(255,255,255,0.07)]">
                  {req}
                </span>
              ))}
              <p className="text-[11px] text-[#706E67]">required to generate</p>
            </motion.div>
          )}

          {/* Emergency warning strip */}
          {emergency && phase === 'idle' && isReady && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 overflow-hidden"
            >
              <div
                className="flex items-center gap-2 pt-4 border-t"
                style={{ borderColor: `${emergency.color}25` }}
              >
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" style={{ color: emergency.color }} />
                <p className="text-[12px]" style={{ color: emergency.color }}>
                  {hoursRemaining <= 6
                    ? `Only ${hoursRemaining}h left — AI will focus on 3 topics maximum. Everything else is skipped.`
                    : `${hoursRemaining}h window — emergency plan activates. Skip list + critical topics only.`}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
