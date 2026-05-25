'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle, ArrowLeft, RefreshCcw } from 'lucide-react'

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('App Boundary Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#111110] flex flex-col items-center justify-center p-6 text-center text-[#F0EFE8]">
      <div className="max-w-md w-full">
        <div className="relative mx-auto w-20 h-20 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#F87171] opacity-10 blur-2xl rounded-full" />
          <div className="relative w-16 h-16 bg-[#1C1C1A] border border-[rgba(248,113,113,0.2)] rounded-2xl flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-[#F87171]" />
          </div>
        </div>

        <h1 className="text-[28px] font-[500] tracking-tight mb-3">
          System Anomaly
        </h1>
        
        <p className="text-[15px] text-[#9E9C96] leading-relaxed mb-8">
          The co-pilot encountered an unexpected error. Take a breath — your local session state is secure. We just need to reset the view.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="h-12 w-full rounded-xl bg-[#818CF8] text-[#111110] text-[14px] font-[600] flex items-center justify-center gap-2 hover:bg-[#6366F1] transition-colors"
          >
            <RefreshCcw className="w-4 h-4" />
            Reload Interface
          </button>
          <Link
            href="/dashboard"
            className="h-12 w-full rounded-xl bg-transparent border border-[rgba(255,255,255,0.1)] text-[#F0EFE8] text-[14px] font-[500] flex items-center justify-center gap-2 hover:bg-[rgba(255,255,255,0.03)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
