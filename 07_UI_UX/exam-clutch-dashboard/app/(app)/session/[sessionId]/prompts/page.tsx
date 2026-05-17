import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Ready-to-Paste Prompts' }

interface Props { params: Promise<{ sessionId: string }> }

export default async function PromptsPage({ params }: Props) {
  const { sessionId } = await params
  return (
    <div className="p-6 lg:p-8">
      <p className="text-label text-purple-ec mb-2">YOUR PROMPT PACK</p>
      <h1 className="text-h1 text-primary-ec mb-4">Ready-to-Paste Prompts</h1>
      <p className="text-body-sm text-secondary-ec mb-6">
        Session: <code className="text-mono text-purple-ec">{sessionId}</code>
      </p>
      {/* Prompt library with filters — Phase 2 */}
      <div className="card-action rounded-lg p-6">
        <p className="text-label text-tertiary-ec mb-2">PROMPT CARDS</p>
        <p className="text-body-sm text-secondary-ec">
          Prompt pack with filter bar renders here — Phase 2 implementation.
        </p>
      </div>
    </div>
  )
}
