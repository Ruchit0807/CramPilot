import type { Metadata } from 'next'
import { CalendarDays } from 'lucide-react'
import { StubPage } from '@/components/layout/stub-page'

export const metadata: Metadata = {
  title: 'Schedule — CramPilot',
  description: 'Hour-by-hour study schedule built around your exam window, energy levels, and topic priorities.',
}

export default function SchedulePage() {
  return (
    <StubPage
      icon={<CalendarDays className="w-9 h-9" />}
      title="Study Schedule"
      description="Your personalized hour-by-hour study roadmap — with built-in breaks, sleep optimization, and topic sequencing based on cognitive load science."
      accentColor="#3B82F6"
      accentBg="rgba(59,130,246,0.1)"
      badge="18h Roadmap"
      features={[
        'Hour-by-hour block timeline with AI tool assignments',
        'Mandatory sleep and break enforcement',
        'Energy-aware topic sequencing',
        'Revision checkpoints at key intervals',
        'Exam morning warm-up protocol',
      ]}
      comingSoon
    />
  )
}
