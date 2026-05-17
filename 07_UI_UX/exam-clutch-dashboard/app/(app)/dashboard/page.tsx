import type { Metadata } from 'next'
import { DashboardPage } from '@/components/dashboard/dashboard-page'

export const metadata: Metadata = {
  title: 'Dashboard — Exam Command Center',
  description: 'Your AI-powered exam survival command center. Configure your session, analyze professor patterns, and generate a personalized strategy.',
}

// ── Dashboard Route ─────────────────────────────────────────
// Server component — renders the client DashboardPage
export default function DashboardRoute() {
  return <DashboardPage />
}
