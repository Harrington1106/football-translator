"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getTeam } from "@/lib/data/teams";

interface Scorer {
  name: string;
  team: string;
  goals: number;
}

export function ScorerBoard() {
  const [scorers, setScorers] = useState<Scorer[]>([]);

  useEffect(() => {
    fetch("/api/scorers")
      .then(r => r.json())
      .then(d => setScorers(d.scorers || []))
      .catch(() => {});
  }, []);

  if (!scorers.length) return null;

  return (
    <div>
      <h2 className="text-lg font-bold mb-3">⚽ 射手榜</h2>
      <div className="glass-card divide-y divide-border/30">
        {scorers.slice(0, 10).map((s, i) => {
          const team = getTeam(s.team);
          return (
            <Link
              key={`${s.name}-${s.team}`}
              href={`/team/${s.team}`}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary/30 transition-colors group"
            >
              <span className={`text-xs font-bold w-5 flex-shrink-0 ${
                i === 0 ? "text-yellow-400" : i === 1 ? "text-zinc-400" : i === 2 ? "text-amber-600" : "text-muted-foreground"
              }`}>
                {i + 1}
              </span>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-sm flex-shrink-0">{team?.flag || "🏳️"}</span>
                <span className="text-xs text-muted-foreground flex-shrink-0">{team?.name || ""}</span>
                <span className="text-sm font-medium truncate group-hover:text-primary transition-colors">{s.name}</span>
              </div>
              <span className="text-sm font-bold text-primary tabular-nums flex-shrink-0">{s.goals}球</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
