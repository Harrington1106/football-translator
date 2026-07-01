import type { Match, MatchEvent } from "@/lib/data/matches";

// Map team names from TheSportsDB to our internal IDs
const NAME_MAP: Record<string, string> = {
  Brazil: "brazil", Argentina: "argentina", France: "france",
  Germany: "germany", Spain: "spain", England: "england",
  Portugal: "portugal", Japan: "japan", "South Korea": "southkorea",
  Netherlands: "netherlands", Croatia: "croatia", Morocco: "morocco",
  Uruguay: "uruguay", Mexico: "mexico", Denmark: "denmark",
  Egypt: "egypt", Serbia: "serbia", Australia: "australia",
  "Saudi Arabia": "saudiarabia", USA: "usa", Poland: "poland",
  Senegal: "senegal",
};

function mapTeam(name: string): string {
  return NAME_MAP[name] || name.toLowerCase().replace(/\s+/g, "");
}

function mapStatus(s: string): "upcoming" | "live" | "finished" {
  if (!s) return "upcoming";
  if (s === "Match Finished" || s === "FT") return "finished";
  if (s.includes("1H") || s.includes("2H") || s.includes("HT") || s === "LIVE") return "live";
  return "upcoming";
}

export function adaptTDBEvent(e: {
  idEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  strStatus: string;
  dateEvent: string;
  strTime: string;
  strVenue: string;
  strSeason?: string;
}): Match | null {
  const homeId = mapTeam(e.strHomeTeam);
  const awayId = mapTeam(e.strAwayTeam);
  if (!homeId || !awayId) return null;

  return {
    id: `tdb-${e.idEvent}`,
    homeTeam: homeId,
    awayTeam: awayId,
    status: mapStatus(e.strStatus),
    homeScore: e.intHomeScore ? parseInt(e.intHomeScore) : undefined,
    awayScore: e.intAwayScore ? parseInt(e.intAwayScore) : undefined,
    kickoff: `${e.dateEvent}T${e.strTime || "00:00:00"}Z`,
    venue: e.strVenue || "待定",
    stage: "",
    stageDescription: "",
    whyItMatters: "",
    beginnerTips: [],
    homeStrength: 3,
    awayStrength: 3,
  };
}
