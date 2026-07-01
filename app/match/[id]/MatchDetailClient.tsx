"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Clock, MapPin, ChevronDown, ChevronUp, MessageCircle, Sparkles } from "lucide-react";
import type { Match } from "@/lib/data/matches";
import { getTeam } from "@/lib/data/teams";
import type { Team } from "@/lib/data/teams";
import type { Player } from "@/lib/data/players";
import { WhyItMatters } from "@/components/match/WhyItMatters";
import { StrengthComparison } from "@/components/match/StrengthComparison";
import { BeginnerTips } from "@/components/match/BeginnerTips";
import { EventTimeline } from "@/components/match/EventTimeline";
import { AICommentary } from "@/components/match/AICommentary";
import { MatchResult } from "@/components/match/MatchResult";
import { StarPlayerCard } from "@/components/match/StarPlayerCard";

interface MatchDetailClientProps {
  match: Match;
  home: Team | undefined;
  away: Team | undefined;
  homePlayers: Player[];
  awayPlayers: Player[];
}

let _enrichedCache: Record<string, Match> = {};

function formatKickoff(isoString: string): string {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const timeStr = date.toLocaleString("zh-CN", {
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
    if (diffHours > 0 && diffHours <= 24) return `${timeStr}（${diffHours}小时后）`;
    if (diffHours < 0 && diffHours >= -3) return `${timeStr}（${Math.abs(diffHours)}小时前）`;
    return timeStr;
  } catch {
    return isoString;
  }
}

export function MatchDetailClient({
  match: initialMatch,
  home,
  away,
  homePlayers,
  awayPlayers,
}: MatchDetailClientProps) {
  const [match, setMatch] = useState(initialMatch);
  const [aiEnriched, setAiEnriched] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Try AI enrichment for live/upcoming matches (not needed for finished with events)
  useEffect(() => {
    if (aiEnriched) return;
    const needsEnrichment = initialMatch.status === "live" || initialMatch.status === "upcoming";
    if (!needsEnrichment) return;

    // Use session-level cache to avoid duplicate calls
    if (_enrichedCache[initialMatch.id]) {
      setMatch(_enrichedCache[initialMatch.id]);
      setAiEnriched(true);
      return;
    }

    let cancelled = false;
    fetch("/api/ai/search-matches")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || !data.matches) return;
        const enriched = data.matches.find(
          (m: Match) => m.id === initialMatch.id
        );
        if (enriched) {
          _enrichedCache[initialMatch.id] = enriched;
          setMatch(enriched);
          setAiEnriched(true);
        }
      })
      .catch(() => {});

    return () => { cancelled = true; };
  }, [initialMatch.id, initialMatch.status, aiEnriched]);

  const isLive = match.status === "live";
  const isFinished = match.status === "finished";
  const hasScore = isLive || isFinished;
  const homeWon = isFinished && (match.homeScore ?? 0) > (match.awayScore ?? 0);
  const awayWon = isFinished && (match.awayScore ?? 0) > (match.homeScore ?? 0);

  const homeFlag = home?.flag || "🏳️";
  const awayFlag = away?.flag || "🏳️";
  const homeName = home?.name || match.homeTeam;
  const awayName = away?.name || match.awayTeam;

  const stageExplain = (() => {
    if (match.stage.includes("决赛")) return "冠军之战——胜者捧起大力神杯";
    if (match.stage.includes("半决赛")) return "距离决赛只差一步";
    if (match.stage.includes("1/4")) return "8强争夺4个半决赛名额";
    if (match.stage.includes("1/8")) return "淘汰赛——输了就直接回家";
    if (match.stage.includes("32")) return "小组出线后的第一场淘汰赛";
    return "小组循环赛，争夺出线名额";
  })();

  return (
    <div className="min-h-screen">
      {/* ── 头部：比分板 ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 pt-6 pb-8">
          {/* 面包屑 */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">首页</Link>
            <span>/</span>
            <span className="text-foreground">{homeName} vs {awayName}</span>
          </div>

          {/* 比分板 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* 阶段标签 */}
            <div className="mb-4">
              <div className="flex items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  🏆 {match.stage}
                </span>
                {aiEnriched && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px]">
                    <Sparkles size={10} />
                    AI 数据
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">{stageExplain}</p>
            </div>

            {/* 队名 + 比分 */}
            <div className="flex items-center justify-center gap-5 md:gap-10">
              <Link href={`/team/${home?.id || match.homeTeam}`} className="flex flex-col items-center gap-2 group">
                <span className="text-6xl md:text-7xl group-hover:scale-105 transition-transform">{homeFlag}</span>
                <span className={`text-sm md:text-base font-bold group-hover:text-primary transition-colors ${homeWon ? "text-primary" : ""}`}>
                  {homeName}
                </span>
              </Link>

              <div className="text-center min-w-[70px]">
                {hasScore ? (
                  <div>
                    <div className="text-4xl md:text-6xl font-bold tracking-wider tabular-nums">
                      <span className={homeWon ? "text-primary" : ""}>{match.homeScore}</span>
                      <span className="text-muted-foreground mx-2">:</span>
                      <span className={awayWon ? "text-primary" : ""}>{match.awayScore}</span>
                    </div>
                    {isLive && (
                      <p className="text-sm text-red-400 font-medium mt-2 flex items-center justify-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500 live-dot" />
                        正在直播
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="text-2xl text-muted-foreground font-light">VS</div>
                    <div className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
                      <Clock size={11} />
                      {formatKickoff(match.kickoff)}
                    </div>
                  </div>
                )}
              </div>

              <Link href={`/team/${away?.id || match.awayTeam}`} className="flex flex-col items-center gap-2 group">
                <span className="text-6xl md:text-7xl group-hover:scale-105 transition-transform">{awayFlag}</span>
                <span className={`text-sm md:text-base font-bold group-hover:text-primary transition-colors ${awayWon ? "text-primary" : ""}`}>
                  {awayName}
                </span>
              </Link>
            </div>

            {/* 场地 + 时间 */}
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin size={11} />{match.venue}</span>
              <span className="flex items-center gap-1"><Clock size={11} />{formatKickoff(match.kickoff)}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 主体内容 ── */}
      <div className="max-w-3xl mx-auto px-4 pb-20 space-y-4">
        {/* 赛后结果 */}
        {isFinished && (
          <MatchResult
            summary={match.oneLineSummary}
            highlightMinutes={match.highlightMinutes}
            homeTeam={homeName}
            awayTeam={awayName}
            homeScore={match.homeScore!}
            awayScore={match.awayScore!}
          />
        )}

        {/* 为什么重要 */}
        <WhyItMatters
          stage={match.stage}
          whyItMatters={match.whyItMatters}
          homeScore={match.homeScore}
          awayScore={match.awayScore}
          homeTeam={homeName}
          awayTeam={awayName}
          headline={(match as any).headline}
          displayClock={(match as any).displayClock}
        />

        {/* 实力对比 */}
        <StrengthComparison
          homeTeam={match.homeTeam}
          awayTeam={match.awayTeam}
          homeStrength={match.homeStrength}
          awayStrength={match.awayStrength}
        />

        {/* 新手指南 */}
        <BeginnerTips tips={match.beginnerTips} />

        {/* 比赛进程（事件时间线） */}
        {match.events && match.events.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-5"
          >
            <h2 className="text-sm font-bold text-muted-foreground mb-4 flex items-center gap-2">
              <MessageCircle size={16} className="text-primary" />
              比赛进程
            </h2>
            <EventTimeline events={match.events} />
          </motion.div>
        )}

        {/* AI 解说 */}
        <AICommentary
          events={match.events}
          status={match.status}
          homeTeam={homeName}
          awayTeam={awayName}
          homeScore={match.homeScore}
          awayScore={match.awayScore}
          espnData={(match as any).displayClock ? {
            displayClock: (match as any).displayClock,
            venue: (match as any).venue,
            matchDetails: (match as any).matchDetails,
            headline: (match as any).headline,
          } : undefined}
        />

        {/* 折叠：更多细节 */}
        <div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between glass-card p-4 glass-hover"
          >
            <span className="text-sm font-bold text-muted-foreground">想了解更多细节？</span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              {showDetails ? "收起" : "展开"}
              {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </span>
          </button>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-4">
                  {/* 球队风格对比 */}
                  {home?.style && away?.style && (
                    <div className="glass-card p-5">
                      <h3 className="text-sm font-bold text-muted-foreground mb-3">球队风格对比</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center bg-secondary/30 rounded-xl p-4">
                          <span className="text-2xl block mb-1">{homeFlag}</span>
                          <p className="text-sm font-bold mb-1">{homeName}</p>
                          <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{home.style}</span>
                          <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">{home.styleDescription.slice(0, 60)}...</p>
                        </div>
                        <div className="text-center bg-secondary/30 rounded-xl p-4">
                          <span className="text-2xl block mb-1">{awayFlag}</span>
                          <p className="text-sm font-bold mb-1">{awayName}</p>
                          <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{away.style}</span>
                          <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">{away.styleDescription.slice(0, 60)}...</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 你可能认识的人 */}
                  {(homePlayers.length > 0 || awayPlayers.length > 0) && (
                    <div className="space-y-3">
                      {homePlayers.length > 0 && (
                        <div className="glass-card p-5">
                          <h3 className="text-sm font-bold text-muted-foreground mb-3 flex items-center gap-2">
                            {homeFlag} {homeName} · 你可能认识的人
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {homePlayers.map((player, i) => (
                              <StarPlayerCard key={player.id} player={player} index={i} />
                            ))}
                          </div>
                        </div>
                      )}
                      {awayPlayers.length > 0 && (
                        <div className="glass-card p-5">
                          <h3 className="text-sm font-bold text-muted-foreground mb-3 flex items-center gap-2">
                            {awayFlag} {awayName} · 你可能认识的人
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {awayPlayers.map((player, i) => (
                              <StarPlayerCard key={player.id} player={player} index={i} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
