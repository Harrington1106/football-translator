"use client";

import { motion } from "framer-motion";
import type { Player } from "@/lib/data/players";
import type { Team } from "@/lib/data/teams";
import Link from "next/link";

interface PlayerHeroProps {
  player: Player;
  team?: Team;
}

export function PlayerHero({ player, team }: PlayerHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 md:p-8 text-center"
    >
      {/* Emoji avatar */}
      <span className="text-7xl md:text-8xl block mb-4">{player.emoji}</span>

      {/* 名字 */}
      <h1 className="text-2xl md:text-3xl font-bold mb-1">{player.nameCn}</h1>
      <p className="text-sm text-muted-foreground mb-1">{player.name}</p>

      {/* 元数据 */}
      <div className="flex items-center justify-center gap-2 mb-4 text-xs text-muted-foreground">
        {team && (
          <Link href={`/team/${team.id}`} className="flex items-center gap-1 hover:text-primary transition-colors">
            <span>{team.flag}</span>
            {team.name}
          </Link>
        )}
        <span>·</span>
        <span>{player.positionCn}</span>
        <span>·</span>
        <span>{player.age}岁</span>
      </div>

      {/* 数据卡片 */}
      <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
        <div className="bg-secondary/30 rounded-xl p-3">
          <p className="text-[10px] text-muted-foreground mb-0.5">位置</p>
          <p className="text-sm font-bold">{player.positionCn}</p>
          <p className="text-[10px] text-muted-foreground">{player.position}</p>
        </div>
        <div className="bg-secondary/30 rounded-xl p-3">
          <p className="text-[10px] text-muted-foreground mb-0.5">效力球队</p>
          <p className="text-sm font-bold">{player.club}</p>
        </div>
      </div>
    </motion.div>
  );
}
