"use client";

import Link from "next/link";
import { Player } from "@/lib/data/players";
import { PlayerAvatar } from "@/components/ui/PlayerAvatar";

interface StarPlayerCardProps {
  player: Player;
  index: number;
}

export function StarPlayerCard({ player }: StarPlayerCardProps) {
  return (
    <Link href={`/player/${player.id}`} className="block group">
      <div className="glass rounded-xl p-4 glass-hover flex items-center gap-3">
        <PlayerAvatar emoji={player.emoji} size="md" number={player.number} country={player.country} />
        <div className="min-w-0">
          <p className="text-sm font-bold group-hover:text-primary transition-colors truncate">
            {player.nameCn}
          </p>
          <p className="text-[11px] text-muted-foreground">
            {player.positionCn} · {player.club}
          </p>
        </div>
        <span className="text-xs text-muted-foreground ml-auto flex-shrink-0">
          {player.age}岁
        </span>
      </div>
    </Link>
  );
}
