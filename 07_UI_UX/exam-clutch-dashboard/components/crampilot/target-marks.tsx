"use client";

import { useState } from "react";
import { Target, TrendingUp, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export function TargetMarks() {
  const [targetScore, setTargetScore] = useState([75]);

  const getGradeInfo = (score: number) => {
    if (score >= 90) return { grade: "A+", label: "Excellence", color: "text-primary", desc: "Top performance mode" };
    if (score >= 80) return { grade: "A", label: "Distinction", color: "text-chart-2", desc: "High achiever path" };
    if (score >= 70) return { grade: "B", label: "Merit", color: "text-chart-3", desc: "Solid understanding" };
    if (score >= 60) return { grade: "C", label: "Pass+", color: "text-chart-5", desc: "Safe zone" };
    return { grade: "D", label: "Pass", color: "text-muted-foreground", desc: "Minimum effort" };
  };

  const gradeInfo = getGradeInfo(targetScore[0]);

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80">
      <div className="absolute inset-0 bg-gradient-to-br from-chart-3/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      <div className="relative space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/10 ring-1 ring-chart-3/20">
              <Target className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <h3 className="font-semibold">Target Score</h3>
              <p className="text-sm text-muted-foreground">Set your goal</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 rounded-full px-3 py-1 ring-1 ${gradeInfo.color === "text-primary" ? "bg-primary/10 ring-primary/30" : "bg-secondary/50 ring-border/50"}`}>
            <Award className={`h-4 w-4 ${gradeInfo.color}`} />
            <span className={`text-sm font-semibold ${gradeInfo.color}`}>{gradeInfo.grade}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`text-5xl font-bold tracking-tight ${gradeInfo.color}`}>
                {targetScore[0]}
              </span>
              <span className="text-lg text-muted-foreground">%</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{gradeInfo.label} • {gradeInfo.desc}</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/30 ring-1 ring-border/50">
            <TrendingUp className={`h-8 w-8 ${gradeInfo.color}`} />
          </div>
        </div>

        <div className="space-y-3">
          <Slider
            value={targetScore}
            onValueChange={setTargetScore}
            max={100}
            min={40}
            step={5}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>40%</span>
            <span>70%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-1">
          {["D", "C", "B", "A", "A+"].map((grade, i) => (
            <div
              key={grade}
              className={`rounded-md py-1.5 text-center text-xs font-medium transition-all ${
                gradeInfo.grade === grade
                  ? "bg-primary/20 text-primary ring-1 ring-primary/30"
                  : "bg-secondary/30 text-muted-foreground"
              }`}
            >
              {grade}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
