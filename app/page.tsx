"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Mail,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { ShinyButton } from "@/registry/magicui/shiny-button";
import { PortfolioLoader } from "@/components/ui/portfolio-loader";
import { blogs } from "@/data/blogs";
import { skills } from "@/data/skills";
import { volunteerExperiences } from "@/data/volunteers";
import {
  SiGithub,
  SiInstagram,
  SiTiktok,
  SiX,
  SiYoutube,
} from "react-icons/si";
import { InternshipStatus } from "@/components/ui/InternshipStatus";

const displayFont =
  "[font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif]";

const bodyFont =
  "[font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif]";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF7] dark:focus-visible:ring-[#FF8A65] dark:focus-visible:ring-offset-[#10110F]";

const introduction =
  "I'm Dharaka, a developer exploring new technologies and turning ideas into meaningful digital experiences. I'm passionate about continuously learning, building, and growing through technology. Currently an undergraduate at the University of Sri Jayewardenepura, pursuing my journey in technology and software engineering.";

function truncateText(text: string, limit: number) {
  return text.length > limit ? `${text.slice(0, limit).trimEnd()}...` : text;
}

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
    timeline: (options?: Record<string, unknown>) => {
      fromTo: (
        target: unknown,
        fromVariables: Record<string, unknown>,
        toVariables: Record<string, unknown>,
        position?: string | number,
      ) => unknown;
      eventCallback: (type: string, callback: () => void) => unknown;
    };
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
          className={`${displayFont} inline-flex min-h-8 items-center rounded-md border border-[#D8DAD4] px-2.5 py-1.5 text-[15px] leading-none font-normal tracking-[-0.01em] text-[#40443E] transition-colors hover:border-[#898E86] hover:text-[#20221F] dark:border-[#363932] dark:text-[#C5C9C0] dark:hover:border-[#7D8279] dark:hover:text-[#F2F3EE]`}
          key={item}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [scrollTriggerLoaded, setScrollTriggerLoaded] = useState(false);
  const [scrollSmootherReady, setScrollSmootherReady] = useState(false);
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
    const timer = window.setTimeout(
      () => setShowLoader(false),
      prefersReducedMotion ? 0 : 1750,
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
    if (
      !gsapWindow.gsap ||
      !gsapWindow.ScrollTrigger ||
      !gsapWindow.ScrollSmoother
    ) {
      return;
    }

    gsapWindow.gsap.registerPlugin(
      gsapWindow.ScrollTrigger,
      gsapWindow.ScrollSmoother,
    );
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
      !gsapLoaded ||
      !scrollTriggerLoaded ||
      !pageRef.current ||
      prefersReducedMotion
    ) {
      return;
    }

    const gsapWindow = window as GsapWindow;
    const gsap = gsapWindow.gsap;
    const ScrollTrigger = gsapWindow.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const postHeroElements = pageRef.current?.querySelectorAll(
        "[data-section-title], [data-reveal-item], [data-reveal-footer]",
      );

      // Keep every section after the hero hidden until the opening timeline ends.
      // GSAP applies this only when motion is enabled, so content stays visible if
      // JavaScript or the animation library is unavailable.
      if (postHeroElements?.length) {
        gsap.set(postHeroElements, { autoAlpha: 0 });
      }

      const openingTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      openingTimeline.fromTo(
        '[data-opening="profile"]',
        { autoAlpha: 0, rotate: -5, scale: 0.82 },
        { autoAlpha: 1, rotate: 0, scale: 1, duration: 0.7 },
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
  }, [gsapLoaded, prefersReducedMotion, scrollTriggerLoaded, showLoader]);

  useEffect(() => {
    if (
      showLoader ||
      !heroEntranceComplete ||
      !gsapLoaded ||
      !scrollTriggerLoaded ||
      !pageRef.current ||
      prefersReducedMotion
    ) {
      return;
    }

    const gsapWindow = window as GsapWindow;
    const gsap = gsapWindow.gsap;
    const ScrollTrigger = gsapWindow.ScrollTrigger;
    const sections = pageRef.current.querySelectorAll<HTMLElement>(
      "[data-gsap-section]",
    );
    if (!gsap || !ScrollTrigger || !sections.length) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      sections.forEach((section) => {
        const title = section.querySelector("[data-section-title]");
        if (title) {
          gsap.fromTo(
            title,
            { autoAlpha: 0, y: 22 },
            {
              autoAlpha: 1,
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
              { autoAlpha: 0, y: 32 },
              {
                autoAlpha: 1,
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
      });

      pageRef.current
        ?.querySelectorAll<HTMLElement>("[data-reveal-footer]")
        .forEach((item) => {
          gsap.fromTo(
            item,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 92%",
                once: true,
              },
            },
          );
        });
    }, pageRef.current);

    const refreshFrame = window.requestAnimationFrame(() =>
      ScrollTrigger.refresh(),
    );
    return () => {
      window.cancelAnimationFrame(refreshFrame);
      context.revert();
    };
  }, [
    gsapLoaded,
    heroEntranceComplete,
    prefersReducedMotion,
    scrollTriggerLoaded,
    showLoader,
  ]);

  return (
    <>
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
        <Script
          id="gsap-core"
          src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"
          strategy="afterInteractive"
          onReady={() => setGsapLoaded(true)}
        />
        {gsapLoaded && (
          <>
            <Script
              id="gsap-scroll-trigger"
              src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrollTrigger.min.js"
              strategy="afterInteractive"
              onReady={() => setScrollTriggerLoaded(true)}
            />
          </>
        )}
        {scrollTriggerLoaded && (
          <Script
            id="gsap-scroll-smoother"
            src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrollSmoother.min.js"
            strategy="afterInteractive"
            onReady={() => setScrollSmootherReady(true)}
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
                  <div className="w-full max-w-[780px] text-center">
                    <div className="flex items-center justify-center gap-5">
                      <div className="shrink-0" data-opening="profile">
                        <Image className="size-[120px] rounded-xl object-cover shadow-[0_10px_24px_rgba(32,34,31,0.16)] ring-1 ring-black/5 dark:shadow-[0_10px_24px_rgba(0,0,0,0.35)] dark:ring-white/10" src="/profile.png" alt="Portrait of Dharaka Meth" width={120} height={120} priority />
                      </div>
                      <div className="min-w-0 text-left" data-opening="identity">
                        <h1
                          className="[font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif] text-[26px] leading-[1.2] font-medium tracking-[0.0125em] text-[#222222] dark:text-[#F2F3EE]"
                        >
                          Dharaka Meth
                        </h1>
                        <p
                          className="[font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif] mt-2 text-[20px] leading-7 font-medium tracking-[0.0125em] text-[#777777] dark:text-[#A6ABA1]"
                        >
                          Aspiring Backend Developer
                        </p>
                      </div>
                    </div>

                    <p
                      className="[font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif] mx-auto mt-4 max-w-[62ch] whitespace-normal text-pretty text-[16px] leading-6 font-medium tracking-[-0.04em] text-[#929292] [word-spacing:normal]"
                      aria-label={introduction}
                      data-opening="intro"
                    >
                      <span className="">
                        I&apos;m dharaka, a developer exploring new technologies and turning ideas into meaningful digital experiences.
                        I&apos;m passionate about continuously learning, building, and growing through technology.
                      </span>
                      <span className="mt-5 block">
                        Currently an undergraduate at the <Image className="mx-1 inline-block size-5 rounded-sm align-text-bottom" src="/usjp.jpg" alt="University of Sri Jayewardenepura" width={20} height={20} /> <a className={`${focusRing} inline rounded-sm text-white underline decoration-1 underline-offset-4`} href="https://www.sjp.ac.lk/" target="_blank" rel="noreferrer">University of Sri Jayewardenepura</a>, pursuing my journey in technology and software engineering.
                      </span>
                    </p>

                    <div
                      className="mt-7 flex flex-wrap items-center justify-center gap-3"
                      data-opening="actions"
                    >
                      <ShinyButton
                        className={`${displayFont} ${focusRing} text-[16px] font-medium tracking-normal`}
                        href="/projectSection"
                      >
                        My works
                        <ArrowUpRight className="size-4 stroke-[1.75]" />
                      </ShinyButton>
                      {/* <ShinyButton
                        className={`${displayFont} ${focusRing} text-[16px] transition-colors hover:bg-[#F2F2EC] dark:hover:bg-[#232520]`}
                        href="/Blogs"
                        hover={false}
                        shine={false}
                      >
                        Writing
                        <ArrowUpRight className="size-4 stroke-[1.75]" />
                      </ShinyButton> */}
                      <a
                        className={`${displayFont} ${focusRing} inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#D8DAD4] px-5 text-[16px] font-medium tracking-normal text-[#343832] transition duration-200 hover:-translate-y-0.5 hover:border-[#BFC2BA] hover:bg-[#F2F2EC] dark:border-[#363932] dark:text-[#E1E4DD] dark:hover:border-[#50544A] dark:hover:bg-[#232520]`}
                        href="/documents/dharaka-meth-cv.pdf"
                        download
                      >
                        <Download className="size-4 stroke-[1.75]" />
                        Download CV
                      </a>
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
                      className={`${displayFont} mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[15px] text-[#62675F] dark:text-[#A6ABA1]`}
                      data-opening="meta"
                    >
                      <TextLink href="https://github.com/DHARAKA-METH" external>
                        GitHub
                      </TextLink>
                      <TextLink href="https://www.linkedin.com/in/dharaka-meth-koonkaduwage-821ba4215" external>
                        LinkedIn
                      </TextLink>
               <InternshipStatus />
                    </div>
                  </div>

                  <div
                    className={`${displayFont} ${focusRing} group absolute  bottom-1 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-2 rounded-xl px-4 py-20 text-[18px] font-bold tracking-[0.02em] text-[#62675F] transition-colors hover:text-[#20221F] sm:bottom-7 dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`}

                    aria-label="Scroll to experience"
                    data-opening="scroll-cue"
                  >
                    <span>Let&apos;s Talk</span>
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
                      href="/projectSection"
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
                <Section id="volunteer">
                  <SectionTitle>Volunteer experience</SectionTitle>
                  <Timeline>
                    {volunteerExperiences.map(
                      ({ period, name, role, description }) => (
                        <TimelineItem period={period} key={`${name}-${role}-${period.join("-")}`}>
                          <Volunteer
                            name={name}
                            role={role}
                            description={description}
                          />
                        </TimelineItem>
                      ),
                    )}
                  </Timeline>
                </Section>

                <Section id="skills">
                  <SectionTitle>Stack .</SectionTitle>
                  <div className="flex flex-col gap-9">
                    {skills.map((skill) => (
                      <div key={skill.title} data-reveal-item>
                        <h3
                          className={`${displayFont} mb-3 text-[18px] leading-6 font-bold tracking-[-0.025em] text-[#292C28] dark:text-[#E8EAE5]`}
                        >
                          {skill.title}
                        </h3>
                        <TechChips items={skill.items} />
                      </div>
                    ))}
                  </div>
                </Section>

                <Section id="latest-writing">
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <SectionTitle>Latest writing</SectionTitle>
                      <p className="-mt-5 mb-8 max-w-[56ch] text-[16px] leading-7 text-[#62675F] sm:mb-10 dark:text-[#A6ABA1]">
                        Notes on engineering concepts, tools, and the things I&apos;m learning.
                      </p>
                    </div>
                    <Link className={`${displayFont} ${focusRing} mb-8 inline-flex shrink-0 items-center gap-1.5 rounded-sm text-[14px] font-bold text-[#62675F] sm:mb-10 dark:text-[#A6ABA1]`} href="/Blogs">
                      Read all
                      <ArrowUpRight className="size-3.5 stroke-[1.75]" />
                    </Link>
                  </div>
                  <div className="flex flex-col gap-9">
                    {[...blogs].sort((first, second) => second.publishedAt.localeCompare(first.publishedAt)).slice(0, 2).map((blog) => (
                      <a className={`${focusRing} flex items-start justify-between gap-5 rounded-sm`} data-reveal-item href={blog.url} key={blog.title} target="_blank" rel="noreferrer">
                        <div className="min-w-0">
                          <p className={`${displayFont} text-[13px] text-[#898E86] dark:text-[#7D8279]`}>{blog.date} · {blog.platform}</p>
                          <h3 className={`${displayFont} mt-2 text-[20px] leading-6 font-bold tracking-[-0.035em] text-[#292C28] dark:text-[#E8EAE5]`}>{truncateText(blog.title, 70)}</h3>
                          <p className="mt-2 max-w-[70ch] text-[15px] leading-6 text-[#62675F] dark:text-[#A6ABA1]">{truncateText(blog.excerpt, 150)}</p>
                          <span className={`${displayFont} mt-4 inline-flex items-center gap-1.5 text-[14px] font-bold text-[#62675F] dark:text-[#A6ABA1]`}>
                            Read article
                            <ArrowUpRight className="size-3.5 stroke-[1.75]" />
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </Section>

                <footer
                  className="mt-6 border-t border-[#E5E6E1] pt-8 dark:border-[#282B26]"
                  id="contact"
                  data-reveal-footer
                >
                  <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
                    <div>
                      <p
                        className={`${displayFont} text-[20px] font-bold tracking-[-0.035em] text-[#292C28] dark:text-[#E8EAE5]`}
                      >
                        Let&apos;s build something useful.
                      </p>
                      <p className="mt-2 max-w-[58ch] text-[16px] leading-7 text-[#62675F] dark:text-[#A6ABA1]">
                        I am open to internship opportunities, collaborations, and
                        conversations about Software engineering .
                      </p>
                    </div>
                    <a
                      className={`${displayFont} ${focusRing} inline-flex w-fit items-center gap-2 rounded-md text-[15px] font-bold text-[#62675F] transition-colors hover:text-[#20221F] dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`}
                      href="https://www.linkedin.com/in/dharaka-meth-koonkaduwage-821ba4215"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Connect on LinkedIn
                      <ArrowUpRight className="size-4 stroke-[1.75]" />
                    </a>
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-5">
                    <div className="flex flex-wrap gap-4 text-[#62675F] dark:text-[#A6ABA1]">
                      <Social href="https://github.com/DHARAKA-METH" label="GitHub">
                        <SiGithub />
                      </Social>
                      <Social href="https://x.com" label="X">
                        <SiX />
                      </Social>
                      <Social href="https://www.linkedin.com/in/dharaka-meth-koonkaduwage-821ba4215" label="LinkedIn">
                        <FaLinkedin />
                      </Social>
                      <Social href="https://youtube.com" label="YouTube">
                        <SiYoutube />
                      </Social>
                      <Social href="https://tiktok.com" label="TikTok">
                        <SiTiktok />
                      </Social>
                      <Social href="https://instagram.com" label="Instagram">
                        <SiInstagram />
                      </Social>
                    </div>
                  </div>

                  <div
                    className={`${displayFont} mt-7 flex flex-col justify-between gap-3 text-[14px] text-[#898E86] sm:flex-row dark:text-[#7D8279]`}
                  >
                    <p>© 2026 Dharaka Meth. All rights reserved.</p>
                    <a
                      className={`${focusRing} inline-flex w-fit items-center gap-1.5 rounded-sm transition-colors hover:text-[#20221F] dark:hover:text-[#F2F3EE]`}
                      href="#hero"
                    >
                      Back to top
                      <ArrowUp className="size-3.5 stroke-[1.75]" />
                    </a>
                  </div>
                </footer>
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
}: {
  id: string;
  children: ReactNode;
  smoothEffect?: boolean;
}) {
  return (
    <section
      className="scroll-mt-16 py-14 sm:py-20"
      id={id}
      data-gsap-section
      data-speed={smoothEffect ? "0.94" : undefined}
      data-lag={smoothEffect ? "0.08" : undefined}
    >
      {children}
    </section>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-8 sm:mb-10" data-section-title>
      <h2
        className={`${displayFont} text-[27px] leading-tight font-bold tracking-[-0.055em] text-[#20221F] sm:text-[31px] dark:text-[#F2F3EE]`}
      >
        {children}
      </h2>
    </div>
  );
}

function Timeline({ children }: { children: ReactNode }) {
  return (
    <div className="relative before:absolute before:top-2 before:bottom-3 before:left-[4px] before:w-px before:bg-[#D8DAD4] dark:before:bg-[#363932]">
      {children}
    </div>
  );
}

function TimelineItem({
  period,
  children,
}: {
  period: string[];
  children: ReactNode;
}) {
  return (
    <div
      className="relative grid gap-3 pb-12 pl-7 last:pb-0 before:absolute before:top-[7px] before:left-0 before:size-[9px] before:rounded-full before:bg-[#20221F] before:ring-4 before:ring-[#FAFAF7] dark:before:bg-[#F2F3EE] dark:before:ring-[#10110F] sm:grid-cols-[108px_1fr] sm:gap-7"
      data-reveal-item
    >
      <p
        className={`${displayFont} pt-px text-[14px] leading-5 text-[#898E86] dark:text-[#7D8279]`}
      >
        {period[0]}
        {period[1] && (
          <>
            <span className="mx-1.5 text-[#B5B8B0] dark:text-[#55594F]">→</span>
            <br className="hidden sm:block" />
            {period[1]}
          </>
        )}
      </p>
      <div>{children}</div>
    </div>
  );
}

function Volunteer({
  name,
  role,
  description,
}: {
  name: string;
  role: string;
  description: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-8">
      <div>
        <h3
          className={`${displayFont} text-[21px] leading-6 font-bold tracking-[-0.035em] text-[#292C28] dark:text-[#E8EAE5]`}
        >
          {name}
        </h3>
        <p
          className={`${displayFont} mt-1.5 text-[15px] text-[#62675F] dark:text-[#A6ABA1]`}
        >
          {role}
        </p>
        <p className="mt-3 max-w-[64ch] text-[16px] leading-7 text-[#62675F] sm:text-[17px] dark:text-[#A6ABA1]">
          {description}
        </p>
      </div>
      {/* <a
        className={`${displayFont} ${focusRing} inline-flex w-fit items-center gap-1.5 rounded-sm text-[14px] font-bold text-[#62675F] transition-colors hover:text-[#20221F] dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`}
        href="#contact"
      >
        Certificate
        <ArrowUpRight className="size-3.5 stroke-[1.75]" />
      </a> */}
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
      className={`${focusRing} inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-[#20221F] dark:hover:text-[#F2F3EE]`}
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
      className={`${focusRing} grid size-8 place-items-center rounded-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#F2F2EC] hover:text-[#20221F] dark:hover:bg-[#232520] dark:hover:text-[#F2F3EE] [&_svg]:size-[18px]`}
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

