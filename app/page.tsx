"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Boxes,
  Check,
  ChevronDown,
  Cloud,
  Copy,
  Database,
  Download,
  KeyRound,
  Mail,
  Image as ImageIcon,
  Terminal,
  Waypoints,
} from "lucide-react";
import { FaJava, FaLinkedin } from "react-icons/fa6";
import { ShinyButton } from "@/registry/magicui/shiny-button";
import { PortfolioLoader } from "@/components/ui/portfolio-loader";
import { JsonLd } from "@/components/seo/json-ld";
import { blogs } from "@/data/blogs";
import { selectedProjects } from "@/data/selected-projects";
import { projectHighlights } from "@/data/project-highlights";
import { skills } from "@/data/skills";
import { volunteerExperiences } from "@/data/volunteers";
import { realWorldContributions, type RealWorldContribution } from "@/data/real-world-contributions";
import { site } from "@/data/site";
import {
  SiGithub,
  SiFirebase,
  SiDocker,
  SiDart,
  SiExpress,
  SiExpo,
  SiFlutter,
  SiInstagram,
  SiMqtt,
  SiMysql,
  SiMongodb,
  SiNginx,
  SiNodedotjs,
  SiNextdotjs,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiTiktok,
  SiTypescript,
  SiJavascript,
  SiX,
  SiYoutube,
} from "react-icons/si";
import { InternshipStatus } from "@/components/ui/InternshipStatus";
import { ImageCarousel } from "@/components/ui/image-carousel";

const displayFont =
  "[font-family:var(--font-geist-sans)]";

const bodyFont =
  "[font-family:var(--font-geist-sans)]";

const monoFont = "[font-family:var(--font-geist-mono)]";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF7] dark:focus-visible:ring-[#FF8A65] dark:focus-visible:ring-offset-[#10110F]";

const techChipIcons: Record<string, ReactNode> = {
  Java: <FaJava className="size-4 text-[#F89820]" aria-hidden="true" />,
  "Spring Boot": <SiSpringboot className="size-4 text-[#6DB33F]" aria-hidden="true" />,
  "Node.js": <SiNodedotjs className="size-4 text-[#5FA04E]" aria-hidden="true" />,
  "Express.js": <SiExpress className="size-4 text-[#20232A] dark:text-[#E8EAE5]" aria-hidden="true" />,
  "REST APIs": <Waypoints className="size-4 text-[#0EA5E9]" aria-hidden="true" />,
  Microservices: <Boxes className="size-4 text-[#EA580C]" aria-hidden="true" />,
  JWT: <KeyRound className="size-4 text-[#CA8A04]" aria-hidden="true" />,
  MySQL: <SiMysql className="size-4 text-[#4479A1]" aria-hidden="true" />,
  MongoDB: <SiMongodb className="size-4 text-[#47A248]" aria-hidden="true" />,
  "Cloud Firestore": <Database className="size-4 text-[#F97316]" aria-hidden="true" />,
  AWS: <Cloud className="size-4 text-[#FF9900]" aria-hidden="true" />,
  Docker: <SiDocker className="size-4 text-[#2496ED]" aria-hidden="true" />,
  NGINX: <SiNginx className="size-4 text-[#009639]" aria-hidden="true" />,
  Firebase: <SiFirebase className="size-4 text-[#FFCA28]" aria-hidden="true" />,
  "GitHub Actions": <SiGithub className="size-4" aria-hidden="true" />,
  Linux: <Terminal className="size-4 text-[#FCC624]" aria-hidden="true" />,
  JavaScript: <SiJavascript className="size-4 text-[#F7DF1E]" aria-hidden="true" />,
  TypeScript: <SiTypescript className="size-4 text-[#3178C6]" aria-hidden="true" />,
  React: <SiReact className="size-4 text-[#61DAFB]" aria-hidden="true" />,
  "Next.js": <SiNextdotjs className="size-4" aria-hidden="true" />,
  "Tailwind CSS": <SiTailwindcss className="size-4 text-[#06B6D4]" aria-hidden="true" />,
  "React Native": <SiReact className="size-4 text-[#61DAFB]" aria-hidden="true" />,
  Flutter: <SiFlutter className="size-4 text-[#02569B]" aria-hidden="true" />,
};

const projectHighlightIcons: Record<string, ReactNode> = {
  "Spring Boot": <SiSpringboot className="size-4 text-[#6DB33F]" aria-hidden="true" />,
  "Next.js": <SiNextdotjs className="size-4" aria-hidden="true" />,
  Docker: <SiDocker className="size-4 text-[#2496ED]" aria-hidden="true" />,
  MySQL: <SiMysql className="size-4 text-[#4479A1]" aria-hidden="true" />,
  "React Native": <SiReact className="size-4 text-[#61DAFB]" aria-hidden="true" />,
  Expo: <SiExpo className="size-4" aria-hidden="true" />,
  Firebase: <SiFirebase className="size-4 text-[#FFCA28]" aria-hidden="true" />,
  TypeScript: <SiTypescript className="size-4 text-[#3178C6]" aria-hidden="true" />,
  Flutter: <SiFlutter className="size-4 text-[#02569B]" aria-hidden="true" />,
  Dart: <SiDart className="size-4 text-[#0175C2]" aria-hidden="true" />,
  MQTT: <SiMqtt className="size-4 text-[#660066]" aria-hidden="true" />,
};

const projectHighlightImages = projectHighlights.map((highlight) => ({
  src: highlight.imageUrl,
  alt: `${highlight.title} project highlight`,
  title: highlight.title,
  description: highlight.description,
  technologies: highlight.technologies.map((technology) => ({ name: technology, icon: projectHighlightIcons[technology] })),
  href: highlight.href,
  external: highlight.external,
  linkLabel: highlight.external ? "View on LinkedIn" : "View project",
}));

const introduction =
  "I'm Dharaka, a developer exploring new technologies and turning ideas into meaningful digital experiences. I'm passionate about continuously learning, building, and growing through technology. Currently an undergraduate at the University of Sri Jayewardenepura, pursuing my journey in technology and software engineering.";

function truncateText(text: string, limit: number) {
  return text.length > limit ? `${text.slice(0, limit).trimEnd()}...` : text;
}

type GsapTimeline = {
  to: (
    target: unknown,
    variables: Record<string, unknown>,
    position?: string | number,
  ) => GsapTimeline;
  fromTo: (
    target: unknown,
    fromVariables: Record<string, unknown>,
    toVariables: Record<string, unknown>,
    position?: string | number,
  ) => GsapTimeline;
  eventCallback: (type: string, callback: () => void) => GsapTimeline;
  kill: () => void;
  scrollTrigger?: { kill: () => void };
};

type GsapWindow = Window & {
  gsap?: {
    registerPlugin: (...plugins: unknown[]) => void;
    context: (
      callback: () => void,
      scope?: Element | null,
    ) => { revert: () => void };
    fromTo: (
      target: unknown,
      fromVariables: Record<string, unknown>,
      toVariables: Record<string, unknown>,
    ) => { kill: () => void };
    set: (
      target: unknown,
      variables: Record<string, unknown>,
    ) => { kill: () => void };
    timeline: (options?: Record<string, unknown>) => GsapTimeline;
    to: (
      target: unknown,
      variables: Record<string, unknown>,
    ) => { kill: () => void };
  };
  ScrollTrigger?: {
    refresh: () => void;
  };
  ScrollSmoother?: {
    create: (options: Record<string, unknown>) => {
      kill: () => void;
      scrollTo: (target: Element, smooth?: boolean, position?: string) => void;
    };
  };
};

function TechChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          className={`${monoFont} inline-flex min-h-8 items-center gap-1.5 rounded-md border border-[#D8DAD4] px-2.5 py-1.5 text-[15px] leading-none font-normal tracking-[-0.01em] text-[#40443E] transition-colors hover:border-[#898E86] hover:text-[#20221F] dark:border-[#363932] dark:text-[#C5C9C0] dark:hover:border-[#7D8279] dark:hover:text-[#F2F3EE]`}
          key={item}
        >
          {techChipIcons[item]}
          {item}
        </span>
      ))}
    </div>
  );
}

