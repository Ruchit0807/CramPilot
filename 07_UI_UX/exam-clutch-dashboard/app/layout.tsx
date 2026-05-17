import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

// ── Fonts ──────────────────────────────────────────────────
// Inter: primary typeface (300–500 weight only — visual_identity.md)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500'],
})

// JetBrains Mono: for prompt cards and code display
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

// ── Metadata ───────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'CramPilot — Your AI Exam Survival Co-Pilot',
    template: '%s | CramPilot',
  },
  description:
    'An intelligent AI-powered exam co-pilot that helps students survive exams under extreme time pressure.',
  keywords: [
    'exam preparation',
    'AI study tool',
    'past paper analysis',
    'exam survival',
    'study roadmap',
    'predicted exam questions',
  ],
  authors: [{ name: 'CramPilot' }],
  openGraph: {
    type: 'website',
    siteName: 'CramPilot',
    title: 'CramPilot — Your AI Exam Survival Co-Pilot',
    description:
      'An intelligent AI-powered exam co-pilot that helps students survive exams under extreme time pressure.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CramPilot — Your AI Exam Survival Co-Pilot',
    description: 'An intelligent AI-powered exam co-pilot that helps students survive exams under extreme time pressure.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,   // Prevents zoom on input focus (mobile exam UX)
  themeColor: '#111110',
  colorScheme: 'dark',
}

// ── Root Layout ────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased min-h-screen bg-page-ec text-primary-ec">
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            classNames: {
              toast: 'bg-surface-ec border-ec text-primary-ec font-sans text-sm',
              description: 'text-secondary-ec',
            },
          }}
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
