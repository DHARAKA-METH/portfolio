"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
const themeStorageKey = "portfolio-theme";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | null>(null);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    let frame = 0;

    const resolveTheme = (): Theme => {
      const savedTheme = window.localStorage.getItem(themeStorageKey);
      if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
      return mediaQuery.matches ? "dark" : "light";
    };

    const syncTheme = () => {
      const nextTheme = resolveTheme();
      applyTheme(nextTheme);
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => setThemeState(nextTheme));
    };

    const handleSystemThemeChange = () => {
      if (!window.localStorage.getItem(themeStorageKey)) syncTheme();
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === themeStorageKey) syncTheme();
    };

    syncTheme();
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.cancelAnimationFrame(frame);
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const setTheme = (nextTheme: Theme) => {
    applyTheme(nextTheme);
    window.localStorage.setItem(themeStorageKey, nextTheme);
    setThemeState(nextTheme);
  };

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
