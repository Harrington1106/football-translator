"use client";

import { motion } from "framer-motion";
import type { Team } from "@/lib/data/teams";

interface TeamStyleProps {
  team: Team;
}

export function TeamStyle({ team }: TeamStyleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card p-5"
    >
      <h2 className="text-sm font-bold text-muted-foreground mb-3">球队风格</h2>

      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          {team.style}
        </span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {team.styleDescription}
      </p>
    </motion.div>
  );
}
