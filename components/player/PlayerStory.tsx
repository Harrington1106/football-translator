"use client";

import { motion } from "framer-motion";
import { Star, Trophy, Sparkles } from "lucide-react";
import type { Player } from "@/lib/data/players";

interface PlayerStoryProps {
  player: Player;
}

export function PlayerStory({ player }: PlayerStoryProps) {
  return (
    <div className="space-y-4">
      {/* 为什么有名 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-5"
      >
        <h2 className="text-sm font-bold text-muted-foreground mb-3 flex items-center gap-2">
          <Star size={16} className="text-primary" />
          为什么这么有名？
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {player.whyFamous}
        </p>
      </motion.div>

      {/* 代表时刻 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card p-5"
      >
        <h2 className="text-sm font-bold text-muted-foreground mb-3 flex items-center gap-2">
          <Trophy size={16} className="text-primary" />
          代表时刻
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {player.bestMoment}
        </p>
      </motion.div>

      {/* 新手认识他的原因 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-5"
      >
        <h2 className="text-sm font-bold text-muted-foreground mb-3 flex items-center gap-2">
          <Sparkles size={16} className="text-primary" />
          适合新手认识他的原因
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {player.beginnerTip}
        </p>
      </motion.div>
    </div>
  );
}
