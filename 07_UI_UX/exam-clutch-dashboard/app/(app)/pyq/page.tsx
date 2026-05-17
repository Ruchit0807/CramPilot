import type { Metadata } from 'next'
import { BarChart3 } from 'lucide-react'
import { StubPage } from '@/components/layout/stub-page'

export const metadata: Metadata = {
  title: 'PYQ Analysis — CramPilot',
  description: 'Past year question pattern analysis to identify high-frequency topics and predict what your professor will ask.',
}

export default function PYQPage() {
  return (
    <StubPage
      icon={<BarChart3 className="w-9 h-9" />}
      title="PYQ Pattern Analysis"
      description="Upload past year papers and instantly see which topics repeat most often, how marks are distributed, and what Dr. Mehta is likely to ask this year."
      accentColor="#FBBF24"
      accentBg="rgba(251,191,36,0.08)"
      badge="Predictive AI"
      features={[
        'Topic frequency chart across 5 years',
        'Marks distribution heatmap by section',
        'Professor question-style fingerprinting',
        'Year-over-year pattern shifts',
        'High-probability question predictions',
      ]}
      comingSoon
    />
  )
}
