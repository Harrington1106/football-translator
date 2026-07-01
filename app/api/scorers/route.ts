import { NextResponse } from "next/server";
import { getGames } from "@/lib/api/worldcup26";

// English → Chinese name mapping
const CN_MAP: Record<string, string> = {
  "Kylian Mbappé": "姆巴佩", "Erling Haaland": "哈兰德", "Lionel Messi": "梅西",
  "Julián Álvarez": "阿尔瓦雷斯", "Vinícius Jr.": "维尼修斯", "Jude Bellingham": "贝林厄姆",
  "Bukayo Saka": "萨卡", "Harry Kane": "凯恩", "Lamine Yamal": "亚马尔",
  "Jamal Musiala": "穆西亚拉", "Florian Wirtz": "维尔茨", "Cristiano Ronaldo": "C罗",
  "Rafael Leão": "莱奥", "Antoine Griezmann": "格列兹曼", "Kevin De Bruyne": "德布劳内",
  "Mohamed Salah": "萨拉赫", "Son Heung-min": "孙兴慜", "Federico Valverde": "巴尔韦德",
  "Luka Modrić": "莫德里奇", "Achraf Hakimi": "哈基米", "Alphonso Davies": "戴维斯",
  "Christian Pulisic": "普利西奇", "Cody Gakpo": "加克波", "Kaoru Mitoma": "三笘薰",
  "Takefusa Kubo": "久保建英", "Nestory Irankunda": "伊兰昆达", "C. Metcalfe": "梅特卡夫",
  "Antonio Nusa": "努萨", "Amad Diallo": "阿马德·迪亚洛", "Bradley Barcola": "巴尔科拉",
  "Kaishu Sano": "佐野海舟", "Gabriel Martinelli": "马丁内利", "Stephen Eustáquio": "欧斯塔基奥",
  "Michael Olise": "奥利塞", "Ousmane Dembélé": "登贝莱", "Brian Brobbey": "布罗比",
  "Matheus Cunha": "库尼亚", "Anthony Elanga": "埃兰加", "Ismaïla Sarr": "伊斯梅拉·萨尔",
  "Mikel Oyarzabal": "奥亚萨瓦尔", "Vinícius Júnior": "维尼修斯", "Raphinha": "拉菲尼亚",
  "Rodrygo": "罗德里戈", "Gavi": "加维", "Nico Williams": "尼科·威廉姆斯",
  "Kai Havertz": "哈弗茨", "Leroy Sané": "萨内",
  "Niclas Füllkrug": "菲尔克鲁格", "Deniz Undav": "翁达夫",
  "Marcus Rashford": "拉什福德", "Phil Foden": "福登", "Cole Palmer": "帕尔默",
  "Darwin Núñez": "努涅斯", "Luis Díaz": "路易斯·迪亚斯",
  "Bruno Fernandes": "B费", "Bernardo Silva": "B席", "Lautaro Martínez": "劳塔罗",
  "Ángel Di María": "迪马利亚", "Enzo Fernández": "恩佐", "Alexis Mac Allister": "麦卡利斯特",
  "Khvicha Kvaratskhelia": "克瓦拉茨赫利亚", "Victor Osimhen": "奥斯梅恩",
  "Mohammed Kudus": "库杜斯", "Sébastien Haller": "阿莱", "Mehdi Taremi": "塔雷米",
  "Salem Al-Dawsari": "达瓦萨里", "Hee-chan Hwang": "黄喜灿", "Min-jae Kim": "金玟哉",
  "Hakim Ziyech": "齐耶赫", "Youssef En-Nesyri": "恩内斯里",
  "Jonathan David": "乔纳森·戴维", "Cyle Larin": "拉林",
};

function toChinese(name: string): string {
  if (CN_MAP[name]) return CN_MAP[name];
  // Try lowercase
  const lower = name.toLowerCase();
  for (const [en, cn] of Object.entries(CN_MAP)) {
    if (en.toLowerCase() === lower) return cn;
  }
  return name;
}

interface Scorer {
  name: string;
  team: string;
  goals: number;
}

export async function GET() {
  const scorers = new Map<string, Scorer>();

  try {
    const games = await getGames();
    for (const g of games) {
      const homeScorers = parseScorers(g.home_scorers || "");
      const awayScorers = parseScorers(g.away_scorers || "");
      for (const s of homeScorers) {
        const key = `${s.name}|${g.home_team_id}`;
        const existing = scorers.get(key);
        if (existing) { existing.goals++; }
        else { scorers.set(key, { name: toChinese(s.name), team: g.home_team_id, goals: 1 }); }
      }
      for (const s of awayScorers) {
        const key = `${s.name}|${g.away_team_id}`;
        const existing = scorers.get(key);
        if (existing) { existing.goals++; }
        else { scorers.set(key, { name: toChinese(s.name), team: g.away_team_id, goals: 1 }); }
      }
    }
  } catch {}

  const ranked = Array.from(scorers.values())
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 20);

  return NextResponse.json({ scorers: ranked });
}

function parseScorers(str: string): Array<{ name: string }> {
  if (!str || str === "null") return [];
  try {
    const cleaned = str.replace(/[{}"]/g, "").split(",");
    return cleaned.map(s => {
      // Remove trailing minute markers like " 45'", " 45+3'", " 90'+4"
      let name = s.trim().replace(/\s+\d+(\+\d+)?'?\s*$/, "").trim();
      // Remove backslash escapes
      name = name.replace(/\\/g, "");
      return { name };
    }).filter(s => s.name.length > 0);
  } catch { return []; }
}
