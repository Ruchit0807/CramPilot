"use client";

import { useState } from "react";
import { AlertTriangle, X, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function WeakTopics() {
  const [topics, setTopics] = useState<string[]>(["Electrophilic Addition", "Stereochemistry"]);
  const [newTopic, setNewTopic] = useState("");

  const addTopic = () => {
    if (newTopic.trim() && !topics.includes(newTopic.trim())) {
      setTopics([...topics, newTopic.trim()]);
      setNewTopic("");
    }
  };

  const removeTopic = (topic: string) => {
    setTopics(topics.filter((t) => t !== topic));
  };

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80">
      <div className="absolute inset-0 bg-gradient-to-br from-chart-5/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      <div className="relative space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-5/10 ring-1 ring-chart-5/20">
            <AlertTriangle className="h-5 w-5 text-chart-5" />
          </div>
          <div>
            <h3 className="font-semibold">Weak Topics</h3>
            <p className="text-sm text-muted-foreground">Topics that need extra attention</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Add a weak topic..."
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTopic()}
            className="flex-1 border-border/50 bg-secondary/30 placeholder:text-muted-foreground/50 focus:border-chart-5/50 focus:ring-chart-5/20"
          />
          <button
            onClick={addTopic}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-5/10 text-chart-5 ring-1 ring-chart-5/30 transition-all hover:bg-chart-5/20"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <Badge
              key={topic}
              variant="secondary"
              className="group/badge flex items-center gap-1.5 bg-chart-5/10 px-3 py-1.5 text-chart-5 ring-1 ring-chart-5/20 hover:bg-chart-5/20"
            >
              <span className="text-sm">{topic}</span>
              <button
                onClick={() => removeTopic(topic)}
                className="ml-1 rounded-full p-0.5 transition-colors hover:bg-chart-5/30"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {topics.length === 0 && (
            <p className="text-sm text-muted-foreground">No weak topics added yet</p>
          )}
        </div>

        {topics.length > 0 && (
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-chart-5">{topics.length}</span> topic{topics.length !== 1 && "s"} will receive priority in your study plan
          </p>
        )}
      </div>
    </Card>
  );
}
