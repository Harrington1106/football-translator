const BASE = "https://www.thesportsdb.com/api/v1/json/3";

// Simple in-memory cache
const cache = new Map<string, { data: unknown; expires: number }>();
const TTL = 5 * 60 * 1000; // 5 min

async function fetchTDB(path: string): Promise<unknown | null> {
  const url = `${BASE}/${path}`;
  const cached = cache.get(url);
  if (cached && Date.now() < cached.expires) return cached.data;

  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = await res.json();
    cache.set(url, { data, expires: Date.now() + TTL });
    return data;
  } catch {
    return null;
  }
}

interface TDBEvent {
  idEvent: string;
  strEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  strStatus: string;
  dateEvent: string;
  strTime: string;
  strVenue: string;
  strLeague: string;
  strSeason: string;
}

/**
 * Search for World Cup 2026 events.
 */
export async function searchWorldCupEvents(): Promise<TDBEvent[] | null> {
  const data = await fetchTDB(`searchevents.php?e=World_Cup_2026`) as {
    event?: TDBEvent[];
  } | null;
  return data?.event || null;
}

/**
 * Search by team name.
 */
export async function searchEventsByTeam(team: string): Promise<TDBEvent[] | null> {
  const data = await fetchTDB(`searchevents.php?e=${encodeURIComponent(team)}`) as {
    event?: TDBEvent[];
  } | null;
  return data?.event || null;
}

/**
 * Get all leagues (to find World Cup league ID).
 */
export async function getAllLeagues(): Promise<unknown | null> {
  return fetchTDB("all_leagues.php");
}

/**
 * Get events by league ID + season.
 */
export async function getEventsBySeason(leagueId: string, season: string): Promise<TDBEvent[] | null> {
  const data = await fetchTDB(`eventsseason.php?id=${leagueId}&s=${season}`) as {
    event?: TDBEvent[];
  } | null;
  return data?.event || null;
}
