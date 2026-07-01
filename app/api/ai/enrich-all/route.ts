import { NextResponse } from "next/server";
import { getTodayMatches } from "@/lib/data/matches";
import { enrichMatchBatch } from "@/lib/ai/enrich-matches";
import { isAiAvailable } from "@/lib/ai/client";
import fs from "fs";

const ENRICHED_FILE = '/tmp/enriched-cache.json';

function loadCache(): Record<string, { whyItMatters: string; beginnerTips: string[]; oneLineSummary?: string }> {
  try {
    if (fs.existsSync(ENRICHED_FILE)) {
      return JSON.parse(fs.readFileSync(ENRICHED_FILE, "utf-8"));
    }
  } catch { /* empty */ }
  return {};
}

function saveCache(cache: Record<string, unknown>) {
  fs.writeFileSync(ENRICHED_FILE, JSON.stringify(cache, null, 2));
}

export async function GET() {
  if (!isAiAvailable()) {
    return NextResponse.json({ error: "AI not available" }, { status: 400 });
  }

  const matches = getTodayMatches();
  const cache = loadCache();

  // Find matches that need enrichment
  const needsEnrich = matches.filter((m) => !cache[m.id]);

  if (needsEnrich.length === 0) {
    return NextResponse.json({
      done: true,
      message: "All matches already enriched",
      total: matches.length,
      enriched: Object.keys(cache).length,
    });
  }

  // Enrich one batch
  const batch = needsEnrich.slice(0, 10);
  const results = await enrichMatchBatch(batch, 10);

  for (const [id, data] of Object.entries(results)) {
    cache[id] = data;
  }

  saveCache(cache);

  return NextResponse.json({
    done: needsEnrich.length <= 10,
    enriched_this_batch: Object.keys(results).length,
    total_enriched: Object.keys(cache).length,
    total_matches: matches.length,
    remaining: matches.length - Object.keys(cache).length,
    sample: results[Object.keys(results)[0]],
  });
}
