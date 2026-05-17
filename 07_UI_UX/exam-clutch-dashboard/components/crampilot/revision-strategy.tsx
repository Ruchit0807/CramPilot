"use client";

import { RotateCcw, Zap, Brain, Clock, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const strategies = [
  {
    id: "spaced",
    title: "Spaced Repetition",
    description: "Review at optimal intervals",
    timing: "Every 2-4 hrs",
    icon: Clock,
    active: true,
  },
  {
    id: "active",
    title: "Active Recall",
    description: "Test yourself frequently",
    timing: "After each topic",
    icon: Brain,
    active: true,
  },
  {
    id: "pomodoro",
    title: "Pomodoro Bursts",
    description: "25 min focus, 5 min break",
    timing: "Throughout",
    icon: Zap,
    active: false,
  },
];

export function RevisionStrategy() {
  return (
    <Card className="border-border/50 bg-card/50 p-6 backdrop-blur-sm">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10 ring-1 ring-chart-4/20">
            <RotateCcw className="h-5 w-5 text-chart-4" />
          </div>
          <div>
            <h3 className="font-semibold">Revision Strategy</h3>
            <p className="text-sm text-muted-foreground">Science-backed methods</p>
          </div>
        </div>

        <div className="space-y-3">
          {strategies.map((strategy) => (
            <div
              key={strategy.id}
              className={`flex items-start gap-3 rounded-lg p-3 transition-all ${
                strategy.active
                  ? "bg-chart-4/10 ring-1 ring-chart-4/30"
                  : "bg-secondary/30 ring-1 ring-border/50"
              }`}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                strategy.active ? "bg-chart-4/20" : "bg-secondary"
              }`}>
                <strategy.icon className={`h-5 w-5 ${strategy.active ? "text-chart-4" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium">{strategy.title}</h4>
                  {strategy.active && (
                    <CheckCircle className="h-3.5 w-3.5 text-chart-4" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{strategy.description}</p>
                <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] ${
                  strategy.active
                    ? "bg-chart-4/20 text-chart-4"
                    : "bg-secondary text-muted-foreground"
                }`}>
                  {strategy.timing}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-chart-4/5 p-3 ring-1 ring-chart-4/20">
          <Brain className="h-4 w-4 shrink-0 text-chart-4" />
          <p className="text-xs text-muted-foreground">
            These strategies increase retention by up to <span className="font-semibold text-chart-4">40%</span>
          </p>
        </div>
      </div>
    </Card>
  );
}
