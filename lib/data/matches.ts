export interface MatchEvent {
  minute: number;
  type: "goal" | "yellowCard" | "redCard" | "substitution" | "var" | "corner" | "penalty";
  team: string;
  player: string;
  description: string;
  beginnerExplanation: string;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  status: "upcoming" | "live" | "finished";
  homeScore?: number;
  awayScore?: number;
  kickoff: string;
  venue: string;
  stage: string;
  stageDescription: string;
  whyItMatters: string;
  beginnerTips: string[];
  oneLineSummary?: string;
  highlightMinutes?: number[];
  events?: MatchEvent[];
  homeStrength: number;
  awayStrength: number;
}

// ══════════════════════════════════════════════
// 2026 世界杯真实赛程 — football-data.org 实时数据
// 共 104 场比赛，自动同步
// ══════════════════════════════════════════════

export const matches: Match[] = [
  { id: "wc26-537327", homeTeam: "mexico", awayTeam: "southafrica", status: "finished", homeScore: 2, awayScore: 0, kickoff: "2026-06-11T19:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537328", homeTeam: "southkorea", awayTeam: "czechia", status: "finished", homeScore: 2, awayScore: 1, kickoff: "2026-06-12T02:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537333", homeTeam: "canada", awayTeam: "bosniaherzegovina", status: "finished", homeScore: 1, awayScore: 1, kickoff: "2026-06-12T19:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537345", homeTeam: "unitedstates", awayTeam: "paraguay", status: "finished", homeScore: 4, awayScore: 1, kickoff: "2026-06-13T01:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537334", homeTeam: "qatar", awayTeam: "switzerland", status: "finished", homeScore: 1, awayScore: 1, kickoff: "2026-06-13T19:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537339", homeTeam: "brazil", awayTeam: "morocco", status: "finished", homeScore: 1, awayScore: 1, kickoff: "2026-06-13T22:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537340", homeTeam: "haiti", awayTeam: "scotland", status: "finished", homeScore: 0, awayScore: 1, kickoff: "2026-06-14T01:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537346", homeTeam: "australia", awayTeam: "turkey", status: "finished", homeScore: 2, awayScore: 0, kickoff: "2026-06-14T04:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537351", homeTeam: "germany", awayTeam: "curaçao", status: "finished", homeScore: 7, awayScore: 1, kickoff: "2026-06-14T17:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537357", homeTeam: "netherlands", awayTeam: "japan", status: "finished", homeScore: 2, awayScore: 2, kickoff: "2026-06-14T20:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537352", homeTeam: "ivorycoast", awayTeam: "ecuador", status: "finished", homeScore: 1, awayScore: 0, kickoff: "2026-06-14T23:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537358", homeTeam: "sweden", awayTeam: "tunisia", status: "finished", homeScore: 5, awayScore: 1, kickoff: "2026-06-15T02:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537369", homeTeam: "spain", awayTeam: "capeverdeislands", status: "finished", homeScore: 0, awayScore: 0, kickoff: "2026-06-15T16:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537363", homeTeam: "belgium", awayTeam: "egypt", status: "finished", homeScore: 1, awayScore: 1, kickoff: "2026-06-15T19:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537370", homeTeam: "saudiarabia", awayTeam: "uruguay", status: "finished", homeScore: 1, awayScore: 1, kickoff: "2026-06-15T22:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537364", homeTeam: "iran", awayTeam: "newzealand", status: "finished", homeScore: 2, awayScore: 2, kickoff: "2026-06-16T01:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537391", homeTeam: "france", awayTeam: "senegal", status: "finished", homeScore: 3, awayScore: 1, kickoff: "2026-06-16T19:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537392", homeTeam: "iraq", awayTeam: "norway", status: "finished", homeScore: 1, awayScore: 4, kickoff: "2026-06-16T22:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537397", homeTeam: "argentina", awayTeam: "algeria", status: "finished", homeScore: 3, awayScore: 0, kickoff: "2026-06-17T01:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537398", homeTeam: "austria", awayTeam: "jordan", status: "finished", homeScore: 3, awayScore: 1, kickoff: "2026-06-17T04:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537403", homeTeam: "portugal", awayTeam: "congodr", status: "finished", homeScore: 1, awayScore: 1, kickoff: "2026-06-17T17:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537409", homeTeam: "england", awayTeam: "croatia", status: "finished", homeScore: 4, awayScore: 2, kickoff: "2026-06-17T20:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537410", homeTeam: "ghana", awayTeam: "panama", status: "finished", homeScore: 1, awayScore: 0, kickoff: "2026-06-17T23:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537404", homeTeam: "uzbekistan", awayTeam: "colombia", status: "finished", homeScore: 1, awayScore: 3, kickoff: "2026-06-18T02:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537329", homeTeam: "czechia", awayTeam: "southafrica", status: "finished", homeScore: 1, awayScore: 1, kickoff: "2026-06-18T16:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537335", homeTeam: "switzerland", awayTeam: "bosniaherzegovina", status: "finished", homeScore: 4, awayScore: 1, kickoff: "2026-06-18T19:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537336", homeTeam: "canada", awayTeam: "qatar", status: "finished", homeScore: 6, awayScore: 0, kickoff: "2026-06-18T22:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537330", homeTeam: "mexico", awayTeam: "southkorea", status: "finished", homeScore: 1, awayScore: 0, kickoff: "2026-06-19T01:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537348", homeTeam: "unitedstates", awayTeam: "australia", status: "finished", homeScore: 2, awayScore: 0, kickoff: "2026-06-19T19:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537342", homeTeam: "scotland", awayTeam: "morocco", status: "finished", homeScore: 0, awayScore: 1, kickoff: "2026-06-19T22:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537341", homeTeam: "brazil", awayTeam: "haiti", status: "finished", homeScore: 3, awayScore: 0, kickoff: "2026-06-20T00:30:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537347", homeTeam: "turkey", awayTeam: "paraguay", status: "finished", homeScore: 0, awayScore: 1, kickoff: "2026-06-20T03:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537359", homeTeam: "netherlands", awayTeam: "sweden", status: "finished", homeScore: 5, awayScore: 1, kickoff: "2026-06-20T17:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537353", homeTeam: "germany", awayTeam: "ivorycoast", status: "finished", homeScore: 2, awayScore: 1, kickoff: "2026-06-20T20:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537354", homeTeam: "ecuador", awayTeam: "curaçao", status: "finished", homeScore: 0, awayScore: 0, kickoff: "2026-06-21T00:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537360", homeTeam: "tunisia", awayTeam: "japan", status: "finished", homeScore: 0, awayScore: 4, kickoff: "2026-06-21T04:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537371", homeTeam: "spain", awayTeam: "saudiarabia", status: "finished", homeScore: 4, awayScore: 0, kickoff: "2026-06-21T16:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537365", homeTeam: "belgium", awayTeam: "iran", status: "finished", homeScore: 0, awayScore: 0, kickoff: "2026-06-21T19:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537372", homeTeam: "uruguay", awayTeam: "capeverdeislands", status: "finished", homeScore: 2, awayScore: 2, kickoff: "2026-06-21T22:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537366", homeTeam: "newzealand", awayTeam: "egypt", status: "finished", homeScore: 1, awayScore: 3, kickoff: "2026-06-22T01:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537399", homeTeam: "argentina", awayTeam: "austria", status: "finished", homeScore: 2, awayScore: 0, kickoff: "2026-06-22T17:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537393", homeTeam: "france", awayTeam: "iraq", status: "finished", homeScore: 3, awayScore: 0, kickoff: "2026-06-22T21:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537394", homeTeam: "norway", awayTeam: "senegal", status: "finished", homeScore: 3, awayScore: 2, kickoff: "2026-06-23T00:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537400", homeTeam: "jordan", awayTeam: "algeria", status: "finished", homeScore: 1, awayScore: 2, kickoff: "2026-06-23T03:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537405", homeTeam: "portugal", awayTeam: "uzbekistan", status: "finished", homeScore: 5, awayScore: 0, kickoff: "2026-06-23T17:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537411", homeTeam: "england", awayTeam: "ghana", status: "finished", homeScore: 0, awayScore: 0, kickoff: "2026-06-23T20:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537412", homeTeam: "panama", awayTeam: "croatia", status: "finished", homeScore: 0, awayScore: 1, kickoff: "2026-06-23T23:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537406", homeTeam: "colombia", awayTeam: "congodr", status: "finished", homeScore: 1, awayScore: 0, kickoff: "2026-06-24T02:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537337", homeTeam: "switzerland", awayTeam: "canada", status: "finished", homeScore: 2, awayScore: 1, kickoff: "2026-06-24T19:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537338", homeTeam: "bosniaherzegovina", awayTeam: "qatar", status: "finished", homeScore: 3, awayScore: 1, kickoff: "2026-06-24T19:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537344", homeTeam: "morocco", awayTeam: "haiti", status: "finished", homeScore: 4, awayScore: 2, kickoff: "2026-06-24T22:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537343", homeTeam: "scotland", awayTeam: "brazil", status: "finished", homeScore: 0, awayScore: 3, kickoff: "2026-06-24T22:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537331", homeTeam: "czechia", awayTeam: "mexico", status: "finished", homeScore: 0, awayScore: 3, kickoff: "2026-06-25T01:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537332", homeTeam: "southafrica", awayTeam: "southkorea", status: "finished", homeScore: 1, awayScore: 0, kickoff: "2026-06-25T01:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537355", homeTeam: "ecuador", awayTeam: "germany", status: "finished", homeScore: 2, awayScore: 1, kickoff: "2026-06-25T20:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537356", homeTeam: "curaçao", awayTeam: "ivorycoast", status: "finished", homeScore: 0, awayScore: 2, kickoff: "2026-06-25T20:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537361", homeTeam: "tunisia", awayTeam: "netherlands", status: "finished", homeScore: 1, awayScore: 3, kickoff: "2026-06-25T23:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537362", homeTeam: "japan", awayTeam: "sweden", status: "finished", homeScore: 1, awayScore: 1, kickoff: "2026-06-25T23:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537349", homeTeam: "turkey", awayTeam: "unitedstates", status: "finished", homeScore: 3, awayScore: 2, kickoff: "2026-06-26T02:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537350", homeTeam: "paraguay", awayTeam: "australia", status: "finished", homeScore: 0, awayScore: 0, kickoff: "2026-06-26T02:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537395", homeTeam: "norway", awayTeam: "france", status: "finished", homeScore: 1, awayScore: 4, kickoff: "2026-06-26T19:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537396", homeTeam: "senegal", awayTeam: "iraq", status: "finished", homeScore: 5, awayScore: 0, kickoff: "2026-06-26T19:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537373", homeTeam: "uruguay", awayTeam: "spain", status: "finished", homeScore: 0, awayScore: 1, kickoff: "2026-06-27T00:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537374", homeTeam: "capeverdeislands", awayTeam: "saudiarabia", status: "finished", homeScore: 0, awayScore: 0, kickoff: "2026-06-27T00:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537367", homeTeam: "newzealand", awayTeam: "belgium", status: "finished", homeScore: 1, awayScore: 5, kickoff: "2026-06-27T03:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537368", homeTeam: "egypt", awayTeam: "iran", status: "finished", homeScore: 1, awayScore: 1, kickoff: "2026-06-27T03:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537413", homeTeam: "panama", awayTeam: "england", status: "finished", homeScore: 0, awayScore: 2, kickoff: "2026-06-27T21:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537414", homeTeam: "croatia", awayTeam: "ghana", status: "finished", homeScore: 2, awayScore: 1, kickoff: "2026-06-27T21:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537407", homeTeam: "colombia", awayTeam: "portugal", status: "finished", homeScore: 0, awayScore: 0, kickoff: "2026-06-27T23:30:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537408", homeTeam: "congodr", awayTeam: "uzbekistan", status: "finished", homeScore: 3, awayScore: 1, kickoff: "2026-06-27T23:30:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537401", homeTeam: "jordan", awayTeam: "argentina", status: "finished", homeScore: 1, awayScore: 3, kickoff: "2026-06-28T02:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537402", homeTeam: "algeria", awayTeam: "austria", status: "finished", homeScore: 3, awayScore: 3, kickoff: "2026-06-28T02:00:00Z", venue: "", stage: "小组赛", stageDescription: "小组赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537417", homeTeam: "southafrica", awayTeam: "canada", status: "finished", homeScore: 0, awayScore: 1, kickoff: "2026-06-28T19:00:00Z", venue: "", stage: "32强赛", stageDescription: "32强赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537423", homeTeam: "brazil", awayTeam: "japan", status: "finished", homeScore: 2, awayScore: 1, kickoff: "2026-06-29T17:00:00Z", venue: "", stage: "32强赛", stageDescription: "32强赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537415", homeTeam: "germany", awayTeam: "paraguay", status: "finished", homeScore: 4, awayScore: 5, kickoff: "2026-06-29T20:30:00Z", venue: "", stage: "32强赛", stageDescription: "32强赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537418", homeTeam: "netherlands", awayTeam: "morocco", status: "finished", homeScore: 3, awayScore: 4, kickoff: "2026-06-30T01:00:00Z", venue: "", stage: "32强赛", stageDescription: "32强赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537424", homeTeam: "ivorycoast", awayTeam: "norway", status: "finished", homeScore: 1, awayScore: 2, kickoff: "2026-06-30T17:00:00Z", venue: "", stage: "32强赛", stageDescription: "32强赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537416", homeTeam: "france", awayTeam: "sweden", status: "live", homeScore: 0, awayScore: 0, kickoff: "2026-06-30T21:00:00Z", venue: "", stage: "32强赛", stageDescription: "32强赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537425", homeTeam: "mexico", awayTeam: "ecuador", status: "upcoming", kickoff: "2026-07-01T01:00:00Z", venue: "", stage: "32强赛", stageDescription: "32强赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537426", homeTeam: "england", awayTeam: "congodr", status: "upcoming", kickoff: "2026-07-01T16:00:00Z", venue: "", stage: "32强赛", stageDescription: "32强赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537422", homeTeam: "belgium", awayTeam: "senegal", status: "upcoming", kickoff: "2026-07-01T20:00:00Z", venue: "", stage: "32强赛", stageDescription: "32强赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537421", homeTeam: "unitedstates", awayTeam: "bosniaherzegovina", status: "upcoming", kickoff: "2026-07-02T00:00:00Z", venue: "", stage: "32强赛", stageDescription: "32强赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537420", homeTeam: "spain", awayTeam: "austria", status: "upcoming", kickoff: "2026-07-02T19:00:00Z", venue: "", stage: "32强赛", stageDescription: "32强赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537419", homeTeam: "portugal", awayTeam: "croatia", status: "upcoming", kickoff: "2026-07-02T23:00:00Z", venue: "", stage: "32强赛", stageDescription: "32强赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537429", homeTeam: "switzerland", awayTeam: "algeria", status: "upcoming", kickoff: "2026-07-03T03:00:00Z", venue: "", stage: "32强赛", stageDescription: "32强赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537428", homeTeam: "australia", awayTeam: "egypt", status: "upcoming", kickoff: "2026-07-03T18:00:00Z", venue: "", stage: "32强赛", stageDescription: "32强赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537427", homeTeam: "argentina", awayTeam: "capeverdeislands", status: "upcoming", kickoff: "2026-07-03T22:00:00Z", venue: "", stage: "32强赛", stageDescription: "32强赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537430", homeTeam: "colombia", awayTeam: "ghana", status: "upcoming", kickoff: "2026-07-04T01:30:00Z", venue: "", stage: "32强赛", stageDescription: "32强赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
  { id: "wc26-537376", homeTeam: "canada", awayTeam: "morocco", status: "upcoming", kickoff: "2026-07-04T17:00:00Z", venue: "", stage: "1/8决赛", stageDescription: "1/8决赛", whyItMatters: "", beginnerTips: [], homeStrength: 3, awayStrength: 3 },
];

export function getMatch(id: string): Match | undefined { return matches.find(m => m.id === id); }
export function getTodayMatches(): Match[] { return matches; }
export function getLiveMatches(): Match[] { return matches.filter(m => m.status === "live"); }
export function getUpcomingMatches(): Match[] { return matches.filter(m => m.status === "upcoming"); }
export function getFinishedMatches(): Match[] { return matches.filter(m => m.status === "finished"); }
export function getMatchesByStage(stage: string): Match[] { return matches.filter(m => m.stage === stage); }