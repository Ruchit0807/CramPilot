// ============================================================
// CramPilot — AI Configuration
// Model selection, rate limits, quotas, timeouts
// ============================================================

export const AI_CONFIG = {
  // ── API Connection ──────────────────────────────────────────
  baseUrl: process.env.FREEMODEL_BASE_URL || 'https://api.freemodel.dev/v1',
  apiKey: process.env.FREEMODEL_API_KEY || '',
  fallbackBaseUrl: process.env.FALLBACK_BASE_URL || 'https://api.openai.com/v1',
  fallbackApiKey: process.env.FALLBACK_API_KEY || '',

  // ── Model Tiers ─────────────────────────────────────────────
  // Normal: used for all standard generation tasks
  // Premium: reserved for advanced reasoning, difficult analysis
  models: {
    normal: process.env.FREEMODEL_MODEL || 'gpt-5.5',
    premium: process.env.FREEMODEL_MODEL_PREMIUM || 'gpt-5.5',
  } as Record<ModelTier, string>,

  // ── Generation Defaults ─────────────────────────────────────
  defaults: {
    temperature: 0.7,
    maxTokens: 4096,
    timeoutMs: 90_000, // 90s hard timeout to prevent strategy failure
  },

  // ── Per-function overrides ──────────────────────────────────
  functions: {
    generateStrategy: { maxTokens: 4096, temperature: 0.7, model: 'normal' as const, creditCost: 10 },
    extractTopics:     { maxTokens: 2048, temperature: 0.3, model: 'normal' as const, creditCost: 5 },
    analyzePYQs:       { maxTokens: 3072, temperature: 0.4, model: 'normal' as const, creditCost: 20 },
    generatePrompts:   { maxTokens: 2048, temperature: 0.8, model: 'normal' as const, creditCost: 5 },
    generateFlashcards:{ maxTokens: 2048, temperature: 0.6, model: 'normal' as const, creditCost: 5 },
    professorInsights: { maxTokens: 1536, temperature: 0.5, model: 'normal' as const, creditCost: 10 },
    // Premium-only tasks (future)
    advancedReasoning: { maxTokens: 4096, temperature: 0.4, model: 'premium' as const, creditCost: 15 },
  },

  // ── Retry & Fallback Policy ──────────────────────────────────
  retry: {
    maxAttempts: 3,
    baseDelayMs: 1000,   // 1s, 2s, 4s exponential
    maxDelayMs: 8000,
    enableProviderFallbackOnFailure: true // Switch to fallbackBaseUrl on 500s
  },

  // ── Cache TTLs (seconds) ────────────────────────────────────
  cacheTTL: {
    strategy: 24 * 60 * 60,       // 24 hours
    topics: 24 * 60 * 60,         // 24 hours
    pyqAnalysis: 24 * 60 * 60,    // 24 hours
    promptPack: 12 * 60 * 60,     // 12 hours
    flashcards: 3 * 60 * 60,      // 3 hours (shorter — large output, cheap to regenerate)
    professorInsights: 24 * 60 * 60, // 24 hours
  },

  // ── Rate Limits (requests per window) ───────────────────────
  rateLimits: {
    guest:   { maxRequests: 3,  windowMs: 60 * 60 * 1000 },  // 3 req/hour
    free:    { maxRequests: 15, windowMs: 60 * 60 * 1000 },  // 15 req/hour
    premium: { maxRequests: 60, windowMs: 60 * 60 * 1000 },  // 60 req/hour
  },

  // ── Upload / Parsing Limits ─────────────────────────────────
  uploadLimits: {
    maxFileSizeMB: 10,
    maxPages: 50,
    extractionTimeoutMs: 30000, // 30s strict parsing limit
    maxSyllabusChars: 15_000,   // ~5 pages of text
    maxPYQChars: 20_000,        // ~7 pages of text
    allowedMimeTypes: ['application/pdf', 'image/png', 'image/jpeg', 'text/plain'],
  },

  // ── Safety & Global Constraints ───────────────────────────────
  safety: {
    globalDailySpendLimitUSD: 150.00,
  },

  // ── Cost Tracking (estimated per 1M tokens) ─────────────────
  estimatedCost: {
    normal: { input: 0.15, output: 0.60 },   // $/1M tokens
    premium: { input: 2.50, output: 10.00 },
  },
} as const

export type ModelTier = 'normal' | 'premium'
export type AIFunctionName = keyof typeof AI_CONFIG.functions
export type UserTier = 'guest' | 'free' | 'premium'
