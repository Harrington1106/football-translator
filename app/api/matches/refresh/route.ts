import { NextResponse } from "next/server";
import fs from "fs";

const LIVE_CACHE = '/tmp/live-cache.json';

// POST /api/matches/refresh — force refresh (uses 1 API call)
export async function POST() {
  // Delete cache to force re-fetch
  try { fs.unlinkSync(LIVE_CACHE); } catch {}

  // Redirect to the main endpoint which will now fetch fresh data
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${base}/api/matches`);
    const data = await res.json();
    return NextResponse.json({ message: "Refreshed", ...data });
  } catch {
    return NextResponse.json({ message: "Refresh triggered, call /api/matches to see new data" });
  }
}

// GET — check cache status
export async function GET() {
  try {
    if (fs.existsSync(LIVE_CACHE)) {
      const raw = JSON.parse(fs.readFileSync(LIVE_CACHE, "utf-8"));
      const age = Math.round((Date.now() - raw.time) / 1000 / 60);
      return NextResponse.json({
        cached: true,
        ageMinutes: age,
        matches: raw.data?.length,
        nextRefresh: `${Math.max(0, 120 - age)} 分钟后`,
      });
    }
  } catch {}
  return NextResponse.json({ cached: false });
}
