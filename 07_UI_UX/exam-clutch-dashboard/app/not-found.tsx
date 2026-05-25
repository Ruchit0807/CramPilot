import Link from 'next/link'
import { AlertCircle, ArrowLeft, RotateCcw } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#111110] flex flex-col items-center justify-center p-6 text-center text-[#F0EFE8]">
      <div className="max-w-md w-full">
        {/* Glow behind the icon */}
        <div className="relative mx-auto w-20 h-20 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#F87171] opacity-10 blur-2xl rounded-full" />
          <div className="relative w-16 h-16 bg-[#1C1C1A] border border-[rgba(248,113,113,0.2)] rounded-2xl flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-[#F87171]" />
          </div>
        </div>

        <h1 className="text-[28px] font-[500] tracking-tight mb-3">
          Signal Lost
        </h1>
        
        <p className="text-[15px] text-[#9E9C96] leading-relaxed mb-8">
          Take a deep breath. Even the best co-pilots lose signal sometimes. We couldn't find the page you're looking for, but your exam survival isn't compromised.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="h-12 w-full rounded-xl bg-[#818CF8] text-[#111110] text-[14px] font-[600] flex items-center justify-center gap-2 hover:bg-[#6366F1] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Command Center
          </Link>
          <Link
            href="/session/new"
            className="h-12 w-full rounded-xl bg-transparent border border-[rgba(255,255,255,0.1)] text-[#F0EFE8] text-[14px] font-[500] flex items-center justify-center gap-2 hover:bg-[rgba(255,255,255,0.03)] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Generate New Strategy
          </Link>
        </div>
      </div>
    </div>
  )
}
