"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  Braces,
  Cpu,
  Database,
  DatabaseBackup,
  KeyRound,
  LockKeyhole,
  MapPin,
  Shield,
  ShieldCheck,
  Smartphone,
  TableProperties,
  Users,
  Waypoints,
} from "lucide-react";
import {
  SiCloudinary,
  SiDart,
  SiDocker,
  SiExpo,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiHuggingface,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiReact,
  SiSharp,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
  SiUpstash,
  SiYoutube,
} from "react-icons/si";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PortfolioLoader } from "@/components/ui/portfolio-loader";
import { JsonLd } from "@/components/seo/json-ld";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

const displayFont =
  "[font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif]";

const technologyIcons = {
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  Firebase: SiFirebase,
  Zod: BadgeCheck,
  Teamwork: Users,
  "React Native": SiReact,
  Expo: SiExpo,
  "Tailwind CSS": SiTailwindcss,
  "Firebase Auth": ShieldCheck,
  "Cloud Firestore": Database,
  "Cloud Functions": Braces,
  "Hugging Face": SiHuggingface,
  Flutter: SiFlutter,
  Dart: SiDart,
  IoT: Cpu,
  GPS: MapPin,
  "Mobile Development": Smartphone,
  "Spring Boot": SiSpringboot,
  JWT: KeyRound,
  MySQL: SiMysql,
  Docker: SiDocker,
  NGINX: SiNginx,
  Cloudinary: SiCloudinary,
  Microservices: Boxes,
  MongoDB: SiMongodb,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "REST APIs": Waypoints,
  Authentication: LockKeyhole,
  "Database Design": DatabaseBackup,
  Arcjet: Shield,
  Upstash: SiUpstash,
  "C#": SiSharp,
  SQL: TableProperties,
} as const;

const technologyIconColors: Record<keyof typeof technologyIcons, string> = {
  "Next.js": "text-[#111111] dark:text-[#F2F3EE]",
  TypeScript: "text-[#3178C6]",
  Firebase: "text-[#FFCA28]",
  Zod: "text-[#3E67B1]",
  Teamwork: "text-[#7C3AED]",
  "React Native": "text-[#61DAFB]",
  Expo: "text-[#111111] dark:text-[#F2F3EE]",
  "Tailwind CSS": "text-[#06B6D4]",
  "Firebase Auth": "text-[#F59E0B]",
  "Cloud Firestore": "text-[#F97316]",
  "Cloud Functions": "text-[#A855F7]",
  "Hugging Face": "text-[#EAB308]",
  Flutter: "text-[#54C5F8]",
  Dart: "text-[#0175C2]",
  IoT: "text-[#14B8A6]",
  GPS: "text-[#EF4444]",
  "Mobile Development": "text-[#8B5CF6]",
  "Spring Boot": "text-[#6DB33F]",
  JWT: "text-[#CA8A04]",
  MySQL: "text-[#4479A1]",
  Docker: "text-[#2496ED]",
  NGINX: "text-[#009639]",
  Cloudinary: "text-[#3448C5]",
  Microservices: "text-[#EA580C]",
  MongoDB: "text-[#47A248]",
  "Node.js": "text-[#5FA04E]",
  "Express.js": "text-[#20232A] dark:text-[#E8EAE5]",
  "REST APIs": "text-[#0EA5E9]",
  Authentication: "text-[#EC4899]",
  "Database Design": "text-[#6366F1]",
  Arcjet: "text-[#EA580C]",
  Upstash: "text-[#00A67E]",
  "C#": "text-[#512BD4]",
  SQL: "text-[#2563EB]",
};