function ContributionPreview({ contribution }: { contribution: RealWorldContribution }) {
  return (
    <div data-reveal-item>
      <div
        className={`relative overflow-hidden rounded-[20px] border border-[#D8DAD4] bg-[#EEEFEA] p-3 shadow-[0_24px_70px_rgba(32,34,31,0.10)] sm:p-4 dark:border-[#363932] dark:bg-[#1A1C18] dark:shadow-[0_24px_70px_rgba(0,0,0,0.30)] ${contribution.image ? "" : "aspect-[1.2]"}`}
        data-project-image
      >
        <div className={`flex flex-col overflow-hidden rounded-xl border border-[#D8DAD4] bg-[#FAFAF7] dark:border-[#363932] dark:bg-[#10110F] ${contribution.image ? "" : "h-full"}`}>
          <div className="flex h-10 shrink-0 items-center gap-1.5 border-b border-[#E7E8E2] px-3 dark:border-[#292C27] sm:h-12 sm:px-4">
            <span className="size-2 rounded-full bg-[#C9CBC4] dark:bg-[#55594F]" />
            <span className="size-2 rounded-full bg-[#C9CBC4] dark:bg-[#55594F]" />
            <span className="size-2 rounded-full bg-[#C9CBC4] dark:bg-[#55594F]" />
            <span className="ml-2 min-w-0 flex-1 truncate rounded-md bg-[#F0F1EC] px-3 py-1 text-[11px] text-[#898E86] dark:bg-[#1A1C18] dark:text-[#A6ABA1]">
              {contribution.domain}
            </span>
          </div>
          <div className={`relative flex min-h-0 flex-1 items-center justify-center overflow-hidden ${contribution.image ? "p-0" : "bg-[radial-gradient(ellipse_at_50%_35%,rgba(194,65,12,0.08),transparent_58%)] px-5 text-center dark:bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,138,101,0.08),transparent_58%)]"}`}>
            {contribution.image ? (
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  className="object-cover"
                  src={contribution.image}
                  alt={`${contribution.title} website preview`}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                />
              </div>
            ) : (
              <div className="max-w-[270px]">
                <span className="mx-auto grid size-12 place-items-center rounded-xl border border-[#D8DAD4] bg-white text-[#898E86] dark:border-[#363932] dark:bg-[#181A17] dark:text-[#A6ABA1]">
                  <ImageIcon className="size-5" aria-hidden="true" />
                </span>
                <p className={`${displayFont} mt-4 text-[15px] font-semibold text-[#40443E] dark:text-[#C5C9C0]`}>
                  {contribution.title} website preview
                </p>
                <p className="mt-1.5 text-[13px] leading-5 text-[#898E86] dark:text-[#7D8279]">Website screenshot coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="mt-3 text-right text-[12px] text-[#898E86] dark:text-[#7D8279]">Website preview · {contribution.domain}</p>
    </div>
  );
}

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const [gsapReady, setGsapReady] = useState(false);
  const [scrollSmootherReady, setScrollSmootherReady] = useState(false);
  const [scrollSmootherFailed, setScrollSmootherFailed] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [heroEntranceComplete, setHeroEntranceComplete] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const pageRef = useRef<HTMLElement>(null);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("deshandm699@gmail.com");
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 1800);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const gsapWindow = window as GsapWindow;
    gsapWindow.gsap = gsap as unknown as GsapWindow["gsap"];
    gsapWindow.ScrollTrigger = ScrollTrigger as unknown as GsapWindow["ScrollTrigger"];
    setGsapReady(true);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setShowLoader(false),
      prefersReducedMotion ? 0 : 700,
    );
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (
      showLoader ||
      !scrollSmootherReady ||
      prefersReducedMotion
    ) {
      return;
    }

    const gsapWindow = window as GsapWindow;
    if (!gsapWindow.ScrollSmoother) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger, gsapWindow.ScrollSmoother);
    const smoother = gsapWindow.ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 0.85,
      smoothTouch: false,
      effects: true,
    });

    const refreshFrame = window.requestAnimationFrame(() =>
      gsapWindow.ScrollTrigger?.refresh(),
    );

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      smoother.kill();
    };
  }, [prefersReducedMotion, scrollSmootherReady, showLoader]);

  useEffect(() => {
    if (
      showLoader ||
      !gsapReady ||
      !pageRef.current ||
      prefersReducedMotion
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const openingTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      openingTimeline.fromTo(
        '[data-opening="profile"]',
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.7 },
        "-=0.25",
      );
      openingTimeline.fromTo(
        '[data-opening="identity"]',
        { autoAlpha: 0, x: -16 },
        { autoAlpha: 1, x: 0, duration: 0.65 },
        "-=0.52",
      );
      openingTimeline.fromTo(
        '[data-opening="intro"] > span',
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.45, stagger: 0.14 },
      );
      openingTimeline.fromTo(
        '[data-opening="actions"] > *',
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08 },
        "-=0.4",
      );
      openingTimeline.fromTo(
        '[data-opening="meta"] > *',
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07 },
        "-=0.35",
      );
      openingTimeline.fromTo(
        '[data-opening="scroll-cue"]',
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.6 },
        "-=0.42",
      );
      openingTimeline.eventCallback("onComplete", () => {
        setHeroEntranceComplete(true);
      });

      const progressBar = pageRef.current?.querySelector(
        "[data-scroll-progress]",
      );
      if (progressBar) {
        gsap.fromTo(
          progressBar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "#smooth-content",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.2,
            },
          },
        );
      }
    }, pageRef.current);

    const refreshFrame = window.requestAnimationFrame(() =>
      ScrollTrigger.refresh(),
    );

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      context.revert();
    };
  }, [gsapReady, prefersReducedMotion, showLoader]);

  useEffect(() => {
    if (
      showLoader ||
      !heroEntranceComplete ||
      !gsapReady ||
      (!scrollSmootherReady && !scrollSmootherFailed) ||
      !pageRef.current ||
      prefersReducedMotion
    ) {
      return;
    }

    const sections = pageRef.current.querySelectorAll<HTMLElement>(
      "[data-gsap-section]",
    );
    if (!sections.length) return;

    gsap.registerPlugin(ScrollTrigger);
    let cleanupSlideResize = () => { };
    let isActive = true;
    const context = gsap.context(() => {
      sections.forEach((section) => {
        const title = section.querySelector("[data-section-title]");
        if (title) {
          gsap.fromTo(
            title,
            { y: 22 },
            {
              y: 0,
              duration: 0.72,
              ease: "power3.out",
              scrollTrigger: {
                trigger: title,
                start: "top 88%",
                once: true,
              },
            },
          );
        }

        section
          .querySelectorAll<HTMLElement>("[data-reveal-item]")
          .forEach((item) => {
            gsap.fromTo(
              item,
              { y: 32 },
              {
                y: 0,
                duration: 0.76,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 90%",
                  once: true,
                },
              },
            );
          });

        section.querySelectorAll<HTMLElement>("[data-project-image]").forEach((projectImage) => {
          gsap.fromTo(
            projectImage,
            { y: 28 },
            {
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: projectImage,
                start: "top 82%",
                once: true,
              },
            },
          );
        });
      });

      const slideSections = Array.from(
        pageRef.current?.querySelectorAll<HTMLElement>("[data-scroll-slide]") ?? [],
      );
      const slideTimelines = new Map<
        HTMLElement,
        { timeline: GsapTimeline; marginBottom: string }
      >();

      const rebuildSlideTimelines = () => {
        slideSections.forEach((section) => {
          const content = section.querySelector<HTMLElement>("[data-slide-content]");
          if (!content) return;

          const previous = slideTimelines.get(section);
          previous?.timeline.scrollTrigger?.kill();
          previous?.timeline.kill();
          if (previous) section.style.marginBottom = previous.marginBottom;
          gsap.set(content, { y: 0 });
          gsap.set(section, { scale: 1, opacity: 1 });

          const originalMarginBottom = previous?.marginBottom ?? section.style.marginBottom;
          gsap.set(section, {
            height: "100svh",
            overflow: "hidden",
            alignItems: "flex-start",
          });
          const panelHeight = section.clientHeight;
          if (!panelHeight) return;

          const contentHeight = content.scrollHeight;
          const overflow = Math.max(0, contentHeight - panelHeight);
          const fakeScrollRatio =
            overflow > 0 ? overflow / (overflow + panelHeight) : 0;

          const baseMarginBottom =
            Number.parseFloat(window.getComputedStyle(section).marginBottom) || 0;
          section.style.marginBottom = `${baseMarginBottom + overflow}px`;

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom",
              end: () =>
                fakeScrollRatio > 0
                  ? `+=${content.scrollHeight}`
                  : "bottom top",
              pin: section,
              pinSpacing: false,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          if (fakeScrollRatio > 0) {
            timeline.to(content, {
              y: -overflow,
              duration: 1 / (1 - fakeScrollRatio) - 1,
              ease: "none",
            });
          }

          timeline
            .fromTo(
              section,
              { scale: 1, opacity: 1 },
              { scale: 0.7, opacity: 0.5, duration: 0.9, ease: "none" },
            )
            .to(section, { opacity: 0, duration: 0.1, ease: "none" });

          slideTimelines.set(section, {
            timeline,
            marginBottom: originalMarginBottom,
          });
        });

        ScrollTrigger.refresh();
      };

      rebuildSlideTimelines();

      let resizeFrame = 0;
      const handleSlideResize = () => {
        if (!isActive) return;
        window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(rebuildSlideTimelines);
      };
      window.addEventListener("resize", handleSlideResize);
      document.fonts?.addEventListener("loadingdone", handleSlideResize);
      document.fonts?.ready.then(handleSlideResize);
      cleanupSlideResize = () => {
        isActive = false;
        window.cancelAnimationFrame(resizeFrame);
        window.removeEventListener("resize", handleSlideResize);
        document.fonts?.removeEventListener("loadingdone", handleSlideResize);
        slideTimelines.forEach(({ timeline, marginBottom }, section) => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
          section.style.marginBottom = marginBottom;
        });
      };

    }, pageRef.current);

    const refreshFrame = window.requestAnimationFrame(() =>
      ScrollTrigger.refresh(),
    );
    return () => {
      window.cancelAnimationFrame(refreshFrame);
      cleanupSlideResize();
      context.revert();
    };
  }, [
    gsapReady,
    heroEntranceComplete,
    prefersReducedMotion,
    scrollSmootherFailed,
    scrollSmootherReady,
    showLoader,
  ]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${site.url}/#profile`,
          url: site.url,
          mainEntity: { "@id": site.personId },
        }}
      />
      <AnimatePresence>{showLoader && <PortfolioLoader />}</AnimatePresence>
      <motion.main
        ref={pageRef}
        className={`${bodyFont} min-h-screen overflow-x-clip bg-[#FAFAF7] text-[#20221F] antialiased transition-colors duration-300 selection:bg-[#F97316]/20 selection:text-[#20221F] dark:bg-[#10110F] dark:text-[#F2F3EE] dark:selection:bg-[#FF7043]/25 dark:selection:text-[#F2F3EE]`}
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
        animate={{
          opacity: showLoader ? 0 : 1,
          y: showLoader && !prefersReducedMotion ? 16 : 0,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {gsapReady && (
          <Script
            id="gsap-scroll-smoother"
            src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrollSmoother.min.js"
            strategy="afterInteractive"
            onReady={() => setScrollSmootherReady(true)}
            onError={() => setScrollSmootherFailed(true)}
          />
        )}
        <div
          className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-[#C2410C] motion-reduce:hidden dark:bg-[#FF7043]"
          data-scroll-progress
          aria-hidden="true"
          style={{ transform: "scaleX(0)" }}
        />
        <div id="smooth-wrapper" className="bg-[#FAFAF7] dark:bg-[#10110F] my-[-40px] ">
          <div id="smooth-content" className="bg-[#FAFAF7] dark:bg-[#10110F]">
            <div className="mx-auto w-full max-w-[1120px] px-5 pb-32 sm:px-8 lg:px-10">
              <div className="relative flex min-h-[100svh] flex-col">
                <section
                  className="relative flex min-h-0 flex-1 scroll-mt-0 items-center justify-center py-16 pb-28 sm:py-20 sm:pb-32"
                  id="hero"
                >
                  <div className="w-full max-w-[780px] text-center lg:grid lg:max-w-[1040px] lg:grid-cols-[300px_minmax(0,1fr)] lg:items-center lg:gap-x-16 lg:text-left">
                    <div className="flex items-center justify-center gap-5 lg:contents">
                      <div className="shrink-0 lg:col-start-1 lg:row-span-4 lg:row-start-1 lg:justify-self-center" data-opening="profile">
                        <Image className="size-[120px] rounded-xl object-cover shadow-[0_10px_24px_rgba(32,34,31,0.16)] ring-1 ring-black/5 dark:shadow-[0_10px_24px_rgba(0,0,0,0.35)] dark:ring-white/10 lg:size-[280px] lg:rounded-2xl lg:shadow-[0_24px_60px_rgba(32,34,31,0.18)] dark:lg:shadow-[0_24px_60px_rgba(0,0,0,0.4)]" src="/profile.png" alt="Portrait of Dharaka Meth" width={1122} height={1402} sizes="(min-width: 1024px) 280px, 120px" priority unoptimized />
                      </div>
                      <div className="min-w-0 text-left lg:col-start-2 lg:row-start-1" data-opening="identity">
                        <h1
                          className="[font-family:var(--font-geist-sans)] text-[26px] leading-[1.2] font-medium tracking-[0.0125em] text-[#222222] dark:text-[#F2F3EE] lg:text-[48px] lg:leading-[1.05] lg:font-semibold lg:tracking-[-0.055em]"
                        >
                          Dharaka Meth
                        </h1>
                        <p
                          className="[font-family:var(--font-geist-sans)] mt-2 text-[20px] leading-7 font-medium tracking-[0.0125em] text-[#777777] dark:text-[#A6ABA1]"
                        >
                          Aspiring Backend Developer
                        </p>
                      </div>
                    </div>

                    <p
                      className="[font-family:var(--font-geist-sans)] mx-auto mt-4 max-w-[62ch] whitespace-normal text-pretty text-[16px] leading-6 font-medium tracking-[-0.01em] text-[#929292] [word-spacing:normal] lg:col-start-2 lg:row-start-2 lg:mx-0 lg:mt-5"
                      aria-label={introduction}
                      data-opening="intro"
                    >
                      <span className="">
                        I&apos;m Dharaka, a developer exploring new technologies and turning ideas into meaningful digital experiences.
                        I&apos;m passionate about continuously learning, building, and growing through technology.
                      </span>
                      <span className="mt-5 block">
                        Currently an undergraduate at the <Image className="mx-1 inline-block size-5 rounded-sm align-text-bottom" src="/usjp.jpg" alt="University of Sri Jayewardenepura" width={20} height={20} /> <a className={`${focusRing} inline rounded-sm text-[#20221F] underline decoration-1 underline-offset-4 dark:text-white`} href="https://www.sjp.ac.lk/" target="_blank" rel="noreferrer">University of Sri Jayewardenepura</a>, pursuing my journey in technology and software engineering.
                      </span>
                    </p>

                    <div
                      className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:col-start-2 lg:row-start-3 lg:justify-start"
                      data-opening="actions"
                    >
                      <ShinyButton
                        className={`${displayFont} ${focusRing} text-[16px]`}
                        href="/projects"
                      >
                        View my work
                        <ArrowUpRight className="size-4 stroke-[1.75]" />
                      </ShinyButton>
                      <span className="hidden select-none text-[#898E86] md:inline dark:text-[#7D8279]" aria-hidden="true">|</span>
                      {/* <ShinyButton
                        className={`${displayFont} ${focusRing} text-[16px] transition-colors hover:bg-[#F2F2EC] dark:hover:bg-[#232520]`}
                        href="/blogs"
                        hover={false}
                        shine={false}
                      >
                        Writing
                        <ArrowUpRight className="size-4 stroke-[1.75]" />
                      </ShinyButton> */}
                      {/* <a
                        className={`${displayFont} ${focusRing} inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#D8DAD4] px-5 text-[16px] font-medium tracking-normal text-[#343832] transition duration-200 hover:-translate-y-0.5 hover:border-[#BFC2BA] hover:bg-[#F2F2EC] dark:border-[#363932] dark:text-[#E1E4DD] dark:hover:border-[#50544A] dark:hover:bg-[#232520]`}
                        href="/documents/dharaka-meth-cv.pdf"
                        download
                      >
                        <Download className="size-4 stroke-[1.75]" />
                        Download CV
                      </a> */}
                      <div className="inline-flex min-h-11 items-center rounded-lg border border-[#D8DAD4] text-[#343832] transition-colors hover:border-[#BFC2BA] hover:bg-[#F2F2EC] dark:border-[#363932] dark:text-[#E1E4DD] dark:hover:border-[#50544A] dark:hover:bg-[#232520]">
                        <a className={`${displayFont} ${focusRing} inline-flex min-h-11 items-center gap-2 rounded-l-lg px-4 text-[16px] font-medium tracking-normal`} href="mailto:deshandm699@gmail.com">
                          <Mail className="size-4 stroke-[1.75]" />
                          deshandm699@gmail.com
                        </a>
                        <button className={`${focusRing} inline-flex min-h-11 items-center border-l border-[#D8DAD4] px-3 transition-colors hover:bg-[#E8E9E4] dark:border-[#363932] dark:hover:bg-[#2B2E29]`} type="button" onClick={copyEmail} aria-label="Copy email address" title="Copy email address">
                          {emailCopied ? <Check className="size-4 text-[#C2410C]" /> : <Copy className="size-4 stroke-[1.75]" />}
                        </button>
                      </div>
                    </div>

                    <div
                      className={`${displayFont} mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[15px] text-[#62675F] dark:text-[#A6ABA1] lg:col-start-2 lg:row-start-4 lg:justify-start`}
                      data-opening="meta"
                    >
                      {/* <TextLink href="https://github.com/DHARAKA-METH" external>
                        GitHub
                      </TextLink>
                      <TextLink href="https://www.linkedin.com/in/dharaka-meth-koonkaduwage-821ba4215" external>
                        LinkedIn
                      </TextLink> */}
                      <InternshipStatus />
                    </div>
                  </div>

                  <div
                    className={`${displayFont} ${focusRing} group absolute  top-[72%] sm:top-[75%]  left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-2 rounded-xl px-4 py-20 text-[18px] font-bold tracking-[0.02em] text-[#62675F] transition-colors hover:text-[#20221F] sm:bottom-7 dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE] lg:top-auto lg:bottom-2 lg:py-0`}

                    aria-label="Scroll to experience"
                    data-opening="scroll-cue"
                  >
                    {/* <span>Let&apos;s Talk</span> */}
                    <span className="grid size-10 place-items-center rounded-full border border-[#D8DAD4] bg-[#FFFFFF]/70 transition duration-200 group-hover:translate-y-1 group-hover:border-[#BFC2BA] group-hover:bg-[#F2F2EC] dark:border-[#363932] dark:bg-[#181A17]/70 dark:group-hover:border-[#50544A] dark:group-hover:bg-[#232520]">
                      <ArrowDown className="size-4 stroke-[1.75] motion-safe:animate-bounce" />
                    </span>
                  </div>
                </section>
              </div>

              <div className="mx-auto w-full max-w-[880px]">

                {/* <Section id="experience" smoothEffect>
                  <SectionTitle>Experience / My work</SectionTitle>
                  <Timeline>
                    {experiences.map(
                      ({
                        period,
                        title,
                        role,
                        description,
                        url,
                        linkLabel,
                        technologies,
                      }) => (
                        <TimelineItem period={period} key={title}>
                          <h3
                            className={`${displayFont} text-[21px] leading-6 font-bold tracking-[-0.035em] text-[#292C28] dark:text-[#E8EAE5]`}
                          >
                            {title}
                          </h3>
                          <p
                            className={`${displayFont} mt-1.5 text-[15px] text-[#62675F] dark:text-[#A6ABA1]`}
                          >
                            {role}
                          </p>
                          <p className="mt-3 mb-4 max-w-[64ch] text-[16px] leading-7 text-[#62675F] sm:text-[17px] dark:text-[#A6ABA1]">
                            {description}
                          </p>
                          <a
                            className={`${displayFont} ${focusRing} mb-4 inline-flex items-center gap-1.5 rounded-sm text-[15px] font-bold text-[#62675F] transition-colors hover:text-[#20221F] dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`}
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {linkLabel}
                            <ArrowUpRight className="size-3.5 stroke-[1.75]" />
                          </a>
                          <TechChips items={technologies} />
                        </TimelineItem>
                      ),
                    )}
                  </Timeline>
                </Section> */}

                {/* <Section id="projects" smoothEffect>
                  <div className="flex items-center justify-between gap-4">
                    <SectionTitle>Featured projects</SectionTitle>
                    <Link
                      className={`${displayFont} ${focusRing} mb-8 inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-md px-3.5 text-[14px] font-bold text-[#62675F] transition-colors hover:text-[#20221F] sm:mb-10 dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`}
                      href="/projects"
                    >
                      View more
                      <ArrowUpRight className="size-3.5 stroke-[1.75]" />
                    </Link>
                  </div>
                  <Timeline>
                    {projects.map((project) => (
                      <TimelineItem period={project.period} key={project.title}>
                        <article className="group grid gap-5 sm:grid-cols-[136px_1fr] sm:gap-6">
                          <div
                            className={`relative grid h-28 w-full place-items-center overflow-hidden rounded-xl bg-gradient-to-br ${project.accent} text-white shadow-[0_14px_35px_rgba(32,34,31,0.12)] sm:h-[108px] sm:w-[136px] dark:shadow-[0_14px_35px_rgba(0,0,0,0.3)]`}
                            aria-hidden={!project.image}
                          >
                            {project.image ? (
                              <Image
                                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                src={project.image}
                                alt={`${project.title} project preview`}
                                fill
                                sizes="(min-width: 640px) 136px, calc(100vw - 48px)"
                              />
                            ) : (
                              <>
                                <span className="absolute top-3 left-3 text-[11px] font-medium tracking-[0.16em] text-white/70 uppercase">
                                  Selected work
                                </span>
                                <span
                                  className={`${displayFont} mt-4 text-[29px] font-bold tracking-[-0.08em] transition-transform duration-300 group-hover:-translate-y-0.5`}
                                >
                                  {project.mark}
                                </span>
                                <span className="absolute -right-7 -bottom-10 size-24 rounded-full border border-white/25" />
                                <span className="absolute -right-2 -bottom-6 size-16 rounded-full border border-white/20" />
                              </>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h3
                              className={`${displayFont} text-[21px] leading-6 font-bold tracking-[-0.035em] text-[#292C28] dark:text-[#E8EAE5]`}
                            >
                              {project.title}
                            </h3>
                            <p
                              className={`${displayFont} mt-1.5 text-[15px] text-[#62675F] dark:text-[#A6ABA1]`}
                            >
                              {project.role}
                            </p>
                            <p className="mt-3 mb-4 max-w-[64ch] text-[16px] leading-7 text-[#62675F] sm:text-[17px] dark:text-[#A6ABA1]">
                              {project.description}
                            </p>
                            <TechChips items={project.technologies} />
                            <a
                              className={`${displayFont} ${focusRing} mt-4 inline-flex items-center gap-1.5 rounded-sm text-[15px] font-bold text-[#62675F] transition-colors hover:text-[#20221F] dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`}
                              href={project.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {project.linkLabel.includes("GitHub") && (
                                <SiGithub className="size-3.5" />
                              )}
                              {project.linkLabel}
                              <ArrowUpRight className="size-3.5 stroke-[1.75]" />
                            </a>
                          </div>
                        </article>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Section> */}

                {/* commented feture section   ----------------- */}
                {/* <Section id="project-highlights">
                  <SectionTitle>Featured</SectionTitle>
                  <ImageCarousel className="mt-[-20px]" images={projectHighlightImages} autoPlay interval={4000} showIndicators />
                </Section> */}
                <section
                  className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex min-h-[100svh] w-screen items-center border-y border-[#E7E8E2] bg-[#F3F3EE] dark:border-[#292C27] dark:bg-[#171915]"
                  id="projects-showcase"
                  data-gsap-section
                  data-scroll-slide
                >
                  <div className="w-full" data-slide-content>
                    <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
                      <div className="grid gap-8 pb-12 mt-6 mb-8 sm:gap-8 sm:pb-14 lg:grid-cols-[1fr_auto] lg:items-end" data-section-title>
                        <div>
                          <p className={`${monoFont} mb-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#898E86] dark:text-[#A6ABA1]`}>Selected work · {selectedProjects.length} projects</p>
                          <h2
                            className="[font-family:Avenue-Mono,var(--font-geist-mono),monospace] max-w-[900px] text-[clamp(2.75rem,7.2vw,7.5rem)] leading-[1.2] font-semibold tracking-[-0.075em] text-[#20221F] dark:text-[#F2F3EE]"
                          >
                            Full-stack software, built from the ground up.
                          </h2>
                          <p className="mt-6 max-w-[56ch] text-pretty text-[16px] leading-9 text-[#62675F] sm:mt-7 sm:text-[18px] sm:leading-[1.9] dark:text-[#A6ABA1]">
                            A collection of things I have built while exploring backend engineering, thoughtful interfaces, and the systems behind them.
                          </p>
                        </div>
                        <a className={`${displayFont} ${focusRing} group inline-flex min-h-11 items-center gap-2 self-start rounded-lg border border-[#D8DAD4] px-4 text-[14px] font-semibold text-[#40443E] transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#898E86] hover:bg-[#ECEEE6] active:translate-y-0 motion-reduce:transition-none dark:border-[#363932] dark:text-[#C5C9C0] dark:hover:bg-[#232520] lg:self-end`} href="/projects">
                          Browse all projects <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
                        </a>
                      </div>

                      <div className="flex flex-col">
                        {selectedProjects.map((project, index) => {
                          const projectImage = project.image;
                          const projectName = project.title.split(" - ")[0];

                          return (
                            <article
                              className={`grid items-center gap-8 py-10 first:pt-0 last:pb-0 sm:py-14 ${index > 0 ? "border-t border-[#D8DAD4] dark:border-[#363932]" : ""} lg:grid-cols-[0.85fr_1.15fr] lg:gap-16`}
                              id={`project-${project.slug}`}
                              key={project.slug}
                            >
                              <div data-reveal-item>
                                <div className="mb-6 flex items-center justify-between gap-4">
                                  <p className={`${monoFont} text-[12px] font-semibold uppercase tracking-[0.14em] text-[#898E86] dark:text-[#A6ABA1]`}>
                                    Project {String(index + 1).padStart(2, "0")} / {String(selectedProjects.length).padStart(2, "0")}
                                  </p>
                                  <span className={`${monoFont} text-[12px] text-[#898E86] dark:text-[#7D8279]`}>{project.period.join(" — ")}</span>
                                </div>
                                <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#62675F] dark:text-[#A6ABA1]">{project.role}</p>
                                <h3 className={`${displayFont} mt-3 text-[clamp(2rem,4.4vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.07em] text-[#20221F] dark:text-[#F2F3EE]`}>
                                  {projectName}
                                </h3>
                                <p className="mt-5 max-w-[58ch] text-[15px] leading-7 text-[#62675F] sm:text-[17px] dark:text-[#A6ABA1]">{project.description}</p>
                                <div className="mt-6"><TechChips items={project.technologies.slice(0, 6)} /></div>
                                <a
                                  className={`${displayFont} ${focusRing} mt-7 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#20221F] px-4 text-[14px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#383B35] dark:bg-[#F2F3EE] dark:text-[#10110F] dark:hover:bg-white`}
                                  href={`/projects#${project.slug}`}
                                >
                                  Explore project <ArrowUpRight className="size-4" />
                                </a>
                              </div>

                              <Link className={`${focusRing} group block`} href={`/projects#${project.slug}`} aria-label={`Explore ${projectName}`}>
                                <div className="relative aspect-[1.2] overflow-hidden rounded-[20px] border border-[#D8DAD4] bg-[#E8E9E4] shadow-[0_24px_70px_rgba(32,34,31,0.10)] dark:border-[#363932] dark:bg-[#20221F] dark:shadow-[0_24px_70px_rgba(0,0,0,0.3)]" data-project-image>
                                  {projectImage ? (
                                    <Image className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]" src={projectImage} alt={`${projectName} project preview`} fill sizes="(min-width: 1024px) 58vw, 100vw" />
                                  ) : (
                                    <div className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${project.accent} text-white`}>
                                      <span className={`${displayFont} text-6xl font-bold tracking-[-0.08em] sm:text-8xl`}>{project.mark}</span>
                                      <span className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-white/75">Project preview</span>
                                    </div>
                                  )}
                                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-12 text-white sm:px-6">
                                    <span className="text-[13px] font-medium tracking-wide">{projectName}</span>
                                    <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                  </div>
                                </div>
                              </Link>
                            </article>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </section>







                <section
                  className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex min-h-[100svh] w-screen items-center border-y border-[#E7E8E2] bg-[#F3F3EE] dark:border-[#292C27] dark:bg-[#171915]"
                  id="real-world-contributions"
                  data-gsap-section
                  data-scroll-slide
                >
                  <div className="w-full" data-slide-content>
                    <div className="mx-auto w-full max-w-[1240px] px-5 pb-8 sm:px-8 sm:pb-10 lg:px-12">
                      <div className="mb-10" data-section-title>
                        <p className={`${monoFont} mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#898E86] dark:text-[#A6ABA1]`}>
                          Team projects · 2026
                        </p>
                        <h2 className={`${displayFont} text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.07em] text-[#20221F] dark:text-[#F2F3EE]`}>
                          Real-World Contributions
                        </h2>
                        <p className="mt-4 max-w-[58ch] text-[15px] leading-7 text-[#62675F] sm:text-[17px] dark:text-[#A6ABA1]">
                         Contributing to real-world software projects by collaborating with student teams to build practical web solutions that support university events and their digital experiences.
                        </p>
                      </div>
                      <div className="flex flex-col divide-y divide-[#D8DAD4] dark:divide-[#363932]">
                        {realWorldContributions.map((contribution, index) => (
                          <article
                            className="grid items-center gap-8 py-10 first:pt-0 last:pb-0 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
                            key={contribution.id}
                          >
                            <div data-reveal-item>
                              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                                <p className={`${monoFont} text-xs font-semibold uppercase tracking-[0.14em] text-[#898E86] dark:text-[#A6ABA1]`}>
                                  Contribution {String(index + 1).padStart(2, "0")} / {String(realWorldContributions.length).padStart(2, "0")}
                                </p>
                                <span className={`${monoFont} text-xs text-[#898E86] dark:text-[#7D8279]`}>{contribution.period}</span>
                              </div>
                              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#62675F] dark:text-[#A6ABA1]">{contribution.role}</p>
                              <h3 className={`${displayFont} mt-3 text-[clamp(2rem,4.4vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.07em] text-[#20221F] dark:text-[#F2F3EE]`}>
                                {contribution.title}
                              </h3>
                              <p className="mt-4 max-w-[58ch] text-sm leading-7 text-[#62675F] sm:mt-5 sm:text-base dark:text-[#A6ABA1]">{contribution.description}</p>
                              <a
                                className={`${displayFont} ${focusRing} mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#20221F] px-4 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#383B35] dark:bg-[#F2F3EE] dark:text-[#10110F] dark:hover:bg-white`}
                                href={contribution.website}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Visit {contribution.domain} <ArrowUpRight className="size-4" />
                              </a>
                            </div>

                            <ContributionPreview contribution={contribution} />
                          </article>
                        ))}
                      </div>
                    </div>

                  </div>
                </section>

                <section
                  className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex w-screen scroll-mt-16 items-center bg-[#F4F4EF] py-8 dark:bg-[#151713] sm:py-10"
                  id="volunteer"
                  data-gsap-section
                >
                  <div className="w-full">
                    <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
                      <div className="mb-6 sm:mb-8" data-section-title>
                        <p className={`${displayFont} mb-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#C2410C] dark:text-[#FF8A65]`}>Beyond the build</p>
                        <h2 className={`${displayFont} text-[30px] leading-tight font-semibold tracking-[-0.055em] text-[#20221F] sm:text-[38px] dark:text-[#F2F3EE]`}>Activities &amp; Contributions</h2>
                        <p className="mt-3 max-w-[56ch] text-[15px] leading-6 text-[#62675F] sm:text-[16px] dark:text-[#A6ABA1]">Working with student communities to bring events, technology, and ideas to life.</p>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 xl:gap-4">
                        {volunteerExperiences.map((organization) => (
                          <article
                            className="rounded-2xl border border-[#D8DAD4] bg-white/70 p-4 shadow-[0_14px_36px_rgba(32,34,31,0.05)] transition-colors hover:border-[#BFC2BA] sm:p-5 xl:p-6 dark:border-[#363932] dark:bg-[#181A17]/70 dark:hover:border-[#50544A]"
                            data-reveal-item
                            key={organization.name}
                          >
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <h3 className={`${displayFont} max-w-[34ch] text-[18px] leading-6 font-bold tracking-[-0.035em] text-[#292C28] sm:text-[20px] dark:text-[#E8EAE5]`}>
                                {organization.name}
                              </h3>
                              {organization.award && (
                                <span className={`${displayFont} inline-flex shrink-0 rounded-full bg-[#F4E7C0] px-2.5 py-1 text-[11px] font-bold text-[#74520A] dark:bg-[#453710] dark:text-[#F1D98A]`}>
                                  {organization.award}
                                </span>
                              )}
                            </div>
                            <div className="mt-3 divide-y divide-[#E7E8E2] dark:divide-[#292C27]">
                              {organization.experiences.map((experience) => (
                                <div className="py-3 first:pt-0 last:pb-0" key={`${experience.role}-${experience.period.join("-")}`}>
                                  <Volunteer {...experience} />
                                </div>
                              ))}
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>

                  </div>
                </section>

                <Section id="skills" scrollSlide>
                  <div className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-[1120px] flex-col justify-center gap-10 sm:min-h-[calc(100svh-5rem)] sm:gap-12 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
                    <div data-section-title>
                      <p className={`${monoFont} mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#898E86] dark:text-[#A6ABA1]`}>Technologies · 01 / 02</p>
                      <h2 className={`${displayFont} max-w-[12ch] text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.065em] text-[#20221F] dark:text-[#F2F3EE]`}>
                        Tools I use to build useful software.
                      </h2>
                      <p className="mt-5 max-w-[42ch] text-sm leading-7 text-[#62675F] sm:text-base dark:text-[#A6ABA1]">
                        A focused toolkit for backend development, thoughtful interfaces, and shipping reliable projects.
                      </p>
                    </div>
                    <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 sm:gap-y-8">
                      {skills.map((skill) => (
                        <div className="border-t border-[#D8DAD4] pt-4 dark:border-[#363932]" key={skill.title} data-reveal-item>
                          <h3 className={`${displayFont} mb-3 text-sm font-semibold tracking-[-0.02em] text-[#292C28] sm:text-base dark:text-[#E8EAE5]`}>
                            {skill.title}
                          </h3>
                          <TechChips items={skill.items} />
                        </div>
                      ))}
                    </div>
                  </div>
                </Section>

                <Section id="latest-writing" scrollSlide>
                  <div className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-[1120px] flex-col justify-center sm:min-h-[calc(100svh-5rem)]">
                    <div className="mb-8 grid gap-5 sm:mb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16" data-section-title>
                      <div>
                        <p className={`${monoFont} mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#898E86] dark:text-[#A6ABA1]`}>Writing · 02 / 02</p>
                        <h2 className={`${displayFont} max-w-[12ch] text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.065em] text-[#20221F] dark:text-[#F2F3EE]`}>
                          Notes from building and learning.
                        </h2>
                      </div>
                      <p className="max-w-[48ch] text-sm leading-7 text-[#62675F] sm:text-base dark:text-[#A6ABA1]">
                        Ideas, discoveries, and practical lessons from my software engineering journey.
                      </p>
                    </div>
                    <div className="divide-y divide-[#D8DAD4] border-t border-[#D8DAD4] dark:divide-[#363932] dark:border-[#363932]">
                      {[...blogs].sort((first, second) => second.publishedAt.localeCompare(first.publishedAt)).slice(0, 2).map((blog, index) => (
                        <a
                          className={`${focusRing} group grid grid-cols-[24px_minmax(0,1fr)_auto] items-start gap-3 py-5 sm:grid-cols-[36px_minmax(0,1fr)_auto] sm:gap-5 sm:py-6`}
                          data-reveal-item
                          href={blog.url}
                          key={blog.title}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span className={`${monoFont} pt-0.5 text-xs text-[#898E86] dark:text-[#7D8279]`}>{String(index + 1).padStart(2, "0")}</span>
                          <div className="min-w-0">
                            <p className={`${monoFont} text-xs tracking-wide text-[#898E86] dark:text-[#7D8279]`}>{blog.platform} · {blog.date}</p>
                            <h3 className={`${displayFont} mt-2 text-lg leading-6 font-semibold tracking-[-0.035em] text-[#292C28] transition-colors group-hover:text-[#C2410C] sm:text-xl dark:text-[#E8EAE5] dark:group-hover:text-[#FF8A65]`}>{truncateText(blog.title, 70)}</h3>
                            <p className="mt-2 max-w-[70ch] text-sm leading-6 text-[#62675F] sm:text-[15px] dark:text-[#A6ABA1]">{truncateText(blog.excerpt, 150)}</p>
                          </div>
                          <ArrowUpRight className="mt-1 size-4 text-[#898E86] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-[#A6ABA1]" />
                        </a>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-end sm:mt-8">
                      <Link className={`${displayFont} ${focusRing} inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#D8DAD4] px-4 text-sm font-medium text-[#40443E] transition-colors hover:border-[#898E86] hover:bg-[#ECEEE6] dark:border-[#363932] dark:text-[#C5C9C0] dark:hover:bg-[#232520]`} href="/blogs">
                        Read all writing <ArrowUpRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </Section>

                <Section id="contact" scrollSlide>
                  <footer className="flex min-h-[calc(100svh-4rem)] w-full flex-col justify-between border-t border-[#E5E6E1] py-8 pb-16 dark:border-[#282B26] sm:min-h-[calc(100svh-5rem)] sm:py-10 sm:pb-16">
                    <div className="grid flex-1 content-center gap-10 py-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
                      <div data-section-title>
                        <p className={`${monoFont} mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#898E86] dark:text-[#A6ABA1]`}>Get in touch · Contact</p>
                        <h2 className={`${displayFont} max-w-[11ch] text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.98] font-semibold tracking-[-0.065em] text-[#20221F] dark:text-[#F2F3EE]`}>
                          Let&apos;s build something useful.
                        </h2>
                        <p className="mt-5 max-w-[48ch] text-sm leading-7 text-[#62675F] sm:text-base dark:text-[#A6ABA1]">
                          I&apos;m open to software engineering internships, collaborations, and conversations about building useful software.
                        </p>
                        <div className={`${displayFont} mt-5 text-xs text-[#62675F] sm:text-sm dark:text-[#A6ABA1]`}>
                          <InternshipStatus />
                        </div>
                      </div>

                      <div className="rounded-2xl border border-[#D8DAD4] bg-white/70 p-5 shadow-[0_18px_48px_rgba(32,34,31,0.06)] sm:p-7 dark:border-[#363932] dark:bg-[#181A17]/70 dark:shadow-[0_18px_48px_rgba(0,0,0,0.24)]" data-reveal-item>
                        <p className={`${displayFont} text-lg font-semibold tracking-[-0.03em] text-[#292C28] dark:text-[#E8EAE5]`}>Have an opportunity or idea?</p>
                        <p className="mt-2 text-sm leading-6 text-[#62675F] dark:text-[#A6ABA1]">Send me a note and I&apos;ll get back to you.</p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          <a className={`${displayFont} ${focusRing} inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#20221F] px-4 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#383B35] dark:bg-[#F2F3EE] dark:text-[#10110F] dark:hover:bg-white`} href="mailto:deshandm699@gmail.com">
                            <Mail className="size-4" /> Email me <ArrowUpRight className="size-4" />
                          </a>
                          <button className={`${focusRing} inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#D8DAD4] px-3 text-sm font-medium text-[#40443E] transition-colors hover:border-[#898E86] hover:bg-[#ECEEE6] dark:border-[#363932] dark:text-[#C5C9C0] dark:hover:bg-[#232520]`} type="button" onClick={copyEmail} aria-label={emailCopied ? "Email address copied" : "Copy email address"} title={emailCopied ? "Email copied" : "Copy email address"}>
                            {emailCopied ? <Check className="size-4 text-[#C2410C]" /> : <Copy className="size-4" />}
                            {emailCopied ? "Copied" : "Copy email"}
                          </button>
                        </div>

                        <div className="mt-6 border-t border-[#E7E8E2] pt-4 dark:border-[#292C27]">
                          <a className={`${displayFont} ${focusRing} flex min-h-10 items-center justify-between gap-4 text-sm font-medium text-[#62675F] transition-colors hover:text-[#20221F] dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`} href="https://github.com/DHARAKA-METH" target="_blank" rel="noreferrer">
                            View GitHub <ArrowUpRight className="size-4" />
                          </a>
                          <a className={`${displayFont} ${focusRing} flex min-h-10 items-center justify-between gap-4 text-sm font-medium text-[#62675F] transition-colors hover:text-[#20221F] dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`} href="https://www.linkedin.com/in/dharaka-meth-koonkaduwage-821ba4215" target="_blank" rel="noreferrer">
                            Connect on LinkedIn <ArrowUpRight className="size-4" />
                          </a>
                        </div>

                        <ShinyButton
                          className={`${displayFont} ${focusRing} mt-5 min-h-11 w-full cursor-pointer rounded-lg px-4 text-sm font-medium whitespace-nowrap`}
                          type="button"
                          onClick={() => window.alert("CV download coming soon.")}
                        >
                          <Download className="size-4 stroke-[1.75]" /> Download CV
                        </ShinyButton>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col items-center justify-between gap-5 border-t border-[#E5E6E1] pt-5 text-[#898E86] sm:flex-row dark:border-[#282B26] dark:text-[#7D8279]">
                      <div className="flex flex-wrap items-center justify-center gap-2 text-[#62675F] dark:text-[#A6ABA1]">
                        <Social href="https://github.com/DHARAKA-METH" label="GitHub"><SiGithub /></Social>
                        <Social href="https://x.com/DM_DESHAN" label="X"><SiX /></Social>
                        <Social href="https://www.linkedin.com/in/dharaka-meth-koonkaduwage-821ba4215" label="LinkedIn"><FaLinkedin /></Social>
                        <Social href="https://www.instagram.com/dharaka__" label="Instagram"><SiInstagram /></Social>
                      </div>
                      <p className={`${displayFont} text-center text-xs sm:text-left sm:text-sm`}>© 2026 Dharaka Meth. All rights reserved.</p>
                      <button
                        className={`${focusRing} inline-flex min-h-10 items-center gap-1.5 rounded-sm text-sm transition-colors hover:text-[#20221F] dark:hover:text-[#F2F3EE]`}
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })}
                      >
                        Back to top <ArrowUp className="size-3.5 stroke-[1.75]" />
                      </button>
                    </div>
                  </footer>
                </Section>
              </div>
            </div>
          </div>
        </div>

      </motion.main>
    </>
  );
}

function Section({
  id,
  children,
  smoothEffect = false,
  scrollSlide = false,
}: {
  id: string;
  children: ReactNode;
  smoothEffect?: boolean;
  scrollSlide?: boolean;
}) {
  return (
    <section
      className={`scroll-mt-16 py-8 sm:py-10 ${scrollSlide ? "relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex min-h-[100svh] w-screen items-center bg-[#FAFAF7] dark:bg-[#10110F]" : ""}`}
      id={id}
      data-gsap-section
      data-scroll-slide={scrollSlide || undefined}
      data-speed={smoothEffect ? "0.94" : undefined}
      data-lag={smoothEffect ? "0.08" : undefined}
    >
      {scrollSlide ? <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:px-10" data-slide-content>{children}</div> : children}
    </section>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 sm:mb-6" data-section-title>
      <h2
        className={`${displayFont} text-[20px] sm:text-[24px]  leading-tight font-semibold tracking-[-0.055em] text-[#20221F] sm:text-[31px] dark:text-[#F2F3EE]`}
      >
        {children}
      </h2>
    </div>
  );
}

type VolunteerExperience = {
  period: string[];
  name?: string;
  role: string;
  description: string;
  website?: string;
};

function Volunteer({ period, name, role, description, website }: VolunteerExperience) {
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionId = useId();

  return (
    <div>
      {name && <h4 className={`${displayFont} text-[18px] leading-6 font-bold tracking-[-0.025em] text-[#40443E] sm:text-[20px] dark:text-[#C5C9C0]`}>{name}</h4>}
      <p className={`${displayFont} mt-1 text-[13px] text-[#898E86] dark:text-[#7D8279]`}>{period.join(" - ")}</p>
      <p className={`${displayFont} mt-2 text-[15px] text-[#62675F] dark:text-[#A6ABA1]`}>{role}</p>
      <p
        className={`mt-3 max-w-[64ch] text-[16px] leading-7 text-[#62675F] sm:text-[17px] dark:text-[#A6ABA1] ${isExpanded ? "" : "line-clamp-2"}`}
        id={descriptionId}
      >
        {description}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
        <button
          aria-controls={descriptionId}
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? "Show less" : "Read more"} about ${name ?? role}`}
          className={`${displayFont} ${focusRing} inline-flex cursor-pointer items-center gap-1 rounded-sm text-[14px] font-bold text-[#62675F] transition-colors hover:text-[#20221F] dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`}
          type="button"
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          {isExpanded ? "Show less" : "Read more"}
          <ChevronDown
            aria-hidden="true"
            className={`size-3.5 stroke-2 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>
        {website && (
          <a className={`${displayFont} ${focusRing} inline-flex items-center gap-1.5 rounded-sm text-[14px] font-bold text-[#62675F] transition-colors hover:text-[#20221F] dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`} href={website} target="_blank" rel="noreferrer">
            Visit website
            <ArrowUpRight className="size-3.5 stroke-[1.75]" />
          </a>
        )}
      </div>
    </div>
  );
}

function TextLink({
  href,
  external = false,
  children,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      className={`${focusRing} inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[#D8DAD4] px-4 transition-colors hover:border-[#BFC2BA] hover:bg-[#F2F2EC] hover:text-[#20221F] sm:min-h-0 sm:rounded-sm sm:border-0 sm:px-0 sm:hover:bg-transparent dark:border-[#363932] dark:hover:border-[#50544A] dark:hover:bg-[#232520] dark:hover:text-[#F2F3EE] sm:dark:hover:bg-transparent`}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
      {external && <ArrowUpRight className="size-3.5 stroke-[1.75]" />}
    </a>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      className={`${focusRing} grid size-11 place-items-center rounded-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#F2F2EC] hover:text-[#20221F] dark:hover:bg-[#232520] dark:hover:text-[#F2F3EE] [&_svg]:size-[18px]`}
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}
