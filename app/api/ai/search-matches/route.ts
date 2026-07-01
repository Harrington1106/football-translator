import { NextResponse } from "next/server";
import { getTodayMatches } from "@/lib/data/matches";
import fs from "fs";

const ENRICHED_FILE = '/tmp/enriched-cache.json';

function loadCache() {
  try {
    if (fs.existsSync(ENRICHED_FILE)) {
      return JSON.parse(fs.readFileSync(ENRICHED_FILE, "utf-8"));
    }
  } catch { /* empty */ }
  return {};
}

export async function GET() {
  const matches = getTodayMatches();
  const cache = loadCache();

  const enriched = matches.map((m) => {
    const c = cache[m.id];
    if (c) {
      return {
        ...m,
        whyItMatters: c.whyItMatters || m.whyItMatters,
        beginnerTips: c.beginnerTips?.length ? c.beginnerTips : m.beginnerTips,
        oneLineSummary: c.oneLineSummary || m.oneLineSummary,
      };
    }
    return m;
  });

  const count = Object.keys(cache).length;
  return NextResponse.json({
    matches: enriched,
    source: count > 0 ? "ai" : "static",
    enriched: count,
    total: matches.length,
  });
}
