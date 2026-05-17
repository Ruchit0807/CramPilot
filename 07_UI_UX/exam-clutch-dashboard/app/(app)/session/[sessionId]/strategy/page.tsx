import type { Metadata } from 'next'
import { ResultsPage } from '@/components/results/results-page'

export const metadata: Metadata = {
  title: 'Exam Survival Strategy',
  description: 'Your AI-generated personalized exam strategy with topic priorities, prompts, and hour-by-hour roadmap.',
}

interface Props { params: Promise<{ sessionId: string }> }

export default async function StrategyPage({ params }: Props) {
  // sessionId available for future server-side data fetching
  await params
  return <ResultsPage />
}
