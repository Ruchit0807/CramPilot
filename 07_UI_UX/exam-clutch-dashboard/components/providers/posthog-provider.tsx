'use client'

import { useEffect } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Stub for PostHog init
    // posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, { api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST })
  }, [])

  return <>{children}</>
}
