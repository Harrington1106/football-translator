import { NextRequest, NextResponse } from "next/server";
import { getMatch } from "@/lib/data/matches";
import { askClaude } from "@/lib/ai/client";
import { isAiAvailable } from "@/lib/ai/client";

const PREVIEW_PROMPT = `你是世界杯赛前分析员。用最简单的中文为足球新手写一段赛前看点（不超过150字）。

格式：
1. 一句话说清楚这场比赛是什么阶段（小组赛/淘汰赛）
2. 一句话说双方实力对比
3. 一句话告诉新手应该关注什么

不要用专业术语。不要列数据。说人话。`;

export async function POST(request: NextRequest) {
  const { matchId, homeTeam, awayTeam, stage } = await request.json();

  let home = homeTeam;
  let away = awayTeam;
  let stageName = stage;

  if (matchId && !home) {
    const match = getMatch(matchId);
    if (match) {
      home = match.homeTeam;
      away = match.awayTeam;
      stageName = match.stage;
    }
  }

  if (!home || !away) {
    return NextResponse.json({ error: "Missing team info" }, { status: 400 });
  }

  if (isAiAvailable()) {
    const preview = await askClaude(
      PREVIEW_PROMPT,
      `${home} vs ${away}，${stageName || "世界杯比赛"}。请写一段赛前看点。`
    );
    if (preview) {
      return NextResponse.json({ preview, source: "ai" });
    }
  }

  // Fallback
  return NextResponse.json({
    preview: `${home}对阵${away}，这是一场${stageName || "世界杯比赛"}。两队都将全力以赴争取胜利。`,
    source: "fallback",
  });
}
