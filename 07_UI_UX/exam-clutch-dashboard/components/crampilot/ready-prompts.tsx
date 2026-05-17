"use client";

import { useState } from "react";
import { Copy, Check, Terminal, ChevronRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const prompts = [
  {
    id: "summary",
    title: "Quick Summary",
    prompt: "Summarize the key concepts of [TOPIC] in bullet points, focusing on exam-relevant information. Include mnemonics where helpful.",
    category: "Study",
  },
  {
    id: "practice",
    title: "Practice Questions",
    prompt: "Generate 5 practice questions about [TOPIC] similar to what Professor [NAME] typically asks. Include conceptual and numerical problems.",
    category: "Practice",
  },
  {
    id: "explain",
    title: "Explain Like I'm 5",
    prompt: "Explain [TOPIC] in simple terms with real-world analogies. I need to understand the fundamentals before diving deeper.",
    category: "Learn",
  },
  {
    id: "compare",
    title: "Compare Concepts",
    prompt: "Create a comparison table between [CONCEPT A] and [CONCEPT B], highlighting key differences, similarities, and when to use each.",
    category: "Study",
  },
];

export function ReadyPrompts() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyPrompt = async (id: string, prompt: string) => {
    await navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Card className="col-span-full border-border/50 bg-card/50 p-6 backdrop-blur-sm lg:col-span-2">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10 ring-1 ring-chart-2/20">
            <Terminal className="h-5 w-5 text-chart-2" />
          </div>
          <div>
            <h3 className="font-semibold">Ready-to-Paste Prompts</h3>
            <p className="text-sm text-muted-foreground">Copy & use with any AI</p>
          </div>
        </div>

        <div className="space-y-3">
          {prompts.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-xl bg-secondary/30 p-4 ring-1 ring-border/50 transition-all hover:bg-secondary/50 hover:ring-border"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-chart-2" />
                  <span className="text-sm font-medium">{item.title}</span>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground ring-1 ring-border/50">
                    {item.category}
                  </span>
                </div>
                <button
                  onClick={() => copyPrompt(item.id, item.prompt)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary ring-1 ring-border/50 transition-all hover:bg-chart-2/10 hover:text-chart-2 hover:ring-chart-2/30"
                >
                  {copiedId === item.id ? (
                    <Check className="h-4 w-4 text-primary" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {item.prompt}
              </p>
              <ChevronRight className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50 opacity-0 transition-all group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
