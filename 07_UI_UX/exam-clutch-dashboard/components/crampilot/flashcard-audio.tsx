"use client";

import { Layers, Headphones, Play, FileText, Volume2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const workflows = [
  {
    id: "flashcards",
    title: "AI Flashcards",
    description: "Auto-generated from your notes",
    icon: Layers,
    count: 45,
    status: "Ready",
    color: "primary",
  },
  {
    id: "audio",
    title: "Audio Summary",
    description: "Listen while you commute",
    icon: Headphones,
    count: 12,
    status: "Generating",
    color: "chart-2",
  },
  {
    id: "podcast",
    title: "Concept Podcast",
    description: "Deep dives on weak topics",
    icon: Volume2,
    count: 3,
    status: "Ready",
    color: "chart-3",
  },
];

const colorClasses: Record<string, { bg: string; text: string; ring: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary", ring: "ring-primary/30" },
  "chart-2": { bg: "bg-chart-2/10", text: "text-chart-2", ring: "ring-chart-2/30" },
  "chart-3": { bg: "bg-chart-3/10", text: "text-chart-3", ring: "ring-chart-3/30" },
};

export function FlashcardAudio() {
  return (
    <Card className="border-border/50 bg-card/50 p-6 backdrop-blur-sm">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Flashcard & Audio</h3>
            <p className="text-sm text-muted-foreground">Multi-modal learning</p>
          </div>
        </div>

        <div className="space-y-3">
          {workflows.map((workflow) => {
            const colors = colorClasses[workflow.color];
            return (
              <div
                key={workflow.id}
                className="group flex items-center gap-3 rounded-lg bg-secondary/30 p-3 ring-1 ring-border/50 transition-all hover:bg-secondary/50 hover:ring-border"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colors.bg} ring-1 ${colors.ring}`}>
                  <workflow.icon className={`h-6 w-6 ${colors.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">{workflow.title}</h4>
                    <Badge
                      variant="secondary"
                      className={`text-[10px] ${
                        workflow.status === "Generating"
                          ? "animate-pulse bg-chart-2/20 text-chart-2"
                          : "bg-primary/20 text-primary"
                      }`}
                    >
                      {workflow.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{workflow.description}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <FileText className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{workflow.count} items</span>
                  </div>
                </div>
                <button className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colors.bg} ring-1 ${colors.ring} transition-transform group-hover:scale-105`}>
                  <Play className={`h-4 w-4 ${colors.text}`} />
                </button>
              </div>
            );
          })}
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary/10 py-2.5 text-sm font-medium text-primary ring-1 ring-primary/30 transition-all hover:bg-primary/20">
          <Layers className="h-4 w-4" />
          Generate More Content
        </button>
      </div>
    </Card>
  );
}
