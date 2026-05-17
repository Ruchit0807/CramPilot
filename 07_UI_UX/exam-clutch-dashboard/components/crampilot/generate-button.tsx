"use client";

import { Rocket, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GenerateButton() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-chart-2/10 to-chart-3/10 p-6 ring-1 ring-primary/30">
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-chart-2/10 blur-3xl" />
      
      <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/20 ring-1 ring-primary/30">
          <Rocket className="h-7 w-7 text-primary" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Ready to Clutch Your Exam?</h3>
          <p className="text-sm text-muted-foreground">
            Generate your personalized AI-powered study plan now
          </p>
        </div>
        
        <Button
          size="lg"
          className="group gap-2 bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
        >
          <Sparkles className="h-4 w-4" />
          Generate Plan
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
    </div>
  );
}
