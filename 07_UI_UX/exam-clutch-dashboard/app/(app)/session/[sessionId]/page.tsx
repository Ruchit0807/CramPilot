import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Your Exam Strategy' }

interface Props {
  params: Promise<{ sessionId: string }>
}

export default async function SessionPage({ params }: Props) {
  const { sessionId } = await params
  return (
    <div className="p-6 lg:p-8">
      <p className="text-label text-purple-ec mb-2">SESSION</p>
      <h1 className="text-h1 text-primary-ec mb-4">Session Overview</h1>
      <p className="text-body-sm text-secondary-ec">
        Session ID: <code className="text-mono text-purple-ec">{sessionId}</code>
      </p>
      <div className="mt-6 card-action rounded-lg p-6">
        <p className="text-label text-tertiary-ec">STUB — Phase 2</p>
      </div>
    </div>
  )
}
