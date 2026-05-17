import type { Metadata } from 'next'
import { Zap } from 'lucide-react'
import { StubPage } from '@/components/layout/stub-page'

export const metadata: Metadata = {
  title: 'Emergency Prep — CramPilot',
  description: 'High-urgency exam survival mode. Prioritized content for students with under 12 hours to exam.',
}

export default function EmergencyPage() {
  return (
    <StubPage
      icon={<Zap className="w-9 h-9" />}
      title="Emergency Prep Mode"
      description="When time is critical, this mode strips everything non-essential. You see only the 3–5 highest-ROI topics, a locked survival timeline, and emergency prompt packs."
      accentColor="#F87171"
      accentBg="rgba(248,113,113,0.1)"
      badge="🚨 Emergency Mode"
      features={[
        'Top 5 topics by PYQ frequency × marks weight',
        'Minute-by-minute execution countdown',
        'Pre-loaded emergency AI prompts',
        'Professor trap warnings for each topic',
        'Skip list: everything that wastes time',
      ]}
    />
  )
}
