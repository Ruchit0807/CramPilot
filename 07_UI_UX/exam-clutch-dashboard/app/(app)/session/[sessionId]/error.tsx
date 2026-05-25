'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCcw, ShieldAlert } from 'lucide-react'

export default function SessionError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service like PostHog or Sentry
    console.error('Session Error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[rgba(248,113,113,0.1)] border border-[rgba(248,113,113,0.2)] flex items-center justify-center mb-6">
        <ShieldAlert className="w-8 h-8 text-[#F87171]" />
      </div>
      
      <h2 className="text-[24px] font-[500] text-[#F0EFE8] mb-3">
        Strategy Render Failed
      </h2>
      
      <p className="text-[14px] text-[#9E9C96] max-w-md mx-auto mb-8 leading-relaxed">
        We encountered a temporary anomaly while generating or loading your exam strategy. Your progress is safely stored locally. Let's restart the engine.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={() => reset()}
          className="h-11 px-6 rounded-xl bg-[#818CF8] text-[#111110] text-[13px] font-[600] flex items-center gap-2 hover:bg-[#6366F1] transition-colors w-full sm:w-auto justify-center"
        >
          <RefreshCcw className="w-4 h-4" />
          Attempt Recovery
        </button>
        <Link
          href="/dashboard"
          className="h-11 px-6 rounded-xl bg-transparent border border-[rgba(255,255,255,0.1)] text-[#F0EFE8] text-[13px] font-[500] flex items-center gap-2 hover:bg-[rgba(255,255,255,0.05)] transition-colors w-full sm:w-auto justify-center"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}
