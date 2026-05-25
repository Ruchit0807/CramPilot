'use client'

import { useEffect } from 'react'
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react'
import Link from 'next/link'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#111110] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[rgba(248,113,113,0.1)] border border-[rgba(248,113,113,0.2)] flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-[#F87171]" />
      </div>
      
      <h2 className="text-[24px] font-[500] text-[#F0EFE8] mb-3 tracking-[-0.02em]">
        We hit some turbulence.
      </h2>
      
      <p className="text-[14px] text-[#9E9C96] max-w-[400px] mb-8 leading-[1.6]">
        Don't panic. CramPilot encountered an unexpected error while processing your request. 
        Your progress is safely stored.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => reset()}
          className="h-11 px-6 rounded-xl bg-[#818CF8] text-[#111110] text-[13px] font-[600] flex items-center justify-center gap-2 hover:bg-[#6366F1] transition-colors"
        >
          <RefreshCcw className="w-4 h-4" />
          Try Again
        </button>
        
        <Link
          href="/dashboard"
          className="h-11 px-6 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[#F0EFE8] text-[13px] font-[500] flex items-center justify-center gap-2 hover:bg-[rgba(255,255,255,0.08)] transition-colors"
        >
          <Home className="w-4 h-4" />
          Return to Command Center
        </Link>
      </div>
    </div>
  )
}
