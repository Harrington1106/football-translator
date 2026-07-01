"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Match } from "@/lib/data/matches";
import { getTeam } from "@/lib/data/teams";
import { CountdownTimer } from "./CountdownTimer";

interface FeaturedMatchProps {
  match: Match;
}

export function FeaturedMatch({ match }: FeaturedMatchProps) {
  const home = getTeam(match.homeTeam);
  const away = getTeam(match.awayTeam);

  if (!home || !away) return null;

  const isLive = match.status === "live";
  const isFinished = match.status === "finished";

  return (
    <Link href={`/match/${match.id}`} className="block group">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-6 md:p-8 glass-hover glow-green text-center"
      >
        {/* 状态标签 */}
        <div className="mb-4">
          {isLive ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-red-500 live-dot" />
              正在直播
            </span>
          ) : isFinished ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
              比赛结束
            </span>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              <CountdownTimer kickoff={match.kickoff} />
            </div>
          )}
        </div>

        {/* 队名 + 比分 */}
        <div className="flex items-center justify-center gap-6 md:gap-10 mb-4">
          <div className="flex flex-col items-center gap-1">
            <span className="text-6xl md:text-7xl group-hover:scale-105 transition-transform">
              {home.flag}
            </span>
            <span className="text-sm md:text-base font-bold">{home.name}</span>
          </div>

          <div className="text-center">
            {isLive || isFinished ? (
              <div className="text-4xl md:text-6xl font-bold tabular-nums tracking-wider">
                <span>{match.homeScore}</span>
                <span className="text-muted-foreground mx-2">:</span>
                <span>{match.awayScore}</span>
              </div>
            ) : (
              <div className="text-2xl text-muted-foreground font-light">VS</div>
            )}
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-6xl md:text-7xl group-hover:scale-105 transition-transform">
              {away.flag}
            </span>
            <span className="text-sm md:text-base font-bold">{away.name}</span>
          </div>
        </div>

        {/* 看点 */}
        <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
          {match.whyItMatters}
        </p>

        {/* 力量条 */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < home.strength
                    ? "text-primary fill-primary"
                    : "text-muted-foreground/20"
                }
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">vs</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < away.strength
                    ? "text-primary fill-primary"
                    : "text-muted-foreground/20"
                }
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-5">
          <span className="inline-flex items-center gap-1.5 text-sm text-primary font-medium group-hover:gap-2 transition-all">
            {isLive ? "观看直播 →" : isFinished ? "查看详情 →" : "赛前分析 →"}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
