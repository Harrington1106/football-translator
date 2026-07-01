"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Users, ChevronDown, ChevronUp, Sparkles, Star } from "lucide-react";
import { Match } from "@/lib/data/matches";
import { getTeam } from "@/lib/data/teams";
import { MatchCard } from "./MatchCard";
import { FeaturedMatch } from "./FeaturedMatch";
import { CountdownTimer } from "./CountdownTimer";
import { TournamentBracket } from "./TournamentBracket";
import { ScorerBoard } from "./ScorerBoard";
import { TOURNAMENT_STAGES, STAGE_DESC } from "@/lib/data/tournament";

// 算法：算出最值得看的比赛（基于球队真实实力）
function matchScore(m: Match): number {
  const stageWeight: Record<string, number> = {
    "决赛": 10, "半决赛": 8, "三四名决赛": 5,
    "1/4决赛": 6, "1/8决赛": 4, "32强赛": 3, "小组赛": 1,
  };
  const stage = stageWeight[m.stage] || 1;
  const homeStr = getTeam(m.homeTeam)?.strength || m.homeStrength || 3;
  const awayStr = getTeam(m.awayTeam)?.strength || m.awayStrength || 3;
  return stage * 10 + homeStr + awayStr;
}

interface HomeClientProps {
  initialMatches: Match[];
  aiEnabled: boolean;
}

