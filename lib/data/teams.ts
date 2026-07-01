export interface Team {
  id: string; name: string; nameEn: string; flag: string;
  ranking: number; worldCupWins: number;
  style: string; styleDescription: string;
  avgAge: number; oneLineSummary: string;
  strength: number; color: string; starPlayers: string[];
}

// FIFA世界排名 → 星数: 1-5=5⭐  6-12=4⭐  13-25=3⭐  26-40=2⭐  40+=1⭐
// 排名参考2026年4月FIFA官方排名
function s(r: number): number {
  if (r <= 5) return 5; if (r <= 12) return 4; if (r <= 25) return 3; if (r <= 40) return 2; return 1;
}

export const teams: Team[] = [
  { id: "argentina", name: "阿根廷", nameEn: "Argentina", flag: "🇦🇷", ranking: 1, worldCupWins: 3, strength: s(1), style: "进攻华丽", oneLineSummary: "世界排名第1，卫冕冠军，梅西的最后一舞。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["messi", "alvarez", "emartinez", "enzo"] },
  { id: "france", name: "法国", nameEn: "France", flag: "🇫🇷", ranking: 2, worldCupWins: 2, strength: s(2), style: "攻守平衡", oneLineSummary: "世界排名第2，姆巴佩领衔的超豪华阵容。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["mbappe", "griezmann"] },
  { id: "brazil", name: "巴西", nameEn: "Brazil", flag: "🇧🇷", ranking: 3, worldCupWins: 5, strength: s(3), style: "技术细腻", oneLineSummary: "世界排名第3，五星巴西永远的夺冠热门。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["vinicius", "rodrygo", "alisson"] },
  { id: "england", name: "英格兰", nameEn: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", ranking: 4, worldCupWins: 1, strength: s(4), style: "青春风暴", oneLineSummary: "世界排名第4，才华横溢的青年军。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["bellingham", "saka"] },
  { id: "belgium", name: "比利时", nameEn: "Belgium", flag: "🇧🇪", ranking: 5, worldCupWins: 0, strength: s(5), style: "技术进攻", oneLineSummary: "世界排名第5，黄金一代最后一舞。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["debruyne"] },
  { id: "portugal", name: "葡萄牙", nameEn: "Portugal", flag: "🇵🇹", ranking: 6, worldCupWins: 0, strength: s(6), style: "技术进攻", oneLineSummary: "世界排名第6，C罗的最后一届世界杯。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["ronaldo", "leao"] },
  { id: "netherlands", name: "荷兰", nameEn: "Netherlands", flag: "🇳🇱", ranking: 7, worldCupWins: 0, strength: s(7), style: "全攻全守", oneLineSummary: "世界排名第7，橙色风暴无冕之王。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["gakpo"] },
  { id: "spain", name: "西班牙", nameEn: "Spain", flag: "🇪🇸", ranking: 8, worldCupWins: 1, strength: s(8), style: "传控足球", oneLineSummary: "世界排名第8，斗牛士军团。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["yamal", "pedri"] },
  { id: "croatia", name: "克罗地亚", nameEn: "Croatia", flag: "🇭🇷", ranking: 9, worldCupWins: 0, strength: s(9), style: "中场控制", oneLineSummary: "世界排名第9，格子军团中场大师。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["modric"] },
  { id: "uruguay", name: "乌拉圭", nameEn: "Uruguay", flag: "🇺🇾", ranking: 10, worldCupWins: 2, strength: s(10), style: "铁血防守", oneLineSummary: "世界排名第10，两届冠军南美劲旅。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["valverde"] },
  { id: "colombia", name: "哥伦比亚", nameEn: "Colombia", flag: "🇨🇴", ranking: 11, worldCupWins: 0, strength: s(11), style: "技术进攻", oneLineSummary: "世界排名第11，激情与创造力。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["luisdiaz", "james"] },
  { id: "germany", name: "德国", nameEn: "Germany", flag: "🇩🇪", ranking: 12, worldCupWins: 4, strength: s(12), style: "严谨高效", oneLineSummary: "世界排名第12，德意志战车永不言弃。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["musiala", "wirtz"] },
  { id: "morocco", name: "摩洛哥", nameEn: "Morocco", flag: "🇲🇦", ranking: 13, worldCupWins: 0, strength: s(13), style: "防守反击", oneLineSummary: "世界排名第13，非洲之光上届四强。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["hakimi"] },
  { id: "japan", name: "日本", nameEn: "Japan", flag: "🇯🇵", ranking: 14, worldCupWins: 0, strength: s(14), style: "快速反击", oneLineSummary: "世界排名第14，亚洲最强技术流。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["mitoma", "kubo"] },
  { id: "mexico", name: "墨西哥", nameEn: "Mexico", flag: "🇲🇽", ranking: 15, worldCupWins: 0, strength: s(15), style: "技术细腻", oneLineSummary: "世界排名第15，中北美之王。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: [] },
  { id: "switzerland", name: "瑞士", nameEn: "Switzerland", flag: "🇨🇭", ranking: 16, worldCupWins: 0, strength: s(16), style: "防守反击", oneLineSummary: "世界排名第16，战术执行力极强。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["akanji"] },
  { id: "unitedstates", name: "美国", nameEn: "United States", flag: "🇺🇸", ranking: 17, worldCupWins: 0, strength: s(17), style: "青春风暴", oneLineSummary: "世界排名第17，东道主之一。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["pulisic"] },
  { id: "senegal", name: "塞内加尔", nameEn: "Senegal", flag: "🇸🇳", ranking: 18, worldCupWins: 0, strength: s(18), style: "身体对抗", oneLineSummary: "世界排名第18，非洲冠军。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["mane", "koulibaly"] },
  { id: "iran", name: "伊朗", nameEn: "Iran", flag: "🇮🇷", ranking: 20, worldCupWins: 0, strength: s(20), style: "铁血防守", oneLineSummary: "世界排名第20，亚洲劲旅。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["taremi"] },
  { id: "austria", name: "奥地利", nameEn: "Austria", flag: "🇦🇹", ranking: 21, worldCupWins: 0, strength: s(21), style: "团队配合", oneLineSummary: "世界排名第21，欧洲中坚力量。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["sabitzer", "alaba"] },
  { id: "southkorea", name: "韩国", nameEn: "South Korea", flag: "🇰🇷", ranking: 22, worldCupWins: 0, strength: s(22), style: "跑动积极", oneLineSummary: "世界排名第22，亚洲太极虎。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["son"] },
  { id: "egypt", name: "埃及", nameEn: "Egypt", flag: "🇪🇬", ranking: 24, worldCupWins: 0, strength: s(24), style: "防守反击", oneLineSummary: "世界排名第24，法老的军团。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["salah"] },
  { id: "sweden", name: "瑞典", nameEn: "Sweden", flag: "🇸🇪", ranking: 26, worldCupWins: 0, strength: s(26), style: "团队配合", oneLineSummary: "世界排名第26，北欧劲旅。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["isak"] },
  { id: "turkey", name: "土耳其", nameEn: "Turkey", flag: "🇹🇷", ranking: 27, worldCupWins: 0, strength: s(27), style: "身体对抗", oneLineSummary: "世界排名第27，激情足球。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["calhanoglu", "guler"] },
  { id: "norway", name: "挪威", nameEn: "Norway", flag: "🇳🇴", ranking: 28, worldCupWins: 0, strength: s(28), style: "青春风暴", oneLineSummary: "世界排名第28，哈兰德+厄德高。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["haaland"] },
  { id: "czechia", name: "捷克", nameEn: "Czechia", flag: "🇨🇿", ranking: 29, worldCupWins: 0, strength: s(29), style: "团队配合", oneLineSummary: "世界排名第29，东欧铁骑。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["schick"] },
  { id: "ghana", name: "加纳", nameEn: "Ghana", flag: "🇬🇭", ranking: 30, worldCupWins: 0, strength: s(30), style: "身体对抗", oneLineSummary: "世界排名第30，非洲黑星。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["kudus"] },
  { id: "canada", name: "加拿大", nameEn: "Canada", flag: "🇨🇦", ranking: 31, worldCupWins: 0, strength: s(31), style: "快速反击", oneLineSummary: "世界排名第31，东道主年轻有冲劲。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["davies"] },
  { id: "saudiarabia", name: "沙特阿拉伯", nameEn: "Saudi Arabia", flag: "🇸🇦", ranking: 32, worldCupWins: 0, strength: s(32), style: "技术反击", oneLineSummary: "世界排名第32，2022曾逆转阿根廷。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["aldawsari"] },
  { id: "algeria", name: "阿尔及利亚", nameEn: "Algeria", flag: "🇩🇿", ranking: 33, worldCupWins: 0, strength: s(33), style: "技术细腻", oneLineSummary: "世界排名第33，北非之狐。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["mahrez"] },
  { id: "ivorycoast", name: "科特迪瓦", nameEn: "Ivory Coast", flag: "🇨🇮", ranking: 34, worldCupWins: 0, strength: s(34), style: "身体对抗", oneLineSummary: "世界排名第34，非洲大象。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["diallo-ivory"] },
  { id: "paraguay", name: "巴拉圭", nameEn: "Paraguay", flag: "🇵🇾", ranking: 35, worldCupWins: 0, strength: s(35), style: "铁血防守", oneLineSummary: "世界排名第35，南美劲旅防守顽强。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["almiron"] },
  { id: "australia", name: "澳大利亚", nameEn: "Australia", flag: "🇦🇺", ranking: 36, worldCupWins: 0, strength: s(36), style: "身体对抗", oneLineSummary: "世界排名第36，澳洲袋鼠军团。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["irvine"] },
  { id: "scotland", name: "苏格兰", nameEn: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", ranking: 37, worldCupWins: 0, strength: s(37), style: "身体对抗", oneLineSummary: "世界排名第37，重返世界杯。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["robertson"] },
  { id: "tunisia", name: "突尼斯", nameEn: "Tunisia", flag: "🇹🇳", ranking: 38, worldCupWins: 0, strength: s(38), style: "防守反击", oneLineSummary: "世界排名第38，非洲劲旅。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: [] },
  { id: "southafrica", name: "南非", nameEn: "South Africa", flag: "🇿🇦", ranking: 39, worldCupWins: 0, strength: s(39), style: "快速反击", oneLineSummary: "世界排名第39，前世界杯东道主。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: [] },
  { id: "qatar", name: "卡塔尔", nameEn: "Qatar", flag: "🇶🇦", ranking: 40, worldCupWins: 0, strength: s(40), style: "技术细腻", oneLineSummary: "世界排名第40，上届东道主。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: [] },
  { id: "bosniaherzegovina", name: "波黑", nameEn: "Bosnia-Herzegovina", flag: "🇧🇦", ranking: 45, worldCupWins: 0, strength: s(45), style: "身体对抗", oneLineSummary: "巴尔干劲旅，首次亮相48强世界杯。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["dzeko"] },
  { id: "ecuador", name: "厄瓜多尔", nameEn: "Ecuador", flag: "🇪🇨", ranking: 46, worldCupWins: 0, strength: s(46), style: "高原足球", oneLineSummary: "南美劲旅。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: ["caicedo"] },
  { id: "iraq", name: "伊拉克", nameEn: "Iraq", flag: "🇮🇶", ranking: 55, worldCupWins: 0, strength: s(55), style: "拼搏精神", oneLineSummary: "亚洲黑马。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: [] },
  { id: "jordan", name: "约旦", nameEn: "Jordan", flag: "🇯🇴", ranking: 60, worldCupWins: 0, strength: s(60), style: "防守反击", oneLineSummary: "亚洲新势力，首次世界杯。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: [] },
  { id: "newzealand", name: "新西兰", nameEn: "New Zealand", flag: "🇳🇿", ranking: 85, worldCupWins: 0, strength: s(85), style: "身体对抗", oneLineSummary: "大洋洲代表。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: [] },
  { id: "uzbekistan", name: "乌兹别克斯坦", nameEn: "Uzbekistan", flag: "🇺🇿", ranking: 50, worldCupWins: 0, strength: s(50), style: "防守反击", oneLineSummary: "中亚劲旅，首次闯入世界杯。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: [] },
  { id: "panama", name: "巴拿马", nameEn: "Panama", flag: "🇵🇦", ranking: 52, worldCupWins: 0, strength: s(52), style: "防守反击", oneLineSummary: "中北美新势力。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: [] },
  { id: "capeverdeislands", name: "佛得角", nameEn: "Cape Verde", flag: "🇨🇻", ranking: 70, worldCupWins: 0, strength: s(70), style: "防守反击", oneLineSummary: "非洲岛国，首次闯入世界杯。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: [] },
  { id: "congodr", name: "刚果(金)", nameEn: "Congo DR", flag: "🇨🇩", ranking: 65, worldCupWins: 0, strength: s(65), style: "身体对抗", oneLineSummary: "非洲新势力。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: [] },
  { id: "curaçao", name: "库拉索", nameEn: "Curaçao", flag: "🇨🇼", ranking: 90, worldCupWins: 0, strength: s(90), style: "防守反击", oneLineSummary: "加勒比新面孔。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: [] },
  { id: "haiti", name: "海地", nameEn: "Haiti", flag: "🇭🇹", ranking: 88, worldCupWins: 0, strength: s(88), style: "防守反击", oneLineSummary: "加勒比新军。", styleDescription: "", avgAge: 0, color: "#888", starPlayers: [] },
];

export function getTeam(id: string): Team | undefined { return teams.find(t => t.id === id); }
export function getAllTeams(): Team[] { return teams; }
