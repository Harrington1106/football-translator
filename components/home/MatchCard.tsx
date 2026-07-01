"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Match } from "@/lib/data/matches";
import { getTeam } from "@/lib/data/teams";
import { CountdownTimer } from "./CountdownTimer";

interface MatchCardProps {
  match: Match;
  index: number;
}

export function MatchCard({ match, index }: MatchCardProps) {
  const home = getTeam(match.homeTeam);
  const away = getTeam(match.awayTeam);

  // Fallback for teams not yet in our database
  const displayHome = home?.name || match.homeTeam;
  const displayAway = away?.name || match.awayTeam;
  const flagHome = home?.flag || "🏳️";
  const flagAway = away?.flag || "🏳️";

  const isLive = match.status === "live";
  const isFinished = match.status === "finished";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link href={`/match/${match.id}`} className="block group">
        <div className="glass-card p-4 glass-hover">
          {/* 状态 + 阶段 */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
              {match.stage}
            </span>
            {isLive && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[10px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 live-dot" />
                直播中
              </span>
            )}
            {isFinished && (
              <span className="text-[10px] text-green-400 font-medium">已结束</span>
            )}
            {!isLive && !isFinished && (
              <CountdownTimer kickoff={match.kickoff} />
            )}
          </div>

          {/* 队名 + 比分 */}
          <div className="flex items-center justify-between">
            {/* 主队 */}
            <div className="flex flex-col items-center gap-1.5 min-w-0 flex-1">
              <span className="text-3xl md:text-4xl group-hover:scale-105 transition-transform">
                {flagHome}
              </span>
              <span className="text-xs font-medium truncate max-w-full">{displayHome}</span>
            </div>

            {/* 比分 */}
            <div className="flex-shrink-0 mx-3 text-center">
              {isLive || isFinished ? (
                <div className="text-2xl md:text-3xl font-bold tabular-nums tracking-wider">
                  <span>{match.homeScore}</span>
                  <span className="text-muted-foreground mx-1">:</span>
                  <span>{match.awayScore}</span>
                </div>
              ) : (
                <div className="text-lg text-muted-foreground font-light">VS</div>
              )}
            </div>

            {/* 客队 */}
            <div className="flex flex-col items-center gap-1.5 min-w-0 flex-1">
              <span className="text-3xl md:text-4xl group-hover:scale-105 transition-transform">
                {flagAway}
              </span>
              <span className="text-xs font-medium truncate max-w-full">{displayAway}</span>
            </div>
          </div>

          {/* 信息 */}
          <div className="flex items-center gap-3 mt-3 text-[10px] text-muted-foreground/60">
            {match.stage && <span>{match.stage}</span>}
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {new Date(new Date(match.kickoff).getTime() + 8*3600000).toLocaleDateString("zh-CN", {
                month: "short",
                day: "numeric",
                timeZone: "Asia/Shanghai",
              })}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
