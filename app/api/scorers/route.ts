import { NextResponse } from "next/server";
import { fetchESPNScoreboard } from "@/lib/api/espn";
import { getTodayMatches } from "@/lib/data/matches";

// ESPN English → Chinese name mapping
const CN_MAP: Record<string, string> = {
  "Kylian Mbappé": "姆巴佩", "Antonio Nusa": "努萨", "Amad Diallo": "阿马德·迪亚洛",
  "Erling Haaland": "哈兰德", "Bradley Barcola": "巴尔科拉", "Kaishu Sano": "佐野海舟",
  "Gabriel Martinelli": "马丁内利", "Cody Gakpo": "加克波", "Stephen Eustáquio": "欧斯塔基奥",
  "Lionel Messi": "梅西", "Julián Álvarez": "阿尔瓦雷斯", "Vinícius Jr.": "维尼修斯",
  "Rodrygo": "罗德里戈", "Jude Bellingham": "贝林厄姆", "Bukayo Saka": "萨卡",
  "Harry Kane": "凯恩", "Lamine Yamal": "亚马尔", "Pedri": "佩德里",
  "Jamal Musiala": "穆西亚拉", "Florian Wirtz": "维尔茨", "Cristiano Ronaldo": "C罗",
  "Rafael Leão": "莱奥", "Antoine Griezmann": "格列兹曼", "Kevin De Bruyne": "德布劳内",
  "Mohamed Salah": "萨拉赫", "Son Heung-min": "孙兴慜", "Federico Valverde": "巴尔韦德",
  "Luka Modrić": "莫德里奇", "Achraf Hakimi": "哈基米", "Alphonso Davies": "戴维斯",
  "Christian Pulisic": "普利西奇", "Bruno Fernandes": "布鲁诺·费尔南德斯",
  "Kaoru Mitoma": "三笘薰", "Takefusa Kubo": "久保建英", "Emiliano Martínez": "马丁内斯",
  "Enzo Fernández": "恩佐·费尔南德斯", "Alexis Mac Allister": "麦卡利斯特",
};
for (const [en, cn] of Object.entries(CN_MAP)) {
  CN_MAP[en] = cn;
  CN_MAP[en.toLowerCase()] = cn;
}

function toChinese(name: string): string {
  return CN_MAP[name] || CN_MAP[name.toLowerCase()] || name;
}

interface Scorer {
  name: string;
  team: string;
  goals: number;
}

export async function GET() {
  const scorers = new Map<string, Scorer>();

  // ── From static match events ──
  const matches = getTodayMatches();
  for (const m of matches) {
    // Named events
    if (m.events) {
      for (const e of m.events) {
        if (e.type === "goal" && e.player) {
          const key = `${e.player}|${e.team}`;
          const existing = scorers.get(key);
          if (existing) {
            existing.goals++;
          } else {
            scorers.set(key, { name: toChinese(e.player), team: e.team, goals: 1 });
          }
        }
      }
    }
  }

  // ── From ESPN data (try multiple dates to get more scorers) ──
  try {
    // Try recent dates (ESPN format: YYYYMMDD)
    const toEspnDate = (offset = 0) => {
      const d = new Date(Date.now() - offset * 86400000);
      return d.toISOString().split("T")[0].replace(/-/g, "");
    };
    for (const date of [toEspnDate(), toEspnDate(1), toEspnDate(2)]) {
      try {
        const espnData = await fetchESPNScoreboard(date);
        for (const em of espnData) {
          if (em.details) {
            for (const d of em.details) {
              if (d.type === "Goal" && d.player) {
                // Map "home"/"away" to actual team
                const teamId = d.team === "home" ? em.homeTeam : em.awayTeam;
                const key = `${d.player}|${teamId}`;
                const existing = scorers.get(key);
                if (existing) {
                  existing.goals += 1;
                } else {
                  scorers.set(key, { name: toChinese(d.player), team: teamId, goals: 1 });
                }
              }
            }
          }
        }
      } catch {}
    }
  } catch {}

  // Sort by goals desc
  const ranked = Array.from(scorers.values())
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 20);

  return NextResponse.json({ scorers: ranked });
}
