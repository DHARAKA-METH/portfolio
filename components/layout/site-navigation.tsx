"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Briefcase, Home, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const displayFont =
  "[font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif]";

export function SiteNavigation() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const isDark = theme === "dark";
  const showBottomNavigation = true;

  return (
    <>
      <header
        className="z-20 mx-auto flex w-full max-w-[1120px] items-center justify-between px-5 pt-7 sm:px-8 sm:pt-9 lg:px-10 lg:pt-11"
        aria-label="Site header"
      >
        <Link
          className={`${displayFont} inline-flex items-center gap-2 rounded-md text-[15px] tracking-[0.02em] text-[#62675F] transition-colors hover:text-[#20221F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF7] dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE] dark:focus-visible:ring-[#FF8A65] dark:focus-visible:ring-offset-[#10110F]`}
          href="/hero"
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
      <nav className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-50 flex w-fit max-w-[calc(100%_-_1.5rem)] -translate-x-1/2 items-center gap-[5px] overflow-visible rounded-2xl border border-[#E4E4E7] bg-white p-1 shadow-[0_10px_30px_rgba(24,24,27,0.12)] transition-all duration-300 ease-out has-[a:hover]:scale-x-[1.02] [&>a]:origin-center [&>a:hover]:z-10 motion-reduce:transition-none dark:border-[#27272A] dark:bg-black ${showBottomNavigation ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`} aria-label="Primary navigation" aria-hidden={!showBottomNavigation} inert={!showBottomNavigation}>
        <Link className={`${displayFont} relative inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-xl px-[10px] text-[13px] font-bold text-[#18181B] transition-[transform,background-color,color] duration-200 ease-out hover:scale-[1.08] hover:bg-[#ECECEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18181B] focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-reduce:transform-none motion-reduce:transition-none dark:text-white dark:hover:bg-[#18181B] dark:hover:text-white dark:focus-visible:ring-white dark:focus-visible:ring-offset-black ${pathname === "/" ? "after:absolute after:bottom-1 after:h-0.5 after:w-4 after:rounded-full after:bg-[#18181B] dark:after:bg-white" : ""}`} href="/hero" aria-current={pathname === "/" ? "page" : undefined}><Home className="size-[18px] stroke-[1.75]" /><span>Home</span></Link>
        <Link className={`${displayFont} relative inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-xl px-[10px] text-[13px] font-bold text-[#18181B] transition-[transform,background-color,color] duration-200 ease-out hover:scale-[1.08] hover:bg-[#ECECEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18181B] focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-reduce:transform-none motion-reduce:transition-none dark:text-white dark:hover:bg-[#18181B] dark:hover:text-white dark:focus-visible:ring-white dark:focus-visible:ring-offset-black ${pathname === "/projectSection" ? "after:absolute after:bottom-1 after:h-0.5 after:w-4 after:rounded-full after:bg-[#18181B] dark:after:bg-white" : ""}`} href="/projectSection" aria-current={pathname === "/projectSection" ? "page" : undefined}><Briefcase className="size-[18px] stroke-[1.75]" /><span>Projects</span></Link>
        <Link className={`${displayFont} relative inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-xl px-[10px] text-[13px] font-bold text-[#18181B] transition-[transform,background-color,color] duration-200 ease-out hover:scale-[1.08] hover:bg-[#ECECEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18181B] focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-reduce:transform-none motion-reduce:transition-none dark:text-white dark:hover:bg-[#18181B] dark:hover:text-white dark:focus-visible:ring-white dark:focus-visible:ring-offset-black ${pathname === "/Blogs" ? "after:absolute after:bottom-1 after:h-0.5 after:w-4 after:rounded-full after:bg-[#18181B] dark:after:bg-white" : ""}`} href="/Blogs" aria-current={pathname === "/Blogs" ? "page" : undefined}><BookOpen className="size-[18px] stroke-[1.75]" /><span>Blog</span></Link>
      </nav>
    </>
  );
}
