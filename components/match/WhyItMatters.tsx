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
  homeStrength?: number;
  awayStrength?: number;
  scorerNames?: string[];
}

export function WhyItMatters({
  stage, whyItMatters, homeScore, awayScore, homeTeam, awayTeam,
  homeStrength, awayStrength, scorerNames,
}: WhyItMattersProps) {
  const stageExplain = (() => {
    if (stage.includes("决赛")) return "决赛——赢了就是世界冠军，输了遗憾四年。";
    if (stage.includes("半决赛")) return "半决赛——赢球进决赛争冠，输球争第三名。";
    if (stage.includes("1/4")) return "8强赛——距离冠军只差3场胜利。输了就回家。";
    if (stage.includes("1/8") || stage.includes("16强")) return "16强淘汰赛——输了直接回家，没有重来的机会。";
    if (stage.includes("32强")) return "32强淘汰赛——小组出线后的第一道坎，输一场就结束。";
    return "小组赛——12个小组循环对决，争夺出线名额。";
  })();

  // Build from real data — no AI hallucination
  let matchContext = whyItMatters;
  if (!matchContext || matchContext.length < 10 || /^\S+ ?\d+-\d+ ?\S+$/.test(matchContext)) {
    if (homeScore !== undefined && awayScore !== undefined) {
      const hWon = homeScore > awayScore;
      const aWon = awayScore > homeScore;
      const isDraw = homeScore === awayScore;

      if (isDraw) {
        matchContext = `${homeTeam} ${homeScore}-${awayScore} 战平${awayTeam}。`;
      } else if (hWon) {
        matchContext = `${homeTeam} ${homeScore}-${awayScore} 战胜${awayTeam}`;
        if (stage.includes("32强") || stage.includes("16强") || stage.includes("8强") || stage.includes("淘汰")) {
          matchContext += `，${homeTeam}晋级下一轮！`;
        } else if (stage.includes("半决赛")) {
          matchContext += `，${homeTeam}挺进决赛！`;
        } else if (stage.includes("决赛")) {
          matchContext += `，${homeTeam}夺得世界杯冠军🏆！`;
        } else {
          matchContext += "。";
        }
      } else {
        matchContext = `${awayTeam} ${awayScore}-${homeScore} 击败${homeTeam}`;
        if (stage.includes("32强") || stage.includes("16强") || stage.includes("8强") || stage.includes("淘汰")) {
          matchContext += `，${awayTeam}晋级下一轮！`;
        } else if (stage.includes("半决赛")) {
          matchContext += `，${awayTeam}挺进决赛！`;
        } else {
          matchContext += "。";
        }
      }
      if (scorerNames?.length) {
        matchContext += ` ${scorerNames.slice(0, 3).join("、")}进球。`;
      }
    } else {
      const hs = homeStrength || 3;
      const as = awayStrength || 3;
      if (hs >= 4 && as <= 2) matchContext = `${homeTeam}实力明显占优，${awayTeam}必将全力阻击。`;
      else if (as >= 4 && hs <= 2) matchContext = `${awayTeam}实力更强，${homeTeam}需要超常发挥。`;
      else if (hs >= 4 && as >= 4) matchContext = `强强对话！两队旗鼓相当，胜负难料。`;
      else matchContext = `势均力敌的较量，这场${stage || "比赛"}不容错过。`;
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5">
      <h2 className="text-sm font-bold text-muted-foreground mb-3 flex items-center gap-2">
        <Lightbulb size={16} className="text-primary" />
        为什么这场比赛重要？
      </h2>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{stageExplain}</p>
      <p className="text-base leading-relaxed">{matchContext}</p>
    </motion.div>
  );
}
