'use client'
// ============================================================
// CramPilot — Mobile Section
// Showcases mobile-first UX with feature grid
// ============================================================

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Smartphone, Zap, Battery, Globe, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const MOBILE_FEATURES = [
  {
    icon: Smartphone,
    title: 'Designed for thumbs',
    description: 'Every touch target meets the 44px standard. Your phone, not your laptop, is your exam companion.',
  },
  {
    icon: Zap,
    title: 'Instant access',
    description: 'No login required to start. Enter your subject and go. Credentials never block panicked students.',
  },
  {
    icon: Battery,
    title: 'Works offline',
    description: 'Your study plan and prompts are cached locally. Studying at 2 AM with spotty WiFi? Still works.',
  },
  {
    icon: Globe,
    title: 'Any browser',
    description: 'No app download required. Open in Safari, Chrome, or any mobile browser — same full experience.',
  },
]

const MOBILE_SCREEN_BLOCKS = [
  { label: 'Contract Formation', status: 'CRITICAL', color: 'text-purple-ec', dot: 'bg-purple-ec', done: true },
  { label: 'Breach & Remedies', status: 'CRITICAL', color: 'text-purple-ec', dot: 'bg-purple-ec', done: false },
  { label: "Directors' Duties", status: 'CRITICAL', color: 'text-purple-ec', dot: 'bg-purple-ec', done: false },
  { label: 'Company Types', status: 'MODERATE', color: 'text-secondary-ec', dot: 'bg-white/20', done: false },
  { label: 'Historical Dev.', status: 'SKIP', color: 'text-tertiary-ec', dot: 'bg-transparent', done: false },
]

export function MobileSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 relative">
      <div className="absolute right-0 bottom-1/4 w-[300px] h-[400px] bg-purple-ec/[0.03] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="text-label text-purple-ec mb-3"
            >
              MOBILE-FIRST PREPARATION
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-h1 sm:text-[2rem] text-primary-ec font-medium tracking-tight mb-4"
            >
              Most stressed students study from their phones
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.15 }}
              className="text-body text-secondary-ec mb-10 leading-relaxed"
            >
              CramPilot was designed mobile-first. Every interaction — from the 
              professor survey to copying prompts — is optimized for one hand, 
              in low light, at 1 AM.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {MOBILE_FEATURES.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-ec/10 border border-purple-ec/20 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-purple-ec" />
                    </div>
                    <div>
                      <p className="text-body-sm font-medium text-primary-ec mb-1">{feature.title}</p>
                      <p className="text-body-sm text-secondary-ec leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            {/* Phone shell */}
            <div className="relative w-[280px]">
              {/* Glow */}
              <div className="absolute -inset-8 bg-purple-ec/[0.07] blur-3xl rounded-full" />

              {/* Device frame */}
              <div className="relative rounded-[2.5rem] border-2 border-white/15 bg-[#0D0D0C] shadow-2xl shadow-black/50 overflow-hidden">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-3 pb-1">
                  <span className="text-caption text-secondary-ec">9:41</span>
                  <div className="w-20 h-4 bg-[#0D0D0C] rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-0" />
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                    <div className="w-4 h-2 rounded-sm border border-white/30 p-px">
                      <div className="w-2 h-full rounded-sm bg-white/40" />
                    </div>
                  </div>
                </div>

                {/* Screen content */}
                <div className="px-4 pb-8">
                  {/* Header */}
                  <div className="py-4">
                    <p className="text-caption text-purple-ec">CORPORATE LAW · 14h LEFT</p>
                    <p className="text-h3 text-primary-ec mt-1">Your Priority List</p>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-caption mb-1.5">
                      <span className="text-secondary-ec">Progress</span>
                      <span className="text-purple-ec">1 of 3 critical</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/10">
                      <div className="h-full w-1/3 rounded-full bg-purple-ec" />
                    </div>
                  </div>

                  {/* Topic list */}
                  <div className="space-y-2">
                    {MOBILE_SCREEN_BLOCKS.map((block) => (
                      <div
                        key={block.label}
                        className={cn(
                          'flex items-center gap-2.5 px-3 py-2.5 rounded-lg border',
                          block.done ? 'border-sage-ec/20 bg-sage-ec/[0.04]' : 'border-white/[0.06]',
                          block.status === 'SKIP' && 'opacity-40'
                        )}
                      >
                        <div
                          className={cn(
                            'w-4 h-4 rounded-sm border flex items-center justify-center shrink-0',
                            block.done ? 'border-sage-ec bg-sage-ec/20' : 'border-white/20'
                          )}
                        >
                          {block.done && <CheckCircle className="w-2.5 h-2.5 text-sage-ec" />}
                        </div>
                        <span
                          className={cn(
                            'text-caption flex-1',
                            block.done ? 'line-through text-tertiary-ec' : 'text-primary-ec',
                            block.status === 'SKIP' && 'line-through text-tertiary-ec'
                          )}
                        >
                          {block.label}
                        </span>
                        <span className={cn('text-caption shrink-0', block.color)}>
                          {block.done ? '✓' : block.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom nav */}
                  <div className="mt-6 flex justify-around border-t border-white/[0.06] pt-3">
                    {['Session', 'Prompts', 'Schedule', 'Profile'].map((tab) => (
                      <span
                        key={tab}
                        className={cn(
                          'text-caption',
                          tab === 'Session' ? 'text-purple-ec' : 'text-tertiary-ec'
                        )}
                      >
                        {tab}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
