import { notFound } from "next/navigation";
import { getMatch } from "@/lib/data/matches";
import { getTeam } from "@/lib/data/teams";
import { getPlayersByTeam } from "@/lib/data/players";
import { MatchDetailClient } from "./MatchDetailClient";
import fs from "fs";

const LIVE_CACHE = '/tmp/live-cache.json';

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
