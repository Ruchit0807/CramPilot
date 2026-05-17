// ============================================================
// CramPilot — (app) Group Layout
// Wraps all pages with AppShell + page transitions
// ============================================================
import type { Metadata } from 'next'
import { AppShell } from '@/components/layout/app-shell'
import { PageTransitionProvider } from '@/components/providers/page-transition-provider'

export const metadata: Metadata = {
  title: 'Exam Command Center',
  description: 'AI-powered exam survival dashboard — configure your session and generate a personalized study strategy.',
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <PageTransitionProvider>
        {children}
      </PageTransitionProvider>
    </AppShell>
  )
}
