import { notFound } from "next/navigation";
import { getMatch } from "@/lib/data/matches";
import { getTeam } from "@/lib/data/teams";
import { getPlayersByTeam } from "@/lib/data/players";
import { fetchESPNScoreboard } from "@/lib/api/espn";
import { MatchDetailClient } from "./MatchDetailClient";
import type { Match } from "@/lib/data/matches";
import fs from "fs";

const LIVE_CACHE = '/tmp/live-cache.json';
const TEAM_MAP: Record<string, string> = {
  "Mexico": "mexico", "South Africa": "southafrica", "South Korea": "southkorea",
  "Czechia": "czechia", "Canada": "canada", "Bosnia-Herzegovina": "bosniaherzegovina",
  "United States": "unitedstates", "Paraguay": "paraguay", "Qatar": "qatar",
  "Switzerland": "switzerland", "Brazil": "brazil", "Morocco": "morocco",
  "Haiti": "haiti", "Scotland": "scotland", "Australia": "australia",
  "Turkey": "turkey", "Germany": "germany", "Curaçao": "curaçao",
  "Netherlands": "netherlands", "Japan": "japan", "Ivory Coast": "ivorycoast",
  "Ecuador": "ecuador", "Sweden": "sweden", "Tunisia": "tunisia",
  "Spain": "spain", "Cape Verde Islands": "capeverdeislands",
  "Belgium": "belgium", "Egypt": "egypt", "Saudi Arabia": "saudiarabia",
  "Uruguay": "uruguay", "Iran": "iran", "New Zealand": "newzealand",
  "France": "france", "Senegal": "senegal", "Iraq": "iraq", "Norway": "norway",
  "Argentina": "argentina", "Algeria": "algeria", "Austria": "austria",
  "Jordan": "jordan", "Portugal": "portugal", "Congo DR": "congodr",
  "England": "england", "Croatia": "croatia", "Ghana": "ghana", "Panama": "panama",
  "Uzbekistan": "uzbekistan", "Colombia": "colombia",
};

interface MatchPageProps {
  params: Promise<{ id: string }>;
}

export default async function MatchPage({ params }: MatchPageProps) {
  const { id } = await params;
  const staticMatch = getMatch(id);
  if (!staticMatch) notFound();
  let match = staticMatch;

  // Always check live cache for real scores (overrides static)
  try {
    if (fs.existsSync(LIVE_CACHE)) {
      const cache = JSON.parse(fs.readFileSync(LIVE_CACHE, "utf-8"));
      const cached = cache.data?.find((m: any) => m.id === id);
      if (cached) {
        match = { ...match, ...cached, homeTeam: match.homeTeam, awayTeam: match.awayTeam };
      }
    }
  } catch {}

  // If no cache data, try ESPN directly by team pair
  try {
    const espnData = await fetchESPNScoreboard();
    const found = espnData.find((em) => {
      const hid = TEAM_MAP[em.homeTeam] || "";
      const aid = TEAM_MAP[em.awayTeam] || "";
      return hid === match.homeTeam && aid === match.awayTeam;
    });
    if (found && found.homeScore != null) {
      match = {
        ...match,
        homeScore: found.homeScore,
        awayScore: found.awayScore,
        status: found.status,
      };
      (match as any).displayClock = found.displayClock;
      (match as any).matchDetails = found.details;
      (match as any).headline = found.headline;
    }
  } catch {}

  const home = getTeam(match.homeTeam);
  const away = getTeam(match.awayTeam);
  const homePlayers = getPlayersByTeam(match.homeTeam);
  const awayPlayers = getPlayersByTeam(match.awayTeam);

  return (
    <MatchDetailClient
      match={match}
      home={home}
      away={away}
      homePlayers={homePlayers}
      awayPlayers={awayPlayers}
    />
  );
}
