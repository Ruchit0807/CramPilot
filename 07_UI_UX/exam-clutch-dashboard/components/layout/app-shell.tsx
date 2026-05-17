'use client'
// ============================================================
// CramPilot — App Shell (Sidebar + Mobile Nav)
// Refactored: usePathname-driven active state, Link navigation
// ============================================================

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap, GitBranch, Package, RotateCcw, BarChart3,
  Layers, CalendarDays, LayoutDashboard, ChevronRight,
  Menu, X, Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Nav item definitions ─────────────────────────────────────
const NAV_ITEMS = [
  { id: 'dashboard',  label: 'Dashboard',      href: '/dashboard',  icon: LayoutDashboard, badge: null,  accent: 'purple' },
  { id: 'emergency',  label: 'Emergency Prep', href: '/emergency',  icon: Zap,             badge: 'HOT', accent: 'amber'  },
  { id: 'workflows',  label: 'AI Workflows',   href: '/workflows',  icon: GitBranch,       badge: null,  accent: 'purple' },
  { id: 'prompts',    label: 'Prompt Packs',   href: '/prompts',    icon: Package,         badge: '24',  accent: 'purple' },
  { id: 'revision',   label: 'Revision Mode',  href: '/revision',   icon: RotateCcw,       badge: null,  accent: 'sage'   },
  { id: 'pyq',        label: 'PYQ Analysis',   href: '/pyq',        icon: BarChart3,       badge: null,  accent: 'purple' },
  { id: 'flashcards', label: 'Flashcards',     href: '/flashcards', icon: Layers,          badge: null,  accent: 'sage'   },
  { id: 'schedule',   label: 'Schedule',       href: '/schedule',   icon: CalendarDays,    badge: null,  accent: 'amber'  },
] as const

// Bottom nav — condensed 4 items for mobile
const MOBILE_NAV_ITEMS = [
  { id: 'dashboard', label: 'Command',   href: '/dashboard',  icon: LayoutDashboard },
  { id: 'emergency', label: 'Emergency', href: '/emergency',  icon: Zap             },
  { id: 'prompts',   label: 'Prompts',   href: '/prompts',    icon: Package         },
  { id: 'schedule',  label: 'Schedule',  href: '/schedule',   icon: CalendarDays    },
] as const

// ── Shared active state helper ───────────────────────────────
function isRouteActive(pathname: string, href: string): boolean {
  if (href === '/dashboard') return pathname === '/dashboard'
  return pathname === href || pathname.startsWith(href + '/')
}

// ── Desktop / Drawer nav item (Link-based) ───────────────────
function NavItem({
  item,
  isActive,
  onClick,
}: {
  item: (typeof NAV_ITEMS)[number]
  isActive: boolean
  onClick?: () => void
}) {
  const Icon = item.icon
  return (
    <Link href={item.href} onClick={onClick} prefetch>
      <motion.div
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg',
          'transition-all duration-150 group cursor-pointer',
          isActive
            ? 'bg-[rgba(129,140,248,0.12)] text-[#818CF8] border border-[rgba(129,140,248,0.25)]'
            : 'text-[#9E9C96] hover:text-[#F0EFE8] hover:bg-[rgba(255,255,255,0.04)] border border-transparent'
        )}
      >
        {/* Active indicator bar */}
        {isActive && (
          <motion.div
            layoutId="sidebar-active"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#818CF8] rounded-full"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}

        <Icon className={cn(
          'w-4 h-4 shrink-0 transition-colors',
          isActive ? 'text-[#818CF8]' : 'text-[#706E67] group-hover:text-[#9E9C96]'
        )} />

        <span className="text-[13px] font-[450] leading-none flex-1">{item.label}</span>

        {item.badge && (
          <span className={cn(
            'text-[10px] font-[600] px-1.5 py-0.5 rounded-sm leading-none',
            item.badge === 'HOT'
              ? 'bg-[rgba(251,191,36,0.15)] text-[#FBBF24] border border-[rgba(251,191,36,0.25)]'
              : 'bg-[rgba(129,140,248,0.15)] text-[#818CF8] border border-[rgba(129,140,248,0.2)]'
          )}>
            {item.badge}
          </span>
        )}

        {isActive && <ChevronRight className="w-3 h-3 text-[#818CF8] opacity-60" />}
      </motion.div>
    </Link>
  )
}

