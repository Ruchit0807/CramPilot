import type { Metadata } from 'next'
import { Package } from 'lucide-react'
import { StubPage } from '@/components/layout/stub-page'

export const metadata: Metadata = {
  title: 'Prompt Packs — CramPilot',
  description: 'Ready-to-use AI prompt templates calibrated to your subject, professor, and exam urgency level.',
}

export default function PromptsPage() {
  return (
    <StubPage
      icon={<Package className="w-9 h-9" />}
      title="Prompt Pack Library"
      description="24 ready-to-copy AI prompts generated specifically for your subject and professor. Open in Claude, ChatGPT, or Gemini with one tap."
      accentColor="#F97316"
      accentBg="rgba(249,115,22,0.1)"
      badge="24 Prompts"
      features={[
        'Deep-learn prompts for each critical topic',
        'Practice problem generators with difficulty scaling',
        'Professor-style question predictors',
        'Cheat sheet and formula card generators',
        'Flashcard set creation prompts',
      ]}
      comingSoon
    />
  )
}
