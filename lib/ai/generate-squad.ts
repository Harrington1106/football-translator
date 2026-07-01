import { askAI } from "./client";

const PROMPT = `你是世界杯球队数据库助手。请列出2026世界杯各国国家队的球员名单。

返回严格JSON数组格式，不要其他文字：
[
  {
    "id": "英文名小写连写",
    "nameCn": "中文名",
    "position": "Forward" | "Midfielder" | "Defender" | "Goalkeeper",
    "positionCn": "前锋" | "中场" | "后卫" | "门将",
    "club": "俱乐部中文名",
    "age": 数字,
    "number": 球衣号,
    "star": true或false(只有世界级球星才标true),
    "desc": "一句话中文介绍"
  }
]

要求：
1. 必须是真实的2026世界杯国家队球员
2. 每队至少18人，尽量23-26人
3. 球衣号要准确
4. 明星球员(巨星)star标true，最多4-5人`;

export async function generateSquad(teamName: string): Promise<any[] | null> {
  const result = await askAI(
    PROMPT,
    `请列出2026世界杯${teamName}国家队完整大名单（23-26人）。`,
    { maxTokens: 4096 }
  );

  if (!result) return null;

  try {
    const json = JSON.parse(result.match(/\[[\s\S]*\]/)?.[0] || "[]");
    return json;
  } catch {
    return null;
  }
}
