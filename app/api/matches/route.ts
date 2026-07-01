import { NextResponse } from "next/server";
import { fetchESPNScoreboard } from "@/lib/api/espn";
import { getTodayMatches as getStaticMatches } from "@/lib/data/matches";
import fs from "fs";
import path from "path";

const ENRICHED_FILE = '/tmp/enriched-cache.json';
const LIVE_CACHE = '/tmp/live-cache.json';
const CACHE_TTL = 60 * 1000; // 1 min cache for live data

function loadEnriched() {
  try { if (fs.existsSync(ENRICHED_FILE)) return JSON.parse(fs.readFileSync(ENRICHED_FILE, "utf-8")); } catch {}
  return {};
}

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

function readCache(): { data: any; time: number } | null {
  try {
    if (fs.existsSync(LIVE_CACHE)) {
      const raw = JSON.parse(fs.readFileSync(LIVE_CACHE, "utf-8"));
      if (Date.now() - raw.time < CACHE_TTL) return raw;
    }
  } catch {}
  return null;
}

function writeCache(matches: any) {
  try { fs.writeFileSync(LIVE_CACHE, JSON.stringify({ data: matches, time: Date.now() })); } catch {}
}

export async function GET() {
  let matches: any[] = [];
  let source = "static";

  // ── Step 1: Try cache (1 min TTL — ESPN is free!) ──
  const cached = readCache();
  if (cached) {
    return NextResponse.json({
      matches: cached.data,
      source: "cache",
      total: cached.data.length,
    });
  }

  // ── Step 2: Merge ESPN live data + static full schedule ──
  const staticMatches = getStaticMatches();
  const enriched = loadEnriched();
  let espnMap: Map<string, any> = new Map();

  try {
    console.log("📡 Fetching ESPN scoreboard...");
    const espnData = await fetchESPNScoreboard();
    // Build lookup by team pair
    for (const em of espnData) {
      const hid = TEAM_MAP[em.homeTeam] || em.homeTeam.toLowerCase().replace(/\s+/g, "");
      const aid = TEAM_MAP[em.awayTeam] || em.awayTeam.toLowerCase().replace(/\s+/g, "");
      espnMap.set(`${hid}:${aid}`, em);
    }
    if (espnData.length > 0) source = "espn+static";
    console.log(`✅ ESPN: ${espnData.length} live matches`);
  } catch (err) { console.error("ESPN error:", err); }

  // Merge: static provides full schedule, ESPN overrides live data
  matches = staticMatches.map((sm) => {
    const em = espnMap.get(`${sm.homeTeam}:${sm.awayTeam}`);
    const e = enriched[sm.id];
    // Only live if ESPN says it's in-progress (not finished/scheduled)
    const isLive = em?.status === "live";
    const isFinished = em?.status === "finished";
    const status = isLive ? "live" : isFinished ? "finished" : (em?.status || sm.status);

    // Always use static ID for stable URLs; ESPN data enriches the match
    return {
      id: sm.id,
      homeTeam: sm.homeTeam,
      awayTeam: sm.awayTeam,
      status,
      homeScore: em?.homeScore ?? sm.homeScore,
      awayScore: em?.awayScore ?? sm.awayScore,
      kickoff: em?.kickoff || sm.kickoff,
      venue: em?.venue || sm.venue,
      stage: sm.stage,
      stageDescription: sm.stageDescription,
      // For live ESPN matches, show score context instead of old AI text
      whyItMatters: isLive && em?.headline
        ? em.headline
        : (em ? `${sm.homeTeam} ${em.homeScore ?? 0}-${em.awayScore ?? 0} ${sm.awayTeam}` : (e?.whyItMatters || sm.whyItMatters || "")),
      beginnerTips: em ? [] : (e?.beginnerTips?.length ? e.beginnerTips : sm.beginnerTips),
      oneLineSummary: em ? undefined : (e?.oneLineSummary || sm.oneLineSummary),
      homeStrength: sm.homeStrength,
      awayStrength: sm.awayStrength,
      displayClock: em?.displayClock,
      matchDetails: em?.details,
      headline: em?.headline,
    };
  });

  writeCache(matches);

  return NextResponse.json({ matches, source, total: matches.length });
}
