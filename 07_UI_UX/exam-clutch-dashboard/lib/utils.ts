import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ── Core class merging utility ────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── Type-safe object utilities ────────────────────────────────

/** Pick specific keys from an object */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key]
    return acc
  }, {} as Pick<T, K>)
}

// ── ID generation ─────────────────────────────────────────────

/** Generate a short random ID with optional prefix */
export function generateId(prefix = ''): string {
  const rand = Math.random().toString(36).slice(2, 9)
  return prefix ? `${prefix}_${rand}` : rand
}

// ── Array utilities ───────────────────────────────────────────

/** Deduplicate an array by a key function */
export function uniqueBy<T>(arr: T[], keyFn: (item: T) => unknown): T[] {
  const seen = new Set()
  return arr.filter((item) => {
    const key = keyFn(item)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/** Chunk an array into groups of size n */
export function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  )
}

// ── String utilities ──────────────────────────────────────────

/** Truncate string at maxChars with ellipsis */
export function truncate(str: string, maxChars: number): string {
  if (str.length <= maxChars) return str
  return str.slice(0, maxChars).trimEnd() + '...'
}

/** Capitalize first letter */
export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// ── LocalStorage helpers ──────────────────────────────────────

/** Safe localStorage.getItem with JSON parse */
export function getStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const item = window.localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : fallback
  } catch {
    return fallback
  }
}

/** Safe localStorage.setItem with JSON stringify */
export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Quota exceeded or private browsing — fail silently
  }
}

// ── Async utilities ───────────────────────────────────────────

/** Sleep for n milliseconds */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ── Clipboard utility ─────────────────────────────────────────

/** Copy text to clipboard, returns success boolean */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.focus()
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      return true
    } catch {
      return false
    }
  }
}
