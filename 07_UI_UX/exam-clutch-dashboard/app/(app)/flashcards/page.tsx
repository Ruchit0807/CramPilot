import type { Metadata } from 'next'
import { Layers } from 'lucide-react'
import { StubPage } from '@/components/layout/stub-page'

export const metadata: Metadata = {
  title: 'Flashcards — CramPilot',
  description: 'Active recall flashcard drills generated from your syllabus and critical topics.',
}

export default function FlashcardsPage() {
  return (
    <StubPage
      icon={<Layers className="w-9 h-9" />}
      title="Flashcard Drill System"
      description="30+ AI-generated flashcards covering every critical topic in your exam. Flip, self-test, and track which concepts you're shaky on."
      accentColor="#8B5CF6"
      accentBg="rgba(139,92,246,0.1)"
      badge="Active Recall"
      features={[
        '30 targeted Q&A flashcards per session',
        '3D flip card with self-rating system',
        'Weak card isolation for repeated drilling',
        'Spaced repetition ordering algorithm',
        'ChatGPT prompt to generate 100+ more',
      ]}
      comingSoon
    />
  )
}
