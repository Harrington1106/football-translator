"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Users } from "lucide-react";
import type { Player } from "@/lib/data/players";

interface TeamPlayersProps {
  players: Player[];
  teamName: string;
  flag: string;
}

export function TeamPlayers({ players, teamName, flag }: TeamPlayersProps) {
  if (!players.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5"
      >
        <h2 className="text-sm font-bold text-muted-foreground mb-3 flex items-center gap-2">
          <Users size={16} className="text-primary" />
          明星球员
        </h2>
        <p className="text-sm text-muted-foreground">暂无球员数据</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="glass-card p-5"
    >
      <h2 className="text-sm font-bold text-muted-foreground mb-4 flex items-center gap-2">
        <Users size={16} className="text-primary" />
        {teamName}的明星球员
      </h2>
      <div className="space-y-2">
        {players.map((player, i) => (
          <Link key={player.id} href={`/player/${player.id}`} className="block group">
            <div className="glass rounded-xl p-4 glass-hover flex items-center gap-4">
              <span className="text-3xl flex-shrink-0">{player.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold group-hover:text-primary transition-colors">
                  {player.nameCn}
                </p>
                <p className="text-xs text-muted-foreground">
                  {player.positionCn} · {player.age}岁 · {player.club}
                </p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {player.whyFamous.slice(0, 80)}...
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
