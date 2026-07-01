"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const next: Record<string, { next: "dark" | "light" | "system"; icon: React.ReactNode; label: string }> = {
    dark: { next: "light", icon: <Sun size={14} />, label: "日间" },
    light: { next: "system", icon: <Monitor size={14} />, label: "系统" },
    system: { next: "dark", icon: <Moon size={14} />, label: "夜间" },
  };

  const current = next[theme];

  return (
    <button
      onClick={() => setTheme(current.next)}
      className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
      title={`当前: ${current.label} · 点击切换`}
    >
      {current.icon}
      <span className="sr-only">{current.label}</span>
    </button>
  );
}
