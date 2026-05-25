'use client'

import { Inter } from 'next/font/google'
import { AlertTriangle } from 'lucide-react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="font-sans antialiased min-h-screen bg-page-ec text-primary-ec flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[rgba(248,113,113,0.1)] border border-[rgba(248,113,113,0.2)] flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-[#F87171]" />
        </div>
        
        <h2 className="text-[24px] font-[500] text-[#F0EFE8] mb-3 tracking-[-0.02em]">
          System Failure
        </h2>
        
        <p className="text-[14px] text-[#9E9C96] max-w-[400px] mb-8 leading-[1.6]">
          A critical error occurred. Please refresh the page to restore CramPilot.
        </p>

        <button
          onClick={() => reset()}
          className="h-11 px-6 rounded-xl bg-[#818CF8] text-[#111110] text-[13px] font-[600] flex items-center justify-center gap-2 hover:bg-[#6366F1] transition-colors"
        >
          Hard Restart
        </button>
      </body>
    </html>
  )
}
