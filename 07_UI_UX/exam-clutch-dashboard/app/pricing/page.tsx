"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-[#111110] text-[#F0EFE8]">
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Upgrade your CramPilot Plan</h1>
        <p className="text-[#9E9C96] text-lg">
          Get the Exam Booster Pack and unlock 100 Recovery Credits for your ultimate study plan.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* Free Plan */}
        <Card className="bg-[#0E0E0D] border-white/[0.06]">
          <CardHeader>
            <CardTitle className="text-2xl">Free Plan</CardTitle>
            <CardDescription className="text-[#706E67]">For basic study needs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold">$0</div>
            <ul className="space-y-2 mt-6">
              <li className="flex items-center gap-2 text-sm text-[#9E9C96]">
                <Check className="w-4 h-4 text-[#818CF8]" /> Limited Prompts
              </li>
              <li className="flex items-center gap-2 text-sm text-[#9E9C96]">
                <Check className="w-4 h-4 text-[#818CF8]" /> Basic Revision Mode
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full border-[#818CF8]/30 text-[#818CF8]" disabled>
              Current Plan
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="bg-[rgba(129,140,248,0.05)] border-[#818CF8]/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#818CF8] text-[#111110] px-3 py-1 text-xs font-bold rounded-bl-lg">
            POPULAR
          </div>
          <CardHeader>
            <CardTitle className="text-2xl text-[#818CF8]">Exam Booster Pack</CardTitle>
            <CardDescription className="text-[#9E9C96]">Maximize your prep time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold">$5</div>
            <ul className="space-y-2 mt-6">
              <li className="flex items-center gap-2 text-sm text-[#F0EFE8]">
                <Check className="w-4 h-4 text-[#818CF8]" /> +100 Recovery Credits
              </li>
              <li className="flex items-center gap-2 text-sm text-[#F0EFE8]">
                <Check className="w-4 h-4 text-[#818CF8]" /> Advanced PYQ Analysis
              </li>
              <li className="flex items-center gap-2 text-sm text-[#F0EFE8]">
                <Check className="w-4 h-4 text-[#818CF8]" /> Priority AI Generation
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-[#818CF8] text-[#111110] hover:bg-[#818CF8]/90" asChild>
              <a href="/api/checkout">
                Upgrade Now
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
