'use client'
// ============================================================
// CramPilot — Mobile Navigation Bar
// Fixed bottom nav, 4 tabs, thumb-zone optimized
// ============================================================

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FileText, Calendar, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store'

const NAV_ITEMS = [
  { label: 'Session', icon: Home, href: '/dashboard', id: 'session' as const },
  { label: 'Prompts', icon: FileText, href: '/prompts', id: 'prompts' as const },
  { label: 'Schedule', icon: Calendar, href: '/schedule', id: 'schedule' as const },
  { label: 'Profile', icon: User, href: '/profile', id: 'profile' as const },
]

export function MobileNav() {
  const pathname = usePathname()
  const { activeMobileTab, setActiveMobileTab } = useUIStore()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 lg:hidden bg-surface-ec border-t border-ec safe-bottom z-50"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-14">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href) || activeMobileTab === item.id

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActiveMobileTab(item.id)}
              className={cn(
                'touch-target flex flex-col items-center gap-0.5 px-4',
                'transition-colors duration-150',
                isActive ? 'text-purple-ec' : 'text-tertiary-ec'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="text-caption">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
