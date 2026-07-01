"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

interface WhyItMattersProps {
  stage: string;
  whyItMatters: string;
  homeScore?: number;
  awayScore?: number;
  homeTeam?: string;
  awayTeam?: string;
  headline?: string;
  displayClock?: string;
}

export function WhyItMatters({
  stage,
  whyItMatters,
  homeScore,
  awayScore,
  homeTeam,
  awayTeam,
  headline,
  displayClock,
}: WhyItMattersProps) {
  const stageExplain = (() => {
    if (stage.includes("决赛")) return "决赛——赢了就是世界冠军，输了遗憾四年。";
    if (stage.includes("半决赛")) return "半决赛——赢球进决赛争冠，输球争第三名。";
    if (stage.includes("1/4")) return "8强赛——距离冠军只差3场胜利。输了就回家。";
    if (stage.includes("1/8") || stage.includes("16强")) return "16强淘汰赛——输了直接回家，没有重来的机会。";
    if (stage.includes("32强")) return "32强淘汰赛——小组出线后的第一道坎，输一场就结束。";
    return "小组赛——12个小组循环对决，争夺出线名额。";
  })();

  // Build meaningful explanation from real data if AI text is missing/wrong
  let matchContext = whyItMatters;
  if (!matchContext || matchContext.includes(" 0") || matchContext.length < 10) {
    if (headline) {
      matchContext = headline;
    } else if (homeScore !== undefined && awayScore !== undefined) {
      if (homeScore > awayScore) {
        matchContext = `${homeTeam || "主队"} ${homeScore}-${awayScore} 战胜${awayTeam || "客队"}。`;
      } else if (awayScore > homeScore) {
        matchContext = `${awayTeam || "客队"} ${awayScore}-${homeScore} 击败${homeTeam || "主队"}。`;
      } else {
        matchContext = `${homeTeam || ""} ${homeScore}-${awayScore} ${awayTeam || ""}，双方战平。`;
      }
      if (displayClock && displayClock !== "0'") {
        matchContext += ` 比赛进行到${displayClock}。`;
      }
    }
    if (!matchContext || matchContext.length < 5) {
      matchContext = `${homeTeam || "两队"}和${awayTeam || "对手"}的较量，这场${stage || "比赛"}值得关注。`;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5"
    >
      <h2 className="text-sm font-bold text-muted-foreground mb-3 flex items-center gap-2">
        <Lightbulb size={16} className="text-primary" />
        为什么这场比赛重要？
      </h2>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        {stageExplain}
      </p>
      <p className="text-base leading-relaxed">{matchContext}</p>
    </motion.div>
  );
}