export default function ProjectSectionPage() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const directionRef = useRef(1);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const projectCount = projects.length;
  const [showLoader, setShowLoader] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const [loadedImageUrls, setLoadedImageUrls] = useState<Set<string>>(() => new Set());
  const [visibleImageUrls, setVisibleImageUrls] = useState<Set<string>>(() => new Set());
  const [revealedImageUrls, setRevealedImageUrls] = useState<Set<string>>(() => new Set());
  const pageRef = useRef<HTMLElement>(null);
  const pendingImageReveals = useRef(new Set<string>());

  const markImageLoaded = (imageUrl: string) => {
    setLoadedImageUrls((current) => {
      if (current.has(imageUrl)) return current;
      const next = new Set(current);
      next.add(imageUrl);
      return next;
    });
  };

  const selectProject = (index: number) => {
    if (projectCount === 0) return;

    const nextIndex = (index + projectCount) % projectCount;
    if (nextIndex === activeIndex) return;

    directionRef.current = index > activeIndex ? 1 : -1;
    setActiveIndex(nextIndex);
    window.history.pushState(null, "", `#${encodeURIComponent(projects[nextIndex].slug)}`);

    if (showcaseRef.current && showcaseRef.current.getBoundingClientRect().top < 0) {
      showcaseRef.current.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(
      () => setShowLoader(false),
      prefersReducedMotion ? 0 : 300,
    );
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!contentReady || prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-project-reveal]").forEach((project) => {
        gsap.fromTo(
          project,
          { autoAlpha: 0, y: 16 * directionRef.current },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
            ease: "power3.out",
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-project-gallery]").forEach((gallery) => {
        gsap.fromTo(
          gallery.querySelectorAll<HTMLElement>("[data-project-image]"),
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gallery,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    }, pageRef);

    return () => context.revert();
  }, [activeIndex, contentReady, prefersReducedMotion]);

  useEffect(() => {
    if (!contentReady) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleUrls = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.getAttribute("data-image-url"))
          .filter((imageUrl): imageUrl is string => Boolean(imageUrl));

        if (visibleUrls.length === 0) return;
        setVisibleImageUrls((current) => {
          const next = new Set(current);
          visibleUrls.forEach((imageUrl) => next.add(imageUrl));
          return next;
        });
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry) => observer.unobserve(entry.target));
      },
      { threshold: 0.1 },
    );

    pageRef.current
      ?.querySelectorAll<HTMLElement>("[data-image-url]")
      .forEach((image) => observer.observe(image));

    return () => observer.disconnect();
  }, [activeIndex, contentReady]);

  useEffect(() => {
    loadedImageUrls.forEach((imageUrl) => {
      if (
        !visibleImageUrls.has(imageUrl) ||
        revealedImageUrls.has(imageUrl) ||
        pendingImageReveals.current.has(imageUrl)
      ) {
        return;
      }

      pendingImageReveals.current.add(imageUrl);
      // Let the hidden state paint before revealing fast or cached images.
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          pendingImageReveals.current.delete(imageUrl);
          setRevealedImageUrls((current) => {
            if (current.has(imageUrl)) return current;
            const next = new Set(current);
            next.add(imageUrl);
            return next;
          });
        });
      });
    });
  }, [loadedImageUrls, revealedImageUrls, visibleImageUrls]);

  useEffect(() => {
    const selectFromHash = () => {
      let slug = "";

      try {
        slug = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        // Invalid hashes fall back to the first project.
      }

      const foundIndex = projects.findIndex((project) => project.slug === slug);
      const nextIndex = foundIndex >= 0 ? foundIndex : 0;
      setActiveIndex((currentIndex) => {
        if (nextIndex !== currentIndex) {
          directionRef.current = nextIndex > currentIndex ? 1 : -1;
        }
        return nextIndex;
      });
    };

    selectFromHash();
    window.addEventListener("hashchange", selectFromHash);
    window.addEventListener("popstate", selectFromHash);

    return () => {
      window.removeEventListener("hashchange", selectFromHash);
      window.removeEventListener("popstate", selectFromHash);
    };
  }, []);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "@id": `${site.url}/projectSection#projects`,
          name: "Dharaka Meth software projects",
          itemListElement: projects.map((project, position) => ({
            "@type": "ListItem",
            position: position + 1,
            item: {
              "@type": "SoftwareApplication",
              name: project.title,
              description: project.description,
              url: `${site.url}/projectSection#${project.slug}`,
              sameAs: project.url,
              image: [...project.imageUrls, ...project.extraImageUrls],
              applicationCategory:
                project.slug === "mindspace"
                  ? "HealthApplication"
                  : project.slug === "kazu"
                    ? "UtilitiesApplication"
                    : "WebApplication",
              programmingLanguage: project.technologies,
              author: { "@id": site.personId },
            },
          })),
        }}
      />
      <AnimatePresence onExitComplete={() => setContentReady(true)}>
        {showLoader && <PortfolioLoader />}
      </AnimatePresence>
      {contentReady && (
        <main
          ref={pageRef}
          className="mx-auto w-full max-w-[1120px] px-5 pb-[calc(7rem+env(safe-area-inset-bottom))] sm:w-[84%] sm:px-0 lg:w-[60%]"
        >
          <section className="pt-10 pb-7 sm:pt-14 sm:pb-8">
            <h1 className={`${displayFont} text-[30px] font-bold tracking-[-0.045em] text-[#20221F] sm:text-[38px] dark:text-[#F2F3EE]`}>
              Projects
            </h1>
            <p className="mt-3 max-w-xl text-[14px] leading-6 text-[#62675F] sm:text-[15px] dark:text-[#A6ABA1]">
              My work, my experiments, and my journey of continuous improvement.
            </p>
          </section>

          <div ref={showcaseRef} className="relative scroll-mt-8 border-t border-[#E5E6E1] dark:border-[#282B26]">
            <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
              {projectCount > 0
                ? `Project ${activeIndex + 1} of ${projectCount}: ${projects[activeIndex]?.title}`
                : "No projects available"}
            </p>

            {projects.slice(activeIndex, activeIndex + 1).map((project) => (
              <article data-project-reveal className="min-w-0 scroll-mt-8 pt-5 pb-8 sm:pt-8 lg:pt-12" id={project.slug} key={project.slug}>
                <div className="w-full">
                  <p className={`${displayFont} text-[14px] text-[#62675F] dark:text-[#9EA594]`}>
                    {project.period.join(" - ")}
                  </p>
                  <h2 className={`${displayFont} mt-3 text-[24px] leading-[1.2] font-bold tracking-[-0.035em] text-balance text-[#292C28] sm:text-[30px] dark:text-[#E8EAE5]`}>
                    {project.title}
                  </h2>
                  <p className={`${displayFont} mt-2 text-[15px] text-[#62675F] dark:text-[#A6ABA1]`}>
                    {project.role}
                  </p>
                  <div className="mt-5 space-y-4 text-[15px] leading-7 text-[#62675F] sm:text-[16px] dark:text-[#A6ABA1]">
                    <p>{project.description}</p>
                    {project.details && <p>{project.details}</p>}
                    {project.features && (
                      <p>
                        <span className="font-semibold text-[#40443E] dark:text-[#C5C9C0]">Features: </span>
                        {project.features}
                      </p>
                    )}
                    {project.note && <p>{project.note}</p>}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => {
                      const TechnologyIcon = technologyIcons[technology as keyof typeof technologyIcons];
                      const iconColor = technologyIconColors[technology as keyof typeof technologyIconColors];

                      return (
                        <span className={`${displayFont} inline-flex items-center gap-1.5 rounded-lg border border-[#D8DAD4] bg-[#F5F6F1] px-2.5 py-1.5 text-[12px] text-[#40443E] dark:border-[#363932] dark:bg-[#171A15] dark:text-[#C5C9C0]`} key={technology}>
                          {TechnologyIcon && <TechnologyIcon className={`size-4 shrink-0 ${iconColor}`} aria-hidden="true" />}
                          {technology}
                        </span>
                      );
                    })}
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <a className={`${displayFont} inline-flex min-h-11 items-center gap-2 rounded-md text-[14px] font-medium text-[#62675F] underline-offset-4 transition-colors hover:text-[#20221F] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`} href={project.url} target="_blank" rel="noreferrer">
                      {project.linkLabel}
                      <ArrowUpRight className="size-3.5 stroke-[1.75]" />
                    </a>
                    {project.demoUrl && (
                      <a className={`${displayFont} inline-flex min-h-11 items-center gap-2 rounded-md text-[14px] font-medium text-[#62675F] underline-offset-4 transition-colors hover:text-[#20221F] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`} href={project.demoUrl} target="_blank" rel="noreferrer">
                        <SiYoutube className="size-3.5" />
                        Demo video
                        <ArrowUpRight className="size-3.5 stroke-[1.75]" />
                      </a>
                    )}
                  </div>
                </div>

                {project.imageUrls.length > 0 && (
                  <div data-project-gallery className={`mt-7 grid gap-4 sm:gap-5 ${project.screenType === "mobile" ? project.imageUrls.length === 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`}>
                    {project.imageUrls.map((imageUrl, index) => {
                      const imageRevealed = revealedImageUrls.has(imageUrl);

                      return (
                        <div data-project-image data-image-url={imageUrl} className="group rounded-2xl border border-[#DFE2D9] bg-[#F2F2EC] p-2 transition-colors hover:border-[#AAB2A0] dark:border-[#2C3326] dark:bg-[#181A17] dark:hover:border-[#505B44] sm:p-3" key={imageUrl}>
                          <div className={`relative w-full overflow-hidden rounded-xl ${project.screenType === "mobile" ? "aspect-[9/19]" : "aspect-[4/3]"}`}>
                            <div className={`absolute inset-0 bg-[#E5E6E1] transition-opacity duration-200 motion-reduce:animate-none motion-reduce:transition-none dark:bg-[#282B26] ${imageRevealed ? "opacity-0" : "animate-pulse"}`} aria-hidden="true" />
                            <Image className={`object-contain object-center transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${imageRevealed ? "scale-100 opacity-100" : "scale-[1.015] opacity-0"} group-hover:scale-[1.01] motion-reduce:group-hover:scale-100`} src={imageUrl} alt={`${project.title} screenshot ${index + 1}`} fill sizes={project.imageUrls.length === 4 ? "(min-width: 1024px) 260px, 50vw" : "(min-width: 1024px) 520px, 100vw"} style={prefersReducedMotion ? undefined : { transitionDelay: `${index * 60}ms` }} onLoad={() => markImageLoaded(imageUrl)} onError={() => markImageLoaded(imageUrl)} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {project.extraImageUrls.length > 0 && (
                  <section className="mt-10 lg:mt-14">
                    <h3 className={`${displayFont} mb-5 text-[18px] font-bold tracking-[-0.03em] text-[#292C28] dark:text-[#E8EAE5]`}>
                      Architecture &amp; supporting visuals
                    </h3>
                    <div data-project-gallery className="mx-auto grid max-w-[860px] grid-cols-1 gap-5">
                      {project.extraImageUrls.map((imageUrl, index) => {
                        const imageRevealed = revealedImageUrls.has(imageUrl);

                        return (
                          <div data-project-image data-image-url={imageUrl} className="group rounded-2xl" key={`${imageUrl}-${index}`}>
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                              <div className={`absolute inset-0 bg-[#E5E6E1] transition-opacity duration-200 motion-reduce:animate-none motion-reduce:transition-none dark:bg-[#282B26] ${imageRevealed ? "opacity-0" : "animate-pulse"}`} aria-hidden="true" />
                              <Image className={`object-contain object-center transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${imageRevealed ? "scale-100 opacity-100" : "scale-[1.015] opacity-0"} group-hover:scale-[1.01] motion-reduce:group-hover:scale-100`} src={imageUrl} alt={`${project.title} supporting visual ${index + 1}`} fill sizes="(min-width: 1024px) 860px, 100vw" style={prefersReducedMotion ? undefined : { transitionDelay: `${index * 60}ms` }} onLoad={() => markImageLoaded(imageUrl)} onError={() => markImageLoaded(imageUrl)} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}
              </article>
            ))}

            {projectCount > 0 && (
              <nav aria-label="Project navigation" className="flex items-center justify-between gap-3 border-t border-[#E5E6E1] pt-5 lg:fixed lg:top-1/2 lg:left-[calc(80%+1.5rem)] lg:z-20 lg:w-24 lg:-translate-y-1/2 lg:flex-col lg:gap-5 lg:border-0 lg:pt-0 dark:border-[#282B26]">
                <button type="button" onClick={() => selectProject(activeIndex - 1)} className="group flex min-h-14 min-w-16 flex-col items-center justify-center gap-2 rounded-xl px-3 py-2 text-[12px] text-[#62675F] transition-colors hover:bg-[#ECEEE6] hover:text-[#20221F] focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#A6ABA1] dark:hover:bg-[#20251B] dark:hover:text-[#F2F3EE]">
                  <ArrowUp className="size-5" aria-hidden="true" />
                  Previous
                </button>
                <span className="whitespace-nowrap text-[12px] tracking-[0.12em] text-[#62675F] tabular-nums dark:text-[#A6ABA1]">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(projectCount).padStart(2, "0")}
                </span>
                <button type="button" onClick={() => selectProject(activeIndex + 1)} className="group flex min-h-14 min-w-16 flex-col items-center justify-center gap-2 rounded-xl px-3 py-2 text-[12px] text-[#62675F] transition-colors hover:bg-[#ECEEE6] hover:text-[#20221F] focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#A6ABA1] dark:hover:bg-[#20251B] dark:hover:text-[#F2F3EE]">
                  Next
                  <ArrowDown className="size-5" aria-hidden="true" />
                </button>
              </nav>
            )}
          </div>
        </main>
      )}
    </>
  );
}
