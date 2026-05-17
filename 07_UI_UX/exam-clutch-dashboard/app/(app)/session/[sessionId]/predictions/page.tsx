import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Exam Intelligence Report' }

interface Props { params: Promise<{ sessionId: string }> }

export default async function PredictionsPage({ params }: Props) {
  const { sessionId } = await params
  return (
    <div className="p-6 lg:p-8">
      <p className="text-label text-purple-ec mb-2">EXAM INTELLIGENCE</p>
      <h1 className="text-h1 text-primary-ec mb-4">Predicted Questions</h1>
      <p className="text-body-sm text-secondary-ec mb-6">
        Session: <code className="text-mono text-purple-ec">{sessionId}</code>
      </p>
      {/* PYQ analysis results, prediction cards — Phase 2 */}
      <div className="card-intelligence rounded-lg">
        <p className="text-label text-purple-ec mb-2">PREDICTIONS</p>
        <p className="text-body-sm text-secondary-ec">
          AI prediction cards render here — Phase 2 implementation.
        </p>
      </div>
    </div>
  )
}
