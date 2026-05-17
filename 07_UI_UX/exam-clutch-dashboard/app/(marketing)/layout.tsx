import type { Metadata } from 'next'

// ── Marketing layout (no sidebar, clean landing experience) ──
export const metadata: Metadata = {
  title: 'CramPilot — What exam are you surviving?',
  description:
    'AI-powered exam survival platform. Tell us your subject and available hours. Get a prioritized study plan in 60 seconds.',
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-page-ec">
      {children}
    </div>
  )
}
