"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Team } from "@/lib/data/teams";

interface TeamHeroProps {
  team: Team;
}

export function TeamHero({ team }: TeamHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 md:p-8 text-center"
    >
      {/* 国旗 */}
      <span className="text-7xl md:text-8xl block mb-4">{team.flag}</span>

      {/* 队名 */}
      <h1 className="text-2xl md:text-3xl font-bold mb-2">{team.name}</h1>
      <p className="text-sm text-muted-foreground mb-4">{team.nameEn}</p>

      {/* 一句话 */}
      <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed mb-6">
        {team.oneLineSummary}
      </p>

      {/* 数据指标 */}
      <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
        <div className="bg-secondary/30 rounded-xl p-3">
          <p className="text-xs text-muted-foreground mb-1">世界排名</p>
          <p className="text-lg font-bold">#{team.ranking}</p>
        </div>
        <div className="bg-secondary/30 rounded-xl p-3">
          <p className="text-xs text-muted-foreground mb-1">世界杯冠军</p>
          <p className="text-lg font-bold">
            {team.worldCupWins > 0 ? `${team.worldCupWins}次` : "无"}
          </p>
        </div>
        <div className="bg-secondary/30 rounded-xl p-3">
          <p className="text-xs text-muted-foreground mb-1">平均年龄</p>
          <p className="text-lg font-bold">{team.avgAge}岁</p>
        </div>
      </div>

      {/* 实力星 */}
      <div className="flex items-center justify-center gap-1 mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={
              i < team.strength
                ? "text-primary fill-primary"
                : "text-muted-foreground/20"
            }
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">
          {team.strength === 5 ? "夺冠热门" : team.strength === 4 ? "强队" : "中游球队"}
        </span>
      </div>
    </motion.div>
  );
}
