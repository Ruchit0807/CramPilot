"use client";

import { Zap, Clock, User } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">CramPilot</h1>
            <p className="text-xs text-muted-foreground">AI Exam Survival</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-full bg-secondary/50 px-3 py-1.5 text-sm text-muted-foreground sm:flex">
            <Clock className="h-4 w-4" />
            <span>48h Exam Mode</span>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/50 ring-1 ring-border/50 transition-colors hover:bg-secondary">
            <User className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}
