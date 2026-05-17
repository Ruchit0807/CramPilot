"use client";

import { Map, CheckCircle2, Circle, Clock, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const roadmapItems = [
  { id: 1, title: "Foundation Review", time: "2-3 hrs", status: "completed", topics: ["Core Concepts", "Key Definitions"] },
  { id: 2, title: "Weak Topic Focus", time: "4-5 hrs", status: "current", topics: ["Electrophilic Addition", "Stereochemistry"] },
  { id: 3, title: "Practice Problems", time: "3-4 hrs", status: "upcoming", topics: ["Numericals", "Applications"] },
  { id: 4, title: "Mock Exam", time: "2-3 hrs", status: "upcoming", topics: ["Full Paper", "Time Management"] },
  { id: 5, title: "Final Revision", time: "1-2 hrs", status: "upcoming", topics: ["Quick Notes", "Formula Sheet"] },
];

export function StudyRoadmap() {
  return (
    <Card className="border-border/50 bg-card/50 p-6 backdrop-blur-sm">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/10 ring-1 ring-chart-3/20">
            <Map className="h-5 w-5 text-chart-3" />
          </div>
          <div>
            <h3 className="font-semibold">Study Roadmap</h3>
            <p className="text-sm text-muted-foreground">Your optimized path</p>
          </div>
        </div>

        <div className="relative space-y-3">
          <div className="absolute left-[15px] top-6 h-[calc(100%-48px)] w-0.5 bg-gradient-to-b from-primary via-chart-3 to-border" />
          
          {roadmapItems.map((item, index) => (
            <div
              key={item.id}
              className={`relative flex gap-4 rounded-lg p-3 transition-all ${
                item.status === "current"
                  ? "bg-chart-3/10 ring-1 ring-chart-3/30"
                  : item.status === "completed"
                  ? "bg-primary/5"
                  : "hover:bg-secondary/30"
              }`}
            >
              <div className="relative z-10 mt-0.5">
                {item.status === "completed" ? (
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                ) : item.status === "current" ? (
                  <div className="relative">
                    <Circle className="h-6 w-6 text-chart-3" />
                    <div className="absolute inset-1 animate-pulse rounded-full bg-chart-3" />
                  </div>
                ) : (
                  <Circle className="h-6 w-6 text-border" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`text-sm font-medium ${item.status === "completed" ? "text-muted-foreground" : ""}`}>
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </div>
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {item.topics.map((topic) => (
                    <span
                      key={topic}
                      className={`rounded-full px-2 py-0.5 text-[10px] ${
                        item.status === "current"
                          ? "bg-chart-3/20 text-chart-3"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              
              {item.status === "current" && (
                <ArrowRight className="mt-1 h-4 w-4 animate-pulse text-chart-3" />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-lg bg-secondary/30 p-3 ring-1 ring-border/50">
          <span className="text-sm text-muted-foreground">Total Estimated Time</span>
          <span className="text-sm font-semibold text-primary">12-17 hrs</span>
        </div>
      </div>
    </Card>
  );
}
