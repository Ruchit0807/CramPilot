"use client";

import { useState } from "react";
import { UserSearch, ChevronDown, Check, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const behaviorPatterns = [
  { id: "conceptual", label: "Focuses on concepts", description: "Prefers understanding over memorization" },
  { id: "numerical", label: "Heavy on numericals", description: "Expects calculation-based answers" },
  { id: "theory", label: "Theory-focused", description: "Values definitions and explanations" },
  { id: "previous", label: "Repeats questions", description: "Often uses past paper questions" },
  { id: "application", label: "Real-world applications", description: "Connects theory to practice" },
];

export function ProfessorAnalysis() {
  const [professorName, setProfessorName] = useState("");
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>(["conceptual"]);
  const [showPatterns, setShowPatterns] = useState(false);

  const togglePattern = (id: string) => {
    setSelectedPatterns((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80">
      <div className="absolute inset-0 bg-gradient-to-br from-chart-2/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      <div className="relative space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10 ring-1 ring-chart-2/20">
            <UserSearch className="h-5 w-5 text-chart-2" />
          </div>
          <div>
            <h3 className="font-semibold">Professor Behavior</h3>
            <p className="text-sm text-muted-foreground">Tailor your prep to their style</p>
          </div>
        </div>

        <Input
          placeholder="Professor&apos;s name (optional)"
          value={professorName}
          onChange={(e) => setProfessorName(e.target.value)}
          className="border-border/50 bg-secondary/30 placeholder:text-muted-foreground/50 focus:border-chart-2/50 focus:ring-chart-2/20"
        />

        <div className="space-y-2">
          <button
            onClick={() => setShowPatterns(!showPatterns)}
            className="flex w-full items-center justify-between rounded-lg bg-secondary/30 px-4 py-3 text-left text-sm ring-1 ring-border/50 transition-all hover:bg-secondary/50"
          >
            <span className="text-muted-foreground">
              {selectedPatterns.length > 0
                ? `${selectedPatterns.length} pattern${selectedPatterns.length > 1 ? "s" : ""} selected`
                : "Select teaching patterns"}
            </span>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${showPatterns ? "rotate-180" : ""}`} />
          </button>

          {showPatterns && (
            <div className="space-y-1 rounded-lg bg-secondary/20 p-2 ring-1 ring-border/30">
              {behaviorPatterns.map((pattern) => (
                <button
                  key={pattern.id}
                  onClick={() => togglePattern(pattern.id)}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-all ${
                    selectedPatterns.includes(pattern.id)
                      ? "bg-chart-2/10 ring-1 ring-chart-2/30"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  <div className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                    selectedPatterns.includes(pattern.id)
                      ? "border-chart-2 bg-chart-2"
                      : "border-border/50"
                  }`}>
                    {selectedPatterns.includes(pattern.id) && (
                      <Check className="h-3 w-3 text-background" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{pattern.label}</p>
                    <p className="text-xs text-muted-foreground">{pattern.description}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedPatterns.length > 0 && (
          <div className="flex items-start gap-2 rounded-lg bg-chart-2/5 p-3 ring-1 ring-chart-2/20">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-chart-2" />
            <p className="text-xs text-muted-foreground">
              AI will optimize your study plan based on selected teaching patterns
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
