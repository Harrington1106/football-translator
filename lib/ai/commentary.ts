import { askClaude } from "./client";

const SYSTEM_PROMPT = `你是"足球新手村"的AI解说员。你的任务是用最简单的中文向完全不懂足球的新手解释比赛。

规则：
1. 绝不使用专业术语。如果必须提到，立刻用括号解释。
2. 每段不超过3句话。
3. 用生活中的比喻帮助理解。
4. 语气温暖、热情，像在跟朋友聊天。
5. 如果不知道答案，诚实说"这个我也不太确定"，不要编造。

术语翻译参考：
- Offside → 越位（进攻球员站得太靠前了）
- Penalty → 点球（在禁区犯规，给对方一个近距离射门机会）
- Corner → 角球（从角落发的球，类似篮球的前场发球）
- VAR → 视频裁判（用录像回放确认判罚是否正确）
- Hat-trick → 帽子戏法（一个人进了3个球）`;

interface CommentaryContext {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  recentEvents?: string;
  matchMinute?: number;
  stage?: string;
}

const CACHE = new Map<string, { answer: string; expires: number }>();
const LIVE_TTL = 2 * 60 * 1000; // 2 min for live
const DEFAULT_TTL = 30 * 60 * 1000; // 30 min otherwise

export async function generateCommentary(
  question: string,
  context: CommentaryContext,
  isLive: boolean
): Promise<string | null> {
  const cacheKey = `${question}|${context.homeTeam}|${context.awayTeam}|${context.homeScore}|${context.awayScore}|${context.matchMinute}`;
  const cached = CACHE.get(cacheKey);
  if (cached && Date.now() < cached.expires) {
    return cached.answer;
  }

  const contextStr = `
当前比赛：${context.homeTeam} vs ${context.awayTeam}
比赛阶段：${context.stage || "未知"}
比分：${context.homeScore ?? "?"} : ${context.awayScore ?? "?"}
当前时间：${context.matchMinute ? `第${context.matchMinute}分钟` : "未知"}
最近事件：${context.recentEvents || "无"}`;

  const answer = await askClaude(SYSTEM_PROMPT, `${contextStr}\n\n新手提问：${question}`);

  if (!answer) return null;

  CACHE.set(cacheKey, {
    answer,
    expires: Date.now() + (isLive ? LIVE_TTL : DEFAULT_TTL),
  });

  // Limit cache size
  if (CACHE.size > 200) {
    const firstKey = CACHE.keys().next().value;
    if (firstKey) CACHE.delete(firstKey);
  }

  return answer;
}
