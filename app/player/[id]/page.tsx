import { notFound } from "next/navigation";
import Link from "next/link";
import { getPlayer, getAllPlayers } from "@/lib/data/players";
import { getTeam } from "@/lib/data/teams";
import { PlayerHero } from "@/components/player/PlayerHero";
import { PlayerStory } from "@/components/player/PlayerStory";

interface PlayerPageProps {
  params: Promise<{ id: string }>;
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { id } = await params;
  const player = getPlayer(id);

  if (!player) notFound();

  const team = getTeam(player.country);
  const allPlayers = getAllPlayers();

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 pt-8 pb-20 space-y-6">
        {/* 面包屑 */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">首页</Link>
          <span>/</span>
          {team && (
            <>
              <Link href={`/team/${team.id}`} className="hover:text-foreground transition-colors">
                {team.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-foreground">{player.nameCn}</span>
        </div>

        <PlayerHero player={player} team={team} />
        <PlayerStory player={player} />

        {/* 浏览其他球星 */}
        <div className="glass-card p-5">
          <h2 className="text-sm font-bold text-muted-foreground mb-3">认识更多球星</h2>
          <div className="flex flex-wrap gap-2">
            {allPlayers
              .filter((p) => p.id !== player.id)
              .slice(0, 12)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/player/${p.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/40 hover:bg-secondary/60 text-xs transition-colors"
                >
                  <span>{p.emoji}</span>
                  {p.nameCn}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
