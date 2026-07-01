const BASE = "https://worldcup26.ir/get";

interface WC26Game {
  id: string;
  home_team_id: string;
  away_team_id: string;
  home_score: string;
  away_score: string;
  home_scorers: string;
  away_scorers: string;
  group: string;
  matchday: string;
  local_date: string;
  stadium_id: string;
  finished: string;
  time_elapsed: string;
  type: string;
  home_team_name_en: string;
  away_team_name_en: string;
}

interface WC26Team {
  id: string;
  name_en: string;
  fifa_code: string;
  flag: string;
  groups: string;
}

// In-memory cache
let _gamesCache: WC26Game[] | null = null;
let _teamsCache: WC26Team[] | null = null;
let _cacheTime = 0;
const CACHE_TTL = 120_000; // 2 min

export async function getGames(): Promise<WC26Game[]> {
  if (_gamesCache && Date.now() - _cacheTime < CACHE_TTL) return _gamesCache;
  try {
    const res = await fetch(`${BASE}/games`, { next: { revalidate: 120 } });
    const data = await res.json();
    _gamesCache = data.games || [];
    _cacheTime = Date.now();
    return _gamesCache!;
  } catch { return _gamesCache || []; }
}

export async function getTeams(): Promise<WC26Team[]> {
  if (_teamsCache && Date.now() - _cacheTime < CACHE_TTL) return _teamsCache;
  try {
    const res = await fetch(`${BASE}/teams`, { next: { revalidate: 300 } });
    const data = await res.json();
    _teamsCache = Array.isArray(data) ? data : data.teams || [];
    _cacheTime = Date.now();
    return _teamsCache!;
  } catch { return _teamsCache || []; }
}
