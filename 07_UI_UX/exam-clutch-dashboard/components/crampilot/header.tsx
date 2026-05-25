"use client";

import { Zap, Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-32 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-transparent.png"
              alt="CramPilot Logo"
              width={400}
              height={120}
              className="h-24 w-auto object-contain"
              priority
            />
          </Link>
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
