import { askClaude } from "./client";
import type { Match, MatchEvent } from "@/lib/data/matches";

const SYSTEM_PROMPT = `你是世界杯比赛数据助手。现在是2026年7月，世界杯正在进行中。用户会给你一场2026世界杯比赛的信息，你需要搜索网络找到这场比赛的真实数据。

IMPORTANT: 2026世界杯真实赛程已经公布。请根据真实数据返回。

返回格式必须是严格的JSON，不要包含其他文字：

{
  "found": true/false,
  "homeScore": 数字或null,
  "awayScore": 数字或null,
  "status": "live" | "finished" | "upcoming",
  "kickoff": "ISO 8601时间字符串",
  "venue": "球场名称",
  "events": [
    {
      "minute": 数字,
      "type": "goal" | "yellowCard" | "redCard" | "substitution" | "var" | "corner" | "penalty",
      "team": "球队英文名小写",
      "player": "球员英文名",
      "description": "中文描述",
      "beginnerExplanation": "给足球新手的中文解释，用最简单的话"
    }
  ],
  "whyItMatters": "一句话中文解释这场比赛为什么重要",
  "beginnerTips": ["新手观赛提示1", "提示2", "提示3"],
  "oneLineSummary": "一句话中文总结（已结束的比赛）",
  "highlightMinutes": [精彩时刻的分钟数]
}

如果没有找到这场比赛的实时数据，found设为false。
重要：只返回你确定的信息，不要编造比分。`;

interface AiMatchResult {
  found: boolean;
  homeScore?: number | null;
  awayScore?: number | null;
  status?: "live" | "finished" | "upcoming";
  kickoff?: string;
  venue?: string;
  events?: MatchEvent[];
  whyItMatters?: string;
  beginnerTips?: string[];
  oneLineSummary?: string;
  highlightMinutes?: number[];
}

const CACHE = new Map<string, { data: AiMatchResult; expires: number }>();
const LIVE_TTL = 2 * 60 * 1000;
const UPCOMING_TTL = 30 * 60 * 1000;
const FINISHED_TTL = 24 * 60 * 60 * 1000;

/**
 * Search for real match info for any match (live, upcoming, or finished).
 * All matches go through AI search to ensure truthfulness.
 */
export async function searchMatchInfo(
  homeTeam: string,
  awayTeam: string,
  stage: string,
  existingStatus: "upcoming" | "live" | "finished"
): Promise<AiMatchResult | null> {
  const cacheKey = `${homeTeam}|${awayTeam}|${stage}`;
  const cached = CACHE.get(cacheKey);
  if (cached && Date.now() < cached.expires) {
    return cached.data;
  }

  const query = `
请搜索2026年世界杯足球赛的真实信息：
- 比赛：${homeTeam} vs ${awayTeam}
- 阶段：${stage}
- 当前日期：${new Date().toISOString().split("T")[0]}

搜索要求：
1. 查找这场比赛的最新状态（未开始/正在直播/已结束）
2. 如果比赛已结束，给出最终比分和重要进球事件
3. 如果比赛正在直播，给出当前比分和最新事件
4. 如果比赛还没开始，返回status为upcoming，不要编造比分
5. 如果找不到这场比赛的信息，设置found为false
6. 所有信息必须来自真实数据源`;

  const raw = await askClaude(SYSTEM_PROMPT, query, { maxTokens: 2048 });

  if (!raw) return null;

  try {
    // Extract JSON from response (Claude might wrap in markdown)
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const result: AiMatchResult = JSON.parse(jsonMatch[0]);

    if (!result.found) return null;

    const ttl = result.status === "live" ? LIVE_TTL
      : result.status === "upcoming" ? UPCOMING_TTL
      : FINISHED_TTL;

    CACHE.set(cacheKey, { data: result, expires: Date.now() + ttl });

    // Limit cache size
    if (CACHE.size > 200) {
      const firstKey = CACHE.keys().next().value;
      if (firstKey) CACHE.delete(firstKey);
    }

    return result;
  } catch {
    console.error("Failed to parse AI match data");
    return null;
  }
}

/**
 * Merge AI search result into existing Match object.
 * AI data supplements static data. If AI confirms the match with valid data, use it.
 * If AI returns incomplete data (null scores for a finished match), keep static.
 */
export function mergeAiResult(match: Match, ai: AiMatchResult): Match {
  // If AI didn't find the match at all, trust static data entirely
  if (!ai.found) return match;

  // If AI confirms the match but has no scores, keep static scores
  const aiHasScores = ai.homeScore != null && ai.awayScore != null;

  return {
    ...match,
    // Scores: AI takes precedence only if it has valid numbers
    homeScore: aiHasScores ? ai.homeScore! : match.homeScore,
    awayScore: aiHasScores ? ai.awayScore! : match.awayScore,
    // Status: AI only if it has scores to back it up
    status: aiHasScores ? (ai.status ?? match.status) : match.status,
    kickoff: ai.kickoff ?? match.kickoff,
    venue: ai.venue ?? match.venue,
    // Events: AI only if it has events; otherwise keep static (which are verified real)
    events: ai.events?.length ? ai.events : match.events,
    whyItMatters: ai.whyItMatters ?? match.whyItMatters,
    beginnerTips: ai.beginnerTips?.length ? ai.beginnerTips : match.beginnerTips,
    oneLineSummary: ai.oneLineSummary ?? match.oneLineSummary,
    highlightMinutes: ai.highlightMinutes?.length ? ai.highlightMinutes : match.highlightMinutes,
  };
}
