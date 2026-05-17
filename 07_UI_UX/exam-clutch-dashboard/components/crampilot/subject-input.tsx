"use client";

import { useState } from "react";
import { BookOpen, Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const popularSubjects = [
  "Organic Chemistry",
  "Data Structures",
  "Linear Algebra",
  "Microeconomics",
  "Cell Biology",
];

export function SubjectInput() {
  const [subject, setSubject] = useState("");

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      <div className="relative space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Subject</h3>
            <p className="text-sm text-muted-foreground">What are you studying?</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="e.g., Organic Chemistry, Data Structures..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="h-12 border-border/50 bg-secondary/30 pl-10 text-base placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-primary/20"
          />
          <Sparkles className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/50" />
        </div>

        <div className="flex flex-wrap gap-2">
          {popularSubjects.map((s) => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className="rounded-full bg-secondary/50 px-3 py-1 text-xs text-muted-foreground ring-1 ring-border/50 transition-all hover:bg-primary/10 hover:text-primary hover:ring-primary/30"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
