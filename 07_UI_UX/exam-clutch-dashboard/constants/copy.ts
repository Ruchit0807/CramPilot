// ============================================================
// CramPilot — UI Copy Constants
// All micro-copy: empty states, error messages, loading text
// Human, empathetic, calm authority tone
// ============================================================

export const COPY = {
  // ── Empty States ───────────────────────────────────────────
  emptyStates: {
    noSession: {
      heading: 'What exam are you surviving?',
      subtext: 'Tell us your subject and available hours. We\'ll handle the rest.',
      cta: 'Start your exam plan',
    },
    noTopics: {
      heading: 'No topics yet.',
      subtext: 'Once you enter your subject, your priority list will appear here.',
      cta: null,
    },
    noPrompts: {
      heading: 'Your prompt pack is ready.',
      subtext: 'Complete the professor survey to unlock personalized prompts.',
      cta: 'Complete survey',
    },
    noPredictions: {
      heading: 'Upload past papers to unlock predictions.',
      subtext: 'Paste or upload 2–5 years of past papers for AI-powered question predictions.',
      cta: 'Upload past papers',
    },
  },

  // ── Error Messages ─────────────────────────────────────────
  errors: {
    pdfParse: 'We couldn\'t read this file — try pasting the text directly instead.',
    networkFail: 'Connection interrupted. Your progress is saved — try again when you\'re back.',
    sessionExpired: 'Your session data is still here. Just reload to continue.',
    apiLimit: 'High demand right now. You\'re next in queue — usually less than 30 seconds.',
    invalidSubject: 'Tell us a specific subject, like "Corporate Law" or "Thermodynamics."',
    fileTooLarge: 'This file is too large. Try splitting it into individual papers.',
  },

  // ── Status / Completion ────────────────────────────────────
  completion: {
    topicDone: (topic: string) => `${topic}: covered ✓`,
    phaseDone: (phase: string) => `${phase} complete.`,
    allDone: 'You\'ve covered what matters. Rest is now the most valuable thing you can do.',
    copyDone: 'Copied ✓',
    uploadDone: 'Paper uploaded and queued for analysis.',
  },

  // ── Loading States ─────────────────────────────────────────
  loading: {
    strategy: 'Building your exam strategy...',
    pyq: 'Analyzing past paper patterns...',
    schedule: 'Mapping your study schedule...',
    prompts: 'Preparing your prompt pack...',
    generic: 'Processing...',
  },

  // ── Encouragement (understated, not patronizing) ───────────
  encouragement: {
    onStart: 'You have more time than you think. Let\'s use it well.',
    midSession: 'Critical topics: covered. The hard part is done.',
    lateSession: 'This is where preparation compounds. Stay on it.',
    preExam: 'You\'ve prepared. Trust the process.',
    onStruggle: 'Hard topics are the ones that differentiate scores. Stay with it.',
  },

  // ── Time-related ───────────────────────────────────────────
  time: {
    hoursRemaining: (h: number) => `${h} hour${h !== 1 ? 's' : ''} remaining`,
    topicsPerHour: (topics: number, hours: number) =>
      `${topics} critical topic${topics !== 1 ? 's' : ''} · ${(hours / topics).toFixed(1)} hours each`,
    planAchievable: (h: number, t: number) =>
      `You have ${h} hours and ${t} critical topics — that\'s ${(h / t).toFixed(1)}h per topic. This plan is achievable.`,
    stopStudying: 'Stop studying. Sleep is now more valuable than content.',
    examDay: 'Arrive early. You\'re prepared.',
  },

  // ── CTA Labels ─────────────────────────────────────────────
  cta: {
    buildPlan: 'Build my study plan →',
    generateStrategy: 'Generate My Exam Strategy →',
    uploadPapers: 'Upload Past Papers',
    copyPrompt: 'Copy Prompt',
    openTool: (tool: string) => `Open ${tool}`,
    markDone: 'Mark as Done ✓',
    nextPhase: 'Continue to',
    unlockPredictions: 'Unlock predictions →',
    shareResults: 'Share these predictions',
    startStudying: (topic: string) => `Start studying ${topic}`,
  },

  // ── Nav Labels ─────────────────────────────────────────────
  nav: {
    home: 'Session',
    prompts: 'Prompts',
    schedule: 'Schedule',
    profile: 'Profile',
    settings: 'Settings',
  },
} as const
