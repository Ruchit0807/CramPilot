// ============================================================
// CramPilot — Design System Constants
// Animation presets, spacing scale, breakpoints
// Mirrors values from visual_identity.md
// ============================================================

// ── Animation durations (ms) ─────────────────────────────────
export const ANIMATION = {
  micro: 150,           // hover, state changes
  standard: 200,        // card expand, completion
  transition: 300,      // page transitions
  max: 400,             // never exceed this
  loadingText: 2000,    // AI loading message cycle time
  copyConfirm: 1500,    // "Copied ✓" reset delay
} as const

// ── Framer Motion easing presets ─────────────────────────────
export const EASING = {
  easeOut: [0.16, 1, 0.3, 1] as const,      // Fast start, gradual finish
  spring: { type: 'spring', stiffness: 400, damping: 30 } as const,
  smooth: [0.4, 0, 0.2, 1] as const,
} as const

// ── Spacing scale (px, 4-unit base) ──────────────────────────
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
} as const

// ── Border radius ─────────────────────────────────────────────
export const RADIUS = {
  tight: '4px',    // badges, inline elements
  default: '8px',  // cards, inputs, buttons
  soft: '12px',    // modals, panels
} as const

// ── Typography scale ──────────────────────────────────────────
export const TYPE_SCALE = {
  display: { size: '32px', weight: 500, letterSpacing: '-0.02em' },
  h1: { size: '24px', weight: 500, letterSpacing: '-0.01em' },
  h2: { size: '18px', weight: 500, letterSpacing: '0' },
  h3: { size: '15px', weight: 500, letterSpacing: '0.01em' },
  body: { size: '15px', weight: 400, lineHeight: '1.6' },
  small: { size: '13px', weight: 400, lineHeight: '1.5' },
  label: { size: '11px', weight: 500, letterSpacing: '0.06em' },
  mono: { size: '13px', weight: 400, family: 'JetBrains Mono' },
  caption: { size: '12px', weight: 400 },
} as const

// ── Breakpoints ───────────────────────────────────────────────
export const BREAKPOINTS = {
  mobile: 375,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const

// ── Mobile thumb zone ─────────────────────────────────────────
export const MIN_TOUCH_TARGET = 44  // px — minimum tap target height/width

// ── Reading comfort ───────────────────────────────────────────
export const MAX_LINE_LENGTH = 72   // characters — prevents reading fatigue

// ── Color tokens (dark mode) ──────────────────────────────────
export const COLORS = {
  // Backgrounds
  bgPage: '#111110',
  bgSurface: '#1C1C1A',
  bgElevated: '#242422',
  bgRecessed: '#161615',
  // Text
  textPrimary: '#F0EFE8',
  textSecondary: '#9E9C96',
  textTertiary: '#706E67',
  textDisabled: '#C4C2BC',
  // Accents
  purple: '#818CF8',      // AI intelligence
  purpleDim: 'rgba(129, 140, 248, 0.25)',
  amber: '#FBBF24',       // Urgency / warnings
  amberDim: 'rgba(251, 191, 36, 0.15)',
  sage: '#4ADE80',        // Success / completion
  sageDim: 'rgba(74, 222, 128, 0.12)',
  red: '#F87171',         // Errors / marks traps
  redDim: 'rgba(248, 113, 113, 0.12)',
  // Borders
  borderDefault: 'rgba(255, 255, 255, 0.08)',
  borderHover: 'rgba(255, 255, 255, 0.15)',
  borderFocus: 'rgba(255, 255, 255, 0.25)',
  borderDivider: 'rgba(255, 255, 255, 0.06)',
} as const

// ── Loading messages for AI processing states ─────────────────
export const LOADING_MESSAGES = {
  strategy: [
    'Reading your syllabus...',
    'Identifying critical topics...',
    'Calculating time allocation...',
    'Building your priority list...',
  ],
  pyqAnalysis: [
    'Analyzing past papers...',
    'Detecting question patterns...',
    'Ranking by probability...',
    'Generating predictions...',
  ],
  schedule: [
    'Calculating optimal blocks...',
    'Scheduling breaks...',
    'Mapping prompts to topics...',
    'Finalizing your plan...',
  ],
} as const
