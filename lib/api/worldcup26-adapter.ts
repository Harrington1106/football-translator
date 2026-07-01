import type { Match, MatchEvent } from "@/lib/data/matches";
import { getTeams } from "./worldcup26";

// Map FIFA codes to our team IDs
function fifaToId(code: string): string {
  const map: Record<string, string> = {
    MEX: "mexico", RSA: "southafrica", KOR: "southkorea", CZE: "czechia",
    CAN: "canada", BIH: "bosniaherzegovina", USA: "unitedstates", PAR: "paraguay",
    QAT: "qatar", SUI: "switzerland", BRA: "brazil", MAR: "morocco",
    HAI: "haiti", SCO: "scotland", AUS: "australia", TUR: "turkey",
    GER: "germany", CUW: "curaçao", NED: "netherlands", JPN: "japan",
    CIV: "ivorycoast", ECU: "ecuador", SWE: "sweden", TUN: "tunisia",
    ESP: "spain", CPV: "capeverdeislands", BEL: "belgium", EGY: "egypt",
    KSA: "saudiarabia", URU: "uruguay", IRN: "iran", NZL: "newzealand",
    FRA: "france", SEN: "senegal", IRQ: "iraq", NOR: "norway",
    ARG: "argentina", ALG: "algeria", AUT: "austria", JOR: "jordan",
    POR: "portugal", COD: "congodr", ENG: "england", CRO: "croatia",
    GHA: "ghana", PAN: "panama", UZB: "uzbekistan", COL: "colombia",
  };
  return map[code] || code.toLowerCase();
}

function mapStatus(game: any): "upcoming" | "live" | "finished" {
  if (game.finished === "TRUE") return "finished";
  if (game.time_elapsed && game.time_elapsed !== "finished" && game.time_elapsed !== "notstarted") return "live";
  return "upcoming";
}

function mapStage(type: string, group: string): string {
  if (type === "group") return "小组赛";
  if (type === "Round of 32") return "32强赛";
  if (type === "Round of 16") return "1/8决赛";
  if (type === "Quarter-finals") return "1/4决赛";
  if (type === "Semi-finals") return "半决赛";
  if (type === "3rd Place") return "三四名决赛";
  if (type === "Final") return "决赛";
  return type;
}

function parseScorers(scorersStr: string): Array<{ name: string; minute: number }> {
  if (!scorersStr || scorersStr === "null") return [];
  try {
    // Format: '{"Nestory Irankunda 27\'","C. Metcalfe 75\'"}'
    const cleaned = scorersStr.replace(/[{}"]/g, "").split(",");
    return cleaned.map(s => {
      const match = s.trim().match(/^(.+)\s+(\d+)'?$/);
      return {
        name: match?.[1]?.trim() || s.trim(),
        minute: match ? parseInt(match[2]) : 0,
      };
    });
  } catch { return []; }
}

export function adaptWC26Game(game: any, homeTeamName?: string, awayTeamName?: string): Match | null {
  const hid = fifaToId(game.home_team_id || "");
  const aid = fifaToId(game.away_team_id || "");
  if (!hid || !aid) return null;

  const status = mapStatus(game);
  const stage = mapStage(game.type || "", game.group || "");
  const homeScorers = parseScorers(game.home_scorers || "");
  const awayScorers = parseScorers(game.away_scorers || "");

  const events: MatchEvent[] = [];
  for (const s of homeScorers) {
    events.push({
      minute: s.minute, type: "goal", team: hid, player: s.name.toLowerCase().replace(/\s+/g, ""),
      description: `${s.name}进球`,
      beginnerExplanation: `第${s.minute}分钟，${s.name}进球！`,
    });
  }
  for (const s of awayScorers) {
    events.push({
      minute: s.minute, type: "goal", team: aid, player: s.name.toLowerCase().replace(/\s+/g, ""),
      description: `${s.name}进球`,
      beginnerExplanation: `第${s.minute}分钟，${s.name}进球！`,
    });
  }

  return {
    id: `wc26-${game.id}`,
    homeTeam: hid,
    awayTeam: aid,
    status,
    homeScore: game.home_score ? parseInt(game.home_score) : undefined,
    awayScore: game.away_score ? parseInt(game.away_score) : undefined,
    kickoff: game.local_date ? new Date(game.local_date).toISOString() : "",
    venue: "",
    stage,
    stageDescription: stage,
    whyItMatters: "",
    beginnerTips: [],
    events: events.length > 0 ? events : undefined,
    homeStrength: 3,
    awayStrength: 3,
  };
}

// Build map from team ID to our team IDs
let _teamMap: Record<string, string> | null = null;
export async function getTeamIdMap(): Promise<Record<string, string>> {
  if (_teamMap) return _teamMap;
  const teams = await getTeams();
  _teamMap = {};
  for (const t of teams) {
    _teamMap[t.id] = fifaToId(t.fifa_code || t.id);
  }
  return _teamMap;
}
