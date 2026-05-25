// ============================================================
// CramPilot — AI Client
// OpenAI-compatible fetch wrapper with retry, timeout, tracking
// ============================================================

import { AI_CONFIG, type ModelTier } from './config'
import { getTodaySpendUSD, getEmergencyControls, AISafetyError } from './safety'

export interface AIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface AICallOptions {
  model?: ModelTier
  temperature?: number
  maxTokens?: number
  timeoutMs?: number
  /** If true, instructs the model to output JSON */
  jsonMode?: boolean
}

export interface AICallResult {
  content: string
  tokensUsed: {
    prompt: number
    completion: number
    total: number
  }
  latencyMs: number
  model: string
  estimatedCostUSD: number
}

export class AIError extends Error {
  constructor(
    message: string,
    public code: 'TIMEOUT' | 'RATE_LIMIT' | 'API_ERROR' | 'PARSE_ERROR' | 'NETWORK_ERROR',
    public statusCode?: number,
    public retryable: boolean = false
  ) {
    super(message)
    this.name = 'AIError'
  }
}

/**
 * Core AI call function. Wraps fetch to the freemodel.dev OpenAI-compatible API
 * with retry, timeout, and token tracking.
 */
export async function callAI(
  messages: AIMessage[],
  options: AICallOptions = {}
): Promise<AICallResult> {
  const modelTier = options.model ?? 'normal'
  const modelName = AI_CONFIG.models[modelTier]
  const temperature = options.temperature ?? AI_CONFIG.defaults.temperature
  const maxTokens = options.maxTokens ?? AI_CONFIG.defaults.maxTokens
  const timeoutMs = options.timeoutMs ?? AI_CONFIG.defaults.timeoutMs

  const costRates = AI_CONFIG.estimatedCost[modelTier]

  // 1. Safety Checks
  const [todaySpend, controls] = await Promise.all([
    getTodaySpendUSD(),
    getEmergencyControls()
  ])

  if (controls.force_disable_ai) {
    throw new AISafetyError('AI is temporarily disabled by administrators.', 'EMERGENCY_STOP')
  }

  if (todaySpend >= AI_CONFIG.safety.globalDailySpendLimitUSD) {
    throw new AISafetyError('Global daily spend limit exceeded. Service paused.', 'GLOBAL_LIMIT_EXCEEDED')
  }

  let lastError: Error | null = null

  for (let attempt = 1; attempt <= AI_CONFIG.retry.maxAttempts; attempt++) {
    const startTime = Date.now()

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), timeoutMs)

      const body: Record<string, unknown> = {
        model: modelName,
        messages,
        temperature,
        max_tokens: maxTokens,
      }
      if (options.jsonMode) {
        body.response_format = { type: 'json_object' }
      }

      // Determine if we should fallback
      let currentBaseUrl = AI_CONFIG.baseUrl
      let currentApiKey = AI_CONFIG.apiKey

      if (attempt > 1 && AI_CONFIG.retry.enableProviderFallbackOnFailure && lastError?.message.includes('50')) {
        currentBaseUrl = AI_CONFIG.fallbackBaseUrl
        currentApiKey = AI_CONFIG.fallbackApiKey
      }

      const response = await fetch(`${currentBaseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentApiKey}`,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      })

      clearTimeout(timeout)
      const latencyMs = Date.now() - startTime

      // Handle HTTP errors
      if (!response.ok) {
        const errorBody = await response.text().catch(() => 'Unknown error')

        if (response.status === 429) {
          throw new AIError(
            `Rate limited by API: ${errorBody}`,
            'RATE_LIMIT',
            429,
            true
          )
        }

        throw new AIError(
          `API returned ${response.status}: ${errorBody}`,
          'API_ERROR',
          response.status,
          response.status >= 500 // Only retry server errors
        )
      }

      const data = await response.json()

      const choice = data.choices?.[0]
      if (!choice?.message?.content) {
        throw new AIError(
          'API returned empty response',
          'PARSE_ERROR',
          200,
          true
        )
      }

      const usage = data.usage ?? { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
      const tokensUsed = {
        prompt: usage.prompt_tokens,
        completion: usage.completion_tokens,
        total: usage.total_tokens,
      }

      const estimatedCostUSD =
        (tokensUsed.prompt / 1_000_000) * costRates.input +
        (tokensUsed.completion / 1_000_000) * costRates.output

      return {
        content: choice.message.content,
        tokensUsed,
        latencyMs,
        model: modelName,
        estimatedCostUSD,
      }
    } catch (error: any) {
      lastError = error

      // Timeout (AbortController)
      if (error.name === 'AbortError') {
        lastError = new AIError(
          `Request timed out after ${timeoutMs}ms`,
          'TIMEOUT',
          undefined,
          true
        )
      }

      // Network failure
      if (error.name === 'TypeError' && error.message?.includes('fetch')) {
        lastError = new AIError(
          `Network error: ${error.message}`,
          'NETWORK_ERROR',
          undefined,
          true
        )
      }

      // Only retry if the error is retryable and we have attempts left
      const isRetryable = lastError instanceof AIError ? lastError.retryable : false
      if (!isRetryable || attempt >= AI_CONFIG.retry.maxAttempts) {
        break
      }

      // Exponential backoff
      const delay = Math.min(
        AI_CONFIG.retry.baseDelayMs * Math.pow(2, attempt - 1),
        AI_CONFIG.retry.maxDelayMs
      )
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  // All retries exhausted
  throw lastError instanceof AIError
    ? lastError
    : new AIError(
        `AI call failed: ${lastError?.message ?? 'Unknown error'}`,
        'API_ERROR',
        undefined,
        false
      )
}
