"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const displayFont =
  "[font-family:var(--font-courier-prime),ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace]";

export function SiteNavigation() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header
      className="absolute inset-x-0 top-0 z-20 mx-auto flex w-full max-w-[1120px] items-center justify-between px-5 pt-7 sm:px-8 sm:pt-9 lg:px-10 lg:pt-11"
      aria-label="Site header"
    >
      <Link
        className={`${displayFont} inline-flex items-center gap-2 rounded-md text-[15px] tracking-[0.02em] text-[#62675F] transition-colors hover:text-[#20221F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF7] dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE] dark:focus-visible:ring-[#FF8A65] dark:focus-visible:ring-offset-[#10110F]`}
        href="/#hero"
      >
        <span className="size-1.5 rounded-full bg-[#C2410C] dark:bg-[#FF7043]" />
        DHARAKA / 2026
      </Link>
      <button
        className="grid size-10 place-items-center rounded-full border border-[#D8DAD4] text-[#62675F] transition duration-200 hover:-translate-y-0.5 hover:border-[#BFC2BA] hover:bg-[#F2F2EC] hover:text-[#20221F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF7] dark:border-[#363932] dark:text-[#A6ABA1] dark:hover:border-[#50544A] dark:hover:bg-[#232520] dark:hover:text-[#F2F3EE] dark:focus-visible:ring-[#FF8A65] dark:focus-visible:ring-offset-[#10110F]"
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label={isDark ? "Use light mode" : "Use dark mode"}
        title={isDark ? "Use light mode" : "Use dark mode"}
      >
        {isDark ? <Sun className="size-[17px] stroke-[1.75]" /> : <Moon className="size-[17px] stroke-[1.75]" />}
      </button>
    </header>
  );
}
