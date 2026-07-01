"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light" | "system";

const ThemeContext = createContext<{
  theme: Theme;
  resolved: "dark" | "light";
  setTheme: (t: Theme) => void;
}>({
  theme: "system",
  resolved: "dark",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getResolved(t: Theme): "dark" | "light" {
  if (t === "system") {
    if (typeof window === "undefined") return "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return t;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolved, setResolved] = useState<"dark" | "light">("dark");

  const applyTheme = useCallback((t: Theme) => {
    const r = getResolved(t);
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(r);
    setResolved(r);
  }, []);

  // Init on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const t = saved || "system";
    setThemeState(t);
    applyTheme(t);
  }, [applyTheme]);

  // Listen system changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      setThemeState(prev => {
        if (prev === "system") applyTheme("system");
        return prev;
      });
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [applyTheme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem("theme", t);
    applyTheme(t);
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
