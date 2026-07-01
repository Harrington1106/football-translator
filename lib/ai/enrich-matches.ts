import { askAI } from "./client";
import type { Match } from "@/lib/data/matches";
import { getTeam } from "@/lib/data/teams";

const BATCH_PROMPT = `你是世界杯新手解说员。给下面的比赛补充内容。

对每场比赛返回JSON数组（只返回JSON，不要其他文字）：
[
  {
    "id": "比赛ID",
    "whyItMatters": "一句话告诉新手这场比赛为什么重要（中文，不超过50字）",
    "beginnerTips": ["3条新手观赛贴士（中文，每条不超过30字）"],
    "oneLineSummary": "已结束比赛的一句话总结（中文，不超过50字，包含比分）。未开始的比赛不需要这个字段。"
  }
]

规则：
1. 不要用足球专业术语，全用大白话
2. 让完全不懂足球的人也能看懂
3. 突出戏剧性和趣味性`;

/**
 * Enrich a batch of matches with AI-generated commentary.
 * Returns the enriched data keyed by match ID.
 */
export async function enrichMatchBatch(
  matches: Match[],
  batchSize = 5
): Promise<
  Record<string, { whyItMatters: string; beginnerTips: string[]; oneLineSummary?: string }>
> {
  const results: Record<
    string,
    { whyItMatters: string; beginnerTips: string[]; oneLineSummary?: string }
  > = {};

  for (let i = 0; i < matches.length; i += batchSize) {
    const batch = matches.slice(i, i + batchSize);
    const matchDescriptions = batch
      .map((m) => {
        const home = getTeam(m.homeTeam);
        const away = getTeam(m.awayTeam);
        const score =
          m.homeScore !== undefined
            ? `比分 ${m.homeScore}:${m.awayScore}`
            : "未开始";
        return `ID:${m.id} | ${home?.name || m.homeTeam} vs ${away?.name || m.awayTeam} | ${m.stage} | ${score}`;
      })
      .join("\n");

    const aiResult = await askAI(BATCH_PROMPT, matchDescriptions, {
      maxTokens: 2048,
    });

    if (aiResult) {
      try {
        const json = JSON.parse(aiResult.match(/\[[\s\S]*\]/)?.[0] || "[]");
        for (const item of json) {
          if (item.id && item.whyItMatters) {
            results[item.id] = {
              whyItMatters: item.whyItMatters,
              beginnerTips: item.beginnerTips || [],
              oneLineSummary: item.oneLineSummary,
            };
          }
        }
      } catch {
        console.error("Failed to parse AI batch result");
      }
    }

    // Small delay between batches to avoid rate limits
    if (i + batchSize < matches.length) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  return results;
}
