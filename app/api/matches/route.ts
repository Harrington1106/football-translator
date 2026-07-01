import { NextResponse } from "next/server";
import { getGames } from "@/lib/api/worldcup26";
import { adaptWC26Game } from "@/lib/api/worldcup26-adapter";
import { getTodayMatches as getStaticMatches } from "@/lib/data/matches";
import fs from "fs";

const ENRICHED_FILE = "/tmp/enriched-cache.json";
const LIVE_CACHE = "/tmp/live-cache.json";
const CACHE_TTL = 60 * 1000;

function loadEnriched() {
  try { if (fs.existsSync(ENRICHED_FILE)) return JSON.parse(fs.readFileSync(ENRICHED_FILE, "utf-8")); } catch {}
  return {};
}

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
  // ── Cache hit ──
  const cached = readCache();
  if (cached) {
    return NextResponse.json({ matches: cached.data, source: "cache", total: cached.data.length });
  }

  let matches: any[] = [];
  let source = "static";

  // ── worldcup26.ir (free, no key, 104 matches) ──
  try {
    console.log("📡 Fetching worldcup26.ir...");
    const games = await getGames();
    if (games.length > 0) {
      const enriched = loadEnriched();
      matches = games.map((g: any) => {
        const m = adaptWC26Game(g);
        if (!m) return null;
        const e = enriched[m.id];
        return {
          ...m,
          whyItMatters: e?.whyItMatters || "",
          beginnerTips: e?.beginnerTips || [],
          oneLineSummary: e?.oneLineSummary,
        };
      }).filter(Boolean);
      writeCache(matches);
      source = "api";
      console.log(`✅ worldcup26.ir: ${matches.length} matches`);
    }
  } catch (err) { console.error("API error:", err); }

  // ── Fallback ──
  if (!matches.length) {
    matches = getStaticMatches();
    source = "static-fallback";
  }

  return NextResponse.json({ matches, source, total: matches.length });
}
