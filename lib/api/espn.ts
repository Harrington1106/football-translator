const SCOREBOARD_URL = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard";

interface ESPNEvent {
  id: string;
  date: string;
  name: string;
  shortName: string;
  status: {
    type: { name: string; state: string; completed: boolean; description: string; detail: string; shortDetail: string };
    displayClock?: string;
  };
  competitions: Array<{
    venue?: { fullName: string };
    competitors: Array<{
      score: string;
      winner: boolean;
      team: { abbreviation: string; displayName: string; name: string; id: string };
      statistics?: Array<{ name: string; displayValue: string }>;
    }>;
    details?: Array<{
      type: { id: string; text: string };
      clock: { displayValue: string };
      team: { id?: string };
      athletesInvolved?: Array<{ displayName: string; fullName: string; jersey: string; position: string }>;
    }>;
    headlines?: Array<{ description: string; shortLinkText: string }>;
  }>;
}

export interface ESPNMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: "upcoming" | "live" | "finished";
  kickoff: string;
  venue: string;
  displayClock: string;
  details?: Array<{
    minute: string;
    type: string;
    team: string;
    player: string;
  }>;
  headline?: string;
}

export async function fetchESPNScoreboard(date?: string): Promise<ESPNMatch[]> {
  const url = date ? `${SCOREBOARD_URL}?dates=${date}` : SCOREBOARD_URL;
  try {
    const res = await fetch(url, { next: { revalidate: 30 } });
    if (!res.ok) return [];
    const data = await res.json();
    return adaptESPNData(data.events || []);
  } catch {
    return [];
  }
}

function adaptESPNData(events: ESPNEvent[]): ESPNMatch[] {
  return events.map((e) => {
    const comp = e.competitions?.[0];
    const home = comp?.competitors?.[0];
    const away = comp?.competitors?.[1];
    const statusType = e.status?.type?.name;
    const status: ESPNMatch["status"] =
      statusType === "STATUS_FULL_TIME" || statusType === "STATUS_FINAL" || statusType === "STATUS_END_OF_PERIOD" ? "finished" :
      statusType === "STATUS_SCHEDULED" || statusType === "STATUS_PREMATCH" ? "upcoming" :
      "live"; // STATUS_FIRST_HALF, STATUS_SECOND_HALF, STATUS_HALFTIME, STATUS_IN_PROGRESS etc

    const details = comp?.details?.map((d) => ({
      minute: d.clock.displayValue,
      type: d.type.text,
      team: d.team?.id === home?.team?.id ? "home" : "away",
      player: d.athletesInvolved?.[0]?.displayName || "",
    }));

    return {
      id: `espn-${e.id}`,
      homeTeam: home?.team?.displayName || home?.team?.name || "",
      awayTeam: away?.team?.displayName || away?.team?.name || "",
      homeScore: home?.score ? parseInt(home.score) : undefined,
      awayScore: away?.score ? parseInt(away.score) : undefined,
      status,
      kickoff: e.date,
      venue: comp?.venue?.fullName || "",
      displayClock: e.status?.displayClock || "",
      details,
      headline: comp?.headlines?.[0]?.shortLinkText,
    };
  });
}
