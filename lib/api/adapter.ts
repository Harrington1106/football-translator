import type { Match, MatchEvent } from "@/lib/data/matches";
import type { FDMatch } from "./football-data";

// Map football-data.org team names to our internal team IDs
const TEAM_NAME_MAP: Record<string, string> = {
  Brazil: "brazil", Argentina: "argentina", France: "france",
  Germany: "germany", Spain: "spain", England: "england",
  Portugal: "portugal", Japan: "japan", "South Korea": "southkorea",
  Netherlands: "netherlands", Croatia: "croatia", Morocco: "morocco",
  Uruguay: "uruguay", Mexico: "mexico", Denmark: "denmark",
  Egypt: "egypt", Serbia: "serbia", Australia: "australia",
  "Saudi Arabia": "saudiarabia", USA: "usa", Poland: "poland",
  Senegal: "senegal", Switzerland: "switzerland", Belgium: "belgium",
  Italy: "italy", Colombia: "colombia", Chile: "chile",
  // More mappings as needed
};

function mapTeamName(fdName: string): string {
  return TEAM_NAME_MAP[fdName] || fdName.toLowerCase().replace(/\s+/g, "");
}

function mapStatus(fdStatus: string): "upcoming" | "live" | "finished" {
  switch (fdStatus) {
    case "IN_PLAY": case "PAUSED": return "live";
    case "FINISHED": return "finished";
    default: return "upcoming";
  }
}

function mapEvents(goals: FDMatch["goals"]): MatchEvent[] | undefined {
  if (!goals?.length) return undefined;
  return goals.map((g) => ({
    minute: g.minute,
    type: "goal" as const,
    team: mapTeamName(g.team.name),
    player: g.scorer.name.toLowerCase().replace(/\s+/g, ""),
    description: `${g.scorer.name}进球`,
    beginnerExplanation: `第${g.minute}分钟，${g.scorer.name}打入一球！`,
  }));
}

export function adaptMatch(fd: FDMatch): Match | null {
  const homeId = mapTeamName(fd.homeTeam.name);
  const awayId = mapTeamName(fd.awayTeam.name);

  if (!homeId || !awayId) return null;

  return {
    id: `fd-${fd.id}`,
    homeTeam: homeId,
    awayTeam: awayId,
    status: mapStatus(fd.status),
    homeScore: fd.score.fullTime.home ?? undefined,
    awayScore: fd.score.fullTime.away ?? undefined,
    kickoff: fd.utcDate,
    venue: fd.venue || "待定",
    stage: fd.stage || "小组赛",
    stageDescription: fd.stage || "",
    whyItMatters: "",
    beginnerTips: [],
    events: mapEvents(fd.goals),
    homeStrength: 3,
    awayStrength: 3,
  };
}

export function adaptMatches(fdMatches: FDMatch[]): Match[] {
  return fdMatches.map(adaptMatch).filter((m): m is Match => m !== null);
}
