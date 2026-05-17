"use client";

import { useState, useEffect } from "react";
import { Clock, Minus, Plus, Timer, Flame } from "lucide-react";
import { Card } from "@/components/ui/card";

export function TimeRemaining() {
  const [hours, setHours] = useState(36);
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    setIsUrgent(hours <= 12);
  }, [hours]);

  const adjustHours = (delta: number) => {
    setHours(Math.max(1, Math.min(96, hours + delta)));
  };

  const getTimeCategory = () => {
    if (hours <= 6) return { label: "Critical", color: "text-destructive" };
    if (hours <= 12) return { label: "Urgent", color: "text-chart-5" };
    if (hours <= 24) return { label: "Focused", color: "text-chart-3" };
    if (hours <= 48) return { label: "Standard", color: "text-primary" };
    return { label: "Relaxed", color: "text-chart-2" };
  };

  const category = getTimeCategory();

  return (
    <Card className={`group relative overflow-hidden border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80 ${isUrgent ? "ring-1 ring-chart-5/30" : ""}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${isUrgent ? "from-chart-5/10" : "from-primary/5"} via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100`} />
      
      <div className="relative space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isUrgent ? "bg-chart-5/10 ring-1 ring-chart-5/20" : "bg-primary/10 ring-1 ring-primary/20"}`}>
              {isUrgent ? (
                <Flame className="h-5 w-5 text-chart-5" />
              ) : (
                <Clock className="h-5 w-5 text-primary" />
              )}
            </div>
            <div>
              <h3 className="font-semibold">Time Until Exam</h3>
              <p className="text-sm text-muted-foreground">Plan your sprint</p>
            </div>
          </div>
          <div className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ${isUrgent ? "bg-chart-5/10 text-chart-5 ring-chart-5/30" : "bg-primary/10 text-primary ring-primary/30"}`}>
            {category.label}
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => adjustHours(-6)}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/50 ring-1 ring-border/50 transition-all hover:bg-secondary hover:ring-border active:scale-95"
          >
            <Minus className="h-5 w-5 text-muted-foreground" />
          </button>

          <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-1">
              <span className={`text-5xl font-bold tracking-tight ${category.color}`}>
                {hours}
              </span>
              <span className="text-lg text-muted-foreground">hrs</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <Timer className="h-3 w-3" />
              <span>{Math.floor(hours / 24)}d {hours % 24}h remaining</span>
            </div>
          </div>

          <button
            onClick={() => adjustHours(6)}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/50 ring-1 ring-border/50 transition-all hover:bg-secondary hover:ring-border active:scale-95"
          >
            <Plus className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1h</span>
            <span>48h</span>
            <span>96h</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-secondary/50">
            <div
              className={`h-full rounded-full transition-all duration-300 ${isUrgent ? "bg-gradient-to-r from-chart-5 to-destructive" : "bg-gradient-to-r from-primary to-chart-2"}`}
              style={{ width: `${(hours / 96) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
