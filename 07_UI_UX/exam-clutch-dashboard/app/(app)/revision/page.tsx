import type { Metadata } from 'next'
import { RotateCcw } from 'lucide-react'
import { StubPage } from '@/components/layout/stub-page'

export const metadata: Metadata = {
  title: 'Revision Mode — CramPilot',
  description: 'Spaced repetition and active recall revision system calibrated to your exam window.',
}

export default function RevisionPage() {
  return (
    <StubPage
      icon={<RotateCcw className="w-9 h-9" />}
      title="Revision Mode"
      description="Science-backed revision using spaced repetition, active recall, and teach-back methods — sequenced for your specific exam window."
      accentColor="#4ADE80"
      accentBg="rgba(74,222,128,0.08)"
      badge="Evidence-Based"
      features={[
        'Active recall drills on critical topics',
        'Spaced repetition schedule (1h → 4h → exam morning)',
        'Teach-back prompts to identify gaps',
        'PYQ timed simulation with grading',
        'Audio revision via NotebookLM integration',
      ]}
      comingSoon
    />
  )
}
