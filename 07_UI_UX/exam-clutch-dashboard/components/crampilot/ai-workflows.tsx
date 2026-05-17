"use client";

import { Sparkles, Wand2, Lightbulb, Rocket, Brain, ListChecks } from "lucide-react";
import { Card } from "@/components/ui/card";

const workflows = [
  {
    id: "smart-summary",
    title: "Smart Summary",
    description: "AI-condensed notes from your materials",
    icon: Lightbulb,
    color: "primary",
    badge: "Popular",
  },
  {
    id: "problem-solver",
    title: "Problem Solver",
    description: "Step-by-step solutions for practice",
    icon: Wand2,
    color: "chart-2",
    badge: null,
  },
  {
    id: "concept-mapper",
    title: "Concept Mapper",
    description: "Visual connections between topics",
    icon: Brain,
    color: "chart-3",
    badge: "New",
  },
  {
    id: "mock-generator",
    title: "Mock Generator",
    description: "Practice questions in exam format",
    icon: ListChecks,
    color: "chart-5",
    badge: null,
  },
  {
    id: "speed-learn",
    title: "Speed Learn",
    description: "Accelerated learning techniques",
    icon: Rocket,
    color: "chart-4",
    badge: "Pro",
  },
];

const colorClasses: Record<string, { bg: string; text: string; ring: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary", ring: "ring-primary/30" },
  "chart-2": { bg: "bg-chart-2/10", text: "text-chart-2", ring: "ring-chart-2/30" },
  "chart-3": { bg: "bg-chart-3/10", text: "text-chart-3", ring: "ring-chart-3/30" },
  "chart-4": { bg: "bg-chart-4/10", text: "text-chart-4", ring: "ring-chart-4/30" },
  "chart-5": { bg: "bg-chart-5/10", text: "text-chart-5", ring: "ring-chart-5/30" },
};

export function AIWorkflows() {
  return (
    <Card className="col-span-full border-border/50 bg-card/50 p-6 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">AI Workflow Recommendations</h3>
              <p className="text-sm text-muted-foreground">Optimized for your exam prep</p>
            </div>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/30">
            5 Active
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {workflows.map((workflow) => {
            const colors = colorClasses[workflow.color];
            return (
              <button
                key={workflow.id}
                className={`group relative flex flex-col items-center gap-3 rounded-xl bg-secondary/30 p-4 text-center ring-1 ring-border/50 transition-all hover:bg-secondary/50 hover:ring-border active:scale-[0.98]`}
              >
                {workflow.badge && (
                  <span className={`absolute -top-2 right-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${colors.bg} ${colors.text} ring-1 ${colors.ring}`}>
                    {workflow.badge}
                  </span>
                )}
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ring-1 ${colors.ring} transition-transform group-hover:scale-110`}>
                  <workflow.icon className={`h-6 w-6 ${colors.text}`} />
                </div>
                <div>
                  <h4 className="text-sm font-medium">{workflow.title}</h4>
                  <p className="mt-0.5 text-xs text-muted-foreground">{workflow.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
