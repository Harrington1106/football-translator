const BASE_URL = "https://api.football-data.org/v4";
const COMPETITION_ID = "2000"; // FIFA World Cup

// Cache in memory
const cache = new Map<string, { data: unknown; expires: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 min

function getApiKey(): string | null {
  return process.env.FOOTBALL_DATA_API_KEY || null;
}

async function fetchWithCache(url: string): Promise<unknown | null> {
  const cached = cache.get(url);
  if (cached && Date.now() < cached.expires) {
    return cached.data;
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("⚠️ FOOTBALL_DATA_API_KEY not set");
    return null;
  }

  try {
    const res = await fetch(url, {
      headers: { "X-Auth-Token": apiKey },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error(`football-data API ${res.status}: ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    cache.set(url, { data, expires: Date.now() + CACHE_TTL });
    return data;
  } catch (error) {
    console.error("football-data API error:", error);
    return null;
  }
}

export interface FDMatch {
  id: number;
  utcDate: string;
  status: string; // SCHEDULED | TIMED | IN_PLAY | PAUSED | FINISHED
  stage: string;
  venue?: string;
  homeTeam: { id: number; name: string; shortName: string };
  awayTeam: { id: number; name: string; shortName: string };
  score: {
    fullTime: { home: number | null; away: number | null };
    halfTime?: { home: number | null; away: number | null };
  };
  goals?: Array<{
    minute: number;
    type: string;
    team: { id: number; name: string };
    scorer: { id: number; name: string };
  }>;
}

export interface FDResponse {
  competition: { id: number; name: string };
  matches: FDMatch[];
}

/**
 * Get World Cup matches for a date range.
 */
export async function getMatches(dateFrom?: string, dateTo?: string): Promise<FDResponse | null> {
  const from = dateFrom || new Date().toISOString().split("T")[0];
  const to = dateTo || from;

  let url = `${BASE_URL}/competitions/${COMPETITION_ID}/matches?dateFrom=${from}&dateTo=${to}`;

  // Include all statuses
  url += "&status=SCHEDULED,TIMED,IN_PLAY,PAUSED,FINISHED";

  return fetchWithCache(url) as Promise<FDResponse | null>;
}

/**
 * Get today's World Cup matches.
 */
export async function getTodayMatches(): Promise<FDResponse | null> {
  const today = new Date().toISOString().split("T")[0];
  return getMatches(today, today);
}

/**
 * Get a specific match by ID.
 */
export async function getMatch(matchId: number): Promise<FDMatch | null> {
  const url = `${BASE_URL}/matches/${matchId}`;
  return fetchWithCache(url) as Promise<FDMatch | null>;
}
