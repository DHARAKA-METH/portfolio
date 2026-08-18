"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Script from "next/script";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Download,
  Home,
  Moon,
  Sun,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { CtaButton } from "@/components/ui/cta-button";
import { PortfolioLoader } from "@/components/ui/portfolio-loader";
import {
  SiGithub,
  SiInstagram,
  SiTiktok,
  SiX,
  SiYoutube,
} from "react-icons/si";

const skills = [
  {
    title: "Backend",
    items: ["Java", "Spring Boot", "Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Database",
    items: ["MySQL", "Cloud Firestore", "MongoDB"],
  },
  {
    title: "DevOps & Cloud",
    items: ["Docker", "NGINX", "GitHub Actions", "Firebase", "Linux"],
  },
  {
    title: "Frontend",
    items: ["Next.js", "React Native", "TypeScript", "Flutter", "Tailwind CSS"],
  },
];

const projects = [
  {
    title: "MindSpace - Mental Wellness Support Platform",
    period: ["Jul 2026", "Aug 2026"],
    role: "Mobile Application Developer",
    description:
      "A mobile application supporting university student well-being through mood and stress tracking, AI-assisted guidance, personalized wellness resources, anonymous counselor chat, and appointment booking.",
    mark: "MS",
    accent: "from-[#595783] to-[#7773A3]",
    technologies: ["React Native", "Expo", "TypeScript", "Tailwind CSS", "Firebase Auth", "Cloud Firestore", "Cloud Functions", "Hugging Face"],
    url: "https://github.com/DHARAKA-METH/Mind-Space",
    linkLabel: "View on GitHub",
  },
  {
    title: "J'pura Employability Skills Awards: JESA 2026",
    period: ["Jun 2026", "Jul 2026"],
    role: "Web Developer",
    description:
      "Revamped the award registration application with a redesigned workflow, robust Zod validation, Firebase storage, improved data accuracy, and a streamlined application experience.",
    mark: "J6",
    accent: "from-[#C2410C] to-[#F97316]",
    technologies: ["Next.js", "TypeScript", "Firebase", "Zod", "Teamwork"],
    url: "https://jesa.lk",
    linkLabel: "Visit jesa.lk",
  },
  {
    title: "RescuePaws - Stray Dog Management System",
    period: ["Mar 2026", "Apr 2026"],
    role: "Full-Stack Developer",
    description:
      "A microservices-based platform for reporting, tracking, and managing stray dog rescue cases in real time, with secure authentication, image uploads, and containerized deployment.",
    mark: "RP",
    accent: "from-[#185E5B] to-[#2C8580]",
    technologies: ["Spring Boot", "Next.js", "Spring Cloud Gateway", "JWT", "MySQL", "Docker", "NGINX", "Cloudinary"],
    url: "https://github.com/DHARAKA-METH/RescuePaws",
    linkLabel: "View on GitHub",
  },
  {
    title: "Job Zone",
    period: ["Dec 2025", "Jan 2026"],
    role: "Backend Developer",
    description:
      "Contributed backend APIs for registration, authentication, job postings, and applications while maintaining data integrity, secure server-side logic, and reliable application performance.",
    mark: "JZ",
    accent: "from-[#4B5563] to-[#6B7280]",
    technologies: ["Node.js", "Express.js", "REST APIs", "Authentication", "Database Design"],
    url: "https://github.com/CHATHURAsangeeth/job-zone",
    linkLabel: "View on GitHub",
  },
  {
    title: "KaZU",
    period: ["Oct 2025", "Dec 2025"],
    role: "Mobile Application Developer",
    description:
      "An IoT device and mobile application that gives pet owners live GPS location updates, safety alerts, and simple real-time monitoring.",
    mark: "KZ",
    accent: "from-[#315B7D] to-[#5188A9]",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80",
    technologies: ["Flutter", "Dart", "IoT", "GPS", "Mobile Development"],
    url: "https://github.com/DHARAKA-METH/kazu",
    linkLabel: "View on GitHub",
  },
];

const experienceTechnologies = [
  "Next.js",
  "TypeScript",
  "Firebase",
  "Zod",
];

const displayFont =
  "[font-family:var(--font-courier-prime),ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace]";

const bodyFont =
  "[font-family:var(--font-inter),Inter,ui-sans-serif,system-ui,sans-serif]";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF7] dark:focus-visible:ring-[#FF8A65] dark:focus-visible:ring-offset-[#10110F]";

const introduction =
  "I am an IT undergraduate focused on building reliable backend systems and growing practical skills in DevOps and cloud technologies. I enjoy turning clear ideas into useful, maintainable products.";

type GsapWindow = Window & {
  gsap?: {
    registerPlugin: (...plugins: unknown[]) => void;
    to: (
      target: Element,
      variables: Record<string, unknown>,
    ) => { kill: () => void };
  };
  ScrambleTextPlugin?: unknown;
  ScrollTrigger?: unknown;
  ScrollSmoother?: {
    create: (options: Record<string, unknown>) => { kill: () => void };
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

function ThemeButton({ dark, onClick }: { dark: boolean; onClick: () => void }) {
  return (
    <button
      className={`${focusRing} grid size-10 place-items-center rounded-full border border-[#D8DAD4] text-[#62675F] transition duration-200 hover:-translate-y-0.5 hover:border-[#BFC2BA] hover:bg-[#F2F2EC] hover:text-[#20221F] dark:border-[#363932] dark:text-[#A6ABA1] dark:hover:border-[#50544A] dark:hover:bg-[#232520] dark:hover:text-[#F2F3EE]`}
      type="button"
      onClick={onClick}
      aria-label={dark ? "Use light mode" : "Use dark mode"}
      title={dark ? "Use light mode" : "Use dark mode"}
    >
      {dark ? (
        <Sun className="size-[17px] stroke-[1.75]" />
      ) : (
        <Moon className="size-[17px] stroke-[1.75]" />
      )}
    </button>
  );
}

export default function HomePage() {
  const [dark, setDark] = useState(false);
  const [profileFlipped, setProfileFlipped] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [scrambleReady, setScrambleReady] = useState(false);
  const [scrollTriggerLoaded, setScrollTriggerLoaded] = useState(false);
  const [scrollSmootherReady, setScrollSmootherReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const introductionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const shouldUseDark = savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;

    document.documentElement.classList.toggle("dark", shouldUseDark);
    const frame = window.requestAnimationFrame(() => setDark(shouldUseDark));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timer = window.setTimeout(
      () => setShowLoader(false),
      reduceMotion ? 0 : 1750,
    );
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (
      showLoader ||
      !scrambleReady ||
      !introductionRef.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const gsapWindow = window as GsapWindow;
    if (!gsapWindow.gsap || !gsapWindow.ScrambleTextPlugin) return;

    gsapWindow.gsap.registerPlugin(gsapWindow.ScrambleTextPlugin);
    const tween = gsapWindow.gsap.to(introductionRef.current, {
      duration: 1.8,
      ease: "none",
      scrambleText: {
        text: introduction,
        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        delimiter: " ",
        revealDelay: 0.2,
        speed: 0.3,
      },
    });

    return () => tween.kill();
  }, [scrambleReady, showLoader]);

  useEffect(() => {
    if (
      showLoader ||
      !scrollSmootherReady ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
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
      smooth: 2,
      effects: true,
    });

    return () => smoother.kill();
  }, [scrollSmootherReady, showLoader]);

  useEffect(() => {
    const sectionIds = [
      "hero",
      "skills",
      "experience",
      "projects",
      "volunteer",
    ];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      { rootMargin: "-20% 0px -55%", threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setDark((current) => {
      const next = !current;
      document.documentElement.classList.toggle("dark", next);
      window.localStorage.setItem("portfolio-theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <>
      <AnimatePresence>{showLoader && <PortfolioLoader />}</AnimatePresence>
      <motion.main
      className={`${bodyFont} min-h-screen overflow-x-clip bg-[#FAFAF7] text-[#20221F] antialiased transition-colors duration-300 selection:bg-[#F97316]/20 selection:text-[#20221F] dark:bg-[#10110F] dark:text-[#F2F3EE] dark:selection:bg-[#FF7043]/25 dark:selection:text-[#F2F3EE]`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: showLoader ? 0 : 1, y: showLoader ? 16 : 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
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
            id="gsap-scramble-text"
            src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrambleTextPlugin.min.js"
            strategy="afterInteractive"
            onReady={() => setScrambleReady(true)}
          />
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
      <div id="smooth-wrapper" className="bg-[#FAFAF7] dark:bg-[#10110F]">
        <div id="smooth-content" className="bg-[#FAFAF7] dark:bg-[#10110F]">
          <div className="mx-auto w-full max-w-[760px] px-6 pt-8 pb-32 sm:px-8 sm:pt-10 lg:px-6 lg:pt-16">
        <header className="flex items-center justify-between" aria-label="Site header">
          <a
            className={`${displayFont} ${focusRing} inline-flex items-center gap-2 rounded-md text-[15px] tracking-[0.02em] text-[#62675F] transition-colors hover:text-[#20221F] dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`}
            href="#hero"
          >
            <span className="size-1.5 rounded-full bg-[#C2410C] dark:bg-[#FF7043]" />
            DHARAKA / 2026
          </a>
          <ThemeButton dark={dark} onClick={toggleTheme} />
        </header>

        <section
          className="scroll-mt-12 pt-16 pb-14 sm:pt-24 sm:pb-20"
          id="hero"
        >
          <div className="flex items-center gap-3">
            <button
              className={`${focusRing} group shrink-0 cursor-pointer rounded-xl [perspective:1000px]`}
              type="button"
              onMouseEnter={() => setProfileFlipped(true)}
              onMouseLeave={() => setProfileFlipped(false)}
              onFocus={() => setProfileFlipped(true)}
              onBlur={() => setProfileFlipped(false)}
              onClick={() => setProfileFlipped((current) => !current)}
              aria-label="Switch between portrait and Dharaka Meth logo"
              aria-pressed={profileFlipped}
            >
              <span className={`relative block size-[60px] transform-3d transition-transform duration-500 ease-out ${profileFlipped ? "rotate-y-180" : ""}`}>
                <Image className="absolute inset-0 size-full rounded-xl object-cover shadow-[0_10px_24px_rgba(32,34,31,0.16)] ring-1 ring-black/5 backface-hidden dark:shadow-[0_10px_24px_rgba(0,0,0,0.35)] dark:ring-white/10" src="/profile.png" alt="Portrait of Dharaka Meth" width={60} height={60} priority />
                <Image className="absolute inset-0 size-full rotate-y-180 rounded-xl object-cover shadow-[0_10px_24px_rgba(32,34,31,0.16)] ring-1 ring-black/5 backface-hidden dark:shadow-[0_10px_24px_rgba(0,0,0,0.35)] dark:ring-white/10" src="/logo.png" alt="Dharaka Meth logo" width={60} height={60} />
              </span>
            </button>
            <div className="min-w-0">
              <h1
                className={`${displayFont} text-[18px] leading-[1.2] font-bold tracking-[0.0125em] text-[#222222] dark:text-[#F2F3EE]`}
              >
                Dharaka Meth
              </h1>
              <p
                className={`${displayFont} mt-1 text-[18px] leading-6 tracking-[0.0125em] text-[#777777] dark:text-[#A6ABA1]`}
              >
                Aspiring Backend &amp; DevOps Engineer
              </p>
            </div>
          </div>

          <p
            ref={introductionRef}
            className="mt-10 max-w-[650px] whitespace-normal text-[18px] leading-7 tracking-normal text-[#555A52] [word-spacing:normal] sm:mt-12 sm:text-[19px] sm:leading-8 dark:text-[#B1B6AC]"
            aria-label={introduction}
          >
            {introduction}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <CtaButton
              className={`${displayFont} ${focusRing} text-[16px]`}
              href="#projects"
              shimmer
            >
              View projects
              <ArrowUpRight className="size-4 stroke-[1.75]" />
            </CtaButton>
            <a
              className={`${displayFont} ${focusRing} inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#D8DAD4] px-5 text-[16px] font-bold text-[#343832] transition duration-200 hover:-translate-y-0.5 hover:border-[#BFC2BA] hover:bg-[#F2F2EC] dark:border-[#363932] dark:text-[#E1E4DD] dark:hover:border-[#50544A] dark:hover:bg-[#232520]`}
              href="/documents/dharaka-meth-cv.pdf"
              download
            >
              <Download className="size-4 stroke-[1.75]" />
              Download CV
            </a>
          </div>

          <div
            className={`${displayFont} mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[15px] text-[#62675F] dark:text-[#A6ABA1]`}
          >
            <TextLink href="https://github.com" external>
              GitHub
            </TextLink>
            <TextLink href="https://linkedin.com" external>
              LinkedIn
            </TextLink>
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#4E8A63] dark:bg-[#78BE8F]" />
              Open to internship opportunities
            </span>
          </div>
        </section>

        <Section id="experience" smoothEffect>
          <SectionTitle>Experience / My work</SectionTitle>
          <Timeline>
            <TimelineItem period={["Jun 2026", "Jul 2026"]}>
              <h3
                className={`${displayFont} text-[21px] leading-6 font-bold tracking-[-0.035em] text-[#292C28] dark:text-[#E8EAE5]`}
              >
                JESA 2026 Registration Portal
              </h3>
              <p
                className={`${displayFont} mt-1.5 text-[15px] text-[#62675F] dark:text-[#A6ABA1]`}
              >
                Web Developer
              </p>
              <p className="mt-3 mb-4 text-[17px] leading-7 text-[#62675F] dark:text-[#A6ABA1]">
                Revamped and developed the JESA 2026 award-registration
                application with structured validation, Firebase integration,
                and duplicate prevention.
              </p>
              <a
                className={`${displayFont} ${focusRing} mb-4 inline-flex items-center gap-1.5 rounded-sm text-[15px] font-bold text-[#62675F] transition-colors hover:text-[#20221F] dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`}
                href="https://jesa.lk"
                target="_blank"
                rel="noreferrer"
              >
                Visit jesa.lk
                <ArrowUpRight className="size-3.5 stroke-[1.75]" />
              </a>
              <TechChips items={experienceTechnologies} />
            </TimelineItem>
          </Timeline>
        </Section>

        <Section id="projects" smoothEffect>
          <SectionTitle>Featured projects</SectionTitle>
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
                    <p className="mt-3 mb-4 text-[17px] leading-7 text-[#62675F] dark:text-[#A6ABA1]">
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
        </Section>

        <Section id="volunteer">
          <SectionTitle>Volunteer experience</SectionTitle>
          <Timeline>
            <TimelineItem period={["Dec 2025", "Apr 2026"]}>
              <Volunteer
                name="Hackathon Crew Member — Organizing Committee"
                role="ICTS — Information and Communication Technology Society"
                description="Supported the organizing committee with the planning and delivery of hackathon activities."
              />
            </TimelineItem>
            <TimelineItem period={[]}>
              <Volunteer
                name="Programming Committee Member — Beauty of Cloud 2.0"
                role="IEEE CS Student Branch Chapter — University of Sri Jayewardenepura"
                description="Contributed to the programming committee for Beauty of Cloud 2.0."
              />
            </TimelineItem>
          </Timeline>
        </Section>

        <Section id="skills">
          <SectionTitle>Skills</SectionTitle>
          <div className="flex flex-col gap-9">
            {skills.map((skill) => (
              <div key={skill.title}>
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

        <footer
          className="mt-6 border-t border-[#E5E6E1] pt-8 dark:border-[#282B26]"
          id="contact"
        >
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
            <div>
              <p
                className={`${displayFont} text-[20px] font-bold tracking-[-0.035em] text-[#292C28] dark:text-[#E8EAE5]`}
              >
                Let&apos;s build something useful.
              </p>
              <p className="mt-2 max-w-[470px] text-[16px] leading-6 text-[#62675F] dark:text-[#A6ABA1]">
                I am open to internship opportunities, collaborations, and
                conversations about backend engineering and DevOps.
              </p>
            </div>
            <a
              className={`${displayFont} ${focusRing} inline-flex w-fit items-center gap-2 rounded-md text-[15px] font-bold text-[#62675F] transition-colors hover:text-[#20221F] dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`}
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              Connect on LinkedIn
              <ArrowUpRight className="size-4 stroke-[1.75]" />
            </a>
          </div>

          <div className="mt-8 flex items-center justify-between gap-5">
            <div className="flex flex-wrap gap-4 text-[#62675F] dark:text-[#A6ABA1]">
              <Social href="https://github.com" label="GitHub">
                <SiGithub />
              </Social>
              <Social href="https://x.com" label="X">
                <SiX />
              </Social>
              <Social href="https://linkedin.com" label="LinkedIn">
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
            <ThemeButton dark={dark} onClick={toggleTheme} />
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

      <nav
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-50 flex w-[calc(100%_-_1.5rem)] max-w-[430px] -translate-x-1/2 rounded-2xl border border-[#D8DAD4]/90 bg-[#FFFFFF]/88 p-1.5 shadow-[0_16px_50px_rgba(32,34,31,0.16)] backdrop-blur-xl dark:border-[#363932]/90 dark:bg-[#181A17]/88 dark:shadow-[0_16px_50px_rgba(0,0,0,0.38)]"
        aria-label="Primary navigation"
      >
        <NavLink href="#hero" label="Home" active={activeSection === "hero"}>
          <Home />
        </NavLink>
        <NavLink
          href="#projects"
          label="Work"
          active={["skills", "experience", "projects", "volunteer"].includes(
            activeSection,
          )}
        >
          <Briefcase />
        </NavLink>
        <NavLink href="/blog" label="Blog">
          <BookOpen />
        </NavLink>
      </nav>
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
      data-speed={smoothEffect ? "0.94" : undefined}
      data-lag={smoothEffect ? "0.08" : undefined}
    >
      {children}
    </section>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-8 sm:mb-10">
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
    <div className="relative grid gap-3 pb-12 pl-7 last:pb-0 before:absolute before:top-[7px] before:left-0 before:size-[9px] before:rounded-full before:bg-[#20221F] before:ring-4 before:ring-[#FAFAF7] dark:before:bg-[#F2F3EE] dark:before:ring-[#10110F] sm:grid-cols-[108px_1fr] sm:gap-7">
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
        <p className="mt-3 text-[17px] leading-7 text-[#62675F] dark:text-[#A6ABA1]">
          {description}
        </p>
      </div>
      <a
        className={`${displayFont} ${focusRing} inline-flex w-fit items-center gap-1.5 rounded-sm text-[14px] font-bold text-[#62675F] transition-colors hover:text-[#20221F] dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`}
        href="#contact"
      >
        Certificate
        <ArrowUpRight className="size-3.5 stroke-[1.75]" />
      </a>
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

function NavLink({
  href,
  label,
  active = false,
  children,
}: {
  href: string;
  label: string;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      className={`${displayFont} ${focusRing} flex h-11 flex-1 items-center justify-center gap-2 rounded-xl px-2 text-[14px] font-bold transition duration-200 [&_svg]:size-[16px] [&_svg]:stroke-[1.75] ${
        active
          ? "bg-[#20221F] text-[#FAFAF7] shadow-sm dark:bg-[#F2F3EE] dark:text-[#10110F]"
          : "text-[#62675F] hover:bg-[#F2F2EC] hover:text-[#20221F] dark:text-[#A6ABA1] dark:hover:bg-[#232520] dark:hover:text-[#F2F3EE]"
      }`}
      href={href}
      aria-current={active ? "page" : undefined}
    >
      {children}
      <span>{label}</span>
    </a>
  );
}
