import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Settings' }

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <p className="text-label text-purple-ec mb-2">SETTINGS</p>
      <h1 className="text-h1 text-primary-ec mb-6">Preferences</h1>
      <div className="card-action rounded-lg p-6">
        <p className="text-label text-tertiary-ec">STUB — Phase 2</p>
        <p className="text-body-sm text-secondary-ec mt-2">
          Settings and preferences — Phase 2 implementation.
        </p>
      </div>
    </div>
  )
}
