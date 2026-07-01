import { notFound } from "next/navigation";
import Link from "next/link";
import { getTeam, getAllTeams } from "@/lib/data/teams";
import { getPlayersByTeam, getStarPlayers } from "@/lib/data/players";
import { PlayerAvatar } from "@/components/ui/PlayerAvatar";
import { matches as allMatches } from "@/lib/data/matches";
import fs from "fs";

const LIVE_CACHE = '/tmp/live-cache.json';

interface TeamPageProps { params: Promise<{ id: string }>; }

export default async function TeamPage({ params }: TeamPageProps) {
  const { id } = await params;
  const team = getTeam(id);
  if (!team) notFound();

  const players = getPlayersByTeam(id);
  const stars = getStarPlayers(id);
  const allTeams = getAllTeams();

  // Find this team's matches, with live cache override
  let cacheMap: Record<string, any> = {};
  try {
    if (fs.existsSync(LIVE_CACHE)) {
      const cache = JSON.parse(fs.readFileSync(LIVE_CACHE, "utf-8"));
      for (const m of cache.data || []) {
        cacheMap[m.id] = m;
      }
    }
  } catch {}

  const teamMatches = allMatches
    .filter(m => m.homeTeam === id || m.awayTeam === id)
    .map(m => {
      const cached = cacheMap[m.id];
      if (cached) {
        return {
          ...m,
          homeScore: cached.homeScore ?? m.homeScore,
          awayScore: cached.awayScore ?? m.awayScore,
          status: cached.status || m.status,
        };
      }
      return m;
    })
    .sort((a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime());

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 pt-8 pb-20">
        {/* 面包屑 */}
        <div className="text-xs text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">首页</Link>
          <span className="mx-1.5">/</span>
          <span className="text-foreground">{team.name}</span>
        </div>

        {/* 球队头部 */}
        <div className="glass-card p-6 md:p-8 text-center mb-6">
          <span className="text-7xl md:text-8xl block mb-4">{team.flag}</span>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">{team.name}</h1>
          <p className="text-sm text-muted-foreground mb-3">{team.nameEn}</p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">{team.oneLineSummary}</p>

          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mt-5">
            <div className="bg-secondary/30 rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-0.5">世界排名</p>
              <p className="text-lg font-bold">#{team.ranking || "?"}</p>
            </div>
            <div className="bg-secondary/30 rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-0.5">世界杯冠军</p>
              <p className="text-lg font-bold">{team.worldCupWins > 0 ? `${team.worldCupWins}次` : "无"}</p>
            </div>
            <div className="bg-secondary/30 rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-0.5">球队风格</p>
              <p className="text-sm font-bold">{team.style}</p>
            </div>
          </div>
        </div>

        {/* 比赛记录 */}
        {teamMatches.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              📅 比赛记录
              <span className="text-xs text-muted-foreground font-normal">{teamMatches.length}场</span>
            </h2>
            <div className="glass-card divide-y divide-border/30">
              {teamMatches.map(m => {
                const isHome = m.homeTeam === id;
                const opponent = isHome ? getTeam(m.awayTeam) : getTeam(m.homeTeam);
                const oppName = opponent?.name || (isHome ? m.awayTeam : m.homeTeam);
                const oppFlag = opponent?.flag || "🏳️";
                const myScore = isHome ? m.homeScore : m.awayScore;
                const oppScore = isHome ? m.awayScore : m.homeScore;
                const hasScore = myScore !== undefined;
                const win = hasScore && (myScore ?? 0) > (oppScore ?? 0);
                const draw = hasScore && myScore === oppScore;
                const loss = hasScore && (myScore ?? 0) < (oppScore ?? 0);
                return (
                  <Link key={m.id} href={`/match/${m.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors group">
                    <span className="text-xs text-muted-foreground w-12 flex-shrink-0">
                      {new Date(m.kickoff).toLocaleDateString("zh-CN", { month: "short", day: "numeric" })}
                    </span>
                    <span className="text-xs text-muted-foreground w-10 flex-shrink-0">{m.stage}</span>
                    <span className="flex-1 flex items-center gap-2">
                      <span className="text-xs">{team.flag}</span>
                      <span className={`text-sm font-medium ${win ? "text-primary" : ""}`}>
                        {hasScore ? myScore : "-"}
                      </span>
                      <span className="text-xs text-muted-foreground">:</span>
                      <span className={`text-sm font-medium ${loss ? "text-red-400" : ""}`}>
                        {hasScore ? oppScore : "-"}
                      </span>
                      <span className="text-xs">{oppFlag} {oppName}</span>
                    </span>
                    <span className={`text-[10px] flex-shrink-0 px-2 py-0.5 rounded-full ${
                      m.status === "live" ? "bg-red-500/10 text-red-400" :
                      m.status === "finished" ? win ? "bg-green-500/10 text-green-400" : draw ? "bg-yellow-500/10 text-yellow-400" : "bg-muted/30 text-muted-foreground" :
                      "bg-secondary/30 text-muted-foreground"
                    }`}>
                      {m.status === "live" ? "直播中" : m.status === "finished" ? win ? "胜" : draw ? "平" : "负" : "即将"}                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* 明星球员 */}
        {stars.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              ⭐ 明星球员
              <span className="text-xs text-muted-foreground font-normal">{stars.length}人</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {stars.map((p) => (
                <Link key={p.id} href={`/player/${p.id}`} className="group">
                  <div className="glass-card p-4 glass-hover flex items-center gap-4">
                    <PlayerAvatar emoji={p.emoji} size="lg" number={p.number} country={p.country} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold group-hover:text-primary transition-colors">{p.nameCn}</p>
                        {p.number && <span className="text-xs text-muted-foreground">#{p.number}</span>}
                      </div>
                      <p className="text-xs text-muted-foreground">{p.positionCn} · {p.age}岁 · {p.club}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.beginnerTip}</p>
                    </div>
                    <span className="text-xl flex-shrink-0">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 全部球员 */}
        {players.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              📋 完整阵容
              <span className="text-xs text-muted-foreground font-normal">{players.length}人</span>
            </h2>
            <div className="glass-card divide-y divide-border/30">
              {players.map((p) => (
                <Link key={p.id} href={`/player/${p.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors group">
                  <PlayerAvatar emoji={p.emoji} size="sm" number={p.number} country={p.country} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium group-hover:text-primary">{p.nameCn}</span>
                      {p.star && <span className="text-xs">⭐</span>}
                      {p.number && <span className="text-xs text-muted-foreground ml-auto">#{p.number}</span>}
                    </div>
                    <p className="text-xs text-muted-foreground">{p.positionCn} · {p.club}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 暂无球员 */}
        {players.length === 0 && (
          <div className="glass-card p-8 text-center mb-6">
            <p className="text-5xl mb-3">📋</p>
            <p className="text-muted-foreground text-sm">暂无球员数据</p>
          </div>
        )}

        {/* 浏览其他球队 */}
        <div>
          <h2 className="text-sm font-bold text-muted-foreground mb-3">浏览其他球队</h2>
          <div className="flex flex-wrap gap-2">
            {allTeams.filter(t => t.id !== team.id).slice(0, 24).map(t => (
              <Link key={t.id} href={`/team/${t.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/30 hover:bg-secondary/50 text-xs transition-colors">
                <span>{t.flag}</span> {t.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
