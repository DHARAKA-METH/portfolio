"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | null>(null);

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const initialTheme: Theme = savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark"
      : "light";

    applyTheme(initialTheme);
    const frame = window.requestAnimationFrame(() => setThemeState(initialTheme));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const setTheme = (nextTheme: Theme) => {
    applyTheme(nextTheme);
    window.localStorage.setItem("portfolio-theme", nextTheme);
    setThemeState(nextTheme);
  };

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
