"use client";

import { motion } from "framer-motion";
import { Clock, Play } from "lucide-react";

interface MatchResultProps {
  summary?: string;
  highlightMinutes?: number[];
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
}

export function MatchResult({
  summary,
  highlightMinutes,
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
}: MatchResultProps) {
  const homeWon = homeScore > awayScore;
  const awayWon = awayScore > homeScore;

  return (
    <div className="space-y-4">
      {/* 比分结果 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 text-center"
      >
        <p className="text-xs text-muted-foreground mb-2">比赛结果</p>
        <p className="text-2xl font-bold mb-1">
          <span className={homeWon ? "text-primary" : ""}>{homeScore}</span>
          <span className="text-muted-foreground mx-2">:</span>
          <span className={awayWon ? "text-primary" : ""}>{awayScore}</span>
        </p>
        {summary && (
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">{summary}</p>
        )}
      </motion.div>

      {/* 3分钟精彩回看 */}
      {highlightMinutes && highlightMinutes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5"
        >
          <h2 className="text-sm font-bold text-muted-foreground mb-4 flex items-center gap-2">
            <Play size={16} className="text-primary" />
            如果你只看3分钟
          </h2>
          <p className="text-xs text-muted-foreground mb-3">
            推荐观看以下精彩时刻：
          </p>
          <div className="space-y-2">
            {highlightMinutes.map((minute) => (
              <div
                key={minute}
                className="flex items-center gap-3 bg-secondary/30 rounded-xl p-3"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">
                  <Clock size={12} />
                </span>
                <span className="text-sm font-medium">
                  第 {minute} 分钟
                </span>
                <span className="text-xs text-muted-foreground ml-auto">
                  精彩进球 ⚽
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
