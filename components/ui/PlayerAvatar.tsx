"use client";

import { getTeam } from "@/lib/data/teams";

interface PlayerAvatarProps {
  emoji?: string;
  size?: "sm" | "md" | "lg";
  number?: number;
  country?: string;
}

export function PlayerAvatar({ emoji, size = "md", number, country }: PlayerAvatarProps) {
  const team = country ? getTeam(country) : null;
  const flag = team?.flag;

  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-xl",
    lg: "w-16 h-16 text-3xl",
  };
  const numSizes = {
    sm: "w-3.5 h-3.5 text-[7px] -bottom-1 -right-1",
    md: "w-5 h-5 text-[10px] -bottom-1 -right-1",
    lg: "w-6 h-6 text-xs -bottom-1 -right-1",
  };

  return (
    <div className="relative flex-shrink-0">
      <div
        className={`${sizes[size]} rounded-full flex items-center justify-center bg-secondary/40 border-2 border-border/30 overflow-hidden`}
        style={flag ? {
          backgroundImage: `url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 2 2%22><rect fill=%22%23oklch(0.15 0.005 260)%22 width=%222%22 height=%222%22/></svg>')`,
          backgroundSize: "cover",
        } : undefined}
      >
        <span className="relative z-10 drop-shadow-sm">{emoji || "⚽"}</span>
      </div>
      {/* Flag badge */}
      {flag && (
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-background border border-border/50 flex items-center justify-center text-[10px] leading-none shadow-sm">
          {flag}
        </div>
      )}
      {/* Jersey number */}
      {number && (
        <div className={`absolute ${numSizes[size]} bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold shadow-sm`}>
          {number}
        </div>
      )}
    </div>
  );
}
