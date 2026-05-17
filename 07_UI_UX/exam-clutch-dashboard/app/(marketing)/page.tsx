'use client'
// ============================================================
// CramPilot — Landing Page (v2)
//
// Section order re-optimized for stressed students:
// 1. Hero (with quick-start form — immediate value)
// 2. Panic Reduction Stats (ground anxiety with data early)
// 3. AI Tools (quick credibility — free tools they already have)
// 4. How It Works (time-estimated, outcome-focused)
// 5. Emergency Roadmap Preview (most calming feature — shown early)
// 6. Professor Intelligence (differentiator)
// 7. Workflow Engine (depth for interested users)
// 8. Prompt Generation (show the product)
// 9. Mobile Section (practical reassurance)
// 10. Final CTA + Testimonials with outcomes
//
// + Sticky mobile CTA (always visible after hero scrolls away)
// ============================================================

import { LandingNav } from '@/components/landing/landing-nav'
import { HeroSection } from '@/components/landing/hero-section'
import { PanicReductionSection } from '@/components/landing/panic-reduction-section'
import { AIToolsSection } from '@/components/landing/ai-tools-section'
import { HowItWorksSection } from '@/components/landing/how-it-works-section'
import { RoadmapSection } from '@/components/landing/roadmap-section'
import { ProfessorSection } from '@/components/landing/professor-section'
import { WorkflowSection } from '@/components/landing/workflow-section'
import { PromptSection } from '@/components/landing/prompt-section'
import { MobileSection } from '@/components/landing/mobile-section'
import { FinalCTASection } from '@/components/landing/final-cta-section'
import { StickyCTA } from '@/components/landing/sticky-cta'

function Divider() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#111110] text-[#F0EFE8]">
      {/* Always-visible navigation */}
      <LandingNav />

      <main>
        {/* 1 — Hero with inline quick-start form */}
        <HeroSection />

        {/* 2 — Panic reduction: "You have more time than you think" (data-backed) */}
        <PanicReductionSection />

        <Divider />

        {/* 3 — AI tools: quick credibility strip */}
        <AIToolsSection />

        <Divider />

        {/* 4 — How it works: time-estimated, outcome-per-step */}
        <HowItWorksSection />

        <Divider />

        {/* 5 — Emergency roadmap: shown EARLY because it's the most calming */}
        <RoadmapSection />

        <Divider />

        {/* 6 — Professor intelligence: the key differentiator */}
        <ProfessorSection />

        <Divider />

        {/* 7 — Workflow engine: depth for engaged users */}
        <WorkflowSection />

        <Divider />

        {/* 8 — Prompt generation: product demo */}
        <PromptSection />

        <Divider />

        {/* 9 — Mobile section: practical reassurance */}
        <MobileSection />

        {/* 10 — Final CTA + testimonials with specific outcomes */}
        <FinalCTASection />
      </main>

      {/* Sticky mobile CTA — appears after hero scrolls away */}
      <StickyCTA />
    </div>
  )
}
