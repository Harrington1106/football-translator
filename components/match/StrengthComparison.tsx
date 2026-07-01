"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { getTeam } from "@/lib/data/teams";

interface StrengthComparisonProps {
  homeTeam: string;
  awayTeam: string;
  homeStrength: number;
  awayStrength: number;
}

function StarRow({ strength }: { strength: number }) {
  return (
    <div className="flex justify-center gap-0.5 mb-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={16}
          className={i < strength ? "text-primary fill-primary" : "text-muted-foreground/20"}
        />
      ))}
    </div>
  );
}

function getStrengthLabel(s: number) {
  if (s === 5) return "夺冠热门";
  if (s === 4) return "强队";
  if (s === 3) return "中游球队";
  if (s === 2) return "弱队";
  return "参与球队";
}

export function StrengthComparison({
  homeTeam,
  awayTeam,
  homeStrength,
  awayStrength,
}: StrengthComparisonProps) {
  const home = getTeam(homeTeam);
  const away = getTeam(awayTeam);

  if (!home || !away) return null;

  // Prefer team data strength over match data
  const hStr = home.strength > 0 ? home.strength : homeStrength;
  const aStr = away.strength > 0 ? away.strength : awayStrength;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="glass-card p-5"
    >
      <h2 className="text-sm font-bold text-muted-foreground mb-4">双方实力对比</h2>

      <div className="flex items-center gap-4">
        <div className="flex-1 text-center">
          <span className="text-2xl block mb-1">{home.flag}</span>
          <p className="text-sm font-bold mb-2">{home.name}</p>
          <StarRow strength={hStr} />
          <span className="text-[10px] text-muted-foreground">
            {getStrengthLabel(hStr)}
          </span>
        </div>

        <div className="flex-shrink-0">
          <span className="text-sm text-muted-foreground font-light">VS</span>
        </div>

        <div className="flex-1 text-center">
          <span className="text-2xl block mb-1">{away.flag}</span>
          <p className="text-sm font-bold mb-2">{away.name}</p>
          <StarRow strength={aStr} />
          <span className="text-[10px] text-muted-foreground">
            {getStrengthLabel(aStr)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
