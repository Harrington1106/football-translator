// 世界杯赛制结构（为新手简化说明）
// 2026年世界杯：48支球队 → 小组赛 → 32强 → 16强 → 8强 → 4强 → 决赛

export const TOURNAMENT_STAGES = [
  { key: "小组赛",    label: "小组赛",   sub: "48进32", desc: "12个小组循环对战，每组前2名晋级" },
  { key: "32强赛",    label: "32强赛",   sub: "32进16", desc: "小组出线球队两两对决，胜者晋级" },
  { key: "1/8决赛",   label: "16强赛",   sub: "16进8",  desc: "淘汰赛正式开始——输了就回家" },
  { key: "1/4决赛",   label: "8强赛",    sub: "8进4",   desc: "距离冠军只差最后3场胜利" },
  { key: "半决赛",    label: "半决赛",   sub: "4进2",   desc: "争夺决赛的入场券" },
  { key: "三四名决赛", label: "季军赛",   sub: "第3名",  desc: "半决赛失利的两队争夺铜牌" },
  { key: "决赛",      label: "决赛",     sub: "冠军",   desc: "终极之战——胜者捧起大力神杯 🏆" },
] as const;

export type TournamentStage = (typeof TOURNAMENT_STAGES)[number];

export const STAGE_ICONS: Record<string, string> = {
  "小组赛": "🏟️",
  "32强赛": "🏟️",
  "1/8决赛": "⚔️",
  "1/4决赛": "⚔️",
  "半决赛": "🏆",
  "三四名决赛": "🥉",
  "决赛": "👑",
};

// 阶段一句话解释（新手友好）
export const STAGE_DESC: Record<string, string> = {
  "小组赛": "12个小组循环对战，每组前2名晋级32强",
  "32强赛": "小组出线球队两两对决 → 胜者进16强",
  "1/8决赛": "16强淘汰赛 · 输球直接回家",
  "1/4决赛": "8强争夺4个半决赛席位",
  "半决赛": "4强争夺决赛入场券",
  "三四名决赛": "半决赛失利的两队争夺铜牌",
  "决赛": "终极之战——胜者捧起大力神杯 🏆",
};

export function getStageIndex(stageKey: string): number {
  return TOURNAMENT_STAGES.findIndex((s) => s.key === stageKey);
}
