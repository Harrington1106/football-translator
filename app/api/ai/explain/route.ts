import { NextRequest, NextResponse } from "next/server";
import { askAI, isAiAvailable } from "@/lib/ai/client";

const SYSTEM_PROMPT = `你是世界杯AI解说员。你正在解说一场正在直播的比赛。

规则：
1. 用最简单的中文解释，完全不懂足球的人也能听懂
2. 每段不超过3句话，像在跟朋友聊天
3. 用生活比喻来解释足球术语
4. 根据下面提供的实时数据来回答，不要编造
5. 如果数据里没有相关信息，诚实说"这个我也不太确定"`;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { question, espnData } = body;

  if (!question) {
    return NextResponse.json({ error: "Missing question" }, { status: 400 });
  }

  // Build rich context from ESPN data
  let matchInfo = "";
  if (espnData) {
    matchInfo = `
【比赛信息】
${espnData.homeTeam || "?"} ${espnData.homeScore ?? 0} - ${espnData.awayScore ?? 0} ${espnData.awayTeam || "?"}
比赛时间: ${espnData.displayClock || "未知"}
场地: ${espnData.venue || "未知"}

【比赛事件】
${espnData.matchDetails?.length
  ? espnData.matchDetails.map((d: any) =>
      `${d.minute} - ${d.type}: ${d.player} (${d.team === "home" ? espnData.homeTeam : espnData.awayTeam})`
    ).join("\n")
  : "暂无事件数据"}

${espnData.headline ? `【赛况摘要】${espnData.headline}` : ""}`;
  }

  if (isAiAvailable() && matchInfo) {
    const answer = await askAI(
      SYSTEM_PROMPT,
      `${matchInfo}\n\n新手提问：${question}`
    );
    if (answer) {
      return NextResponse.json({ answer, source: "ai" });
    }
  }

  // Fallback
  return NextResponse.json({
    answer: "暂时无法获取AI解说，请稍后再试。",
    source: "fallback",
  });
}