// ── Main Shell ───────────────────────────────────────────────
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <div className="flex min-h-screen bg-[#111110]">

      {/* ── Desktop Sidebar ─────────────────────────────────── */}
      <aside className="hidden lg:flex w-[220px] min-h-screen flex-col bg-[#0E0E0D] border-r border-[rgba(255,255,255,0.06)] shrink-0">
        {/* Brand */}
        <div className="px-4 pt-6 pb-5 border-b border-[rgba(255,255,255,0.06)]">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[rgba(129,140,248,0.15)] border border-[rgba(129,140,248,0.3)] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#818CF8]" />
            </div>
            <div>
              <p className="text-[13px] font-[600] text-[#F0EFE8] tracking-[-0.01em]">CramPilot</p>
              <p className="text-[10px] text-[#706E67] font-[500] tracking-[0.04em] uppercase">AI Command Center</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          <p className="text-[10px] font-[600] text-[#706E67] tracking-[0.08em] uppercase px-3 mb-3">Navigation</p>
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={isRouteActive(pathname, item.href)}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[rgba(129,140,248,0.06)] border border-[rgba(129,140,248,0.15)]">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#818CF8] to-[#a5b4fc] flex items-center justify-center text-[11px] font-[600] text-[#111110]">
              S
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-[500] text-[#F0EFE8] truncate">Student</p>
              <p className="text-[10px] text-[#706E67] truncate">Free Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Mobile Header ───────────────────────────────────── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[rgba(14,14,13,0.95)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[rgba(129,140,248,0.15)] border border-[rgba(129,140,248,0.25)] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-[#818CF8]" />
            </div>
            <span className="text-[13px] font-[600] text-[#F0EFE8]">CramPilot</span>
          </Link>
          <button
            onClick={() => setMobileOpen(true)}
            className="w-10 h-10 flex items-center justify-center text-[#9E9C96] hover:text-[#F0EFE8]"
            aria-label="Open navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ───────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 z-50 bg-[#0E0E0D] border-r border-[rgba(255,255,255,0.08)] flex flex-col"
            >
              <div className="flex items-center justify-between px-4 h-14 border-b border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#818CF8]" />
                  <span className="text-[13px] font-[600] text-[#F0EFE8]">CramPilot</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-[#9E9C96]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                <p className="text-[10px] font-[600] text-[#706E67] tracking-[0.08em] uppercase px-3 mb-3">Navigation</p>
                {NAV_ITEMS.map((item) => (
                  <NavItem
                    key={item.id}
                    item={item}
                    isActive={isRouteActive(pathname, item.href)}
                    onClick={() => setMobileOpen(false)}
                  />
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ─────────────────────────────────────── */}
      <main className="flex-1 min-w-0 overflow-y-auto pt-14 lg:pt-0 pb-20 lg:pb-0">
        {children}
      </main>

      {/* ── Mobile Bottom Nav ─────────────────────────────────── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[rgba(14,14,13,0.96)] backdrop-blur-xl border-t border-[rgba(255,255,255,0.07)]">
        <div className="flex items-center justify-around px-2 h-16">
          {MOBILE_NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = isRouteActive(pathname, item.href)
            return (
              <Link
                key={item.id}
                href={item.href}
                prefetch
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-0',
                  isActive ? 'text-[#818CF8]' : 'text-[#706E67] hover:text-[#9E9C96]'
                )}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {isActive && (
                    <motion.div
                      layoutId="bottom-nav-dot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#818CF8]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>
                <span className="text-[10px] font-[500]">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
