'use client'
// ============================================================
// CramPilot — Providers
// Wraps all context providers for the app
// ============================================================

import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"      // MVP: dark only
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