export function HomeClient({ initialMatches, aiEnabled }: HomeClientProps) {
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSource, setAiSource] = useState<string>("static");
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

  // Try AI enrichment on mount
  useEffect(() => {
    if (!aiEnabled) return;

    let cancelled = false;
    setAiLoading(true);

    fetch("/api/matches")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data.matches) {
          setMatches(data.matches);
          setAiSource(data.source || "static");
        }
      })
      .catch(() => {
        // Keep static data on error
      })
      .finally(() => {
        if (!cancelled) setAiLoading(false);
      });

    return () => { cancelled = true; };
  }, [aiEnabled]);

  const liveMatches = matches.filter((m) => m.status === "live");

  // Auto-refresh when live matches
  useEffect(() => {
    if (!liveMatches.length) return;
    const interval = setInterval(() => {
      fetch("/api/matches")
        .then(r => r.json())
        .then(d => {
          if (d.matches) setMatches(d.matches);
        })
        .catch(() => {});
    }, 30000);
    return () => clearInterval(interval);
  }, [liveMatches.length]);

  // 按阶段分组
  const matchesByStage = useMemo(() => {
    const grouped: Record<string, Match[]> = {};
    for (const m of matches) {
      if (!grouped[m.stage]) grouped[m.stage] = [];
      grouped[m.stage].push(m);
    }
    return grouped;
  }, [matches]);

  // ── 直播比赛 = 大卡片 ──
  const liveMatch = liveMatches[0] || null;

  // ── 今日最值得看（中国时间 UTC+8）──
  const bestMatch = useMemo(() => {
    // Convert UTC to China time for date comparison
    const toChinaDate = (utc: string) => {
      const d = new Date(utc);
      d.setHours(d.getHours() + 8); // UTC+8
      return d.toISOString().split("T")[0];
    };
    const liveOrUpcoming = matches.filter(m => m.status === "live" || m.status === "upcoming");
    const dates = [...new Set(liveOrUpcoming.map(m => toChinaDate(m.kickoff)))].sort();
    const today = dates[0] || toChinaDate(new Date().toISOString());

    // Include ALL non-live matches from today (finished + upcoming)
    const todayMatches = matches.filter(m =>
      m.status !== "live" && m.id !== liveMatch?.id && toChinaDate(m.kickoff) === today
    );
    if (todayMatches.length === 0) return null;
    if (!todayMatches.length) return null;
    // Sort: higher score → higher total stars → finished first
    todayMatches.sort((a, b) => {
      const diff = matchScore(b) - matchScore(a);
      if (diff !== 0) return diff;
      const aStr = (getTeam(a.homeTeam)?.strength||3) + (getTeam(a.awayTeam)?.strength||3);
      const bStr = (getTeam(b.homeTeam)?.strength||3) + (getTeam(b.awayTeam)?.strength||3);
      if (bStr !== aStr) return bStr - aStr;
      if (a.status === "finished" && b.status !== "finished") return -1;
      if (b.status === "finished" && a.status !== "finished") return 1;
      return 0;
    });
    return todayMatches[0];
  }, [matches]);

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 pt-12 md:pt-20 pb-6 md:pb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3">
              今天发生了什么？
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              不用懂足球。我们用最简单的话，告诉你世界杯上正在发生什么。
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              {aiEnabled && (
                <span className="inline-flex items-center gap-1.5 mr-3">
                  <Sparkles size={12} className="text-primary" />
                  <span className="text-xs">
                    {aiLoading ? "AI 正在获取最新数据..." : aiSource === "ai+static" ? "AI 实时数据" : "本地数据"}
                  </span>
                </span>
              )}
              {liveMatches.length > 0 && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 live-dot" />
                  {liveMatches.length} 场比赛正在直播
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-20">
        {/* ── 直播：大卡片 ── */}
        {liveMatch && (
          <section className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 live-dot" />
              <p className="text-sm font-medium text-red-400">正在直播</p>
            </div>
            <FeaturedMatch match={liveMatch} />
          </section>
        )}

        {/* ── 今日最值得看：算法推荐 ── */}
        {bestMatch && bestMatch.id !== liveMatch?.id && (
          <section className="mb-8">
            <p className="text-sm font-medium text-muted-foreground text-center mb-3">
              {bestMatch.status === "finished" ? "⭐ 今日最精彩" : "⭐ 今日最值得看"}
            </p>
            <FeaturedMatch match={bestMatch} />
          </section>
        )}

        {/* ── 即将开始 ── */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-3">📅 即将开始</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {matches
              .filter(m => m.status === "upcoming")
              .sort((a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime())
              .slice(0, 8)
              .map(m => {
                const ht = getTeam(m.homeTeam);
                const at = getTeam(m.awayTeam);
                return (
                  <Link key={m.id} href={`/match/${m.id}`}
                    className="glass-card p-3 glass-hover flex flex-col items-center gap-1 text-center group"
                  >
                    <span className="text-[10px] text-muted-foreground">
                      <CountdownTimer kickoff={m.kickoff} />
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl">{ht?.flag||"🏳️"}</span>
                      <span className="text-[10px] text-muted-foreground">VS</span>
                      <span className="text-xl">{at?.flag||"🏳️"}</span>
                    </div>
                    <span className="text-[11px] font-medium truncate max-w-full group-hover:text-primary">
                      {ht?.name||m.homeTeam} vs {at?.name||m.awayTeam}
                    </span>
                    <span className="text-[9px] text-muted-foreground">{m.stage}</span>
                  </Link>
                );
              })}
          </div>
        </section>

        {/* ── 淘汰赛对阵图 ── */}
        <section className="mb-10">
          <TournamentBracket matches={matches} />
        </section>

        {/* ── 射手榜 ── */}
        <section className="mb-10">
          <ScorerBoard />
        </section>

        {/* ── 按赛制阶段排列 ── */}
        <div className="space-y-4">
          {/* Sort stages: live/upcoming first, then finished, nearest dates first */}
          {TOURNAMENT_STAGES.slice().sort((a, b) => {
            const ma = matchesByStage[a.key] || [];
            const mb = matchesByStage[b.key] || [];
            const aLive = ma.some(m => m.status === "live" || m.status === "upcoming");
            const bLive = mb.some(m => m.status === "live" || m.status === "upcoming");
            if (aLive && !bLive) return -1;
            if (!aLive && bLive) return 1;
            return 0;
          }).map((stage) => {
            const stageMatches = matchesByStage[stage.key];
            if (!stageMatches?.length) return null;

            const hasLive = stageMatches.some((m) => m.status === "live");
            const hasFinished = stageMatches.every((m) => m.status === "finished");
            const isExpanded =
              expandedStage === stage.key ||
              (expandedStage === null && hasLive); // Only auto-expand stage with live match

            return (
              <section key={stage.key}>
                <button
                  onClick={() => setExpandedStage(isExpanded ? null : stage.key)}
                  className="w-full flex items-center gap-3 group py-2"
                >
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      hasLive ? "bg-red-500 live-dot" : "bg-muted-foreground/30"
                    }`}
                  />
                  <h2 className="text-base font-bold">{stage.label}</h2>
                  <span className="text-[11px] text-muted-foreground">{stage.sub}</span>
                  {hasLive && (
                    <span className="text-[10px] text-red-400 font-medium">LIVE</span>
                  )}
                  {hasFinished && (
                    <span className="text-[10px] text-muted-foreground/50">
                      {stageMatches.length}场已结束
                    </span>
                  )}
                  {!hasFinished && (
                    <span className="text-xs text-muted-foreground">
                      {stageMatches.length}场
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronUp size={16} className="text-muted-foreground ml-auto" />
                  ) : (
                    <ChevronDown size={16} className="text-muted-foreground ml-auto" />
                  )}
                </button>

                {isExpanded && STAGE_DESC[stage.key] && (
                  <p className="text-xs text-muted-foreground mb-3 ml-6">
                    {STAGE_DESC[stage.key]}
                  </p>
                )}

                {isExpanded && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {stageMatches.map((match, i) => (
                      <MatchCard key={match.id} match={match} index={i} />
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* ── 快速入口 ── */}
        <section className="mt-16">
          <h2 className="text-lg font-bold mb-6 text-center">探索更多</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/learn" className="group">
              <div className="glass-card p-6 glass-hover text-center">
                <BookOpen size={28} className="text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-1">足球规则速成</h3>
                <p className="text-xs text-muted-foreground">越位、点球、红黄牌…用最简单的方式讲清楚。</p>
              </div>
            </Link>
            <Link href="/team/brazil" className="group">
              <div className="glass-card p-6 glass-hover text-center">
                <span className="text-2xl block mb-3 group-hover:scale-110 transition-transform">🌍</span>
                <h3 className="font-bold mb-1">浏览参赛球队</h3>
                <p className="text-xs text-muted-foreground">了解每支球队的风格实力和明星球员。</p>
              </div>
            </Link>
            <Link href="/player/messi" className="group">
              <div className="glass-card p-6 glass-hover text-center">
                <Users size={28} className="text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-1">认识球星</h3>
                <p className="text-xs text-muted-foreground">快速了解每个球星为什么这么厉害。</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
