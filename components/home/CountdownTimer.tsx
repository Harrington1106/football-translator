"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  kickoff: string;
}

export function CountdownTimer({ kickoff }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function update() {
      const now = Date.now();
      const target = new Date(kickoff).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("即将开始");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (hours > 24) {
        const days = Math.floor(hours / 24);
        setTimeLeft(`${days}天后`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}小时${minutes > 0 ? `${minutes}分钟` : ""}后`);
      } else {
        setTimeLeft(`${minutes}分钟后`);
      }
    }

    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, [kickoff]);

  return (
    <span className="text-xs text-muted-foreground tabular-nums">{timeLeft}</span>
  );
}
