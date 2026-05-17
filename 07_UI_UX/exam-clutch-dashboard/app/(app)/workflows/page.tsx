import type { Metadata } from 'next'
import { GitBranch } from 'lucide-react'
import { StubPage } from '@/components/layout/stub-page'

export const metadata: Metadata = {
  title: 'AI Workflows — CramPilot',
  description: 'Multi-AI study workflows: Claude for learning, NotebookLM for audio, ChatGPT for practice, Gemini for revision.',
}

export default function WorkflowsPage() {
  return (
    <StubPage
      icon={<GitBranch className="w-9 h-9" />}
      title="AI Workflow Engine"
      description="Your personalized multi-AI study pipeline. Each phase is calibrated to your subject, hours remaining, and professor style."
      accentColor="#818CF8"
      accentBg="rgba(129,140,248,0.1)"
      badge="4 AI Tools"
      features={[
        'Phase 1 — Claude: deep concept loading',
        'Phase 2 — NotebookLM: audio revision podcast',
        'Phase 3 — ChatGPT: practice problem drills',
        'Phase 4 — Gemini: rapid last-minute revision',
        'Adaptive ordering based on urgency level',
      ]}
      comingSoon
    />
  )
}
