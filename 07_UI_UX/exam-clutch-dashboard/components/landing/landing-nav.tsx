'use client'
// ============================================================
// CramPilot — Landing Navigation (v2)
// Improvements:
// - "Start Emergency Prep" CTA appears in nav after scroll
// - Reduced link count (less cognitive load)
// - Better mobile menu UX
// ============================================================

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Professor AI', href: '#professor' },
  { label: 'Prompts', href: '#prompts' },
  { label: 'Pricing', href: '/pricing' },
]

export function LandingNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [showNavCTA, setShowNavCTA] = useState(false)

  useEffect(() => {
    const handler = () => {
      const scrolled = window.scrollY > 24
      setIsScrolled(scrolled)
      // Show CTA in nav after hero scrolls away
      setShowNavCTA(window.scrollY > window.innerHeight * 0.7)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#111110]/92 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-32">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <Image 
              src="/logo-transparent.png" 
              alt="CramPilot Logo" 
              width={400} 
              height={120} 
              className="h-24 w-auto object-contain brightness-0 invert" 
              priority
            />
          </Link>

          {/* Desktop center links */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-body-sm text-[#9E9C96] hover:text-[#F0EFE8] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-body-sm text-[#9E9C96] hover:text-[#F0EFE8] transition-colors"
            >
              Dashboard
            </Link>

            {/* CTA fades in after scroll — replaces "Sign in" */}
            <AnimatePresence mode="wait">
              {showNavCTA ? (
                <motion.div
                  key="nav-cta"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href="/session/new"
                    className="touch-target px-4 py-2 rounded-lg bg-[#818CF8] text-[#111110] text-body-sm font-medium hover:bg-[#818CF8]/90 transition-all duration-150 shadow-md shadow-[#818CF8]/20"
                  >
                    Build My Plan →
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="start-free"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href="/login"
                    className="touch-target px-4 py-2 rounded-lg border border-[#818CF8]/30 text-[#818CF8] text-body-sm hover:bg-[#818CF8]/8 transition-all duration-150"
                  >
                    Log in
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden touch-target text-[#9E9C96] hover:text-[#F0EFE8]"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-[#161615] border-b border-white/[0.06]"
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="py-3 text-body-sm text-[#9E9C96] hover:text-[#F0EFE8] border-b border-white/[0.04] last:border-0 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 pb-1">
                <Link
                  href="/session/new"
                  className="flex items-center justify-center w-full py-3 rounded-xl bg-[#818CF8] text-[#111110] text-body-sm font-medium"
                >
                  Build My Study Plan →
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
