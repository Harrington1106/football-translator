"use client";

import Link from "next/link";
import { Match } from "@/lib/data/matches";
import { getTeam } from "@/lib/data/teams";

interface BracketProps { matches: Match[]; }

function groupByStage(matches: Match[]) {
  const order = ["32强赛", "1/8决赛", "1/4决赛", "半决赛", "三四名决赛", "决赛"];
  return order.map(stage => ({
    stage,
    matches: matches.filter(m => m.stage === stage)
      .sort((a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime())
  })).filter(g => g.matches.length > 0);
}

function MiniSlot({ m }: { m: Match; small?: boolean }) {
  const home = getTeam(m.homeTeam);
  const away = getTeam(m.awayTeam);
  const hs = m.homeScore;
  const as = m.awayScore;
  const hWon = hs !== undefined && (hs ?? 0) > (as ?? 0);
  const aWon = as !== undefined && (as ?? 0) > (hs ?? 0);

  return (
    <Link href={`/match/${m.id}`}
      className={`flex flex-col rounded border py-1.5 px-2 transition-all hover:border-primary/40 ${
        m.status === "live" ? "border-red-500/40 bg-red-500/5" :
        hs !== undefined ? "border-border/50 bg-secondary/20" :
        "border-border/30 bg-secondary/10"
      }`}
    >
      <div className="flex items-center gap-1">
        <span className="text-sm">{home?.flag || "🏳️"}</span>
        <span className={`text-xs flex-1 ${hWon ? "font-bold text-primary" : ""}`}>
          {home?.name || m.homeTeam}
        </span>
        {hs !== undefined && <span className={`text-xs font-bold ml-0.5 ${hWon ? "text-primary" : "text-muted-foreground"}`}>{hs}</span>}
      </div>
      <div className="flex items-center gap-1 mt-0.5">
        <span className="text-sm">{away?.flag || "🏳️"}</span>
        <span className={`text-xs flex-1 ${aWon ? "font-bold text-primary" : ""}`}>
          {away?.name || m.awayTeam}
        </span>
        {as !== undefined && <span className={`text-xs font-bold ml-0.5 ${aWon ? "text-primary" : "text-muted-foreground"}`}>{as}</span>}
      </div>
    </Link>
  );
}

function Placeholder() {
  return (
    <div className="flex items-center justify-center rounded border border-dashed border-border/20 bg-secondary/5 py-1">
      <span className="text-[9px] text-muted-foreground/30">TBD</span>
    </div>
  );
}

export function TournamentBracket({ matches }: BracketProps) {
  const stages = groupByStage(matches);
  if (!stages.length) return null;

  const map: Record<string, Match[]> = {};
  stages.forEach(s => { map[s.stage] = s.matches; });

  const r32 = map["32强赛"] || [];
  const leftR32 = r32.slice(0, 8);
  const rightR32 = r32.slice(8, 16);
  const r16 = map["1/8决赛"] || [];
  const qf = map["1/4决赛"] || [];
  const sf = map["半决赛"] || [];
  const fin = map["决赛"] || [];
  const thd = map["三四名决赛"] || [];

  const colW = "min-w-0 flex-1";

  return (
    <div>
      <h2 className="text-lg font-bold mb-3">🏆 淘汰赛对阵</h2>

      {/* Desktop: horizontal bracket */}
      <div className="hidden lg:flex items-start justify-center gap-2">
        {/* LEFT HALF */}
        <div className="flex gap-2">
          <RoundCol label="32强" matches={leftR32} />
          <RoundCol label="16强" matches={r16.slice(0,4)} totalSlots={4} />
          <RoundCol label="8强" matches={qf.slice(0,2)} totalSlots={2} />
          <RoundCol label="半决赛" matches={sf.slice(0,1)} totalSlots={1} />
        </div>

        {/* CENTER */}
        <div className="flex flex-col justify-center gap-1.5" style={{ width: 100 }}>
          <div className="text-center">
            <span className="text-[10px] font-bold text-yellow-400">🏆 决赛</span>
          </div>
          {fin.length ? fin.map(m => <MiniSlot key={m.id} m={m} />) : <Placeholder />}
          <div className="text-center mt-2">
            <span className="text-[10px] font-bold text-muted-foreground">🥉 季军</span>
          </div>
          {thd.length ? thd.map(m => <MiniSlot key={m.id} m={m} />) : <Placeholder />}
        </div>

        {/* RIGHT HALF */}
        <div className="flex gap-2">
          <RoundCol label="半决赛" matches={sf.slice(1,2)} totalSlots={1} />
          <RoundCol label="8强" matches={qf.slice(2,4)} totalSlots={2} />
          <RoundCol label="16强" matches={r16.slice(4,8)} totalSlots={4} />
          <RoundCol label="32强" matches={rightR32} />
        </div>
      </div>

      {/* Mobile: vertical rounds */}
      <div className="lg:hidden space-y-3">
        {stages.map(g => {
          const total = g.stage === "32强赛" ? 16 : g.stage === "1/8决赛" ? 8 : g.stage === "1/4决赛" ? 4 : g.stage === "半决赛" ? 2 : 1;
          const empty = Math.max(0, total - g.matches.length);
          return (
            <div key={g.stage}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold text-muted-foreground">{g.stage}</span>
                <span className="text-[10px] text-muted-foreground/50">{g.matches.filter(m=>m.status==="finished").length}/{g.matches.length}场</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {g.matches.map(m => <MiniSlot key={m.id} m={m} />)}
                {Array.from({length:empty}).map((_,i) => <Placeholder key={`e-${i}`} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RoundCol({ label, matches, totalSlots }: { label: string; matches: Match[]; totalSlots?: number }) {
  const total = totalSlots ?? matches.length;
  const empty = Math.max(0, total - matches.length);
  return (
    <div className="flex flex-col justify-center gap-1.5" style={{ width: 100 }}>
      <div className="text-center">
        <span className="text-[10px] font-bold text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full">{label}</span>
      </div>
      {matches.map(m => <MiniSlot key={m.id} m={m} />)}
      {Array.from({ length: empty }).map((_, i) => <Placeholder key={`ph-${i}`} />)}
    </div>
  );
}
