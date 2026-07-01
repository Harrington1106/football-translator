import type { Match, MatchEvent } from "@/lib/data/matches";
import { getTeams } from "./worldcup26";

// English scorer name → Chinese
const CN_NAMES: Record<string, string> = {
  "Kylian Mbappé": "姆巴佩", "Erling Haaland": "哈兰德", "Lionel Messi": "梅西",
  "Julián Álvarez": "阿尔瓦雷斯", "Vinícius Júnior": "维尼修斯", "Jude Bellingham": "贝林厄姆",
  "Bukayo Saka": "萨卡", "Harry Kane": "凯恩", "Lamine Yamal": "亚马尔",
  "Jamal Musiala": "穆西亚拉", "Florian Wirtz": "维尔茨", "Cristiano Ronaldo": "C罗",
  "Rafael Leão": "莱奥", "Antoine Griezmann": "格列兹曼", "Kevin De Bruyne": "德布劳内",
  "Mohamed Salah": "萨拉赫", "Son Heung-min": "孙兴慜", "Federico Valverde": "巴尔韦德",
  "Luka Modrić": "莫德里奇", "Achraf Hakimi": "哈基米", "Alphonso Davies": "戴维斯",
  "Christian Pulisic": "普利西奇", "Cody Gakpo": "加克波", "Kaoru Mitoma": "三笘薰",
  "Takefusa Kubo": "久保建英", "Nestory Irankunda": "伊兰昆达", "C. Metcalfe": "梅特卡夫",
  "Antonio Nusa": "努萨", "Amad Diallo": "阿马德·迪亚洛", "Bradley Barcola": "巴尔科拉",
  "Ousmane Dembélé": "登贝莱", "Brian Brobbey": "布罗比", "Matheus Cunha": "库尼亚",
  "Anthony Elanga": "埃兰加", "Ismaïla Sarr": "伊斯梅拉·萨尔", "Mikel Oyarzabal": "奥亚萨瓦尔",
  "Raphinha": "拉菲尼亚", "Rodrygo": "罗德里戈", "Pedri": "佩德里",
  "Gavi": "加维", "Nico Williams": "尼科·威廉姆斯", "Leroy Sané": "萨内",
  "Kai Havertz": "哈弗茨", "Niclas Füllkrug": "菲尔克鲁格", "Deniz Undav": "翁达夫",
  "Marcus Rashford": "拉什福德", "Phil Foden": "福登", "Cole Palmer": "帕尔默",
  "Darwin Núñez": "努涅斯", "Luis Díaz": "路易斯·迪亚斯", "Lautaro Martínez": "劳塔罗",
  "Ángel Di María": "迪马利亚", "Enzo Fernández": "恩佐", "Alexis Mac Allister": "麦卡利斯特",
  "Bruno Fernandes": "B费", "Bernardo Silva": "B席", "Khvicha Kvaratskhelia": "克瓦拉茨赫利亚",
  "Victor Osimhen": "奥斯梅恩", "Mohammed Kudus": "库杜斯", "Mehdi Taremi": "塔雷米",
  "Salem Al-Dawsari": "达瓦萨里", "Hee-chan Hwang": "黄喜灿", "Min-jae Kim": "金玟哉",
  "Hakim Ziyech": "齐耶赫", "Youssef En-Nesyri": "恩内斯里", "Jonathan David": "乔纳森·戴维",
  "Michael Olise": "奥利塞", "Kingsley Coman": "科曼", "Marcus Thuram": "马库斯·图拉姆",
};
function cnName(en: string): string {
  const cleaned = en.replace(/\s+\d+(\+\d+)?'?\s*$/, "").trim().replace(/\\/g, "");
  return CN_NAMES[cleaned] || CN_NAMES[en] || cleaned;
}

// Map FIFA codes & numeric IDs to our team IDs
function fifaToId(code: string): string {
  const map: Record<string, string> = {
    MEX: "mexico", RSA: "southafrica", KOR: "southkorea", CZE: "czechia",
    CAN: "canada", BIH: "bosniaherzegovina", USA: "unitedstates", PAR: "paraguay",
    QAT: "qatar", SUI: "switzerland", BRA: "brazil", MAR: "morocco",
    HAI: "haiti", SCO: "scotland", AUS: "australia", TUR: "turkey",
    GER: "germany", CUW: "curaçao", NED: "netherlands", JPN: "japan",
    CIV: "ivorycoast", ECU: "ecuador", SWE: "sweden", TUN: "tunisia",
    ESP: "spain", CPV: "capeverdeislands", BEL: "belgium", EGY: "egypt",
    KSA: "saudiarabia", URU: "uruguay", IRN: "iran", NZL: "newzealand",
    FRA: "france", SEN: "senegal", IRQ: "iraq", NOR: "norway",
    ARG: "argentina", ALG: "algeria", AUT: "austria", JOR: "jordan",
    POR: "portugal", COD: "congodr", ENG: "england", CRO: "croatia",
    GHA: "ghana", PAN: "panama", UZB: "uzbekistan", COL: "colombia",
  };
  return map[code] || code.toLowerCase();
}

function mapStatus(game: any): "upcoming" | "live" | "finished" {
  if (game.finished === "TRUE") return "finished";
  if (game.time_elapsed && game.time_elapsed !== "finished" && game.time_elapsed !== "notstarted") return "live";
  return "upcoming";
}

function mapStage(type: string, group: string): string {
  const t = type.toLowerCase();
  if (t === "group") return "小组赛";
  if (t === "r32" || t === "round of 32") return "32强赛";
  if (t === "r16" || t === "round of 16") return "1/8决赛";
  if (t === "qf" || t === "quarter-finals") return "1/4决赛";
  if (t === "sf" || t === "semi-finals") return "半决赛";
  if (t === "third" || t === "3rd place") return "三四名决赛";
  if (t === "final") return "决赛";
  return type;
}

function parseScorers(scorersStr: string): Array<{ name: string; minute: number }> {
  if (!scorersStr || scorersStr === "null") return [];
  try {
    // Format: '{"Nestory Irankunda 27\'","C. Metcalfe 75\'"}'
    const cleaned = scorersStr.replace(/[{}"]/g, "").split(",");
    return cleaned.map(s => {
      const match = s.trim().match(/^(.+)\s+(\d+)'?$/);
      return {
        name: match?.[1]?.trim() || s.trim(),
        minute: match ? parseInt(match[2]) : 0,
      };
    });
  } catch { return []; }
}

export function adaptWC26Game(game: any, homeTeamName?: string, awayTeamName?: string): Match | null {
  const hid = fifaToId(game.home_team_id || "");
  const aid = fifaToId(game.away_team_id || "");
  if (!hid || !aid) return null;

  const status = mapStatus(game);
  const stage = mapStage(game.type || "", game.group || "");
  const homeScorers = parseScorers(game.home_scorers || "");
  const awayScorers = parseScorers(game.away_scorers || "");

  const events: MatchEvent[] = [];
  for (const s of homeScorers) {
    events.push({
      minute: s.minute, type: "goal", team: hid, player: s.name.toLowerCase().replace(/\s+/g, ""),
      description: `${s.name}进球`,
      beginnerExplanation: `第${s.minute}分钟，${s.name}进球！`,
    });
  }
  for (const s of awayScorers) {
    events.push({
      minute: s.minute, type: "goal", team: aid, player: s.name.toLowerCase().replace(/\s+/g, ""),
      description: `${s.name}进球`,
      beginnerExplanation: `第${s.minute}分钟，${s.name}进球！`,
    });
  }

  return {
    id: `wc26-${game.id}`,
    homeTeam: hid,
    awayTeam: aid,
    status,
    homeScore: game.home_score ? parseInt(game.home_score) : undefined,
    awayScore: game.away_score ? parseInt(game.away_score) : undefined,
    kickoff: game.local_date ? new Date(game.local_date).toISOString() : "",
    venue: "",
    stage,
    stageDescription: stage,
    whyItMatters: "",
    beginnerTips: [],
    events: events.length > 0 ? events : undefined,
    homeStrength: 3,
    awayStrength: 3,
  };
}

// Build map from worldcup26 numeric team ID → our team ID
let _teamMap: Record<string, string> | null = null;
async function loadTeamMap(): Promise<Record<string, string>> {
  if (_teamMap) return _teamMap;
  const teams = await getTeams();
  _teamMap = {};
  for (const t of teams) {
    const ourId = fifaToId(t.fifa_code || "");
    if (ourId && ourId !== t.fifa_code?.toLowerCase()) {
      _teamMap[t.id] = ourId;
    } else {
      // Fallback: use English name to guess
      _teamMap[t.id] = t.name_en?.toLowerCase().replace(/\s+/g, "") || t.id;
    }
  }
  return _teamMap;
}

export async function adaptWC26Games(games: any[]): Promise<(Match | null)[]> {
  const teamMap = await loadTeamMap();
  return games.map(g => {
    const hid = teamMap[g.home_team_id] || g.home_team_id;
    const aid = teamMap[g.away_team_id] || g.away_team_id;
    // Skip placeholder matches (TBD opponents = "0")
    if (!hid || !aid || hid === "0" || aid === "0") return null;

    const status = mapStatus(g);
    const stage = mapStage(g.type || "", g.group || "");
    const homeScorers = parseScorers(g.home_scorers || "");
    const awayScorers = parseScorers(g.away_scorers || "");

    const events: MatchEvent[] = [];
    for (const s of homeScorers) {
      events.push({
        minute: s.minute, type: "goal", team: hid, player: s.name.toLowerCase().replace(/\s+/g, ""),
        description: `${cnName(s.name)}进球`,
        beginnerExplanation: `第${s.minute}分钟，${cnName(s.name)}进球！`,
      });
    }
    for (const s of awayScorers) {
      events.push({
        minute: s.minute, type: "goal", team: aid, player: s.name.toLowerCase().replace(/\s+/g, ""),
        description: `${cnName(s.name)}进球`,
        beginnerExplanation: `第${s.minute}分钟，${cnName(s.name)}进球！`,
      });
    }

    return {
      id: `wc26-${g.id}`,
      homeTeam: hid,
      awayTeam: aid,
      status,
      homeScore: g.home_score ? parseInt(g.home_score) : undefined,
      awayScore: g.away_score ? parseInt(g.away_score) : undefined,
      kickoff: g.local_date ? new Date(g.local_date).toISOString() : "",
      venue: "",
      stage,
      stageDescription: stage,
      whyItMatters: "",
      beginnerTips: [],
      events: events.length > 0 ? events : undefined,
      homeStrength: 3,
      awayStrength: 3,
    };
  }).filter(Boolean) as Match[];
}
